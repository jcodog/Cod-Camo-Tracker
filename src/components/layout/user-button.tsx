import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

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
  roleLinks: { href: string; label: string }[];
};

export function UserButton({ name, email, roleLinks }: UserButtonProps) {
  const display = name || "User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-2 py-1 text-sm font-medium text-white/90"
        >
          <span className="hidden sm:inline">{display}</span>
          <Avatar className="h-7 w-7 border border-white/15 bg-white/10">
            <AvatarImage src={undefined} alt={display} />
            <AvatarFallback className="text-[0.7rem] font-semibold uppercase text-white">
              {initials(name, email)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
          Account
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/account">Profile & settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild variant="destructive">
          <Link href="/api/auth/sign-out">Sign out</Link>
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
