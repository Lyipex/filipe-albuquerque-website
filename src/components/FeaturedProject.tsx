import ProjectCarousel, { type Project } from "./ProjectCarousel";

const projects: Project[] = [
  {
    code: "FA / 01",
    area: "Saúde",
    type: "Site institucional",
    phrase: "Organização de especialidades, informações de atendimento e canais de contato.",
  },
  {
    code: "FA / 02",
    area: "Café",
    type: "Site institucional",
    phrase: "Apresentação do espaço, dos produtos e das informações para visitar ou entrar em contato.",
  },
  {
    code: "FA / 03",
    area: "Serviços profissionais",
    type: "Site institucional",
    phrase: "Apresentação dos serviços, da atuação profissional e dos canais para solicitar um orçamento.",
  },
];

export default function FeaturedProject() {
  return (
    <section
      id="projetos" tabIndex={-1} aria-labelledby="projetos-title"
      className="bg-paper px-gutter py-section text-ink"
    >
      <div className="mx-auto max-w-editorial">
        <p data-motion="reveal" className="text-xs font-medium uppercase tracking-eyebrow text-moss">
          Nº 02 - Projetos
        </p>

        <div data-motion="reveal" data-motion-delay="40" className="mt-5 grid gap-5 border-t border-ink/15 pt-6 lg:grid-cols-2 lg:gap-editorial-gap">
          <h2 id="projetos-title" className="max-w-2xl text-section-title font-medium leading-display text-balance tracking-display">
            Estudos de sites institucionais.
          </h2>
          <p className="max-w-[60ch] text-body leading-copy text-ink/80 lg:justify-self-end">
            Projetos de estudo nas áreas de saúde, alimentação e serviços. São conceitos, sem vínculo com clientes reais.
          </p>
        </div>

        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
