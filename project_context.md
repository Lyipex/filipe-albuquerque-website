# Contexto do projeto — FA Web Studio

Atualizado em **24/10/2026**, com base na inspeção do código, do lockfile e da documentação local. Repositório: `filipe-albuquerque-website`. Este documento resume o estado local; não comprova que as alterações já estejam publicadas.

Base permanente: [índice de conhecimento](docs/README.md) e [registro de decisões](docs/decisoes.md). O registro distingue decisões confirmadas, provisórias e pendentes; este arquivo mantém a visão geral.

## 1. Objetivo e identidade

Portfólio profissional e canal de captação de pedidos de orçamento de Filipe Albuquerque, voltado à criação de sites e soluções digitais para empresas e profissionais.

- **Identidade pública:** Filipe Albuquerque | Sites e Soluções Digitais.
- **Responsável:** Filipe Brito Albuquerque, apresentado no site como engenheiro de produção e gestor de projetos.
- **Identidade operacional:** FA Web Studio, usada no nome do remetente e no cabeçalho dos e-mails de orçamento. A marca definitiva ainda está em avaliação.
- **Nome interno original:** Marginália. Referências em documentos antigos são históricas; não justificam tratá-lo como marca pública atual ou substituir automaticamente a identidade pública por FA Web Studio.
- **Contato público autorizado:** falbuquerqueah@gmail.com. A fonte de verdade da aplicação é `contactEmail` em `src/lib/site.ts`; `contactHref` deriva dela. Rodapé, privacidade e mensagens de indisponibilidade reutilizam essa configuração. O endereço neste documento é um registro da decisão atual, não outra configuração da aplicação.
- **Origem canônica configurada:** https://filipealbuquerque.netlify.app, definida em `src/lib/seo.ts`. O código atual não consulta `SITE_URL`.
- **Serviços:** landing pages, sites institucionais, redesign e melhorias, chatbots. A oferta de chatbots não significa que exista um chatbot integrado ao próprio portfólio.

O Gmail público é independente de `CONTACT_TO_EMAIL`, que controla o destinatário privado do formulário. Não consultar essa variável para descobrir ou confirmar um endereço público. A documentação registra Gmail para recebimento do formulário por confirmação do responsável; o valor privado não foi consultado nesta inspeção.

A migração para Proton com domínio próprio é futura. Depende de domínio/caixa válidos e autorização; exige revisar a configuração pública e os documentos de privacidade. Não pressupõe alteração do destinatário privado, do remetente Resend ou do Upstash.

## 2. Stack e estrutura

Versões do `package-lock.json`: **Next.js 16.4.1**, App Router; **React/React DOM 19.2.8**; **TypeScript 5.9.3**; **Tailwind CSS 4.3.3**; **ESLint 9.39.5**. Estilos combinam Tailwind, CSS global e CSS Modules.

- **Hospedagem:** Netlify, com integração Next.js e funções de servidor. Não usar exportação estática: ela removeria o endpoint de orçamento.
- **Integrações:** Resend para envio de e-mails e Upstash Redis para proteção contra abuso e duplicação, via `fetch` no servidor. Não há SDK adicional desses serviços nas dependências de produção.
- **Rotas:** `/`, `/privacidade`, `POST /api/orcamento`, `/robots.txt` e `/sitemap.xml`.
- **Página principal:** Header → Hero → Projetos → Serviços → Sobre → Contato/rodapé, com camadas de animação existentes.
- **Arquivos centrais:** `src/lib/site.ts` (contato, navegação e serviços), `src/lib/seo.ts` (SEO), `src/app/tokens.css` (tokens), `next.config.ts` (cabeçalhos), `src/lib/contact.ts` (validação e mensagem), `src/lib/server/` (integrações exclusivas do servidor).
- **Endpoint:** runtime Node.js e `maxDuration=30` declarado; o limite efetivo depende da hospedagem/plano.

Preservar o visual editorial aprovado: fundo papel, texto escuro, oliva, cantos retos, tipografia Figtree, espaçamentos e animações atuais. Tokens e código vigente prevalecem sobre versões e descrições visuais históricas de `docs/design-consistency.md`. Preservar semântica, teclado, foco visível e movimento reduzido.

## 3. Portfólio e conteúdo

`src/components/FeaturedProject.tsx` apresenta duas prévias ativas: loja virtual demonstrativa e site de arquitetura, ambos em planejamento. A entrada de podologia está preservada com `enabled: false`; não ativá-la automaticamente.

As composições e fotografias ilustrativas não são provas de sites publicados, resultados comerciais ou trabalhos entregues. Licenças e créditos estão em `docs/preview-assets.md`. Substituir conceitos por capturas e URLs reais somente quando os respectivos sites estiverem prontos e aprovados.

Para Isabela Cerqueira, permanecem pendentes imagens oficiais fornecidas/aprovadas e confirmação dos usos/créditos. Um eventual rebranding depende da cliente. Não tratar referências provisórias como materiais definitivos nem mudar o portfólio por essa possibilidade.

O responsável confirmou **Isabela Cerqueira, podologia**, como próximo projeto. Essa prioridade não ativa a entrada desabilitada do portfólio nem comprova entrega. Para futuros projetos, a diretriz é padronizar engenharia e processos e personalizar design e conteúdo; o briefing deve antecipar decisões criativas. Detalhes e pendências estão no registro de decisões.

## 4. Contato, Resend, Upstash e WhatsApp

O formulário envia JSON para `/api/orcamento`. Exige nome, canal de retorno (E-mail ou WhatsApp), contato correspondente e ao menos um serviço permitido. Descrição/links são opcionais. Somente o contato do canal escolhido é transmitido. Este é um formulário inicial de orçamento; um briefing detalhado por nicho ainda não está implementado nele.

O servidor valida, verifica as proteções Upstash e solicita o envio ao Resend. A mensagem usa texto simples, remetente autorizado com nome **FA Web Studio** e cabeçalho **FA WEB STUDIO**. O visitante nunca vira o remetente; `reply_to` só é usado para E-mail validado. Sucesso exige confirmação do provedor, que não garante entrega ou leitura na caixa.

Falhas preservam os campos na memória da página para nova tentativa; recarregar ou sair pode perdê-los. Não há persistência desses campos em cookies/localStorage nem cadastro de clientes em banco próprio.

O WhatsApp é um link externo `wa.me` construído em `ContactCTA.tsx`, usando a variável pública de build `NEXT_PUBLIC_WHATSAPP_NUMBER`. Sem formato válido, a ação fica indisponível. O visitante confirma o envio no aplicativo; não existe disparo automático pelo servidor. O responsável informou o canal funcional, sem revalidação em produção nesta etapa. Não registrar o número em evidências internas.

### Configuração, apenas nomes e finalidades

As sete variáveis privadas devem estar disponíveis às Functions no contexto correto da Netlify, sem prefixo `NEXT_PUBLIC_`:

| Variável | Finalidade |
| --- | --- |
| `RESEND_API_KEY` | Autorização de envio no Resend. |
| `CONTACT_FROM_EMAIL` | Remetente autorizado no domínio de envio. |
| `CONTACT_TO_EMAIL` | Destinatário privado obrigatório, sem fallback. |
| `CONTACT_ALLOWED_ORIGIN` | Origem HTTPS exata autorizada para o formulário. |
| `CONTACT_HASH_SECRET` | Segredo HMAC estável, com pelo menos 32 caracteres. |
| `UPSTASH_REDIS_REST_URL` | Endpoint HTTPS do banco Upstash. |
| `UPSTASH_REDIS_REST_TOKEN` | Token REST do mesmo banco. |

`SITE_ID` e `URL` identificam a Netlify no runtime. `CONTEXT` participa da decisão de indexação. `CONTACT_TEST_MODE` serve apenas à simulação local explícita em desenvolvimento; não funciona como simulação de produção. Há compatibilidade Vercel no código, mas a hospedagem atual documentada é Netlify.

Não incluir neste arquivo valores privados, tokens, credenciais, conteúdo de `.env`, dados reais de formulários ou cópias de logs sensíveis.

## 5. Padrões de segurança e privacidade

- Manter integrações privadas em módulos `server-only`; não expor segredos ao cliente, documentação, respostas ou logs. Diagnósticos usam códigos fixos e nomes de variáveis.
- Preservar validação no servidor, lista fechada de serviços, JSON obrigatório, honeypot, origem exata e rejeição de cross-site. Limite do corpo: **16 KiB**, inclusive sem `Content-Length`.
- Preservar limites dos campos: nome 120 caracteres, descrição 2.000, e-mail 254; WhatsApp do formulário com até 30 caracteres e 10–15 dígitos.
- Na Netlify, confiar somente no IP válido de `x-nf-client-connection-ip`; não criar fallback para cabeçalhos arbitrários do visitante.
- Falhas de configuração, IP confiável ou Upstash bloqueiam o envio. Não substituir a proteção por memória local nem enfraquecê-la para contornar erros.
- Manter reserva Lua atômica, limites de **5 tentativas/IP e 3/contato por 600 segundos**, reserva concorrente de 60 segundos e estado/token de idempotência por 24 horas, sem renovar o TTL nas repetições. Pedidos já aceitos não são reenviados.
- IP, contato e assinatura do pedido usam HMAC; Redis não recebe os campos em texto aberto. São identificadores pseudônimos, sem promessa de anonimização irreversível. Não rotacionar o segredo sem planejar o impacto na deduplicação.
- Preservar timeouts, idempotência Resend e confirmação antes do sucesso. Não enviar mensagens reais em testes automatizados nem usar credenciais de produção em previews/testes.
- Preservar CSP e cabeçalhos contra framing, MIME sniffing e permissões indevidas. A CSP admite scripts inline para a hidratação estática atual; mudar para nonces exige avaliar arquitetura e impacto.
- Produção é indexável quando `NODE_ENV=production` e `CONTEXT` está ausente ou é `production`. Previews/branch deploys recebem `noindex, nofollow` em metadados e cabeçalho. `noindex` não protege conteúdo privado contra acesso.

O aviso e as práticas locais documentam Gmail, Netlify, Resend e Upstash. Atendimento sem contratação tem compromisso operacional de exclusão após até seis meses do último contato, salvo necessidade específica documentada; a aplicação não executa exclusão na caixa de e-mail. A validade comercial de propostas é de 20 dias corridos, um prazo diferente.

O código revisado não incorpora analytics, pixels ou publicidade. Fontes e imagens são servidas pelo próprio site. Mudanças na coleta/provedores exigem rever o aviso e as práticas efetivas. Não afirmar conformidade integral de LGPD/WCAG nem inventar CNPJ, endereço empresarial, certificações, avaliações ou resultados.

## 6. Auditoria e estado local

Fonte: `docs/auditoria-lancamento-v1.md`, de **24/10/2026**, com veredito **PRONTO COM RESSALVAS**. Referência inicial: commit `3778ae8`. O relatório não identificou problema crítico ou alto comprovado no escopo examinado; não certifica ausência de vulnerabilidades ou conformidade integral.

Correções documentadas: identidade operacional dos e-mails, contraste do WhatsApp, proteção de previews contra indexação, privacidade para os provedores confirmados e documentação. O adendo posterior registra o Gmail público centralizado; menções a Proton no corpo histórico da auditoria descrevem o estado anterior e não o contato atual.

**Evidências registradas na auditoria:** 17 testes de contato e 5 de SEO aprovados; ESLint, TypeScript e build aprovados; zero alertas conhecidos na consulta de dependências daquela data; navegador em 320/375/768/1024/1440 px; navegação, formulário e movimento reduzido examinados; nenhuma violação automática de acessibilidade remanescente nos perfis avaliados. São resultados daquela revisão, não testes novamente executados para criar este arquivo.

**Limitações:** envio e guard testados com mocks; Lua não executado em Redis real; sem envio real de e-mail ou confirmação da caixa publicada. Painéis, credenciais, plano, DNS/TLS, retenção e contratos dos provedores não foram auditados. Medições locais não equivalem a desempenho de campo. Permanecem verificações humanas de acessibilidade.

A inspeção para este documento encontrou alterações locais anteriores, inclusive arquivos da auditoria/roadmap ainda não rastreados. Preservá-las. Sua existência não autoriza commit ou publicação nem demonstra que o deploy ativo corresponda ao estado local.

## 7. Pendências e próximas entregas

1. **Revisão e publicação:** revisar o conjunto local e obter autorização específica; conferir variáveis, remetente/DNS, destinatário, origem, contexto e limites sem registrar segredos. Após publicação autorizada, conferir páginas, HTTPS, cabeçalhos, SEO, navegação, WhatsApp e um único envio controlado autorizado com dados fictícios, confirmando recebimento e logs seguros.
2. **Acessibilidade/desempenho:** leitor de tela, zoom 200%/400%, aparelhos iOS/Android, foco e verificações incompletas de contraste/ARIA; acompanhar Core Web Vitals reais quando disponíveis.
3. **Operação/privacidade:** confirmar rotina de exclusão, retenção e contratos/transferências dos provedores, acessos e autenticação das contas, fotografias pessoais e identificação comercial aplicável.
4. **Conteúdo e marca:** materiais oficiais de Isabela e eventual rebranding; imagem própria de compartilhamento ainda opcional; revisão editorial e comportamento dos radios dependem de decisão. Domínio próprio/Proton são futuros.
5. **Entrega a clientes:** prever em proposta/contrato mockups para desktop, tablet e celular e preview navegável; registrar versão, larguras, ajustes e aprovação. São padrões planejados, não promessa pública automaticamente incorporada ao portfólio.
6. **Crédito opcional:** “Desenvolvido por Filipe Albuquerque”, com link ao portfólio, somente mediante aprovação expressa na proposta/contrato e da apresentação pelo cliente. Não foi acrescentado ao rodapé atual.
7. **Processo futuro:** diretrizes confirmadas de base técnica reutilizável com identidade personalizada, briefing estratégico, ferramentas de IA com instruções específicas e skills sob demanda. Questionários, Design System distribuível, prompt de esboço e kit completo ainda precisam ser definidos/organizados; não estão comprovados como implantados. Consultar o [registro de decisões](docs/decisoes.md) para justificativas e status.

## 8. Fluxo de trabalho e limites de autorização

1. Ler `AGENTS.md`, este contexto e os documentos relevantes; conferir código, estado Git e diferenças existentes antes de editar. Para mudanças em código Next.js, seguir a orientação local de consultar os guias correspondentes em `node_modules/next/dist/docs/`.
2. Executar apenas o escopo solicitado, preservar alterações do usuário e o design aprovado. Não ativar projetos, adicionar dependências, trocar provedores ou ampliar compromissos comerciais por iniciativa própria.
3. **Não carregar nem executar automaticamente `design-taste-frontend`, `imagegen-frontend-web` ou `unlazy`. Usá-las somente quando o usuário solicitar explicitamente pelo nome.**
   A diretriz geral é usar skills sob demanda para evitar consumo desnecessário; nenhuma skill foi utilizada na organização desta base documental.
4. Verificar conforme o impacto e registrar evidências e limitações. Os testes exigem Node >=22.15; a auditoria usou Node 24. Não reinstalar dependências sem necessidade. Testes de contato usam mocks, sem envio real.

```sh
npm run dev
npm run lint
npm run test:contact
node --import ./tests/register-typescript.mjs --test tests/seo.test.mjs
npx --no-install tsc --noEmit --incremental false
npm run build
npm run start
```

**Não fazer commit, push ou deploy sem autorização explícita do usuário para a ação correspondente.** Uma solicitação de edição, teste ou documentação não autoriza publicação. Antes de um push autorizado, conferir o vínculo Git/Netlify: ele pode disparar deploy automático. Planejar um único deploy consolidado, evitar publicação manual duplicada e manter rollback disponível.

## 9. Referências locais e manutenção

- `README.md`: execução, estrutura e operação.
- `docs/auditoria-lancamento-v1.md`: evidências, ressalvas e checklist consolidado.
- `docs/roadmap.md`: entregas futuras, crédito, Isabela e migração de contato.
- `docs/contact-delivery.md`: variáveis, envio, diagnóstico e testes.
- `docs/privacy-operations.md` e `src/app/privacidade/page.tsx`: decisões e práticas de privacidade.
- `docs/seo.md`: domínio canônico e indexação.
- `docs/preview-assets.md`: materiais provisórios, licenças e créditos.
- `docs/design-consistency.md`: histórico de consistência visual, sujeito ao código atual.
- `docs/checklist-publicacao.md`: roteiro geral a preencher com evidências; caixas desmarcadas não provam falhas nem conclusão da auditoria específica.

Atualizar este contexto quando decisões ou implementação mudarem. Distinguir sempre código confirmado, resultado histórico documentado, informação do responsável e pendência; registrar conflitos sem inventar fatos ou expor valores privados.
