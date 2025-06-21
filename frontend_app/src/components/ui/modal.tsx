import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        />

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-4xl border border-slate-50/30 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            {title && (
              <div className="border-b border-white/10 p-4">
                <h2 className="text-2xl font-bold text-white text-center">
                  {title}
                </h2>
              </div>
            )}

            {/* Content */}
            <div className="p-6">{children}</div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
