import AppLayout from "@/components/layout/app-layout";
import { calculatePolygonMetrics } from "@/entities/map/lib/calculations";
import { usePolygonDrawing } from "@/features/geo-map/model/use-polygon-drawing";
import { PolygonMap } from "@/widgets/geo-map";
import PolygonSidebar from "@/widgets/geo-map/polygon-sidebar";
import { useRef } from "react";

const GeoMap = () => {
  const polygonRef = useRef(null);

  const {
    vertices,
    isFinished,
    addVertex,
    updateVertex,
    removeVertex,
    undoLast,
    finishPolygon,
    clearAll,
  } = usePolygonDrawing();

  const { area, perimeter } = calculatePolygonMetrics(vertices);
  return (
    <AppLayout title="geo-map">
      <div className="min-h-[calc(100vh-5rem)] w-full">
        <div className="grid grid-cols-12">
          <PolygonSidebar
            vertices={vertices}
            isFinished={isFinished}
            area={area}
            perimeter={perimeter}
            onRemoveVertex={removeVertex}
            onUndo={undoLast}
            onFinish={finishPolygon}
            onClear={clearAll}
          />

          <PolygonMap
            vertices={vertices}
            isFinished={isFinished}
            onAddVertex={addVertex}
            onUpdateVertex={updateVertex}
            polygonRef={polygonRef}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default GeoMap;
