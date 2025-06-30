import { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import type {
  ChatMessage,
  CreateChatMessageDto,
  ChatApiResponse,
  ChatResponseDto,
  ChatState,
} from "../types/chatType";

const API_BASE_URL = "http://localhost:3000/api/chat";

// Type pour les sessions de chat
export interface ChatSession {
  id: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  messageCount: number;
  title?: string;
}

export const useChat = (initialSessionId?: string) => {
  const queryClient = useQueryClient();
  const [state, setState] = useState<ChatState>({
    messages: [],
    currentSessionId: initialSessionId || uuidv4(),
    isLoading: false,
    error: null,
    isConnected: true,
  });

  // Récupérer l'historique du chat pour la session actuelle
  const { data: chatHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["chatHistory", state.currentSessionId],
    queryFn: async (): Promise<ChatMessage[]> => {
      const response = await axios.get<ChatApiResponse<ChatResponseDto[]>>(
        `${API_BASE_URL}/history/${state.currentSessionId}`
      );
      return response.data.data.map((msg) => ({
        ...msg,
        createdAt: new Date(msg.createdAt),
      }));
    },
    enabled: !!state.currentSessionId,
  });

  // Mutation pour envoyer un message
  const sendMessageMutation = useMutation({
    mutationFn: async (
      messageData: CreateChatMessageDto
    ): Promise<ChatResponseDto> => {
      const response = await axios.post<ChatApiResponse<ChatResponseDto>>(
        `${API_BASE_URL}/message`,
        messageData
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      const newMessage: ChatMessage = {
        ...data,
        createdAt: new Date(data.createdAt),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        isLoading: false,
        error: null,
      }));

      // Invalidate et refetch l'historique
      queryClient.invalidateQueries({
        queryKey: ["chatHistory", state.currentSessionId],
      });
    },
    onError: (error) => {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de l'envoi du message",
      }));
    },
  });

  // Mutation pour effacer l'historique
  const clearHistoryMutation = useMutation({
    mutationFn: async (sessionId: string): Promise<void> => {
      await axios.delete(`${API_BASE_URL}/history/${sessionId}`);
    },
    onSuccess: () => {
      setState((prev) => ({
        ...prev,
        messages: [],
        error: null,
      }));
      queryClient.invalidateQueries({
        queryKey: ["chatHistory", state.currentSessionId],
      });
    },
  });

  // Mettre à jour les messages quand l'historique est récupéré
  useEffect(() => {
    if (chatHistory) {
      setState((prev) => ({
        ...prev,
        messages: chatHistory,
      }));
    }
  }, [chatHistory]);

  // Fonction pour envoyer un message
  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim()) return;

      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        await sendMessageMutation.mutateAsync({
          userMessage: userMessage.trim(),
          sessionId: state.currentSessionId,
        });
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
      }
    },
    [state.currentSessionId, sendMessageMutation]
  );

  // Fonction pour démarrer une nouvelle session
  const startNewSession = useCallback(() => {
    const newSessionId = uuidv4();
    setState((prev) => ({
      ...prev,
      currentSessionId: newSessionId,
      messages: [],
      error: null,
    }));
    queryClient.invalidateQueries({ queryKey: ["chatHistory", newSessionId] });
  }, [queryClient]);

  // Fonction pour effacer l'historique de la session actuelle
  const clearHistory = useCallback(async () => {
    try {
      await clearHistoryMutation.mutateAsync(state.currentSessionId);
    } catch (error) {
      console.error("Erreur lors de l'effacement:", error);
    }
  }, [state.currentSessionId, clearHistoryMutation]);

  // Fonction pour changer de session
  const switchToSession = useCallback((sessionId: string) => {
    setState((prev) => ({
      ...prev,
      currentSessionId: sessionId,
      messages: [],
      error: null,
    }));
  }, []);

  return {
    // État
    messages: state.messages,
    currentSessionId: state.currentSessionId,
    isLoading: state.isLoading || sendMessageMutation.isPending,
    error: state.error,
    isConnected: state.isConnected,
    isLoadingHistory,

    // Actions
    sendMessage,
    startNewSession,
    clearHistory,
    switchToSession,

    // Statuts des mutations
    isSending: sendMessageMutation.isPending,
    isClearing: clearHistoryMutation.isPending,
  };
};

// Hook pour récupérer toutes les sessions de chat
export const useChatSessions = () => {
  return useQuery({
    queryKey: ["chatSessions"],
    queryFn: async (): Promise<ChatSession[]> => {
      try {
        const response = await axios.get<ChatApiResponse<ChatSession[]>>(
          `${API_BASE_URL}/sessions`
        );
        return response.data.data.map((session) => ({
          ...session,
          lastMessageAt: session.lastMessageAt
            ? new Date(session.lastMessageAt)
            : undefined,
        }));
      } catch (error) {
        // Si l'endpoint n'existe pas encore, on retourne un tableau vide
        console.warn("Sessions endpoint not available:", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook pour récupérer les statistiques du chat
export const useChatStatistics = () => {
  return useQuery({
    queryKey: ["chatStatistics"],
    queryFn: async (): Promise<{
      totalMessages: number;
      successfulResponses: number;
      averageResponseTime: number;
      activeSessions: number;
    }> => {
      const response = await axios.get<
        ChatApiResponse<{
          totalMessages: number;
          successfulResponses: number;
          averageResponseTime: number;
          activeSessions: number;
        }>
      >(`${API_BASE_URL}/statistics`);
      return response.data.data;
    },
    refetchInterval: 30000, // Refetch toutes les 30 secondes
  });
};

// Hook pour vérifier l'état du service
export const useChatHealth = () => {
  return useQuery({
    queryKey: ["chatHealth"],
    queryFn: async (): Promise<{
      aiServiceAvailable: boolean;
    }> => {
      const response = await axios.get<
        ChatApiResponse<{
          aiServiceAvailable: boolean;
        }>
      >(`${API_BASE_URL}/health`);
      return response.data.data;
    },
    refetchInterval: 10000, // Refetch toutes les 10 secondes
    retry: 3,
  });
};
