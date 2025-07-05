import { AdhesionPage } from "@/pages/adhesion/adhesion-page";
import { TypeMembrePage } from "@/pages/adhesion/type-membre-page";
import { ArticlePage } from "@/pages/news/article/article-page";
import { HomePage } from "@/pages/home/home";
import { MembersPage } from "@/pages/members/members-page";
import { ApplicationsPage } from "@/pages/applications/applications-page";
import { NewsPage } from "@/pages/news/news-page";
import { CommuniquesPage } from "@/pages/communiques/communiques-page";
import { NotFoundPage } from "@/pages/not-found/not-found-page";
import { AgentsPage } from "@/pages/agents/agents-page";
import { CreateAgentPage } from "@/pages/agents/create-agent-page";

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
    path: "/type-membre",
    title: "Choix du type de membre",
    description: "Sélectionnez votre type de membre",
    element: <TypeMembrePage />,
  },
  {
    path: "/adhesion",
    title: "Formulaire d'adhésion",
    description: "Remplissez votre formulaire d'adhésion",
    element: <AdhesionPage />,
  },
  {
    path: "/agents",
    title: "Agents",
    description: "Liste des agents",
    element: <AgentsPage />,
  },
  {
    path: "/agents/create",
    title: "Créer un agent",
    description: "Créer un agent",
    element: <CreateAgentPage />,
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
