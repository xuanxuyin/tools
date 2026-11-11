/**
 * Bead editor island — the source-site editor rebuilt on our stack (user
 * call, 2026-10-29). A blank grid you size in pegboards, brush / eraser /
 * pick-color / mirror / undo / reset, a searchable color library with the
 * 291 Mardiy codes, one-tap shade simplification, live board stats and
 * bead counts, PNG export, print, autosave — and it receives converted
 * photos from the pattern maker through a sessionStorage handoff (same
 * palette, so every id carries over). Everything is local; the pattern
 * never leaves the browser.
 */
import { MARD_COLORS, mardById } from '../lib/mardPalette';
import { paintLine, type PaintCell } from '../lib/beadPaint';
import { rgbToOklab, hexToRgb, normalizeHex, type Oklab } from '../lib/color';
import { nearestMardId } from '../lib/mardNearest';
import { BOARD_SIZE, downloadBoardPng } from '../lib/beadBoardRender';
import { buildBoardPrintPages, type BeadTally } from '../lib/beadPrint';
import { printZone } from './printZone';
import { t as uiT, tArgs } from './i18n';
import { fetchPiece, gridFromRows, mountPublishFlow } from './galleryPublish';

const U = 10; // viewBox units per cell — same as every board on the site
const SVG_NS = 'http://www.w3.org/2000/svg';
const HANDOFF_KEY = 'bead-editor:handoff';
const DRAFT_KEY = 'bead-editor:draft';
const UNDO_CAP = 50;
/** Shade-merge threshold for the editor's Simplify colors button. */
const SIMPLIFY_T = 0.08;

/** id → Oklab for the merge pass. Custom-hex snapping uses the shared
 *  nearestMardId (lib/mardNearest) — the same rule everywhere. */
const LAB: Map<string, Oklab> = new Map(
  MARD_COLORS.map((b) => [b.id, rgbToOklab(hexToRgb(b.hex))]),
);

type Grid = (string | null)[][];

/** One entry of the build-time template catalog (editor-templates.json). */
interface TemplateEntry {
  slug: string;
  name: string;
  cat: string;
  w: number;
  h: number;
  rows: string[];
  pal: Record<string, string>;
}

/** Template group headers reuse the bead-hub labels where they exist; the
 *  rest get dedicated keys. 'misc' is the fallback for future categories. */
const CATEGORY_KEYS: Record<string, string> = {
  animals: 'bs.an',
  characters: 'bs.ch',
  halloween: 'bs.ha',
  food: 'ed.catFood',
  minis: 'ed.catMinis',
  christmas: 'ed.catChristmas',
  misc: 'ed.catMisc',
};

interface Handoff {
  width: number;
  height: number;
  grid: (string | null)[][];
}

/** Parse + validate a handoff/draft payload — one bad row and the editor
 *  falls back to a clean board rather than half-rendering garbage. */
function parsePayload(raw: string | null): Handoff | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as Handoff;
    if (
      !Array.isArray(p.grid) ||
      !Number.isFinite(p.width) ||
      !Number.isFinite(p.height) ||
      p.grid.length !== p.height ||
      p.width < 1 ||
      p.width > 200 ||
      p.height < 1 ||
      p.height > 200
    ) {
      return null;
    }
    for (const row of p.grid) {
      if (!Array.isArray(row) || row.length !== p.width) return null;
    }
    return p;
  } catch {
    return null;
  }
}

export class BeadEditor {
  private W = BOARD_SIZE;
  private H = BOARD_SIZE;
  private grid: Grid = [];
  private cells = new Map<number, SVGRectElement>();
  private pegs = new Map<number, SVGCircleElement>();
  private tool: 'brush' | 'eraser' | 'pick' = 'brush';
  private mirror = false;
  private beadId = 'mard-h7'; // H7 — pure black, the default brush
  private undoStack: string[] = [];
  private drawing = false;
  private last: PaintCell | null = null;
  private saveTimer: number | undefined;

  constructor(private root: HTMLElement) {
    // handoff from the converter wins; a saved draft comes next; else blank
    let seed = parsePayload(window.sessionStorage.getItem(HANDOFF_KEY));
    if (seed) {
      window.sessionStorage.removeItem(HANDOFF_KEY);
      this.note('Pattern loaded from the converter — fix any bead, then print or download.');
    } else {
      seed = parsePayload(window.localStorage.getItem(DRAFT_KEY));
      if (seed) this.note('Welcome back — your saved pattern is on the board.');
    }
    if (seed) {
      this.W = seed.width;
      this.H = seed.height;
      this.grid = seed.grid;
      // Drafts saved before the 2026-10-29 Mardiy switch carry Perler ids —
      // drop them to empty cells instead of crashing the stats render.
      for (const row of this.grid) {
        for (let x = 0; x < row.length; x++) {
          const id = row[x];
          row[x] = id && mardById(id) ? id : null;
        }
      }
    } else {
      this.grid = this.emptyGrid(this.W, this.H);
    }

    this.buildBoard();
    this.renderLibrary('');
    this.bind();
    this.syncStats();
    this.updateBoardsButton();
    // a gallery link (?from=<pieceId>) may swap the board in asynchronously —
    // it confirms before overwriting, so it's safe to fire after the draft
    // is already on the board
    void this.maybeLoadFromUrl();
  }

  private emptyGrid(w: number, h: number): Grid {
    return Array.from({ length: h }, () => Array.from({ length: w }, () => null));
  }

  private note(text: string): void {
    const el = this.root.querySelector('[data-ed-note]');
    if (el) {
      el.textContent = text;
      el.classList.remove('hidden');
    }
  }

  // ── board ────────────────────────────────────────────────────────────

  private buildBoard(): void {
    const host = this.root.querySelector('[data-ed-canvas-host]')!;
    host.innerHTML = '';
    this.cells.clear();
    this.pegs.clear();
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'ed-board');
    svg.setAttribute('data-ed-canvas', '');
    svg.setAttribute('data-cols', String(this.W));
    svg.setAttribute('data-rows', String(this.H));
    svg.setAttribute('viewBox', `0 0 ${this.W * U} ${this.H * U}`);
    svg.setAttribute('role', 'img');
    svg.setAttribute(
      'aria-label',
      `Bead editor canvas, ${this.W} by ${this.H} cells — draw with the brush`,
    );

    for (let y = 0; y < this.H; y++) {
      for (let x = 0; x < this.W; x++) {
        const idx = y * this.W + x;
        const id = this.grid[y]![x];
        const bead = id ? mardById(id) : null;
        if (bead) {
          const r = document.createElementNS(SVG_NS, 'rect');
          r.setAttribute('class', 'pv-cell');
          r.setAttribute('data-ex', String(x));
          r.setAttribute('data-ey', String(y));
          r.setAttribute('x', String(x * U));
          r.setAttribute('y', String(y * U));
          r.setAttribute('width', String(U));
          r.setAttribute('height', String(U));
          r.setAttribute('fill', bead.hex);
          svg.appendChild(r);
          this.cells.set(idx, r);
        } else {
          const c = document.createElementNS(SVG_NS, 'circle');
          c.setAttribute('class', 'pv-peg');
          c.setAttribute('data-ex', String(x));
          c.setAttribute('data-ey', String(y));
          c.setAttribute('cx', String(x * U + U / 2));
          c.setAttribute('cy', String(y * U + U / 2));
          c.setAttribute('r', String(U * 0.28));
          svg.appendChild(c);
          this.pegs.set(idx, c);
        }
      }
    }
    for (let x = BOARD_SIZE; x < this.W; x += BOARD_SIZE) this.seam(svg, x * U, 0, x * U, this.H * U);
    for (let y = BOARD_SIZE; y < this.H; y += BOARD_SIZE) this.seam(svg, 0, y * U, this.W * U, y * U);
    const border = document.createElementNS(SVG_NS, 'rect');
    border.setAttribute('class', 'pv-border');
    border.setAttribute('x', '0.5');
    border.setAttribute('y', '0.5');
    border.setAttribute('width', String(this.W * U - 1));
    border.setAttribute('height', String(this.H * U - 1));
    svg.appendChild(border);
    host.appendChild(svg);

    svg.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      /* setPointerCapture throws when the pointer is already inactive
         (synthetic events, cancelled touches, multi-touch races). Capture
         is an optimization — losing it must not kill the stroke. */
      try {
        svg.setPointerCapture?.(e.pointerId);
      } catch {
        /* keep drawing without capture */
      }
      this.drawing = true;
      const cell = this.cellAt(e);
      if (cell) {
        if (this.tool === 'pick') {
          this.pickAt(cell);
        } else {
          this.snapshot();
          this.applyCell(cell);
          this.last = cell;
        }
      }
    });
    svg.addEventListener('pointermove', (e) => {
      if (!this.drawing || this.tool === 'pick' || !this.last) return;
      const cell = this.cellAt(e);
      if (!cell) return;
      for (const c of paintLine(this.last, cell)) this.applyCell(c);
      this.last = cell;
    });
    const stop = () => {
      if (this.drawing && this.tool !== 'pick') this.afterEdit();
      this.drawing = false;
      this.last = null;
    };
    svg.addEventListener('pointerup', stop);
    svg.addEventListener('pointercancel', stop);
    this.fit();
  }

  private seam(svg: SVGSVGElement, x1: number, y1: number, x2: number, y2: number): void {
    const l = document.createElementNS(SVG_NS, 'line');
    l.setAttribute('class', 'pv-seam');
    l.setAttribute('x1', String(x1));
    l.setAttribute('y1', String(y1));
    l.setAttribute('x2', String(x2));
    l.setAttribute('y2', String(y2));
    svg.appendChild(l);
  }

  private cellAt(e: PointerEvent): PaintCell | null {
    const svg = this.root.querySelector('[data-ed-canvas]')!;
    const rect = svg.getBoundingClientRect();
    if (!rect.width) return null;
    const vb = (svg.getAttribute('viewBox') ?? '').trim().split(/\s+/).map(Number);
    const scale = rect.width / (vb[2] || this.W * U);
    const x = Math.floor((e.clientX - rect.left) / scale / U);
    const y = Math.floor((e.clientY - rect.top) / scale / U);
    if (x < 0 || y < 0 || x >= this.W || y >= this.H) return null;
    return { x, y };
  }

  /** Paint / erase one cell, swapping rect ↔ peg as needed so the board
   *  always looks like the converter's preview (bead square vs white peg). */
  private applyCell(cell: PaintCell): void {
    this.applyOne(cell);
    if (this.mirror) this.applyOne({ x: this.W - 1 - cell.x, y: cell.y });
  }

  private applyOne(cell: PaintCell): void {
    const idx = cell.y * this.W + cell.x;
    const svg = this.root.querySelector('[data-ed-canvas]')!;
    const id = this.tool === 'eraser' ? null : this.beadId;
    // remove whichever shape holds the cell now
    const r = this.cells.get(idx);
    if (r) r.remove();
    const c = this.pegs.get(idx);
    if (c) c.remove();
    this.cells.delete(idx);
    this.pegs.delete(idx);
    this.grid[cell.y]![cell.x] = id;
    if (id) {
      const bead = mardById(id)!;
      const rect = document.createElementNS(SVG_NS, 'rect');
      rect.setAttribute('class', 'pv-cell');
      rect.setAttribute('data-ex', String(cell.x));
      rect.setAttribute('data-ey', String(cell.y));
      rect.setAttribute('x', String(cell.x * U));
      rect.setAttribute('y', String(cell.y * U));
      rect.setAttribute('width', String(U));
      rect.setAttribute('height', String(U));
      rect.setAttribute('fill', bead.hex);
      svg.insertBefore(rect, svg.querySelector('.pv-seam, .pv-border'));
      this.cells.set(idx, rect);
    } else {
      const peg = document.createElementNS(SVG_NS, 'circle');
      peg.setAttribute('class', 'pv-peg');
      peg.setAttribute('data-ex', String(cell.x));
      peg.setAttribute('data-ey', String(cell.y));
      peg.setAttribute('cx', String(cell.x * U + U / 2));
      peg.setAttribute('cy', String(cell.y * U + U / 2));
      peg.setAttribute('r', String(U * 0.28));
      svg.insertBefore(peg, svg.querySelector('.pv-seam, .pv-border'));
      this.pegs.set(idx, peg);
    }
  }

  /** Pick color: click any bead → that color becomes the brush. */
  private pickAt(cell: PaintCell): void {
    const id = this.grid[cell.y]![cell.x];
    if (!id) return;
    this.setActiveBead(id);
    this.setTool('brush');
  }

  // ── state helpers ────────────────────────────────────────────────────

  private snapshot(): void {
    this.undoStack.push(JSON.stringify(this.grid));
    if (this.undoStack.length > UNDO_CAP) this.undoStack.shift();
  }

  private afterEdit(): void {
    this.syncStats();
    this.autosave();
    this.updateBoardsButton();
  }

  /** "Print boards" only earns its place once the design outgrows one
   *  pegboard — below that the plain print already fills a single sheet. */
  private updateBoardsButton(): void {
    const btn = this.root.querySelector('[data-ed-print-boards]');
    btn?.classList.toggle('hidden', this.W <= BOARD_SIZE && this.H <= BOARD_SIZE);
  }

  /** Cover sheet with the bead list, then each 29×29 pegboard at full cell
   *  size with its coordinates (lib/beadPrint.ts). The container mounts at
   *  the end of <main>, hidden; html[data-print-zone='boards'] un-hides it
   *  and hides every other main child on paper. */
  private printBoards(): void {
    const mount = document.querySelector('main') ?? document.body;
    mount.querySelector('[data-print-boards]')?.remove();
    const tally: BeadTally[] = [...this.counts().entries()]
      .map(([id, count]) => {
        const bead = mardById(id)!;
        return { code: bead.code, hex: bead.hex, count };
      })
      .sort((a, b) => b.count - a.count);
    const bw = Math.ceil(this.W / BOARD_SIZE);
    const bh = Math.ceil(this.H / BOARD_SIZE);
    const total = bw * bh;
    const pages = buildBoardPrintPages({
      cols: this.W,
      rows: this.H,
      cellAt: (y, x) => mardById(this.grid[y]?.[x] ?? '')?.hex ?? null,
      tally,
      labels: {
        cover: uiT('ed.bpCover')
          .replace('{w}', String(this.W))
          .replace('{h}', String(this.H))
          .replace('{boards}', String(total)),
        coverList: uiT('ed.bpList'),
        board: (pg) =>
          uiT('ed.bpBoard')
            .replace('{bx}', String(pg.bx + 1))
            .replace('{bw}', String(bw))
            .replace('{by}', String(pg.by + 1))
            .replace('{bh}', String(bh))
            .replace('{x1}', String(pg.x0 + 1))
            .replace('{x2}', String(pg.x0 + pg.cols))
            .replace('{y1}', String(pg.y0 + 1))
            .replace('{y2}', String(pg.y0 + pg.rows))
            .replace('{page}', String(pg.page))
            .replace('{total}', String(total)),
      },
    });
    mount.appendChild(pages);
    printZone('boards');
  }

  private counts(): Map<string, number> {
    const counts = new Map<string, number>();
    for (const row of this.grid) {
      for (const id of row) if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    return counts;
  }

  // ------------------------------------------------------------------
  // Publish + templates + remix (UGC, 2026-11-02; templates 2026-11-02).
  // The publish POST lives in scripts/galleryPublish.ts, shared with the
  // photo converter and the studio pages — this class only supplies the
  // board and handles the template picker + ?from=<pieceId> remix entry.
  // ------------------------------------------------------------------

  private board(): { width: number; height: number; grid: Grid } {
    return { width: this.W, height: this.H, grid: this.grid };
  }

  /** Replace the whole board (template / gallery piece). Fresh undo stack —
   *  a snapshot of a differently-sized board would corrupt undo. */
  private replaceBoard(width: number, height: number, grid: Grid): void {
    this.W = width;
    this.H = height;
    this.grid = grid.map((row) => row.map((id) => (id && mardById(id) ? id : null)));
    this.undoStack = [];
    this.buildBoard();
    this.afterEdit();
  }

  private openTemplates(): void {
    const panel = this.root.querySelector('[data-ed-tpl-panel]');
    if (!panel) return;
    panel.classList.remove('hidden');
    void this.renderTemplateList();
  }

  private closeTemplates(): void {
    this.root.querySelector('[data-ed-tpl-panel]')?.classList.add('hidden');
  }

  private tplFetch: Promise<TemplateEntry[]> | null = null;

  /** The template catalog is a build-time JSON (editor-templates.json,
   *  Perler patterns already mapped to Mardiy ids) — fetched lazily on
   *  first open so the editor bundle stays lean. */
  private templates(): Promise<TemplateEntry[]> {
    this.tplFetch ??= fetch('/editor-templates.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { groups: { items: TemplateEntry[] }[] }) => d.groups.flatMap((g) => g.items))
      .catch(() => {
        this.tplFetch = null;
        return [] as TemplateEntry[];
      });
    return this.tplFetch;
  }

  private async renderTemplateList(): Promise<void> {
    const list = this.root.querySelector('[data-ed-tpl-list]');
    const status = this.root.querySelector('[data-ed-tpl-status]');
    if (!list) return;
    const items = await this.templates();
    if (!items.length) {
      if (status) status.textContent = uiT('ed.tplFail');
      return;
    }
    if (status) status.textContent = '';
    if ((list as HTMLElement).dataset.done === '1') return;
    (list as HTMLElement).dataset.done = '1';
    const byCat = new Map<string, TemplateEntry[]>();
    for (const it of items) {
      const arr = byCat.get(it.cat) ?? [];
      arr.push(it);
      byCat.set(it.cat, arr);
    }
    list.replaceChildren(
      ...[...byCat].map(([cat, entries]) => {
        const group = document.createElement('div');
        group.className = 'ed-tpl-group';
        const h = document.createElement('h4');
        h.textContent = uiT(CATEGORY_KEYS[cat] ?? 'ed.catMisc');
        const chips = document.createElement('div');
        chips.className = 'ed-tpl-chips';
        for (const it of entries) {
          const chip = document.createElement('button');
          chip.type = 'button';
          chip.className = 'tpl-chip';
          chip.dataset.edTplSlug = it.slug;
          chip.append(it.name);
          const dim = document.createElement('span');
          dim.className = 'tpl-dim';
          dim.textContent = ` ${it.w}×${it.h}`;
          chip.append(dim);
          chips.append(chip);
        }
        group.append(h, chips);
        return group;
      }),
    );
  }

  private async loadTemplate(slug: string): Promise<void> {
    const items = await this.templates();
    const tpl = items.find((t) => t.slug === slug);
    const status = this.root.querySelector('[data-ed-tpl-status]');
    if (!tpl) {
      if (status) status.textContent = uiT('ed.tplFail');
      return;
    }
    if (this.grid.flat().some(Boolean) && !window.confirm(uiT('ed.tplConfirm'))) return;
    this.closeTemplates();
    this.replaceBoard(tpl.w, tpl.h, gridFromRows(tpl.rows, tpl.pal));
    this.note(tArgs('ed.tplLoaded', { a: tpl.name, b: `${tpl.w}×${tpl.h}` }));
  }

  /** Gallery remix: /bead-editor/?from=<pieceId> loads another player's
   *  published piece onto the board to repaint. Missing/failed lookups
   *  leave the editor untouched (draft still shows). */
  private async maybeLoadFromUrl(): Promise<void> {
    const from = new URLSearchParams(window.location.search).get('from');
    if (!from) return;
    const piece = await fetchPiece(from);
    if (!piece) return;
    if (this.grid.flat().some(Boolean) && !window.confirm(uiT('ed.tplConfirm'))) return;
    this.replaceBoard(piece.width, piece.height, piece.grid);
    this.note(tArgs('ed.fromLoaded', { a: piece.name, b: piece.nick }));
  }


  private syncStats(): void {
    const stats = this.root.querySelector('[data-ed-stats]');
    const beads = this.grid.flat().filter(Boolean).length;
    // Publish only makes sense with something on the board
    this.root.querySelector('[data-ed-publish]')?.classList.toggle('hidden', beads === 0);
    const colors = this.counts().size;
    const bw = Math.ceil(this.W / BOARD_SIZE);
    const bh = Math.ceil(this.H / BOARD_SIZE);
    if (stats) {
      const boards = bw * bh;
      stats.textContent =
        `${boards} ${boards === 1 ? 'pegboard' : 'pegboards'} (${bw} × ${bh}) · ` +
        `${beads.toLocaleString('en-US')} ${beads === 1 ? 'bead' : 'beads'} · ` +
        `${colors} ${colors === 1 ? 'color' : 'colors'}`;
    }
    const list = this.root.querySelector('[data-ed-list]');
    if (list) {
      list.innerHTML = '';
      if (!colors) {
        const p = document.createElement('li');
        p.className = 'cv-empty';
        p.textContent = 'Start drawing to build your project palette.';
        list.appendChild(p);
      } else {
        for (const [id, count] of [...this.counts().entries()].sort((a, b) => b[1] - a[1])) {
          const bead = mardById(id)!;
          const li = document.createElement('li');
          const swatch = document.createElement('span');
          swatch.className = 'cv-item-swatch';
          swatch.style.background = bead.hex;
          const text = document.createElement('span');
          text.textContent = `${bead.code} (${bead.hex}) ×${count}`;
          li.append(swatch, text);
          list.appendChild(li);
        }
      }
    }
    // size stays locked while the board holds beads
    const locked = this.root.querySelector('[data-ed-locked]');
    locked?.classList.toggle('hidden', beads === 0);
  }

  private autosave(): void {
    window.clearTimeout(this.saveTimer);
    this.saveTimer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ width: this.W, height: this.H, grid: this.grid }),
        );
      } catch {
        /* storage full or blocked — autosave is best-effort */
      }
    }, 300);
  }

  // ── controls ─────────────────────────────────────────────────────────

  private setTool(tool: 'brush' | 'eraser' | 'pick'): void {
    this.tool = tool;
    for (const btn of this.root.querySelectorAll<HTMLButtonElement>('[data-ed-tool]')) {
      const active = btn.dataset.edTool === tool;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  private setActiveBead(id: string): void {
    this.beadId = id;
    const bead = mardById(id)!;
    const chip = this.root.querySelector('[data-ed-active]');
    if (chip) {
      (chip as HTMLElement).style.background = bead.hex;
      chip.title = `${bead.code} (${bead.hex})`;
    }
    for (const s of this.root.querySelectorAll<HTMLButtonElement>('[data-ed-color]')) {
      const active = s.dataset.edColor === id;
      s.classList.toggle('active', active);
      s.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  /** Color library: all 291 Mardiy beads, filtered by code or hex. */
  private renderLibrary(query: string): void {
    const lib = this.root.querySelector('[data-ed-library]')!;
    lib.innerHTML = '';
    const q = query.trim().toLowerCase();
    for (const b of MARD_COLORS) {
      if (q && !b.code.toLowerCase().includes(q) && !b.hex.toLowerCase().includes(q)) continue;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cv-swatch' + (b.id === this.beadId ? ' active' : '');
      btn.dataset.edColor = b.id;
      btn.style.background = b.hex;
      btn.title = `${b.code} (${b.hex})`;
      btn.setAttribute('aria-label', `Use ${b.code}`);
      btn.setAttribute('aria-pressed', b.id === this.beadId ? 'true' : 'false');
      lib.appendChild(btn);
    }
    if (!lib.children.length) {
      const p = document.createElement('p');
      p.className = 'cv-empty';
      p.textContent = 'No colors matched that search.';
      lib.appendChild(p);
    }
  }

  /** Zoom: displayed pixels per cell, tracked as % of the 10px 1:1 base. */
  private px = U;

  private setZoom(px: number): void {
    const svg = this.root.querySelector('[data-ed-canvas]');
    if (!svg) return;
    this.px = Math.max(2, Math.min(48, px));
    svg.style.width = `${this.W * this.px}px`;
    const label = this.root.querySelector('[data-ed-zoom-label]');
    if (label) label.textContent = `${Math.round((this.px / U) * 100)}%`;
  }

  private fit(): void {
    const host = this.root.querySelector<HTMLElement>('[data-ed-canvas-host]');
    const avail = host?.clientWidth ?? 0;
    this.setZoom(avail ? avail / this.W : U);
  }

  /** Simplify colors: merge nearest shade pairs under the threshold, keeping
   *  the lighter bead — the same rule the converter's Balanced level uses. */
  private simplify(): void {
    for (;;) {
      const ids = [...new Set(this.grid.flat().filter((c): c is string => c !== null))];
      if (ids.length < 2) return;
      let a = '';
      let b = '';
      let minD = Infinity;
      for (let i = 0; i < ids.length; i++) {
        for (let j = i + 1; j < ids.length; j++) {
          const la = LAB.get(ids[i]!)!;
          const lb = LAB.get(ids[j]!)!;
          const d = Math.hypot(la.L - lb.L, la.a - lb.a, la.b - lb.b);
          if (d < minD) {
            minD = d;
            a = ids[i]!;
            b = ids[j]!;
          }
        }
      }
      if (minD >= SIMPLIFY_T || !a || !b) return;
      const from = LAB.get(b)!.L < LAB.get(a)!.L ? b : a;
      const to = from === a ? b : a;
      for (const row of this.grid) {
        for (let x = 0; x < row.length; x++) {
          if (row[x] === from) row[x] = to;
        }
      }
    }
  }

  private undo(): void {
    const snap = this.undoStack.pop();
    if (!snap) return;
    this.grid = JSON.parse(snap) as Grid;
    this.buildBoard();
    this.afterEdit();
  }

  private bind(): void {
    this.setTool('brush');
    this.setActiveBead(this.beadId);

    // shared with the photo converter + studio pages (scripts/galleryPublish.ts)
    mountPublishFlow(this.root, () => this.board());

    this.root.addEventListener('click', (e) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const toolBtn = t.closest<HTMLButtonElement>('[data-ed-tool]');
      if (toolBtn) {
        this.setTool(toolBtn.dataset.edTool === 'eraser' ? 'eraser' : toolBtn.dataset.edTool === 'pick' ? 'pick' : 'brush');
        return;
      }
      if (t.closest('[data-ed-undo]')) {
        this.undo();
        return;
      }
      const mirrorBtn = t.closest<HTMLButtonElement>('[data-ed-mirror]');
      if (mirrorBtn) {
        this.mirror = !this.mirror;
        mirrorBtn.classList.toggle('active', this.mirror);
        mirrorBtn.setAttribute('aria-pressed', this.mirror ? 'true' : 'false');
        return;
      }
      if (t.closest('[data-ed-reset]')) {
        if (window.confirm('Reset the canvas? This clears all beads and cannot be undone.')) {
          this.snapshot();
          this.grid = this.emptyGrid(this.W, this.H);
          this.buildBoard();
          this.afterEdit();
        }
        return;
      }
      if (t.closest('[data-ed-simplify]')) {
        this.snapshot();
        this.simplify();
        this.buildBoard();
        this.afterEdit();
        return;
      }
      if (t.closest('[data-ed-fit]')) {
        this.fit();
        return;
      }
      if (t.closest('[data-ed-zoom-in]')) {
        this.setZoom(this.px * 1.25);
        return;
      }
      if (t.closest('[data-ed-zoom-out]')) {
        this.setZoom(this.px / 1.25);
        return;
      }
      if (t.closest('[data-ed-png]')) {
        downloadBoardPng(
          this.W,
          this.H,
          (y, x) => mardById(this.grid[y]![x] ?? '')?.hex ?? null,
          'tintbrew-bead-pattern.png',
        );
        return;
      }
      if (t.closest('[data-ed-print]')) {
        window.print();
        return;
      }
      // one sheet per physical pegboard — shows once the board outgrows a
      // single 29×29 pegboard (P1, 2026-11-02)
      if (t.closest('[data-ed-print-boards]')) {
        this.printBoards();
        return;
      }
      if (t.closest('[data-ed-tpl]')) {
        this.openTemplates();
        return;
      }
      if (t.closest('[data-ed-tpl-cancel]')) {
        this.closeTemplates();
        return;
      }
      const tplChip = t.closest<HTMLElement>('[data-ed-tpl-slug]');
      if (tplChip) {
        void this.loadTemplate(tplChip.dataset.edTplSlug!);
        return;
      }
      const swatch = t.closest<HTMLButtonElement>('[data-ed-color]');
      if (swatch) {
        this.setActiveBead(swatch.dataset.edColor!);
        this.setTool('brush');
        return;
      }
      if (t.closest('[data-ed-apply]')) {
        this.applySize();
        return;
      }
    });

    // Custom… shows the width/height inputs; presets keep them tucked away
    this.root.querySelector('[data-ed-size]')?.addEventListener('change', (e) => {
      const sel = e.target as HTMLSelectElement;
      this.root
        .querySelector('[data-ed-custom-row]')
        ?.classList.toggle('hidden', sel.value !== 'custom');
    });

    this.root.addEventListener('input', (e) => {
      const t = e.target as HTMLElement;
      const search = t.closest ? (t.closest<HTMLInputElement>('[data-ed-search]') ?? null) : null;
      if (search) {
        this.renderLibrary(search.value);
        return;
      }
      const custom = t.closest ? (t.closest<HTMLInputElement>('[data-ed-custom]') ?? null) : null;
      if (custom) {
        const hex = normalizeHex(custom.value);
        if (hex) {
          this.setActiveBead(nearestMardId(hex));
          this.setTool('brush');
        }
      }
    });

    window.addEventListener('resize', () => this.fit());
  }

  /** Board resize: allowed only on an empty board — a design's beads would
   *  be silently cropped or shuffled by a size change (source-site rule). */
  private applySize(): void {
    const sel = this.root.querySelector<HTMLSelectElement>('[data-ed-size]');
    const wIn = this.root.querySelector<HTMLInputElement>('[data-ed-w]');
    const hIn = this.root.querySelector<HTMLInputElement>('[data-ed-h]');
    if (!sel || !wIn || !hIn) return;
    const preset = sel.value;
    let w: number;
    let h: number;
    if (preset === 'custom') {
      w = Math.round(Number(wIn.value));
      h = Math.round(Number(hIn.value));
      if (!Number.isFinite(w) || !Number.isFinite(h) || w < 8 || h < 8 || w > 160 || h > 160) {
        this.note('Enter a size from 8 to 160 cells.');
        return;
      }
    } else {
      const [a, b] = preset.split('x').map(Number);
      w = a;
      h = b;
    }
    if (this.grid.flat().some(Boolean)) {
      this.note('Canvas size is locked while the board has beads — hit Reset to clear it first.');
      return;
    }
    this.W = w;
    this.H = h;
    this.grid = this.emptyGrid(w, h);
    this.buildBoard();
    this.afterEdit();
  }
}

for (const el of document.querySelectorAll<HTMLElement>('[data-bead-editor]')) {
  new BeadEditor(el);
}
