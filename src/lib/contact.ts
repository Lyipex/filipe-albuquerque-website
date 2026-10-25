import { serviceOptions } from "./site";

export const contactLimits = { fullName: 120, replyContact: 254, description: 2000, bodyBytes: 16384 } as const;
export type ContactField = "fullName" | "replyChannel" | "replyContact" | "services" | "description";
export type ContactErrors = Partial<Record<ContactField, string>>;
export type ContactRequest = {
  fullName: string;
  replyChannel: "email" | "whatsapp";
  replyContact: string;
  services: string[];
  description: string;
};

export function validEmail(value: string) {
  return value.length <= 254 && /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(value)
    && !value.split("@")[0].includes("..") && !value.startsWith(".") && !value.split("@")[0].endsWith(".");
}

export function validateContact(input: unknown): { data?: ContactRequest; errors: ContactErrors } {
  const record = input && typeof input === "object" && !Array.isArray(input) ? input as Record<string, unknown> : {};
  const text = (key: string) => typeof record[key] === "string" ? record[key] as string : "";
  const errors: ContactErrors = {};
  const fullName = text("fullName").trim().replace(/ +/g, " ");
  const replyChannel = text("replyChannel");
  let replyContact = text("replyContact").trim();
  const description = text("description").trim();
  const singleLineControl = /[\u0000-\u001f\u007f]/;
  if (!fullName || fullName.length > contactLimits.fullName || singleLineControl.test(fullName)) errors.fullName = "Informe seu nome, com até 120 caracteres.";
  if (replyChannel !== "email" && replyChannel !== "whatsapp") errors.replyChannel = "Escolha WhatsApp ou E-mail para receber o retorno.";
  if (replyChannel === "email" && !validEmail(replyContact)) errors.replyContact = "Informe um e-mail válido.";
  if (replyChannel === "whatsapp") {
    const digits = replyContact.replace(/\D/g, "");
    if (replyContact.length > 30 || !/^\+?[\d () .-]+$/.test(replyContact) || digits.length < 10 || digits.length > 15) errors.replyContact = "Informe um WhatsApp com DDD e de 10 a 15 dígitos.";
    else replyContact = `${replyContact.startsWith("+") ? "+" : ""}${digits}`;
  }
  const suppliedServices = record.services;
  if (!Array.isArray(suppliedServices) || !suppliedServices.length || suppliedServices.length > serviceOptions.length || suppliedServices.some((item) => typeof item !== "string" || !(serviceOptions as readonly string[]).includes(item))) errors.services = "Selecione pelo menos um dos serviços disponíveis.";
  const services = serviceOptions.filter((service) => Array.isArray(suppliedServices) && suppliedServices.includes(service));
  if ((record.description !== undefined && typeof record.description !== "string") || description.length > contactLimits.description || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(description)) errors.description = "Use até 2.000 caracteres na descrição, sem caracteres de controle.";
  if (Object.keys(errors).length) return { errors };
  return { data: { fullName, replyChannel: replyChannel as ContactRequest["replyChannel"], replyContact, services, description }, errors };
}

export function buildContactEmail(request: ContactRequest) {
  return {
    subject: `Pedido de orçamento | ${request.services.join(", ")}`,
    text: [
      "PEDIDO DE ORÇAMENTO | FA WEB STUDIO", "",
      `Nome: ${request.fullName}`,
      `Serviços: ${request.services.join(", ")}`,
      `Canal de retorno: ${request.replyChannel === "email" ? "E-mail" : "WhatsApp"}`,
      `Contato para retorno: ${request.replyContact}`, "", "Descrição do projeto:",
      request.description || "Não informada.",
    ].join("\n"),
    ...(request.replyChannel === "email" ? { reply_to: request.replyContact } : {}),
  };
}
