import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { ResourceTypeController } from './resourceType.controller';
import { ResourceTypeService } from './resourceType.service';
import { ResourceTypeRepository } from './resourceType.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ResourceTypeController],
  providers: [ResourceTypeService, ResourceTypeRepository],
})
export class ResourceTypeModule {}
