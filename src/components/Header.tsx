export default function Header() {
  return (
    // ========================================
    // HEADER
    // Navegação principal do site
    // ========================================

    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">

        {/* Identidade */}
        <a
          href="#inicio"
          className="flex items-center gap-4"
          aria-label="Filipe Brito Albuquerque - Início"
        >
          {/* Monograma */}
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-sm font-semibold text-white">
            FA
          </span>

          {/* Nome e especialidade */}
          <span className="hidden flex-col sm:flex">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Filipe Brito Albuquerque
            </span>

            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-white/45">
              Desenvolvimento Web
            </span>
          </span>
        </a>

        {/* Navegação principal */}
        <nav
          className="hidden items-center space-x-8 text-sm text-white/70 lg:flex"
          aria-label="Navegação principal"
        >
          <a className="transition hover:text-white" href="#inicio">
            Início
          </a>

          <a className="transition hover:text-white" href="#servicos">
            Serviços
          </a>

          <a className="transition hover:text-white" href="#projetos">
            Projetos
          </a>

          <a className="transition hover:text-white" href="#sobre">
            Sobre
          </a>

          <a className="transition hover:text-white" href="#faq">
            FAQ
          </a>
        </nav>

        {/* CTA */}
        <a
          href="#contato"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-950 transition hover:-translate-y-0.5 hover:bg-white/90"
        >
          Vamos conversar?
        </a>

      </div>
    </header>
  );
}