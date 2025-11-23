import type { Vertex } from "@/entities/map";
import { useState } from "react";

export const usePolygonDrawing = () => {
  const [vertices, setVertices] = useState<Vertex[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Boshlash uchun xaritada bosing.");

  const addVertex = (lat: number, lng: number) => {
    setVertices((v) => [...v, [lat, lng]]);
  };

  const updateVertex = (index: number, lat: number, lng: number) => {
    const newArr = [...vertices];
    newArr[index] = [lat, lng];
    setVertices(newArr);
  };

  const removeVertex = (index: number) => {
    if (isFinished) return;
    setVertices(vertices.filter((_, i) => i !== index));
  };

  const undoLast = () => {
    if (isFinished) return;
    setVertices((v) => v.slice(0, -1));
  };

  const finishPolygon = () => {
    if (vertices.length < 3) {
      setMessage("Kamida 3 vertex qo'shing.");
      return;
    }
    setIsFinished(true);
    setMessage("Polygon yakunlandi.");
  };

  const clearAll = () => {
    setVertices([]);
    setIsFinished(false);
    setMessage("Tozalandi. Yangi polygon chizing.");
  };

  return {
    vertices,
    isFinished,
    message,
    addVertex,
    updateVertex,
    removeVertex,
    undoLast,
    finishPolygon,
    clearAll,
  };
};