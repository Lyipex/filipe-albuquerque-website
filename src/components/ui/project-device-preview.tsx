"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import ConceptPreview from "../ConceptPreview";
import type { Project } from "../ProjectCarousel";
import styles from "./project-device-preview.module.css";

export default function ProjectDevicePreview({ project }: { project: Project }) {
  const hintId = useId();
  const [exploring, setExploring] = useState<"desktop" | "mobile" | null>(null);
  const screens = useRef<Partial<Record<"desktop" | "mobile", HTMLDivElement | null>>>({});
  const triggers = useRef<Partial<Record<"desktop" | "mobile", HTMLButtonElement | null>>>({});

  function closePreview() {
    const device = exploring;
    if (device) screens.current[device]?.scrollTo({ top: 0, behavior: "instant" });
    setExploring(null);
    if (device) requestAnimationFrame(() => triggers.current[device]?.focus({ preventScroll: true }));
  }

  function screen(device: "desktop" | "mobile") {
    const active = exploring === device;
    const label = device === "desktop" ? "desktop" : "celular";
    return (
      <div
        ref={(element) => { screens.current[device] = element; }}
        className={device === "desktop" ? styles.desktopScreen : styles.mobileScreen}
        data-exploring={active}
        role="region"
        aria-label={`Prévia ${label}: ${project.area}`}
        aria-describedby={hintId}
        tabIndex={active ? 0 : -1}
        onKeyDown={(event) => {
          if (event.key === "Escape" && active) { event.preventDefault(); event.stopPropagation(); closePreview(); }
        }}
        onTouchStart={(event) => { if (active) event.stopPropagation(); }}
        onWheel={(event) => { if (active) event.stopPropagation(); }}
      >
        {content(device)}
        {!active && <button
          ref={(element) => { triggers.current[device] = element; }}
          type="button"
          className={styles.activate}
          aria-label={`Explorar prévia ${label} de ${project.area}`}
          onClick={() => {
            if (exploring) screens.current[exploring]?.scrollTo({ top: 0, behavior: "instant" });
            setExploring(device);
            requestAnimationFrame(() => screens.current[device]?.focus({ preventScroll: true }));
          }}
        ><span>Explorar {label} <span aria-hidden="true">↗</span></span></button>}
      </div>
    );
  }

  function content(device: "desktop" | "mobile") {
    if (project.concept) return <ConceptPreview kind={project.concept} title={project.area} identification={project.identification} type={project.type} description={project.phrase} device={device} />;
    if (project.image) return <Image src={project.image.src} alt="" width={project.image.width ?? 1440} height={project.image.height ?? 3000} sizes={device === "desktop" ? "(min-width: 768px) 70vw, 80vw" : "(min-width: 768px) 20vw, 25vw"} className={styles.screenshot} draggable={false} />;
    return <div className={styles.placeholder}>{project.area}<span>Prévia em preparação</span></div>;
  }

  return (
    <div className={styles.showcase}
      onFocus={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className={styles.devices}>
        <div className={styles.desktop}>
          <div className={styles.browserBar}><span className={styles.browserDots}><i /><i /><i /></span><span>Prévia do site</span><span>↗</span></div>
          {screen("desktop")}
          <span className={styles.deviceLabel}>Desktop</span>
        </div>
        <div className={styles.mobile}>
          <div className={styles.phone}>
            <span className={styles.camera} />
            {screen("mobile")}
            <span className={styles.homeIndicator} />
          </div>
          <span className={styles.deviceLabel}>Celular</span>
        </div>
      </div>
      <div className={styles.explorationBar}>
        <p id={hintId} role="status">{exploring ? "Role dentro da prévia. Para sair, use o botão ou Escape." : "Clique em uma prévia para rolar e conhecer a página."}</p>
        {exploring && <button type="button" onClick={closePreview}>Sair da prévia <span aria-hidden="true">×</span></button>}
      </div>
    </div>
  );
}
