import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCrud } from "@/hooks/useCrud";
import type { IMember } from "@/types/memberType";
import LoadingSpinner from "@/components/loader/LoadingSpinner";
import { getImageUrl } from "@/lib/genFuction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { provinces } from "@/lib/provinceRdc";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteConfirmationModal } from "@/components/ui/delete-confirmation-modal";

export const MembersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [memberToDelete, setMemberToDelete] = useState<IMember | null>(null);

  const { useList, useDelete } = useCrud<IMember>({
    endpoint: "/members",
    queryKey: "members",
    message: "membres",
  });

  const { data: members = [], isLoading, isError } = useList();
  const deleteMutation = useDelete();

  const handleDelete = async (member: IMember) => {
    setMemberToDelete(member);
  };

  const confirmDelete = async () => {
    if (memberToDelete) {
      await deleteMutation.mutateAsync(memberToDelete.id);
      setMemberToDelete(null);
    }
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      searchTerm === "" ||
      `${member.nom} ${member.postNom} ${member.prenom}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      member.qualiteMembre.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProvince =
      selectedProvince === "all" || member.province === selectedProvince;

    return matchesSearch && matchesProvince;
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-error-500 dark:text-error-400 p-4">
        <p>Erreur lors de la récupération des membres</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-6 mt-16 flex items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nos Membres
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Découvrez les membres de notre association
          </p>
        </div>

        <div>
          <Link to="/adhesion">
            <Button>Adherer un membre</Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {provinces.map((province) => (
              <Button
                key={province}
                onClick={() => setSelectedProvince(province)}
                variant={selectedProvince === province ? "default" : "outline"}
                className="backdrop-blur-sm whitespace-nowrap"
              >
                {province}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Members Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <Card
              key={member.telephone}
              className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16 border-2 border-white/20">
                    <AvatarImage
                      src={
                        member.photo
                          ? getImageUrl(member.photo as string)
                          : undefined
                      }
                      alt={`${member.prenom} ${member.nom}`}
                    />
                    <AvatarFallback className="text-lg">
                      {member.prenom[0]}
                      {member.nom[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {member.prenom} {member.postNom} {member.nom}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {member.qualiteMembre}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Province:</span>{" "}
                    {member.province}
                  </p>
                  <p>
                    <span className="font-medium">Adresse:</span>{" "}
                    {member.adresse}
                  </p>
                  {member.telephone && (
                    <p>
                      <span className="font-medium">Téléphone:</span>{" "}
                      {member.telephone}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                          onClick={() => {
                            // TODO: Implémenter la vue détaillée
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Voir les détails</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link to={`/membres/${member.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-100"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Modifier</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                          onClick={() => handleDelete(member)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Supprimer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              Aucun membre ne correspond à votre recherche
            </p>
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={!!memberToDelete}
        onClose={() => setMemberToDelete(null)}
        onConfirm={confirmDelete}
        title="Supprimer le membre"
        description={`Êtes-vous sûr de vouloir supprimer ${memberToDelete?.prenom} ${memberToDelete?.nom} ? Cette action est irréversible.`}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};
