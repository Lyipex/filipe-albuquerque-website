"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./analogue.module.css";

const projects = [
  { area: "Saúde", code: "FA / 01", title: "Informação clara.\nCuidado próximo.", description: "Informação clara e um caminho simples até o atendimento.", focus: "Clareza e acolhimento", theme: "health", word: "Cuidar." },
  { area: "Café", code: "FA / 02", title: "Uma pausa.\nUma presença.", description: "Uma presença digital que traduz a atmosfera do espaço.", focus: "Atmosfera e identidade", theme: "coffee", word: "Pausa." },
  { area: "Serviços profissionais", code: "FA / 03", title: "Seu trabalho.\nBem apresentado.", description: "Serviços apresentados de forma direta para facilitar o primeiro contato.", focus: "Confiança e objetividade", theme: "professional", word: "Precisão." },
] as const;

export default function ProjectStudio() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[active];

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % projects.length;
    else if (event.key === "ArrowLeft") next = (index + projects.length - 1) % projects.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = projects.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className={styles.studio}>
      <div className={styles.studioNavigation}>
        <div role="tablist" aria-label="Projetos conceito" className={styles.tabs}>
          {projects.map((item, index) => (
            <button key={item.code} ref={(node) => { tabs.current[index] = node; }} role="tab" id={`${id}-tab-${index}`} aria-selected={active === index} aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => navigate(event, index)}>{item.area}</button>
          ))}
        </div>
        <span className={styles.studyLabel}>Explorações visuais</span>
      </div>
      {projects.map((item, index) => (
        <div key={item.code} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0} className={styles.projectPanel}>
          {active === index && (
            <div className={`${styles.projectArtwork} ${styles[item.theme]}`}>
              <div className={styles.artworkTop}><span>{item.area}</span><span>{item.code}</span></div>
              <p className={styles.artworkTitle}>{item.title.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
              <span className={styles.artworkWord} aria-hidden="true">{item.word}</span>
              <div className={styles.artworkBottom}><span>Site institucional</span><span>Estudo de direção visual</span></div>
            </div>
          )}
        </div>
      ))}
      <div className={styles.projectCaption} aria-live="polite" aria-atomic="true">
        <div><h3>{project.area}</h3><p>{project.description}</p></div>
        <div><span>Projeto conceito</span><p>{project.focus}</p></div>
      </div>
    </div>
  );
}
