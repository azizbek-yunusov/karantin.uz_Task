export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Polygon {
  id: number;
  vertices: [number, number][];
  color: string;
}

export interface MapState {
  center: Coordinate;
  zoom: number;
}

export interface TileCoordinate {
  x: number;
  y: number;
}

export interface PixelCoordinate {
  x: number;
  y: number;
}