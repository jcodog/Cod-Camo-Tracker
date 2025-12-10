import { AddWeaponForm } from "@/components/admin/add-weapon-form";
import { requireAdmin } from "@/lib/rbac";

export default async function NewWeaponPage() {
  await requireAdmin();

  return (
    <section className="space-y-4">
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold text-white">Add Weapon</h2>
        <p className="text-sm text-slate-400">
          Define a new weapon with its category, COD title, and display order.
        </p>
      </header>

      <AddWeaponForm />
    </section>
  );
}
