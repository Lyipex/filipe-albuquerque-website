import Footer from "./Footer";
import ContactForm from "./ContactForm";
import ActionLink from "./ActionLink";

export default function ContactCTA() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  const whatsappUrl = whatsappNumber && /^[1-9]\d{7,14}$/.test(whatsappNumber)
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá! Conheci a Marginália pelo site e gostaria de conversar sobre um projeto.")}`
    : null;
  const whatsappAction = <>
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
      <path d="M20.52 3.48A11.91 11.91 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a11.94 11.94 0 0 0 5.8 1.48h.01c6.58 0 11.93-5.35 11.94-11.93a11.85 11.85 0 0 0-3.48-8.43ZM12.06 21.82a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.88 9.88 0 0 1-1.52-5.28c0-5.47 4.46-9.92 9.93-9.92a9.85 9.85 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.97 9.88Z" />
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.35.19 1.86.12.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
    <span>Conversar pelo WhatsApp</span>
    <span aria-hidden="true" className="text-xs">↗</span>
  </>;

  return (
    <footer id="contato" tabIndex={-1} aria-labelledby="contato-title" className="bg-ink px-gutter pt-section text-paper">
      <div className="mx-auto max-w-editorial">
        <div className="grid items-start gap-10 pb-12 lg:grid-cols-2 lg:gap-20">
          <div data-motion="reveal">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-paper">Nº 05 - Contato</p>
            <h2 id="contato-title" className="mt-6 max-w-lg text-section-title font-medium leading-heading tracking-heading">Vamos conversar sobre o seu projeto?</h2>
            <p className="mt-5 max-w-[40ch] text-body leading-7 text-paper/80">Conte um pouco sobre o que você tem em mente. Não precisa ter tudo definido agora. Com essas primeiras informações, podemos conversar e encontrar o melhor caminho para o seu projeto.</p>
          </div>
          <div>
            <ContactForm />
            <div className="mt-6">
              <div className="flex items-center gap-4 text-xs text-paper/60">
                <span aria-hidden="true" className="h-px flex-1 bg-paper/20" />
                <span>ou</span>
                <span aria-hidden="true" className="h-px flex-1 bg-paper/20" />
              </div>
              <p className="mt-6 text-sm font-medium">Prefere falar pelo WhatsApp?</p>
              {whatsappUrl ? <ActionLink href={whatsappUrl} target="_blank" rel="noopener noreferrer" variant="secondary" tone="inverse" className="mt-4">
                {whatsappAction}<span className="sr-only"> (abre em nova aba)</span>
              </ActionLink> : <button type="button" disabled data-tone="inverse" className="action action-secondary mt-4 cursor-not-allowed opacity-60">{whatsappAction}</button>}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </footer>
  );
}
