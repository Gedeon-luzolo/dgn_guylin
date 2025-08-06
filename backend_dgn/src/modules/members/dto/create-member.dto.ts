import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { UserData } from "../../users/entities/user.interface";

export class CreateMemberDto {
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
  photo?: string ;

  @IsString()
  @IsNotEmpty()
  qualiteMembre: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  adresse: string;
}
