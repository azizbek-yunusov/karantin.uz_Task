import type { Coordinate, MapState } from "@/shared/types/GeoMap";
import { useCallback, useState } from "react";

export const useMapInteraction = (
  _canvasRef: React.RefObject<HTMLCanvasElement>,
  isDrawing: boolean,
  mapState: MapState,
  setMapState: React.Dispatch<React.SetStateAction<MapState>>
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; center: Coordinate } | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isDrawing) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY, center: { ...mapState.center } });
  }, [isDrawing, mapState.center]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !dragStart) return;
    
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    const scale = Math.pow(2, mapState.zoom);
    const worldSize = 256 * scale;
    const moveScale = 360 / worldSize;
    
    setMapState(prev => ({
      ...prev,
      center: {
        lat: Math.max(-85, Math.min(85, dragStart.center.lat + dy * moveScale)),
        lng: dragStart.center.lng - dx * moveScale
      }
    }));
  }, [isDragging, dragStart, mapState.zoom, setMapState]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.5 : 0.5;
    setMapState(prev => ({
      ...prev,
      zoom: Math.max(3, Math.min(18, prev.zoom + delta))
    }));
  }, [setMapState]);

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel
  };
};