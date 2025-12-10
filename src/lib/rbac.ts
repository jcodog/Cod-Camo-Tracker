import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdmin, isStaff } from "@/lib/auth/permissions";

type SessionResult = Awaited<ReturnType<typeof auth.api.getSession>>;

async function getSessionFromRequest(): Promise<SessionResult> {
  const hdrs = await headers();
  const headerInit = Object.fromEntries(hdrs.entries());
  return auth.api.getSession({ headers: headerInit });
}

export async function requireUser() {
  const session = await getSessionFromRequest();
  if (!session?.user) {
    redirect("/sign-in");
  }
  return session;
}

export async function requireStaff() {
  const session = await requireUser();
  if (!isStaff(session.user.role)) {
    redirect("/dashboard");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireUser();
  if (!isAdmin(session.user.role)) {
    redirect("/dashboard");
  }
  return session;
}
