import ActionLink from "./ActionLink";

export default function Hero() {
  return (
    <section id="inicio" tabIndex={-1} aria-labelledby="inicio-title" className="bg-paper px-gutter pb-section pt-36 text-ink lg:pt-44">
      <div className="mx-auto max-w-editorial">
        <p data-motion="hero" className="text-xs font-medium uppercase tracking-eyebrow text-moss">Nº 01 - Desenvolvimento web</p>
        <h1 id="inicio-title" data-motion="hero" data-motion-delay="70" className="mt-7 max-w-[1000px] text-display font-medium leading-display tracking-display text-balance">
          Sites para empresas e profissionais.
        </h1>
        <div data-motion="hero" data-motion-delay="140" className="mt-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <p className="max-w-[60ch] text-body leading-7 text-ink/80">Seu site deve apresentar seu trabalho com clareza e facilitar o contato com seus clientes. Antes de desenvolver, procuro entender seu negócio e o que você precisa comunicar.</p>
          <div className="flex flex-wrap items-center gap-6">
            <ActionLink href="#projetos" variant="secondary">Ver projetos <span aria-hidden="true">↓</span></ActionLink>
            <ActionLink href="#contato" variant="primary">Vamos conversar <span aria-hidden="true">↗</span></ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
