import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { MessageSquare, X, Sparkles, History, Brain, Zap } from "lucide-react";
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
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
        delay: 0.5,
      },
    },
    tap: { scale: 0.92 },
    hover: {
      scale: 1.05,
      rotate: 5,
      boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.2 },
    },
  };

  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 100,
      filter: "blur(20px)",
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      y: 100,
      filter: "blur(20px)",
      rotateX: 15,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      {/* Bouton flottant premium avec effet holographique - Caché quand modal ouvert */}
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

      {/* Modal glassmorphing */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay premium avec effet de profondeur */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.1 }}
              className="fixed inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30 z-[90]"
              onClick={toggleChat}
            />

            {/* Modal principal responsive avec design premium */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`
                fixed z-[95] overflow-hidden
                ${
                  isMobile
                    ? `
                    inset-x-2 bottom-2 top-16
                    ${isMinimized ? "h-14 top-auto" : ""}
                  `
                    : `
                    bottom-10 right-4 md:right-6 w-[90vw] sm:w-[440px] max-w-[440px]
                    ${
                      isMinimized
                        ? "h-20 w-80 md:w-96"
                        : "h-[85vh] max-h-[560px]"
                    }
                  `
                }
                bg-white/95 backdrop-blur-3xl
                border border-white/40 rounded-2xl md:rounded-3xl
                shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
                before:absolute before:inset-0 before:rounded-2xl md:before:rounded-3xl
                before:bg-gradient-to-br before:from-white/50 before:via-white/30 before:to-white/10
                before:pointer-events-none
              `}
            >
              {/* En-tête premium responsive avec glassmorphisme avancé */}
              <motion.div
                className="relative flex items-center justify-between p-3 md:p-4 border-b border-white/30 bg-gradient-to-r from-blue-50/60 via-purple-50/60 to-pink-50/60 backdrop-blur-sm"
                layout
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="relative">
                    <motion.div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-xl relative overflow-hidden"
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

                    {/* Particules autour de l'avatar */}
                    <Sparkles className="absolute -top-0.5 -left-0.5 md:-top-1 md:-left-1 w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-400 animate-pulse" />
                    <Zap className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-2.5 h-2.5 md:w-3 md:h-3 text-blue-400 animate-ping" />
                  </div>

                  <div>
                    <h3 className="font-bold text-base md:text-lg text-gray-800 flex items-center gap-1.5 md:gap-2">
                      Guylin AI
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
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-pulse" />
                      Assistant intelligent • En ligne
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

              {/* Contenu du chat avec animation */}
              <AnimatePresence mode="wait">
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: {
                          type: "spring" as const,
                          stiffness: 300,
                          damping: 30,
                        },
                        opacity: { delay: 0.1 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.2 },
                        opacity: { duration: 0.1 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`relative ${
                        isMobile ? "h-[calc(100vh-8rem)]" : "h-[620px]"
                      }`}
                    >
                      {/* Gradient overlay pour l'effet glassmorphing */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 pointer-events-none" />

                      <ChatInterface className="border-0 rounded-none h-full bg-transparent" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Indicateur de minimisation */}
              {isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-6 md:h-8 text-xs md:text-sm text-gray-600"
                >
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <History className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
                    <span>Chat avec historique</span>
                  </div>
                </motion.div>
              )}

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl -z-10 opacity-60" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
