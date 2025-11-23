import AppLayout from "@/components/layout/app-layout";
import PolygonMap from "@/features/geo-map/polygon/polygon-map";

const GeoMapV2 = () => {
  return (
    <AppLayout title="Geo Map V2">
      <PolygonMap />
    </AppLayout>
  );
};

export default GeoMapV2;
