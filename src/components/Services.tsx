import SectionLabel from "./SectionLabel";
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
    <section id="servicos" tabIndex={-1} aria-labelledby="servicos-title" className={`${styles.section} bg-paper px-gutter text-ink`}>
      <div className="mx-auto max-w-editorial">
        <SectionLabel data-motion="reveal">Serviços</SectionLabel>
        <div data-motion="reveal" className={styles.intro}>
          <h2 id="servicos-title" className={styles.heading}>Sites pensados para o seu negócio.</h2>
          <p className={styles.introduction}>Cada negócio tem suas particularidades. Antes de começar um site, procuro entender seus serviços, seu público e as informações que precisam estar em destaque. A partir daí, organizo o conteúdo e desenvolvo a página pensando em quem vai utilizá-la.</p>
        </div>
        <ul className={styles.list}>
          {services.map((service, index) => (
            <li key={service.title} id={service.id} tabIndex={-1} data-service-motion className={styles.service}>
              <details className={styles.accordion}>
                <summary className={styles.trigger}>
                  <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                  <h3 className={styles.title}>{service.title}</h3>
                  <span className={styles.context}>{service.context}</span>
                  <span className={styles.expand} aria-hidden="true"><span /><span /></span>
                </summary>
                <div className={styles.panel}>
                  <p className={styles.description}>{service.description}</p>
                  <ul className={styles.scope} aria-label={`O que pode incluir: ${service.title}`}>
                    {service.scope.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </details>
            </li>
          ))}
        </ul>
        <div className={styles.contact}>
          <p className="max-w-[52ch] text-sm leading-6 text-ink/80">O orçamento considera as páginas, os recursos e o prazo do projeto.</p>
          <ActionLink href="#contato" variant="secondary">Vamos conversar <span aria-hidden="true">↗</span></ActionLink>
        </div>
      </div>
    </section>
  );
}
