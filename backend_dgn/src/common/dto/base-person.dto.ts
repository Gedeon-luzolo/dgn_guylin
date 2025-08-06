import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

export class BasePersonDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  postNom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsString()
  @IsNotEmpty()
  genre: "Homme" | "Femme";

  @IsString()
  @IsNotEmpty()
  telephone: string;

  @IsString()
  @IsOptional()
  photo?: string;
} 