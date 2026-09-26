"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Reveal, ScrollProgress, SectionHead } from "@/components/anim";
import { testimonials, type Testimonial } from "@/data/content";

export type Lang = "en" | "ar";

/* ================= Shared subpage nav ================= */
export function SiteNav({
  lang,
  altHref,
  altLabel,
  cvPath,
  whatsapp,
}: {
  lang: Lang;
  altHref: string;
  altLabel: string;
  cvPath: string;
  whatsapp: string;
}) {
  const home = lang === "ar" ? "/ar" : "/";
  const strings =
    lang === "ar"
      ? { work: "الأعمال", blog: "المدونة", home: "الرئيسية", hire: "وظفني" }
      : { work: "Work", blog: "Blog", home: "Home", hire: "Hire Me" };
  return (
    <>
      <ScrollProgress />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <Link href={home} className="font-bold tracking-tight text-white">
            ⚡ {lang === "ar" ? <>طلعت<span className="text-green-400">.ديف</span></> : <>ixtalaat<span className="text-green-400">.dev</span></>}
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-zinc-300 sm:flex">
            <Link href={home} className="link-underline hover:text-white">{strings.home}</Link>
            <Link href={`${home}#work`} className="link-underline hover:text-white">{strings.work}</Link>
            <Link href="/blog" className="link-underline hover:text-white">{strings.blog}</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href={altHref} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-zinc-200 transition hover:bg-white/10">
              {altLabel}
            </Link>
            <a href={cvPath} download className="hidden rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-zinc-200 transition hover:bg-white/10 sm:block">
              CV ↓
            </a>
            <a href={whatsapp} target="_blank" onClick={() => trackCta(`nav_hire_${lang}`)} className="btn-glow rounded-full bg-green-500 px-3.5 py-1.5 text-sm font-bold text-zinc-950 hover:bg-green-400">
              {strings.hire}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

/* ================= Shared subpage footer ================= */
export function SiteFooter({ lang, email, linkedin, github }: { lang: Lang; email: string; linkedin: string; github: string }) {
  const home = lang === "ar" ? "/ar" : "/";
  return (
    <footer className="mt-12 border-t border-white/10 pt-6 text-center">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-zinc-500">
        <span>© 2026 {lang === "ar" ? "طلعت رمضان" : "Talaat Ramadan"}</span>
        <a href={`mailto:${email}`} className="underline hover:text-zinc-300">{email}</a>
        <a href={linkedin} target="_blank" className="underline hover:text-zinc-300">LinkedIn</a>
        <a href={github} target="_blank" className="underline hover:text-zinc-300">GitHub</a>
      </div>
      <Link href={home} className="mt-2 inline-block text-xs text-zinc-500 underline hover:text-zinc-300">
        {lang === "ar" ? "→ الرئيسية" : "← Home"}
      </Link>
    </footer>
  );
}

/* ================= Copy email button ================= */
export function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button
      onClick={copy}
      className={`transition hover:text-white ${className}`}
      aria-live="polite"
      title="Copy email"
    >
      {copied ? "✓ copied!" : "⧉ copy"}
    </button>
  );
}

/* ================= Sticky mobile CTA ================= */
export function StickyMobileCTA({ whatsapp, lang }: { whatsapp: string; lang: Lang }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const quoteHref = "#contact";
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-zinc-950/92 pb-[env(safe-area-inset-bottom)] backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-2 px-4 py-3">
        <a href={whatsapp} target="_blank" onClick={() => trackCta(`sticky_whatsapp_${lang}`)} className="flex-1 rounded-full bg-green-500 px-4 py-2.5 text-center text-sm font-bold text-zinc-950">
          💬 {lang === "ar" ? "واتساب" : "WhatsApp"}
        </a>
        <a href={quoteHref} className="flex-1 rounded-full bg-white px-4 py-2.5 text-center text-sm font-bold text-zinc-950">
          {lang === "ar" ? "عرض سعر مجاني" : "Free quote"}
        </a>
      </div>
    </div>
  );
}

/* ================= Live demo status dot ================= */
function useOnlineStatus(url: string) {
  const [status, setStatus] = useState<"checking" | "live" | "down">("checking");
  useEffect(() => {
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), 8000);
    fetch(url, { mode: "no-cors", signal: ctrl.signal, cache: "no-store" })
      .then(() => setStatus("live"))
      .catch(() => setStatus("down"));
    const to = window.setTimeout(() => {
      window.clearTimeout(t);
      ctrl.abort();
    }, 8500);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(to);
      ctrl.abort();
    };
  }, [url]);
  return status;
}

export function LiveDot({ url, lang }: { url: string; lang: Lang }) {
  const status = useOnlineStatus(url);
  if (status === "checking")
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-zinc-500" />
        …
      </span>
    );
  const live = status === "live";
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] ${live ? "text-green-300" : "text-zinc-500"}`}>
      <span className="relative flex h-1.5 w-1.5">
        {live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${live ? "bg-green-400" : "bg-zinc-600"}`} />
      </span>
      {live ? (lang === "ar" ? "يعمل الآن" : "live") : (lang === "ar" ? "عرض" : "demo")}
    </span>
  );
}

/* ================= CSS browser mockups ================= */
const MOCK_URLS: Record<string, string> = {
  tamayoz: "tamayoz.runasp.net",
  hometech: "hometech.app/dashboard",
  tazkara: "tazkara-five.vercel.app",
  orderflow: "orderflow.api/scalar",
};

function Chrome({ slug }: { slug: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/10 bg-zinc-900/90 px-2.5 py-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
      <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/70" />
      <span className="h-1.5 w-1.5 rounded-full bg-green-500/70" />
      <span className="ml-1 truncate rounded-md bg-zinc-800 px-2 py-0.5 font-mono text-[9px] text-zinc-400">
        {MOCK_URLS[slug] ?? "localhost:3000"}
      </span>
    </div>
  );
}

function TazkaraMock() {
  const rows: [string, string, string, boolean][] = [
    ["from-cyan-500/50 to-blue-500/40", "Cairo Jazz Night", "$12", true],
    ["from-fuchsia-500/50 to-purple-500/40", "Startup Meetup", "$0", false],
  ];
  return (
    <div className="space-y-1.5 p-2.5">
      <div className="flex gap-1">
        <div className="h-3.5 flex-1 rounded-md bg-zinc-800" />
        <div className="h-3.5 w-10 rounded-md bg-green-500/70" />
      </div>
      {rows.map(([g, title, price, hot]) => (
        <div key={title} className="flex items-center gap-1.5 rounded-lg bg-zinc-800/70 p-1.5">
          <div className={`h-7 w-7 shrink-0 rounded-md bg-gradient-to-br ${g}`} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[9px] font-bold text-zinc-200">{title}</div>
            <div className="mt-0.5 h-1 w-3/4 rounded-full bg-zinc-700" />
          </div>
          <div className="text-[8px] font-bold text-green-300">{price}</div>
          <div className={`rounded px-1.5 py-0.5 text-[8px] font-bold ${hot ? "bg-green-500 text-zinc-950" : "bg-zinc-700 text-zinc-300"}`}>
            {hot ? "✓ 42 left" : "Reserve"}
          </div>
        </div>
      ))}
    </div>
  );
}

function OrderFlowMock() {
  return (
    <div className="space-y-1.5 p-2.5">
      <div className="grid grid-cols-3 gap-1.5">
        {[
          ["Orders", "1,284"],
          ["Revenue", "$86k"],
          ["Stock OK", "99.2%"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-lg bg-zinc-800/70 p-1.5">
            <div className="text-[10px] font-extrabold text-white">{v}</div>
            <div className="text-[8px] text-zinc-500">{l}</div>
          </div>
        ))}
      </div>
      <div className="flex h-10 items-end gap-1 rounded-lg bg-zinc-800/70 p-1.5">
        {[35, 60, 45, 80, 55, 95, 70].map((h, i) => (
          <div
            key={i}
            className="eq-bar flex-1 rounded-sm bg-gradient-to-t from-green-600 to-emerald-400"
            style={{ height: `${h}%`, animationDelay: `${i * 0.15}s`, animationDuration: `${1 + (i % 3) * 0.25}s` }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between rounded-lg bg-zinc-800/70 px-1.5 py-1">
        <span className="font-mono text-[8px] text-zinc-400">#A-2481 · 201 Created</span>
        <span className="rounded bg-green-500/20 px-1.5 py-0.5 text-[8px] font-bold text-green-300">✓ no oversell</span>
      </div>
    </div>
  );
}

function HomeTechMock() {
  const cols: [string, string[]][] = [
    ["New", ["AC repair ↓"]],
    ["Working", ["Plumbing", "Wiring"]],
    ["Done ✓", ["Paint ✓"]],
  ];
  return (
    <div className="grid grid-cols-3 gap-1.5 p-2.5">
      {cols.map(([title, jobs]) => (
        <div key={title} className="rounded-lg bg-zinc-800/60 p-1">
          <div className="px-0.5 py-0.5 text-[8px] font-bold text-zinc-400">{title}</div>
          {jobs.map((j) => (
            <div key={j} className="mb-1 rounded-md bg-zinc-700/70 p-1">
              <div className="truncate text-[8px] font-semibold text-zinc-200">{j}</div>
              <div className="mt-1 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-gradient-to-br from-green-400 to-cyan-500" />
                <div className="h-1 flex-1 rounded-full bg-zinc-600" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function TamayozMock() {
  const courses: [string, number][] = [
    ["تأسيس البرمجة", 80],
    ["قواعد البيانات", 45],
  ];
  return (
    <div className="space-y-1.5 p-2.5" dir="rtl">
      <div className="rounded-lg bg-gradient-to-l from-green-600/50 to-emerald-500/20 p-1.5">
        <div className="text-[9px] font-extrabold text-white">أكاديمية التميز</div>
        <div className="mt-0.5 h-1 w-2/3 rounded-full bg-white/30" />
      </div>
      {courses.map(([title, pct]) => (
        <div key={title} className="rounded-lg bg-zinc-800/70 p-1.5">
          <div className="flex items-center justify-between">
            <div className="text-[9px] font-bold text-zinc-200">{title}</div>
            <div className="text-[8px] font-bold text-green-300">{pct}%</div>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-zinc-700">
            <div className="h-full rounded-full bg-gradient-to-l from-green-500 to-emerald-400" style={{ width: `${pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProjectMockup({ slug }: { slug: string }) {
  return (
    <div aria-hidden className="pointer-events-none h-full w-full select-none bg-zinc-950/60">
      <Chrome slug={slug} />
      {slug === "tazkara" && <TazkaraMock />}
      {slug === "orderflow" && <OrderFlowMock />}
      {slug === "hometech" && <HomeTechMock />}
      {slug === "tamayoz" && <TamayozMock />}
    </div>
  );
}

/* ================= Trust / guarantees band ================= */
export function TrustBand({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const guarantees: [string, string, string][] = ar
    ? [
        ["💰", "سعر ثابت مقدمًا", "تعرف التكلفة والمدة قبل أن نبدأ — بلا مفاجآت."],
        ["⚡", "رد خلال 24 ساعة", "راسلني واتساب أو إيميل — أول رد يؤكد الموعد والسعر."],
        ["🛡️", "أسبوعان دعم مجاني", "إصلاح أي خطأ بعد التسليم مجانًا مع كل مشروع."],
        ["📦", "الكود والتوثيق لك", "تستلم الكود كاملًا مع توثيق وشرح النشر."],
      ]
    : [
        ["💰", "Fixed price upfront", "You know cost + timeline before we start — no surprises."],
        ["⚡", "Reply within 24h", "Message me and the first reply confirms timeline + price."],
        ["🛡️", "2 weeks free support", "Any bug after delivery gets fixed free with every project."],
        ["📦", "You own code + docs", "Full source, docs and deploy notes handed over."],
      ];
  const platforms = ["Upwork", "Mostaql", "Freelancer", "Khamsat", "Direct"];
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <SectionHead
        kicker={ar ? "لماذا أنا" : "Why hire me"}
        title={ar ? "تعامل بلا مخاطرة" : "Zero-risk collaboration"}
        sub={
          ar
            ? "ضمانات واضحة قبل أن تدفع جنيهًا واحدًا — هكذا أبني الثقة مع كل عميل."
            : "Clear guarantees before you pay a cent — that's how I earn trust with every client."
        }
        align="center"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {guarantees.map(([icon, title, desc], i) => (
          <Reveal key={title} delay={i * 100}>
            <div className="card-lift h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur hover:border-green-500/40">
              <div className="animate-float mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/30 to-cyan-500/20 text-2xl" style={{ animationDelay: `${i * 0.6}s` }}>
                {icon}
              </div>
              <h3 className="mt-3 font-bold text-white">{title}</h3>
              <p className="mt-1.5 text-sm text-zinc-400">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      {/* real client quotes render here once added to `testimonials` in src/data/content.ts */}
      {testimonials.length > 0 && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {testimonials.map((t: Testimonial) => (
            <Reveal key={t.name}>
              <figure className="card-lift h-full rounded-3xl border border-green-500/25 bg-green-500/[0.05] p-6">
                <blockquote className="text-sm leading-relaxed text-zinc-200">“{t.quote}”</blockquote>
                <figcaption className="mt-3 text-xs text-zinc-400">
                  <span className="font-bold text-white">{t.name}</span> — {t.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}
      <Reveal delay={150}>
        <p className="mt-8 text-center text-xs uppercase tracking-widest text-zinc-500">
          {ar ? "أعمل أيضًا عبر منصات العمل الحر" : "Also happy to work via"}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {platforms.map((p) => (
            <span key={p} className="rounded-full border border-white/10 bg-zinc-900 px-4 py-1.5 text-sm text-zinc-300 transition hover:border-green-500/40 hover:text-white">
              {p}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ================= CTA analytics (Vercel track, lazy) ================= */
export function trackCta(label: string) {
  try {
    if (typeof window === "undefined") return;
    import("@vercel/analytics").then((m) => {
      (m as unknown as { track?: (ev: string, props?: Record<string, string>) => void }).track?.("cta_click", { label });
    }).catch(() => {});
  } catch {
    /* analytics optional */
  }
}

/* ================= Copy page link ================= */
export function CopyLink({ slug, lang }: { slug: string; lang: Lang }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const url = `${window.location.origin}/blog/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button onClick={copy} aria-live="polite" className="rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-400 transition hover:bg-white/10 hover:text-white">
      {copied ? (lang === "ar" ? "✓ تم النسخ!" : "✓ Copied!") : (lang === "ar" ? "⧉ نسخ الرابط" : "⧉ Copy link")}
    </button>
  );
}

/* ================= Me vs Agency vs DIY ================= */
export function CompareTable({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const head = ar ? ["أنا (طلعت)", "شركة", "قالب جاهز"] : ["Me (Talaat)", "Agency", "DIY builder"];
  const rows: [string, [string, string, string]][] = ar
    ? [
        ["السعر", ["عرض ثابت مقدمًا", "$5k – $50k+", "رخيص شهريًا… حتى تتجاوزه"]],
        ["المدة", ["أيام إلى أسابيع", "شهور من الإجراءات", "عطلة إعداد + شهور حلول مؤقتة"]],
        ["تملّك الكود", ["✓ كاملًا لك", "أحيانًا", "✗ محبوس عندهم"]],
        ["مزايا مخصصة", ["✓ أي شيء", "✓ بأسعار الشركات", "✗ قوالب فقط"]],
        ["الدعم", ["مباشر — رد 24h", "تذاكر وانتظار", "منتديات"]],
        ["دعم عربي", ["✓", "~", "✗"]],
      ]
    : [
        ["Price", ["Fixed quote upfront", "$5k – $50k+", "Cheap monthly… until you outgrow it"]],
        ["Timeline", ["Days to weeks", "Months of process", "Weekend setup, months of workarounds"]],
        ["You own the code", ["✓ 100% yours", "Sometimes", "✗ locked in"]],
        ["Custom features", ["✓ anything", "✓ at agency rates", "✗ templates only"]],
        ["Support", ["Direct — 24h reply", "Ticket queue", "Forums"]],
        ["Arabic support", ["✓", "~", "✗"]],
      ];
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 md:py-20">
      <SectionHead
        kicker={ar ? "قارن" : "Compare"}
        title={ar ? "لماذا لا شركة ولا قالب؟" : "Why not an agency or a template?"}
        sub={ar ? "الخيار الأذكى لنشاط تجاري حقيقي: سرعة المستقل + جدية الشركة." : "The sweet spot for a real business: freelancer speed + agency-grade engineering."}
        align="center"
      />
      <Reveal delay={120}>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="p-4 text-left font-semibold text-zinc-500"><span className="sr-only">{ar ? "المعيار" : "Criterion"}</span></th>
                {head.map((h, i) => (
                  <th key={h} className={`p-4 text-left font-bold ${i === 0 ? "bg-green-500/[0.08] text-green-300" : "text-zinc-200"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([crit, cells]) => (
                <tr key={crit} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]">
                  <td className="p-4 font-semibold text-zinc-400">{crit}</td>
                  {cells.map((c, i) => (
                    <td key={i} className={`p-4 ${i === 0 ? "bg-green-500/[0.05] font-semibold text-white" : "text-zinc-400"}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}

/* ================= Free teardown offer ================= */
export function TeardownOffer({ lang, whatsapp }: { lang: Lang; whatsapp: string }) {
  const ar = lang === "ar";
  const steps: [string, string, string][] = ar
    ? [
        ["🔗", "أرسل رابط موقعك", "واتساب برسالة واحدة — بدون مكالمات ولا التزام."],
        ["🎥", "استلم فيديو 5 دقائق", "3 أشياء تقتل التحويل + ما سأصلحه أولًا — خلال 48 ساعة."],
        ["✅", "احتفظ بالقائمة", "نفذها بنفسك أو وظفني — القرار لك."],
      ]
    : [
        ["🔗", "Send your site link", "One WhatsApp message — no calls, no commitment."],
        ["🎥", "Get a 5-min video", "3 things killing conversions + what I'd fix first — within 48h."],
        ["✅", "Keep the checklist", "Fix it yourself or hire me — your call."],
      ];
  const msg = ar
    ? "أهلًا طلعت، أرجو مراجعة موقعي: [الصق الرابط هنا]"
    : "Hi Talaat, please audit my site: [paste URL here]";
  return (
    <section className="mx-auto max-w-6xl px-5 py-4 md:py-6">
      <Reveal>
        <div className="animate-gradient relative overflow-hidden rounded-3xl border border-green-500/30 bg-gradient-to-br from-green-500/[0.12] via-transparent to-cyan-500/[0.08] p-8 backdrop-blur md:p-12">
          <div className="animate-float-slow pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green-500/15 blur-3xl" />
          <div className="relative">
            <p className="section-kicker"><span className="kicker-dot" />{ar ? "عرض مجاني" : "Free offer"}</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {ar ? "سأراجع موقعك مجانًا — بالفيديو" : "I'll audit your website for free — on video"}
            </h2>
            <div className="gradient-underline" />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map(([icon, title, desc], i) => (
                <div key={title} className="card-lift rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/15 text-xl">{icon}</span>
                    <span className="font-mono text-xs text-green-400/70">0{i + 1}</span>
                  </div>
                  <div className="mt-3 font-bold text-white">{title}</div>
                  <div className="mt-1.5 text-sm text-zinc-400">{desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`${whatsapp}?text=${encodeURIComponent(msg)}`}
                target="_blank"
                onClick={() => trackCta("teardown_offer")}
                className="btn-glow shine rounded-full bg-green-500 px-6 py-3 font-bold text-zinc-950 hover:bg-green-400"
              >
                {ar ? "🎥 أرسل موقعي للمراجعة" : "🎥 Submit my site for review"}
              </a>
              <span className="text-xs text-zinc-500">{ar ? "3 مراجعات مجانية أسبوعيًا — الأولوية للأسبق." : "3 free audits per week — first come, first served."}</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
