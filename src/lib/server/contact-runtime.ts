import "server-only";
import { validEmail } from "../contact";
import { createContactHandler, resendSender, type ContactDependencies } from "./contact-handler";
import { redisContactGuard } from "./contact-guard";
import { simulationDependencies } from "./contact-simulation";

type InitializationCode = "CONTACT_CONFIG_MISSING" | "CONTACT_EMAIL_INVALID" | "CONTACT_SECRET_INVALID"
  | "CONTACT_ORIGIN_INVALID" | "CONTACT_UPSTASH_URL_INVALID" | "CONTACT_HOSTING_UNRECOGNIZED"
  | "CONTACT_SIMULATION_ORIGIN_INVALID" | "CONTACT_SIMULATION_REJECTED" | "CONTACT_INIT_FAILED";
type ConfigurationName = "RESEND_API_KEY" | "CONTACT_FROM_EMAIL" | "CONTACT_TO_EMAIL"
  | "CONTACT_ALLOWED_ORIGIN" | "CONTACT_HASH_SECRET" | "UPSTASH_REDIS_REST_URL" | "UPSTASH_REDIS_REST_TOKEN";

function initializationFailure(code: InitializationCode, variable?: ConfigurationName): null {
  // Only fixed codes and variable names: never log values, requests or exceptions.
  console.error("[contact:init]", { code, ...(variable ? { variable } : {}) });
  return null;
}

export function contactDependencies(request: Request): ContactDependencies | null {
  // SITE_ID and URL are read-only Netlify variables available in Functions at runtime.
  const netlify = !!process.env.SITE_ID && !!process.env.URL;
  const localDevelopment = process.env.NODE_ENV === "development" && !process.env.VERCEL && !netlify;
  if (localDevelopment && process.env.CONTACT_TEST_MODE === "1") {
    const url = new URL(request.url);
    // Test mode cannot be activated by a form field, query string or request header.
    const localHosts = ["localhost", "127.0.0.1", "[::1]"];
    try {
      const browserOrigin = new URL(request.headers.get("origin") ?? url.origin);
      if (localHosts.includes(url.hostname) && localHosts.includes(browserOrigin.hostname) && browserOrigin.port === url.port) return simulationDependencies(browserOrigin.origin);
    } catch { return initializationFailure("CONTACT_SIMULATION_ORIGIN_INVALID"); }
    return initializationFailure("CONTACT_SIMULATION_REJECTED");
  }
  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, CONTACT_ALLOWED_ORIGIN, CONTACT_HASH_SECRET, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;
  if (!RESEND_API_KEY) return initializationFailure("CONTACT_CONFIG_MISSING", "RESEND_API_KEY");
  if (!CONTACT_FROM_EMAIL) return initializationFailure("CONTACT_CONFIG_MISSING", "CONTACT_FROM_EMAIL");
  if (!validEmail(CONTACT_FROM_EMAIL)) return initializationFailure("CONTACT_EMAIL_INVALID", "CONTACT_FROM_EMAIL");
  if (!CONTACT_TO_EMAIL) return initializationFailure("CONTACT_CONFIG_MISSING", "CONTACT_TO_EMAIL");
  if (!validEmail(CONTACT_TO_EMAIL)) return initializationFailure("CONTACT_EMAIL_INVALID", "CONTACT_TO_EMAIL");
  if (!CONTACT_ALLOWED_ORIGIN) return initializationFailure("CONTACT_CONFIG_MISSING", "CONTACT_ALLOWED_ORIGIN");
  if (!CONTACT_HASH_SECRET) return initializationFailure("CONTACT_CONFIG_MISSING", "CONTACT_HASH_SECRET");
  if (CONTACT_HASH_SECRET.length < 32) return initializationFailure("CONTACT_SECRET_INVALID", "CONTACT_HASH_SECRET");
  if (!UPSTASH_REDIS_REST_URL) return initializationFailure("CONTACT_CONFIG_MISSING", "UPSTASH_REDIS_REST_URL");
  if (!UPSTASH_REDIS_REST_TOKEN) return initializationFailure("CONTACT_CONFIG_MISSING", "UPSTASH_REDIS_REST_TOKEN");
  let origin: URL;
  let redisUrl: URL;
  try { origin = new URL(CONTACT_ALLOWED_ORIGIN); }
  catch { return initializationFailure("CONTACT_ORIGIN_INVALID", "CONTACT_ALLOWED_ORIGIN"); }
  try { redisUrl = new URL(UPSTASH_REDIS_REST_URL); }
  catch { return initializationFailure("CONTACT_UPSTASH_URL_INVALID", "UPSTASH_REDIS_REST_URL"); }
  try {
    if (origin.origin !== CONTACT_ALLOWED_ORIGIN || origin.protocol !== "https:") return initializationFailure("CONTACT_ORIGIN_INVALID", "CONTACT_ALLOWED_ORIGIN");
    if (redisUrl.protocol !== "https:" || !redisUrl.hostname.endsWith(".upstash.io") || redisUrl.username || redisUrl.password) return initializationFailure("CONTACT_UPSTASH_URL_INVALID", "UPSTASH_REDIS_REST_URL");
    // Trust only the identified hosting provider's client-IP header.
    if (!process.env.VERCEL && !netlify && !localDevelopment) return initializationFailure("CONTACT_HOSTING_UNRECOGNIZED");
    return {
      origin: origin.origin, secret: CONTACT_HASH_SECRET, vercel: !!process.env.VERCEL, netlify,
      guard: redisContactGuard(redisUrl.origin, UPSTASH_REDIS_REST_TOKEN),
      send: resendSender(RESEND_API_KEY, `FA Web Studio <${CONTACT_FROM_EMAIL}>`, CONTACT_TO_EMAIL),
    };
  } catch { return initializationFailure("CONTACT_INIT_FAILED"); }
}

export const handleContactRequest = createContactHandler(contactDependencies);
