import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameRepository } from './game.repository';

@Module({
  imports: [PrismaModule],
  controllers: [GameController],
  providers: [GameService, GameRepository],
  exports: [GameService, GameRepository],
})
export class GameModule {}
