// TODO: substituir pelo WhatsApp real, se desejado. O e-mail já existe no Footer.
const contactHref = "mailto:fbalbuquerque@proton.me";

export default function ContactCTA() {
  return (
    <section
      id="contato"
      className="bg-ink px-6 py-section text-paper lg:px-10 xl:px-14"
    >
      <div className="mx-auto max-w-editorial">
        {/* Identificação da seção */}
        <p data-motion="reveal" className="text-sm font-medium text-paper/50">
          Nº 08 - Contato
        </p>

        {/* Título */}
        <div data-motion="reveal" data-motion-delay="40" className="mt-8 border-t border-paper/15 pt-6">
          <h2 className="max-w-5xl text-section-title font-medium leading-[1.08] text-balance tracking-[-0.045em]">
            Tem um projeto em mente?
            <br />
            <span className="font-editorial font-normal">
              Vamos conversar sobre ele.
            </span>
          </h2>
        </div>

        {/* Conteúdo */}
        <div data-motion="reveal" data-motion-delay="80" className="mt-section-gap grid gap-10 lg:grid-cols-2 lg:gap-editorial-gap">
          <div className="hidden lg:block" aria-hidden="true" />

          <div>
            <p className="max-w-[55ch] text-lead leading-[1.6] text-paper/70">
              Conte um pouco sobre seu negócio e o que você precisa. A partir
              daí, podemos entender juntos qual caminho faz sentido para o
              projeto.
            </p>

            <a
              href={contactHref}
              className="mt-8 inline-flex items-center bg-moss px-6 py-4 text-base font-medium text-paper transition-opacity duration-300 hover:opacity-85"
            >
              Quero falar sobre meu projeto ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}