import { useTranslation } from "react-i18next";

const MetricsDisplay = ({
  area,
  perimeter,
}: {
  area: number;
  perimeter: number;
}) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-800">{t("measurements")}</h3>
      <div className="bg-gray-50 p-3 rounded">
        <p className="text-sm">
          <span className="font-medium">{t("area")}:</span>{" "}
          {(area / 1000000).toFixed(3)} km²
        </p>
        <p className="text-sm">
          <span className="font-medium">{t("perimeter")}:</span>{" "}
          {perimeter.toFixed(2)} m
        </p>
      </div>
    </div>
  );
};
export default MetricsDisplay;
