import React from "react";
import { applications } from "./types";
import { ApplicationCard } from "./application-card";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const ApplicationsGrid: React.FC = () => {
  return (
    <div className="py-10 md:py-38 px-4">
      <motion.h1
        className="text-3xl font-bold text-center text-white mb-10 mt-16 sm:mt-0"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2,
        }}
      >
        NOS APPLICATIONS
      </motion.h1>
      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {applications.map((app) => (
          <ApplicationCard key={app.id} application={app} />
        ))}
      </motion.div>
    </div>
  );
};
