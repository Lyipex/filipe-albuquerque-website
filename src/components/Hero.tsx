import Image from "next/image";

export default function Hero() {
  return (
    // ========================================
    // HERO
    // Apresentação principal do site
    // ========================================

    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-navy-950 text-white"
    >
      {/* Elementos decorativos de fundo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-20 lg:pt-28">

        {/* Coluna de texto */}
        <div className="relative z-10 max-w-2xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/55 sm:text-sm">
            Engenharia + Desenvolvimento Web
          </p>

          <h1 className="max-w-xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Sites que geram{" "}
            <span className="text-white/55">resultados reais.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
            Desenvolvimento de sites modernos, rápidos e profissionais para
            transformar a presença digital do seu negócio.
          </p>

          {/* Ações principais */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contato"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm
              font-semibold text-navy-950 transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Quero meu site
            </a>

            <a
              href="#projetos"
              className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-white/70 transition hover:text-white"
            >
              Ver projetos
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Retrato profissional */}
        <div className="relative flex items-end justify-center lg:h-155 lg:justify-end">
          <div className="relative h-115 w-full max-w-105 overflow-hidden rounded-t-[12rem] border border-white/10 bg-navy-800 sm:h-135 lg:h-147.5 lg:max-w-115">
            <Image
              src="/images/filipe-albuquerque.png"
              alt="Filipe Brito Albuquerque"
              fill
              priority
              sizes="(max-width: 1024px) 420px, 460px"
              className="object-cover object-top"
            />

            {/* Gradiente inferior da imagem */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-navy-950/80 to-transparent" />

            {/* Assinatura visual */}
            <div className="absolute bottom-8 left-1.5 hidden border-l border-white/20 pl-5 lg:block">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                Engenharia
              </p>

              <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white/70">
                Tecnologia
              </p>

              <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white">
                Resultado
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
