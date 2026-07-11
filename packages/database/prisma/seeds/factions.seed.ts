import { prisma } from "../client";

export async function seedFactions() {
  console.log("🛡 Seeding Factions...");

  const campaign = await prisma.campaign.findFirst({
    where: {
      name: "Official Campaign",
    },
  });

  if (!campaign) {
    throw new Error(
      "Campaign 'Official Campaign' not found. Run campaigns.seed.ts first.",
    );
  }

  const factions = [
    {
      name: "The North",
      description: "The Kingdom of the North",
    },
    {
      name: "The Vale",
      description: "The Vale of Arryn",
    },
    {
      name: "Riverlands",
      description: "The Riverlands",
    },
    {
      name: "Stormlands",
      description: "The Stormlands",
    },
    {
      name: "The Reach",
      description: "The Reach",
    },
    {
      name: "Westerlands",
      description: "The Westerlands",
    },
    {
      name: "Dorne",
      description: "The Principality of Dorne",
    },
    {
      name: "Iron Islands",
      description: "The Iron Islands",
    },
    {
      name: "Crownlands",
      description: "The Crownlands",
    },
  ];

  for (const faction of factions) {
    const exists = await prisma.faction.findFirst({
      where: {
        campaignId: campaign.id,
        name: faction.name,
      },
    });

    if (!exists) {
      await prisma.faction.create({
        data: {
          ...faction,
          campaignId: campaign.id,
        },
      });
    }
  }

  console.log("✅ Factions seeded.");
}
