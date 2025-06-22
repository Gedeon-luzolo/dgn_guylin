import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useCrud } from "@/hooks/useCrud";
import type { IMember } from "@/types/memberType";
import { useNavigate } from "react-router-dom";

export const AdhesionPage: React.FC = () => {
  const navigate = useNavigate();
  const setFormData = useState<{
    photo: File | null;
  }>({
    photo: null,
  })[1];

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { useCreate } = useCrud<IMember>({
    endpoint: "/members",
    queryKey: "members",
    message: "Membre",
    contentType: "multipart/form-data",
  });

  const createMutation = useCreate();

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

  const handleSubmit = async (formData: FormData) => {
    await createMutation.mutateAsync(formData);
    navigate("/members");
  };

  return (
    <div className="min-h-screen bg-[var(--dgn-blue)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-6 mt-16">
          REMPLISSEZ LE FORMULAIRE
        </h1>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="px-8">
            <form action={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nom */}
                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-white">
                    Nom:
                  </Label>
                  <Input
                    type="text"
                    id="nom"
                    name="nom"
                    className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl"
                    required
                  />
                </div>

                {/* Post-nom */}
                <div className="space-y-2">
                  <Label htmlFor="postNom" className="text-white">
                    Post-nom:
                  </Label>
                  <Input
                    type="text"
                    id="postNom"
                    name="postNom"
                    className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl"
                    required
                  />
                </div>

                {/* Prénom */}
                <div className="space-y-2">
                  <Label htmlFor="prenom" className="text-white">
                    Prénom:
                  </Label>
                  <Input
                    type="text"
                    id="prenom"
                    name="prenom"
                    className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl"
                    required
                  />
                </div>

                {/* Qualité du membre */}
                <div className="space-y-2">
                  <Label htmlFor="qualiteMembre" className="text-white">
                    Qualité du membre:
                  </Label>
                  <Input
                    type="text"
                    id="qualiteMembre"
                    name="qualiteMembre"
                    className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl"
                    required
                  />
                </div>

                {/* Telephone */}
                <div className="space-y-2">
                  <Label htmlFor="telephone" className="text-white">
                    Telephone:
                  </Label>
                  <Input
                    type="number"
                    id="telephone"
                    name="telephone"
                    className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl"
                  />
                </div>

                {/* Province */}
                <div className="space-y-2">
                  <Label htmlFor="province" className="text-white">
                    Province:
                  </Label>
                  <Input
                    type="text"
                    id="province"
                    name="province"
                    className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl"
                    required
                  />
                </div>

                {/* Adresse */}
                <div className="space-y-2">
                  <Label htmlFor="adresse" className="text-white">
                    Adresse:
                  </Label>
                  <Input
                    type="text"
                    id="adresse"
                    name="adresse"
                    className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-x-10">
                {/* Photo Upload */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Ajouter la photo:
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="relative w-32 h-32 border-2 border-dashed border-white/30 rounded-xl overflow-hidden">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-white/50">
                          <svg
                            className="w-8 h-8 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-xs">
                            Ajouter votre image ici
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
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>📝</span>
                    <span>Enregistrez</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
