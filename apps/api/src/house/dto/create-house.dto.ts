import { IsOptional, IsString } from 'class-validator';

export class CreateHouseDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  factionId!: string;

  @IsOptional()
  @IsString()
  telegramChatId?: string;
}
