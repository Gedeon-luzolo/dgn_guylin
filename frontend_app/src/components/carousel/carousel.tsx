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
    <div
      className={cn(
        "relative h-screen md:h-[700px] w-full overflow-hidden",
        className
      )}
    >
      {/* Flag Overlay */}
      <FlagOverlay />
      {/* Navigation */}
      <div className="absolute inset-x-0 top-1/2 z-40 flex -translate-y-1/2 justify-between px-2 md:px-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-white" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-white" />
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
          className="absolute inset-0 z-50 flex flex-col md:flex-row items-center justify-between px-4 md:px-16 pt-30 md:pt-50"
        >
          {/* Contenu textuel */}
          <div className="w-full md:w-1/2 space-y-2 md:space-y-4 text-white text-center md:text-left md:mb-20 mb-0">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl font-bold leading-tight"
            >
              {slides[currentIndex].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-white/90"
            >
              {slides[currentIndex].subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-2 md:pt-4"
            >
              <p className="font-bold">{slides[currentIndex].author}</p>
              <p className="text-xs md:text-sm text-white/70">
                {slides[currentIndex].role}
              </p>
            </motion.div>
            {slides[currentIndex].cta && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-3 md:pt-6"
              >
                <a
                  href={slides[currentIndex].cta.link}
                  className="inline-flex items-center space-x-2 rounded-full bg-yellow-400 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold text-blue-900 transition-colors hover:bg-yellow-300"
                >
                  <span>{slides[currentIndex].cta.text}</span>
                  <span>→</span>
                </a>
              </motion.div>
            )}
          </div>

          {/* Image */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative w-full md:w-1/2 md:mt-0"
          >
            <img
              src={slides[currentIndex].image}
              alt="Photo guylin"
              className="h-[400px] md:h-[500px] w-full object-contain"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Indicateurs */}
      <div className="absolute bottom-2 md:bottom-6 left-1/2 z-40 flex -translate-x-1/2 space-x-2 md:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 md:h-2 transition-all rounded-4xl ${
              index === currentIndex
                ? "w-6 md:w-8 bg-yellow-400"
                : "w-1.5 md:w-2 bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};
