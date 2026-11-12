/**
 * UI for the ration + merit economy (see lib/ration.ts for the rules):
 *  - home page: the merit box widget (donate 8 → bank an extra draw,
 *    collect 1 merit/hour, communal lifetime counter on the box);
 *  - tool pages: gateDraw() consumes the daily free draw first, then a
 *    banked ticket, and otherwise renders the blocked panel with the
 *    collect / donate actions inline.
 * All copy lives in COPY below (en + zh review layer).
 */
import {
  loadRation,
  saveRation,
  claim,
  donateRest,
  donateOne,
  consumeDraw,
  status,
  MERIT_COST,
  MERIT_CAP,
  HOUR_MS,
  type RationState,
} from './ration';

type Lang = 'en' | 'zh';

const COPY = {
  en: {
    yourMerit: 'My merit',
    tapHint: 'Tap the number — one merit drops in the box',
    nextOne: (c: string) => `Next in ${c}`,
    collect: (n: number) => `Collect +${n} merit`,
    nothingYet: (c: string) => `Next in ${c}`,
    full: 'Merit full',
    dropAria: 'Drop one merit in the box',
    floatOne: '+1 merit',
    offered: (n: number) => `Dropped ${n}/${MERIT_COST}`,
    banked: (n: number) => (n === 1 ? '1 banked draw' : `${n} banked draws`),
    communal: (n: string) => `Total: ${n}`,
    blockedTitle: 'Today’s free draw is spent.',
    blockedBody: 'One draw a day, shared by every tool — it keeps the reading honest. The merit box can buy you another.',
    blockedDonate: (n: number) => `Donate ${n} merit, draw again`,
    fine: `Merit collects 1 per hour, up to ${MERIT_CAP} — kept in your browser, no account. The free draw refills tomorrow.`,
    boxLink: 'Visit the merit box →',
    short: (n: number) => `${n} more to go`,
  },
  zh: {
    yourMerit: '我的功德',
    tapHint: '点击数字，投一枚功德进箱',
    nextOne: (c: string) => `下一枚 ${c}`,
    collect: (n: number) => `领取 +${n} 功德`,
    nothingYet: (c: string) => `${c} 后可领`,
    full: '功德已满',
    dropAria: '投一枚功德进箱',
    floatOne: '功德 +1',
    offered: (n: number) => `已投 ${n}/${MERIT_COST}`,
    banked: (n: number) => `存了 ${n} 次加抽`,
    communal: (n: string) => `全站累计：${n}`,
    blockedTitle: '今天的免费机会用完啦。',
    blockedBody: '每天一次机会，全站道具共用——诚心这一次才灵。功德箱可以为你再换一次。',
    blockedDonate: (n: number) => `捐 ${n} 功德 · 再来一次`,
    fine: `功德每小时聚 1 点，上限 ${MERIT_CAP} 点——存在你自己浏览器里，不用注册。免费机会明天刷新。`,
    boxLink: '去功德箱看看 →',
    short: (n: number) => `还差 ${n} 点`,
  },
} as const;

function lang(): Lang {
  return document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
}

/* ---- the merit box illustration (hand-drawn SVG, site palette) ---- */

export function meritBoxSvg(cls = '', lng?: Lang): string {
  const l = lng ?? lang();
  // EN pages carry zero CJK (site discipline) — the plaque reads MERIT there
  const plaque =
    l === 'zh'
      ? `<text x="130" y="158" text-anchor="middle" font-family="'Songti SC','SimSun',serif" font-size="34" font-weight="700" fill="#b8860b" letter-spacing="6">功德</text>`
      : `<text x="130" y="151" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="20" font-weight="700" fill="#b8860b" letter-spacing="3" textLength="82" lengthAdjust="spacingAndGlyphs">MERIT</text>`;
  return `<svg class="merit-box-svg ${cls}" viewBox="0 0 260 240" width="220" height="203" role="img" aria-label="Merit box">
    <defs>
      <linearGradient id="mb-lacq" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#b8462f"/><stop offset="1" stop-color="#93321f"/>
      </linearGradient>
    </defs>
    <ellipse cx="132" cy="223" rx="94" ry="12" fill="#2a2444" opacity="0.12"/>
    <!-- top face -->
    <polygon points="45,90 75,66 245,66 215,90" fill="#c1512f"/>
    <!-- side face (right) -->
    <polygon points="215,90 245,66 245,184 215,208" fill="#8d3020"/>
    <!-- front face -->
    <rect x="45" y="90" width="170" height="118" rx="8" fill="url(#mb-lacq)"/>
    <!-- slot on the top face -->
    <polygon points="118,84 186,84 199,74 131,74" fill="#3a2418"/>
    <polygon points="118,84 186,84 186,81 118,81" fill="#241a10"/>
    <!-- coin mid-drop (animated) -->
    <g class="merit-coin">
      <circle cx="158" cy="66" r="11.5" fill="#e8b73a" stroke="#b8860b" stroke-width="2.5"/>
      <rect x="153" y="61" width="10" height="10" fill="#c98f1d" stroke="#a4750f" stroke-width="1.5"/>
    </g>
    <!-- gold trim + rivets -->
    <rect x="45" y="90" width="170" height="118" rx="8" fill="none" stroke="#d4a017" stroke-width="3"/>
    <circle cx="58" cy="103" r="2.6" fill="#d4a017"/><circle cx="202" cy="103" r="2.6" fill="#d4a017"/>
    <circle cx="58" cy="195" r="2.6" fill="#d4a017"/><circle cx="202" cy="195" r="2.6" fill="#d4a017"/>
    <!-- ivory plaque with gold lettering -->
    <rect x="76" y="116" width="108" height="62" rx="7" fill="#f7efdd" stroke="#d4a017" stroke-width="2.5"/>
    <rect x="81" y="121" width="98" height="52" rx="5" fill="none" stroke="#d4a017" stroke-width="1" opacity="0.55"/>
    ${plaque}
    <!-- feet -->
    <rect x="64" y="206" width="20" height="12" rx="3" fill="#6d2817"/>
    <rect x="176" y="206" width="20" height="12" rx="3" fill="#6d2817"/>
  </svg>`;
}

/* ---- state refresh + shared re-render registry ---- */

type Renderer = () => void;
const mounted: Renderer[] = [];

function refreshAll(): void {
  for (const r of mounted) r();
}

/** Claim pending merit, persist, re-render every mounted widget on the page. */
function doClaim(): void {
  const now = new Date();
  const r = claim(loadRation(now), now);
  saveRation(r.state);
  refreshAll();
}

/**
 * Spend the daily free draw, else a banked ticket. Returns false (and renders
 * the blocked panel into [data-ration-slot]) when nothing is left; the panel's
 * donate button then finishes the exchange and calls `proceed`.
 */
export function gateDraw(proceed?: () => void): boolean {
  const now = new Date();
  const r = consumeDraw(loadRation(now), now);
  saveRation(r.state);
  const slot = document.querySelector<HTMLElement>('[data-ration-slot]');
  if (r.access !== 'blocked') {
    if (slot) slot.innerHTML = ''; // clear a stale blocked panel from an earlier attempt
    return true;
  }
  if (slot) mountBlockedPanel(slot, proceed);
  return false;
}

/** Merit held right now (for badges elsewhere). */
export function meritNow(): number {
  return loadRation(new Date()).merit;
}

/* ---- communal counter ---- */

async function fetchCommunal(): Promise<number | null> {
  try {
    const res = await fetch('/api/merit');
    if (!res.ok) return null;
    const o = (await res.json()) as { total?: number };
    return typeof o.total === 'number' ? o.total : null;
  } catch {
    return null;
  }
}

function postDonation(amount: number): void {
  fetch('/api/merit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  }).catch(() => {});
}

const fmt = (n: number) => n.toLocaleString('en-US');

/* m:ss countdown until the next merit point lands */
const mmss = (ms: number): string => {
  const t = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};

/* next claimable moment from the accrual window (accrueTs + hoursWaited + 1) */
function nextDropAt(now: number, accrueTs: number): number {
  return accrueTs + (Math.floor((now - accrueTs) / HOUR_MS) + 1) * HOUR_MS;
}

/* one lazy 1s ticker drives every mounted widget — renders are idempotent,
   so a tick only matters while a countdown is showing; when it hits zero the
   collect button flips to "领取" (enabled) on the next tick */
let tickStarted = false;
function startTick(): void {
  if (tickStarted) return;
  tickStarted = true;
  setInterval(refreshAll, 1000);
}

/** Shared collect-button state: claimable / counting down / box full. */
function collectState(raw: RationState, now: number): { text: string; disabled: boolean } {
  const st = status(raw, new Date(now));
  if (st.pending > 0) return { text: COPY[lang()].collect(st.pending), disabled: false };
  if (raw.merit >= MERIT_CAP) return { text: COPY[lang()].full, disabled: true };
  return { text: COPY[lang()].nothingYet(mmss(nextDropAt(now, raw.accrueTs) - now)), disabled: true };
}

/* ---- home page widget ---- */

export function mountMeritBox(root: HTMLElement): void {
  const t = COPY[lang()];
  root.innerHTML = `
    <div class="merit-stage">
      ${meritBoxSvg()}
      <div class="merit-communal">
        <span class="merit-total" data-merit-total>…</span>
      </div>
      <div class="merit-cycle" data-merit-cycle></div>
      <div class="merit-banked" data-merit-banked></div>
    </div>
    <div class="merit-panel">
      <div class="merit-balance"><span class="merit-unit">${t.yourMerit}</span><button type="button" class="merit-num" data-merit-num data-merit-drop aria-label="${t.dropAria}" title="${t.dropAria}">0</button><span class="merit-ready" data-merit-ready></span></div>
      <div class="merit-hint">${t.tapHint}</div>
      <div class="merit-actions">
        <button type="button" class="btn ration-btn" data-ration-collect></button>
      </div>
    </div>`;
  startTick();

  const render = (): void => {
    const now = new Date();
    const raw = loadRation(now);
    const st = status(raw, now);
    const num = root.querySelector<HTMLButtonElement>('[data-merit-num]');
    const ready = root.querySelector('[data-merit-ready]');
    const collect = root.querySelector<HTMLButtonElement>('[data-ration-collect]');
    const cycle = root.querySelector('[data-merit-cycle]');
    const banked = root.querySelector('[data-merit-banked]');
    if (num) {
      num.textContent = String(st.merit);
      num.disabled = st.merit < 1; // the number IS the donate button
    }
    // pending>0 → the +N on the button grows every full hour while unclaimed;
    // keep a live "next in mm:ss" beside it so the accumulation is VISIBLE
    // (👤 11-12: 到点不领像冻结——按钮停 +1 一小时不动，不知道还在累计)
    if (ready) {
      ready.textContent =
        st.pending > 0 && raw.merit < MERIT_CAP
          ? t.nextOne(mmss(nextDropAt(now.getTime(), raw.accrueTs) - now.getTime()))
          : '';
    }
    if (collect) {
      const cs = collectState(raw, now.getTime());
      collect.textContent = cs.text;
      collect.disabled = cs.disabled;
    }
    if (cycle) cycle.textContent = raw.donated > 0 ? t.offered(raw.donated) : '';
    if (banked) banked.textContent = st.extras > 0 ? t.banked(st.extras) : '';
  };
  render();
  mounted.push(render);

  root.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    if (el.closest('[data-ration-collect]')) {
      // claim = pocket the merit — the balance bumps, nothing enters the box
      doClaim();
      const num = root.querySelector('[data-merit-num]');
      if (num) {
        num.classList.remove('bump');
        void (num as HTMLElement).getBoundingClientRect();
        num.classList.add('bump');
      }
    } else if (el.closest('[data-merit-drop]')) {
      doDropOne(root);
    }
  });

  // communal counter — always visible: real number from /api/merit, an em dash
  // placeholder where the API is missing (static preview / offline). Never hide
  // the row: an invisible counter reads as "not built".
  const totalEl = root.querySelector('[data-merit-total]');
  fetchCommunal().then((n) => {
    if (totalEl) totalEl.textContent = t.communal(n !== null ? fmt(n) : '—');
  });
  (root as HTMLElement & { _communal?: () => void })._communal = async () => {
    const n = await fetchCommunal();
    const el = root.querySelector('[data-merit-total]');
    if (n !== null && el) el.textContent = t.communal(fmt(n));
  };
}

/** One click on the balance number = drop one merit into the box (👤 11/12). */
function doDropOne(root: HTMLElement): void {
  const r = donateOne(loadRation(new Date()));
  if (!r.ok) return;
  saveRation(r.state);
  postDonation(1);
  const svg = root.querySelector('.merit-box-svg');
  if (svg) {
    svg.classList.remove('dropping');
    void (svg as SVGElement).getBoundingClientRect(); // restart the animation
    svg.classList.add('dropping');
  }
  // a "+1 merit" floats up from the slot on every drop
  const stage = root.querySelector('.merit-stage');
  if (stage) {
    const float = document.createElement('span');
    float.className = 'merit-float';
    float.textContent = COPY[lang()].floatOne;
    float.addEventListener('animationend', () => float.remove());
    stage.appendChild(float);
  }
  refreshAll();
  (root as HTMLElement & { _communal?: () => void })._communal?.();
}

/* ---- tool-page blocked panel ---- */

function mountBlockedPanel(slot: HTMLElement, proceed?: () => void): void {
  const t = COPY[lang()];
  slot.innerHTML = `
    <article class="card ration-card" data-ration-card>
      <div class="ration-title">${t.blockedTitle}</div>
      <p class="ration-body">${t.blockedBody}</p>
      <div class="ration-actions">
        <button type="button" class="btn ration-btn" data-ration-collect></button>
        <button type="button" class="btn ration-btn ration-donate" data-ration-donate><span class="donate-main"></span><span class="donate-sub"></span></button>
      </div>
      <p class="ration-fine">${t.fine}</p>
      <p class="ration-boxlink"><a href="${document.documentElement.lang.startsWith('zh') ? '/zh/' : '/'}#merit-box">${t.boxLink}</a></p>
    </article>`;

  startTick();

  const render = (): void => {
    const now = new Date();
    const raw = loadRation(now);
    const st = status(raw, now);
    const collect = slot.querySelector<HTMLButtonElement>('[data-ration-collect]');
    const don = slot.querySelector<HTMLButtonElement>('[data-ration-donate]');
    if (collect) {
      const cs = collectState(raw, now.getTime());
      collect.textContent = cs.text;
      collect.disabled = cs.disabled;
    }
    if (don) {
      // two lines: the action always reads as a button, progress demoted to a sub-line.
      // The button completes the CURRENT ticket: merit already dropped at the home
      // box counts (👤 11-12: 在家投了 1 枚,这里却显示 0/8) — so the price shown
      // is the remainder, and the sub-line shows the shared cycle progress.
      const need = MERIT_COST - raw.donated;
      const can = st.merit >= need;
      const main = don.querySelector('.donate-main');
      const sub = don.querySelector('.donate-sub');
      if (main) main.textContent = t.blockedDonate(need);
      let subText = raw.donated > 0 ? t.offered(raw.donated) : '';
      if (!can) subText = subText ? `${subText} · ${t.short(need - st.merit)}` : t.short(need - st.merit);
      if (sub) sub.textContent = subText;
      don.disabled = !can;
    }
  };
  render();
  mounted.push(render);

  slot.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    if (el.closest('[data-ration-collect]')) {
      doClaim();
    } else if (el.closest('[data-ration-donate]')) {
      const s = loadRation(new Date());
      const d = donateRest(s);
      if (!d.ok) return;
      saveRation(d.state); // bank the ticket — the gate below spends it on this draw
      // only the remainder enters the box now — the drops already POSTed 1-per-click
      postDonation(MERIT_COST - s.donated);
      proceed?.(); // gateDraw consumes the ticket, clears the panel, runs the draw
    }
  });
}
