import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { CampaignModule } from './campaign/campaign.module';
import { FactionModule } from './faction/faction.module';
import { TurnModule } from './turn/turn.module';
import { PlayerModule } from './player/player.module';
import { ResourceTypeModule } from './resourceType/resourceType.module';
import { FactionResourceModule } from './factionResource/factionResource.module';
import { FactionMemberModule } from './factionMember/factionMember.module';
import { EventModule } from './event/event.module';
import { HouseModule } from './house/house.module';

@Module({
  imports: [
    CampaignModule,
    EventModule,
    FactionModule,
    FactionMemberModule,
    FactionResourceModule,
    GameModule,
    PlayerModule,
    PrismaModule,
    ResourceTypeModule,
    TurnModule,
    HouseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
