"use client";

import Image from "next/image";
import { useId, useState } from "react";

export default function Portrait() {
  const descriptionId = useId();
  const [color, setColor] = useState(false);
  return (
    <button type="button" aria-label="Mostrar fotografia em cores" aria-pressed={color} aria-describedby={descriptionId} onClick={() => setColor((previous) => !previous)} className="portrait-toggle block w-full cursor-pointer text-left">
      <Image src="/images/filipe-albuquerque.png" alt="Filipe Brito Albuquerque" width={1068} height={1600} sizes="(min-width: 768px) 420px, 100vw" className="h-auto w-full" />
      <span id={descriptionId} className="mt-2 block text-xs leading-5 text-ink/80">Passe o cursor ou toque para alternar a cor.</span>
    </button>
  );
}
