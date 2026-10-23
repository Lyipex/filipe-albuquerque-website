import type { Metadata } from "next";
import { isIP } from "node:net";

const provisionalUrl = "https://filipe-albuquerque-website.vercel.app";

export function resolveSiteUrl(value?: string): URL {
  try {
    const url = new URL(value?.trim() || provisionalUrl);
    if (
      url.protocol !== "https:" || url.username || url.password || url.port ||
      url.pathname !== "/" || url.search || url.hash ||
      !url.hostname.includes(".") || url.hostname.endsWith(".localhost") ||
      isIP(url.hostname.replace(/^\[|\]$/g, ""))
    ) return new URL(provisionalUrl);
    return url;
  } catch {
    return new URL(provisionalUrl);
  }
}

export const siteUrl = resolveSiteUrl(process.env.SITE_URL);

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, siteUrl).href;
  return {
    metadataBase: siteUrl,
    title,
    description,
    alternates: { canonical: url },
    // Changing SITE_URL never enables indexing. Release requires an explicit review.
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url,
      siteName: "Marginália",
      locale: "pt_BR",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}
