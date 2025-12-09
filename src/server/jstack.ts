import { getDb } from "@/lib/db/prisma";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { jstack } from "jstack";

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

  return await next({ db });
});

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure.use(baseMiddleware);
