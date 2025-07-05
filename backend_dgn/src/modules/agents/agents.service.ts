import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateAgentDto } from "./dto/create-agent.dto";
import { Agent } from "./entities/agent.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { unlink } from "fs/promises";
import { join } from "path";
import { ImageProcessingService } from "src/common/services/image-processing.service";
import { User } from "../users/entities/user.entity";
import { UserData } from "../users/entities/user.interface";

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly imageProcessingService: ImageProcessingService
  ) {}

  async findAll(): Promise<Agent[]> {
    return await this.agentRepository.find();
  }

  async create(createAgentDto: CreateAgentDto, photo?: Express.Multer.File) {
    let photoFilename = "default.png";

    const existingUser = await this.userRepository.findOne({
      where: { telephone: createAgentDto.telephone },
    });

    if (existingUser) {
      return {
        error: "Erreur serveur",
        message: "Un utilisateur avec ce numéro de téléphone existe déjà",
      };
    }

    if (photo) {
      photoFilename = await this.imageProcessingService.processImage(photo);
    }

    const userDto: UserData = {
      nom: createAgentDto.nom,
      postNom: createAgentDto.postNom,
      prenom: createAgentDto.prenom,
      telephone: createAgentDto.telephone,
      photo: photoFilename,
      genre: createAgentDto.genre,
    };

    const user = this.userRepository.create(userDto);
    const savedUser = await this.userRepository.save(user);

    const agent = this.agentRepository.create({
      user: savedUser,
      fonction: createAgentDto.fonction,
      societe: createAgentDto.societe,
      appartenancePolitique: createAgentDto.appartenancePolitique,
      niveauEtudes: createAgentDto.niveauEtudes,
      isActive: true,
    });

    return await this.agentRepository.save(agent);
  }

  async findOne(id: string): Promise<Agent> {
    const agent = await this.agentRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!agent) {
      throw new NotFoundException(`Agent with ID "${id}" not found`);
    }
    return agent;
  }

  async update(
    id: string,
    updateAgentDto: CreateAgentDto,
    photo?: Express.Multer.File
  ): Promise<Agent> {
    const agent = await this.findOne(id);
    let photoFilename = agent.user.photo;

    if (photo) {
      if (agent.user.photo && agent.user.photo !== "default.png") {
        try {
          await unlink(join(process.cwd(), "uploads", agent.user.photo));
        } catch (error) {
          console.error("Error deleting old photo:", error);
        }
      }
      photoFilename = await this.imageProcessingService.processImage(photo);
    }

    const userUpdateDto: UserData = {
      nom: updateAgentDto.nom,
      postNom: updateAgentDto.postNom,
      prenom: updateAgentDto.prenom,
      telephone: updateAgentDto.telephone,
      photo: photoFilename,
      genre: updateAgentDto.genre,
    };

    Object.assign(agent.user, userUpdateDto);
    await this.userRepository.save(agent.user);

    Object.assign(agent, {
      fonction: updateAgentDto.fonction,
      societe: updateAgentDto.societe,
      appartenancePolitique: updateAgentDto.appartenancePolitique,
      niveauEtudes: updateAgentDto.niveauEtudes,
    });

    return await this.agentRepository.save(agent);
  }

  async remove(id: string): Promise<void> {
    const agent = await this.findOne(id);

    if (agent.user.photo && agent.user.photo !== "default.png") {
      try {
        await unlink(join(process.cwd(), "uploads", agent.user.photo));
      } catch (error) {
        console.error("Error deleting photo:", error);
      }
    }

    const result = await this.agentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Agent with ID "${id}" not found`);
    }
  }
}
