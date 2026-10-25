# SEO do site de Filipe Albuquerque

Atualizado em 24/10/2026.

A página principal usa `Filipe Albuquerque | Sites e Soluções Digitais`; a privacidade, `Privacidade | Filipe Albuquerque`. `og:site_name` usa a identidade pública completa.

A origem `https://filipealbuquerque.netlify.app` está fixada em `src/lib/seo.ts`. `SITE_URL` não é consultada pelo código atual. Canonical, metadataBase, og:url, sitemap e referência no robots usam essa origem; previews não substituem a URL pública.

## Indexação

Metadados e `X-Robots-Tag` permitem indexação quando `NODE_ENV=production` e `CONTEXT` está ausente ou é `production`. `deploy-preview`, `branch-deploy` e `dev` recebem `noindex, nofollow`. Um servidor Node de produção sem `CONTEXT` continua indexável. `noindex` não é controle de acesso para conteúdo privado.

O robots permite rastreamento das páginas e bloqueia `/api/`. O sitemap inclui apenas `/` e `/privacidade`, sem datas inventadas.

Não há imagem OG/Twitter própria aprovada; o cartão usa `summary`. Criar esse ativo é decisão de marca, não correção obrigatória.

Após publicação autorizada, conferir HTML/cabeçalhos de produção e preview, robots, sitemap e compartilhamento. Mudança futura de domínio exige rever a origem canônica, redirecionamentos e `CONTACT_ALLOWED_ORIGIN`, controle de segurança independente.

Referências: [contextos Netlify](https://docs.netlify.com/build/configure-builds/environment-variables/) e [indexação Google](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
