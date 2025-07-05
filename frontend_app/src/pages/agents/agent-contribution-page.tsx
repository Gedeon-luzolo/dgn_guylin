import { useState } from "react";
import { BackButton } from "@/components/ui/backButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FlagOverlay } from "@/components/backgrounds/flag-overlay";
import { UserIcon, PlusCircleIcon, HistoryIcon } from "lucide-react";
import type { IAgent } from "@/types/iAgents";
import { getImageUrl } from "@/lib/genFuction";
import { useCrud } from "@/hooks/useCrud";
import { useParams } from "react-router-dom";
import { AddContributionModal } from "@/components/agents/add-contribution-modal";
import type { IContribution } from "@/types/contribution-type";
import { formatNumber } from "@/lib/format-money";

export const AgentContributionPage = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { useGet: useGetAgent } = useCrud<IAgent>({
    endpoint: "/agents",
    queryKey: "agents",
  });

  const { useList: useGetContributions } = useCrud<IContribution>({
    endpoint: `/contributions/agent/${id}`,
    queryKey: `contributions-${id}`,
    queryKey2: "agent",
  });

  const { data: agent } = useGetAgent(id as string);
  const { data: contributions = [] } = useGetContributions();

  if (!agent) return null;

  return (
    <div>
      <FlagOverlay />
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <BackButton to="/agents" className="mt-6 mr-10" />

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 rounded-3xl">
            {/* En-tête du profil */}
            <div className="text-center mb-8">
              <div className="size-24 mx-auto mb-4 rounded-full overflow-hidden bg-white/20 ring-4 ring-white/20">
                {agent.user.photo ? (
                  <img
                    src={getImageUrl(agent.user.photo)}
                    alt={`${agent.user.nom} ${agent.user.postNom}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    <UserIcon className="w-12 h-12" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white">
                {agent.user.nom} {agent.user.postNom} {agent.user.prenom}
              </h2>
              <p className="text-white/70 mt-1">
                {agent.fonction || "TRANS ACADEMIA"}
              </p>
            </div>

            {/* Section historique des paiements */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <HistoryIcon className="w-5 h-5" />
                  Historique des paiements
                </h3>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 flex items-center gap-2"
                >
                  <PlusCircleIcon className="w-4 h-4" />
                  Ajouter un paiement
                </Button>
              </div>

              {/* Table des paiements */}
              <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="px-4 py-3 text-center text-sm font-medium text-white/80">
                        Référence
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-white/80">
                        Mois concerné
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-white/80">
                        Montant
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {contributions.map((contribution) => (
                      <tr
                        key={contribution.id}
                        className="hover:bg-white/5 transition-colors duration-150"
                      >
                        <td className="px-4 py-3 text-sm text-center text-white">
                          {contribution.reference}
                        </td>
                        <td className="px-4 py-3 text-sm text-center text-white">
                          {contribution.moisConcerne}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-white">
                          {formatNumber(contribution.montant)}{" "}
                          {contribution.devise}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <AddContributionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        agentId={id as string}
      />
    </div>
  );
};
