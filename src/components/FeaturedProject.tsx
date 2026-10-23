import ProjectCarousel, { type Project } from "./ProjectCarousel";

const projects: Project[] = [
  {
    code: "FA / 01",
    identification: "PROJETO DEMONSTRATIVO · EM PLANEJAMENTO",
    area: "Loja virtual — projeto demonstrativo",
    type: "Loja virtual",
    phrase: "Um projeto de loja virtual que estou preparando para explorar como apresentar produtos, organizar um catálogo e tornar a experiência de compra mais simples. O segmento e as funcionalidades serão definidos durante o planejamento.",
    concept: "eyewear",
  },
  {
    code: "FA / 02",
    identification: "PROJETO REAL · EM PLANEJAMENTO",
    area: "Site de arquitetura",
    type: "Site institucional e portfólio",
    phrase: "Cada projeto de arquitetura conta uma história. A ideia é criar um espaço digital que apresente projetos de arquitetura e interiores, valorizando cada trabalho e facilitando o primeiro contato do profissional com seus futuros clientes.",
    concept: "architecture",
  },
  {
    code: "FA / 03",
    identification: "PROJETO REAL · EM PLANEJAMENTO",
    area: "Site de podologia",
    type: "Site institucional",
    phrase: "Cuidar dos pés também é cuidar do bem-estar. Este projeto busca criar um espaço onde as pessoas possam conhecer o trabalho da profissional, entender seus serviços e se sentir à vontade para entrar em contato.",
    concept: "podiatry",
  },
];

export default function FeaturedProject() {
  return (
    <section id="projetos" tabIndex={-1} aria-labelledby="projetos-title" className="bg-paper px-gutter py-section text-ink">
      <div className="mx-auto max-w-editorial">
        <p data-motion="reveal" className="text-xs font-medium uppercase tracking-eyebrow text-moss">Nº 02 - Projetos</p>
        <div data-motion="reveal" data-motion-delay="40" className="mt-5 grid gap-5 border-t border-ink/15 pt-6 lg:grid-cols-2 lg:gap-editorial-gap">
          <h2 id="projetos-title" className="max-w-2xl text-section-title font-medium leading-display text-balance tracking-display">Projetos e ideias em desenvolvimento.</h2>
          <p className="max-w-[60ch] text-body leading-copy text-ink/80 lg:justify-self-end">Estou preparando projetos para diferentes tipos de negócio, cada um com suas próprias necessidades. Por enquanto, você pode conhecer as primeiras ideias e acompanhar como elas vão ganhar forma.</p>
        </div>
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
