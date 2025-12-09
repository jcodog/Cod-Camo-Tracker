import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.15),_transparent_60%)]" />
      <section className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Welcome back
          </p>
          <h1 className="text-3xl font-semibold">Sign in to continue</h1>
          <p className="text-sm text-slate-400">
            BetterAuth hooks into this view. For now it is a static placeholder.
          </p>
        </div>

        <div className="space-y-4">
          <button className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-white/20">
            Continue with Battle.net
          </button>
          <button className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-white/20">
            Continue with PlayStation Network
          </button>
        </div>

        <p className="text-center text-xs text-slate-500">
          Need an invite?{" "}
          <Link href="/support" className="text-emerald-300 hover:underline">
            Contact support
          </Link>
        </p>
      </section>
    </main>
  );
}
