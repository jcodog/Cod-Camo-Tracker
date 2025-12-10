import type { ReactNode } from "react";
import { ProtectedNav } from "@/components/layout/protected-nav";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px] flex-col gap-10 px-6 py-6 sm:px-12">
        <ProtectedNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
