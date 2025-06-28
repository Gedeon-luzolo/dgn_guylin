import { ErrorPage } from "@/pages/error";

interface QueryErrorProps {
  error: Error;
  onRetry?: () => void;
  customTitle?: string;
  customDescription?: string;
}

export const QueryError = ({
  error,
  onRetry,
  customTitle,
  customDescription,
}: QueryErrorProps) => {
  const getErrorTitle = (): string => {
    if (customTitle) return customTitle;

    // Analyser le type d'erreur pour fournir un titre approprié
    if (
      error.message.includes("Network Error") ||
      error.message.includes("fetch")
    ) {
      return "Erreur de connexion";
    }
    if (error.message.includes("404")) {
      return "Ressource introuvable";
    }
    if (error.message.includes("500")) {
      return "Erreur serveur";
    }
    if (error.message.includes("403") || error.message.includes("401")) {
      return "Accès non autorisé";
    }

    return "Erreur de récupération des données";
  };

  const getErrorDescription = (): string => {
    if (customDescription) return customDescription;

    // Analyser le type d'erreur pour fournir une description appropriée
    if (
      error.message.includes("Network Error") ||
      error.message.includes("fetch")
    ) {
      return "Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet et réessayer.";
    }
    if (error.message.includes("404")) {
      return "La ressource demandée n'a pas été trouvée. Elle a peut-être été supprimée ou déplacée.";
    }
    if (error.message.includes("500")) {
      return "Une erreur s'est produite sur le serveur. Veuillez réessayer dans quelques instants.";
    }
    if (error.message.includes("403")) {
      return "Vous n'avez pas les permissions nécessaires pour accéder à cette ressource.";
    }
    if (error.message.includes("401")) {
      return "Votre session a expiré. Veuillez vous reconnecter.";
    }

    return "Une erreur s'est produite lors de la récupération des données. Veuillez réessayer.";
  };

  return (
    <ErrorPage
      title={getErrorTitle()}
      description={getErrorDescription()}
      onRetry={onRetry}
      showRetryButton={!!onRetry}
    />
  );
};
