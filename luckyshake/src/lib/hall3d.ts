import * as THREE from 'three';
import { buildJar, type Jar3D } from './jar3d';

/**
 * 实景法堂（M1 原型，hall 页专用——尚未接进任何现有页面）。
 *
 * 三段镜头动线：石阶仰望发光的山门 → 穿过山门走近门洞 → 进堂停在供桌
 * 签筒前。全程程序化资产（canvas 贴图 + 几何体），零外部模型——"实景感"
 * 来自 indigo 雾 + 暖光门洞 + 光柱尘埃 + 柳叶粒子，对应 Sansa 拆解里
 * "照片环境光做 IBL"的低保真替代，等 M3 资产升级再换真环境图。
 *
 * 签筒是 jar3d.buildJar() 的同一个 rig：摇签/掉签/标签牌动画与工具页
 * 完全一致，只是相机和灯光换了。WebGL 起不来时 createHall 返回 null，
 * 页面退回静态海报 + 常规工具页链接（与 Jar3d 同一渐进增强约定）。
 */

export interface Hall3D {
  /** 签筒交互 api（与工具页的 Jar3D 同一对象形状） */
  jar: Jar3D;
  /** 行进未完时点击画面 → 直接落到最终机位 */
  skipToAltar(): void;
  /** 停在动线第 N 秒的机位（?snap 评审钩子用，不影响粒子） */
  seek(seconds: number): void;
  /** 摇签推近：镜头从院中望门滑到供桌特写（签动画可读） */
  focusAltar(): void;
  /** 结果看完后滑回院中望门 */
  unfocusAltar(): void;
  /** 炉香同步：burning 各支的燃耗比（0 新点 → 1 烧尽），空数组=无香 */
  setIncense(ratios: number[]): void;
  /** 到达供桌机位时回调一次（UI 亮出 CTA） */
  onArrive: (() => void) | null;
  dispose(): void;
}

/** 供桌世界坐标：签筒 pivot 挂点。👤 11/16 "签筒太大"：整体缩到 0.7——
 *  真签筒对供桌的比例就该小巧；pivot.y 补偿缩放后的影子高度（-0.82×scale） */
const JAR_SCALE = 0.7;
const ALTAR = new THREE.Vector3(0, 1.02 + 0.82 * JAR_SCALE, -6.15);

/** 镜头锚点：pos + lookAt + 该段时长（秒）——最后一段 t=0 即终点机位。
 *  👤 11/16 二轮反馈"场景太小/不像寺庙"：终局机位改为**院中望门**——
 *  站在院子穿过门洞看进法堂（门框+红毯+供桌+挂轴分层），寺庙语义最强；
 *  摇签时 focusAltar() 推近到供桌特写。quick=工具页压缩段时（~3s），位置同 */
function buildShots(quick: boolean) {
  const S = (p: [number, number, number], l: [number, number, number], t: number) => ({
    p: new THREE.Vector3(p[0], p[1], p[2]),
    l: new THREE.Vector3(l[0], l[1], l[2]),
    t,
  });
  const k = quick ? 0.42 : 1;
  return [
    S([3.2, 0.7, 15.2], [0, 1.55, 5.2], 2.6 * k),
    S([0, 1.35, 8.6], [0, 1.8, -2.0], 2.0 * k),
    S([0, 1.5, 3.2], [0, 1.7, -5.5], 2.2 * k),
    S([0, 1.5, 1.15], [0, 1.7, -5.5], 0),
  ];
}

/** 摇签推近机位（供桌特写，签与签号牌可读） */
const ALTAR_CAM_P = new THREE.Vector3(0, 1.62, -2.4);
const ALTAR_CAM_L = new THREE.Vector3(0, 1.9, -5.2);

export interface HallOpts {
  /** quick：压缩行进段时（工具页 hero 用，~3s 到位）；默认全页 7s */
  quick?: boolean;
  /** 匾额文字：英文页传英文匾；缺省中文（山门"柳寺"、大殿"有求必应"） */
  plaques?: { gate: string; hall: string };
}

const smooth = (k: number) => k * k * (3 - 2 * k);

/**
 * 歇山顶简化版：三层叠涩瓦面 + 红檐板 + 正脊金宝顶 + 四角翘檐——
 * 程序化几何里最接近中式殿顶的配方。调用方把返回的 Group 摆到檐口高度。
 */
function buildRoof(w: number, d: number): THREE.Group {
  const tile = new THREE.MeshStandardMaterial({ color: 0x39434e, roughness: 0.85 });
  const eave = new THREE.MeshStandardMaterial({ color: 0x8a2c1e, roughness: 0.7 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xd4a017, metalness: 0.55, roughness: 0.35 });
  const g = new THREE.Group();
  const layers: Array<[number, number, number]> = [
    [w, d, 0],
    [w * 0.85, d * 0.78, 0.52],
    [w * 0.68, d * 0.58, 1.04],
  ];
  for (const [lw, ld, dy] of layers) {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(lw, 0.2, ld), tile);
    slab.position.y = dy;
    g.add(slab);
  }
  const board = new THREE.Mesh(new THREE.BoxGeometry(w * 1.03, 0.14, d * 1.05), eave);
  board.position.y = -0.16;
  g.add(board);
  const ridge = new THREE.Mesh(new THREE.BoxGeometry(w * 0.7, 0.24, 0.48), tile);
  ridge.position.y = 1.42;
  g.add(ridge);
  for (const s of [-1, 1]) {
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 10), gold);
    knob.position.set(s * w * 0.34, 1.56, 0);
    g.add(knob);
    for (const f of [-1, 1]) {
      const tip = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.08, d * 0.24), tile);
      tip.position.set(s * (w / 2 - 0.05), 0.16, f * (d / 2 - 0.28));
      tip.rotation.z = -s * 0.34;
      g.add(tip);
    }
  }
  return g;
}

/** 红棂窗贴图：朱底金棂，夜里自发光像殿内透出的暖光 */
function makeLatticeTexture(): THREE.CanvasTexture {
  const w = 128;
  const h = 192;
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);
  ctx.fillStyle = '#8a2c1e';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#d4a017';
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = 4;
  for (const x of [32, 64, 96]) {
    ctx.beginPath();
    ctx.moveTo(x, 8);
    ctx.lineTo(x, h - 8);
    ctx.stroke();
  }
  for (const y of [38, 76, 114, 152]) {
    ctx.beginPath();
    ctx.moveTo(8, y);
    ctx.lineTo(w - 8, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.strokeStyle = '#5a1a12';
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, w, h);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** 匾额金漆字：漆木底 + 双金边 + 金字。CJK 逐字等距；拉丁文整串排、
 *  量宽自动缩字号（英文页匾额用） */
function makePlaqueTexture(text: string, fontPx: number): THREE.CanvasTexture {
  const w = 512;
  const h = 224;
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);
  ctx.fillStyle = '#241611';
  ctx.fillRect(0, 0, w, h);
  const sheen = ctx.createLinearGradient(0, 0, 0, h);
  sheen.addColorStop(0, 'rgba(255, 214, 150, 0.10)');
  sheen.addColorStop(0.5, 'rgba(255, 214, 150, 0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#d4a017';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, w - 16, h - 16);
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, w - 40, h - 40);
  ctx.fillStyle = '#f4c542';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const latin = /[A-Za-z]/.test(text);
  if (latin) {
    let size = fontPx;
    for (; size > 16; size -= 2) {
      ctx.font = `700 ${size}px Georgia, "Times New Roman", serif`;
      if (ctx.measureText(text).width <= w - 80) break;
    }
    ctx.fillText(text, w / 2, h / 2 + 4);
  } else {
    ctx.font = `700 ${fontPx}px "Noto Serif SC", "Songti SC", "SimSun", serif`;
    const step = (w - 80) / text.length;
    [...text].forEach((ch, i) => {
      ctx.fillText(ch, 40 + step * (i + 0.5), h / 2 + 4);
    });
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** 青烟团贴图（柔边圆斑，精灵化升腾淡出） */
function makeSmokeTexture(): THREE.CanvasTexture {
  const s = 64;
  const cv = document.createElement('canvas');
  cv.width = s;
  cv.height = s;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);
  const g = ctx.createRadialGradient(s / 2, s / 2, 3, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(205, 198, 188, 0.9)');
  g.addColorStop(0.5, 'rgba(200, 192, 180, 0.4)');
  g.addColorStop(1, 'rgba(195, 188, 175, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(cv);
}

// ---- procedural textures (canvas, no external assets) ----------------

function makeStoneTexture(): THREE.CanvasTexture {
  const s = 256;
  const cv = document.createElement('canvas');
  cv.width = s;
  cv.height = s;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);
  ctx.fillStyle = '#9c9083';
  ctx.fillRect(0, 0, s, s);
  // 2×2 stone slabs with grout lines + speckle
  for (let gy = 0; gy < 2; gy++) {
    for (let gx = 0; gx < 2; gx++) {
      const x = gx * (s / 2);
      const y = gy * (s / 2);
      const v = 150 + Math.random() * 26;
      ctx.fillStyle = `rgb(${v}, ${v - 12}, ${v - 26})`;
      ctx.fillRect(x + 3, y + 3, s / 2 - 6, s / 2 - 6);
    }
  }
  for (let i = 0; i < 420; i++) {
    ctx.fillStyle = `rgba(60, 52, 46, ${Math.random() * 0.16})`;
    ctx.fillRect(Math.random() * s, Math.random() * s, 2, 2);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/** 挂轴：纸底渐变 + 远山淡墨 + 金边——写意即可，远景里它只是氛围 */
function makeScrollTexture(): THREE.CanvasTexture {
  const w = 256;
  const h = 512;
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);
  const paper = ctx.createLinearGradient(0, 0, 0, h);
  paper.addColorStop(0, '#e9d9ab');
  paper.addColorStop(1, '#c6b184');
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, w, h);
  // distant ink-wash hills
  for (const [cy, amp, a] of [
    [330, 70, 0.16],
    [390, 90, 0.12],
    [300, 50, 0.1],
  ] as Array<[number, number, number]>) {
    ctx.fillStyle = `rgba(74, 66, 96, ${a})`;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    for (let x = 0; x <= w; x += 16) {
      ctx.lineTo(x, cy - Math.abs(Math.sin(x * 0.045)) * amp);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();
  }
  // a willow sprig — the brand motif, hand-wavy
  ctx.strokeStyle = 'rgba(96, 118, 74, 0.5)';
  ctx.lineWidth = 3;
  for (const [x0, hang] of [
    [86, 120],
    [140, 150],
    [185, 95],
  ] as Array<[number, number]>) {
    ctx.beginPath();
    ctx.moveTo(x0, 40);
    ctx.quadraticCurveTo(x0 + 16, 40 + hang * 0.6, x0 - 6, 40 + hang);
    ctx.stroke();
  }
  ctx.strokeStyle = '#a8842e';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, w - 6, h - 6);
  // top/bottom rods
  ctx.fillStyle = '#2c2018';
  ctx.fillRect(0, 0, w, 14);
  ctx.fillRect(0, h - 14, w, 14);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** 光柱用竖向渐变 alpha 贴图（加色混合的假体积光） */
function makeShaftTexture(): THREE.CanvasTexture {
  const w = 64;
  const h = 256;
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, 'rgba(255, 214, 150, 0.9)');
  g.addColorStop(0.7, 'rgba(255, 200, 130, 0.25)');
  g.addColorStop(1, 'rgba(255, 190, 120, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // 横向柔边
  const edge = ctx.createLinearGradient(0, 0, w, 0);
  edge.addColorStop(0, 'rgba(0,0,0,1)');
  edge.addColorStop(0.25, 'rgba(0,0,0,0)');
  edge.addColorStop(0.75, 'rgba(0,0,0,0)');
  edge.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = edge;
  ctx.fillRect(0, 0, w, h);
  return new THREE.CanvasTexture(cv);
}

/** 尘埃圆点贴图——Points 默认方块太"像素"，柔圆点才像空气里的浮尘 */
function makeDustTexture(): THREE.CanvasTexture {
  const s = 64;
  const cv = document.createElement('canvas');
  cv.width = s;
  cv.height = s;
  const ctx = cv.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(cv);
  const g = ctx.createRadialGradient(s / 2, s / 2, 2, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255, 240, 210, 1)');
  g.addColorStop(0.4, 'rgba(255, 230, 190, 0.5)');
  g.addColorStop(1, 'rgba(255, 220, 170, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(cv);
}

export function createHall(host: HTMLElement, opts?: HallOpts): Hall3D | null {
  const SHOTS = buildShots(opts?.quick === true);
  const TOTAL = SHOTS.slice(0, -1).reduce((s, sh) => s + sh.t, 0);
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true });
  } catch {
    return null;
  }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = window.matchMedia('(max-width: 640px)').matches;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x241f3d);
  scene.fog = new THREE.FogExp2(0x241f3d, 0.055);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);

  // ---- lights ----------------------------------------------------------
  // 夜山寺：indigo 天光做底，门洞暖光是主角，烛/灯做点缀
  scene.add(new THREE.HemisphereLight(0x8a7aa8, 0x2a2030, 0.5));
  const moon = new THREE.DirectionalLight(0x8890c0, 0.6);
  moon.position.set(-6, 9, 6);
  scene.add(moon);
  const doorway = new THREE.PointLight(0xffb060, 30, 16, 2);
  doorway.position.set(0, 2.0, -1.4);
  scene.add(doorway);
  const hearth = new THREE.PointLight(0xffc078, 10, 9, 2);
  hearth.position.set(0, 2.6, -5.4);
  scene.add(hearth);

  // ---- ground & steps --------------------------------------------------
  const stone = makeStoneTexture();
  stone.repeat.set(8, 8);
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.MeshStandardMaterial({ map: stone, roughness: 0.95 }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const stepMat = new THREE.MeshStandardMaterial({ color: 0x857a6c, roughness: 0.9 });
  const STEPS = 10;
  for (let i = 0; i < STEPS; i++) {
    const z = 7.4 + i * 0.62;
    // 门侧最高、起步侧最低——此前坡度方向反了，门前是一片凹陷
    const step = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.12, 0.66), stepMat);
    step.position.set((Math.random() - 0.5) * 0.1, 0.06 - 0.12 * i, z);
    scene.add(step);
  }
  // 石灯笼 ×2（台阶中段的暖光池，夜里照亮登山步）
  const stoneLantern = (x: number, z: number, y: number) => {
    const g = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.24, 0.5), stepMat);
    base.position.y = 0.12;
    g.add(base);
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.7, 8), stepMat);
    col.position.y = 0.58;
    g.add(col);
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.36, 0.42), stepMat);
    box.position.y = 1.1;
    g.add(box);
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xffd9a0,
        emissive: 0xffb45e,
        emissiveIntensity: 1.8,
      }),
    );
    glow.position.y = 1.1;
    g.add(glow);
    const sl = new THREE.PointLight(0xffb45e, 2.5, 5.5, 2);
    sl.position.y = 1.15;
    g.add(sl);
    g.position.set(x, y, z);
    scene.add(g);
  };
  stoneLantern(-2.5, 10.8, -0.56);
  stoneLantern(2.5, 9.4, -0.34);

  // ---- 山门（牌坊式）+ 灯笼 ---------------------------------------------
  const wood = new THREE.MeshStandardMaterial({ color: 0x4a3826, roughness: 0.82 });
  const gateRed = new THREE.MeshStandardMaterial({ color: 0x7c3324, roughness: 0.7 });
  const gate = new THREE.Group();
  for (const x of [-2.2, 2.2]) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.4, 0.42), gateRed);
    pillar.position.set(x, 1.7, 0);
    gate.add(pillar);
    // 石鼓柱础
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.7), stepMat);
    base.position.set(x, 0.25, 0);
    gate.add(base);
  }
  const beam = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.38, 0.55), wood);
  beam.position.y = 3.5;
  gate.add(beam);
  const beam2 = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.3, 0.5), wood);
  beam2.position.y = 3.05;
  gate.add(beam2);
  // 门殿也上叠檐顶（和后面大殿同一配方）——山门的"殿"形
  const gateRoof = buildRoof(6.2, 1.7);
  gateRoof.position.y = 3.82;
  gate.add(gateRoof);
  const plaqueTrim = new THREE.Mesh(
    new THREE.BoxGeometry(1.06, 0.56, 0.06),
    new THREE.MeshStandardMaterial({ color: 0xa8842e, roughness: 0.4, metalness: 0.4 }),
  );
  plaqueTrim.position.set(0, 3.5, 0.3);
  gate.add(plaqueTrim);
  // 山门匾：题字可按页面语言传（英文页挂英文匾）
  const gatePlaqueTex = makePlaqueTexture(opts?.plaques?.gate ?? '柳寺', 150);
  const gatePlaqueMats = [
    wood,
    wood,
    wood,
    wood,
    new THREE.MeshStandardMaterial({ map: gatePlaqueTex, roughness: 0.6 }),
    wood,
  ];
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.48, 0.1), gatePlaqueMats);
  plaque.position.set(0, 3.5, 0.36);
  gate.add(plaque);
  const lanternMat = new THREE.MeshStandardMaterial({
    color: 0xffa14e,
    emissive: 0xff8a30,
    emissiveIntensity: 1.6,
  });
  for (const x of [-2.2, 2.2]) {
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), lanternMat);
    lamp.position.set(x, 2.62, 0.26);
    gate.add(lamp);
    const gl = new THREE.PointLight(0xff9a3c, 4, 7, 2);
    gl.position.copy(lamp.position);
    gate.add(gl);
  }
  gate.position.z = 5.5;
  scene.add(gate);

  // ---- 法堂：外墙（留真门洞）+ 侧墙 + 供桌 + 挂轴 + 烛台 ---------------
  const WALL_H = 5;
  const doorW = 3.2;
  const frontZ = -2;
  // 前墙用寺墙泥色（灰黄）：门洞的"洞"要靠墙与洞的明暗对比才读得出
  const plaster = new THREE.MeshStandardMaterial({ color: 0xb59f78, roughness: 0.95 });
  const mkWall = (w: number, h: number, x: number, y: number, z: number, mat = wood) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.3), mat);
    m.position.set(x, y, z);
    scene.add(m);
  };
  const sideW = (10 - doorW) / 2; // 门洞两侧墙段
  mkWall(sideW, WALL_H, -(doorW / 2 + sideW / 2), WALL_H / 2, frontZ, plaster);
  mkWall(sideW, WALL_H, doorW / 2 + sideW / 2, WALL_H / 2, frontZ, plaster);
  mkWall(doorW, WALL_H - 3, 0, 3 + (WALL_H - 3) / 2, frontZ, plaster); // 门楣
  // 红门楣梁 + 石门槛——把门洞框成"门"
  const lintel = new THREE.Mesh(new THREE.BoxGeometry(doorW + 0.5, 0.32, 0.4), gateRed);
  lintel.position.set(0, 3.02, frontZ + 0.05);
  scene.add(lintel);
  const sill = new THREE.Mesh(new THREE.BoxGeometry(doorW + 0.4, 0.16, 0.55), stepMat);
  sill.position.set(0, 0.08, frontZ + 0.1);
  scene.add(sill);
  // 门廊：一对红柱 + 檐板翘角（"寺门脸"）
  for (const x of [-1.95, 1.95]) {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.28, 3.1, 0.28), gateRed);
    col.position.set(x, 1.55, -1.55);
    scene.add(col);
  }
  const porchRoof = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.16, 0.9), wood);
  porchRoof.position.set(0, 3.28, -1.55);
  scene.add(porchRoof);
  for (const s of [-1, 1]) {
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.07, 0.85), wood);
    tip.position.set(s * 2.42, 3.36, -1.55);
    tip.rotation.z = -s * 0.3;
    scene.add(tip);
  }
  // 门廊红灯笼 ×2（自发光不加点光——院中望门取景的门框信号灯）
  for (const x of [-1.95, 1.95]) {
    const lamp = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 12, 12),
      new THREE.MeshStandardMaterial({
        color: 0xc2402e,
        emissive: 0xff6a28,
        emissiveIntensity: 1.5,
        roughness: 0.6,
      }),
    );
    lamp.position.set(x, 2.45, -1.25);
    scene.add(lamp);
  }
  // 大殿立面：外圈红柱 + 红棂窗 ×2 + 金边大匾——殿的"脸"
  const latticeTex = makeLatticeTexture();
  for (const x of [-3.7, 3.7]) {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.34, 4.4, 0.34), gateRed);
    col.position.set(x, 2.2, frontZ + 0.24);
    scene.add(col);
    const cbase = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.5, 0.56), stepMat);
    cbase.position.set(x, 0.25, frontZ + 0.24);
    scene.add(cbase);
  }
  const latticeMat = new THREE.MeshStandardMaterial({
    map: latticeTex,
    emissive: 0xff9a40,
    emissiveMap: latticeTex,
    emissiveIntensity: 0.24,
    roughness: 0.8,
  });
  for (const x of [-2.62, 2.62]) {
    const win = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.7), latticeMat);
    win.position.set(x, 2.05, frontZ + 0.17);
    scene.add(win);
  }
  const bigPlaqueTrim = new THREE.Mesh(
    new THREE.BoxGeometry(1.95, 0.88, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xa8842e, roughness: 0.4, metalness: 0.4 }),
  );
  bigPlaqueTrim.position.set(0, 3.62, frontZ + 0.2);
  scene.add(bigPlaqueTrim);
  // 大殿匾：题字随页面语言
  const bigPlaqueTex = makePlaqueTexture(opts?.plaques?.hall ?? '有求必应', 100);
  const bigPlaqueMats = [
    wood,
    wood,
    wood,
    wood,
    new THREE.MeshStandardMaterial({ map: bigPlaqueTex, roughness: 0.6 }),
    wood,
  ];
  const bigPlaque = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.74, 0.12), bigPlaqueMats);
  bigPlaque.position.set(0, 3.62, frontZ + 0.27);
  scene.add(bigPlaque);
  // 大殿叠檐顶（殿高的上限，山门方向一抬头就能看到）
  const hallRoof = buildRoof(10.8, 5.6);
  hallRoof.position.set(0, 5.05, -5.5);
  scene.add(hallRoof);
  // 侧墙（堂内）+ 后墙
  for (const x of [-4.8, 4.8]) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.3, WALL_H, 7), wood);
    m.position.set(x, WALL_H / 2, -5.5);
    scene.add(m);
  }
  mkWall(10, WALL_H, 0, WALL_H / 2, -8.9);
  // 内部屋顶压暗（一块大顶板，防止天光穿帮）
  const ceil = new THREE.Mesh(new THREE.BoxGeometry(10, 0.3, 7), wood);
  ceil.position.set(0, WALL_H + 0.15, -5.5);
  scene.add(ceil);

  // 供案（加深到 1.5：签筒缩到 0.7 后掉签抛距也缩，落点仍在案上）
  const tableTop = 1.02;
  const table = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 1.5), wood);
  table.position.set(0, tableTop - 0.06, -5.9);
  scene.add(table);
  for (const [lx, lz] of [
    [-1.05, -6.5],
    [1.05, -6.5],
    [-1.05, -5.3],
    [1.05, -5.3],
  ] as Array<[number, number]>) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, tableTop - 0.12, 0.16), wood);
    leg.position.set(lx, (tableTop - 0.12) / 2, lz);
    scene.add(leg);
  }
  // 红毯——从供案一直铺出山门（院中望门取景里它是纵深的引导线）
  const carpet = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.02, 6.2),
    new THREE.MeshStandardMaterial({ color: 0x7a2c22, roughness: 0.95 }),
  );
  carpet.position.set(0, 0.01, -2.3);
  scene.add(carpet);
  // 院墙 ×2 + 瓦墙帽——把院子围成"寺院"，不再是空地
  for (const s of [-1, 1]) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.5, 9.2), plaster);
    wall.position.set(s * 5.4, 1.25, 2.5);
    scene.add(wall);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.14, 9.4), wood);
    cap.position.set(s * 5.4, 2.56, 2.5);
    scene.add(cap);
    const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 9.4, 10), wood);
    roll.rotation.x = Math.PI / 2;
    roll.position.set(s * 5.4, 2.68, 2.5);
    scene.add(roll);
    // 山门两翼墙（门殿连着院墙，寺院平面才成立）
    const wing = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.5, 0.35), plaster);
    wing.position.set(s * 3.8, 1.25, 5.5);
    scene.add(wing);
    const wcap = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.14, 0.52), wood);
    wcap.position.set(s * 3.8, 2.56, 5.5);
    scene.add(wcap);
    const wroll = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.4, 10), wood);
    wroll.rotation.z = Math.PI / 2;
    wroll.position.set(s * 3.8, 2.68, 5.5);
    scene.add(wroll);
  }

  // 挂轴（后墙，签筒正后方）
  const scroll = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 3.6),
    new THREE.MeshStandardMaterial({ map: makeScrollTexture(), roughness: 0.9 }),
  );
  scroll.position.set(0, 2.55, -8.7);
  scene.add(scroll);

  // 烛台 ×2（缩到 0.5 高，-cluster 在签筒两侧，不抢个头）
  for (const x of [-0.8, 0.8]) {
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 0.5, 8), wood);
    stand.position.set(x, tableTop + 0.25, -5.55);
    scene.add(stand);
    const flame = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xffd9a0,
        emissive: 0xffb45e,
        emissiveIntensity: 2.2,
      }),
    );
    flame.position.set(x, tableTop + 0.54, -5.55);
    scene.add(flame);
    const pl = new THREE.PointLight(0xffb45e, 2.5, 5, 2);
    pl.position.copy(flame.position);
    scene.add(pl);
  }
  // 堂内一对挂灯笼（暖光填中景）
  for (const x of [-1.7, 1.7]) {
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.9, 6), wood);
    cord.position.set(x, WALL_H - 0.35, -5.6);
    scene.add(cord);
    const lamp = new THREE.Mesh(
      new THREE.SphereGeometry(0.17, 12, 12),
      new THREE.MeshStandardMaterial({
        color: 0xc2402e,
        emissive: 0xff7a30,
        emissiveIntensity: 1.1,
        roughness: 0.6,
      }),
    );
    lamp.position.set(x, WALL_H - 0.9, -5.6);
    scene.add(lamp);
    const ll = new THREE.PointLight(0xff8a40, 3.5, 6.5, 2);
    ll.position.set(x, WALL_H - 0.9, -5.4);
    scene.add(ll);
  }

  // ---- 青铜三足香炉（程序化）：鼓腹双耳三足 + 炉口香灰，落在供案前左 ----
  const bronze = new THREE.MeshStandardMaterial({ color: 0x6a5a3a, metalness: 0.72, roughness: 0.42 });
  const censer = new THREE.Group();
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 18), bronze);
  belly.scale.set(1, 0.66, 1);
  belly.position.y = 0.2;
  censer.add(belly);
  const mouthC = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.24, 0.1, 20), bronze);
  mouthC.position.y = 0.4;
  censer.add(mouthC);
  const rimC = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.024, 10, 24), bronze);
  rimC.rotation.x = Math.PI / 2;
  rimC.position.y = 0.45;
  censer.add(rimC);
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.018, 8, 20, Math.PI), bronze);
    ear.position.set(s * 0.27, 0.46, 0);
    censer.add(ear);
  }
  for (const i of [0, 1, 2]) {
    const a = (i / 3) * Math.PI * 2 + 0.5;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.046, 0.2, 10), bronze);
    leg.position.set(Math.cos(a) * 0.18, 0.02, Math.sin(a) * 0.18);
    leg.rotation.set(Math.sin(a) * 0.25, 0, -Math.cos(a) * 0.25);
    censer.add(leg);
  }
  const ashBed = new THREE.Mesh(
    new THREE.CircleGeometry(0.165, 20),
    new THREE.MeshStandardMaterial({ color: 0x8d867c, roughness: 1 }),
  );
  ashBed.rotation.x = -Math.PI / 2;
  ashBed.position.y = 0.425;
  censer.add(ashBed);
  censer.position.set(-0.62, tableTop, -5.42);
  scene.add(censer);

  // 三支香：敬入后立进炉灰，随燃耗比变短；燃点自亮
  const incenseSticks = [0, 1, 2].map((i) => {
    const grp = new THREE.Group();
    const rod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.008, 0.34, 6),
      new THREE.MeshStandardMaterial({ color: 0x7a2a1a, roughness: 0.6 }),
    );
    rod.position.y = 0.17;
    grp.add(rod);
    const tip = new THREE.Mesh(
      new THREE.SphereGeometry(0.016, 8, 8),
      new THREE.MeshStandardMaterial({
        color: 0xe03a10,
        emissive: 0xff5a20,
        emissiveIntensity: 1.4,
      }),
    );
    tip.position.y = 0.34;
    grp.add(tip);
    grp.position.set((i - 1) * 0.055, 0.43, 0);
    grp.rotation.z = (i - 1) * 0.09;
    grp.visible = false;
    censer.add(grp);
    return { grp, rod, tip };
  });

  // 青烟 ×4：柔烟团从炉口升起、摇曳淡出（敬香后可见）
  const smokeMatBase = new THREE.SpriteMaterial({
    map: makeSmokeTexture(),
    transparent: true,
    depthWrite: false,
  });
  const smokes = [0, 1, 2, 3].map((i) => {
    const sp = new THREE.Sprite(smokeMatBase.clone());
    sp.material.opacity = 0;
    sp.scale.set(0.24, 0.32, 1);
    sp.position.set(-0.62, tableTop + 0.55, -5.42);
    scene.add(sp);
    return { sp, ph: (i / 4) * Math.PI * 2 };
  });
  let smokeOn = false;
  let smokeClock = 0;

  // ---- 假体积光 + 尘埃 ---------------------------------------------------
  const shaft = new THREE.Mesh(
    new THREE.PlaneGeometry(3.0, 5.2),
    new THREE.MeshBasicMaterial({
      map: makeShaftTexture(),
      transparent: true,
      opacity: small ? 0.1 : 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  shaft.position.set(-1.4, 2.9, -3.6);
  shaft.rotation.set(0.32, 0.42, 0);
  scene.add(shaft);

  const dustN = small ? 90 : 180;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) {
    dustPos[i * 3] = -2.2 + Math.random() * 2.8;
    dustPos[i * 3 + 1] = 0.8 + Math.random() * 3.4;
    dustPos[i * 3 + 2] = -7 + Math.random() * 4.5;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: 0xffd9a0,
      size: 0.05,
      map: makeDustTexture(),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  scene.add(dust);

  // ---- 柳叶粒子（品牌呼应；院区缓落 + 摇摆）-----------------------------
  const leafN = small ? 16 : 34;
  const leafGeo = new THREE.PlaneGeometry(0.085, 0.12);
  const leaves: Array<{ m: THREE.Mesh; vy: number; ph: number }> = [];
  for (let i = 0; i < leafN; i++) {
    // Basic 自色：夜里 Standard 会被弱光吃成黑纸屑，低饱和自色才像柳叶
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x6f8f52).multiplyScalar(0.75 + Math.random() * 0.3),
      side: THREE.DoubleSide,
    });
    const m = new THREE.Mesh(leafGeo, mat);
    m.position.set(-4.5 + Math.random() * 9, 0.5 + Math.random() * 4, -1 + Math.random() * 8);
    m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    scene.add(m);
    leaves.push({ m, vy: 0.14 + Math.random() * 0.22, ph: Math.random() * Math.PI * 2 });
  }

  // ---- 签筒：jar3d 同一 rig 挂上供桌 ------------------------------------
  const rig = buildJar(reduced);
  rig.pivot.position.copy(ALTAR);
  rig.pivot.scale.setScalar(JAR_SCALE);
  scene.add(rig.pivot);

  // ---- 相机动线 ----------------------------------------------------------
  const arrive = () => {
    if (hall.onArrive) {
      const cb = hall.onArrive;
      hall.onArrive = null;
      cb();
    }
  };
  let elapsed = 0;
  let arrived = false;
  /** 评审冻结：停住行进但保留粒子/签筒动画（?snap=steps|gate 截帧用） */
  let frozen = false;
  /** 摇签推近：0=院中望门 1=供桌特写，渲染循环里向 focusGoal 缓动 */
  let focusT = 0;
  let focusGoal = 0;
  let px = 0; // parallax -1..1
  let py = 0;
  const onPointer = (e: PointerEvent) => {
    px = (e.clientX / window.innerWidth) * 2 - 1;
    py = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  const camP = new THREE.Vector3();
  const camL = new THREE.Vector3();
  const setShot = (i: number, k: number) => {
    const a = SHOTS[i];
    const b = SHOTS[i + 1];
    const e = smooth(k);
    camP.lerpVectors(a.p, b.p, e);
    camL.lerpVectors(a.l, b.l, e);
  };

  const hall: Hall3D = {
    jar: rig.api,
    onArrive: null,
    skipToAltar() {
      if (arrived) return;
      elapsed = TOTAL;
    },
    /** 停在第 seconds 秒的机位（粒子与签筒继续动）；只供 ?snap 评审用 */
    seek(seconds: number) {
      elapsed = THREE.MathUtils.clamp(seconds, 0, TOTAL);
      frozen = true;
    },
    focusAltar() {
      focusGoal = 1;
    },
    unfocusAltar() {
      focusGoal = 0;
    },
    setIncense(ratios: number[]) {
      for (let i = 0; i < incenseSticks.length; i++) {
        const s = incenseSticks[i];
        const r = ratios[i];
        if (r === undefined) {
          s.grp.visible = false;
          continue;
        }
        s.grp.visible = true;
        const h = 0.07 + (1 - THREE.MathUtils.clamp(r, 0, 1)) * 0.27;
        s.rod.scale.y = h / 0.34;
        s.rod.position.y = h / 2;
        s.tip.position.y = h;
        s.tip.visible = r < 1;
      }
      smokeOn = ratios.length > 0 && ratios.some((r) => r < 1);
    },
    dispose() {
      renderer.setAnimationLoop(null);
      window.removeEventListener('pointermove', onPointer);
      ro.disconnect();
      rig.dispose();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.isMesh || (o as THREE.Points).isPoints) {
          mesh.geometry?.dispose();
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          for (const m of mats) {
            const mm = m as THREE.MeshStandardMaterial;
            mm.map?.dispose();
            mm.dispose();
          }
        }
      });
      renderer.dispose();
      canvas.remove();
    },
  };

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

  const renderLoop = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    if (!arrived) {
      if (reduced || frozen) {
        elapsed = frozen ? elapsed : TOTAL;
        if (!frozen) arrived = true;
      } else {
        elapsed += dt;
      }
      if (elapsed >= TOTAL && !frozen) {
        elapsed = TOTAL;
        arrived = true;
        arrive();
      }
    }
    // 每帧按当前 elapsed 解析机位（arrived 后即终点）；focus 再往供桌特写混
    let acc = 0;
    for (let i = 0; i < SHOTS.length - 1; i++) {
      const seg = SHOTS[i].t;
      if (elapsed <= acc + seg || i === SHOTS.length - 2) {
        setShot(i, THREE.MathUtils.clamp((elapsed - acc) / seg, 0, 1));
        break;
      }
      acc += seg;
    }
    focusT += (focusGoal - focusT) * Math.min(1, dt * 3.2);
    const fe = smooth(THREE.MathUtils.clamp(focusT, 0, 1));
    if (fe > 0.0005) {
      camP.lerp(ALTAR_CAM_P, fe);
      camL.lerp(ALTAR_CAM_L, fe);
    }
    // 视差：相机右向 × nx、上向 × -ny，量级克制（不抢行进主戏）
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
    const up = new THREE.Vector3(0, 1, 0);
    camP.addScaledVector(right, px * 0.22).addScaledVector(up, -py * 0.12);
    camera.position.copy(camP);
    camera.lookAt(camL);

    // 尘埃缓沉 + 横漂
    const dp = dust.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < dustN; i++) {
      let y = dp.getY(i) - dt * 0.05;
      if (y < 0.8) y = 4.2;
      dp.setY(i, y);
      dp.setX(i, dp.getX(i) + Math.sin(t * 0.5 + i) * dt * 0.02);
    }
    dp.needsUpdate = true;

    // 柳叶缓落 + 摇摆，落地回到高处
    for (const leaf of leaves) {
      leaf.m.position.y -= leaf.vy * dt;
      leaf.m.position.x += Math.sin(t * 0.8 + leaf.ph) * dt * 0.14;
      leaf.m.rotation.z += dt * 0.4;
      leaf.m.rotation.x += dt * 0.22;
      if (leaf.m.position.y < 0.06) {
        leaf.m.position.y = 3.6 + Math.random() * 1.2;
        leaf.m.position.x = -4.5 + Math.random() * 9;
      }
    }

    // 青烟：炉口升起、横漂、正弦淡入淡出（敬香后 smokeOn）
    if (smokeOn) smokeClock += dt;
    for (const s of smokes) {
      const cycle = 5.5;
      const k = ((smokeClock + s.ph) % cycle) / cycle;
      s.sp.position.y = tableTop + 0.55 + k * 0.9;
      s.sp.position.x = -0.62 + Math.sin((smokeClock + s.ph) * 1.2) * 0.06 * (0.3 + k);
      s.sp.material.opacity = smokeOn ? Math.sin(k * Math.PI) * 0.3 : 0;
    }

    rig.update(dt, t);
    renderer.render(scene, camera);
  };
  renderer.setAnimationLoop(renderLoop);
  // 工具页舞台盒会滚出视口——离屏时暂停循环，回到视口续上（同 jar3d 约定）
  new IntersectionObserver(
    ([entry]) => renderer.setAnimationLoop(entry?.isIntersecting ? renderLoop : null),
    { rootMargin: '80px' },
  ).observe(host);

  return hall;
}
