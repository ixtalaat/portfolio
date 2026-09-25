import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/data/blog";
import { WHATSAPP } from "@/data/content";

export const metadata: Metadata = {
  title: "Blog — notes on building business software | Talaat Ramadan",
  description:
    "Short practical articles on order systems, booking platforms, and admin panels. ASP.NET Core, Laravel, Angular, Node.js.",
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <Link href="/" className="font-bold text-white">ixtalaat<span className="text-green-400">.dev</span></Link>
          <div className="flex gap-2">
            <Link href="/ar" className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/10">عربي</Link>
            <a href={WHATSAPP} target="_blank" className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-green-400">Hire Me</a>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">
        <Link href="/" className="text-sm text-zinc-400 hover:text-white">← Home</Link>
        <h1 className="mt-4 text-4xl font-extrabold text-white">Blog</h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Short, practical notes from real projects — what works, what breaks, and what to ask your developer.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-green-500/40">
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
                ))}
              </div>
              <h2 className="mt-3 text-xl font-bold text-white">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                <span>{p.date} • {p.readTime}</span>
                <span className="font-semibold text-green-400">Read →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 rounded-3xl bg-green-500 p-6 text-zinc-950">
          <p className="font-bold">Want this thinking applied to your project?</p>
          <a href={WHATSAPP} target="_blank" className="mt-3 inline-block rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-bold text-white">Chat on WhatsApp →</a>
        </div>
      </main>
    </div>
  );
}
