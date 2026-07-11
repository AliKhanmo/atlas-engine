import { prisma } from "../client";

export async function seedHouseUnits() {
  console.log("⚔️ Seeding House Units...");

  const houses = [
    {
      house: "House Baratheon",
      units: {
        Swordsmen: 2200,
        Spearmen: 1400,
        Archers: 800,
        Knights: 450,
        "Siege Engines": 12,
        Ships: 32,
      },
    },

    {
      house: "House Stark",
      units: {
        Swordsmen: 2500,
        Spearmen: 1700,
        Archers: 1400,
        Knights: 250,
        "Siege Engines": 10,
        Ships: 15,
      },
    },

    {
      house: "House Arryn",
      units: {
        Swordsmen: 1600,
        Spearmen: 1200,
        Archers: 900,
        Knights: 600,
        "Siege Engines": 8,
        Ships: 8,
      },
    },

    {
      house: "House Tully",
      units: {
        Swordsmen: 1800,
        Spearmen: 1500,
        Archers: 900,
        Knights: 350,
        "Siege Engines": 10,
        Ships: 12,
      },
    },

    {
      house: "House Tyrell",
      units: {
        Swordsmen: 3500,
        Spearmen: 2500,
        Archers: 1800,
        Knights: 900,
        "Siege Engines": 18,
        Ships: 22,
      },
    },

    {
      house: "House Lannister",
      units: {
        Swordsmen: 3000,
        Spearmen: 1800,
        Archers: 1200,
        Knights: 850,
        "Siege Engines": 16,
        Ships: 25,
      },
    },

    {
      house: "House Martell",
      units: {
        Swordsmen: 1700,
        Spearmen: 900,
        Archers: 1700,
        Knights: 220,
        "Siege Engines": 8,
        Ships: 18,
      },
    },

    {
      house: "House Greyjoy",
      units: {
        Swordsmen: 1500,
        Spearmen: 500,
        Archers: 700,
        Knights: 30,
        "Siege Engines": 2,
        Ships: 140,
      },
    },

    {
      house: "House Targaryen",
      units: {
        Swordsmen: 2800,
        Spearmen: 1700,
        Archers: 1200,
        Knights: 700,
        "Siege Engines": 15,
        Ships: 40,
      },
    },
  ];

  for (const houseData of houses) {
    const house = await prisma.house.findFirst({
      where: {
        name: houseData.house,
      },
    });

    if (!house) continue;

    for (const [unitName, amount] of Object.entries(houseData.units)) {
      const unitType = await prisma.unitType.findFirst({
        where: {
          name: unitName,
        },
      });

      if (!unitType) continue;

      const exists = await prisma.houseUnit.findUnique({
        where: {
          houseId_unitTypeId: {
            houseId: house.id,
            unitTypeId: unitType.id,
          },
        },
      });

      if (exists) continue;

      await prisma.houseUnit.create({
        data: {
          houseId: house.id,
          unitTypeId: unitType.id,
          amount,
        },
      });
    }
  }

  console.log("✅ House Units seeded.");
}
