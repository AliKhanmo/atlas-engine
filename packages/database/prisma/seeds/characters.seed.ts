import { prisma } from "../client";

export async function seedCharacters() {
  console.log("👤 Seeding Characters...");

  const characters = [
    {
      house: "House Baratheon",
      character: {
        name: "Robert Baratheon",
        title: "Lord of Storm's End",
        isLord: true,
        isCommander: true,
        authority: 95,
        prestige: 100,
        warfare: 5,
        diplomacy: 3,
        stewardship: 2,
        intrigue: 1,
        loyalty: 100,
        age: 21,
      },
    },
    {
      house: "House Stark",
      character: {
        name: "Eddard Stark",
        title: "Lord of Winterfell",
        isLord: true,
        isCommander: true,
        authority: 90,
        prestige: 90,
        warfare: 4,
        diplomacy: 4,
        stewardship: 4,
        intrigue: 2,
        loyalty: 100,
        age: 20,
      },
    },
    {
      house: "House Arryn",
      character: {
        name: "Jon Arryn",
        title: "Lord of the Eyrie",
        isLord: true,
        isCommander: true,
        authority: 95,
        prestige: 95,
        warfare: 3,
        diplomacy: 5,
        stewardship: 4,
        intrigue: 3,
        loyalty: 100,
        age: 65,
      },
    },
    {
      house: "House Tully",
      character: {
        name: "Hoster Tully",
        title: "Lord of Riverrun",
        isLord: true,
        isCommander: true,
        authority: 85,
        prestige: 85,
        warfare: 3,
        diplomacy: 4,
        stewardship: 3,
        intrigue: 2,
        loyalty: 100,
        age: 44,
      },
    },
    {
      house: "House Tyrell",
      character: {
        name: "Mace Tyrell",
        title: "Lord of Highgarden",
        isLord: true,
        isCommander: false,
        authority: 70,
        prestige: 70,
        warfare: 2,
        diplomacy: 3,
        stewardship: 3,
        intrigue: 2,
        loyalty: 100,
        age: 39,
      },
    },
    {
      house: "House Lannister",
      character: {
        name: "Tywin Lannister",
        title: "Lord of Casterly Rock",
        isLord: true,
        isCommander: true,
        authority: 100,
        prestige: 100,
        warfare: 4,
        diplomacy: 4,
        stewardship: 5,
        intrigue: 4,
        loyalty: 100,
        age: 40,
      },
    },
    {
      house: "House Martell",
      character: {
        name: "Doran Martell",
        title: "Prince of Dorne",
        isLord: true,
        isCommander: false,
        authority: 90,
        prestige: 85,
        warfare: 2,
        diplomacy: 5,
        stewardship: 4,
        intrigue: 5,
        loyalty: 100,
        age: 26,
      },
    },
    {
      house: "House Greyjoy",
      character: {
        name: "Balon Greyjoy",
        title: "Lord Reaper of Pyke",
        isLord: true,
        isCommander: true,
        authority: 80,
        prestige: 75,
        warfare: 4,
        diplomacy: 1,
        stewardship: 2,
        intrigue: 2,
        loyalty: 100,
        age: 22,
      },
    },
    {
      house: "House Targaryen",
      character: {
        name: "Aerys II Targaryen",
        title: "King of the Andals, the Rhoynar and the First Men",
        isLord: true,
        isCommander: false,
        authority: 40,
        prestige: 90,
        warfare: 1,
        diplomacy: 1,
        stewardship: 1,
        intrigue: 2,
        loyalty: 0,
        age: 39,
      },
    },
  ];

  for (const item of characters) {
    const house = await prisma.house.findFirst({
      where: {
        name: item.house,
      },
    });

    if (!house) {
      throw new Error(`${item.house} not found.`);
    }

    const existing = await prisma.character.findFirst({
      where: {
        houseId: house.id,
        name: item.character.name,
      },
    });

    if (!existing) {
      await prisma.character.create({
        data: {
          ...item.character,
          houseId: house.id,
        },
      });
    }
  }

  console.log("✅ Characters seeded.");
}
