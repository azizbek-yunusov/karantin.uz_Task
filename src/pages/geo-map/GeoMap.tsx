import AppLayout from "@/components/layout/app-layout";
import PolygonMap from "@/features/geo-map/polygon/polygon-map";

const GeoMap = () => {
  return (
    <AppLayout title="geo-map">
      <PolygonMap />
    </AppLayout>
  );
};

export default GeoMap;
