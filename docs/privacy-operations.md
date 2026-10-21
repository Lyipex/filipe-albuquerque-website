# Privacidade: práticas e manutenção

Atualizado em 20/10/2026. Este registro acompanha o aviso público em `/privacidade`; não substitui o cumprimento das práticas descritas.

## Decisões confirmadas pelo responsável

- Responsável: Filipe Brito Albuquerque.
- Canal dos titulares e de orçamento: fbalbuquerque@proton.me.
- Hospedagem: Vercel.
- Correspondência: Proton Mail.
- Pedidos sem contratação: conservar por até seis meses contados do último contato; depois excluir, salvo necessidade específica e documentada de conservação legal.
- Propostas de orçamento: validade de 20 dias corridos, após os quais valores e condições podem ser revistos. Esse é um prazo comercial, diferente do prazo de conservação dos dados.

## Funcionamento conferido no código

- O formulário não usa endpoint, banco de dados, cookies ou localStorage para seus campos.
- O botão de envio só é habilitado após a hidratação. Sem JavaScript, há um link direto de e-mail; a ação HTML também aponta para `mailto:` para evitar GET acidental com dados pessoais na URL da hospedagem.
- O botão monta um `mailto:` e entrega os campos ao aplicativo de e-mail do visitante; o envio depende da confirmação nesse aplicativo. Provedores de e-mail podem sincronizar rascunhos antes do envio.
- Nome, sobrenome e ao menos um serviço são obrigatórios. WhatsApp e descrição são opcionais.
- O aviso abre em nova aba a partir do formulário para preservar o preenchimento original.
- Não há integração de analytics, anúncios ou pixels no código revisado. As imagens e fontes são servidas localmente. Isso não elimina os registros técnicos tratados pela Vercel.
- Não foi adicionado aceite obrigatório de marketing nem consentimento genérico. O atendimento solicitado se fundamenta na etapa preliminar de contratação (LGPD, art. 7º, V).

## Rotinas que dependem do responsável e das contas dos provedores

- Revisar regularmente as conversas sem contratação e excluir mensagens, anexos, cópias locais e contatos associados que completaram seis meses do último contato. A aplicação não tem acesso à caixa de e-mail e não executa essa exclusão.
- Para contratos, documentos fiscais, controvérsias ou outras exceções, identificar e registrar a obrigação/prazo concreto. Não conservar todo o histórico indefinidamente por precaução.
- Atender solicitações no canal informado, confirmar identidade com informação proporcional e registrar pedido, resposta e fundamento de eventual conservação. Observar os prazos legais aplicáveis.
- Manter as contas de e-mail e hospedagem protegidas, com acesso restrito e autenticação forte. Verificar as configurações efetivamente habilitadas; o código não audita a conta.
- Conferir o plano da Vercel, retenção de logs, integrações, exportação de logs e recursos de observabilidade efetivamente ligados na produção. A duração depende do recurso e do plano; não se afirmou um prazo único no aviso.
- Verificar contratos de tratamento de dados e os mecanismos de transferência internacional aplicáveis à conta/produto usado em Vercel e Proton (LGPD, arts. 33 a 36 e normas da ANPD). O aviso informa os provedores e o processamento internacional; a implementação não verifica os contratos das contas nem certifica a conformidade desses mecanismos.
- Antes de ativar atendimento por WhatsApp, identificar a conta, as integrações e as condições do provedor utilizadas. Não foi publicado um número de atendimento.
- Reavaliar aviso, bases legais e eventuais escolhas do visitante antes de adicionar analytics, campanhas, CRM, chatbots no próprio portfólio ou um formulário com envio direto a servidor.

## Fontes verificadas

- LGPD, especialmente arts. 6º, 7º, 9º, 15 a 19, 33 a 36 e 46: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- Perguntas frequentes da ANPD: https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes
- Vercel: https://vercel.com/legal/privacy-notice e https://vercel.com/legal/dpa
- Registros da Vercel: https://vercel.com/docs/logs/runtime
- Proton Mail: https://proton.me/mail/privacy-policy

A inclusão do aviso e da validação atende à parte implementável no site. Não equivale a uma certificação de conformidade de toda a operação ou das contas dos provedores.
