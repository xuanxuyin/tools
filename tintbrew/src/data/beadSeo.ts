/**
 * SEO copy for the bead-family landing pages (hub + 3 galleries).
 * Keyword targets from research/fuse-bead-patterns.md §七:
 *   hub       ← perler bead patterns 14.8K, perler bead ideas 9.9K,
 *               fuse bead patterns 1.6K, melty beads 1.6K, templates 720
 *   easy      ← easy perler bead patterns 1.3K
 *   animals   ← perler bead animals 590
 * The christmas + food galleries retired with the hand-drawn set on
 * 2026-10-28 (301 → hub); their keyword slots reopen when the pixel-grid
 * importer restocks those categories. The halloween gallery reopened
 * 2026-10-29 with the 11-pattern flight import (halloween perler beads).
 */
export interface BeadSeoDef {
  path: string;
  h1: string;
  title: string;
  description: string;
  intro: string[];
  faqs: { q: string; a: string }[];
  /** uiStrings keys for the data-layer copy (h1, intro paragraphs, faq
   *  pairs). The English text above stays the SSR/SEO edition; the
   *  template pairs each node with these data-i18n keys so the in-page
   *  language switch covers the gallery copy too. */
  k?: { h1: string; intro: string[]; fq: string[]; fa: string[] };
}

export const BEAD_HUB_SEO: BeadSeoDef = {
  path: '/perler-bead-patterns/',
  h1: 'Free Perler Bead Patterns',
  k: {
    h1: 'bs.hub',
    intro: ['bs.hubI1', 'bs.hubI2', 'bs.hubI3'],
    fq: ['bs.hubF1q', 'bs.hubF2q', 'bs.hubF3q', 'bs.hubF4q', 'bs.hubF5q'],
    fa: ['bs.hubF1a', 'bs.hubF2a', 'bs.hubF3a', 'bs.hubF4a', 'bs.hubF5a'],
  },
  title: '100+ Free Perler Bead Patterns — Recolor, Print & Iron',
  description:
    'Free fuse bead patterns for every level: dogs, cats, bunnies, pandas, chibi characters and a Halloween set. Recolor any area with the real 103-color Perler line, then print the template and its bead list.',
  intro: [
    '115 designs across animals, characters, Halloween and quick makes — from 6-bead-wide starters that fit one pegboard to 116-bead-wide portraits. Every board is converted bead by bead from community designs and matched to the official 103-color Perler line, so the shopping list names colors you can actually buy.',
    'What makes these different from a normal pattern grid: every area of a design — fur, frosting, scarf, eyes — is its own zone. Tap a zone and try any of the 103 real bead colors before you commit. The bead list updates live, so you know exactly how many of each color to pull from the jar.',
    'When a design looks right, print it. The printed sheet gives you the empty template in zone outlines plus the shopping list of beads, and it fits on one letter-size page.',
  ],
  faqs: [
    {
      q: 'Are these Perler bead patterns really free?',
      a: 'Yes. Every pattern on this site is free to view, recolor and print for personal use, including for classrooms and craft groups. We do not gate downloads behind an account.',
    },
    {
      q: 'What size pegboard do I need?',
      a: 'The smallest designs fit a single large interlocking pegboard (29×29). Mid-size designs run 30 to 64 beads wide — two or three large boards snapped together. The widest portraits hit 116 beads across and span sixteen boards in a four-by-four grid. Every pattern page lists its exact grid size.',
    },
    {
      q: 'Can I sell crafts I make from these patterns?',
      a: 'Yes — sell finished handmade items in small quantities (craft fairs, Etsy shops). We only ask that you do not resell or repost the patterns themselves.',
    },
    {
      q: 'What is the difference between Perler, fuse and melty beads?',
      a: 'Nothing important — they are all 5mm plastic beads that fuse together under an iron. Perler is just the most common US brand name, so patterns get called “Perler patterns” regardless of which brand you actually own.',
    },
    {
      q: 'How do I print a pattern?',
      a: 'Open any design, set your colors, and hit the Print button on the pattern page. The print view drops the site chrome and gives you the template and bead list on one letter page.',
    },
  ],
};

export const BEAD_CATEGORY_SEO: Record<string, BeadSeoDef> = {
  animals: {
    path: '/perler-bead-animals/',
    h1: 'Perler Bead Animals',
    k: {
      h1: 'bs.an',
      intro: ['bs.anI1', 'bs.anI2'],
      fq: ['bs.anF1q', 'bs.anF2q', 'bs.anF3q'],
      fa: ['bs.anF1a', 'bs.anF2a', 'bs.anF3a'],
    },
    title: '52 Free Perler Bead Animal Patterns — Corgi, Cat, Bunny & More',
    description:
      'Free perler bead animal patterns: corgi, shiba, husky, golden retriever, orange cat, calico kittens, carrot bunnies, pandas and more — all converted from community designs. Recolor each animal online, then print the template.',
    intro: [
      'Fifty-two animal boards converted bead by bead from community designs onto the real 103-color Perler line — a whole kennel of corgis, shibas, huskies and golden retrievers, orange cats and calico kittens, carrot bunnies, pandas, lambs and penguins, from 9 beads wide up to 116. Each one separates fur, inner ears, eyes, nose and mouth into their own zones — so a cheddar corgi becomes a gray one in two clicks, without redrawing anything.',
      'Start with Corgi Butt Peek (17 beads wide) or a cozy carrot bunny if this is your first board: mostly one color with a few details. Save the 116-wide showpiece for after placing beads from a printed grid feels natural.',
    ],
    faqs: [
      {
        q: 'Which animal pattern is easiest for beginners?',
        a: 'Corgi Butt Peek — 17 beads wide, big color areas, and it reads instantly. The cozy carrot bunny (23 wide) and the garden lamb (24 wide) are close behind.',
      },
      {
        q: 'How long does an animal pattern take?',
        a: 'A 17-to-30-bead-wide animal is a single evening — under an hour of placing plus a few minutes of ironing. The 116-wide showpiece is a deliberate weekend board at several thousand beads.',
      },
      {
        q: 'Can I turn these into keychains?',
        a: 'Pick anything under 30 beads wide — the small corgis and bunnies finish around 4 inches and hang well. Iron both sides firmly and add a jump ring through one corner bead before the final pass. The big boards are shelf-and-wall pieces.',
      },
    ],
  },
  easy: {
    path: '/easy-perler-bead-patterns/',
    h1: 'Easy Perler Bead Patterns',
    k: {
      h1: 'bs.ez',
      intro: ['bs.ezI1', 'bs.ezI2'],
      fq: ['bs.ezF1q', 'bs.ezF2q', 'bs.ezF3q'],
      fa: ['bs.ezF1a', 'bs.ezF2a', 'bs.ezF3a'],
    },
    title: 'Easy Perler Bead Patterns for Beginners — Free & Printable',
    description:
      'Beginner fuse bead patterns that still look great: small corgis, bunnies, lambs and cats with straightforward, forgiving grids. Pick one, recolor it online, print the template and start beading.',
    intro: [
      'Every design here is marked easy in our catalog: a simple silhouette, mostly-large color areas, and no fiddly single-bead details. Most are small corgis, bunnies, lambs and cats — the kind of board a first-timer finishes in one sitting.',
      'If this is your very first pattern, start with Corgi Butt Peek — 17 beads wide on a single pegboard. Move up to a mid-20s face like the cozy carrot bunny (23 wide) or Catnap Clementine (25 wide) once placing beads from a printed grid feels natural.',
    ],
    faqs: [
      {
        q: 'What do I need to start with easy patterns?',
        a: 'A large interlocking pegboard for the minis (two for the full-size designs), one assorted bead tub (any brand), ironing paper, and a household iron. Every easy pattern here works with a basic 24-color assortment.',
      },
      {
        q: 'What age are these easy patterns for?',
        a: 'Roughly 6 and up with the standard 5mm beads, adult on the iron. For younger hands, chunky “biggie” beads (10mm) exist, but these patterns are drawn for the standard 5mm grid.',
      },
      {
        q: 'How do I keep beads from rolling off the board?',
        a: 'Work on a tray or a cookie sheet with a rim, and press each bead straight down. If a row shifts, nudge it back with a flat fingertip before ironing — never after.',
      },
    ],
  },
  characters: {
    path: '/perler-bead-characters/',
    h1: 'Perler Bead Characters',
    k: {
      h1: 'bs.ch',
      intro: ['bs.chI1', 'bs.chI2'],
      fq: ['bs.chF1q', 'bs.chF2q', 'bs.chF3q'],
      fa: ['bs.chF1a', 'bs.chF2a', 'bs.chF3a'],
    },
    title: '43 Free Perler Bead Character Patterns — Girls, Chibi & More',
    description:
      'Free fuse bead character patterns: cute girls with bows and braids, chibi heroes, ghosts and goblins. Every board matched to real bead colors — recolor, print and start placing.',
    intro: [
      'Forty-three character boards converted bead by bead onto the real 103-color Perler line — big-eyed girls with ribbons and nightcaps, tiny chibi heroes, wizards and vampires. Each one keeps its original proportions, so the face you loved on screen is the face you iron.',
      'Every pattern page gives you three things at once: the printable grid with row and column counts, the shopping list with exact bead counts per color, and the online board where you can repaint any area before you commit a single bead.',
    ],
    faqs: [
      {
        q: 'What board sizes do the character patterns use?',
        a: 'They run from 10 to 72 beads wide. The smallest fit one or two large pegboards; the widest span three large boards and want a flat working surface you will not need for a day. Each pattern page lists its exact grid.',
      },
      {
        q: 'Which characters are easiest for beginners?',
        a: 'Start with anything under 40 beads wide — the small girls and simple silhouettes have large color areas and forgiving outlines. Save the 70-wide portraits for your third or fourth board.',
      },
      {
        q: 'Can I change the colors on a character?',
        a: 'Yes — that is the point of the online board. Hair, dress, background: pick any area and repaint it with any of the 103 real bead colors. The bead list updates the moment you do.',
      },
    ],
  },
  halloween: {
    path: '/perler-bead-halloween/',
    h1: 'Halloween Perler Bead Patterns',
    k: {
      h1: 'bs.ha',
      intro: ['bs.haI1', 'bs.haI2'],
      fq: ['bs.haF1q', 'bs.haF2q', 'bs.haF3q'],
      fa: ['bs.haF1a', 'bs.haF2a', 'bs.haF3a'],
    },
    title: '11 Free Halloween Perler Bead Patterns — Ghosts, Witches & Pumpkins',
    description:
      'Free Halloween fuse bead patterns: ghosts, witches, black cats, a kawaii bat, jack-o-lanterns and a vampire. Recolor every zone with real Perler colors, then print the template and bead list.',
    intro: [
      'Eleven Halloween boards converted bead by bead from community designs onto the real 103-color Perler line — ghosts, witches, black cats, a kawaii bat, jack-o-lanterns and one classic vampire, from 21 beads wide up to 37. Each one splits cloak, hat, face and pumpkin into their own zones, so an orange ghost becomes a classic white one in two clicks.',
      'Nothing here is a weekend commitment: every Halloween design lands between 21 and 37 beads wide — one to four large pegboards and 240 to 750 beads. That is an after-school board with time left to iron it.',
    ],
    faqs: [
      {
        q: 'Which Halloween pattern is easiest for beginners?',
        a: 'The witch hat pumpkin — 23 beads wide, 237 beads, four color zones. The witch hat black cat (21 wide) and kawaii bat (29 wide) are right behind it.',
      },
      {
        q: 'How many beads does a Halloween pattern take?',
        a: 'Between 237 and 754 beads per design across the set. Each pattern page lists exact counts per color — one assorted tub covers several patterns.',
      },
      {
        q: 'When should I start a Halloween Perler project?',
        a: 'Late September or early October. The boards themselves are one evening each, but garlands, framed sets and classroom party gifts want a couple of weekends of lead time.',
      },
    ],
  },
};

/**
 * Collection landings — filter and synonym pages over the same catalog, not
 * new categories. Targets from the 2026-10-29 28-word AITDK pull (PLAN, P3
 * pool expansion): cute 3,600/KD15, small 1,900/KD8, fuse bead patterns
 * 1,900/KD26, letters 260 + alphabet 110. Counts in the copy are locked by
 * the guard test — bump them with the curated list, never by hand.
 */
export const BEAD_COLLECTION_SEO: Record<string, BeadSeoDef> = {
  cute: {
    path: '/cute-perler-bead-patterns/',
    h1: 'Cute Perler Bead Patterns',
    k: {
      h1: 'bs.cute',
      intro: ['bs.cuteI1', 'bs.cuteI2', 'bs.cuteI3'],
      fq: ['bs.cuteF1q', 'bs.cuteF2q', 'bs.cuteF3q', 'bs.cuteF4q'],
      fa: ['bs.cuteF1a', 'bs.cuteF2a', 'bs.cuteF3a', 'bs.cuteF4a'],
    },
    title: '36 Cute Perler Bead Patterns — Kawaii Animals, Characters & Hearts',
    description:
      'Free cute perler bead patterns: carrot bunnies, pandas, calico kittens, corgis, kawaii characters and mini hearts. Recolor any board online, then print the template and bead list.',
    intro: [
      'Thirty-six of the sweetest boards in the catalog, pulled from every category — carrot bunnies and pandas, calico kittens and loafing shibas, corgis mid-peek, kawaii characters and a set of two-color mini hearts. The through-line is round shapes, big color areas and faces that read from across a room.',
      'Every board keeps its zones separate — fur, inner ear, eyes, cheeks — so the cute stays when you change it. Turn the carrot bunny pastel pink, give the corgi a mint scarf, make the heart lavender instead of cherry. The bead list updates the moment you pick.',
      'Sizes run from 6-bead-wide minis to an 87-bead-wide showpiece. Most boards finish in an evening; the minis and 30-and-under designs turn into keychains and fridge magnets, and the big character portraits become wall and shelf pieces.',
    ],
    faqs: [
      {
        q: 'Which cute pattern is best for beginners?',
        a: 'The mini hearts — 7 beads wide, two colors, about 27 beads each. Among the animals, start with Corgi Butt Peek (17 wide) or the cozy carrot bunny (23 wide): big color areas and forgiving outlines.',
      },
      {
        q: 'Can I turn cute patterns into keychains?',
        a: 'Yes — anything under 30 beads wide finishes around 4 to 6 inches and hangs well. Iron both sides firmly, then set a jump ring through one corner bead before the final ironing pass.',
      },
      {
        q: 'Can I recolor a cute pattern without redrawing it?',
        a: 'That is the point of the online board. Every area — fur, cheeks, scarf, background — is its own zone; tap one and pick from the real 103-color line. The bead list updates live.',
      },
      {
        q: 'What ages are cute perler patterns for?',
        a: 'Roughly 6 and up with standard 5mm beads, an adult on the iron. The smaller hearts and faces suit shorter attention spans; the 30-wide boards are solid elementary-age projects.',
      },
    ],
  },
  small: {
    path: '/small-perler-bead-patterns/',
    h1: 'Small Perler Bead Patterns',
    k: {
      h1: 'bs.sm',
      intro: ['bs.smI1', 'bs.smI2', 'bs.smI3'],
      fq: ['bs.smF1q', 'bs.smF2q', 'bs.smF3q', 'bs.smF4q'],
      fa: ['bs.smF1a', 'bs.smF2a', 'bs.smF3a', 'bs.smF4a'],
    },
    title: 'Small Perler Bead Patterns — Free One-Board Designs to Print',
    description:
      'Free small perler bead patterns that fit a single pegboard: minis under 20 beads wide plus one-board designs up to 29 wide. Keychain and magnet scale — recolor online, then print.',
    intro: [
      'Everything here fits on pegboards you already own: minis under 20 beads wide — the tiniest clear a small 16×16 square board — and one-board designs up to 29 wide that fit a single large interlocking pegboard. No snapping boards together, no counting out four tubs of beads for one project.',
      'Small is the fun scale. These are after-school boards — 18 to just over 900 beads each — and the finished pieces land in keychain, magnet and desk-charm territory. They are also how beginners build the habit of reading a grid before placing a single bead.',
      'Every pattern prints on one letter page with its zone outlines and bead list, and every board recolors online first — pick colors you actually have in the jar, then commit.',
    ],
    faqs: [
      {
        q: 'What counts as a small perler pattern?',
        a: 'On this page, anything up to 29 beads wide — the footprint of one large interlocking pegboard. The minis run under 20 wide; the tiniest also fit the small 16×16 square boards.',
      },
      {
        q: 'How long does a small pattern take?',
        a: 'The minis are 10 to 20 minutes of placing; the 20-to-29-wide boards run 30 to 60 minutes. Add a few minutes of ironing either way.',
      },
      {
        q: 'How do I turn a small pattern into a keychain?',
        a: 'Iron both sides firmly so the piece holds its shape, then open a jump ring and hook it through one corner bead before the final pass. Designs under 20 wide wear best on bags and lanyards.',
      },
      {
        q: 'Do small patterns still work for classrooms?',
        a: 'They are the classroom sweet spot — one board per student, one assorted tub covers the whole set, and every design finishes inside a class period with ironing done by the teacher.',
      },
    ],
  },
  fuse: {
    path: '/fuse-bead-patterns/',
    h1: 'Fuse Bead Patterns',
    k: {
      h1: 'bs.fu',
      intro: ['bs.fuI1', 'bs.fuI2', 'bs.fuI3'],
      fq: ['bs.fuF1q', 'bs.fuF2q', 'bs.fuF3q', 'bs.fuF4q'],
      fa: ['bs.fuF1a', 'bs.fuF2a', 'bs.fuF3a', 'bs.fuF4a'],
    },
    title: '100+ Fuse Bead Patterns — Free, Printable, Any Bead Brand',
    description:
      'Free fuse bead patterns — animals, characters, Halloween and quick makes, all matched to a real 103-color line. Works with any 5mm fuse beads: recolor online, print and iron.',
    intro: [
      'Fuse beads are the craft’s real name — 5mm plastic beads that fuse into a solid picture under an iron. Perler is just the brand most US households know, so the same boards get called perler patterns, hama patterns or melty bead patterns depending on who you ask. They are all the same 5mm grid, and every pattern here works with whichever brand is in your jar.',
      'The catalog runs 115 boards across animals, characters, a Halloween set and quick makes, from 6-bead-wide starters to 116-wide portraits. Each one is converted bead by bead and matched to a real 103-color bead line, so the shopping list names colors you can actually buy — from any major brand, since their palettes overlap heavily.',
      'Pick a board, repaint any area in the browser, print the template and its bead list on one letter page, and place beads straight off the sheet.',
    ],
    faqs: [
      {
        q: 'Are fuse beads and Perler beads the same thing?',
        a: 'Yes — “fuse beads” is the generic name for the 5mm beads that melt together under an iron. Perler, Hama, Artkal and Mardiy are brand names for the same basic bead, and their pegboards and patterns are interchangeable.',
      },
      {
        q: 'Do I need the same brand of beads as the pattern?',
        a: 'No. The pattern is a color-by-grid: match the shade, not the brand. The color list on each pattern page uses common shade names that every major line covers.',
      },
      {
        q: 'What pegboard do fuse bead patterns need?',
        a: 'Standard 5mm boards: the small designs fit one large interlocking pegboard (29×29), mid-size designs need two or three snapped together, and the widest portraits span sixteen. Each pattern page lists its exact grid.',
      },
      {
        q: 'Can I print fuse bead patterns for a classroom?',
        a: 'Yes — every pattern is free to view, recolor and print for personal and classroom use. Print one sheet per student with the template and bead list included.',
      },
    ],
  },
  letters: {
    path: '/perler-bead-letters/',
    h1: 'Perler Bead Letters',
    k: {
      h1: 'bs.le',
      intro: ['bs.leI1', 'bs.leI2', 'bs.leI3'],
      fq: ['bs.leF1q', 'bs.leF2q', 'bs.leF3q', 'bs.leF4q'],
      fa: ['bs.leF1a', 'bs.leF2a', 'bs.leF3a', 'bs.leF4a'],
    },
    title: 'Perler Bead Letters & Numbers — Free Printable A–Z and 0–9',
    description:
      'Free perler bead letter patterns: the full alphabet A to Z plus numbers 0 to 9 on 5×7 grids. Spell names into bead banners, classroom strips and birthday signs — print the sheet.',
    intro: [
      'The full alphabet and all ten digits as bead boards — every glyph drawn on a 5×7 grid, one solid color each, cycling a bright classroom palette. Print the sheet, place the letters you need, and iron.',
      'Letters are the most useful small boards in the craft: spell a name into a bedroom banner, a birthday sign, a backpack tag. The 5×7 grid finishes about one inch tall per letter on standard 5mm beads, so a five-letter name runs roughly five inches wide — banner scale, not poster scale.',
      'Every letter prints with its bead count, so you know exactly how many of each color to pull. One assorted tub covers the entire alphabet many times over.',
    ],
    faqs: [
      {
        q: 'How many beads does each letter take?',
        a: 'Between 10 and 20 beads per letter on the 5×7 grid — most land in the mid-teens. The exact count sits under every letter on the sheet.',
      },
      {
        q: 'How do I spell a name in perler beads?',
        a: 'Print the sheet, place each letter on its own pegboard section with a column of empty pegs between letters, and iron them as one piece. A four-letter name like EMMA is about 70 beads and fits a single large board.',
      },
      {
        q: 'What size do perler bead letters finish?',
        a: 'About 1 inch tall per letter (7 beads at 5mm). Leave one empty column between letters and a five-letter name finishes around 5½ inches wide.',
      },
      {
        q: 'What are perler bead letters used for in classrooms?',
        a: 'Name plates for desks, word walls, birthday charts, and the 100th day of school count-up. Single-color grids also make them easy patterning practice for early grades.',
      },
    ],
  },
};
