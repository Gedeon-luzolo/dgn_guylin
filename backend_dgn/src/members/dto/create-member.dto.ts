import { IsString, IsNotEmpty, IsOptional } from "class-validator";

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
  @IsOptional()
  // @Matches(/^\+?[0-9]+$/, {
  //   message: "Le numéro de téléphone doit être valide",
  // })
  telephone: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  qualiteMembre: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  adresse: string;

  @IsString()
  @IsOptional()
  photo?: string;
}
