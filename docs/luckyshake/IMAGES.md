# Fortune Willow 生图任务清单（👤 执行）

> 给 👤：任意生图工具（即梦 / Midjourney / DALL·E / 豆包…）逐条粘贴生成。
> 生成完丢进 `docs/fortune-draw/zodiac/` 和 `docs/fortune-draw/heroes/`（文件名按下表，一个字别改），🤖 负责抠底/压缩/接入/alt/og:image/JSON-LD。
> **每张生成后自查**：①画面里不能有任何文字/字母（AI 生字必乱）②主体居中、四周留白 ③色板和风格锚一致（12 张摆一起像一套）④同一工具同一会话连续生成，风格更稳。

## 风格锚（每条提示词开头都带这一段，别改）

```
Flat vector illustration, bold clean shapes, warm vermilion red #d94a35,
cream #f7efdd and gold #d4a017 accents on a deep indigo night background
#1c1736 with faint star specks, soft glow around the subject, no text,
centered composition, generous margins, fortune-telling theme.
```

## A. 12 星座 hero 图（横版 1200×630）

接入点：`/horoscope/{slug}/` 页头 hero + 各页 og:image + JSON-LD image。
星座符号 ♈ 等**不要**出现在画面里（符号版已有 SVG），画的是意象主体。

| # | 文件名 | 提示词 = 风格锚 + 下面这句 |
|---|--------|---------------------------|
| 1 | aries-zodiac-horoscope.png | A spirited ram charging upward among constellations, dynamic diagonal pose. |
| 2 | taurus-zodiac-horoscope.png | A calm sturdy bull standing on a small floating grass island under stars. |
| 3 | gemini-zodiac-horoscope.png | Two mirrored youthful figures back to back, joined by a glowing golden thread. |
| 4 | cancer-zodiac-horoscope.png | A gentle crab resting on a crescent moon made of water. |
| 5 | leo-zodiac-horoscope.png | A proud lion with a flowing mane of golden light, facing forward. |
| 6 | virgo-zodiac-horoscope.png | A serene maiden holding a small glowing ear of wheat. |
| 7 | libra-zodiac-horoscope.png | An elegant golden balance scale floating, perfectly level, tiny stars on each pan. |
| 8 | scorpio-zodiac-horoscope.png | A sleek scorpion with curled tail glowing softly, minimalist shapes. |
| 9 | sagittarius-zodiac-horoscope.png | A centaur archer drawing a bow made of light, aiming at a distant star. |
| 10 | capricorn-zodiac-horoscope.png | A sea-goat climbing a staircase of stars rising from gentle waves. |
| 11 | aquarius-zodiac-horoscope.png | A figure pouring a flowing stream of glowing water and stars from an urn. |
| 12 | pisces-zodiac-horoscope.png | Two fish swimming in a circle around each other, connected by a thin golden ribbon. |

## B. 工具页 hero 图（横版 1200×630）

接入点：各工具页 hero 区插画 + 该页 og:image。

| # | 文件名 | 提示词 = 风格锚 + 下面这句 |
|---|--------|---------------------------|
| 13 | number-oracle-hero.png | Three glowing numeral tiles floating in a row above an open hand, numbers replaced by abstract dot patterns (no real digits). |
| 14 | magic-8-ball-hero.png | A glossy black magic 8-ball with a white circle on top, resting on a velvet cushion, tiny stars reflecting on its surface. |
| 15 | yes-no-hero.png | Two round buttons side by side, one warm red one cream, glowing softly, a finger hovering above them. |
| 16 | coin-flip-hero.png | A golden coin mid-air, spinning, motion lines, one side embossed with a star the other with a crescent moon. |
| 17 | fortune-cookie-hero.png | A cracked-open fortune cookie with a small paper slip glowing golden inside. |
| 18 | daily-fortune-hero.png | A small vermilion fortune stick jar beside a rising stylized sun, dawn sky gradient of the same deep palette. |
| 19 | horoscope-hub-hero.png | All twelve zodiac constellations arranged as a circular wheel of small glowing icons around a central star. |

**注**：抽签工具页不需要 hero——已有真 3D 签筒，比任何插画都好。

## C. 站点默认分享卡（可选，1 张）

| # | 文件名 | 提示词 = 风格锚 + 下面这句 |
|---|--------|---------------------------|
| 20 | og-default.png | The vermilion fortune stick jar with cream sticks as the single hero subject, wider framing. |

## 状态追踪

- [ ] A1–A12 星座
- [ ] B13–B19 工具页
- [ ] C20 默认分享卡
- [x] favicon（已定稿：docs/fortune-draw/4.webp 扁平红签筒，深墨紫底，👤 11/11 授权确认可用）
- [ ] 🤖 接入批次（收到图后）：抠底→压缩→`public/img/`→hero `<img>`+og:image+JSON-LD→sitemap image 注入
