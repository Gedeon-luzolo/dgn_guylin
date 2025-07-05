import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateMemberDto } from "./dto/create-member.dto";
import { Member } from "./entities/member.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { unlink } from "fs/promises";
import { join } from "path";
import { ImageProcessingService } from "src/common/services/image-processing.service";
import { User } from "../users/entities/user.entity";
import { UserData } from "../users/entities/user.interface";

@Injectable()
export class MembersService {
  private readonly logger = new Logger(MembersService.name);
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly imageProcessingService: ImageProcessingService
  ) {}

  async findAll(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

  async create(createMemberDto: CreateMemberDto, photo?: Express.Multer.File) {
    let photoFilename = "default.png";

    const existingUser = await this.userRepository.findOne({
      where: { telephone: createMemberDto.telephone },
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
      nom: createMemberDto.nom,
      postNom: createMemberDto.postNom,
      prenom: createMemberDto.prenom,
      telephone: createMemberDto.telephone,
      photo: photoFilename,
      genre: createMemberDto.genre,
    };

    const user = this.userRepository.create(userDto);
    const savedUser = await this.userRepository.save(user);

    const member = this.memberRepository.create({
      user: savedUser,
      qualiteMembre: createMemberDto.qualiteMembre,
      province: createMemberDto.province,
      adresse: createMemberDto.adresse,
      isActive: true,
    });

    return await this.memberRepository.save(member);
  }

  async findOne(id: string): Promise<Member> {
    const member = await this.memberRepository.findOne({
      where: { id },
      relations: ["user"],
    });
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
    let photoFilename = member.user.photo;

    if (photo) {
      if (member.user.photo && member.user.photo !== "default.png") {
        try {
          await unlink(join(process.cwd(), "uploads", member.user.photo));
        } catch (error) {
          console.error("Error deleting old photo:", error);
        }
      }
      photoFilename = await this.imageProcessingService.processImage(photo);
    }

    const userUpdateDto: UserData = {
      nom: updateMemberDto.nom,
      postNom: updateMemberDto.postNom,
      prenom: updateMemberDto.prenom,
      telephone: updateMemberDto.telephone,
      photo: photoFilename,
      genre: updateMemberDto.genre,
    };

    Object.assign(member.user, userUpdateDto);
    await this.userRepository.save(member.user);

    Object.assign(member, {
      qualiteMembre: updateMemberDto.qualiteMembre,
      province: updateMemberDto.province,
      adresse: updateMemberDto.adresse,
    });

    return await this.memberRepository.save(member);
  }

  async remove(id: string): Promise<void> {
    const member = await this.findOne(id);

    if (member.user.photo && member.user.photo !== "default.png") {
      try {
        await unlink(join(process.cwd(), "uploads", member.user.photo));
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
