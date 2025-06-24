import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as compression from "compression";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ["log", "error", "warn", "debug", "verbose"],
  });

  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
        target: false,
      },
    })
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log("Application is running on: http://localhost:3000");
}
bootstrap();
