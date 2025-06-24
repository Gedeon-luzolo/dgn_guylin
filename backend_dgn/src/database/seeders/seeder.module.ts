import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Member } from "../../modules/members/entities/member.entity";
import { AdminSeeder } from "./admin.seeder";

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [AdminSeeder],
  exports: [AdminSeeder],
})
export class SeederModule {}
