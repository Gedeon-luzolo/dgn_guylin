import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { MessageSquare, X, Sparkles, Zap, Brain } from "lucide-react";
import { ChatInterface } from "./chat-interface";
import { Button } from "../ui/button";

export const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const buttonVariants: Variants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: { scale: 0.95 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      {/* Bouton flottant */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100]"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.5 } }}
            whileTap="tap"
            whileHover="hover"
          >
            <Button
              onClick={toggleChat}
              className={`
            relative w-14 h-14 md:w-16 md:h-16 rounded-full 
            bg-gradient-to-br from-blue-600/90 via-purple-600/90  to-rose-500/90
            backdrop-blur-2xl border border-white/30
            shadow-2xl hover:shadow-3xl
            transition-all duration-500 ease-out
            group overflow-hidden
            before:absolute before:inset-0 before:rounded-full
            before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-white/10
            before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300
            animate-gradient-flow
          `}
              size="icon"
            >
              {/* Effet holographique animé */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Particules flottantes */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="absolute top-1 left-2 w-2 h-2 text-yellow-300 animate-pulse" />
                <Zap className="absolute bottom-1 right-2 w-2 h-2 text-blue-300 animate-ping" />
                <Brain className="absolute top-2 right-1 w-2 h-2 text-purple-300 animate-pulse" />
              </motion.div>

              {/* Icône principale avec effet morphing */}
              <motion.div
                className="relative z-10 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <MessageSquare className="w-6 h-6 md:w-7 md:h-7 text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
              </motion.div>

              {/* Indicateur de pulsation */}
              <motion.div
                className="absolute -inset-1 rounded-full border-2 border-white/20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/25 backdrop-blur-sm z-[90]"
              onClick={toggleChat}
            />

            {/* Modal principal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`
                fixed z-[95] bg-white shadow-2xl
                ${
                  isMobile
                    ? `inset-x-2 bottom-2 top-16 ${
                        isMinimized ? "h-14 top-auto" : ""
                      }`
                    : `bottom-10 right-4 md:right-6 w-[90vw] sm:w-[400px] 
                       ${isMinimized ? "h-16 w-72" : "h-[600px]"}`
                }
                rounded-2xl overflow-hidden border border-gray-100
              `}
            >
              {/* En-tête premium responsive avec glassmorphisme avancé */}
              <motion.div
                className="relative flex items-center justify-between p-3 md:p-4 border-b bg-white"
                layout
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <motion.div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-600 flex items-center justify-center shadow-xl relative overflow-hidden"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <Brain className="w-5 h-5 md:w-6 md:h-6 text-white z-10" />
                      {/* Effet brillant */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                        animate={{ x: ["-200%", "200%"] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                    </motion.div>

                    {/* Indicateur de statut avec animation */}
                    <motion.div
                      className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-3 h-3 md:w-4 md:h-4 bg-emerald-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-600 rounded-full" />
                    </motion.div>
                  </div>

                  <div>
                    <h3 className="font-bold text-base md:text-lg text-gray-800 flex items-center gap-1.5 md:gap-2">
                      Rafiki IA
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500" />
                      </motion.div>
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 flex items-center gap-1">
                      Assistant intelligent
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 md:gap-2">
                  {/* Bouton fermer */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleChat}
                    className="w-7 h-7 md:w-8 md:h-8 p-0 rounded-full bg-white/60 backdrop-blur-sm hover:bg-red-50/80 transition-all border border-white/30 hover:border-red-300/50 flex items-center justify-center group"
                  >
                    <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-gray-600 group-hover:text-red-600 transition-colors" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Contenu du chat */}
              <AnimatePresence mode="wait">
                {!isMinimized && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[calc(100%-4rem)] bg-gray-50"
                  >
                    <ChatInterface className="border-0 rounded-none h-full bg-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* État minimisé */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
