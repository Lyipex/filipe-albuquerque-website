import "server-only";
import type { ContactDependencies } from "./contact-handler";
import type { Reservation } from "./contact-guard";

// Explicitly local, development-only simulation. No network requests or real messages.
const entries = new Map<string, { token: string; status: "pending" | "retry" | "accepted" }>();
const attempted = new Set<string>();

export function simulationDependencies(origin: string): ContactDependencies {
  return {
    origin, secret: "local-simulation-secret-never-use-in-production", vercel: false, simulation: true,
    guard: {
      async reserve(fingerprint) {
        let entry = entries.get(fingerprint);
        if (!entry) {
          entry = { token: crypto.randomUUID(), status: "retry" };
          entries.set(fingerprint, entry);
        }
        const status: Reservation["status"] = entry.status === "accepted" ? "accepted" : entry.status === "pending" ? "busy" : "reserved";
        if (status === "reserved") entry.status = "pending";
        return { token: entry.token, status, retryAfter: 1 };
      },
      async finish(fingerprint, token, status) {
        const entry = entries.get(fingerprint);
        if (entry?.token === token) entry.status = status;
      },
    },
    async send(_request, token) {
      await new Promise((resolve) => setTimeout(resolve, 1400));
      if (!attempted.has(token)) {
        attempted.add(token);
        throw new Error("simulated_first_attempt_failure");
      }
    },
  };
}
