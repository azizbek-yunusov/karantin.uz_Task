import AppLayout from "@/components/layout/app-layout";
import InteractiveMapPolygonDrawer from "@/features/geo-map/leaflet";

const GeoMap = () => {
  return (
    <AppLayout title="geo-map">
      <InteractiveMapPolygonDrawer />
    </AppLayout>
  );
};

export default GeoMap;
