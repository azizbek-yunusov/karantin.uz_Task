import { useMapInteraction } from "@/features/hooks/use-map-interaction";
import { useTileLoader } from "@/features/hooks/use-title-loader";
import { CoordinateProjection, MapUtils } from "@/shared/lib/geo-map";
import type { MapState, Polygon } from "@/shared/types/GeoMap";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { MapRenderer } from "../map/map-renderer ";
import ZoomControls from "@/widgets/geo-map/zoom-controls";
import PolygonStats from "@/widgets/geo-map/polygon-stats";
import PolygonList from "@/widgets/geo-map/polygon-list";
import MapControls from "@/widgets/geo-map/map-controls";

export default function PolygonMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [currentVertices, setCurrentVertices] = useState<[number, number][]>(
    []
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedPolygon, setSelectedPolygon] = useState<number | null>(null);
  const [mapState, setMapState] = useState<MapState>({
    center: { lat: 41.2995, lng: 69.2401 },
    zoom: 12,
  });

  const tiles = useTileLoader(mapState.center, mapState.zoom);
  const {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
  } = useMapInteraction(canvasRef, isDrawing, mapState, setMapState);

  const drawMap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const projection = new CoordinateProjection(
      mapState.center,
      mapState.zoom,
      canvas.width,
      canvas.height
    );

    const renderer = new MapRenderer(ctx, projection, tiles);

    renderer.clear(canvas.width, canvas.height);
    renderer.drawTiles(mapState.center, mapState.zoom);

    polygons.forEach((polygon) => {
      renderer.drawPolygon(polygon, selectedPolygon === polygon.id);
    });

    renderer.drawCurrentPolygon(currentVertices);
  }, [polygons, currentVertices, selectedPolygon, mapState, tiles]);

  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current && mapContainerRef.current) {
        const rect = mapContainerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
        drawMap();
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [drawMap]);

  useEffect(() => {
    drawMap();
  }, [drawMap]);

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isDrawing || isDragging) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const projection = new CoordinateProjection(
        mapState.center,
        mapState.zoom,
        canvas.width,
        canvas.height
      );

      const { lat, lng } = projection.pixelToLatLng(x, y);
      setCurrentVertices((prev) => [...prev, [lat, lng]]);
    },
    [isDrawing, isDragging, mapState]
  );

  const startDrawing = useCallback(() => {
    setIsDrawing(true);
    setCurrentVertices([]);
    setSelectedPolygon(null);
  }, []);

  const finishPolygon = useCallback(() => {
    if (currentVertices.length >= 3) {
      setPolygons((prev) => [
        ...prev,
        {
          id: Date.now(),
          vertices: [...currentVertices],
          color: MapUtils.generateRandomColor(),
        },
      ]);
      setCurrentVertices([]);
      setIsDrawing(false);
    }
  }, [currentVertices]);

  const cancelDrawing = useCallback(() => {
    setCurrentVertices([]);
    setIsDrawing(false);
  }, []);

  const undoVertex = useCallback(() => {
    setCurrentVertices((prev) => prev.slice(0, -1));
  }, []);

  const deletePolygon = useCallback((id: number) => {
    setPolygons((prev) => prev.filter((p) => p.id !== id));
    setSelectedPolygon(null);
  }, []);

  const clearAll = useCallback(() => {
    setPolygons([]);
    setCurrentVertices([]);
    setIsDrawing(false);
    setSelectedPolygon(null);
  }, []);

  const selectedPolygonData = polygons.find((p) => p.id === selectedPolygon);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <MapControls
        isDrawing={isDrawing}
        currentVerticesCount={currentVertices.length}
        polygonsCount={polygons.length}
        onStartDrawing={startDrawing}
        onFinishPolygon={finishPolygon}
        onUndoVertex={undoVertex}
        onCancelDrawing={cancelDrawing}
        onClearAll={clearAll}
      />

      <div className="flex-1 flex relative overflow-hidden">
        <div className="flex-1 relative" ref={mapContainerRef}>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            className="w-full h-full"
            style={{
              cursor: isDrawing
                ? "crosshair"
                : isDragging
                ? "grabbing"
                : "grab",
            }}
          />

          <ZoomControls
            zoom={mapState.zoom}
            onZoomIn={() =>
              setMapState((prev) => ({
                ...prev,
                zoom: Math.min(18, prev.zoom + 1),
              }))
            }
            onZoomOut={() =>
              setMapState((prev) => ({
                ...prev,
                zoom: Math.max(3, prev.zoom - 1),
              }))
            }
          />

          {selectedPolygonData && (
            <div className="absolute top-4 left-4 z-10">
              <PolygonStats polygon={selectedPolygonData.vertices} />
              <button
                onClick={() => deletePolygon(selectedPolygonData.id)}
                className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg"
              >
                🗑️ Poligonni o'chirish
              </button>
            </div>
          )}

          <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs text-gray-600">
            © OpenStreetMap
          </div>
        </div>

        <PolygonList
          polygons={polygons}
          selectedPolygonId={selectedPolygon}
          onSelectPolygon={setSelectedPolygon}
          onDeletePolygon={deletePolygon}
        />
      </div>
    </div>
  );
}
