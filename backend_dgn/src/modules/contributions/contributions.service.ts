import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contribution } from "./entities/contribution.entity";
import { CreateContributionDto } from "./dto/create-contribution.dto";
import { AgentsService } from "../agents/agents.service";

@Injectable()
export class ContributionsService {
  constructor(
    @InjectRepository(Contribution)
    private readonly contributionRepository: Repository<Contribution>,
    private readonly agentsService: AgentsService
  ) {}

  async create(
    createContributionDto: CreateContributionDto
  ): Promise<Contribution> {
    const agent = await this.agentsService.findOne(
      createContributionDto.agentId
    );
    if (!agent) {
      throw new NotFoundException(
        `Agent with ID ${createContributionDto.agentId} not found`
      );
    }

    const contribution = this.contributionRepository.create({
      ...createContributionDto,
      agent,
    });

    return await this.contributionRepository.save(contribution);
  }

  async findAll(): Promise<Contribution[]> {
    return await this.contributionRepository.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findOne(id: string): Promise<Contribution> {
    const contribution = await this.contributionRepository.findOne({
      where: { id },
    });

    if (!contribution) {
      throw new NotFoundException(`Contribution with ID ${id} not found`);
    }

    return contribution;
  }

  async findByAgent(agentId: string): Promise<Contribution[]> {
    return await this.contributionRepository.find({
      where: { agent: { id: agentId } },
      order: {
        createdAt: "DESC",
      },
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.contributionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Contribution with ID ${id} not found`);
    }
  }
}
