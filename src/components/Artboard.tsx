import { Tool } from "@/lib/types";
import styles from "./Artboard.module.css";
import { useEffect, useRef, useState } from "react";

export interface ArtboardProps {
  selectedTool: Tool;
}

export default function Artboard({ selectedTool }: ArtboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseCoords, setMouseCoords] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [isDrawing, setIsDrawing] = useState(false);

  const draw = (x: number, y: number) => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (context) {
      context.beginPath();
      context.fillStyle = selectedTool === "eraser" ? "white" : "black";
      context.fillRect(x, y, 2, 2);

      context.stroke();
      context.closePath();
    }
  };

  const clearAll = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (context) {
      context.clearRect(
        0,
        0,
        canvasRef.current?.width || 0,
        canvasRef.current?.height || 0
      );
    }
  };

  const handleMouseUPOut = () => {
    setIsDrawing(false);
  };

  function setMousePosition(e: MouseEvent) {
    const rect = canvasRef.current?.getBoundingClientRect() || {
      top: 0,
      left: 0,
      height: 0,
      right: 0,
      bottom: 0,
    }; // abs. size of element

    const x =
      ((e.clientX - rect.left) / (rect.right - rect.left)) *
      (canvasRef.current?.width || 0);
    const y =
      ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
      (canvasRef.current?.height || 0);
    setMouseCoords({
      x, // scale mouse coordinates after they have
      y, // been adjusted to be relative to element
    });
  }

  const handleMouseDown = (e: MouseEvent) => {
    setMousePosition(e);
    setIsDrawing(true);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const { x: currX, y: currY } = mouseCoords;
        switch (selectedTool) {
          case "pencil":
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            break;
          case "square":
            ctx?.strokeRect(mouseCoords.x, mouseCoords.y, 40, 50);
            break;
          case "eraser":
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            break;
          default:
            break;
        }
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { x, y } = mouseCoords;
    setMousePosition(e);
    if (isDrawing && selectedTool !== "square") {
      draw(x, y);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove, false);
      canvas.addEventListener("mousedown", handleMouseDown, false);
      canvas.addEventListener("mouseup", handleMouseUPOut, false);
      canvas.addEventListener("mouseout", handleMouseUPOut, false);
    }

    return () => {
      canvas?.removeEventListener("mousemove", handleMouseMove, false);
      canvas?.removeEventListener("mousedown", handleMouseDown, false);
      canvas?.removeEventListener("mouseup", handleMouseUPOut, false);
      canvas?.removeEventListener("mouseout", handleMouseUPOut, false);
    };
  }, [mouseCoords, isDrawing]);

  useEffect(() => {
    if (selectedTool === "clear") {
      clearAll();
    }
  }, [selectedTool]);
  return (
    <div className={styles.artboard}>
      <canvas
        ref={canvasRef}
        className={`${styles.canvas} ${styles["cursor-" + selectedTool]}`}
      />
    </div>
  );
}
