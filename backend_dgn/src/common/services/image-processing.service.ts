/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Injectable } from "@nestjs/common";
import { extname } from "path";
import * as sharp from "sharp";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class ImageProcessingService {
  private readonly uploadDir = "uploads";
  private readonly newsDir = "uploads/news";

  constructor() {
    // Créer les dossiers nécessaires
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
    if (!fs.existsSync(this.newsDir)) {
      fs.mkdirSync(this.newsDir, { recursive: true });
    }
  }

  private generateUniqueFileName(originalName: string): string {
    const ext = extname(originalName);
    const baseName = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");

    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1e9);

    return `${baseName}-${timestamp}-${random}${ext}`;
  }

  async processImage(file: {
    originalname: string;
    buffer: Buffer;
    mimetype: string;
  }): Promise<string> {
    const filename = this.generateUniqueFileName(file.originalname);
    const filepath = path.join(this.newsDir, filename);

    try {
      await sharp(file.buffer)
        .resize({ width: 800, withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(filepath);

      return `news/${filename}`;
    } catch (error) {
      throw new Error(`Erreur lors du traitement de l'image: ${error.message}`);
    }
  }
}
