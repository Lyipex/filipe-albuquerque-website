import Image from "next/image";
import Footer from "./Footer";

import ActionLink from "./ActionLink";
import { contactHref } from "@/lib/site";

export default function ContactCTA() {
  return (
    <footer id="contato" tabIndex={-1} aria-labelledby="contato-title" className="bg-ink px-gutter pt-section text-paper">
      <div className="mx-auto max-w-editorial">
        <div data-motion="reveal" className="grid items-center gap-8 pb-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-medium text-paper/80">Nº 04 — Contato</p>
            <h2 id="contato-title" className="mt-6 max-w-3xl text-section-title font-medium leading-heading tracking-heading">Seu próximo projeto começa <span className="font-editorial font-normal italic">com uma conversa.</span></h2>
            <p className="mt-5 max-w-[48ch] text-body leading-7 text-paper/80">Conte sobre seu negócio e o site que você precisa.</p>
            <ActionLink href={contactHref} variant="primary" tone="inverse" className="mt-6">Quero falar sobre meu projeto <span aria-hidden="true">↗</span></ActionLink>
          </div>
          <Image src="/images/filipe-albuquerque.png" alt="Filipe Brito Albuquerque" width={1312} height={1199} sizes="(min-width: 768px) 176px, 112px" className="aspect-square w-28 object-cover md:w-44" />
        </div>
        <Footer />
      </div>
    </footer>
  );
}
