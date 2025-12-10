-- CreateTable
CREATE TABLE "weapon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "codTitle" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "weapon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "weapon_category_idx" ON "weapon"("category");

-- CreateIndex
CREATE INDEX "weapon_name_idx" ON "weapon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "weapon_name_codTitle_key" ON "weapon"("name", "codTitle");
