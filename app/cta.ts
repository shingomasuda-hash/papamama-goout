/** 相談予約(LINE) */
export const CONSULTATION_URL =
  "https://s.lmes.jp/landing-qr/2007227153-vjoL5182?uLand=8DfPMx";

/** 塗装体験イベント予約(LINE) */
export const PAINT_EVENT_URL =
  "https://s.lmes.jp/landing-qr/2007227153-vjoL5182?uLand=Z9vBMh";

export type CtaKind = "consultation" | "paint-event";

export const CTA_URL: Record<CtaKind, string> = {
  consultation: CONSULTATION_URL,
  "paint-event": PAINT_EVENT_URL,
};

/** Follow Us のSNSリンク。URLが空のものはリンクなしのアイコン表示になる。 */
export const SNS = {
  instagram: "https://www.instagram.com/papamamacars/",
  facebook: "",
};
