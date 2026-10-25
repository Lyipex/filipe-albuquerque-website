# Site de Filipe Albuquerque

Next.js App Router, React, TypeScript e Tailwind CSS, hospedados na Netlify. Identidade pública: **Filipe Albuquerque | Sites e Soluções Digitais**. E-mails operacionais: **FA Web Studio**.

## Execução e verificações

Node compatível com Next.js 16; testes exigem Node >=22.15 (hooks nativos). Auditoria executada com Node 24.

```sh
npm ci
npm run dev
npm run lint
npm run test:contact
node --import ./tests/register-typescript.mjs --test tests/seo.test.mjs
npx --no-install tsc --noEmit --incremental false
npm run build
npm run start
```

`npm ci` só é necessário para preparar um ambiente sem as dependências do lockfile. Testes de contato usam mocks, sem envios reais. Não versionar credenciais ou dados pessoais de teste.

## Estrutura e operação

- `/`: apresentação, projetos, serviços, sobre e contato.
- `/privacidade`: aviso de privacidade.
- `POST /api/orcamento`: validação, proteção Upstash e envio Resend.
- `/robots.txt` e `/sitemap.xml`: gerados pela configuração de SEO.
- `src/lib/server/`: integrações exclusivas do servidor.
- `tests/`: testes locais de contato e SEO.

A integração Next.js da Netlify provisiona as funções. Não usar exportação estática, que removeria o endpoint. Domínio canônico: `https://filipealbuquerque.netlify.app`.

## Documentação

- [Índice de conhecimento](docs/README.md)
- [Registro permanente de decisões](docs/decisoes.md)
- [Contexto atual do projeto](project_context.md)
- [Envio, variáveis e diagnóstico](docs/contact-delivery.md)
- [SEO](docs/seo.md)
- [Práticas de privacidade](docs/privacy-operations.md)
- [Roadmap e padrões de entrega para clientes](docs/roadmap.md)
- [Auditoria e publicação consolidada](docs/auditoria-lancamento-v1.md)
- [Checklist geral](docs/checklist-publicacao.md)
- [Licenças das imagens](docs/preview-assets.md)

Configurar as sete variáveis privadas no escopo Functions e o número público do WhatsApp na build. Conferir o vínculo Git da Netlify antes de autorizar um futuro push: ele pode acionar publicação automática.
