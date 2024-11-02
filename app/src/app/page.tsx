'use client'

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [map, setMap] = useState<number[][]>([[0]])
  const createNumber = (x: number, y: number | undefined): number => {
    const c = Math.random();
    if (y === undefined) {
      if (x === 0) {
        if (c < 0.5) return x;
        else return x + 1;
      }
      else if (x === 2) {
        if (c < 0.5) return x - 1;
        else return x;
      }
      else {
        if (c < 0.5) return x;
        else if (c < 0.75) return x + 1;
        else return x - 1;
      }
    }
    else {
      if (x === y) {
        if (c < 0.8) return x;
        if (x === 2) return x - 1;
        if (c < 0.9) return x + 1;
        if (x === 0) return x;
        return x - 1;
      }
      if (x + 1 === y || x - 1 === y) {
        if (c < 0.5) return y;
        return x;
      }
      if (x + 2 === y || x - 2 === y) {
        return (x + y) / 2;
      }
    }
    return x;
  }
  const createMap = () => {
    const latestRow = map[map.length - 1];
    const row = new Array(latestRow.length + 1).fill(0);
    const newRow = row.map((cur, index) => {
      if (index === 0) {
        return createNumber(latestRow[0], undefined);
      }
      if (index === row.length - 1) {
        return createNumber(latestRow[index - 1], undefined);
      }
      return createNumber(latestRow[index], latestRow[index + 1])
    })

    setMap((cur) => [...cur, newRow]);
  }
  return (
    <div className={styles.page}>
      <button onClick={createMap}>生成</button>
      {
        map.map((cur, index) => (
          <div key={`${index}列目`}>
            {
              cur.map((num, i) => (<span key={`${i}番目`}>{num}</span>))
            }
          </div>
        ))
      }
    </div>
  );
}
