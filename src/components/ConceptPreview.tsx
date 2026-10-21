import Image from "next/image";
import styles from "./ProjectCarousel.module.css";

/** Temporary visual references, not screenshots of delivered client work. */
export default function ConceptPreview({ kind }: { kind: "eyewear" | "architecture" }) {
  const eyewear = kind === "eyewear";
  const src = eyewear ? "/images/preview-oculos.jpg" : "/images/preview-arquitetura.jpg";
  return (
    <div className={`${styles.concept} ${eyewear ? styles.eyewear : styles.architecture}`} aria-hidden="true">
      <div className={styles.mockHeader}>
        <span>{eyewear ? "ÓTICA / ESTUDO" : "ARQUITETURA / ESTUDO"}</span>
        <span>{eyewear ? "Coleções · Sobre · Contato" : "Projetos · Escritório · Contato"}</span>
      </div>
      <div className={styles.mockHero}>
        <Image src={src} alt="" width={1600} height={1068} sizes="(min-width: 1400px) 1240px, 100vw" className={styles.heroPhoto} />
        <div className={styles.mockHeroCopy}>
          <span>{eyewear ? "ÓCULOS DE GRAU & SOL" : "RESIDÊNCIAS & INTERIORES"}</span>
          <p>{eyewear ? <>Um novo<br />ponto de vista.</> : <>Espaços<br />para viver.</>}</p>
          <span className={styles.mockCta}>{eyewear ? "Conhecer a coleção" : "Conhecer os projetos"} ↗</span>
        </div>
      </div>
      <div className={styles.mockContent}>
        <div className={styles.mockSectionHeading}>
          <p>{eyewear ? "Formas de olhar." : "Luz, forma e espaço."}</p>
          <span>{eyewear ? "Uma referência para a apresentação do catálogo." : "Uma referência para a apresentação dos projetos."}</span>
        </div>
        <div className={styles.mockGrid}>
          {(eyewear ? ["Armações", "Detalhes", "Coleção"] : ["Residencial", "Materiais", "Detalhes"]).map((label, index) => (
            <div key={label}>
              <Image src={src} alt="" width={800} height={800} sizes="(min-width: 768px) 33vw, 50vw" className={`${styles.cardPhoto} ${index === 1 ? styles.detailPhoto : ""}`} />
              <p>{label} <span>↗</span></p>
            </div>
          ))}
        </div>
        <div className={styles.mockClosing}>
          <p>{eyewear ? "Escolhas que fazem parte do dia." : "Cada projeto começa com uma conversa."}</p>
          <span>Prévia ilustrativa. Conteúdo e fotografias de referência.</span>
        </div>
      </div>
    </div>
  );
}
