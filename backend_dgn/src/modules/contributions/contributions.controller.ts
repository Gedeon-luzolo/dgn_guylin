import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ContributionsService } from "./contributions.service";
import { CreateContributionDto } from "./dto/create-contribution.dto";

@Controller("api/contributions")
export class ContributionsController {
  constructor(private readonly contributionsService: ContributionsService) {}

  @Post("add")
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createContributionDto: CreateContributionDto) {
    return this.contributionsService.create(createContributionDto);
  }

  @Get()
  findAll() {
    return this.contributionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.contributionsService.findOne(id);
  }

  @Get("agent/:agentId")
  findByAgent(@Param("agentId") agentId: string) {
    return this.contributionsService.findByAgent(agentId);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.contributionsService.remove(id);
  }
}
