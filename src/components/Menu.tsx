import { Tool } from "@/lib/types";
import styles from "./Menu.module.css";
import Image from "next/image";

export interface MenuProps {
  selectedTool: Tool;
  onSelectTool: (tool: Tool) => void;
}

export default function Menu({ selectedTool, onSelectTool }: MenuProps) {

  return (
    <div className={styles.menuContainer}>
      <div
        onClick={() => onSelectTool("pencil")}
        className={`${styles.menuItem} ${
          selectedTool === "pencil" && styles.selected
        }`}
      >
        <Image src="/img/pencil.svg" alt="Pencil" width={0} height={0} priority={true}/>
      </div>
      <div
      onClick={() => onSelectTool("square")}
        className={`${styles.menuItem} ${
          selectedTool === "square" && styles.selected
        }`}
      >
        <Image src="/img/square.svg" alt="Square" width={0} height={0} priority={true} />
      </div>
      <div
      onClick={() => onSelectTool("eraser")}
        className={`${styles.menuItem} ${
          selectedTool === "eraser" && styles.selected
        }`}
      >
        <Image src="/img/eraser.svg" alt="Eraser" width={0} height={0} priority={true} />
      </div>
      <div
      onClick={() => onSelectTool("clear")}
        className={`${styles.menuItem} ${
          selectedTool === "clear" && styles.selected
        }`}
      >
        <Image src="/img/clear.svg" alt="Clear" width={0} height={0} priority={true} />
      </div>
    </div>
  );
}
