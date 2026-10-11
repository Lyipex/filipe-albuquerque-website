export default function Footer() {
  return (
    <footer data-motion="reveal" className="text-paper">
      <div className="mx-auto max-w-editorial border-t border-paper/15 py-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Identidade */}
          <div>
            <p className="text-base font-medium">
              Filipe Brito Albuquerque
            </p>

            <p className="mt-1 text-sm text-paper/80">
              Desenvolvimento Web
            </p>
          </div>

          {/* Contato */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a
              href="mailto:fbalbuquerque@proton.me"
              className="inline-flex min-h-11 items-center text-paper/80 transition-colors duration-300 hover:text-paper"
            >
              E-mail ↗
            </a>

          </div>
        </div>

        {/* Rodapé final */}
        <div className="mt-4 flex flex-col gap-2 text-xs text-paper/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Filipe Brito Albuquerque.</p>

          <a
            href="#inicio"
            className="inline-flex min-h-11 items-center self-start transition-colors duration-300 hover:text-paper/70"
          >
            Voltar ao topo ↑
          </a>
        </div>
      </div>
    </footer>
  );
}