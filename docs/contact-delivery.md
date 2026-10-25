# Envio do pedido de orçamento

Atualizado em 24/10/2026. O responsável informa envio em produção na Netlify com Resend e Upstash. A auditoria local usa mocks, não lê segredos nem comprova entrega da instalação publicada.

## Configuração

Cadastrar no contexto desejado e escopo **Functions** ou todos os escopos pela interface/API/CLI da Netlify. Valores definidos somente em `netlify.toml` não ficam disponíveis às funções. Aplicar alterações com novo deploy autorizado. Não usar `NEXT_PUBLIC_` nas variáveis privadas.

| Variável privada | Finalidade |
| --- | --- |
| `RESEND_API_KEY` | Chave de envio com permissão no domínio autorizado. |
| `CONTACT_FROM_EMAIL` | Remetente autorizado no Resend, sem display name. O servidor acrescenta `FA Web Studio`. |
| `CONTACT_TO_EMAIL` | Destinatário válido, sem espaços extras; obrigatório e sem fallback. |
| `CONTACT_ALLOWED_ORIGIN` | `https://filipealbuquerque.netlify.app`, sem barra final, caminho ou espaços. Previews exigem configuração isolada. |
| `CONTACT_HASH_SECRET` | Segredo aleatório estável com pelo menos 32 caracteres. |
| `UPSTASH_REDIS_REST_URL` | URL HTTPS do banco, hostname terminado em `.upstash.io`, sem credenciais embutidas. |
| `UPSTASH_REDIS_REST_TOKEN` | Token REST de leitura/escrita do mesmo banco. |

A Netlify fornece `SITE_ID` e `URL`; o código exige ambas e IP válido de `x-nf-client-connection-ip`. A compatibilidade Vercel usa `VERCEL` e `x-vercel-forwarded-for`. Não definir `VERCEL` artificialmente nem confiar em `x-forwarded-for` do visitante.

O contato público e `mailto:` em `src/lib/site.ts` são independentes do destinatário privado. Assunto deriva dos serviços permitidos; corpo é texto simples com cabeçalho `FA WEB STUDIO`; `reply_to` só é usado para E-mail validado. Aceite do Resend não garante entrega na caixa.

## Diagnóstico seguro

Procurar `[contact:init]` nos logs da função: registra o primeiro bloqueio e somente códigos/nomes de variáveis. Códigos: `CONTACT_CONFIG_MISSING`, `CONTACT_EMAIL_INVALID`, `CONTACT_SECRET_INVALID`, `CONTACT_ORIGIN_INVALID`, `CONTACT_UPSTASH_URL_INVALID`, `CONTACT_HOSTING_UNRECOGNIZED`, códigos da simulação e `CONTACT_INIT_FAILED`.

Falta de configuração retorna 503 genérico. Falta de IP confiável e falha Upstash também retornam 503 com mensagens diferentes; Resend, 502; origem inválida, 403; excesso, 429; reserva concorrente, 409. Não remover proteções para contornar configuração incompleta. Não registrar valores, erros brutos, IPs ou dados do formulário.

## WhatsApp

`NEXT_PUBLIC_WHATSAPP_NUMBER` é pública e precisa estar disponível na build. Aceita formatação comum e gera `wa.me` com 8–15 dígitos, sem zero inicial. Usar DDI/DDD/número corretos; formato não verifica titularidade. Sem valor válido a ação fica indisponível. Mensagem: “Olá, Filipe! Conheci seu trabalho pelo site e gostaria de conversar sobre um projeto.” O visitante confirma o envio no WhatsApp.

## Proteções e testes

- JSON limitado a 16 KiB mesmo sem Content-Length; validação server-side, origem exata, honeypot e enum de serviços.
- Nome até 120 caracteres, descrição até 2.000, e-mail até 254 e telefone até 30 caracteres com 10–15 dígitos.
- Lua atômico: 5 tentativas por IP e 3 por contato em 10 minutos. HMAC de IP/contato, sem campos em texto aberto.
- Reserva de 60 segundos, deduplicação/token estável por 24 horas sem renovar TTL. Repetições aceitas não reenviam nem consomem novamente os contadores.
- Timeouts Redis 4 segundos e Resend 10 segundos. Route Handler declara `maxDuration=30`; conferir limite efetivo da função/plano Netlify.
- Falhas interrompem envio e preservam campos na memória da página, sem cookies/localStorage.
- Bots distribuídos e custos ainda exigem monitoramento e controles de borda proporcionais ao abuso.

`npm run test:contact` usa mocks sem e-mails reais; exige Node >=22.15. Não executa Lua em Redis real.

Simulação de interface, com dados fictícios e sem credenciais:

```sh
CONTACT_TEST_MODE=1 npm run dev -- --hostname 127.0.0.1 --port 3001
```

Exige desenvolvimento e host local, não ativa em produção/Netlify/Vercel. Falha na primeira tentativa e aceita a segunda com indicação de simulação. Não interromper processos do usuário se houver lock do Next; usar instância isolada.

Após autorização de publicação: conferir variáveis, remetente/DNS, destinatário, origem, limites e logs; fazer um único envio controlado com dados fictícios e confirmar recebimento. Não usar credenciais reais nos testes automatizados.

Referências: [Netlify Functions](https://docs.netlify.com/build/functions/environment-variables/), [Resend](https://resend.com/docs/api-reference/emails/send-email), [idempotência](https://resend.com/docs/dashboard/emails/idempotency-keys) e [Upstash](https://upstash.com/docs/redis/features/restapi).
