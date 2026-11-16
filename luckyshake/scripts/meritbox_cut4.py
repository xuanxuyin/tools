"""Merit box matting v4 — border flood over bg-eligible pixels.

v3 (colour-prior + GrabCut) ate the shadowed ivory wall: in RGB stats the
shadowed wall ≈ the warm grey studio bg, no colour rule separates them.
v4 uses geometry instead: flood FROM the frame borders through bg-ELIGIBLE
pixels only (low-sat grey), stopping where the local step is steep (the
house silhouette is a colour cliff; the bg is a smooth gradient). Interior
pockets (window panes) are unreachable → stay foreground.

Usage: python -I meritbox_cut4.py IN.png OUT.png [--debug OUT_OVERLAY.png]
"""
import sys
from collections import deque

import cv2
import numpy as np

def main() -> None:
    src, dst = sys.argv[1], sys.argv[2]
    dbg = sys.argv[sys.argv.index('--debug') + 1] if '--debug' in sys.argv else None

    im = cv2.imread(src)
    h0, w0 = im.shape[:2]
    # 👤 11/16 v5:默认不裁 —— r2 底部有台基(y≈726),原 9% 裁底会切掉基座沿;
    # 水印改在图上 inpaint(见 r2-nw 预处理),需要旧行为时传 --cropbadge
    if '--cropbadge' in sys.argv:
        im = im[0 : h0 - int(h0 * 0.09), 0 : w0 - int(w0 * 0.09)]
    h, w = im.shape[:2]

    v = np.max(im, axis=2).astype(int)
    sat = v - np.min(im, axis=2).astype(int)
    r, g = im[:, :, 2].astype(int), im[:, :, 1].astype(int)
    b = im[:, :, 0].astype(int)
    red_dom = (r > g + 22) & (r > b + 22)
    eligible = (sat < 40) & (~red_dom)  # bg-LOOKING pixels only

    # border flood: walk only eligible pixels, step gate on local delta
    STEP = 30  # sum-abs-RGB delta between 4-neighbours
    reached = np.zeros((h, w), dtype=bool)
    arr = im.astype(np.int16)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if eligible[y, x]:
                reached[y, x] = True
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if eligible[y, x] and not reached[y, x]:
                reached[y, x] = True
                q.append((x, y))
    while q:
        x, y = q.popleft()
        c = arr[y, x]
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not reached[ny, nx] and eligible[ny, nx]:
                if np.abs(arr[ny, nx] - c).sum() <= STEP:
                    reached[ny, nx] = True
                    q.append((nx, ny))

    fg = (~reached).astype(np.uint8)
    # 最大连通域
    n, labels, stats, _ = cv2.connectedComponentsWithStats(fg, 8)
    if n > 1:
        big = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
        fg = np.where(labels == big, 1, 0).astype(np.uint8)
    # 填洞(窗格等内部封闭区)
    ff = fg.copy()
    fmask = np.zeros((h + 2, w + 2), np.uint8)
    cv2.floodFill(ff, fmask, (0, 0), 1)
    fg = ((fg == 1) | (ff == 0)).astype(np.uint8)

    alpha = (fg * 255).astype(np.uint8)
    alpha = cv2.GaussianBlur(alpha, (0, 0), 0.8)
    rgba = cv2.cvtColor(im, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = alpha

    if dbg:
        vis = im.copy()
        vis[fg == 0] = (vis[fg == 0] * 0.45 + np.array([0, 0, 255]) * 0.55).astype(np.uint8)
        cv2.imwrite(dbg, vis)

    ys, xs = np.where(alpha > 8)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    rgba = rgba[y0:y1 + 1, x0:x1 + 1]
    oh, ow = rgba.shape[:2]
    side = int(max(oh, ow) / 0.84)
    canvas = np.zeros((side, side, 4), np.uint8)
    canvas[(side - oh) // 2 : (side - oh) // 2 + oh, (side - ow) // 2 : (side - ow) // 2 + ow] = rgba
    cv2.imwrite(dst, canvas)
    print(f"OK {dst} ({side}x{side})")

if __name__ == "__main__":
    main()
