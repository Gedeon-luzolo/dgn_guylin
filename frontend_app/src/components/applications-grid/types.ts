export interface Application {
  id: string;
  title: string;
  link: string;
}

export const applications: Application[] = [
  {
    id: "adhesion",
    title: "ADHÉSION ET RENOUVELLEMENT",

    link: "/members",
  },
  {
    id: "documents",
    title: "DOCUMENTS & MODÈLES PRÉ-DÉFINIS",

    link: "#",
  },
  {
    id: "cotisations",
    title: "PAIEMENT DES COTISATIONS (10$)",

    link: "/agents",
  },
  {
    id: "logo",
    title: "NOS EFFIGIES (LOGO & AUTRES)",

    link: "#",
  },
  {
    id: "app1",
    title: "APPLICATION 1",

    link: "#",
  },
  {
    id: "app2",
    title: "APPLICATION 2",

    link: "#",
  },
];
