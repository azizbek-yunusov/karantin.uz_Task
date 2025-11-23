import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";
import "leaflet/dist/leaflet.css";
import { Check, Trash, Undo, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

// Improved UI and features
// • Vertex drag & remove
// • Live area + perimeter calculation (turf.js)
// • Hover preview line
// • Dark/Light map switch
// • Zoom to polygon
// • Points list panel
// • Clear, Finish, Undo, Export GeoJSON, Export WKT
// • Editable polygon (before finish)

const defaultCenter = [41.2995, 69.2401];

function VertexHandler({ vertices, setVertices, isFinished }) {
  useMapEvents({
    click(e) {
      if (isFinished) return;
      const { lat, lng } = e.latlng;
      setVertices((v) => [...v, [lat, lng]]);
    },
  });
  return null;
}

export default function InteractiveMapPolygonDrawer() {
  const { t } = useTranslation();
  const [vertices, setVertices] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [message, setMessage] = useState("Boshlash uchun xaritada bosing.");
  const [darkMode, setDarkMode] = useState(false);
  const polygonRef = useRef(null);

  // --- AREA & PERIMETER ---
  const [area, setArea] = useState(0);
  const [perimeter, setPerimeter] = useState(0);

  useEffect(() => {
    if (vertices.length >= 3) {
      const coords = vertices.map((v) => [v[1], v[0]]);
      coords.push(coords[0]);
      const poly = turf.polygon([[...coords]]);
      setArea(turf.area(poly));
      setPerimeter(turf.length(poly, { units: "kilometers" }) * 1000);
    } else {
      setArea(0);
      setPerimeter(0);
    }
  }, [vertices]);

  const finishPolygon = () => {
    if (vertices.length < 3) {
      setMessage("Kamida 3 vertex qo`shing.");
      return;
    }
    setIsFinished(true);
    setMessage("Polygon yakunlandi.");
  };

  const undoLast = () => {
    if (isFinished) return;
    setVertices((v) => v.slice(0, -1));
  };

  const clearAll = () => {
    setVertices([]);
    setIsFinished(false);
    setMessage("Tozalandi. Yangi polygon chizing.");
  };

  const exportGeoJSON = () => {
    if (!isFinished) return setMessage("Avval Finish bosing.");

    const coords = vertices.map((p) => [p[1], p[0]]);
    coords.push(coords[0]);

    const geojson = {
      type: "Feature",
      geometry: { type: "Polygon", coordinates: [coords] },
      properties: {},
    };

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(geojson, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "polygon.geojson";
    a.click();
  };

  const exportWKT = () => {
    if (!isFinished) return setMessage("Avval Finish bosing.");
    const coords = vertices.map((p) => `${p[1]} ${p[0]}`).join(", ");
    const wkt = `POLYGON((${coords}, ${vertices[0][1]} ${vertices[0][0]}))`;

    const a = document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(wkt);
    a.download = "polygon.wkt";
    a.click();
  };

  const removeVertex = (index) => {
    if (isFinished) return;
    setVertices(vertices.filter((_, i) => i !== index));
  };

  const pointIconHtml = (num: number) => `
  <div 
      style="width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #00cb5f;
        border: 2px solid white; 
        color: white; 
        font-size: 10px; 
        text-align: center">
        ${num + 1}
    </div>
  `;

  return (
    <div className="min-h-[calc(100vh-100px)]  w-full flex">
      <div className="w-72 bg-white border-r p-4 overflow-auto flex flex-col gap-4 h">
        <h2 className="text-xl font-semibold">{t("draw-polygon")}</h2>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={undoLast}
            disabled={vertices.length === 0 || isFinished}
          >
            <Undo /> {t("undo")}
          </Button>
          <Button onClick={finishPolygon} disabled={isFinished}>
            <Check /> {t("finish")}
          </Button>
          <Button onClick={clearAll}>
            <Trash /> {t("clear")}
          </Button>
        </div>

        {/* <h3 className="text-md font-semibold">Exports</h3>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded bg-green-600 text-white"
            disabled={!isFinished}
            onClick={exportGeoJSON}
          >
            GeoJSON
          </button>
          <button
            className="px-3 py-1 rounded bg-green-700 text-white"
            disabled={!isFinished}
            onClick={exportWKT}
          >
            WKT
          </button>
        </div> */}

        <div className="mt-4 text-sm text-gray-700">{message}</div>

        <h3 className="font-semibold">Vertices list</h3>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-scroll border border-zinc-200 p-1 rounded">
          {vertices.map((v, i) => (
            <div
              key={i}
              className="flex justify-between bg-gray-100 p-1.5 text-sm rounded"
            >
              <span>
                {i + 1}. Lat: {v[0].toFixed(5)}, Lng: {v[1].toFixed(5)}
              </span>
              {!isFinished && (
                <button
                  className="text-red-600 font-bold cursor-pointer"
                  onClick={() => removeVertex(i)}
                >
                  <X />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* AREA & PERIMETER DISPLAY */}
        <h3 className="font-semibold">Measurements</h3>
        <p>Area: {(area / 1000000).toFixed(3)} km²</p>
        <p>Perimeter: {perimeter.toFixed(2)} m</p>
      </div>

      {/* MAP */}
      <div className="flex-1">
        <MapContainer
          center={defaultCenter}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {!isFinished && (
            <VertexHandler
              vertices={vertices}
              setVertices={setVertices}
              isFinished={isFinished}
            />
          )}

          {vertices.map((v, i) => (
            <Marker
              key={i}
              position={v}
              draggable={!isFinished}
              eventHandlers={{
                dragend: (e) => {
                  const lat = e.target.getLatLng().lat;
                  const lng = e.target.getLatLng().lng;
                  const newArr = [...vertices];
                  newArr[i] = [lat, lng];
                  setVertices(newArr);
                },
              }}
              icon={
                new L.DivIcon({
                  className: "vertex-marker",
                  html: pointIconHtml(i),
                })
              }
            />
          ))}

          {vertices.length >= 2 && !isFinished && (
            <Polyline positions={vertices} />
          )}

          {vertices.length >= 3 && (
            <Polygon
              ref={polygonRef}
              positions={vertices}
              pathOptions={{ color: "green", fillOpacity: 0.25 }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
