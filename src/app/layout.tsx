import type { Metadata } from "next";
import { Anton, Montserrat, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const sans = Montserrat({ subsets: ["latin"], variable: "--font-sans", weight: ["300", "400", "500", "600", "700", "800"] });
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", style: ["normal", "italic"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "CITEC 2026 — Congresso de Inovação, Tecnologia e Construção Civil",
  description:
    "Da sala de aula ao mercado de trabalho. 10 a 13 de junho de 2026, no Auditório Afya Uninovafapi — Teresina, PI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="font-sans min-h-screen flex flex-col bg-ink overflow-x-hidden">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
