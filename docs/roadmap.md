# Roadmap operacional — FA Web Studio

Atualizado em 24/10/2026. Estas são entregas e pendências planejadas; não representam trabalho já concluído nem alteram o design aprovado do portfólio.

## Aprovação de futuros sites de clientes

- Prever no escopo e no cronograma a entrega de mockups responsivos para **desktop, tablet e celular**, antes da aprovação visual.
- Disponibilizar **preview navegável** para aprovação do cliente, permitindo conferir navegação, conteúdo, responsividade e estados principais.
- Registrar as larguras de referência, a versão apresentada, os ajustes solicitados e a aprovação. O preview não equivale ao lançamento; proteger conteúdo privado e não usar dados reais de terceiros nos testes.
- Definir essas entregas na proposta/contrato antes de assumi-las como compromisso de cada projeto; não apresentar este roadmap como promessa comercial pública do portfólio.

## Crédito de desenvolvimento — opção contratual

Para futuros sites de clientes, pode ser oferecido o crédito **“Desenvolvido por Filipe Albuquerque”**, com link para o portfólio em `https://filipealbuquerque.netlify.app`.

A inclusão depende de aprovação expressa na proposta/contrato e de aprovação da apresentação pelo cliente. Não inserir automaticamente, não exigir como obrigação geral e não usar como depoimento ou endosso. Conferir a URL do portfólio na entrega, caso ela tenha migrado.

Este padrão não adiciona crédito nem modifica o rodapé público atual deste projeto. A alteração do e-mail de contato, quando confirmada pelo responsável, é independente desse crédito.

## Isabela Cerqueira — imagens e identidade

- Substituir as imagens provisórias pelas **imagens oficiais** fornecidas e aprovadas por Isabela Cerqueira antes da entrega definitiva do respectivo projeto.
- Confirmar autorização de uso, créditos, qualidade e correspondência dos arquivos com cada área da página. Não apresentar referências provisórias como fotografias oficiais ou trabalho entregue.
- A identidade visual desse projeto poderá mudar após **eventual rebranding**, mediante definição e aprovação da cliente. Isso é uma possibilidade futura, sem rebranding decidido ou execução autorizada neste ajuste.
- Até essa aprovação, preservar a composição atual e documentar os materiais pendentes; não trocar imagens nem estilos do portfólio automaticamente.

## Contato público e migração futura

- A fonte única do endereço público é `contactEmail` em `src/lib/site.ts`; `contactHref` deriva dela. Rodapé, aviso de privacidade e mensagens de erro devem reutilizar essa configuração.
- O endereço publicado deve ser confirmado e expressamente autorizado pelo responsável. Não derivá-lo de `CONTACT_TO_EMAIL`, pois essa variável é privada e controla apenas o envio do formulário.
- Na migração futura para Proton com domínio próprio, validar domínio/caixa e autorização de publicação, atualizar a configuração pública e o provedor no aviso e nas práticas de privacidade.
- Avaliar separadamente qualquer mudança em `CONTACT_TO_EMAIL` ou no remetente Resend. A troca do contato público não exige modificar credenciais, Upstash ou o destino privado funcional.
