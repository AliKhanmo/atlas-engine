/*
  Warnings:

  - You are about to drop the `Lord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lord" DROP CONSTRAINT "Lord_houseId_fkey";

-- DropTable
DROP TABLE "Lord";

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "portraitUrl" TEXT,
    "nickname" TEXT,
    "authority" INTEGER NOT NULL DEFAULT 50,
    "prestige" INTEGER NOT NULL DEFAULT 0,
    "warfare" INTEGER NOT NULL DEFAULT 1,
    "diplomacy" INTEGER NOT NULL DEFAULT 1,
    "stewardship" INTEGER NOT NULL DEFAULT 1,
    "intrigue" INTEGER NOT NULL DEFAULT 1,
    "loyalty" INTEGER NOT NULL DEFAULT 100,
    "age" INTEGER,
    "isAlive" BOOLEAN NOT NULL DEFAULT true,
    "isLord" BOOLEAN NOT NULL DEFAULT false,
    "isCommander" BOOLEAN NOT NULL DEFAULT false,
    "houseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
