import { prisma } from "../client";

export async function seedHouseResources() {
  console.log("💰 Seeding House Resources...");

  const houses = [
    {
      house: "House Baratheon",
      resources: {
        طلا: 30000, // Gold
        آذوقه: 25000, // Food
        اسب: 3500, // Horses
        سلاح: 7000, // Weapons
      },
    },
    {
      house: "House Stark",
      resources: {
        طلا: 22000,
        آذوقه: 42000,
        اسب: 5000,
        سلاح: 6500,
      },
    },
    {
      house: "House Arryn",
      resources: {
        طلا: 26000,
        آذوقه: 22000,
        اسب: 3000,
        سلاح: 6000,
      },
    },
    {
      house: "House Tully",
      resources: {
        طلا: 24000,
        آذوقه: 38000,
        اسب: 4000,
        سلاح: 6000,
      },
    },
    {
      house: "House Tyrell",
      resources: {
        طلا: 42000,
        آذوقه: 65000,
        اسب: 7000,
        سلاح: 8000,
      },
    },
    {
      house: "House Lannister",
      resources: {
        طلا: 85000,
        آذوقه: 26000,
        اسب: 3500,
        سلاح: 12000,
      },
    },
    {
      house: "House Martell",
      resources: {
        طلا: 26000,
        آذوقه: 18000,
        اسب: 2500,
        سلاح: 5500,
      },
    },
    {
      house: "House Greyjoy",
      resources: {
        طلا: 18000,
        آذوقه: 14000,
        اسب: 500,
        سلاح: 7500,
      },
    },
    {
      house: "House Targaryen",
      resources: {
        طلا: 90000, // ruling dynasty, crown treasury
        آذوقه: 32000,
        اسب: 4000,
        سلاح: 10000,
      },
    },
  ];

  for (const houseData of houses) {
    const house = await prisma.house.findFirst({
      where: { name: houseData.house },
    });

    if (!house) {
      console.warn(`⚠️ House "${houseData.house}" not found, skipping.`);
      continue;
    }

    for (const [resourceName, amount] of Object.entries(houseData.resources)) {
      const resourceType = await prisma.resourceType.findFirst({
        where: { name: resourceName },
      });

      if (!resourceType) {
        console.warn(`⚠️ ResourceType "${resourceName}" not found, skipping.`);
        continue;
      }

      const exists = await prisma.factionResource.findUnique({
        where: {
          houseId_resourceTypeId: {
            houseId: house.id,
            resourceTypeId: resourceType.id,
          },
        },
      });

      if (exists) continue;

      await prisma.factionResource.create({
        data: {
          houseId: house.id,
          resourceTypeId: resourceType.id,
          amount,
        },
      });
    }
  }

  console.log("✅ House Resources seeded.");
}
