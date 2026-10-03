const questions = [
  {
    question: "Quanto custa desenvolver um site?",
    answer:
      "O valor depende do tipo de projeto, da quantidade de conteúdo e das funcionalidades necessárias. Depois de entender o que você precisa, preparo uma proposta com o escopo, prazo e valor do projeto.",
  },
  {
    question: "Quanto tempo leva para o site ficar pronto?",
    answer:
      "O prazo varia de acordo com o projeto e também depende do envio e da aprovação dos conteúdos. O cronograma é definido antes do início do desenvolvimento.",
  },
  {
    question: "Preciso ter textos e imagens prontos?",
    answer:
      "Não necessariamente. Podemos identificar juntos o que será necessário para o site e organizar esses materiais durante o planejamento.",
  },
  {
    question: "O site vai funcionar bem no celular?",
    answer:
      "Sim. O projeto é desenvolvido para se adaptar a diferentes tamanhos de tela, incluindo computadores, tablets e celulares.",
  },
  {
    question: "Você cuida de domínio e hospedagem?",
    answer:
      "Posso orientar a escolha e ajudar na configuração do domínio e da hospedagem. O domínio fica registrado em seu nome, para que você tenha controle sobre ele mesmo depois da publicação do site.",
  },
  {
    question: "E depois que o site for publicado?",
    answer:
      "Podemos combinar suporte para ajustes e necessidades futuras de acordo com o projeto.",
  },
];

export default function FAQ() {
  return (
    <section
      id="duvidas"
      className="bg-paper px-6 py-section text-ink lg:px-10 xl:px-14"
    >
      <div className="mx-auto max-w-editorial">
        {/* Identificação da seção */}
        <p className="text-sm font-medium text-ink/60">
          Nº 07 - Dúvidas
        </p>

        {/* Título */}
        <div className="mt-8 border-t border-ink/15 pt-6">
          <h2 className="max-w-4xl text-section-title font-medium leading-[1.08] text-balance tracking-[-0.045em]">
            Antes de começarmos, talvez você{" "}
            <span className="font-editorial font-normal">queira saber.</span>
          </h2>
        </div>

        {/* Perguntas */}
        <div className="mt-section-gap border-t border-ink/15">
          {questions.map((item) => (
            <details
              key={item.question}
              className="group border-b border-ink/15"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-7 [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-medium">
                  {item.question}
                </h3>

                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl font-light leading-none text-moss transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>

              <div className="max-w-[60ch] pb-7">
                <p className="text-body leading-[1.75] text-ink/65">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}