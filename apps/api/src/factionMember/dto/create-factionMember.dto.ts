import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MemberRole } from '@atlas/database';

export class CreateFactionMemberDto {
  @IsString()
  playerId!: string;

  @IsString()
  houseId!: string;

  @IsOptional()
  @IsEnum(MemberRole)
  role?: MemberRole;
}
