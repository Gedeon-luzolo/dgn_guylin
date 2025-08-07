export interface IAgent {
  id: string;
  nom: string;
  postNom: string;
  prenom: string;
  genre: "Homme" | "Femme";
  telephone: string;
  photo: string;
  fonction?: string;
  societe?: string;
  appartenancePolitique?: string;
  niveauEtudes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    nom: string;
    postNom: string;
    prenom: string;
    genre: "Homme" | "Femme";
    telephone: string;
    photo: string;
  } | null;
}
