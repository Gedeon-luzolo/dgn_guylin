export interface IMember {
  id: string;
  nom: string;
  postNom: string;
  prenom: string;
  qualiteMembre: string;
  province: string;
  adresse: string;
  email: string;
  telephone: string;
  photo: File | null | string;
}
