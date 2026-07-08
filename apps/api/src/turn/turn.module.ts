import { Module } from '@nestjs/common';
import { TurnService } from './turn.service';
import { TurnController } from './turn.controller';

@Module({
  providers: [TurnService],
  controllers: [TurnController]
})
export class TurnModule {}
