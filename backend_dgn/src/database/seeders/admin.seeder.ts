import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Member } from "../../modules/members/entities/member.entity";

@Injectable()
export class AdminSeeder {
  private readonly logger = new Logger(AdminSeeder.name);

  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>
  ) {}

  async seed() {
    // Vérifier si un admin existe déjà
    const adminExists = await this.memberRepository.findOne({
      where: { telephone: "admin@system.com" },
    });

    if (!adminExists) {
      const admin = this.memberRepository.create({
        nom: "Admin",
        postNom: "System",
        prenom: "Default",
        qualiteMembre: "ADMIN",
        province: "Kinshasa",
        adresse: "Système DGN",
        telephone: "admin@system.com",
        photo: "default.png",
      });

      await this.memberRepository.save(admin);
      this.logger.log("Admin member created successfully");
      return admin;
    } else {
      this.logger.log("Admin member already exists");
      return adminExists;
    }
  }

  async getDefaultAdmin(): Promise<Member> {
    const admin = await this.memberRepository.findOne({
      where: { telephone: "admin@system.com" },
    });

    if (!admin) {
      return this.seed();
    }

    return admin;
  }
}
