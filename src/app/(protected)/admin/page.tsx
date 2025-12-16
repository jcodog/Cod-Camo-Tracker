import Link from "next/link";
import { requireAdmin } from "@/lib/rbac";

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Admin
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Admin Dashboard
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage the weapon and challenge library that powers the tracker.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/weapons/new"
          className="rounded-2xl border border-border/60 bg-card/50 p-6 transition hover:bg-card/70"
        >
          <h3 className="text-lg font-semibold text-foreground">Add weapon</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a new weapon entry and set category + title metadata.
          </p>
        </Link>

        <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-6">
          <h3 className="text-lg font-semibold text-foreground">
            Challenge management
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Challenge CRUD + weapon listings will land here next.
          </p>
        </div>
      </div>
    </section>
  );
}
