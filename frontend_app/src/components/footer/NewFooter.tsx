import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavbarItems } from "@/lib/NavbarItems";
import flagOverlay from "@/assets/images/flag_overlay.png";
import logoDgn from "@/assets/images/logo/logo_dgn.png";
import { Facebook, Instagram, Twitter, YoutubeIcon } from "lucide-react";

const NewFooter: React.FC = () => {
  return (
    <div className="relative">
      <div className="flex w-full h-1">
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-blue-600" />
      </div>

      <footer
        className={cn(
          "relative bg-blue-700  backdrop-blur-lg border-t border-white/20 py-8"
        )}
      >
        <div className="absolute inset-0 -z-1">
          <img
            src={flagOverlay}
            alt="Drapeau"
            className="h-full w-full object-cover opacity-30"
          />
        </div>

        <div className="widthpx mx-auto px-4 sm:px-6 lg:px-8 z-0">
          <div className="bg-white/10 rounded-2xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-white">
              {/* Section Logo et Titre */}
              <div className="text-center md:text-left flex flex-col items-start md:items-center col-span-2">
                {/* Logo DGN circulaire */}
                <div className="mb-4 flex items-center justify-center text-start gap-x-4">
                  <img
                    src={logoDgn}
                    alt="Logo Dynamique Guylain Nyembo"
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full shadow-lg border-2 border-white/20"
                  />

                  <div className="w-50">
                    <h2 className="text-xl font-bold mb-2 text-government">
                      DYNAMIQUE GUYLAIN NYEMBO
                    </h2>
                  </div>
                </div>

                <div className="text-left">
                  <p className="text-sm text-gray-200 text-official">
                    République Démocratique du Congo
                  </p>
                  <p className="text-sm text-gray-200">
                    Parti Politique PPRD - Union Nationale Mondiale
                  </p>
                  <p className="text-sm text-gray-200">
                    Solidaire avec la Commune de Ngaliema,
                  </p>
                  <p className="text-sm text-gray-200">
                    Réf: Port-Gentilles - Solaire Ngozi
                  </p>
                </div>
              </div>

              {/* Section Liens Rapides */}
              <div>
                <h3 className="font-semibold text-sm mb-3">LIENS RAPIDES</h3>
                <ul className="space-y-2 text-sm">
                  {NavbarItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.link}
                        className="hover:underline text-gray-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to="/about" className="hover:underline text-gray-200">
                      À PROPOS
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/coordination"
                      className="hover:underline text-gray-200"
                    >
                      COORDINATION
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/members"
                      className="hover:underline text-gray-200"
                    >
                      ADHÉSION
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/carte-interactive"
                      className="hover:underline text-gray-200"
                    >
                      CARTE INTERACTIVE
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/connexion"
                      className="hover:underline text-gray-200"
                    >
                      CONNEXION
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Section Réseaux Sociaux */}
              <div>
                <h3 className="font-semibold text-sm mb-3">RÉSEAUX SOCIAUX</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Facebook className="mr-2 w-4 h-4" />
                    <a href="#" className="hover:underline text-gray-200">
                      Facebook
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Twitter className="mr-2 w-4 h-4"/>
                    <a href="#" className="hover:underline text-gray-200">
                      Twitter
                    </a>
                  </li>
                  <li className="flex items-center">
                <Instagram className="mr-2 w-4 h-4"/>
                    <a href="#" className="hover:underline text-gray-200">
                      Instagram
                    </a>
                  </li>
                  <li className="flex items-center">
                 <YoutubeIcon className="mr-2 w-4 h-4"/>
                    <a href="#" className="hover:underline text-gray-200">
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>

              {/* Section Mentions Légales */}
              <div>
                <h3 className="font-semibold text-sm mb-3">MENTIONS LÉGALES</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:underline text-gray-200">
                      Mentions légales
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline text-gray-200">
                      Politique de confidentialité
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline text-gray-200">
                      Conditions d'utilisation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section Applications */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="text-center">
              <p className="text-sm text-gray-200">
                © 2024 Dynamique Guylain Nyembo. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewFooter;
