"use client";

import { useEffect, useState } from "react";
import { projectsAr, servicesAr, WHATSAPP, GITHUB, LINKEDIN, EMAIL, CV_PATH_AR } from "@/data/content.ar";
import {
  Reveal,
  Typewriter,
  CountUp,
  Tilt,
  Magnetic,
  ScrollProgress,
  Particles,
  CursorGlow,
  Preloader,
  SectionHead,
  SkillBar,
  useIdle,
} from "@/components/anim";
import {
  TrustBand,
  StickyMobileCTA,
  CopyEmail,
  LiveDot,
  ProjectMockup,
  CompareTable,
  TeardownOffer,
  trackCta,
} from "@/components/site";
import { GithubTicker } from "@/components/activity";

const AR_FAQS: [string, string][] = [
  ["متى يمكنك البدء؟", "عادة خلال 2-3 أيام. راسلني وسأؤكد الموعد والمدة في أول رد."],
  ["كيف يتم الدفع؟", "بمراحل: مثلًا 30% للبدء والباقي عند التسليم. الإصلاحات الصغيرة: الدفع عند التسليم."],
  ["هل يوجد دعم بعد التسليم؟", "نعم — إصلاح أخطاء مجاني لأسبوعين مع كل مشروع. وصيانة شهرية متاحة."],
  ["هل تعمل على كود موجود؟", "نعم. أرسل رابط GitHub أو ملف مضغوط وسأراجعه وأعطيك عرضًا."],
  ["Upwork / مستقل / خمسات؟", "نعم — أعمل عبر أي منصة تفضلها لحماية الدفع. أرسل الدعوة فقط."],
];

function ArJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://ixtalaat.vercel.app";
  const person = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "طلعت رمضان — مهندس برمجيات",
    url: `${base}/ar`,
    email: EMAIL,
    priceRange: "$$",
    areaServed: ["Egypt", "Middle East", "Remote worldwide"],
    sameAs: [GITHUB, LINKEDIN],
    knowsAbout: ["ASP.NET Core", "Laravel", "Node.js", "NestJS", "Angular", "Next.js"],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AR_FAQS.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links: [string, string][] = [
    ["الأعمال", "#work"],
    ["الخدمات", "#services"],
    ["الخطوات", "#process"],
    ["الأسعار", "#pricing"],
    ["عني", "#about"],
    ["أسئلة", "#faq"],
    ["المدونة", "/blog"],
  ];
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur transition-all ${scrolled ? "nav-scrolled bg-zinc-950/85" : "bg-zinc-950/70"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="/ar" className="font-bold tracking-tight text-white">
          ⚡ طلعت<span className="text-green-400">.ديف</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="link-underline hover:text-white">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition hover:scale-105 hover:bg-white/10">EN</a>
          <a href={CV_PATH_AR} download className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10 sm:block">السيرة ↓</a>
          <Magnetic>
            <a href={WHATSAPP} target="_blank" className="btn-glow shine hidden rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-green-400 sm:block">وظفني</a>
          </Magnetic>
          <button onClick={() => setOpen(!open)} aria-label="فتح القائمة" className="rounded-full border border-white/15 px-3 py-2 text-white md:hidden">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <nav className="menu-drop border-t border-white/10 px-5 py-3 md:hidden">
          <div className="grid gap-1">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-white/10">{label}</a>
            ))}
            <a href={WHATSAPP} target="_blank" className="mt-1 rounded-lg bg-green-500 px-3 py-2 text-center text-sm font-bold text-zinc-950">وظفني</a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const idle = useIdle();
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
      <div className="bg-grid bg-grid-animated pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0">
        {idle && <Particles density={60} className="absolute inset-0 h-full w-full opacity-70" />}
        <div className="animate-blob absolute -top-24 -left-24 h-[380px] w-[380px] bg-green-500/15 blur-3xl" />
        <div className="animate-blob absolute top-20 right-[-120px] h-[420px] w-[420px] bg-cyan-500/10 blur-3xl" style={{ animationDelay: "-6s" }} />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <div>
          <div className="hero-anim hero-d1 mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            متاح للعمل الحر — أرد خلال 24 ساعة
          </div>
          <h1 className="hero-anim hero-d2 text-4xl font-extrabold leading-[1.3] tracking-tight text-white md:text-6xl">
            طلعت رمضان
            <br />
            <span className="bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200 bg-clip-text text-transparent animate-gradient">مهندس برمجيات</span>
            <br />
            <span className="text-green-400">
              <Typewriter words={["أحوّل أفكارك إلى تطبيقات سريعة.", "أبني المتاجر والحجوزات.", "أنظمة مختبرة وموثوقة.", "API نظيفة وجاهزة للنمو."]} />
            </span>
          </h1>
          <p className="hero-anim hero-d3 mt-5 max-w-xl text-lg text-zinc-400">
            أبني المنتج كاملًا — واجهات خلفية قوية بـ <span className="text-zinc-200">ASP.NET Core أو Laravel أو Node.js</span>،
            وواجهات أمامية عصرية بـ <span className="text-zinc-200">Angular أو Next.js</span>، وواجهات برمجية نظيفة تربط بينهما.
          </p>
          <p className="hero-anim hero-d4 mt-3 max-w-xl text-base text-zinc-300">
            🎯 للشركات الناشئة والأكاديميات والعيادات والمحلات في مصر والخليج — بالعربية أو الإنجليزية.
          </p>
          <div className="hero-anim hero-d5 mt-7 flex flex-wrap gap-3">
            <Magnetic>
              <a href={WHATSAPP} target="_blank" onClick={() => trackCta("hero_whatsapp_ar")} className="btn-glow shine inline-block rounded-full bg-green-500 px-6 py-3 font-semibold text-zinc-950 hover:bg-green-400">كلمني واتساب</a>
            </Magnetic>
            <a href="#work" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-white/10">شوف شغلي ↓</a>
            <a href={CV_PATH_AR} download className="rounded-full border border-white/15 px-6 py-3 text-zinc-300 hover:bg-white/10">حمّل السيرة ↓</a>
          </div>
          <div className="hero-anim hero-d6 mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { v: 4, s: "+", l: "أنظمة حية" },
              { v: 327, s: "+", l: "اختبار ناجح" },
              { v: 8, s: "+", l: "تقنيات" },
              { v: 24, s: "h", l: "سرعة الرد" },
            ].map((st) => (
              <div key={st.l} className="card-lift rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center">
                <div className="text-2xl font-extrabold text-white"><CountUp to={st.v} suffix={st.s} /></div>
                <div className="mt-1 text-[11px] text-zinc-500">{st.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-anim hero-d4 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6 backdrop-blur">
          <p className="text-sm uppercase tracking-widest text-zinc-400">ما الذي تحتاجه؟</p>
          <p className="mt-1 text-xs text-zinc-500">اضغط على ما يناسبك — سيفتح واتساب وطلبك جاهز للإرسال.</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-200">
            {[
              ["🛒 متجر إلكتروني — منتجات وطلبات ودفع", "أهلًا طلعت، أحتاج متجرًا إلكترونيًا (منتجات وطلبات ودفع)."],
              ["📝 لوحة تحكم — عدّل محتواك بنفسك", "أهلًا طلعت، أحتاج لوحة تحكم لإدارة المحتوى بنفسي."],
              ["📅 نظام حجوزات — فعاليات ومواعيد وكورسات", "أهلًا طلعت، أحتاج نظام حجوزات (فعاليات / مواعيد / كورسات)."],
              ["🔧 تعديلات على مشروعي الحالي", "أهلًا طلعت، أحتاج تعديلات وتحسينات على مشروعي الحالي."],
              ["📊 لوحة تقارير — المبيعات والمخزون", "أهلًا طلعت، أحتاج لوحة تقارير للمبيعات والمخزون."],
              ["⚡ إصلاح أخطاء / تسريع موقعي", "أهلًا طلعت، أحتاج إصلاح أخطاء وتسريع موقعي."],
            ].map(([label, msg]) => (
              <li key={label}>
                <a href={`${WHATSAPP}?text=${encodeURIComponent(msg)}`} target="_blank" className="group block rounded-xl bg-white/[0.04] px-3 py-2 transition hover:bg-green-500/15 hover:text-white">
                  {label} <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-glow mt-5 block rounded-xl bg-white px-4 py-3 text-center font-semibold text-zinc-950 hover:bg-zinc-200">أو اطلب عرض سعر مجاني ←</a>
          <p className="mt-2 text-center text-xs text-zinc-500">بدون التزام. الرد خلال 24 ساعة.</p>
        </div>
      </div>
    </section>
  );
}

export default function ArHome() {
  const [showTop, setShowTop] = useState(false);
  const idle = useIdle();
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div dir="rtl">
      <ArJsonLd />
      <Preloader />
      <ScrollProgress />
      {idle && <CursorGlow />}
      <Nav />
      <main id="main">
        <Hero />

        <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-4">
          <div className="marquee-track marquee-reverse gap-3 px-3">
            {[...["ASP.NET Core", "Laravel", "NestJS", "Next.js", "Angular", "Docker", "SQL Server", "Tailwind"], ...["ASP.NET Core", "Laravel", "NestJS", "Next.js", "Angular", "Docker", "SQL Server", "Tailwind"]].map((t, i) => (
              <span key={`${t}-${i}`} className="whitespace-nowrap rounded-full border border-white/10 bg-zinc-900 px-4 py-1.5 text-sm text-zinc-300">✦ {t}</span>
            ))}
          </div>
        </div>

        <GithubTicker lang="ar" username={GITHUB.split("/").pop() ?? "ixtalaat"} />

        <section id="services" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHead kicker="الخدمات" title="ماذا أبني لك" sub="من أول رسالة حتى النشر الإنتاجي — مطور واحد يملك كل شيء." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {servicesAr.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <Tilt className="h-full">
                  <div className="card-lift flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-green-500/40">
                    <div className="animate-float text-3xl">{["🚀", "🔌", "⚡"][i % 3]}</div>
                    <h3 className="mt-3 text-xl font-bold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm text-zinc-400">{s.desc}</p>
                    <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                      {s.points.map((p) => <li key={p}>• {p}</li>)}
                    </ul>
                    <div className="mt-auto pt-5">
                      <a href={WHATSAPP} target="_blank" className="btn-glow mt-3 block rounded-xl bg-white/10 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-green-500 hover:text-zinc-950">اسأل عن الخدمة ←</a>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHead kicker="أعمال مختارة" title="مشاريع حقيقية بكود حقيقي وتشغيل حي" sub="كل مشروع نظام كامل — تسجيل وقاعدة بيانات وقواعد عمل واختبارات." />
          <div className="mt-8 grid auto-rows-fr items-stretch gap-6 md:grid-cols-2">
            {projectsAr.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 140} as="article" className="h-full">
                <Tilt className="h-full">
                  <article className="card-lift group flex h-full min-h-[560px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent hover:border-green-500/40">
                    <div className="relative h-44 shrink-0 overflow-hidden border-b border-white/10 bg-zinc-900">
                      <div className="h-full transition-transform duration-500 group-hover:scale-[1.03]">
                        <ProjectMockup slug={p.slug} />
                      </div>
                      <div className="absolute right-3 top-2.5 rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-semibold text-green-300 backdrop-blur">
                        {p.badge}
                      </div>
                      {p.live && (
                        <div className="absolute bottom-2 left-3 rounded-full bg-zinc-950/80 px-2.5 py-1 backdrop-blur">
                          <LiveDot url={p.live} lang="ar" />
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-zinc-950/60 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                    <span className="w-fit rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300">{p.badge}</span>
                    <a href={`/ar/projects/${p.slug}`}><h3 className="mt-3 min-h-[32px] text-2xl font-bold text-white hover:text-green-300">{p.name}</h3></a>
                    <p className="min-h-[20px] text-sm font-medium text-zinc-300">{p.tagline}</p>
                    <p className="mt-3 line-clamp-3 min-h-[63px] text-sm leading-relaxed text-zinc-400">{p.description}</p>
                    <ul className="mt-4 min-h-[66px] space-y-1.5 text-sm text-zinc-300">
                      {p.highlights.map((h) => <li key={h}>✓ {h}</li>)}
                    </ul>
                    <div className="mt-4 min-h-[48px]">
                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.map((t) => (
                          <span key={t} className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto pt-5">
                      <div className="flex min-h-[44px] gap-2">
                        <a href={`/ar/projects/${p.slug}`} className="btn-glow flex-1 rounded-xl bg-white px-4 py-2.5 text-center text-sm font-bold text-zinc-950 hover:bg-zinc-200">دراسة الحالة ←</a>
                        {p.live && <a href={p.live} target="_blank" className="btn-glow flex-1 rounded-xl bg-green-500 px-4 py-2.5 text-center text-sm font-bold text-zinc-950 hover:bg-green-400">{p.liveLabel} ↗</a>}
                      </div>
                      <a href={p.github} target="_blank" className="mt-2 block rounded-xl border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10">كود GitHub ↗</a>
                    </div>
                    </div>
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="process" className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <SectionHead kicker="الخطوات" title="طريقة بسيطة وآمنة للتعامل معي" />
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                ["1. تواصل", "كلمني واتساب أو إيميل. اشرح فكرتك في سطرين.", "💬"],
                ["2. تحديد وعرض", "أقسمها لمزايا وأعطيك سعرًا ثابتًا ومدة. بدون مفاجآت.", "📋"],
                ["3. بناء بمراحل", "ترى التقدم مبكرًا. باك-إند ← واجهة ← نشر.", "🛠️"],
                ["4. تسليم ودعم", "نشر + توثيق + إصلاح أخطاء مجاني لأسبوعين.", "🚀"],
              ].map(([t, d, icon], i) => (
                <Reveal key={t} delay={i * 130}>
                  <div className="card-lift rounded-2xl border border-white/10 bg-zinc-900 p-5 hover:border-green-500/40">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-700 text-xl">{icon}</div>
                    <div className="mt-3 font-bold text-white">{t}</div>
                    <div className="mt-2 text-sm text-zinc-400">{d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <TrustBand lang="ar" />

        <CompareTable lang="ar" />

        <section id="pricing" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <SectionHead kicker="الأسعار" title="أسعار عادلة حسب متطلباتك" sub="أخبرني باحتياجك — أدرسه مجانًا وأمنحك سعرًا ثابتًا قبل أن نبدأ." align="center" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { n: "إصلاحات ومهام صغيرة", p: "سعر مخصص لكل مهمة", f: ["صف المشكلة أو الميزة المطلوبة", "سعر ثابت مقدمًا — بلا مفاجآت", "الدفع عند التسليم"] },
              { n: "مواقع وتطبيقات ويب", p: "عرض سعر بعد دراسة مجانية", f: ["شارك متطلباتك أو أمثلة تعجبك", "سعر ثابت ومدة زمنية واضحة", "الدفع على مراحل أثناء التنفيذ"], hot: true },
              { n: "أنظمة مخصصة وواجهات API", p: "نحدد النطاق معًا", f: ["مكالمة قصيرة لفهم احتياجك", "خطة مراحل بسعر ثابت", "تعتمد كل مرحلة بنفسك"] },
            ].map((t, i) => (
              <Reveal key={t.n} delay={i * 130}>
                <div className={`card-lift rounded-3xl border p-6 ${t.hot ? "shine border-green-500/60 bg-green-500/[0.07]" : "border-white/10 bg-white/[0.03]"}`}>
                  {t.hot && <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-zinc-950">الأكثر طلبًا ✦</span>}
                  <h3 className="mt-2 text-lg font-bold text-white">{t.n}</h3>
                  <div className="mt-1 text-2xl font-extrabold text-green-400">{t.p}</div>
                  <ul className="mt-4 space-y-2 text-sm text-zinc-300">{t.f.map((f) => <li key={f}>✓ {f}</li>)}</ul>
                  <a href={WHATSAPP} target="_blank" className="btn-glow mt-5 block rounded-xl bg-white px-4 py-2.5 text-center text-sm font-bold text-zinc-950 hover:bg-zinc-200">اشرح احتياجك</a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <TeardownOffer lang="ar" whatsapp={WHATSAPP} />

        <section id="about" className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <SectionHead kicker="عني" title="أهلًا، أنا طلعت رمضان" />
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  مهندس برمجيات متخصص في أنظمة الشركات. بنيت منصات فعاليات وأنظمة طلبات ومنصات أكاديمية وأنظمة صيانة
                  عبر <b className="text-zinc-200">.NET وLaravel وNode.js وAngular/Next.js</b>.
                </p>
                <p className="mt-3 text-zinc-400 leading-relaxed">
                  مقيم في مصر وأعمل عن بُعد، وأتواصل بالعربية والإنجليزية — من أول مكالمة لفهم متطلباتك حتى دعم ما بعد الإطلاق.
                </p>
                <p className="mt-3 text-sm text-zinc-400">📧 <a className="text-green-300 hover:text-green-200" href={`mailto:${EMAIL}`}>{EMAIL}</a> <CopyEmail email={EMAIL} className="text-xs text-zinc-500" /></p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={CV_PATH_AR} download className="btn-glow rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-zinc-200">حمّل السيرة ↓</a>
                  <a href={GITHUB} target="_blank" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">GitHub ↗</a>
                  <a href={LINKEDIN} target="_blank" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">لينكدإن ↗</a>
                  <a href={WHATSAPP} target="_blank" className="btn-glow rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-green-400">واتساب ↗</a>
                </div>
              </div>
              <div className="grid content-center gap-3">
                <SkillBar label="باك-إند" pct={95} detail=".NET 10 / C# / Laravel 12 / Node.js (Express, NestJS) — معمارية نظيفة، CQRS، Identity/JWT، Hangfire" />
                <SkillBar label="واجهات" pct={90} detail="Angular 20/22 / Next.js / TypeScript / Tailwind — لوحات ونماذج وصفحات SEO" />
                <SkillBar label="بيانات ونشر" pct={88} detail="SQL Server / MySQL / EF Core — Docker وCI والنشر Vercel / VPS" />
                <SkillBar label="جودة" pct={93} detail="xUnit + Pest (+300 اختبار) — توثيق Scalar/Postman وسجلات تدقيق" />
              </div>
            </div>
          </Reveal>
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-5 py-16">
          <SectionHead kicker="أسئلة" title="أسئلة شائعة" align="center" />
          <div className="mt-8 space-y-3">
            {AR_FAQS.map(([q, a], i) => (
              <Reveal key={q} delay={i * 70}>
                <details className="faq-anim rounded-2xl border border-white/10 bg-white/[0.03] p-5 open:border-green-500/40">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white">
                    {q}
                    <span className="faq-chevron flex h-7 w-7 items-center justify-center rounded-full bg-green-500/15 text-lg text-green-300">+</span>
                  </summary>
                  <p className="faq-body mt-2 text-sm text-zinc-400">{a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-5 pb-20">
          <Reveal>
            <div className="animate-gradient relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-400 via-green-500 to-emerald-700 p-8 text-zinc-950 md:p-12">
              <h2 className="text-3xl font-extrabold md:text-4xl">عندك مشروع؟ لنبنيه معًا.</h2>
              <p className="mt-3 max-w-xl font-medium">احكي لي ما تحتاجه — سأرد بالسعر والمدة خلال 24 ساعة.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={WHATSAPP} target="_blank" className="btn-glow rounded-full bg-zinc-950 px-6 py-3 font-bold text-white hover:bg-zinc-800">💬 واتساب: +20 112 634 2642</a>
                <a href={`mailto:${EMAIL}`} className="btn-glow rounded-full bg-white px-6 py-3 font-bold hover:bg-zinc-200">✉️ {EMAIL}</a>
              </div>
              <form
                className="mt-8 grid gap-3 rounded-2xl bg-zinc-950 p-5 md:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  trackCta("quote_form_ar");
                  const f = new FormData(e.currentTarget as HTMLFormElement);
                  const msg = `الاسم: ${f.get("name")}%0A%0A${f.get("message")}`;
                  window.open(`${WHATSAPP}?text=${msg}`, "_blank");
                }}
              >
                <input name="name" suppressHydrationWarning required placeholder="اسمك" className="rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500 md:col-span-2" />
                <textarea name="message" suppressHydrationWarning required rows={4} placeholder="ماذا تريد أن تبني؟ (مزايا، مدة، روابط...)" className="rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500 md:col-span-2" />
                <button className="btn-glow shine rounded-xl bg-green-500 px-4 py-3 font-bold text-zinc-950 hover:bg-green-400 md:col-span-2">إرسال عبر واتساب ←</button>
                <a href={`mailto:${EMAIL}`} className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10 md:col-span-2">أو أرسل عبر البريد ←</a>
              </form>
            </div>
          </Reveal>
          <footer className="mt-10 text-center text-xs text-zinc-500">
            <span>© 2026 طلعت رمضان — مهندس برمجيات • {EMAIL}</span>
            <span className="mt-1 block"><a href="/" className="underline">النسخة الإنجليزية</a></span>
          </footer>
          <a href={WHATSAPP} target="_blank" aria-label="واتساب" className="animate-pulse-ring fixed bottom-5 left-5 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl shadow-lg shadow-green-500/30 hover:bg-green-400 md:flex">💬</a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="العودة للأعلى"
            className={`fixed bottom-[5.75rem] left-[1.65rem] z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-white transition-all ${showTop ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            ↑
          </button>
        </section>
      </main>
      <StickyMobileCTA whatsapp={WHATSAPP} lang="ar" />
    </div>
  );
}
