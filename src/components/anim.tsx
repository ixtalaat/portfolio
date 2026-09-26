"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type MouseEvent,
} from "react";

/* ---------------- useInViewOnce ---------------- */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ---------------- Reveal ---------------- */
type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
};

export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }: RevealProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    ["--reveal-y" as string]: `${y}px`,
  };
  const cls = `reveal ${inView ? "reveal-visible" : ""} ${className}`;
  if (as === "li") return <li ref={ref as never} style={style} className={cls}>{children}</li>;
  if (as === "span") return <span ref={ref as never} style={style} className={cls}>{children}</span>;
  if (as === "article") return <article ref={ref as never} style={style} className={cls}>{children}</article>;
  if (as === "section") return <section ref={ref as never} style={style} className={cls}>{children}</section>;
  return <div ref={ref} style={style} className={cls}>{children}</div>;
}

/* ---------------- Typewriter ---------------- */
export function Typewriter({
  words,
  className = "",
  typeSpeed = 65,
  deleteSpeed = 32,
  pause = 1400,
}: {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi % words.length];
    let t: number;
    if (!deleting && text === word) {
      t = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWi((v) => (v + 1) % words.length);
      t = window.setTimeout(() => {}, 200);
    } else {
      t = window.setTimeout(
        () => {
          setText(word.slice(0, text.length + (deleting ? -1 : 1)));
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => window.clearTimeout(t);
  }, [text, deleting, wi, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="type-caret" aria-hidden>▍</span>
    </span>
  );
}

/* ---------------- CountUp ---------------- */
export function CountUp({
  to,
  suffix = "",
  duration = 1600,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------------- Tilt ---------------- */
export function Tilt({
  children,
  className = "",
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max * 2}deg) rotateX(${-py * max * 2}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------- Magnetic ---------------- */
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`magnetic ${className}`}>
      {children}
    </div>
  );
}

/* ---------------- ScrollProgress ---------------- */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 shadow-[0_0_12px_rgba(34,197,94,.8)] transition-[width] duration-75"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

/* ---------------- Particles canvas ---------------- */
export function Particles({ density = 55, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    type P = { x: number; y: number; vx: number; vy: number; r: number; g: boolean };
    let pts: P[] = [];
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(density, Math.floor((w * h) / 22000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        g: Math.random() > 0.5,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const step = () => {
      ctx.clearRect(0, 0, w, h);
      // links
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(34,197,94,${(1 - d / 120) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.fillStyle = p.g ? "rgba(34,197,94,.55)" : "rgba(103,232,249,.45)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);
  return <canvas ref={ref} className={className} aria-hidden />;
}

/* ---------------- CursorGlow (desktop only) ---------------- */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    let x = -400;
    let y = -400;
    let tx = x;
    let ty = y;
    let raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate(${x - 250}px, ${y - 250}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[500px] w-[500px] rounded-full opacity-25 blur-3xl md:block"
      style={{ background: "radial-gradient(circle, rgba(34,197,94,.35), rgba(59,130,246,.15) 45%, transparent 70%)" }}
    />
  );
}

/* ---------------- Preloader ---------------- */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t1 = window.setTimeout(() => setDone(true), 1100);
    const t2 = window.setTimeout(() => setGone(true), 1700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);
  if (gone) return null;
  return (
    <div className={`preloader ${done ? "preloader-done" : ""}`} aria-hidden>
      <div className="preloader-inner">
        <div className="preloader-logo">
          ixtalaat<span className="text-green-400">.dev</span>
        </div>
        <div className="preloader-bar">
          <div className="preloader-fill" />
        </div>
        <div className="preloader-tip">compiling awesomeness…</div>
      </div>
    </div>
  );
}

/* ---------------- useIdle (defer heavy effects) ---------------- */
export function useIdle(timeout = 1200) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    let t: number | undefined;
    const go = () => setIdle(true);
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(go, { timeout });
      return () => w.cancelIdleCallback?.(id);
    }
    t = window.setTimeout(go, 400);
    return () => window.clearTimeout(t);
  }, [timeout]);
  return idle;
}

/* ---------------- Section heading ---------------- */
export function SectionHead({
  kicker,
  title,
  sub,
  align = "left",
}: {
  kicker: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <p className={`section-kicker ${align === "center" ? "mx-auto w-fit" : ""}`}>
        <span className="kicker-dot" />
        {kicker}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      <div className={`gradient-underline ${align === "center" ? "mx-auto" : ""}`} />
      {sub ? <p className={`mt-4 max-w-2xl text-zinc-400 leading-relaxed ${align === "center" ? "mx-auto" : ""}`}>{sub}</p> : null}
    </Reveal>
  );
}

/* ---------------- SkillBar ---------------- */
export function SkillBar({ label, pct, detail }: { label: string; pct: number; detail: string }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-zinc-900/80 p-4 transition-colors hover:border-green-500/40">
      <div className="flex items-center justify-between">
        <div className="font-bold text-white">{label}</div>
        <div className="text-sm font-bold text-green-300">{pct}%</div>
      </div>
      <div className="mt-1 text-sm text-zinc-400">{detail}</div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="skill-fill h-full rounded-full bg-gradient-to-r from-green-500 via-emerald-400 to-cyan-400"
          style={{ width: inView ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}
