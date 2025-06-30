import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bot,
  CheckCircle,
  XCircle,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
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
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      }}
      className={cn(
        "group relative flex flex-col gap-6 p-2 md:p-4",
        isLatest && "animate-pulse-glow"
      )}
    >
      {/* Message utilisateur */}
      <motion.div
        className="flex items-end gap-3 justify-end"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col items-end max-w-[85%] md:max-w-[70%]">
          <motion.div
            className="relative group/message"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Glassmorphisme overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl rounded-br-md pointer-events-none" />

              {/* Contenu */}
              <p className="relative text-sm md:text-base font-medium leading-relaxed tracking-wide whitespace-pre-wrap">
                {message.userMessage}
              </p>

              {/* Bouton copier (hover) */}
              <motion.button
                onClick={() => handleCopy(message.userMessage)}
                className="absolute -top-2 -right-2 w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover/message:opacity-100 transition-opacity hover:bg-white/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <Check className="w-3 h-3 text-green-200" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="w-3 h-3 text-white/70" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>

          {/* Métadonnées utilisateur */}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span className="font-medium">Vous</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <span>{formatTime(message.createdAt)}</span>
          </div>
        </div>

        {/* Avatar utilisateur avec glassmorphisme */}
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative">
          <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg ring-2 ring-white/20">
            <User className="w-5 h-5 text-white drop-shadow-sm" />
          </Avatar>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm" />
        </motion.div>
      </motion.div>

      {/* Réponse de l'IA avec design premium */}
      <motion.div
        className="flex items-end gap-3"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Avatar IA avec effet brillant */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          className="relative"
        >
          <Avatar className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 shadow-lg ring-2 ring-white/20 relative overflow-hidden">
            <Bot className="w-5 h-5 text-white drop-shadow-sm z-10" />
            {/* Effet brillant animé */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </Avatar>

          {/* Indicateur d'activité avec pulsation */}
          <motion.div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow-sm"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Particules flottantes */}
          <Sparkles className="absolute -top-1 -left-1 w-3 h-3 text-yellow-400 animate-pulse" />
        </motion.div>

        <div className="flex flex-col max-w-[85%] md:max-w-[70%]">
          <motion.div
            className="relative group/ai-message"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div
              className={cn(
                "relative px-4 py-3 rounded-2xl rounded-bl-md shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm",
                message.isSuccessful
                  ? "bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 border border-gray-200/50 text-gray-800"
                  : "bg-gradient-to-br from-red-50/80 via-red-25/90 to-red-50/80 border border-red-200/60 text-red-800"
              )}
            >
              {/* Glassmorphisme overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-2xl rounded-bl-md pointer-events-none" />

              {/* Contenu avec typographie premium */}
              <p className="relative text-sm md:text-base font-medium leading-relaxed tracking-wide whitespace-pre-wrap">
                {message.aiResponse}
              </p>

              {/* Bouton copier (hover) */}
              <motion.button
                onClick={() => handleCopy(message.aiResponse)}
                className="absolute -top-2 -left-2 w-7 h-7 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover/ai-message:opacity-100 transition-opacity hover:bg-white/80 shadow-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <Check className="w-3 h-3 text-green-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="w-3 h-3 text-gray-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>

          {/* Métadonnées IA avec indicateurs de statut élégants */}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1">
              <Bot className="w-3 h-3" />
              <span className="font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Guylin AI
              </span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <span>{formatTime(message.createdAt)}</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />

            {/* Indicateur de statut avec animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1"
            >
              {message.isSuccessful ? (
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="flex items-center gap-1 text-emerald-600"
                >
                  <CheckCircle className="w-3 h-3" />
                  <span className="font-medium">Réussi</span>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="flex items-center gap-1 text-red-500"
                >
                  <XCircle className="w-3 h-3" />
                  <span className="font-medium">Erreur</span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

ChatMessage.displayName = "ChatMessage";
