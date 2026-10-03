import Image from "next/image";

export default function About() {
  return (
    <section
      id="sobre"
      className="bg-paper px-6 py-section text-ink lg:px-10 xl:px-14"
    >
      <div className="mx-auto max-w-editorial">
        {/* Identificação da seção */}
        <p className="text-sm font-medium text-ink/60">
          Nº 04 - Sobre
        </p>

        {/* Título */}
        <div className="mt-8 border-t border-ink/15 pt-6">
          <h2 className="max-w-4xl text-section-title font-medium leading-[1.08] text-balance tracking-[-0.045em]">
            Tecnologia com método.
            <br />
            Design com propósito.
          </h2>
        </div>

        {/* Conteúdo */}
        <div className="mt-section-gap grid items-start gap-editorial-gap lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Foto */}
          <div className="w-full max-w-[26rem] bg-ink/[0.03]">
            <Image
              src="/images/filipe-albuquerque-pb.png"
              alt="Filipe Brito Albuquerque"
              width={1068}
              height={1600}
              className="h-auto w-full"
              sizes="(min-width: 1152px) 416px, (min-width: 1024px) 38vw, (min-width: 464px) 416px, calc(100vw - 48px)"
            />
          </div>

          {/* Texto */}
          <div className="flex min-w-0 flex-col text-left">
            <p className="max-w-[50ch] text-lead leading-[1.6] text-ink">
              Sou Filipe Brito Albuquerque, desenvolvedor focado na criação de
              sites para empresas e profissionais que querem apresentar melhor
              seus negócios na internet.
            </p>

            <div className="mt-6 max-w-[60ch] space-y-5 text-body leading-[1.75] text-ink/70">
              <p>
                Minha formação em Engenharia de Produção influencia a forma como
                trabalho. Antes de começar a desenvolver, procuro entender o
                problema, organizar as informações e definir o que o site
                realmente precisa cumprir.
              </p>

              <p>
                A partir daí, design e tecnologia entram para construir uma
                solução clara, responsiva e adequada ao negócio.
              </p>
            </div>

            {/* Formação */}
            <div className="mt-8 border-t border-ink/15 pt-6">
              <p className="text-sm text-ink/60">
                Formação
              </p>

              <p className="mt-2 text-base font-medium text-ink">
                Engenharia de Produção
              </p>

              <p className="mt-1 text-sm text-ink/60">
                Gestão de Projetos - UERJ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
