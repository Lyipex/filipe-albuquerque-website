import ProjectCarousel, { type Project } from "./ProjectCarousel";

const projects: Project[] = [
  {
    code: "FA / 01",
    area: "Saúde",
    type: "Site institucional",
    phrase: "Informação clara e um caminho simples até o atendimento.",
  },
  {
    code: "FA / 02",
    area: "Café",
    type: "Site institucional",
    phrase: "Uma presença digital que traduz a atmosfera do espaço.",
  },
  {
    code: "FA / 03",
    area: "Serviços profissionais",
    type: "Site institucional",
    phrase: "Serviços apresentados de forma direta para facilitar o primeiro contato.",
  },
];

export default function FeaturedProject() {
  return (
    <section
      id="projetos"
      className="bg-paper px-6 py-section text-ink lg:px-10 xl:px-14"
    >
      <div className="mx-auto max-w-editorial">
        <p data-motion="reveal" className="text-sm font-medium text-ink/60">
          Nº 03 - Projetos
        </p>

        <div data-motion="reveal" data-motion-delay="40" className="mt-8 grid gap-8 border-t border-ink/15 pt-6 lg:grid-cols-2 lg:gap-editorial-gap">
          <h2 className="max-w-2xl text-section-title font-medium leading-[1.08] text-balance tracking-[-0.045em]">
            Projetos pensados para comunicar melhor cada negócio.
          </h2>
          <p className="max-w-[60ch] text-body leading-[1.75] text-ink/70 lg:justify-self-end">
            Cada negócio tem algo diferente para comunicar. Por isso, não parto
            de um modelo pronto. Procuro entender o que precisa ficar claro para
            quem chega ao site e, a partir daí, construo uma presença digital que
            faça sentido para aquele negócio.
          </p>
        </div>

        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
