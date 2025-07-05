import { Module } from "@nestjs/common";
import { AgentsService } from "./agents.service";
import { AgentsController } from "./agents.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Agent } from "./entities/agent.entity";
import { User } from "../users/entities/user.entity";
import { ImageProcessingService } from "src/common/services/image-processing.service";

@Module({
  imports: [TypeOrmModule.forFeature([Agent, User])],
  controllers: [AgentsController],
  providers: [AgentsService, ImageProcessingService],
})
export class AgentsModule {}
