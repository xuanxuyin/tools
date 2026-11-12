import * as THREE from 'three';

/**
 * Procedural 3D fortune-stick jar (three.js).
 *
 * The jar is a vermilion temple jar modeled on the reference video: red
 * lacquer body with carved cloud scrolls, a gold-framed BLANK plaque at
 * the front, near-black 回纹 bands at mouth and foot, and an OPEN mouth —
 * a dense bundle of flat bamboo slats (yellow shafts, red-painted heads,
 * rounded flat tips — 👤 11/08: no more sword-star) stands inside.
 * Three motions, all independent:
 *   - idle: the jar holds still tipped FORWARD, mouth toward the viewer
 *     (plaque to the camera); only the sticks breathe with a tiny sway
 *   - shake: the jar rattles at an ANGLE (left-right + fore-back) while
 *     the sticks clatter
 *   - draw: one stick tumbles OUT of the jar, bounces once and lands on
 *     the ground, face up, number tag floating above it — that fallen
 *     stick is the draw
 *
 * The static cut-out photo in the page markup stays visible as a poster
 * until this module boots; if WebGL fails, createJar3D returns null and
 * the poster remains.
 */

export interface Jar3D {
  /** begin the 0.9s angled rattle (sticks clatter along) */
  startShake(): void;
  /** one stick tumbles out and lands on the ground; its floating tag
   *  shows `num` (No. 12 / 第 12 签) on top and the sign's `title` (its
   *  name) underneath */
  popStick(num: string, title: string): void;
  /** the fallen stick leaps back into the bundle, hide the tag */
  reset(): void;
}

const LACQUER = '#d94a35'; // jar body base — vermilion (朱红) lacquer, bright
const LACQUER_DARK = '#a52a1e';
const LACQUER_LIGHT = '#ef7052';
// the jar leans FORWARD at rest, mouth toward the viewer — that is how a
// hand holds a qian tube. The rattle swings around this resting tilt.
const TILT = 0.14;
const BAND = '#241611'; // near-black carved bands at mouth & foot
const GOLD = 0xd4a017; // the plaque frame + the drawn stick's tip
/** shipped cut-out xiangyun art for the jar skin (see makeJarTexture) */
const CLOUD_SRC = '/img/xiangyun.png';
const BAMBOO = 0xe6c489;
const STICK_RED = 0xb02025; // red lacquer segment on each stick's head
const INTERIOR = 0x241812; // dark mouth interior

const BASE_Y = 0.39; // where the stick bundle sits inside the jar
const FLOOR_Y = -0.78; // where a drawn stick lands, lying flat — resting ON
// the shadow disc (local y=-0.82): the stick is 0.07 wide, so half-width
// plus a hair lifts its underside clear of the disc
const FLIGHT = 0.62; // seconds the drawn stick is airborne
// camera framing (fov 48, portrait canvas): must keep the jar top AND the
// fallen stick + its tag on the floor inside the frame at once

// word-wrap on spaces; a token wider than maxW (CJK sentences have no
// spaces) hard-breaks char by char so Chinese titles wrap too
function wrapTitle(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const token of text.split(/\s+/)) {
    if (!token) continue;
    if (line && ctx.measureText(line + ' ' + token).width <= maxW) {
      line += ' ' + token;
      continue;
    }
    if (!line && ctx.measureText(token).width <= maxW) {
      line = token;
      continue;
    }
    // token doesn't fit — flush the line, then hard-break the token
    // itself by characters (that only happens with space-less CJK runs)
    if (line) {
      lines.push(line.trim());
      line = '';
    }
    let rest = token;
    while (ctx.measureText(rest).width > maxW && rest.length > 1) {
      let cut = rest.length;
      while (cut > 1 && ctx.measureText(rest.slice(0, cut)).width > maxW) cut--;
      lines.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut);
    }
    line = rest;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

function makeLabelTexture(num: string, name: string): THREE.CanvasTexture {
  const w = 768;
  const h = 256;
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);
  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(12, 10, w - 24, h - 20, 64);
  } else {
    ctx.rect(12, 10, w - 24, h - 20);
  }
  ctx.fillStyle = 'rgba(32, 26, 56, 0.97)';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#d4a017';
  ctx.stroke();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // line 1 — the number, big gold
  ctx.fillStyle = '#f4c542';
  ctx.font = '700 68px system-ui, -apple-system, "Segoe UI", sans-serif';
  ctx.fillText(num, w / 2, 66, 620);
  // thin gold divider under the number
  ctx.strokeStyle = 'rgba(212, 160, 23, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(210, 108);
  ctx.lineTo(w - 210, 108);
  ctx.stroke();
  // lines 2-3 — the sign's name, wrapped to ≤2 lines (a 3-line slab reads
  // as a paragraph card; the tag is a tag — number front and center)
  ctx.fillStyle = '#ffe9b8';
  const maxW = w - 90;
  let size = 34;
  let lines: string[] = [];
  while (size >= 26) {
    ctx.font = `600 ${size}px system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif`;
    lines = wrapTitle(ctx, name, maxW);
    if (lines.length <= 2) break;
    size -= 2;
  }
  if (lines.length > 2) {
    let last = lines.slice(1).join(' ');
    while (ctx.measureText(last + '…').width > maxW && last.length > 1) last = last.slice(0, -1);
    lines = [lines[0], last + '…'];
  }
  const lh = size + 12;
  const firstY = 144 + ((2 - lines.length) * lh) / 2;
  lines.forEach((ln, i) => {
    ctx.fillText(ln, w / 2, firstY + i * lh, maxW);
  });
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeShadowTexture(): THREE.CanvasTexture {
  const s = 256;
  const cv = document.createElement('canvas');
  cv.width = s;
  cv.height = s;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);
  const g = ctx.createRadialGradient(s / 2, s / 2, 8, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(38, 30, 60, 0.55)');
  g.addColorStop(0.6, 'rgba(38, 30, 60, 0.22)');
  g.addColorStop(1, 'rgba(38, 30, 60, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(cv);
}

/**
 * Jar body skin, modeled on the reference video: vermilion lacquer with
 * carved cloud-scroll relief (祥云纹) and a gold-framed plaque centered at
 * u=0.5 — plaque to the camera once the jar flips rotation.y=π.
 *
 * 👤 11/07 aspect fix: the cylinder wraps ~3.3× more texture around its
 * girth than its height, so a SQUARE skin stretched every motif sideways —
 * the plaque rendered landscape and the clouds flattened. The skin is now
 * drawn at the cylinder's true aspect (1536×464 ≈ circumference : height),
 * making texture pixels square ON the jar: round scrolls render round and
 * the plaque renders portrait, like a real 牌位.
 */
function makeJarTexture(): THREE.CanvasTexture {
  const w = 1536;
  const h = 464;
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);

  // plaque panel: portrait, centered at u=0.5 (texture x = w/2)
  // 👤 11/08: grown to 190×310 so the motif pair inside reads clearly
  const pw = 190;
  const ph = 310;
  const px = w / 2 - pw / 2;
  const py = h / 2 - ph / 2;

  // 👤 11/08: the hand-drawn scrolls read as ugly smudges at jar scale —
  // the skin now stamps the shipped cut-out xiangyun art
  // (public/img/xiangyun.png, watermark stripped + keyed by
  // scripts/make-cloud-asset.mjs) over a dark recess, which reads as 剔红
  // carved lacquer: bright relief clouds sitting in a darker pocket.
  let art: HTMLImageElement | null = null;
  const motif = (x: number, y: number, mw: number, rot: number, flip: number, recess = 0.34) => {
    if (!art) return;
    const mh = mw * (art.height / art.width);
    // dark pocket under the raised cloud — the carve contrast
    const g = ctx.createRadialGradient(x, y, mw * 0.12, x, y, mw * 0.62);
    g.addColorStop(0, `rgba(48, 6, 5, ${recess})`);
    g.addColorStop(1, 'rgba(48, 6, 5, 0)');
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(0, 0, mw * 0.62, mh * 0.72, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.scale((flip * mw) / art.width, mw / art.width);
    ctx.drawImage(art, -art.width / 2, -art.height / 2);
    ctx.restore();
  };

  const paint = () => {
    // lacquer base with a soft vertical sheen
    const base = ctx.createLinearGradient(0, 0, 0, h);
    base.addColorStop(0, LACQUER_LIGHT);
    base.addColorStop(0.45, LACQUER);
    base.addColorStop(1, LACQUER_DARK);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    // scatter clouds in fixed staggered slots — rejection sampling landed
    // them in a near-grid, which reads as machine-made. Hand-carved jars
    // stagger the motifs; anything underlapping the plaque is hidden by
    // the panel painted after us.
    const slots: Array<[number, number]> = [
      [300, 95], [440, 290], [215, 405], // left, staggered
      [1235, 130], [1080, 325], [1330, 395], // right, offset half a band
      [565, 55], [975, 430], // tucked behind the plaque's top/bottom
    ];
    for (const [sx, sy] of slots) {
      const s = 280 + Math.random() * 110;
      const cx = sx + (Math.random() - 0.5) * 60;
      const cy = sy + (Math.random() - 0.5) * 50;
      ctx.filter = 'brightness(1.18)'; // lift the gold one step for arm's-length read
      motif(cx, cy, s, (Math.random() - 0.5) * 0.6, Math.random() < 0.5 ? -1 : 1, 0.4);
      ctx.filter = 'none';
    }

    // gold-framed plaque at u=0.5 — same lacquer as the body, carrying a
    // composed pair of cloud motifs (large over small, mirrored) where the
    // old black center was
    const panel = ctx.createLinearGradient(0, py, 0, py + ph);
    panel.addColorStop(0, LACQUER_LIGHT);
    panel.addColorStop(0.45, LACQUER);
    panel.addColorStop(1, LACQUER_DARK);
    ctx.fillStyle = panel;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') ctx.roundRect(px, py, pw, ph, 16);
    else ctx.rect(px, py, pw, ph);
    ctx.fill();
    // one hero cloud fills the panel — a crowd of small motifs read as
    // generic ornament, one big one reads as 祥云
    motif(w / 2, py + 155, 182, -0.04, 1, 0.32);
    ctx.strokeStyle = '#d4a017';
    ctx.lineWidth = 7;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') ctx.roundRect(px + 4, py + 4, pw - 8, ph - 8, 13);
    else ctx.rect(px + 4, py + 4, pw - 8, ph - 8);
    ctx.stroke();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'rgba(212, 160, 23, 0.85)';
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') ctx.roundRect(px + 16, py + 16, pw - 32, ph - 32, 9);
    else ctx.rect(px + 16, py + 16, pw - 32, ph - 32);
    ctx.stroke();
  };

  paint(); // bare lacquer first — the art layer repaints on load
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  const img = new Image();
  img.onload = () => {
    art = img;
    paint();
    tex.needsUpdate = true;
  };
  img.src = CLOUD_SRC;
  return tex;
}

/** dark carved band skin (回纹 greek-key) for the mouth & foot rings */
function makeBandTexture(): THREE.CanvasTexture {
  const w = 256;
  const h = 64;
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);
  ctx.fillStyle = BAND;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(212, 160, 23, 0.38)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'square';
  for (let x = 0; x < w; x += 32) {
    // one 回纹 hook per cell
    ctx.beginPath();
    ctx.moveTo(x + 6, 52);
    ctx.lineTo(x + 6, 12);
    ctx.lineTo(x + 26, 12);
    ctx.lineTo(x + 26, 42);
    ctx.lineTo(x + 14, 42);
    ctx.lineTo(x + 14, 22);
    ctx.lineTo(x + 20, 22);
    ctx.stroke();
  }
  // edge hairlines
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255, 214, 150, 0.22)';
  ctx.beginPath();
  ctx.moveTo(0, 2);
  ctx.lineTo(w, 2);
  ctx.moveTo(0, h - 2);
  ctx.lineTo(w, h - 2);
  ctx.stroke();
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Shared bamboo slat skin: yellow bamboo with vertical fibers and node
 * rings, capped by a red lacquer segment on the top ~25% (the head mesh
 * above it is solid red) — 👤 11/08: 上面红、下面黄，像真签；红段从 12%
 * 加长到 25%，竹身调黄。
 */
function makeStickTexture(): THREE.CanvasTexture {
  const w = 128;
  const h = 256;
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#eed492');
  g.addColorStop(1, '#dbb95e');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // vertical fibers
  for (let i = 0; i < 46; i++) {
    const x = Math.random() * w;
    ctx.strokeStyle = Math.random() < 0.5 ? '#c9a244' : '#f5e3ae';
    ctx.globalAlpha = 0.05 + Math.random() * 0.08;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + (Math.random() - 0.5) * 4, h);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  // bamboo node rings
  for (const y of [96, 186]) {
    ctx.fillStyle = 'rgba(130, 92, 36, 0.4)';
    ctx.fillRect(0, y, w, 5);
    ctx.fillStyle = 'rgba(255, 240, 200, 0.5)';
    ctx.fillRect(0, y - 2, w, 2);
  }
  // red lacquer band on the top ~25%, slightly uneven brush edge
  ctx.fillStyle = '#b02025';
  ctx.fillRect(0, 0, w, 64);
  for (let x = 0; x < w; x += 8) {
    ctx.fillRect(x, 62, 8, 2 + Math.random() * 5);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

interface Stk {
  group: THREE.Group;
  baseTiltX: number;
  baseTiltZ: number;
  homeX: number;
  homeZ: number;
  homeSpin: number;
  phase: number;
  speed: number;
  tip: THREE.MeshStandardMaterial;
  label: THREE.Sprite;
  material: THREE.SpriteMaterial;
  height: number;
}

export function createJar3D(host: HTMLElement): Jar3D | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return null;
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  const canvas = renderer.domElement;
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 50);
  camera.position.set(0, 1.7, 5.05); // nudged closer — the jar shrank 11/07
  camera.lookAt(0, 0.6, 0); // framed so the fallen stick stays in view

  // warm key from the upper-left + dim ground, echoing the video's
  // temple-window light; a soft warm rim from the rear right
  scene.add(new THREE.HemisphereLight(0xffe4c2, 0x3a3050, 0.85));
  const key = new THREE.DirectionalLight(0xffe6c4, 2.3);
  key.position.set(-2.8, 4.0, 3.0);
  scene.add(key);
  const warm = new THREE.DirectionalLight(0xffc890, 0.75);
  warm.position.set(3.2, 1.8, -2.6);
  scene.add(warm);

  const jar = new THREE.Group();
  // the jar never spins on its own — it sits still until shaken. The
  // texture's plaque sits at u=0.5 (the BACK of the cylinder), so flip once
  // to face camera
  jar.rotation.y = Math.PI;
  jar.rotation.x = TILT; // resting pose: mouth tipped toward the viewer

  // 👤 11/08 drag-to-rotate: the jar rides a pivot the visitor can spin to
  // admire the carving. On release it springs home (plaque forward), and
  // startShake() snaps the pivot home first so the draw choreography —
  // stick, tag, landing — always plays in the plaque-forward frame
  const pivot = new THREE.Group();
  pivot.add(jar);
  scene.add(pivot);

  const jarTex = makeJarTexture();
  const bodyMat = new THREE.MeshStandardMaterial({
    map: jarTex,
    roughness: 0.26, // glossier — it's lacquer
    metalness: 0.08,
  });
  const bandTex = makeBandTexture();
  bandTex.repeat.set(6, 1);
  const bandMat = new THREE.MeshStandardMaterial({
    map: bandTex,
    roughness: 0.48,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: INTERIOR,
    roughness: 0.95,
    side: THREE.BackSide,
  });

  // body is an open tube — the mouth is a real opening, not a red cap.
  // near-straight cylinder (no cup taper): classic temple jar silhouette.
  // 👤 11/07: jar scaled DOWN ~15% (bottom stays anchored) while the sticks
  // grew — more slat above the rim, classic temple-jar proportions.
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.61, 1.18, 48, 1, true), bodyMat);
  body.position.y = -0.085;
  bodyMat.side = THREE.DoubleSide;
  jar.add(body);
  // dark interior wall + bed the sticks stand in + base cap
  const liner = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.59, 1.16, 48, 1, true), interiorMat);
  liner.position.y = -0.085;
  jar.add(liner);
  const bed = new THREE.Mesh(new THREE.CircleGeometry(0.61, 48), interiorMat);
  bed.rotation.x = -Math.PI / 2;
  bed.position.y = 0.36;
  jar.add(bed);
  const baseCap = new THREE.Mesh(new THREE.CircleGeometry(0.61, 48), interiorMat);
  baseCap.rotation.x = -Math.PI / 2;
  baseCap.position.y = -0.58;
  jar.add(baseCap);
  // mouth: dark carved band with a crisp edge (no gold, like the video)
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.64, 0.14, 48, 1, true), bandMat);
  rim.position.y = 0.575;
  jar.add(rim);
  const rimRing = new THREE.Mesh(new THREE.TorusGeometry(0.745, 0.024, 12, 64), bandMat);
  rimRing.rotation.x = Math.PI / 2;
  rimRing.position.y = 0.645;
  jar.add(rimRing);
  const innerRing = new THREE.Mesh(new THREE.TorusGeometry(0.63, 0.018, 10, 48), bandMat);
  innerRing.rotation.x = Math.PI / 2;
  innerRing.position.y = 0.51;
  jar.add(innerRing);
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.68, 0.13, 48), bandMat);
  foot.position.y = -0.74;
  jar.add(foot);

  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 3.2),
    new THREE.MeshBasicMaterial({
      map: makeShadowTexture(),
      transparent: true,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.82;
  jar.add(shadow);

  // ---- stick bundle -------------------------------------------------
  const sticks: Stk[] = [];
  const candidates: Stk[] = [];
  const stickTex = makeStickTexture();
  // flat bamboo slats (扁签) — thin boxes, not round rods
  const stickGeoCache = new Map<number, THREE.BoxGeometry>();
  const stickGeo = (h: number) => {
    let g = stickGeoCache.get(h);
    if (!g) {
      g = new THREE.BoxGeometry(0.1, h, 0.03);
      stickGeoCache.set(h, g);
    }
    return g;
  };
  // 👤 11/08 (👤 反馈"签头多了个星星"): 旧剑头(对称尖肩+收腰+尖顶)小尺寸下
  // 读成星形——真签没有星星。改平头圆角红帽：一根漆红扁签的自然端头。
  const headShape = new THREE.Shape();
  headShape.moveTo(-0.042, 0);
  headShape.lineTo(-0.042, 0.145);
  headShape.absarc(0, 0.145, 0.042, Math.PI, 0, true); // rounded flat top
  headShape.lineTo(0.042, 0);
  headShape.closePath();
  const headGeo = new THREE.ExtrudeGeometry(headShape, { depth: 0.022, bevelEnabled: false });
  const addStick = (x: number, z: number, h: number, lean: number, spin = -1) => {
    const group = new THREE.Group();
    group.position.set(x, BASE_Y, z);
    const tint = 0.92 + Math.random() * 0.16;
    const mat = new THREE.MeshStandardMaterial({
      map: stickTex,
      color: new THREE.Color(BAMBOO).multiplyScalar(tint),
      roughness: 0.55,
    });
    const shaft = new THREE.Mesh(stickGeo(h), mat);
    shaft.position.y = h / 2;
    group.add(shaft);
    // red sword head — turns gold when this is the drawn stick
    const tipMat = new THREE.MeshStandardMaterial({ color: STICK_RED, roughness: 0.5 });
    const tip = new THREE.Mesh(headGeo, tipMat);
    tip.position.set(0, h, -0.011);
    group.add(tip);
    const labelMat = new THREE.SpriteMaterial({ depthTest: false, transparent: true });
    const label = new THREE.Sprite(labelMat);
    label.position.y = h + 0.36;
    label.scale.set(0, 0, 1);
    label.renderOrder = 999;
    group.add(label);
    group.rotation.z = lean;
    group.rotation.x = (Math.random() - 0.5) * 0.06;
    // slats at mixed angles read as a hand-dropped bundle; front
    // candidates mostly face the camera
    group.rotation.y = spin >= 0 ? spin : Math.random() * Math.PI;
    jar.add(group);
    const stk: Stk = {
      group,
      baseTiltX: group.rotation.x,
      baseTiltZ: lean,
      homeX: x,
      homeZ: z,
      homeSpin: group.rotation.y,
      phase: Math.random() * Math.PI * 2,
      speed: 2.2 + Math.random() * 1.6,
      tip: tipMat,
      label,
      material: labelMat,
      height: h,
    };
    sticks.push(stk);
    return stk;
  };

  // outer ring (mostly hidden fill) + mid ring + inner fill + 5 front candidates
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2 + 0.3;
    addStick(Math.cos(a) * 0.42, Math.sin(a) * 0.42, 1.0 + Math.random() * 0.12, (Math.random() - 0.5) * 0.16);
  }
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    addStick(Math.cos(a) * 0.31, Math.sin(a) * 0.31, 1.15 + Math.random() * 0.1, (Math.random() - 0.5) * 0.14);
  }
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + 0.5;
    addStick(Math.cos(a) * 0.18, Math.sin(a) * 0.18, 1.3 + Math.random() * 0.08, (Math.random() - 0.5) * 0.12);
  }
  const fanLeans = [-0.1, -0.05, 0, 0.05, 0.1];
  for (let i = 0; i < 5; i++) {
    const x = -0.17 + i * 0.085;
    const stk = addStick(x, 0.14 + Math.abs(x) * 0.4, 1.35, fanLeans[i], (Math.random() - 0.5) * 0.4);
    candidates.push(stk);
  }

  // ---- animation state ----------------------------------------------
  // the ritual: angled shake → one stick tumbles OUT of the jar and lands
  // on the ground, number tag up — THAT fallen stick is the draw
  let shakeT = -1;
  let chosen: Stk | null = null;
  let flyT = -1; // flight clock; <0 = not airborne
  let bounceT = -1; // landing bounce clock
  let labelT = -1; // tag pop-in clock, starts when the stick lands
  let landX = 0;
  let landZ = 0;
  let landRotY = 0;
  let landRotZ = 0;
  let settleT = -1;
  let returning: {
    s: Stk;
    fromX: number;
    fromY: number;
    fromZ: number;
    fromRX: number;
    fromRY: number;
    fromRZ: number;
  } | null = null;

  const api: Jar3D = {
    startShake() {
      // ritual first: cancel any drag and snap the pivot home so the whole
      // draw plays in the plaque-forward frame
      dragging = false;
      pivot.rotation.set(0, 0, 0);
      shakeT = 0;
    },
    popStick(num, title) {
      chosen = candidates[Math.floor(Math.random() * candidates.length)] ?? null;
      if (!chosen) return;
      flyT = 0;
      bounceT = -1;
      labelT = -1;
      // landing spot: on the floor IN FRONT of the jar, clear of the body.
      // The jar carries rotation.y=π (plaque to camera), so jar-local +z
      // points AWAY from the viewer — "toward the camera" is NEGATIVE local
      // z. Positive landX reads slightly LEFT of center on screen.
      landX = 0.24 + (Math.random() - 0.5) * 0.2;
      landZ = -(1.15 + (Math.random() - 0.5) * 0.16);
      landRotY = (Math.random() - 0.5) * 0.25;
      // lying flat, face up: rotation.z=-π/2 lays the slat along +x with
      // its broad face toward the camera
      landRotZ = -Math.PI / 2 + (Math.random() - 0.5) * 0.12;
      chosen.material.map?.dispose();
      chosen.material.map = makeLabelTexture(num, title);
      chosen.material.needsUpdate = true;
      chosen.tip.color.set(GOLD);
      chosen.tip.emissive.set(0xb8860b);
      chosen.tip.emissiveIntensity = 0.95;
      // the tag floats above the LANDING SPOT, not the tumbling stick —
      // re-parent it to the jar so the flight can't drag it around.
      // 👤 11/08: keep it LOW, hovering just over the fallen stick on the
      // floor — higher up it drifts in front of the jar body and hides it.
      // 👤 11/08 (二): 太小 → 放大整牌 + 提字号，落点仍贴签不遮筒
      jar.add(chosen.label);
      chosen.label.scale.set(0, 0, 1);
      chosen.label.position.set(landX + 0.1, FLOOR_Y + 0.62, landZ + 0.1);
    },
    reset() {
      if (chosen) {
        returning = {
          s: chosen,
          fromX: chosen.group.position.x,
          fromY: chosen.group.position.y,
          fromZ: chosen.group.position.z,
          fromRX: chosen.group.rotation.x,
          fromRY: chosen.group.rotation.y,
          fromRZ: chosen.group.rotation.z,
        };
        settleT = 0;
      }
      chosen = null;
      flyT = -1;
      labelT = -1;
    },
  };

  // ---- render loop ---------------------------------------------------
  const clock = new THREE.Clock();
  const fit = () => {
    const w = Math.max(host.clientWidth, 1);
    const h = Math.max(host.clientHeight, 1);
    renderer.setSize(w, h, false);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  fit();
  const ro = new ResizeObserver(fit);
  ro.observe(host);

  // ---- drag-to-rotate (👤 11/08) -------------------------------------
  // hold + move spins the jar; release eases it back to plaque-forward.
  // Locked while a stick is out or the jar is shaking — a fallen stick must
  // never orbit the floor with the jar.
  let dragging = false;
  let lastPX = 0;
  let lastPY = 0;
  const canDrag = () => shakeT < 0 && !chosen;
  canvas.style.cursor = 'grab';
  canvas.style.touchAction = 'none';
  const onDown = (e: PointerEvent) => {
    if (!canDrag()) return;
    dragging = true;
    lastPX = e.clientX;
    lastPY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging || !canDrag()) return;
    pivot.rotation.y += (e.clientX - lastPX) * 0.011;
    pivot.rotation.x = THREE.MathUtils.clamp(pivot.rotation.x + (e.clientY - lastPY) * 0.005, -0.2, 0.3);
    lastPX = e.clientX;
    lastPY = e.clientY;
  };
  const onUp = () => {
    dragging = false;
    canvas.style.cursor = 'grab';
  };
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);

  const renderLoop = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    let amp = 0;
    if (shakeT >= 0) {
      shakeT += dt;
      const k = Math.max(0, 1 - shakeT / 0.9);
      if (shakeT > 0.9) shakeT = -1;
      amp = k * k;
      // angled rattle: left-right swing plus a fore-back beat around the
      // resting forward TILT — a hand shaking a tipped tube
      jar.rotation.z = Math.sin(shakeT * 24) * (reduced ? 0.05 : 0.15) * amp;
      jar.rotation.x = TILT + Math.sin(shakeT * 24 + 1.3) * (reduced ? 0.03 : 0.09) * amp;
      jar.position.y = Math.abs(Math.sin(shakeT * 24)) * 0.035 * amp;
      jar.position.x = Math.sin(shakeT * 12) * 0.03 * amp;
    } else {
      jar.rotation.x = TILT + (jar.rotation.x - TILT) * 0.8;
      jar.rotation.x *= 0.8;
      jar.position.y *= 0.8;
      jar.position.x *= 0.8;
    }

    for (const s of sticks) {
      if (returning && s === returning.s) continue; // handled below
      const sway = reduced ? 0 : Math.sin(t * s.speed + s.phase) * 0.018;
      if (s === chosen && flyT >= 0) {
        flyT += dt;
        const k = Math.min(1, flyT / FLIGHT);
        // rise over the rim first (42%), then fall to the floor;
        // z is front-loaded so the fall clears the jar silhouette
        let y: number;
        if (k < 0.42) {
          const u = k / 0.42;
          y = BASE_Y + (1.95 - BASE_Y) * (1 - Math.pow(1 - u, 2));
        } else {
          const u = (k - 0.42) / 0.58;
          y = 1.95 + (FLOOR_Y - 1.95) * u * u;
        }
        s.group.position.y = y;
        const gx = landX - s.height / 2; // lying origin: shaft extends +x
        const zk = 1 - Math.pow(1 - k, 2);
        s.group.position.x = s.homeX + (gx - s.homeX) * k;
        s.group.position.z = s.homeZ + (landZ - s.homeZ) * zk;
        // tumble mid-air, flattening out face-up as it lands
        s.group.rotation.z = s.baseTiltZ + (landRotZ - s.baseTiltZ) * k + Math.sin(flyT * 19) * 0.5 * (1 - k);
        s.group.rotation.x = s.baseTiltX * (1 - k);
        s.group.rotation.y = s.homeSpin + (landRotY - s.homeSpin) * k;
        if (k >= 1) {
          flyT = -1;
          bounceT = 0;
          labelT = 0;
          s.group.rotation.set(0, landRotY, landRotZ);
          s.group.position.y = FLOOR_Y;
        }
      } else if (s === chosen && bounceT >= 0) {
        // one soft bounce, then the number tag pops above the fallen stick
        bounceT += dt;
        const b = Math.min(1, bounceT / 0.14);
        s.group.position.y = FLOOR_Y + Math.sin(b * Math.PI) * 0.05;
        labelT += dt;
        const p = Math.min(1, labelT / 0.3);
        const back = 1 + 2.2 * Math.pow(p - 1, 3) + 1.2 * Math.pow(p - 1, 2); // easeOutBack-ish
        const sc = Math.max(0.001, p) * back;
        s.label.scale.set(1.95 * sc, 0.65 * sc, 1);
      } else {
        s.group.rotation.z = s.baseTiltZ + sway + (Math.random() - 0.5) * 0.3 * amp;
        s.group.rotation.x = s.baseTiltX + (Math.random() - 0.5) * 0.24 * amp;
      }
    }

    if (settleT >= 0 && returning) {
      settleT += dt;
      const k = Math.min(1, settleT / 0.32);
      const r = returning.s;
      // the fallen stick leaps in an arc back into the bundle while the
      // next shake is already starting
      r.group.position.x = r.fromX + (r.homeX - r.fromX) * k;
      r.group.position.z = r.fromZ + (r.homeZ - r.fromZ) * k;
      r.group.position.y = r.fromY + (BASE_Y - r.fromY) * k + Math.sin(k * Math.PI) * 1.1;
      r.group.rotation.x = r.fromRX + (r.baseTiltX - r.fromRX) * k;
      r.group.rotation.y = r.fromRY + (r.homeSpin - r.fromRY) * k;
      r.group.rotation.z = r.fromRZ + (r.baseTiltZ - r.fromRZ) * k;
      const ls = Math.max(0, 1 - settleT / 0.12); // tag fades fast
      r.label.scale.set(1.95 * ls, 0.65 * ls, 1);
      if (k >= 1) {
        r.group.position.set(r.homeX, BASE_Y, r.homeZ);
        r.group.rotation.set(r.baseTiltX, r.homeSpin, r.baseTiltZ);
        r.tip.color.set(STICK_RED);
        r.tip.emissive.set(0x000000);
        r.tip.emissiveIntensity = 0;
        r.label.scale.set(0, 0, 1);
        returning = null;
        settleT = -1;
      }
    }

    // drag release: ease the pivot back home (plaque forward) along the
    // shortest angular path
    if (!dragging && (pivot.rotation.y !== 0 || pivot.rotation.x !== 0)) {
      let y = pivot.rotation.y % (Math.PI * 2);
      if (y > Math.PI) y -= Math.PI * 2;
      if (y < -Math.PI) y += Math.PI * 2;
      pivot.rotation.y = y * 0.86;
      pivot.rotation.x *= 0.86;
    }

    renderer.render(scene, camera);
  };
  renderer.setAnimationLoop(renderLoop);
  // the homepage runs TWO of these canvases on one page — pause the loop
  // while a jar is scrolled out of view, resume (same loop) on return
  new IntersectionObserver(
    ([entry]) => renderer.setAnimationLoop(entry?.isIntersecting ? renderLoop : null),
    { rootMargin: '120px' },
  ).observe(host);

  return api;
}
