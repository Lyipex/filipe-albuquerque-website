"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./analogue.module.css";

export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.remove(styles.pending);
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    // Content remains visible without JavaScript and for reduced-motion users.
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add(styles.pending);
      observer.observe(element);
    }
    const show = () => {
      if (preference.matches) { element.classList.remove(styles.pending); observer.disconnect(); }
    };
    preference.addEventListener("change", show);
    return () => { observer.disconnect(); preference.removeEventListener("change", show); element.classList.remove(styles.pending); };
  }, []);
  return <div ref={ref} className={`${styles.reveal} ${className}`}>{children}</div>;
}
