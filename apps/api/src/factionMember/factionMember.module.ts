import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { FactionMemberController } from './factionMember.controller';
import { FactionMemberService } from './factionMember.service';
import { FactionMemberRepository } from './factionMember.repository';

@Module({
  imports: [PrismaModule],
  controllers: [FactionMemberController],
  providers: [FactionMemberService, FactionMemberRepository],
  exports: [FactionMemberService],
})
export class FactionMemberModule {}
