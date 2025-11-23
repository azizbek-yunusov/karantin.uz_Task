import { Button } from "@/components/ui/button";
import { Check, Trash, Undo2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DrawingControlsProps {
  verticesCount: number;
  isFinished: boolean;
  onUndo: () => void;
  onFinish: () => void;
  onClear: () => void;
}

const DrawingControls = ({
  verticesCount,
  isFinished,
  onUndo,
  onFinish,
  onClear,
}: DrawingControlsProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        onClick={onUndo}
        variant="default"
        className="bg-blue-600"
        disabled={verticesCount === 0 || isFinished}
      >
        <Undo2 /> {t("undo")}
      </Button>
      <Button
        onClick={onFinish}
        variant="default"
        className="bg-green-500"
        disabled={!isFinished}
      >
        <Check /> {t("finish")}
      </Button>
      <Button onClick={onClear} variant="destructive">
        <Trash /> {t("clear")}
      </Button>
    </div>
  );
};

export default DrawingControls;
