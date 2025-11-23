import * as turf from "@turf/turf";
import type { PolygonMeasurements, Vertex } from "../model/types";

export const calculatePolygonMeasurements = (
  vertices: Vertex[]
): PolygonMeasurements => {
  if (vertices.length < 3) {
    return { area: 0, perimeter: 0 };
  }

  const coords = vertices.map((v) => [v[1], v[0]]);
  coords.push(coords[0]);
  const poly = turf.polygon([[...coords]]);

  return {
    area: turf.area(poly) / 1000000, // Convert to km²
    perimeter: turf.length(poly, { units: "kilometers" }) * 1000, // Convert to meters
  };
};

export const createGeoJSON = (vertices: Vertex[]) => {
  const coords = vertices.map((p) => [p[1], p[0]]);
  coords.push(coords[0]);

  return {
    type: "Feature" as const,
    geometry: { type: "Polygon" as const, coordinates: [coords] },
    properties: {},
  };
};

export const createWKT = (vertices: Vertex[]): string => {
  const coords = vertices.map((p) => `${p[1]} ${p[0]}`).join(", ");
  return `POLYGON((${coords}, ${vertices[0][1]} ${vertices[0][0]}))`;
};

export const calculatePolygonMetrics = (vertices: Vertex[]) => {
  if (vertices.length < 3) {
    return { area: 0, perimeter: 0 };
  }

  const coords = vertices.map((v) => [v[1], v[0]]);
  coords.push(coords[0]);
  const poly = turf.polygon([[...coords]]);
  
  const area = turf.area(poly);
  const perimeter = turf.length(poly, { units: "kilometers" }) * 1000;

  return { area, perimeter };
};