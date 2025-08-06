import { Module } from "@nestjs/common";
import { AgentsService } from "./agents.service";
import { AgentsController } from "./agents.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Agent } from "./entities/agent.entity";
import { ImageProcessingService } from "src/common/services/image-processing.service";

@Module({
  imports: [TypeOrmModule.forFeature([Agent])],
  controllers: [AgentsController],
  providers: [AgentsService, ImageProcessingService],
  exports: [AgentsService, TypeOrmModule, ImageProcessingService],
})
export class AgentsModule {}
