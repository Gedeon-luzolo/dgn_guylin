import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bot, Copy, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import type { ChatMessage as ChatMessageType } from "../../types/chatType";
import { Avatar } from "../ui/avatar";
import { cn } from "../../lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
  isLatest?: boolean;
}

export const ChatMessage = memo(({ message, isLatest }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);

  const formatTime = (date: Date) => {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: fr,
    });
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative flex flex-col gap-4 py-2",
        isLatest && "animate-pulse-once"
      )}
    >
      {/* Message utilisateur */}
      <div className="flex items-start gap-3 justify-end">
        <div className="flex flex-col items-end gap-1 max-w-[85%] md:max-w-[70%]">
          <div className="group/message">
            <div className="relative bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-br-sm">
              <p className="text-sm whitespace-pre-wrap">
                {message.userMessage}
              </p>

              <button
                onClick={() => handleCopy(message.userMessage)}
                className="absolute -top-2 -right-2 p-1.5 bg-white/10 hover:bg-white/20 rounded-full opacity-0 group-hover/message:opacity-100 transition-all"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-white" />
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 px-2 text-xs text-gray-500">
            <span>{formatTime(message.createdAt)}</span>
          </div>
        </div>

        <Avatar className="h-8 w-8 bg-primary/10">
          <User className="h-4 w-4 text-primary" />
        </Avatar>
      </div>

      {/* Réponse de l'IA */}
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 bg-primary/10">
          <Bot className="h-4 w-4 text-primary" />
        </Avatar>

        <div className="flex flex-col gap-1 max-w-[85%] md:max-w-[70%]">
          <div className="group/message">
            <div
              className={cn(
                "relative px-4 py-2 rounded-2xl rounded-bl-sm",
                message.isSuccessful
                  ? "bg-gray-100 text-gray-900"
                  : "bg-red-50 text-red-900"
              )}
            >
              <p className="text-sm whitespace-pre-wrap">
                {message.aiResponse}
              </p>

              <button
                onClick={() => handleCopy(message.aiResponse)}
                className="absolute -top-2 -left-2 p-1.5 bg-black/5 hover:bg-black/10 rounded-full opacity-0 group-hover/message:opacity-100 transition-all"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-gray-700" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-gray-700" />
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 px-2 text-xs text-gray-500">
            <span>{formatTime(message.createdAt)}</span>
            {message.isSuccessful ? (
              <span className="text-emerald-600">•</span>
            ) : (
              <span className="text-red-500">•</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ChatMessage.displayName = "ChatMessage";
