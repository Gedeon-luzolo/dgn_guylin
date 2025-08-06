import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateMemberDto } from "./dto/create-member.dto";
import { Member } from "./entities/member.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { unlink } from "fs/promises";
import { join } from "path";
import { ImageProcessingService } from "src/common/services/image-processing.service";

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly imageProcessingService: ImageProcessingService
  ) {}

  async findAll(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

  async create(createMemberDto: CreateMemberDto, photo?: Express.Multer.File) {
    let photoFilename = "default.png";

    // Vérifier si un membre avec ce téléphone existe déjà
    const existingMember = await this.memberRepository.findOne({
      where: { telephone: createMemberDto.telephone },
    });

    if (existingMember) {
      this.logger.warn("Un membre avec ce numéro de téléphone existe déjà");
      return {
        error: "Erreur serveur",
        message: "Un membre avec ce numéro de téléphone existe déjà",
      };
    }

    if (photo) {
      photoFilename = await this.imageProcessingService.processImage(photo);
    }

    // Créer directement le membre sans utilisateur associé
    const member = this.memberRepository.create({
      nom: createMemberDto.nom,
      postNom: createMemberDto.postNom,
      prenom: createMemberDto.prenom,
      qualiteMembre: createMemberDto.qualiteMembre,
      province: createMemberDto.province,
      adresse: createMemberDto.adresse,
      telephone: createMemberDto.telephone,
      photo: photoFilename,
      isActive: true,
      user: null, // Pas d'utilisateur associé par défaut
    });
    

    try {
      const savedMember = await this.memberRepository.save(member);

      return savedMember;
    } catch (error) {
      this.logger.error("Error saving to database:", error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Member> {
    const member = await this.memberRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!member) {
      throw new NotFoundException(`Membre avec l'ID "${id}" non trouvé`);
    }
    return member;
  }

  async update(
    id: string,
    updateMemberDto: CreateMemberDto,
    photo?: Express.Multer.File
  ): Promise<Member> {
    const member = await this.findOne(id);
    let photoFilename = member.photo || "default.png";

    if (photo) {
      if (member.photo && member.photo !== "default.png") {
        try {
          await unlink(join(process.cwd(), "uploads", member.photo));
        } catch (error) {
          console.error("Error deleting old photo:", error);
        }
      }
      photoFilename = await this.imageProcessingService.processImage(photo);
    }

    // Mettre à jour directement les champs du membre
    Object.assign(member, {
      nom: updateMemberDto.nom,
      postNom: updateMemberDto.postNom,
      prenom: updateMemberDto.prenom,
      qualiteMembre: updateMemberDto.qualiteMembre,
      province: updateMemberDto.province,
      adresse: updateMemberDto.adresse,
      telephone: updateMemberDto.telephone,
      photo: photoFilename,
    });

    return await this.memberRepository.save(member);
  }

  async remove(id: string): Promise<void> {
    const member = await this.findOne(id);

    if (member.photo && member.photo !== "default.png") {
      try {
        await unlink(join(process.cwd(), "uploads", member.photo));
      } catch (error) {
        console.error("Error deleting photo:", error);
      }
    }

    const result = await this.memberRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Membre avec l'ID "${id}" non trouvé`);
    }
  }
}
