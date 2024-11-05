'use client'

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createNoise2D } from "simplex-noise";
import styles from "./page.module.css";

export default function Home() {
  const [map, setMap] = useState<number[][]>([[0]]);
  const noise2d = createNoise2D();
  useEffect(() => {
    createMap()
  }, [])

  // 生成する地形のサイズ
  const mapWidth = 100;
  const mapHeight = 100;

  const createMap = () => {
    const newMap: number[][] = [];

    // ノイズを生成して地図を作成
    for (let y = 0; y < mapHeight; y++) {
      const row: number[] = [];
      for (let x = 0; x < mapWidth; x++) {
        // ノイズ値を取得して、地形を決定する
        const noiseValue = noise2d(x / 10, y / 10) + 1;
        row.push(Math.floor(noiseValue));
      }
      newMap.push(row);
    }

    setMap(newMap);
  };

  // 色を決める関数
  const getColor = (value: number) => {
    if (value < 0.5) return "#a3d5ff"; // 水色（海）
    if (value < 1.5) return "#85c17e"; // 緑色（平地）
    return "#654321"; // 茶色（山）
  };

  return (
    <div className={styles.page}>
      <Button variant="outline" onClick={createMap}>Generate</Button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${map[0].length}, 5px)`,
          gridTemplateRows: `repeat(${map.length}, 5px)`,
          gap: '0px',
        }}
      >
        {map.flat().map((value, index) => (
          <div
            key={index}
            style={{
              width: '5px',
              height: '5px',
              backgroundColor: getColor(value),
            }}
          />
        ))}
      </div>
    </div>
  );
}
