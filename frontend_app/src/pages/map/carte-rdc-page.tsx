import React, { useState } from "react";
import { CarteRDC, ProvinceDataMap } from "../../components/carte-rdc";

const CarteRDCPage: React.FC = () => {
  // Données d'exemple pour les provinces
  const [dataByProvince] = useState<ProvinceDataMap>({
    Kinshasa: 120,
    "Kongo-Central": 80,
    "Haut-Katanga": 95,
    "Nord-Kivu": 60,
    "Sud-Kivu": 70,
    Kasaï: 55,
    "Kasaï-Central": 45,
    "Kasaï-Oriental": 40,
    Lomami: 35,
    Sankuru: 30,
    Maniema: 25,
    Tshopo: 50,
    "Bas-Uele": 20,
    "Haut-Uele": 22,
    Ituri: 65,
    Équateur: 38,
    Mongala: 15,
    "Nord-Ubangi": 18,
    "Sud-Ubangi": 28,
    Tshuapa: 32,
    "Mai-Ndombe": 42,
    Kwilu: 48,
    Kwango: 35,
    Lualaba: 75,
    "Haut-Lomami": 58,
    Tanganyika: 85,
  });

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const handleProvinceClick = (provinceName: string, value?: number): void => {
    setSelectedProvince(provinceName);
    console.log(`Province cliquée: ${provinceName}, Valeur: ${value}`);
  };

  const handleProvinceHover = (provinceName: string, value?: number): void => {
    setHoveredProvince(provinceName);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Carte Interactive de la République Démocratique du Congo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cette carte présente les données par province de la RDC. Survolez
            une province pour voir ses informations ou cliquez pour la
            sélectionner.
          </p>
        </div>

        {/* Informations sur la province sélectionnée */}
        {selectedProvince && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Province sélectionnée
            </h3>
            <p className="text-blue-800">
              <strong>{selectedProvince}</strong> - Valeur:{" "}
              {dataByProvince[selectedProvince] || "Pas de données"}
            </p>
          </div>
        )}

        {/* Informations sur la province survolée */}
        {hoveredProvince && hoveredProvince !== selectedProvince && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Province survolée
            </h3>
            <p className="text-green-800">
              <strong>{hoveredProvince}</strong> - Valeur:{" "}
              {dataByProvince[hoveredProvince] || "Pas de données"}
            </p>
          </div>
        )}

        {/* Composant de la carte */}
        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <CarteRDC
              width={900}
              height={600}
              dataByProvince={dataByProvince}
              onProvinceClick={handleProvinceClick}
              onProvinceHover={handleProvinceHover}
              showLegend={true}
              enableTooltips={true}
              className="carte-rdc-interactive"
            />
          </div>
        </div>

        {/* Instructions d'utilisation */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Instructions d'utilisation
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">
                Interaction avec la carte :
              </h4>
              <ul className="space-y-1">
                <li>• Survolez une province pour voir ses informations</li>
                <li>• Cliquez sur une province pour la sélectionner</li>
                <li>• Les couleurs représentent les valeurs des données</li>
                <li>• Les provinces grises n'ont pas de données</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Fichier GeoJSON requis :</h4>
              <ul className="space-y-1">
                <li>
                  • Placez le fichier{" "}
                  <code className="bg-gray-200 px-1 rounded">
                    rdc-provinces.geojson
                  </code>{" "}
                  dans le dossier{" "}
                  <code className="bg-gray-200 px-1 rounded">public/</code>
                </li>
                <li>• Le fichier doit contenir les frontières des provinces</li>
                <li>
                  • Chaque province doit avoir une propriété{" "}
                  <code className="bg-gray-200 px-1 rounded">NAME_1</code>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Informations sur les données */}
        <div className="mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-900 mb-4">
            À propos des données
          </h3>
          <p className="text-yellow-800 mb-4">
            Les données affichées sont des exemples pour démontrer le
            fonctionnement du composant. Dans une application réelle, vous
            pouvez remplacer ces données par vos propres valeurs.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Valeurs les plus élevées :</h4>
              <ul className="space-y-1">
                <li>Kinshasa: 120</li>
                <li>Haut-Katanga: 95</li>
                <li>Tanganyika: 85</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Valeurs moyennes :</h4>
              <ul className="space-y-1">
                <li>Kongo-Central: 80</li>
                <li>Lualaba: 75</li>
                <li>Sud-Kivu: 70</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Valeurs les plus faibles :</h4>
              <ul className="space-y-1">
                <li>Mongala: 15</li>
                <li>Nord-Ubangi: 18</li>
                <li>Bas-Uele: 20</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarteRDCPage;
