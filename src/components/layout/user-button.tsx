"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

function initials(name?: string | null, email?: string | null) {
  if (name && name.trim().length > 0) {
    const parts = name.trim().split(" ");
    return parts
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase();
  }
  if (email) return email[0]?.toUpperCase() ?? "U";
  return "U";
}

type UserButtonProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  roleLinks: { href: string; label: string }[];
};

export function UserButton({ name, email, image, roleLinks }: UserButtonProps) {
  const display = name || "User";

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/sign-in";
    } catch (err) {
      console.error("Failed to sign out", err);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 rounded-full px-2 text-sm font-medium text-foreground hover:bg-muted/60 data-[state=open]:bg-muted/70"
        >
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">{display}</span>
            <Avatar className="h-7 w-7 border border-border/70 bg-muted/40">
              <AvatarImage src={image ?? undefined} alt={display} />
              <AvatarFallback className="text-[0.7rem] font-semibold uppercase text-foreground">
              {initials(name, email)}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
          Account
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/account">Profile & settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
          Sign out
        </DropdownMenuItem>
        {roleLinks.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
              Shortcuts
            </DropdownMenuLabel>
            {roleLinks.map((link) => (
              <DropdownMenuItem key={link.href} asChild>
                <Link href={link.href}>{link.label}</Link>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
