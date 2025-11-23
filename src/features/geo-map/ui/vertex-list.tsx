import type { Vertex } from "@/entities/map";
import { X } from "lucide-react";

const VertexList = ({
  vertices,
  onRemove,
  isEditable,
}: {
  vertices: Vertex[];
  onRemove: (index: number) => void;
  isEditable: boolean;
}) => {
  const formatVertex = (vertex: Vertex, index: number) => ({
    id: index,
    lat: vertex[0],
    lng: vertex[1],
    formatted: `${index + 1}. Lat: ${vertex[0].toFixed(
      5
    )}, Lng: ${vertex[1].toFixed(5)}`,
  });
  return (
    <div className="flex flex-col gap-2 max-h-72 overflow-y-auto border border-zinc-200 dark:border-zinc-800 p-1 rounded">
      {vertices.map((v, i) => {
        const formatted = formatVertex(v, i);
        return (
          <div
            key={i}
            className="flex justify-between bg-gray-100 dark:bg-gray-900 p-1.5 text-sm rounded items-center"
          >
            <span>{formatted.formatted}</span>
            {isEditable && (
              <button
                className="text-red-600 font-bold cursor-pointer hover:text-red-800"
                onClick={() => onRemove(i)}
              >
                <X size={16} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default VertexList;
