# Privacidade: práticas e manutenção

Atualizado em 21/10/2026. Este registro acompanha o aviso público em `/privacidade`; não substitui o cumprimento das práticas descritas.

## Decisões confirmadas pelo responsável

- Responsável: Filipe Brito Albuquerque.
- Canal dos titulares e de orçamento: fbalbuquerque@proton.me.
- Hospedagem: Vercel.
- Correspondência: Proton Mail.
- Pedidos sem contratação: conservar por até seis meses contados do último contato; depois excluir, salvo necessidade específica e documentada de conservação legal.
- Propostas de orçamento: validade de 20 dias corridos, após os quais valores e condições podem ser revistos. Esse é um prazo comercial, diferente do prazo de conservação dos dados.

## Funcionamento conferido no código

- O formulário usa `POST /api/orcamento`, JSON com limite de 16 KiB, validação no servidor e destino fixo no código. Não salva seus campos em cookies ou localStorage.
- Seu nome, canal de retorno, o contato do canal escolhido e ao menos um serviço são obrigatórios. A descrição é opcional. O contato do outro canal não é transmitido.
- O servidor encaminha e-mail pelo Resend somente com configuração completa. Remetente precisa de domínio autorizado; o endereço do visitante nunca é usado em From. Reply-To é preenchido apenas para a preferência E-mail validada.
- O envio depende também do Redis da Upstash: reserva atômica por assinatura do pedido, limites de 5 tentativas por IP e 3 por contato a cada janela de 10 minutos. As assinaturas HMAC de IP/contato são pseudônimos, não anonimização irreversível. O Redis não recebe os campos em texto aberto.
- Contadores expiram em 600 segundos a partir da primeira tentativa na janela. Estado de duplicação e identificador de idempotência expiram em 24 horas contadas da primeira reserva do pedido. Nenhum conteúdo do pedido é salvo nesse registro. A idempotência do Resend complementa a proteção para falhas de conexão e novas tentativas.
- Confirmação só após o provedor aceitar a solicitação. Aceite não é garantia de entrega, leitura ou prazo de resposta. Dados são preservados no navegador após falha; sair/recarregar perde esse preenchimento.
- Sem configuração, o endpoint retorna 503 e não envia. Simulação exige desenvolvimento local explícito, não roda em produção/Vercel e não envia mensagens reais. Veja `docs/contact-delivery.md`.
- O aviso abre em nova aba a partir do formulário para preservar o preenchimento original.
- Não há integração de analytics, anúncios ou pixels no código revisado. As imagens e fontes são servidas localmente. Isso não elimina os registros técnicos tratados pela Vercel.
- Não foi adicionado aceite obrigatório de marketing nem consentimento genérico. O atendimento solicitado se fundamenta na etapa preliminar de contratação (LGPD, art. 7º, V).

## Rotinas que dependem do responsável e das contas dos provedores

- Revisar regularmente as conversas sem contratação e excluir mensagens, anexos, cópias locais e contatos associados que completaram seis meses do último contato. A aplicação não tem acesso à caixa de e-mail e não executa essa exclusão.
- Para contratos, documentos fiscais, controvérsias ou outras exceções, identificar e registrar a obrigação/prazo concreto. Não conservar todo o histórico indefinidamente por precaução.
- Atender solicitações no canal informado, confirmar identidade com informação proporcional e registrar pedido, resposta e fundamento de eventual conservação. Observar os prazos legais aplicáveis.
- Manter as contas de e-mail e hospedagem protegidas, com acesso restrito e autenticação forte. Verificar as configurações efetivamente habilitadas; o código não audita a conta.
- Conferir o plano da Vercel, retenção de logs, integrações, exportação de logs e recursos de observabilidade efetivamente ligados na produção. A duração depende do recurso e do plano; não se afirmou um prazo único no aviso.
- Verificar contratos de tratamento de dados e os mecanismos de transferência internacional aplicáveis à conta/produto usado em Vercel, Proton, Resend e Upstash (LGPD, arts. 33 a 36 e normas da ANPD). O aviso informa os provedores e o processamento internacional; a implementação não verifica os contratos das contas nem certifica a conformidade desses mecanismos.
- Configurar e revisar retenção de mensagens, logs e visibilidade dos dados no Resend, além de região, contratos, controles e acessos no Upstash. Confirmar se os ciclos dos provedores atendem à operação; as expirações do Redis da aplicação não prometem apagar logs/backups dos provedores. Essas contas ainda não foram verificadas.
- Antes de ativar atendimento por WhatsApp, identificar a conta, as integrações e as condições do provedor utilizadas. Não foi publicado um número de atendimento.
- Reavaliar aviso, bases legais e eventuais escolhas do visitante antes de adicionar analytics, campanhas, CRM, chatbots no próprio portfólio ou mudar o processamento do formulário.

## Fontes verificadas

- LGPD, especialmente arts. 6º, 7º, 9º, 15 a 19, 33 a 36 e 46: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- Perguntas frequentes da ANPD: https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes
- Vercel: https://vercel.com/legal/privacy-notice e https://vercel.com/legal/dpa
- Registros da Vercel: https://vercel.com/docs/logs/runtime
- Proton Mail: https://proton.me/mail/privacy-policy

A inclusão do aviso e da validação atende à parte implementável no site. Não equivale a uma certificação de conformidade de toda a operação ou das contas dos provedores.

- Resend: https://resend.com/docs/api-reference/emails/send-email e https://resend.com/docs/dashboard/emails/idempotency-keys
- Upstash: https://upstash.com/docs/redis/features/restapi e https://upstash.com/trust/privacy.pdf
