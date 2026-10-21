import "server-only";
import { validEmail } from "../contact";
import { createContactHandler, resendSender, type ContactDependencies } from "./contact-handler";
import { redisContactGuard } from "./contact-guard";
import { simulationDependencies } from "./contact-simulation";

export function contactDependencies(request: Request): ContactDependencies | null {
  const localDevelopment = process.env.NODE_ENV === "development" && !process.env.VERCEL;
  if (localDevelopment && process.env.CONTACT_TEST_MODE === "1") {
    const url = new URL(request.url);
    // Test mode cannot be activated by a form field, query string or request header.
    const localHosts = ["localhost", "127.0.0.1", "[::1]"];
    try {
      const browserOrigin = new URL(request.headers.get("origin") ?? url.origin);
      if (localHosts.includes(url.hostname) && localHosts.includes(browserOrigin.hostname) && browserOrigin.port === url.port) return simulationDependencies(browserOrigin.origin);
    } catch { return null; }
    return null;
  }
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_ALLOWED_ORIGIN, CONTACT_HASH_SECRET, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !validEmail(CONTACT_FROM_EMAIL) || !CONTACT_ALLOWED_ORIGIN || !CONTACT_HASH_SECRET || CONTACT_HASH_SECRET.length < 32 || !UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) return null;
  try {
    const origin = new URL(CONTACT_ALLOWED_ORIGIN);
    const redisUrl = new URL(UPSTASH_REDIS_REST_URL);
    if (origin.origin !== CONTACT_ALLOWED_ORIGIN || origin.protocol !== "https:" || redisUrl.protocol !== "https:" || !redisUrl.hostname.endsWith(".upstash.io") || redisUrl.username || redisUrl.password) return null;
    // IP trust is tied to Vercel's edge. Do not trust arbitrary forwarded headers on another host.
    if (!process.env.VERCEL && !localDevelopment) return null;
    return {
      origin: origin.origin, secret: CONTACT_HASH_SECRET, vercel: !!process.env.VERCEL,
      guard: redisContactGuard(redisUrl.origin, UPSTASH_REDIS_REST_TOKEN),
      send: resendSender(RESEND_API_KEY, `Marginália <${CONTACT_FROM_EMAIL}>`),
    };
  } catch { return null; }
}

export const handleContactRequest = createContactHandler(contactDependencies);
