import { z } from "zod";
import { Prisma } from "@/lib/db/generated/client";
import { adminProcedure, j } from "@/server/jstack";

const createWeaponSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  category: z.string().min(1, "Category is required").trim(),
  codTitle: z.string().min(1, "Cod title is required").trim(),
  sortOrder: z.number().int().default(0),
});

export const weaponRouter = j.router({
  create: adminProcedure
    .input(createWeaponSchema)
    .mutation(async ({ c, ctx, input }) => {
      try {
        const weapon = await ctx.db.weapon.create({
          data: {
            name: input.name,
            category: input.category,
            codTitle: input.codTitle,
            sortOrder: input.sortOrder ?? 0,
          },
        });

        return c.superjson(weapon);
      } catch (err) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === "P2002"
        ) {
          return c.json(
            { message: "Weapon with this name and codTitle already exists." },
            409
          );
        }

        throw err;
      }
    }),
});
