import { Module } from '@nestjs/common';

import { FactionController } from './faction.controller';
import { FactionRepository } from './faction.repository';
import { FactionService } from './faction.service';

@Module({
  controllers: [FactionController],
  providers: [FactionRepository, FactionService],
  exports: [FactionService],
})
export class FactionModule {}
