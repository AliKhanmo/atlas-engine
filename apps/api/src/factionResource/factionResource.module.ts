import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { FactionResourceController } from './factionResource.controller';
import { FactionResourceService } from './factionResource.service';
import { FactionResourceRepository } from './factionResource.repository';

@Module({
  imports: [PrismaModule],
  controllers: [FactionResourceController],
  providers: [FactionResourceService, FactionResourceRepository],
  exports: [FactionResourceService],
})
export class FactionResourceModule {}
