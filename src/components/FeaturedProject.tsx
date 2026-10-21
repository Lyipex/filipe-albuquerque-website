import ProjectCarousel, { type Project } from "./ProjectCarousel";

const projects: Project[] = [
  {
    code: "FA / 01",
    area: "E-commerce de óculos",
    type: "Loja virtual",
    phrase: "Prévia ilustrativa para testar a apresentação e a navegação do portfólio. O site e o catálogo serão desenvolvidos depois.",
    concept: "eyewear",
    credit: { name: "Ruslan Sikunov", url: "https://unsplash.com/photos/a-pair-of-glasses-sitting-on-top-of-a-table-wGpe7VnkyDE" },
  },
  {
    code: "FA / 02",
    area: "Site de arquitetura",
    type: "Site institucional e portfólio",
    phrase: "Prévia ilustrativa para testar a apresentação de um portfólio de arquitetura. A fotografia é uma referência e não representa um projeto da arquiteta.",
    concept: "architecture",
    credit: { name: "Dmitriy Frantsev", url: "https://unsplash.com/photos/white-concrete-house-RjchshCSDGU" },
  },
];

export default function FeaturedProject() {
  return (
    <section id="projetos" tabIndex={-1} aria-labelledby="projetos-title" className="bg-paper px-gutter py-section text-ink">
      <div className="mx-auto max-w-editorial">
        <p data-motion="reveal" className="text-xs font-medium uppercase tracking-eyebrow text-moss">Nº 02 - Projetos</p>
        <div data-motion="reveal" data-motion-delay="40" className="mt-5 grid gap-5 border-t border-ink/15 pt-6 lg:grid-cols-2 lg:gap-editorial-gap">
          <h2 id="projetos-title" className="max-w-2xl text-section-title font-medium leading-display text-balance tracking-display">Prévias dos próximos projetos.</h2>
          <p className="max-w-[60ch] text-body leading-copy text-ink/80 lg:justify-self-end">Uma loja de óculos e um site de arquitetura. Por enquanto, as imagens e os layouts são referências para visualizar o portfólio. Os sites ainda não estão disponíveis.</p>
        </div>
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
