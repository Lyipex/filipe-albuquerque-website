"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import ActionLink from "./ActionLink";
import ConceptPreview from "./ConceptPreview";
import styles from "./ProjectCarousel.module.css";

export type Project = {
  code: string;
  area: string;
  type: string;
  phrase: string;
  image?: { src: string; alt: string; width?: number; height?: number };
  concept?: "eyewear" | "architecture";
  credit?: { name: string; url: string };
  url?: string;
};

export default function ProjectCarousel({ projects }: { projects: readonly Project[] }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("next");
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const viewportId = useId();
  const hintId = useId();
  const previewRefs = useRef<(HTMLElement | null)[]>([]);

  if (!projects.length) return null;

  function move(step: number) {
    setDirection(step > 0 ? "next" : "previous");
    previewRefs.current.forEach((preview) => { if (preview) preview.scrollTop = 0; });
    setActive((current) => (current + step + projects.length) % projects.length);
  }

  return (
    <div
      className={`${styles.carousel} mt-8`}
      role="region" aria-roledescription="carrossel" aria-label="Prévias de projetos" tabIndex={0}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <div className={styles.navigation}>
        <p aria-live="polite" aria-atomic="true" className="text-sm">
          {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          <span className="sr-only"> - {projects[active].area}</span>
        </p>
        <p id={hintId} className={styles.hint}><span className={styles.desktopHint}>Passe o cursor para ampliar. Role dentro da prévia para explorar.</span><span className={styles.touchHint}>Deslize dentro da prévia para explorar. Use as setas para trocar de projeto.</span></p>
        {projects.length > 1 && <div className={styles.controls}>
          <button type="button" className={styles.control} aria-label="Projeto anterior" aria-controls={viewportId} onClick={() => move(-1)}><span aria-hidden="true">←</span></button>
          <button type="button" className={styles.control} aria-label="Próximo projeto" aria-controls={viewportId} onClick={() => move(1)}><span aria-hidden="true">→</span></button>
        </div>}
      </div>
      <div
        id={viewportId} className={styles.viewport}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchCancel={() => { touchStart.current = null; }}
        onTouchEnd={(event) => {
          if (!touchStart.current) return;
          const touch = event.changedTouches[0];
          const dx = touch.clientX - touchStart.current.x;
          const dy = touch.clientY - touchStart.current.y;
          if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        <div className={styles.slides}>
          {projects.map((project, index) => {
            const Frame = project.url ? "a" : "div";
            return (
              <div key={project.code} className={styles.slide} data-project-id={project.code} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${projects.length}: ${project.area}`} aria-hidden={index !== active} inert={index !== active} data-direction={direction}>
                <div className={styles.stage}>
                  <Frame
                    className={styles.previewFrame}
                    ref={(element: HTMLAnchorElement | HTMLDivElement | null) => { previewRefs.current[index] = element; }}
                    href={project.url} target={project.url ? "_blank" : undefined} rel={project.url ? "noopener noreferrer" : undefined}
                    tabIndex={0} role={project.url ? undefined : "region"}
                    aria-label={project.url ? `Ver site ${project.area} (abre em nova aba)` : `Prévia ilustrativa de ${project.area}, com rolagem`}
                    aria-describedby={hintId}
                  >
                    {project.concept ? <ConceptPreview kind={project.concept} /> : project.image ? (
                      <Image src={project.image.src} alt={project.image.alt} width={project.image.width ?? 1440} height={project.image.height ?? 3000} sizes="(min-width: 1400px) 1240px, 100vw" className={styles.screenshot} />
                    ) : <div className={styles.placeholder}><p>{project.area}</p><span>Prévia em preparação</span></div>}
                  </Frame>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.captions}>
        {projects.map((project, index) => (
          <div key={project.code} className={styles.caption} aria-hidden={index !== active} inert={index !== active}>
            <div>
              <p className="text-xs uppercase tracking-label text-moss">{project.concept ? "Prévia ilustrativa" : "Projeto"}</p>
              <h3 className="mt-3 text-project-title font-medium leading-heading tracking-title">{project.area}</h3>
              <p className="mt-3 text-sm">{project.type}</p>
            </div>
            <div>
              <p className="max-w-[52ch] text-body leading-copy">{project.phrase}</p>
              {project.credit && <p className="mt-3 text-xs leading-5 text-ink/80">Foto de referência: <a className="underline underline-offset-4" href={project.credit.url} target="_blank" rel="noopener noreferrer">{project.credit.name} / Unsplash<span className="sr-only"> (abre em nova aba)</span></a></p>}
              {project.url && <ActionLink href={project.url} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-4" aria-label={`Ver site ${project.area} (abre em nova aba)`}>Ver site <span aria-hidden="true">↗</span></ActionLink>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
