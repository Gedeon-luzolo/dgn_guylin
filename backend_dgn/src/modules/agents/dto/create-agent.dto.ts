import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { UserData } from "../../users/entities/user.interface";

export class CreateAgentDto implements UserData {
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
  photo: string;

  @IsString()
  @IsOptional()
  fonction?: string;

  @IsString()
  @IsOptional()
  societe?: string;

  @IsString()
  @IsOptional()
  appartenancePolitique?: string;

  @IsString()
  @IsOptional()
  niveauEtudes?: string;
}
