import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/data/blog";
import { WHATSAPP, EMAIL } from "@/data/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Post not found" };
  return { title: `${p.title} | Talaat Ramadan`, description: p.excerpt };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const related = posts.filter((x) => x.slug !== p.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    author: { "@type": "Person", name: "Talaat Ramadan" },
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <Link href="/" className="font-bold text-white">ixtalaat<span className="text-green-400">.dev</span></Link>
          <a href={WHATSAPP} target="_blank" className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-green-400">Hire Me</a>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-10">
        <Link href="/blog" className="text-sm text-zinc-400 hover:text-white">← All posts</Link>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
          ))}
        </div>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white md:text-4xl">{p.title}</h1>
        <p className="mt-2 text-xs text-zinc-500">{p.date} • {p.readTime} • by Talaat Ramadan</p>
        <div className="mt-6 space-y-4">
          {p.body.map((para, i) => (
            <p key={i} className="leading-relaxed text-zinc-300">{para}</p>
          ))}
        </div>
        <div className="mt-8 rounded-3xl bg-green-500 p-6 text-zinc-950">
          <p className="font-bold">Need this built for your business?</p>
          <p className="mt-1 text-sm">I reply with price + timeline within 24h.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={WHATSAPP} target="_blank" className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white">WhatsApp →</a>
            <a href={`mailto:${EMAIL}`} className="rounded-full bg-white px-4 py-2 text-sm font-bold">Email →</a>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="font-bold text-white">Keep reading</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="rounded-2xl border border-white/10 p-4 hover:border-green-500/40">
                <div className="font-bold text-white">{r.title}</div>
                <div className="mt-1 text-sm font-semibold text-green-400">Read →</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
