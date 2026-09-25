/**
 * SEO copy for the five bead-family landing pages (hub + 4 galleries).
 * Keyword targets from research/fuse-bead-patterns.md §七:
 *   hub       ← perler bead patterns 14.8K, perler bead ideas 9.9K,
 *               fuse bead patterns 1.6K, melty beads 1.6K, templates 720
 *   easy      ← easy perler bead patterns 1.3K
 *   animals   ← perler bead animals 590
 *   christmas ← christmas perler bead patterns 590
 *   food      ← perler bead food 390
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
  title: '46 Free Perler Bead Patterns — Recolor, Print & Iron',
  description:
    'Original fuse bead patterns for every level: animals, food, Halloween and Christmas. Recolor any area with real bead colors, then print the template and its bead list for free.',
  intro: [
    'Every pattern on this page was drawn here, bead by bead — no Pinterest reposts, no characters you are not allowed to sell. 46 designs across animals, food, minis, Halloween and Christmas, from evening-sized minis on one pegboard to a 64-bead-wide showpiece unicorn.',
    'What makes these different from a normal pattern grid: every area of a design — fur, frosting, scarf, eyes — is its own zone. Tap a zone and try any of 32 real bead colors before you commit. The bead list updates live, so you know exactly how many of each color to pull from the jar.',
    'When a design looks right, print it. The printed sheet gives you the empty template in zone outlines plus the shopping list of beads, and it fits on one letter-size page.',
  ],
  faqs: [
    {
      q: 'Are these Perler bead patterns really free?',
      a: 'Yes. Every pattern on this site is free to view, recolor and print for personal use, including for classrooms and craft groups. We do not gate downloads behind an account.',
    },
    {
      q: 'What size pegboard do I need?',
      a: 'The minis fit a single large interlocking pegboard (29×29). Full-size designs run 44 to 64 beads wide: most need two large interlocking boards side by side, and the unicorn needs three. Every pattern page lists its exact grid size.',
    },
    {
      q: 'Can I sell crafts I make from these patterns?',
      a: 'Yes — the designs are ours and we allow finished handmade items to be sold in small quantities (craft fairs, Etsy shops). We only ask that you do not resell or repost the patterns themselves.',
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
    title: '12 Free Perler Bead Animal Patterns — Cat, Panda, Fox & More',
    description:
      'Free perler bead animal patterns: cat, bunny, panda, fox, owl, penguin, dog, bear, frog, chick, dinosaur and unicorn. Recolor each animal online, then print the template.',
    intro: [
      'Twelve animal faces and figures at showpiece scale — 56 beads wide, with the unicorn an even bigger 64. Each one separates fur, inner ears, eyes, nose and mouth into their own zones — so a cheddar cat becomes a gray cat in two clicks, without redrawing anything.',
      'Start with the cat or the panda if this is your first showpiece: both are mostly one color with a few details. The unicorn is the flagship — about 1,600 beads, twenty-two recolorable zones.',
    ],
    faqs: [
      {
        q: 'Which animal pattern is easiest for beginners?',
        a: 'The panda. It is two colors total — white face plus black patches — with no small details to keep straight. The cat and the penguin are close behind.',
      },
      {
        q: 'How long does an animal pattern take?',
        a: 'Most crafters place the beads for one full-size animal in one to two hours, plus a few minutes of ironing. The unicorn is a deliberate afternoon at about 1,600 beads.',
      },
      {
        q: 'Can I turn these into keychains?',
        a: 'The full-size animals are shelf-and-wall pieces — a cat face finishes about 11 inches wide. For keychains and zipper pulls, use the minis instead: the mini heart and butterfly are sized for exactly that. Either way, iron both sides well and add a jump ring through a corner bead before the final pass.',
      },
    ],
  },
  food: {
    path: '/perler-bead-food/',
    h1: 'Perler Bead Food Patterns',
    title: '10 Free Perler Bead Food Patterns — Kawaii Cupcake, Pizza, Donut',
    description:
      'Free kawaii food bead patterns: cupcake, donut, pizza slice, ice cream cone, strawberry, cookie, watermelon, ice pop, burger and sushi roll. Recolor online and print.',
    intro: [
      'Ten kitchen classics in kawaii style — several of them with tiny faces, because a donut with a smile sells itself at a craft fair. Icing, dough, sprinkles and wrapper are separate zones on every design, so flavor swaps are one tap each.',
      'The pizza slice and the cookie are the easiest grids in this set. The cupcake and the sushi roll have the most going on and are satisfying second-week projects.',
    ],
    faqs: [
      {
        q: 'What can I do with finished bead food?',
        a: 'Magnets are the classic move — glue a strong button magnet on the back and the fridge becomes a diner. They also work as cake toppers, play-kitchen props and gift toppers.',
      },
      {
        q: 'Which food pattern uses the fewest colors?',
        a: 'The pizza slice: three colors plus optional basil flecks. The watermelon slice teaches color banding with five.',
      },
      {
        q: 'Do the faces have to stay black?',
        a: 'No — eyes and mouths are their own zones on every faced design. Chocolate-brown eyes on the cookie or navy eyes on the ice pop both look great.',
      },
    ],
  },
  christmas: {
    path: '/christmas-perler-bead-patterns/',
    h1: 'Christmas Perler Bead Patterns',
    title: '10 Free Christmas Perler Bead Patterns — Tree, Snowman, Stocking',
    description:
      'Free Christmas fuse bead patterns: tree, snowman, stocking, wreath, gift, gingerbread man, Santa hat, bell, reindeer and hot cocoa. Recolor and print for the holidays.',
    intro: [
      'Ten holiday designs at door-and-mantel scale, drawn to be made in batches. Tree, snowman and stocking are the trio most people start with — the sort of project where the whole mantel set gets ironed in one December afternoon.',
      'Every trim is its own zone: scarf separate from snow, ribbon separate from box, lights separate from foliage. That matters in December, when you want each family member’s stocking in their own color without redesigning anything.',
    ],
    faqs: [
      {
        q: 'When should I start Christmas bead projects?',
        a: 'Early-to-mid November. Each design takes an hour or two, and batches for gifting or the classroom add up fast — you do not want to be ironing on December 23.',
      },
      {
        q: 'Can these hang on a real Christmas tree?',
        a: 'Yes — iron both sides firmly so the piece is stiff, then thread a hook through one corner bead before the final ironing pass. The wreath and stocking are sturdy enough for yearly reuse.',
      },
      {
        q: 'Which Christmas pattern is best for a group of kids?',
        a: 'The gift box: straight lines, three colors, and every kid can pick their own ribbon color from the same template. The Santa hat is the fastest single-session finish.',
      },
    ],
  },
  easy: {
    path: '/easy-perler-bead-patterns/',
    h1: 'Easy Perler Bead Patterns',
    title: '27 Easy Perler Bead Patterns for Beginners — Free & Printable',
    description:
      'Beginner fuse bead patterns that still look great: animals, food and minis with straightforward, forgiving grids. Pick one, recolor it online, print the template and start beading.',
    intro: [
      'Every design here is marked easy in our catalog: a simple silhouette, mostly-large color areas, and no fiddly single-bead details except where they are the whole point (the mini heart’s shine, the moon’s eye).',
      'If this is your very first pattern, start with a mini — the heart is under 200 beads on one pegboard. Move up to a face design like the cat once placing beads from a printed grid feels natural.',
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
};
