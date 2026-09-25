// Food pattern definitions (10) — vector-authored, rasterized by engine.mjs.
// Ported up from the 16-wide originals: same zones and copy ideas, real
// curves, showpiece scale (44-56 wide, one or two pegboards).
import {
  circle, dot, egg, ellipse, halfRingTop, heart, leaf, ring, roundedPoly,
  roundedRect, scallopBand, sector, stroke,
} from './engine.mjs';

// kawaii food face: two plain eyes + small smile arc (+ blush when given)
function foodFace(G, cx, cy, z, dx = 5) {
  G.add(z.eyes, ellipse(cx - dx, cy, 1.5, 2.0));
  G.add(z.eyes, ellipse(cx + dx, cy, 1.5, 2.0));
  G.add(z.mouth, sector(cx, cy + 2.4, 2.0, 3.0, 32, 148));
  if (z.blush) {
    G.add(z.blush, ellipse(cx - dx - 4.5, cy + 2.5, 2.3, 1.6));
    G.add(z.blush, ellipse(cx + dx + 4.5, cy + 2.5, 2.3, 1.6));
  }
}


export const FOOD = [
  // ---------------- cupcake ----------------
  {
    slug: 'cupcake', name: 'Cupcake', category: 'food', difficulty: 'medium',
    W: 52, H: 46, mirror: true, singlesOk: ['W'],
    zones: {
      K: { label: 'outline', color: 'black' },
      F: { label: 'frosting', color: 'pink' },
      W: { label: 'sprinkles', color: 'white' },
      R: { label: 'cherry', color: 'cherry' },
      T: { label: 'wrapper', color: 'tan' },
      E: { label: 'eyes', color: 'black' },
      m: { label: 'mouth', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['F', 'T'],
    tagline: 'Cherry-topped pink frosting over a wrapper with a tiny face.',
    blurb:
      'Sweetest project in the set, scaled up to real showpiece size — a frosting dome with scalloped drips, white sprinkle beads and a cherry that sits proud of the top. The wrapper has a face (eyes, mouth and blush are separate regions), so you can flavor-swap pink for lavender or mint without touching it.',
    draw(G) {
      const cx = 26;
      G.add('R', circle(cx, 6.2, 2.4));
      G.add('F', ellipse(cx, 18.5, 15.5, 11.5));
      G.add('F', scallopBand(10.5, 41.5, 24.5, 2.6, 1.6, 4));
      for (const [x, y] of [[18, 14], [30, 12], [24, 17], [33, 16], [15, 19], [36, 20]])
        dot(G, 'W', x, y);
      G.add('T', roundedPoly([[15, 26.5], [37, 26.5], [33, 42.5], [19, 42.5]], 2));
      foodFace(G, cx, 32.5, { eyes: 'E', mouth: 'm', blush: 'P' }, 5);
    },
  },

  // ---------------- donut ----------------
  {
    slug: 'donut', name: 'Donut', category: 'food', difficulty: 'medium',
    W: 52, H: 46, mirror: false, singlesOk: ['W', 'S'],
    zones: {
      K: { label: 'outline', color: 'black' },
      P: { label: 'icing', color: 'pink' },
      W: { label: 'white sprinkles', color: 'white' },
      S: { label: 'yellow sprinkles', color: 'sunshine' },
      D: { label: 'dough', color: 'butternut' },
    },
    rim: ['D', 'P'],
    tagline: 'Pink icing, two sprinkle colors, a real bead hole.',
    blurb:
      'The hole is genuinely empty — no beads placed — which is exactly how a bead donut should read, and at this scale it is a true ring you can see through. Icing is the obvious customization target; sprinkles are single beads in two colors, so go wild.',
    draw(G) {
      G.add('D', ring(26, 23, 19, 8));
      G.add('P', ring(26, 21.5, 18.6, 8.2));
      for (const [x, y] of [[14, 17], [21, 12], [30, 12], [37, 18], [34, 27]])
        dot(G, 'S', x, y);
      for (const [x, y] of [[19, 15], [28, 10], [35, 24], [13, 25], [36, 31]])
        dot(G, 'W', x, y);
    },
  },

  // ---------------- pizza-slice ----------------
  {
    slug: 'pizza-slice', name: 'Pizza Slice', category: 'food', difficulty: 'easy',
    W: 52, H: 50, mirror: false, singlesOk: ['G'],
    zones: {
      K: { label: 'outline', color: 'black' },
      r: { label: 'crust', color: 'tan' },
      C: { label: 'cheese', color: 'cheddar' },
      R: { label: 'pepperoni', color: 'cherry' },
      G: { label: 'basil', color: 'bright-green' },
    },
    rim: ['C', 'r'],
    tagline: 'A big tapering triangle, cheddar cheese, cherry pepperoni.',
    blurb:
      'Straight lines, zero fuss — now an 11-inch slice with real pepperoni discs instead of single beads. The crust is a tan band along the top edge; the green flecks are basil, and you can space pepperoni and basil to taste.',
    draw(G) {
      G.add('C', roundedPoly([[6, 9], [46, 9], [25.5, 46]], 2.5));
      G.add('r', roundedPoly([[6, 9], [46, 9], [45, 15.5], [7, 15.5]], 1.8));
      for (const [x, y] of [[16, 20], [35, 21], [25.5, 30]])
        G.add('R', circle(x, y, 2.3));
      for (const [x, y] of [[24, 18], [31, 27], [19, 28]])
        dot(G, 'G', x, y);
    },
  },

  // ---------------- ice-cream-cone ----------------
  {
    slug: 'ice-cream-cone', name: 'Ice Cream Cone', category: 'food', difficulty: 'medium',
    W: 50, H: 58, mirror: true, singlesOk: ['C'],
    zones: {
      K: { label: 'outline', color: 'black' },
      F: { label: 'top scoop', color: 'pink' },
      E: { label: 'eyes', color: 'black' },
      m: { label: 'mouth', color: 'black' },
      b: { label: 'blush', color: 'blush' },
      M: { label: 'bottom scoop', color: 'mint' },
      T: { label: 'cone', color: 'tan' },
      C: { label: 'waffle lines', color: 'cream' },
    },
    rim: ['F', 'M', 'T'],
    tagline: 'Pink scoop with a face, mint scoop, waffle cone.',
    blurb:
      'Two big scoops stacked on a foot-tall waffle cone. The top scoop has the face — eyes, mouth and blush are separate regions — and the waffle crosshatch is drawn as cream lines clipped inside the cone, so the tip stays crisp.',
    draw(G) {
      const cx = 25;
      G.add('T', roundedPoly([[14, 34], [36, 34], [25, 56]], 2));
      G.add('C', stroke([[16, 45], [31, 35.5]], 1.0), 'T');
      G.add('C', stroke([[34, 45], [19, 35.5]], 1.0), 'T');
      G.add('M', egg(cx, 30, 12, 9, 0.1));
      G.add('F', egg(cx, 19, 10.5, 9.5, 0.08));
      foodFace(G, cx, 18, { eyes: 'E', mouth: 'm', blush: 'b' }, 4.5);
    },
  },

  // ---------------- strawberry ----------------
  {
    slug: 'strawberry', name: 'Strawberry', category: 'food', difficulty: 'easy',
    W: 50, H: 54, mirror: false, singlesOk: ['S'],
    zones: {
      K: { label: 'outline', color: 'black' },
      R: { label: 'berry', color: 'cherry' },
      S: { label: 'seeds', color: 'sunshine' },
      G: { label: 'leaves', color: 'bright-green' },
      E: { label: 'eyes', color: 'black' },
      m: { label: 'mouth', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['R', 'G'],
    tagline: 'Sunshine seeds, green leaves, blushing face.',
    blurb:
      'A heart-shaped berry with a face, sized for framing. The seeds are single sunshine beads — place them last, after the red fill, so the spacing stays even on both sides.',
    draw(G) {
      const cx = 25;
      G.add('R', heart(cx, 28, 1.35));
      for (const [x, y] of [[18, 25], [32, 25], [14, 33], [36, 33], [20, 38], [29, 38]])
        dot(G, 'S', x, y);
      G.add('G', leaf([13, 13], [cx, 7], [20, 14], 1.5, 1.5));
      G.add('G', leaf([37, 13], [cx, 7], [30, 14], 1.5, 1.5));
      G.add('G', leaf([21, 12.5], [cx, 4.5], [29, 12.5], 1.8, 1.8));
      G.add('G', stroke([[cx, 9], [cx, 5.5]], 1.0));
      foodFace(G, cx, 27, { eyes: 'E', mouth: 'm', blush: 'P' }, 5);
    },
  },

  // ---------------- cookie ----------------
  {
    slug: 'cookie', name: 'Cookie', category: 'food', difficulty: 'easy',
    W: 52, H: 44, mirror: false,
    zones: {
      K: { label: 'outline', color: 'black' },
      L: { label: 'dough', color: 'light-brown' },
      D: { label: 'chocolate chips', color: 'dark-brown' },
      E: { label: 'eyes', color: 'black' },
      m: { label: 'mouth', color: 'black' },
      P: { label: 'blush', color: 'blush' },
    },
    rim: ['L'],
    tagline: 'Light-brown dough, dark chips, happy face.',
    blurb:
      'A bakery-counter cookie with chocolate chips and a small face. Chips double as beauty marks, so asymmetric placement is a feature, not a bug — and at this size the face reads from across the room.',
    draw(G) {
      G.add('L', roundedRect(7, 6.5, 38, 33, 9));
      for (const [x, y] of [[15, 13.5], [37, 14.5], [12.5, 25], [39.5, 26], [26, 35]])
        G.add('D', circle(x, y, 1.7));
      foodFace(G, 26, 22.5, { eyes: 'E', mouth: 'm', blush: 'P' }, 5.5);
    },
  },

  // ---------------- watermelon-slice ----------------
  {
    slug: 'watermelon-slice', name: 'Watermelon Slice', category: 'food', difficulty: 'easy',
    W: 52, H: 40, mirror: true, singlesOk: ['S'],
    zones: {
      K: { label: 'outline', color: 'black' },
      R: { label: 'flesh', color: 'cherry' },
      S: { label: 'seeds', color: 'black' },
      W: { label: 'inner rind', color: 'white' },
      G: { label: 'rind', color: 'pine' },
    },
    rim: ['R', 'W', 'G'],
    tagline: 'Cherry flesh, white inner rind, pine outer rind.',
    blurb:
      'A wide dome slice with three distinct rind layers, so it teaches color banding: red flesh, white gap, green skin — each band a hand-sized arc of its own. Seeds are single black beads placed after the fill.',
    draw(G) {
      G.add('G', halfRingTop(26, 33, 22, 20, 19, 17.3));
      G.add('W', halfRingTop(26, 33, 19, 17.3, 16.4, 15));
      G.add('R', sector(26, 33, 0, 16.4, 180, 360));
      for (const [x, y] of [[18, 25], [34, 25], [26, 19], [21, 29], [31, 29]])
        dot(G, 'S', x, y);
    },
  },

  // ---------------- ice-pop ----------------
  {
    slug: 'ice-pop', name: 'Ice Pop', category: 'food', difficulty: 'easy',
    W: 44, H: 58, mirror: true,
    zones: {
      K: { label: 'outline', color: 'black' },
      F: { label: 'pop', color: 'cherry' },
      W: { label: 'shine', color: 'white' },
      E: { label: 'eyes', color: 'black' },
      m: { label: 'mouth', color: 'black' },
      T: { label: 'stick', color: 'tan' },
    },
    rim: ['F', 'T'],
    tagline: 'A cherry pop with a shine streak and a tan stick.',
    blurb:
      'A full-height popsicle with a face on the upper half and a real stick below. The white shine band down the left edge is what makes it look glossy — keep it when you recolor the pop.',
    draw(G) {
      G.add('T', roundedRect(19.5, 39, 5, 15, 2.2));
      G.add('F', roundedRect(9, 5, 26, 36, 6));
      G.add('W', roundedRect(12, 8, 4, 28, 2), 'F');
      foodFace(G, 22, 16, { eyes: 'E', mouth: 'm' }, 4.5);
    },
  },

  // ---------------- burger ----------------
  {
    slug: 'burger', name: 'Burger', category: 'food', difficulty: 'medium',
    W: 56, H: 44, mirror: true, singlesOk: ['S'],
    zones: {
      K: { label: 'outline', color: 'black' },
      B: { label: 'top bun', color: 'butternut' },
      S: { label: 'sesame seeds', color: 'sunshine' },
      L: { label: 'lettuce', color: 'kiwi' },
      C: { label: 'cheese', color: 'cheddar' },
      P: { label: 'patty', color: 'brown' },
      b: { label: 'bottom bun', color: 'butternut' },
    },
    rim: ['B', 'L', 'C', 'P', 'b'],
    tagline: 'Butternut bun, kiwi lettuce ruffle, cheddar, brown patty.',
    blurb:
      'A stacked burger in seven regions at platter size — bun, sesame, lettuce, cheese, patty and bottom bun can each be recolored, which makes it the best pattern in the set for teaching color banding. The lettuce is a true wavy ruffle that sticks out past the bun.',
    draw(G) {
      const cx = 28;
      G.add('B', ellipse(cx, 22, 17, 12.5));
      G.add('L', scallopBand(8, 48, 19, 3.0, 3.8, 5));
      G.add('C', roundedRect(12, 21.5, 32, 6, 2.5));
      G.add('P', roundedRect(11, 26.5, 34, 6.5, 3));
      G.add('b', roundedRect(12, 31.5, 32, 8.5, 4));
      for (const [x, y] of [[17, 14], [27, 11], [38, 14], [22, 17], [33, 17]])
        dot(G, 'S', x, y);
    },
  },

  // ---------------- sushi-roll ----------------
  {
    slug: 'sushi-roll', name: 'Sushi Roll', category: 'food', difficulty: 'medium',
    W: 52, H: 46, mirror: false, singlesOk: ['S'],
    zones: {
      N: { label: 'nori ring', color: 'black' },
      W: { label: 'rice', color: 'white' },
      G: { label: 'fill', color: 'kiwi' },
      S: { label: 'salmon bits', color: 'pink' },
    },
    tagline: 'Maki cross-section: nori ring, rice, green fill.',
    blurb:
      'A maki roll seen from above, wide as a salad plate. The nori ring wraps the rice circle and the center holds the fill with salmon bits tucked in — swap the kiwi center for salmon pink or cheddar tamago.',
    draw(G) {
      G.add('N', ring(26, 23, 18, 12));
      G.add('W', circle(26, 23, 11.5));
      G.add('G', circle(26, 23, 5.5));
      for (const [x, y] of [[24, 21], [28, 22], [25, 25]])
        dot(G, 'S', x, y);
    },
  },
];
