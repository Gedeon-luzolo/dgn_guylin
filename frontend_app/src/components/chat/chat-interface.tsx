import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle, Bot } from "lucide-react";
import { useChat } from "../../hooks/useChat";
import { ChatMessage } from "./chat-message";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { toast } from "sonner";
import LoadingSpinner from "../loader/LoadingSpinner";

interface ChatInterfaceProps {
  initialSessionId?: string;
  className?: string;
}

export const ChatInterface = ({
  initialSessionId,
  className,
}: ChatInterfaceProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, error, isLoadingHistory, sendMessage, isSending } =
    useChat(initialSessionId);

  // Auto-scroll vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus sur l'input au chargement
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending) return;

    const messageToSend = inputMessage;
    setInputMessage("");

    try {
      await sendMessage(messageToSend);
      toast.success("Message envoyé !");
    } catch {
      toast.error("Erreur lors de l'envoi du message");
      setInputMessage(messageToSend); // Restaurer le message en cas d'erreur
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoadingHistory) {
    return (
      <Card
        className={`h-full flex items-center justify-center bg-gray-50/50 ${className}`}
      >
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />
          <div className="text-center">
            <h3 className="font-medium text-gray-800 mb-1">
              Initialisation de l'assistant
            </h3>
            <p className="text-gray-500 text-sm">
              Chargement de votre conversation...
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`flex flex-col h-full bg-transparent border-0 shadow-none overflow-hidden ${className}`}
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center h-full text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-6 p-4 bg-primary/10 rounded-full">
              <Bot className="w-8 h-8 text-primary" />
            </div>

            <h3 className="font-semibold text-xl mb-2 text-gray-900">
              Bonjour, je suis votre assistant DGN
            </h3>
            <p className="text-gray-600 text-sm max-w-sm">
              Je suis là pour vous aider. N'hésitez pas à me poser vos
              questions.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1}
              />
            ))}
          </AnimatePresence>
        )}

        <AnimatePresence>
          {isSending && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 p-3"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="flex space-x-1">
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0.2,
                  }}
                />
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0.3,
                  }}
                />
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0.4,
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-red-600 text-sm mb-3 p-3 bg-red-50 rounded-lg"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Écrivez votre message..."
            disabled={isSending}
            className="flex-1"
          />

          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isSending}
            size="icon"
            className="shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
