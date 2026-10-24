import ActionLink from "./ActionLink";
import { navigationLinks } from "@/lib/site";
import MobileNavigation from "./MobileNavigation";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-header items-center justify-between px-gutter py-7">

        <a
          href="#sobre"
          className="flex min-h-control flex-col justify-center"
          aria-label="Filipe Brito Albuquerque - Sobre"
        >
          <span className="text-brand font-semibold uppercase tracking-brand text-ink">
            Filipe Brito Albuquerque
          </span>

          <span className="mt-1.5 text-brand-caption font-medium uppercase tracking-brand-caption text-ink/80">
            Sites e soluções digitais
          </span>
        </a>

        <nav
          className="ml-auto hidden items-center gap-8 text-nav font-medium text-ink/80 lg:flex"
          aria-label="Navegação principal"
        >
          {navigationLinks.map((link) => (
            <ActionLink key={link.href} href={link.href} className={`text-nav ${styles.link}`}><span className={styles.underline}>{link.label}</span></ActionLink>
          ))}
        </nav>

        <MobileNavigation />
      </div>
    </header>
  );
}
