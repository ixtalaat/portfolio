import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, WHATSAPP, GITHUB, LINKEDIN, EMAIL, CV_PATH } from "@/data/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    openGraph: {
      title: p.seoTitle,
      description: p.seoDescription,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: p.seoDescription,
    author: { "@type": "Person", name: "Talaat Ramadan", email: EMAIL },
    url: p.live || p.github,
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="border-b border-white/10 bg-zinc-950/85">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <Link href="/" className="font-bold text-white">ixtalaat<span className="text-green-400">.dev</span></Link>
          <div className="flex gap-2">
            <a href={CV_PATH} download className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/10">CV ↓</a>
            <a href={WHATSAPP} target="_blank" className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-green-400">Hire Me</a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10">
        <Link href="/#work" className="text-sm text-zinc-400 hover:text-white">← Back to all work</Link>

        <div className="mt-4">
          <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300">{p.badge}</span>
          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">{p.name}</h1>
          <p className="mt-2 text-lg text-zinc-300">{p.tagline}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-zinc-400">{p.description}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.live && <a href={p.live} target="_blank" className="rounded-full bg-green-500 px-5 py-2.5 text-sm font-bold text-zinc-950 hover:bg-green-400">{p.liveLabel || "Live Demo"} ↗</a>}
          <a href={p.github} target="_blank" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">GitHub Code ↗</a>
          <a href={WHATSAPP} target="_blank" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">Want something like this? →</a>
        </div>

        <div className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-3">
          <div><p className="text-xs uppercase tracking-widest text-zinc-500">Role</p><p className="mt-1 text-sm text-white">{p.role}</p></div>
          <div><p className="text-xs uppercase tracking-widest text-zinc-500">Timeline</p><p className="mt-1 text-sm text-white">{p.timeline}</p></div>
          <div><p className="text-xs uppercase tracking-widest text-zinc-500">Best for</p><p className="mt-1 text-sm text-white">{p.clientType}</p></div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">
            <h2 className="text-xl font-bold text-white">The Problem</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.problem}</p>
          </div>
          <div className="rounded-3xl border border-green-500/30 bg-green-500/[0.06] p-6">
            <h2 className="text-xl font-bold text-white">The Solution</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{p.solution}</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-bold text-white">What was built</h2>
          <ul className="mt-4 grid gap-2 md:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="rounded-xl bg-zinc-900 px-4 py-3 text-sm text-zinc-300">✓ {f}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 p-6">
            <h2 className="text-xl font-bold text-white">Architecture</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              {p.architecture.map((a) => <li key={a}>• {a}</li>)}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((t) => (
                <span key={t} className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-bold text-white">Outcomes</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {p.results.map((r) => <li key={r}>✓ {r}</li>)}
            </ul>
            <div className="mt-6 rounded-2xl bg-green-500 p-5 text-zinc-950">
              <p className="font-bold">Need a similar system?</p>
              <p className="mt-1 text-sm">I&apos;ll scope price + timeline in 24h.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={WHATSAPP} target="_blank" className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white">WhatsApp →</a>
                <a href={`mailto:${EMAIL}`} className="rounded-full bg-white px-4 py-2 text-sm font-bold">Email →</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-white">More work</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/projects/${r.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-green-500/40">
                <div className="text-xs text-green-300">{r.badge}</div>
                <div className="mt-1 font-bold text-white">{r.name}</div>
                <div className="text-sm text-zinc-400">{r.tagline}</div>
                <div className="mt-2 text-sm font-semibold text-green-400">Read case study →</div>
              </Link>
            ))}
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-zinc-500 md:flex-row">
          <span>© 2026 Talaat Ramadan • {EMAIL} • <a className="underline" href={LINKEDIN}>LinkedIn</a> • <a className="underline" href={GITHUB}>GitHub</a></span>
          <Link href="/" className="underline">← ixtalaat.dev home</Link>
        </footer>
      </main>
    </div>
  );
}
