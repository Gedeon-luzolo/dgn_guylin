import { Card } from "@/components/ui/card";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-900">
      {/* Hero Banner */}
      <div className="relative bg-blue-900 dark:bg-blue-950">
        <div className="absolute inset-0 bg-[url('/src/assets/images/flag-pattern.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
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
          <div className="space-y-8">
            <Card className="p-8 border-l-4 border-blue-700 bg-white dark:bg-gray-800 shadow-md">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
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
            </Card>

            <Card className="p-8 bg-white dark:bg-gray-800 shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white ml-4">
                  Notre Vision
                </h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Notre vision est celle d'une République Démocratique du Congo
                sans pauvreté, avec une population valorisée à{" "}
                <span className="font-semibold text-blue-800 dark:text-blue-400">
                  80%
                </span>{" "}
                à travers son capital humain, conformément à la vision du Chef
                de l'État sur l'émergence de la Nation.
              </p>
            </Card>
          </div>

          {/* Image Section */}
          <div className="relative">
            <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
              <div className="aspect-[4/5] relative">
                <img
                  src="./src/assets/images/carousel/guylin1.png"
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
            </Card>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-2xl">🧭</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Nos Objectifs Spécifiques
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Promouvoir la vision, les actions et les valeurs incarnées par le Président de la République",
              "Conscientiser la jeunesse sur son rôle dans la construction du pays",
              "Encourager l'autonomisation des jeunes et des femmes à travers l'entrepreneuriat, l'innovation, la formation et la santé",
              "Appuyer les initiatives locales de développement rural et urbain",
              "Lutter contre la pauvreté, l'analphabétisme, le tribalisme et l'exclusion sociale",
              "Défendre les causes liées à l'environnement, aux droits humains et à la bonne gouvernance",
            ].map((objective, index) => (
              <Card
                key={index}
                className="p-6 bg-white dark:bg-gray-800 shadow-md border-l-4 border-blue-700"
              >
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-400 mr-4">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">
                    {objective}
                  </p>
                </div>
              </Card>
            ))}
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
