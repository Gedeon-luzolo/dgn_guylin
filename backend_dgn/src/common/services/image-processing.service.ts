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

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  private cleanFileName(filename: string): string {
    const name = filename
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");

    const ext = extname(filename);
    return `${name}${ext}`;
  }

  async processImage(file: {
    originalname: string;
    buffer: Buffer;
    mimetype: string;
  }): Promise<string> {
    const filename = this.cleanFileName(file.originalname);
    const filepath = path.join(this.uploadDir, filename);

    try {
      await sharp(file.buffer).resize({ width: 800 }).toFile(filepath);
      return filename;
    } catch (error) {
      throw new Error(`Erreur lors du traitement de l'image: ${error.message}`);
    }
  }
}
