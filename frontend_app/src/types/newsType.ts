export interface NewsImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  mainImage: NewsImage;
  images: NewsImage[];
  category: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  commentsCount: number;
  likes?: number;
  readTime?: string;
}

export const newsCatecory = [
  "Politique",
  "Sport",
  "Culture",
  "Technologies",
  "Société",
  "Économie",
  "Autres",
];
