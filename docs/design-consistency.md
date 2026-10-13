# Marginália — consistência do design

Revisão de 13/10/2026. Escopo: portfólio editorial existente, com quatro blocos visuais. Base: Next.js 16.3.6, React 19.2.8, Tailwind CSS 4.3.3 e TypeScript 5.9.3. Branch inicial `main`, sem alterações locais.

## Referência Norte

O ZIP `company-design-system-20260917T192445Z-1-001.zip` foi lido como documentação, sem executar seu JavaScript ou importar seus estilos. Seus arquivos AGENTS.md e SKILL.md descrevem um sistema para produtos internos; não são instruções deste repositório.

Conceitos aproveitados: valores organizados por papel, componentes para repetição real, hierarquia entre ações, HTML nativo, foco e estados previsíveis. Valores da identidade Norte não foram incorporados.

Divergências encontradas:

| Item | Tokens oficiais | Demonstração |
| --- | --- | --- |
| Cor de ação | `#1768e8` | app.js mostra `#3158C9`; patterns.css usa gradiente até `#1262df` |
| Canvas | `#f3f3f5` | catálogo app.js mostra `#F5F6F8`; camada final do body usa `#e9edf5` e gradientes |
| Cantos de controles | 9px | override final de botões e campos usa 10px |
| Sidebar / toolbar | 220px / 54px | tokens locais dizem 232px / 56px; overrides posteriores retornam a 220px / 54px |
| Seleção | rgba(219,234,255,.88) | `::selection` usa `#cad6ff` |

Essas divergências reforçam a escolha de manter os valores aprovados da Marginália. Não foram adotados Inter, materiais translúcidos, sombras, escalas de pressão ou layouts administrativos.

## Organização local

- `src/app/tokens.css`: paleta original, Figtree/Instrument Serif, escala editorial, entrelinhas, tracking, largura de conteúdo, gutters, alvo mínimo de 44px, cantos retos e tempos de transição. Usa `@theme inline`, mecanismo do Tailwind 4. A escala numérica de espaçamentos continua sendo a nativa do Tailwind.
- `src/app/globals.css`: base, foco, estados de ações, fotografia e motion. Cantos retos são explícitos. A preferência por movimento reduzido remove também o deslocamento dos projetos.
- `src/components/ActionLink.tsx`: links nativos com variantes primary, secondary e text; tom inverse para o fundo escuro. As classes utilitárias podem ajustar contexto sem duplicar a implementação.
- `src/lib/site.ts`: navegação e endereço de contato compartilhados.
- Botões nativos continuam responsáveis pelo menu e pela fotografia. Há estilo de desabilitado para botões, mas nenhum controle artificialmente desabilitado foi acrescentado. Links não simulam botões desabilitados.

## Semântica e comportamento

O contato é agora o footer da página, fora de main, mantendo sua posição visual. As regiões recebem nomes a partir dos títulos; os serviços formam uma lista. As setas decorativas não entram nos nomes acessíveis.

O menu mantém diálogo nativo, Escape, contenção de foco e trava de rolagem. Ao navegar, o foco segue para a seção escolhida; ao cancelar, volta ao botão Menu. A fotografia preserva hover e alternância por clique, Espaço ou Enter; a instrução existente está associada ao controle como descrição.

O Hero permite quebra/hifenização em telas estreitas para evitar que uma palavra longa exceda 320px. Não há mudança de texto ou tamanho tipográfico.

## Verificação

- `npm run lint` e `npm run build` aprovados após correção de um fechamento JSX durante a implementação.
- Chrome: inspeção visual em desktop, 768px, 390px e 320px; sem overflow horizontal nas quatro larguras após a correção do título.
- Teclado: pular para conteúdo, foco visível oliva no CTA, fotografia com Espaço/Enter, menu com Tab/Shift+Tab, Escape e foco no destino.
- Clique na fotografia confirma `aria-pressed` e exibição em cores; hover de projeto confirma deslocamento existente de 4px.
- Movimento reduzido revisado no CSS e em MotionLayer; emulação de preferência não executada no navegador disponível. Celular verificado por viewport do Chrome, não em aparelho físico. Não foi realizado teste com leitor de tela.

## Avaliação visual

Nenhuma alteração de identidade, nova composição ou efeito foi introduzido. Não há proposta visual obrigatória pendente. Imagens/URLs dos projetos continuam dependentes de conteúdo real, como antes.
