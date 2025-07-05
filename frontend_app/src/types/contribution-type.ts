export interface IContribution {
  id: string;
  reference: string;
  montant: number;
  moisConcerne: string;
  devise: "USD" | "CDF";
  createdAt: string;
  agentId: string;
}
