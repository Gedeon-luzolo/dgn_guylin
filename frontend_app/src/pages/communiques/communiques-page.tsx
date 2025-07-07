import { FlagOverlay } from "@/components/backgrounds/flag-overlay";

export const CommuniquesPage = () => {
  return (
    <div className="bg-[#f8f9fa] dark:bg-gray-900 min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-blue-900 dark:bg-blue-950">
        <FlagOverlay className="opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mt-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Communiqués Officiels
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Restez informé des dernières actualités et annonces de la
              Dynamique Guylain Nyembo
            </p>
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-8 h-1 bg-red-600"></div>
              <div className="w-8 h-1 bg-yellow-400"></div>
              <div className="w-8 h-1 bg-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommuniquesPage;
