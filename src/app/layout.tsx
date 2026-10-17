import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Outfit } from "next/font/google";
import { CookieConsent } from "@/components/organisms/cookie-consent";
import { SiteModsPanel } from "@/components/shared/site-mods/site-mods-panel";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alfa",
  description:
    "Alfa, votre centre d'affaires à Rouen, spécialiste de la domiciliation d'entreprises & de la location de bureaux individuels ou partagés.",
  manifest: "/marque/site.webmanifest",
  icons: {
    icon: [
      { url: "/marque/favicon.ico" },
      {
        url: "/marque/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/marque/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/marque/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        {children}
        <CookieConsent />
        {process.env.NODE_ENV !== "production" ? <SiteModsPanel /> : null}
      </body>
    </html>
  );
}
