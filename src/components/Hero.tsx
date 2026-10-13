import ActionLink from "./ActionLink";

export default function Hero() {
  return (
    <section id="inicio" tabIndex={-1} aria-labelledby="inicio-title" className="bg-paper px-gutter pb-section pt-32 text-ink lg:pt-36">
      <div className="mx-auto max-w-editorial">
        <p data-motion="hero" className="text-xs font-medium uppercase tracking-eyebrow text-moss">Nº 01 — Desenvolvimento web</p>
        <h1 id="inicio-title" data-motion="hero" data-motion-delay="70" className="mt-6 max-w-hero text-display font-medium leading-display tracking-display text-balance">
          Desenvolvimento web para negócios que valorizam uma <span className="font-editorial font-normal italic tracking-normal text-moss">boa presença digital.</span>
        </h1>
        <div data-motion="hero" data-motion-delay="140" className="mt-8 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <p className="max-w-[46ch] text-body leading-7 text-ink/80">Sites institucionais e landing pages para apresentar seu negócio com clareza e facilitar o primeiro contato.</p>
          <div className="flex flex-wrap items-center gap-6">
            <ActionLink href="#projetos" variant="secondary">Ver projetos <span aria-hidden="true">↓</span></ActionLink>
            <ActionLink href="#contato" variant="primary">Solicitar orçamento <span aria-hidden="true">↗</span></ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
