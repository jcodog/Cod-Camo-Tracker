import { NextRequest, NextResponse } from "next/server";
import { getCookieCache } from "better-auth/cookies";
import { auth } from "@/lib/auth";

// Known crawler/AI user agents we want to block broadly
const BLOCKED_BOT_UAS = [
  // Major search/social crawlers
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandex",
  "sogou",
  "exabot",
  "ia_archiver",
  "facebot",
  "facebookexternalhit",
  "twitterbot",
  "applebot",
  "redditbot",
  "linkedinbot",
  "pinterestbot",
  // AI/LLM and scrapers
  "gptbot",
  "chatgpt-user",
  "google-extended",
  "ccbot",
  "perplexitybot",
  "anthropic-ai",
  "claudebot",
  "claude-web",
  "oai-searchbot",
  "bytespider",
  "cohere-ai",
  "mazekai",
  "diffbot",
  "dataforseo",
  "serpapi",
  "scrapy",
];

// Public (no auth required) paths
const PUBLIC_PATHS: RegExp[] = [
  /^\/$/,
  /^\/sign-in(.*)$/,
  /^\/sign-up(.*)$/,
  /^\/policies(.*)$/,
  /^\/webhooks(.*)$/,
  /^\/api(.*)$/,
  /^\/api\/auth(.*)$/, // Better Auth internal endpoints must be public
];

function matches(pathname: string, patterns: RegExp[]) {
  return patterns.some((r) => r.test(pathname));
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Block bots from all areas except root and policies
  const ua = (req.headers.get("user-agent") || "").toLowerCase();
  const isBlockedBot = BLOCKED_BOT_UAS.some((sig) => ua.includes(sig));
  const isAllowedForBots = pathname === "/" || pathname.startsWith("/policies");
  if (isBlockedBot && !isAllowedForBots) {
    return new NextResponse("Forbidden", {
      status: 403,
      headers: { "X-Robots-Tag": "noindex, nofollow, noarchive" },
    });
  }

  // Skip public routes early (but also avoid re-appending redirect repeatedly)
  if (matches(pathname, PUBLIC_PATHS)) {
    return NextResponse.next();
  }

  // Optimistic cookie-based check
  let cookieSession = (await getCookieCache(req)) as {
    session?: { id: string };
  } | null;

  let authoritativeSession:
    | Awaited<ReturnType<typeof auth.api.getSession>>
    | null
    | undefined;

  const ensureAuthoritativeSession = async () => {
    if (authoritativeSession !== undefined) {
      return authoritativeSession;
    }
    try {
      authoritativeSession = await auth.api.getSession({
        headers: req.headers,
      });
    } catch {
      authoritativeSession = null;
    }
    return authoritativeSession;
  };

  // If cookie cache missing, attempt an authoritative lightweight session fetch once.
  // (This helps immediately after OAuth callback when cookies were just set.)
  if (!cookieSession) {
    const full = await ensureAuthoritativeSession();
    if (full) {
      cookieSession = { session: { id: full.session.id } };
    }
  }

  if (!cookieSession) {
    const isAuthPage =
      pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
    const isAuthCallback = pathname.startsWith("/api/auth/");
    if (isAuthPage || isAuthCallback) {
      return NextResponse.next();
    }
    const target = req.nextUrl.pathname + req.nextUrl.search;
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect", target);
    return NextResponse.redirect(signInUrl);
  }

  // Require admin role for /admin routes
  if (pathname.startsWith("/admin")) {
    const session = await ensureAuthoritativeSession();
    const role = session?.user?.role;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Require staff or admin for /staff routes
  if (pathname.startsWith("/staff")) {
    const session = await ensureAuthoritativeSession();
    const role = session?.user?.role;
    if (role !== "staff" && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
