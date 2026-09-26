import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/data/blog";
import { WHATSAPP, GITHUB, LINKEDIN, EMAIL } from "@/data/content";
import { Reveal } from "@/components/anim";
import { SiteNav, SiteFooter } from "@/components/site";
import { CV_PATH } from "@/data/content";

export const metadata: Metadata = {
  title: "Blog — notes on building business software | Talaat Ramadan",
  description:
    "Short practical articles on order systems, booking platforms, and admin panels. ASP.NET Core, Laravel, Angular, Node.js.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <SiteNav lang="en" altHref="/ar" altLabel="عربي" cvPath={CV_PATH} whatsapp={WHATSAPP} />
      <main id="main" className="mx-auto max-w-5xl px-5 py-10">
        <Reveal>
          <Link href="/" className="text-sm text-zinc-400 transition hover:text-white">← Home</Link>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">Blog</h1>
          <div className="gradient-underline" />
          <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
            Short, practical notes from real projects — what works, what breaks, and what to ask your developer.
          </p>
          <a href="/blog/rss.xml" className="mt-3 inline-block rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-400 transition hover:bg-white/10 hover:text-white">
            📡 RSS feed
          </a>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 120} className="h-full">
              <Link href={`/blog/${p.slug}`} className="card-lift group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-green-500/40">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
                  ))}
                </div>
                <h2 className="mt-3 text-xl font-bold text-white transition-colors group-hover:text-green-300">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                  <span>{p.date} • {p.readTime}</span>
                  <span className="font-semibold text-green-400 transition-transform group-hover:translate-x-1">Read →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="animate-gradient mt-10 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-600 p-6 text-zinc-950 md:p-8">
            <p className="text-lg font-bold">Want this thinking applied to your project?</p>
            <p className="mt-1 text-sm font-medium">I reply with price + timeline within 24h.</p>
            <a href={WHATSAPP} target="_blank" className="btn-glow mt-4 inline-block rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-bold text-white">Chat on WhatsApp →</a>
          </div>
        </Reveal>
        <SiteFooter lang="en" email={EMAIL} linkedin={LINKEDIN} github={GITHUB} />
      </main>
    </div>
  );
}
