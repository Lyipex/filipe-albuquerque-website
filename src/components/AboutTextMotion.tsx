"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function AboutTextMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = Array.from(ref.current?.querySelectorAll<HTMLElement>("[data-about-item]") ?? []);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Observe stable wrappers so moving text cannot change its own trigger.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting || entry.boundingClientRect.top < 0);
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });

    function configure() {
      observer.disconnect();
      for (const item of items) {
        delete item.dataset.animated;
        delete item.dataset.visible;
        if (preference.matches) continue;
        item.dataset.visible = String(item.getBoundingClientRect().top < window.innerHeight * 0.9);
        item.dataset.animated = "true";
        observer.observe(item);
      }
    }

    configure();
    preference.addEventListener("change", configure);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", configure);
      for (const item of items) {
        delete item.dataset.animated;
        delete item.dataset.visible;
      }
    };
  }, []);

  return <div ref={ref} className="lg:-translate-y-14">{children}</div>;
}
