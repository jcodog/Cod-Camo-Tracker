const quickStats = [
  { label: "Challenges Complete", value: "24%" },
  { label: "Weapons Tracked", value: "18" },
  { label: "Daily Goal", value: "3 unlocks" },
];

export default function DashboardPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          Overview
        </p>
        <h2 className="text-3xl font-semibold text-white">Mission Control</h2>
        <p className="text-sm text-slate-400">
          Snapshot of your camo grind across playlists, seasons, and special
          events.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {quickStats.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <p className="text-xs uppercase tracking-widest text-slate-400">
              {card.label}
            </p>
            <p className="mt-3 text-3xl font-bold text-white">{card.value}</p>
          </article>
        ))}
      </div>

      <article className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6">
        <h3 className="text-xl font-semibold text-white">Live Activity Feed</h3>
        <p className="mt-2 text-sm text-slate-400">
          Real-time progress events will stream here once telemetry is wired in.
        </p>
      </article>
    </section>
  );
}
