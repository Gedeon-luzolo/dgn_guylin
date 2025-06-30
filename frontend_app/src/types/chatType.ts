export interface ChatMessage {
  id: number;
  userMessage: string;
  aiResponse: string;
  sessionId: string;
  responseTime: number;
  isSuccessful: boolean;
  createdAt: Date;
}

export interface CreateChatMessageDto {
  userMessage: string;
  sessionId?: string;
}

export interface ChatResponseDto {
  id: number;
  userMessage: string;
  aiResponse: string;
  sessionId: string;
  responseTime: number;
  isSuccessful: boolean;
  createdAt: Date;
}

export interface ChatSession {
  sessionId: string;
  lastMessage: string;
  lastActivity: Date;
  messageCount: number;
}

export interface ChatStatistics {
  totalMessages: number;
  successfulResponses: number;
  averageResponseTime: number;
  activeSessions: number;
}

export interface ChatApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  error?: string;
}

export interface ChatStreamMessage {
  content: string;
  isComplete: boolean;
  sessionId: string;
}

export interface ChatState {
  messages: ChatMessage[];
  currentSessionId: string;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
}
