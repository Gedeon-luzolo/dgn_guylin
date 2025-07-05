import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

export function CreateAgentModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateAgentModalProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (selectedImage) {
      formData.append("photo", selectedImage);
    }

    await onSubmit(formData);
    onClose();
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Enregistrement d'un agent</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input id="nom" name="nom" placeholder="Entrez le nom" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postNom">Post-nom</Label>
              <Input
                id="postNom"
                name="postNom"
                placeholder="Entrez le post-nom"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prenom">Prénom</Label>
            <Input
              id="prenom"
              name="prenom"
              placeholder="Entrez le prénom"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select name="genre" defaultValue="Homme">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Homme">Homme</SelectItem>
                  <SelectItem value="Femme">Femme</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                name="telephone"
                placeholder="+243 ..."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fonction">Fonction</Label>
            <Input
              id="fonction"
              name="fonction"
              placeholder="Entrez la fonction"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="societe">Société</Label>
            <Input
              id="societe"
              name="societe"
              placeholder="Entrez la société"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="appartenancePolitique">
              Appartenance Politique
            </Label>
            <Input
              id="appartenancePolitique"
              name="appartenancePolitique"
              placeholder="Entrez l'appartenance politique"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="niveauEtudes">Niveau d'études</Label>
            <Input
              id="niveauEtudes"
              name="niveauEtudes"
              placeholder="Entrez le niveau d'études"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
