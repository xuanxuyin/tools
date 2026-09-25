// Animal pattern definitions (12) — vector-authored, rasterized by engine.mjs.
// Every species is composed from the same face kit (head egg, layered eyes,
// muzzle block, blush) plus species-specific shapes; the unicorn below is the
// v5 pilot ported verbatim from tmp/gen-v5-uni.mjs.
import {
  arcSide, banana, circle, egg, eggRingRight, ellipse, halfRingBottom,
  halfRingLeft, halfRingRight, heart, leaf, rot, scallopBand, sector, stroke,
} from './engine.mjs';

// ---------- shared face kit ----------
// layered eye: black frame + iris + bottom depth + top-left shine
function eyeBig(G, ex, ey, z) {
  G.add(z.frame, ellipse(ex, ey, 3.6, 4.4));
  G.add(z.iris, ellipse(ex, ey, 2.8, 3.6));
  G.add(z.depth, halfRingBottom(ex, ey, 2.8, 3.6, 1.9, 2.6));
  G.add(z.shine, ellipse(ex - 1.2, ey - 1.9, 1.0, 1.3));
}
// simple eye: black disc + shine
function eyeSimple(G, ex, ey, z) {
  G.add(z.frame, ellipse(ex, ey, 2.5, 3.1));
  G.add(z.shine, ellipse(ex - 0.8, ey - 1.3, 0.85, 1.1));
}
// muzzle block: fill + chin shade + nostrils + smile (unicorn style)
function muzzle(G, cx, cy, z, rx = 9.8, ry = 5.6) {
  G.add(z.fill, ellipse(cx, cy, rx, ry));
  G.add(z.shade, halfRingBottom(cx, cy, rx, ry, rx - 1.1, ry - 1.0));
  G.add(z.nostril, ellipse(cx - 2.8, cy - 2.4, 1.0, 0.7));
  G.add(z.nostril, ellipse(cx + 2.8, cy - 2.4, 1.0, 0.7));
  G.add(z.mouth, sector(cx, cy - 1.4, rx * 0.32, rx * 0.43, 25, 155));
}
// heart nose + philtrum + smile (cat/bunny/dog/bear)
function noseMouth(G, cx, cy, z, s = 0.11) {
  G.add(z.nose, heart(cx, cy, s));
  G.add(z.mouth, stroke([[cx, cy + s * 12], [cx, cy + s * 12 + 1.6]], 0.7));
  G.add(z.mouth, sector(cx, cy + s * 5, s * 26, s * 34, 30, 150));
}

export const ANIMALS = [
  // ---------------- cat ----------------
  {
    slug: 'cat', name: 'Cat', category: 'animals', difficulty: 'easy',
    W: 56, H: 48, mirror: true, singlesOk: ['e'],
    zones: {
      K: { label: 'outline', color: 'black' },
      O: { label: 'fur', color: 'cheddar' },
      o: { label: 'tabby stripes', color: 'rust' },
      I: { label: 'inner ears', color: 'blush' },
      E: { label: 'eyes', color: 'black' },
      e: { label: 'eye shine', color: 'white' },
      P: { label: 'blush', color: 'blush' },
      W: { label: 'muzzle', color: 'white' },
      N: { label: 'nose', color: 'pink' },
      M: { label: 'mouth', color: 'black' },
    },
    rim: ['O', 'I'],
    tagline: 'A big tabby face with forehead stripes and a white muzzle.',
    blurb:
      'The classic starter showpiece: a round tabby face about 11 inches wide across two interlocking pegboards. Ten separately recolorable zones — swap the cheddar fur for gray and it is a silver tabby, or restyle the stripes without touching anything else.',
    draw(G) {
      const cx = 28;
      G.add('O', egg(cx, 27, 19.5, 17, 0.1));
      for (const m of [1, -1]) {
        const M = (poly) => poly.map(([x, y]) => [m > 0 ? x : 56 - x, y]);
        G.add('O', M(leaf([13.5, 17.5], [7, 4], [19, 13.5], 1.6, 2.6)));
        G.add('I', M(leaf([15.2, 16.4], [10.5, 7.6], [17.8, 14.2], 1.1, 1.7)));
      }
      // tabby forehead M + cheek stripes
      for (const [x0, x1] of [[25.6, 24.7], [28, 28], [30.4, 31.3]])
        G.add('o', banana([x0, 17.2], [x1, 22.2], 1.05, 1.05), 'O');
      for (const m of [1, -1])
        G.add('o', banana([m > 0 ? 12.5 : 43.5, 29.5], [m > 0 ? 16.5 : 39.5, 29.5], 0.9, 0.9), 'O');
      eyeSimple(G, 20, 28, { frame: 'E', shine: 'e' });
      eyeSimple(G, 36, 28, { frame: 'E', shine: 'e' });
      G.add('P', ellipse(13.5, 33.5, 2.8, 1.9));
      G.add('P', ellipse(42.5, 33.5, 2.8, 1.9));
      G.add('W', ellipse(cx, 38, 8.8, 5.2));
      noseMouth(G, cx, 35.4, { nose: 'N', mouth: 'M' }, 0.105);
    },
  },

  // ---------------- bunny ----------------
  {
    slug: 'bunny', name: 'Bunny', category: 'animals', difficulty: 'easy',
    W: 56, H: 58, mirror: true, singlesOk: ['e'],
    zones: {
      K: { label: 'outline', color: 'black' },
      W: { label: 'fur', color: 'white' },
      f: { label: 'fur shading', color: 'light-gray' },
      I: { label: 'inner ears', color: 'pink' },
      E: { label: 'eyes', color: 'black' },
      e: { label: 'eye shine', color: 'white' },
      N: { label: 'nose', color: 'pink' },
      M: { label: 'mouth', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['W', 'f', 'I'],
    tagline: 'Tall shaded ears, blush cheeks, and a pink heart nose.',
    blurb:
      'A white bunny face that works up in one sitting at showpiece scale — the long ears alone are worth framing. The light-gray shading crescent keeps the face from going flat when you recolor the fur.',
    draw(G) {
      const cx = 28;
      G.add('W', egg(cx, 37, 18.5, 16, 0.12));
      G.add('f', eggRingRight(cx, 37, 18.5, 16, 0.12, 2.0));
      for (const m of [1, -1]) {
        const M = (poly) => poly.map(([x, y]) => [m > 0 ? x : 56 - x, y]);
        G.add('W', M(banana([21, 25], [17, 3.5], 3.1, 2.6)));
        G.add('I', M(banana([21, 23.5], [17.7, 6], 1.8, 1.5)));
      }
      eyeSimple(G, 21, 37, { frame: 'E', shine: 'e' });
      eyeSimple(G, 35, 37, { frame: 'E', shine: 'e' });
      G.add('P', ellipse(16.5, 43, 2.8, 1.9));
      G.add('P', ellipse(39.5, 43, 2.8, 1.9));
      noseMouth(G, cx, 41.5, { nose: 'N', mouth: 'M' }, 0.105);
    },
  },

  // ---------------- panda ----------------
  {
    slug: 'panda', name: 'Panda', category: 'animals', difficulty: 'easy',
    W: 56, H: 48, mirror: true, singlesOk: ['E'],
    zones: {
      K: { label: 'outline', color: 'black' },
      W: { label: 'face', color: 'white' },
      A: { label: 'ears & patches', color: 'black' },
      E: { label: 'pupils', color: 'white' },
      N: { label: 'nose', color: 'black' },
      M: { label: 'mouth', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['W'], rimAgainst: { W: ['A'] },
    tagline: 'Black patches on a wide white face — five zones, endless restyles.',
    blurb:
      'The friendliest low-fuss showpiece there is. The tilted eye patches, round ears, nose and mouth are separate regions, so you can go "blue-eyed panda" or "plum patches" without touching the white face.',
    draw(G) {
      const cx = 28;
      G.add('A', circle(11.5, 14, 5.4));
      G.add('A', circle(44.5, 14, 5.4));
      G.add('W', egg(cx, 28, 20, 17.5, 0.08));
      G.add('A', rot(ellipse(19.5, 29, 4.4, 5.9), 19.5, 29, 18));
      G.add('A', rot(ellipse(36.5, 29, 4.4, 5.9), 36.5, 29, -18));
      G.add('E', circle(20.2, 28.4, 1.5));
      G.add('E', circle(35.8, 28.4, 1.5));
      G.add('N', heart(cx, 35.2, 0.105));
      G.add('M', stroke([[cx, 37.5], [cx, 39]], 0.8));
      G.add('M', sector(cx, 36.4, 3.0, 3.9, 30, 150));
      G.add('P', ellipse(11.5, 34.5, 2.7, 1.8));
      G.add('P', ellipse(44.5, 34.5, 2.7, 1.8));
    },
  },

  // ---------------- fox ----------------
  {
    slug: 'fox', name: 'Fox', category: 'animals', difficulty: 'medium',
    W: 56, H: 50, mirror: true, singlesOk: ['e'],
    zones: {
      K: { label: 'outline', color: 'black' },
      O: { label: 'fur', color: 'cheddar' },
      I: { label: 'inner ears', color: 'white' },
      E: { label: 'eyes', color: 'black' },
      e: { label: 'eye shine', color: 'white' },
      W: { label: 'cheeks & muzzle', color: 'white' },
      N: { label: 'nose', color: 'black' },
      M: { label: 'mouth', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['O', 'I'],
    tagline: 'Big pointy ears over a white cheek mask — cheddar and cream.',
    blurb:
      'A sly little fox at scale. The white mask is clipped to the head shape so its top edge sweeps like a real fox cheek, and the wide white inner ears are what keep it reading "fox" rather than "cat" from across the room.',
    draw(G) {
      const cx = 28;
      G.add('O', egg(cx, 28, 19, 16.5, 0.12));
      for (const m of [1, -1]) {
        const M = (poly) => poly.map(([x, y]) => [m > 0 ? x : 56 - x, y]);
        G.add('O', M(leaf([10.5, 20.5], [4, 3.5], [16.5, 14.5], 1.8, 3.0)));
        G.add('I', M(leaf([12, 18.8], [7.2, 6.5], [15.2, 15.6], 1.3, 2.0)));
      }
      G.add('W', egg(cx, 33.5, 15.5, 10, 0.05), 'O');
      eyeSimple(G, 20.5, 28, { frame: 'E', shine: 'e' });
      eyeSimple(G, 35.5, 28, { frame: 'E', shine: 'e' });
      G.add('N', heart(cx, 35.6, 0.125));
      G.add('M', sector(cx, 35, 3.4, 4.2, 28, 152));
      G.add('P', ellipse(14.5, 36.5, 2.6, 1.8));
      G.add('P', ellipse(41.5, 36.5, 2.6, 1.8));
    },
  },

  // ---------------- owl ----------------
  {
    slug: 'owl', name: 'Owl', category: 'animals', difficulty: 'medium',
    W: 56, H: 54, mirror: true, singlesOk: ['e'],
    zones: {
      K: { label: 'outline', color: 'black' },
      B: { label: 'body', color: 'brown' },
      D: { label: 'wings', color: 'dark-brown' },
      W: { label: 'eye discs', color: 'white' },
      E: { label: 'pupils', color: 'black' },
      e: { label: 'eye shine', color: 'white' },
      Y: { label: 'beak', color: 'sunshine' },
      C: { label: 'belly', color: 'cream' },
      T: { label: 'feather rows', color: 'tan' },
    },
    rim: ['B'],
    tagline: 'Huge eye discs, a sunshine beak, cream belly with feather rows.',
    blurb:
      'A round owl with mask-like discs — the white plates plus black pupils do the wide-eyed work. Wings fold in as a darker crescent on each side, and the belly carries two scalloped feather rows you can recolor as one zone.',
    draw(G) {
      const cx = 28;
      G.add('B', egg(cx, 30, 19, 21.5, 0.05));
      for (const m of [1, -1]) {
        const M = (poly) => poly.map(([x, y]) => [m > 0 ? x : 56 - x, y]);
        G.add('B', M(leaf([16, 15], [13, 6.5], [20.5, 12], 1.3, 2.0)));
      }
      G.add('D', halfRingLeft(cx, 30, 19, 21.5, 14, 16.5));
      G.add('D', halfRingRight(cx, 30, 19, 21.5, 14, 16.5));
      for (const ex of [19.5, 36.5]) {
        G.add('W', circle(ex, 23, 7));
        G.add('E', circle(ex, 23, 3.1));
        G.add('e', ellipse(ex - 1.2, 21.2, 1.0, 1.3));
      }
      G.add('Y', banana([cx, 28.5], [cx, 35], 1.6, 1.6));
      G.add('C', egg(cx, 40, 12.5, 9.5, 0.08), 'B');
      G.add('T', scallopBand(19, 37, 43, 1.7, 1.0, 3), 'C');
      G.add('T', scallopBand(20.5, 35.5, 47, 1.5, 0.9, 3), 'C');
    },
  },

  // ---------------- penguin ----------------
  {
    slug: 'penguin', name: 'Penguin', category: 'animals', difficulty: 'easy',
    W: 56, H: 56, mirror: true, dropSingles: ['K', 'k'], singlesOk: ['e'],
    zones: {
      K: { label: 'body & outline', color: 'black' },
      k: { label: 'flippers', color: 'dark-gray' },
      W: { label: 'face & belly', color: 'white' },
      E: { label: 'eyes', color: 'black' },
      e: { label: 'eye shine', color: 'white' },
      O: { label: 'beak & feet', color: 'cheddar' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['K', 'k', 'O'],
    tagline: 'A full-body chick with flippers out and cheddar feet.',
    blurb:
      'The only full-body animal in the set, built as one tall egg with dark-gray flippers folded along the sides. Face and belly are two white patches clipped inside the body, so the silhouette stays perfectly smooth.',
    draw(G) {
      const cx = 28;
      G.add('k', banana([13.5, 24], [9.5, 38], 2.2, 2.0));
      G.add('k', banana([42.5, 24], [46.5, 38], 2.2, 2.0));
      G.add('K', egg(cx, 30, 16.5, 23, 0.03));
      G.add('W', egg(cx, 17, 12.5, 9, 0.1), 'K');
      eyeSimple(G, 22, 16, { frame: 'E', shine: 'e' });
      eyeSimple(G, 34, 16, { frame: 'E', shine: 'e' });
      G.add('O', banana([cx, 18.5], [cx, 23], 1.5, 1.5));
      G.add('P', ellipse(18.5, 19.5, 2.4, 1.6));
      G.add('P', ellipse(37.5, 19.5, 2.4, 1.6));
      G.add('W', egg(cx, 37, 11, 10.5, 0.06), 'K');
      G.add('O', ellipse(21, 53.5, 3.2, 2.0));
      G.add('O', ellipse(35, 53.5, 3.2, 2.0));
    },
  },

  // ---------------- dog ----------------
  {
    slug: 'dog', name: 'Dog', category: 'animals', difficulty: 'medium',
    W: 56, H: 52, mirror: false, singlesOk: ['e'],
    zones: {
      K: { label: 'outline', color: 'black' },
      F: { label: 'face', color: 'cream' },
      R: { label: 'ears', color: 'light-brown' },
      r: { label: 'eye patch', color: 'light-brown' },
      E: { label: 'eyes', color: 'black' },
      e: { label: 'eye shine', color: 'white' },
      W: { label: 'muzzle', color: 'white' },
      N: { label: 'nose', color: 'black' },
      M: { label: 'mouth', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['F', 'R'], rimAgainst: { F: ['R'] },
    tagline: 'Floppy ears around a cream face, one patch over the eye.',
    blurb:
      'A puppy with long ears that drape over the face edges and a light-brown patch over one eye — the asymmetry is the charm. The patch, ears, muzzle and nose are all separate zones, so the "spot pattern" is yours to redesign.',
    draw(G) {
      const cx = 28;
      G.add('F', egg(cx, 27, 18, 16, 0.1));
      G.add('R', banana([14.5, 11.5], [9, 38], 4.2, 3.6));
      G.add('R', banana([41.5, 11.5], [47, 38], 4.2, 3.6));
      G.add('r', ellipse(19.5, 24.5, 4.2, 4.8), 'F');
      eyeSimple(G, 20, 26.5, { frame: 'E', shine: 'e' });
      eyeSimple(G, 36, 26.5, { frame: 'E', shine: 'e' });
      G.add('P', ellipse(13.5, 32.5, 2.6, 1.8));
      G.add('P', ellipse(42.5, 32.5, 2.6, 1.8));
      G.add('W', ellipse(cx, 36.5, 9.2, 5.6));
      G.add('N', heart(cx, 34.2, 0.115));
      G.add('M', stroke([[cx, 35.8], [cx, 37.4]], 0.7));
      G.add('M', sector(cx, 34.8, 3.1, 4.0, 30, 150));
    },
  },

  // ---------------- bear ----------------
  {
    slug: 'bear', name: 'Bear', category: 'animals', difficulty: 'easy',
    W: 56, H: 48, mirror: true, singlesOk: ['e'],
    zones: {
      K: { label: 'outline', color: 'black' },
      B: { label: 'head & ears', color: 'brown' },
      o: { label: 'shading', color: 'light-brown' },
      L: { label: 'inner ears', color: 'cream' },
      E: { label: 'eyes', color: 'black' },
      e: { label: 'eye shine', color: 'white' },
      W: { label: 'muzzle', color: 'cream' },
      N: { label: 'nose', color: 'black' },
      M: { label: 'mouth', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['B', 'L'],
    tagline: 'Round ears, a wide cream muzzle, sit-down-and-stay size.',
    blurb:
      'A chunky bear face that irons flat and fast. The muzzle is a cream panel inside the brown head with a light-brown shading crescent on the right — swap the brown for gray and it is a teddy in a different coat.',
    draw(G) {
      const cx = 28;
      G.add('B', egg(cx, 28, 19.5, 17, 0.08));
      G.add('B', circle(12.5, 13.5, 5.5));
      G.add('B', circle(43.5, 13.5, 5.5));
      G.add('L', circle(12.5, 13.5, 2.9));
      G.add('L', circle(43.5, 13.5, 2.9));
      G.add('o', eggRingRight(cx, 28, 19.5, 17, 0.08, 2.0));
      eyeSimple(G, 20.5, 27.5, { frame: 'E', shine: 'e' });
      eyeSimple(G, 35.5, 27.5, { frame: 'E', shine: 'e' });
      G.add('P', ellipse(13.5, 33.5, 2.7, 1.8));
      G.add('P', ellipse(42.5, 33.5, 2.7, 1.8));
      G.add('W', ellipse(cx, 37, 9.8, 6.2));
      G.add('N', heart(cx, 34.6, 0.12));
      G.add('M', stroke([[cx, 36.2], [cx, 37.8]], 0.7));
      G.add('M', sector(cx, 35.6, 3.2, 4.1, 30, 150));
    },
  },

  // ---------------- frog ----------------
  {
    slug: 'frog', name: 'Frog', category: 'animals', difficulty: 'easy',
    W: 56, H: 44, mirror: true, singlesOk: ['e', 'N'],
    zones: {
      K: { label: 'outline', color: 'black' },
      G: { label: 'face', color: 'bright-green' },
      J: { label: 'chin band', color: 'mint' },
      W: { label: 'eye whites', color: 'white' },
      E: { label: 'pupils', color: 'black' },
      e: { label: 'eye shine', color: 'white' },
      N: { label: 'nostrils', color: 'black' },
      M: { label: 'smile', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['G', 'J', 'W'],
    tagline: 'Eyes perched on crown bumps, a mint chin, a two-ear grin.',
    blurb:
      'The eyes sit on round bumps above the head — that is the whole frog trick. The smile is a single long stroke arc you can recolor or thicken, and the mint chin band keeps the wide face from feeling flat.',
    draw(G) {
      const cx = 28;
      G.add('G', egg(cx, 29, 21, 14.5, 0.05));
      G.add('G', circle(15.5, 12.5, 5));
      G.add('G', circle(40.5, 12.5, 5));
      G.add('W', circle(15.5, 12.2, 3.9));
      G.add('W', circle(40.5, 12.2, 3.9));
      G.add('E', circle(15.5, 12.4, 2.0));
      G.add('E', circle(40.5, 12.4, 2.0));
      G.add('e', ellipse(14.6, 11.3, 0.8, 1.0));
      G.add('e', ellipse(39.6, 11.3, 0.8, 1.0));
      G.add('J', ellipse(cx, 36, 16, 6.5), 'G');
      G.add('N', ellipse(25.5, 23.5, 0.95, 0.75));
      G.add('N', ellipse(30.5, 23.5, 0.95, 0.75));
      G.add('M', stroke(arcPtsEngine(cx, 25.5, 15.5, 16.5, 35, 145), 1.3));
      G.add('P', ellipse(10, 31, 2.6, 1.8));
      G.add('P', ellipse(46, 31, 2.6, 1.8));
    },
  },

  // ---------------- chick ----------------
  {
    slug: 'chick', name: 'Chick', category: 'animals', difficulty: 'easy',
    W: 56, H: 46, mirror: true, singlesOk: ['e'],
    zones: {
      K: { label: 'outline', color: 'black' },
      Y: { label: 'body', color: 'sunshine' },
      y: { label: 'shading', color: 'butternut' },
      O: { label: 'beak & sprout', color: 'cheddar' },
      E: { label: 'eyes', color: 'black' },
      e: { label: 'eye shine', color: 'white' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['Y'],
    tagline: 'A sunshine puff with folded wings and a cheddar beak.',
    blurb:
      'One round yellow mass, two bead eyes, one beak — the fastest gift in the set, scaled up to a real piece. The cheddar wing crescents and the little sprout on top of the head are what keep it from reading as a plain circle.',
    draw(G) {
      const cx = 28;
      G.add('Y', egg(cx, 27, 18.5, 16, 0.07));
      G.add('y', eggRingRight(cx, 27, 18.5, 16, 0.07, 2.0));
      G.add('O', leaf([11.5, 23.5], [13.5, 33], [17.5, 26.5], 1.6, 2.0), 'Y');
      G.add('O', leaf([44.5, 23.5], [42.5, 33], [38.5, 26.5], 1.6, 2.0), 'Y');
      G.add('O', stroke([[27, 11.8], [26, 8.5]], 0.8));
      G.add('O', stroke([[29, 11.8], [30.5, 8.5]], 0.8));
      eyeSimple(G, 21, 26.5, { frame: 'E', shine: 'e' });
      eyeSimple(G, 35, 26.5, { frame: 'E', shine: 'e' });
      G.add('O', leaf([25.8, 31.5], [cx, 34.8], [30.2, 31.5], 1.3, 1.3));
      G.add('P', ellipse(13, 31, 2.5, 1.7));
      G.add('P', ellipse(43, 31, 2.5, 1.7));
    },
  },

  // ---------------- dinosaur ----------------
  {
    slug: 'dinosaur', name: 'Dinosaur', category: 'animals', difficulty: 'medium',
    W: 56, H: 56, mirror: true, singlesOk: ['e', 'N'],
    zones: {
      K: { label: 'outline', color: 'black' },
      G: { label: 'body', color: 'bright-green' },
      g: { label: 'shading', color: 'pine' },
      S: { label: 'spikes', color: 'sunshine' },
      C: { label: 'belly', color: 'cream' },
      E: { label: 'eyes', color: 'black' },
      e: { label: 'eye shine', color: 'white' },
      N: { label: 'nostrils', color: 'dark-gray' },
      M: { label: 'smile', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['G', 'S'],
    tagline: 'Five sunshine spikes, a cream belly, a wide green grin.',
    blurb:
      'A friendly dino face with five spikes along the crown. The belly panel, spikes, nostrils and grin are their own regions — a blue body with orange spikes is two clicks, and the cream belly swaps to any accent you like.',
    draw(G) {
      const cx = 28;
      const spikes = [
        [[14.5, 19], [12, 10], [19, 17]],
        [[21, 14.5], [20, 5.5], [27, 12.5]],
        [[28, 13], [28, 4], [28, 13]],
      ];
      for (let i = 0; i < 3; i++) {
        const s = spikes[i];
        const poly = leaf(s[0], s[1], s[2], 1.4, 1.4);
        G.add('S', poly);
        // mirror the *points* — leaf()'s bulge sides don't survive argument mirroring
        G.add('S', poly.map(([x, y]) => [56 - x, y]));
      }
      G.add('G', egg(cx, 31, 19, 18.5, 0.05));
      G.add('g', eggRingRight(cx, 31, 19, 18.5, 0.05, 2.0));
      G.add('C', egg(cx, 39, 13.5, 9.5, 0.06), 'G');
      eyeSimple(G, 20.5, 29.5, { frame: 'E', shine: 'e' });
      eyeSimple(G, 35.5, 29.5, { frame: 'E', shine: 'e' });
      G.add('N', ellipse(25.2, 25.5, 0.95, 0.75));
      G.add('N', ellipse(30.8, 25.5, 0.95, 0.75));
      G.add('M', sector(cx, 32.5, 4.6, 5.8, 30, 150));
      G.add('P', ellipse(13, 34.5, 2.6, 1.8));
      G.add('P', ellipse(43, 34.5, 2.6, 1.8));
    },
  },

  // ---------------- unicorn (v5 pilot, ported verbatim) ----------------
  {
    slug: 'unicorn', name: 'Unicorn', category: 'animals', difficulty: 'medium',
    W: 64, H: 50, mirror: true, trim: false, dropSingles: [], singlesOk: ['e', 'N'],
    zones: {
      K: { label: 'outline', color: 'black' },
      S: { label: 'horn', color: 'sunshine' },
      s: { label: 'horn shade', color: 'cheddar' },
      I: { label: 'inner ears', color: 'blush' },
      F: { label: 'face', color: 'white' },
      f: { label: 'face shading', color: 'light-gray' },
      A: { label: 'outer lock', color: 'hot-magenta' },
      a: { label: 'outer shade', color: 'plum' },
      B: { label: 'mid lock', color: 'lavender' },
      b: { label: 'mid shade', color: 'purple' },
      C: { label: 'inner lock', color: 'pink' },
      c: { label: 'inner shade', color: 'hot-magenta' },
      L: { label: 'forelock', color: 'lavender' },
      e: { label: 'eye shine', color: 'white' },
      R: { label: 'iris', color: 'light-blue' },
      r: { label: 'iris depth', color: 'royal-blue' },
      P: { label: 'blush', color: 'blush' },
      W: { label: 'muzzle', color: 'cream' },
      w: { label: 'muzzle shade', color: 'tan' },
      N: { label: 'nostrils', color: 'pink' },
      M: { label: 'mouth', color: 'black' },
      X: { label: 'hearts', color: 'cherry' },
    },
    rim: ['F', 'I', 'f'],
    rimAgainst: { F: ['A', 'a', 'B', 'b', 'C', 'c', 'L'], I: ['A', 'a', 'B', 'b', 'C', 'c', 'L'], f: ['A', 'a', 'B', 'b', 'C', 'c', 'L'] },
    tagline: 'A 64-wide showpiece: spiral horn, layered eyes, curved three-tone locks, twenty-two zones.',
    blurb:
      'The flagship build: about 1,600 beads across four big interlocking pegboards, with twenty-two separately recolorable zones. The golden horn wraps a two-bead spiral band, each mane lock curves like real hair with its own darker shade, and the eyes stack a white shine over a light-blue iris and a royal-blue depth crescent inside a black frame. Below, the cream muzzle gets tan chin shading, real nostrils and a smile arc, cherry hearts float beside the ears, and a light-gray crescent keeps the face shading when you recolor.',
    draw(G) {
      const CX = 32;
      const LOCKS = [
        { base: 'C', shade: 'c', t0: [49.4, 14.8], t1: [54.2, 44.6], wOut: 2.0, wIn: 2.2, s0: [50.4, 16.6], s1: [54.6, 43.2] },
        { base: 'B', shade: 'b', t0: [54.0, 16.0], t1: [57.8, 46.2], wOut: 1.9, wIn: 2.0, s0: [55.2, 17.8], s1: [58.8, 44.8] },
        { base: 'A', shade: 'a', t0: [59.2, 18.0], t1: [61.8, 47.3], wOut: 1.8, wIn: 1.9, s0: [59.0, 20.0], s1: [62.0, 46.2] },
      ];
      for (const lk of LOCKS) {
        const lock = banana(lk.t0, lk.t1, lk.wOut, lk.wIn);
        const shade = banana(lk.s0, lk.s1, 0.8, 0.5);
        G.add(lk.base, lock);
        G.add(lk.shade, shade, lk.base);
        G.add(lk.base, G.mirror(lock));
        G.add(lk.shade, G.mirror(shade), lk.base);
      }
      G.add('F', egg(CX, 31, 17.5, 16.5, 0.14));
      G.add('f', eggRingRight(CX, 31, 17.5, 16.5, 0.14, 2.0));
      for (const s of [1, -1]) {
        const M = (poly) => poly.map(([x, y]) => [s > 0 ? x : 64 - x, y]);
        G.add('F', M(leaf([21.0, 17.3], [24.8, 6.8], [26.2, 16.3], 1.8, 2.5)));
        G.add('I', M(leaf([22.2, 16.9], [24.5, 9.6], [25.0, 16.3], 1.0, 1.5)));
      }
      for (const ex of [25, 39]) {
        G.add('K', ellipse(ex, 29.5, 3.8, 4.6));
        G.add('R', ellipse(ex, 29.5, 3.0, 3.8));
        G.add('r', halfRingBottom(ex, 29.5, 3.0, 3.8, 2.05, 2.75));
        G.add('e', ellipse(ex - 1.3, 27.6, 1.15, 1.5));
      }
      G.add('P', ellipse(20.3, 35.0, 2.6, 1.7));
      G.add('P', ellipse(43.7, 35.0, 2.6, 1.7));
      G.add('W', ellipse(CX, 40.3, 9.8, 5.6));
      G.add('w', halfRingBottom(CX, 40.3, 9.8, 5.6, 8.7, 4.6));
      G.add('N', ellipse(29.2, 37.9, 1.0, 0.7));
      G.add('N', ellipse(34.8, 37.9, 1.0, 0.7));
      G.add('M', sector(CX, 38.9, 3.2, 4.2, 25, 155));
      // forelock fringe + shade band, horn on top
      const fringeTop = () => {
        const pts = [...arcSide([22.8, 16.2], [41.2, 16.2], 0, -1, 0.7, 12), [41.2, 19.6]];
        const n = 4, x1 = 41.2, x0 = 22.8;
        for (let i = 0; i < n; i++) {
          const xa = x1 - ((x1 - x0) * i) / n, xb = x1 - ((x1 - x0) * (i + 1)) / n;
          pts.push(...arcSide([xa, 19.6], [xb, 19.6], 0, 1, 2.0, 10));
        }
        return pts;
      };
      const hornStripe = (yL, rise = 5, th = 1.6) =>
        [[24, yL], [40, yL - rise], [40, yL - rise + th], [24, yL + th]];
      G.add('L', fringeTop());
      G.add('b', scallopBand(22.8, 41.2, 19.6, 2.0, 1.2));
      G.add('S', banana([CX, 16.5], [CX, 1.8], 3.3, 3.3));
      for (const yL of [14.2, 10.8, 7.4]) G.add('s', hornStripe(yL, 5, 2.0), 'S');
      G.add('X', heart(7.0, 7.2, 0.155));
      G.add('X', heart(57.0, 7.2, 0.155));
    },
  },
];

// frog smile helper: arc points without importing arcPts name into every def
function arcPtsEngine(cx, cy, rx, ry, a0, a1, n = 26) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    return [cx + rx * Math.cos(t), cy + ry * Math.sin(t)];
  });
}
