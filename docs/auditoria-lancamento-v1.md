# Auditoria de lançamento — FA Web Studio v1.0

Data: 24/10/2026. Projeto: `filipe-albuquerque-website`. Referência inicial: commit `3778ae8`. Revisão local, sem commit, push, deploy, instalação de dependências ou envio real. Nenhum segredo ou valor privado de variável de ambiente foi consultado. Os servidores e navegadores de teste foram isolados, usando dados fictícios.

Adendo de 24/10/2026, posterior à auditoria abaixo: por solicitação expressa, o contato público passou a usar o Gmail fornecido e autorizado pelo responsável, centralizado em `src/lib/site.ts`. Rodapé, aviso e mensagens reutilizam essa configuração; a política agora identifica Gmail para ambos os canais. As menções abaixo a Proton público e à preservação do e-mail descrevem o estado da auditoria original, anterior a esse ajuste. Resend, Upstash e o destino privado do formulário não foram modificados. Os padrões de mockups, preview, crédito contratual e materiais da Isabela estão em `docs/roadmap.md`; nenhum crédito foi adicionado ao rodapé atual.

## 1. Resumo executivo e inventário

**Veredito: PRONTO COM RESSALVAS.** As correções locais passaram nas verificações disponíveis. Não foi identificado problema crítico ou alto comprovado no escopo examinado. A aprovação não certifica WCAG/LGPD nem substitui a conferência da configuração e dos provedores em produção.

| Item | Estado examinado |
| --- | --- |
| Framework | Next.js 16.4.1, App Router; React/React DOM 19.2.8 |
| Tipos e estilos | TypeScript 5.9.3, Tailwind 4.3.3; CSS Modules e CSS global |
| Ferramentas | ESLint 9.39.5, eslint-config-next 16.4.1; Node 24.21.0 na validação |
| Dependências de produção | Somente Next.js, React e React DOM; integrações usam `fetch` no servidor |
| Páginas | `/` e `/privacidade`; página de erro do framework |
| Endpoint | `POST /api/orcamento`, runtime Node, `maxDuration=30` declarado |
| SEO | `/robots.txt`, `/sitemap.xml`, metadados por página e origem canônica fixa Netlify |
| Componentes | Header/menu móvel, Hero, FeaturedProject/ProjectCarousel/ConceptPreview, Services, About/Portrait, ContactCTA/ContactForm e Footer; camadas de animação preservadas |
| Integrações | Netlify, Resend e Upstash; WhatsApp via link externo; Gmail para formulário, confirmado pelo responsável, e Proton para contato público direto |
| Build | `npm run build`; páginas estáticas, endpoint de contato dinâmico; não usar exportação estática |
| Deploy | Integração Next.js da Netlify; não há configuração local que permita atestar o estado do painel, plano ou deploy ativo |
| Documentação | README, envio/diagnóstico, SEO, práticas de privacidade, checklist geral, consistência visual e licenças das prévias |

Variáveis privadas obrigatórias, sem prefixo público: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `CONTACT_ALLOWED_ORIGIN`, `CONTACT_HASH_SECRET`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Devem estar disponíveis às Functions no contexto correto. `SITE_ID` e `URL` são fornecidas pela Netlify. `NEXT_PUBLIC_WHATSAPP_NUMBER` é pública e deve estar disponível na build; `CONTEXT` controla a indexação de previews. `CONTACT_TEST_MODE` é apenas simulação local.

### Classificação inicial, antes das correções

| Classificação | Achados e decisão |
| --- | --- |
| Conforme — preservar | Arquitetura, identidade pública principal, funcionamento do WhatsApp, validação e envio, proteção Upstash, navegação e visual aprovado |
| Problema comprovado — corrigir | Marca antiga nos e-mails, baixo contraste do WhatsApp no fundo escuro, hospedagem incorreta no aviso, título antigo da privacidade, previews indexáveis e documentação operacional desatualizada |
| Melhoria recomendada | Imagem própria de compartilhamento, revisão editorial opcional e comportamento convencional dos radios; não implementadas automaticamente |
| Dependente de decisão | Provedor da caixa destinatária, práticas de retenção/transferência, eventual identificação empresarial e mudanças comerciais; Gmail foi confirmado durante esta revisão |
| Não aplicável ao fluxo atual | Login/autorização de área restrita, uploads, pagamentos, webhooks e política de reembolso para compra online; não existem esses fluxos no site |

## 2. Problemas encontrados e severidade

| Gravidade | Evidência | Resultado |
| --- | --- | --- |
| Crítica/alta | Nenhum problema comprovado na revisão realizada | Não equivale a garantia de ausência de vulnerabilidades |
| Média | Axe apontou contraste insuficiente no texto do WhatsApp: verde-oliva sobre fundo escuro, aproximadamente 1,97:1 | Corrigido apenas o tom da ação secundária inversa para 11,11:1 em repouso; texto claro e foco visível, sem mudar geometria ou animação |
| Média | Aviso dizia Vercel e não distinguia Gmail do canal público Proton | Atualizado para os provedores reais confirmados, sem expor o destinatário privado |
| Média | `NODE_ENV=production` também ocorre em builds de preview | Metadados e cabeçalho agora consideram `CONTEXT`; previews e branch deploys recebem noindex |
| Baixa | Remetente/cabeçalho do orçamento ainda diziam Marginália | Identidade operacional alterada para FA Web Studio; assunto neutro e conteúdo do pedido preservados |
| Baixa | Metadados da privacidade e documentação ainda referiam identidade/configuração antigas | Corrigidos título, instruções de ambiente, destinatário, hospedagem e diagnóstico |

## 3. Correções implementadas

| Arquivo | Justificativa |
| --- | --- |
| `src/lib/contact.ts` | Cabeçalho de texto do e-mail usa FA WEB STUDIO; assunto continua derivado da lista segura de serviços |
| `src/lib/server/contact-runtime.ts` | Nome de exibição do remetente usa FA Web Studio; regras de configuração e diagnósticos preservados |
| `src/app/globals.css` | Contraste da ação secundária inversa, usada pelo WhatsApp, incluindo hover/active e foco |
| `src/lib/seo.ts` e `next.config.ts` | Mesma decisão de indexação no HTML e cabeçalho; produção continua indexável e canonicals não mudam |
| `src/app/privacidade/page.tsx` | Metadado público consistente, Netlify no lugar da hospedagem antiga, Gmail confirmado, Proton direto e data factual da revisão |
| `tests/contact.test.mjs` | Verifica nova identidade operacional e mantém cobertura do envio/proteções |
| `tests/seo.test.mjs` | Cinco contextos isolados verificam URL, título, descrição, indexação e consistência dos cabeçalhos |
| `README.md`, `docs/contact-delivery.md`, `docs/seo.md`, `docs/privacy-operations.md` | Instruções factuais de operação/manutenção, sem valores privados |
| `docs/auditoria-lancamento-v1.md` | Este relatório, evidências, limitações e sequência de publicação |

Não foram modificados o e-mail público, o `mailto:`, o número/mensagem do WhatsApp, o destinatário configurável, as regras do formulário, os scripts Redis, as animações ou a ordem/conteúdo dos projetos. Podologia continua preservada e desativada.

### Segurança e fluxo de envio preservados

- Validação no servidor de tipos, campos, canais, lista de serviços e limites; corpo limitado a 16 KiB mesmo sem Content-Length.
- Origem exata, rejeição de cross-site, JSON obrigatório e honeypot. Não há CORS liberado para terceiros; esses controles não substituem proteção contra bots.
- Remetente e destinatário exclusivos do servidor; falha fechada quando ausentes/inválidos. Texto simples no e-mail, sem HTML interpolado; assunto vem de enum e Reply-To é validado.
- O guard é chamado antes de `send`. Lua atômico reserva o pedido e limita 5 tentativas/IP e 3/contato por 600 segundos. IP e contato são HMAC, não texto aberto.
- Reserva concorrente, idempotência, retries com token estável e expiração do registro em 24 horas; aceite exige confirmação do provedor.
- Netlify exige IP válido do cabeçalho específico da plataforma; não foi adicionado fallback para cabeçalhos arbitrários.
- Falha de configuração/IP/Redis bloqueia envio; erros genéricos não expõem detalhes. Logs de inicialização contêm apenas códigos fixos e nomes de variáveis.
- CSP, proteção contra framing, nosniff, referrer policy e permissions policy preservados. A CSP mantém inline scripts necessários à hidratação estática atual; uma migração para nonces seria alteração de arquitetura sem justificativa comprovada nesta revisão.

### UX, acessibilidade e aplicabilidade

Padrões familiares, proximidade/semelhança, clareza dos CTAs, poucos passos, agrupamentos, alvos de toque e feedback foram avaliados nos fluxos existentes. Loading, erro recuperável e conclusão são os momentos relevantes para prevenção de erros e pico-fim. Há validação antes de enviar e campos preservados após falha.

Não há fluxo de múltiplas etapas que justifique wizard, barra de progresso, Zeigarnik ou gradiente de meta; não foram inventados elementos para aplicar leis de UX. Miller não foi tratado como limite rígido e os dois aspectos de Fitts foram avaliados juntos. Conectividade uniforme não exige novo agrupamento além do formulário já organizado.

Skip link, headings, landmarks, labels/legends, alt, foco visível, dialog com Escape, carrossel sem autoplay e slides inativos com inert foram preservados. A checagem automática não certifica compatibilidade integral com leitores de tela ou WCAG 2.2 AA.

### Privacidade e itens não aplicáveis

A política já informa finalidade, responsável/canal, minimização, direitos, fornecedores, conservação e processamento internacional. A atualização foi factual; não inventou obrigações, prazos ou certificação. Os seis meses de atendimento sem contratação são compromisso operacional existente, não prazo genérico imposto pela LGPD.

Não foram encontrados analytics, pixels ou cookies não essenciais adicionados pela aplicação. Não foi criado banner de consentimento por presunção. Termos de compra/reembolso não foram acrescentados a um site sem checkout. CNPJ, endereço empresarial, avaliações, resultados e certificações não foram inventados. Licenças/créditos das fotografias ilustrativas estão documentados em `docs/preview-assets.md`; fotografias pessoais e práticas das contas dependem do responsável.

## 4. Testes realizados e limitações

| Verificação | Resultado |
| --- | --- |
| `npm run test:contact` | 17/17 passaram: validação, limites, origem, corpo, falhas Resend/Upstash, concorrência, repetição, rate limiting, Netlify, destinatário e logs seguros; sem rede real de envio |
| Testes SEO | 5/5 passaram: produção Netlify, deploy-preview, branch-deploy, desenvolvimento e Node produção sem CONTEXT |
| ESLint e TypeScript | Passaram; build final também executou a verificação de tipos |
| `npm run build` final | Sucesso; `/`, privacidade, robots e sitemap gerados; endpoint dinâmico preservado |
| `npm audit --json` | Zero alertas conhecidos no lockfile na consulta de 24/10/2026; não é prova de segurança absoluta |
| HTTP no servidor de produção local | Páginas/robots/sitemap 200; cabeçalhos conferidos; GET/PUT/DELETE/PATCH/HEAD no endpoint retornam 405; OPTIONS 204; POST sem configuração retorna 503 genérico sem envio |
| Bundle do cliente | 13 arquivos JS examinados; nenhum dos nomes privados RESEND_API_KEY, UPSTASH_REDIS_REST_TOKEN, CONTACT_HASH_SECRET ou CONTACT_TO_EMAIL encontrado. Isso complementa o uso de server-only, sem afirmar varredura de todos os segredos possíveis |
| Responsividade | Chromium isolado, 320/375/768/1024/1440 px; sem rolagem horizontal involuntária; um H1, dois slides e âncoras internas existentes |
| Navegação | Menu móvel abre, Escape fecha e restaura foco; carrossel responde a setas e alterna entre os dois projetos |
| Formulário no navegador | Validação/foco no primeiro erro; loading; falha simulada preserva dados; retry e sucesso; transporte interceptado localmente, sem Resend ou Upstash real |
| Movimento reduzido | Preferência emulada e transições praticamente instantâneas; conteúdo permaneceu disponível |
| Axe/WCAG | Após correção, zero violações reportadas nos perfis examinados da home e privacidade. Restam itens `incomplete` de contraste e atributo ARIA para inspeção humana |
| Inspeção visual | Capturas desktop/mobile conferidas; identidade e geometria preservadas. Em 320 px, a pontuação do H1 pode ficar isolada; refinamento opcional, sem impedir leitura/ação |

### Medição de desempenho local

Chromium headless em build de produção, cache do navegador desabilitado/limpo, latência simulada 150 ms, download 200.000 bytes/s, upload 93.750 bytes/s e CPU 4x. Uma amostra por largura; servidor em localhost, sem representar a CDN, aparelho físico ou experiência de campo.

| Viewport | LCP observado | CLS observado | JS codificado / decodificado | Imagens carregadas na amostra |
| --- | --- | --- | --- | --- |
| 375 px | 636 ms | 0,0673 | 154.316 / 509.708 bytes | 32.034 bytes |
| 1440 px | 648 ms | 0,00315 | 154.316 / 509.708 bytes | 237.274 bytes |

Não há nota Lighthouse nem INP de campo medido. As imagens são otimizadas por Next/Image e a fonte é local; peso de originais preservados não prova download excessivo. Nenhuma troca de asset ou dependência foi necessária pelos resultados obtidos.

Evidências temporárias locais: `/tmp/fa-web-studio-build.log`, `/tmp/fa-web-studio-browser-audit.json`, `/tmp/fa-web-studio-http-audit.json`, `/tmp/fa-web-studio-performance-audit.json`, `/tmp/fa-web-studio-privacy-final-audit.json` e capturas `/tmp/fa-web-studio-desktop.png`/`fa-web-studio-mobile.png`. A última conferência da privacidade inclui a informação de Gmail confirmada pelo responsável, em 320 e 1440 px. São artefatos de QA fora do site, sem credenciais ou dados reais de formulário; podem não persistir em outro ambiente.

## 5. Pendências que exigem decisão do responsável

- Confirmar execução da rotina de exclusão de correspondência após seis meses e os prazos específicos de contratos/obrigações; revisar juridicamente retenção, contratos de tratamento e transferências internacionais nas contas reais, sem declaração de conformidade absoluta.
- Aprovar uma imagem própria de compartilhamento, caso desejada. O cartão atual funciona sem esse ativo.
- Eventual revisão editorial de textos comerciais e simplificação dos radios (hoje permitem desmarcar a seleção) precisam de aprovação; não foram alterados.
- Confirmar autorização das fotografias pessoais e a identificação comercial/jurídica aplicável ao modelo de contratação. Não é possível inferir CNPJ, endereço ou exigibilidade apenas pelo código.
- Autorizar separadamente commit/push/publicação do conjunto revisado. Nenhuma dessas ações foi realizada.

## 6. Riscos residuais e validação manual/produção

- Netlify/CDN/DNS/TLS, HSTS do domínio real, escopos de variáveis, runtime, limites/custos do plano, autenticação das contas e retenção dos provedores não foram auditados no painel.
- O responsável informou formulário e WhatsApp funcionais. Esta revisão não enviou mensagens nem confirmou entrega na caixa Gmail; a integração publicada deve ser conferida após autorização.
- Redis real e Lua não foram executados: os testes validam o contrato/payload e usam guard simulado. Não havia Redis local disponível e não foi instalado serviço para isso.
- Tráfego inválido/distribuído pode consumir funções mesmo sem gerar e-mails. Acompanhar volume/custos e aplicar defesa de borda se houver abuso real.
- Testar NVDA/VoiceOver, anúncios de erros/sucesso, zoom nativo 200%/400%, iOS/Android físicos, gestos e foco. A largura de 320 CSS px verifica geometria de reflow, sem substituir zoom/leitor de tela reais.
- Axe marcou verificações incompletas; ausência de violações automáticas não significa conformidade integral. Validar o contraste restante em imagens/overlays e referências ARIA em estados interativos.
- Monitorar Core Web Vitals reais quando houver dados suficientes. Amostras locais e código-fonte não garantem resultado de campo.

## 7. Checklist de um único deploy consolidado

1. Revisar este relatório e o diff; resolver as decisões operacionais aplicáveis, sem inserir segredos nos registros.
2. Conferir as sete variáveis privadas no contexto Production e escopo Functions, remetente autorizado/DNS Resend, Gmail de atendimento e banco Upstash. Manter o segredo HMAC estável; não rotacioná-lo sem planejamento da deduplicação.
3. Confirmar número público correto do WhatsApp na build, origem exata do formulário e contexto `production`. Previews não devem receber credenciais reais de produção nem ser usados para disparos automatizados.
4. Revisar as evidências locais acima. Se houver novas alterações, executar somente as verificações afetadas e produzir build final antes da aprovação.
5. Obter autorização explícita para um commit consolidado e publicação. Conferir o vínculo Git/Netlify: um push autorizado pode iniciar automaticamente a build; não executar também um segundo deploy manual desnecessário.
6. No deploy autorizado, conferir páginas, assets, console, HTTPS, cabeçalhos, title/canonical/OG, robots/sitemap, noindex em preview, navegação móvel, WhatsApp e aviso de privacidade atualizado.
7. Fazer um único envio controlado autorizado com dados fictícios para a caixa de atendimento; confirmar remetente FA Web Studio, cabeçalho, Reply-To, recebimento e logs seguros. Não fazer carga ou spam contra produção.
8. Registrar o deploy aprovado, resultado e responsável; manter disponível o deploy anterior como rollback na Netlify. Se houver regressão, usar esse rollback e investigar sem enfraquecer proteções.

## 8. Veredito e referências

**PRONTO COM RESSALVAS**: não restou bloqueio local comprovado após as correções e os checks passaram. A liberação continua condicionada à aprovação do responsável e às verificações operacionais/manuais descritas. Este relatório não autoriza publicação nem certifica segurança, acessibilidade ou conformidade jurídica absolutas.

- [Next.js na Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
- [Variáveis de Functions e necessidade de novo deploy](https://docs.netlify.com/build/functions/environment-variables/)
- [Contextos Netlify](https://docs.netlify.com/build/configure-builds/environment-variables/)
- [Privacidade Netlify](https://www.netlify.com/privacy/) e [Google/Gmail](https://policies.google.com/privacy?hl=pt-BR)
- [LGPD, especialmente arts. 7º, 9º e 18](https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm)
- [Guia da ANPD sobre cookies](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf/@@display-file/file)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
