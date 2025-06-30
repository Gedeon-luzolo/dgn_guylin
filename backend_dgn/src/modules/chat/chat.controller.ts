import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { CreateChatMessageDto, ChatResponseDto } from "./dto/chat-message.dto";

@Controller("api/chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("message")
  async sendMessage(
    @Body() createChatMessageDto: CreateChatMessageDto
  ): Promise<{
    success: boolean;
    data: ChatResponseDto;
    message: string;
  }> {
    try {
      const response = await this.chatService.sendMessage(createChatMessageDto);

      return {
        success: true,
        data: response,
        message: "Message envoyé avec succès",
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Erreur lors de l'envoi du message",
          error: error instanceof Error ? error.message : "Erreur inconnue",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("history/:sessionId")
  async getChatHistory(
    @Param("sessionId") sessionId: string,
    @Query("limit") limit?: string
  ): Promise<{
    success: boolean;
    data: ChatResponseDto[];
    message: string;
  }> {
    try {
      const limitNumber = limit ? parseInt(limit, 10) : 50;
      const history = await this.chatService.getChatHistory(
        sessionId,
        limitNumber
      );

      return {
        success: true,
        data: history,
        message: "Historique récupéré avec succès",
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Erreur lors de la récupération de l'historique",
          error: error instanceof Error ? error.message : "Erreur inconnue",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("history/:sessionId")
  async clearChatHistory(@Param("sessionId") sessionId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      await this.chatService.clearChatHistory(sessionId);

      return {
        success: true,
        message: "Historique supprimé avec succès",
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Erreur lors de la suppression de l'historique",
          error: error instanceof Error ? error.message : "Erreur inconnue",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("sessions")
  async getRecentSessions(@Query("limit") limit?: string): Promise<{
    success: boolean;
    data: Array<{
      sessionId: string;
      lastMessage: string;
      lastActivity: Date;
      messageCount: number;
    }>;
    message: string;
  }> {
    try {
      const limitNumber = limit ? parseInt(limit, 10) : 10;
      const sessions = await this.chatService.getRecentSessions(limitNumber);

      return {
        success: true,
        data: sessions,
        message: "Sessions récupérées avec succès",
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Erreur lors de la récupération des sessions",
          error: error instanceof Error ? error.message : "Erreur inconnue",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("statistics")
  async getChatStatistics(): Promise<{
    success: boolean;
    data: {
      totalMessages: number;
      successfulResponses: number;
      averageResponseTime: number;
      activeSessions: number;
    };
    message: string;
  }> {
    try {
      const stats = await this.chatService.getChatStatistics();

      return {
        success: true,
        data: stats,
        message: "Statistiques récupérées avec succès",
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Erreur lors de la récupération des statistiques",
          error: error instanceof Error ? error.message : "Erreur inconnue",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("health")
  async checkHealth(): Promise<{
    success: boolean;
    data: { aiServiceAvailable: boolean };
    message: string;
  }> {
    try {
      const aiServiceAvailable = await this.chatService.isAiServiceAvailable();

      return {
        success: true,
        data: { aiServiceAvailable },
        message: "Service de chat opérationnel",
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: "Erreur lors de la vérification du service",
          error: error instanceof Error ? error.message : "Erreur inconnue",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
