const categories = [
  { name: "Assault Rifles", status: "6/8 gold" },
  { name: "Battle Rifles", status: "2/6 gold" },
  { name: "SMGs", status: "4/7 gold" },
  { name: "Snipers", status: "1/4 gold" },
];

export default function WeaponsPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          Weapons
        </p>
        <h2 className="text-3xl font-semibold text-white">Camo Catalog</h2>
        <p className="text-sm text-slate-400">
          Inventory of every weapon family, their camo ladders, and mastery
          unlock requirements.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <article
            key={category.name}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {category.name}
              </h3>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-300">
                {category.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Slot reserved for rich filters, camo cards, and mastery progress.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
