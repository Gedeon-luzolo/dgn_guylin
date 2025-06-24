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
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { MembersService } from "./members.service";
import { CreateMemberDto } from "./dto/create-member.dto";
import { Member } from "./entities/member.entity";
import { PhotoFileInterceptor } from "src/common/interceptors/file.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "../../config/multer.config";
import { AdminSeeder } from "../../database/seeders/admin.seeder";

@Controller("api/members")
export class MembersController {
  constructor(
    private readonly membersService: MembersService,
    private readonly adminSeeder: AdminSeeder
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor("photo", multerConfig))
  create(
    @Body() createMemberDto: CreateMemberDto,
    @UploadedFile() photo?: Express.Multer.File
  ) {
    return this.membersService.create(createMemberDto, photo);
  }

  @Get()
  findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  @Get("admin/default")
  async getDefaultAdmin() {
    return this.adminSeeder.getDefaultAdmin();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Member> {
    return this.membersService.findOne(id);
  }

  @Put(":id")
  @UseInterceptors(PhotoFileInterceptor)
  update(
    @Param("id") id: string,
    @Body() updateMemberDto: CreateMemberDto,
    @UploadedFile() photo?: Express.Multer.File
  ): Promise<Member> {
    return this.membersService.update(id, updateMemberDto, photo);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.membersService.remove(id);
  }
}
