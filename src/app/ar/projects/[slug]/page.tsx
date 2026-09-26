import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsAr, getProjectAr, WHATSAPP, GITHUB, LINKEDIN, EMAIL, CV_PATH_AR } from "@/data/content.ar";
import { Reveal } from "@/components/anim";
import { SiteNav, SiteFooter, ProjectMockup, LiveDot } from "@/components/site";

export function generateStaticParams() {
  return projectsAr.map((p) => ({ slug: p.slug }));
}

function siteBase() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://ixtalaat.vercel.app";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectAr(slug);
  if (!p) return { title: "المشروع غير موجود" };
  const base = siteBase();
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: {
      canonical: `${base}/ar/projects/${slug}`,
      languages: { ar: `${base}/ar/projects/${slug}`, en: `${base}/projects/${slug}` },
    },
  };
}

export default async function ArProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProjectAr(slug);
  if (!p) notFound();

  const idx = projectsAr.findIndex((x) => x.slug === p.slug);
  const prev = projectsAr[(idx - 1 + projectsAr.length) % projectsAr.length];
  const next = projectsAr[(idx + 1) % projectsAr.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: p.seoDescription,
    author: { "@type": "Person", name: "Talaat Ramadan", email: EMAIL },
    url: p.live || p.github,
    inLanguage: "ar",
  };

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-zinc-950 text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav lang="ar" altHref={`/projects/${p.slug}`} altLabel="EN" cvPath={CV_PATH_AR} whatsapp={WHATSAPP} />
      <main id="main" className="mx-auto max-w-5xl px-5 py-10">
        <Reveal>
          <Link href="/ar#work" className="text-sm text-zinc-400 transition hover:text-white">→ العودة لكل الأعمال</Link>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-4">
            <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300">{p.badge}</span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">{p.name}</h1>
            <p className="mt-2 text-lg text-zinc-300">{p.tagline}</p>
            <p className="mt-4 max-w-3xl leading-relaxed text-zinc-400">{p.description}</p>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.live && <a href={p.live} target="_blank" className="btn-glow shine rounded-full bg-green-500 px-5 py-2.5 text-sm font-bold text-zinc-950 hover:bg-green-400">{p.liveLabel} ↗</a>}
            <a href={p.github} target="_blank" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10">كود GitHub ↗</a>
            <a href={WHATSAPP} target="_blank" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10">تريد شيئًا مشابهًا؟ ←</a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
            <div className="h-56 md:h-72">
              <ProjectMockup slug={p.slug} />
            </div>
            {p.live && (
              <div className="absolute bottom-3 left-3 rounded-full bg-zinc-950/85 px-3 py-1.5 backdrop-blur">
                <LiveDot url={p.live} lang="ar" />
              </div>
            )}
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-3">
            <div><p className="text-xs uppercase tracking-widest text-zinc-500">الدور</p><p className="mt-1 text-sm text-white">{p.role}</p></div>
            <div><p className="text-xs uppercase tracking-widest text-zinc-500">المدة</p><p className="mt-1 text-sm text-white">{p.timeline}</p></div>
            <div><p className="text-xs uppercase tracking-widest text-zinc-500">مناسب لـ</p><p className="mt-1 text-sm text-white">{p.clientType}</p></div>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card-lift h-full rounded-3xl border border-white/10 bg-zinc-900 p-6">
              <h2 className="text-xl font-bold text-white">المشكلة</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.problem}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-lift h-full rounded-3xl border border-green-500/30 bg-green-500/[0.06] p-6">
              <h2 className="text-xl font-bold text-white">الحل</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{p.solution}</p>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-bold text-white">ما تم بناؤه</h2>
            <ul className="mt-4 grid gap-2 md:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="rounded-xl bg-zinc-900 px-4 py-3 text-sm text-zinc-300">✓ {f}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white">المعمارية</h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                {p.architecture.map((a) => <li key={a}>• {a}</li>)}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span key={t} className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-bold text-white">النتائج</h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                {p.results.map((r) => <li key={r}>✓ {r}</li>)}
              </ul>
              <div className="animate-gradient mt-6 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 p-5 text-zinc-950">
                <p className="font-bold">تحتاج نظامًا مشابهًا؟</p>
                <p className="mt-1 text-sm">سأرسل السعر والمدة خلال 24 ساعة.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href={WHATSAPP} target="_blank" className="btn-glow rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white">واتساب ←</a>
                  <a href={`mailto:${EMAIL}`} className="rounded-full bg-white px-4 py-2 text-sm font-bold">إيميل ←</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <nav className="mt-10 grid gap-4 md:grid-cols-2" aria-label="أعمال أخرى">
            {[prev, next].map((r, i) => (
              <Link key={r.slug} href={`/ar/projects/${r.slug}`} className="card-lift group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-green-500/40">
                <div className="text-[11px] uppercase tracking-widest text-zinc-500">{i === 0 ? "→ السابق" : "التالي ←"}</div>
                <div className="text-xs text-green-300">{r.badge}</div>
                <div className="mt-1 font-bold text-white transition-colors group-hover:text-green-300">{r.name}</div>
                <div className="text-sm text-zinc-400">{r.tagline}</div>
              </Link>
            ))}
          </nav>
        </Reveal>
        <SiteFooter lang="ar" email={EMAIL} linkedin={LINKEDIN} github={GITHUB} />
      </main>
    </div>
  );
}
