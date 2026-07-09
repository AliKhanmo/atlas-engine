import { Module } from '@nestjs/common';

import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { HouseRepository } from './house.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [HouseController],
  providers: [HouseService, HouseRepository, PrismaService],
  exports: [HouseService, HouseRepository],
})
export class HouseModule {}
