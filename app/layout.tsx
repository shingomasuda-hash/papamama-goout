import type { Metadata, Viewport } from "next";
import { Archivo, Noto_Sans_JP, Open_Sans } from "next/font/google";
import "./globals.css";

const GTM_ID = "GTM-KPB2C8K";

const notoSansJp = Noto_Sans_JP({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jp",
});

// 英字見出し(WHAT WE CAN / MERIT など): Archivo Black Italic を幅62%で使用
const archivo = Archivo({
  style: "italic",
  axes: ["wdth"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-title",
});

const openSans = Open_Sans({
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-en",
});

export const metadata: Metadata = {
  title: "PAPAMAMA CAR'S | GO OUT CAMP vol.22 出店決定！",
  description:
    "PAPAMAMA CAR'SがGO OUT CAMP vol.22に出店決定！2026年10月2日(金)〜4日(日)、ふもとっぱらにて家族で楽しめる塗装体験イベントも開催。相談予約で入場チケット無料プレゼント。",
  openGraph: {
    title: "PAPAMAMA CAR'S | GO OUT CAMP vol.22 出店決定！",
    description:
      "家族で楽しめる塗装体験イベントも開催！相談予約で入場チケット無料プレゼント。",
    type: "website",
    locale: "ja_JP",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4c673a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${archivo.variable} ${openSans.variable}`}
    >
      <head>
        {/* Google Tag Manager */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga -- 指定のGTMスニペットを<head>上部にそのまま出力するため */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
