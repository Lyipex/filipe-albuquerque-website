export default function Services() {
  return (
    <section
      id="servicos"
      className="bg-paper px-6 py-section text-ink lg:px-10 xl:px-14"
    >
      <div className="mx-auto max-w-editorial">
        {/* Identificação da seção */}
        <p data-motion="reveal" className="text-sm font-medium text-ink/60">
          Nº 02 - Serviços
        </p>

        {/* Introdução */}
        <div data-motion="reveal" data-motion-delay="40" className="mt-8 grid gap-8 border-t border-ink/15 pt-6 lg:grid-cols-2 lg:gap-editorial-gap">
          <h2 className="max-w-xl text-section-title font-medium leading-[1.08] text-balance
          tracking-[-0.045em]">
            O site certo para o momento do seu negócio.
          </h2>

          <p className="max-w-[60ch] text-body leading-[1.75] text-ink/70 lg:justify-self-end">
            Cada projeto parte de uma necessidade diferente. O objetivo é
            entender o que seu negócio precisa comunicar e construir a solução
            certa para isso — sem complicação desnecessária.
          </p>
        </div>

        {/* Lista de serviços */}
        <div data-motion="reveal" data-motion-delay="80" className="mt-section-gap border-t border-ink/20">
          <article className="grid gap-5 border-b border-ink/20 py-8 md:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1fr)]
          md:items-start md:gap-8 lg:py-8">
            <span className="text-sm font-medium text-ink/60">01</span>

            <div>
              <h3 className="text-secondary-title font-medium leading-[1.2] tracking-[-0.025em]">
                Landing Pages
              </h3>

              <p className="mt-2 text-base leading-7 text-ink/60">
                Uma página focada em uma oferta e em uma ação.
              </p>
            </div>

            <p className="max-w-lg text-base leading-7 text-ink/70 md:justify-self-end">
              Ideal para divulgar um serviço, produto ou campanha específica
              com uma comunicação direta e um próximo passo claro para quem
              visita.
            </p>
          </article>

          <article className="grid gap-5 border-b border-ink/20 py-8 md:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1fr)]
          md:items-start md:gap-8 lg:py-8">
            <span className="text-sm font-medium text-ink/60">02</span>

            <div>
              <h3 className="text-secondary-title font-medium leading-[1.2] tracking-[-0.025em]">
                Sites Institucionais
              </h3>

              <p className="mt-2 text-base leading-7 text-ink/60">
                Uma presença digital à altura do seu negócio.
              </p>
            </div>

            <p className="max-w-lg text-base leading-7 text-ink/70 md:justify-self-end">
              Para empresas e profissionais que precisam apresentar seus
              serviços, diferenciais e informações de forma organizada,
              profissional e fácil de encontrar.
            </p>
          </article>

          <article className="grid gap-5 border-b border-ink/20 py-8 md:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-8 lg:py-8">
            <span className="text-sm font-medium text-ink/60">03</span>

            <div>
              <h3 className="text-secondary-title font-medium leading-[1.2] tracking-[-0.025em]">
                Redesign de Sites
              </h3>

              <p className="mt-2 text-base leading-7 text-ink/60">
                Seu negócio evoluiu. Seu site também deveria.
              </p>
            </div>

            <p className="max-w-lg text-base leading-7 text-ink/70 md:justify-self-end">
              Para sites que já existem, mas deixaram de representar a
              qualidade do negócio ou apresentam problemas de organização,
              experiência e responsividade.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
