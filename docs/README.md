# Índice de conhecimento — FA Web Studio

Comece pelo [contexto do projeto](../project_context.md) e consulte o [registro de decisões](decisoes.md) antes de propor mudanças. O contexto resume o estado; o registro guarda decisões, justificativas conhecidas, status e pontos ainda abertos.

## Onde encontrar cada assunto

| Documento | Conteúdo e função |
| --- | --- |
| [README do projeto](../README.md) | Execução, comandos de verificação, estrutura e operação básica. |
| [Contexto do projeto](../project_context.md) | Visão geral atual, stack, limites de autorização e situação local. |
| [Registro de decisões](decisoes.md) | Identidade, canais, engenharia, processo, IA, contratos e próximos projetos. |
| [Roadmap operacional](roadmap.md) | Entregas planejadas: mockups, preview, crédito, materiais da Isabela e migração de contato. |
| [Envio de orçamento](contact-delivery.md) | Resend, Upstash, WhatsApp, nomes de variáveis, diagnóstico e testes de contato. |
| [SEO](seo.md) | Origem canônica, metadados e indexação de produção/previews. |
| [Práticas de privacidade](privacy-operations.md) | Decisões operacionais, retenção, direitos e verificações pendentes nos provedores. |
| [Auditoria de lançamento](auditoria-lancamento-v1.md) | Relatório de 24/10/2026, evidências históricas, ressalvas e sequência de publicação consolidada. |
| [Checklist de publicação](checklist-publicacao.md) | Modelo geral a preencher por projeto com evidências e aprovação. Não comprova execução por si só. |
| [Imagens das prévias](preview-assets.md) | Origem, licenças, créditos e substituição de materiais provisórios. |
| [Consistência do design](design-consistency.md) | Revisão histórica de 13/10/2026; conservar como histórico, conferindo stack e estilos no código atual. |
| [Regras locais do repositório](../AGENTS.md) | Orientações locais para trabalhar com o framework. |

O aviso público de privacidade está no código de `/privacidade`; as práticas internas ficam no documento correspondente acima. Não duplicar o texto do aviso aqui.

## Como manter a base

- Registrar uma decisão nova ou revista em `decisoes.md`, com fonte e status. Se não houver justificativa ou data comprovada, declarar a lacuna; data de revisão de documento não prova a data da decisão.
- Manter detalhes técnicos e procedimentos no documento temático indicado neste índice. O registro deve apontar para eles, evitando cópias extensas de regras, comandos e checklists.
- Atualizar o roadmap quando uma entrega planejada mudar; atualizar o contexto quando a visão geral mudar. Uma decisão confirmada pode ter implementação pendente.
- Preservar relatórios datados e decisões anteriores relevantes. Mudanças posteriores devem ser identificadas como atualização/adendo, sem transformar evidência histórica em validação atual.
- Para o estado implementado, conferir o código. Para prioridades e intenções novas, registrar a confirmação do responsável. Se houver diferença entre intenção e implementação, documentar ambas.
- Referenciar a configuração pública em `src/lib/site.ts`; não derivar contato público de variável privada. Nunca registrar credenciais, valores privados de ambiente ou dados reais de atendimento.

Esta base não autoriza execução de skills, alterações funcionais, commit, push ou deploy. Nesta organização documental, nenhuma skill foi usada.
