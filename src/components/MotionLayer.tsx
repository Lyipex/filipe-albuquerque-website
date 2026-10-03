"use client";

import { useEffect } from "react";

/** Progressive enhancement: sections stay on the server and render fully visible. */
export default function MotionLayer() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-motion]"),
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new Set<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) play(entry.target as HTMLElement);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );

    function finish(element: HTMLElement) {
      seen.add(element);
      observer.unobserve(element);
      element.classList.remove("motion-pending", "motion-running");
      element.style.removeProperty("--motion-delay");
    }

    function play(element: HTMLElement) {
      if (seen.has(element)) return;
      seen.add(element);
      observer.unobserve(element);
      element.classList.remove("motion-pending");
      if (!reducedMotion.matches) element.classList.add("motion-running");
    }

    function showTarget(target: Element) {
      if (target instanceof HTMLElement && target.matches("[data-motion]")) {
        finish(target);
      }
      target.querySelectorAll<HTMLElement>("[data-motion]").forEach(finish);
    }

    function getHashTarget(hash: string) {
      try {
        return document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return null;
      }
    }

    function showHashTarget() {
      const target = getHashTarget(window.location.hash);
      if (target) showTarget(target);
    }

    function handleAnchor(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const target = getHashTarget(anchor.hash);
      // Anchor navigation must never wait for a reveal, including the menu.
      if (target) showTarget(target);
    }

    function handleFocus(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      let group = event.target.closest<HTMLElement>("[data-motion]");
      while (group) {
        finish(group);
        group = group.parentElement?.closest<HTMLElement>("[data-motion]") ?? null;
      }
    }

    function handleAnimationEnd(event: AnimationEvent) {
      if (event.target instanceof HTMLElement && event.target.matches("[data-motion]")) {
        finish(event.target);
      }
    }

    function handlePreference() {
      if (reducedMotion.matches) elements.forEach(finish);
    }

    for (const element of elements) {
      if (reducedMotion.matches) {
        finish(element);
        continue;
      }
      element.style.setProperty(
        "--motion-delay",
        `${Number(element.dataset.motionDelay) || 0}ms`,
      );
      const rect = element.getBoundingClientRect();
      if (element.dataset.motion === "hero") {
        if (rect.top < window.innerHeight && rect.bottom > 0) play(element);
        else finish(element);
      } else if (rect.top >= window.innerHeight) {
        // Never hide content already visible when hydration or scroll restoration runs.
        element.classList.add("motion-pending");
        observer.observe(element);
      } else {
        finish(element);
      }
    }

    showHashTarget();
    document.addEventListener("click", handleAnchor);
    document.addEventListener("focusin", handleFocus);
    document.addEventListener("animationend", handleAnimationEnd);
    window.addEventListener("hashchange", showHashTarget);
    reducedMotion.addEventListener("change", handlePreference);

    return () => {
      observer.disconnect();
      elements.forEach(finish);
      document.removeEventListener("click", handleAnchor);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("animationend", handleAnimationEnd);
      window.removeEventListener("hashchange", showHashTarget);
      reducedMotion.removeEventListener("change", handlePreference);
    };
  }, []);

  return null;
}
