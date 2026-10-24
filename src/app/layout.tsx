import { Figtree } from "next/font/google";
import { pageMetadata } from "@/lib/seo";
import "./globals.css";

const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });

export const metadata = pageMetadata(
  "Filipe Albuquerque | Sites e Soluções Digitais",
  "Sites institucionais, landing pages, redesign e chatbots para empresas e profissionais, com atenção ao conteúdo, à navegação e ao contato com clientes.",
  "/",
);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${figtree.variable} antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
