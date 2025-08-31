import { slides } from "@/lib/slideItem";
import { Carousel } from "../../components/carousel/carousel";
import { useResponsiveDimensions } from "@/hooks/useResponsiveDimension";
import CarteRDC from "@/components/carte-rdc/CarteRDC";
import { useCrud } from "@/hooks/useCrud";
import type { NewsArticle } from "@/types/newsType";
import { getImageUrl, formatDate } from "@/lib/genFuction";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/loader/LoadingSpinner";
import { ArrowRight } from "lucide-react";

export const HomePage = () => {
  const { width, height } = useResponsiveDimensions(700, 600);

  const { useList } = useCrud<NewsArticle>({
    endpoint: "/news",
    queryKey: "news",
    message: "actualités",
  });

  const { data: news = [], isLoading } = useList();

  return (
    <div className="w-full">
      <div className="w-full">
        <Carousel slides={slides} autoPlayInterval={10000} />

        {/* Section Carte Cartographique */}
        <div className="relative bg-white w-full py-24 md:py-32 overflow-hidden">
          {/* Éléments décoratifs subtils en arrière-plan */}
          <div className="absolute inset-0 opacity-3">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
          </div>

          <div className="widthpx mx-auto px-6 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Section Texte et Statistiques */}
              <div className="space-y-8">
                {/* Titre principal */}
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Notre Présence Nationale
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Cartographie
                    </span>
                    <br />
                    <span className="text-slate-700">de nos Sièges</span>
                  </h2>
                </div>

                {/* Compteur et textes alignés au début */}
                <div className="flex items-center gap-6 justify-center lg:justify-start">
                  {/* Compteur moderne */}
                  <div className="relative">
                    {/* Compteur principal */}
                    <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300">
                      {/* Effet de brillance */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Cercle intérieur */}
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                        <span className="text-2xl md:text-3xl font-bold text-white relative z-10">
                          5
                        </span>
                      </div>

                      {/* Particules décoratives */}
                      <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-3 left-2 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-500"></div>
                    </div>

                    {/* Indicateur de progression circulaire */}
                    <div className="absolute -inset-1">
                      <svg
                        className="w-full h-full -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="rgb(226 232 240)"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="1.5"
                          strokeDasharray="283"
                          strokeDashoffset="113"
                          className="animate-pulse"
                        />
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="rgb(59 130 246)" />
                            <stop offset="100%" stopColor="rgb(99 102 241)" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {/* Textes descriptifs */}
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-slate-700 mb-2">
                      Provinces Couvertes
                    </div>
                    <div className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      Plus de 200 membres actifs
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Carte */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Carte à l'air libre */}
                  <div className="relative">
                    <CarteRDC width={width} height={height} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Dernière Actualité */}
        <div className="bg-white py-12">
          <div className="widthpx mx-auto px-6 md:px-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Dernières Actualités
                </h2>
                <div className="w-16 h-1 bg-blue-600 mt-2"></div>
              </div>
              <Link
                to="/actualites"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                Toutes les actualités
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : news.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-2">
                {news.slice(0, 3).map((article) => (
                  <Link
                    key={article.id}
                    to={`/actualites/${article.id}`}
                    className="group block bg-white rounded-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                  >
                    {/* Image de l'article */}
                    <div className="aspect-[5/1] overflow-hidden ">
                      {article.images[0] ? (
                        <img
                          src={getImageUrl(article.images[0].url)}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-blue-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Contenu de l'article */}
                    <div className="p-1.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="px-1 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(article.createdAt)}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-gray-800 mb-0.5 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-xs line-clamp-1 mb-1">
                        {article.content}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-blue-600 group-hover:translate-x-1 transition-transform duration-200 font-medium">
                          Lire plus →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Aucune actualité disponible pour le moment
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Revenez bientôt pour découvrir nos dernières nouvelles
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
