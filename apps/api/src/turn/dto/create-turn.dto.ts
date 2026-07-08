import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTurnDto {
  @IsInt()
  number!: number;

  @IsString()
  @IsNotEmpty()
  campaignId!: string;
}