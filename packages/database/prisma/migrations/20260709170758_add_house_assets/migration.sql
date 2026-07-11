-- AlterTable
ALTER TABLE "House" ADD COLUMN     "influence" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "militaryStrength" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "recruitablePopulation" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Lord" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "houseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Castle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "defenseLevel" INTEGER NOT NULL DEFAULT 1,
    "houseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Castle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnitType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseUnit" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "houseId" TEXT NOT NULL,
    "unitTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HouseUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Production" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "houseId" TEXT NOT NULL,
    "resourceTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Production_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lord_houseId_key" ON "Lord"("houseId");

-- CreateIndex
CREATE UNIQUE INDEX "Castle_houseId_key" ON "Castle"("houseId");

-- CreateIndex
CREATE UNIQUE INDEX "HouseUnit_houseId_unitTypeId_key" ON "HouseUnit"("houseId", "unitTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Production_houseId_name_key" ON "Production"("houseId", "name");

-- AddForeignKey
ALTER TABLE "Lord" ADD CONSTRAINT "Lord_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Castle" ADD CONSTRAINT "Castle_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseUnit" ADD CONSTRAINT "HouseUnit_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseUnit" ADD CONSTRAINT "HouseUnit_unitTypeId_fkey" FOREIGN KEY ("unitTypeId") REFERENCES "UnitType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Production" ADD CONSTRAINT "Production_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Production" ADD CONSTRAINT "Production_resourceTypeId_fkey" FOREIGN KEY ("resourceTypeId") REFERENCES "ResourceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
