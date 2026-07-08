/*
  Warnings:

  - You are about to drop the column `telegramId` on the `FactionMember` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerId,factionId]` on the table `FactionMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playerId` to the `FactionMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FactionMember_telegramId_factionId_key";

-- AlterTable
ALTER TABLE "FactionMember" DROP COLUMN "telegramId",
ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "playerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL,
    "username" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_telegramId_key" ON "Player"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "FactionMember_playerId_factionId_key" ON "FactionMember"("playerId", "factionId");

-- AddForeignKey
ALTER TABLE "FactionMember" ADD CONSTRAINT "FactionMember_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
