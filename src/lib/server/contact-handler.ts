import "server-only";
import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { buildContactEmail, contactLimits, validateContact, type ContactRequest } from "../contact";
import { contactEmail } from "../site";
import type { ContactGuard } from "./contact-guard";

export type ContactDependencies = {
  origin: string;
  secret: string;
  guard: ContactGuard;
  send: (request: ContactRequest, token: string) => Promise<void>;
  vercel: boolean;
  simulation?: boolean;
};

function json(status: number, body: object, retryAfter?: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}) } });
}

async function readBoundedJson(request: Request) {
  if (Number(request.headers.get("content-length")) > contactLimits.bodyBytes) throw new Error("too_large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid_json");
  const parts: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > contactLimits.bodyBytes) {
        await reader.cancel();
        throw new Error("too_large");
      }
      parts.push(part.value);
    }
    return JSON.parse(Buffer.concat(parts).toString("utf8"));
  } finally { reader.releaseLock(); }
}

export function createContactHandler(getDependencies: (request: Request) => ContactDependencies | null) {
  return async function handleContact(request: Request) {
    const origin = request.headers.get("origin");
    const dependencies = getDependencies(request);
    // Missing configuration must fail closed, never silently fall back to mailto or memory limits.
    if (!dependencies) return json(503, { message: `O envio pelo site está temporariamente indisponível. Seus dados foram preservados. Tente novamente ou escreva para ${contactEmail}.` });
    if (origin !== dependencies.origin || request.headers.get("sec-fetch-site") === "cross-site") return json(403, { message: "Não foi possível validar a origem do pedido. Reabra o site e tente novamente." });
    if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return json(415, { message: "Formato de pedido não aceito. Recarregue a página e tente novamente." });
    let raw: unknown;
    try { raw = await readBoundedJson(request); }
    catch (error) { return json(error instanceof Error && error.message === "too_large" ? 413 : 400, { message: "Não foi possível ler o pedido. Revise os campos e os limites de tamanho." }); }
    if (!raw || typeof raw !== "object" || Array.isArray(raw) || ("website" in raw && raw.website !== "")) return json(422, { message: "Não foi possível validar o pedido. Revise os campos e tente novamente." });
    const { data, errors } = validateContact(raw);
    if (!data) return json(422, { message: "Revise os campos indicados antes de enviar.", fieldErrors: errors });
    const forwarded = request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ?? "";
    if (dependencies.vercel && !isIP(forwarded)) return json(503, { message: "O envio está indisponível neste momento. Seus dados continuam preenchidos; tente novamente mais tarde." });
    const digest = (value: string) => createHmac("sha256", dependencies.secret).update(value).digest("hex");
    const fingerprint = digest(JSON.stringify(data));
    let reservation;
    try { reservation = await dependencies.guard.reserve(fingerprint, digest(dependencies.vercel ? forwarded : "local"), digest(`${data.replyChannel}:${data.replyContact.toLowerCase()}`)); }
    catch { return json(503, { message: "A proteção de envio está temporariamente indisponível. Nenhum novo envio foi iniciado. Tente novamente mais tarde." }); }
    const accepted = () => json(200, { accepted: true, ...(dependencies.simulation ? { simulation: true } : {}) });
    if (reservation.status === "accepted") return accepted();
    if (reservation.status === "busy") return json(409, { message: "Este pedido ainda está sendo processado. Aguarde um minuto e tente novamente; não é preciso reenviá-lo várias vezes." }, reservation.retryAfter);
    if (reservation.status === "limited") return json(429, { message: "Houve muitas tentativas em pouco tempo. Aguarde até 10 minutos antes de tentar novamente. Seus dados continuam preenchidos." }, reservation.retryAfter);
    try { await dependencies.send(data, reservation.token); }
    catch {
      try { await dependencies.guard.finish(fingerprint, reservation.token, "retry"); } catch { /* The existing reservation expires; do not log personal data. */ }
      return json(502, { message: "O serviço não confirmou o envio. Seus dados continuam preenchidos. Tente novamente; repetições do mesmo pedido são verificadas para evitar duplicação." });
    }
    // Only the provider acknowledgement allows a success response. A lost Redis write must not falsely report failure.
    try { await dependencies.guard.finish(fingerprint, reservation.token, "accepted"); } catch { /* Retries reuse the provider's idempotency key. */ }
    return accepted();
  };
}

export function resendSender(apiKey: string, from: string) {
  return async (request: ContactRequest, token: string) => {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `quote/${token}` },
      body: JSON.stringify({ from, to: [contactEmail], ...buildContactEmail(request) }),
      signal: AbortSignal.timeout(10000), cache: "no-store",
    });
    if (!response.ok) throw new Error("delivery_unconfirmed");
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id) throw new Error("delivery_unconfirmed");
  };
}
