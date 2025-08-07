import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { NewsArticle, NewsImage } from "@/types/newsType";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CreateArticleModal } from "../../components/news/create-article-modal";
import { useCrud } from "@/hooks/useCrud";
import LoadingSpinner from "@/components/loader/LoadingSpinner";
import { getImageUrl, formatDate } from "@/lib/genFuction";
import { PlusIcon } from "lucide-react";

export const NewsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { useList } = useCrud<NewsArticle>({
    endpoint: "/news",
    queryKey: "news",
    message: "actualités",
  });

  const { data: news = [], isLoading, isError } = useList();

  const featuredArticle = news[0] || null;
  const getMainImage = (images: NewsImage[]): NewsImage | undefined => {
    return images && images.length > 0 ? images[0] : undefined;
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-error-500 dark:text-error-400 p-4">
        <p>Erreur lors de la recuperation des articles</p>
      </div>
    );

  if (news.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-6 mt-16">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Actualités
            </h1>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Créer un article
            </Button>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Aucun article disponible pour le moment
          </p>
        </div>
        <CreateArticleModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-6 mt-16">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Actualités
          </h1>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Créer un article
          </Button>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Découvrez les dernières actualités et histoires inspirantes
        </p>
      </div>

      {/* Modal de création d'article */}
      <CreateArticleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Featured Article */}
      {featuredArticle && (
        <div className="max-w-7xl mx-auto mb-12">
          <Card className="relative overflow-hidden backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-0 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="relative h-[400px] rounded-lg overflow-hidden group">
                {getMainImage(featuredArticle.images) && (
                  <img
                    src={getImageUrl(getMainImage(featuredArticle.images)!.url)}
                    alt={
                      getMainImage(featuredArticle.images)?.alt ||
                      featuredArticle.title
                    }
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                {featuredArticle.images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full">
                    <p className="text-white text-sm">
                      +{featuredArticle.images.length - 1} photos
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                      {featuredArticle.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {featuredArticle.content}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 border border-white/20">
                      <AvatarImage
                        src={
                          featuredArticle.author?.photo
                            ? getImageUrl(
                                featuredArticle.author
                                  .photo as unknown as string
                              )
                            : undefined
                        }
                        alt={`${featuredArticle.author?.prenom || ""} ${
                          featuredArticle.author?.nom || ""
                        }`}
                      />
                      <AvatarFallback>
                        {featuredArticle.author?.prenom?.[0] || ""}
                        {featuredArticle.author?.nom?.[0] || ""}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {featuredArticle.author?.prenom || ""}{" "}
                        {featuredArticle.author?.nom || ""}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(featuredArticle.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 dark:text-gray-400">
                      {featuredArticle.commentsCount} commentaires
                    </span>
                    <Link to={`/actualites/${featuredArticle.id}`}>
                      <Button variant="outline">Lire plus</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Popular Posts */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Articles Populaires
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => (
            <Link
              key={article.id}
              to={`/actualites/${article.id}`}
              className="block transition-transform hover:scale-[1.02]"
            >
              <Card className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48 rounded-t-lg overflow-hidden group">
                  {getMainImage(article.images) && (
                    <img
                      src={getImageUrl(getMainImage(article.images)!.url)}
                      alt={getMainImage(article.images)?.alt || article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                  {article.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full">
                      <p className="text-white text-sm">
                        +{article.images.length - 1} photos
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {article.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 border border-white/20">
                        <AvatarImage
                          src={
                            article.author?.photo
                              ? getImageUrl(
                                  article.author.photo as unknown as string
                                )
                              : undefined
                          }
                          alt={`${article.author?.prenom || ""} ${
                            article.author?.nom || ""
                          }`}
                        />
                        <AvatarFallback>
                          {article.author?.prenom?.[0] || ""}
                          {article.author?.nom?.[0] || ""}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {article.author?.prenom || ""}{" "}
                        {article.author?.nom || ""}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(article.createdAt)}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
