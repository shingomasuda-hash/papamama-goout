# PAPAMAMA CAR'S × GO OUT CAMP vol.22 LP

完成デザイン `GOOUTCAMP2026.jpg`(幅587px)をNext.js(App Router / TypeScript)で再現した1ページLPです。
ルート `/` にLPを表示します。

## 開発・ビルド

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
npm run start
```

Vercelへはリポジトリをインポートするだけで公開できます(Framework Preset: Next.js、追加設定不要)。

## 構成

| パス | 内容 |
| --- | --- |
| `app/layout.tsx` | GTM(GTM-KPB2C8K)、フォント、メタデータ |
| `app/page.tsx` | LP本体(全セクション) |
| `app/page.module.css` | LPのスタイル |
| `app/Faq.tsx` / `app/Faq.module.css` | FAQアコーディオン |
| `app/cta.ts` | CTAリンク先URL・SNS URL |
| `public/images/` | デザインから切り出した写真・イラスト素材 |

### レイアウトの考え方

- カンプの座標(px)をそのまま `r()` でremに変換して配置しています。`1rem = カンプ上の10px` になるよう
  `html { font-size: calc(min(100vw, 480px) * 10 / 587) }` としているため、
  375〜480pxのどの幅でもカンプと同じ比率で表示されます。
- 481px以上(タブレット・PC)はLP幅480pxで中央配置し、左右は背景色で処理しています。

## CTA

リンク先は `app/cta.ts` で一元管理しています。GTM用に以下の属性を付与しています。

| data-cta | リンク先 | data-cta-position |
| --- | --- | --- |
| `consultation`(相談予約) | `…?uLand=8DfPMx` | `hero` / `middle` / `footer` / `sns` |
| `paint-event`(塗装体験予約) | `…?uLand=Z9vBMh` | `hero` / `event` / `footer` |

## 補足

- 写真・イラストはデザインカンプから切り出したもの(カンプ解像度 587px幅)です。
  高解像度の元素材があれば `public/images/` の同名ファイルを差し替えるだけで反映できます。
- Follow Us の Facebook は URL 未設定のためリンクなしで表示しています。`app/cta.ts` の `SNS.facebook` に URL を入れるとリンクになります。
