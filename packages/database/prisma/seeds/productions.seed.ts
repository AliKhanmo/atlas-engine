import { prisma } from "../client";

// House-specific معادن (Mine) output — Wood/Stone/Iron commented out in ResourceType,
// so mines currently only yield Gold (+ a little Influence for flavor on some houses)
const mineOutputByHouse: Record<
  string,
  { resource: string; perLevel: number }[]
> = {
  "House Stark": [{ resource: "طلا", perLevel: 150 }],
  "House Lannister": [
    { resource: "طلا", perLevel: 700 },
    { resource: "نفوذ", perLevel: 20 },
  ],
  "House Tyrell": [{ resource: "طلا", perLevel: 200 }],
  "House Baratheon": [{ resource: "طلا", perLevel: 250 }],
  "House Arryn": [{ resource: "طلا", perLevel: 200 }],
  "House Martell": [{ resource: "طلا", perLevel: 200 }],
  "House Tully": [{ resource: "طلا", perLevel: 200 }],
  "House Greyjoy": [{ resource: "طلا", perLevel: 150 }],
  "House Targaryen": [
    { resource: "طلا", perLevel: 300 },
    { resource: "نفوذ", perLevel: 50 },
  ], // crown taxes + royal authority
};

// Uniform per-level output for buildings that don't need house-specific ratios
const genericProductionMap: Record<
  string,
  { resource: string; perLevel: number }[]
> = {
  مزرعه: [{ resource: "آذوقه", perLevel: 1200 }],
  بازارچه: [{ resource: "طلا", perLevel: 250 }],
  بندر: [
    { resource: "طلا", perLevel: 200 },
    { resource: "آذوقه", perLevel: 150 },
    { resource: "کشتی", perLevel: 1 },
  ],
  اصطبل: [{ resource: "اسب", perLevel: 150 }],
  آهنگری: [{ resource: "سلاح", perLevel: 200 }],
};

// Buildings that exist as HouseBuilding rows but never produce resources
const nonProducingBuildings = ["دژ فرمانروایی", "سربازخانه", "سیت"];

export async function seedProductions() {
  console.log("🏭 Seeding Productions...");

  const houseBuildings = await prisma.houseBuilding.findMany({
    include: {
      buildingType: true,
      house: true,
    },
  });

  for (const houseBuilding of houseBuildings) {
    const buildingName = houseBuilding.buildingType.name;

    if (nonProducingBuildings.includes(buildingName)) continue;

    const outputs =
      buildingName === "معادن"
        ? (mineOutputByHouse[houseBuilding.house.name] ?? [])
        : (genericProductionMap[buildingName] ?? []);

    if (outputs.length === 0) {
      console.warn(
        `⚠️ No production rule for building "${buildingName}" (house "${houseBuilding.house.name}"), skipping.`,
      );
      continue;
    }

    for (const output of outputs) {
      const resource = await prisma.resourceType.findFirst({
        where: { name: output.resource },
      });

      if (!resource) {
        throw new Error(
          `Resource "${output.resource}" not found — check ResourceType seed.`,
        );
      }

      const exists = await prisma.production.findFirst({
        where: {
          houseId: houseBuilding.houseId,
          buildingId: houseBuilding.id,
          resourceTypeId: resource.id,
        },
      });

      const amountPerTurn = output.perLevel * houseBuilding.level;

      if (exists) {
        await prisma.production.update({
          where: { id: exists.id },
          data: { amountPerTurn },
        });
      } else {
        await prisma.production.create({
          data: {
            houseId: houseBuilding.houseId,
            buildingId: houseBuilding.id,
            resourceTypeId: resource.id,
            amountPerTurn,
          },
        });
      }
    }
  }

  console.log("✅ Productions seeded.");
}
