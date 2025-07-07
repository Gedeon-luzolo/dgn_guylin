import type { IMember } from "./memberType";

export interface NewsImage {
  id: string;
  url: string;
  alt?: string;
  caption?: string;
  isMain: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  author?: IMember | null;
  images: NewsImage[];
  likes: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}
