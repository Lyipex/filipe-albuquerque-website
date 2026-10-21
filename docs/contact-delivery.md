# Envio do pedido de orçamento

## Estado desta implementação

O código está preparado para Vercel + Resend + Upstash Redis. Não havia integração de envio, arquivos .env ou vínculo local `.vercel/project.json` no projeto examinado. Não foi possível examinar as variáveis do painel da Vercel. Não foram criadas contas, contratados serviços, alterado DNS nem enviadas mensagens reais.

**O envio real não está operacional sem as configurações abaixo.** Por segurança, ausência de configuração, falha no Redis ou falta de IP confiável na Vercel interrompem o envio com erro acessível. Não há fallback de envio sem proteção ou abertura automática de mailto.

Destinatário fixo: `fbalbuquerque@proton.me`, confirmado em `src/lib/site.ts`. O visitante não pode escolher destinatário, remetente ou assunto. O assunto lista os serviços; o corpo em texto simples padroniza nome, serviços, descrição e canal/contato de retorno. O Resend usa `reply_to` apenas para a preferência E-mail com formato validado; isso não verifica a titularidade da caixa ou do número.

## Configuração pendente

Configurar no painel da Vercel, separadamente para os ambientes desejados, sem prefixo NEXT_PUBLIC_. Para desenvolvimento real, usar `.env.local`, já ignorado pelo Git. Não colocar credenciais no código, no histórico Git, em capturas ou em conversas.

| Variável privada | Valor necessário |
| --- | --- |
| `RESEND_API_KEY` | Chave de envio do Resend, preferencialmente restrita ao domínio de envio. |
| `CONTACT_FROM_EMAIL` | Endereço remetente de um domínio sob seu controle, verificado e autorizado no Resend. Apenas endereço, sem nome de exibição. O código adiciona Marginália. Não usar o e-mail Proton do destinatário sem autorização para enviar por esse domínio. |
| `CONTACT_ALLOWED_ORIGIN` | Origem HTTPS exata do site nesse ambiente, sem barra final, caminho ou lista. Ex.: `https://seu-dominio.com`. Confirmar qual domínio será usado; ele não estava configurado no projeto. Configurar também a origem específica ao testar Preview. |
| `UPSTASH_REDIS_REST_URL` | Endpoint HTTPS do banco Redis Upstash (`*.upstash.io`). |
| `UPSTASH_REDIS_REST_TOKEN` | Token REST de leitura/escrita do mesmo banco. |
| `CONTACT_HASH_SECRET` | Segredo aleatório estável de pelo menos 32 caracteres para HMAC. Gerar em gerenciador de segredos; não compartilhar. |

O código confia no IP definido pela borda Vercel, `x-vercel-forwarded-for`, somente quando `VERCEL` está presente. Em outro host é necessário adaptar a origem confiável de IP; não basta copiar headers enviados pelo visitante. A origem tem de corresponder a `CONTACT_ALLOWED_ORIGIN`; não são aceitos pedidos sem Origin nem CORS de terceiros.

Antes de ativar: verificar domínio/remetente no Resend e seu DNS; configurar as seis variáveis; confirmar permissões, região, retenção, contratos e transferência internacional dos provedores; testar em Preview com endereços oficiais de teste do provedor e rever o aviso. Não houve publicação neste trabalho. Não há prazo de resposta inventado.

## Proteções e limites

- Limite real de leitura do corpo: 16 KiB, inclusive sem Content-Length. Nome até 120 caracteres, descrição até 2.000, e-mail até 254, telefone até 30 caracteres com 10–15 dígitos. Serviços limitados à lista conhecida. Nome e cabeçalhos não aceitam quebras de linha.
- JSON de mesma origem, honeypot oculto sem foco, validação no servidor. Essas barreiras reduzem abuso; não são CAPTCHA e não impedem botnets distribuídas. Acompanhar volume e configurar recursos do Firewall da Vercel se houver abuso real.
- Redis usa scripts Lua atômicos, compartilhados entre instâncias: 5 tentativas por IP e 3 por contato em 10 minutos. Repetições já aceitas não geram novo e-mail e não consomem novamente esses contadores. Solicitações simultâneas do mesmo conteúdo recebem 409 enquanto a reserva de 60 s está ativa.
- Assinatura HMAC do conteúdo normalizado identifica repetições por até 24 h. Chave estável de idempotência do provedor é reutilizada em nova tentativa, inclusive se ele tiver aceitado antes de uma falha de conexão. Não é garantia de deduplicação após esse intervalo; há expiração deliberada. Alterar conteúdo gera um novo pedido, sujeito aos limites.
- Redis não armazena campos do pedido, contato ou IP em texto aberto. Contadores têm TTL de 600 s e estado/assinatura tem TTL de 86.400 s desde a primeira reserva, sem renovação nas novas tentativas. Cuidado ao rotacionar o segredo: os identificadores mudam, afetando deduplicação e limites por até 24 h.
- Timeouts: Redis 4 s, serviço de e-mail 10 s; função Vercel limitada a 30 s. Falha de infraestrutura preserva os campos e permite nova tentativa. Exceções não são registradas com conteúdo, contatos, IP ou respostas brutas dos provedores.
- Não há formulário público que envie cópia automática ao contato do visitante. Os dados ficam na memória da página, sem persistência; recarregar ou sair pode perdê-los.

## Testes sem envio real

`npm run test:contact` executa validação, endpoint, transporte Resend/Redis simulado, repetição, falhas e limites sem rede externa. Requer Node >= 22.15 por usar hooks nativos de módulos no runner de testes (o ambiente usado tinha Node 24). Não instala bibliotecas.

Para testar a interface e o endpoint completo localmente, iniciar uma instância isolada com:

```sh
CONTACT_TEST_MODE=1 npm run dev -- --hostname 127.0.0.1 --port 3001
```

Se outro `next dev` já estiver rodando no mesmo diretório, ele usa o mesmo lock: parar essa instância antes ou usar uma cópia de teste em diretório temporário sem .env, .vercel ou .git. Não encerrar processos do usuário sem autorização. O teste deve usar somente dados fictícios.

A simulação usa memória **somente no teste**, não faz chamadas de rede ao Resend/Upstash, demora 1,4 s, falha na primeira tentativa de cada pedido e aceita a segunda. Repetições aceitas são reconhecidas. A interface identifica explicitamente o aceite simulado. O modo não pode ser ativado por parâmetro da requisição, não funciona em build/start de produção nem em ambiente Vercel e exige hostname local. Os testes automatizados cobrem os limites e falhas do guard; a simulação visual não substitui a validação real dos scripts Lua na conta Upstash.

A validação local não atesta DNS, autorização do remetente, entrega na caixa de entrada, retenção das contas ou gestos físicos em celulares. Nada disso deve ser apresentado como operacional antes da configuração.

## Referências oficiais

- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/emails/idempotency-keys
- https://upstash.com/docs/redis/features/restapi
- https://vercel.com/docs/headers/request-headers
