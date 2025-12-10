import "dotenv/config";
import { PrismaClient } from "../src/lib/db/generated/client";

type SeedWeapon = {
  name: string;
  category: string;
  codTitle: string;
  sortOrder: number;
};

const databaseUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("Missing DIRECT_URL (preferred) or DATABASE_URL for seeding.");
  process.exit(1);
}

const prisma = new PrismaClient({
  accelerateUrl: databaseUrl,
});

const weapons: SeedWeapon[] = [
  { name: "AMR9", category: "SMG", codTitle: "BO6", sortOrder: 1 },
  { name: "MTZ-556", category: "AR", codTitle: "BO6", sortOrder: 2 },
  { name: "MCW", category: "AR", codTitle: "MW3", sortOrder: 3 },
  { name: "BP50", category: "AR", codTitle: "MW3", sortOrder: 4 },
];

async function main() {
  for (const weapon of weapons) {
    await prisma.weapon.upsert({
      where: {
        name_codTitle: {
          name: weapon.name,
          codTitle: weapon.codTitle,
        },
      },
      update: {
        category: weapon.category,
        sortOrder: weapon.sortOrder,
      },
      create: weapon,
    });
  }

  console.log(`Seeded ${weapons.length} weapons (upserted by name+codTitle).`);
}

main()
  .catch((err) => {
    console.error("Failed to seed weapons", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
