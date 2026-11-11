"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import ActionLink from "./ActionLink";
import ConceptPreview from "./ConceptPreview";
import styles from "./ProjectCarousel.module.css";

export type Project = {
  code: string;
  identification?: string;
  area: string;
  type: string;
  phrase: string;
  image?: { src: string; alt: string; width?: number; height?: number };
  concept?: "eyewear" | "architecture" | "podiatry" | "marketing";
  credit?: { name: string; url: string; platform?: string };
  url?: string;
};

export default function ProjectCarousel({ projects }: { projects: readonly Project[] }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("next");
  const [exploring, setExploring] = useState(false);
  const [dragX, setDragX] = useState(0);
  const mouseStart = useRef<number | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const viewportId = useId();
  const hintId = useId();
  const previewRefs = useRef<(HTMLElement | null)[]>([]);
  const explorationButtonRef = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<"preview" | "button" | null>(null);

  useLayoutEffect(() => {
    const target = pendingFocus.current === "preview" ? previewRefs.current[active]
      : pendingFocus.current === "button" ? explorationButtonRef.current : null;
    target?.focus({ preventScroll: true });
    pendingFocus.current = null;
  }, [active, exploring]);

  if (!projects.length) return null;

  const nextIndex = (active + 1) % projects.length;
  const nextProject = projects[nextIndex];
  const nextImage = nextProject.image?.src ?? (nextProject.concept === "architecture" ? "/images/preview-arquitetura.jpg" : nextProject.concept === "podiatry" ? "/images/CLINICAL-PE-PODOLOGIA-2.webp" : nextProject.concept === "eyewear" ? "/images/preview-oculos-kaboompics.jpg" : nextProject.concept === "marketing" ? "/images/preview-studio-marketing.svg" : null);
  const previewAvailable = !!(projects[active].concept || projects[active].image);

  function move(step: number) {
    if (step === 0) return;
    mouseStart.current = null;
    setDragX(0);
    // Transfer focus only when its slide or caption is about to become inert.
    const nextProject = projects[(active + step + projects.length) % projects.length];
    const explorationControlWillDisappear = document.activeElement === explorationButtonRef.current
      && !nextProject.concept && !nextProject.image;
    if (document.activeElement?.closest('[aria-hidden="false"]') || explorationControlWillDisappear) pendingFocus.current = "preview";
    setExploring(false);
    setDirection(step > 0 ? "next" : "previous");
    touchStart.current = null;
    previewRefs.current.forEach((preview) => preview?.scrollTo({ top: 0, left: 0, behavior: "instant" }));
    setActive((current) => (current + step + projects.length) % projects.length);
  }

  function stopExploring() {
    pendingFocus.current = "button";
    touchStart.current = null;
    previewRefs.current[active]?.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setExploring(false);
  }

  return (
    <div
      className={styles.carousel}
      data-direction={direction}
      role="region" aria-roledescription="carrossel" aria-label="Prévias de projetos" tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Escape" && exploring) {
          event.preventDefault();
          event.stopPropagation();
          stopExploring();
          return;
        }
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        // On mobile, arrow keys inside the enlarged canvas pan it instead of changing slides.
        if (exploring && window.matchMedia("(max-width: 47.999rem)").matches
          && event.target instanceof Node && previewRefs.current[active]?.contains(event.target)) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <div
        id={viewportId} className={styles.viewport} data-exploring={exploring}
        data-dragging={dragX !== 0}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0 || exploring
            || (event.target as Element).closest("button, a")) return;
          mouseStart.current = event.clientX;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (mouseStart.current === null) return;
          setDragX(Math.max(-100, Math.min(100, (event.clientX - mouseStart.current) * 0.6)));
        }}
        onPointerUp={(event) => {
          if (mouseStart.current === null) return;
          const distance = event.clientX - mouseStart.current;
          mouseStart.current = null;
          setDragX(0);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          if (Math.abs(distance) > 65) move(distance < 0 ? 1 : -1);
        }}
        onPointerCancel={() => { mouseStart.current = null; setDragX(0); }}
        onDragStart={(event) => { if (!exploring) event.preventDefault(); }}
        onTouchStart={(event) => {
          if (exploring && window.matchMedia("(max-width: 47.999rem)").matches) {
            touchStart.current = null;
            return;
          }
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
        <div className={styles.activeCanvas} style={{ transform: `translateX(${dragX}px)` }}>
          <div className={styles.explorationBar}>
            <p id={hintId} className="text-xs leading-5 text-moss" role="status">{!previewAvailable ? "Prévia em preparação" : exploring ? "Role a prévia. Saia pelo botão ou Escape." : "Ative para rolar dentro da prévia."}</p>
            {previewAvailable && <button
              ref={explorationButtonRef} type="button" className={styles.explorationButton}
              aria-pressed={exploring} aria-controls={`${viewportId}-preview-${active}`}
              onClick={() => {
                if (exploring) stopExploring();
                else {
                  touchStart.current = null;
                  pendingFocus.current = "preview";
                  setExploring(true);
                }
              }}
            >{exploring ? "Sair da prévia" : "Explorar prévia"}<span aria-hidden="true">↗</span></button>}
          </div>
          <div className={styles.slides}>
            {projects.map((project, index) => {
              const Frame = project.url ? "a" : "div";
              return (
                <div key={project.code} className={styles.slide} data-project-id={project.code} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${projects.length}: ${project.area}`} aria-hidden={index !== active} inert={index !== active} data-direction={direction}>
                  <div className={styles.stage}>
                    <Frame
                      className={styles.previewFrame}
                      id={`${viewportId}-preview-${index}`}
                      data-exploring={exploring && index === active}
                      ref={(element: HTMLAnchorElement | HTMLDivElement | null) => { previewRefs.current[index] = element; }}
                      href={project.url} target={project.url ? "_blank" : undefined} rel={project.url ? "noopener noreferrer" : undefined}
                      tabIndex={0} role={project.url ? undefined : "region"}
                      aria-label={project.url ? `Ver site ${project.area} (abre em nova aba)` : `Prévia ilustrativa de ${project.area}`}
                      aria-describedby={hintId}
                    >
                      <div className={styles.previewContent}>
                        {project.concept ? <ConceptPreview kind={project.concept} title={project.area} identification={project.identification} type={project.type} description={project.phrase} /> : project.image ? (
                          <Image src={project.image.src} alt={project.image.alt} width={project.image.width ?? 1440} height={project.image.height ?? 3000} sizes="(min-width: 1400px) 1240px, 100vw" className={styles.screenshot} />
                        ) : <div className={styles.placeholder}><p>{project.area}</p><span>Prévia em preparação</span></div>}
                      </div>
                    </Frame>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {projects.length > 1 && <button type="button" className={styles.nextCard} inert={exploring} onClick={() => move(1)} aria-label={`Ver próximo projeto: ${nextProject.area}`} aria-controls={viewportId}>
          <span className={styles.nextVisual}>{nextImage && <Image src={nextImage} alt="" fill sizes="(max-width: 767px) 18vw, 22vw" draggable={false} />}</span>
          <span className={styles.nextCardLabel}><span>A seguir</span><span aria-hidden="true">↗</span></span>
          <span className={styles.nextCardTitle}>{nextProject.area}</span>
        </button>}
      </div>
      <div className={styles.captions}>
        {projects.map((project, index) => (
          <div key={project.code} className={styles.caption} aria-hidden={index !== active} inert={index !== active}>
            <div>
              <p className="text-xs uppercase tracking-label text-moss">{project.identification ?? (project.concept ? "Prévia ilustrativa" : "Projeto")}</p>
              <h3 className="mt-3 text-project-title font-medium leading-heading tracking-title">{project.area}</h3>
              <p className="mt-3 text-sm">{project.type}</p>
            </div>
            <div>
              <p className="max-w-[52ch] text-body leading-copy">{project.phrase}</p>
              {project.credit && <p className="mt-3 text-xs leading-5 text-ink/80">Foto de referência: <a className="underline underline-offset-4" href={project.credit.url} target="_blank" rel="noopener noreferrer">{project.credit.name} / {project.credit.platform ?? "Unsplash"}<span className="sr-only"> (abre em nova aba)</span></a></p>}
              {project.url && <ActionLink href={project.url} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-4" aria-label={`Ver site ${project.area} (abre em nova aba)`}>Ver site <span aria-hidden="true">↗</span></ActionLink>}
              <ActionLink href="#contato" variant="secondary" className="mt-4">Conversar sobre meu projeto <span aria-hidden="true">↗</span></ActionLink>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footerNavigation}>
        <div className={styles.projectSelectors} role="group" aria-label="Escolher projeto">
          {projects.map((project, index) => <button key={project.code} type="button" className={styles.projectSelector} aria-pressed={active === index} aria-controls={viewportId} onClick={() => move(index - active)}>
            <span className={styles.selectorNumber}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.selectorTitle}>{project.concept === "eyewear" ? "Loja virtual" : project.area}</span>
            <span className={styles.selectorArrow} aria-hidden="true">↗</span>
          </button>)}
        </div>
        <div className={styles.navigation}>
          <p aria-live="polite" aria-atomic="true" className="text-sm">
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            <span className="sr-only"> - {projects[active].area}</span>
          </p>
          {projects.length > 1 && <div className={styles.controls}>
            <button type="button" className={styles.control} aria-label="Projeto anterior" aria-controls={viewportId} onClick={() => move(-1)}><span aria-hidden="true">←</span></button>
            <button type="button" className={styles.control} aria-label="Próximo projeto" aria-controls={viewportId} onClick={() => move(1)}><span aria-hidden="true">→</span></button>
          </div>}
        </div>
      </div>
    </div>
  );
}
