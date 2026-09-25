"use client";

import { useState } from "react";
import { projectsAr, servicesAr, WHATSAPP, GITHUB, LINKEDIN, EMAIL, CV_PATH } from "@/data/content.ar";

function Nav() {
  const [open, setOpen] = useState(false);
  const links: [string, string][] = [
    ["الأعمال", "#work"],
    ["الخدمات", "#services"],
    ["الخطوات", "#process"],
    ["الأسعار", "#pricing"],
    ["عني", "#about"],
    ["أسئلة", "#faq"],
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-zinc-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="/ar" className="font-bold tracking-tight text-white">
          طلعت<span className="text-green-400">.ديف</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-white">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/" className="rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10">EN</a>
          <a href={CV_PATH} download className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10 sm:block">السيرة ↓</a>
          <a href={WHATSAPP} target="_blank" className="hidden rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-green-400 sm:block">وظفني</a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="فتح القائمة"
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
              وظفني
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default function ArHome() {
  return (
    <>
      <Nav />
      <main>
        <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_10%,rgba(34,197,94,0.15),transparent),radial-gradient(600px_300px_at_80%_20%,rgba(59,130,246,0.12),transparent)]" />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                متاح للعمل الحر — أرد خلال 24 ساعة
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.3] tracking-tight text-white md:text-6xl">
                طلعت رمضان
                <br />
                <span className="text-zinc-400">مهندس برمجيات</span>
                <br />
                <span className="text-green-400">أحوّل أفكارك إلى تطبيقات ويب سريعة وموثوقة.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-zinc-400">
                متكامل: <span className="text-zinc-200">ASP.NET Core • Laravel • Node.js (Express, NestJS) • Angular • Next.js</span>.
                أنظمة حجز ومتاجر ولوحات تحكم وAPIs نظيفة — مختبرة وموثقة ومنشورة.
              </p>
              <p className="mt-3 max-w-xl text-base text-zinc-300">
                🎯 للشركات الناشئة والأكاديميات والعيادات والمحلات في مصر والخليج — بالعربية أو الإنجليزية.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={WHATSAPP} target="_blank" className="rounded-full bg-green-500 px-6 py-3 font-semibold text-zinc-950 hover:bg-green-400">كلمني واتساب</a>
                <a href="#work" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white hover:bg-white/10">شوف شغلي ↓</a>
                <a href={CV_PATH} download className="rounded-full border border-white/15 px-6 py-3 text-zinc-300 hover:bg-white/10">حمّل السيرة ↓</a>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-zinc-400">
                <a href={`mailto:${EMAIL}`} className="hover:text-white">✉️ {EMAIL}</a>
                <a href={LINKEDIN} target="_blank" className="hover:text-white">لينكدإن ↗</a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6">
              <p className="text-sm uppercase tracking-widest text-zinc-500">ما الذي تحتاجه؟</p>
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
                    <a
                      href={`${WHATSAPP}?text=${encodeURIComponent(msg)}`}
                      target="_blank"
                      className="block rounded-xl bg-white/[0.04] px-3 py-2 hover:bg-green-500/15 hover:text-white"
                    >
                      {label} ←
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-5 block rounded-xl bg-white px-4 py-3 text-center font-semibold text-zinc-950 hover:bg-zinc-200">أو اطلب عرض سعر مجاني ←</a>
              <p className="mt-2 text-center text-xs text-zinc-500">بدون التزام. الرد خلال 24 ساعة.</p>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-400">الخدمات</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">ماذا أبني لك</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {servicesAr.map((s) => (
              <div key={s.title} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:border-green-500/40">
                <h3 className="text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{s.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  {s.points.map((p) => <li key={p}>• {p}</li>)}
                </ul>
                <div className="mt-auto pt-5">
                  <a href={WHATSAPP} target="_blank" className="mt-3 block rounded-xl bg-white/10 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-white/20">اسأل عن الخدمة ←</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-400">أعمال مختارة</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">مشاريع حقيقية بكود حقيقي وتشغيل حي</h2>
          <p className="mt-3 max-w-2xl text-zinc-400">كل مشروع نظام كامل — تسجيل وقاعدة بيانات وقواعد عمل واختبارات. اضغط لقراءة دراسة الحالة.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {projectsAr.map((p) => (
              <article key={p.slug} className="flex flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 hover:border-green-500/40">
                <span className="w-fit rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-300">{p.badge}</span>
                <a href={`/ar/projects/${p.slug}`}><h3 className="mt-3 text-2xl font-bold text-white hover:text-green-300">{p.name}</h3></a>
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
                  <a href={`/ar/projects/${p.slug}`} className="flex-1 rounded-xl bg-white px-4 py-2.5 text-center text-sm font-bold text-zinc-950 hover:bg-zinc-200">دراسة الحالة ←</a>
                  {p.live && <a href={p.live} target="_blank" className="flex-1 rounded-xl bg-green-500 px-4 py-2.5 text-center text-sm font-bold text-zinc-950 hover:bg-green-400">{p.liveLabel} ↗</a>}
                </div>
                <a href={p.github} target="_blank" className="mt-2 rounded-xl border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10">كود GitHub ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-400">الخطوات</p>
            <h2 className="mt-2 text-3xl font-bold text-white">طريقة بسيطة وآمنة للتعامل معي</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                ["1. تواصل", "كلمني واتساب أو إيميل. اشرح فكرتك في سطرين."],
                ["2. تحديد وعرض", "أقسمها لمزايا وأعطيك سعرًا ثابتًا ومدة. بدون مفاجآت."],
                ["3. بناء بمراحل", "ترى التقدم مبكرًا. باك-إند ← واجهة ← نشر."],
                ["4. تسليم ودعم", "نشر + توثيق + إصلاح أخطاء مجاني لأسبوعين."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
                  <div className="font-bold text-white">{t}</div>
                  <div className="mt-2 text-sm text-zinc-400">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-400">الأسعار</p>
          <h2 className="mt-2 text-3xl font-bold text-white">أسعار عادلة حسب متطلباتك</h2>
          <p className="mt-3 max-w-2xl text-zinc-400">لا توجد قائمة أسعار ثابتة. أخبرني باحتياجك — أدرسه مجانًا وأمنحك سعرًا ثابتًا قبل أن نبدأ.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { n: "إصلاحات ومهام صغيرة", p: "سعر مخصص لكل مهمة", f: ["صف المشكلة أو الميزة المطلوبة", "سعر ثابت مقدمًا — بلا مفاجآت", "الدفع عند التسليم"] },
              { n: "مواقع وتطبيقات ويب", p: "عرض سعر بعد دراسة مجانية", f: ["شارك متطلباتك أو أمثلة تعجبك", "سعر ثابت ومدة زمنية واضحة", "الدفع على مراحل أثناء التنفيذ"], hot: true },
              { n: "أنظمة مخصصة وواجهات API", p: "نحدد النطاق معًا", f: ["مكالمة قصيرة لفهم احتياجك", "خطة مراحل بسعر ثابت", "تعتمد كل مرحلة بنفسك"] },
            ].map((t) => (
              <div key={t.n} className={`rounded-3xl border p-6 ${t.hot ? "border-green-500/60 bg-green-500/[0.07]" : "border-white/10 bg-white/[0.03]"}`}>
                {t.hot && <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-zinc-950">الأكثر طلبًا</span>}
                <h3 className="mt-2 text-lg font-bold text-white">{t.n}</h3>
                <div className="mt-1 text-2xl font-extrabold text-green-400">{t.p}</div>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">{t.f.map((f) => <li key={f}>✓ {f}</li>)}</ul>
                <a href={WHATSAPP} target="_blank" className="mt-5 block rounded-xl bg-white px-4 py-2.5 text-center text-sm font-bold text-zinc-950 hover:bg-zinc-200">اشرح احتياجك</a>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-zinc-500">جميع عروض الأسعار مجانية. ولن تدفع المبلغ كاملًا مقدمًا أبدًا.</p>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-green-400">عني</p>
              <h2 className="mt-2 text-3xl font-bold text-white">أهلًا، أنا طلعت رمضان</h2>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                مهندس برمجيات متخصص في أنظمة الشركات. بنيت منصات فعاليات وأنظمة طلبات ومنصات أكاديمية وأنظمة صيانة
                عبر <b className="text-zinc-200">.NET وLaravel وNode.js وAngular/Next.js</b>.
              </p>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                مقيم في مصر وأعمل عن بُعد، وأتواصل بالعربية والإنجليزية — من أول مكالمة لفهم متطلباتك حتى دعم ما بعد الإطلاق. ستعرف دائمًا ما تم إنجازه وما الخطوة التالية وكم التكلفة.
              </p>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                أهتم بالتفاصيل التي توفر عليك المال: مخزون صحيح، مدفوعات صحيحة، صلاحيات آمنة، اختبارات تمنع الأعطال، ونشر يعمل من أول مرة.
              </p>
              <p className="mt-3 text-sm text-zinc-400">📧 <a className="text-green-300 hover:text-green-200" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={CV_PATH} download className="rounded-full bg-white px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-zinc-200">حمّل السيرة ↓</a>
                <a href={GITHUB} target="_blank" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">GitHub ↗</a>
                <a href={LINKEDIN} target="_blank" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10">لينكدإن ↗</a>
                <a href={WHATSAPP} target="_blank" className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-zinc-950 hover:bg-green-400">واتساب ↗</a>
              </div>
            </div>
            <div className="grid content-center gap-3">
              {[
                ["باك-إند", ".NET 10 / C# / Laravel 12 / Node.js (Express, NestJS) — معمارية نظيفة، CQRS، Identity/JWT، Hangfire"],
                ["واجهات", "Angular 20/22 / Next.js / TypeScript / Tailwind — لوحات ونماذج وصفحات SEO"],
                ["بيانات ونشر", "SQL Server / MySQL / EF Core — Docker وCI والنشر Vercel / VPS"],
                ["جودة", "xUnit + Pest (+300 اختبار) — توثيق Scalar/Postman وسجلات تدقيق"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl bg-zinc-900 p-4">
                  <div className="font-bold text-white">{t}</div>
                  <div className="mt-1 text-sm text-zinc-400">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-5 py-16">
          <h2 className="text-3xl font-bold text-white text-center">أسئلة شائعة</h2>
          <div className="mt-8 space-y-3">
            {[
              ["متى يمكنك البدء؟", "عادة خلال 2-3 أيام. راسلني وسأؤكد الموعد والمدة في أول رد."],
              ["كيف يتم الدفع؟", "بمراحل: مثلًا 30% للبدء والباقي عند التسليم. الإصلاحات الصغيرة: الدفع عند التسليم."],
              ["هل يوجد دعم بعد التسليم؟", "نعم — إصلاح أخطاء مجاني لأسبوعين مع كل مشروع. وصيانة شهرية متاحة."],
              ["هل تعمل على كود موجود؟", "نعم. أرسل رابط GitHub أو ملف مضغوط وسأراجعه وأعطيك عرضًا."],
              ["Upwork / مستقل / خمسات؟", "نعم — أعمل عبر أي منصة تفضلها لحماية الدفع. أرسل الدعوة فقط."],
            ].map(([q, a]) => (
              <details key={q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <summary className="cursor-pointer font-semibold text-white">{q}</summary>
                <p className="mt-2 text-sm text-zinc-400">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-5 pb-20">
          <div className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-700 p-8 text-zinc-950 md:p-12">
            <h2 className="text-3xl font-extrabold md:text-4xl">عندك مشروع؟ لنبنيه معًا.</h2>
            <p className="mt-3 max-w-xl font-medium">احكي لي ما تحتاجه — سأرد بالسعر والمدة خلال 24 ساعة.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={WHATSAPP} target="_blank" className="rounded-full bg-zinc-950 px-6 py-3 font-bold text-white hover:bg-zinc-800">💬 واتساب: +20 112 634 2642</a>
              <a href={`mailto:${EMAIL}`} className="rounded-full bg-white px-6 py-3 font-bold hover:bg-zinc-200">✉️ {EMAIL}</a>
            </div>
            <form
              className="mt-8 grid gap-3 rounded-2xl bg-zinc-950 p-5 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget as HTMLFormElement);
                const msg = `الاسم: ${f.get("name")}%0A%0A${f.get("message")}`;
                window.open(`${WHATSAPP}?text=${msg}`, "_blank");
              }}
            >
              <input name="name" suppressHydrationWarning required placeholder="اسمك" className="rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500 md:col-span-2" />
              <textarea name="message" suppressHydrationWarning required rows={4} placeholder="ماذا تريد أن تبني؟ (مزايا، مدة، روابط...)" className="rounded-xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500 md:col-span-2" />
              <button className="rounded-xl bg-green-500 px-4 py-3 font-bold text-zinc-950 hover:bg-green-400 md:col-span-2">إرسال عبر واتساب ←</button>
              <a href={`mailto:${EMAIL}`} className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10 md:col-span-2">
                أو أرسل عبر البريد ←
              </a>
              <p className="text-center text-xs text-zinc-500 md:col-span-2">
                لا تستخدم واتساب؟ راسلني مباشرة على <a href={`mailto:${EMAIL}`} className="text-green-400 underline">{EMAIL}</a> — أرد خلال 24 ساعة.
              </p>
            </form>
          </div>
          <footer className="mt-10 text-center text-xs text-zinc-500">
            <span>© 2026 طلعت رمضان — مهندس برمجيات • {EMAIL}</span>
            <span className="mt-1 block"><a href="/" className="underline">النسخة الإنجليزية</a></span>
          </footer>
          <a href={WHATSAPP} target="_blank" aria-label="واتساب" className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl shadow-lg shadow-green-500/30 hover:bg-green-400">💬</a>
        </section>
      </main>
    </>
  );
}
