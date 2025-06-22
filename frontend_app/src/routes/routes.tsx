import { AdhesionPage } from "@/pages/adhesion/adhesion-page";
import { ArticlePage } from "@/pages/news/article/article-page";
import { NotFoundPage } from "@/pages/not-found/not-found-page";
import { HomePage } from "@/pages/home/home";
import { MembersPage } from "@/pages/members/members-page";
import { ApplicationsPage } from "@/pages/applications/applications-page";
import { NewsPage } from "@/pages/news/news-page";
import { CommuniquesPage } from "@/pages/communiques/communiques-page";

// Types
export interface CustomRouteObject {
  path: string;
  title: string;
  description?: string;
  element: React.ReactNode;
}

// Configuration des routes
export const routes = [
  {
    path: "/",
    title: "Accueil",
    description: "Bienvenue sur le site des Dynamiques Guylin Nyembo",
    element: <HomePage />,
  },
  {
    path: "/actualites",
    title: "Actualités",
    description: "Restez informé des dernières actualités",
    element: <NewsPage />,
  },
  {
    path: "/actualites/:id",
    title: "Article",
    description: "Lecture d'article",
    element: <ArticlePage />,
  },
  {
    path: "/communiques",
    title: "Communiqués",
    description: "Consultez nos communiqués officiels",
    element: <CommuniquesPage />,
  },
  {
    path: "/applications",
    title: "Nos Applications",
    description: "Découvrez nos applications et services",
    element: <ApplicationsPage />,
  },
  {
    path: "/members",
    title: "",
    description: "",
    element: <MembersPage />,
  },
  {
    path: "/adhesion",
    title: "",
    description: "",
    element: <AdhesionPage />,
  },
  {
    path: "*",
    title: "Page non trouvée",
    element: <NotFoundPage />,
  },
];

// Hook personnalisé pour obtenir les métadonnées de la route actuelle
export const useRouteMetadata = (
  pathname: string
): Pick<CustomRouteObject, "title" | "description"> => {
  const route = routes.find((r) => r.path === pathname) ?? routes[0];
  return {
    title: route.title,
    description: route.description,
  };
};
