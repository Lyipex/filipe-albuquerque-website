"use client";

import { useEffect, useState } from "react";
import ActionLink from "./ActionLink";
import { navigationLinks } from "@/lib/site";
import MobileNavigation from "./MobileNavigation";
import styles from "./Header.module.css";

export default function Header() {
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const sections = navigationLinks.map((link) => ({ href: link.href, element: document.getElementById(link.href.slice(1)) }));
    let frame = 0;
    function update() {
      frame = 0;
      if (document.getElementById("mobile-navigation")?.hasAttribute("open")) return;
      const line = window.innerHeight * 0.35;
      let current = "";
      for (const { href, element } of sections) {
        if (element && element.getBoundingClientRect().top <= line) current = href;
      }
      setActiveHref(current);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        <a
          href="#sobre"
          className={styles.brand}
          aria-label="Filipe Albuquerque — Engenharia Digital — Sobre"
        >
          <span className={styles.brandCopy}>
            <span>FILIPE ALBUQUERQUE</span>
            <span>ENGENHARIA DIGITAL</span>
          </span>
        </a>

        <nav
          className="ml-auto hidden items-center gap-8 text-nav font-medium lg:flex"
          aria-label="Navegação principal"
        >
          {navigationLinks.map((link) => (
            <ActionLink key={link.href} href={link.href} aria-current={activeHref === link.href ? "location" : undefined} onClick={() => setActiveHref(link.href)} className={`text-nav ${styles.link}`}><span className={styles.underline}>{link.label}</span></ActionLink>
          ))}
        </nav>

        <MobileNavigation activeHref={activeHref} onSelect={setActiveHref} />
      </div>
    </header>
  );
}
