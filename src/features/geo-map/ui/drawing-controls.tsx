import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslation } from "react-i18next";

interface DrawingControlsProps {
  verticesCount: number;
  isFinished: boolean;
  onUndo: () => void;
  onFinish: () => void;
  onClear: () => void;
}

export const DrawingControls: React.FC<DrawingControlsProps> = ({
  verticesCount,
  isFinished,
  onUndo,
  onFinish,
  onClear,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-3 gap-2">
      <Button onClick={onUndo} disabled={verticesCount === 0 || isFinished}>
        {t("undo")}
      </Button>
      <Button onClick={onFinish} disabled={!isFinished}>
        {t("finish")}
      </Button>
      <Button onClick={onClear}>{t("clear")}</Button>
    </div>
  );
};
