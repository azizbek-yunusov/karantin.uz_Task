import { Button } from "@/components/ui/button";
import { Check, PenIcon, Trash, Undo2, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MapControlsProps {
  isDrawing: boolean;
  currentVerticesCount: number;
  polygonsCount: number;
  onStartDrawing: () => void;
  onFinishPolygon: () => void;
  onUndoVertex: () => void;
  onCancelDrawing: () => void;
  onClearAll: () => void;
}

const MapControls = ({
  isDrawing,
  currentVerticesCount,
  polygonsCount,
  onStartDrawing,
  onFinishPolygon,
  onUndoVertex,
  onCancelDrawing,
  onClearAll,
}: MapControlsProps) => {
  const { t } = useTranslation();
  return (
    <div className=" text-white p-3">
      <div className="">
        <div className="flex flex-wrap gap-2">
          {!isDrawing ? (
            <Button onClick={onStartDrawing}>
              <PenIcon /> {t("draw-polygon")}
            </Button>
          ) : (
            <>
              <Button
                onClick={onFinishPolygon}
                disabled={currentVerticesCount < 3}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
              >
                <Check /> {t("finish")} ({currentVerticesCount} {t("vertex")})
              </Button>
              <Button
                onClick={onUndoVertex}
                disabled={currentVerticesCount === 0}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
              >
                <Undo2 /> {t("undo")}
              </Button>
              <Button
                onClick={onCancelDrawing}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
              >
                <X /> {t("cancel")}
              </Button>
            </>
          )}

          {polygonsCount > 0 && (
            <Button
              onClick={onClearAll}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors shadow-md ml-auto"
            >
              <Trash /> {t("all-delete")}
            </Button>
          )}
        </div>

        {isDrawing && (
          <div className="mt-3 text-sm bg-sky-600 bg-opacity-50 rounded-lg p-3">
            💡 Xaritada nuqtalarni bosish orqali poligon chizing. Kamida 3 ta
            vertex kerak.
          </div>
        )}
      </div>
    </div>
  );
};

export default MapControls;
