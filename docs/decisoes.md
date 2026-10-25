# Registro de decisões — FA Web Studio

Base permanente das decisões do projeto `filipe-albuquerque-website`. Consulte o [índice](README.md) para procedimentos e evidências detalhadas, e o [contexto](../project_context.md) para a visão geral.

## Critérios do registro

- **Confirmada:** decisão expressa do responsável ou comportamento atual comprovado e preservado. Não significa que todas as entregas associadas estejam implementadas ou publicadas.
- **Provisória:** solução temporária, sujeita a substituição ou aprovação posterior.
- **Pendente:** escolha, aprovação ou definição ainda ausente; não executar como se estivesse decidida.
- **Fontes:** “solicitação atual” significa as decisões fornecidas pelo responsável nesta conversa ao pedir a organização desta base. Isso documenta a confirmação, sem inventar a data original de adoção.
- **Datas:** indicar somente quando comprovadas. Salvo indicação expressa em uma entrada, a data original da decisão não está comprovada. Datas de relatórios são evidências datadas, não datas presumidas de todas as decisões ali descritas.
- **Justificativas:** registrar apenas as conhecidas. Uma consequência técnica ou impacto não deve ser apresentado como motivo histórico de escolha de fornecedor.

## Identidade e canais

### D01 — Marginália: nome interno original

- **Status:** confirmada.
- **Decisão:** preservar Marginália como nome interno do projeto original, sem tratá-lo como marca pública atual.
- **Justificativa conhecida:** a distinção foi explicitada pelo responsável; o motivo original da escolha do nome não está registrado.
- **Impacto nos projetos:** manter a rastreabilidade de documentos antigos sem restaurar a denominação em novos textos públicos ou operacionais.
- **Fontes:** solicitação atual; [histórico do design](design-consistency.md).

### D02 — FA Web Studio: identidade operacional adotada

- **Status:** confirmada.
- **Decisão:** usar FA Web Studio como identidade operacional, inclusive nos e-mails de orçamento. A escolha operacional não encerra a avaliação da marca definitiva.
- **Justificativa conhecida:** adoção e limite confirmados pelo responsável; justificativa de naming não registrada.
- **Impacto nos projetos:** preservar a identificação do remetente/cabeçalho atual e não substituir automaticamente a marca pública do portfólio.
- **Fontes:** solicitação atual; [README](../README.md); [envio](contact-delivery.md); `src/lib/contact.ts` e `src/lib/server/contact-runtime.ts`.

### D03 — Marca pública atual

- **Status:** confirmada.
- **Decisão:** preservar **Filipe Albuquerque | Sites e Soluções Digitais** como marca pública atual; o responsável é Filipe Brito Albuquerque.
- **Justificativa conhecida:** orientação expressa de preservação; motivo original da formulação não registrado.
- **Impacto nos projetos:** manter consistência de apresentação e metadados. FA Web Studio permanece uma identidade operacional distinta.
- **Fontes:** solicitação atual; [SEO](seo.md); [práticas de privacidade](privacy-operations.md); `src/lib/seo.ts` e `src/app/layout.tsx`.

### D04 — Marca definitiva

- **Status:** pendente.
- **Decisão/definição em aberto:** avaliar a marca definitiva; não há novo nome ou identidade definitiva aprovados neste registro.
- **Justificativa conhecida:** o responsável informou que a marca ainda está em avaliação; critérios finais não registrados.
- **Impacto nos projetos:** não executar rebranding nem apresentar FA Web Studio como escolha definitiva por inferência.
- **Fonte:** solicitação atual.

### D05 — Contato público atual e destinatário privado

- **Status:** confirmada.
- **Decisão:** manter **falbuquerqueah@gmail.com** como contato público autorizado. A fonte de configuração é `contactEmail` em `src/lib/site.ts`, com `contactHref` derivado. O destinatário do formulário continua privado e independente em `CONTACT_TO_EMAIL`.
- **Justificativa conhecida:** endereço fornecido e autorizado pelo responsável para uso atual, antes da migração futura para domínio próprio.
- **Impacto nos projetos:** componentes devem reutilizar a configuração; não ler variáveis privadas para descobrir contato público. O endereço neste registro documenta a decisão e não cria nova configuração.
- **Data comprovada:** 24/10/2026, conforme adendo da auditoria e registro de privacidade.
- **Fontes:** solicitação atual; [adendo da auditoria](auditoria-lancamento-v1.md); [privacidade](privacy-operations.md); `src/lib/site.ts`.

### D06 — E-mail futuro com domínio próprio

- **Status:** confirmada, como direção futura; migração pendente.
- **Decisão:** planejar Proton com domínio próprio. Domínio, endereço final e data de migração ainda precisam ser definidos/validados.
- **Justificativa conhecida:** intenção expressa do responsável de migrar após obter domínio próprio; motivo específico da escolha do provedor não registrado.
- **Impacto nos projetos:** revisar contato público e documentos de privacidade quando autorizado. Não alterar automaticamente remetente Resend, destinatário privado ou Upstash.
- **Fontes:** solicitação atual; [roadmap](roadmap.md).

### D07 — WhatsApp como alternativa de contato

- **Status:** confirmada.
- **Decisão:** preservar o link externo de WhatsApp, configurado pela variável pública de build `NEXT_PUBLIC_WHATSAPP_NUMBER`; visitante confirma o envio no aplicativo.
- **Justificativa conhecida:** alternativa de contato oferecida no fluxo atual; motivo original da escolha não registrado.
- **Impacto nos projetos:** não confundir link com envio automático nem com a preferência de resposta do formulário. Validação de formato não comprova titularidade; não copiar o número para evidências internas.
- **Fontes:** [envio/WhatsApp](contact-delivery.md); `src/components/ContactCTA.tsx`.

## Engenharia, integrações e publicação

### D08 — Stack atual e Netlify

- **Status:** confirmada para o projeto atual.
- **Decisão:** preservar Next.js App Router, React, TypeScript e Tailwind/CSS Modules, com hospedagem Netlify e integração de funções. Não há decisão registrada de exigir essa stack ou hospedagem para todos os futuros clientes.
- **Justificativa conhecida:** a escolha original dos fornecedores não está registrada. Restrição técnica comprovada: o endpoint de orçamento requer servidor; exportação estática removeria esse fluxo.
- **Impacto nos projetos:** manter o endpoint dinâmico e conferir limites/escopos na hospedagem. Versões vigentes ficam no lockfile/contexto, sem criar outra lista de versões aqui.
- **Fontes:** [README](../README.md); [contexto](../project_context.md); `package.json`, `package-lock.json` e `src/app/api/orcamento/route.ts`.

### D09 — Formulário de orçamento inicial

- **Status:** confirmada.
- **Decisão:** preservar `POST /api/orcamento`, com nome, canal/contato escolhido e serviços obrigatórios; descrição opcional; validar no servidor e preservar o preenchimento após falha.
- **Justificativa conhecida:** coletar informações para atendimento e orçamento. Não transmitir o contato do canal não escolhido nem persistir campos em cookies/localStorage.
- **Impacto nos projetos:** não tratar esse formulário como briefing completo nem adicionar coleta, cadastro ou marketing por inferência. Alterações de dados coletados exigem revisão do fluxo e da privacidade.
- **Fontes:** [envio](contact-delivery.md); [privacidade](privacy-operations.md); `src/lib/contact.ts` e `src/components/ContactForm.tsx`.

### D10 — Resend para envio

- **Status:** confirmada.
- **Decisão:** manter envio via Resend no servidor, remetente autorizado FA Web Studio, destinatário privado obrigatório, mensagem em texto simples e `reply_to` somente para E-mail validado.
- **Justificativa conhecida:** encaminhar pedidos à caixa de atendimento pelo servidor. O motivo da escolha do Resend em relação a alternativas não está registrado.
- **Impacto nos projetos:** sucesso exige confirmação do provedor; aceite não garante entrega/leitura. Preservar timeout e chave de idempotência. Testes automatizados não enviam e-mails reais.
- **Fontes:** [envio](contact-delivery.md); `src/lib/server/contact-handler.ts` e `src/lib/server/contact-runtime.ts`.

### D11 — Upstash para proteção de envio

- **Status:** confirmada.
- **Decisão:** manter Redis Upstash com reserva atômica, rate limiting, deduplicação e identificadores HMAC; bloquear envio se a proteção falhar.
- **Justificativa conhecida:** controlar abuso, concorrência e repetição sem armazenar campos/IP/contato em texto aberto no Redis. O motivo da escolha comercial do Upstash não está registrado.
- **Impacto nos projetos:** preservar limites e TTLs definidos no [procedimento de envio](contact-delivery.md), token estável e idempotência. Não substituir por proteção em memória nem rotacionar segredo sem planejar a deduplicação. Testes atuais não comprovam execução de Lua em Redis real.
- **Fontes:** [envio](contact-delivery.md); [auditoria](auditoria-lancamento-v1.md); `src/lib/server/contact-guard.ts`.

### D12 — Segurança por padrão

- **Status:** confirmada.
- **Decisão:** preservar módulos privados `server-only`, validação independente no servidor, limite de corpo, origem exata, honeypot, IP confiável da plataforma, cabeçalhos de segurança e falha fechada. Não registrar segredos ou dados pessoais em logs/evidências.
- **Justificativa conhecida:** proteção contra abuso, exposição de dados e envio indevido documentada na auditoria.
- **Impacto nos projetos:** configuração incompleta deve interromper envio; não remover controles para contornar erros. Previews/testes não recebem credenciais de produção. Melhorias futuras não estão automaticamente autorizadas por esta regra.
- **Fontes:** [auditoria](auditoria-lancamento-v1.md); [envio](contact-delivery.md); `next.config.ts` e `src/lib/server/`.

### D13 — Trabalho local, autorização e deploy consolidado

- **Status:** confirmada.
- **Decisão:** desenvolver/revisar localmente e agrupar alterações aprovadas em deploys consolidados. **Não fazer commit, push ou deploy sem autorização explícita para a ação correspondente.**
- **Justificativa conhecida:** consolidar os ajustes e a auditoria antes da publicação; a documentação alerta que push pode iniciar deploy automático da Netlify.
- **Impacto nos projetos:** preservar alterações locais anteriores, conferir vínculo Git/Netlify antes de push autorizado, evitar deploy manual duplicado e manter rollback. Editar documentação ou aprovar mockup não autoriza publicação.
- **Fontes:** solicitação atual; [auditoria e sequência de publicação](auditoria-lancamento-v1.md); [contexto](../project_context.md).

### D14 — Qualidade e aprovação antes de publicar

- **Status:** confirmada.
- **Decisão:** realizar auditoria, verificações adequadas ao impacto e aprovação antes da publicação, distinguindo validação local, testes manuais e confirmação em produção.
- **Justificativa conhecida:** finalizar os projetos com revisão, testes e aprovação, conforme orientação do responsável.
- **Impacto nos projetos:** registrar evidências e limitações; não apresentar testes antigos como reexecutados. A auditoria de **24/10/2026** registra **PRONTO COM RESSALVAS**, não autorização de publicação nem certificação integral de segurança, acessibilidade ou LGPD.
- **Fontes:** solicitação atual; [auditoria](auditoria-lancamento-v1.md); [checklist](checklist-publicacao.md). A data acima é do relatório, não a data presumida de adoção desta regra.

## Design, briefing e aprovação de clientes

### D15 — Engenharia reutilizável, identidade personalizada

- **Status:** confirmada como diretriz; organização da base reutilizável pendente.
- **Decisão:** padronizar engenharia e processos, personalizando design, identidade visual e conteúdo para cada projeto. Preservar o visual aprovado do portfólio atual.
- **Justificativa conhecida:** o responsável definiu reutilização da base técnica com personalização visual. O histórico local também separa conceitos técnicos aproveitados de valores visuais de outra identidade.
- **Impacto nos projetos:** não impor a paleta, tipografia, composição ou textos deste site a todos os clientes. Catálogo de componentes, estrutura de distribuição e versão de um Design System reutilizável ainda não estão definidos.
- **Fontes:** solicitação atual; [histórico do design](design-consistency.md); [contexto](../project_context.md).

### D16 — Briefing inteligente

- **Status:** confirmada como diretriz; questionário e implementação pendentes.
- **Decisão:** preparar perguntas estratégicas que antecipem decisões criativas e reduzam o tempo de concepção, com atenção às necessidades do nicho/projeto.
- **Justificativa conhecida:** reduzir o tempo inicial de concepção e apoiar decisões de criação, explicitado pelo responsável.
- **Impacto nos projetos:** não confundir o formulário de orçamento atual com esse briefing. Banco de perguntas, campos obrigatórios, lógica por nicho, ferramenta e armazenamento ainda precisam ser definidos; nenhum questionário detalhado está aprovado neste registro.
- **Fontes:** solicitação atual; [contexto, processo futuro](../project_context.md).

### D17 — Mockups responsivos

- **Status:** confirmada como padrão planejado; execução por projeto pendente de escopo.
- **Decisão:** prever mockups para **desktop, tablet e celular** antes da aprovação visual do cliente.
- **Justificativa conhecida:** permitir a aprovação da aparência do site nos diferentes formatos, conforme pedido do responsável.
- **Impacto nos projetos:** registrar larguras, versão, ajustes e aprovação; definir entregas na proposta/contrato. Não transformar o planejamento em promessa pública automática nem afirmar que os mockups já foram produzidos.
- **Fontes:** solicitação atual; [roadmap de aprovação](roadmap.md).

### D18 — Preview navegável

- **Status:** confirmada como padrão planejado; execução por projeto pendente de escopo.
- **Decisão:** disponibilizar preview navegável para avaliação de navegação, conteúdo, responsividade e estados principais.
- **Justificativa conhecida:** permitir que o cliente avalie o funcionamento antes da aprovação/lançamento.
- **Impacto nos projetos:** registrar a versão aprovada e proteger conteúdo privado. Preview não equivale a lançamento; `noindex` não substitui controle de acesso. Hospedagem/acesso específicos por cliente ainda precisam ser acordados.
- **Fontes:** solicitação atual; [roadmap](roadmap.md); [SEO](seo.md).

### D19 — Crédito de desenvolvimento opcional

- **Status:** confirmada.
- **Decisão:** oferecer “Desenvolvido por Filipe Albuquerque”, com link ao portfólio, somente mediante aprovação contratual expressa e aprovação da apresentação pelo cliente.
- **Justificativa conhecida:** o responsável propôs o crédito como possibilidade; motivo comercial adicional não registrado.
- **Impacto nos projetos:** não inserir automaticamente, exigir como obrigação geral ou tratar como endosso. O rodapé atual não recebeu esse crédito. Conferir a URL do portfólio na entrega.
- **Fontes:** solicitação atual; [roadmap](roadmap.md).

## IA e skills

### D20 — Ferramentas de IA com instruções específicas

- **Status:** confirmada como diretriz; distribuição de tarefas e materiais pendente.
- **Decisão:** considerar Codex, Claude, Antigravity e ferramentas visuais com instruções específicas ao trabalho e ao projeto.
- **Justificativa conhecida:** orientação do responsável para organizar o uso dessas ferramentas. Motivos de escolha de cada produto não registrados.
- **Impacto nos projetos:** esta lista não comprova instalação, assinatura ou uso de todas as ferramentas. Papéis, modelos, formatos de instrução e um kit compartilhado ainda não foram definidos; não há decisão de uso simultâneo nem delegação automática.
- **Fonte:** solicitação atual.

### D21 — Skills sob demanda

- **Status:** confirmada.
- **Decisão:** utilizar skills sob demanda para evitar consumo desnecessário. `design-taste-frontend`, `imagegen-frontend-web` e `unlazy` só podem ser carregadas/executadas quando o usuário pedir explicitamente pelo nome. **Nesta tarefa, não usar nenhuma skill.**
- **Justificativa conhecida:** evitar consumo desnecessário e respeitar o controle de uso definido pelo responsável.
- **Impacto nos projetos:** não ativar essas três skills por iniciativa própria; consultar a necessidade e a autorização aplicável ao trabalho. Este registro não exige usar ou instalar skills para manter a documentação.
- **Fontes:** solicitação atual; instruções fornecidas pelo usuário nesta conversa; [contexto](../project_context.md).

## SEO, privacidade e contratos

### D22 — SEO e separação entre produção e preview

- **Status:** confirmada.
- **Decisão:** manter origem canônica única em `src/lib/seo.ts`, metadados consistentes, sitemap das páginas existentes e previews fora da indexação; produção segue a condição de ambiente documentada.
- **Justificativa conhecida:** evitar previews indexados e URLs públicas inconsistentes, problemas tratados na auditoria.
- **Impacto nos projetos:** domínio novo exige revisar canonical, redirecionamentos e origem autorizada do formulário. Imagem própria de compartilhamento permanece opcional, sujeita a aprovação; não inventar datas ou dados estruturados.
- **Fontes:** [SEO](seo.md); [auditoria](auditoria-lancamento-v1.md); `src/lib/seo.ts` e `next.config.ts`.

### D23 — LGPD e práticas de privacidade atuais

- **Status:** confirmada como prática documentada; execução operacional depende do responsável.
- **Decisão:** informar coleta/finalidade, responsável/canal, provedores, direitos e retenção no aviso; preservar minimização e atendimento solicitado sem aceite genérico de marketing. Manter a rotina documentada de exclusão do atendimento sem contratação após até seis meses do último contato, ressalvadas necessidades específicas documentadas.
- **Justificativa conhecida:** refletir o processamento efetivo e as decisões de atendimento registradas. O motivo específico da escolha do prazo de seis meses não está registrado; não o apresentar como prazo legal universal.
- **Impacto nos projetos:** a aplicação não exclui mensagens da caixa e a expiração Redis não apaga backups/logs dos provedores. Novas coletas, analytics ou integrações exigem reavaliação. Este registro preserva práticas locais, sem constituir nova análise jurídica ou atestar conformidade integral.
- **Fontes:** [práticas de privacidade](privacy-operations.md); [auditoria](auditoria-lancamento-v1.md); `src/app/privacidade/page.tsx`.

### D24 — Contratos e compromissos de entrega

- **Status:** confirmada como diretriz; condições específicas dependem de cada contratação.
- **Decisão:** definir mockups/preview e crédito opcional na proposta/contrato antes de assumi-los. Preservar a validade comercial documentada de **20 dias corridos** para propostas de orçamento.
- **Justificativa conhecida:** registrar entregas e aprovações antes de tratá-las como compromisso. Motivo específico do prazo de 20 dias não registrado.
- **Impacto nos projetos:** validade da proposta não equivale a prazo de retenção. Não presumir contrato assinado, preço, prazo de entrega, manutenção ou direitos de uso não documentados; o checklist orienta registrar custos e responsabilidades acordados.
- **Fontes:** [roadmap](roadmap.md); [práticas de privacidade](privacy-operations.md); [checklist de entrega](checklist-publicacao.md).

### D25 — Definições operacionais e contratuais em aberto

- **Status:** pendente.
- **Decisão/definição em aberto:** confirmar rotina de exclusão, prazos específicos de registros contratados, contratos de tratamento/transferências dos provedores, limites/custos das contas, identificação comercial aplicável e condições de cada proposta/contrato.
- **Justificativa conhecida:** esses pontos são explicitamente ressalvados na auditoria; código e documentação não comprovam configurações ou contratos das contas.
- **Impacto nos projetos:** não inventar CNPJ/endereço, plano, valores, SLA, retenção de provedor ou certificações. Registrar confirmação, responsável e prazo quando houver definição real.
- **Fontes:** [auditoria, pendências e riscos residuais](auditoria-lancamento-v1.md); [práticas de privacidade](privacy-operations.md); [checklist](checklist-publicacao.md).

## Próximos projetos e materiais

### D26 — Próximo projeto: Isabela Cerqueira, podologia

- **Status:** confirmada como prioridade; desenvolvimento/entrega não atestados.
- **Decisão:** o próximo projeto é o site de **Isabela Cerqueira, podologia**, conforme confirmação do responsável.
- **Justificativa conhecida:** prioridade explicitada; motivo de ordenação entre os demais projetos não registrado.
- **Impacto nos projetos:** planejar briefing e aprovações desse nicho. Isso não ativa o item de podologia no portfólio: o código atual mantém `enabled: false`. Loja demonstrativa e arquitetura continuam prévias em planejamento; não há outra ordem de execução aprovada neste registro.
- **Fontes:** solicitação atual; [roadmap](roadmap.md); `src/components/FeaturedProject.tsx`.

### D27 — Materiais provisórios da Isabela

- **Status:** provisória.
- **Decisão:** trabalhar com imagens provisórias até receber materiais oficiais fornecidos/aprovados pela cliente; conferir autorização, créditos e correspondência antes da entrega definitiva.
- **Justificativa conhecida:** os materiais oficiais ainda são aguardados.
- **Impacto nos projetos:** não apresentar referências provisórias como fotografias oficiais ou trabalho entregue; esta decisão não manda trocar assets do portfólio atual. Arquivos finais e sua seleção ainda dependem da cliente.
- **Fontes:** solicitação atual; [roadmap](roadmap.md); [materiais das prévias](preview-assets.md).

### D28 — Possível rebranding da Isabela

- **Status:** pendente.
- **Decisão/definição em aberto:** a identidade visual pode mudar após eventual rebranding. Não há rebranding definitivo, nova identidade ou execução aprovados neste registro.
- **Justificativa conhecida:** possibilidade informada pelo responsável; direção visual final ainda não definida.
- **Impacto nos projetos:** preservar a composição existente até definição/aprovação da cliente; confirmar identidade antes da entrega definitiva sem presumir que o rebranding ocorrerá.
- **Fontes:** solicitação atual; [roadmap](roadmap.md).

## Atualização e preservação do histórico

Manter os identificadores D01–D28 para referências. Ao revisar uma decisão, registrar a mudança, sua fonte e a decisão anterior quando relevante. Não converter automaticamente uma pendência em confirmação nem alterar datas para fazê-las parecer conhecidas.

Os detalhes de implementação continuam nos documentos temáticos do [índice](README.md). Os relatórios de auditoria são evidência histórica: seu veredito e datas devem ser preservados, junto dos adendos posteriores. Este registro não autoriza código funcional, commit, push, deploy ou envio real de mensagens.
