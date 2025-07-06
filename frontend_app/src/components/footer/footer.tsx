import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto z-50">
      {/* Bandes de couleurs */}
      <div className="flex w-full h-1">
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-blue-600" />
      </div>

      {/* Contenu du footer */}
      <div className="bg-blue-700/90 py-4 px-4">
        <p className="text-center text-white text-sm">
          © {currentYear} Dynamiques Guylin Nyembo. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};
