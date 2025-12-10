import { j, publicProcedure } from "../jstack";

/**
 * Health router exposes lightweight readiness checks for infrastructure pings.
 */
export const healthRouter = j.router({
  status: publicProcedure.query(({ c }) => {
    return c.superjson({ status: "ok" });
  }),
});
