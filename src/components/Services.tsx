import ActionLink from "./ActionLink";
import styles from "./Services.module.css";

const services = [
  {
    id: "landing-pages",
    title: "Landing pages",
    context: "Para divulgar um produto, serviço ou campanha",
    description: "Uma página dedicada a uma oferta. Reúne a apresentação, os detalhes e as dúvidas mais comuns, com acesso ao contato ou à inscrição.",
    scope: ["Apresentação da oferta e dos diferenciais", "Informações para quem está decidindo", "Botões de contato ou inscrição"],
  },
  {
    id: "sites-institucionais",
    title: "Sites institucionais",
    context: "Para apresentar sua empresa e seus serviços",
    description: "Um site com páginas para a empresa, os serviços e o contato. Indicado quando o visitante precisa conhecer seu trabalho e consultar informações antes de pedir um orçamento.",
    scope: ["Organização das páginas e da navegação", "Conteúdo sobre a empresa e os serviços", "Canais de contato acessíveis no celular"],
  },
  {
    id: "redesign",
    title: "Redesign e melhorias",
    context: "Para atualizar um site existente",
    description: "Revisão do layout, do conteúdo e da navegação. Avalio o site atual para definir quais ajustes são necessários e o que pode ser aproveitado.",
    scope: ["Revisão da apresentação e dos textos", "Correções na exibição em celular e desktop", "Ajustes de navegação e acesso ao contato"],
  },
  {
    id: "chatbots",
    title: "Chatbots",
    context: "Para organizar o primeiro atendimento",
    description: "Assistentes de conversa para responder dúvidas frequentes, coletar informações e encaminhar o contato para sua equipe. O fluxo é definido a partir das perguntas e das rotinas do seu negócio.",
    scope: ["Planejamento das perguntas e respostas", "Coleta inicial de informações do cliente", "Integrações e encaminhamentos conforme o projeto"],
  },
];

export default function Services() {
  return (
    <section id="servicos" tabIndex={-1} aria-labelledby="servicos-title" className="bg-paper px-gutter py-section text-ink">
      <div className="mx-auto max-w-editorial">
        <p data-motion="reveal" className="text-xs font-medium uppercase tracking-eyebrow text-moss">Nº 03 - Serviços</p>
        <div data-motion="reveal" className="mt-5 grid gap-5 border-t border-ink/15 pt-6 lg:grid-cols-2 lg:gap-editorial-gap">
          <h2 id="servicos-title" className="max-w-2xl text-section-title font-medium leading-display text-balance tracking-display">Sites e atendimento digital.</h2>
          <p className="max-w-[60ch] text-body leading-copy text-ink/80 lg:justify-self-end">Criação e revisão de sites, páginas para campanhas e chatbots para o primeiro atendimento. O escopo depende do conteúdo e dos recursos que você precisa.</p>
        </div>
        <ul className={styles.list}>
          {services.map((service) => (
            <li key={service.title} id={service.id} tabIndex={-1} data-service-motion className={styles.service}>
              <div>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.context}>{service.context}</p>
              </div>
              <div>
                <p className={styles.description}>{service.description}</p>
                <ul className={styles.scope} aria-label={`O que pode incluir: ${service.title}`}>
                  {service.scope.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.contact}>
          <p className="max-w-[52ch] text-sm leading-6 text-ink/80">O orçamento considera as páginas, os recursos e o prazo do projeto.</p>
          <ActionLink href="#contato" variant="primary">Solicitar orçamento <span aria-hidden="true">↗</span></ActionLink>
        </div>
      </div>
    </section>
  );
}
