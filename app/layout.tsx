import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AmbientOrbs } from "@/components/ambient-orbs";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site-data";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteTitle,
    template: `%s | ${siteConfig.brand}`,
  },
  description: siteConfig.description,
  keywords: [
    "portofolio",
    "cloud engineer",
    "system architect",
    "video production",
    "forensik seluler",
    "ANIZONE-X",
  ],
  authors: [{ name: siteConfig.founder }],
  openGraph: {
    title: siteConfig.siteTitle,
    description: siteConfig.description,
    siteName: siteConfig.brand,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${manrope.variable} h-full scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-background font-body text-foreground antialiased">
        <div className="relative isolate flex min-h-screen flex-col overflow-x-hidden">
          <ScrollEffects />
          <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(0,240,255,0.12),_transparent_36%),radial-gradient(circle_at_85%_20%,_rgba(196,94,255,0.12),_transparent_22%),linear-gradient(180deg,_rgba(10,11,13,1),_rgba(10,11,13,0.98))]" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:96px_96px] [mask-image:radial-gradient(circle_at_center,black,transparent_88%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_62%)]" />
          <AmbientOrbs />
          <SiteHeader />
          <main className="relative flex-1 pt-24">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
