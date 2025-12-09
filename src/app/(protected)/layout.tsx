import Link from "next/link";
import type { ReactNode } from "react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", blurb: "Overview & milestones" },
  { href: "/weapons", label: "Weapons", blurb: "Browse camo ladders" },
  { href: "/support", label: "Support", blurb: "Tickets & live chat" },
  { href: "/account", label: "Account", blurb: "Profile & security" },
];

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#05070f] text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(90,123,255,0.18),transparent_55%)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-8">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Cod Camo Tracker
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Operations Console
              </h1>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono uppercase tracking-wide text-amber-300">
                Alpha Build
              </span>
            </div>
          </div>

          <nav className="mt-6 grid gap-2 sm:grid-cols-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-sm font-semibold text-white">
                  {item.label}
                </span>
                <span className="text-xs text-slate-400 transition group-hover:text-slate-200">
                  {item.blurb}
                </span>
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-1 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur">
          {children}
        </main>

        <footer className="rounded-3xl border border-white/5 bg-white/5 px-6 py-4 text-sm text-slate-400 backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Tracking your mastery across every weapon, mode, and camo.
            </span>
            <span className="font-mono text-xs uppercase tracking-wider">
              Build channel // Alpha-01
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
