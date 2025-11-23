import { MapUtils } from "@/shared/lib/geo-map";
import type { Coordinate } from "@/shared/types/GeoMap";
import { useEffect, useState } from "react";

export const useTileLoader = (mapCenter: Coordinate, zoom: number) => {
  const [tiles, setTiles] = useState<Record<string, HTMLImageElement>>({});
  const [loadingTiles, setLoadingTiles] = useState<Set<string>>(new Set());

  useEffect(() => {
    const centerTile = MapUtils.latLngToTile(
      mapCenter.lat,
      mapCenter.lng,
      zoom
    );

    for (let dx = -2; dx <= 2; dx++) {
      for (let dy = -2; dy <= 2; dy++) {
        const tileX = centerTile.x + dx;
        const tileY = centerTile.y + dy;
        const key = `${zoom}-${tileX}-${tileY}`;

        if (!tiles[key] && !loadingTiles.has(key)) {
          setLoadingTiles((prev) => new Set([...prev, key]));

          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            setTiles((prev) => ({ ...prev, [key]: img }));
            setLoadingTiles((prev) => {
              const newSet = new Set(prev);
              newSet.delete(key);
              return newSet;
            });
          };
          img.onerror = () => {
            setLoadingTiles((prev) => {
              const newSet = new Set(prev);
              newSet.delete(key);
              return newSet;
            });
          };
          img.src = MapUtils.getTileUrl(tileX, tileY, zoom);
        }
      }
    }
  }, [mapCenter, zoom, tiles, loadingTiles]);

  return tiles;
};
