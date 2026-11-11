import ActionLink from "./ActionLink";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="inicio" tabIndex={-1} aria-labelledby="inicio-title" className={styles.hero}>
      <div className={`${styles.layout} mx-auto max-w-editorial`}>
        <h1 id="inicio-title" data-motion="hero" data-motion-delay="70" className={styles.heading}>
          <span>Sites para empresas</span>{" "}<span>e profissionais.</span>
        </h1>
        <div data-motion="hero" data-motion-delay="140" className={styles.bottom}>
          <p className={styles.description}>Seu site deve apresentar seu trabalho com clareza e facilitar o contato com seus clientes. Antes de desenvolver, procuro entender seu negócio e o que você precisa comunicar.</p>
          <div className={styles.actions}>
            <ActionLink href="#contato" variant="primary">Vamos conversar <span aria-hidden="true">↗</span></ActionLink>
            <ActionLink href="#projetos" variant="secondary">Ver projetos <span aria-hidden="true">↓</span></ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
