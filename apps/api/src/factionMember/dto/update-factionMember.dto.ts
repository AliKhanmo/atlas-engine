import { PartialType } from '@nestjs/swagger';
import { CreateFactionMemberDto } from './create-factionMember.dto';

export class UpdateFactionMemberDto extends PartialType(
  CreateFactionMemberDto,
) {}
