import { useEffect, useState } from "react";

// Hook pour gérer les dimensions responsives
export const useResponsiveDimensions = (
  maxWidth: number = 500,
  maxHeight: number = 400
) => {
  const [dimensions, setDimensions] = useState({
    width: maxWidth,
    height: maxHeight,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        const screenWidth = window.innerWidth;
        const padding = 25; // Padding total (20px de chaque côté)

        let newWidth = maxWidth;
        let newHeight = maxHeight;

        // Ajustement pour mobile
        if (screenWidth < 640) {
          // sm breakpoint
          newWidth = Math.min(screenWidth - padding, maxWidth * 1.2 );
          newHeight = Math.min(newWidth * 1.1, maxHeight * 1.1);
        }
        // Ajustement pour tablet
        else if (screenWidth < 1024) {
          // lg breakpoint
          newWidth = Math.min(screenWidth * 0.6, maxWidth);
          newHeight = Math.min(newWidth * 0.8, maxHeight);
        }

        setDimensions({ width: newWidth, height: newHeight });
      }
    };

    // Mise à jour initiale
    updateDimensions();

    // Écouter les changements de taille d'écran
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [maxWidth, maxHeight]);

  return dimensions;
};
