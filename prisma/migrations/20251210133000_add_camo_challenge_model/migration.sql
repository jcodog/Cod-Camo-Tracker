-- CreateEnum
CREATE TYPE "GameMode" AS ENUM ('CAMPAIGN', 'MULTIPLAYER', 'ZOMBIES', 'WARZONE');

-- CreateTable
CREATE TABLE "camo_challenge" (
    "id" TEXT NOT NULL,
    "weaponId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mode" "GameMode" NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "camo_challenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "camo_challenge_weaponId_idx" ON "camo_challenge"("weaponId");

-- AddForeignKey
ALTER TABLE "camo_challenge" ADD CONSTRAINT "camo_challenge_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "weapon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
