import type { Vertex } from "@/entities/map";
import type React from "react";
import { Polygon } from "react-leaflet";

const PolygonShape = ({
  vertices,
  polygonRef,
}: {
  vertices: Vertex[];
  polygonRef: React.RefObject<L.Polygon>;
}) => {
  if (vertices.length < 3) return null;

  return (
    <Polygon
      ref={polygonRef}
      positions={vertices}
      pathOptions={{ color: "green", fillOpacity: 0.25 }}
    />
  );
};
export default PolygonShape;
