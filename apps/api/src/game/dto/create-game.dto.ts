import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    example: 'Game of Thrones',
    description: 'Name of the game template',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'A political strategy game based on Westeros',
    description: 'Game description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
