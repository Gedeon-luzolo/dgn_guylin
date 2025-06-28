import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NewsModule } from "./modules/news/news.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AdhesionModule } from "./modules/adhesion/adhesion.module";
import { MembersModule } from "./modules/members/members.module";
import { SeederModule } from "./database/seeders/seeder.module";
import { AdminSeeder } from "./database/seeders/admin.seeder";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          host: configService.get<string>("DB_HOST"),
          port: configService.get<number>("DB_PORT"),
          username: configService.get<string>("DB_USERNAME"),
          password: configService.get<string>("DB_PASSWORD"),
          database: configService.get<string>("DB_NAME"),
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          logging: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),
    SeederModule,
    AdhesionModule,
    SeederModule,
    MembersModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private adminSeeder: AdminSeeder) {}

  async onApplicationBootstrap() {
    await this.adminSeeder.seed();
  }
}
