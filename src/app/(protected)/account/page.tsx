export default function AccountPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          Account
        </p>
        <h2 className="text-3xl font-semibold text-white">
          Profile & Security
        </h2>
        <p className="text-sm text-slate-400">
          Manage authentication, connected game IDs, and notification
          preferences.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Profile</h3>
          <p className="mt-2 text-sm text-slate-400">
            Placeholder for display name, clan tag, platform IDs, and other
            metadata.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">Security</h3>
          <p className="mt-2 text-sm text-slate-400">
            Future BetterAuth settings (2FA, session management) will surface
            here.
          </p>
        </article>
      </div>
    </section>
  );
}
