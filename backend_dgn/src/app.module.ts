import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { NewsModule } from "./modules/news/news.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { MembersModule } from "./modules/members/members.module";
import { ChatModule } from "./modules/chat/chat.module";
import { SeederModule } from "./database/seeders/seeder.module";
import { AdminSeeder } from "./database/seeders/admin.seeder";
import { AgentsModule } from "./modules/agents/agents.module";
import { ContributionsModule } from "./modules/contributions/contributions.module";

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
          // logging: ,
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
    SeederModule,
    MembersModule,
    ChatModule,
    NewsModule,
    AgentsModule,
    ContributionsModule,
  ],
  controllers: [AppController],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private adminSeeder: AdminSeeder) {}

  async onApplicationBootstrap() {
    try {
      await this.adminSeeder.seed();
      console.log("✅ Database seeding completed successfully");
    } catch (error) {
      console.error("❌ Database seeding failed:", error);
    }
  }
}
