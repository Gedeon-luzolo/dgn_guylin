import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsService } from "./news.service";
import { NewsController } from "./news.controller";
import { News, NewsImage } from "./entities/news.entity";
import { MembersModule } from "../members/members.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { existsSync, mkdirSync } from "fs";
import { ImageProcessingService } from "../../common/services/image-processing.service";

// Créer le dossier uploads/news s'il n'existe pas
const uploadDir = "./uploads/news";
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

@Module({
  imports: [
    TypeOrmModule.forFeature([News, NewsImage]),
    MembersModule,
    MulterModule.register({
      storage: diskStorage({
        destination: uploadDir,
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [NewsController],
  providers: [NewsService, ImageProcessingService],
  exports: [NewsService],
})
export class NewsModule {}
