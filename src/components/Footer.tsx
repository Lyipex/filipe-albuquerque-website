import ActionLink from "./ActionLink";
import { contactHref, navigationLinks } from "@/lib/site";
import styles from "./Footer.module.css";

const services = [
  { href: "#landing-pages", label: "Landing pages" },
  { href: "#sites-institucionais", label: "Sites institucionais" },
  { href: "#redesign", label: "Redesign e melhorias" },
  { href: "#chatbots", label: "Chatbots" },
];

export default function Footer({ homePath = "" }: { homePath?: string }) {
  return (
    <div className="text-paper">
      <div className={styles.columns}>
        <nav aria-labelledby="footer-navigation-title">
          <h2 id="footer-navigation-title" className={styles.heading}>Navegue</h2>
          <ul className={styles.links}>
            <li><ActionLink tone="inverse" href={`${homePath}#inicio`}>Início</ActionLink></li>
            {navigationLinks.map((link) => <li key={link.href}><ActionLink tone="inverse" href={`${homePath}${link.href}`}>{link.label}</ActionLink></li>)}
          </ul>
        </nav>
        <nav aria-labelledby="footer-services-title">
          <h2 id="footer-services-title" className={styles.heading}>Serviços</h2>
          <ul className={styles.links}>
            {services.map((service) => <li key={service.href}><ActionLink tone="inverse" href={`${homePath}${service.href}`}>{service.label}</ActionLink></li>)}
          </ul>
        </nav>
        <div className={styles.contact}>
          <h2 className={styles.heading}>Fale comigo</h2>
          <div className={styles.links}>
            <ActionLink tone="inverse" href={contactHref} className={styles.email}>fbalbuquerque@proton.me</ActionLink>
            <ActionLink tone="inverse" href={`${homePath}#contato`} className="self-start">Solicitar orçamento <span aria-hidden="true">↗</span></ActionLink>
            <p className={styles.caption}>Desenvolvimento web e chatbots.</p>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2026 Filipe Brito Albuquerque.</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <ActionLink tone="inverse" href="/privacidade" className="text-xs">Privacidade</ActionLink>
          <ActionLink tone="inverse" href={`${homePath}#inicio`} className="text-xs">Voltar ao topo <span aria-hidden="true">↑</span></ActionLink>
        </div>
      </div>
    </div>
  );
}
