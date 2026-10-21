"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import monochrome from "../../public/images/filipe-albuquerque-pb.png";
import colored from "../../public/images/filipe-albuquerque-colorido.jpeg";

export default function Portrait() {
  const descriptionId = useId();
  const frameRef = useRef<HTMLSpanElement>(null);
  const [automaticColor, setAutomaticColor] = useState(false);
  const [manualColor, setManualColor] = useState<boolean | null>(null);
  const [colorReady, setColorReady] = useState(false);
  const color = manualColor ?? automaticColor;

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const touchDevice = window.matchMedia("(hover: none), (pointer: coarse), (max-width: 47.999rem)");
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      setAutomaticColor(touchDevice.matches && visible);
      if (!entry.isIntersecting) setManualColor(null);
    }, { threshold: [0, 0.35] });

    function refreshInputMode() {
      if (!frame) return;
      observer.unobserve(frame);
      observer.observe(frame);
    }
    observer.observe(frame);
    touchDevice.addEventListener("change", refreshInputMode);
    return () => {
      observer.disconnect();
      touchDevice.removeEventListener("change", refreshInputMode);
    };
  }, []);

  return (
    <button type="button" aria-label="Alternar fotografia entre preto e branco e cores" aria-pressed={color && colorReady} aria-describedby={descriptionId} data-color-ready={colorReady} onClick={() => setManualColor(!color)} className="portrait-toggle block w-full cursor-pointer text-left">
      <span ref={frameRef} className="portrait-frame">
        <Image src={monochrome} alt="Filipe Brito Albuquerque" sizes="(min-width: 768px) 420px, 100vw" className="portrait-monochrome" />
        <Image src={colored} alt="" aria-hidden="true" sizes="(min-width: 768px) 420px, 100vw" className="portrait-colored" onLoad={() => setColorReady(true)} />
      </span>
      <span id={descriptionId} className="mt-2 block text-xs leading-5 text-ink/80">
        <span className="portrait-mouse-hint">Passe o cursor ou clique para alternar a cor.</span>
        <span className="portrait-touch-hint">A foto ganha cor ao aparecer na tela. Toque para alternar.</span>
      </span>
    </button>
  );
}
