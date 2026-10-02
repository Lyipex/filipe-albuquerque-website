const projects =[
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
    code: "FA/02",
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
    code: "FA/03",
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
      className="bg-paper px-6 py-24 text-ink sm:py-28 lg:px-10 lg:py-36 xl:px-14"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Identificação da seção */}
        <p className="text-sm font-medium text-ink/50">
          Nº 03 - Projetos
        </p>

        {/* Introdução */}
        <div className="mt-10 grid gap-8 border-t border-ink/15 pt-8 lg:grid-cols-2 lg:gap-16">
          <h2 className="max-w-2xl text-[clamp(2.5rem,4.2vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            Projetos pensados para comunicar melhor cada negócio.
          </h2>

          <p className="max-w-xl text-base leading-7 text-ink/70 sm:text-lg sm:leading-8 lg:justify-self-end">
            Cada projeto parte de uma necessidade diferente. A ideia é organizar
            as informações, apresentar bem o negócio e facilitar o caminho de
            quem chega até o site.
          </p>
        </div>

        {/* Projetos */}
        <div className="mt-24 lg:mt-32">
          {projects.map((item) => (
            <article
              key={item.code}
              className="border-t border-ink/20 py-12 lg:py-16"
            >
              {/* Cabeçalho do projeto */}
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.12em] text-moss">
                    Projeto conceito
                  </p>

                  <h3 className="mt-3 text-[clamp(2.25rem,4vw,4rem)] font-medium leading-none tracking-[-0.04em]">
                    {item.code} - {item.area}
                  </h3>
                </div>

                <p className="text-sm text-ink/50">
                  {item.type}
                </p>
              </div>

              {/* Imagem futura */}
              <div className="mt-10 flex min-h-[420px] items-center justify-center border border-ink/15 bg-ink/[0.03] sm:min-h-[520px] lg:min-h-[620px]">
                <p className="text-sm text-ink/40">
                  Imagem do projeto
                </p>
              </div>

              {/* Informações */}
              <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
                <div>
                  <p className="text-sm font-medium text-ink/45">
                    Contexto
                  </p>

                  <p className="mt-3 max-w-sm leading-7 text-ink/75">
                    {item.context}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-ink/45">
                    Objetivo
                  </p>

                  <p className="mt-3 max-w-sm leading-7 text-ink/75">
                    {item.objective}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-ink/45">
                    No projeto
                  </p>

                  <p className="mt-3 max-w-sm leading-7 text-ink/75">
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