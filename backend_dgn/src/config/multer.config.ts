/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { memoryStorage } from "multer";
import { Request } from "express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export const multerConfig: MulterOptions = {
  storage: memoryStorage(),

  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void
  ) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      return callback(new Error("Only image files are allowed!"), false);
    }
    callback(null, true);
  },

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
};
