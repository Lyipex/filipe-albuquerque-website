import Portrait from "./Portrait";
import ActionLink from "./ActionLink";

export default function About() {
  return (
    <section id="sobre" tabIndex={-1} aria-labelledby="sobre-title" className="bg-paper px-gutter py-section text-ink">
      <div className="mx-auto max-w-editorial">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-moss">Nº 04 - Sobre</p>
        <div className="mt-10 grid items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
          <div data-motion="reveal" className="w-full max-w-[420px]"><Portrait /></div>
          <div data-motion="reveal">
            <h2 id="sobre-title" className="text-display font-medium leading-heading tracking-heading lg:text-[clamp(3rem,1.5rem_+_5vw,6.25rem)]">Prazer, Filipe.</h2>
            <p className="mt-7 max-w-[42ch] text-lead leading-copy">Sou desenvolvedor web e ajudo empresas e profissionais a construir uma presença digital clara, profissional e alinhada aos seus negócios.</p>
            <p className="mt-5 max-w-[52ch] text-body leading-copy text-ink/80">Tenho formação em Engenharia de Produção e especialização em Gestão de Projetos. Essa experiência orienta minha forma de trabalhar: entender as necessidades de cada cliente, organizar as etapas e desenvolver sites com atenção aos detalhes.</p>
            <ActionLink href="#contato" variant="secondary" className="mt-8">Vamos conversar sobre seu projeto <span aria-hidden="true">↗</span></ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
