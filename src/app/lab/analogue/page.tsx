import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import ProjectStudio from "./ProjectStudio";
import Reveal from "./Reveal";
import styles from "./analogue.module.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });
export const metadata: Metadata = {
  title: "Marginália | Presença com propósito",
  description: "Design atento. Desenvolvimento preciso. Sites institucionais e landing pages por Filipe Brito Albuquerque.",
  robots: { index: false, follow: false },
};
const email = "mailto:fbalbuquerque@proton.me";
const services = [
  ["Landing pages", "Uma oferta, uma página, um próximo passo claro."],
  ["Sites institucionais", "Seu negócio e seus serviços bem apresentados."],
  ["Redesign e melhorias", "Mais clareza, usabilidade e responsividade para seu site."],
];

export default function AnalogueLab() {
  return (
    <div className={`${jakarta.className} ${styles.lab}`}>
      <a className={styles.skip} href="#lab-conteudo">Pular para o conteúdo</a>
      <header className={styles.header}>
        <a href="#lab-inicio" className={styles.wordmark} aria-label="Marginália, início">marginália</a>
        <nav aria-label="Navegação principal" className={styles.navigation}>
          <a href="#lab-projetos">Projetos</a>
          <a href="#lab-sobre">Sobre + serviços</a>
        </nav>
        <a className={styles.headerContact} href="#lab-contato">Vamos conversar <span aria-hidden="true">↗</span></a>
      </header>
      <main id="lab-conteudo" tabIndex={-1}>
        <section className={styles.hero} id="lab-inicio" aria-labelledby="lab-titulo">
          <div className={styles.heroImage}>
            <Image src="/images/filipe-albuquerque.png" alt="Retrato de Filipe Brito Albuquerque" fill sizes="(max-width: 767px) 100vw, 65vw" preload />
          </div>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Design atento. Desenvolvimento preciso.</p>
            <h1 id="lab-titulo">Presença.<br /><span>Com propósito.</span></h1>
            <p className={styles.heroDescription}>Sites institucionais e landing pages para negócios que valorizam uma boa presença digital.</p>
            <a href="#lab-projetos" className={styles.lightButton}>Conheça os projetos <span aria-hidden="true">↗</span></a>
          </div>
          <p className={styles.heroSignature}>Filipe Brito Albuquerque<span>Desenvolvimento web independente</span></p>
        </section>

        <section id="lab-projetos" className={styles.projects} aria-labelledby="lab-projetos-titulo">
          <Reveal className={styles.projectIntro}>
            <h2 id="lab-projetos-titulo">Um olhar.<br /><span>Outras possibilidades.</span></h2>
            <p>Três contextos para explorar o que uma presença digital pode ser. Estudos de sites institucionais, sem vínculo com clientes reais.</p>
          </Reveal>
          <ProjectStudio />
        </section>

        <section id="lab-sobre" className={styles.about} aria-labelledby="lab-sobre-titulo">
          <Reveal className={styles.aboutStatement}>
            <h2 id="lab-sobre-titulo">O cuidado aparece<br />nos detalhes.</h2>
            <p>Na escolha de uma palavra.<br />No espaço entre os elementos.<br />No caminho até o primeiro contato.</p>
          </Reveal>
          <div className={styles.aboutGrid}>
            <figure className={styles.portrait}>
              <Image src="/images/filipe-albuquerque-pb.png" alt="Filipe Brito Albuquerque em fotografia de corpo inteiro" width={1068} height={1600} sizes="(max-width: 767px) calc(100vw - 40px), 40vw" />
              <figcaption>Filipe Brito Albuquerque</figcaption>
            </figure>
            <Reveal className={styles.aboutCopy}>
              <p className={styles.bioLead}>Clareza no processo.<br />Cuidado em cada detalhe.</p>
              <p>Sou Filipe Brito Albuquerque. Atuo em desenvolvimento web, criando sites para empresas e profissionais. Minha formação em Engenharia de Produção e especialização em Gestão de Projetos orientam um trabalho organizado e atento ao negócio.</p>
              <div className={styles.services}>
                {services.map(([title, description], index) => (
                  <details key={title} open={index === 0}>
                    <summary>{title}<span aria-hidden="true" /></summary>
                    <p>{description}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="lab-contato" className={styles.contact} aria-labelledby="lab-contato-titulo">
          <Reveal>
            <p className={styles.contactIntro}>Seu próximo projeto começa com uma conversa.</p>
            <h2 id="lab-contato-titulo">Vamos<br /><span>dar forma.</span></h2>
            <div className={styles.contactBottom}>
              <p>Conte sobre seu negócio<br />e o site que você precisa.</p>
              <a href={email} className={styles.lightButton}>Vamos conversar <span aria-hidden="true">↗</span></a>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className={styles.footer}>
        <a className={styles.footerBrand} href="#lab-inicio">marginália</a>
        <div className={styles.footerLinks}>
          <a href={email}>E-mail ↗</a>
          <Link href="/">Portfólio principal ↗</Link>
          <a href="#lab-inicio">Voltar ao topo ↑</a>
        </div>
        <p>© 2026 Filipe Brito Albuquerque.</p>
      </footer>
    </div>
  );
}
