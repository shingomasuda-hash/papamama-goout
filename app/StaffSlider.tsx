"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./StaffSlider.module.css";

import imgStaff1 from "@/public/images/staff/staff-01.png";
import imgStaff2 from "@/public/images/staff/staff-02.png";
import imgStaff3 from "@/public/images/staff/staff-03.png";
import imgStaff4 from "@/public/images/staff/staff-04.png";
import imgStaff5 from "@/public/images/staff/staff-05.png";
import imgStaff6 from "@/public/images/staff/staff-06.png";

type Staff = { src: StaticImageData; name: string; kana: string };

// カンプでは森行さんが3枚目(3番目のドットがアクティブ)として表示されている
const STAFF: Staff[] = [
  { src: imgStaff2, name: "飯沼 蒼太郎", kana: "イイヌマ ソウタロウ" },
  { src: imgStaff3, name: "後藤 朱里", kana: "ゴトウ アカリ" },
  { src: imgStaff1, name: "森行 啓太", kana: "モリユキ ケイタ" },
  { src: imgStaff4, name: "高木 流星", kana: "タカギ リュウセイ" },
  { src: imgStaff5, name: "山田 零音", kana: "ヤマダ レオト" },
  { src: imgStaff6, name: "松浦 加奈", kana: "マツウラ カナ" },
];
const START_INDEX = 2;

/*
 * カンプ(幅587px)上の寸法
 *   スライド間隔 487px / カード幅 438px / 中央カードの左端 x=83
 */
const VIEW = 587;
const PITCH = 487;
const CARD = 438;
const SLIDE_LEFT = 83 - (PITCH - CARD) / 2;
/** 選択中スライドの左端をビューポート幅に対する割合で揃える */
const align = (viewSize: number) => viewSize * (SLIDE_LEFT / VIEW);

export default function StaffSlider({ dotsTop }: { dotsTop: string }) {
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align, startIndex: START_INDEX },
    reduceMotion ? [] : [Autoplay({ delay: 4500, stopOnInteraction: true })],
  );
  const [selected, setSelected] = useState(START_INDEX);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <>
      <div className={styles.viewport} ref={emblaRef} role="region" aria-roledescription="carousel" aria-label="スタッフ紹介">
        <div
          className={styles.container}
          // JS初期化前(SSR)もカンプと同じ位置に表示する
          style={{ transform: `translate3d(${((SLIDE_LEFT - START_INDEX * PITCH) / VIEW) * 100}%, 0, 0)` }}
        >
          {STAFF.map((s, i) => (
            <div
              key={s.name}
              className={styles.slide}
              style={{ flexBasis: `${(PITCH / VIEW) * 100}%` }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${STAFF.length}`}
            >
              <Image
                src={s.src}
                alt={`スタッフ紹介：${s.name}（${s.kana}）`}
                className={styles.card}
                style={{ width: `${(CARD / PITCH) * 100}%` }}
                sizes="(max-width: 480px) 75vw, 360px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots} style={{ top: dotsTop }}>
        {STAFF.map((s, i) => (
          <button
            key={s.name}
            type="button"
            className={`${styles.dot} ${i === selected ? styles.dotActive : ""}`}
            aria-label={`${s.name}を表示`}
            aria-current={i === selected}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>
    </>
  );
}
