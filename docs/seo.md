# SEO provisório da Marginália

## Endereço do site

Definir apenas `SITE_URL` na Vercel para mudar a base dos canonicals, Open Graph,
sitemap e referência ao sitemap no robots.txt. O valor deve ser uma origem HTTPS
pública, sem credenciais, porta, caminho, parâmetros ou fragmentos. Uma barra
final é aceita. Valores ausentes ou inválidos usam o endereço provisório:

```text
SITE_URL=https://filipe-albuquerque-website.vercel.app
```

Após mudar a variável, fazer uma nova build/publicação. Não usar `VERCEL_URL`
como fallback: URLs de Preview não devem substituir a origem canônica.

## Indexação bloqueada

Todas as páginas recebem `noindex, nofollow` nos metadados; todas as respostas
recebem o cabeçalho HTTP `X-Robots-Tag: noindex, nofollow`. Trocar `SITE_URL`
não remove esses bloqueios. Antes de liberar a indexação do domínio definitivo,
revisar explicitamente os metadados em `src/lib/seo.ts` e o cabeçalho em
`next.config.ts`.

O robots.txt permite o rastreamento das páginas para que os buscadores possam
ler `noindex`; `/api/` permanece bloqueado. `noindex` não é uma diretiva válida
do robots.txt para o Google. Referência:
[Google Search Central](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
O sitemap contém somente `/` e `/privacidade`, sem datas de atualização inventadas.
Ele está preparado para a migração, mas não libera a indexação.

## Pendências para o domínio definitivo

- Ativar o domínio e HTTPS na hospedagem, atualizar `SITE_URL` e publicar novamente.
- Redirecionar o endereço provisório para o definitivo e revisar o bloqueio de
  indexação somente quando o site estiver pronto.
- Não há imagem OG/Twitter própria: os metadados usam o cartão `summary`, sem
  imagem genérica ou foto de projeto apresentada como imagem da marca.
- O formulário usa `CONTACT_ALLOWED_ORIGIN` separadamente como controle de
  segurança. Sua atualização na migração continua necessária, conforme
  `docs/contact-delivery.md`; a configuração do formulário não foi alterada.
