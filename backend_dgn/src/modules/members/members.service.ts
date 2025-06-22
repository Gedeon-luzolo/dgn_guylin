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

    const existingMember = await this.memberRepository.findOne({
      where: { telephone: createMemberDto.telephone },
    });

    if (existingMember) {
      return {
        error: "Erreur serveur",
        message: "Une erreur est survenue lors de la création du membre",
      };
    }

    if (photo) {
      photoFilename = await this.imageProcessingService.processImage(photo);
    }

    const member = this.memberRepository.create({
      ...createMemberDto,
      photo: photoFilename,
    });
    return await this.memberRepository.save(member);
  }

  async findOne(id: string): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with ID "${id}" not found`);
    }
    return member;
  }

  async update(
    id: string,
    updateMemberDto: CreateMemberDto,
    photo?: Express.Multer.File
  ): Promise<Member> {
    const member = await this.findOne(id);

    if (photo) {
      // Supprimer l'ancienne photo si elle existe et n'est pas default.png
      if (member.photo && member.photo !== "default.png") {
        try {
          await unlink(join(process.cwd(), "uploads", member.photo));
        } catch (error) {
          console.error("Error deleting old photo:", error);
        }
      }

      const photoFilename =
        await this.imageProcessingService.processImage(photo);
      Object.assign(member, {
        ...updateMemberDto,
        photo: photoFilename,
      });
    } else {
      Object.assign(member, updateMemberDto);
    }

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
      throw new NotFoundException(`Member with ID "${id}" not found`);
    }
  }
}
