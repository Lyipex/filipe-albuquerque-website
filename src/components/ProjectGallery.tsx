"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import ConceptPreview from "./ConceptPreview";
import ActionLink from "./ActionLink";
import type { Project } from "./ProjectCarousel";
import styles from "./ProjectGallery.module.css";

const covers = {
  eyewear: "/images/preview-oculos-kaboompics.jpg",
  architecture: "/images/preview-arquitetura.jpg",
  marketing: "/images/preview-studio-marketing.svg",
  podiatry: "/images/CLINICAL-PE-PODOLOGIA-2.webp",
};

export default function ProjectGallery({ projects }: { projects: readonly Project[] }) {
  const id = useId();
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(null);
  const dragged = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState(0);
  const [exploring, setExploring] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const exploreButton = useRef<HTMLButtonElement>(null);
  const project = projects[active];
  if (!project) return null;

  function goTo(index: number) {
    const next = Math.max(0, Math.min(projects.length - 1, index));
    const element = track.current?.children[next] as HTMLElement | undefined;
    if (element && track.current) track.current.scrollTo({ left: element.offsetLeft - (track.current.children[0] as HTMLElement).offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    setExploring(false);
  }

  function closePreview() {
    setExploring(false);
    exploreButton.current?.focus({ preventScroll: true });
  }

  return (
    <div className={styles.carousel} role="region" aria-roledescription="carrossel" aria-label="Projetos em destaque">
      <div className={styles.topline}>
        <span>Seleção de projetos</span>
        <span className={styles.counter} aria-live="polite"><strong>{String(active + 1).padStart(2, "0")}</strong><span>/ {String(projects.length).padStart(2, "0")}</span></span>
      </div>
      <div ref={track} id={`${id}-track`} className={styles.track} tabIndex={0} data-dragging={dragging}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          event.preventDefault();
          dragged.current = false;
          drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const distance = event.clientX - drag.current.x;
          if (Math.abs(distance) > 5) drag.current.moved = true;
          event.currentTarget.scrollLeft = drag.current.scroll - distance;
        }}
        onPointerUp={(event) => {
          if (!drag.current) return;
          const wasDragged = drag.current.moved;
          dragged.current = wasDragged;
          drag.current = null;
          setDragging(false);
          event.currentTarget.releasePointerCapture(event.pointerId);
          const items = track.current?.children;
          if (wasDragged && items?.length && items.length > 1) {
            const distance = (items[1] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft;
            const nearest = Math.round((track.current?.scrollLeft ?? 0) / distance);
            goTo(nearest);
          } else {
            const slide = document.elementFromPoint(event.clientX, event.clientY)?.closest("article");
            if (slide && items) goTo(Array.from(items).indexOf(slide));
          }
        }}
        onPointerCancel={() => { drag.current = null; setDragging(false); }}
        onLostPointerCapture={() => { drag.current = null; setDragging(false); }}
        onClickCapture={(event) => { if (dragged.current) { event.preventDefault(); event.stopPropagation(); dragged.current = false; } }}
        onKeyDown={(event) => {
          if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            goTo(event.key === "Home" ? 0 : projects.length - 1);
          }
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(active + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        onScroll={() => {
          if (!track.current) return;
          const items = Array.from(track.current.children) as HTMLElement[];
          const nearest = items.reduce((best, item, index) => Math.abs(item.offsetLeft - items[0].offsetLeft - track.current!.scrollLeft) < Math.abs(items[best].offsetLeft - items[0].offsetLeft - track.current!.scrollLeft) ? index : best, 0);
          if (nearest !== active) { setActive(nearest); setExploring(false); }
        }}
      >
        {projects.map((item, index) => {
          const src = item.image?.src ?? (item.concept ? covers[item.concept] : null);
          return <article key={item.code} className={styles.slide} data-kind={item.concept} data-active={index === active} aria-label={`${index + 1} de ${projects.length}: ${item.area}`} aria-roledescription="slide">
            <button type="button" className={styles.artwork} aria-label={`Selecionar projeto: ${item.area}`} onClick={() => goTo(index)} tabIndex={index === active ? -1 : 0}>
              {src && <Image src={src} alt={item.image?.alt ?? `Referência visual: ${item.area}`} fill sizes="(min-width: 768px) 75vw, 90vw" className={styles.cover} draggable={false} />}
              {item.concept === "marketing" && <div className={styles.studioCover} aria-hidden="true"><span>studio.</span><p>Ideias claras.<br /><em>Marcas presentes.</em></p><small>Estratégia & comunicação</small></div>}
              <span className={styles.imageIndex} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.imageLabel} aria-hidden="true">{item.type}</span>
            </button>
          </article>;
        })}
      </div>
      <div className={styles.controls}>
        <div className={styles.index} aria-label="Escolher projeto">
          {projects.map((item, index) => <button key={item.code} type="button" aria-label={`Ir para projeto ${index + 1}: ${item.area}`} aria-current={index === active ? "true" : undefined} onClick={() => goTo(index)}><span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true" /></button>)}
        </div>
        <div className={styles.arrows}>
          <button type="button" aria-label="Projeto anterior" aria-controls={`${id}-track`} disabled={active === 0} onClick={() => goTo(active - 1)}>←</button>
          <button type="button" aria-label="Próximo projeto" aria-controls={`${id}-track`} disabled={active === projects.length - 1} onClick={() => goTo(active + 1)}>→</button>
        </div>
      </div>
      <div className={styles.caption}>
        <div className={styles.projectHeading}>
          <h3 key={project.code} className={styles.reveal}>{project.area}</h3>
          <p className={styles.status}>{project.identification ?? "Prévia ilustrativa"}</p>
        </div>
        <div className={styles.projectInfo}>
          <p key={project.code} className={styles.reveal}>{project.phrase}</p>
          <div className={styles.links}>
            {(project.concept || project.image) && <button ref={exploreButton} type="button" aria-expanded={exploring} aria-controls={`${id}-preview`} onClick={() => {
              if (exploring) closePreview();
              else { setExploring(true); requestAnimationFrame(() => preview.current?.focus({ preventScroll: true })); }
            }}>{exploring ? "Fechar prévia" : "Explorar projeto"}<span aria-hidden="true">{exploring ? "−" : "↗"}</span></button>}
            <ActionLink href="#contato" variant="secondary">Conversar sobre meu projeto <span aria-hidden="true">↗</span></ActionLink>
            {project.url && <ActionLink href={project.url} target="_blank" rel="noopener noreferrer" variant="secondary">Ver site ↗</ActionLink>}
          </div>
          {project.credit && <p className={styles.credit}>Foto de referência: <a href={project.credit.url} target="_blank" rel="noopener noreferrer">{project.credit.name} / {project.credit.platform ?? "Unsplash"}</a></p>}
        </div>
      </div>
      {exploring && <div ref={preview} id={`${id}-preview`} className={styles.preview} tabIndex={0} role="region" aria-label={`Prévia ilustrativa de ${project.area}`} onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); closePreview(); } }}>
        {project.concept ? <ConceptPreview kind={project.concept} title={project.area} identification={project.identification} type={project.type} description={project.phrase} reading /> : project.image ? <Image src={project.image.src} alt={project.image.alt} width={project.image.width ?? 1440} height={project.image.height ?? 3000} className={styles.fullImage} /> : null}
      </div>}
    </div>
  );
}
