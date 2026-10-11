import Portrait from "./Portrait";
import Services from "./Services";

export default function About() {
  return (
    <section id="sobre" className="bg-paper px-6 py-section text-ink lg:px-10 xl:px-14">
      <div className="mx-auto max-w-editorial border-t border-ink/20 pt-6">
        <p className="text-sm font-medium text-moss">Nº 03 — Sobre + serviços</p>
        <div className="mt-7 grid items-start gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div className="w-full max-w-80"><Portrait /></div>
          <div>
            <h2 className="text-section-title font-medium leading-[1.1] tracking-[-0.04em]">Clareza no processo.<br /><span className="font-editorial font-normal italic text-moss">Cuidado em cada detalhe.</span></h2>
            <p className="mt-5 max-w-[58ch] text-body leading-7 text-ink/90">Sou Filipe Brito Albuquerque. Atuo em desenvolvimento web, criando sites para empresas e profissionais. Minha formação em Engenharia de Produção e especialização em Gestão de Projetos orientam um trabalho organizado e atento ao negócio.</p>
            <Services />
          </div>
        </div>
      </div>
    </section>
  );
}
