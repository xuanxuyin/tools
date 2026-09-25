// Halloween pattern definitions (6) — vector-authored, rasterized by engine.mjs.
// Ported up from the 16-wide originals: same zones and copy ideas, real curves,
// showpiece scale (52-56 wide). Motifs stay generic — no horror-IP anywhere.
import {
  arcPts, arcSide, banana, circle, egg, ellipse, rot, roundedPoly,
  roundedRect, sector, stroke,
} from './engine.mjs';

export const HALLOWEEN = [
  // ---------------- ghost ----------------
  {
    slug: 'ghost', name: 'Ghost', category: 'halloween', difficulty: 'easy',
    W: 52, H: 56, mirror: true,
    zones: {
      K: { label: 'outline', color: 'black' },
      W: { label: 'body', color: 'white' },
      E: { label: 'eyes', color: 'black' },
      m: { label: 'mouth', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['W'],
    tagline: 'White dome, scalloped hem, blushing cheeks.',
    blurb:
      'The friendliest ghost on the pegboard, now the width of a sheet of paper. The hem is four true scallops — iron gently so the single-bead tips stay crisp — and the surprised little "oo" mouth plus blush are their own regions, so you can restyle the face without touching the sheet.',
    draw(G) {
      const cx = 26, xl = 13, xr = 39, yB = 22, yH = 46;
      const body = [[xl, yH], [xl, yB], ...arcPts(cx, yB, 13, 18, 180, 360, 26), [xr, yB], [xr, yH]];
      for (let i = 0; i < 4; i++) {
        const xa = xr - ((xr - xl) * i) / 4, xb = xr - ((xr - xl) * (i + 1)) / 4;
        body.push(...arcSide([xa, yH], [xb, yH], 0, 1, 2.8, 10));
      }
      G.add('W', body);
      G.add('E', ellipse(21, 26, 1.7, 2.3));
      G.add('E', ellipse(31, 26, 1.7, 2.3));
      G.add('m', ellipse(cx, 33.5, 2.4, 3.2));
      G.add('P', ellipse(16.5, 31, 2.4, 1.7));
      G.add('P', ellipse(35.5, 31, 2.4, 1.7));
    },
  },

  // ---------------- jack-o-lantern ----------------
  {
    slug: 'jack-o-lantern', name: 'Jack-o’-Lantern', category: 'halloween', difficulty: 'medium',
    W: 52, H: 48, mirror: true,
    zones: {
      K: { label: 'outline', color: 'black' },
      O: { label: 'pumpkin', color: 'cheddar' },
      r: { label: 'ribs', color: 'rust' },
      G: { label: 'stem', color: 'bright-green' },
      E: { label: 'eyes', color: 'black' },
      m: { label: 'mouth', color: 'black' },
    },
    rim: ['O', 'G'],
    tagline: 'Cheddar pumpkin, rust ribs, its own face regions.',
    blurb:
      'A porch-size jack-o’-lantern with real rust ribs curving down the sides and a carved face — triangle eyes and a four-tooth zigzag grin — as separate regions, not just outline. Swap the eyes to sunshine or the grin to glow-green and it is a different lantern with two clicks.',
    draw(G) {
      const cx = 26;
      G.add('G', roundedRect(23.5, 3.5, 5, 12.5, 1.6));
      G.add('O', ellipse(cx, 30, 19, 15.5));
      G.addM('r', banana([18, 18], [17, 43], 1.7, 1.7), 'O');
      G.addM('E', roundedPoly([[18.5, 21.5], [13.5, 29.5], [23.5, 29.5]], 1));
      G.add('m', roundedPoly([
        [13, 36.5], [16.5, 32.5], [19.5, 36], [22.5, 32.5], [26, 36],
        [29.5, 32.5], [32.5, 36], [35.5, 32.5], [39, 36.5], [36, 43], [16, 43],
      ], 0.8));
    },
  },

  // ---------------- bat ----------------
  {
    slug: 'bat', name: 'Bat', category: 'halloween', difficulty: 'easy',
    W: 56, H: 44, mirror: false,
    zones: {
      M: { label: 'moon', color: 'butternut' },
      K: { label: 'wings & ears', color: 'black' },
      V: { label: 'body', color: 'purple' },
      e: { label: 'eyes', color: 'white' },
      W: { label: 'fangs', color: 'white' },
    },
    tagline: 'Scalloped wings, plum body, butternut moon behind.',
    blurb:
      'One solid wing shape with scalloped membranes, a purple body patch and a crescent moon peeking in from the corner. The white eyes and tiny fangs sit on the dark field — swap them for sunshine if you want the radioactive variant.',
    draw(G) {
      // crescent moon lying along the top edge, above the wing's diagonal
      G.add('M', [...arcSide([42.5, 1.5], [55, 1], 0, 1, 3.4, 18), ...arcSide([55, 1], [42.5, 1.5], 0, 1, 1.2, 18)]);
      // left wing: shoulder → tip, scalloped bottom edge back to the body
      const wing = [
        ...arcSide([21, 14], [4, 4.5], 0, -1, 1.2, 16),
        [1.5, 15],
        ...arcSide([1.5, 15], [9, 23], 0, -1, 2.4, 12),
        ...arcSide([9, 23], [16.5, 27.5], 0, -1, 2.2, 10),
        ...arcSide([16.5, 27.5], [22, 22], 0, -1, 2.0, 8),
        [21, 14],
      ];
      G.add('K', wing);
      G.add('K', wing.map(([x, y]) => [56 - x, y]));
      const ear = roundedPoly([[23, 13], [20.5, 3.5], [26.5, 10.5]], 0.8);
      G.add('K', ear);
      G.add('K', ear.map(([x, y]) => [56 - x, y]));
      G.add('V', egg(28, 22, 8.5, 10.5, 0.08));
      G.add('e', ellipse(24.5, 19, 1.6, 2.1));
      G.add('e', ellipse(31.5, 19, 1.6, 2.1));
      const fang = roundedPoly([[25, 27], [24.2, 30.8], [25.8, 30.8]], 0.5);
      G.add('W', fang);
      G.add('W', fang.map(([x, y]) => [56 - x, y]));
    },
  },

  // ---------------- skull ----------------
  {
    slug: 'skull', name: 'Skull', category: 'halloween', difficulty: 'medium',
    W: 52, H: 50, mirror: true,
    zones: {
      K: { label: 'jaw & gaps', color: 'black' },
      W: { label: 'cranium', color: 'white' },
      E: { label: 'eye sockets', color: 'black' },
      N: { label: 'nose', color: 'black' },
      m: { label: 'teeth', color: 'white' },
    },
    rim: ['W'],
    tagline: 'Rounded cranium, recolorable sockets, toothy grin.',
    blurb:
      'White on black with a real dental grid for the jaw. The eye sockets are their own region — fill them lavender or light-blue for a crystal-skull look that still reads from across the room. Four teeth, three gaps, one straight iron pass.',
    draw(G) {
      const cx = 26;
      G.add('W', egg(cx, 19, 17, 14.5, 0.02));
      G.addM('E', rot(ellipse(19.5, 19, 3.7, 4.4), 19.5, 19, 12));
      G.add('N', roundedPoly([[cx, 24], [23.2, 29], [28.8, 29]], 0.7));
      G.add('K', roundedRect(16.5, 31, 19, 13, 4));
      for (const x of [17.7, 22.2, 26.7, 31.2])
        G.add('m', roundedRect(x, 33, 3.2, 9, 1.2));
    },
  },

  // ---------------- candy-corn ----------------
  {
    slug: 'candy-corn', name: 'Candy Corn', category: 'halloween', difficulty: 'easy',
    W: 52, H: 50, mirror: true,
    zones: {
      K: { label: 'outline', color: 'black' },
      W: { label: 'tip', color: 'white' },
      O: { label: 'middle', color: 'cheddar' },
      Y: { label: 'base', color: 'sunshine' },
    },
    rim: ['W', 'O', 'Y'],
    tagline: 'White tip, cheddar middle, sunshine base.',
    blurb:
      'The seasonal shape study at banner size: one rounded triangle in three clean color bands, which teaches exactly how banding works on a pegboard. The bands are separate regions edge to edge — make several in swapped palettes and string them into a garland.',
    draw(G) {
      G.add('Y', roundedPoly([[26, 4], [44, 45], [8, 45]], 8));
      G.add('O', roundedPoly([[26, 4], [38, 31], [14, 31]], 5.5));
      G.add('W', roundedPoly([[26, 4], [33, 19.5], [19, 19.5]], 4));
    },
  },

  // ---------------- spider ----------------
  {
    slug: 'spider', name: 'Cute Spider', category: 'halloween', difficulty: 'medium',
    W: 56, H: 56, mirror: true,
    zones: {
      K: { label: 'legs', color: 'black' },
      V: { label: 'body', color: 'purple' },
      R: { label: 'hourglass', color: 'cherry' },
      e: { label: 'eyes', color: 'white' },
      m: { label: 'mouth', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    tagline: 'Plum body, cherry hourglass, eight curvy legs.',
    blurb:
      'A round plum spider with real bent legs — each leg is one stroke with a knee and a foot, so the silhouette actually poses instead of sprouting sticks. The cherry hourglass marking is its own region: recolor it away for a plain friendly spider, or give the eyes pupils for extra charm.',
    draw(G) {
      const cx = 28;
      const legs = [
        [[18, 24], [6, 14], [4, 26]],
        [[17, 29], [1, 22], [1.5, 37]],
        [[18, 34], [2, 34], [4, 49]],
        [[20, 38], [9, 44], [12, 55]],
      ];
      for (const leg of legs) G.addM('K', stroke(leg, 2.0));
      G.add('V', circle(cx, 31, 12.5));
      G.add('e', ellipse(23.5, 23.5, 1.8, 2.4));
      G.add('e', ellipse(32.5, 23.5, 1.8, 2.4));
      G.add('m', sector(cx, 27.6, 0.4, 3.0, 30, 150));
      G.add('R', roundedPoly([[25, 32.5], [31, 32.5], [cx, 36]], 0.8));
      G.add('R', roundedPoly([[25, 41], [31, 41], [cx, 37.5]], 0.8));
      G.add('P', ellipse(18.5, 28, 2.2, 1.5));
      G.add('P', ellipse(37.5, 28, 2.2, 1.5));
    },
  },
];
