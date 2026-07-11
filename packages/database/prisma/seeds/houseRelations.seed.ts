import { RelationStatus } from "@prisma/client";
import { prisma } from "../client";

export async function seedHouseRelations() {
  console.log("🤝 Seeding House Relations...");

  const relations: {
    houseA: string;
    houseB: string;
    relation: number;
    status: RelationStatus;
  }[] = [
    // ===========================
    // Rebel Alliance
    // ===========================

    {
      houseA: "House Baratheon",
      houseB: "House Stark",
      relation: 95,
      status: RelationStatus.ALLY,
    },
    {
      houseA: "House Baratheon",
      houseB: "House Arryn",
      relation: 100,
      status: RelationStatus.ALLY,
    },
    {
      houseA: "House Baratheon",
      houseB: "House Tully",
      relation: 70,
      status: RelationStatus.ALLY,
    },

    {
      houseA: "House Stark",
      houseB: "House Arryn",
      relation: 100,
      status: RelationStatus.ALLY,
    },
    {
      houseA: "House Stark",
      houseB: "House Tully",
      relation: 80,
      status: RelationStatus.ALLY,
    },

    {
      houseA: "House Arryn",
      houseB: "House Tully",
      relation: 75,
      status: RelationStatus.ALLY,
    },

    // ===========================
    // Crown Loyalists
    // ===========================

    {
      houseA: "House Targaryen",
      houseB: "House Tyrell",
      relation: 90,
      status: RelationStatus.ALLY,
    },
    {
      houseA: "House Targaryen",
      houseB: "House Martell",
      relation: 95,
      status: RelationStatus.ALLY,
    },

    {
      houseA: "House Tyrell",
      houseB: "House Martell",
      relation: 70,
      status: RelationStatus.ALLY,
    },

    // ===========================
    // Robert vs Crown
    // ===========================

    {
      houseA: "House Baratheon",
      houseB: "House Targaryen",
      relation: -60,
      status: RelationStatus.HOSTILE,
    },
    {
      houseA: "House Stark",
      houseB: "House Targaryen",
      relation: -45,
      status: RelationStatus.HOSTILE,
    },
    {
      houseA: "House Arryn",
      houseB: "House Targaryen",
      relation: -55,
      status: RelationStatus.HOSTILE,
    },
    {
      houseA: "House Tully",
      houseB: "House Targaryen",
      relation: -20,
      status: RelationStatus.NEUTRAL,
    },

    // ===========================
    // Lannisters
    // ===========================

    {
      houseA: "House Lannister",
      houseB: "House Baratheon",
      relation: 10,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Lannister",
      houseB: "House Stark",
      relation: 0,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Lannister",
      houseB: "House Arryn",
      relation: 10,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Lannister",
      houseB: "House Tully",
      relation: 15,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Lannister",
      houseB: "House Tyrell",
      relation: 40,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Lannister",
      houseB: "House Martell",
      relation: -10,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Lannister",
      houseB: "House Greyjoy",
      relation: 15,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Lannister",
      houseB: "House Targaryen",
      relation: 40,
      status: RelationStatus.NEUTRAL,
    },

    // ===========================
    // Greyjoy
    // ===========================

    {
      houseA: "House Greyjoy",
      houseB: "House Baratheon",
      relation: -10,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Greyjoy",
      houseB: "House Stark",
      relation: -25,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Greyjoy",
      houseB: "House Arryn",
      relation: -10,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Greyjoy",
      houseB: "House Tully",
      relation: -20,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Greyjoy",
      houseB: "House Tyrell",
      relation: -10,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Greyjoy",
      houseB: "House Martell",
      relation: 10,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Greyjoy",
      houseB: "House Targaryen",
      relation: 10,
      status: RelationStatus.NEUTRAL,
    },

    // ===========================
    // Other Relations
    // ===========================

    {
      houseA: "House Tyrell",
      houseB: "House Baratheon",
      relation: -20,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Tyrell",
      houseB: "House Stark",
      relation: -5,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Tyrell",
      houseB: "House Arryn",
      relation: 0,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Tyrell",
      houseB: "House Tully",
      relation: 10,
      status: RelationStatus.NEUTRAL,
    },

    {
      houseA: "House Martell",
      houseB: "House Baratheon",
      relation: -20,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Martell",
      houseB: "House Stark",
      relation: 10,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Martell",
      houseB: "House Arryn",
      relation: 5,
      status: RelationStatus.NEUTRAL,
    },
    {
      houseA: "House Martell",
      houseB: "House Tully",
      relation: 15,
      status: RelationStatus.NEUTRAL,
    },
  ];

  for (const relation of relations) {
    const houseA = await prisma.house.findFirst({
      where: {
        name: relation.houseA,
      },
    });

    const houseB = await prisma.house.findFirst({
      where: {
        name: relation.houseB,
      },
    });

    if (!houseA || !houseB) {
      throw new Error(
        `House not found: ${relation.houseA} or ${relation.houseB}`,
      );
    }

    const exists = await prisma.houseRelation.findFirst({
      where: {
        houseAId: houseA.id,
        houseBId: houseB.id,
      },
    });

    if (exists) continue;

    await prisma.houseRelation.create({
      data: {
        houseAId: houseA.id,
        houseBId: houseB.id,
        relation: relation.relation,
        status: relation.status,
      },
    });

    // Mirror relation
    await prisma.houseRelation.create({
      data: {
        houseAId: houseB.id,
        houseBId: houseA.id,
        relation: relation.relation,
        status: relation.status,
      },
    });
  }

  console.log("✅ House Relations seeded.");
}
