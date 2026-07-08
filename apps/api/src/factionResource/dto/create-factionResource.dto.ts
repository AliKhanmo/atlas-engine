import { IsInt, IsString, Min } from 'class-validator';

export class CreateFactionResourceDto {
  @IsString()
  factionId!: string;

  @IsString()
  resourceTypeId!: string;

  @IsInt()
  @Min(0)
  amount!: number;
}
