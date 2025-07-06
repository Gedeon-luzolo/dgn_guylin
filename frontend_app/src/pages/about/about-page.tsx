import { Card } from "@/components/ui/card";

export const AboutPage = () => {
  return (
    <div className="bg-[#f8f9fa] dark:bg-gray-900">
      {/* Hero Banner */}

      <div className="relative bg-blue-900 dark:bg-blue-950">
        <div className="absolute -z-0 inset-0 bg-[url('/src/assets/images/flag_overlay.png')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 pt-13">
              Qui sommes-nous ?
            </h1>

            <div className="flex justify-center space-x-2">
              <div className="w-8 h-1 bg-red-600"></div>
              <div className="w-8 h-1 bg-yellow-400"></div>
              <div className="w-8 h-1 bg-blue-600"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div>
            <div className="p-8">
              <p className="text-lg text-gray-700 text-justify dark:text-gray-300">
                La{" "}
                <span className="font-semibold text-blue-800 dark:text-blue-400">
                  Dynamique Guylain Nyembo
                </span>{" "}
                (DGN-ASBL) est une association apolitique, citoyenne et non
                confessionnelle, créée le 23 février 2021 à Lubumbashi. Elle a
                pour mission principale de contribuer à la construction d'une
                société congolaise solidaire, responsable et décentralisée, où
                la jeunesse et les femmes jouent un rôle moteur dans le
                développement local et national.
              </p>
            </div>

            <div className="p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white ml-4">
                  Notre Vision
                </h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300  text-justify leading-relaxed">
                Notre vision est celle d'une République Démocratique du Congo
                sans pauvreté, avec une population valorisée à{" "}
                <span className="font-semibold text-blue-800 dark:text-blue-400">
                  80%
                </span>{" "}
                à travers son capital humain, conformément à la vision du Chef
                de l'État sur l'émergence de la Nation.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="overflow-hidden rounded-4xl ">
              <div className="relative">
                <img
                  src="./src/assets/images/guylin/guylin-about.jpg"
                  alt="Guylain Nyembo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Hon. Guylain Nyembo
                  </h3>
                  <p className="text-lg text-gray-200">Fondateur de la DGN</p>
                </div>
              </div>
            </div>
          </div>
        </div>

   

        {/* Ethical Engagement Section */}
        <div className="mt-16">
          <Card className="p-8 bg-blue-900 dark:bg-blue-950 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10">
                  <span className="text-2xl">💡</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-6">Engagement Éthique</h2>
              <p className="text-lg leading-relaxed">
                La DGN prône{" "}
                <span className="font-semibold text-yellow-400">
                  l'intégrité
                </span>
                , la{" "}
                <span className="font-semibold text-yellow-400">
                  transparence
                </span>
                , l'
                <span className="font-semibold text-yellow-400">inclusion</span>
                , la{" "}
                <span className="font-semibold text-yellow-400">
                  méritocratie
                </span>{" "}
                et le respect des principes de bonne gouvernance. Elle agit dans
                l'intérêt supérieur du peuple congolais, sans visée partisane ni
                privilège personnel.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
