import { prisma } from "../client";

export async function seedResourceTypes() {
  console.log("💰 Seeding Resource Types...");

  const resources = [
    {
      name: "طلا", // Gold
      icon: "🪙",
      description:
        "واحد اصلی اقتصاد. برای ساخت‌وساز، استخدام و نگهداری ارتش استفاده می‌شود.",
    },
    {
      name: "آذوقه", // Food
      icon: "🌾",
      description: "برای تغذیه جمعیت و ارتش مصرف می‌شود.",
    },
    // {
    //   name: "چوب", // Wood
    //   icon: "🪵",
    //   description: "برای ساخت ساختمان‌ها، دیوارها و کشتی‌ها استفاده می‌شود.",
    // },
    // {
    //   name: "سنگ", // Stone
    //   icon: "🪨",
    //   description: "ماده اولیه ساخت قلعه‌ها و استحکامات.",
    // },
    // {
    //   name: "آهن", // Iron
    //   icon: "⛓️",
    //   description: "برای ساخت زره، سلاح و تجهیزات نظامی استفاده می‌شود.",
    // },
    {
      name: "اسب", // Horses
      icon: "🐎",
      description: "برای آموزش سواره‌نظام و حمل‌ونقل ارتش.",
    },
    {
      name: "سلاح", // Weapons
      icon: "⚔️",
      description: "تجهیزات نظامی موردنیاز برای استخدام نیروها.",
    },
    {
      name: "کشتی", // Ships
      icon: "⛵",
      description: "ناوگان دریایی خاندان.",
    },
    {
      name: "نفوذ", // Influence
      icon: "👑",
      description: "اعتبار سیاسی و نفوذ خاندان در وستروس.",
    },
  ];

  for (const resource of resources) {
    const exists = await prisma.resourceType.findFirst({
      where: { name: resource.name },
    });

    if (!exists) {
      await prisma.resourceType.create({
        data: resource,
      });
    }
  }

  console.log("✅ Resource Types seeded.");
}
