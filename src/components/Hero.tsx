export default function Hero() {
  return (
    <section id="inicio" className="min-h-[min(100dvh,56rem)] bg-paper px-6 text-ink lg:px-10 xl:px-14">
      <div className="mx-auto flex min-h-[min(100dvh,56rem)] max-w-editorial flex-col pb-12 pt-32 sm:pb-16 sm:pt-36 lg:pt-40">
        <p className="text-sm font-medium text-ink/60">Nº 01 - Capa</p>

        <h1 className="mt-8 max-w-[1100px] text-display font-medium leading-[1.08]
        tracking-[-0.045em] text-balance sm:mt-10">
          Um bom site explica o seu negócio{" "}
          <span className="font-editorial font-normal italic tracking-normal">antes</span>{" "}
          da primeira conversa.
        </h1>

        <div className="mt-16 w-full max-w-[60ch] lg:mt-auto lg:ml-auto lg:pt-16">
          <p className="text-body leading-[1.75] text-ink/80">
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
              className="inline-flex min-h-11 items-center text-sm font-medium text-ink/80 transition-colors lg:min-h-0 hover:text-moss
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
