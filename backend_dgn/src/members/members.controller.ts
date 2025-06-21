import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { MembersService } from "./members.service";
import { CreateMemberDto } from "./dto/create-member.dto";
import { Member } from "./entities/member.entity";

@Controller("members")
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Member> {
    return this.membersService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateMemberDto: CreateMemberDto
  ): Promise<Member> {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.membersService.remove(id);
  }
}
