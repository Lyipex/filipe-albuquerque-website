# Checklist interno de publicação

Copiar para cada projeto e registrar evidências antes de marcar os itens.
Quando um item não se aplicar, marcar como concluído e registrar `N/A` com a justificativa.

## Identificação e critérios

- Projeto:
- Responsável pela conferência:
- Data:
- Commit/build:
- URL de teste:
- URL de produção:
- Evidências dos testes:

**Marcações**

- `[LOCAL]`: verificar no ambiente local, preferencialmente com build de produção.
- `[PRODUÇÃO]`: verificar no domínio publicado; aprovação local não substitui esse teste.
- `[BLOQUEIO]`: enquanto pendente, impede o lançamento público quando aplicável.

O ambiente pode ser publicado para testes antes do lançamento. Não divulgar nem
liberar indexação enquanto houver bloqueios aplicáveis em aberto. Não registrar
senhas, tokens, dados pessoais reais ou informações confidenciais nas evidências.

## 1. UX/UI e conteúdo

- [ ] [LOCAL] Conferir todas as páginas e estados com o escopo e o visual aprovados.
- [ ] [LOCAL] Revisar textos, ortografia, nomes, contatos e informações comerciais com o responsável.
- [ ] [LOCAL] Verificar que cada ação tem rótulo claro e leva ao destino esperado.
- [ ] [LOCAL] Testar links internos, externos, downloads e navegação de retorno.
- [ ] [LOCAL] Conferir estados de carregamento, vazio, erro, sucesso e indisponibilidade quando existentes.
- [ ] [LOCAL] Confirmar que imagens e recursos têm autorização de uso e créditos quando necessários.
- [ ] [BLOQUEIO] Remover placeholders, links quebrados em fluxos essenciais e informações comerciais não aprovadas ou inventadas.
- [ ] [PRODUÇÃO] Percorrer os fluxos principais pela URL publicada e confirmar que o conteúdo aprovado está visível.

## 2. Responsividade e acessibilidade

- [ ] [LOCAL] Conferir larguras representativas de celular, tablet e desktop, inclusive a menor largura suportada.
- [ ] [LOCAL] Confirmar ausência de rolagem horizontal involuntária, sobreposição e conteúdo cortado.
- [ ] [LOCAL] Testar zoom de 200% e refluxo do conteúdo até 400%, conforme o tipo de interface.
- [ ] [LOCAL] Percorrer menus, links, formulários, modais e componentes interativos apenas com teclado.
- [ ] [LOCAL] Verificar foco visível, ordem lógica, fechamento por Escape e restauração do foco quando aplicável.
- [ ] [LOCAL] Conferir títulos hierárquicos, regiões semânticas, textos alternativos, rótulos e mensagens associadas aos campos.
- [ ] [LOCAL] Medir contraste e conferir legibilidade, alvos de toque e preferência por movimento reduzido.
- [ ] [LOCAL] Executar uma verificação automatizada de acessibilidade e complementar com teste manual de leitor de tela nos fluxos principais.
- [ ] [PRODUÇÃO] Testar em navegadores e dispositivos reais representativos do público, registrando quais foram utilizados.
- [ ] [BLOQUEIO] Corrigir barreiras que impeçam navegar, compreender o conteúdo essencial ou concluir uma ação principal.

## 3. Qualidade técnica e desempenho

- [ ] [LOCAL] Executar lint, verificação de tipos, build de produção e os testes definidos para o projeto.
- [ ] [LOCAL] Conferir o diff final e garantir que contém apenas alterações aprovadas e os arquivos necessários.
- [ ] [LOCAL] Verificar o funcionamento com a build de produção, além do servidor de desenvolvimento.
- [ ] [LOCAL] Conferir dimensões, formatos, tamanhos e carregamento das imagens; priorizar apenas recursos necessários à primeira tela.
- [ ] [LOCAL] Conferir carregamento de fontes, estabilidade do layout e comportamento em conexão lenta.
- [ ] [LOCAL] Executar medição de desempenho nas páginas e jornadas representativas e registrar resultados e metas acordadas.
- [ ] [PRODUÇÃO] Verificar console, erros de rede, hidratação, recursos com falha e respostas HTTP inesperadas.
- [ ] [PRODUÇÃO] Medir desempenho no ambiente publicado; acompanhar dados reais de experiência quando houver volume suficiente.
- [ ] [BLOQUEIO] Resolver falhas de build, erros que interrompam fluxos essenciais e regressões graves nas metas acordadas.

## 4. Segurança e privacidade

- [ ] [LOCAL] Executar a auditoria de dependências e avaliar severidade, alcance e exploração no contexto do projeto.
- [ ] [LOCAL] Examinar código, diff e arquivos rastreados para identificar credenciais, chaves privadas e arquivos sensíveis.
- [ ] [LOCAL] Confirmar que segredos ficam no servidor e que variáveis públicas não contêm credenciais.
- [ ] [LOCAL] Revisar entradas não confiáveis, renderização de HTML, uploads, redirecionamentos e consultas para riscos de injeção e XSS.
- [ ] [LOCAL] Testar autenticação, autorização por recurso, sessões e cookies seguros quando houver áreas restritas.
- [ ] [PRODUÇÃO] Confirmar HTTPS, redirecionamento HTTP e configuração de HSTS apropriada ao domínio e seus subdomínios.
- [ ] [PRODUÇÃO] Conferir CSP, proteção contra enquadramento, `nosniff`, política de referência e permissões; testar a ausência de bloqueios de recursos legítimos.
- [ ] [PRODUÇÃO] Confirmar que arquivos de ambiente, diretório Git, backups e interfaces administrativas não estão publicamente acessíveis.
- [ ] [PRODUÇÃO] Conferir escopo de acesso às contas, MFA, separação de ambientes e proteção de previews quando necessária.
- [ ] [PRODUÇÃO] Verificar que logs, respostas de erro e ferramentas de monitoramento não expõem segredos ou dados pessoais desnecessários.
- [ ] [PRODUÇÃO] Conferir dados coletados, provedores envolvidos, retenção, exclusão e aviso de privacidade; verificar consentimento quando aplicável.
- [ ] [BLOQUEIO] Resolver exposição de dados, acesso indevido, credenciais vazadas e vulnerabilidades críticas ou altas exploráveis no projeto.

## 5. SEO

- [ ] [LOCAL] Conferir títulos e descrições próprios para cada página relevante.
- [ ] [LOCAL] Conferir Open Graph e Twitter Cards, incluindo URLs e imagem própria aprovada quando disponível.
- [ ] [LOCAL] Garantir que canonicals e sitemap usam uma única configuração confiável para o domínio, sem URLs locais ou de preview.
- [ ] [LOCAL] Conferir se o sitemap contém apenas páginas existentes e se datas de atualização correspondem a mudanças reais.
- [ ] [LOCAL] Usar dados estruturados somente quando forem aplicáveis e comprováveis, sem avaliações ou informações inventadas.
- [ ] [PRODUÇÃO] Conferir o HTML e os cabeçalhos efetivamente publicados, incluindo canonical e diretivas de indexação.
- [ ] [PRODUÇÃO] Confirmar que previews e versões provisórias permanecem fora da indexação conforme a decisão do projeto.
- [ ] [PRODUÇÃO] Conferir robots.txt e sitemap no domínio publicado; não bloquear o rastreamento de uma página que precisa comunicar `noindex`.
- [ ] [BLOQUEIO] Confirmar com o responsável a política de indexação do lançamento e corrigir diretivas ou canonicals que contrariem essa decisão.
- [ ] [PRODUÇÃO] Após autorização para indexar, conferir ferramentas de busca e enviar o sitemap quando aplicável.

## 6. Domínio, hospedagem e publicação

- [ ] [LOCAL] Identificar branch, commit, comando de build e configuração esperada do ambiente de produção.
- [ ] [PRODUÇÃO] Confirmar titularidade, acessos, responsáveis e renovação do domínio e da hospedagem.
- [ ] [PRODUÇÃO] Verificar DNS, certificado TLS e funcionamento do domínio principal e das variantes previstas.
- [ ] [PRODUÇÃO] Verificar redirecionamentos de domínio e protocolo, sem ciclos ou perda de caminhos importantes.
- [ ] [PRODUÇÃO] Confirmar que o deploy ativo corresponde ao commit aprovado e que os registros de build não contêm erros.
- [ ] [PRODUÇÃO] Conferir variáveis obrigatórias no ambiente correto e republicar quando alterações dependerem de uma nova build.
- [ ] [PRODUÇÃO] Testar páginas de erro, caminhos inexistentes e restrições de acesso previstas.
- [ ] [PRODUÇÃO] Confirmar procedimento de rollback e, quando houver dados persistentes, backup e restauração testados.
- [ ] [BLOQUEIO] Resolver falhas de domínio, HTTPS, deploy, configuração obrigatória ou indisponibilidade de páginas essenciais.

## 7. Formulários e integrações

- [ ] [LOCAL] Testar campos obrigatórios, formatos, limites, normalização e validação independente no servidor.
- [ ] [LOCAL] Verificar origem, proteção contra requisições indevidas, limites de corpo, rate limiting e medidas contra spam adequadas ao fluxo.
- [ ] [LOCAL] Testar envio duplicado, concorrência, timeout, resposta inválida e indisponibilidade do provedor.
- [ ] [LOCAL] Confirmar que falhas preservam os campos e permitem nova tentativa sem anunciar sucesso antecipadamente.
- [ ] [LOCAL] Confirmar que a mensagem de sucesso exige confirmação válida do servidor e que simulação é identificada como teste.
- [ ] [PRODUÇÃO] Conferir credenciais, permissões, remetente autorizado, DNS de e-mail, URLs de callback e origens permitidas, conforme a integração.
- [ ] [PRODUÇÃO] Fazer um teste controlado ponta a ponta com dados fictícios e destinatário autorizado, sem mensagens ou cobranças involuntárias a terceiros.
- [ ] [PRODUÇÃO] Conferir o resultado no sistema de destino; aceite pela API não comprova entrega de e-mail nem conclusão de uma operação externa.
- [ ] [PRODUÇÃO] Testar assinaturas, rejeição de eventos inválidos e idempotência de webhooks, quando existentes.
- [ ] [PRODUÇÃO] Conferir links diretos de WhatsApp, e-mail e telefone, inclusive destinatário e mensagem predefinida.
- [ ] [BLOQUEIO] Resolver integrações essenciais indisponíveis, destino incorreto, sucesso falso, envio sem proteção ou operações duplicadas.

## 8. Entrega, manutenção e custos recorrentes

- [ ] [LOCAL] Documentar instalação, execução, configuração, publicação e recuperação do projeto.
- [ ] [LOCAL] Registrar limitações conhecidas, itens fora de escopo e pendências com responsável e prazo.
- [ ] [PRODUÇÃO] Entregar acessos por canal seguro e confirmar que domínio, hospedagem e serviços estão nas contas acordadas.
- [ ] [PRODUÇÃO] Registrar custos recorrentes de domínio, hospedagem, e-mail, banco, armazenamento e integrações, com moeda e periodicidade.
- [ ] [PRODUÇÃO] Conferir limites dos planos, cobrança por uso, alertas de consumo, responsáveis pelo pagamento e datas de renovação.
- [ ] [PRODUÇÃO] Definir responsáveis e rotina para atualizações, correções de segurança, monitoramento e atendimento de incidentes.
- [ ] [PRODUÇÃO] Agendar conferência após a publicação para identificar falhas de entrega, erros e consumo inesperado.
- [ ] [BLOQUEIO] Obter aprovação de entrega e divulgação, com custos e responsabilidades aceitos pelo responsável pelo projeto.
- [ ] [BLOQUEIO] Conferir todas as seções e registrar que nenhum bloqueio aplicável permanece aberto.

## Registro de pendências e decisão

| Pendência | Ambiente | Impede lançamento? | Evidência | Responsável | Prazo | Situação |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

- Decisão: aprovado para lançamento / aguardar correções.
- Responsável pela aprovação:
- Data e commit aprovado:
- Restrições ou exceções aceitas, com justificativa:
