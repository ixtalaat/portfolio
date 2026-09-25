"use client";

import { useState } from "react";
import { projects, services, WHATSAPP, GITHUB, LINKEDIN, EMAIL, CV_PATH } from "@/data/content";

function Nav() {
  const [open, setOpen] = useState(false);
  const links: [string, string][] = [
    ["Work", "/#work"],
    ["Services", "/#services"],
    ["Process", "/#process"],
    ["Pricing", "/#pricing"],
    ["About", "/#about"],
    ["FAQ", "/#faq"],
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="/" className="font-bold tracking-tight text-white">
          ixtalaat<span className="text-green-400">.dev</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-white">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/ar" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10">عربي</a>
          <a
            href={CV_PATH}
            download
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10 sm:block"
          >
            CV ↓
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            className="hidden rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-green-400 sm:block"
          >
            Hire Me
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-full border border-white/15 px-3 py-2 text-white md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/10 px-5 py-3 md:hidden">
          <div className="grid gap-1">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-white/10"
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

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_10%,rgba(34,197,94,0.15),transparent),radial-gradient(600px_300px_at_80%_20%,rgba(59,130,246,0.12),transparent)]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            Available for freelance — replies within 24h
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl">
            Talaat Ramadan
            <br />
            <span className="text-zinc-400">Software Engineer</span>
            <br />
            <span className="text-green-400">I turn your ideas into fast, reliable web apps.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-zinc-400">
            Full-stack: <span className="text-zinc-200">ASP.NET Core • Laravel • Node.js (Express, NestJS) • Angular • Next.js</span>.
            Booking platforms, marketplaces, dashboards & clean APIs — tested, documented, deployed.
          </p>
          <p className="mt-3 max-w-xl text-base text-zinc-300">
            🎯 For startups, academies, clinics & local businesses across Egypt and the Gulf — working in Arabic or English.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={WHATSAPP} target="_blank" className="rounded-full bg-green-500 px-6 py-3 font-semibold text-zinc-950 hover:bg-green-400">
              Chat on WhatsApp
            </a>
            <a href="#work" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white hover:bg-white/10">
              View Work ↓
            </a>
            <a href={CV_PATH} download className="rounded-full border border-white/15 px-6 py-3 text-zinc-300 hover:bg-white/10">
              Download CV ↓
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-zinc-400">
            <a href={`mailto:${EMAIL}`} className="hover:text-white">✉️ {EMAIL}</a>
            <a href={LINKEDIN} target="_blank" className="hover:text-white">LinkedIn ↗</a>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6">
          <p className="text-sm uppercase tracking-widest text-zinc-500">Which one do you need?</p>
          <p className="mt-1 text-xs text-zinc-500">Tap one — WhatsApp opens with your request ready to send.</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-200">
            {[
              ["🛒 Online store — products, orders & payments", "Hi Talaat, I need an online store (products, orders, payments)."],
              ["📝 CMS / admin panel — edit content yourself", "Hi Talaat, I need a CMS / admin panel to manage my own content."],
              ["📅 Booking system — events, appointments, courses", "Hi Talaat, I need a booking system (events / appointments / courses)."],
              ["🔧 Updates on my existing project", "Hi Talaat, I need updates and improvements on my existing project."],
              ["📊 Dashboard — sales, stock & reports", "Hi Talaat, I need a dashboard with sales, stock and reports."],
              ["⚡ Fix bugs / speed up my site", "Hi Talaat, I need bugs fixed and my site sped up."],
            ].map(([label, msg]) => (
              <li key={label}>
                <a
                  href={`${WHATSAPP}?text=${encodeURIComponent(msg)}`}
                  target="_blank"
                  className="block rounded-xl bg-white/[0.04] px-3 py-2 hover:bg-green-500/15 hover:text-white"
                >
                  {label} →
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="mt-5 block rounded-xl bg-white px-4 py-3 text-center font-semibold text-zinc-950 hover:bg-zinc-200">
            Or get a free quote →
          </a>
          <p className="mt-2 text-center text-xs text-zinc-500">No commitment. Reply within 24 hours.</p>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-green-400">Services</p>
      <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">What I can build for you</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-green-500/40">
            <h3 className="text-xl font-bold text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{s.desc}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {s.points.map((p) => <li key={p}>• {p}</li>)}
            </ul>
            <div className="mt-auto pt-5">
              <a href={WHATSAPP} target="_blank" className="mt-3 block rounded-xl bg-white/10 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-white/20">Ask about this →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-green-400">Selected work</p>
      <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Real projects, real code, live demos</h2>
      <p className="mt-3 max-w-2xl text-zinc-400">Every project below is a full system — auth, database, business rules, tests — not a tutorial clone. Click for full case study.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.slug} className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 hover:border-green-500/40">
            <span className="w-fit rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300">{p.badge}</span>
            <a href={`/projects/${p.slug}`}>
              <h3 className="mt-3 text-2xl font-bold text-white hover:text-green-300">{p.name}</h3>
            </a>
            <p className="text-sm font-medium text-zinc-300">{p.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.description}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-zinc-300">
              {p.highlights.map((h) => <li key={h}>✓ {h}</li>)}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((t) => (
                <span key={t} className="rounded-md bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300">{t}</span>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              <a href={`/projects/${p.slug}`} className="flex-1 rounded-xl bg-white px-4 py-2.5 text-center text-sm font-bold text-zinc-950 hover:bg-zinc-200">
                Case Study →
              </a>
              {p.live && (
                <a href={p.live} target="_blank" className="flex-1 rounded-xl bg-green-500 px-4 py-2.5 text-center text-sm font-bold text-zinc-950 hover:bg-green-400">
                  {p.liveLabel || "Live Demo"} ↗
                </a>
              )}
            </div>
            <a href={p.github} target="_blank" className="mt-2 rounded-xl border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10">
              GitHub Code ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["1. Contact", "Message me on WhatsApp or email. Tell me your idea in 2-3 lines."],
    ["2. Scope & Quote", "I break it into features, give fixed price + timeline. No surprises."],
    ["3. Build in milestones", "You see progress early. Backend → frontend → deploy."],
    ["4. Deliver & Support", "Deployed + docs + 2 weeks free bug support."],
  ];
  return (
    <section id="process" className="border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-400">Process</p>
        <h2 className="mt-2 text-3xl font-bold text-white">Simple, no-risk way to work with me</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
              <div className="font-bold text-white">{t}</div>
              <div className="mt-2 text-sm text-zinc-400">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { n: "Fixes & Small Tasks", p: "Custom quote per task", f: ["Describe the bug or feature you need", "Fixed quote upfront — no surprises", "Pay on delivery"] },
    { n: "Websites & Web Apps", p: "Quoted after free scoping", f: ["Share your requirements or examples", "Fixed price + clear timeline", "Milestone payments as we build"], hot: true },
    { n: "Custom Systems & APIs", p: "Scoped together", f: ["Short discovery call to map needs", "Milestone plan with fixed price", "You approve every stage"] },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-green-400">Pricing</p>
      <h2 className="mt-2 text-3xl font-bold text-white">Fair pricing, based on your requirements</h2>
      <p className="mt-3 max-w-2xl text-zinc-400">No inflated price list. Tell me what you need — I study it for free and give you a fixed quote before we start.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {tiers.map((t) => (
          <div key={t.n} className={`rounded-3xl border p-6 ${t.hot ? "border-green-500/60 bg-green-500/[0.07]" : "border-white/10 bg-white/[0.03]"}`}>
            {t.hot && <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-zinc-950">MOST POPULAR</span>}
            <h3 className="mt-2 text-lg font-bold text-white">{t.n}</h3>
            <div className="mt-1 text-2xl font-extrabold text-green-400">{t.p}</div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">{t.f.map((f) => <li key={f}>✓ {f}</li>)}</ul>
            <a href={WHATSAPP} target="_blank" className="mt-5 block rounded-xl bg-white px-4 py-2.5 text-center text-sm font-bold text-zinc-950 hover:bg-zinc-200">Describe your needs</a>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500">Every quote is free. You never pay 100% upfront.</p>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-green-400">About</p>
          <h2 className="mt-2 text-3xl font-bold text-white">Hi, I&apos;m Talaat Ramadan</h2>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            Software Engineer focused on business systems. I&apos;ve built event marketplaces, order management
            backends, academy platforms and service-management apps across <b className="text-zinc-200">.NET, Laravel, Node.js and Angular/Next.js</b>.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            Based in Egypt and working remotely, I communicate in Arabic and English — from the first requirements call to post-launch support. You&apos;ll always know what&apos;s done, what&apos;s next, and what it costs.
          </p>
          <p className="mt-3 text-zinc-400 leading-relaxed">
            I care about the boring stuff that saves you money: correct inventory, correct payments, roles that actually secure,
            tests that catch regressions, and deploys that just work.
          </p>
          <p className="mt-3 text-sm text-zinc-400">📧 <a className="text-green-300 hover:text-green-200" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={CV_PATH} download className="rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-zinc-200">Download CV ↓</a>
            <a href={GITHUB} target="_blank" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">GitHub ↗</a>
            <a href={LINKEDIN} target="_blank" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">LinkedIn ↗</a>
            <a href={WHATSAPP} target="_blank" className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-green-400">WhatsApp ↗</a>
          </div>
        </div>
        <div className="grid content-center gap-3">
          {[
            ["Backend", ".NET 10 / C# / Laravel 12 / Node.js (Express, NestJS) — Clean Arch, CQRS, Identity/JWT, Hangfire, Serilog"],
            ["Frontend", "Angular 20/22 / Next.js / TypeScript / Tailwind — dashboards, forms, SEO pages"],
            ["Data & DevOps", "SQL Server / MySQL / EF Core — Docker, GitHub Actions CI, Vercel / VPS deploys"],
            ["Quality", "xUnit + Pest (300+ tests total) — Scalar/Postman docs, audit logs, health checks"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-zinc-900 p-4">
              <div className="font-bold text-white">{t}</div>
              <div className="mt-1 text-sm text-zinc-400">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    ["How fast can you start?", "Usually within 2-3 days. Message me and I'll confirm availability + timeline in the first reply."],
    ["How do payments work?", "Milestones: e.g. 30% to start, rest on delivery milestones. Small fixes: pay on delivery."],
    ["Do you provide support after delivery?", "Yes — 2 weeks free bug fixes on every project. Longer maintenance available monthly."],
    ["Can you work with my existing code?", "Yes. Send the GitHub repo or zip. I'll review and give a fix/feature quote."],
    ["Upwork / Freelancer / Mostaql?", "Yes — I can work through any platform you prefer for payment protection. Just send the link/invite."],
  ];
  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-16">
      <h2 className="text-3xl font-bold text-white text-center">FAQ</h2>
      <div className="mt-8 space-y-3">
        {faqs.map(([q, a]) => (
          <details key={q} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <summary className="cursor-pointer font-semibold text-white">{q}</summary>
            <p className="mt-2 text-sm text-zinc-400">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-20">
      <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-700 p-8 text-zinc-950 md:p-12">
        <h2 className="text-3xl font-extrabold md:text-4xl">Have a project? Let&apos;s build it.</h2>
        <p className="mt-3 max-w-xl font-medium">Tell me what you need — I&apos;ll reply with price + timeline within 24 hours.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={WHATSAPP} target="_blank" className="rounded-full bg-zinc-950 px-6 py-3 font-bold text-white hover:bg-zinc-800">
            💬 WhatsApp: +20 112 634 2642
          </a>
          <a href={`mailto:${EMAIL}`} className="rounded-full bg-white px-6 py-3 font-bold hover:bg-zinc-200">
            ✉️ {EMAIL}
          </a>
          <a href={LINKEDIN} target="_blank" className="rounded-full border-2 border-zinc-950/20 px-6 py-3 font-bold hover:bg-zinc-950/10">
            LinkedIn ↗
          </a>
          <a href={GITHUB} target="_blank" className="rounded-full border-2 border-zinc-950/20 px-6 py-3 font-bold hover:bg-zinc-950/10">
            GitHub ↗
          </a>
        </div>
        <form
          className="mt-8 grid gap-3 rounded-2xl bg-zinc-950 p-5 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget as HTMLFormElement);
            const msg = `Name: ${f.get("name")}%0AEmail: ${f.get("email")}%0A%0A${f.get("message")}`;
            window.open(`${WHATSAPP}?text=${msg}`, "_blank");
          }}
        >
          <input name="name" suppressHydrationWarning required placeholder="Your name" className="rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500" />
          <input name="email" suppressHydrationWarning type="email" required placeholder="Your email" className="rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500" />
          <textarea name="message" suppressHydrationWarning required rows={4} placeholder="What do you want to build? (features, timeline, links...)" className="rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500 md:col-span-2" />
          <button className="rounded-xl bg-green-500 px-4 py-3 font-bold text-zinc-950 hover:bg-green-400 md:col-span-2">
            Send via WhatsApp →
          </button>
          <a href={`mailto:${EMAIL}`} className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10 md:col-span-2">
            Or send via Email →
          </a>
          <p className="text-center text-xs text-zinc-500 md:col-span-2">
            No WhatsApp? Email me directly at <a href={`mailto:${EMAIL}`} className="text-green-400 underline">{EMAIL}</a> — I reply within 24h.
          </p>
        </form>
      </div>
      <footer className="mt-10 text-center text-xs text-zinc-500">
        <span>© 2026 Talaat Ramadan — Software Engineer • {EMAIL}</span>
      </footer>
      <a href={WHATSAPP} target="_blank" aria-label="WhatsApp" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl shadow-lg shadow-green-500/30 hover:bg-green-400">💬</a>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
