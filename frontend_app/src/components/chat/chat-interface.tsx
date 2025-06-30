import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageSquare,
  AlertCircle,
  Sparkles,
  Brain,
  RefreshCw,
} from "lucide-react";
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
        className={`h-[600px] flex items-center justify-center backdrop-blur-xl bg-white/80 border border-white/20 shadow-2xl ${className}`}
      >
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <LoadingSpinner />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 justify-center">
              <Brain className="w-5 h-5 text-purple-600" />
              Initialisation de Guylin
            </h3>
            <p className="text-gray-600 text-sm">
              Préparation de votre assistant intelligent...
            </p>
          </div>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card
      className={`flex flex-col h-full bg-transparent border-0 shadow-none overflow-hidden ${className}`}
    >
      {/* Messages avec scrollbar personnalisée - Responsive optimisé */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 scroll-smooth">
        {messages.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center h-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MessageSquare className="w-10 h-10 text-gray-400" />
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            <h3 className="font-bold text-xl mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bonjour ! Je suis Guylin
            </h3>
            <p className="text-gray-600 text-sm max-w-sm leading-relaxed">
              Votre assistant intelligent DGN. Posez-moi une question et
              découvrez tout ce que je peux faire pour vous aider.
            </p>

            {/* Suggestions */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {["Qui êtes-vous ?", "Services DGN", "Comment adhérer ?"].map(
                (suggestion, i) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInputMessage(suggestion)}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 rounded-full text-xs font-medium border border-blue-200/50 hover:border-blue-300/70 transition-all backdrop-blur-sm"
                  >
                    {suggestion}
                  </motion.button>
                )
              )}
            </div>
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

        {/* Indicateur de frappe premium */}
        <AnimatePresence>
          {isSending && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="flex items-center gap-4 p-4"
            >
              <motion.div
                className="relative w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Brain className="w-6 h-6 text-white" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full -skew-x-12"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                />
              </motion.div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex space-x-1">
                    <motion.div
                      className="w-2 h-2 bg-purple-500 rounded-full animate-typing-dots"
                      style={{ animationDelay: "0ms" }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-pink-500 rounded-full animate-typing-dots"
                      style={{ animationDelay: "200ms" }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-rose-500 rounded-full animate-typing-dots"
                      style={{ animationDelay: "400ms" }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Guylin réfléchit
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Analyse en cours avec l'IA...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie responsive optimisée */}
      <motion.div
        className="p-3 md:p-4 bg-gradient-to-r from-gray-50/60 via-white/80 to-gray-50/60 backdrop-blur-sm"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-red-600 text-xs md:text-sm mb-3 p-2 md:p-3 bg-gradient-to-r from-red-50/80 to-rose-50/80 border border-red-200/50 rounded-lg md:rounded-xl backdrop-blur-sm"
          >
            <AlertCircle className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </motion.div>
        )}

        <div className="flex gap-2 md:gap-3">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Écrivez votre message à Guylin..."
              disabled={isSending}
              className="w-full pl-3 md:pl-4 pr-10 md:pr-12 py-2.5 md:py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg md:rounded-xl text-gray-800 placeholder-gray-500 focus:border-blue-400/70 focus:ring-2 md:focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 shadow-sm text-sm md:text-base"
            />
            <motion.div
              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2"
              animate={{ opacity: inputMessage.trim() ? 1 : 0.5 }}
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
            </motion.div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isSending}
              className="px-3 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/20"
            >
              {isSending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </motion.div>
              )}
              <span className="hidden md:inline ml-2 font-medium">Envoyer</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </Card>
  );
};
