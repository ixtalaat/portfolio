import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
  openGraph: {
    title: "Talaat Ramadan — Software Engineer for Hire",
    description:
      "I turn your ideas into fast, reliable web apps. ASP.NET Core • Laravel • Node.js (Express, NestJS) • Angular • Next.js",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
