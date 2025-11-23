import { MapUtils, type CoordinateProjection } from "@/shared/lib/geo-map";
import type { Coordinate, Polygon } from "@/shared/types/GeoMap";

export class MapRenderer {
  private ctx: CanvasRenderingContext2D;
  private projection: CoordinateProjection;
  private tiles: Record<string, HTMLImageElement>;

  constructor(
    ctx: CanvasRenderingContext2D,
    projection: CoordinateProjection,
    tiles: Record<string, HTMLImageElement>
  ) {
    this.ctx = ctx;
    this.projection = projection;
    this.tiles = tiles;
  }

  clear(width: number, height: number): void {
    this.ctx.fillStyle = '#aad3df';
    this.ctx.fillRect(0, 0, width, height);
  }

  drawTiles(mapCenter: Coordinate, zoom: number): void {
    const centerTile = MapUtils.latLngToTile(mapCenter.lat, mapCenter.lng, zoom);
    
    for (let dx = -3; dx <= 3; dx++) {
      for (let dy = -3; dy <= 3; dy++) {
        const tileX = centerTile.x + dx;
        const tileY = centerTile.y + dy;
        const key = `${zoom}-${tileX}-${tileY}`;
        
        const pixel = this.projection.tileToPixel(tileX, tileY);
        
        if (this.tiles[key]) {
          this.ctx.drawImage(this.tiles[key], pixel.x, pixel.y, 256, 256);
        } else {
          this.ctx.fillStyle = '#e5e7eb';
          this.ctx.fillRect(pixel.x, pixel.y, 256, 256);
          this.ctx.strokeStyle = '#d1d5db';
          this.ctx.strokeRect(pixel.x, pixel.y, 256, 256);
        }
      }
    }
  }

  drawPolygon(polygon: Polygon, isSelected: boolean): void {
    if (polygon.vertices.length < 2) return;
    
    this.ctx.beginPath();
    polygon.vertices.forEach((vertex, idx) => {
      const pixel = this.projection.latLngToPixel(vertex[0], vertex[1]);
      if (idx === 0) {
        this.ctx.moveTo(pixel.x, pixel.y);
      } else {
        this.ctx.lineTo(pixel.x, pixel.y);
      }
    });
    this.ctx.closePath();
    
    this.ctx.fillStyle = polygon.color + (isSelected ? '80' : '4D');
    this.ctx.fill();
    
    this.ctx.strokeStyle = polygon.color;
    this.ctx.lineWidth = isSelected ? 3 : 2;
    this.ctx.stroke();
    
    polygon.vertices.forEach((vertex) => {
      const pixel = this.projection.latLngToPixel(vertex[0], vertex[1]);
      this.ctx.beginPath();
      this.ctx.arc(pixel.x, pixel.y, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = 'white';
      this.ctx.fill();
      this.ctx.strokeStyle = polygon.color;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });
  }

  drawCurrentPolygon(vertices: [number, number][]): void {
    if (vertices.length === 0) return;

    this.ctx.beginPath();
    vertices.forEach((vertex, idx) => {
      const pixel = this.projection.latLngToPixel(vertex[0], vertex[1]);
      if (idx === 0) {
        this.ctx.moveTo(pixel.x, pixel.y);
      } else {
        this.ctx.lineTo(pixel.x, pixel.y);
      }
    });
    
    this.ctx.strokeStyle = '#3b82f6';
    this.ctx.lineWidth = 3;
    this.ctx.setLineDash([10, 5]);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    
    vertices.forEach((vertex, idx) => {
      const pixel = this.projection.latLngToPixel(vertex[0], vertex[1]);
      this.ctx.beginPath();
      this.ctx.arc(pixel.x, pixel.y, 6, 0, Math.PI * 2);
      this.ctx.fillStyle = 'white';
      this.ctx.fill();
      this.ctx.strokeStyle = '#3b82f6';
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
      
      this.ctx.fillStyle = '#3b82f6';
      this.ctx.font = 'bold 12px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(String(idx + 1), pixel.x, pixel.y);
    });
  }
}
