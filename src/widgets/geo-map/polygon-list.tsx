import { MapUtils } from "@/shared/lib/geo-map";
import type { Polygon } from "@/shared/types/GeoMap";

interface PolygonListProps {
  polygons: Polygon[];
  selectedPolygonId: number | null;
  onSelectPolygon: (id: number) => void;
  onDeletePolygon: (id: number) => void;
}

const PolygonList = ({
  polygons,
  selectedPolygonId,
  onSelectPolygon,
  onDeletePolygon,
}: PolygonListProps) => {
  return (
    <div className="w-80 bg-white shadow-2xl overflow-y-auto border-l border-gray-200">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Poligonlar ro'yxati ({polygons.length})
        </h2>

        {polygons.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-5xl mb-3">📍</div>
            <p>Hali poligonlar yo'q</p>
            <p className="text-sm mt-2">Chizishni boshlang</p>
          </div>
        ) : (
          <div className="space-y-3">
            {polygons.map((polygon, idx) => (
              <div
                key={polygon.id}
                onClick={() => onSelectPolygon(polygon.id)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedPolygonId === polygon.id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: polygon.color }}
                    />
                    <span className="font-semibold text-gray-800">
                      Poligon #{idx + 1}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePolygon(polygon.id);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors text-xl"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Vertexlar: {polygon.vertices.length} ta</p>
                  {polygon.vertices.length >= 3 &&
                    (() => {
                      const area = MapUtils.calculateArea(polygon.vertices);
                      return <p>Maydon: {(area / 10000).toFixed(2)} gektar</p>;
                    })()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PolygonList;
