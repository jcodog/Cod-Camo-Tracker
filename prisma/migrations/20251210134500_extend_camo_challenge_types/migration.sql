-- CreateEnum
CREATE TYPE "ChallengeType" AS ENUM ('MILITARY', 'SPECIAL', 'MASTERY');

-- AlterTable
ALTER TABLE "camo_challenge" ADD COLUMN     "slot" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "type" "ChallengeType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "camo_challenge_weaponId_mode_type_slot_key" ON "camo_challenge"("weaponId", "mode", "type", "slot");

-- CreateIndex
CREATE INDEX "camo_challenge_mode_type_idx" ON "camo_challenge"("mode", "type");
