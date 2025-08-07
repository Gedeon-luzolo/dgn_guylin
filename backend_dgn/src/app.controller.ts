import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { join } from "path";
import { existsSync } from "fs";

@Controller()
export class AppController {
  @Get()
  serveFrontend(@Res() res: Response) {
    const indexPath = join(__dirname, "..", "..", "frontend_app", "dist", "index.html");
    
    if (existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Frontend not built. Please run 'npm run build' in the frontend_app directory.");
    }
  }
}
