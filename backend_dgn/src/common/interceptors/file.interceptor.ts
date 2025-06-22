import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "../../config/multer.config";

export const PhotoFileInterceptor = FileInterceptor("photo", multerConfig);
