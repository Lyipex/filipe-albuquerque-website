import ProjectGallery, { type Project } from "./ProjectCarousel";

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
      id="projetos" tabIndex={-1} aria-labelledby="projetos-title"
      className="bg-paper px-gutter py-section text-ink"
    >
      <div className="mx-auto max-w-editorial">
        <p data-motion="reveal" className="text-sm font-medium text-moss">
          Nº 02 — Projetos
        </p>

        <div data-motion="reveal" data-motion-delay="40" className="mt-5 grid gap-5 border-t border-ink/15 pt-6 lg:grid-cols-2 lg:gap-editorial-gap">
          <h2 id="projetos-title" className="max-w-2xl text-section-title font-medium leading-display text-balance tracking-display">
            Três contextos. Um olhar atento.
          </h2>
          <p className="max-w-[60ch] text-body leading-copy text-ink/80 lg:justify-self-end">
            Estudos de sites institucionais para diferentes negócios. Projetos conceito, sem vínculo com clientes reais.
          </p>
        </div>

        <ProjectGallery projects={projects} />
      </div>
    </section>
  );
}
