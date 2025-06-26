// Types pour les données des provinces de la RDC
export interface ProvinceData {
  name: string;
  value: number;
  properties?: ProvinceProperties;
}

// Types pour les propriétés des provinces dans les données GADM
export interface ProvinceProperties {
  GID_1: string; // Identifiant unique de la province
  GID_0: string; // Identifiant du pays
  COUNTRY: string; // Nom du pays
  NAME_1: string; // Nom de la province
  VARNAME_1: string | null; // Nom alternatif
  NL_NAME_1: string | null; // Nom local
  TYPE_1: string; // Type administratif (Province)
  ENGTYPE_1: string; // Type en anglais
  CC_1: string | null; // Code de pays
  HASC_1: string; // Code HASC
  ISO_1: string | null; // Code ISO
}

// Type pour une feature de province dans le GeoJSON
export interface ProvinceFeature {
  type: "Feature";
  properties: ProvinceProperties;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

// Type pour l'ensemble des données GeoJSON de la RDC
export interface RDCGeoJSONData {
  type: "FeatureCollection";
  name?: string;
  crs?: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: ProvinceFeature[];
}

// Type pour les données par province (nom -> valeur)
export type ProvinceDataMap = Record<string, number>;

// Configuration de la carte
export interface MapConfig {
  width: number;
  height: number;
  colorScheme: string;
  showLegend: boolean;
  enableTooltips: boolean;
  enableZoom: boolean;
}

// Types pour les props du composant CarteRDC
export interface CarteRDCProps {
  width?: number;
  height?: number;
  dataByProvince?: Record<string, number>;
  colorScheme?: string;
  showLegend?: boolean;
  enableTooltips?: boolean;
  onProvinceClick?: (provinceName: string, value?: number) => void;
  onProvinceHover?: (provinceName: string, value?: number) => void;
  className?: string;
}

// Liste des provinces de la RDC
export const RDC_PROVINCES = [
  "Kinshasa",
  "Kongo-Central",
  "Haut-Katanga",
  "Nord-Kivu",
  "Sud-Kivu",
  "Kasaï",
  "Kasaï-Central",
  "Kasaï-Oriental",
  "Lomami",
  "Sankuru",
  "Maniema",
  "Tshopo",
  "Bas-Uele",
  "Haut-Uele",
  "Ituri",
  "Équateur",
  "Mongala",
  "Nord-Ubangi",
  "Sud-Ubangi",
  "Tshuapa",
  "Mai-Ndombe",
  "Kwilu",
  "Kwango",
  "Lualaba",
  "Haut-Lomami",
  "Tanganyika",
] as const;

export type RDCProvinceName = (typeof RDC_PROVINCES)[number];
