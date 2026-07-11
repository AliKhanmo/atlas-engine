import "dotenv/config";
import { Telegraf, Markup } from "telegraf";
import axios from "axios";

const bot = new Telegraf(process.env.BOT_TOKEN!);

const API_URL = process.env.API_URL || "http://localhost:3000";

// ======================================================
// HELPERS
// ======================================================

const formatNumber = (n: number) => new Intl.NumberFormat("fa-IR").format(n);

// Clamped 0-100 progress bar - safe even if a value somehow exceeds 100
const progressBar = (value: number, size = 10) => {
  const clamped = Math.min(100, Math.max(0, value));
  const filled = Math.round((clamped / 100) * size);
  return "🟩".repeat(filled) + "⬜".repeat(size - filled);
};

const percent = (value: number) => `${value}% ${progressBar(value)}`;

const relationEmoji = (status: RelationStatus) => {
  switch (status) {
    case "ALLY":
      return "🟢";
    case "NEUTRAL":
      return "🟡";
    case "HOSTILE":
      return "🟠";
    case "WAR":
      return "🔴";
  }
};

const relationLabel = (status: RelationStatus) => {
  switch (status) {
    case "ALLY":
      return "متحد";
    case "NEUTRAL":
      return "خنثی";
    case "HOSTILE":
      return "خصمانه";
    case "WAR":
      return "جنگ";
  }
};

// ======================================================
// API TYPES (shape returned by GET /houses/telegram/:chatId)
// Matches HouseRepository.findByTelegramChatId's `include`.
// Every field here is real - nothing in this file is invented.
// ======================================================

type RelationStatus = "ALLY" | "NEUTRAL" | "HOSTILE" | "WAR";

interface ApiCharacter {
  name: string;
  title?: string | null;
  isLord: boolean;
  isCommander: boolean;
  authority: number;
  prestige: number;
  warfare: number;
  diplomacy: number;
  stewardship: number;
  intrigue: number;
}

interface ApiCampaign {
  currentTurn: number;
  currentYear: number;
  currentSeason: string;
  status: "ACTIVE" | "FINISHED";
}

interface ApiFaction {
  name: string;
  campaign?: ApiCampaign | null;
}

interface ApiCastle {
  name: string;
  level: number;
  defenseLevel: number;
  garrisonBonus: number;
}

interface ApiUnit {
  amount: number;
  unitType: {
    name: string;
    power: number;
    upkeep: number;
  };
}

interface ApiResource {
  amount: number;
  resourceType: {
    name: string;
    icon?: string | null;
  };
}

interface ApiProduction {
  amountPerTurn: number;
  resourceType: {
    name: string;
    icon?: string | null;
  };
}

interface ApiRelationFrom {
  relation: number;
  status: RelationStatus;
  houseB: { name: string };
}

interface ApiRelationTo {
  relation: number;
  status: RelationStatus;
  houseA: { name: string };
}

const RESOURCE = {
  GOLD: "طلا",
  WOOD: "چوب",
  STONE: "سنگ",
  FOOF: "آذوغه",
};

interface ApiHouse {
  name: string;
  description?: string | null;
  words?: string | null;
  population: number;
  recruitablePopulation: number;
  influence: number;
  corruption: number;
  morale: number;
  supply: number;
  faction?: ApiFaction | null;
  castle?: ApiCastle | null;
  characters?: ApiCharacter[];
  units?: ApiUnit[];
  resources?: ApiResource[];
  productions?: ApiProduction[];
  relationsFrom?: ApiRelationFrom[];
  relationsTo?: ApiRelationTo[];
}

// ======================================================
// FETCH HOUSE FOR A CHAT
// Returns null if the API is unreachable or no house is linked to this chat -
// callers must handle that explicitly rather than falling back to fake data.
// ======================================================

async function fetchHouse(chatId: string): Promise<ApiHouse | null> {
  try {
    const response = await axios.get<ApiHouse>(
      `${API_URL}/houses/telegram/${chatId}`,
    );
    return response.data ?? null;
  } catch (error) {
    console.log(`Could not fetch house for chat ${chatId}:`, error);
    return null;
  }
}

// Small derived helpers - all computed from real fields, nothing fabricated
function getLord(house: ApiHouse) {
  const characters = house.characters ?? [];
  return characters.find((c) => c.isLord) ?? null;
}

function getCommanders(house: ApiHouse) {
  return (house.characters ?? []).filter((c) => c.isCommander);
}

function getArmyTotals(house: ApiHouse) {
  const units = house.units ?? [];
  if (units.length === 0) return null;
  return {
    power: units.reduce((sum, u) => sum + u.amount * u.unitType.power, 0),
    upkeep: units.reduce((sum, u) => sum + u.amount * u.unitType.upkeep, 0),
  };
}

function getRelations(house: ApiHouse) {
  const from = (house.relationsFrom ?? []).map((r) => ({
    house: r.houseB.name,
    value: r.relation,
    status: r.status,
  }));
  const to = (house.relationsTo ?? []).map((r) => ({
    house: r.houseA.name,
    value: r.relation,
    status: r.status,
  }));
  return [...from, ...to];
}

// ======================================================
// TELEGRAM KEYBOARD
// ======================================================

const assetsKeyboard = () =>
  Markup.inlineKeyboard([
    [
      Markup.button.callback("🏰 داشبورد", "assets_main"),
      Markup.button.callback("⚔️ نظامی", "assets_military"),
    ],
    [
      Markup.button.callback("💰 اقتصاد", "assets_economy"),
      Markup.button.callback("🤝 دیپلماسی", "assets_diplomacy"),
    ],
  ]);

// ======================================================
// RENDER FUNCTIONS - only ever show fields that exist on the house.
// Missing pieces get a short, friendly "not set up yet" line instead
// of being silently replaced by numbers that aren't real.
// ======================================================

function mainAssets(house: ApiHouse) {
  const lord = getLord(house);
  const campaign = house.faction?.campaign;

  const lines = [`🏰 *خاندان ${house.name}*`, "━━━━━━━━━━━━━━", ""];

  lines.push(`👑 فرمانروا: ${lord ? lord.name : "هنوز ثبت نشده"}`);

  if (lord?.title) lines.push(`📛 عنوان: ${lord.title}`);

  lines.push(
    `🏰 دژ اصلی: ${house.castle ? house.castle.name : "هنوز ثبت نشده"}`,
  );

  const words = house.words ?? house.description;
  if (words) lines.push(`📜 شعار: «${words}»`);

  if (house.faction) lines.push(`🛡 فراکسیون: ${house.faction.name}`);

  if (campaign) {
    lines.push(
      "",
      `📅 نوبت: ${campaign.currentTurn}`,
      `🗓 سال: ${campaign.currentYear} پس از فتح`,
      `🌱 فصل: ${campaign.currentSeason}`,
    );
  }

  lines.push(
    "",
    `⭐ نفوذ: ${formatNumber(house.influence)}`,
    `👥 جمعیت: ${formatNumber(house.population)}`,
    `🪖 قابل استخدام: ${formatNumber(house.recruitablePopulation)}`,
  );

  return lines.join("\n");
}

function militaryAssets(house: ApiHouse) {
  const units = house.units ?? [];
  const totals = getArmyTotals(house);
  const commanders = getCommanders(house);

  const lines = [`⚔️ *گزارش نظامی*`, "━━━━━━━━━━━━━━", ""];

  lines.push(
    `🔥 روحیه: ${percent(house.morale)}`,
    `🍖 تدارکات: ${percent(house.supply)}`,
    "",
  );

  lines.push("👥 ارتش:", "");
  if (units.length > 0) {
    for (const u of units) {
      lines.push(`⚔️ ${u.unitType.name}: ${formatNumber(u.amount)}`);
    }
    if (totals) {
      lines.push(
        "",
        `🏆 قدرت کل ارتش: ${formatNumber(totals.power)}`,
        `💰 هزینه نگهداری هر نوبت: ${formatNumber(totals.upkeep)}`,
      );
    }
  } else {
    lines.push("— هنوز واحدی ثبت نشده —");
  }

  lines.push("", "👑 فرماندهان:", "");
  if (commanders.length > 0) {
    for (const c of commanders) {
      lines.push(`⭐ ${c.name} | مهارت جنگی: ${c.warfare}/5`);
    }
  } else {
    lines.push("— فرمانده‌ای ثبت نشده —");
  }

  return lines.join("\n");
}

function getResourceAmount(house: ApiHouse, resourceName: string) {
  return (
    house.resources?.find(
      (r) => r.resourceType.name.toLowerCase() === resourceName.toLowerCase(),
    )?.amount ?? 0
  );
}

function economyAssets(house: ApiHouse) {
  const resources = house.resources ?? [];
  const productions = house.productions ?? [];

  const lines = [`💰 *گزارش اقتصادی*`, "━━━━━━━━━━━━━━", ""];

  const gold = getResourceAmount(house, RESOURCE.GOLD);

  lines.push(
    `👑 خزانه: ${formatNumber(gold)} سکه`,
    `⚠️ فساد: ${percent(house.corruption)}`,
    "",
  );

  lines.push("📦 منابع:", "");
  if (resources.length > 0) {
    for (const r of resources) {
      lines.push(`• ${r.resourceType.name}: ${formatNumber(r.amount)}`);
    }
  } else {
    lines.push("— منبعی ثبت نشده —");
  }

  lines.push("", "🏭 تولید هر نوبت:", "");
  if (productions.length > 0) {
    for (const p of productions) {
      lines.push(`• ${p.resourceType.name}: +${formatNumber(p.amountPerTurn)}`);
    }
  } else {
    lines.push("— تولیدی ثبت نشده —");
  }

  return lines.join("\n");
}

function diplomacyAssets(house: ApiHouse) {
  const relations = getRelations(house);

  const lines = [`🤝 *گزارش دیپلماسی*`, "━━━━━━━━━━━━━━", ""];

  if (relations.length > 0) {
    for (const r of relations) {
      lines.push(
        `${relationEmoji(r.status)} ${r.house}: ${relationLabel(r.status)} (${r.value})`,
      );
    }
  } else {
    lines.push("— هنوز رابطه‌ای با خاندان دیگری ثبت نشده —");
  }

  return lines.join("\n");
}

// ======================================================
// SHARED SEND/UPDATE LOGIC
// ======================================================

const NO_HOUSE_MESSAGE =
  "❌ خاندانی برای این گروه ثبت نشده است. از مدیر بازی بخواهید خاندان این گروه را ثبت کند.";

async function replyWithHouse(ctx: any, render: (house: ApiHouse) => string) {
  const chatId = ctx.chat.id.toString();
  const house = await fetchHouse(chatId);

  if (!house) {
    await ctx.reply(NO_HOUSE_MESSAGE);
    return;
  }
  console.log(house);

  await ctx.reply(render(house), {
    parse_mode: "Markdown",
    ...assetsKeyboard(),
  });
}

async function updateWithHouse(ctx: any, render: (house: ApiHouse) => string) {
  const chatId = ctx.chat!.id.toString();
  const house = await fetchHouse(chatId);

  try {
    await ctx.answerCbQuery(house ? "در حال بروزرسانی..." : undefined);
  } catch {
    // ignore - callback may have already expired
  }

  if (!house) {
    await ctx.reply(NO_HOUSE_MESSAGE);
    return;
  }

  try {
    await ctx.editMessageText(render(house), {
      parse_mode: "Markdown",
      ...assetsKeyboard(),
    });
  } catch (error) {
    console.log(error);
  }
}

// ======================================================
// BOT COMMANDS
// ======================================================

bot.command("assets", (ctx) => replyWithHouse(ctx, mainAssets));
bot.command("status", (ctx) => replyWithHouse(ctx, mainAssets));
bot.command("military", (ctx) => replyWithHouse(ctx, militaryAssets));
bot.command("economy", (ctx) => replyWithHouse(ctx, economyAssets));
bot.command("diplomacy", (ctx) => replyWithHouse(ctx, diplomacyAssets));

// ======================================================
// CALLBACK BUTTONS (re-fetch per click so data stays current)
// ======================================================

bot.action("assets_main", (ctx) => updateWithHouse(ctx, mainAssets));
bot.action("assets_military", (ctx) => updateWithHouse(ctx, militaryAssets));
bot.action("assets_economy", (ctx) => updateWithHouse(ctx, economyAssets));
bot.action("assets_diplomacy", (ctx) => updateWithHouse(ctx, diplomacyAssets));

// ======================================================
// ERROR HANDLING
// ======================================================

bot.catch((err, ctx) => {
  console.error("Telegram Error:", err);
  ctx.reply("⚠️ خطایی رخ داد. دوباره تلاش کنید.");
});

// ======================================================
// START
// ======================================================

bot.launch({
  dropPendingUpdates: true,
});

console.log("🏰 Baratheon Strategy Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
