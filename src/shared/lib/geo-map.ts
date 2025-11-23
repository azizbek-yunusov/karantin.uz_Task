import type { Coordinate, PixelCoordinate, TileCoordinate } from "../types/GeoMap";

export class MapUtils {
  static calculateArea(coordinates: [number, number][]): number {
    if (coordinates.length < 3) return 0;
    
    let area = 0;
    for (let i = 0; i < coordinates.length; i++) {
      const j = (i + 1) % coordinates.length;
      area += coordinates[i][1] * coordinates[j][0];
      area -= coordinates[j][1] * coordinates[i][0];
    }
    area = Math.abs(area / 2);
    
    const metersPerDegree = 111320;
    return area * metersPerDegree * metersPerDegree;
  }

  static calculatePerimeter(coordinates: [number, number][]): number {
    if (coordinates.length < 2) return 0;
    
    let perimeter = 0;
    for (let i = 0; i < coordinates.length; i++) {
      const j = (i + 1) % coordinates.length;
      const lat1 = coordinates[i][0];
      const lon1 = coordinates[i][1];
      const lat2 = coordinates[j][0];
      const lon2 = coordinates[j][1];
      
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      perimeter += R * c;
    }
    return perimeter;
  }

  static latLngToTile(lat: number, lng: number, zoom: number): TileCoordinate {
    const x = Math.floor((lng + 180) / 360 * Math.pow(2, zoom));
    const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
    return { x, y };
  }

  static getTileUrl(x: number, y: number, z: number): string {
    const s = ['a', 'b', 'c'][Math.abs(x + y) % 3];
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
  }

  static generateRandomColor(): string {
    return `hsl(${Math.random() * 360}, 70%, 50%)`;
  }
}

export class CoordinateProjection {
  private mapCenter: Coordinate;
  private zoom: number;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(mapCenter: Coordinate, zoom: number, canvasWidth: number, canvasHeight: number) {
    this.mapCenter = mapCenter;
    this.zoom = zoom;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  latLngToPixel(lat: number, lng: number): PixelCoordinate {
    const scale = Math.pow(2, this.zoom);
    const worldSize = 256 * scale;
    
    const x = (lng + 180) / 360 * worldSize;
    const latRad = lat * Math.PI / 180;
    const y = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * worldSize;
    
    const centerX = (this.mapCenter.lng + 180) / 360 * worldSize;
    const centerLatRad = this.mapCenter.lat * Math.PI / 180;
    const centerY = (1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2 * worldSize;
    
    return {
      x: (x - centerX) + this.canvasWidth / 2,
      y: (y - centerY) + this.canvasHeight / 2
    };
  }

  pixelToLatLng(x: number, y: number): Coordinate {
    const scale = Math.pow(2, this.zoom);
    const worldSize = 256 * scale;
    
    const centerX = (this.mapCenter.lng + 180) / 360 * worldSize;
    const centerLatRad = this.mapCenter.lat * Math.PI / 180;
    const centerY = (1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2 * worldSize;
    
    const worldX = (x - this.canvasWidth / 2) + centerX;
    const worldY = (y - this.canvasHeight / 2) + centerY;
    
    const lng = worldX / worldSize * 360 - 180;
    const latRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * worldY / worldSize)));
    const lat = latRad * 180 / Math.PI;
    
    return { lat, lng };
  }

  tileToPixel(tileX: number, tileY: number): PixelCoordinate {
    const scale = Math.pow(2, this.zoom);
    const worldSize = 256 * scale;
    
    const centerX = (this.mapCenter.lng + 180) / 360 * worldSize;
    const centerLatRad = this.mapCenter.lat * Math.PI / 180;
    const centerY = (1 - Math.log(Math.tan(centerLatRad) + 1 / Math.cos(centerLatRad)) / Math.PI) / 2 * worldSize;
    
    const tilePixelX = tileX * 256;
    const tilePixelY = tileY * 256;
    
    return {
      x: (tilePixelX - centerX) + this.canvasWidth / 2,
      y: (tilePixelY - centerY) + this.canvasHeight / 2
    };
  }
}
