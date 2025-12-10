import { z } from "zod";
import { adminProcedure, j, publicProcedure, staffProcedure } from "../jstack";

// Mocked DB
interface Post {
  id: number;
  name: string;
}

const posts: Post[] = [
  {
    id: 1,
    name: "Hello World",
  },
];

export const postRouter = j.router({
  recent: publicProcedure.query(({ c }) => {
    return c.superjson(posts.at(-1) ?? null);
  }),

  // Staff-only example to demonstrate RBAC enforcement
  create: staffProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ c, input }) => {
      const post: Post = {
        id: posts.length + 1,
        name: input.name,
      };

      posts.push(post);

      return c.superjson(post);
    }),

  // Admin-only example to demonstrate RBAC enforcement
  purge: adminProcedure.mutation(({ c }) => {
    posts.length = 0;
    return c.superjson({ ok: true });
  }),
});
