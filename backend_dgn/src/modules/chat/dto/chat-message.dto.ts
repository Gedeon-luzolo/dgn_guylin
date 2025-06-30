import { IsString, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateChatMessageDto {
  @IsString({ message: "Le message doit être une chaîne de caractères" })
  @IsNotEmpty({ message: "Le message ne peut pas être vide" })
  @MaxLength(1000, {
    message: "Le message ne peut pas dépasser 1000 caractères",
  })
  readonly userMessage: string;

  @IsOptional()
  @IsString()
  readonly sessionId?: string;
}

export class ChatResponseDto {
  readonly id: number;
  readonly userMessage: string;
  readonly aiResponse: string;
  readonly sessionId: string;
  readonly responseTime: number;
  readonly isSuccessful: boolean;
  readonly createdAt: Date;
}

export class ChatStreamDto {
  readonly content: string;
  readonly isComplete: boolean;
  readonly sessionId: string;
}
