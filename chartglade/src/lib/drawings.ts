/**
 * Coloring drawing library — hand-coded SVG line art for the letter
 * coloring pages (coloring product line rework, PLAN timeline 2026-11-03).
 *
 * Why: the incumbent form (mondaymandala letter pages, KAB sets) is a
 * gallery of many captioned DRAWINGS per page — the pictures are the
 * product, the text is packaging. Phase A shipped a worksheet instead;
 * this library turns each letter page into a 6-drawing gallery:
 * three beginning-sound objects + three letter designs.
 *
 * Conventions (same as StockingColoringSheet):
 *  - every fillable region is a CLOSED path, fill #fff, stroke #1c1c1c
 *  - open lines (whiskers, antennae, waves) are detail strokes only
 *  - objects draw inside a local 0..200 x 0..200 box, placed via
 *    `place(obj, x, y, scale)` so designs can reuse them at any size
 *  - stroke widths stay constant under scaling: groups carry
 *    vector-effect: non-scaling-stroke (2.5px ≈ crayon line on print)
 */

const STROKE = '#1c1c1c';

export interface ColoringDrawing {
  id: string;
  caption: string;
  svg: string;
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
/* Per-letter caption copy (pilot: a/b/c; other letters fall back)     */
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
    { obj: 'ball', caption: 'B is for ball — make every panel of this beach ball its own color.' },
    { obj: 'bear', caption: 'B is for bear — brown fur, or a teddy bear in any color you like.' },
    { obj: 'boat', caption: 'B is for boat — two sails, one hull, and waves to fill in.' },
  ],
  c: [
    { obj: 'cat', caption: 'C is for cat — whiskers, ears, and a fur coat in any color.' },
    { obj: 'car', caption: 'C is for car — pick a paint color for the body and the two windows.' },
    { obj: 'cake', caption: 'C is for cake — three candles, two layers, and frosting scallops.' },
  ],
};

/* ------------------------------------------------------------------ */
/* Design builders                                                     */
/* ------------------------------------------------------------------ */

const VIEW = 400;

/** Card 1–3: the object, big, centered, with a frame. */
function objectCard(art: WordArt): string {
  return `<svg viewBox="0 0 ${VIEW} ${VIEW}" role="img" xmlns="http://www.w3.org/2000/svg">${frame()}${place(art.obj, 68, 68, 1.32)}</svg>`;
}

/** Card 4: the letter beside its favorite object. */
function letterPlusObject(cap: string, lower: string, art: WordArt): string {
  return `<svg viewBox="0 0 ${VIEW} ${VIEW}" role="img" xmlns="http://www.w3.org/2000/svg">${frame()}${letter(cap, 100, 300, 210)}${place(art.obj, 190, 90, 1.05)}</svg>`;
}

/** Card 5: the letter with all three objects gathered around it. */
function letterRing(cap: string, arts: WordArt[]): string {
  return `<svg viewBox="0 0 ${VIEW} ${VIEW}" role="img" xmlns="http://www.w3.org/2000/svg">${frame()}${letter(cap, 200, 262, 170)}${place(arts[0].obj, 22, 20, 0.6)}${place(arts[1].obj, 278, 20, 0.6)}${place(arts[2].obj, 148, 272, 0.6)}</svg>`;
}

/** Card 6: poster letter with a star border to color. */
function letterPoster(cap: string, lower: string): string {
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
 * letter-with-object, letter-ring, and a star-border poster letter.
 * Pilot letters (a/b/c) carry hand-written captions; the rest fall
 * back to a generic template until their batches are drawn.
 */
/**
 * Whether a letter has real drawings yet (pilot: a/b/c). Pages for
 * letters without art keep the worksheet-only layout — the gallery
 * component must not be rendered for them (the object registry has
 * no drawings for their words yet).
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
  const draw = (id: string, caption: string, svg: string): ColoringDrawing => ({ id, caption, svg });

  const cards: ColoringDrawing[] = arts.slice(0, 3).map((art, i) =>
    draw(`word-${i}`, art.caption, objectCard(art)),
  );

  cards.push(
    draw('letter-object', `Letter ${input.capital} and its picture side by side.`, letterPlusObject(input.capital, input.lower, arts[0])),
    draw('letter-ring', `Big letter ${input.capital} with all three ${key}-words around it.`, letterRing(input.capital, arts)),
    draw('letter-poster', `A giant letter ${input.capital} with stars and dots to color around it.`, letterPoster(input.capital, input.lower)),
  );

  return cards;
}
