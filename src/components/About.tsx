import Portrait from "./Portrait";
import ActionLink from "./ActionLink";
import styles from "./About.module.css";
import AboutTextMotion from "./AboutTextMotion";

export default function About() {
  return (
    <section id="sobre" tabIndex={-1} aria-labelledby="sobre-title" className="bg-paper px-gutter py-section text-ink">
      <div className="mx-auto max-w-editorial">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-moss">Nº 04 - Sobre</p>
        <div className="mt-10 grid items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
          <div data-motion="reveal" className="w-full max-w-[420px]"><Portrait /></div>
          <AboutTextMotion>
            <div data-about-item className={styles.item}><h2 id="sobre-title" className={`text-display font-medium leading-heading tracking-heading lg:text-[clamp(3rem,1.5rem_+_5vw,6.25rem)]`}>Prazer, Filipe.</h2></div>
            <div data-about-item className={`${styles.item} mt-7`}><p className={`max-w-[42ch] text-lead leading-copy`}>Sou engenheiro de produção e gestor de projetos. Minha experiência com planejamento, organização de processos e desenvolvimento de ferramentas digitais me ensinou a olhar para cada projeto com atenção às pessoas e aos detalhes.</p></div>
            <div data-about-item className={`${styles.item} mt-5`}><p className={`max-w-[52ch] text-body leading-copy text-ink/80`}>Hoje, levo essa vivência para a criação de sites. Gosto de entender a história de cada negócio, conversar sobre suas necessidades e construir soluções que façam sentido para quem vai utilizá-las.</p></div>
            <div data-about-item className={`${styles.item} mt-8`}><ActionLink href="#contato" variant="secondary">Vamos conversar sobre seu projeto <span aria-hidden="true">↗</span></ActionLink></div>
          </AboutTextMotion>
        </div>
      </div>
    </section>
  );
}
