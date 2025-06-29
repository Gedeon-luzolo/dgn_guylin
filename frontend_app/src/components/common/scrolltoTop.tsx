import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll en haut
  }, [pathname]); // Détecte changement de route

  return null;
}

export default ScrollToTop;
