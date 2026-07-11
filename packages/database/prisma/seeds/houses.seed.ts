import { prisma } from "../client";

export async function seedHouses() {
  console.log("🏰 Seeding Great Houses...");

  const houses = [
    {
      faction: "Stormlands",
      house: {
        name: "House Baratheon",
        description: "Ours is the Fury",
      },
    },
    {
      faction: "The North",
      house: {
        name: "House Stark",
        description: "Winter is Coming",
      },
    },
    {
      faction: "The Vale",
      house: {
        name: "House Arryn",
        description: "As High as Honor",
      },
    },
    {
      faction: "Riverlands",
      house: {
        name: "House Tully",
        description: "Family, Duty, Honor",
      },
    },
    {
      faction: "The Reach",
      house: {
        name: "House Tyrell",
        description: "Growing Strong",
      },
    },
    {
      faction: "Westerlands",
      house: {
        name: "House Lannister",
        description: "Hear Me Roar!",
      },
    },
    {
      faction: "Dorne",
      house: {
        name: "House Martell",
        description: "Unbowed, Unbent, Unbroken",
      },
    },
    {
      faction: "Iron Islands",
      house: {
        name: "House Greyjoy",
        description: "We Do Not Sow",
      },
    },
    {
      faction: "Crownlands",
      house: {
        name: "House Targaryen",
        description: "Fire and Blood",
      },
    },
  ];

  for (const item of houses) {
    const faction = await prisma.faction.findFirst({
      where: {
        name: item.faction,
      },
    });

    if (!faction) {
      throw new Error(`Faction '${item.faction}' not found.`);
    }

    const exists = await prisma.house.findFirst({
      where: {
        factionId: faction.id,
        name: item.house.name,
      },
    });

    if (!exists) {
      await prisma.house.create({
        data: {
          ...item.house,
          factionId: faction.id,
        },
      });
    }
  }

  console.log("✅ Great Houses seeded.");
}
