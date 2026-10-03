export default function Method() {
  return (
    <section
      id="metodo"
      className="bg-ink px-6 py-section text-paper lg:px-10 xl:px-14"
    >
      <div className="mx-auto max-w-editorial">
        {/* Identificação da seção */}
        <p className="text-sm font-medium text-paper/50">
          Nº 05 - Método
        </p>

        {/* Título */}
        <div className="mt-8 border-t border-paper/15 pt-6">
          <h2 className="max-w-4xl text-section-title font-medium leading-[1.08] text-balance tracking-[-0.045em]">
            Engenharia também é uma{" "}
            <span className="font-editorial font-normal">forma de pensar.</span>
          </h2>
        </div>

        {/* Introdução */}
        <div className="mt-section-gap grid gap-8 lg:grid-cols-2 lg:gap-editorial-gap">
          <div className="hidden lg:block" aria-hidden="true" />

          <div>
            <p className="max-w-[50ch] text-lead leading-[1.6] text-paper">
              Antes de pensar em telas, procuro entender o problema.
            </p>

            <p className="mt-5 max-w-[60ch] text-body leading-[1.75] text-paper/65">
              Organização, clareza e revisão fazem parte do processo tanto
              quanto design e código.
            </p>
          </div>
        </div>

        {/* Princípios */}
        <div className="mt-section-gap border-t border-paper/15">
          <div className="grid border-b border-paper/15 py-7 md:grid-cols-[5rem_1fr] md:items-center">
            <span className="text-sm text-paper/50">01</span>
            <p className="mt-2 text-xl font-medium md:mt-0">
              Mapear antes de desenhar
            </p>
          </div>

          <div className="grid border-b border-paper/15 py-7 md:grid-cols-[5rem_1fr] md:items-center">
            <span className="text-sm text-paper/50">02</span>
            <p className="mt-2 text-xl font-medium md:mt-0">
              Padronizar para manter
            </p>
          </div>

          <div className="grid border-b border-paper/15 py-7 md:grid-cols-[5rem_1fr] md:items-center">
            <span className="text-sm text-paper/50">03</span>
            <p className="mt-2 text-xl font-medium md:mt-0">
              Revisar com critério
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}