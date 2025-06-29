import type { RDC_PROVINCES } from "@/lib/provinceRdc";

// Types pour les données des provinces de la RDC
export interface ProvinceData {
  name: string;
  value: number;
  properties?: ProvinceProperties;
}

// Type pour les données détaillées d'une province
export interface ProvinceDetailedData {
  effectif: number;
  ville: string;
  responsable: string;
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

// Type pour les données GeoJSON complètes
export interface RDCGeoJSONData {
  type: "FeatureCollection";
  features: ProvinceFeature[];
}

// Type pour les données par province (nom -> valeur)
export type ProvinceDataMap = Record<string, number>;

// Type pour les données détaillées par province
export type ProvinceDetailedDataMap = Record<string, ProvinceDetailedData>;

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
  detailedDataByProvince?: ProvinceDetailedDataMap;
  colorScheme?: "Blues" | "Greens" | "Reds" | "Oranges" | "Purples";
  showLegend?: boolean;
  enableTooltips?: boolean;
  onProvinceClick?: (
    provinceName: string,
    value?: number,
    detailedData?: ProvinceDetailedData
  ) => void;
  onProvinceHover?: (
    provinceName: string,
    value?: number,
    detailedData?: ProvinceDetailedData
  ) => void;
  className?: string;
}


export type RDCProvinceName = (typeof RDC_PROVINCES)[number];
