import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateResourceTypeDto {
  @ApiProperty({
    example: 'Gold',
  })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 'Main currency of the realm',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: '🪙',
  })
  @IsOptional()
  @IsString()
  icon?: string;
}