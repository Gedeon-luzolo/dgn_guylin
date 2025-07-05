import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { AgentsService } from "./agents.service";
import { CreateAgentDto } from "./dto/create-agent.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "../../config/multer.config";

@Controller("api/agents")
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("photo", multerConfig))
  create(
    @Body() createAgentDto: CreateAgentDto,
    @UploadedFile() photo?: Express.Multer.File
  ) {
    return this.agentsService.create(createAgentDto, photo);
  }

  @Get()
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.agentsService.findOne(id);
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("photo", multerConfig))
  update(
    @Param("id") id: string,
    @Body() updateAgentDto: CreateAgentDto,
    @UploadedFile() photo?: Express.Multer.File
  ) {
    return this.agentsService.update(id, updateAgentDto, photo);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.agentsService.remove(id);
  }
}
