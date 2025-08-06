import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateAgentDto } from "./dto/create-agent.dto";
import { Agent } from "./entities/agent.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { unlink } from "fs/promises";
import { join } from "path";
import { ImageProcessingService } from "src/common/services/image-processing.service";

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
    private readonly imageProcessingService: ImageProcessingService
  ) {}

  async findAll(): Promise<Agent[]> {
    return await this.agentRepository.find();
  }

  async create(createAgentDto: CreateAgentDto, photo?: Express.Multer.File) {
    let photoFilename = "default.png";

    // Vérifier si un agent avec ce téléphone existe déjà
    const existingAgent = await this.agentRepository.findOne({
      where: { telephone: createAgentDto.telephone },
    });

    if (existingAgent) {
      this.logger.warn("Un agent avec ce numéro de téléphone existe déjà");
      return {
        error: "Erreur serveur",
        message: "Un agent avec ce numéro de téléphone existe déjà",
      };
    }

    if (photo) {
      photoFilename = await this.imageProcessingService.processImage(photo);
    }

    // Créer directement l'agent sans utilisateur associé
    const agent = this.agentRepository.create({
      nom: createAgentDto.nom,
      postNom: createAgentDto.postNom,
      prenom: createAgentDto.prenom,
      genre: createAgentDto.genre,
      telephone: createAgentDto.telephone,
      photo: photoFilename,
      fonction: createAgentDto.fonction,
      societe: createAgentDto.societe,
      appartenancePolitique: createAgentDto.appartenancePolitique,
      niveauEtudes: createAgentDto.niveauEtudes,
      isActive: true,
      user: null, // Pas d'utilisateur associé par défaut
    });

    try {
      const savedAgent = await this.agentRepository.save(agent);
      return savedAgent;
    } catch (error) {
      this.logger.error("Error saving to database:", error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Agent> {
    const agent = await this.agentRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!agent) {
      throw new NotFoundException(`Agent avec l'ID "${id}" non trouvé`);
    }
    return agent;
  }

  async update(
    id: string,
    updateAgentDto: CreateAgentDto,
    photo?: Express.Multer.File
  ): Promise<Agent> {
    const agent = await this.findOne(id);
    let photoFilename = agent.photo || "default.png";

    if (photo) {
      if (agent.photo && agent.photo !== "default.png") {
        try {
          await unlink(join(process.cwd(), "uploads", agent.photo));
        } catch (error) {
          console.error("Error deleting old photo:", error);
        }
      }
      photoFilename = await this.imageProcessingService.processImage(photo);
    }

    // Mettre à jour directement les champs de l'agent
    Object.assign(agent, {
      nom: updateAgentDto.nom,
      postNom: updateAgentDto.postNom,
      prenom: updateAgentDto.prenom,
      genre: updateAgentDto.genre,
      telephone: updateAgentDto.telephone,
      photo: photoFilename,
      fonction: updateAgentDto.fonction,
      societe: updateAgentDto.societe,
      appartenancePolitique: updateAgentDto.appartenancePolitique,
      niveauEtudes: updateAgentDto.niveauEtudes,
    });

    return await this.agentRepository.save(agent);
  }

  async remove(id: string): Promise<void> {
    const agent = await this.findOne(id);

    if (agent.photo && agent.photo !== "default.png") {
      try {
        await unlink(join(process.cwd(), "uploads", agent.photo));
      } catch (error) {
        console.error("Error deleting photo:", error);
      }
    }

    const result = await this.agentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Agent avec l'ID "${id}" non trouvé`);
    }
  }
}
