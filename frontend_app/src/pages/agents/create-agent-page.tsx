import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCrud } from "@/hooks/useCrud";
import { useNavigate } from "react-router-dom";
import { ImagePlusIcon, PhoneIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { BackButton } from "@/components/ui/backButton";
import type { IAgent } from "@/types/iAgents";
import { getImageUrl } from "@/lib/genFuction";
import { FlagOverlay } from "@/components/backgrounds/flag-overlay";

const NIVEAU_ETUDES = [
  "Primaire",
  "Secondaire",
  "Graduat",
  "Licence",
  "Master",
  "Doctorat",
];

export const CreateAgentPage = () => {
  const navigate = useNavigate();

  const setFormData = useState<{
    photo: File | null;
  }>({
    photo: null,
  })[1];

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { useCreate, useList } = useCrud<IAgent>({
    endpoint: "/agents",
    queryKey: "agents",
    message: "Agent",
    contentType: "multipart/form-data",
  });

  const createMutation = useCreate();
  const { data: agents = [] } = useList();

  console.log(agents);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (formData: FormData) => {
    createMutation.mutate(formData);
    navigate("/agents");
  };

  return (
    <div>
      <FlagOverlay className="fixed" />
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* <FlagOverlay /> */}

        <BackButton to="/agents" className="mt-6 mr-10" />
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="lg:col-span-4">
            <h1 className="text-2xl font-bold text-white text-center mb-6 mt-8">
              FORMULAIRE D'ENREGISTREMENT D'AGENT
            </h1>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6">
              <form action={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nom */}
                  <div className="space-y-1">
                    <Label htmlFor="nom" className="text-white text-sm">
                      Nom:
                    </Label>
                    <Input
                      type="text"
                      id="nom"
                      name="nom"
                      className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl h-9"
                      required
                    />
                  </div>

                  {/* Post-nom */}
                  <div className="space-y-1">
                    <Label htmlFor="postNom" className="text-white text-sm">
                      Post-nom:
                    </Label>
                    <Input
                      type="text"
                      id="postNom"
                      name="postNom"
                      className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl h-9"
                      required
                    />
                  </div>

                  {/* Prénom */}
                  <div className="space-y-1">
                    <Label htmlFor="prenom" className="text-white text-sm">
                      Prénom:
                    </Label>
                    <Input
                      type="text"
                      id="prenom"
                      name="prenom"
                      className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl h-9"
                      required
                    />
                  </div>

                  {/* Genre */}
                  <div className="space-y-1">
                    <Label className="text-white text-sm">Genre:</Label>
                    <div className="flex gap-4 items-center mt-1">
                      <label className="flex items-center gap-2 text-white text-sm">
                        <input
                          type="radio"
                          name="genre"
                          value="Homme"
                          className="text-yellow-400 focus:ring-yellow-400 h-4 w-4"
                          required
                        />
                        M
                      </label>
                      <label className="flex items-center gap-2 text-white text-sm">
                        <input
                          type="radio"
                          name="genre"
                          value="Femme"
                          className="text-yellow-400 focus:ring-yellow-400 h-4 w-4"
                        />
                        F
                      </label>
                    </div>
                  </div>

                  {/* Fonction */}
                  <div className="space-y-1">
                    <Label htmlFor="fonction" className="text-white text-sm">
                      Fonction:
                    </Label>
                    <Input
                      type="text"
                      id="fonction"
                      name="fonction"
                      className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl h-9"
                    />
                  </div>

                  {/* Société */}
                  <div className="space-y-1">
                    <Label htmlFor="societe" className="text-white text-sm">
                      Société:
                    </Label>
                    <Input
                      type="text"
                      id="societe"
                      name="societe"
                      className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl h-9"
                    />
                  </div>

                  {/* Appartenance politique */}
                  <div className="space-y-1">
                    <Label
                      htmlFor="appartenancePolitique"
                      className="text-white text-sm"
                    >
                      Appartenance politique:
                    </Label>
                    <Input
                      type="text"
                      id="appartenancePolitique"
                      name="appartenancePolitique"
                      className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl h-9"
                    />
                  </div>

                  {/* Niveau d'études */}
                  <div className="space-y-1">
                    <Label
                      htmlFor="niveauEtudes"
                      className="text-white text-sm"
                    >
                      Niveau d'études:
                    </Label>
                    <Select name="niveauEtudes">
                      <SelectTrigger className="border-white/20 bg-white/10 text-white focus:ring-yellow-500 rounded-xl h-9">
                        <SelectValue placeholder="Sélectionnez un niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        {NIVEAU_ETUDES.map((niveau) => (
                          <SelectItem key={niveau} value={niveau}>
                            {niveau}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Téléphone */}
                  <div className="space-y-1">
                    <Label htmlFor="telephone" className="text-white text-sm">
                      Téléphone:
                    </Label>
                    <Input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl h-9"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-x-6 mt-4">
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Ajouter la photo:
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="relative w-24 h-24 border-2 border-dashed border-white/30 rounded-xl overflow-hidden">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-white/50">
                            <ImagePlusIcon className="w-6 h-6 mb-1" />
                            <span className="text-xs text-center">
                              Ajouter photo
                            </span>
                          </div>
                        )}
                        <input
                          type="file"
                          id="photo"
                          name="photo"
                          onChange={handleImageChange}
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex-1">
                    <Button
                      type="submit"
                      disabled={createMutation.isPending}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>📝</span>
                      <span>
                        {createMutation.isPending
                          ? "Enregistrement..."
                          : "Enregistrez"}
                      </span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Minimized Agents List Section */}
          <div className="lg:col-span-2 mt-8 lg:mt-[4.5rem]">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-4">
              <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span>📋</span> Agents Récents
              </h2>
              <div className="space-y-2 max-h-[calc(100vh-20rem)] overflow-y-auto">
                {agents.slice(0, 10).map((agent) => (
                  <Card
                    key={agent.id}
                    className="bg-white/5 border-white/10 p-2 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div className="size-10 rounded-full overflow-hidden bg-white/20 shrink-0">
                        {agent.user.photo ? (
                          <img
                            src={
                              agent.user.photo
                                ? getImageUrl(agent.user.photo as string)
                                : undefined
                            }
                            alt={`${agent.user.nom} ${agent.user.postNom}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/50">
                            <ImagePlusIcon className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-medium text-white truncate">
                          {agent.user.nom} {agent.user.postNom}
                        </h3>
                        <div className="flex items-center text-white/60 text-xs">
                          <PhoneIcon className="w-3 h-3 mr-1" />
                          <span className="truncate">
                            {agent.user.telephone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
