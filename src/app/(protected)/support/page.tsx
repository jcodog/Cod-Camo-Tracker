const panels = [
  {
    title: "Support Tickets",
    body: "Create, triage, and resolve async tickets. Staff tools will render here once connected to the backend routers.",
  },
  {
    title: "Live Chat",
    body: "JStack WebSocket sessions and chat transcripts will occupy this panel. Use it to coordinate with players in real time.",
  },
];

export default function SupportPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Support</p>
        <h2 className="text-3xl font-semibold text-white">Tickets & Live Chat</h2>
        <p className="text-sm text-slate-400">
          Central hub for asynchronous support tickets and real-time staff
          escalations.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {panels.map((panel) => (
          <article
            key={panel.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{panel.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{panel.body}</p>
            <div className="mt-4 rounded-xl border border-dashed border-white/10 p-4 text-xs text-slate-500">
              Placeholder component
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
