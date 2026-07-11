import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty({
    example: 'War of the Five Kings',
    description: 'Campaign name',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'cm8x9a2k10001abc',
    description: 'The game ID this campaign belongs to',
  })
  @IsString()
  @IsNotEmpty()
  gameId!: string;
}
