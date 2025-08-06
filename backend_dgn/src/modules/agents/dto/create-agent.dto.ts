import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { BasePersonDto } from "../../../common/dto/base-person.dto";

export class CreateAgentDto extends BasePersonDto {
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
