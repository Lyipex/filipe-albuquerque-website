"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import ActionLink from "./ActionLink";
import styles from "./ProjectCarousel.module.css";

export type Project = {
  code: string;
  area: string;
  type: string;
  phrase: string;
  image?: { src: string; alt: string };
  url?: string;
};

export default function ProjectCarousel({ projects }: { projects: readonly Project[] }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("next");
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const viewportId = useId();

  if (!projects.length) return null;

  function move(step: number) {
    setDirection(step > 0 ? "next" : "previous");
    setActive((current) => (current + step + projects.length) % projects.length);
  }

  return (
    <div
      className={`${styles.carousel} mt-8`}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Estudos de projetos"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <div
        id={viewportId}
        className={styles.viewport}
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
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        <div className={styles.slides}>
          {projects.map((project, index) => (
            <article
              key={project.code}
              data-project-id={project.code}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${projects.length}: ${project.area}`}
              aria-hidden={index !== active}
              inert={index !== active}
              data-direction={direction}
            >
              <div className={styles.visual}>
                {project.image ? (
                  <Image src={project.image.src} alt={project.image.alt} fill sizes="(min-width: 1400px) 1240px, 100vw" className="object-cover" />
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.code}>{project.code}</span>
                    <p className={styles.area}>{project.area}</p>
                    <p className={styles.assetNote}>Estudo de site institucional · apresentação visual em preparação</p>
                  </div>
                )}
              </div>
              <div className={styles.caption}>
                <div>
                  <p className="text-xs uppercase tracking-label text-moss">Projeto conceito</p>
                  <h3 className="mt-3 text-project-title font-medium leading-heading tracking-title">{project.area}</h3>
                  <p className="mt-3 text-sm">{project.type}</p>
                </div>
                <div>
                  <p className="max-w-[52ch] text-body leading-copy">{project.phrase}</p>
                  {project.url && <ActionLink href={project.url} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-4" aria-label={`Ver projeto ${project.area} (abre em nova aba)`}>Ver projeto <span aria-hidden="true">↗</span></ActionLink>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.navigation}>
        <p aria-live="polite" aria-atomic="true" className="text-sm">
          {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          <span className="sr-only"> - {projects[active].area}</span>
        </p>
        {projects.length > 1 && <div className="flex gap-3">
          <button type="button" className={styles.control} aria-label="Projeto anterior" aria-controls={viewportId} onClick={() => move(-1)}><span aria-hidden="true">←</span></button>
          <button type="button" className={styles.control} aria-label="Próximo projeto" aria-controls={viewportId} onClick={() => move(1)}><span aria-hidden="true">→</span></button>
        </div>}
      </div>
    </div>
  );
}
