import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdhesionModule } from "./adhesion/adhesion.module";
import { MembersModule } from './members/members.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: "mysql",
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
    AdhesionModule,
    MembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
