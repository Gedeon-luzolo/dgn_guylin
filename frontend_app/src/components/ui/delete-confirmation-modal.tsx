import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isDeleting?: boolean;
}

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isDeleting = false,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white/80 dark:bg-gray-800/70 backdrop-blur-lg border-0 shadow-lg">
        <DialogHeader className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <DialogTitle className="text-xl text-red-600 dark:text-red-400">
              {title}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 backdrop-blur-sm"
              disabled={isDeleting}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              className="flex-1 backdrop-blur-sm"
              disabled={isDeleting}
            >
              {isDeleting ? "Suppression..." : "Supprimer"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
