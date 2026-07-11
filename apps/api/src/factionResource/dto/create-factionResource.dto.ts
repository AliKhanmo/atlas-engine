import { IsInt, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFactionResourceDto {
  @ApiProperty({
    example: 'cm_house12345',
    description: 'House ID that owns this resource',
  })
  @IsString()
  houseId!: string;

  @ApiProperty({
    example: 'cm_resource_gold123',
    description: 'Resource type ID (gold, wood, stone, etc.)',
  })
  @IsString()
  resourceTypeId!: string;

  @ApiProperty({
    example: 500,
    description: 'Amount of this resource',
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  amount!: number;
}
