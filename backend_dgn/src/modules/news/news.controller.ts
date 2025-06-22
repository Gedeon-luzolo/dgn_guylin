import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseUUIDPipe,
  Query,
} from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "../../config/multer.config";

@Controller("api/news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("images", 10, multerConfig))
  async create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.newsService.create(createNewsDto, files);
  }

  @Get()
  findAll(@Query("category") category?: string) {
    if (category) {
      return this.newsService.findByCategory(category);
    }
    return this.newsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(":id")
  @UseInterceptors(FilesInterceptor("images", 10, multerConfig))
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.newsService.update(id, updateNewsDto, files);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.newsService.remove(id);
  }

  @Post(":id/like")
  incrementLikes(@Param("id", ParseUUIDPipe) id: string) {
    return this.newsService.incrementLikes(id);
  }

  @Post(":id/comment")
  incrementComments(@Param("id", ParseUUIDPipe) id: string) {
    return this.newsService.incrementComments(id);
  }
}
