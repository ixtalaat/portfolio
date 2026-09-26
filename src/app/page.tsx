"use client";

import { useEffect, useState } from "react";
import { projects, services, WHATSAPP, GITHUB, LINKEDIN, EMAIL, CV_PATH } from "@/data/content";
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

const FAQS: [string, string][] = [
  ["How fast can you start?", "Usually within 2-3 days. Message me and I'll confirm availability + timeline in the first reply."],
  ["How do payments work?", "Milestones: e.g. 30% to start, rest on delivery milestones. Small fixes: pay on delivery."],
  ["Do you provide support after delivery?", "Yes — 2 weeks free bug fixes on every project. Longer maintenance available monthly."],
  ["Can you work with my existing code?", "Yes. Send the GitHub repo or zip. I'll review and give a fix/feature quote."],
  ["Upwork / Freelancer / Mostaql?", "Yes — I can work through any platform you prefer for payment protection. Just send the link/invite."],
];

function HomeJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://ixtalaat.vercel.app";
  const person = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Talaat Ramadan — Software Engineer",
    url: base,
    email: EMAIL,
    priceRange: "$$",
    areaServed: ["Egypt", "Middle East", "Remote worldwide"],
    sameAs: [GITHUB, LINKEDIN],
    knowsAbout: ["ASP.NET Core", "Laravel", "Node.js", "NestJS", "Angular", "Next.js"],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(([q, a]) => ({
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

/* ================= NAV ================= */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const links: [string, string][] = [
    ["Work", "#work"],
    ["Services", "#services"],
    ["Process", "#process"],
    ["Pricing", "#pricing"],
    ["About", "#about"],
    ["FAQ", "#faq"],
    ["Blog", "/blog"],
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = ["work", "services", "process", "pricing", "about", "faq"];
      let cur = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) cur = `#${id}`;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur transition-all duration-300 ${
        scrolled ? "nav-scrolled bg-zinc-950/85" : "bg-zinc-950/70"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="/" className="group font-bold tracking-tight text-white">
          <span className="inline-block transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">⚡</span>{" "}
          ixtalaat<span className="text-green-400">.dev</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`link-underline transition-colors hover:text-white ${active === href ? "active text-white" : ""}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/ar" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition hover:scale-105 hover:bg-white/10">
            عربي
          </a>
          <a
            href={CV_PATH}
            download
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 transition hover:scale-105 hover:bg-white/10 sm:block"
          >
            CV ↓
          </a>
          <Magnetic>
            <a
              href={WHATSAPP}
              target="_blank"
              onClick={() => trackCta("nav_hire")}
              className="btn-glow shine hidden rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-green-400 sm:block"
            >
              Hire Me
            </a>
          </Magnetic>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-full border border-white/15 px-3 py-2 text-white transition hover:bg-white/10 md:hidden"
          >
            <span className={`inline-block transition-transform duration-300 ${open ? "rotate-90" : ""}`}>
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="menu-drop border-t border-white/10 px-5 py-3 md:hidden">
          <div className="grid gap-1">
            {links.map(([label, href], i) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 40}ms` }}
                className="hero-anim rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
              >
                {label}
              </a>
            ))}
            <a
              href={WHATSAPP}
              target="_blank"
              className="mt-1 rounded-lg bg-green-500 px-3 py-2 text-center text-sm font-bold text-zinc-950 hover:bg-green-400"
            >
              Hire Me
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

/* ================= LIVE TERMINAL ================= */
type LogLine = { text: string; tone: "dim" | "ok" | "info" | "warn" | "cmd" };

const FEEDS: Record<string, { label: string; icon: string; lines: LogLine[]; footer: string }> = {
  orders: {
    label: "live orders",
    icon: "📦",
    lines: [
      { text: "POST /api/orders → 201 Created · 38ms", tone: "cmd" },
      { text: "✓ stock reserved atomically (row-lock)", tone: "ok" },
      { text: "✓ price snapshot locked · coupon applied", tone: "ok" },
      { text: "→ outbox: email + accounting queued", tone: "info" },
      { text: "✓ Hangfire processed in 1.2s · no oversell", tone: "ok" },
    ],
    footer: "OrderFlow · CQRS + outbox · 180+ tests green",
  },
  booking: {
    label: "booking",
    icon: "🎟️",
    lines: [
      { text: "GET /api/events?city=cairo → 200 · 12 events", tone: "cmd" },
      { text: "✓ seat availability checked at reserve time", tone: "ok" },
      { text: "✓ duplicate-booking blocked (409 guard)", tone: "ok" },
      { text: "→ checkout simulated · voucher generated", tone: "info" },
      { text: "✓ organizer dashboard updated live", tone: "ok" },
    ],
    footer: "Tazkara · Angular + .NET · JWT roles",
  },
  deploy: {
    label: "ship it",
    icon: "🚀",
    lines: [
      { text: "$ git push origin main", tone: "cmd" },
      { text: "✓ build succeeded in 24s", tone: "ok" },
      { text: "✓ 327 tests passed · 0 failed", tone: "ok" },
      { text: "→ docker build + push :latest", tone: "warn" },
      { text: "🚀 deployed to production · 142ms p99", tone: "ok" },
    ],
    footer: "CI green on main · Docker + GitHub Actions",
  },
};

const TONE_CLASS: Record<LogLine["tone"], string> = {
  dim: "text-zinc-500",
  ok: "text-green-300",
  info: "text-cyan-300",
  warn: "text-amber-300",
  cmd: "text-zinc-100",
};

function LiveTerminal() {
  const tabs = Object.keys(FEEDS);
  const [tab, setTab] = useState("orders");
  const [count, setCount] = useState(2);
  const [cycle, setCycle] = useState(2481);

  useEffect(() => {
    setCount(2);
  }, [tab]);

  useEffect(() => {
    const total = FEEDS[tab].lines.length;
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= total + 1) {
          setCycle((n) => n + 1);
          return 1;
        }
        return c + 1;
      });
    }, 1100);
    return () => window.clearInterval(id);
  }, [tab]);

  const feed = FEEDS[tab];
  const visible = feed.lines.slice(0, Math.min(count, feed.lines.length));
  const stageIdx = Math.min(2, Math.floor((count / (feed.lines.length + 1)) * 3));
  const stages = ["Build", "Test", "Ship"];

  return (
    <div className="animate-code overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/85 shadow-2xl shadow-green-500/10 backdrop-blur">
      {/* title bar */}
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-zinc-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          live — #{cycle}
        </span>
        {/* equalizer */}
        <span className="ml-auto flex h-4 items-end gap-[3px]" aria-hidden>
          {[0.9, 0.5, 1.1, 0.7, 1.3, 0.6, 1.0].map((d, i) => (
            <span
              key={i}
              className="eq-bar w-[3px] rounded-full bg-gradient-to-t from-green-500 to-cyan-400"
              style={{ height: `${8 + ((i * 5) % 9)}px`, animationDelay: `${d * 0.35}s`, animationDuration: `${0.9 + (i % 4) * 0.18}s` }}
            />
          ))}
        </span>
      </div>

      {/* tabs */}
      <div className="flex gap-1.5 px-4 pt-3">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-3 py-1 font-mono text-[11px] transition-all ${
              tab === t
                ? "bg-green-500/20 text-green-200 shadow-[inset_0_0_0_1px_rgba(34,197,94,.4)]"
                : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
            }`}
          >
            {FEEDS[t].icon} {FEEDS[t].label}
          </button>
        ))}
      </div>

      {/* log feed */}
      <div className="min-h-[132px] space-y-1.5 p-4 font-mono text-[12.5px] leading-relaxed">
        {visible.map((l, i) => (
          <div key={`${tab}-${cycle}-${i}`} className="log-line flex items-start gap-2">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
            <span className={TONE_CLASS[l.tone]}>{l.text}</span>
          </div>
        ))}
        <div className="flex items-center gap-1 text-zinc-500">
          <span className="text-green-400">▸</span>
          <span className="type-caret">▍</span>
        </div>
      </div>

      {/* pipeline stages */}
      <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
        {stages.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] transition-all ${
                i < stageIdx
                  ? "bg-green-500 text-zinc-950"
                  : i === stageIdx
                    ? "stage-active bg-green-500/20 text-green-300 shadow-[inset_0_0_0_1px_rgba(34,197,94,.5)]"
                    : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {i < stageIdx ? "✓" : i + 1}
            </span>
            <span className={`font-mono text-[11px] ${i <= stageIdx ? "text-zinc-200" : "text-zinc-600"}`}>{s}</span>
            {i < stages.length - 1 && <span className={`h-px flex-1 ${i < stageIdx ? "bg-green-500/60" : "bg-zinc-800"}`} />}
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-zinc-500">
        <span className="text-green-400">●</span> {feed.footer}
      </div>
    </div>
  );
}

/* ================= HERO ================= */
function Hero() {
  const idle = useIdle();
  const waItems: [string, string][] = [
    ["🛒 Online store — products, orders & payments", "Hi Talaat, I need an online store (products, orders, payments)."],
    ["📝 CMS / admin panel — edit content yourself", "Hi Talaat, I need a CMS / admin panel to manage my own content."],
    ["📅 Booking system — events, appointments, courses", "Hi Talaat, I need a booking system (events / appointments / courses)."],
    ["🔧 Updates on my existing project", "Hi Talaat, I need updates and improvements on my existing project."],
    ["📊 Dashboard — sales, stock & reports", "Hi Talaat, I need a dashboard with sales, stock and reports."],
    ["⚡ Fix bugs / speed up my site", "Hi Talaat, I need bugs fixed and my site sped up."],
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
      {/* animated backdrop */}
      <div className="bg-grid bg-grid-animated pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0">
        {idle && <Particles density={60} className="absolute inset-0 h-full w-full opacity-70" />}
        <div className="animate-blob absolute -top-24 -left-24 h-[380px] w-[380px] bg-green-500/15 blur-3xl" />
        <div className="animate-blob absolute top-20 right-[-120px] h-[420px] w-[420px] bg-cyan-500/10 blur-3xl" style={{ animationDelay: "-6s" }} />
        <div className="animate-float-slow absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <div>
          <div className="hero-anim hero-d1 mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-300 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Available for freelance — replies within 24h
          </div>

          <h1 className="hero-anim hero-d2 text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl">
            Talaat Ramadan
            <br />
            <span className="bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-200 bg-clip-text text-transparent animate-gradient">
              Software Engineer
            </span>
            <br />
            <span className="text-green-400">
              <Typewriter
                words={[
                  "I turn ideas into fast web apps.",
                  "I build booking platforms.",
                  "I ship stores & dashboards.",
                  "I craft clean, tested APIs.",
                ]}
              />
            </span>
          </h1>

          <p className="hero-anim hero-d3 mt-5 max-w-xl text-lg text-zinc-400">
            I build the whole product — robust backends in{" "}
            <span className="text-zinc-200">ASP.NET Core, Laravel or Node.js</span>, modern frontends in{" "}
            <span className="text-zinc-200">Angular or Next.js</span>, and clean APIs connecting them. Booking
            platforms, online stores and dashboards — delivered tested, documented and deployed.
          </p>
          <p className="hero-anim hero-d4 mt-3 max-w-xl text-base text-zinc-300">
            🎯 For startups, academies, clinics & local businesses across Egypt and the Gulf — working in Arabic or English.
          </p>

          <div className="hero-anim hero-d5 mt-7 flex flex-wrap gap-3">
            <Magnetic>
              <a href={WHATSAPP} target="_blank" onClick={() => trackCta("hero_whatsapp")} className="btn-glow shine inline-block rounded-full bg-green-500 px-6 py-3 font-semibold text-zinc-950 hover:bg-green-400">
                Chat on WhatsApp
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#work" className="inline-block rounded-full border border-white/15 px-6 py-3 font-semibold text-white backdrop-blur transition hover:scale-105 hover:bg-white/10">
                View Work ↓
              </a>
            </Magnetic>
            <a href={CV_PATH} download className="rounded-full border border-white/15 px-6 py-3 text-zinc-300 transition hover:scale-105 hover:bg-white/10">
              Download CV ↓
            </a>
          </div>

          <div className="hero-anim hero-d6 mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <a href={`mailto:${EMAIL}`} className="link-underline hover:text-white">✉️ {EMAIL}</a>
            <CopyEmail email={EMAIL} className="text-xs text-zinc-500" />
            <a href={LINKEDIN} target="_blank" className="link-underline hover:text-white">LinkedIn ↗</a>
            <a href={GITHUB} target="_blank" className="link-underline hover:text-white">GitHub ↗</a>
          </div>

          {/* animated stats */}
          <div className="hero-anim hero-d7 mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { v: 4, s: "+", l: "Live systems" },
              { v: 327, s: "+", l: "Tests passing" },
              { v: 8, s: "+", l: "Stacks mastered" },
              { v: 24, s: "h", l: "Reply time" },
            ].map((st) => (
              <div key={st.l} className="card-lift rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center backdrop-blur">
                <div className="text-2xl font-extrabold text-white">
                  <CountUp to={st.v} suffix={st.s} />
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-zinc-500">{st.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right column */}
        <div className="hero-anim hero-d4 space-y-4">
          <LiveTerminal />

          {/* quick request card */}
          <div className="card-lift rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-6 backdrop-blur">
            <p className="text-sm uppercase tracking-widest text-zinc-400">Which one do you need?</p>
            <p className="mt-1 text-xs text-zinc-500">Tap one — WhatsApp opens with your request ready to send.</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-200">
              {waItems.map(([label, msg], i) => (
                <li key={label} className="hero-anim" style={{ animationDelay: `${1 + i * 0.08}s` }}>
                  <a
                    href={`${WHATSAPP}?text=${encodeURIComponent(msg)}`}
                    target="_blank"
                    className="group block rounded-xl bg-white/[0.04] px-3 py-2 transition hover:translate-x-1 hover:bg-green-500/15 hover:text-white"
                  >
                    {label} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <Magnetic className="mt-5 block">
              <a href="#contact" className="btn-glow block rounded-xl bg-white px-4 py-3 text-center font-semibold text-zinc-950 hover:bg-zinc-200">
                Or get a free quote →
              </a>
            </Magnetic>
            <p className="mt-2 text-center text-xs text-zinc-500">No commitment. Reply within 24 hours.</p>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="relative mt-10 flex justify-center">
        <a href="#services" className="animate-bounce-soft flex flex-col items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300">
          scroll
          <span className="text-lg">↓</span>
        </a>
      </div>
    </section>
  );
}

/* ================= MARQUEE ================= */
function TechMarquee() {
  const items = ["ASP.NET Core", "Laravel 12", "NestJS", "Next.js", "Angular", "TypeScript", "Tailwind", "SQL Server", "MySQL", "Docker", "xUnit", "Pest", "JWT", "Hangfire", "CQRS"];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-4">
      <div className="marquee-track gap-3 px-3">
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-zinc-900/80 px-4 py-1.5 text-sm text-zinc-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            {t}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent" />
    </div>
  );
}

/* ================= SERVICES ================= */
function Services() {
  const icons = ["🚀", "🔌", "⚡"];
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
      <SectionHead
        kicker="Services"
        title="What I can build for you"
        sub="From first message to deployed production — one developer owning backend, frontend, tests and deploy."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 120}>
            <Tilt className="h-full">
              <div className="card-lift group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur hover:border-green-500/40">
                <div className="animate-float flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/30 to-cyan-500/20 text-2xl" style={{ animationDelay: `${i * 0.8}s` }}>
                  {icons[i % icons.length]}
                </div>
                <h3 className="mt-4 text-xl font-bold text-white transition-colors group-hover:text-green-300">{s.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{s.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  {s.points.map((p, j) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-[11px] text-green-300">✓</span>
                      <span style={{ transitionDelay: `${j * 60}ms` }}>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <a href={WHATSAPP} target="_blank" className="btn-glow mt-3 block rounded-xl bg-white/10 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-green-500 hover:text-zinc-950">
                    Ask about this →
                  </a>
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= WORK ================= */
function Work() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-green-500/[0.06] blur-3xl" />
      <SectionHead
        kicker="Selected work"
        title="Real projects, real code, live demos"
        sub="Every project below is a full system — auth, database, business rules, tests — not a tutorial clone. Click for full case study."
      />
      <div className="relative mt-8 grid auto-rows-fr items-stretch gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 140} as="article" className="h-full">
            <Tilt className="h-full">
              <article className="card-lift group flex h-full min-h-[560px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur hover:border-green-500/40">
                {/* browser mockup header */}
                <div className="relative h-44 shrink-0 overflow-hidden border-b border-white/10 bg-zinc-900">
                  <div className="h-full transition-transform duration-500 group-hover:scale-[1.03]">
                    <ProjectMockup slug={p.slug} />
                  </div>
                  <div className="animate-float absolute left-3 top-2.5 rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-semibold text-green-300 backdrop-blur">
                    {p.badge}
                  </div>
                  {p.live && (
                    <div className="absolute bottom-2 right-3 rounded-full bg-zinc-950/80 px-2.5 py-1 backdrop-blur">
                      <LiveDot url={p.live} lang="en" />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-zinc-950/60 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <a href={`/projects/${p.slug}`}>
                    <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-green-300">
                      {p.name}
                    </h3>
                  </a>
                  <p className="min-h-[20px] text-sm font-medium text-zinc-300">{p.tagline}</p>
                  <p className="mt-3 line-clamp-3 min-h-[63px] text-sm leading-relaxed text-zinc-400">{p.description}</p>
                  <ul className="mt-4 min-h-[66px] space-y-1.5 text-sm text-zinc-300">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="text-green-400">✓</span> {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 min-h-[48px]">
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((t) => (
                        <span key={t} className="rounded-md bg-zinc-800/90 px-2 py-0.5 text-[11px] text-zinc-300 transition hover:bg-green-500/20 hover:text-green-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto pt-5">
                    <div className="flex min-h-[44px] gap-2">
                    <a href={`/projects/${p.slug}`} className="btn-glow flex-1 rounded-xl bg-white px-4 py-2.5 text-center text-sm font-bold text-zinc-950 hover:bg-zinc-200">
                      Case Study →
                    </a>
                    {p.live && (
                      <a href={p.live} target="_blank" className="btn-glow shine flex-1 rounded-xl bg-green-500 px-4 py-2.5 text-center text-sm font-bold text-zinc-950 hover:bg-green-400">
                        {p.liveLabel || "Live Demo"} ↗
                      </a>
                    )}
                  </div>
                  <a href={p.github} target="_blank" className="mt-2 rounded-xl border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-white/10">
                    GitHub Code ↗
                  </a>
                  </div>
                </div>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= PROCESS ================= */
function Process() {
  const steps = [
    ["1. Contact", "Message me on WhatsApp or email. Tell me your idea in 2-3 lines.", "💬"],
    ["2. Scope & Quote", "I break it into features, give fixed price + timeline. No surprises.", "📋"],
    ["3. Build in milestones", "You see progress early. Backend → frontend → deploy.", "🛠️"],
    ["4. Deliver & Support", "Deployed + docs + 2 weeks free bug support.", "🚀"],
  ];
  return (
    <section id="process" className="relative overflow-hidden border-y border-white/10 bg-white/[0.02]">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -left-20 top-10 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 py-16">
        <SectionHead kicker="Process" title="Simple, no-risk way to work with me" />
        <div className="relative mt-10">
          <div className="absolute left-0 right-0 top-7 hidden h-[2px] bg-zinc-800 md:block">
            <div className="h-full w-full origin-left animate-gradient bg-gradient-to-r from-green-500 via-emerald-400 to-cyan-400" />
          </div>
          <div className="relative mt-8 grid gap-4 md:grid-cols-4">
            {steps.map(([t, d, icon], i) => (
              <Reveal key={t} delay={i * 140}>
                <div className="card-lift group rounded-2xl border border-white/10 bg-zinc-900/90 p-5 backdrop-blur hover:border-green-500/40">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-700 text-xl shadow-lg shadow-green-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      {icon}
                    </div>
                    <span className="font-mono text-xs text-green-400/70">0{i + 1}</span>
                  </div>
                  <div className="mt-3 font-bold text-white">{t}</div>
                  <div className="mt-2 text-sm text-zinc-400">{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= PRICING ================= */
function Pricing() {
  const tiers = [
    { n: "Fixes & Small Tasks", p: "Custom quote per task", f: ["Describe the bug or feature you need", "Fixed quote upfront — no surprises", "Pay on delivery"] },
    { n: "Websites & Web Apps", p: "Quoted after free scoping", f: ["Share your requirements or examples", "Fixed price + clear timeline", "Milestone payments as we build"], hot: true },
    { n: "Custom Systems & APIs", p: "Scoped together", f: ["Short discovery call to map needs", "Milestone plan with fixed price", "You approve every stage"] },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <SectionHead
        kicker="Pricing"
        title="Fair pricing, based on your requirements"
        sub="No inflated price list. Tell me what you need — I study it for free and give you a fixed quote before we start."
        align="center"
      />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {tiers.map((t, i) => (
          <Reveal key={t.n} delay={i * 130}>
            <Tilt>
              <div
                className={`card-lift relative flex h-full flex-col rounded-3xl border p-6 backdrop-blur ${
                  t.hot
                    ? "shine border-green-500/60 bg-gradient-to-b from-green-500/[0.12] to-transparent shadow-xl shadow-green-500/10"
                    : "border-white/10 bg-white/[0.03]"
                } ${t.hot ? "md:-translate-y-2 md:scale-[1.02]" : ""}`}
              >
                {t.hot && (
                  <span className="animate-gradient w-fit rounded-full bg-gradient-to-r from-green-400 to-emerald-500 px-3 py-1 text-xs font-bold text-zinc-950">
                    MOST POPULAR ✦
                  </span>
                )}
                <h3 className="mt-2 text-lg font-bold text-white">{t.n}</h3>
                <div className="mt-1 bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-2xl font-extrabold text-transparent">
                  {t.p}
                </div>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  {t.f.map((f) => (
                    <li key={f} className="flex items-start gap-2"> <span className="text-green-400">✓</span> {f}</li>
                  ))}
                </ul>
                <Magnetic className="mt-5 block">
                  <a href={WHATSAPP} target="_blank" className={`block rounded-xl px-4 py-2.5 text-center text-sm font-bold transition hover:scale-[1.02] ${t.hot ? "btn-glow bg-green-500 text-zinc-950 hover:bg-green-400" : "bg-white text-zinc-950 hover:bg-zinc-200"}`}>
                    Describe your needs
                  </a>
                </Magnetic>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4 text-center text-xs text-zinc-500">
        <p>Every quote is free. You never pay 100% upfront.</p>
      </Reveal>
    </section>
  );
}

/* ================= ABOUT ================= */
function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-16">
      <Reveal>
        <div className="relative grid gap-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur md:grid-cols-[0.9fr_1.1fr]">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
          <div className="relative">
            <SectionHead kicker="About" title="Hi, I'm Talaat Ramadan" />
            <p className="mt-4 text-zinc-400 leading-relaxed">
              Software Engineer focused on business systems. I&apos;ve built event marketplaces, order management
              backends, academy platforms and service-management apps across{" "}
              <b className="text-zinc-200">.NET, Laravel, Node.js and Angular/Next.js</b>.
            </p>
            <p className="mt-3 text-zinc-400 leading-relaxed">
              Based in Egypt and working remotely, I communicate in Arabic and English — from the first requirements call to post-launch support. You&apos;ll always know what&apos;s done, what&apos;s next, and what it costs.
            </p>
            <p className="mt-3 text-zinc-400 leading-relaxed">
              I care about the boring stuff that saves you money: correct inventory, correct payments, roles that actually secure,
              tests that catch regressions, and deploys that just work.
            </p>
            <p className="mt-3 text-sm text-zinc-400">📧 <a className="link-underline text-green-300 hover:text-green-200" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Magnetic><a href={CV_PATH} download className="btn-glow inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-zinc-200">Download CV ↓</a></Magnetic>
              <a href={GITHUB} target="_blank" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:scale-105 hover:bg-white/10">GitHub ↗</a>
              <a href={LINKEDIN} target="_blank" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:scale-105 hover:bg-white/10">LinkedIn ↗</a>
              <a href={WHATSAPP} target="_blank" className="btn-glow rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-green-400">WhatsApp ↗</a>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              {[
                { v: 180, s: "+", l: ".NET tests" },
                { v: 147, s: "", l: "Laravel tests" },
                { v: 67, s: "", l: "Commits/project" },
              ].map((x) => (
                <div key={x.l} className="rounded-xl bg-zinc-900/80 p-3">
                  <div className="text-xl font-extrabold text-green-300"><CountUp to={x.v} suffix={x.s} /></div>
                  <div className="text-[11px] text-zinc-500">{x.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid content-center gap-3">
            <SkillBar label="Backend" pct={95} detail=".NET 10 / C# / Laravel 12 / Node.js (Express, NestJS) — Clean Arch, CQRS, Identity/JWT, Hangfire, Serilog" />
            <SkillBar label="Frontend" pct={90} detail="Angular 20/22 / Next.js / TypeScript / Tailwind — dashboards, forms, SEO pages" />
            <SkillBar label="Data & DevOps" pct={88} detail="SQL Server / MySQL / EF Core — Docker, GitHub Actions CI, Vercel / VPS deploys" />
            <SkillBar label="Quality" pct={93} detail="xUnit + Pest (300+ tests total) — Scalar/Postman docs, audit logs, health checks" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================= FAQ ================= */
function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-16">
      <SectionHead kicker="FAQ" title="FAQ" align="center" />
      <div className="mt-8 space-y-3">
        {FAQS.map(([q, a], i) => (
          <Reveal key={q} delay={i * 80}>
            <details className="faq-anim group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition-colors open:border-green-500/40 hover:border-white/25">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white">
                {q}
                <span className="faq-chevron flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-lg text-green-300">+</span>
              </summary>
              <p className="faq-body mt-2 text-sm leading-relaxed text-zinc-400">{a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
function Contact() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 pb-20">
      <Reveal>
        <div className="animate-gradient relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-400 via-green-500 to-emerald-700 p-8 text-zinc-950 md:p-12">
          <div className="animate-float-slow pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="animate-float pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-zinc-950/15 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Have a project? Let&apos;s build it.</h2>
            <p className="mt-3 max-w-xl font-medium">Tell me what you need — I&apos;ll reply with price + timeline within 24 hours.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Magnetic>
                <a href={WHATSAPP} target="_blank" className="btn-glow inline-block rounded-full bg-zinc-950 px-6 py-3 font-bold text-white hover:bg-zinc-800">
                  💬 WhatsApp: +20 112 634 2642
                </a>
              </Magnetic>
              <a href={`mailto:${EMAIL}`} className="btn-glow inline-block rounded-full bg-white px-6 py-3 font-bold hover:bg-zinc-200">
                ✉️ {EMAIL}
              </a>
              <a href={LINKEDIN} target="_blank" className="rounded-full border-2 border-zinc-950/20 px-6 py-3 font-bold transition hover:scale-105 hover:bg-zinc-950/10">
                LinkedIn ↗
              </a>
              <a href={GITHUB} target="_blank" className="rounded-full border-2 border-zinc-950/20 px-6 py-3 font-bold transition hover:scale-105 hover:bg-zinc-950/10">
                GitHub ↗
              </a>
            </div>
            <form
              className="mt-8 grid gap-3 rounded-2xl bg-zinc-950 p-5 shadow-2xl md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                trackCta("quote_form");
                const f = new FormData(e.currentTarget as HTMLFormElement);
                const msg = `Name: ${f.get("name")}%0AEmail: ${f.get("email")}%0A%0A${f.get("message")}`;
                window.open(`${WHATSAPP}?text=${msg}`, "_blank");
              }}
            >
              <input name="name" suppressHydrationWarning required placeholder="Your name" className="rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500" />
              <input name="email" suppressHydrationWarning type="email" required placeholder="Your email" className="rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500" />
              <textarea name="message" suppressHydrationWarning required rows={4} placeholder="What do you want to build? (features, timeline, links...)" className="rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500 md:col-span-2" />
              <button className="btn-glow shine rounded-xl bg-green-500 px-4 py-3 font-bold text-zinc-950 hover:bg-green-400 md:col-span-2">
                Send via WhatsApp →
              </button>
              <a href={`mailto:${EMAIL}`} className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 md:col-span-2">
                Or send via Email →
              </a>
              <p className="text-center text-xs text-zinc-500 md:col-span-2">
                No WhatsApp? Email me directly at <a href={`mailto:${EMAIL}`} className="text-green-400 underline">{EMAIL}</a> — I reply within 24h.
              </p>
            </form>
          </div>
        </div>
      </Reveal>
      <footer className="mt-10 text-center text-xs text-zinc-500">
        <span>© 2026 Talaat Ramadan — Software Engineer • {EMAIL}</span>
      </footer>

      {/* floating buttons */}
      <a href={WHATSAPP} target="_blank" aria-label="WhatsApp" className="animate-pulse-ring fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl shadow-lg shadow-green-500/30 transition hover:scale-110 hover:bg-green-400">
        💬
      </a>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-[5.75rem] right-[1.65rem] z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-zinc-900 text-white shadow-xl transition-all duration-300 hover:bg-white/10 ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        ↑
      </button>
    </section>
  );
}

export default function Home() {
  const idle = useIdle();
  return (
    <>
      <HomeJsonLd />
      <Preloader />
      <ScrollProgress />
      {idle && <CursorGlow />}
      <Nav />
      <main id="main">
        <Hero />
        <TechMarquee />
        <GithubTicker lang="en" username={GITHUB.split("/").pop() ?? "ixtalaat"} />
        <Services />
        <Work />
        <Process />
        <TrustBand lang="en" />
        <CompareTable lang="en" />
        <Pricing />
        <TeardownOffer lang="en" whatsapp={WHATSAPP} />
        <About />
        <FAQ />
        <Contact />
      </main>
      <StickyMobileCTA whatsapp={WHATSAPP} lang="en" />
    </>
  );
}
