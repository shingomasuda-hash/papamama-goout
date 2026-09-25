"use client";

import { useId, useState } from "react";
import styles from "./Faq.module.css";

type Item = { q: string; a: string[] };

const ITEMS: Item[] = [
  {
    q: "Q1.話だけでも可能か",
    a: ["A1.もちろん可能です。ぜひ実際に車を見", "て、乗って、楽しんでください。"],
  },
  {
    q: "Q2.同伴可能か",
    a: ["A2.可能です。中学生以下は無料のため、", "ご家族様もご一緒にご来場いただけます。"],
  },
  {
    q: "Q3.特典受け取り方法",
    a: [
      "A3.LINE追加後、相談予約まで完了いただ",
      "けましたら当日入口にて担当者からチケッ",
      "トをお渡しします。",
    ],
  },
];

function FaqItem({ item }: { item: Item }) {
  // カンプでは回答が表示された状態のため、初期状態は「開」
  const [open, setOpen] = useState(true);
  const id = useId();
  const btnId = `${id}-q`;
  const panelId = `${id}-a`;

  return (
    <div className={styles.item}>
      <h3 className={styles.qWrap}>
        <button
          type="button"
          id={btnId}
          className={styles.q}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {item.q}
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`${styles.panel} ${open ? styles.open : ""}`}
        inert={!open}
      >
        <div className={styles.panelInner}>
          <p className={styles.a}>
            {item.a.map((line, i) => (
              <span key={i} className={styles.line}>
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <div className={styles.list}>
      {ITEMS.map((item) => (
        <FaqItem key={item.q} item={item} />
      ))}
    </div>
  );
}
