import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContributionsService } from "./contributions.service";
import { ContributionsController } from "./contributions.controller";
import { Contribution } from "./entities/contribution.entity";
import { AgentsModule } from "../agents/agents.module";

@Module({
  imports: [TypeOrmModule.forFeature([Contribution]), AgentsModule],
  controllers: [ContributionsController],
  providers: [ContributionsService],
  exports: [ContributionsService],
})
export class ContributionsModule {}
