import L from "leaflet";
import { Marker } from "react-leaflet";

const VertexMarker = ({
  position,
  index,
  isDraggable,
  onDragEnd,
}: {
  position: L.LatLngExpression;
  index: number;
  isDraggable: boolean;
  onDragEnd: (e: L.LeafletEvent) => void;
}) => {
  const createPolygonIcon = (index: number) => {
    return new L.DivIcon({
      className: "vertex-marker",
      html: `
      <div style="width: 18px; 
            height: 18px; 
            border-radius: 50%; 
            background: #00cb5f; 
            border: 2px solid white; 
            color: white; 
            font-size: 10px; 
            display: flex; 
            align-items: center; 
            justify-content: center;">
        ${index + 1}
      </div>
    `,
    });
  };
  return (
    <Marker
      position={position}
      draggable={isDraggable}
      eventHandlers={{ dragend: onDragEnd }}
      icon={createPolygonIcon(index)}
    />
  );
};

export default VertexMarker;
