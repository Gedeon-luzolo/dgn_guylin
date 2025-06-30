import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCrud } from "@/hooks/useCrud";
import type { IMember } from "@/types/memberType";
import LoadingSpinner from "@/components/loader/LoadingSpinner";
import { getImageUrl } from "@/lib/genFuction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RDC_PROVINCES } from "@/lib/provinceRdc";
import { Link } from "react-router-dom";
import { Pencil, Trash2, IdCard } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { MemberCard } from "@/components/members/member-card";
import { toPng } from "html-to-image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteConfirmationModal } from "@/components/ui/delete-confirmation-modal";
import { EditMemberModal } from "@/components/members/edit-member-modal";
import { ErrorPage } from "../error/error-page";

export const MembersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [memberToDelete, setMemberToDelete] = useState<IMember | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null);
  const [memberToEdit, setMemberToEdit] = useState<IMember | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const provinces = ["all", ...RDC_PROVINCES];

  const { useList, useDelete } = useCrud<IMember>({
    endpoint: "/members",
    queryKey: "members",
    message: "membres",
  });

  const { data: members = [], isLoading, isError } = useList();
  console.log(members);

  const deleteMutation = useDelete();

  const handleDelete = async (member: IMember) => {
    setMemberToDelete(member);
  };

  const confirmDelete = async () => {
    if (memberToDelete) {
      await deleteMutation.mutate(memberToDelete.id as string);
      setMemberToDelete(null);
    }
  };

  const handleShowCard = (member: IMember) => {
    setSelectedMember(member);
    setShowCard(true);
  };

  const handleEditMember = (member: IMember) => {
    setMemberToEdit(member);
  };

  const handleDownload = async () => {
    if (cardRef.current && !isCapturing) {
      setIsCapturing(true);
      try {
        const dataUrl = await toPng(cardRef.current, {
          cacheBust: true,
          pixelRatio: 2,
        });

        const link = document.createElement("a");
        link.download = `Carte_Membre_${selectedMember?.nom}_${selectedMember?.postNom}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Erreur lors de la capture:", error);
      } finally {
        setIsCapturing(false);
      }
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

  if (isError) return <ErrorPage />;

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
          <Link to="/type-membre">
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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <Card
              key={member.telephone}
              className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12 border-2 border-white/20">
                    <AvatarImage
                      src={
                        member.photo
                          ? getImageUrl(member.photo as string)
                          : undefined
                      }
                      alt={`${member.prenom} ${member.nom}`}
                    />
                    <AvatarFallback className="text-sm">
                      {member.prenom[0]}
                      {member.nom[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {member.prenom} {member.nom}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                      {member.qualiteMembre}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-300 mb-3">
                  <p className="truncate">
                    <span className="font-medium">Province:</span>{" "}
                    {member.province}
                  </p>
                  <p className="truncate">
                    <span className="font-medium">Adresse:</span>{" "}
                    {member.adresse}
                  </p>
                </div>
                <div className="flex justify-end gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                          onClick={() => handleShowCard(member)}
                        >
                          <IdCard className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Voir la carte de membre</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-amber-600 hover:text-amber-700 hover:bg-amber-100"
                          onClick={() => handleEditMember(member)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
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
                          className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-100"
                          onClick={() => handleDelete(member)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-3 w-3" />
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

        {/* Modal pour la carte de membre */}
        <Modal
          isOpen={showCard}
          onClose={() => setShowCard(false)}
          title="CARTE DE MEMBRE"
        >
          <div className="space-y-8">
            <div ref={cardRef} className="p-4 rounded-lg">
              {selectedMember && (
                <MemberCard
                  memberData={{
                    ...selectedMember,
                    photo: selectedMember.photo
                      ? getImageUrl(selectedMember.photo as string)
                      : null,
                  }}
                />
              )}
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Button
                onClick={handleDownload}
                disabled={isCapturing}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>{isCapturing ? "⏳" : "⬇️"}</span>
                <span>
                  {isCapturing ? "Capture en cours..." : "Télécharger en PNG"}
                </span>
              </Button>
            </div>
          </div>
        </Modal>

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

      <EditMemberModal
        isOpen={!!memberToEdit}
        onClose={() => setMemberToEdit(null)}
        member={memberToEdit}
      />
    </div>
  );
};
