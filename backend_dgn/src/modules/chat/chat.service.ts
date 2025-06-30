import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatMessage } from "./entities/chat-message.entity";
import { CreateChatMessageDto, ChatResponseDto } from "./dto/chat-message.dto";
import { AiChatService } from "./services/ai-chat.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
    private readonly aiChatService: AiChatService
  ) {}

  async sendMessage(
    createChatMessageDto: CreateChatMessageDto
  ): Promise<ChatResponseDto> {
    const startTime = Date.now();
    let isSuccessful = false;
    let aiResponse = "";

    try {
      // Générer un sessionId si non fourni
      const sessionId = createChatMessageDto.sessionId || uuidv4();

      // Obtenir le contexte des messages précédents pour cette session
      const context = await this.getSessionContext(sessionId);

      // Générer la réponse IA
      aiResponse = await this.aiChatService.generateResponse(
        createChatMessageDto.userMessage,
        context
      );

      isSuccessful = true;
    } catch (error) {
      this.logger.error(
        `Erreur lors de la génération de la réponse: ${error.message}`
      );
      aiResponse =
        "Je suis désolé, je rencontre des difficultés techniques. Veuillez réessayer.";
    }

    const responseTime = Date.now() - startTime;

    // Sauvegarder le message et la réponse en base
    const chatMessage = this.chatMessageRepository.create({
      userMessage: createChatMessageDto.userMessage,
      aiResponse,
      sessionId: createChatMessageDto.sessionId || uuidv4(),
      responseTime,
      isSuccessful,
    });

    const savedMessage = await this.chatMessageRepository.save(chatMessage);

    return {
      id: savedMessage.id,
      userMessage: savedMessage.userMessage,
      aiResponse: savedMessage.aiResponse,
      sessionId: savedMessage.sessionId,
      responseTime: savedMessage.responseTime,
      isSuccessful: savedMessage.isSuccessful,
      createdAt: savedMessage.createdAt,
    };
  }

  async getChatHistory(
    sessionId: string,
    limit: number = 50
  ): Promise<ChatResponseDto[]> {
    const messages = await this.chatMessageRepository.find({
      where: { sessionId },
      order: { createdAt: "ASC" },
      take: limit,
    });

    return messages.map((message) => ({
      id: message.id,
      userMessage: message.userMessage,
      aiResponse: message.aiResponse,
      sessionId: message.sessionId,
      responseTime: message.responseTime,
      isSuccessful: message.isSuccessful,
      createdAt: message.createdAt,
    }));
  }

  async clearChatHistory(sessionId: string): Promise<void> {
    await this.chatMessageRepository.delete({ sessionId });
    this.logger.log(
      `Historique du chat supprimé pour la session: ${sessionId}`
    );
  }

  async getChatStatistics(): Promise<{
    totalMessages: number;
    successfulResponses: number;
    averageResponseTime: number;
    activeSessions: number;
  }> {
    const totalMessages = await this.chatMessageRepository.count();
    const successfulResponses = await this.chatMessageRepository.count({
      where: { isSuccessful: true },
    });

    const avgResponse = await this.chatMessageRepository
      .createQueryBuilder("message")
      .select("AVG(message.responseTime)", "avg")
      .getRawOne();

    const activeSessions = await this.chatMessageRepository
      .createQueryBuilder("message")
      .select("COUNT(DISTINCT message.sessionId)", "count")
      .where("message.createdAt > :date", {
        date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Dernières 24h
      })
      .getRawOne();

    return {
      totalMessages,
      successfulResponses,
      averageResponseTime: Math.round(avgResponse?.avg || 0),
      activeSessions: parseInt(activeSessions?.count || "0"),
    };
  }

  async isAiServiceAvailable(): Promise<boolean> {
    return this.aiChatService.isServiceAvailable();
  }

  private async getSessionContext(sessionId: string): Promise<string> {
    // Récupérer les 5 derniers messages de la session pour le contexte
    const recentMessages = await this.chatMessageRepository.find({
      where: { sessionId },
      order: { createdAt: "DESC" },
      take: 5,
    });

    if (recentMessages.length === 0) {
      return "";
    }

    // Construire le contexte avec les messages précédents
    const contextParts = recentMessages
      .reverse() // Remettre dans l'ordre chronologique
      .map((msg) => `User: ${msg.userMessage}\nAI: ${msg.aiResponse}`)
      .join("\n");

    return contextParts;
  }

  async getRecentSessions(limit: number = 10): Promise<
    {
      sessionId: string;
      lastMessage: string;
      lastActivity: Date;
      messageCount: number;
    }[]
  > {
    const sessions = await this.chatMessageRepository
      .createQueryBuilder("message")
      .select([
        "message.sessionId as sessionId",
        "MAX(message.createdAt) as lastActivity",
        "COUNT(*) as messageCount",
      ])
      .addSelect(
        'SUBSTRING(MAX(CONCAT(message.createdAt, "|||", message.userMessage)), 20)',
        "lastMessage"
      )
      .groupBy("message.sessionId")
      .orderBy("lastActivity", "DESC")
      .limit(limit)
      .getRawMany();

    return sessions.map((session) => ({
      sessionId: session.sessionId,
      lastMessage: session.lastMessage || "",
      lastActivity: new Date(session.lastActivity),
      messageCount: parseInt(session.messageCount),
    }));
  }
}
