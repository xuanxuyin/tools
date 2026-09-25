// Mini pattern definitions (8) — vector-authored, rasterized by engine.mjs.
// The smallest tier stays smallest: 14-22 wide, an-evening project size,
// but with the same real curves as the big patterns. Every mini keeps
// exactly four zones so the first-project story stays countable.
import {
  arcPts, arcSide, circle, dot, egg, ellipse, heart, rot, roundedRect,
  sector, star, stroke,
} from './engine.mjs';

export const MINIS = [
  // ---------------- mini-heart ----------------
  {
    slug: 'mini-heart', name: 'Mini Heart', category: 'minis', difficulty: 'easy',
    W: 20, H: 20, mirror: true,
    zones: {
      K: { label: 'outline', color: 'black' },
      R: { label: 'heart', color: 'cherry' },
      P: { label: 'inner glow', color: 'pink' },
      W: { label: 'shine', color: 'white' },
    },
    rim: ['R'],
    tagline: 'A palm-size heart with a pink glow and a shine bead.',
    blurb:
      'Still the classic first bead project — now with real curved lobes, a pink inner heart, one white shine bead and an outline. About 190 beads: done before your iron warms up. Make a dozen in swapped colors; they magnetize onto fridges and trade like currency at craft tables.',
    draw(G) {
      G.add('R', heart(10, 10, 0.58));
      G.add('P', heart(10, 10, 0.33));
      G.add('W', ellipse(4.5, 5.6, 1.2, 1.6));
    },
  },

  // ---------------- mini-star ----------------
  {
    slug: 'mini-star', name: 'Mini Star', category: 'minis', difficulty: 'easy',
    W: 22, H: 22, mirror: true,
    zones: {
      K: { label: 'outline', color: 'black' },
      Y: { label: 'star', color: 'sunshine' },
      y: { label: 'inner star', color: 'butternut' },
      W: { label: 'shine', color: 'white' },
    },
    rim: ['Y'],
    tagline: 'A chunky five-point star with a deep-gold core.',
    blurb:
      'A chunky star that stays recognizable from across the room. The bottom legs splay one bead wider than you think they should — trust the grid — and the butternut inner star gives it depth without a single diagonal bead.',
    draw(G) {
      G.add('Y', star(11, 11.5, 9.3, 4.2));
      G.add('y', star(11, 12.3, 4.6, 2.0));
      G.add('W', ellipse(11, 7, 1.1, 1.4));
    },
  },

  // ---------------- mini-flower ----------------
  {
    slug: 'mini-flower', name: 'Mini Flower', category: 'minis', difficulty: 'easy',
    W: 20, H: 26, mirror: false,
    zones: {
      P: { label: 'petals', color: 'pink' },
      Y: { label: 'center', color: 'sunshine' },
      G: { label: 'stem', color: 'bright-green' },
      g: { label: 'leaf', color: 'kiwi' },
    },
    tagline: 'Four petals, a sunshine center, a leaf on the stem.',
    blurb:
      'Four petals, one center disc, a straight stem with a single leaf. It is the pattern to teach with: every part is a visible, countable step, and at this size the whole thing fits one small pegboard.',
    draw(G) {
      const cx = 10, cy = 10.5;
      G.add('P', ellipse(cx, cy - 5, 3.2, 4.2));
      G.add('P', ellipse(cx, cy + 5, 3.2, 4.2));
      G.add('P', ellipse(cx - 5.5, cy, 4.2, 3.2));
      G.add('P', ellipse(cx + 5.5, cy, 4.2, 3.2));
      G.add('Y', circle(cx, cy, 3));
      G.add('G', roundedRect(9, 19.5, 2, 6, 1));
      G.add('g', ellipse(6.2, 22.5, 2.9, 1.7));
    },
  },

  // ---------------- mini-smiley ----------------
  {
    slug: 'mini-smiley', name: 'Mini Smiley', category: 'minis', difficulty: 'easy',
    W: 20, H: 20, mirror: true,
    zones: {
      Y: { label: 'face', color: 'sunshine' },
      K: { label: 'eyes & mouth', color: 'black' },
      P: { label: 'blush', color: 'blush' },
      W: { label: 'shine', color: 'white' },
    },
    tagline: 'The universal mood-lifter, now with blush.',
    blurb:
      'The universal mood-lifter at fridge-magnet size. Straightforward grid, instant payoff — and the smile is a real arc now, so it beams instead of zigzagging. Add the blush last for the full charm offensive.',
    draw(G) {
      const cx = 10;
      G.add('Y', circle(cx, 10, 8.6));
      G.add('K', ellipse(6.8, 8.2, 1.2, 1.6));
      G.add('K', ellipse(13.2, 8.2, 1.2, 1.6));
      G.add('K', stroke(arcPts(cx, 9.2, 5.4, 5.4, 25, 155), 1.5));
      G.add('P', ellipse(4.6, 11.2, 1.8, 1.2));
      G.add('P', ellipse(15.4, 11.2, 1.8, 1.2));
      G.add('W', ellipse(4.8, 4.5, 1.6, 1.1));
    },
  },

  // ---------------- mini-mushroom ----------------
  {
    slug: 'mini-mushroom', name: 'Mini Mushroom', category: 'minis', difficulty: 'easy',
    W: 20, H: 22, mirror: false,
    zones: {
      K: { label: 'outline', color: 'black' },
      R: { label: 'cap', color: 'cherry' },
      W: { label: 'spots', color: 'white' },
      C: { label: 'stem', color: 'cream' },
    },
    rim: ['R', 'C'],
    tagline: 'Cherry cap, scattered spots, cream stem.',
    blurb:
      'A toadstool in four regions: cap, spots, stem, outline. The spots are placed asymmetrically on purpose — real mushrooms are not symmetrical either — and the domed cap is a true curve now, not a stepped pyramid.',
    draw(G) {
      G.add('C', roundedRect(6.5, 13, 7, 8, 3));
      G.add('R', ellipse(10, 8.5, 9, 7.5));
      G.add('W', circle(5, 5, 1.4));
      G.add('W', circle(10, 2, 1.4));
      G.add('W', circle(13, 9, 1.4));
    },
  },

  // ---------------- mini-moon ----------------
  {
    slug: 'mini-moon', name: 'Crescent Moon', category: 'minis', difficulty: 'easy',
    W: 16, H: 21, mirror: false,
    zones: {
      K: { label: 'outline', color: 'black' },
      Y: { label: 'moon', color: 'sunshine' },
      e: { label: 'closed eye', color: 'black' },
      m: { label: 'mouth', color: 'black' },
    },
    rim: ['Y'],
    tagline: 'A sleepy sunshine crescent with one closed eye.',
    blurb:
      'A C-shaped moon that works because the inner edge recedes smoothly toward the tips. The closed eye is a single dark stroke and the mouth a two-bead smile — recolor either and the moon wakes up cranky.',
    draw(G) {
      G.add('Y', [...arcSide([10.5, 1.5], [10.5, 19], -1, 0, 7, 26), ...arcSide([10.5, 19], [10.5, 1.5], -1, 0, 2.2, 26)]);
      G.add('e', stroke([[5.3, 8.5], [7.3, 8.5]], 1.2));
      G.add('m', sector(6.6, 11.8, 0.3, 1.5, 20, 160));
    },
  },

  // ---------------- mini-cactus ----------------
  {
    slug: 'mini-cactus', name: 'Potted Cactus', category: 'minis', difficulty: 'easy',
    W: 20, H: 25, mirror: false,
    zones: {
      K: { label: 'outline', color: 'black' },
      G: { label: 'cactus', color: 'bright-green' },
      F: { label: 'bloom', color: 'pink' },
      R: { label: 'pot', color: 'cherry' },
    },
    rim: ['G', 'F', 'R'],
    tagline: 'One arm, a pink bloom, a cherry pot.',
    blurb:
      'A desk-size cactus in four regions — green body, pink bloom, cherry pot, outline. The arm joins the trunk with a real elbow now; below that everything is straight columns, so it is still a count-while-you-go build.',
    draw(G) {
      G.add('G', roundedRect(8.5, 6.5, 5, 14, 2.5));
      G.add('G', roundedRect(3.8, 12, 6, 3.6, 1.6));
      G.add('G', roundedRect(3.8, 8, 3.6, 8, 1.6));
      G.add('R', roundedRect(5.5, 19.5, 11, 5, 1.8));
      G.add('F', circle(11, 4.8, 2.3));
    },
  },

  // ---------------- mini-butterfly ----------------
  {
    slug: 'mini-butterfly', name: 'Mini Butterfly', category: 'minis', difficulty: 'easy',
    W: 22, H: 18, mirror: true,
    zones: {
      K: { label: 'body & antennae', color: 'black' },
      L: { label: 'wings', color: 'lavender' },
      W: { label: 'spots', color: 'white' },
      P: { label: 'tips', color: 'pink' },
    },
    tagline: 'Lavender wings, white spots, slim body.',
    blurb:
      'Big rounded upper wings, smaller lower lobes, a slim body column and two curled antennae — all real curves. The white and pink spots are single beads placed last, one per wing, so they pop against the lavender.',
    draw(G) {
      G.addM('L', rot(ellipse(6.3, 7.2, 5.2, 4.2), 6.3, 7.2, -28));
      G.addM('L', ellipse(7.3, 13.8, 3.8, 3.1));
      G.add('K', ellipse(11, 10.5, 1.3, 5.8));
      G.addM('K', stroke([[10, 5.2], [8.6, 1.6]], 0.7));
      G.addM('W', ellipse(5.5, 6, 1.25, 1.25));
      G.addM('P', ellipse(6, 14.5, 1.2, 1.2));
    },
  },
];
