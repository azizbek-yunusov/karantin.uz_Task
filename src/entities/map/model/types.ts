export type Vertex = [number, number]; 

export interface PolygonMeasurements {
  area: number; // km²
  perimeter: number; // meters
}

export interface PolygonState {
  vertices: Vertex[];
  isFinished: boolean;
  measurements: PolygonMeasurements;
}