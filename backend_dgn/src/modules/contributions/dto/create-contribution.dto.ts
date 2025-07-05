import { IsNotEmpty, IsNumber, IsString, IsEnum, Min } from "class-validator";
import { Currency } from "../entities/contribution.entity";
import { Transform } from "class-transformer";

export class CreateContributionDto {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  montant: number;

  @IsString()
  @IsNotEmpty()
  moisConcerne: string;

  @IsEnum(Currency)
  @IsNotEmpty()
  devise: Currency;

  @IsString()
  @IsNotEmpty()
  agentId: string;
}
