import { DrawingControls } from "@/features/geo-map/ui/drawing-controls";
import MetricsDisplay from "@/features/geo-map/ui/MetricsDisplay";
import VertexList from "@/features/geo-map/ui/VertexList";

const PolygonSidebar = ({
  vertices,
  isFinished,
  message,
  area,
  perimeter,
  onRemoveVertex,
  onUndo,
  onFinish,
  onClear,
}: {
  vertices: any;
  isFinished: any;
  message: any;
  area: any;
  perimeter: any;
  onRemoveVertex: any;
  onUndo: any;
  onFinish: any;
  onClear: any;
}) => {
  return (
    <div className="col-span-4 bg-white border-r p-4 overflow-auto flex flex-col gap-4">
      <DrawingControls
        verticesCount={vertices.length}
        isFinished={isFinished}
        onUndo={onUndo}
        onFinish={onFinish}
        onClear={onClear}
      />

      <div className="mt-2 text-sm text-gray-700 bg-blue-50 p-2 rounded">
        {message}
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Vertices List</h3>
        <VertexList
          vertices={vertices}
          onRemove={onRemoveVertex}
          isEditable={!isFinished}
        />
      </div>

      <MetricsDisplay area={area} perimeter={perimeter} />
    </div>
  );
};
export default PolygonSidebar;
