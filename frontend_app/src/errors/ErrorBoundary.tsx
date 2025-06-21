import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erreur capturée:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-300">
          <div className="text-center p-8 backdrop-blur-3xl bg-white rounded-lg shadow-lg max-w-md">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Oups ! Quelque chose s'est mal passé
            </h2>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message ||
                "Une erreur inattendue est survenue."}
            </p>
            <Button onClick={() => window.location.reload()}>
              Recharger la page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
