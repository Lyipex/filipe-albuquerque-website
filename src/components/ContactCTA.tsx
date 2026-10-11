import Image from "next/image";
import Footer from "./Footer";

const contactHref = "mailto:fbalbuquerque@proton.me";

export default function ContactCTA() {
  return (
    <section id="contato" className="bg-ink px-6 pt-section text-paper lg:px-10 xl:px-14">
      <div className="mx-auto max-w-editorial">
        <div data-motion="reveal" className="grid items-center gap-8 pb-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-medium text-paper/80">Nº 04 — Contato</p>
            <h2 className="mt-6 max-w-3xl text-section-title font-medium leading-[1.1] tracking-[-0.04em]">Seu próximo projeto começa <span className="font-editorial font-normal italic">com uma conversa.</span></h2>
            <p className="mt-5 max-w-[48ch] text-body leading-7 text-paper/80">Conte sobre seu negócio e o site que você precisa.</p>
            <a href={contactHref} className="mt-6 inline-flex min-h-11 items-center gap-3 bg-paper px-6 py-3.5 text-sm font-semibold text-ink hover:bg-paper/90">Quero falar sobre meu projeto <span aria-hidden="true">↗</span></a>
          </div>
          <Image src="/images/filipe-albuquerque.png" alt="Filipe Brito Albuquerque" width={1312} height={1199} sizes="(min-width: 768px) 176px, 112px" className="aspect-square w-28 object-cover md:w-44" />
        </div>
        <Footer />
      </div>
    </section>
  );
}
