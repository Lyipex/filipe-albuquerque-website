"use client";

import { useEffect } from "react";

export default function ServiceMotion() {
  useEffect(() => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-service-motion]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Observe the stationary row; animate its content so transforms cannot change the trigger.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const row = entry.target as HTMLElement;
        row.classList.toggle("service-visible", entry.isIntersecting || entry.boundingClientRect.top < 0);
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });

    function configure() {
      observer.disconnect();
      for (const row of rows) {
        row.classList.remove("service-animated", "service-visible");
        if (preference.matches) continue;
        row.classList.toggle("service-visible", row.getBoundingClientRect().top < window.innerHeight * 0.9);
        row.classList.add("service-animated");
        observer.observe(row);
      }
    }
    function showFocused(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      event.target.closest("[data-service-motion]")?.classList.add("service-visible");
    }
    configure();
    preference.addEventListener("change", configure);
    document.addEventListener("focusin", showFocused);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", configure);
      document.removeEventListener("focusin", showFocused);
      rows.forEach((row) => row.classList.remove("service-animated", "service-visible"));
    };
  }, []);
  return null;
}
