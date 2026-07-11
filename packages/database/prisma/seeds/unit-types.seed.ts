import { prisma } from "../client";

export async function seedUnitTypes() {
  console.log("⚔️ Seeding Unit Types...");

  const units = [
    {
      name: "Levies",
      icon: "🪓",
      description: "دهقانان و سربازان فراخوانده‌شده با آموزش اندک.",
      power: 1,
      upkeep: 1,
    },
    {
      name: "Spearmen",
      icon: "🛡️",
      description: "نیزه‌داران مناسب برای دفاع و مقابله با سواره‌نظام.",
      power: 2,
      upkeep: 2,
    },
    {
      name: "Swordsmen",
      icon: "⚔️",
      description: "پیاده‌نظام حرفه‌ای مجهز به شمشیر و زره.",
      power: 3,
      upkeep: 3,
    },
    {
      name: "Archers",
      icon: "🏹",
      description: "کمانداران با توان حمله از فاصله دور.",
      power: 2,
      upkeep: 2,
    },
    {
      name: "Crossbowmen",
      icon: "🎯",
      description: "کمان‌زنبورکی‌های قدرتمند با نفوذ بالا.",
      power: 3,
      upkeep: 3,
    },
    {
      name: "Heavy Infantry",
      icon: "🛡️",
      description: "پیاده‌نظام سنگین با زره کامل و استقامت بالا.",
      power: 5,
      upkeep: 5,
    },
    {
      name: "Knights",
      icon: "🐎",
      description: "شوالیه‌های زره‌پوش، نخبه‌ترین نیروی میدان نبرد.",
      power: 8,
      upkeep: 8,
    },
    {
      name: "Scouts",
      icon: "👁️",
      description: "دیده‌بانان و نیروهای شناسایی برای جمع‌آوری اطلاعات.",
      power: 1,
      upkeep: 2,
    },
    {
      name: "Siege Engines",
      icon: "🏰",
      description: "منجنیق، دژکوب و تجهیزات محاصره قلعه‌ها.",
      power: 10,
      upkeep: 10,
    },
    {
      name: "Warships",
      icon: "⛵",
      description: "کشتی‌های جنگی برای نبردهای دریایی و انتقال نیرو.",
      power: 12,
      upkeep: 12,
    },
  ];

  for (const unit of units) {
    const exists = await prisma.unitType.findFirst({
      where: {
        name: unit.name,
      },
    });

    if (!exists) {
      await prisma.unitType.create({
        data: unit,
      });
    }
  }

  console.log("✅ Unit Types seeded.");
}
