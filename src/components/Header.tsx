import ActionLink from "./ActionLink";
import { navigationLinks } from "@/lib/site";
import MobileNavigation from "./MobileNavigation";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        <a
          href="#sobre"
          className={styles.brand}
          aria-label="Filipe Brito Albuquerque - Sobre"
        >
          <span className={styles.brandCopy}>
          <span className="text-brand font-semibold uppercase tracking-brand">
            Filipe Brito Albuquerque
          </span>

          <span className="mt-1.5 text-brand-caption font-medium uppercase tracking-brand-caption opacity-60">
            Sites e soluções digitais
          </span>
          </span>
        </a>

        <nav
          className="ml-auto hidden items-center gap-8 text-nav font-medium lg:flex"
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
