import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { News, NewsImage } from "./entities/news.entity";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { MembersService } from "../members/members.service";
import { ImageProcessingService } from "../../common/services/image-processing.service";
import { unlink } from "fs/promises";
import { join } from "path";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(NewsImage)
    private newsImageRepository: Repository<NewsImage>,
    private membersService: MembersService,
    private imageProcessingService: ImageProcessingService
  ) {}

  async create(
    createNewsDto: CreateNewsDto,
    files?: Express.Multer.File[]
  ): Promise<News> {
    console.log("Creating news with:", {
      dto: createNewsDto,
      filesCount: files?.length || 0,
      files: files?.map((f) => ({ name: f.originalname, size: f.size })),
    });

    const author = await this.membersService.findOne(createNewsDto.authorId);

    const news = this.newsRepository.create({
      title: createNewsDto.title,
      content: createNewsDto.content,
      category: createNewsDto.category,
      author,
    });

    console.log("News entity created:", news);

    // Traiter les images si présentes
    if (files && files.length > 0) {
      console.log("Processing images...");
      try {
        const processedImages = await Promise.all(
          files.map(async (file, index) => {
            console.log(`Processing image ${index + 1}:`, file.originalname);
            const filename =
              await this.imageProcessingService.processImage(file);
            console.log(`Image processed, filename:`, filename);

            const newsImage = this.newsImageRepository.create({
              url: filename,
              alt: file.originalname,
              caption: createNewsDto.captions?.[index] || "",
              isMain: index === (createNewsDto.mainImageIndex || 0),
            });

            console.log("News image entity created:", newsImage);
            return newsImage;
          })
        );

        console.log("All images processed:", processedImages);
        news.images = processedImages;
      } catch (error) {
        console.error("Error processing images:", error);
        throw error;
      }
    } else {
      console.log("No images to process");
    }

    console.log("Saving news to database...");
    const savedNews = await this.newsRepository.save(news);
    console.log("News saved successfully:", savedNews);

    return savedNews;
  }

  async findAll(): Promise<News[]> {
    return this.newsRepository.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findOne(id: string): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ["images", "author"],
    });

    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    return news;
  }

  async update(
    id: string,
    updateNewsDto: UpdateNewsDto,
    files?: Express.Multer.File[]
  ): Promise<News> {
    const news = await this.findOne(id);

    if (updateNewsDto.authorId) {
      const author = await this.membersService.findOne(updateNewsDto.authorId);
      if (!author) {
        throw new NotFoundException(
          `Author with ID ${updateNewsDto.authorId} not found`
        );
      }
      news.author = author;
    }

    // Mise à jour des images si nécessaire
    if (files && files.length > 0) {
      // Supprimer les anciennes images
      for (const image of news.images) {
        try {
          await unlink(join(process.cwd(), "uploads", image.url));
        } catch (error) {
          console.error(`Error deleting image ${image.url}:`, error);
        }
      }
      await this.newsImageRepository.delete({ news: { id } });

      // Traiter et sauvegarder les nouvelles images
      const processedImages = await Promise.all(
        files.map(async (file, index) => {
          const filename = await this.imageProcessingService.processImage(file);
          return this.newsImageRepository.create({
            url: filename,
            alt: file.originalname,
            caption: "",
            isMain: index === 0,
            news,
          });
        })
      );
      news.images = processedImages;
    }

    // Mettre à jour les autres champs
    Object.assign(news, updateNewsDto);

    return this.newsRepository.save(news);
  }

  async remove(id: string): Promise<void> {
    const news = await this.findOne(id);

    // Supprimer les fichiers d'images
    for (const image of news.images) {
      try {
        await unlink(join(process.cwd(), "uploads", image.url));
      } catch (error) {
        console.error(`Error deleting image ${image.url}:`, error);
      }
    }

    await this.newsRepository.remove(news);
  }

  async incrementLikes(id: string): Promise<News> {
    const news = await this.findOne(id);
    news.likes += 1;
    return this.newsRepository.save(news);
  }

  async incrementComments(id: string): Promise<News> {
    const news = await this.findOne(id);
    news.commentsCount += 1;
    return this.newsRepository.save(news);
  }

  async findByCategory(category: string): Promise<News[]> {
    return this.newsRepository.find({
      where: { category },
      order: {
        createdAt: "DESC",
      },
    });
  }
}
