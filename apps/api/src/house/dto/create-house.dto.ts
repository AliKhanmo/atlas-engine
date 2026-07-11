import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHouseDto {
  @ApiProperty({
    example: 'House Stark',
    description: 'House name',
  })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 'The northern house of Winterfell',
    description: 'Optional house description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'cm9faction12345',
    description: 'Faction ID that owns this house',
  })
  @IsString()
  factionId!: string;

  @ApiPropertyOptional({
    example: '-1001234567890',
    description: 'Telegram group chat ID for this house',
  })
  @IsOptional()
  @IsString()
  telegramChatId?: string;
}
