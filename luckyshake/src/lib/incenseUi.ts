/**
 * UI for the daily incense offering (see lib/incense.ts for the rules):
 * claim three sticks → light one (tap 1) → offer it into the censer (tap 2) →
 * it keeps burning there (30 min visual burn-down, ash stub for the rest of
 * the day). Sits LEFT of the draw jar on the fortune-stick page — a quiet
 * ritual before the shake (👤 2026-11-12).
 * Visuals are the user-supplied photos (public/img/xianglu.png censer,
 * xiang.png stick), background-cut locally with sharp into transparent
 * webp (img/incense/censer.webp + stick-one.webp) — the photo is the base
 * layer; everything that moves (embers, smoke, burn-down, stubs) is thin
 * SVG drawn on top of it (👤 2026-11-12 "用原图修改一下").
 * All copy lives in COPY below (en + zh review layer).
 */
import {
  loadIncense,
  saveIncense,
  claimIncense,
  lightStick,
  offerStick,
  burnRatio,
  INCENSE_PER_DAY,
  type IncenseState,
  type IncenseStick,
} from './incense';
import { todayLocal, loadRation, status } from './ration';

type Lang = 'en' | 'zh';

const COPY = {
  en: {
    // 👤 11/12 标题精简("上香 · 一日三支"→"上香")+居中;计数行"In the censer: 3/3"删显示
    kick: 'Incense',
    claim: 'Claim today’s three sticks',
    claimHint: 'Claim three sticks — light them, place them in the censer, then ask.',
    light: 'Light all three',
    offer: 'Offer all three',
    stepHint: 'Tap the bundle once to light all three; tap again to offer them into the censer.',
    watching: 'Incense burning — let it burn while you shake the jar.',
    nudge: 'The incense is almost ash — draw your stick now.',
    done: 'Burned down to ash — fresh sticks tomorrow.',
    censerAria: 'Brass incense censer',
    lightAria: 'Light all three sticks',
    offerAria: 'Offer all three sticks into the censer',
  },
  zh: {
    kick: '上香',
    claim: '领今日三支香',
    claimHint: '先领三支香——点燃、敬入炉中，再抽签问事。',
    light: '点香',
    offer: '上香',
    stepHint: '点一下，三支同燃；再点一下，同入香炉。',
    watching: '炉香正燃——静候片刻，心怀所问，再去抽签。',
    nudge: '香将燃尽——趁烟未散，快去抽一签。',
    done: '三香燃尽——明日香火再续。',
    censerAria: '铜香炉',
    lightAria: '一次点燃三支香',
    offerAria: '三支香同入香炉',
  },
} as const;

function lang(): Lang {
  return document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
}

/* ---- geometry shared by the scene and the holder buttons ---- */

/* censer photo geometry (public/img/incense/censer.webp, 483×493, top 150px
   is transparent headroom for the dynamic sticks; mouth measured at cut time) */
const CENSER_W = 483;
const CENSER_H = 493;
/* true visible cavity, measured on censer.webp pixels with a gray-black +
   low-saturation classifier (pure darkness twice pulled in the gold rim's
   own shadow: cy 228/ry 43 was the rim shadow band, not the cavity — that's
   how stick bases ended up on the front rim, 👤 2026-11-12 穿帮 report #2).
   Clean runs at slot columns: y 158..203; widest row y179: x 81..412;
   below the cavity (y 204..213) is the lit ash strip — don't include it. */
const MOUTH = { cx: 246, cy: 180, rx: 166, ry: 23 };
/* sticks are clipped to (sky above the rim) ∪ (cavity interior ellipse): the
   base ends ~9px above the cavity's visible bottom, i.e. inside the darkness
   (flat photo can't occlude — the clip is what hides the stick's flat end) */
const CLIP_RX = MOUTH.rx - 12;
// 👤 11/12 腔 clip 椭圆用满口径高度(ry-4→ry):香插到 cy+21 时底端仍在椭圆内可见
const CLIP_RY = MOUTH.ry;
// 👤 11/12 香底四连下移 +14→+21→+35:整体深插,整支香连带火苗烟下移 ~7px(显示);
// 超出椭圆底(cy+23)的根段被 clip 藏进灰里 = 深插效果,香顶 -45/火苗顶 -75 仍在 headroom(-110)内
const BASE_Y = MOUTH.cy + 35;

const STICK_SRC_H = 635; // stick-one.webp native height (native width 40)
const STICK_W_PER_H = 40 / STICK_SRC_H;
// 👤 11/12 香加长:显示尺寸 = STICK_MAX × (249/483) ≈ 0.516 倍,150 原值只显示 77px;
// 提到 260(显示 ~134px,约为炉体高的一半多,参照原照片香:炉=635:493 的比例感)
const STICK_MAX = 260;
// svg 顶部扩出的 headroom(viewBox 单位):香顶 y=-62、火苗顶 y=-94、烟顶 y=-100 都 > -110
const VB_TOP = -110;
const STUB_H = 30; // what remains once it burned down (the bamboo butt)

/** censer slots, filled in offer order: center first, then clustered splay */
const SLOTS = [
  { x: MOUTH.cx, tilt: 0 },
  { x: MOUTH.cx - 27, tilt: -3 },
  { x: MOUTH.cx + 27, tilt: 3 },
];

/** the real stick photo, clipped from the top as it burns down (rect keeps
    the bottom h px — the unburnt part; stub = the bamboo butt, no ember) */
function stickImage(h: number, clipId: string): string {
  const w = STICK_MAX * STICK_W_PER_H;
  return `<clipPath id="${clipId}"><rect x="-8" y="${-h}" width="16" height="${h}"/></clipPath>` +
    `<image href="/img/incense/stick-one.webp" x="${-w / 2}" y="${-STICK_MAX}" width="${w}" height="${STICK_MAX}" preserveAspectRatio="none" clip-path="url(#${clipId})"/>`;
}

/** 香火点:暗红燃点(香与火焰的交界) */
function ember(y: number): string {
  return `<circle cy="${-y}" r="2.6" fill="#e03a10"/><circle cy="${-y + 1}" r="1.1" fill="#ff7a45"/>`;
}

/** 火苗:红橙渐变泪滴 + 亮芯,摇曳动画(起止同位姿,5s 重渲染重启无感) */
function flame(y: number, s = 1): string {
  return `<g transform="translate(0 ${-y}) scale(${s})"><g class="inc-flame">
    <path d="M0 2 C -6 -4, -4.5 -13, 0 -24 C 4.5 -13, 6 -4, 0 2 Z" fill="url(#inc-flame-g)"/>
    <path d="M0 1.5 C -2.8 -2.5, -2.2 -7, 0 -12 C 2.2 -7, 2.8 -2.5, 0 1.5 Z" fill="#ffb03a" opacity="0.9"/>
  </g></g>`;
}

function wisps(y: number): string {
  return `<g class="inc-wisps" transform="translate(0 ${y})">
    <path class="inc-smoke" d="M0 0 C 5 -8 -5 -15 2 -24" fill="none" stroke="#b8ada0" stroke-width="2" stroke-linecap="round"/>
    <path class="inc-smoke s2" d="M1 0 C -4 -7 4 -13 -1 -20" fill="none" stroke="#b8ada0" stroke-width="1.6" stroke-linecap="round"/>
  </g>`;
}

/** a stick mid-burn (or its ash stub) planted in the ash at slot k */
function plantedStick(st: IncenseStick, k: number, now: Date): string {
  const slot = SLOTS[k % SLOTS.length];
  const ratio = burnRatio(st, now);
  const h = STUB_H + (1 - ratio) * (STICK_MAX - STUB_H);
  const inner =
    stickImage(h, `inc-burn-${k}`) +
    (ratio >= 1 ? '' : ember(h) + flame(h + 2, 1.25) + wisps(-h - 14));
  return `<g transform="translate(${slot.x} ${BASE_Y}) rotate(${slot.tilt})">${inner}</g>`;
}

/* ---- the censer: the user's photo as the base layer, dynamic sticks drawn
        on top (planted at the measured mouth anchor) ---- */

function censerSvg(state: IncenseState, now: Date): string {
  const burning = state.sticks.filter((s) => s.phase === 'burning');
  // 天空矩形必须从 VB_TOP 起(VB_TOP=0 时代 y=0 就是天空顶);扩 headroom 后 y=0 没跟着动,
  // 香顶(-59)/火苗(-94)/烟(-100)全落进裁剪区 → 敬入炉后无火(👤 11/12 "上香之后没火"报告)。
  // 底边仍到椭圆顶 +12,保证两口重叠无缝(同特异性 union,4px 接缝教训)
  const skyTop = VB_TOP;
  const skyH = MOUTH.cy - CLIP_RY + 12 - skyTop;
  return `<svg class="incense-censer-svg" viewBox="0 ${VB_TOP} ${CENSER_W} ${CENSER_H - VB_TOP}" role="img" aria-label="${COPY[lang()].censerAria}">
    <image href="/img/incense/censer.webp" x="0" y="0" width="${CENSER_W}" height="${CENSER_H}"/>
    <defs>
      <linearGradient id="inc-flame-g" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="#b3270c"/>
        <stop offset="0.55" stop-color="#e6430f"/>
        <stop offset="1" stop-color="#ff7429"/>
      </linearGradient>
      <clipPath id="inc-scene">
        <rect x="0" y="${skyTop}" width="${CENSER_W}" height="${skyH}"/>
        <ellipse cx="${MOUTH.cx}" cy="${MOUTH.cy}" rx="${CLIP_RX}" ry="${CLIP_RY}"/>
      </clipPath>
    </defs>
    <!-- burning sticks planted in the ash (scene-clipped so bases hide in the cavity) -->
    <g clip-path="url(#inc-scene)">${burning.map((s, i) => plantedStick(s, i, now)).join('')}</g>
  </svg>`;
}

/** the small stick shown in the holder before it enters the censer (the same photo stick) */
function holderStickSvg(phase: 'raw' | 'lit'): string {
  const H = 88, W = H * STICK_W_PER_H; // ~5.5; stick center = 6
  // viewBox 顶上抬 16 给火苗留头部(负 y 起,否则火焰顶端被视口裁掉只剩橙帽)
  // 火苗实色(独立 svg 不共享渐变 id),底红上橙
  const tip = phase === 'lit'
    ? `<g transform="translate(6 4) scale(0.55)"><g class="inc-flame">
        <path d="M0 2 C -6 -4, -4.5 -13, 0 -24 C 4.5 -13, 6 -4, 0 2 Z" fill="#e6430f"/>
        <path d="M0 1.5 C -2.8 -2.5, -2.2 -7, 0 -12 C 2.2 -7, 2.8 -2.5, 0 1.5 Z" fill="#ffb03a" opacity="0.9"/>
      </g></g>`
    : '';
  return `<svg viewBox="0 -16 12 ${H + 16}" width="12" height="${H + 16}" aria-hidden="true"><image href="/img/incense/stick-one.webp" x="${(12 - W) / 2}" y="0" width="${W}" height="${H}" preserveAspectRatio="none"/>${tip}</svg>`;
}

/* ---- mount ---- */

export function mountIncense(root: HTMLElement): void {
  const t = COPY[lang()];
  root.innerHTML = `
    <div class="incense-widget">
      <div class="ritual-head">${t.kick}</div>
      <div class="incense-scene" data-incense-scene></div>
      <div class="incense-holder" data-incense-holder></div>
      <div class="incense-actions" data-incense-actions>
        <button type="button" class="btn small ration-btn" data-incense-claim>${t.claim}</button>
      </div>
      <div class="incense-hint" data-incense-hint></div>
    </div>`;

  const scene = root.querySelector<HTMLElement>('[data-incense-scene]');
  const holder = root.querySelector<HTMLElement>('[data-incense-holder]');
  const actions = root.querySelector<HTMLElement>('[data-incense-actions]');
  const hint = root.querySelector<HTMLElement>('[data-incense-hint]');

  let lastSig = '';
  const render = (): void => {
    const now = new Date();
    const raw = loadIncense(now);
    const claimed = raw.day === todayLocal(now) && raw.sticks.length > 0;
    const burning = claimed ? raw.sticks.filter((s) => s.phase === 'burning') : [];
    const remaining = claimed ? raw.sticks.filter((s) => s.phase !== 'burning') : [];
    const allBurned = claimed && burning.length === INCENSE_PER_DAY && burning.every((s) => burnRatio(s, now) >= 1);

    // signature gate: only rebuild the scene/holder DOM when something visible
    // changed (phase, slot fill, or a burn-step) — the looping smoke/ember
    // animations keep running uninterrupted instead of restarting every tick
    const sig = claimed
      ? `${raw.day}:${raw.sticks.map((s) => s.phase + (s.phase === 'burning' ? Math.floor(burnRatio(s, now) * 20) : '')).join(',')}`
      : 'none';
    if (sig !== lastSig) {
      lastSig = sig;
      if (scene) scene.innerHTML = censerSvg(claimed ? raw : { day: '', sticks: [] }, now);
      if (holder && remaining.length > 0) {
        // 👤 11/12 三支整束操作:不逐支点——一击全燃,再一击全入炉(混态旧数据也各自推进一档)
        const anyLit = remaining.some((s) => s.phase === 'lit');
        const label = anyLit ? t.offer : t.light;
        const aria = anyLit ? t.offerAria : t.lightAria;
        holder.innerHTML = `<button type="button" class="incense-stick ${anyLit ? 'is-lit' : 'is-raw'}" data-incense-bundle title="${aria}" aria-label="${aria}"><span class="bundle-row">${remaining.map((s) => holderStickSvg(s.phase === 'lit' ? 'lit' : 'raw')).join('')}</span><span>${label}</span></button>`;
      } else if (holder) {
        holder.innerHTML = '';
      }
    }
    if (actions) actions.innerHTML = claimed ? '' : `<button type="button" class="btn small ration-btn" data-incense-claim>${t.claim}</button>`;
    // 👤 11/12 香快烧完(任一支 ≥85%)而今日还没抽(免费机会/加抽票仍在) → hint 换成催抽签
    const rs = status(loadRation(now), now);
    const nearlyAsh = burning.length > 0 && !allBurned
      && burning.some((s) => burnRatio(s, now) >= 0.85)
      && (rs.canFree || rs.extras > 0);
    if (hint) hint.textContent = !claimed ? t.claimHint : allBurned ? t.done : nearlyAsh ? t.nudge : burning.length > 0 ? t.watching : t.stepHint;
  };
  render();

  // burn progress refresh — 5s is slow enough that the looping smoke/ember
  // animations restart invisibly (both keyframes begin and end at opacity 0
  // states that match), fast enough that the burn-down reads as live
  const tick = setInterval(render, 5000);
  window.addEventListener('pagehide', () => clearInterval(tick), { once: true });

  root.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    const now = new Date();
    if (el.closest('[data-incense-claim]')) {
      saveIncense(claimIncense(now));
      render();
    } else if (el.closest('[data-incense-bundle]')) {
      // 👤 11/12 整束推进:raw→lit、lit→burning,一击完成;任一 lit 则触发落定脉冲
      let raw = loadIncense(now);
      const before = raw.sticks.filter((s) => s.phase === 'burning').length;
      raw.sticks.forEach((s, i) => {
        if (s.phase === 'raw') raw = lightStick(raw, i, now);
        else if (s.phase === 'lit') raw = offerStick(raw, i, now).state;
      });
      const offered = raw.sticks.filter((s) => s.phase === 'burning').length > before;
      saveIncense(raw);
      if (offered) {
        // a small settle pulse on the censer as the bundle lands
        const svg = scene?.querySelector('svg');
        if (svg) {
          svg.classList.remove('planted');
          void (svg as SVGElement).getBoundingClientRect();
          svg.classList.add('planted');
        }
      }
      render();
    }
  });
}
