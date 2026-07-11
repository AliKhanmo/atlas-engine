import "dotenv/config";
import { prisma } from "./client";
import { seedRobertsRebellion } from "./seeds/roberts-rebellion.seed";

async function main() {
  await seedRobertsRebellion();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
