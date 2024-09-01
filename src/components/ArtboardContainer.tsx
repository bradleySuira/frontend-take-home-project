"use client";

import { Tool } from "@/lib/types";
import Artboard from "./Artboard";
import styles from "./ArtboardContainer.module.css";
import Menu from "./Menu";
import { useState } from "react";

export default function ArtboardContainer() {
  const [selectedTool, setSelectedTool] = useState<Tool>("pencil");
  const handleSelecTool = (tool: Tool) => {
    setSelectedTool(tool);
  };
  return (
    <div className={styles.content}>
      <Menu selectedTool={selectedTool} onSelectTool={setSelectedTool} />
      <Artboard selectedTool={selectedTool} />
    </div>
  );
}
