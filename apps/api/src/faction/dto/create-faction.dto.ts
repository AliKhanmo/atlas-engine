import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFactionDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  campaignId!: string;
}
