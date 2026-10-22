import Footer from "./Footer";
import ContactForm from "./ContactForm";

export default function ContactCTA() {
  return (
    <footer id="contato" tabIndex={-1} aria-labelledby="contato-title" className="bg-ink px-gutter pt-section text-paper">
      <div className="mx-auto max-w-editorial">
        <div className="grid items-start gap-10 pb-12 lg:grid-cols-2 lg:gap-20">
          <div data-motion="reveal">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-paper">Nº 05 - Contato</p>
            <h2 id="contato-title" className="mt-6 max-w-lg text-section-title font-medium leading-heading tracking-heading">Vamos conversar sobre o seu projeto?</h2>
            <p className="mt-5 max-w-[40ch] text-body leading-7 text-paper/80">Conte um pouco sobre o que você tem em mente. Não precisa ter tudo definido agora. Com essas primeiras informações, podemos conversar e encontrar o melhor caminho para o seu projeto.</p>
          </div>
          <ContactForm />
        </div>
        <Footer />
      </div>
    </footer>
  );
}
