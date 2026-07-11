import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFactionDto {
  @ApiProperty({
    example: 'House Targaryen',
    description: 'Faction name',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    example: 'The dragonlords of Valyria',
    description: 'Optional faction description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'cm8x9a2k10001abc',
    description: 'Campaign ID that this faction belongs to',
  })
  @IsString()
  @IsNotEmpty()
  campaignId!: string;
}
