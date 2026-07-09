/*
  Warnings:

  - You are about to drop the column `factionId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `factionId` on the `FactionMember` table. All the data in the column will be lost.
  - You are about to drop the column `factionId` on the `FactionResource` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telegramChatId]` on the table `Faction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[playerId,houseId]` on the table `FactionMember` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[houseId,resourceTypeId]` on the table `FactionResource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `houseId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseId` to the `FactionMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseId` to the `FactionResource` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_factionId_fkey";

-- DropForeignKey
ALTER TABLE "FactionMember" DROP CONSTRAINT "FactionMember_factionId_fkey";

-- DropForeignKey
ALTER TABLE "FactionResource" DROP CONSTRAINT "FactionResource_factionId_fkey";

-- DropIndex
DROP INDEX "FactionMember_playerId_factionId_key";

-- DropIndex
DROP INDEX "FactionResource_factionId_resourceTypeId_key";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "factionId",
ADD COLUMN     "houseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Faction" ADD COLUMN     "bonuses" JSONB,
ADD COLUMN     "telegramChatId" TEXT;

-- AlterTable
ALTER TABLE "FactionMember" DROP COLUMN "factionId",
ADD COLUMN     "houseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FactionResource" DROP COLUMN "factionId",
ADD COLUMN     "houseId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "telegramChatId" TEXT,
    "factionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "House_telegramChatId_key" ON "House"("telegramChatId");

-- CreateIndex
CREATE UNIQUE INDEX "Faction_telegramChatId_key" ON "Faction"("telegramChatId");

-- CreateIndex
CREATE UNIQUE INDEX "FactionMember_playerId_houseId_key" ON "FactionMember"("playerId", "houseId");

-- CreateIndex
CREATE UNIQUE INDEX "FactionResource_houseId_resourceTypeId_key" ON "FactionResource"("houseId", "resourceTypeId");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_factionId_fkey" FOREIGN KEY ("factionId") REFERENCES "Faction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactionMember" ADD CONSTRAINT "FactionMember_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactionResource" ADD CONSTRAINT "FactionResource_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
