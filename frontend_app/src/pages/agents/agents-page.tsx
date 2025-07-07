import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/backButton";
import { Link, useNavigate } from "react-router-dom";
import { useCrud } from "@/hooks/useCrud";
import { PhoneIcon, UserIcon, WalletIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { IAgent } from "@/types/iAgents";
import { FlagOverlay } from "@/components/backgrounds/flag-overlay";
import { getImageUrl } from "@/lib/genFuction";

export function AgentsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<IAgent[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { useList } = useCrud<IAgent>({
    endpoint: "/agents",
    queryKey: "agents",
  });

  const { data: agents = [] } = useList();

  const handleSearch = () => {
    setIsSearching(true);
    const normalizedSearch = searchTerm.toLowerCase().trim();

    const results = agents.filter((agent) => {
      const fullName =
        `${agent.user.nom} ${agent.user.postNom} ${agent.user.prenom}`.toLowerCase();
      return fullName.includes(normalizedSearch);
    });

    setSearchResults(results);
  };

  const handleAgentClick = (agentId: string) => {
    navigate(`/agents/${agentId}/contributions`);
  };

  return (
    <div className=" bg-blue-600 overflow-hidden">
      {/* Flag Overlay */}
      <FlagOverlay className="fixed" />
      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-4 py-30">
        {/* Bouton retour */}
        <BackButton to="/applications" className="mb-10" />

        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bienvenue sur votre espace dédié
            <br />
            aux contributions de 10 %
          </h1>
        </div>

        {/* Barre de recherche */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Saisissez votre nom ou prénom pour retouver la matricule"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full h-14 pl-6 pr-32 rounded-full bg-white/90 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-yellow-400"
            />
            <Button
              className="absolute right-2 top-2 h-10 px-6 rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold"
              onClick={handleSearch}
            >
              Rechercher
            </Button>
          </div>
        </div>

        {/* Résultats de recherche */}
        {isSearching && (
          <div className="max-w-3xl mx-auto mt-8">
            {searchResults.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-white mb-6">
                  <h2 className="text-xl font-semibold">
                    {searchResults.length} résultat
                    {searchResults.length > 1 ? "s" : ""} trouvé
                    {searchResults.length > 1 ? "s" : ""}
                  </h2>
                  <button
                    onClick={() => setIsSearching(false)}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    Effacer la recherche
                  </button>
                </div>

                {searchResults.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAgentClick(agent.id)}
                    className="group relative bg-white/10 hover:bg-white/15 backdrop-blur-lg border border-white/10 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative p-2 sm:p-6 flex items-center gap-4">
                      {/* Photo de profil avec animation au hover */}
                      <div className="relative">
                        <div className="size-12 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white/20 ring-2 ring-white/20 group-hover:ring-yellow-400/50 transition-all duration-300">
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
                              <UserIcon className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Informations de l'agent */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-white truncate group-hover:text-yellow-400 transition-colors duration-300">
                              {agent.user.nom} {agent.user.postNom}
                            </h3>
                            <p className="text-white/70 text-sm">
                              {agent.user.prenom}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-white/60 text-sm">
                              <PhoneIcon className="w-4 h-4 mr-1" />
                              <span className="hidden sm:inline">
                                {agent.user.telephone}
                              </span>
                              <span className="sm:hidden">
                                {agent.user.telephone.slice(-4)}
                              </span>
                            </div>
                            <div className="hidden sm:flex items-center text-yellow-400/70 group-hover:text-yellow-400 transition-colors duration-300">
                              <WalletIcon className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/10"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-white/40" />
                </div>
                <p className="text-white text-lg mb-4">
                  Aucun agent trouvé avec ces critères de recherche.
                </p>
                <p className="text-white/60 mb-6">
                  Essayez de modifier vos termes de recherche ou créez un nouvel
                  agent.
                </p>
                <Link to="/agents/create">
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900">
                    Créer un nouvel agent
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        )}

        {!isSearching && (
          <div className="text-center">
            <p className="text-white mb-2">
              L'agent n'est pas encore enregistré ?
            </p>
            <Link to="/agents/create">
              <Button
                variant="link"
                className="text-yellow-300 hover:text-yellow-400 underline"
              >
                Veuillez créer son profil.
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
