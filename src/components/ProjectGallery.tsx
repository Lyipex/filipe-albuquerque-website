"use client";

import { useId, useState } from "react";
import ActionLink from "./ActionLink";
import ProjectDevicePreview from "./ui/project-device-preview";
import BasicCarousel, { Carousel } from "./ui/carousel-1";
import type { Project } from "./ProjectCarousel";
import styles from "./ProjectGallery.module.css";

export default function ProjectGallery({ projects }: { projects: readonly Project[] }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const project = projects[active];
  if (!project) return null;

  return (
    <BasicCarousel
      id={id}
      slideCount={projects.length}
      page={active}
      onPageChange={({ page }) => setActive(page)}
      className={styles.carousel}
      aria-label="Projetos em destaque"
      aria-roledescription="carrossel"
      spacing="1.25rem"
    >
      <Carousel.Control className={styles.topline}>
        <span>Seleção de projetos</span>
        <div className={styles.arrows}>
          <Carousel.PrevTrigger>←</Carousel.PrevTrigger>
          <Carousel.NextTrigger>→</Carousel.NextTrigger>
        </div>
      </Carousel.Control>
      <Carousel.ItemGroup className={styles.track}>
        {projects.map((item, index) => (
          <Carousel.Item key={item.code} index={index} className={styles.slide} inert={index !== active} aria-label={`${index + 1} de ${projects.length}: ${item.area}`}>
            <ProjectDevicePreview key={`${item.code}-${index === active}`} project={item} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <div className={styles.controls}>
        <Carousel.IndicatorGroup className={styles.index} aria-label="Escolher projeto">
          {projects.map((item, index) => <Carousel.Indicator key={item.code} index={index} aria-label={`Ir para projeto ${index + 1}: ${item.area}`}><span className="sr-only">{item.area}</span></Carousel.Indicator>)}
        </Carousel.IndicatorGroup>
        <span className={styles.counter} aria-live="polite" aria-atomic="true"><strong>{String(active + 1).padStart(2, "0")}</strong><span>/ {String(projects.length).padStart(2, "0")}</span><span className="sr-only"> — {project.area}</span></span>
      </div>
      <div className={styles.caption}>
        <div className={styles.projectHeading}>
          <h3 key={project.code} className={styles.reveal}>{project.area}</h3>
          <p className={styles.status}>{project.identification ?? "Prévia ilustrativa"}</p>
        </div>
        <div className={styles.projectInfo}>
          <p key={project.code} className={styles.reveal}>{project.phrase}</p>
          {project.url && <div className={styles.links}><ActionLink href={project.url} target="_blank" rel="noopener noreferrer" variant="secondary">Ver site ↗</ActionLink></div>}
          {project.credit && <p className={styles.credit}>Foto de referência: <a href={project.credit.url} target="_blank" rel="noopener noreferrer">{project.credit.name} / {project.credit.platform ?? "Unsplash"}</a></p>}
        </div>
      </div>
    </BasicCarousel>
  );
}
