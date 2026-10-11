export default function Hero() {
  return (
    <section id="inicio" className="bg-paper px-6 pb-section pt-32 text-ink lg:px-10 lg:pt-36 xl:px-14">
      <div className="mx-auto max-w-editorial">
        <p data-motion="hero" className="text-xs font-medium uppercase tracking-[0.16em] text-moss">Nº 01 — Desenvolvimento web</p>
        <h1 data-motion="hero" data-motion-delay="70" className="mt-6 max-w-[1050px] text-display font-medium leading-[1.08] tracking-[-0.045em] text-balance">
          Desenvolvimento web para negócios que valorizam uma <span className="font-editorial font-normal italic tracking-normal text-moss">boa presença digital.</span>
        </h1>
        <div data-motion="hero" data-motion-delay="140" className="mt-8 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <p className="max-w-[46ch] text-body leading-7 text-ink/80">Sites institucionais e landing pages para apresentar seu negócio com clareza e facilitar o primeiro contato.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#projetos" className="inline-flex min-h-11 items-center border-b border-moss text-sm font-semibold text-moss">Ver projetos ↓</a>
            <a href="#contato" className="inline-flex min-h-11 items-center gap-3 bg-moss px-6 py-3.5 text-sm font-semibold text-paper hover:bg-brown">Solicitar orçamento <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
