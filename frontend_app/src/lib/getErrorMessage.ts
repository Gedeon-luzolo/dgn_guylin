import { AxiosError } from "axios";

interface ApiError {
  error?: string;
  message?: string;
}

export const getErrorMessage = (error: AxiosError<ApiError>): string => {
  // Gestion spécifique des erreurs réseau
  if (!error.response) {
    if (error.code === "ERR_NETWORK") {
      return "Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.";
    }
    if (error.code === "ECONNABORTED") {
      return "La requête a pris trop de temps. Veuillez réessayer.";
    }
    return "Erreur de connexion au serveur. Veuillez réessayer plus tard.";
  }

  // Gestion des codes d'erreur HTTP courants
  switch (error.response.status) {
    case 400:
      return (
        error.response.data?.message ||
        "Données invalides. Veuillez vérifier vos informations."
      );
    case 401:
      return "Session expirée. Veuillez vous reconnecter.";
    case 403:
      return "Accès non autorisé. Vous n'avez pas les permissions nécessaires.";
    case 404:
      return "La ressource demandée n'existe pas.";
    case 422:
      return (
        error.response.data?.message ||
        "Données invalides. Veuillez vérifier vos informations."
      );
    case 429:
      return "Trop de requêtes. Veuillez patienter avant de réessayer.";
    case 500:
      return "Erreur serveur. Veuillez réessayer plus tard.";
    default:
      return (
        error.response.data?.message ||
        error.response.data?.error ||
        "Une erreur inattendue s'est produite. Veuillez réessayer."
      );
  }
};
