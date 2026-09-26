import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page not found | Talaat Ramadan",
  description: "This route returned 404. Back to ixtalaat.dev home.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-5 text-zinc-100">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 font-mono text-xs text-zinc-500">terminal — exit code 404</span>
        </div>
        <div className="space-y-2 p-6 font-mono text-sm">
          <p className="text-zinc-400"><span className="text-green-400">$</span> cd /requested-page</p>
          <p className="text-red-400">✗ 404: route not found — never shipped, never will be.</p>
          <p className="text-zinc-400"><span className="text-green-400">$</span> cd ~/home <span className="type-caret">▍</span></p>
          <h1 className="pt-2 font-sans text-3xl font-extrabold tracking-tight text-white">
            Lost? Let&apos;s get you back.
          </h1>
          <p className="font-sans text-sm text-zinc-400">
            الصفحة غير موجودة — This page doesn&apos;t exist (anymore or ever).
          </p>
          <div className="flex flex-wrap gap-2 pt-3 font-sans">
            <Link href="/" className="btn-glow rounded-full bg-green-500 px-5 py-2.5 text-sm font-bold text-zinc-950 hover:bg-green-400">
              ← Home
            </Link>
            <Link href="/ar" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              الرئيسية
            </Link>
            <Link href="/blog" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
