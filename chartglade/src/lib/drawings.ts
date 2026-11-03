/**
 * Coloring art library for the letter coloring pages (coloring product
 * line rework, PLAN timeline 2026-11-03).
 *
 * Object art comes from OpenMoji's black line-art set (openmoji.org,
 * CC BY-SA 4.0) — professional hand-drawn outlines, vendored into
 * public/images/emoji/ by scripts/fetch-emoji-art.mjs (the EMOJI_WORDS
 * set below lists what's vendored). Words without an OpenMoji
 * equivalent fall back to the hand-coded OBJECTS drawings at the
 * bottom of this file (kept for those gaps only).
 *
 * The gallery renders three beginning-sound objects + three letter
 * designs per page: the pictures are the product, the text is
 * packaging.
 *
 * Hand-drawn conventions (same as StockingColoringSheet):
 *  - every fillable region is a CLOSED path, fill #fff, stroke #1c1c1c
 *  - open lines (whiskers, antennae, waves) are detail strokes only
 *  - objects draw inside a local 0..200 x 0..200 box, placed via
 *    `place(obj, x, y, scale)` so designs can reuse them at any size
 *  - stroke widths stay constant under scaling: groups carry
 *    vector-effect: non-scaling-stroke (2.5px ≈ crayon line on print)
 */

const STROKE = '#1c1c1c';

export type ArtEl =
  | { kind: 'img'; src: string; alt: string }
  | { kind: 'svg'; svg: string };

export interface ColoringDrawing {
  id: string;
  caption: string;
  /** How the card composes its art (see LetterColoringGallery.astro). */
  layout: 'object' | 'combo' | 'ring' | 'poster';
  /** Bubble letter for the combo/ring/poster layouts. */
  letter?: string;
  /** Object elements: object=1, combo=1, ring=3, poster=none. */
  els: ArtEl[];
  /** Poster layout only: full standalone SVG. */
  svg?: string;
}

type ObjFn = () => string;

/** Internal stroke width used by object groups (object units, pre-scale). */
const SW = 3;

function obj(fn: ObjFn): string {
  return fn();
}

/* ------------------------------------------------------------------ */
/* Object drawings — each lives in a 0..200 × 0..200 local box        */
/* ------------------------------------------------------------------ */

const OBJECTS: Record<string, ObjFn> = {
  apple: () => `
    <path d="M100,64 C88,50 62,48 48,62 C32,78 34,112 48,138 C60,160 80,174 94,168 C98,166 100,163 100,163 C100,163 102,166 106,168 C120,174 140,160 152,138 C166,112 168,78 152,62 C138,48 112,50 100,64 Z"/>
    <path d="M95,62 C93,46 96,34 104,24 L112,30 C104,40 102,50 103,62 Z"/>
    <path d="M110,34 C122,18 148,14 162,22 C156,42 132,52 112,44 Z"/>
    <path d="M116,42 C130,36 144,30 154,26" fill="none"/>`,
  ant: () => `
    <circle cx="52" cy="96" r="24"/>
    <circle cx="46" cy="90" r="5"/>
    <ellipse cx="100" cy="96" rx="22" ry="18"/>
    <ellipse cx="152" cy="100" rx="32" ry="26"/>
    <path d="M40,74 C30,60 32,48 42,40" fill="none"/>
    <path d="M56,72 C58,56 70,48 82,46" fill="none"/>
    <path d="M84,110 L70,140 L72,158" fill="none"/>
    <path d="M100,114 L100,142 L96,160" fill="none"/>
    <path d="M116,110 L130,140 L128,158" fill="none"/>`,
  acorn: () => `
    <path d="M96,58 C94,44 98,34 106,26 L114,32 C107,41 104,49 105,58 Z"/>
    <path d="M56,92 C56,56 144,56 144,92 L144,100 L56,100 Z"/>
    <path d="M74,64 L74,98" fill="none"/>
    <path d="M100,58 L100,98" fill="none"/>
    <path d="M126,64 L126,98" fill="none"/>
    <path d="M64,100 C64,142 88,164 100,164 C112,164 136,142 136,100 Z"/>`,
  ball: () => `
    <circle cx="100" cy="104" r="72"/>
    <circle cx="100" cy="32" r="9"/>
    <path d="M100,33 C66,72 66,138 100,175" fill="none"/>
    <path d="M100,33 C134,72 134,138 100,175" fill="none"/>
    <path d="M28,104 C68,88 132,88 172,104" fill="none"/>`,
  bear: () => `
    <circle cx="58" cy="38" r="22"/>
    <circle cx="58" cy="38" r="10"/>
    <circle cx="142" cy="38" r="22"/>
    <circle cx="142" cy="38" r="10"/>
    <circle cx="100" cy="88" r="54"/>
    <ellipse cx="100" cy="108" rx="28" ry="20"/>
    <ellipse cx="100" cy="100" rx="10" ry="7"/>
    <path d="M100,112 L100,120" fill="none"/>
    <path d="M88,124 C94,130 106,130 112,124" fill="none"/>
    <circle cx="76" cy="76" r="6"/>
    <circle cx="124" cy="76" r="6"/>`,
  boat: () => `
    <path d="M36,128 L164,128 L144,164 L56,164 Z"/>
    <path d="M100,128 L100,36" fill="none"/>
    <path d="M106,42 L106,122 L158,122 Z"/>
    <path d="M94,48 L94,122 L52,122 Z"/>
    <path d="M100,36 C112,30 122,34 128,30 L126,44 C118,46 110,44 100,44 Z"/>
    <path d="M24,176 C40,168 56,184 72,176 C88,168 104,184 120,176 C136,168 152,184 168,176" fill="none"/>`,
  cat: () => `
    <circle cx="100" cy="112" r="56"/>
    <path d="M62,70 L48,24 L92,56 Z"/>
    <path d="M64,62 L56,36 L80,54 Z"/>
    <path d="M138,70 L152,24 L108,56 Z"/>
    <path d="M136,62 L144,36 L120,54 Z"/>
    <circle cx="78" cy="100" r="7"/>
    <circle cx="122" cy="100" r="7"/>
    <path d="M92,114 L108,114 L100,124 Z"/>
    <path d="M100,124 L100,132" fill="none"/>
    <path d="M84,136 C90,142 98,140 100,134" fill="none"/>
    <path d="M116,136 C110,142 102,140 100,134" fill="none"/>
    <path d="M30,112 L58,114" fill="none"/>
    <path d="M32,124 L58,122" fill="none"/>
    <path d="M170,112 L142,114" fill="none"/>
    <path d="M168,124 L142,122" fill="none"/>`,
  car: () => `
    <path d="M28,128 L28,102 C28,92 36,86 50,86 L70,86 L86,60 C89,55 94,52 100,52 L136,52 C142,52 147,55 150,60 L164,86 L172,86 C184,86 190,93 190,102 L190,126 C190,132 186,136 180,136 L172,136 A26,26 0 0 0 120,136 L94,136 A26,26 0 0 0 42,136 L36,136 C31,136 28,132 28,128 Z"/>
    <path d="M92,84 L92,62 C92,58 95,56 99,56 L112,56 L112,84 Z"/>
    <path d="M120,56 L134,56 C137,56 140,58 142,61 L152,84 L120,84 Z"/>
    <circle cx="70" cy="136" r="22"/>
    <circle cx="70" cy="136" r="9"/>
    <circle cx="146" cy="136" r="22"/>
    <circle cx="146" cy="136" r="9"/>
    <circle cx="184" cy="94" r="6"/>`,
  cake: () => `
    <path d="M26,168 L174,168" fill="none"/>
    <path d="M44,120 L156,120 L156,168 L44,168 Z"/>
    <path d="M44,120 C44,112 52,112 56,120 C60,112 68,112 72,120 C76,112 84,112 88,120 C92,112 100,112 104,120 C108,112 116,112 120,120 C124,112 132,112 136,120 C140,112 148,112 152,120 L152,128 L44,128 Z"/>
    <path d="M60,86 L140,86 L140,120 L60,120 Z"/>
    <rect x="76" y="58" width="8" height="28"/>
    <rect x="96" y="58" width="8" height="28"/>
    <rect x="116" y="58" width="8" height="28"/>
    <path d="M80,54 C76,48 78,42 80,38 C82,42 84,48 80,54 Z"/>
    <path d="M100,54 C96,48 98,42 100,38 C102,42 104,48 100,54 Z"/>
    <path d="M120,54 C116,48 118,42 120,38 C122,42 124,48 120,54 Z"/>`,
  dog: () => `
    <path d="M52,64 C30,70 26,104 44,116 C54,104 56,84 52,64 Z"/>
    <path d="M148,64 C170,70 174,104 156,116 C146,104 144,84 148,64 Z"/>
    <circle cx="100" cy="100" r="52"/>
    <ellipse cx="100" cy="118" rx="26" ry="18"/>
    <ellipse cx="100" cy="108" rx="9" ry="6"/>
    <circle cx="78" cy="86" r="6"/>
    <circle cx="122" cy="86" r="6"/>
    <path d="M100,126 L100,130" fill="none"/>
    <path d="M88,130 C94,136 106,136 112,130" fill="none"/>
    <path d="M94,134 C94,146 106,146 106,134 Z"/>`,
  duck: () => `
    <path d="M58,86 C46,104 46,126 60,140 C74,156 102,162 124,156 C136,152 143,146 147,138 C154,127 160,117 172,111 L188,105 C178,124 165,135 150,137 C153,121 150,105 141,94 C130,84 114,82 100,85 Z"/>
    <path d="M40,66 Q20,64 16,76 Q14,86 28,90 Q40,92 48,84 Z"/>
    <path d="M48,84 L30,88" fill="none"/>
    <ellipse cx="74" cy="64" rx="23" ry="21"/>
    <circle cx="68" cy="58" r="4.5"/>
    <path d="M92,104 C112,98 134,105 142,120 C130,132 106,132 95,119 C90,113 89,108 92,104 Z"/>
    <path d="M104,110 L128,118 M100,116 L118,124" fill="none"/>
    <path d="M28,168 C48,161 68,175 88,168 C108,161 128,175 148,168" fill="none"/>`,
  door: () => `
    <rect x="55" y="30" width="90" height="140" rx="4"/>
    <rect x="68" y="48" width="64" height="36"/>
    <rect x="68" y="96" width="64" height="36"/>
    <circle cx="132" cy="104" r="5"/>`,
  egg: () => `
    <ellipse cx="100" cy="105" rx="58" ry="70"/>
    <path d="M42,95 L56,110 L71,92 L86,110 L100,92 L114,110 L129,92 L144,110 L158,95" fill="none"/>`,
  elf: () => `
    <path d="M62,96 L100,22 L138,96 Z"/>
    <circle cx="100" cy="20" r="10"/>
    <rect x="56" y="92" width="88" height="14" rx="7"/>
    <circle cx="100" cy="118" r="40"/>
    <circle cx="56" cy="118" r="10"/>
    <circle cx="144" cy="118" r="10"/>
    <circle cx="86" cy="112" r="5"/>
    <circle cx="114" cy="112" r="5"/>
    <circle cx="100" cy="124" r="6"/>
    <path d="M88,138 C94,144 106,144 112,138" fill="none"/>`,
  envelope: () => `
    <rect x="35" y="65" width="130" height="85"/>
    <path d="M35,65 L100,115 L165,65" fill="none"/>
    <path d="M60,128 L100,128 M60,138 L88,138" fill="none"/>`,
  fish: () => `
    <path d="M148,95 L184,72 L184,138 L148,115 Z"/>
    <ellipse cx="95" cy="105" rx="55" ry="35"/>
    <path d="M85,72 C95,55 115,52 125,62 L110,76 Z"/>
    <path d="M85,80 C78,95 78,115 85,130" fill="none"/>
    <circle cx="65" cy="95" r="6"/>
    <circle cx="30" cy="60" r="6"/>
    <circle cx="42" cy="45" r="9"/>
    <circle cx="24" cy="34" r="5"/>`,
  frog: () => `
    <ellipse cx="100" cy="112" rx="58" ry="42"/>
    <circle cx="70" cy="58" r="18"/>
    <circle cx="70" cy="58" r="8"/>
    <circle cx="130" cy="58" r="18"/>
    <circle cx="130" cy="58" r="8"/>
    <path d="M55,120 C80,140 120,140 145,120" fill="none"/>
    <circle cx="90" cy="96" r="3"/>
    <circle cx="110" cy="96" r="3"/>`,
  fan: () => `
    <rect x="92" y="148" width="16" height="26"/>
    <ellipse cx="100" cy="180" rx="35" ry="8"/>
    <circle cx="100" cy="95" r="55"/>
    <circle cx="100" cy="95" r="45" fill="none"/>
    <circle cx="100" cy="95" r="12"/>
    <path d="M100,90 C92,65 100,45 115,42 C122,60 114,80 100,90 Z" transform="rotate(0 100 95)"/>
    <path d="M100,90 C92,65 100,45 115,42 C122,60 114,80 100,90 Z" transform="rotate(120 100 95)"/>
    <path d="M100,90 C92,65 100,45 115,42 C122,60 114,80 100,90 Z" transform="rotate(240 100 95)"/>`,
  goat: () => `
    <path d="M78,55 C60,40 55,25 68,15 C72,30 80,42 90,50 Z"/>
    <path d="M122,55 C140,40 145,25 132,15 C128,30 120,42 110,50 Z"/>
    <ellipse cx="60" cy="68" rx="13" ry="8"/>
    <ellipse cx="140" cy="68" rx="13" ry="8"/>
    <path d="M75,60 C75,45 125,45 125,60 L130,120 C130,150 70,150 70,120 Z"/>
    <circle cx="85" cy="85" r="5"/>
    <circle cx="115" cy="85" r="5"/>
    <circle cx="92" cy="115" r="3"/>
    <circle cx="108" cy="115" r="3"/>
    <path d="M95,148 L100,176 L105,148 Z"/>`,
  gift: () => `
    <rect x="45" y="88" width="110" height="82"/>
    <rect x="38" y="70" width="124" height="22" rx="4"/>
    <rect x="92" y="70" width="16" height="100"/>
    <path d="M100,70 C80,55 68,60 73,72 C78,80 92,76 100,70 Z"/>
    <path d="M100,70 C120,55 132,60 127,72 C122,80 108,76 100,70 Z"/>
    <circle cx="100" cy="68" r="6"/>`,
  grapes: () => `
    <path d="M100,45 C100,32 108,26 118,22" fill="none"/>
    <path d="M100,42 C112,30 132,30 140,38 C132,50 112,52 100,46 Z"/>
    <circle cx="85" cy="62" r="15"/>
    <circle cx="115" cy="62" r="15"/>
    <circle cx="70" cy="88" r="15"/>
    <circle cx="100" cy="88" r="15"/>
    <circle cx="130" cy="88" r="15"/>
    <circle cx="85" cy="115" r="15"/>
    <circle cx="115" cy="115" r="15"/>
    <circle cx="100" cy="140" r="15"/>`,
  hat: () => `
    <ellipse cx="100" cy="150" rx="65" ry="14"/>
    <path d="M60,150 L60,62 L140,62 L140,150"/>
    <rect x="60" y="126" width="80" height="16"/>`,
  hen: () => `
    <path d="M45,92 C25,72 20,55 30,45 C42,58 52,72 62,86 Z"/>
    <ellipse cx="95" cy="118" rx="52" ry="38"/>
    <circle cx="140" cy="72" r="20"/>
    <path d="M132,54 C132,44 142,42 146,50 C150,42 160,44 158,54 Z"/>
    <path d="M160,68 L178,74 L160,80 Z"/>
    <path d="M152,90 C150,100 158,102 160,94 Z"/>
    <circle cx="146" cy="68" r="3"/>
    <path d="M85,156 L85,176 M105,156 L105,176 M85,176 L78,182 M105,176 L98,182" fill="none"/>`,
  house: () => `
    <path d="M38,95 L100,45 L162,95 Z"/>
    <rect x="45" y="95" width="110" height="75"/>
    <rect x="90" y="130" width="24" height="40"/>
    <rect x="58" y="110" width="22" height="20"/>
    <rect x="120" y="110" width="22" height="20"/>
    <rect x="128" y="56" width="16" height="30"/>`,
  igloo: () => `
    <path d="M30,150 C30,80 170,80 170,150 Z"/>
    <path d="M75,150 C75,115 125,115 125,150 Z"/>
    <path d="M38,126 C70,118 130,118 162,126" fill="none"/>
    <path d="M46,106 C75,98 125,98 154,106" fill="none"/>
    <path d="M60,128 L58,148 M88,122 L88,148 M114,122 L114,148 M138,128 L140,148" fill="none"/>`,
  ink: () => `
    <rect x="60" y="90" width="80" height="80" rx="8"/>
    <rect x="82" y="68" width="36" height="24"/>
    <rect x="78" y="52" width="44" height="18" rx="4"/>
    <rect x="72" y="112" width="56" height="34"/>
    <path d="M142,96 C152,106 150,120 142,122 C137,113 137,103 142,96 Z"/>`,
  insect: () => `
    <path d="M92,44 L82,28 M108,44 L118,28" fill="none"/>
    <circle cx="100" cy="60" r="18"/>
    <ellipse cx="100" cy="118" rx="38" ry="48"/>
    <path d="M100,72 L100,164" fill="none"/>
    <circle cx="85" cy="100" r="6"/>
    <circle cx="115" cy="100" r="6"/>
    <circle cx="85" cy="130" r="6"/>
    <circle cx="115" cy="130" r="6"/>
    <path d="M63,90 L40,80 M62,118 L38,118 M63,145 L40,155 M137,90 L160,80 M138,118 L162,118 M137,145 L160,155" fill="none"/>`,
  jam: () => `
    <rect x="52" y="56" width="96" height="20" rx="6"/>
    <rect x="55" y="76" width="90" height="94" rx="10"/>
    <rect x="70" y="104" width="60" height="42"/>`,
  jet: () => `
    <path d="M25,100 C40,90 70,85 110,85 L150,90 C165,92 165,108 150,110 L110,115 C70,115 40,110 25,100 Z"/>
    <path d="M85,88 L110,55 L125,58 L105,88 Z"/>
    <path d="M135,90 L150,62 L162,66 L150,92 Z"/>
    <ellipse cx="48" cy="98" rx="10" ry="6"/>
    <path d="M20,100 L6,100 M20,106 L12,106" fill="none"/>`,
  jelly: () => `
    <path d="M45,130 C45,80 155,80 155,130 Z"/>
    <circle cx="100" cy="80" r="10"/>
    <path d="M30,134 C60,140 140,140 170,134" fill="none"/>
    <path d="M62,106 C76,98 88,112 102,104" fill="none"/>
    <path d="M98,120 C112,112 124,126 138,118" fill="none"/>`,
  kite: () => `
    <path d="M100,30 L150,95 L100,170 L50,95 Z"/>
    <path d="M100,30 L100,170 M50,95 L150,95" fill="none"/>
    <path d="M100,170 C96,178 104,184 98,192" fill="none"/>
    <path d="M94,176 L102,180 L96,184 Z"/>
    <path d="M100,188 L108,192 L102,196 Z"/>`,
  king: () => `
    <path d="M50,112 L50,70 L80,100 L100,60 L120,100 L150,70 L150,112 Z"/>
    <rect x="50" y="112" width="100" height="28" rx="4"/>
    <circle cx="75" cy="126" r="5"/>
    <circle cx="100" cy="126" r="5"/>
    <circle cx="125" cy="126" r="5"/>`,
  key: () => `
    <circle cx="55" cy="100" r="22"/>
    <circle cx="55" cy="100" r="10"/>
    <rect x="77" y="92" width="85" height="16"/>
    <rect x="134" y="108" width="10" height="18"/>
    <rect x="152" y="108" width="10" height="14"/>`,
  lion: () => `
    <circle cx="100" cy="100" r="70"/>
    <circle cx="65" cy="62" r="14"/>
    <circle cx="135" cy="62" r="14"/>
    <circle cx="100" cy="100" r="48"/>
    <circle cx="85" cy="92" r="5"/>
    <circle cx="115" cy="92" r="5"/>
    <ellipse cx="100" cy="114" rx="22" ry="16"/>
    <path d="M92,108 L108,108 L100,116 Z"/>
    <path d="M100,116 L100,122 M88,124 C94,130 106,130 112,124" fill="none"/>
    <path d="M40,80 C48,74 52,66 50,58 M160,80 C152,74 148,66 150,58 M100,22 C94,30 94,38 100,44 M55,140 C63,138 68,132 68,126 M145,140 C137,138 132,132 132,126" fill="none"/>`,
  leaf: () => `
    <path d="M100,30 C55,60 40,105 55,145 C70,175 130,175 145,145 C160,105 145,60 100,30 Z"/>
    <path d="M100,38 L100,168" fill="none"/>
    <path d="M100,70 L76,85 M100,100 L70,115 M100,70 L124,85 M100,100 L130,115 M100,130 L80,145 M100,130 L120,145" fill="none"/>
    <path d="M100,168 C100,180 95,190 88,196" fill="none"/>`,
  lamp: () => `
    <path d="M65,80 L135,80 L155,130 L45,130 Z"/>
    <path d="M85,80 L75,130 M115,80 L125,130" fill="none"/>
    <rect x="95" y="130" width="10" height="34"/>
    <ellipse cx="100" cy="170" rx="40" ry="10"/>
    <path d="M120,130 L120,150" fill="none"/>
    <circle cx="120" cy="155" r="4"/>`,
  moon: () => `
    <path d="M70,30 C120,45 140,100 118,150 C108,168 88,175 70,170 C110,150 125,95 100,55 C90,42 80,34 70,30 Z"/>
    <circle cx="112" cy="82" r="7"/>
    <circle cx="118" cy="112" r="5"/>
    <circle cx="104" cy="132" r="6"/>`,
  milk: () => `
    <path d="M60,80 L100,45 L140,80 L140,165 L60,165 Z"/>
    <path d="M100,45 L100,80 M60,80 L100,80 L140,80" fill="none"/>
    <rect x="72" y="105" width="56" height="40"/>`,
  mouse: () => `
    <circle cx="60" cy="55" r="25"/>
    <circle cx="60" cy="55" r="12"/>
    <circle cx="140" cy="55" r="25"/>
    <circle cx="140" cy="55" r="12"/>
    <circle cx="100" cy="118" r="45"/>
    <circle cx="85" cy="108" r="5"/>
    <circle cx="115" cy="108" r="5"/>
    <circle cx="100" cy="130" r="6"/>
    <path d="M55,126 L30,120 M55,136 L32,140 M145,126 L170,120 M145,136 L168,140" fill="none"/>`,
  nest: () => `
    <ellipse cx="80" cy="104" rx="16" ry="20"/>
    <ellipse cx="116" cy="102" rx="16" ry="20"/>
    <path d="M35,112 C40,150 75,162 100,162 C125,162 160,150 165,112 C140,124 120,120 100,120 C80,120 60,124 35,112 Z"/>
    <path d="M45,132 C70,140 130,140 155,132 M55,146 C80,153 120,153 145,146" fill="none"/>`,
  nut: () => `
    <path d="M70,80 C60,60 75,45 100,45 C125,45 140,60 130,80 C142,90 142,110 130,120 C140,135 130,155 100,155 C70,155 60,135 70,120 C58,110 58,90 70,80 Z"/>
    <path d="M84,68 C90,72 96,72 102,68 M104,95 C110,99 116,99 122,95 M80,128 C86,132 92,132 98,128" fill="none"/>`,
  net: () => `
    <circle cx="95" cy="62" r="34"/>
    <circle cx="95" cy="62" r="28" fill="none"/>
    <path d="M127,84 L165,42" fill="none"/>
    <path d="M68,86 L76,160 M122,86 L114,160 M95,94 L95,166" fill="none"/>
    <path d="M72,116 L118,116 M75,140 L115,140" fill="none"/>`,
  owl: () => `
    <path d="M60,56 L50,28 L82,48 Z"/>
    <path d="M140,56 L150,28 L118,48 Z"/>
    <ellipse cx="100" cy="115" rx="52" ry="60"/>
    <circle cx="78" cy="90" r="24"/>
    <circle cx="122" cy="90" r="24"/>
    <circle cx="78" cy="90" r="12"/>
    <circle cx="122" cy="90" r="12"/>
    <path d="M100,104 L92,114 L108,114 Z"/>
    <path d="M55,112 C50,142 58,162 72,170 M145,112 C150,142 142,162 128,170" fill="none"/>
    <path d="M88,174 L88,184 M112,174 L112,184 M88,184 L80,188 M112,184 L120,188" fill="none"/>`,
  octopus: () => `
    <path d="M55,95 C55,45 145,45 145,95 L145,112 C145,122 55,122 55,112 Z"/>
    <circle cx="80" cy="88" r="7"/>
    <circle cx="120" cy="88" r="7"/>
    <path d="M92,104 C97,109 103,109 108,104" fill="none"/>
    <path d="M60,118 C50,140 62,156 52,176" fill="none"/>
    <path d="M85,120 C85,146 74,160 82,180" fill="none"/>
    <path d="M115,120 C115,146 126,160 118,180" fill="none"/>
    <path d="M140,118 C150,140 138,156 148,176" fill="none"/>`,
  ox: () => `
    <path d="M60,72 C40,60 35,40 52,32 C55,48 65,60 78,66 Z"/>
    <path d="M140,72 C160,60 165,40 148,32 C145,48 135,60 122,66 Z"/>
    <ellipse cx="58" cy="85" rx="13" ry="8"/>
    <ellipse cx="142" cy="85" rx="13" ry="8"/>
    <circle cx="100" cy="105" r="48"/>
    <ellipse cx="100" cy="125" rx="28" ry="18"/>
    <circle cx="90" cy="122" r="4"/>
    <circle cx="110" cy="122" r="4"/>
    <circle cx="80" cy="95" r="5"/>
    <circle cx="120" cy="95" r="5"/>`,
  pig: () => `
    <path d="M62,68 L52,35 L92,58 Z"/>
    <path d="M138,68 L148,35 L108,58 Z"/>
    <circle cx="100" cy="105" r="52"/>
    <ellipse cx="100" cy="118" rx="24" ry="17"/>
    <circle cx="92" cy="118" r="4"/>
    <circle cx="108" cy="118" r="4"/>
    <circle cx="78" cy="90" r="6"/>
    <circle cx="122" cy="90" r="6"/>`,
  pen: () => `
    <rect x="88" y="42" width="24" height="100" rx="6"/>
    <path d="M88,70 L112,70" fill="none"/>
    <rect x="112" y="55" width="6" height="30"/>
    <rect x="88" y="142" width="24" height="24"/>
    <path d="M92,166 L108,166 L100,186 Z"/>`,
  pizza: () => `
    <path d="M38,62 C70,52 130,52 162,62 L160,80 C130,70 70,70 40,80 Z"/>
    <path d="M42,80 L158,80 L100,175 Z"/>
    <circle cx="85" cy="102" r="11"/>
    <circle cx="115" cy="97" r="9"/>
    <circle cx="98" cy="130" r="10"/>`,
  queen: () => `
    <path d="M48,118 C48,78 64,62 74,82 C81,64 91,50 100,42 C109,50 119,64 126,82 C136,62 152,78 152,118 Z"/>
    <rect x="48" y="118" width="104" height="28" rx="4"/>
    <circle cx="74" cy="86" r="4"/>
    <circle cx="100" cy="46" r="5"/>
    <circle cx="126" cy="86" r="4"/>
    <circle cx="75" cy="132" r="5"/>
    <circle cx="100" cy="132" r="5"/>
    <circle cx="125" cy="132" r="5"/>`,
  quilt: () => `
    <rect x="40" y="50" width="120" height="120"/>
    <path d="M40,90 L160,90 M40,130 L160,130 M80,50 L80,170 M120,50 L120,170" fill="none"/>
    <path d="M42,52 L78,52 L42,88 Z"/>
    <path d="M82,92 L118,92 L82,128 Z"/>
    <path d="M122,132 L158,132 L122,168 Z"/>`,
  quiz: () => `
    <rect x="55" y="40" width="90" height="120" rx="8"/>
    <path d="M85,85 C85,62 115,62 115,85 C115,98 100,98 100,112" fill="none"/>
    <circle cx="100" cy="130" r="6"/>
    <path d="M70,150 L130,150" fill="none"/>`,
  rain: () => `
    <path d="M45,75 C33,75 28,60 42,55 C45,40 65,35 75,45 C80,32 100,30 108,42 C120,35 135,45 132,58 C145,60 145,78 132,78 Z"/>
    <path d="M60,95 C55,105 55,112 60,115 C65,112 65,105 60,95 Z"/>
    <path d="M85,105 C80,115 80,122 85,125 C90,122 90,115 85,105 Z"/>
    <path d="M110,95 C105,105 105,112 110,115 C115,112 115,105 110,95 Z"/>
    <path d="M95,135 C90,145 90,152 95,155 C100,152 100,145 95,135 Z"/>
    <path d="M70,140 C65,150 65,157 70,160 C75,157 75,150 70,140 Z"/>
    <path d="M120,130 C115,140 115,147 120,150 C125,147 125,140 120,130 Z"/>`,
  robot: () => `
    <path d="M100,32 L100,46" fill="none"/>
    <circle cx="100" cy="28" r="6"/>
    <rect x="62" y="46" width="76" height="54" rx="6"/>
    <circle cx="82" cy="68" r="8"/>
    <circle cx="118" cy="68" r="8"/>
    <rect x="85" y="86" width="30" height="8" rx="4"/>
    <rect x="68" y="106" width="64" height="54" rx="6"/>
    <rect x="85" y="118" width="30" height="20"/>
    <circle cx="76" cy="150" r="4"/>
    <circle cx="124" cy="150" r="4"/>
    <rect x="48" y="110" width="14" height="40" rx="6"/>
    <rect x="138" y="110" width="14" height="40" rx="6"/>
    <rect x="78" y="162" width="12" height="26"/>
    <rect x="110" y="162" width="12" height="26"/>`,
  rocket: () => `
    <path d="M100,28 C120,48 130,78 130,110 L70,110 C70,78 80,48 100,28 Z"/>
    <circle cx="100" cy="76" r="12"/>
    <path d="M70,95 L50,136 L70,122 Z"/>
    <path d="M130,95 L150,136 L130,122 Z"/>
    <rect x="70" y="110" width="60" height="10"/>
    <path d="M85,124 C90,142 95,152 100,162 C105,152 110,142 115,124 Z"/>`,
  sun: () => `
    <circle cx="100" cy="100" r="45"/>
    <path d="M100,40 L100,18 M100,160 L100,182 M40,100 L18,100 M160,100 L182,100 M59,59 L44,44 M141,141 L156,156 M59,141 L44,156 M141,59 L156,44" fill="none"/>
    <circle cx="85" cy="95" r="5"/>
    <circle cx="115" cy="95" r="5"/>
    <path d="M85,115 C92,123 108,123 115,115" fill="none"/>`,
  star: () => `
    <path d="${starPath(100, 100, 72)}"/>
    <circle cx="100" cy="88" r="7"/>
    <path d="M92,112 L108,112 M100,112 L100,124" fill="none"/>`,
  sock: () => `
    <path d="M70,42 L120,42 L120,105 C120,132 136,144 155,149 C170,153 170,170 152,170 C120,168 86,158 76,128 C72,117 70,108 70,100 Z"/>
    <rect x="66" y="30" width="58" height="16" rx="4"/>
    <path d="M70,68 L120,68 M70,86 L120,86" fill="none"/>`,
  tree: () => `
    <path d="M100,25 C70,25 55,50 60,70 C45,75 45,95 60,100 C50,120 65,135 85,132 C90,145 110,145 115,132 C135,135 150,120 140,100 C155,95 155,75 140,70 C145,50 130,25 100,25 Z"/>
    <rect x="92" y="135" width="16" height="45"/>
    <path d="M40,182 L160,182" fill="none"/>`,
  train: () => `
    <rect x="45" y="95" width="85" height="45" rx="6"/>
    <rect x="115" y="65" width="40" height="75" rx="4"/>
    <rect x="60" y="70" width="16" height="25"/>
    <circle cx="68" cy="52" r="10"/>
    <circle cx="82" cy="38" r="12"/>
    <rect x="125" y="80" width="20" height="20"/>
    <circle cx="65" cy="145" r="16"/>
    <circle cx="65" cy="145" r="6"/>
    <circle cx="100" cy="145" r="16"/>
    <circle cx="100" cy="145" r="6"/>
    <circle cx="140" cy="148" r="13"/>
    <circle cx="140" cy="148" r="5"/>
    <path d="M28,168 L180,168" fill="none"/>`,
  tiger: () => `
    <circle cx="62" cy="70" r="16"/>
    <circle cx="62" cy="70" r="7"/>
    <circle cx="138" cy="70" r="16"/>
    <circle cx="138" cy="70" r="7"/>
    <circle cx="100" cy="112" r="52"/>
    <path d="M62,96 L84,96 M58,114 L80,114 M65,130 L84,128 M138,96 L116,96 M142,114 L120,114 M135,130 L116,128" fill="none"/>
    <path d="M92,68 L92,82 M100,66 L100,84 M108,68 L108,82" fill="none"/>
    <circle cx="84" cy="102" r="5"/>
    <circle cx="116" cy="102" r="5"/>
    <ellipse cx="100" cy="126" rx="24" ry="16"/>
    <path d="M92,119 L108,119 L100,127 Z"/>
    <path d="M40,120 L66,122 M42,132 L66,130 M160,120 L134,122 M158,132 L134,130" fill="none"/>`,
  umbrella: () => `
    <path d="M30,100 C30,55 170,55 170,100 Z"/>
    <path d="M30,100 C42,92 54,108 66,100 C78,92 90,108 102,100 C114,92 126,108 138,100 C150,92 162,108 170,100" fill="none"/>
    <path d="M100,58 L100,98 M65,68 L78,98 M135,68 L122,98" fill="none"/>
    <path d="M100,100 L100,165" fill="none"/>
    <path d="M100,165 C100,180 82,180 82,168" fill="none"/>
    <path d="M100,58 L100,42" fill="none"/>
    <circle cx="100" cy="40" r="4"/>`,
  unicorn: () => `
    <path d="M80,70 C80,50 120,50 120,70 L125,120 C125,150 75,150 75,120 Z"/>
    <path d="M95,52 L100,14 L107,52 Z"/>
    <path d="M97,42 L104,40 M97,32 L104,30" fill="none"/>
    <path d="M82,55 L74,34 L95,48 Z"/>
    <path d="M118,55 L126,34 L105,48 Z"/>
    <circle cx="100" cy="90" r="5"/>
    <path d="M78,70 C60,80 58,100 66,115 C58,120 58,135 66,145" fill="none"/>
    <circle cx="112" cy="122" r="3"/>
    <path d="M112,132 C120,132 124,128 126,122" fill="none"/>`,
  under: () => `
    <rect x="30" y="70" width="140" height="14"/>
    <rect x="40" y="84" width="10" height="70"/>
    <rect x="150" y="84" width="10" height="70"/>
    <circle cx="100" cy="132" r="22"/>
    <path d="M25,158 L175,158" fill="none"/>
    <path d="M100,24 L100,50 M92,42 L100,52 L108,42" fill="none"/>`,
  van: () => `
    <path d="M30,130 L30,85 C30,75 38,68 50,68 L110,68 C118,68 124,71 128,77 L142,95 L162,95 C172,95 178,102 178,112 L178,128 C178,134 174,138 168,138 L160,138 A22,22 0 0 0 116,138 L96,138 A22,22 0 0 0 52,138 L40,138 C34,138 30,134 30,130 Z"/>
    <path d="M114,74 L138,93 L114,93 Z"/>
    <rect x="52" y="76" width="26" height="17"/>
    <rect x="84" y="76" width="24" height="17"/>
    <circle cx="74" cy="138" r="20"/>
    <circle cx="74" cy="138" r="8"/>
    <circle cx="138" cy="138" r="20"/>
    <circle cx="138" cy="138" r="8"/>
    <circle cx="174" cy="100" r="5"/>`,
  violin: () => `
    <path d="M60,95 C45,95 40,110 50,120 C42,128 45,142 58,145 C55,158 70,168 100,168 C130,168 145,158 142,145 C155,142 158,128 150,120 C160,110 155,95 140,95 C130,88 115,88 100,95 C85,88 70,88 60,95 Z"/>
    <rect x="94" y="32" width="12" height="64"/>
    <circle cx="100" cy="28" r="8"/>
    <path d="M96,36 L96,148 M104,36 L104,148" fill="none"/>
    <path d="M88,140 L112,140" fill="none"/>
    <path d="M78,112 C84,109 84,122 78,120 M122,112 C116,109 116,122 122,120" fill="none"/>`,
  volcano: () => `
    <circle cx="95" cy="38" r="12"/>
    <circle cx="112" cy="28" r="15"/>
    <circle cx="80" cy="26" r="10"/>
    <path d="M35,150 L85,60 L115,60 L165,150 Z"/>
    <path d="M85,60 C85,50 115,50 115,60 C110,65 90,65 85,60 Z"/>
    <path d="M80,68 C75,95 70,120 62,148 M120,68 C125,95 130,120 138,148" fill="none"/>
    <path d="M25,152 L175,152" fill="none"/>`,
  whale: () => `
    <path d="M160,100 C172,88 180,76 184,66 C188,82 182,98 172,108 Z"/>
    <path d="M30,115 C30,85 65,70 100,70 C140,70 162,90 166,112 C167,122 158,130 146,130 L60,130 C42,130 30,124 30,115 Z"/>
    <path d="M80,68 C78,50 88,45 86,32 M94,68 C96,52 86,48 92,35" fill="none"/>
    <circle cx="55" cy="100" r="5"/>
    <path d="M70,128 C80,145 100,148 112,142 C104,132 88,126 70,128 Z"/>
    <path d="M40,112 C55,118 70,118 82,112" fill="none"/>`,
  web: () => `
    <path d="M100,100 L100,20 M100,100 L156,44 M100,100 L180,100 M100,100 L156,156 M100,100 L100,180 M100,100 L44,156 M100,100 L20,100 M100,100 L44,44" fill="none"/>
    <path d="M100,78 L115,85 L122,100 L115,115 L100,122 L85,115 L78,100 L85,85 Z" fill="none"/>
    <path d="M100,58 L130,70 L142,100 L130,130 L100,142 L70,130 L58,100 L70,70 Z" fill="none"/>
    <path d="M100,38 L145,55 L162,100 L145,145 L100,162 L55,145 L38,100 L55,55 Z" fill="none"/>
    <circle cx="140" cy="132" r="10"/>
    <circle cx="140" cy="119" r="6"/>
    <path d="M133,126 L124,122 M133,134 L124,138 M147,126 L156,122 M147,134 L156,138" fill="none"/>`,
  watermelon: () => `
    <path d="M28,120 A72,72 0 0 1 172,120 Z"/>
    <path d="M40,120 A60,60 0 0 1 160,120" fill="none"/>
    <path d="M85,88 C81,96 81,102 85,105 C89,102 89,96 85,88 Z"/>
    <path d="M115,88 C111,96 111,102 115,105 C119,102 119,96 115,88 Z"/>
    <path d="M100,68 C96,76 96,82 100,85 C104,82 104,76 100,68 Z"/>
    <path d="M90,105 C86,113 86,119 90,122 C94,119 94,113 90,105 Z"/>
    <path d="M110,105 C106,113 106,119 110,122 C114,119 114,113 110,105 Z"/>`,
  xray: () => `
    <rect x="45" y="35" width="110" height="130" rx="6"/>
    <rect x="80" y="27" width="40" height="14" rx="4"/>
    <path d="M70,58 C70,48 85,48 85,58 L115,58 C115,48 130,48 130,58 C138,58 138,73 130,73 L130,128 C138,128 138,143 130,143 C130,153 115,153 115,143 L85,143 C85,153 70,153 70,143 C62,143 62,128 70,128 L70,73 C62,73 62,58 70,58 Z"/>
    <path d="M85,73 L115,73 M85,128 L115,128" fill="none"/>`,
  fox: () => `
    <path d="M62,58 L52,25 L85,48 Z"/>
    <path d="M66,50 L60,34 L80,46 Z"/>
    <path d="M138,58 L148,25 L115,48 Z"/>
    <path d="M134,50 L140,34 L120,46 Z"/>
    <path d="M55,70 C55,50 145,50 145,70 L165,55 C168,80 155,105 135,118 L145,150 C125,168 75,168 55,150 L65,118 C45,105 32,80 35,55 Z"/>
    <circle cx="80" cy="95" r="5"/>
    <circle cx="120" cy="95" r="5"/>
    <path d="M94,125 L106,125 L100,133 Z"/>
    <path d="M100,133 L100,142" fill="none"/>
    <path d="M88,140 C94,146 106,146 112,140" fill="none"/>`,
  box: () => `
    <path d="M45,85 L70,62 L160,62 L135,85 Z"/>
    <path d="M135,85 L160,62 L160,132 L135,155 Z"/>
    <rect x="45" y="85" width="90" height="70"/>
    <rect x="85" y="85" width="10" height="70"/>`,
  yoyo: () => `
    <circle cx="100" cy="95" r="55"/>
    <circle cx="100" cy="95" r="35"/>
    <circle cx="100" cy="95" r="8"/>
    <path d="M100,103 C96,135 104,155 96,180" fill="none"/>
    <circle cx="95" cy="186" r="7" fill="none"/>`,
  yarn: () => `
    <circle cx="100" cy="105" r="60"/>
    <path d="M45,85 C70,60 130,60 155,85 M40,115 C70,95 130,95 160,115 M45,140 C70,120 130,120 155,140" fill="none"/>
    <path d="M70,50 C60,90 60,125 75,158 M130,50 C140,90 140,125 125,158" fill="none"/>
    <path d="M100,165 C90,180 75,185 60,183" fill="none"/>`,
  yak: () => `
    <path d="M60,74 C40,60 34,40 50,30 C54,46 64,58 78,64 Z"/>
    <path d="M140,74 C160,60 166,40 150,30 C146,46 136,58 122,64 Z"/>
    <ellipse cx="56" cy="88" rx="13" ry="8"/>
    <ellipse cx="144" cy="88" rx="13" ry="8"/>
    <circle cx="100" cy="108" r="48"/>
    <path d="M62,132 C58,155 66,170 62,186 M80,146 C78,164 84,176 80,190 M120,146 C122,164 116,176 120,190 M138,132 C142,155 134,170 138,186" fill="none"/>
    <circle cx="84" cy="98" r="5"/>
    <circle cx="116" cy="98" r="5"/>
    <ellipse cx="100" cy="126" rx="26" ry="17"/>
    <circle cx="91" cy="123" r="4"/>
    <circle cx="109" cy="123" r="4"/>`,
  zebra: () => `
    <path d="M72,55 L60,25 L90,45 Z"/>
    <path d="M76,46 L70,32 L86,42 Z"/>
    <path d="M128,55 L140,25 L110,45 Z"/>
    <path d="M124,46 L130,32 L114,42 Z"/>
    <path d="M70,60 C70,45 130,45 130,60 L140,112 C145,150 55,150 60,112 Z"/>
    <path d="M92,60 L94,75 M100,58 L100,76 M108,60 L106,75 M62,95 L82,95 M58,112 L80,110 M138,95 L118,95 M142,112 L120,110" fill="none"/>
    <circle cx="80" cy="92" r="5"/>
    <circle cx="120" cy="92" r="5"/>
    <ellipse cx="100" cy="126" rx="26" ry="17"/>
    <circle cx="92" cy="124" r="4"/>
    <circle cx="108" cy="124" r="4"/>
    <path d="M85,138 L95,136 M105,136 L115,138" fill="none"/>`,
  zipper: () => `
    <rect x="70" y="35" width="24" height="120"/>
    <rect x="106" y="35" width="24" height="120"/>
    <rect x="92" y="42" width="8" height="8"/>
    <rect x="100" y="50" width="8" height="8"/>
    <rect x="92" y="58" width="8" height="8"/>
    <rect x="100" y="66" width="8" height="8"/>
    <rect x="92" y="74" width="8" height="8"/>
    <rect x="100" y="82" width="8" height="8"/>
    <rect x="92" y="90" width="8" height="8"/>
    <rect x="100" y="98" width="8" height="8"/>
    <rect x="92" y="106" width="8" height="8"/>
    <rect x="100" y="114" width="8" height="8"/>
    <rect x="92" y="122" width="8" height="8"/>
    <rect x="88" y="32" width="8" height="6"/>
    <rect x="104" y="32" width="8" height="6"/>
    <circle cx="100" cy="162" r="10" fill="none"/>
    <rect x="92" y="174" width="16" height="12" rx="3"/>`,
  zoo: () => `
    <path d="M40,170 L40,80 C40,45 160,45 160,80 L160,170 Z"/>
    <rect x="55" y="72" width="90" height="30" rx="4"/>
    <text x="100" y="95" text-anchor="middle" font-family="'Arial Black',Arial,sans-serif" font-weight="900" font-size="22" fill="#fff" stroke="#1c1c1c" stroke-width="0.8" paint-order="stroke">ZOO</text>
    <path d="M70,170 C70,120 130,120 130,170 Z"/>
    <path d="M25,172 L175,172" fill="none"/>`,
};

/** Place an object into an outer coordinate space. */
function place(name: string, x: number, y: number, s: number): string {
  const fn = OBJECTS[name];
  if (!fn) throw new Error(`drawings: unknown object "${name}"`);
  // NOTE: stroke-width intentionally scales with the group (no
  // vector-effect here) — the gallery renders each 400-unit viewBox at
  // ~600px, so non-scaling strokes collapse to hairlines. 3 units at the
  // main card scale ≈ 5px on screen and ≈ 0.45mm on the printed page.
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" stroke="${STROKE}" stroke-width="${SW}" stroke-linejoin="round" stroke-linecap="round">${fn()}</g>`;
}

/** Five-pointed star path (same approach as StockingColoringSheet). */
function starPath(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join(' L')} Z`;
}

/** Big bubble letter as SVG <text> — white fill, thick outline. */
function letter(l: string, x: number, y: number, size: number): string {
  return `<text x="${x}" y="${y}" font-family="'Arial Black',Arial,sans-serif" font-weight="900" font-size="${size}" fill="#fff" stroke="${STROKE}" stroke-width="${(size * 0.04).toFixed(1)}" stroke-linejoin="round" paint-order="stroke" text-anchor="middle">${l}</text>`;
}

function frame(): string {
  return `<rect x="8" y="8" width="384" height="384" rx="18" fill="none" stroke="${STROKE}" stroke-width="3"/>`;
}

/* ------------------------------------------------------------------ */
/* Per-letter caption copy, one hand-written line per drawing.        */
/* ------------------------------------------------------------------ */

interface WordArt {
  obj: string;
  caption: string;
}

const LETTER_ART: Record<string, WordArt[]> = {
  a: [
    { obj: 'apple', caption: 'A is for apple — give it a red or green skin and color the leaf.' },
    { obj: 'ant', caption: 'A is for ant — six legs, two antennae, and a picnic to invade.' },
    { obj: 'acorn', caption: 'A is for acorn — color the bumpy cap a different shade than the nut.' },
  ],
  b: [
    { obj: 'ball', caption: 'B is for ball — make every panel of the ball its own color.' },
    { obj: 'bear', caption: 'B is for bear — brown fur, or a teddy bear in any color you like.' },
    { obj: 'boat', caption: 'B is for boat — a sail full of wind and waves below to fill in.' },
  ],
  c: [
    { obj: 'cat', caption: 'C is for cat — whiskers, ears, and a fur coat in any color.' },
    { obj: 'car', caption: 'C is for car — pick a paint color for the body and the two windows.' },
    { obj: 'cake', caption: 'C is for cake — candles on top, frosting and decorations everywhere.' },
  ],
  d: [
    { obj: 'dog', caption: 'D is for dog — four paws, a happy tail, and fur to color.' },
    { obj: 'duck', caption: 'D is for duck — yellow works, but any color duck can swim.' },
    { obj: 'door', caption: 'D is for door — what color is the door where you live?' },
  ],
  e: [
    { obj: 'egg', caption: 'E is for egg — sunny-side up: color the white and the yolk.' },
    { obj: 'elf', caption: 'E is for elf — a pointy hat with a pom-pom on top.' },
    { obj: 'envelope', caption: 'E is for envelope — color the flap, then draw your own stamp.' },
  ],
  f: [
    { obj: 'fish', caption: 'F is for fish — scales can be one color or a rainbow pattern.' },
    { obj: 'frog', caption: 'F is for frog — big eyes sit right on top of its head.' },
    { obj: 'feather', caption: 'F is for feather — a soft feather; color each strand.' },
  ],
  g: [
    { obj: 'goat', caption: 'G is for goat — horns, a beard, and a very serious face.' },
    { obj: 'gift', caption: 'G is for gift — a box, a bow, and a surprise inside.' },
    { obj: 'grapes', caption: 'G is for grapes — purple or green, one berry at a time.' },
  ],
  h: [
    { obj: 'hat', caption: 'H is for hat — a tall top hat with a band to color.' },
    { obj: 'hen', caption: 'H is for hen — a comb on top and a wattle under the beak.' },
    { obj: 'house', caption: 'H is for house — a roof, a chimney, and two windows to fill.' },
  ],
  i: [
    { obj: 'igloo', caption: 'I is for igloo — color each block of ice a slightly different blue.' },
    { obj: 'ink', caption: 'I is for ink — a bottle with one drop escaping.' },
    { obj: 'insect', caption: 'I is for insect — spots on the wings and six legs.' },
  ],
  j: [
    { obj: 'juice', caption: 'J is for juice — a juice box with a straw to color.' },
    { obj: 'jet', caption: 'J is for jet — draw your own speed lines behind the wings.' },
    { obj: 'jelly', caption: 'J is for jelly — a wobbly dome on a plate.' },
  ],
  k: [
    { obj: 'kite', caption: 'K is for kite — color each of the four panels differently.' },
    { obj: 'king', caption: 'K is for king — a crown with three jewels to set.' },
    { obj: 'key', caption: 'K is for key — an old key with a fancy round bow.' },
  ],
  l: [
    { obj: 'lion', caption: 'L is for lion — the big mane is the best part to color.' },
    { obj: 'leaf', caption: 'L is for leaf — green in summer, red and orange in fall.' },
    { obj: 'lamp', caption: 'L is for lamp — a shade, a stem, and a pull chain.' },
  ],
  m: [
    { obj: 'moon', caption: 'M is for moon — gray craters on a yellow moon, or any colors.' },
    { obj: 'milk', caption: 'M is for milk — an ice-cold glass of milk, straw optional.' },
    { obj: 'mouse', caption: 'M is for mouse — big round ears and long whiskers.' },
  ],
  n: [
    { obj: 'nest', caption: 'N is for nest — two eggs sitting in a woven bowl.' },
    { obj: 'nut', caption: 'N is for nut — a peanut in its shell, bumps and all.' },
    { obj: 'nose', caption: 'N is for nose — breathe in, breathe out, color it in.' },
  ],
  o: [
    { obj: 'owl', caption: 'O is for owl — huge eyes that stay open at night.' },
    { obj: 'octopus', caption: 'O is for octopus — eight curly arms to color.' },
    { obj: 'ox', caption: 'O is for ox — strong horns and shoulders built for pulling.' },
  ],
  p: [
    { obj: 'pig', caption: 'P is for pig — a curly snout and a happy face.' },
    { obj: 'pen', caption: 'P is for pen — cap, clip, grip, and a nib.' },
    { obj: 'pizza', caption: 'P is for pizza — a slice with pepperoni rounds.' },
  ],
  q: [
    { obj: 'queen', caption: 'Q is for queen — a princess queen in her crown and gown.' },
    { obj: 'quilt', caption: 'Q is for quilt — color each patch of the blanket.' },
    { obj: 'quiz', caption: 'Q is for quiz — a question card with a big question mark.' },
  ],
  r: [
    { obj: 'rain', caption: 'R is for rain — a cloud with six drops falling.' },
    { obj: 'robot', caption: 'R is for robot — dials, buttons, and arms that swing.' },
    { obj: 'rocket', caption: 'R is for rocket — blast off with a flame underneath.' },
  ],
  s: [
    { obj: 'sun', caption: 'S is for sun — a smiling face with eight warm rays.' },
    { obj: 'sock', caption: 'S is for sock — stripes at the cuff, any colors you like.' },
    { obj: 'star', caption: 'S is for star — five points, shining in the sky.' },
  ],
  t: [
    { obj: 'tree', caption: 'T is for tree — a leafy crown on a sturdy trunk.' },
    { obj: 'train', caption: 'T is for train — an engine with smoke puffs and wheels to count.' },
    { obj: 'tiger', caption: 'T is for tiger — color the stripes black and the fur orange.' },
  ],
  u: [
    { obj: 'umbrella', caption: 'U is for umbrella — color each panel of the canopy.' },
    { obj: 'unicorn', caption: 'U is for unicorn — a spiral horn and a flowing mane.' },
    { obj: 'under', caption: 'U is for under — the ball hides under the table.' },
  ],
  v: [
    { obj: 'van', caption: 'V is for van — windows, wheels, and a big empty side to paint.' },
    { obj: 'violin', caption: 'V is for violin — four strings and an f-hole on each side.' },
    { obj: 'volcano', caption: 'V is for volcano — smoke puffs above the crater.' },
  ],
  w: [
    { obj: 'whale', caption: 'W is for whale — a spout of water and a big tail.' },
    { obj: 'web', caption: 'W is for web — a round spider web; draw the spider yourself.' },
    { obj: 'watermelon', caption: 'W is for watermelon — a slice with seeds to dot in.' },
  ],
  x: [
    { obj: 'xray', caption: 'X is for x-ray — the machine that photographs bones.' },
    { obj: 'fox', caption: 'X is for fox — fox ends in x, with pointy ears and a bushy tail.' },
    { obj: 'box', caption: 'X is for box — box ends in x too; four panels and a tape stripe.' },
  ],
  y: [
    { obj: 'yoyo', caption: 'Y is for yo-yo — a string, a spool, and tricks to master.' },
    { obj: 'yarn', caption: 'Y is for yarn — a ball of string with a loose end.' },
    { obj: 'yak', caption: 'Y is for yak — long horns and a strong, sturdy body.' },
  ],
  z: [
    { obj: 'zebra', caption: 'Z is for zebra — black stripes on white, or white on black.' },
    { obj: 'zipper', caption: 'Z is for zipper — teeth, a slider, and a pull tab.' },
    { obj: 'zoo', caption: 'Z is for zoo — the gate sign says ZOO, come on in.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Design builders                                                     */
/* ------------------------------------------------------------------ */

const VIEW = 400;

/**
 * Words served by a vendored OpenMoji black line-art SVG in
 * public/images/emoji/ (codepoints + fetch pipeline in
 * scripts/fetch-emoji-art.mjs — keep the two lists in sync; a test
 * checks every referenced file exists). Everything else falls back to
 * the hand-drawn OBJECTS library below. License: CC BY-SA 4.0,
 * credited in public/images/emoji/CREDITS.md.
 */
const EMOJI_WORDS = new Set([
  'apple', 'ant', 'ball', 'bear', 'boat', 'cat', 'car', 'cake', 'dog', 'duck',
  'door', 'egg', 'elf', 'envelope', 'fish', 'frog', 'feather', 'goat', 'gift',
  'grapes', 'hat', 'hen', 'house', 'insect', 'jet', 'jelly', 'juice', 'kite',
  'king', 'queen', 'key', 'lion', 'leaf', 'moon', 'milk', 'mouse', 'nose',
  'nut', 'owl', 'octopus', 'ox', 'yak', 'pig', 'pen', 'pizza', 'rain', 'robot',
  'rocket', 'sun', 'sock', 'star', 'tree', 'train', 'tiger', 'umbrella',
  'unicorn', 'van', 'violin', 'volcano', 'whale', 'web', 'watermelon',
  'xray', 'fox', 'box', 'yarn', 'zebra',
]);

const altWord = (obj: string): string =>
  obj === 'xray' ? 'x-ray' : obj.charAt(0).toUpperCase() + obj.slice(1);

/** One coloring element: a real OpenMoji outline, or a hand-drawn fallback. */
function artEl(objName: string): ArtEl {
  if (EMOJI_WORDS.has(objName)) {
    return {
      kind: 'img',
      src: `/images/emoji/${objName}.svg`,
      alt: `${altWord(objName)} coloring picture`,
    };
  }
  const fn = OBJECTS[objName];
  if (!fn) throw new Error(`drawings: unknown object "${objName}"`);
  return {
    kind: 'svg',
    svg: `<svg viewBox="0 0 ${VIEW} ${VIEW}" role="img" xmlns="http://www.w3.org/2000/svg">${place(objName, 68, 68, 1.32)}</svg>`,
  };
}

/** Poster letter with a star border to color. */
function letterPoster(cap: string): string {
  const stars = [
    [60, 60, 26], [200, 40, 20], [340, 60, 26],
    [40, 200, 20], [360, 200, 20],
    [60, 340, 26], [200, 360, 20], [340, 340, 26],
  ]
    .map(([x, y, r]) => `<path d="${starPath(x, y, r)}"/>`)
    .join('');
  const dots = [
    [130, 60], [270, 60], [60, 130], [340, 130],
    [60, 270], [340, 270], [130, 340], [270, 340],
  ]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10"/>`)
    .join('');
  return `<svg viewBox="0 0 ${VIEW} ${VIEW}" role="img" xmlns="http://www.w3.org/2000/svg">${frame()}${letter(cap, 200, 296, 240)}${stars}${dots}</svg>`;
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export interface LetterDrawingInput {
  capital: string;
  lower: string;
  words: string[];
}

/**
 * Six drawings for a letter page: three beginning-sound objects,
 * letter-with-object (HTML combo), letter-ring (HTML), and a
 * star-border poster letter (SVG). Every letter a–z carries its own
 * hand-written captions (X uses ending-sound words: x-ray/fox/box).
 */
export function hasLetterArt(lower: string): boolean {
  return lower in LETTER_ART;
}

export function letterDrawings(input: LetterDrawingInput): ColoringDrawing[] {
  const key = input.lower;
  if (!hasLetterArt(key)) {
    throw new Error(`drawings: no art for letter "${key}" — gate with hasLetterArt()`);
  }
  const arts = LETTER_ART[key];

  const cards: ColoringDrawing[] = arts.slice(0, 3).map((art, i) => ({
    id: `word-${i}`,
    caption: art.caption,
    layout: 'object' as const,
    els: [artEl(art.obj)],
  }));

  cards.push(
    {
      id: 'letter-object',
      caption: `Letter ${input.capital} and its picture side by side.`,
      layout: 'combo',
      letter: input.capital,
      els: [artEl(arts[0].obj)],
    },
    {
      id: 'letter-ring',
      caption: `Big letter ${input.capital} with all three ${key}-words around it.`,
      layout: 'ring',
      letter: input.capital,
      els: arts.map((a) => artEl(a.obj)),
    },
    {
      id: 'letter-poster',
      caption: `A giant letter ${input.capital} with stars and dots to color around it.`,
      layout: 'poster',
      letter: input.capital,
      els: [],
      svg: letterPoster(input.capital),
    },
  );

  return cards;
}
