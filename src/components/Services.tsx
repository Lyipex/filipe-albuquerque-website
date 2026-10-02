export default function Services() {
  return (
    <section
      id="servicos"
      className="bg-paper px-6 py-24 text-ink sm:py-28 lg:px-10 lg:py-36 xl:px-14"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Identificação da seção */}
        <p className="text-sm font-medium text-ink/50">
          Nº 02 - Serviços
        </p>

        {/* Introdução */}
        <div className="mt-10 grid gap-8 border-t border-ink/15 pt-8 lg:grid-cols-2 lg:gap-16">
          <h2 className="max-w-xl text-[clamp(2.5rem,4.2vw,4.5rem)] font-medium leading-[0.98] 
          tracking-[-0.045em]">
            O site certo para o momento do seu negócio.
          </h2>

          <p className="max-w-xl text-base leading-7 text-ink/70 sm:text-lg sm:leading-8 lg:justify-self-end">
            Cada projeto parte de uma necessidade diferente. O objetivo é
            entender o que seu negócio precisa comunicar e construir a solução
            certa para isso — sem complicação desnecessária.
          </p>
        </div>

        {/* Lista de serviços */}
        <div className="mt-20 border-t border-ink/20">
          <article className="grid gap-5 border-b border-ink/20 py-8 md:grid-cols-[60px_1fr_1fr] 
          md:items-start md:gap-8 lg:py-10">
            <span className="text-sm font-medium text-ink/40">01</span>

            <div>
              <h3 className="text-2xl font-medium tracking-[-0.025em] sm:text-3xl">
                Landing Pages
              </h3>

              <p className="mt-2 text-base text-ink/55">
                Uma página focada em uma oferta e em uma ação.
              </p>
            </div>

            <p className="max-w-lg text-base leading-7 text-ink/70 md:justify-self-end">
              Ideal para divulgar um serviço, produto ou campanha específica
              com uma comunicação direta e um próximo passo claro para quem
              visita.
            </p>
          </article>

          <article className="grid gap-5 border-b border-ink/20 py-8 md:grid-cols-[60px_1fr_1fr] 
          md:items-start md:gap-8 lg:py-10">
            <span className="text-sm font-medium text-ink/40">02</span>

            <div>
              <h3 className="text-2xl font-medium tracking-[-0.025em] sm:text-3xl">
                Sites Institucionais
              </h3>

              <p className="mt-2 text-base text-ink/55">
                Uma presença digital à altura do seu negócio.
              </p>
            </div>

            <p className="max-w-lg text-base leading-7 text-ink/70 md:justify-self-end">
              Para empresas e profissionais que precisam apresentar seus
              serviços, diferenciais e informações de forma organizada,
              profissional e fácil de encontrar.
            </p>
          </article>

          <article className="grid gap-5 border-b border-ink/20 py-8 md:grid-cols-[60px_1fr_1fr] md:items-start md:gap-8 lg:py-10">
            <span className="text-sm font-medium text-ink/40">03</span>

            <div>
              <h3 className="text-2xl font-medium tracking-[-0.025em] sm:text-3xl">
                Redesign de Sites
              </h3>

              <p className="mt-2 text-base text-ink/55">
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