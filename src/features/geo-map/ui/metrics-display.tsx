import type { Vertex } from "@/entities/map";
import { useTranslation } from "react-i18next";

const MetricsDisplay = ({
  area,
  perimeter,
  polygon,
}: {
  area: number;
  perimeter: number;
  polygon: Vertex[];
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white/95 dark:bg-background/50 backdrop-blur-sm rounded-lg shadow p-4 space-y-2">
      <h3 className="font-semibold">{t("measurements")}</h3>
      <div className="space-y-1 text-sm">
        <p className="text-zinc-800 dark:text-zinc-200 ">
          <span className="font-medium">{t("area")}:</span>{" "}
          {(area / 10000).toFixed(3)} km²
        </p>
        <p className="text-zinc-800 dark:text-zinc-200">
          <span className="font-medium">{t("perimeter")}:</span>{" "}
          {perimeter.toFixed(2)} m
        </p>
        <p className="text-zinc-800 dark:text-zinc-200">
          <span className="font-medium">{t("vertices")}:</span> {polygon.length}{" "}
          ta
        </p>
      </div>
    </div>
  );
};
export default MetricsDisplay;
