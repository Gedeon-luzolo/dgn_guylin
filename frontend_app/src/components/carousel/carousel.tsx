import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FlagOverlay } from "../backgrounds/flag-overlay";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  author: string;
  role: string;
  cta?: {
    text: string;
    link: string;
  };
}

interface CarouselProps {
  slides: Slide[];
  autoPlayInterval?: number;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlayInterval = 5000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlayInterval]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === slides.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full">
      <FlagOverlay />
      <div className="widthpx mx-auto relative">
        <div
          className={cn(
            "relative h-screen w-full overflow-hidden rounded-2xl mx-auto",
            className
          )}
        >
          {/* Navigation */}
          <div className="absolute inset-x-0 top-1/2 z-40 flex -translate-y-1/2 justify-between px-4 md:px-8">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 transition-all duration-300"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 transition-all duration-300"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </Button>
          </div>

          {/* Slides */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 z-50 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 md:px-8 lg:px-16 pt-20 md:pt-24 lg:pt-32"
            >
              {/* Contenu textuel */}
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 md:space-y-6 lg:space-y-8 mb-8 lg:mb-0">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white max-w-2xl mx-auto lg:mx-0"
                >
                  {slides[currentIndex].title}
                </motion.h2>

                {slides[currentIndex].subtitle && (
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-base md:text-lg lg:text-xl text-white/90 max-w-xl mx-auto lg:mx-0"
                  >
                    {slides[currentIndex].subtitle}
                  </motion.p>
                )}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <p className="font-bold text-white text-lg md:text-xl">
                    {slides[currentIndex].author}
                  </p>
                  <p className="text-sm md:text-base text-white/70">
                    {slides[currentIndex].role}
                  </p>
                </motion.div>

                {slides[currentIndex].cta && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="pt-2 md:pt-4"
                  >
                    <a
                      href={slides[currentIndex].cta.link}
                      className="inline-flex items-center space-x-2 rounded-full bg-yellow-400 hover:bg-yellow-300 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-blue-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <span>{slides[currentIndex].cta.text}</span>
                      <span className="text-lg">→</span>
                    </a>
                  </motion.div>
                )}
              </div>

              <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-full lg:w-1/2 flex justify-center lg:justify-end lg:items-end h-full"
              >
                <div className="relative w-full h-full flex items-end justify-center lg:justify-end">
                  <img
                    src={slides[currentIndex].image}
                    alt="Photo guylin"
                    className="h-64 sm:h-80 md:h-96 lg:h-[700px] w-auto object-contain drop-shadow-2xl"
                    style={{
                      objectPosition: "center bottom",
                      alignSelf: "flex-end",
                      marginBottom: 0,
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Indicateurs */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 z-40 flex -translate-x-1/2 space-x-2 md:space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-2 md:h-2.5 transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 md:w-10 bg-yellow-400 shadow-lg"
                    : "w-2 md:w-2.5 bg-white/50 hover:bg-white/75 hover:w-3 md:hover:w-4"
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
