import type { Metadata } from "next";
import { isIP } from "node:net";

const productionUrl = "https://filipealbuquerque.netlify.app";

export function resolveSiteUrl(value?: string): URL {
  try {
    const url = new URL(value?.trim() || productionUrl);
    if (
      url.protocol !== "https:" || url.username || url.password || url.port ||
      url.pathname !== "/" || url.search || url.hash ||
      !url.hostname.includes(".") || url.hostname.endsWith(".localhost") ||
      isIP(url.hostname.replace(/^\[|\]$/g, ""))
    ) return new URL(productionUrl);
    return url;
  } catch {
    return new URL(productionUrl);
  }
}

export const siteUrl = resolveSiteUrl();
const isProduction = process.env.NODE_ENV === "production";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, siteUrl).href;
  return {
    metadataBase: siteUrl,
    title,
    description,
    alternates: { canonical: url },
    robots: { index: isProduction, follow: isProduction },
    openGraph: {
      title,
      description,
      url,
      siteName: "Filipe Albuquerque | Sites e Soluções Digitais",
      locale: "pt_BR",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
