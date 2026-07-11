import { prisma } from "../client";

export async function seedGames() {
  console.log("🎮 Seeding Games...");

  await prisma.game.upsert({
    where: {
      name: "Robert's Rebellion",
    },
    update: {},
    create: {
      name: "Robert's Rebellion",
      description: "...",
    },
  });

  console.log("✅ Games seeded.");
}
