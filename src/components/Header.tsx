import ActionLink from "./ActionLink";
import { navigationLinks } from "@/lib/site";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-header items-center justify-between px-gutter py-7">

        <a
          href="#inicio"
          className="flex min-h-control flex-col justify-center"
          aria-label="Filipe Brito Albuquerque - Início"
        >
          <span className="text-brand font-semibold uppercase tracking-brand text-ink">
            Filipe Brito Albuquerque
          </span>

          <span className="mt-1.5 text-brand-caption font-medium uppercase tracking-brand-caption text-ink/80">
            Desenvolvimento Web
          </span>
        </a>

        <nav
          className="hidden items-center gap-8 text-nav font-medium text-ink/80 lg:flex"
          aria-label="Navegação principal"
        >
          {navigationLinks.map((link) => (
            <ActionLink key={link.href} href={link.href} className="text-nav">{link.label}</ActionLink>
          ))}
        </nav>

        <ActionLink
          variant="secondary"
          href="#contato"
          className="hidden gap-2 border-ink pb-1 text-nav text-ink sm:ml-auto sm:flex lg:ml-0"
        >
          Vamos conversar
          <span aria-hidden="true">↗</span>
        </ActionLink>

        <MobileNavigation />
      </div>
    </header>
  );
}