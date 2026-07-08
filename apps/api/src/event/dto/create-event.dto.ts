import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  turnId!: string;

  @IsOptional()
  @IsObject()
  effect?: Record<string, any>;
}
