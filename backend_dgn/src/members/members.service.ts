import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMemberDto } from "./dto/create-member.dto";
import { Member } from "./entities/member.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>
  ) {}

  async findAll(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.memberRepository.create(createMemberDto);
    return await this.memberRepository.save(member);
  }

  async findOne(id: string): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with ID "${id}" not found`);
    }
    return member;
  }

  async update(id: string, updateMemberDto: CreateMemberDto): Promise<Member> {
    const member = await this.findOne(id);
    Object.assign(member, updateMemberDto);
    return await this.memberRepository.save(member);
  }

  async remove(id: string): Promise<void> {
    const result = await this.memberRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Member with ID "${id}" not found`);
    }
  }
}
