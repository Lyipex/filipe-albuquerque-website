import SectionLabel from "./SectionLabel";
import Portrait from "./Portrait";
import styles from "./About.module.css";
import AboutTextMotion from "./AboutTextMotion";

export default function About() {
  return (
    <section id="sobre" tabIndex={-1} aria-labelledby="sobre-title" className={`${styles.section} bg-paper px-gutter text-ink`}>
      <div className={`${styles.layout} mx-auto max-w-editorial`}>
        <SectionLabel className={styles.eyebrow}>Sobre</SectionLabel>
        <div className={styles.composition}>
          <div data-motion="reveal" className={styles.portrait}><Portrait /></div>
          <AboutTextMotion>
            <div data-about-item className={styles.item}><h2 id="sobre-title" className={styles.heading}>Prazer, Filipe.</h2></div>
            <div data-about-item className={`${styles.item} mt-7`}><p className={`max-w-[42ch] text-lead leading-copy`}>Sou engenheiro de produção e gestor de projetos. Minha experiência com planejamento, organização de processos e desenvolvimento de ferramentas digitais me ensinou a olhar para cada projeto com atenção às pessoas e aos detalhes.</p></div>
            <div data-about-item className={`${styles.item} mt-5`}><p className={`max-w-[52ch] text-body leading-copy text-ink/80`}>Hoje, levo essa vivência para a criação de sites. Gosto de entender a história de cada negócio, conversar sobre suas necessidades e construir soluções que façam sentido para quem vai utilizá-las.</p></div>
          </AboutTextMotion>
        </div>
      </div>
    </section>
  );
}
