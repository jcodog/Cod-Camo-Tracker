"use client";

import type { ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface AuthShellProps {
  heading: string;
  subheading: string;
  children: ReactNode;
  footer?: ReactNode;
}

const funFacts = [
  {
    title: "Squad radar",
    description:
      "Everyone's camo status syncs in realtime so you always know who's on deck.",
    stat: "24 squads live",
  },
  {
    title: "Challenge intel",
    description:
      "Filter by weapon family, favorite modes, or camo rarity to plan faster grinds.",
    stat: "312 camo tiers",
  },
  {
    title: "Ops support",
    description:
      "Chat with staff, drop tickets, and keep the mission moving without leaving the app.",
    stat: "<2m avg reply",
  },
];

export function AuthShell({
  heading,
  subheading,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="grid min-h-screen bg-background text-foreground lg:grid-cols-[1fr_0.95fr]">
      <aside className="relative hidden overflow-hidden border-r border-border/60 lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,#4b6cb7_0%,#182848_45%,#0f162d_78%,#0a0f1f_100%)] dark:bg-[radial-gradient(ellipse_at_center_top,#1f2b4d_0%,#0c1226_45%,#060914_78%,#04070f_100%)]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />
        <div className="relative z-10 flex h-full w-full flex-col gap-10 p-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Cod Camo Tracker
            </p>
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white">
                Control the grind. Share intel. Finish every camo list.
              </h1>
              <p className="text-sm text-white/75">
                Build battle plans for every weapon family, sync camo completion
                with your fireteam, and ping staff support without leaving the
                ops console.
              </p>
            </div>
          </div>

          <div className="relative flex flex-1 items-stretch">
            <Carousel
              className="h-full w-full"
              opts={{ align: "start", loop: true, duration: 20 }}
              plugins={[Autoplay({ delay: 30000, stopOnInteraction: false })]}
            >
              <CarouselContent className="h-full">
                {funFacts.map((fact) => (
                  <CarouselItem key={fact.title} className="h-full">
                    <div className="flex h-full flex-col justify-between gap-8 py-4 pr-10 text-white">
                      <div className="space-y-4">
                        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/70">
                          {fact.stat}
                        </p>
                        <h3 className="text-4xl font-semibold tracking-tight">
                          {fact.title}
                        </h3>
                      </div>
                      <p className="max-w-xl text-lg text-white/80">
                        {fact.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 top-1/2 h-11 w-11 -translate-y-1/2 border border-white/25 bg-transparent text-white hover:bg-white/10" />
              <CarouselNext className="right-2 top-1/2 h-11 w-11 -translate-y-1/2 border border-white/25 bg-transparent text-white hover:bg-white/10" />
            </Carousel>
          </div>

          <p className="text-xs text-white/60">
            Carousel intel pulls from live usage metrics every hour so you
            always know what's changing.
          </p>
        </div>
      </aside>

      <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16 sm:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Cod Camo Tracker
            </p>
            <h2 className="text-3xl font-semibold">{heading}</h2>
            <p className="text-sm text-muted-foreground">{subheading}</p>
          </div>

          <div className="space-y-6">{children}</div>

          {footer ? (
            <div className="text-center text-xs text-muted-foreground">
              {footer}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
