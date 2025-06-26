import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import type { RDCGeoJSONData, ProvinceFeature, CarteRDCProps } from "./types";

const CarteRDC: React.FC<CarteRDCProps> = ({
  width = 800,
  height = 600,
  dataByProvince = {
    Kinshasa: 120,
    "Kongo-Central": 80,
    "Haut-Katanga": 95,
    "Nord-Kivu": 60,
    "Sud-Kivu": 70,
    Kasaï: 55,
    "Kasaï-Central": 45,
    "Kasaï-Oriental": 40,
    Lomami: 35,
    Sankuru: 30,
    Maniema: 25,
    Tshopo: 50,
    "Bas-Uele": 20,
    "Haut-Uele": 22,
    Ituri: 65,
    Équateur: 38,
    Mongala: 15,
    "Nord-Ubangi": 18,
    "Sud-Ubangi": 28,
    Tshuapa: 32,
    "Mai-Ndombe": 42,
    Kwilu: 48,
    Kwango: 35,
    Lualaba: 75,
    "Haut-Lomami": 58,
    Tanganyika: 85,
  },
  colorScheme = "interpolateBlues",
  showLegend = true,
  enableTooltips = true,
  onProvinceClick,
  onProvinceHover,
  className = "",
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const loadMapData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setHasError(false);

        // Chargement du fichier GeoJSON
        const geoData = (await d3.json(
          "/rdc-provinces.geojson"
        )) as RDCGeoJSONData;

        if (!geoData || !geoData.features) {
          throw new Error("Données GeoJSON invalides");
        }

        renderMap(geoData);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données de la carte:",
          error
        );
        setHasError(true);
        setIsLoading(false);
      }
    };

    const renderMap = (geoData: RDCGeoJSONData): void => {
      const svg = d3.select(svgRef.current);

      // Nettoyage du SVG
      svg.selectAll("*").remove();

      // Configuration de la projection
      const projection = d3
        .geoMercator()
        .fitSize([width, height], geoData as any);

      const pathGenerator = d3.geoPath().projection(projection);

      // Création de l'échelle de couleurs
      const dataValues = Object.values(dataByProvince);

      // Sélection dynamique du schéma de couleurs
      const colorInterpolator = (d3 as any)[colorScheme] || d3.interpolateBlues;
      const colorScale = d3
        .scaleSequential(colorInterpolator)
        .domain([d3.min(dataValues) || 0, d3.max(dataValues) || 100]);

      // Création du conteneur principal
      const mapGroup = svg.append("g").attr("class", "map-container");

      // Dessin des provinces
      const paths = mapGroup
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", (feature) => pathGenerator(feature as any))
        .attr("fill", (feature: ProvinceFeature) => {
          const provinceName = feature.properties.NAME_1;
          const value = dataByProvince[provinceName];
          return value !== undefined ? colorScale(value) : "#ccc";
        })
        .attr("stroke", "#333")
        .attr("stroke-width", 0.5)
        .attr("cursor", "pointer")
        .on(
          "mouseover",
          function (event: MouseEvent, feature: ProvinceFeature) {
            // Mise en évidence de la province survolée
            d3.select(this).attr("stroke-width", 2).attr("stroke", "#000");

            // Appel du callback onProvinceHover si fourni
            if (onProvinceHover) {
              const provinceName = feature.properties.NAME_1;
              const value = dataByProvince[provinceName];
              onProvinceHover(provinceName, value);
            }
          }
        )
        .on("mouseout", function () {
          // Retour à l'état normal
          d3.select(this).attr("stroke-width", 0.5).attr("stroke", "#333");
        })
        .on("click", function (event: MouseEvent, feature: ProvinceFeature) {
          // Appel du callback onProvinceClick si fourni
          if (onProvinceClick) {
            const provinceName = feature.properties.NAME_1;
            const value = dataByProvince[provinceName];
            onProvinceClick(provinceName, value);
          }
        });

      // Ajout des tooltips si activés
      if (enableTooltips) {
        paths.append("title").text((feature: ProvinceFeature) => {
          const provinceName = feature.properties.NAME_1;
          const value = dataByProvince[provinceName];

          // Utilisation des propriétés GADM disponibles
          const country = feature.properties.COUNTRY;
          const type = feature.properties.TYPE_1;
          const gid = feature.properties.GID_1;

          let tooltipText = `Province: ${provinceName}`;
          if (type) tooltipText += `\nType: ${type}`;
          if (value !== undefined) tooltipText += `\nValeur: ${value}`;
          if (country) tooltipText += `\nPays: ${country}`;
          if (gid) tooltipText += `\nCode: ${gid}`;

          return tooltipText;
        });
      }

      // Ajout d'une légende si demandée
      if (showLegend) {
        createLegend(svg, colorScale, dataValues);
      }
    };

    const createLegend = (
      svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
      colorScale: d3.ScaleSequential<string, never>,
      dataValues: number[]
    ): void => {
      const legendWidth = 200;
      const legendHeight = 20;
      const legendX = width - legendWidth - 20;
      const legendY = height - 60;

      const legendGroup = svg
        .append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${legendX}, ${legendY})`);

      // Création du gradient pour la légende
      const defs = svg.append("defs");
      const gradient = defs
        .append("linearGradient")
        .attr("id", "legend-gradient")
        .attr("x1", "0%")
        .attr("x2", "100%");

      const minValue = d3.min(dataValues) || 0;
      const maxValue = d3.max(dataValues) || 100;

      // Ajout des couleurs du gradient
      for (let i = 0; i <= 10; i++) {
        const value = minValue + (maxValue - minValue) * (i / 10);
        gradient
          .append("stop")
          .attr("offset", `${i * 10}%`)
          .attr("stop-color", colorScale(value));
      }

      // Rectangle de la légende
      legendGroup
        .append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("fill", "url(#legend-gradient)")
        .attr("stroke", "#333")
        .attr("stroke-width", 1);

      // Étiquettes de la légende
      legendGroup
        .append("text")
        .attr("x", 0)
        .attr("y", legendHeight + 15)
        .attr("text-anchor", "start")
        .attr("font-size", "12px")
        .attr("fill", "#333")
        .text(String(minValue));

      legendGroup
        .append("text")
        .attr("x", legendWidth)
        .attr("y", legendHeight + 15)
        .attr("text-anchor", "end")
        .attr("font-size", "12px")
        .attr("fill", "#333")
        .text(String(maxValue));

      // Titre de la légende
      legendGroup
        .append("text")
        .attr("x", legendWidth / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("fill", "#333")
        .text("Valeurs");
    };

    loadMapData();
  }, [width, height, dataByProvince, colorScheme, showLegend, enableTooltips]);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ width, height }}
      >
        <div className="text-lg">Chargement de la carte...</div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        className="flex items-center justify-center bg-red-50 border border-red-200 rounded-lg"
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">
            Erreur de chargement
          </div>
          <div className="text-red-500 text-sm">
            Impossible de charger le fichier rdc-provinces.geojson
          </div>
          <div className="text-gray-600 text-xs mt-2">
            Assurez-vous que le fichier est présent dans le dossier public/
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`carte-rdc-container ${className}`}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="border border-gray-300 rounded-lg shadow-lg"
        style={{ background: "#f8f9fa" }}
      >
        {/* Le contenu sera généré par D3.js */}
      </svg>
    </div>
  );
};

export default CarteRDC;
