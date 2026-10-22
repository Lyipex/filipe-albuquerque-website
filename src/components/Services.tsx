import ActionLink from "./ActionLink";
import styles from "./Services.module.css";

const services = [
  {
    id: "landing-pages",
    title: "Landing pages",
    context: "Para divulgar um produto, serviço ou campanha",
    description: "Uma página criada para apresentar um serviço, produto ou campanha de forma objetiva, conduzindo o visitante até uma ação, como entrar em contato ou solicitar um orçamento.",
    scope: ["Apresentação da oferta e dos diferenciais", "Informações para quem está decidindo", "Botões de contato ou inscrição"],
  },
  {
    id: "sites-institucionais",
    title: "Sites institucionais",
    context: "Para apresentar sua empresa e seus serviços",
    description: "Seu site é um lugar para contar quem você é, mostrar o que faz e receber quem deseja conhecer seu trabalho. Organizo essas informações em páginas claras, para que cada visitante encontre o que procura.",
    scope: ["Organização das páginas e da navegação", "Conteúdo sobre a empresa e os serviços", "Canais de contato acessíveis no celular"],
  },
  {
    id: "redesign",
    title: "Redesign e melhorias",
    context: "Para atualizar um site existente",
    description: "Nem sempre é preciso começar um site do zero. Às vezes, reorganizar o conteúdo, atualizar o visual ou corrigir dificuldades de navegação já faz diferença. Podemos avaliar juntos o que vale a pena melhorar.",
    scope: ["Revisão da apresentação e dos textos", "Correções na exibição em celular e desktop", "Ajustes de navegação e acesso ao contato"],
  },
  {
    id: "chatbots",
    title: "Chatbots",
    context: "Para organizar o primeiro atendimento",
    description: "Um assistente digital para ajudar seus clientes a encontrar informações, esclarecer dúvidas frequentes e iniciar um atendimento. As funcionalidades são definidas de acordo com as necessidades do seu negócio.",
    scope: ["Planejamento das perguntas e respostas", "Coleta inicial de informações do cliente", "Integrações e encaminhamentos conforme o projeto"],
  },
];

export default function Services() {
  return (
    <section id="servicos" tabIndex={-1} aria-labelledby="servicos-title" className="bg-paper px-gutter py-section text-ink">
      <div className="mx-auto max-w-editorial">
        <p data-motion="reveal" className="text-xs font-medium uppercase tracking-eyebrow text-moss">Nº 03 - Serviços</p>
        <div data-motion="reveal" className="mt-5 grid gap-5 border-t border-ink/15 pt-6 lg:grid-cols-2 lg:gap-editorial-gap">
          <h2 id="servicos-title" className="max-w-2xl text-section-title font-medium leading-display text-balance tracking-display">Sites pensados para o seu negócio.</h2>
          <p className="max-w-[60ch] text-body leading-copy text-ink/80 lg:justify-self-end">Se você precisa de um site para apresentar seu trabalho, divulgar seus serviços ou receber contatos, posso ajudar. Desenvolvo cada projeto com atenção à apresentação, à navegação e à experiência de quem vai visitar seu site.</p>
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
