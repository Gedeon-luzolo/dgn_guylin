import { Controller } from "@nestjs/common";
import { AdhesionService } from "./adhesion.service";

@Controller("adhesion")
export class AdhesionController {
  constructor(private readonly adhesionService: AdhesionService) {}
}
