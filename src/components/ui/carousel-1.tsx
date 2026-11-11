"use client";

import { Carousel } from "@ark-ui/react/carousel";
import type { ComponentProps } from "react";

export { Carousel };

/** Shared carousel foundation; project content and styling stay with the caller. */
export default function BasicCarousel(props: ComponentProps<typeof Carousel.Root>) {
  return (
    <Carousel.Root
      defaultPage={0}
      allowMouseDrag
      translations={{
        prevTrigger: "Projeto anterior",
        nextTrigger: "Próximo projeto",
        indicator: (index) => `Ir para projeto ${index + 1}`,
        item: (index, count) => `Projeto ${index + 1} de ${count}`,
        progressText: ({ page, totalPages }) => `Projeto ${page + 1} de ${totalPages}`,
      }}
      {...props}
    />
  );
}
