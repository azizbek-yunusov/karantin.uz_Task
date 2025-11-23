import type { Vertex } from "@/entities/map";
import MapClickHandler from "@/features/geo-map/ui/MapClickHandler";
import PolygonShape from "@/features/geo-map/ui/PolygonShape";
import VertexMarker from "@/features/geo-map/ui/VertexMarker";
import { MAP_CONFIG } from "@/shared/config/map";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const PolygonMap = ({
  vertices,
  isFinished,
  onAddVertex,
  onUpdateVertex,
  polygonRef,
}: {
  vertices: Vertex[];
  isFinished: boolean;
  onAddVertex: (lat: number, lng: number) => void;
  onUpdateVertex: (index: number, lat: number, lng: number) => void;
  polygonRef: any;
}) => {
  return (
    <div className="col-span-8">
      <MapContainer
        center={MAP_CONFIG.defaultCenter}
        zoom={MAP_CONFIG.defaultZoom}
        className="h-[calc(100vh-100px)] w-full"
      >
        <TileLayer url={MAP_CONFIG.tileLayerUrl} />

        {!isFinished && (
          <MapClickHandler isFinished={isFinished} onAddVertex={onAddVertex} />
        )}

        {vertices.map((v, i) => (
          <VertexMarker
            key={i}
            position={v}
            index={i}
            isDraggable={!isFinished}
            onDragEnd={(e) => {
              const lat = e.target.getLatLng().lat;
              const lng = e.target.getLatLng().lng;
              onUpdateVertex(i, lat, lng);
            }}
          />
        ))}

        {vertices.length >= 2 && !isFinished && (
          <Polyline positions={vertices} pathOptions={{ color: "blue" }} />
        )}

        <PolygonShape vertices={vertices} polygonRef={polygonRef} />
      </MapContainer>
    </div>
  );
};
export default PolygonMap;
