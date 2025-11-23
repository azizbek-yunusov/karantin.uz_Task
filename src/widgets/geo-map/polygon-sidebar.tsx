import type { Vertex } from "@/entities/map";
import {
  DrawingControls,
  MetricsDisplay,
  VertexList,
} from "@/features/geo-map";
import { useTranslation } from "react-i18next";

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
  vertices: Vertex[];
  isFinished: boolean;
  message: string;
  area: number;
  perimeter: number;
  onRemoveVertex: (index: number) => void;
  onUndo: () => void;
  onFinish: () => void;
  onClear: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="col-span-4 bg-white dark:bg-background/95 border-r p-4 overflow-auto flex flex-col gap-4">
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
        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
          {t("vertices-list")}
        </h3>
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
