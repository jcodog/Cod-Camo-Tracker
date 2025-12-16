import Link from "next/link";
import { headers } from "next/headers";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ChartNoAxesCombined,
  Crosshair,
  Flame,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserButton } from "@/components/layout/user-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db/prisma";

const featureCards = [
  {
    title: "Track every ladder",
    description:
      "Military → Specials → Mastery progress in a single view, per mode.",
    icon: BadgeCheck,
  },
  {
    title: "Plan smarter grinds",
    description:
      "Know what unlocks next and which challenges block mastery tiers.",
    icon: BookOpen,
  },
  {
    title: "Stay consistent",
    description:
      "Keep your progress synced across sessions, weapons, and categories.",
    icon: Flame,
  },
  {
    title: "Always up to date",
    description:
      "Challenge data stays current as weapons and requirements evolve.",
    icon: Crosshair,
  },
] as const;

export default async function Home() {
  const hdrs = await headers();
  const headerInit = Object.fromEntries(hdrs.entries());
  const session = await auth.api.getSession({ headers: headerInit });
  const user = session?.user ?? null;
  const role = user?.role ?? null;

  const redirectTarget = "/dashboard";
  const redirectParam = `?redirect=${encodeURIComponent(redirectTarget)}`;

  const db =
    typeof process.env.DATABASE_URL === "string" && process.env.DATABASE_URL
      ? getDb(process.env.DATABASE_URL)
      : null;

  const [weaponCount, challengeCount, exampleWeapons] =
    user && db
      ? await Promise.all([
          db.weapon.count(),
          db.camoChallenge.count(),
          db.weapon.findMany({
            take: 3,
            orderBy: { name: "asc" },
            select: { id: true, name: true, category: true, codTitle: true },
          }),
        ])
      : [
          null,
          null,
          [] as {
            id: string;
            name: string;
            category: string;
            codTitle: string;
          }[],
        ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_45%_at_50%_0%,rgba(99,102,241,0.22),transparent_60%)] dark:bg-[radial-gradient(65%_45%_at_50%_0%,rgba(99,102,241,0.32),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_85%_20%,rgba(16,185,129,0.16),transparent_60%)] dark:bg-[radial-gradient(40%_40%_at_85%_20%,rgba(16,185,129,0.22),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('/noise.svg')] opacity-[0.07] dark:opacity-[0.09]" />

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 sm:py-12">
        <header className="flex items-center justify-between gap-3">
          <Link href="/" className="group inline-flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl border border-border/70 bg-card/70 shadow-sm transition group-hover:shadow-md">
              <Crosshair className="size-5 text-foreground/90" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">
                Cod Camo Tracker
              </p>
              <p className="text-xs text-muted-foreground">
                Camo progress, unlock rules, and mastery tracking.
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
            <Link
              className="rounded-md px-3 py-2 hover:bg-muted/40 hover:text-foreground"
              href="#features"
            >
              Features
            </Link>
            <Link
              className="rounded-md px-3 py-2 hover:bg-muted/40 hover:text-foreground"
              href="#how-it-works"
            >
              How it works
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <UserButton
                name={user.name}
                email={user.email}
                image={user.image}
                roleLinks={
                  role === "admin"
                    ? [
                        { href: "/admin", label: "Admin Dashboard" },
                        { href: "/staff", label: "Staff Dashboard" },
                      ]
                    : role === "staff"
                    ? [{ href: "/staff", label: "Staff Dashboard" }]
                    : []
                }
              />
            ) : (
              <>
                <Button asChild size="sm" className="sm:hidden">
                  <Link href={`/sign-up${redirectParam}`}>Get started</Link>
                </Button>
                <div className="hidden items-center gap-2 sm:flex">
                  <Button variant="ghost" asChild>
                    <Link href={`/sign-in${redirectParam}`}>Sign in</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/sign-up${redirectParam}`}>Get started</Link>
                  </Button>
                </div>
              </>
            )}
            <ThemeToggle />
          </div>
        </header>

        <section className="flex flex-1 items-center py-12 sm:py-16">
          <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                <Sparkles className="size-3.5" />
                Built for serious camo grinders
              </div>

              <div className="space-y-4">
                <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                  Track every camo challenge without spreadsheets.
                </h1>
                <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
                  Cod Camo Tracker keeps your weapon ladders organized across
                  modes, shows what unlocks next, and makes mastery goals
                  obvious at a glance.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {user ? (
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/dashboard">
                      Go to dashboard
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg" className="gap-2">
                      <Link href={`/sign-up${redirectParam}`}>
                        Get started free
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary">
                      <Link href={`/sign-in${redirectParam}`}>Sign in</Link>
                    </Button>
                  </>
                )}
              </div>

              <div id="features" className="grid gap-3 sm:grid-cols-2">
                {featureCards.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <Card
                      key={feature.title}
                      className="border-border/60 bg-card/50 shadow-sm"
                    >
                      <CardHeader className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="grid size-9 place-items-center rounded-lg border border-border/60 bg-background/50">
                            <Icon className="size-4 text-foreground/80" />
                          </div>
                          <CardTitle className="text-base">
                            {feature.title}
                          </CardTitle>
                        </div>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5">
              <Card className="border-border/60 bg-card/60 shadow-lg shadow-black/5 backdrop-blur">
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-xl">Live preview</CardTitle>
                      <CardDescription>
                        {user
                          ? "A real snapshot from your current data."
                          : "A quick look at how progress will feel."}
                      </CardDescription>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {user ? "Your data" : "Example"}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {user ? (
                    <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold">
                          Your challenge library
                        </p>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                          {weaponCount ?? 0} weapons • {challengeCount ?? 0}{" "}
                          challenges
                        </span>
                      </div>

                      <div className="mt-4 grid gap-2">
                        {exampleWeapons.length > 0 ? (
                          exampleWeapons.map((weapon) => (
                            <div
                              key={weapon.id}
                              className="flex items-center justify-between rounded-xl border border-border/50 bg-card/40 px-3 py-2"
                            >
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">
                                  {weapon.name}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                  {weapon.codTitle} • {weapon.category}
                                </p>
                              </div>
                              <span className="ml-3 shrink-0 rounded-full border border-border/60 bg-background/60 px-2 py-1 text-[11px] font-semibold text-muted-foreground">
                                Ready
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="rounded-xl border border-dashed border-border/70 bg-card/30 px-3 py-3">
                            <p className="text-sm font-semibold">
                              No weapons configured yet
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Once weapons and challenges are added, you’ll see
                              them here.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">SMG • Striker</p>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                          6/9 Military
                        </span>
                      </div>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-[66%] rounded-full bg-linear-to-r from-indigo-500 to-emerald-400" />
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Next: 50 kills while ADS (Military 7).
                      </p>
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        Unlock path
                      </p>
                      <p className="mt-2 text-sm font-semibold">
                        Specials after Military 9
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Finish all Military camos in order.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        Mastery gate
                      </p>
                      <p className="mt-2 text-sm font-semibold">
                        Category milestones
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Track requirements per weapon family.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card id="how-it-works" className="border-border/60 bg-card/50">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-lg">How it works</CardTitle>
                  <CardDescription>
                    Simple flow that stays out of your way.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: "Create an account",
                      description: "Verify by email OTP and you're in.",
                      icon: Sparkles,
                    },
                    {
                      title: "Pick your weapons",
                      description: "Add what you're grinding right now.",
                      icon: Crosshair,
                    },
                    {
                      title: "Track & unlock",
                      description:
                        "Progress through ladders and mastery rules.",
                      icon: ChartNoAxesCombined,
                    },
                  ].map((step) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.title}
                        className="rounded-2xl border border-border/60 bg-background/50 p-4"
                      >
                        <div className="flex items-center gap-2">
                          <div className="grid size-9 place-items-center rounded-lg border border-border/60 bg-card/60">
                            <Icon className="size-4 text-foreground/80" />
                          </div>
                          <p className="text-sm font-semibold">{step.title}</p>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="bg-border/70" />

        <footer className="mt-8 flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Cod Camo Tracker</p>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  className="underline-offset-4 hover:underline"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                <Link
                  className="underline-offset-4 hover:underline"
                  href="/weapons"
                >
                  Weapons
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="underline-offset-4 hover:underline"
                  href={`/sign-in${redirectParam}`}
                >
                  Sign in
                </Link>
                <Link
                  className="underline-offset-4 hover:underline"
                  href={`/sign-up${redirectParam}`}
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </footer>
      </div>
    </main>
  );
}
