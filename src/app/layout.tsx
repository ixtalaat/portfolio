import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const siteBase =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ixtalaat.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteBase),
  title: "Talaat Ramadan — Software Engineer for Hire",
  description:
    "Freelance Software Engineer specializing in ASP.NET Core, Laravel, Node.js (Express, NestJS), Angular & Next.js. I build business web apps, booking platforms, dashboards and clean APIs. View work: Tazkara, OrderFlow, Tamayoz, HomeTech.",
  keywords: [
    "Freelance Software Engineer",
    "ASP.NET Core Developer",
    "Laravel Developer",
    "Node.js Developer",
    "NestJS Developer",
    "Express Developer",
    "Angular Developer",
    "Next.js Freelancer",
    "Talaat Ramadan",
  ],
  authors: [{ name: "Talaat Ramadan" }],
  alternates: {
    canonical: `${siteBase}/`,
    languages: {
      en: `${siteBase}/`,
      ar: `${siteBase}/ar`,
      "x-default": `${siteBase}/`,
    },
  },
  openGraph: {
    title: "Talaat Ramadan — Software Engineer for Hire",
    description:
      "I turn your ideas into fast, reliable web apps. ASP.NET Core • Laravel • Node.js (Express, NestJS) • Angular • Next.js",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talaat Ramadan — Software Engineer for Hire",
    description:
      "I turn your ideas into fast, reliable web apps. ASP.NET Core • Laravel • Node.js • Angular • Next.js",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
