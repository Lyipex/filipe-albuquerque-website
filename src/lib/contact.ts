export type ContactRequest = {
  firstName: string;
  lastName: string;
  phone: string;
  services: string[];
  description: string;
};

export function buildContactMailto(recipient: string, request: ContactRequest) {
  const body = [
    `Nome: ${request.firstName.trim()} ${request.lastName.trim()}`,
    `WhatsApp: ${request.phone.trim() || "Não informado"}`,
    `Serviços: ${request.services.join(", ") || "A definir"}`,
    "",
    "Descrição do projeto:",
    request.description.trim() || "Não informada",
  ].join("\n");
  return `${recipient}?subject=${encodeURIComponent("Solicitação de orçamento")}&body=${encodeURIComponent(body)}`;
}
