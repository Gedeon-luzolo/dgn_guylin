import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { BasePersonDto } from "../../../common/dto/base-person.dto";

export class CreateMemberDto extends BasePersonDto {
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
