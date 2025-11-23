import { useMapEvents } from "react-leaflet";

const MapClickHandler = ({
  isFinished,
  onAddVertex,
}: {
  isFinished: boolean;
  onAddVertex: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      if (isFinished) return;
      const { lat, lng } = e.latlng;
      onAddVertex(lat, lng);
    },
  });
  return null;
};

export default MapClickHandler;
