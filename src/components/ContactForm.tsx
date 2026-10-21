"use client";

import { useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { contactEmail, contactHref, serviceOptions } from "@/lib/site";
import { contactLimits, validateContact, type ContactErrors, type ContactField } from "@/lib/contact";
import styles from "./ContactForm.module.css";
import Link from "next/link";

const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export default function ContactForm() {
  const id = useId();
  const hydrated = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  const [fullName, setFullName] = useState("");
  const [channel, setChannel] = useState<"" | "email" | "whatsapp">("");
  const [contacts, setContacts] = useState({ email: "", whatsapp: "" });
  const [selected, setSelected] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const servicesRef = useRef<HTMLDetailsElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const sending = useRef(false);

  function edit(field: ContactField) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
    setMessage("");
  }

  function showErrors(form: HTMLFormElement, fieldErrors: ContactErrors, text: string) {
    setErrors(fieldErrors);
    setStatus("error");
    setMessage(text);
    requestAnimationFrame(() => {
      const first = (Object.keys(fieldErrors) as ContactField[]).find((field) => fieldErrors[field]);
      if (first === "services") {
        if (servicesRef.current) servicesRef.current.open = true;
        servicesRef.current?.querySelector<HTMLInputElement>("input")?.focus();
      } else if (first) {
        form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      } else errorRef.current?.focus();
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || status === "success") return;
    const form = event.currentTarget;
    const raw = { fullName, replyChannel: channel, replyContact: channel ? contacts[channel] : "", services: selected, description };
    const { data, errors: fieldErrors } = validateContact(raw);
    if (!data) {
      showErrors(form, fieldErrors, "Revise os campos indicados antes de enviar.");
      return;
    }
    sending.current = true;
    setStatus("sending");
    setMessage("Enviando seu pedido…");
    setErrors({});
    try {
      const website = new FormData(form).get("website") ?? "";
      const response = await fetch("/api/orcamento", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website }), signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok || result.accepted !== true) {
        const fieldErrors: ContactErrors = {};
        for (const field of ["fullName", "replyChannel", "replyContact", "services", "description"] as const) {
          if (typeof result.fieldErrors?.[field] === "string") fieldErrors[field] = result.fieldErrors[field];
        }
        showErrors(form, fieldErrors, typeof result.message === "string" ? result.message : "O serviço não confirmou o envio. Tente novamente; seus dados continuam preenchidos.");
        return;
      }
      setStatus("success");
      setMessage(result.simulation ? "Simulação concluída: pedido aceito no teste. Nenhuma mensagem real foi enviada." : "Pedido aceito pelo serviço de envio. O canal escolhido foi informado para o retorno. Isso não garante a entrega do e-mail.");
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      showErrors(form, {}, `Não foi possível confirmar o envio. Seus dados continuam preenchidos. Confira sua conexão e tente novamente ou escreva para ${contactEmail}.`);
    } finally { sending.current = false; }
  }

  const fieldError = (field: ContactField) => errors[field] ? `${id}-${field}-error` : undefined;
  const renderError = (field: ContactField) => errors[field] && <p id={`${id}-${field}-error`} className={styles.error}>{errors[field]}</p>;

  return (
    <form className={styles.form} action="/api/orcamento" method="post" noValidate onSubmit={submit} aria-label="Solicitar orçamento" aria-describedby={`${id}-required ${id}-delivery`}>
      <p id={`${id}-required`} className={styles.hint}><span aria-hidden="true">*</span> Campos obrigatórios</p>
      <fieldset className={styles.fields} disabled={status === "sending"} aria-busy={status === "sending"}>
        <legend className="sr-only">Dados do pedido de orçamento</legend>
        <div className={styles.field}>
          <label htmlFor={`${id}-fullName`}>Seu nome <span className={styles.required} aria-hidden="true">*</span></label>
          <input id={`${id}-fullName`} name="fullName" autoComplete="name" required maxLength={contactLimits.fullName} value={fullName} aria-invalid={!!errors.fullName || undefined} aria-describedby={fieldError("fullName")} onChange={(event) => { setFullName(event.target.value); edit("fullName"); }} />
          {renderError("fullName")}
        </div>
        <fieldset className={styles.channel} aria-describedby={fieldError("replyChannel")} aria-invalid={!!errors.replyChannel || undefined}>
          <legend>Como prefere receber meu retorno? <span aria-hidden="true">*</span></legend>
          <div className={styles.channelOptions}>
            {([["whatsapp", "WhatsApp"], ["email", "E-mail"]] as const).map(([value, label]) => <label key={value} className={styles.channelOption}>
              <input type="radio" name="replyChannel" value={value} checked={channel === value} required onChange={() => { setChannel(value); edit("replyChannel"); setErrors((current) => ({ ...current, replyContact: undefined })); }} />
              {label}
            </label>)}
          </div>
          {renderError("replyChannel")}
        </fieldset>
        {channel && <div className={styles.field}>
          <label htmlFor={`${id}-replyContact`}>{channel === "email" ? "Seu e-mail" : "Seu WhatsApp"} <span className={styles.required} aria-hidden="true">*</span></label>
          <input key={channel} id={`${id}-replyContact`} name="replyContact" type={channel === "email" ? "email" : "tel"} inputMode={channel === "email" ? "email" : "tel"} autoComplete={channel === "email" ? "email" : "tel"} required maxLength={channel === "email" ? contactLimits.replyContact : 30} placeholder={channel === "email" ? "voce@exemplo.com" : "DDD + número"} value={contacts[channel]} aria-invalid={!!errors.replyContact || undefined} aria-describedby={fieldError("replyContact")} onChange={(event) => { setContacts((current) => ({ ...current, [channel]: event.target.value })); edit("replyContact"); }} />
          {renderError("replyContact")}
        </div>}
        <div className={styles.field}>
          <span id={`${id}-services-label`}>Quais serviços você procura? <span className={styles.required} aria-hidden="true">*</span></span>
          <details ref={servicesRef} className={styles.dropdown} onKeyDown={(event) => {
            if (event.key === "Escape") { event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); }
          }}>
            <summary aria-labelledby={`${id}-services-label ${id}-selection`} aria-describedby={fieldError("services")} aria-invalid={!!errors.services || undefined}>
              <span id={`${id}-selection`}>{selected.length ? selected.join(", ") : "Selecione um ou mais serviços"}</span><span aria-hidden="true">⌄</span>
            </summary>
            <fieldset className={styles.options}>
              <legend className="sr-only">Selecione pelo menos um serviço (obrigatório)</legend>
              {serviceOptions.map((service, index) => <label key={service} className={styles.option}>
                <input type="checkbox" name="services" value={service} required={index === 0 && selected.length === 0} checked={selected.includes(service)} aria-describedby={fieldError("services")} onChange={(event) => { setSelected((current) => event.target.checked ? [...current, service] : current.filter((item) => item !== service)); edit("services"); }} />{service}
              </label>)}
            </fieldset>
          </details>
          {renderError("services")}
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-description`}>Conte um pouco sobre o projeto</label>
          <textarea id={`${id}-description`} name="description" rows={3} maxLength={contactLimits.description} placeholder="O que você precisa? Se já tiver um site, pode incluir o link." value={description} aria-invalid={!!errors.description || undefined} aria-describedby={fieldError("description")} onChange={(event) => { setDescription(event.target.value); edit("description"); }} />
          {renderError("description")}
        </div>
        <div className={styles.trap} aria-hidden="true"><label htmlFor={`${id}-website`}>Deixe este campo vazio</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
      </fieldset>
      <p id={`${id}-delivery`} className={styles.hint}>Seu pedido é enviado pelo site. Você recebe a confirmação quando o serviço de envio o aceita.</p>
      <p className={styles.hint}>Seus dados serão usados para responder ao pedido e preparar o orçamento. <Link href="/privacidade" target="_blank" rel="noopener noreferrer" className={styles.privacyLink}>Leia o aviso de privacidade<span className="sr-only"> (abre em nova aba)</span></Link>.</p>
      <button type="submit" disabled={!hydrated || status === "sending" || status === "success"} className={`action action-primary ${styles.submit}`}>{status === "sending" ? "Enviando pedido…" : "Enviar pedido de orçamento"} <span aria-hidden="true">↗</span></button>
      <noscript><p className={styles.hint}>Para usar o formulário, ative JavaScript. Você também pode escrever para <a href={contactHref} className={styles.privacyLink}>{contactEmail}</a>.</p></noscript>
      <p ref={errorRef} tabIndex={-1} role="alert" className={styles.error}>{status === "error" ? message : ""}</p>
      <p ref={statusRef} tabIndex={-1} role="status" aria-live="polite" aria-atomic="true" className={styles.hint}>{status === "sending" || status === "success" ? message : ""}</p>
    </form>
  );
}
