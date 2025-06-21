import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page non trouvée</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};
