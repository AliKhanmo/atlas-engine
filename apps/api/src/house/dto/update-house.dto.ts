import { IsOptional, IsString } from 'class-validator';

export class UpdateHouseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  factionId?: string;

  @IsOptional()
  @IsString()
  telegramChatId?: string;
}
