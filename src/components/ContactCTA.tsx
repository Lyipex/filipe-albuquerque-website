import Footer from "./Footer";

import ActionLink from "./ActionLink";
import { contactHref } from "@/lib/site";

export default function ContactCTA() {
  return (
    <footer id="contato" tabIndex={-1} aria-labelledby="contato-title" className="bg-ink px-gutter pt-section text-paper">
      <div className="mx-auto max-w-editorial">
        <div data-motion="reveal" className="pb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-eyebrow text-paper">Nº 05 - Contato</p>
            <h2 id="contato-title" className="mt-6 max-w-3xl text-section-title font-medium leading-heading tracking-heading">Vamos conversar sobre o seu site?</h2>
            <p className="mt-5 max-w-[48ch] text-body leading-7 text-paper/80">Conte o que sua empresa faz e o que precisa no site. Se já tiver um site ou uma data em mente, inclua essas informações no e-mail.</p>
            <ActionLink href={contactHref} variant="primary" tone="inverse" className="mt-6">Solicitar orçamento por e-mail <span aria-hidden="true">↗</span></ActionLink>
          </div>
        </div>
        <Footer />
      </div>
    </footer>
  );
}
