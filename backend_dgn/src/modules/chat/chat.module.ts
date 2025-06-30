import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { AiChatService } from "./services/ai-chat.service";
import { ChatMessage } from "./entities/chat-message.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage]), ConfigModule, HttpModule],
  controllers: [ChatController],
  providers: [ChatService, AiChatService],
  exports: [ChatService, AiChatService],
})
export class ChatModule {}
