import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCrud } from "@/hooks/useCrud";

interface CreateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateArticleModal = ({
  isOpen,
  onClose,
}: CreateArticleModalProps) => {
  // État pour les images uniquement
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Hook CRUD personnalisé
  const { useCreate } = useCrud({
    endpoint: "/news",
    queryKey: "news",
    message: "Article",
    contentType: "multipart/form-data",
  });

  const createMutation = useCreate();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);

      // Créer des URLs temporaires pour la prévisualisation
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    // Libérer l'URL de prévisualisation
    URL.revokeObjectURL(previewImages[index]);

    // Supprimer l'image des états
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Supprimer les anciennes données d'images du formData
    formData.delete("images");

    // Ajouter les fichiers d'images directement
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    // Envoyer les données
    createMutation.mutate(formData, {
      onSuccess: () => {
        // Nettoyer les URLs de prévisualisation
        previewImages.forEach((preview) => URL.revokeObjectURL(preview));
        setImageFiles([]);
        setPreviewImages([]);
        onClose();
      },
    });

    console.log(Object.entries(formData.entries()));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un nouvel article</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour créer un nouvel article.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              name="title"
              placeholder="Titre de l'article"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Contenu</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Contenu de l'article"
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Images</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {previewImages.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <img
                    src={imageUrl}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Cliquez pour ajouter</span>{" "}
                    ou glissez et déposez
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG ou JPEG
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending
                ? "Publication..."
                : "Publier l'article"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
