const projects = [
  {
    code: "FA / 01",
    area: "Saúde",
    type: "Site institucional",
    context:
      "Projeto desenvolvido para portfólio como estudo de uma solução digital voltada à área da saúde.",
    objective:
      "Organizar os serviços, facilitar o acesso às informações principais e deixar o contato fácil de encontrar.",
    project:
      "Navegação simples, layout responsivo e uma estrutura pensada para funcionar bem tanto no computador quanto no celular.",
  },
  {
    code: "FA / 02",
    area: "Café",
    type: "Site institucional",
    context:
      "Projeto desenvolvido para portfólio como estudo de uma presença digital para uma cafeteria.",
    objective:
      "Apresentar o espaço, os produtos e as informações mais importantes de forma simples e convidativa.",
    project:
      "Identidade visual aplicada ao ambiente digital, navegação direta e estrutura adaptada para diferentes tamanhos de tela.",
  },
  {
    code: "FA / 03",
    area: "Serviços profissionais",
    type: "Site institucional",
    context:
      "Projeto desenvolvido para portfólio como estudo de um site voltado à apresentação de serviços profissionais.",
    objective:
      "Explicar os serviços com clareza, organizar as informações e facilitar o primeiro contato.",
    project:
      "Estrutura objetiva, boa hierarquia de conteúdo e navegação pensada para ajudar o visitante a encontrar o que procura.",
  },
];

export default function FeaturedProject() {
  return (
    <section
      id="projetos"
      className="bg-paper px-6 py-section text-ink lg:px-10 xl:px-14"
    >
      <div className="mx-auto max-w-editorial">
        {/* Identificação da seção */}
        <p className="text-sm font-medium text-ink/60">
          Nº 03 - Projetos
        </p>

        {/* Introdução */}
        <div className="mt-8 grid gap-8 border-t border-ink/15 pt-6 lg:grid-cols-2 lg:gap-editorial-gap">
          <h2 className="max-w-2xl text-section-title font-medium leading-[1.08] text-balance tracking-[-0.045em]">
            Projetos pensados para comunicar melhor cada negócio.
          </h2>

          <p className="max-w-[60ch] text-body leading-[1.75] text-ink/70 lg:justify-self-end">
            Cada projeto parte de uma necessidade diferente. A ideia é organizar
            as informações, apresentar bem o negócio e facilitar o caminho de
            quem chega até o site.
          </p>
        </div>

        {/* Projetos */}
        <div className="mt-section-gap grid gap-x-editorial-gap gap-y-8 md:grid-cols-2">
          {projects.map((item, index) => (
            <article
              key={item.code}
              className={`min-w-0 border-t border-ink/20 ${index === 0 ? "py-8 md:col-span-2 lg:pb-10" : "py-6"}`}
            >
              {/* Cabeçalho do projeto */}
              <div className={`grid gap-3 ${index === 0 ? "md:grid-cols-[minmax(0,1fr)_auto] md:items-end" : ""}`}>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.12em] text-moss">
                    Projeto conceito
                  </p>

                  <h3 className={`mt-3 font-medium leading-[1.15] tracking-[-0.04em] ${
                    index === 0 ? "text-project-title" : "text-secondary-title md:min-h-[2.3em] xl:min-h-0"
                  }`}>
                    {item.code} - {item.area}
                  </h3>
                </div>

                <p className="text-sm text-ink/60">
                  {item.type}
                </p>
              </div>

              {/* Imagem futura */}
              <div className={`mt-6 flex w-full items-center justify-center border border-ink/15 bg-ink/[0.03] ${
                index === 0 ? "aspect-[16/9] sm:aspect-[2/1] lg:aspect-[5/2]" : "aspect-[16/9] sm:aspect-[2/1]"
              }`}>
                <p className="text-sm text-ink/65">
                  Imagem do projeto
                </p>
              </div>

              {/* Informações */}
              <div className={`mt-6 grid ${
                index === 0 ? "gap-6 md:grid-cols-3 md:gap-8" : "gap-5"
              }`}>
                <div>
                  <p className="text-sm font-medium text-ink/60">
                    Contexto
                  </p>

                  <p className="mt-3 max-w-[60ch] leading-7 text-ink/75">
                    {item.context}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-ink/60">
                    Objetivo
                  </p>

                  <p className="mt-3 max-w-[60ch] leading-7 text-ink/75">
                    {item.objective}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-ink/60">
                    No projeto
                  </p>

                  <p className="mt-3 max-w-[60ch] leading-7 text-ink/75">
                    {item.project}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
