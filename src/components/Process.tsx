const steps = [
  {
    number: "01",
    title: "Conversa",
    description:
      "Entendo seu negócio, seus objetivos e o que você precisa.",
    delivery: "direcionamento inicial do projeto",
  },
  {
    number: "02",
    title: "Planejamento",
    description:
      "Organizo a estrutura do site, os conteúdos necessários e as prioridades do projeto.",
    delivery: "estrutura e escopo definidos",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Defino a direção visual e organizo as informações para que o site seja claro e fácil de navegar.",
    delivery: "direção visual para aprovação",
  },
  {
    number: "04",
    title: "Desenvolvimento",
    description:
      "Transformo o planejamento em um site responsivo, funcional e preparado para diferentes dispositivos.",
    delivery: "site desenvolvido para revisão",
  },
  {
    number: "05",
    title: "Publicação",
    description:
      "Faço os ajustes finais e preparo o projeto para entrar no ar.",
    delivery: "site publicado",
  },
];

export default function Process() {
  return (
    <section
      id="processo"
      className="bg-paper px-6 py-section text-ink lg:px-10 xl:px-14"
    >
      <div className="mx-auto max-w-editorial">
        {/* Identificação da seção */}
        <p data-motion="reveal" className="text-sm font-medium text-ink/60">
          Nº 06 - Processo
        </p>

        {/* Título */}
        <div data-motion="reveal" data-motion-delay="40" className="mt-8 border-t border-ink/15 pt-6">
          <h2 className="max-w-4xl text-section-title font-medium leading-[1.08] text-balance tracking-[-0.045em]">
            Do primeiro contato ao{" "}
            <span className="font-editorial font-normal">site publicado.</span>
          </h2>
        </div>

        {/* Introdução */}
        <div data-motion="reveal" data-motion-delay="80" className="mt-section-gap grid gap-8 lg:grid-cols-2 lg:gap-editorial-gap">
          <div className="hidden lg:block" aria-hidden="true" />

          <p className="max-w-[60ch] text-lead leading-[1.6] text-ink/70">
            Um processo claro para você saber o que estamos fazendo, o que
            acontece em seguida e o que precisa ser aprovado em cada etapa.
          </p>
        </div>

        {/* Etapas */}
        <ol data-motion="reveal" data-motion-delay="80" className="mt-section-gap border-t border-ink/15">
          {steps.map((step) => (
            <li
              key={step.number}
              className="grid gap-5 border-b border-ink/15 py-8 md:grid-cols-[4rem_minmax(0,0.75fr)_minmax(0,1fr)] md:gap-8"
            >
              <span className="text-sm text-ink/60">
                {step.number}
              </span>

              <div>
                <h3 className="text-xl font-medium">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-[38ch] text-body leading-[1.7] text-ink/65">
                  {step.description}
                </p>
              </div>

              <div className="md:border-l md:border-ink/15 md:pl-8">
                <p className="text-sm text-ink/60">
                  Você recebe
                </p>

                <p className="mt-2 text-base font-medium text-ink">
                  {step.delivery}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}