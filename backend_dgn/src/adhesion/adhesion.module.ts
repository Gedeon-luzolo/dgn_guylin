import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdhesionController } from "./adhesion.controller";
import { AdhesionService } from "./adhesion.service";
import { Member } from "../members/entities/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [AdhesionController],
  providers: [AdhesionService],
})
export class AdhesionModule {}
