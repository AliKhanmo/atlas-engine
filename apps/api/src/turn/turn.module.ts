import { Module } from '@nestjs/common';

import { TurnController } from './turn.controller';
import { TurnRepository } from './turn.repository';
import { TurnService } from './turn.service';

@Module({
  controllers: [TurnController],
  providers: [TurnRepository, TurnService],
  exports: [TurnService],
})
export class TurnModule {}
