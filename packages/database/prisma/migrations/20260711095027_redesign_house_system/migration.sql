/*
  Warnings:

  - You are about to drop the column `militaryStrength` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Production` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Production` table. All the data in the column will be lost.
  - Added the required column `amountPerTurn` to the `Production` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buildingId` to the `Production` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RelationStatus" AS ENUM ('ALLY', 'NEUTRAL', 'HOSTILE', 'WAR');

-- DropIndex
DROP INDEX "Production_houseId_name_key";

-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "processedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "currentSeason" TEXT NOT NULL DEFAULT 'Spring',
ADD COLUMN     "currentTurn" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "currentYear" INTEGER NOT NULL DEFAULT 282;

-- AlterTable
ALTER TABLE "Castle" ADD COLUMN     "garrisonBonus" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "defenseLevel" SET DEFAULT 100;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "severity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "House" DROP COLUMN "militaryStrength",
ADD COLUMN     "corruption" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "morale" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "population" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "supply" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "treasury" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "words" TEXT;

-- AlterTable
ALTER TABLE "Lord" ADD COLUMN     "authority" INTEGER NOT NULL DEFAULT 50,
ADD COLUMN     "diplomacy" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "intrigue" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "prestige" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stewardship" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "warfare" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Production" DROP COLUMN "amount",
DROP COLUMN "name",
ADD COLUMN     "amountPerTurn" INTEGER NOT NULL,
ADD COLUMN     "buildingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UnitType" ADD COLUMN     "power" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "upkeep" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "BuildingType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuildingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseBuilding" (
    "id" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "buildingTypeId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HouseBuilding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseRelation" (
    "id" TEXT NOT NULL,
    "houseAId" TEXT NOT NULL,
    "houseBId" TEXT NOT NULL,
    "relation" INTEGER NOT NULL,
    "status" "RelationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HouseRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HouseBuilding_houseId_buildingTypeId_key" ON "HouseBuilding"("houseId", "buildingTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "HouseRelation_houseAId_houseBId_key" ON "HouseRelation"("houseAId", "houseBId");

-- AddForeignKey
ALTER TABLE "HouseBuilding" ADD CONSTRAINT "HouseBuilding_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseBuilding" ADD CONSTRAINT "HouseBuilding_buildingTypeId_fkey" FOREIGN KEY ("buildingTypeId") REFERENCES "BuildingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Production" ADD CONSTRAINT "Production_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "HouseBuilding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseRelation" ADD CONSTRAINT "HouseRelation_houseAId_fkey" FOREIGN KEY ("houseAId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseRelation" ADD CONSTRAINT "HouseRelation_houseBId_fkey" FOREIGN KEY ("houseBId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
