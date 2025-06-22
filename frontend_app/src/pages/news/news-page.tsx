import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { NewsArticle } from "@/types/newsType";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CreateArticleModal } from "../../components/news/create-article-modal";

interface ArticleFormData {
  title: string;
  content: string;
  category: string;
  mainImage: {
    url: string;
    alt?: string;
    caption?: string;
  };
  images: Array<{
    url: string;
    alt?: string;
    caption?: string;
  }>;
}

const SAMPLE_NEWS: NewsArticle[] = [
  {
    id: "1",
    title: "How to Spend the Perfect Day on Croatia's Most Magical Island",
    content:
      "upon arrival, your senses will be rewarded with the pleasant scent of lemongrass oil used to clean the natural wood found throughout the room, creating a relaxing atmosphere within the space...",
    mainImage: {
      url: "/src/assets/images/carousel/guylin1.png",
      alt: "Vue principale de l'île",
      caption: "L'île magique de Croatie sous son plus beau jour",
    },
    images: [
      {
        url: "/src/assets/images/carousel/guylin2.png",
        alt: "Plage paradisiaque",
        caption: "Les eaux cristallines bordent les plages de sable fin",
      },
      {
        url: "/src/assets/images/carousel/guylin3.png",
        alt: "Ville historique",
        caption: "Les ruelles pittoresques de la vieille ville",
      },
    ],
    category: "Sport",
    author: {
      name: "James",
      avatar: "/src/assets/images/carousel/guylin2.png",
    },
    date: "July 14, 2022",
    commentsCount: 35,
    readTime: "5 min",
  },
  // Add more sample articles here
];

export const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const categories = [
    "Tous",
    "Politique",
    "Sport",
    "Culture",
    "Technoloies",
    "autres",
  ];

  const handleCreateArticle = (articleData: ArticleFormData) => {
    // TODO: Implémenter la création d'article avec l'API
    console.log("Article à créer:", articleData);
  };

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
              className="mr-2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
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
        onSubmit={handleCreateArticle}
      />

      {/* Categories */}
      <div className="max-w-7xl mx-auto mb-4 flex gap-2 overflow-x-auto pb-4">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            className="backdrop-blur-sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Article */}
      <div className="max-w-7xl mx-auto mb-12">
        <Card className="relative overflow-hidden backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-0 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="relative h-[400px] rounded-lg overflow-hidden group">
              <img
                src={SAMPLE_NEWS[0].mainImage.url}
                alt={SAMPLE_NEWS[0].mainImage.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {SAMPLE_NEWS[0].mainImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3">
                  <p className="text-white text-sm text-center">
                    {SAMPLE_NEWS[0].mainImage.caption}
                  </p>
                </div>
              )}
              {SAMPLE_NEWS[0].images.length > 0 && (
                <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full">
                  <p className="text-white text-sm">
                    +{SAMPLE_NEWS[0].images.length} photos
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                    {SAMPLE_NEWS[0].category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {SAMPLE_NEWS[0].readTime}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  {SAMPLE_NEWS[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {SAMPLE_NEWS[0].content}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8 border border-white/20">
                    <AvatarImage
                      src={SAMPLE_NEWS[0].author.avatar}
                      alt={SAMPLE_NEWS[0].author.name}
                    />
                    <AvatarFallback>
                      {SAMPLE_NEWS[0].author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {SAMPLE_NEWS[0].author.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {SAMPLE_NEWS[0].date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 dark:text-gray-400">
                    {SAMPLE_NEWS[0].commentsCount} commentaires
                  </span>
                  <Link to={`/actualites/${SAMPLE_NEWS[0].id}`}>
                    <Button variant="outline">Lire plus</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Popular Posts */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Articles Populaires
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_NEWS.map((article) => (
            <Link
              key={article.id}
              to={`/actualites/${article.id}`}
              className="block transition-transform hover:scale-[1.02]"
            >
              <Card className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48 rounded-t-lg overflow-hidden group">
                  <img
                    src={article.mainImage.url}
                    alt={article.mainImage.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {article.images.length > 0 && (
                    <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full">
                      <p className="text-white text-sm">
                        +{article.images.length} photos
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {article.readTime}
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
                          src={article.author.avatar}
                          alt={article.author.name}
                        />
                        <AvatarFallback>
                          {article.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {article.author.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {article.date}
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
