import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { NavbarItems } from "../../lib/NavbarItems";

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Utilisation de useCallback pour optimiser les performances
  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Animation variants pour le menu mobile
  const menuVariants: Variants = {
    open: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      opacity: 0,
      scale: 0.95,
      x: "100%",
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Container avec glassmorphism moderne */}

          <div className="relative backdrop-blur-md bg-gradient-to-r from-purple-500/40 via-blue-500/40 to-blue-700/50 p-4 border border-white/20 rounded-4xl shadow-xl shadow-black/5">
            <div className="relative px-6 lg:px-8">
              <div className="flex items-center justify-between h-8">
                {/* Logo section */}
                <Link to="/">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="size-12 rounded-full">
                      <img
                        src="/src/assets/images/logo/logo_dgn.png"
                        alt="logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                </Link>

                {/* Navigation links - Desktop */}
                <div className="hidden md:flex space-x-1">
                  {NavbarItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index + 0.3 }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.link}
                        className="relative px-6 py-2 rounded-xl font-medium text-white/90 transition-all duration-300 hover:text-yellow-300"
                      >
                        <span className="relative z-10">{item.name}</span>
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Applications button and Mobile Menu Button container */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center space-x-4"
                >
                  {/* Applications button */}
                  <Link to="/applications">
                    <motion.button
                      className="hidden md:block bg-yellow-500/90 backdrop-blur-sm text-blue-900 px-6 py-2 rounded-xl font-bold shadow-lg border border-white/20"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(252, 211, 77, 0.9)",
                        boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      NOS APPLICATIONS
                    </motion.button>
                  </Link>

                  {/* Mobile Menu Button */}
                  <div className="md:hidden">
                    <motion.button
                      onClick={toggleMenu}
                      className="relative p-3 rounded-xl backdrop-blur-sm border border-white/20 text-white/90"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="size-4 flex flex-col justify-between">
                        <motion.span
                          className="w-full h-0.5 bg-white block"
                          animate={{
                            rotate: isOpen ? 45 : 0,
                            y: isOpen ? 8 : 0,
                          }}
                        />
                        <motion.span
                          className="w-full h-0.5 bg-white block"
                          animate={{ opacity: isOpen ? 0 : 1 }}
                        />
                        <motion.span
                          className="w-full h-0.5 bg-white block"
                          animate={{
                            rotate: isOpen ? -45 : 0,
                            y: isOpen ? -8 : 0,
                          }}
                        />
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-28 right-4 w-[90%] mx-auto rounded-3xl pb-5 bg-gradient-to-r from-purple-500/40 via-blue-500/40 to-blue-700/50 backdrop-blur-lg shadow-2xl z-50 md:hidden"
            >
              <nav className="flex flex-col space-y-2 mt-5 px-4">
                {NavbarItems.map((item) => (
                  <motion.div
                    key={item.name}
                    className="flex items-center px-4 py-4 rounded-2xl text-white/90 hover:bg-white/10 transition-all duration-200"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={item.link} className="text-md font-medium w-full">
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <Link to="/applications">
                  <motion.button
                    className="w-full bg-yellow-400/90 text-blue-900 px-4 py-4 rounded-xl font-bold mt-2"
                    whileTap={{ scale: 0.95 }}
                  >
                    NOS APPLICATIONS
                  </motion.button>
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
