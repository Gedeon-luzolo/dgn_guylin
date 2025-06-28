import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  title?: string;
  description?: string;
  showRetryButton?: boolean;
  showHomeButton?: boolean;
  onRetry?: () => void;
  onGoHome?: () => void;
}

export const ErrorPage = ({
  title = "Erreur de connexion",
  description = "Une erreur s'est produite lors de la récupération des données. Veuillez vérifier votre connexion internet et réessayer.",
  showRetryButton = true,
  showHomeButton = true,
  onRetry,
  onGoHome,
}: ErrorPageProps) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Par défaut, recharger la page
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      // Par défaut, rediriger vers l'accueil
      window.location.href = "/";
    }
  };

  return (
    <div className="container mx-auto px-4 py-26 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>

        <p className="text-lg text-gray-300 mb-8">{description}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showRetryButton && (
            <Button
              onClick={handleRetry}
              variant="default"
              size="lg"
              className="flex items-center gap-2 border-blue-500/80"
            >
              <RefreshCw className="w-4 h-4" />
              Réessayer
            </Button>
          )}

          {showHomeButton && (
            <Button
              onClick={handleGoHome}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Retour à l'accueil
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
