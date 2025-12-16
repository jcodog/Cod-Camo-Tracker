import Link from "next/link";
import { requireStaff } from "@/lib/rbac";

export default async function StaffDashboardPage() {
  await requireStaff();

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Staff
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Staff Dashboard
        </h2>
        <p className="text-sm text-muted-foreground">
          Handle player support and keep the grind moving.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/support"
          className="rounded-2xl border border-border/60 bg-card/50 p-6 transition hover:bg-card/70"
        >
          <h3 className="text-lg font-semibold text-foreground">Support</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            View support tooling and respond to users.
          </p>
        </Link>

        <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-6">
          <h3 className="text-lg font-semibold text-foreground">Live chat</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Live chat dashboard will land here next.
          </p>
        </div>
      </div>
    </section>
  );
}
