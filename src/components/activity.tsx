"use client";

import { useEffect, useState } from "react";

type ShipItem = { repo: string; msg: string; time: string; live: boolean };

const FALLBACK: ShipItem[] = [
  { repo: "OrderFlow", msg: "atomic stock reservation + outbox dispatch", time: "", live: false },
  { repo: "Tazkara", msg: "availability guard at reservation time", time: "", live: false },
  { repo: "HomeTech", msg: "12 business rules enforced server-side", time: "", live: false },
  { repo: "Tamayoz", msg: "admin area + Docker deploy", time: "", live: false },
];

function timeAgo(iso: string): string {
  const s = Math.max(30, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

type GhEvent = {
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: { commits?: { message: string }[] };
};

export function GithubTicker({ lang, username }: { lang: "en" | "ar"; username: string }) {
  const [items, setItems] = useState<ShipItem[]>(FALLBACK);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let dead = false;
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), 9000);
    fetch(`https://api.github.com/users/${username}/events/public?per_page=12`, {
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("gh")))
      )
      .then((events: GhEvent[]) => {
        if (dead || !Array.isArray(events)) return;
        const pushes = events.filter((e) => e.type === "PushEvent").slice(0, 8);
        if (pushes.length === 0) return;
        setItems(
          pushes.map((e) => ({
            repo: e.repo.name.split("/")[1] ?? e.repo.name,
            msg: (e.payload?.commits?.[0]?.message ?? "push").split("\n")[0].slice(0, 72),
            time: timeAgo(e.created_at),
            live: true,
          }))
        );
        setLive(true);
      })
      .catch(() => {})
      .finally(() => window.clearTimeout(t));
    return () => {
      dead = true;
      window.clearTimeout(t);
      ctrl.abort();
    };
  }, [username]);

  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-zinc-950/80 py-2.5" aria-live="off">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5">
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-green-300">
          <span className="relative flex h-2 w-2">
            {live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          {lang === "ar" ? "من GitHub مباشرة" : "Fresh from GitHub"}
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="marquee-track gap-8" style={{ animationDuration: "36s" }}>
            {row.map((it, i) => (
              <span key={i} className="whitespace-nowrap font-mono text-[11px] text-zinc-400">
                <span className="text-zinc-200">{it.repo}</span>
                <span className="text-zinc-600"> — </span>
                {it.msg}
                {it.time && <span className="text-green-400/80"> · {it.time}</span>}
                <span className="ml-8 text-zinc-700">●</span>
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-zinc-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-zinc-950 to-transparent" />
        </div>
      </div>
    </div>
  );
}
