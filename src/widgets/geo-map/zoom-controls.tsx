interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControls = ({ zoom, onZoomIn, onZoomOut }: ZoomControlsProps) => {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={onZoomIn}
        className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 border-b border-gray-200 font-bold text-xl"
      >
        +
      </button>
      <div className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 text-sm font-medium border-b border-gray-200">
        {Math.round(zoom)}
      </div>
      <button
        onClick={onZoomOut}
        className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-bold text-xl"
      >
        −
      </button>
    </div>
  );
};

export default ZoomControls;
