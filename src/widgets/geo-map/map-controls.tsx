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
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-3">
          🗺️ Interaktiv Poligon Xaritasi
        </h1>

        <div className="flex flex-wrap gap-2">
          {!isDrawing ? (
            <button
              onClick={onStartDrawing}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
            >
              ✏️ Poligon Chizish
            </button>
          ) : (
            <>
              <button
                onClick={onFinishPolygon}
                disabled={currentVerticesCount < 3}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
              >
                ✓ Tugatish ({currentVerticesCount} vertex)
              </button>
              <button
                onClick={onUndoVertex}
                disabled={currentVerticesCount === 0}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
              >
                ↶ Ortga
              </button>
              <button
                onClick={onCancelDrawing}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
              >
                ✕ Bekor qilish
              </button>
            </>
          )}

          {polygonsCount > 0 && (
            <button
              onClick={onClearAll}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors shadow-md ml-auto"
            >
              🗑️ Barchasini o'chirish
            </button>
          )}
        </div>

        {isDrawing && (
          <div className="mt-3 text-sm bg-blue-800 bg-opacity-50 rounded-lg p-3">
            💡 Xaritada nuqtalarni bosish orqali poligon chizing. Kamida 3 ta
            vertex kerak.
          </div>
        )}
      </div>
    </div>
  );
};

export default MapControls;
