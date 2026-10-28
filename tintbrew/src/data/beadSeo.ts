/**
 * SEO copy for the bead-family landing pages (hub + 3 galleries).
 * Keyword targets from research/fuse-bead-patterns.md §七:
 *   hub       ← perler bead patterns 14.8K, perler bead ideas 9.9K,
 *               fuse bead patterns 1.6K, melty beads 1.6K, templates 720
 *   easy      ← easy perler bead patterns 1.3K
 *   animals   ← perler bead animals 590
 * The christmas + food galleries retired with the hand-drawn set on
 * 2026-10-28 (301 → hub); their keyword slots reopen when the pixel-grid
 * importer restocks those categories.
 */
export interface BeadSeoDef {
  path: string;
  h1: string;
  title: string;
  description: string;
  intro: string[];
  faqs: { q: string; a: string }[];
}

export const BEAD_HUB_SEO: BeadSeoDef = {
  path: '/perler-bead-patterns/',
  h1: 'Free Perler Bead Patterns',
  title: '100+ Free Perler Bead Patterns — Recolor, Print & Iron',
  description:
    'Free fuse bead patterns for every level: dogs, cats, bunnies, pandas, chibi characters and a Halloween set. Recolor any area with the real 103-color Perler line, then print the template and its bead list.',
  intro: [
    '106 designs across animals, characters, Halloween and quick makes — from 19-bead-wide starters that fit one pegboard to 90-bead-wide portraits. Every board is converted bead by bead from community designs and matched to the official 103-color Perler line, so the shopping list names colors you can actually buy.',
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
      a: 'The smallest designs fit a single large interlocking pegboard (29×29). Mid-size designs run 30 to 64 beads wide — two or three large boards snapped together. The widest portraits hit 90 beads across and span up to nine boards. Every pattern page lists its exact grid size.',
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
    title: '52 Free Perler Bead Animal Patterns — Corgi, Cat, Bunny & More',
    description:
      'Free perler bead animal patterns: corgi, shiba, husky, golden retriever, orange cat, calico kittens, carrot bunnies, pandas and more — all converted from community designs. Recolor each animal online, then print the template.',
    intro: [
      'Fifty-two animal boards converted bead by bead from community designs onto the real 103-color Perler line — a whole kennel of corgis, shibas, huskies and golden retrievers, orange cats and calico kittens, carrot bunnies, pandas, lambs and penguins, from 19 beads wide up to 90. Each one separates fur, inner ears, eyes, nose and mouth into their own zones — so a cheddar corgi becomes a gray one in two clicks, without redrawing anything.',
      'Start with Corgi Butt Peek (19 beads wide) or a cozy carrot bunny if this is your first board: mostly one color with a few details. Save the 90-wide showpieces for after placing beads from a printed grid feels natural.',
    ],
    faqs: [
      {
        q: 'Which animal pattern is easiest for beginners?',
        a: 'Corgi Butt Peek — 19 beads wide, big color areas, and it reads instantly. The cozy carrot bunnies and the garden lamb are close behind at 27–30 beads wide.',
      },
      {
        q: 'How long does an animal pattern take?',
        a: 'A 19-to-30-bead-wide animal is a single evening — under an hour of placing plus a few minutes of ironing. The 90-wide showpieces are a deliberate weekend board at several thousand beads.',
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
    title: 'Easy Perler Bead Patterns for Beginners — Free & Printable',
    description:
      'Beginner fuse bead patterns that still look great: small corgis, bunnies, lambs and cats with straightforward, forgiving grids. Pick one, recolor it online, print the template and start beading.',
    intro: [
      'Every design here is marked easy in our catalog: a simple silhouette, mostly-large color areas, and no fiddly single-bead details. Most are small corgis, bunnies, lambs and cats — the kind of board a first-timer finishes in one sitting.',
      'If this is your very first pattern, start with Corgi Butt Peek — 19 beads wide on a single pegboard. Move up to a 28-wide face like a cozy carrot bunny or Catnap Clementine once placing beads from a printed grid feels natural.',
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
    title: '41 Free Perler Bead Character Patterns — Girls, Chibi & More',
    description:
      'Free fuse bead character patterns: cute girls with bows and braids, chibi heroes, ghosts and goblins. Every board matched to real bead colors — recolor, print and start placing.',
    intro: [
      'Forty-one character boards converted bead by bead onto the real 103-color Perler line — big-eyed girls with ribbons and nightcaps, tiny chibi heroes, wizards and vampires. Each one keeps its original proportions, so the face you loved on screen is the face you iron.',
      'Every pattern page gives you three things at once: the printable grid with row and column counts, the shopping list with exact bead counts per color, and the online board where you can repaint any area before you commit a single bead.',
    ],
    faqs: [
      {
        q: 'What board sizes do the character patterns use?',
        a: 'They run from 30 to 90 beads wide. The smallest fit one or two large pegboards; the widest portraits span nine and want a flat working surface you will not need for a day. Each pattern page lists its exact grid.',
      },
      {
        q: 'Which characters are easiest for beginners?',
        a: 'Start with anything under 40 beads wide — the small girls and simple silhouettes have large color areas and forgiving outlines. Save the 80-wide portraits for your third or fourth board.',
      },
      {
        q: 'Can I change the colors on a character?',
        a: 'Yes — that is the point of the online board. Hair, dress, background: pick any area and repaint it with any of the 103 real bead colors. The bead list updates the moment you do.',
      },
    ],
  },
};
