import { prisma } from "../client";

export async function seedBuildingTypes() {
  console.log("🏗️ Seeding Building Types...");

  const buildings = [
    {
      name: "دژ فرمانروایی", // Castle
      icon: "🏰",
      description:
        "مرکز فرمانروایی خاندان که سطح دفاع و ظرفیت توسعه را افزایش می‌دهد.",
    },
    {
      name: "مزرعه", // Farm
      icon: "🌾",
      description: "در هر نوبت آذوقه تولید می‌کند و جمعیت را تأمین می‌کند.",
    },
    {
      name: "معادن", // Mine
      icon: "⛏️",
      description: "طلا، سنگ و سایر منابع معدنی تولید می‌کند.",
    },
    {
      name: "بازارچه", // Market
      icon: "💰",
      description: "درآمد مالیاتی و تجارت را افزایش می‌دهد.",
    },
    {
      name: "بندر", // Harbor
      icon: "⚓",
      description: "امکان ساخت ناوگان و افزایش تجارت دریایی را فراهم می‌کند.",
    },
    {
      name: "سربازخانه", // Barracks
      icon: "🛡️",
      description: "ظرفیت جذب و آموزش نیروهای پیاده را افزایش می‌دهد.",
    },
    {
      name: "اصطبل", // Stables
      icon: "🐎",
      description: "امکان آموزش سواره‌نظام را فراهم می‌کند.",
    },
    {
      name: "آهنگری", // Smithy
      icon: "⚒️",
      description: "تجهیزات نظامی را بهبود داده و قدرت ارتش را افزایش می‌دهد.",
    },
    {
      name: "سیت", // Sept — ⚠️ confirm spelling, may need to be "سپت"
      icon: "🏛️",
      description: "وفاداری مردم و ثبات داخلی را افزایش می‌دهد.",
    },
  ];

  for (const building of buildings) {
    const exists = await prisma.buildingType.findFirst({
      where: { name: building.name },
    });

    if (!exists) {
      await prisma.buildingType.create({
        data: building,
      });
    }
  }

  console.log("✅ Building Types seeded.");
}
