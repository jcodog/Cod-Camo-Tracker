import { auth } from "@/lib/auth";
import { isAdmin, isStaff } from "@/lib/auth/permissions";
import { getDb } from "@/lib/db/prisma";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { InferMiddlewareOutput, jstack } from "jstack";

interface Env {
  Bindings: {
    DATABASE_URL?: string;
    DIRECT_URL?: string;
  };
}

export const j = jstack.init<Env>();

const baseMiddleware = j.middleware(async ({ c, next }) => {
  const { DATABASE_URL } = env(c);
  if (!DATABASE_URL) {
    throw new HTTPException(500, {
      message: "Missing DATABASE_URL environment variable",
    });
  }

  const db = getDb(DATABASE_URL);

  return await next({
    db,
  });
});

const authMiddleware = j.middleware(async ({ c, next }) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  return await next({
    authSession: session?.session ?? null,
    authUser: session?.user ?? null,
  });
});

type InferredMiddleware = InferMiddlewareOutput<typeof baseMiddleware> &
  InferMiddlewareOutput<typeof authMiddleware>;

const requireUserMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const { authUser } = ctx as InferredMiddleware;

  if (!authUser) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  return next();
});

const requireStaffMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const { authUser } = ctx as InferredMiddleware;

  if (!authUser) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  if (!isStaff(authUser.role)) {
    throw new HTTPException(403, { message: "Forbidden" });
  }
  return next();
});

const requireAdminMiddleware = j.middleware(async ({ c, ctx, next }) => {
  const { authUser } = ctx as InferredMiddleware;

  if (!authUser) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  if (!isAdmin(authUser.role)) {
    throw new HTTPException(403, { message: "Forbidden" });
  }
  return next();
});

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure.use(baseMiddleware);

export const protectedProcedure = publicProcedure.use(authMiddleware);

export const userProcedure = protectedProcedure.use(requireUserMiddleware);

export const staffProcedure = protectedProcedure.use(requireStaffMiddleware);

export const adminProcedure = protectedProcedure.use(requireAdminMiddleware);
