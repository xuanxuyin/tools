/**
 * Beadboard bitmap rendering shared by the photo converter and the editor's
 * Download PNG. One cell = one draw call, replicating the source-site
 * editor's canvas look (user call, 2026-10-29): a colored cell is a solid
 * square with a faint inner edge, an empty cell is a white round peg with a
 * soft ring on warm paper, and every 29 cells a seam line marks where one
 * pegboard ends and the next snaps on.
 */

/** Warm paper the empty pegboard reads as — source-site editor value. */
export const BOARD_PAPER = '#f4efe8';
/** Beads per pegboard edge — the large interlocking Perler square. */
export const BOARD_SIZE = 29;

/** Draw one cell at (x, y) with side `s`. colorHex null → empty peg. */
export function drawBeadCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  colorHex: string | null,
): void {
  ctx.fillStyle = BOARD_PAPER;
  ctx.fillRect(x, y, s, s);
  if (colorHex) {
    ctx.fillStyle = colorHex;
    ctx.fillRect(x, y, s, s);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = Math.max(1, 0.06 * s);
    ctx.strokeRect(x + 0.5, y + 0.5, s - 1, s - 1);
    return;
  }
  const r = 0.28 * s; // peg circle: 56% of the cell across
  ctx.beginPath();
  ctx.arc(x + s / 2, y + s / 2, r, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = Math.max(1, 0.05 * s);
  ctx.stroke();
}

/** Board → offscreen canvas. cellAt(y, x) returns the bead hex or null. */
export function renderBoardCanvas(
  cols: number,
  rows: number,
  cellAt: (y: number, x: number) => string | null,
): HTMLCanvasElement | null {
  const canvas = document.createElement('canvas');
  const s = Math.max(6, Math.min(24, Math.floor(1600 / cols)));
  canvas.width = cols * s;
  canvas.height = rows * s;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) drawBeadCell(ctx, x * s, y * s, s, cellAt(y, x));
  }
  // pegboard seams every BOARD_SIZE cells + a light outer border
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.32)';
  ctx.lineWidth = Math.max(1, Math.floor(s * 0.08));
  for (let x = BOARD_SIZE; x < cols; x += BOARD_SIZE) {
    ctx.beginPath();
    ctx.moveTo(x * s + 0.5, 0);
    ctx.lineTo(x * s + 0.5, rows * s);
    ctx.stroke();
  }
  for (let y = BOARD_SIZE; y < rows; y += BOARD_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, y * s + 0.5);
    ctx.lineTo(cols * s, y * s + 0.5);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.18)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
  return canvas;
}

/** Render the board and trigger a PNG download. No-op without a 2d context
 *  (tests, very old browsers) — the SVG view stays the source of truth. */
export function downloadBoardPng(
  cols: number,
  rows: number,
  cellAt: (y: number, x: number) => string | null,
  fileName: string,
): void {
  const canvas = renderBoardCanvas(cols, rows, cellAt);
  if (!canvas) return;
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
}
