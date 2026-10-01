// Christmas pattern definitions (10) — vector-authored, rasterized by engine.mjs.
// Ported up from the 16-wide originals at showpiece scale (48-56 wide).
import {
  arcPts, circle, dot, egg, ellipse, halfRingRight, leaf, ring,
  roundedPoly, roundedRect, scallopBand, sector, star, stroke,
} from './engine.mjs';

export const CHRISTMAS = [
  // ---------------- christmas-tree ----------------
  {
    slug: 'christmas-tree', name: 'Christmas Tree', category: 'christmas', difficulty: 'easy',
    W: 48, H: 58, mirror: true, singlesOk: ['R', 'b', 'T'],
    zones: {
      Y: { label: 'star', color: 'sunshine' },
      g: { label: 'light foliage', color: 'kiwi' },
      G: { label: 'dark foliage', color: 'pine' },
      R: { label: 'lights', color: 'cherry' },
      b: { label: 'baubles', color: 'light-blue' },
      T: { label: 'trunk', color: 'tan' },
    },
    tagline: 'Three tiers, two greens, lights and baubles.',
    blurb:
      'A traditional tiered tree a foot tall, with a star on top and scalloped lighter-green fringe under every tier. Lights, baubles and star are all separate regions, so the whole tree can be re-lit in your colors.',
    draw(G) {
      const cx = 24;
      G.add('T', roundedRect(21.5, 45, 5, 8, 1));
      G.add('G', roundedPoly([[cx, 25], [38, 45], [10, 45]], 1.5));
      G.add('g', scallopBand(11, 37, 43.5, 2.0, 1.4, 5));
      G.add('G', roundedPoly([[cx, 15], [34, 32], [14, 32]], 1.5));
      G.add('g', scallopBand(15.5, 32.5, 30.5, 1.8, 1.3, 4));
      G.add('G', roundedPoly([[cx, 7], [31.5, 21.5], [16.5, 21.5]], 1.5));
      G.add('g', scallopBand(18, 30, 20, 1.5, 1.1, 3));
      G.add('Y', star(cx, 4.5, 3.2, 1.4));
      for (const [x, y] of [[21, 25], [26, 27], [18, 39], [29, 40], [24, 43], [22, 18]])
        dot(G, 'R', x, y);
      for (const [x, y] of [[26, 36], [21, 33], [30, 30]])
        dot(G, 'b', x, y);
    },
  },

  // ---------------- snowman ----------------
  {
    slug: 'snowman', name: 'Snowman', category: 'christmas', difficulty: 'medium',
    W: 50, H: 62, mirror: false, singlesOk: ['E', 'R'],
    zones: {
      K: { label: 'hat & outline', color: 'black' },
      W: { label: 'snow', color: 'white' },
      E: { label: 'eyes', color: 'black' },
      O: { label: 'carrot nose', color: 'cheddar' },
      m: { label: 'mouth', color: 'black' },
      R: { label: 'scarf & buttons', color: 'cherry' },
    },
    rim: ['W', 'R'],
    tagline: 'Top hat, carrot nose, cherry scarf and buttons.',
    blurb:
      'Frosty at fridge-door scale. The carrot nose is its own region — recolor it and the whole snowman changes mood — and the scarf with its hanging tail between head and body is where a custom color pops hardest.',
    draw(G) {
      const cx = 25;
      G.add('K', roundedRect(17.5, 1.5, 15, 8.5, 1.5));
      G.add('K', roundedRect(13, 9.5, 24, 4.5, 2));
      G.add('W', circle(cx, 24, 10.5));
      dot(G, 'E', 19, 21);
      dot(G, 'E', 29, 21);
      G.add('O', roundedPoly([[25, 22.6], [33.5, 24.6], [25, 26.6]], 0.8));
      G.add('m', sector(25, 26.5, 2.0, 3.0, 32, 148));
      G.add('R', roundedRect(15.5, 33, 19, 5, 2));
      G.add('R', roundedRect(27, 38, 5.5, 10, 2));
      G.add('W', egg(cx, 48, 13.5, 11, 0.06));
      dot(G, 'R', 24, 45);
      dot(G, 'R', 24, 52);
    },
  },

  // ---------------- stocking ----------------
  {
    slug: 'stocking', name: 'Christmas Stocking', category: 'christmas', difficulty: 'medium',
    W: 54, H: 56, mirror: false, singlesOk: ['E'],
    zones: {
      K: { label: 'outline & eyes', color: 'black' },
      W: { label: 'cuff', color: 'white' },
      R: { label: 'stocking', color: 'cherry' },
      E: { label: 'eyes', color: 'black' },
      m: { label: 'mouth', color: 'black' },
    },
    rim: ['R', 'W'],
    tagline: 'White cuff, cherry body, sleeping face.',
    blurb:
      'A mantel-length stocking with the foot kicked left. The face sits on the leg section — calm, closed-eye energy — while the big white cuff is where a name initial would go in contrast beads.',
    draw(G) {
      G.add('W', roundedRect(20, 4, 24, 10, 3));
      G.add('R', roundedPoly([[21, 13], [43, 13], [43, 34], [46, 34], [46, 46], [10, 46], [10, 38], [21, 38]], 3.5));
      dot(G, 'E', 28, 24);
      dot(G, 'E', 36, 24);
      G.add('m', sector(32, 24, 2.0, 3.0, 32, 148));
    },
  },

  // ---------------- wreath ----------------
  {
    slug: 'wreath', name: 'Wreath', category: 'christmas', difficulty: 'medium',
    W: 52, H: 54, mirror: false, singlesOk: ['B'],
    zones: {
      G: { label: 'pine', color: 'pine' },
      g: { label: 'kiwi highlights', color: 'kiwi' },
      R: { label: 'bow', color: 'cherry' },
      B: { label: 'berries', color: 'cherry' },
    },
    tagline: 'Pine ring, kiwi highlights, cherry bow, berries.',
    blurb:
      'A dinner-plate ring of pine with kiwi highlight arcs, a big bow at the top and berry clusters at the bottom front. Hang it as-is or thread a ribbon through the empty center once it is ironed — the hole is structural, not a mistake.',
    draw(G) {
      const cx = 26, cy = 27;
      G.add('G', ring(cx, cy, 19.5, 12.5));
      for (const a of [30, 110, 200, 300])
        G.add('g', sector(cx, cy, 14.5, 19, a - 20, a + 20));
      G.add('R', leaf([cx - 1.5, 8.5], [cx - 10, 4], [cx - 2, 5.5], 2.2, 2.0));
      G.add('R', leaf([cx + 1.5, 8.5], [cx + 10, 4], [cx + 2, 5.5], 2.0, 2.2));
      G.add('R', ellipse(cx, 8, 2.4, 2.1));
      for (const [x, y] of [[21, 43], [26, 45], [31, 43]])
        dot(G, 'B', x, y);
    },
  },

  // ---------------- gift ----------------
  {
    slug: 'gift', name: 'Gift Box', category: 'christmas', difficulty: 'easy',
    W: 52, H: 44, mirror: true, singlesOk: ['W'],
    zones: {
      K: { label: 'outline', color: 'black' },
      R: { label: 'box', color: 'cherry' },
      Y: { label: 'ribbon & bow', color: 'sunshine' },
      W: { label: 'tag', color: 'white' },
    },
    rim: ['R', 'Y'],
    tagline: 'Cherry box, sunshine ribbon and bow, white tag.',
    blurb:
      'Straight lines, instant gratification — now big enough that the ribbon cross is a real band of beads you can recolor in one click. The white tag sits at the crossing; count from the center outward so the box stays square.',
    draw(G) {
      const cx = 26;
      G.add('R', roundedRect(7, 13, 38, 28, 3));
      G.add('Y', roundedRect(22.5, 13, 7, 28, 1.5));
      G.add('Y', roundedRect(7, 24.5, 38, 6, 1.5));
      const loop = leaf([cx - 2, 11.5], [cx - 10, 5.5], [cx - 2.5, 8], 2.2, 2.2);
      G.add('Y', loop);
      G.add('Y', loop.map(([x, y]) => [52 - x, y]));
      G.add('Y', ellipse(cx, 10.5, 2.3, 2.0));
      dot(G, 'W', 30, 23);
    },
  },

  // ---------------- gingerbread-man ----------------
  {
    slug: 'gingerbread-man', name: 'Gingerbread Man', category: 'christmas', difficulty: 'medium',
    W: 52, H: 58, mirror: true, singlesOk: ['R', 'E'],
    zones: {
      K: { label: 'outline', color: 'black' },
      L: { label: 'cookie', color: 'light-brown' },
      E: { label: 'eyes', color: 'black' },
      m: { label: 'mouth', color: 'black' },
      R: { label: 'buttons', color: 'cherry' },
    },
    rim: ['L'],
    tagline: 'Arms out, legs apart, cherry buttons, icing face.',
    blurb:
      'The cookie himself, cookie-sheet sized. The broad arm band and stubby legs iron flat in one pass, and the cherry buttons down the middle are what make him read as gingerbread.',
    draw(G) {
      const cx = 26;
      G.add('L', circle(cx, 11, 8));
      G.add('L', roundedRect(17, 17, 18, 22, 7));
      G.add('L', roundedRect(4, 19, 44, 7.5, 3.5));
      G.add('L', roundedRect(14, 37, 9.5, 17, 4.5));
      G.add('L', roundedRect(28.5, 37, 9.5, 17, 4.5));
      dot(G, 'E', 22, 10);
      dot(G, 'E', 29, 10);
      G.add('m', sector(cx, 9.5, 1.9, 2.9, 32, 148));
      dot(G, 'R', 25, 22);
      dot(G, 'R', 25, 30);
    },
  },

  // ---------------- santa-hat ----------------
  {
    slug: 'santa-hat', name: 'Santa Hat', category: 'christmas', difficulty: 'easy',
    W: 52, H: 40, mirror: false,
    zones: {
      K: { label: 'outline', color: 'black' },
      R: { label: 'hat', color: 'cherry' },
      F: { label: 'snowflake', color: 'light-blue' },
      W: { label: 'fur brim', color: 'white' },
      w: { label: 'pom pom', color: 'white' },
    },
    rim: ['R', 'W', 'w'],
    tagline: 'Cherry cone, fur brim, pom pom, light-blue snowflake.',
    blurb:
      'A quick holiday win: a curved cone that leans into the pom pom, one wide fur brim, and a light-blue snowflake decal on the side — swap the decal color for any bead you like.',
    draw(G) {
      G.add('w', circle(17.5, 6, 3.8));
      G.add('R', roundedPoly([[18, 6.5], [39, 28], [14, 28]], 3));
      G.add('W', roundedRect(9, 28, 34, 8.5, 4.2));
      G.add('F', stroke(arcPts(26, 22, 3.2, 3.6, -90, 90), 1.1));
      G.add('F', stroke([[22.3, 22], [29.7, 22]], 1.1));
    },
  },

  // ---------------- bell ----------------
  {
    slug: 'bell', name: 'Christmas Bell', category: 'christmas', difficulty: 'easy',
    W: 48, H: 46, mirror: true,
    zones: {
      h: { label: 'hanger', color: 'dark-gray' },
      K: { label: 'outline', color: 'black' },
      Y: { label: 'bell', color: 'sunshine' },
      W: { label: 'shine', color: 'white' },
      B: { label: 'rim', color: 'butternut' },
    },
    rim: ['Y', 'B', 'h'],
    tagline: 'Sunshine bell, shine streak, butternut rim.',
    blurb:
      'A bell that flares as it goes down, ending in a darker gold rim band. The white shine streak on the left edge is what makes it look round — keep it one bead wide so the flare stays clean.',
    draw(G) {
      const cx = 24;
      G.add('h', roundedRect(cx - 2.2, 2, 4.4, 5, 1.2));
      G.add('Y', roundedPoly([[15.5, 10.5], [32.5, 10.5], [41, 33], [7, 33]], 7));
      G.add('W', ellipse(16, 22, 1.7, 7.0), 'Y');
      G.add('B', roundedRect(6.5, 32.5, 35, 5.5, 2.5));
    },
  },

  // ---------------- reindeer ----------------
  {
    slug: 'reindeer', name: 'Reindeer', category: 'christmas', difficulty: 'medium',
    W: 56, H: 52, mirror: true, singlesOk: ['e'],
    zones: {
      A: { label: 'antlers', color: 'butternut' },
      K: { label: 'outline', color: 'black' },
      B: { label: 'head', color: 'brown' },
      L: { label: 'inner ears', color: 'light-brown' },
      E: { label: 'eyes', color: 'black' },
      e: { label: 'eye shine', color: 'white' },
      W: { label: 'muzzle', color: 'cream' },
      N: { label: 'nose', color: 'cherry' },
    },
    rim: ['B', 'L', 'A', 'W'],
    tagline: 'Butternut antlers, brown head, cherry nose.',
    blurb:
      'A friendly reindeer face with broad swept-back branch antlers and a cream muzzle, sized for the mantel. The nose is its own region — keep it cherry for the classic look, or go black-nose for a more realistic doe.',
    draw(G) {
      const cx = 28;
      for (const m of [1, -1]) {
        const M = (poly) => poly.map(([x, y]) => [m > 0 ? x : 56 - x, y]);
        G.add('A', M(stroke([[15, 21], [12.5, 8]], 1.7)));
        G.add('A', M(stroke([[14, 14.5], [8, 10.5]], 1.4)));
        G.add('A', M(stroke([[13.5, 19], [7.5, 17.5]], 1.4)));
        G.add('B', M(leaf([9.5, 27], [3.5, 16], [16, 22.5], 2.4, 3.2)));
        G.add('L', M(leaf([10.5, 26], [5.5, 17.5], [15, 23], 1.5, 2.0)));
      }
      G.add('B', egg(cx, 33, 17, 15.5, 0.08));
      for (const ex of [20.5, 35.5]) {
        G.add('E', ellipse(ex, 30.5, 2.3, 2.9));
        G.add('e', ellipse(ex - 0.8, 29.3, 0.8, 1.0));
      }
      G.add('W', egg(cx, 41.5, 11, 6.5, 0.05));
      G.add('N', ellipse(cx, 39.5, 2.9, 2.3));
    },
  },

  // ---------------- hot-cocoa ----------------
  {
    slug: 'hot-cocoa', name: 'Hot Cocoa Mug', category: 'christmas', difficulty: 'medium',
    W: 50, H: 54, mirror: false, singlesOk: ['s', 'W', 'E'],
    zones: {
      s: { label: 'steam', color: 'light-gray' },
      K: { label: 'outline', color: 'black' },
      C: { label: 'cocoa', color: 'brown' },
      W: { label: 'marshmallows & base', color: 'white' },
      M: { label: 'mug', color: 'cherry' },
      E: { label: 'eyes', color: 'black' },
      m: { label: 'mouth', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['M', 'W', 'C'],
    tagline: 'Steam wisps, marshmallows, a cherry mug with a face.',
    blurb:
      'A cozy two-hand-wide mug with steam wisps floating above and marshmallows melting into the cocoa. Eight regions including the steam — recolor the mug itself and the whole winter kitchen changes.',
    draw(G) {
      const cx = 25;
      G.add('s', stroke(arcPts(20, 10, 1.6, 3.4, 100, 320), 1.3));
      G.add('s', stroke(arcPts(30, 12, 1.6, 3.4, 120, 340), 1.3));
      G.add('M', halfRingRight(41.5, 30, 5.8, 6.5, 3.2, 3.9));
      G.add('M', roundedRect(8.5, 17, 33, 25, 4));
      G.add('C', ellipse(cx, 17.5, 16, 4.6));
      G.add('W', roundedRect(17, 15.2, 6.5, 4.2, 2), 'C');
      G.add('W', roundedRect(28, 16.4, 6, 3.6, 1.8), 'C');
      G.add('W', roundedRect(9, 38, 32, 4.2, 2));
      dot(G, 'E', 19, 26);
      dot(G, 'E', 31, 26);
      G.add('m', sector(cx, 27, 2.0, 3.0, 32, 148));
      G.add('P', ellipse(13, 30, 2.4, 1.7));
      G.add('P', ellipse(37, 30, 2.4, 1.7));
    },
  },
];
