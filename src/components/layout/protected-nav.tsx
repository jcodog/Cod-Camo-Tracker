"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserButton } from "@/components/layout/user-button";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type Role = "user" | "staff" | "admin" | string;
type NavItem =
  | { type: "link"; label: string; href: string }
  | {
      type: "dropdown";
      label: string;
      items: { label: string; href: string }[];
    };

export function ProtectedNav() {
  const pathname = usePathname() || "";
  const [user, setUser] = useState<{
    role?: Role;
    name?: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    authClient
      .getSession()
      .then((res) => {
        const u = (res as any)?.data?.user ?? (res as any)?.user ?? null;
        if (mounted) setUser(u);
      })
      .catch(() => {
        if (mounted) setUser(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const role: Role = user?.role ?? "user";
  const userName = user?.name ?? "";
  const userEmail = user?.email ?? "";

  const { navLinks, title, roleLinks } = useMemo(() => {
    const isAdminRoute = pathname.startsWith("/admin");
    const isStaffRoute =
      !isAdminRoute && role !== "user" && pathname.startsWith("/support");

    const adminLinks: NavItem[] = [
      { type: "link", href: "/admin", label: "Admin Dashboard" },
      {
        type: "dropdown",
        label: "Weapons",
        items: [
          { href: "/admin/weapons", label: "View weapons" },
          { href: "/admin/weapons/new", label: "Add weapon" },
        ],
      },
      { type: "link", href: "/dashboard", label: "User View" },
    ];

    const staffLinks: NavItem[] = [
      { type: "link", href: "/dashboard", label: "Dashboard" },
      { type: "link", href: "/support", label: "Support" },
    ];

    const userLinks: NavItem[] = [
      { type: "link", href: "/dashboard", label: "Dashboard" },
      { type: "link", href: "/weapons", label: "Weapons" },
      { type: "link", href: "/support", label: "Support" },
      { type: "link", href: "/account", label: "Account" },
    ];

    const nav =
      isAdminRoute && role === "admin"
        ? adminLinks
        : isStaffRoute
        ? staffLinks
        : userLinks;

    const computedTitle = (() => {
      if (isAdminRoute && role === "admin") return "Admin Dashboard";
      if (isStaffRoute) return "Staff Dashboard";
      if (pathname.startsWith("/weapons")) return "Weapons";
      if (pathname.startsWith("/support")) return "Support";
      if (pathname.startsWith("/account")) return "Account";
      return "Dashboard";
    })();

    const shortcuts =
      role === "admin"
        ? [
            { href: "/admin", label: "Admin Dashboard" },
            { href: "/staff", label: "Staff Dashboard" },
          ]
        : role === "staff"
        ? [{ href: "/staff", label: "Staff Dashboard" }]
        : [];

    return { navLinks: nav, title: computedTitle, roleLinks: shortcuts };
  }, [pathname, role]);

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-3">
      <div className="flex flex-wrap items-center gap-6">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h1>
        <nav className="flex items-center gap-4 text-sm text-white/85">
          {navLinks.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.href}
                href={item.href}
                className="relative pb-1 transition hover:text-white after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition after:duration-200 hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ) : (
              <DropdownMenu key={item.label} modal={false}>
                <DropdownMenuTrigger className="group relative pb-1 text-sm font-medium text-white/85 transition hover:text-white after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition after:duration-200 hover:after:scale-x-100 focus:outline-none data-[state=open]:text-white">
                  <div className="flex items-center gap-1">
                    <span>{item.label}</span>
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.items.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          )}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserButton name={userName} email={userEmail} roleLinks={roleLinks} />
      </div>
    </header>
  );
}
