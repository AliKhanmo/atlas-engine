import { prisma } from "../client";

export async function seedCastles() {
  console.log("🏰 Seeding Castles...");

  const castles = [
    {
      house: "House Baratheon",
      castle: {
        name: "Storm's End",
        level: 3,
        defenseLevel: 95,
        garrisonBonus: 20,
      },
    },
    {
      house: "House Stark",
      castle: {
        name: "Winterfell",
        level: 4,
        defenseLevel: 90,
        garrisonBonus: 20,
      },
    },
    {
      house: "House Arryn",
      castle: {
        name: "The Eyrie",
        level: 5,
        defenseLevel: 100,
        garrisonBonus: 30,
      },
    },
    {
      house: "House Tully",
      castle: {
        name: "Riverrun",
        level: 3,
        defenseLevel: 85,
        garrisonBonus: 15,
      },
    },
    {
      house: "House Tyrell",
      castle: {
        name: "Highgarden",
        level: 4,
        defenseLevel: 80,
        garrisonBonus: 15,
      },
    },
    {
      house: "House Lannister",
      castle: {
        name: "Casterly Rock",
        level: 5,
        defenseLevel: 98,
        garrisonBonus: 25,
      },
    },
    {
      house: "House Martell",
      castle: {
        name: "Sunspear",
        level: 4,
        defenseLevel: 82,
        garrisonBonus: 15,
      },
    },
    {
      house: "House Greyjoy",
      castle: {
        name: "Pyke",
        level: 4,
        defenseLevel: 88,
        garrisonBonus: 18,
      },
    },
    {
      house: "House Targaryen",
      castle: {
        name: "Red Keep",
        level: 5,
        defenseLevel: 100,
        garrisonBonus: 30,
      },
    },
  ];

  for (const item of castles) {
    const house = await prisma.house.findFirst({
      where: {
        name: item.house,
      },
    });

    if (!house) {
      throw new Error(`${item.house} not found.`);
    }

    const exists = await prisma.castle.findUnique({
      where: {
        houseId: house.id,
      },
    });

    if (!exists) {
      await prisma.castle.create({
        data: {
          ...item.castle,
          houseId: house.id,
        },
      });
    }
  }

  console.log("✅ Castles seeded.");
}
