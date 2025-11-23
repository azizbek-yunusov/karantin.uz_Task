import { Minus, Plus } from "lucide-react";

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
        className="w-10 cursor-pointer h-10 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-900 border-b border-gray-200 font-bold text-xl"
      >
        <Plus />
      </button>
      <div className="w-10 h-10 flex items-center justify-center bg-white text-gray-900 text-sm font-medium border-b border-gray-200">
        {Math.round(zoom)}
      </div>
      <button
        onClick={onZoomOut}
        className="w-10 h-10 cursor-pointer flex items-center justify-center bg-white hover:bg-gray-100 text-gray-900 font-bold text-xl"
      >
        <Minus />
      </button>
    </div>
  );
};

export default ZoomControls;
