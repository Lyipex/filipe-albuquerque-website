export default function Hero() {
  return (
    <section id="inicio" className="min-h-dvh bg-paper text-ink">
      <div className="mx-auto flex min-h-dvh max-w-[1440px] flex-col px-6 pb-12 pt-36 sm:pb-16 sm:pt-40
      lg:px-10 lg:pt-44 xl:px-14">
        <p className="text-sm font-medium text-ink/50">Nº 01 - Capa</p>

        <h1 className="mt-8 max-w-[1160px] text-[clamp(2.75rem,5.7vw,5.25rem)] font-medium leading-[1.08]
        tracking-[-0.045em] text-balance sm:mt-10">
          Um bom site explica o seu negócio{" "}
          <span className="font-editorial font-normal italic tracking-normal">antes</span>{" "}
          da primeira conversa.
        </h1>

        <div className="mt-16 w-full max-w-[640px] lg:mt-auto lg:ml-auto lg:pt-20">
          <p className="text-base leading-7 text-ink/80 sm:text-lg sm:leading-8">
            Desenvolvo landing pages e sites profissionais que apresentam sua empresa
            com clareza, fortalecem sua presença digital e ajudam a transformar
            visitantes em oportunidades de negócio.
          </p>

          <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-3 bg-ink px-6 py-3.5 text-sm
              font-semibold text-paper transition-colors hover:bg-moss focus-visible:outline-2
              focus-visible:outline-offset-3 focus-visible:outline-moss"
            >
              Quero falar sobre meu projeto <span aria-hidden="true">↗</span>
            </a>

            <a
              href="#projetos"
              className="text-sm font-medium text-ink/80 transition-colors hover:text-moss
              focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-moss"
            >
              Ver projetos ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
