import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, buildContactEmail, contactLimits } from '../src/lib/contact.ts';
import { createContactHandler, resendSender } from '../src/lib/server/contact-handler.ts';
import { redisContactGuard, reserveScript, finishScript } from '../src/lib/server/contact-guard.ts';
import { contactDependencies } from '../src/lib/server/contact-runtime.ts';

const valid = { fullName: 'Pessoa Teste', replyChannel: 'email', replyContact: 'pessoa@example.com', services: ['Chatbots', 'Landing pages'], description: 'Descrição de teste.\nSem mensagem real.', website: '' };
const origin = 'https://portfolio.example.com';
const request = (body = valid, headers = {}) => new Request(`${origin}/api/orcamento`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });

function fixture() {
  const entries = new Map();
  const counters = new Map();
  const sent = [];
  let failure = false;
  let unavailable = false;
  const dependencies = {
    origin, secret: 'test-secret-only-for-fake-data-123456789', vercel: true,
    guard: {
      async reserve(fingerprint, ip, contact) {
        if (unavailable) throw new Error('unavailable');
        const previous = entries.get(fingerprint);
        if (previous?.status === 'accepted') return { ...previous, status: 'accepted' };
        if (previous?.status === 'pending') return { ...previous, status: 'busy', retryAfter: 60 };
        const counts = [ip, contact].map((key) => { const count = (counters.get(key) ?? 0) + 1; counters.set(key, count); return count; });
        if (counts[0] > 5 || counts[1] > 3) return { status: 'limited', retryAfter: 600, token: '' };
        const token = previous?.token ?? crypto.randomUUID();
        entries.set(fingerprint, { status: 'pending', token });
        return { status: 'reserved', token };
      },
      async finish(fingerprint, token, status) { entries.set(fingerprint, { token, status }); },
    },
    async send(data, token) {
      sent.push({ data, token });
      if (failure) throw new Error('provider timeout');
    },
  };
  const handler = createContactHandler(() => dependencies);
  return { handler, dependencies, sent, entries, setFailure(value) { failure = value; }, setUnavailable(value) { unavailable = value; } };
}
const post = (handler, data = valid, headers = {}) => handler(request(data, { 'x-vercel-forwarded-for': '192.0.2.1', ...headers }));

test('normaliza campos, ordena serviços e prepara conteúdo com Reply-To só para e-mail', () => {
  const result = validateContact({ ...valid, fullName: '  Pessoa  Teste  ' });
  assert.deepEqual(result.data.services, ['Landing pages', 'Chatbots']);
  assert.equal(result.data.fullName, 'Pessoa Teste');
  const email = buildContactEmail(result.data);
  assert.match(email.subject, /Pedido de orçamento \| Landing pages, Chatbots/);
  assert.match(email.text, /Contato para retorno: pessoa@example.com/);
  assert.equal(email.reply_to, 'pessoa@example.com');
  const phone = validateContact({ ...valid, replyChannel: 'whatsapp', replyContact: '+55 (11) 99999-0000' }).data;
  assert.equal(phone.replyContact, '+5511999990000');
  assert.ok(!('reply_to' in buildContactEmail(phone)));
});

test('rejeita nome/canal/contato inválidos, cabeçalhos injetados, serviços e limites', () => {
  for (const [field, value] of [['fullName', '   '], ['fullName', 'a'.repeat(121)], ['fullName', 'Pessoa\r\nBcc: teste@example.com'], ['replyChannel', ''], ['replyChannel', 'sms'], ['replyContact', 'bad'], ['replyContact', 'a@example.com\r\nBcc: z@example.com'], ['services', []], ['services', ['Não existe']], ['description', 'a'.repeat(2001)]]) {
    assert.ok(validateContact({ ...valid, [field]: value }).errors[field], `${field}: ${String(value).slice(0, 30)}`);
  }
  assert.ok(validateContact({ ...valid, replyChannel: 'whatsapp', replyContact: '123' }).errors.replyContact);
  assert.ok(validateContact({ ...valid, replyChannel: 'whatsapp', replyContact: '+55 letras 11999990000' }).errors.replyContact);
});

test('aceite exige confirmação do provedor e reconhece repetição sem enviar outra mensagem', async () => {
  const f = fixture();
  assert.equal((await post(f.handler)).status, 200);
  assert.equal((await post(f.handler)).status, 200);
  assert.equal(f.sent.length, 1);
  assert.equal(f.sent[0].data.fullName, valid.fullName);
  assert.ok(!('website' in f.sent[0].data));
});

test('falha seguida de nova tentativa mantém a mesma chave de idempotência', async () => {
  const f = fixture();
  f.setFailure(true);
  const failure = await post(f.handler);
  assert.equal(failure.status, 502);
  assert.ok(!(await failure.json()).accepted);
  f.setFailure(false);
  assert.equal((await post(f.handler)).status, 200);
  assert.equal(f.sent[0].token, f.sent[1].token);
});

test('reserva simultânea bloqueia repetição enquanto o primeiro envio está em andamento', async () => {
  const f = fixture();
  let release;
  f.dependencies.send = async (data, token) => { f.sent.push({ data, token }); await new Promise((resolve) => { release = resolve; }); };
  const first = post(f.handler);
  await new Promise((resolve) => setImmediate(resolve));
  const second = await post(f.handler);
  assert.equal(second.status, 409);
  assert.equal(second.headers.get('retry-after'), '60');
  release();
  assert.equal((await first).status, 200);
  assert.equal(f.sent.length, 1);
});

test('bloqueia excesso por contato e IP no contrato do guard, com Retry-After', async () => {
  const f = fixture();
  for (let i = 0; i < 3; i++) assert.equal((await post(f.handler, { ...valid, description: `teste ${i}` })).status, 200);
  const limited = await post(f.handler, { ...valid, description: 'teste quatro' });
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '600');
  const g = fixture();
  for (let i = 0; i < 5; i++) assert.equal((await post(g.handler, { ...valid, replyContact: `pessoa${i}@example.com` })).status, 200);
  assert.equal((await post(g.handler, { ...valid, replyContact: 'outro@example.com' })).status, 429);
});

test('validação no servidor, origem, honeypot, JSON, tamanho e IP confiável', async () => {
  const f = fixture();
  const invalid = await post(f.handler, { ...valid, services: [] });
  assert.equal(invalid.status, 422);
  assert.ok((await invalid.json()).fieldErrors.services);
  assert.equal((await post(f.handler, valid, { Origin: 'https://outro.example.com' })).status, 403);
  assert.equal((await post(f.handler, valid, { Origin: '' })).status, 403);
  assert.equal((await post(f.handler, valid, { 'sec-fetch-site': 'cross-site' })).status, 403);
  assert.equal((await post(f.handler, valid, { 'Content-Type': 'text/plain' })).status, 415);
  assert.equal((await post(f.handler, '{')).status, 400);
  assert.equal((await post(f.handler, { ...valid, website: 'spam' })).status, 422);
  assert.equal((await post(f.handler, 'x'.repeat(contactLimits.bodyBytes + 1))).status, 413);
  assert.equal((await f.handler(request())).status, 503);
  assert.equal(f.sent.length, 0);
});

test('lê corpo com limite mesmo sem Content-Length', async () => {
  const f = fixture();
  const stream = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(contactLimits.bodyBytes + 1)); controller.close(); } });
  const response = await f.handler(new Request(`${origin}/api/orcamento`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: stream, duplex: 'half' }));
  assert.equal(response.status, 413);
  assert.equal(f.sent.length, 0);
});

test('falha fechada sem configuração ou sem Redis; não expõe dados no retorno', async () => {
  const disabled = await createContactHandler(() => null)(request());
  assert.equal(disabled.status, 503);
  const f = fixture(); f.setUnavailable(true);
  const response = await post(f.handler);
  assert.equal(response.status, 503);
  assert.equal(f.sent.length, 0);
  assert.ok(!(await response.text()).includes(valid.replyContact));
});

test('confirma após aceite mesmo que a persistência posterior falhe', async () => {
  const f = fixture();
  f.dependencies.guard.finish = async () => { throw new Error('redis failed after acceptance'); };
  assert.equal((await post(f.handler)).status, 200);
  assert.equal(f.sent.length, 1);
});

test('transporte Resend usa destino fixo, From autorizado e cabeçalho de idempotência', async () => {
  const original = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    calls.push(options);
    return Response.json({ id: 'fake-accepted-id' });
  };
  try {
    const send = resendSender('fake-test-key', 'Marginália <orcamento@example.com>');
    await send(validateContact(valid).data, 'same-token');
    const body = JSON.parse(calls[0].body);
    assert.deepEqual(body.to, ['fbalbuquerque@proton.me']);
    assert.equal(body.from, 'Marginália <orcamento@example.com>');
    assert.equal(body.reply_to, valid.replyContact);
    assert.equal(calls[0].headers['Idempotency-Key'], 'quote/same-token');
    assert.ok(!body.html);
    assert.ok(calls[0].signal);
    globalThis.fetch = async () => Response.json({ error: 'failure' }, { status: 500 });
    await assert.rejects(send(validateContact(valid).data, 'same-token'));
    globalThis.fetch = async () => Response.json({});
    await assert.rejects(send(validateContact(valid).data, 'same-token'));
    globalThis.fetch = async () => { throw new Error('network timeout'); };
    await assert.rejects(send(validateContact(valid).data, 'same-token'));
  } finally { globalThis.fetch = original; }
});

test('transporte Redis envia comandos atômicos sem campos/IP em texto aberto e trata erros', async () => {
  const original = globalThis.fetch;
  let call;
  globalThis.fetch = async (url, options) => { assert.equal(url, 'https://fake.upstash.io'); call = options; return Response.json({ result: ['reserved', 0, 'fake-token'] }); };
  try {
    const guard = redisContactGuard('https://fake.upstash.io', 'fake-token');
    const reservation = await guard.reserve('payload-hash', 'ip-hash', 'contact-hash');
    assert.equal(reservation.status, 'reserved');
    const command = JSON.parse(call.body);
    assert.deepEqual(command.slice(0, 6), ['EVAL', reserveScript, 3, 'quote:payload:payload-hash', 'quote:ip:ip-hash', 'quote:contact:contact-hash']);
    assert.ok(!call.body.includes(valid.fullName));
    assert.ok(!call.body.includes(valid.replyContact));
    globalThis.fetch = async (_url, options) => { call = options; return Response.json({ result: 1 }); };
    await guard.finish('payload-hash', 'fake-token', 'accepted');
    assert.equal(JSON.parse(call.body)[1], finishScript);
    globalThis.fetch = async () => Response.json({ error: 'bad command' });
    await assert.rejects(guard.reserve('a', 'b', 'c'));
    globalThis.fetch = async () => Response.json({}, { status: 503 });
    await assert.rejects(guard.reserve('a', 'b', 'c'));
  } finally { globalThis.fetch = original; }
});

test('modo de simulação nunca ativa na Vercel ou em produção', () => {
  const keys = ['NODE_ENV', 'CONTACT_TEST_MODE', 'VERCEL', 'RESEND_API_KEY'];
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  try {
    process.env.CONTACT_TEST_MODE = '1'; process.env.NODE_ENV = 'production'; delete process.env.VERCEL; delete process.env.RESEND_API_KEY;
    assert.equal(contactDependencies(new Request('http://localhost:3001/api/orcamento')), null);
    process.env.NODE_ENV = 'development'; process.env.VERCEL = '1';
    assert.equal(contactDependencies(new Request('http://localhost:3001/api/orcamento')), null);
    delete process.env.VERCEL;
    assert.equal(contactDependencies(new Request('http://public.example.com/api/orcamento')), null);
    assert.equal(contactDependencies(new Request('http://127.0.0.1:3001/api/orcamento')).simulation, true);
  } finally { for (const key of keys) { if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key]; } }
});
