import { seedGames } from "./games.seed";
import { seedCampaigns } from "./campaigns.seed";
import { seedFactions } from "./factions.seed";
import { seedHouses } from "./houses.seed";

import { seedBuildingTypes } from "./buildings.seed";
import { seedUnitTypes } from "./unit-types.seed";
import { seedResourceTypes } from "./resource-types.seed";
import { seedCastles } from "./castles.seed";
import { seedHouseBuildings } from "./houseBuildings.seed";
import { seedHouseResources } from "./houseResources.seed";
import { seedHouseUnits } from "./houseUnits.seed";
import { seedProductions } from "./productions.seed";
import { seedHouseRelations } from "./houseRelations.seed";
import { seedCharacters } from "./characters.seed";


export async function seedRobertsRebellion() {
  console.log("");
  console.log("⚔️ =====================================");
  console.log("⚔️  ROBERT'S REBELLION");
  console.log("⚔️ =====================================");
  console.log("");

  await seedGames();
  await seedCampaigns();

  await seedFactions();
  await seedHouses();

  await seedCharacters();
  await seedCastles();

  await seedBuildingTypes();
  await seedResourceTypes();
  await seedUnitTypes();

  await seedHouseBuildings();
  await seedHouseResources();
  await seedHouseUnits();

  await seedProductions();
  await seedHouseRelations();

  console.log("");
  console.log("👑 Robert's Rebellion is ready.");
  console.log("");
}
