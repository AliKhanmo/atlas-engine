import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { CampaignModule } from './campaign/campaign.module';
import { FactionModule } from './faction/faction.module';
import { TurnModule } from './turn/turn.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    PrismaModule,
    GameModule,
    PlayerModule,
    CampaignModule,
    FactionModule,
    TurnModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
