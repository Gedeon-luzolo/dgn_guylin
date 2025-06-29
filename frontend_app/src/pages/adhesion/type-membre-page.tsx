import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const TypeMembrePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>("");

  const typesMembers = [
    {
      value: "honneur",
      label: "MEMBRE D'HONNEUR",
      description: "Membres qui ont participé à la création de l'organisation",
    },
    {
      value: "effectif",
      label: "MEMBRE EFFECTIF",
      description: "Membres actifs avec tous les droits et obligations",
    },
    {
      value: "sympathisant",
      label: "MEMBRE SYMPATHISANT",
      description: "Membres qui soutiennent les activités de l'organisation",
    },
  ];

  const handleSuivant = () => {
    if (selectedType) {
      navigate("/adhesion", { state: { typeMembre: selectedType } });
    }
  };

  const handleAnnuler = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[var(--dgn-blue)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-6 mt-16">
          ADHESION
        </h1>

        <div className="text-center mb-8">
          <p className="text-white/90 text-lg text-justify">
            Peuvent adhérer à la DGN toute personne physique âgée de 18 ans
            minimum, sans discrimination d’origine, de sexe ou de croyance.
            <br />
            Les membres sont répartis selon les catégories suivantes :
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-8">
            <div className="space-y-4 mb-8">
              {typesMembers.map((type) => (
                <div
                  key={type.value}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedType === type.value
                      ? "border-yellow-400 bg-yellow-400/20"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedType(type.value)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedType === type.value
                          ? "border-yellow-400 bg-yellow-400"
                          : "border-white/50"
                      }`}
                    >
                      {selectedType === type.value && (
                        <div className="w-full h-full rounded-full bg-yellow-400"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {type.label}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mb-6">
              <p className="text-white/80 text-sm">
                Continuer votre processus d’adhésion en cliquant sur “Suivant”
              </p>
            </div>

            <div className="flex space-x-4 justify-center">
              <Button
                onClick={handleSuivant}
                disabled={!selectedType}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
              </Button>

              <Button
                onClick={handleAnnuler}
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 font-bold py-3 px-8 rounded-xl transition-all duration-200"
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
