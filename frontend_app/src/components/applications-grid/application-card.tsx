import React from "react";
import type { Application } from "./types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo/logo_dgn.png";

interface ApplicationCardProps {
  application: Application;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
}) => {
  return (
    <motion.div
      className="group relative flex flex-col p-3 md:p-4 rounded-lg md:rounded-xl backdrop-blur-md bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 border border-white/20 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      whileHover={{
        scale: 1.02,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      <Link to={application.link} className="block">
        {/* Gradient de fond animé au hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-300/50 via-yellow-400/50 to-yellow-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        {/* Contenu de la carte */}
        <div className="relative z-10">
          {/* Container flex pour l'image et le titre */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="flex-shrink-0 w-10 h-10 md:w-16 md:h-16 backdrop-blur-sm rounded-lg md:rounded-xl flex items-center justify-center shadow-md border border-white/20 transition-transform duration-300 group-hover:scale-110">
              <img
                src={logo}
                alt={application.title}
                className="w-7 h-7 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="flex-1 text-blue-900 font-bold text-xs md:text-sm leading-tight transition-all duration-300 group-hover:scale-105 group-hover:translate-x-1">
              {application.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
