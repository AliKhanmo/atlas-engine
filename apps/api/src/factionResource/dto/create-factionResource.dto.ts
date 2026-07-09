import { IsInt, IsString, Min } from 'class-validator';

export class CreateFactionResourceDto {
  @IsString()
  houseId!: string;

  @IsString()
  resourceTypeId!: string;

  @IsInt()
  @Min(0)
  amount!: number;
}
