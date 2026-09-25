import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import Faq from "./Faq";
import { CTA_URL, SNS, type CtaKind } from "./cta";
import s from "./page.module.css";

import imgHero from "@/public/images/hero.jpg";
import imgEvent1 from "@/public/images/event-1.jpg";
import imgEvent2 from "@/public/images/event-2.jpg";
import imgEvent3 from "@/public/images/event-3.jpg";
import imgIconCar from "@/public/images/icon-car.png";
import imgIconYen from "@/public/images/icon-yen.png";
import imgTicket from "@/public/images/ticket.png";
import imgCan1 from "@/public/images/can-1.jpg";
import imgCan2 from "@/public/images/can-2.jpg";
import imgCan3 from "@/public/images/can-3.jpg";
import imgCan4 from "@/public/images/can-4.jpg";
import imgCan5 from "@/public/images/can-5.jpg";
import imgLineup from "@/public/images/lineup.jpg";
import imgBooth from "@/public/images/booth.jpg";
import imgPaintBg from "@/public/images/paint-bg.jpg";
import imgLeafL from "@/public/images/leaf-l.jpg";
import imgLeafR from "@/public/images/leaf-r.jpg";
import imgIcCal from "@/public/images/ic-cal.png";
import imgIcPin from "@/public/images/ic-pin.png";
import imgIcMt from "@/public/images/ic-mt.png";
import imgIcTent from "@/public/images/ic-tent.png";
import imgIcLike from "@/public/images/ic-like.png";
import imgStaff from "@/public/images/staff.jpg";
import imgExterior from "@/public/images/exterior-bg.jpg";
import imgSpecial from "@/public/images/special.jpg";
import imgLogo from "@/public/images/logo.png";
import imgSnsIg from "@/public/images/sns-ig.png";
import imgSnsFb from "@/public/images/sns-fb.png";
import imgSnsLine from "@/public/images/sns-line.png";

/*
 * 座標・サイズはすべてデザインカンプ(幅587px)上のpx値で記述し、
 * r() で rem(1rem = カンプ10px)へ変換している。
 */
const r = (n: number) => `${+(n / 10).toFixed(2)}rem`;

type Box = { x?: number; y: number; w?: number; h?: number };

/** セクション上端(カンプ上のY座標)を基準に絶対配置スタイルを作る */
function place(secTop: number) {
  return ({ x, y, w, h }: Box): CSSProperties => ({
    top: r(y - secTop),
    ...(x !== undefined ? { left: r(x) } : {}),
    ...(w !== undefined ? { width: r(w) } : {}),
    ...(h !== undefined ? { height: r(h) } : {}),
  });
}

/** 文字スタイル。cy は1行目の文字の中心Y座標 */
function text(
  secTop: number,
  o: { x?: number; cy: number; fs: number; lh?: number; ls?: number; w?: number },
): CSSProperties {
  const lh = o.lh ?? o.fs * 1.5;
  return {
    top: r(o.cy - secTop - lh / 2),
    ...(o.x !== undefined ? { left: r(o.x) } : {}),
    ...(o.w !== undefined ? { width: r(o.w) } : {}),
    fontSize: r(o.fs),
    lineHeight: r(lh),
    ...(o.ls ? { letterSpacing: `${o.ls}em` } : {}),
  };
}

function Lines({ lines }: { lines: ReactNode[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} style={{ display: "block" }}>
          {l}
        </span>
      ))}
    </>
  );
}

function Pic({
  src,
  alt = "",
  style,
  priority,
  className,
}: {
  src: StaticImageData;
  alt?: string;
  style: CSSProperties;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={s.abs} style={style}>
      <Image
        src={src}
        alt={alt}
        className={`${s.img} ${className ?? ""}`}
        sizes="(max-width: 480px) 100vw, 480px"
        priority={priority}
        quality={90}
      />
    </div>
  );
}

function Cta({
  kind,
  position,
  style,
  color,
  fs = 21,
  ls = 0.38,
  textColor = "#000",
  triangle,
  children,
}: {
  kind: CtaKind;
  position: string;
  style: CSSProperties;
  color: "orange" | "lime";
  fs?: number;
  ls?: number;
  textColor?: string;
  triangle?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={CTA_URL[kind]}
      data-cta={kind}
      data-cta-position={position}
      className={`${s.btn} ${color === "orange" ? s.btnOrange : s.btnLime}`}
      style={{
        ...style,
        fontSize: r(fs),
        letterSpacing: `${ls}em`,
        color: textColor,
        boxShadow: `${r(5)} ${r(5)} 0 #7a6522`,
      }}
    >
      {triangle && (
        <span
          className={s.tri}
          aria-hidden="true"
          style={{ right: r(2), bottom: r(2), width: r(55), height: r(55) }}
        />
      )}
      <span style={{ position: "relative", marginRight: `-${ls}em` }}>{children}</span>
    </a>
  );
}

/** 相談予約 / 塗装体験予約 の2ボタン */
function CtaPair({ secTop, y, position }: { secTop: number; y: number; position: string }) {
  const p = place(secTop);
  return (
    <>
      <Cta
        kind="consultation"
        position={position}
        color="orange"
        style={p({ x: 48, y, w: 229, h: 60 })}
      >
        相談予約
      </Cta>
      <Cta
        kind="paint-event"
        position={position}
        color="lime"
        style={p({ x: 313, y, w: 230, h: 60 })}
      >
        塗装体験予約
      </Cta>
    </>
  );
}

function SectionTitle({
  secTop,
  capTop,
  fs,
  color,
  children,
  dx = 0,
  ls,
}: {
  ls?: number;
  secTop: number;
  capTop: number;
  fs: number;
  color: string;
  children: ReactNode;
  dx?: number;
}) {
  // Archivo(幅62%): 行高1のとき、キャップハイトの上端は行ボックス上端から約0.135em下
  return (
    <h2
      className={s.title}
      style={{
        top: r(capTop - secTop - fs * 0.135),
        letterSpacing: ls ? `${ls}em` : undefined,
        fontSize: r(fs),
        color,
        // 中央揃えのまま左右にずらす(ボックスはLP内に収める)
        ...(dx > 0 ? { paddingLeft: r(dx * 2) } : dx < 0 ? { paddingRight: r(-dx * 2) } : {}),
      }}
    >
      {children}
    </h2>
  );
}

/* ====================================================================== */

export default function Home() {
  return (
    <main className={s.lp}>
      <Hero />
      <WhatWeCan />
      <section className={s.sec} style={{ height: r(312) }} aria-label="車両ラインナップ">
        <Pic src={imgLineup} style={place(3030)({ x: 0, y: 3030, w: 587, h: 312 })} />
      </section>
      <Merit />
      <Booth />
      <PaintEvent />
      <About />
      <Staff />
      <Exterior />
      <FlowFaq />
      <section className={s.sec} style={{ height: r(745) }}>
        <Pic
          src={imgSpecial}
          alt="Special Selection 特選車ご覧になれます！"
          style={place(14440)({ x: 0, y: 14440, w: 587, h: 745 })}
        />
      </section>
      <Info />
      <Footer />
    </main>
  );
}

/* ---------------------------------------------------------------- HERO */
function Hero() {
  const T = 0;
  const p = place(T);
  return (
    <section className={`${s.sec} ${s.hero}`} style={{ height: r(1290), background: "var(--c-cream)" }}>
      <Pic
        src={imgHero}
        alt="PAPAMAMA CAR'S GOOUT CAMP"
        style={p({ x: 0, y: 0, w: 587, h: 915 })}
        priority
      />
      <h1 className={s.center} style={{ ...text(T, { cy: 151, fs: 43.6, lh: 63 }), paddingLeft: r(16) }}>
        <span style={{ display: "block" }}>
          あなたの<span className={s.heroGreen}>理想の一台</span>を、
        </span>
        <span style={{ display: "block", letterSpacing: "-0.025em" }}>
          あなたらしい<span className={s.heroGreen}>スタイル</span>で。
        </span>
        <span className="visually-hidden">GOOUT CAMP 出店決定！</span>
      </h1>
      <p
        className={`${s.center} ${s.black}`}
        style={{ ...text(T, { cy: 728, fs: 53, lh: 60 }), color: "#f9ca46" }}
        aria-hidden="true"
      >
        出店決定！
      </p>

      <p className={`${s.center} ${s.bold} ${s.dark}`} style={text(T, { cy: 833, fs: 30, lh: 40 })}>
        家族で楽しめる
      </p>
      <span className={s.bar} style={p({ x: 68, y: 901, w: 296, h: 7 })} />
      <p className={`${s.abs} ${s.black} ${s.dark} ${s.nowrap}`} style={text(T, { x: 73, cy: 876, fs: 36.5, lh: 44 })}>
        <span style={{ color: "var(--c-green)" }}>塗装体験イベント</span>も開催！
      </p>

      <div className={s.abs} style={p({ x: 28, y: 940, w: 532, h: 128 })}>
        {[
          { src: imgEvent1, x: 0, w: 168, alt: "店舗での展示・相談の様子" },
          { src: imgEvent2, x: 181, w: 168, alt: "子どもたちの塗装体験の様子" },
          { src: imgEvent3, x: 362, w: 170, alt: "PAPAMAMA CAR'Sのスタッフ" },
        ].map((ph) => (
          <div
            key={ph.x}
            className={s.abs}
            style={{ left: r(ph.x), top: 0, width: r(ph.w), height: r(127), borderRadius: r(8), overflow: "hidden" }}
          >
            <Image src={ph.src} alt={ph.alt} className={s.img} sizes="(max-width: 480px) 30vw, 140px" quality={90} />
          </div>
        ))}
      </div>

      <Pic src={imgIconCar} style={p({ x: 45, y: 1078, w: 35, h: 35 })} />
      <p className={`${s.abs} ${s.bold} ${s.dark} ${s.nowrap}`} style={text(T, { x: 87, cy: 1096, fs: 24, lh: 34 })}>
        愛車の相談OK!
      </p>
      <span className={s.abs} style={{ ...p({ x: 293, y: 1080, w: 2, h: 33 }), background: "#d3e59a" }} />
      <Pic src={imgIconYen} style={p({ x: 328, y: 1078, w: 35, h: 35 })} />
      <p className={`${s.abs} ${s.bold} ${s.dark} ${s.nowrap}`} style={text(T, { x: 370, cy: 1096, fs: 24, lh: 34 })}>
        下取り査定もOK!
      </p>

      <div className={s.ticketBox} style={p({ x: 33, y: 1126, w: 527, h: 137 })} />
      <p className={s.circle} style={{ ...p({ x: 50, y: 1152, w: 86, h: 86 }), fontSize: r(20), lineHeight: r(27) }}>
        相談
        <br />
        予約で
      </p>
      <span className={s.bar} style={p({ x: 139, y: 1230, w: 262, h: 7 })} />
      <p className={`${s.abs} ${s.black} ${s.nowrap}`} style={{ ...text(T, { x: 143, cy: 1171, fs: 30, lh: 36 }), color: "var(--c-green)" }}>
        入場チケット
      </p>
      <p className={`${s.abs} ${s.black} ${s.nowrap}`} style={{ ...text(T, { x: 143, cy: 1213, fs: 33, lh: 40 }), color: "var(--c-orange)" }}>
        無料プレゼント！
      </p>
      <Pic src={imgTicket} alt="入場チケット FREE!" style={p({ x: 400, y: 1138, w: 152, h: 120 })} />
    </section>
  );
}

/* ---------------------------------------------------------- WHAT WE CAN */
function WhatWeCan() {
  const T = 1290;
  const p = place(T);
  const cards = [
    { src: imgCan1, x: 48, y: 1761, num: "01", label: "購入" },
    { src: imgCan2, x: 313, y: 1761, num: "02", label: "乗り換え" },
    { src: imgCan3, x: 48, y: 2085, num: "03", label: "カスタム" },
    { src: imgCan4, x: 313, y: 2085, num: "04", label: "家族利用" },
    { src: imgCan5, x: 48, y: 2409, num: "05", label: "支払い" },
  ];
  return (
    <section className={s.sec} style={{ height: r(3030 - T), background: "var(--c-yellow)" }}>
      <CtaPair secTop={T} y={1405} position="hero" />

      <SectionTitle secTop={T} capTop={1579} fs={100} color="var(--c-ink)" dx={-1}>
        WHAT WE CAN
      </SectionTitle>
      <p className={`${s.center} ${s.sub}`} style={{ ...text(T, { cy: 1677, fs: 21, lh: 30, ls: 0.08 }), paddingLeft: "0.08em", color: "#3a2a1a" }}>
        何を相談できるの？
      </p>

      <ul>
        {cards.map((c) => (
          <li key={c.num} className={s.abs} style={p({ x: c.x, y: c.y, w: 230, h: 288 })}>
            <Image src={c.src} alt="" className={s.img} sizes="(max-width: 480px) 40vw, 190px" quality={90} />
            <span
              className={s.cardNum}
              aria-hidden="true"
              style={{ top: r(75 - 143 * 0.145), left: r(29), right: "auto", textAlign: "left", fontSize: r(143) }}
            >
              {c.num}
            </span>
            <span
              className={s.cardLabel}
              style={{ top: r(219 - 15), fontSize: r(22), lineHeight: r(30), letterSpacing: "0.27em", paddingLeft: "0.27em" }}
            >
              {c.label}
            </span>
          </li>
        ))}
      </ul>

      <Cta
        kind="consultation"
        position="middle"
        color="orange"
        textColor="#fff"
        ls={0.4}
        triangle
        style={p({ x: 48, y: 2772, w: 495, h: 60 })}
      >
        まずは説明を聞く
      </Cta>
      <Cta
        kind="consultation"
        position="middle"
        color="lime"
        ls={0.38}
        triangle
        style={p({ x: 48, y: 2868, w: 495, h: 60 })}
      >
        相談予約をする
      </Cta>
    </section>
  );
}

/* ---------------------------------------------------------------- MERIT */
function Merit() {
  const T = 3342;
  const p = place(T);
  const items = [
    { y: 3704, h: 200, t: "その場で質問", b: ["疑問はその場で解決。", "気になることをすぐ質問できるから、理解が深ま", "る。"] },
    { y: 3941, h: 175, t: "実車でわかる", b: ["触れて、座って、初めて分かる。写真では", "伝わらないサイズ感や乗り心地を、その場で体感"] },
    { y: 4152, h: 201, t: "その場で比べられる", b: ["複数台を一度にチェック。", "価格・装備・広さを横並びで見て、違いがすぐ分", "かる。"] },
    { y: 4389, h: 201, t: "同伴相談", b: ["家族やパートナーもと同時に確認。", "意見のズレをその場で解消して、納得して選べ", "る。"] },
    { y: 4626, h: 153, t: "現地で下取り査定", b: ["当日のお車をその場で査定！"] },
  ];
  return (
    <section className={s.sec} style={{ height: r(4855 - T), background: "var(--c-forest)" }}>
      <SectionTitle secTop={T} capTop={3470} fs={147} color="#a5b39c" dx={-1}>
        MERIT
      </SectionTitle>
      <p className={`${s.center} ${s.sub}`} style={{ ...text(T, { cy: 3619, fs: 22, lh: 30, ls: 0.03 }), paddingLeft: `calc(0.03em + ${r(2)})`, color: "#e8e8e0" }}>
        会場相談のメリットは？
      </p>
      <ol>
        {items.map((it, i) => (
          <li key={it.t} className={s.meritBox} style={p({ x: 69, y: it.y, w: 518, h: it.h })}>
            <span className={s.meritNum} aria-hidden="true" style={{ left: r(37), top: r(29 - 56 * 0.135), fontSize: r(56), letterSpacing: "0.1em" }}>
              {`0${i + 1}`}
            </span>
            <h3
              className={`${s.abs} ${s.nowrap}`}
              style={{ left: r(106), top: r(47 - 16), fontSize: r(22), lineHeight: r(32), fontWeight: 700 }}
            >
              {it.t}
            </h3>
            <span className={s.hr} style={{ left: r(32), top: r(81), width: r(445), height: r(2), background: "#f3f5f1" }} />
            <p
              className={`${s.abs} ${s.nowrap}`}
              style={{ left: r(33), top: r(111 - 13.75), fontSize: r(19.5), lineHeight: r(27.5), fontWeight: 700 }}
            >
              <Lines lines={it.b} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------------------------------------------------------- BOOTH */
function Booth() {
  const T = 4855;
  const p = place(T);
  return (
    <section className={s.sec} style={{ height: r(5758 - T), background: "var(--c-cream)" }}>
      <SectionTitle secTop={T} capTop={5066} fs={151} color="var(--c-orange)" dx={2} ls={-0.007}>
        BOOTH
      </SectionTitle>
      <p className={`${s.center} ${s.sub}`} style={{ ...text(T, { cy: 5216, fs: 21, lh: 30, ls: 0.13 }), paddingLeft: `calc(0.13em + ${r(10)})`, color: "#f87818" }}>
        ブース紹介
      </p>
      <Pic src={imgBooth} alt="PAPAMAMA CAR'S ブースイメージ" style={p({ x: 0, y: 5285, w: 587, h: 367 })} />
    </section>
  );
}

/* ---------------------------------------------------------- PAINT EVENT */
function PaintEvent() {
  const T = 5758;
  const p = place(T);
  return (
    <section className={s.sec} style={{ height: r(8097 - T) }} aria-labelledby="paint-title">
      <Pic src={imgPaintBg} alt="" style={p({ x: 0, y: T, w: 587, h: 8097 - T })} />
      <span className={s.bar} style={{ ...p({ x: 52, y: 5882, w: 479, h: 14 }), background: "#ffdd4d" }} />
      <h2
        id="paint-title"
        className={`${s.abs} ${s.black} ${s.nowrap}`}
        style={{ ...text(T, { x: 67, cy: 5861, fs: 42, lh: 50, ls: 0.39 }), color: "#000" }}
      >
        実際に塗装体験！
      </h2>
      <p className={s.tag} style={{ ...p({ x: 133, y: 5916, w: 318, h: 49 }), background: "var(--c-staff)", fontSize: r(36), fontWeight: 900 }}>
        イベント開催中
      </p>

      <div className={s.band} style={{ ...p({ x: 0, y: 6263, w: 587, h: 289 }), clipPath: "polygon(0 29.4%, 100% 0, 100% 70.9%, 0 100%)" }} />
      <ul
        className={s.bandText}
        style={{
          ...p({ x: 30, y: 6408 - 75, w: 527, h: 150 }),
          fontSize: r(33),
          lineHeight: r(51),
          letterSpacing: "0.15em",
          transform: "rotate(-8.24deg)",
        }}
      >
        <li style={{ paddingLeft: r(6) }}>●安心安全なインク！</li>
        <li>●実際の車に！</li>
        <li style={{ paddingLeft: r(8) }}>●親子の思い出作りにも最適！</li>
      </ul>

      <h3
        className={`${s.center} ${s.black}`}
        style={{ ...text(T, { cy: 6713, fs: 46, lh: 56, ls: 0.26 }), color: "#000", paddingLeft: "0.2em" }}
      >
        塗装概要
      </h3>
      <div className={s.yBox} style={p({ x: 47, y: 6795, w: 497, h: 496 })} />
      <dl className={s.dark}>
        <dt className={`${s.abs} ${s.bold} ${s.orange} ${s.nowrap}`} style={text(T, { x: 83, cy: 6851, fs: 29, lh: 40, ls: 0.2 })}>
          ●開催日程
        </dt>
        <dd>
          <span className={`${s.abs} ${s.bold} ${s.nowrap}`} style={text(T, { x: 84, cy: 6897, fs: 21, lh: 30, ls: 0.15 })}>
            2026年
          </span>
          <span className={`${s.abs} ${s.bold} ${s.nowrap}`} style={text(T, { x: 84, cy: 6943, fs: 28, lh: 36, ls: 0.245 })}>
            10月2日(金)〜4日(日)
          </span>
        </dd>
        <dt className={`${s.abs} ${s.bold} ${s.orange} ${s.nowrap}`} style={text(T, { x: 83, cy: 6996, fs: 29, lh: 40, ls: 0.2 })}>
          ●予約受付期間
        </dt>
        <dd className={`${s.abs} ${s.bold} ${s.nowrap}`} style={text(T, { x: 84, cy: 7042, fs: 26, lh: 38, ls: 0.21 })}>
          <Lines lines={["2日(金) 15:00〜23:00", "3日(土) 10:00〜17:00", "4日(日) 09:00〜12:00"]} />
        </dd>
        <dt className={`${s.abs} ${s.bold} ${s.orange} ${s.nowrap}`} style={text(T, { x: 83, cy: 7168, fs: 29, lh: 40, ls: 0.2 })}>
          ●予約について
        </dt>
        <dd className={`${s.abs} ${s.bold} ${s.nowrap}`} style={text(T, { x: 83, cy: 7214, fs: 22, lh: 35, ls: 0.087 })}>
          <Lines lines={["相談予約には塗装体験が含まれており、", "塗装体験のみの予約も承っております。"]} />
        </dd>
      </dl>

      <Cta kind="paint-event" position="event" color="orange" triangle style={p({ x: 48, y: 7383, w: 495, h: 60 })}>
        LINEから予約
      </Cta>

      <div className={s.gBox} style={p({ x: 47, y: 7532, w: 497, h: 446 })} />
      <h3
        className={`${s.center} ${s.black} ${s.white}`}
        style={{ ...text(T, { cy: 7614, fs: 52.5, lh: 67 }), textShadow: `${r(3)} ${r(3)} 0 #000` }}
      >
        お子様の
        <br />
        安全面にも配慮
      </h3>
      <ul className={`${s.abs} ${s.bold} ${s.nowrap}`} style={{ ...text(T, { x: 83, cy: 7799, fs: 30, lh: 48, ls: 0.19 }), color: "#000" }}>
        <li>●無害・無臭の安全な塗料</li>
        <li>●スタッフが丁寧にご案内</li>
        <li>●親子で参加しやすい</li>
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------- ABOUT */
function About() {
  const T = 8097;
  const p = place(T);
  const head = (y: number, label: string, icon: StaticImageData) => (
    <>
      <Pic src={icon} style={p({ x: 50, y: y - 23, w: 48, h: 48 })} />
      <h3 className={`${s.abs} ${s.green} ${s.nowrap}`} style={{ ...text(T, { x: 115, cy: y, fs: 29, lh: 40, ls: 0.2 }), fontWeight: 700 }}>
        {label}
      </h3>
    </>
  );
  const brown = `${s.abs} ${s.bold} ${s.brown} ${s.nowrap}`;
  return (
    <section className={s.sec} style={{ height: r(10285 - T), background: "var(--c-cream)" }}>
      <Pic src={imgLeafL} style={p({ x: 0, y: 8099, w: 135, h: 124 })} />
      <Pic src={imgLeafR} style={p({ x: 469, y: 8099, w: 118, h: 124 })} />
      <SectionTitle secTop={T} capTop={8246} fs={151} color="#4a7107" dx={5.5} ls={-0.017}>
        ABOUT
      </SectionTitle>
      <p className={`${s.center} ${s.sub}`} style={{ ...text(T, { cy: 8396, fs: 22, lh: 30, ls: 0.045 }), paddingLeft: `calc(0.045em + ${r(14)})`, color: "#608020" }}>
        イベント概要
      </p>

      {head(8508, "開催日", imgIcCal)}
      <p className={brown} style={text(T, { x: 115, cy: 8560, fs: 21, lh: 30, ls: 0.15 })}>2026年</p>
      <p className={brown} style={text(T, { x: 115, cy: 8605, fs: 28, lh: 36, ls: 0.245 })}>10月2日(金)〜4日(日)</p>
      {[
        { y: 8639, d: "2日(金)", t: "15:00〜23:00(来場者入場)" },
        { y: 8739, d: "3日(土)", t: "10:00〜17:00(ブースOPEN)" },
        { y: 8840, d: "4日(日)", t: "09:00〜12:00(ブースOPEN)" },
      ].map((d) => (
        <div key={d.d}>
          <p className={s.tag} style={{ ...p({ x: 114, y: d.y, w: 109, h: 43 }), fontSize: r(18), letterSpacing: "0.18em", paddingLeft: "0.18em" }}>
            {d.d}
          </p>
          <p className={brown} style={text(T, { x: 115, cy: d.y + 70, fs: 23, lh: 32, ls: 0.22 })}>
            {d.t}
          </p>
        </div>
      ))}

      {head(8990, "会場", imgIcPin)}
      <p className={brown} style={text(T, { x: 115, cy: 9047, fs: 28, lh: 38, ls: 0.25 })}>ふもとっぱら</p>
      <p className={brown} style={text(T, { x: 115, cy: 9094, fs: 21, lh: 32, ls: 0.29 })}>
        <Lines lines={["静岡県富士宮市麓156", "富士オートキャンプ場ふもと村"]} />
      </p>

      {head(9231, "イベントテーマ", imgIcMt)}
      <p className={brown} style={text(T, { x: 115, cy: 9287, fs: 29, lh: 41, ls: 0.19 })}>
        <span style={{ display: "block" }}>
          音楽<span style={{ letterSpacing: 0, marginRight: "0.05em" }}>×</span>キャンプのフェス
        </span>
        <span style={{ display: "block" }}>ティバル</span>
      </p>
      <p className={brown} style={text(T, { x: 115, cy: 9374, fs: 22, lh: 33, ls: 0.29 })}>
        <Lines lines={["広大な敷地内にてオールインワ", "ン（ステージも宿泊場所も出展", "ブースもコンテンツも", "全て１箇所 ！）で開催されます"]} />
      </p>

      {head(9585, "注目コンテンツ", imgIcTent)}
      {[
        { cy: 9636, a: ["最新アウトドア", "ギア・ウェア"], b: ["モビリティ展示"], v: [9630, 54], hr: 9698 },
        { cy: 9731, a: ["エコロジーエリ", "ア"], b: ["アクティビティ", "体験"], v: [9720, 54], hr: 9793 },
        { cy: 9826, a: ["アウトドア", "テクノロジーエ", "リア(新設予定)"], b: ["キッズエリア"], v: [9813, 81], hr: 0 },
      ].map((row) => (
        <div key={row.cy}>
          <p className={brown} style={text(T, { x: 115, cy: row.cy, fs: 20, lh: 29, ls: 0.27 })}>
            <Lines lines={row.a} />
          </p>
          <span className={s.hr} style={{ ...p({ x: 313, y: row.v[0], w: 2, h: row.v[1] }), background: "var(--c-brown)" }} />
          <p className={brown} style={text(T, { x: 341, cy: row.cy, fs: 20, lh: 29, ls: 0.27 })}>
            <Lines lines={row.b} />
          </p>
          {row.hr > 0 && (
            <span className={s.hr} style={{ ...p({ x: 108, y: row.hr - 1, w: 418, h: 2 }), background: "var(--c-brown)" }} />
          )}
        </div>
      ))}

      {head(9965, "こんな方におすすめ", imgIcLike)}
      <ul className={brown} style={text(T, { x: 114, cy: 10018, fs: 23.5, lh: 49.5, ls: 0.02 })}>
        <li>#車中泊・キャンピングカー検討者</li>
        <li>#ペットとアウトドアを楽しみたい方</li>
        <li>#アクティビティ好き/ファミリー層</li>
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------- STAFF */
function Staff() {
  const T = 10285;
  const p = place(T);
  const dark = { color: "#281810" };
  return (
    <section className={s.sec} style={{ height: r(11482 - T), background: "var(--c-staff)" }}>
      <SectionTitle secTop={T} capTop={10401} fs={100} color="#fff" dx={1} ls={-0.02}>
        STAFF
      </SectionTitle>
      <p className={`${s.center} ${s.sub}`} style={{ ...text(T, { cy: 10502, fs: 21, lh: 30, ls: 0.05 }), paddingLeft: "0.05em", color: "#e8f0e0" }}>
        スタッフ紹介
      </p>
      <Pic src={imgStaff} alt="スタッフ 森行 啓太" style={p({ x: 0, y: 10530, w: 587, h: 706 })} />
      <div className={s.plate} style={{ ...p({ x: 144, y: 10989, w: 322, h: 75 }), fontSize: r(25), lineHeight: r(29), letterSpacing: "0.15em", paddingLeft: "0.15em" }}>
        <p>森行 啓太</p>
        <p>モリユキ ケイタ</p>
      </div>
      {[
        { y: 11077, l: "趣味" },
        { y: 11129, l: "特技" },
        { y: 11161, l: "一言" },
      ].map((b) => (
        <span key={b.l} className={s.badge} style={{ ...p({ x: 120, y: b.y, w: 55, h: 27 }), fontSize: r(14) }}>
          {b.l}
        </span>
      ))}
      {[
        { cy: 11089, t: "キャンプ、サップ、サッカー、" },
        { cy: 11116, t: "スノボー、ダイビング" },
        { cy: 11143, t: "お客様を笑顔にできる！" },
        { cy: 11173, t: "お客様にとって最高の１台をご" },
        { cy: 11200, t: "提案します！" },
      ].map((l) => (
        <p key={l.cy} className={`${s.abs} ${s.bold} ${s.nowrap}`} style={{ ...text(T, { x: 180, cy: l.cy, fs: 21, lh: 28, ls: 0.03 }), ...dark }}>
          {l.t}
        </p>
      ))}
      <div aria-hidden="true">
        {[223, 259, 295, 331, 367].map((cx, i) => (
          <span key={cx} className={`${s.dot} ${i === 2 ? s.dotActive : ""}`} style={p({ x: cx - 6, y: 11295, w: 12, h: 12 })} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- EXTERIOR */
function Exterior() {
  const T = 11482;
  const p = place(T);
  const num = (x: number, capTop: number, n: string) => (
    <span className={s.extNum} aria-hidden="true" style={{ left: r(x - 2), top: r(capTop - T - 56 * 0.145), fontSize: r(56), letterSpacing: "-0.06em" }}>
      {n}
    </span>
  );
  const label = (x: number, cy: number, lines: string[]) => (
    <h3 className={s.extLabel} style={text(T, { x, cy, fs: 22, lh: 22 })}>
      <Lines lines={lines} />
    </h3>
  );
  const body = (x: number, cy: number, lines: ReactNode[]) => (
    <p className={`${s.abs} ${s.bold} ${s.white} ${s.nowrap}`} style={text(T, { x, cy, fs: 19.5, lh: 26.3 })}>
      <Lines lines={lines} />
    </p>
  );
  return (
    <section className={s.sec} style={{ height: r(12780 - T) }}>
      <Pic src={imgExterior} alt="" style={p({ x: 0, y: T, w: 587, h: 12780 - T })} />
      <SectionTitle secTop={T} capTop={11598} fs={100} color="#fff" dx={0} ls={-0.019}>
        EXTERIOR
      </SectionTitle>
      <p className={`${s.center} ${s.sub}`} style={{ ...text(T, { cy: 11700, fs: 20, lh: 30, ls: 0.05 }), paddingLeft: "0.05em", color: "#e6e6e6" }}>
        車の外観
      </p>

      {num(53, 12070, "01")}
      {label(125, 12091, ["BODY COLOR"])}
      {["#dfd4c2", "#a9bbc9", "#db9c8d", "#ead19b", "#799b8b"].map((c, i) => (
        <span key={c} className={s.swatch} style={{ ...p({ x: 52 + i * 46, y: 12131, w: 40, h: 41 }), background: c }} />
      ))}
      {body(54, 12209, ["自分らしいカラーで、", "車との時間をより楽し", "く！"])}

      {num(319, 12070, "02")}
      {label(393, 12079, ["COSTOM", "FRONT FACE"])}
      {body(320, 12140, ["社用車とは思えない、タ", "フでワイルドなフロント", "フェイス"])}

      {num(53, 12320, "03")}
      {label(128, 12329, ["CUSTOM", "HEAD LIGHT"])}
      {body(54, 12395, ["商用バンからSUVへ。", "ヘッドライトカスタムで", "アウトドア感を演出しま", "す。"])}

      {num(319, 12320, "04")}
      {label(393, 12341, ["LIFT-UP"])}
      {body(320, 12395, ["商用車の取り回しの良さ", "に、リフトアップで走破", "性をプラス"])}

      {num(53, 12530, "05")}
      {label(128, 12550, ["RACK"])}
      {body(55, 12600, [
        "「組み立てが面倒」「音がうるさそう」そんなルーフ",
        "ラックのイメージを覆す、パパママカーズこだわりの",
        "オリジナルモデル。",
      ])}
    </section>
  );
}

/* ------------------------------------------------------------ FLOW / FAQ */
function FlowFaq() {
  const T = 12780;
  const p = place(T);
  const steps = ["日時送信", "LINE追加", "当日案内"];
  return (
    <section
      className={s.sec}
      style={{ background: "var(--c-yellow)", paddingTop: r(13833 - T), paddingBottom: r(14440 - 14350) }}
    >
      <SectionTitle secTop={T} capTop={12905} fs={150} color="var(--c-ink)" dx={0} ls={0.013}>
        Flow
      </SectionTitle>
      <p className={`${s.center} ${s.sub}`} style={{ ...text(T, { cy: 13056, fs: 22, lh: 30, ls: 0.04 }), paddingLeft: `calc(0.04em + ${r(12)})`, color: "#382818" }}>
        予約から来場までの流れ
      </p>
      <ol>
        {steps.map((st, i) => {
          const y = 13157 + i * 108;
          return (
            <li key={st}>
              <span className={s.flowNum} aria-hidden="true" style={{ left: r(121), top: r(y - 17 - T - 54 * 0.2), fontSize: r(54) }}>
                {`0${i + 1}`}
              </span>
              <span className={`${s.abs} ${s.bold} ${s.orange} ${s.nowrap}`} style={text(T, { x: 209, cy: y, fs: 22, lh: 30 })}>
                {st}
              </span>
              <span className={s.hr} style={{ ...p({ x: 121, y: y + 35, w: 466, h: 2 }), background: "var(--c-orange)" }} />
            </li>
          );
        })}
      </ol>

      <SectionTitle secTop={T} capTop={13604} fs={150} color="var(--c-ink)" dx={0}>
        FAQ
      </SectionTitle>
      <p className={`${s.center} ${s.sub}`} style={{ ...text(T, { cy: 13756, fs: 22, lh: 30 }), color: "#382818" }}>
        Q&amp;A
      </p>
      <Faq />
    </section>
  );
}

/* ----------------------------------------------------------------- INFO */
function Info() {
  const T = 15185;
  const p = place(T);
  const store = (cy: number, name: string, lines: string[]) => (
    <>
      <h3 className={`${s.abs} ${s.nowrap}`} style={{ ...text(T, { x: 77, cy: cy - 1, fs: 22, lh: 30 }), color: "var(--c-lime)", fontWeight: 700 }}>
        {name}
      </h3>
      <p className={`${s.abs} ${s.bold} ${s.dark} ${s.nowrap}`} style={text(T, { x: 77, cy: cy + 39, fs: 18, lh: 24 })}>
        <Lines lines={lines} />
      </p>
    </>
  );
  return (
    <section className={s.sec} style={{ height: r(16148 - T), background: "var(--c-cream)" }}>
      <CtaPair secTop={T} y={15309} position="footer" />
      <Pic src={imgLogo} alt="PAPAMAMA CAR'S" style={p({ x: 75, y: 15461, w: 435, h: 77 })} />
      {store(15630, "【ららぽーと堺店】", [
        "大阪府堺市美原区黒山　22-1",
        "営業時間：10:00〜21:00",
        "※営業時間・定休日はららぽーと堺に準じます。詳し",
        "くはホームページなどでご確認ください。",
      ])}
      {store(15800, "【ららぽーと湘南平塚店】", [
        "神奈川県平塚市天沼　10-1-15130",
        "営業時間：10:00〜21:00",
        "※営業時間・定休日はららぽーと湘南平塚に準じま",
        "す。詳しくはホームページなどでご確認ください。",
      ])}

      <div className={s.goBox} style={p({ x: 73, y: 15964, w: 437, h: 129 })} aria-label="GO OUT CAMP vol.22 2026年10月2日(金)・3日(土)・4日(日)">
        <p className={`${s.abs} ${s.en} ${s.nowrap}`} style={{ left: r(24), top: r(49 - 16.5), fontSize: r(24), lineHeight: r(33) }} aria-hidden="true">
          GO OUT CAMP
          <br />
          vol.22
        </p>
        <span className={s.abs} style={{ left: r(222), top: r(25), width: r(2), height: r(82), background: "#231815" }} />
        <div aria-hidden="true">
          <span className={`${s.abs} ${s.en}`} style={{ left: r(245), top: r(46 - 16.5), fontSize: r(24), lineHeight: r(33) }}>
            2026
          </span>
          {[
            { d: "2", x: 245, c: "金", bg: "#7d7d7d", cx: 280 },
            { d: "3", x: 304, c: "土", bg: "#0071bc", cx: 340 },
            { d: "4", x: 368, c: "日", bg: "#c8102e", cx: 408 },
          ].map((it) => (
            <span key={it.d}>
              <span className={s.abs} style={{ left: r(it.x), top: r(44), fontSize: r(46), lineHeight: r(60), fontWeight: 800, fontFamily: "var(--font-en)", color: "#231815" }}>
                {it.d}
              </span>
              <span className={s.day} style={{ left: r(it.cx - 8), top: r(76 - 8), width: r(17), height: r(17), fontSize: r(11), background: it.bg }}>
                {it.c}
              </span>
            </span>
          ))}
          {[299, 359].map((x) => (
            <span key={x} className={s.abs} style={{ left: r(x - 2), top: r(76 - 2), width: r(5), height: r(5), borderRadius: "50%", background: "#231815" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- FOOTER */
function Footer() {
  const T = 16148;
  const p = place(T);
  return (
    <footer className={s.sec} style={{ height: r(16446 - T), background: "var(--c-orange)" }}>
      <p className={`${s.abs} ${s.en} ${s.white} ${s.nowrap}`} style={text(T, { x: 77, cy: 16204, fs: 22.5, lh: 32 })}>
        Follow Us
      </p>
      <a
        href={SNS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={s.snsLink}
        style={p({ x: 124, y: 16254, w: 91, h: 92 })}
        aria-label="Instagram"
      >
        <Image src={imgSnsIg} alt="" className={s.img} sizes="80px" />
      </a>
      {SNS.facebook ? (
        <a
          href={SNS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={s.snsLink}
          style={p({ x: 250, y: 16254, w: 91, h: 92 })}
          aria-label="Facebook"
        >
          <Image src={imgSnsFb} alt="" className={s.img} sizes="80px" />
        </a>
      ) : (
        <span className={s.snsLink} style={p({ x: 250, y: 16254, w: 91, h: 92 })} aria-hidden="true">
          <Image src={imgSnsFb} alt="" className={s.img} sizes="80px" />
        </span>
      )}
      <a
        href={CTA_URL.consultation}
        data-cta="consultation"
        data-cta-position="sns"
        className={s.snsLink}
        style={p({ x: 376, y: 16252, w: 92, h: 92 })}
        aria-label="LINEで相談"
      >
        <Image src={imgSnsLine} alt="" className={s.img} sizes="80px" />
      </a>
      <p className={`${s.center} ${s.white} ${s.nowrap}`} style={{ ...text(T, { cy: 16406, fs: 13.4, lh: 20 }), fontWeight: 900 }}>
        <small style={{ fontSize: "inherit" }}>COPYRIGHT(C) 2022 PapaMama CAR&apos;S All Rights Reserved.</small>
      </p>
    </footer>
  );
}
