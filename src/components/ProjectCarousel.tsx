"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
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
  const instructionsId = useId();
  const slidesId = useId();
  const [navigation, setNavigation] = useState<{
    index: number;
    direction: "next" | "previous" | null;
  }>({ index: 0, direction: null });
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);

  if (projects.length === 0) return null;

  function move(direction: "next" | "previous") {
    setNavigation((current) => ({
      index: (current.index + (direction === "next" ? 1 : -1) + projects.length) % projects.length,
      direction,
    }));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowRight" ? "next" : "previous");
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || (event.pointerType !== "touch" && event.pointerType !== "pen")) return;
    if (event.target instanceof Element && event.target.closest("a, button")) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const threshold = Math.max(36, Math.min(80, event.currentTarget.clientWidth * 0.12));
    if (Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.3) {
      move(dx < 0 ? "next" : "previous");
    }
  }

  const currentProject = projects[navigation.index];
  const currentNumber = String(navigation.index + 1).padStart(2, "0");
  const total = String(projects.length).padStart(2, "0");

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Projetos conceito"
      aria-describedby={instructionsId}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`relative mt-section-gap min-w-0 border-t border-ink/20 pt-6 ${styles.carousel}`}
    >
      <p id={instructionsId} className="sr-only">
        Use as setas esquerda e direita para navegar entre os projetos. No touch, deslize horizontalmente.
      </p>

      <div
        id={slidesId}
        className={styles.viewport}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { gesture.current = null; }}
      >
        <div className={styles.slides}>
          {projects.map((project, index) => (
            <article
              key={project.code}
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${projects.length}: ${project.area}`}
              aria-hidden={index !== navigation.index}
              inert={index !== navigation.index}
              data-direction={navigation.direction ?? undefined}
              className={styles.slide}
            >
              <div data-motion="reveal">
                <h3 className="text-project-title font-medium leading-[1.15] tracking-[-0.04em]">
                  {project.code} - {project.area}
                </h3>
                <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-6">
                  <span className="font-medium uppercase tracking-[0.12em] text-moss">Projeto conceito</span>
                  <span aria-hidden="true" className="text-ink/40">·</span>
                  <span className="text-ink/60">{project.type}</span>
                </p>
              </div>

              <div
                data-motion="project"
                className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden border border-ink/15 bg-ink/[0.03] sm:aspect-[2/1] lg:aspect-[3/1]"
              >
                {project.image ? (
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(min-width: 1352px) 1240px, (min-width: 1280px) calc(100vw - 112px), (min-width: 1024px) calc(100vw - 80px), calc(100vw - 48px)"
                    className="object-cover"
                  />
                ) : (
                  <p className="text-sm text-ink/65">Imagem do projeto</p>
                )}
              </div>

              <div data-motion="reveal" data-motion-delay="60" className="pb-1 lg:pr-56">
                <p className="max-w-[50ch] text-lead leading-[1.6] text-ink/75">{project.phrase}</p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver projeto ${project.area} (abre em nova aba)`}
                    className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-moss hover:text-ink focus-visible:text-moss"
                  >
                    Ver projeto ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div data-motion="reveal" data-motion-delay="60" className="mt-5 flex items-center justify-between gap-4 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:justify-end lg:gap-6">
        <button
          type="button"
          onClick={() => move("previous")}
          aria-label="Projeto anterior"
          aria-controls={slidesId}
          disabled={projects.length < 2}
          className={`flex size-11 items-center justify-center border border-ink/20 text-xl text-moss hover:border-moss focus-visible:border-moss disabled:opacity-40 ${styles.control}`}
        >
          <span aria-hidden="true">←</span>
        </button>
        <span aria-hidden="true" className="text-sm tabular-nums text-ink/60">
          <span className="text-moss">{currentNumber}</span> / {total}
        </span>
        <button
          type="button"
          onClick={() => move("next")}
          aria-label="Próximo projeto"
          aria-controls={slidesId}
          disabled={projects.length < 2}
          className={`flex size-11 items-center justify-center border border-ink/20 text-xl text-moss hover:border-moss focus-visible:border-moss disabled:opacity-40 ${styles.control}`}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {navigation.direction && `Projeto ${currentNumber} de ${total}: ${currentProject.code} - ${currentProject.area}. ${currentProject.phrase}`}
      </p>
    </div>
  );
}
