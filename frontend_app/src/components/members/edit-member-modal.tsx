import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCrud } from "@/hooks/useCrud";
import type { IMember } from "@/types/memberType";
import { RDC_PROVINCES } from "@/lib/provinceRdc";
import { getImageUrl } from "@/lib/genFuction";
import { Camera, X } from "lucide-react";
import LoadingSpinner from "@/components/loader/LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: IMember | null;
}

export const EditMemberModal = ({
  isOpen,
  onClose,
  member,
}: EditMemberModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { useUpdate } = useCrud<IMember>({
    endpoint: "/members",
    queryKey: "members_id",
    message: "membre",
    queryKey2: "members",
    idField: "id",
    contentType: "multipart/form-data",
  });

  const updateMutation = useUpdate();

  // Initialiser la prévisualisation de la photo
  useEffect(() => {
    if (member && isOpen) {
      // Définir l'URL de prévisualisation si le membre a une photo
      if (member.photo && typeof member.photo === "string") {
        setPreviewUrl(getImageUrl(member.photo));
      } else {
        setPreviewUrl(null);
      }
      setSelectedFile(null);
    }
  }, [member, isOpen]);

  // Gérer la sélection de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Créer une URL de prévisualisation
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Supprimer la photo sélectionnée
  const handleRemovePhoto = () => {
    setSelectedFile(null);
    if (member?.photo && typeof member.photo === "string") {
      setPreviewUrl(getImageUrl(member.photo));
    } else {
      setPreviewUrl(null);
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (formData: FormData) => {
    if (!member?.id) return;

    try {
      if (selectedFile) {
        formData.append("photo", selectedFile);
      }
      const memberData = {
        id: member.id,
        ...Object.fromEntries(formData.entries()),
      };

      console.log("Données du membre", memberData);
      await updateMutation.mutate(memberData as unknown as IMember);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onClose();
  };

  if (!member) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Modifier le membre">
      <div className="max-w-2xl mx-auto">
        <form action={handleSubmit} className="space-y-6">
          {/* Section photo */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 border-4 border-gray-200 dark:border-gray-700">
                <AvatarImage
                  src={previewUrl || undefined}
                  alt={`${member.prenom} ${member.nom}`}
                />
                <AvatarFallback className="text-xl">
                  {member.prenom[0]}
                  {member.nom[0]}
                </AvatarFallback>
              </Avatar>

              {selectedFile && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div>
              <Label htmlFor="photo" className="cursor-pointer">
                <div className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Camera className="h-4 w-4" />
                  <span>Changer la photo</span>
                </div>
              </Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Informations personnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="prenom">Prénom *</Label>
              <Input
                id="prenom"
                name="prenom"
                defaultValue={member.prenom}
                required
              />
            </div>

            <div>
              <Label htmlFor="nom">Nom *</Label>
              <Input id="nom" name="nom" defaultValue={member.nom} required />
            </div>

            <div>
              <Label htmlFor="postNom">Post-nom</Label>
              <Input
                id="postNom"
                name="postNom"
                defaultValue={member.postNom}
              />
            </div>

            <div>
              <Label htmlFor="qualiteMembre">Qualité de membre *</Label>
              <Input
                id="qualiteMembre"
                name="qualiteMembre"
                defaultValue={member.qualiteMembre}
                required
                placeholder="Ex: Membre actif, Membre fondateur..."
              />
            </div>
          </div>

          {/* Informations de contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={member.email}
              />
            </div>

            <div>
              <Label htmlFor="telephone">Téléphone *</Label>
              <Input
                id="telephone"
                name="telephone"
                type="tel"
                defaultValue={member.telephone}
                required
                placeholder="+243 XXX XXX XXX"
              />
            </div>
          </div>

          {/* Localisation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="province">Province *</Label>
              <Select name="province" defaultValue={member.province}>
                <SelectTrigger className="py-2 rounded-lg px-6 border border-white">
                  <SelectValue placeholder="Sélectionner une province" />
                </SelectTrigger>
                <SelectContent>
                  {RDC_PROVINCES.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="adresse">Adresse *</Label>
              <Input
                id="adresse"
                name="adresse"
                defaultValue={member.adresse}
                required
                placeholder="Adresse complète"
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={updateMutation.isPending}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="min-w-[120px]"
            >
              {updateMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner />
                  <span>Modification...</span>
                </div>
              ) : (
                "Modifier"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
