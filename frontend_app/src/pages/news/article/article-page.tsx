import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { NewsArticle, NewsImage } from "@/types/newsType";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCrud } from "@/hooks/useCrud";
import LoadingSpinner from "@/components/loader/LoadingSpinner";
import { getImageUrl, formatDate } from "@/lib/genFuction";

const ImageGallery = ({ images }: { images: NewsImage[] }) => {
  const [selectedImage, setSelectedImage] = useState<NewsImage | null>(null);

  return (
    <div className="my-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] group cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={getImageUrl(image.url)}
              alt={image.alt || "Image"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {image.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-black/50 p-2 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal pour l'image en plein écran */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full">
            <img
              src={getImageUrl(selectedImage.url)}
              alt={selectedImage.alt || "Image"}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            {selectedImage.caption && (
              <p className="absolute bottom-4 left-4 right-4 text-white text-center bg-black/50 p-2 rounded">
                {selectedImage.caption}
              </p>
            )}
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const ArticlePage = () => {
  const { id } = useParams();

  const { useGet } = useCrud<NewsArticle>({
    endpoint: "/news",
    queryKey: "news",
    idField: "id",
    message: "article",
  });

  const { data: article, isLoading, isError } = useGet(id as string);

  // Fonction pour obtenir l'image principale
  const getMainImage = (images: NewsImage[]): NewsImage | undefined => {
    return images.find((img) => img.isMain);
  };

  // Fonction pour obtenir les images non principales
  const getGalleryImages = (images: NewsImage[]): NewsImage[] => {
    return images.filter((img) => !img.isMain);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center text-red-500 dark:text-red-400 p-4">
          <p>Erreur lors du chargement de l'article</p>
        </div>
      </div>
    );
  }

  const mainImage = getMainImage(article.images);
  const galleryImages = getGalleryImages(article.images);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Image */}
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0">
          {mainImage ? (
            <>
              <img
                src={getImageUrl(mainImage.url)}
                alt={mainImage.alt || article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              {mainImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white text-center">
                  {mainImage.caption}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-800" />
          )}
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100/90 text-blue-900">
                  {article.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {article.title}
              </h1>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border-2 border-white/20">
                  <AvatarImage
                    src={
                      article.author.photo
                        ? getImageUrl(article.author.photo as unknown as string)
                        : undefined
                    }
                    alt={`${article.author.prenom} ${article.author.nom}`}
                  />
                  <AvatarFallback>
                    {article.author.prenom[0]}
                    {article.author.nom[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">
                    {article.author.prenom} {article.author.nom}
                  </p>
                  <p className="text-sm text-white/80">
                    {formatDate(article.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg dark:prose-invert">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 mb-6">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          {/* Image Gallery */}
          {galleryImages.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                Galerie d'images
              </h2>
              <ImageGallery images={galleryImages} />
            </>
          )}

          {/* Engagement Section */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Button variant="outline" className="gap-2">
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
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                  {article.likes} J'aime
                </Button>
                <Button variant="outline" className="gap-2">
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {article.commentsCount} Commentaires
                </Button>
              </div>
              <Button variant="outline" className="gap-2">
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
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Partager
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
