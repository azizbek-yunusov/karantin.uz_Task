import { MapUtils } from "@/shared/lib/geo-map";

interface PolygonStatsProps {
  polygon: [number, number][];
}

const PolygonStats = ({ polygon }: PolygonStatsProps) => {
  if (!polygon || polygon.length < 3) return null;

  const area = MapUtils.calculateArea(polygon);
  const areaHectares = (area / 10000).toFixed(2);
  const perimeter = MapUtils.calculatePerimeter(polygon).toFixed(3);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 space-y-2">
      <h3 className="font-semibold text-gray-800 text-lg">
        Poligon Ma'lumotlari
      </h3>
      <div className="space-y-1 text-sm">
        <p className="text-gray-700">
          <span className="font-medium">Maydon:</span> {areaHectares} gektar (
          {area.toFixed(2)} m²)
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Perimetr:</span> {perimeter} km
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Vertexlar:</span> {polygon.length} ta
        </p>
      </div>
    </div>
  );
};

export default PolygonStats;
