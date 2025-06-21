import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Member } from "../members/entities/member.entity";

@Injectable()
export class AdhesionService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>
  ) {}
}
