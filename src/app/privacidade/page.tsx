import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { contactHref } from "@/lib/site";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacidade | Filipe Brito Albuquerque",
  description: "Como os dados de contato e pedidos de orçamento são utilizados, com quem são compartilhados e como exercer seus direitos.",
};

const topics = [
  ["responsavel", "Responsável e contato"],
  ["dados", "Dados e finalidade"],
  ["envio", "Envio e provedores"],
  ["prazos", "Prazos de conservação"],
  ["navegacao", "Navegação e cookies"],
  ["direitos", "Seus direitos"],
] as const;

export default function PrivacyPage() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3">Pular para o conteúdo</a>
      <header className={styles.header}>
        <Link href="/" className="text-sm font-medium">Filipe Brito Albuquerque</Link>
        <Link href="/" className={styles.back}>Voltar ao site <span aria-hidden="true">↗</span></Link>
      </header>
      <main id="conteudo" tabIndex={-1} className={styles.main}>
        <p className="text-xs font-medium uppercase tracking-eyebrow text-moss">Privacidade</p>
        <h1 className={styles.title}>Aviso de privacidade.</h1>
        <p className={styles.date}>Atualizado em <time dateTime="2026-10-20">20 de outubro de 2026</time></p>
        <div className={styles.summary}>
          <p>Este aviso explica o uso dos dados de quem visita o site ou solicita um orçamento de desenvolvimento web e chatbots.</p>
          <p>O formulário prepara uma mensagem no seu aplicativo de e-mail. Você revisa e envia por lá. Não há cadastro de clientes nem banco de dados do formulário neste site.</p>
        </div>
        <nav aria-label="Conteúdo do aviso de privacidade" className={styles.topics}>
          {topics.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>

        <section id="responsavel" className={styles.section}>
          <h2>Responsável e contato</h2>
          <p>Filipe Brito Albuquerque é o responsável pelas decisões sobre o uso dos dados recebidos para atendimento e orçamento. O contato para assuntos de privacidade é <a href={contactHref}>fbalbuquerque@proton.me</a>.</p>
        </section>

        <section id="dados" className={styles.section}>
          <h2>Dados e finalidade</h2>
          <ul>
            <li><strong>Nome, sobrenome e serviços de interesse:</strong> obrigatórios no formulário para identificar o pedido e preparar a resposta.</li>
            <li><strong>WhatsApp:</strong> opcional, para contato sobre o pedido, se você informar o número.</li>
            <li><strong>Descrição e links:</strong> opcionais, para entender o projeto e estimar o escopo.</li>
            <li><strong>Endereço de e-mail e dados da mensagem:</strong> recebidos quando você envia o e-mail, para permitir a resposta e o acompanhamento da conversa.</li>
          </ul>
          <p>Essas informações são usadas para responder dúvidas, discutir o projeto e elaborar o orçamento solicitado. Não são utilizadas para envio de publicidade ou inclusão automática em listas de marketing.</p>
          <p>O atendimento e o orçamento se apoiam nos procedimentos preliminares de contratação solicitados por você (art. 7º, V, da LGPD). Obrigações legais e defesa de direitos podem exigir conservação específica (art. 7º, II e VI).</p>
          <p>Não é necessário enviar documentos, senhas ou dados sensíveis na descrição. Para conversar sem preencher o formulário, você também pode escrever diretamente para o e-mail acima.</p>
        </section>

        <section id="envio" className={styles.section}>
          <h2>Envio e provedores</h2>
          <p>Os campos são processados no navegador para montar a mensagem. O formulário não os envia para a hospedagem nem os salva em cookies ou armazenamento local. Ao clicar no botão, o conteúdo é repassado ao aplicativo de e-mail escolhido por você, que pode salvar um rascunho conforme suas configurações. A mensagem chega ao destinatário quando você confirma o envio nesse aplicativo.</p>
          <ul>
            <li><strong>Proton Mail:</strong> serviço utilizado para receber e manter a correspondência em fbalbuquerque@proton.me. Seu próprio provedor de e-mail também participa do envio.</li>
            <li><strong>Vercel:</strong> hospeda e entrega as páginas do site. Pode tratar IP, data e hora de acesso, endereço solicitado, informações do navegador e registros técnicos para operação e segurança.</li>
          </ul>
          <p>Esses provedores podem processar dados fora do Brasil. O Proton informa armazenamento na Suíça, Alemanha ou Noruega; a Vercel utiliza infraestrutura internacional. Consulte as informações dos provedores sobre o tratamento e os locais de processamento: <a href="https://proton.me/mail/privacy-policy" target="_blank" rel="noopener noreferrer">Proton Mail (abre em nova aba)</a> e <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Vercel (abre em nova aba)</a>.</p>
          <p>Se o atendimento prosseguir por WhatsApp, o aplicativo também tratará os dados dessa conversa segundo suas próprias condições. Os dados não são vendidos. Eventual fornecimento a autoridades ocorre quando exigido por obrigação legal ou ordem válida.</p>
        </section>

        <section id="prazos" className={styles.section}>
          <h2>Prazos de conservação</h2>
          <p><strong>Orçamentos sem contratação:</strong> os e-mails e dados associados são mantidos por até seis meses após o último contato. Depois desse prazo, serão excluídos das caixas e registros de atendimento sob controle de Filipe, salvo necessidade específica de conservação prevista em lei.</p>
          <p><strong>Projetos contratados:</strong> os dados necessários à execução do serviço permanecem durante a relação contratual. Após seu término, apenas os registros necessários para obrigações legais e defesa de direitos são conservados pelos respectivos prazos aplicáveis.</p>
          <p>Registros técnicos da hospedagem e cópias de segurança dos provedores seguem os ciclos de conservação e exclusão desses serviços. O prazo de seis meses do atendimento não significa exclusão imediata de todas as cópias de segurança mantidas pelos provedores.</p>
        </section>

        <section id="navegacao" className={styles.section}>
          <h2>Navegação e cookies</h2>
          <p>Esta versão do site não incorpora ferramentas de publicidade, pixels de rastreamento ou serviços de análise de audiência, e não utiliza cookies para guardar os campos do formulário. Isso não impede o processamento dos registros técnicos da hospedagem descritos acima.</p>
          <p>Fontes e imagens das páginas são servidas pelo próprio site. Ao abrir um link externo, como créditos de fotografias, você passa a acessar outro serviço, sujeito ao aviso de privacidade dele.</p>
        </section>

        <section id="direitos" className={styles.section}>
          <h2>Seus direitos</h2>
          <p>Nos termos da LGPD, você pode pedir confirmação e acesso aos dados, correção, informações sobre compartilhamento e, quando aplicável, portabilidade, anonimização, bloqueio ou exclusão. Pode também questionar tratamento irregular e exercer direitos relativos ao consentimento quando essa for a base utilizada.</p>
          <p>Envie sua solicitação gratuitamente para <a href={contactHref}>fbalbuquerque@proton.me</a>, indicando o pedido e o contato utilizado na conversa. Poderão ser solicitadas apenas as informações necessárias para confirmar sua identidade. A resposta observará os prazos legais e explicará eventual limitação de atendimento.</p>
          <p>Você também pode recorrer à <a href="https://www.gov.br/anpd/pt-br/canais_atendimento/cidadao-titular-de-dados/denuncia-peticao-de-titular-referente-lgpd" target="_blank" rel="noopener noreferrer">Agência Nacional de Proteção de Dados (abre em nova aba)</a>.</p>
        </section>

        <section className={styles.section}>
          <h2>Atualizações deste aviso</h2>
          <p>Mudanças no formulário, nos serviços ou nos provedores podem exigir a atualização deste texto. A data no início da página identifica a versão vigente; alterações relevantes na finalidade do uso dos dados serão informadas aos titulares afetados.</p>
          <p>Referência legal: <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener noreferrer">Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/2018 (abre em nova aba)</a>.</p>
        </section>
        <Link href="/#contato" className="action action-primary mt-10">Voltar ao formulário <span aria-hidden="true">↗</span></Link>
      </main>
      <footer className="bg-ink px-gutter text-paper"><div className="mx-auto max-w-editorial"><Footer homePath="/" /></div></footer>
    </>
  );
}
