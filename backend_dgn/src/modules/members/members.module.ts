import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MembersController } from "./members.controller";
import { MembersService } from "./members.service";
import { Member } from "./entities/member.entity";
import { ImageProcessingService } from "src/common/services/image-processing.service";
import { SeederModule } from "../../database/seeders/seeder.module";

@Module({
  imports: [TypeOrmModule.forFeature([Member]), SeederModule],
  controllers: [MembersController],
  providers: [MembersService, ImageProcessingService],
  exports: [MembersService],
})
export class MembersModule {}
