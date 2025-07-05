import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCrud } from "@/hooks/useCrud";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentId: string;
}

export const AddContributionModal = ({
  isOpen,
  onClose,
  agentId,
}: AddContributionModalProps) => {
  const { useCreate } = useCrud({
    endpoint: `/contributions/add`,
    queryKey: "contributions",
    message: "Contribution",
    queryKey2: `contributions-${agentId}`,
    idField: "id",
  });

  const createMutation = useCreate();

  const handleSubmit = (formData: FormData) => {
    formData.append("agentId", agentId);
    console.log(Object.fromEntries(formData));
    createMutation.mutate(Object.fromEntries(formData));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            Ajouter une contribution
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="montant" className="text-white">
              Montant
            </Label>
            <Input
              id="montant"
              name="montant"
              type="number"
              required
              className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500"
              placeholder="70000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="devise" className="text-white">
              Devise
            </Label>
            <Select name="devise" required defaultValue="CDF">
              <SelectTrigger>
                <SelectValue placeholder="Devise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CDF">CDF</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="moisConcerne" className="text-white">
              Mois concerné
            </Label>
            <Input
              id="moisConcerne"
              name="moisConcerne"
              type="month"
              required
              className="border-white/20 bg-white/10 text-white placeholder-white/50 focus:ring-yellow-500"
              placeholder="MM/YYYY"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900"
            >
              {createMutation.isPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
