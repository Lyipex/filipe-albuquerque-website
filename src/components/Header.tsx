import MobileNavigation from "./MobileNavigation";

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-7 lg:px-10 xl:px-14">

        <a
          href="#inicio"
          className="flex min-h-11 flex-col justify-center lg:min-h-0"
          aria-label="Filipe Brito Albuquerque - Início"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
            Filipe Brito Albuquerque
          </span>

          <span className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.28em] text-ink/60">
            Desenvolvimento Web
          </span>
        </a>

        <nav
          className="hidden items-center gap-8 text-[13px] font-medium text-ink/70 lg:flex"
          aria-label="Navegação principal"
        >
          <a className="transition-colors hover:text-ink" href="#servicos">
            Serviços
          </a>

          <a className="transition-colors hover:text-ink" href="#projetos">
            Projetos
          </a>

          <a className="transition-colors hover:text-ink" href="#sobre">
            Sobre
          </a>

          <a className="transition-colors hover:text-ink" href="#metodo">
            Método
          </a>

          <a className="transition-colors hover:text-ink" href="#processo">
            Processo
          </a>

          <a className="transition-colors hover:text-ink" href="#duvidas">
            Dúvidas
          </a>
        </nav>

        <a
          href="#contato"
          className="hidden items-center gap-2 border-b border-ink pb-1 text-[13px] font-semibold text-ink transition-colors hover:border-moss hover:text-moss sm:ml-auto sm:flex sm:min-h-11 lg:ml-0 lg:min-h-0"
        >
          Vamos conversar
          <span aria-hidden="true">↗</span>
        </a>

        <MobileNavigation />
      </div>
    </header>
  );
}