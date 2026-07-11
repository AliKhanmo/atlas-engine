import { prisma } from "../client";

export async function seedHouseBuildings() {
  console.log("🏗️ Seeding House Buildings...");

  const houseBuildingLevels: Record<string, Record<string, number>> = {
    "House Stark": {
      "دژ فرمانروایی": 3,
      مزرعه: 2,
      معادن: 1,
      بازارچه: 1,
      بندر: 1,
      سربازخانه: 2,
      اصطبل: 1,
      آهنگری: 2,
      سیت: 1,
    },
    "House Lannister": {
      "دژ فرمانروایی": 4,
      مزرعه: 2,
      معادن: 5,
      بازارچه: 3,
      بندر: 2,
      سربازخانه: 2,
      اصطبل: 2,
      آهنگری: 3,
      سیت: 2,
    },
    "House Tyrell": {
      "دژ فرمانروایی": 3,
      مزرعه: 5,
      معادن: 1,
      بازارچه: 3,
      بندر: 1,
      سربازخانه: 2,
      اصطبل: 3,
      آهنگری: 2,
      سیت: 3,
    },
    "House Baratheon": {
      "دژ فرمانروایی": 4,
      مزرعه: 2,
      معادن: 2,
      بازارچه: 1,
      بندر: 2,
      سربازخانه: 3,
      اصطبل: 1,
      آهنگری: 2,
      سیت: 1,
    },
    "House Arryn": {
      "دژ فرمانروایی": 3,
      مزرعه: 1,
      معادن: 2,
      بازارچه: 2,
      بندر: 2,
      سربازخانه: 2,
      اصطبل: 2,
      آهنگری: 1,
      سیت: 2,
    },
    "House Martell": {
      "دژ فرمانروایی": 2,
      مزرعه: 1,
      معادن: 1,
      بازارچه: 3,
      بندر: 3,
      سربازخانه: 2,
      اصطبل: 2,
      آهنگری: 1,
      سیت: 2,
    },
    "House Tully": {
      "دژ فرمانروایی": 2,
      مزرعه: 4,
      معادن: 1,
      بازارچه: 2,
      بندر: 2,
      سربازخانه: 2,
      اصطبل: 1,
      آهنگری: 1,
      سیت: 1,
    },
    "House Greyjoy": {
      "دژ فرمانروایی": 2,
      مزرعه: 1,
      معادن: 2,
      بازارچه: 1,
      بندر: 4,
      سربازخانه: 1,
      اصطبل: 1,
      آهنگری: 2,
      سیت: 1,
    },
    "House Targaryen": {
      "دژ فرمانروایی": 5, // Red Keep, seat of the Iron Throne
      مزرعه: 2, // Crownlands farmland
      معادن: 2,
      بازارچه: 5, // King's Landing — largest trade hub in Westeros
      بندر: 3, // Blackwater Bay + royal fleet
      سربازخانه: 3, // Gold Cloaks / City Watch + royal garrison
      اصطبل: 2,
      آهنگری: 3,
      سیت: 3, // Great Sept of Baelor
    },
  };

  const houses = await prisma.house.findMany();

  for (const house of houses) {
    const levels = houseBuildingLevels[house.name];

    if (!levels) {
      console.warn(
        `⚠️ No building config for house "${house.name}", skipping.`,
      );
      continue;
    }

    for (const [buildingName, level] of Object.entries(levels)) {
      const buildingType = await prisma.buildingType.findFirst({
        where: { name: buildingName },
      });

      if (!buildingType) {
        console.warn(`⚠️ BuildingType "${buildingName}" not found, skipping.`);
        continue;
      }

      const exists = await prisma.houseBuilding.findUnique({
        where: {
          houseId_buildingTypeId: {
            houseId: house.id,
            buildingTypeId: buildingType.id,
          },
        },
      });

      if (exists) continue;

      await prisma.houseBuilding.create({
        data: {
          houseId: house.id,
          buildingTypeId: buildingType.id,
          level,
        },
      });
    }
  }

  console.log("✅ House Buildings seeded.");
}
