/* eslint-disable*/

import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import type {
  RDCGeoJSONData,
  ProvinceFeature,
  CarteRDCProps,
  ProvinceDetailedData,
} from "./types";

const CarteRDC: React.FC<CarteRDCProps> = ({
  width = 800,
  height = 600,
  dataByProvince = {
    Kinshasa: 120,
    "Haut-Katanga": 95,
    Tanganyika: 50,
    Lualaba: 32,
    "Haut-Lomami": 32,
  },
  detailedDataByProvince = {
    Kinshasa: { effectif: 120, ville: "Kinshasa", responsable: "Jean Mukamba" },
    "Haut-Katanga": {
      effectif: 95,
      ville: "Lubumbashi",
      responsable: "Marie Tshisekedi",
    },
    Tanganyika: { effectif: 50, ville: "Kalemie", responsable: "Paul Mwanza" },
    Lualaba: { effectif: 32, ville: "Kolwezi", responsable: "Sophie Kabila" },
    "Haut-Lomami": {
      effectif: 32,
      ville: "Kamina",
      responsable: "André Kilolo",
    },
  },
  colorScheme = "Blues",
  onProvinceClick,
  onProvinceHover,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geoData, setGeoData] = useState<RDCGeoJSONData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Couleurs pour la carte
  const defaultColor = "#C4C4C4"; // Couleur par défaut pour les provinces non colorées
  const provincesColor = "#2563eb"; // Couleur bleue uniforme pour les provinces spécifiées
  const borderColor = "#333";

  useEffect(() => {
    const loadGeoData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/rdc-provinces.geojson");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data: RDCGeoJSONData = await response.json();
        setGeoData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    loadGeoData();
  }, []);

  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Configuration de la projection
    const projection = d3
      .geoMercator()
      .fitSize([width, height], geoData as any);

    const path = d3.geoPath().projection(projection);

    // Obtenir les provinces à colorer
    const provincesToColor = Object.keys(dataByProvince);

    // Groupe principal pour la carte
    const mapGroup = svg.append("g").attr("class", "map-group");

    // Dessiner les provinces
    mapGroup
      .selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", (d: ProvinceFeature) => path(d as any))
      .attr("fill", (d: ProvinceFeature) => {
        const provinceName = d.properties.NAME_1;
        // Vérifier si la province doit être colorée
        if (provincesToColor.includes(provinceName)) {
          return provincesColor; // Couleur bleue uniforme
        }
        // Couleur par défaut pour les provinces non spécifiées
        return defaultColor;
      })
      .attr("stroke", borderColor)
      .attr("stroke-width", 1)
      .attr("opacity", 0.8)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d: ProvinceFeature) {
        const provinceName = d.properties.NAME_1;

        // Effet de survol
        d3.select(this)
          .attr("fill", "#ff6b6b") // Rouge au survol
          .attr("stroke-width", 4)
          .attr("opacity", 1)
          .style("cursor", "pointer");

        // Créer le tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "carte-rdc-tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.8)")
          .style("color", "white")
          .style("padding", "10px")
          .style("border-radius", "5px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("z-index", "1000");

        // Contenu du tooltip
        let tooltipContent = `<strong>${provinceName}</strong>`;

        const detailedData: ProvinceDetailedData | undefined =
          detailedDataByProvince[provinceName];

        if (detailedData) {
          tooltipContent += `<br/><strong>Membres:</strong> ${detailedData.effectif}`;
          tooltipContent += `<br/><strong>Ville:</strong> ${detailedData.ville}`;
          tooltipContent += `<br/><strong>Responsable:</strong> ${detailedData.responsable}`;
        } else {
          tooltipContent += ``;
        }

        tooltip.html(tooltipContent);

        // Positionner le tooltip
        const [mouseX, mouseY] = d3.pointer(event, document.body);
        tooltip
          .style("left", `${mouseX + 10}px`)
          .style("top", `${mouseY - 10}px`);

        // Callback personnalisé
        if (onProvinceHover) {
          const value = provincesToColor.includes(provinceName)
            ? dataByProvince[provinceName]
            : undefined;
          onProvinceHover(provinceName, value, detailedData);
        }
      })
      .on("mouseout", function (_event, d: ProvinceFeature) {
        const provinceName = d.properties.NAME_1;

        // Déterminer la couleur originale de cette province
        const originalColor = provincesToColor.includes(provinceName)
          ? provincesColor // Couleur bleue pour les provinces spécifiées
          : defaultColor; // Couleur grise pour les autres provinces

        // Retirer l'effet de survol et restaurer la couleur originale
        d3.select(this)
          .attr("fill", originalColor)
          .attr("stroke-width", 1)
          .attr("opacity", 0.8);

        // Supprimer le tooltip
        d3.selectAll(".carte-rdc-tooltip").remove();
      })
      .on("click", function (_event, d: ProvinceFeature) {
        const provinceName = d.properties.NAME_1;
        if (onProvinceClick) {
          const value = provincesToColor.includes(provinceName)
            ? dataByProvince[provinceName]
            : undefined;
          const detailedData: ProvinceDetailedData | undefined =
            detailedDataByProvince[provinceName];
          onProvinceClick(provinceName, value, detailedData);
        }
      });

    // Ajouter les labels et étoiles pour les provinces sélectionnées
    const selectedProvinces = Object.keys(detailedDataByProvince);

    selectedProvinces.forEach((provinceName) => {
      const feature = geoData.features.find(
        (f) => f.properties.NAME_1 === provinceName
      );

      if (feature) {
        // Calculer le centroïde de la province
        const centroid = path.centroid(feature as any);

        if (centroid && !isNaN(centroid[0]) && !isNaN(centroid[1])) {
          // Ajouter l'étoile
          mapGroup
            .append("text")
            .attr("x", centroid[0])
            .attr("y", centroid[1] - 10)
            .attr("text-anchor", "middle")
            .attr("font-size", "16px")
            .attr("fill", "#FFD700")
            .attr("stroke", "#FFA500")
            .attr("stroke-width", "0.5px")
            .style("cursor", "pointer")
            .text("★");

          // Ajouter le nom de la province
          mapGroup
            .append("text")
            .attr("x", centroid[0])
            .attr("y", centroid[1] + 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "11px")
            .attr("font-weight", "bold")
            .attr("fill", "#1a365d")
            .attr("stroke", "white")
            .attr("stroke-width", "1px")
            .attr("paint-order", "stroke")
            .style("cursor", "pointer")
            .text(provinceName);
        }
      }
    });
  }, [
    geoData,
    width,
    height,
    dataByProvince,
    detailedDataByProvince,
    colorScheme,
    onProvinceClick,
    onProvinceHover,
  ]);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">
            Chargement de la carte...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width, height }}
      >
        <div className="text-center text-red-600">
          <p className="font-semibold">Erreur de chargement</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carte-rdc-container">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        // style={{
        //   border: "1px solid #ddd",
        //   borderRadius: "8px",
        // }}
      />
    </div>
  );
};

export default CarteRDC;
