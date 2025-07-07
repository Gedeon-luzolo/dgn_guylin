import { slides } from "@/lib/slideItem";
import { Carousel } from "../../components/carousel/carousel";
import { useResponsiveDimensions } from "@/hooks/useResponsiveDimension";
import CarteRDC from "@/components/carte-rdc/CarteRDC";
import { useCrud } from "@/hooks/useCrud";
import type { NewsArticle } from "@/types/newsType";
import { getImageUrl, formatDate } from "@/lib/genFuction";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/loader/LoadingSpinner";

export const HomePage = () => {
  const { width, height } = useResponsiveDimensions(600, 500);

  const { useList } = useCrud<NewsArticle>({
    endpoint: "/news",
    queryKey: "news",
    message: "actualités",
  });

  const { data: news = [], isLoading } = useList();

  // Prendre la dernière actualité
  const latestNews = news[0];

  return (
    <div className="w-full">
      <div className="w-full">
        <Carousel slides={slides} autoPlayInterval={6000} />

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full py-16">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 px-6 md:px-0 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Section titre et description */}
              <div className="lg:col-span-1 text-center lg:text-left">
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight ">
                    CARTE CARTOGRAPHIQUE DE NOS SIÈGES
                  </h2>
                  <div className="w-16 h-1 bg-blue-600 mx-auto lg:mx-0 mb-4"></div>
                  <p className="text-gray-600 text-lg leading-relaxed text-justify md:text-left">
                    Nous sommes présents dans plus de 5 provinces stratégiques
                    en RDC. Découvrez la répartition géographique de nos sièges
                    à travers le territoire national.
                  </p>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-gray-600">
                      Provinces couvertes
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">26</div>
                    <div className="text-sm text-gray-600">
                      Total provinces RDC
                    </div>
                  </div>
                </div>
              </div>

              {/* Section carte */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl sm:p-6">
                  <div className="flex flex-col items-center">
                    {/* Carte responsive */}
                    <div className="w-full flex justify-center mb-4 sm:mb-6">
                      <div className="relative rounded-lg p-2">
                        <CarteRDC width={width} height={height} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Dernière Actualité */}
        <div className="bg-white py-12">
          <div className="container mx-auto max-w-5xl px-6 md:px-0">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Dernière Actualité
                </h2>
                <div className="w-16 h-1 bg-blue-600 mt-2"></div>
              </div>
              <Link
                to="/actualites"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
              >
                Toutes les actualités
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : latestNews ? (
              <Link
                to={`/actualites/${latestNews.id}`}
                className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image de l'article */}
                  <div className="md:w-1/3 aspect-[16/9] md:aspect-auto overflow-hidden">
                    {latestNews.images[0] && (
                      <img
                        src={getImageUrl(latestNews.images[0].url)}
                        alt={latestNews.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  {/* Contenu de l'article */}
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {latestNews.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(latestNews.createdAt)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                        {latestNews.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4">
                        {latestNews.content}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <span>💬 {latestNews.commentsCount} commentaires</span>
                        <span>• 👍 {latestNews.likes} likes</span>
                      </div>
                      <span className="text-blue-600 group-hover:translate-x-1 transition-transform duration-200">
                        Lire plus →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <p className="text-center text-gray-500">
                Aucune actualité disponible
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
