import { PrismaClient } from "@/lib/db/generated/client";
import { withAccelerate } from "@prisma/extension-accelerate";

function createDbClient(url: string) {
  return new PrismaClient({
    accelerateUrl: url,
  }).$extends(withAccelerate());
}
export type DbClient = ReturnType<typeof createDbClient>;

declare global {
  var prismaClients: Record<string, DbClient> | undefined;
}

export const getDb = (databaseUrl: string) => {
  if (!databaseUrl) {
    throw new Error("[Initialize Prisma Client] Error: Missing database url.");
  }

  if (!globalThis.prismaClients) {
    globalThis.prismaClients = {};
  }

  if (!globalThis.prismaClients[databaseUrl]) {
    globalThis.prismaClients[databaseUrl] = createDbClient(databaseUrl);
  }

  return globalThis.prismaClients[databaseUrl];
};
