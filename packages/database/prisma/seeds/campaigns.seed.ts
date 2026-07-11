import { CampaignStatus } from "../../src";
import { prisma } from "../client";

export async function seedCampaigns() {
  console.log("🏰 Seeding Campaigns...");

  const game = await prisma.game.findUnique({
    where: {
      name: "Robert's Rebellion",
    },
  });

  if (!game) {
    throw new Error("Game not found.");
  }

  const existing = await prisma.campaign.findFirst({
    where: {
      gameId: game.id,
      name: "Official Campaign",
    },
  });

  if (!existing) {
    await prisma.campaign.create({
      data: {
        name: "Official Campaign",
        status: CampaignStatus.ACTIVE,
        gameId: game.id,
      },
    });
  }

  console.log("✅ Campaigns seeded.");
}
