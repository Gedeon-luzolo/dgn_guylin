import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { News, NewsImage } from "./entities/news.entity";
import { MembersModule } from "../members/members.module";
import { ImageProcessingService } from "../../common/services/image-processing.service";

@Module({
  imports: [TypeOrmModule.forFeature([News, NewsImage]), MembersModule],
  controllers: [NewsController],
  providers: [NewsService, ImageProcessingService],
  exports: [NewsService],
})
export class NewsModule {}
