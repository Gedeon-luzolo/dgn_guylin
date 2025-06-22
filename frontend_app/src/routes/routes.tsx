import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { PageLoader } from "@/components/loader/pageLoader";
import { AdhesionPage } from "@/pages/adhesion/adhesion-page";
import { ArticlePage } from "@/pages/news/article/article-page";

// Types
export interface CustomRouteObject {
  path: string;
  title: string;
  description?: string;
  element: React.ReactNode;
}

// Lazy loading des pages avec gestion des erreurs TypeScript
const HomePage = lazy(() =>
  import("../pages/home/home").then((module) => ({
    default: module.HomePage,
  }))
);
const NewsPage = lazy(() =>
  import("../pages/news/news-page").then((module) => ({
    default: module.NewsPage,
  }))
);
const CommuniquesPage = lazy(() =>
  import("../pages/communiques/communiques-page").then((module) => ({
    default: module.CommuniquesPage,
  }))
);
const ApplicationsPage = lazy(() =>
  import("../pages/applications/applications-page").then((module) => ({
    default: module.ApplicationsPage,
  }))
);
const NotFoundPage = lazy(() =>
  import("../pages/not-found/not-found-page").then((module) => ({
    default: module.NotFoundPage,
  }))
);

// Configuration des routes
export const routes: (CustomRouteObject & RouteObject)[] = [
  {
    path: "/",
    title: "Accueil",
    description: "Bienvenue sur le site des Dynamiques Guylin Nyembo",
    element: (
      <Suspense fallback={<PageLoader />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/actualites",
    title: "Actualités",
    description: "Restez informé des dernières actualités",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NewsPage />
      </Suspense>
    ),
  },
  {
    path: "/actualites/:id",
    title: "Article",
    description: "Lecture d'article",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ArticlePage />
      </Suspense>
    ),
  },
  {
    path: "/communiques",
    title: "Communiqués",
    description: "Consultez nos communiqués officiels",
    element: (
      <Suspense fallback={<PageLoader />}>
        <CommuniquesPage />
      </Suspense>
    ),
  },
  {
    path: "/applications",
    title: "Nos Applications",
    description: "Découvrez nos applications et services",
    element: (
      <Suspense fallback={<PageLoader />}>
        <ApplicationsPage />
      </Suspense>
    ),
  },
  {
    path: "/adhesion",
    title: "",
    description: "",
    element: (
      <Suspense fallback={<PageLoader />}>
        <AdhesionPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    title: "Page non trouvée",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    ),
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
