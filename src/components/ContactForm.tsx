"use client";

import { useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { contactHref, serviceOptions } from "@/lib/site";
import { buildContactMailto } from "@/lib/contact";
import styles from "./ContactForm.module.css";
import Link from "next/link";

const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export default function ContactForm() {
  const id = useId();
  const hydrated = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  const [selected, setSelected] = useState<string[]>([]);
  const [opened, setOpened] = useState(false);
  const [servicesError, setServicesError] = useState(false);
  const servicesRef = useRef<HTMLDetailsElement>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const name of ["firstName", "lastName"]) {
      const input = form.elements.namedItem(name) as HTMLInputElement;
      if (!input.value.trim()) {
        input.setCustomValidity("Preencha este campo.");
        input.reportValidity();
        return;
      }
    }
    const data = new FormData(form);
    if (data.getAll("services").length === 0) {
      setServicesError(true);
      if (servicesRef.current) {
        servicesRef.current.open = true;
        servicesRef.current.querySelector<HTMLInputElement>("input")?.focus();
      }
      return;
    }
    const text = (name: string) => String(data.get(name) ?? "");
    const href = buildContactMailto(contactHref, {
      firstName: text("firstName"),
      lastName: text("lastName"),
      phone: text("phone"),
      services: data.getAll("services").map(String),
      description: text("description"),
    });
    window.location.assign(href);
    setOpened(true);
  }

  return (
    <form className={styles.form} action={contactHref} method="post" encType="text/plain" onSubmit={submit} aria-label="Solicitar orçamento" aria-describedby={`${id}-required ${id}-delivery`}>
      <p id={`${id}-required`} className={styles.hint}><span aria-hidden="true">*</span> Campos obrigatórios</p>
      <div className={styles.names}>
        <label className={styles.field} htmlFor={`${id}-firstName`}>
          Nome <span className={styles.required} aria-hidden="true">*</span>
          <input id={`${id}-firstName`} name="firstName" autoComplete="given-name" required maxLength={80} onInput={(event) => event.currentTarget.setCustomValidity("")} />
        </label>
        <label className={styles.field} htmlFor={`${id}-lastName`}>
          Sobrenome <span className={styles.required} aria-hidden="true">*</span>
          <input id={`${id}-lastName`} name="lastName" autoComplete="family-name" required maxLength={80} onInput={(event) => event.currentTarget.setCustomValidity("")} />
        </label>
      </div>
      <label className={styles.field} htmlFor={`${id}-phone`}>
        WhatsApp <span className={styles.optional}>(opcional)</span>
        <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="DDD + número" />
      </label>
      <div className={styles.field}>
        <span id={`${id}-services-label`}>Quais serviços você procura? <span className={styles.required} aria-hidden="true">*</span></span>
        <details ref={servicesRef} className={styles.dropdown} onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.currentTarget.open = false;
            event.currentTarget.querySelector("summary")?.focus();
          }
        }}>
          <summary aria-labelledby={`${id}-services-label ${id}-selection`} aria-describedby={servicesError ? `${id}-services-error` : undefined} aria-invalid={servicesError || undefined}>
            <span id={`${id}-selection`}>{selected.length ? selected.join(", ") : "Selecione um ou mais serviços"}</span>
            <span aria-hidden="true">⌄</span>
          </summary>
          <fieldset className={styles.options}>
            <legend className="sr-only">Selecione pelo menos um serviço (obrigatório)</legend>
            {serviceOptions.map((service, index) => (
              <label key={service} className={styles.option}>
                <input type="checkbox" name="services" value={service} required={index === 0 && selected.length === 0} checked={selected.includes(service)} aria-describedby={servicesError ? `${id}-services-error` : undefined} onInvalid={(event) => {
                  setServicesError(true);
                  // Keep the browser's first invalid name field focused when it is also empty.
                  if (event.currentTarget.form?.querySelector("input:invalid, textarea:invalid, select:invalid") === event.currentTarget) {
                    event.preventDefault();
                    if (servicesRef.current) servicesRef.current.open = true;
                    requestAnimationFrame(() => servicesRef.current?.querySelector<HTMLInputElement>("input")?.focus());
                  }
                }} onChange={(event) => {
                  setServicesError(false);
                  setSelected((current) => event.target.checked ? [...current, service] : current.filter((item) => item !== service));
                }} />
                {service}
              </label>
            ))}
          </fieldset>
        </details>
        {servicesError && <p id={`${id}-services-error`} role="alert" className={styles.error}>Selecione pelo menos um serviço para solicitar o orçamento.</p>}
      </div>
      <label className={styles.field} htmlFor={`${id}-description`}>
        Conte um pouco sobre o projeto
        <textarea id={`${id}-description`} name="description" rows={3} maxLength={2000} placeholder="O que você precisa? Se já tiver um site, pode incluir o link." />
      </label>
      <p id={`${id}-delivery`} className={styles.hint}>O botão abre seu aplicativo de e-mail com os dados preenchidos. Revise a mensagem e envie por lá.</p>
      <p className={styles.hint}>Seus dados serão usados para responder ao pedido e preparar o orçamento. <Link href="/privacidade" target="_blank" rel="noopener noreferrer" className={styles.privacyLink}>Leia o aviso de privacidade<span className="sr-only"> (abre em nova aba)</span></Link>.</p>
      <button type="submit" disabled={!hydrated} className={`action action-primary ${styles.submit}`}>Solicitar orçamento por e-mail <span aria-hidden="true">↗</span></button>
      <noscript><p className={styles.hint}>Para solicitar um orçamento sem JavaScript, escreva para <a href={contactHref} className={styles.privacyLink}>fbalbuquerque@proton.me</a>.</p></noscript>
      <p role="status" className={styles.hint}>{opened ? "Se o aplicativo não abriu, envie seu pedido para fbalbuquerque@proton.me. Seus dados continuam preenchidos aqui." : ""}</p>
    </form>
  );
}
