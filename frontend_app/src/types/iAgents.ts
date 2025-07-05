export interface IAgent {
  id: string;
  user: {
    nom: string;
    postNom: string;
    prenom: string;
    genre: "Homme" | "Femme";
    telephone: string;
    photo: string;
  };
  fonction?: string;
  societe?: string;
  appartenancePolitique?: string;
  niveauEtudes?: string;
}
