const MetricsDisplay = ({
  area,
  perimeter,
}: {
  area: number;
  perimeter: number;
}) => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-800">Measurements</h3>
      <div className="bg-gray-50 p-3 rounded">
        <p className="text-sm">
          <span className="font-medium">Area:</span>{" "}
          {(area / 1000000).toFixed(3)} km²
        </p>
        <p className="text-sm">
          <span className="font-medium">Perimeter:</span> {perimeter.toFixed(2)}{" "}
          m
        </p>
      </div>
    </div>
  );
};
export default MetricsDisplay;
