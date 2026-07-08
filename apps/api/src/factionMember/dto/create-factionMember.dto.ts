import { IsEnum, IsString } from 'class-validator';
import { MemberRole } from '@atlas/database';

export class CreateFactionMemberDto {
  @IsString()
  playerId!: string;

  @IsString()
  factionId!: string;

  @IsEnum(MemberRole)
  role!: MemberRole;
}
