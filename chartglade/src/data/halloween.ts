import type { PageDef } from './pageTypes';

/**
 * Halloween seasonal cluster (10/05 batch, judged against the US school
 * calendar: pages ship 4-6 weeks before 10/31 so Google can index and rank
 * them before the search spike). Three printables + a hub, all riding the
 * existing PageDef pipeline. Word lists double as the cursive page's vocab,
 * so the cluster teaches the same words three ways — scan them, add them,
 * write them.
 */

export const HALLOWEEN_WORDS_EASY: string[] = [
  'bat', 'cat', 'hat', 'owl', 'web', 'moon', 'corn', 'fall', 'ghost', 'candy', 'witch', 'spooky',
];

export const HALLOWEEN_WORDS_HARD: string[] = [
  'pumpkin', 'october', 'costume', 'skeleton', 'phantom', 'potion', 'haunted', 'cobweb',
  'spider', 'broom', 'mummy', 'monster',
];

/* ------------------------------------------------------------------ */
/* Color-by-number art: 0 = leave blank, other digits are legend keys. */
/* ------------------------------------------------------------------ */

export interface PaintArt {
  name: string;
  /** rows of legend keys; 0 means the cell stays white */
  cells: number[][];
  /** key -> CSS color the printed swatch shows */
  palette: Record<number, string>;
  /** key -> color name as printed in the legend */
  legend: Record<number, string>;
}

/** Jack-o'-lantern, 13x13. Addition edition: every key is a sum. */
export const PUMPKIN_ADDITION: PaintArt = {
  name: 'Jack-o’-lantern',
  cells: [
    [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0],
    [0, 0, 6, 6, 8, 8, 8, 8, 6, 6, 0, 0, 0],
    [0, 6, 6, 8, 8, 8, 8, 8, 8, 6, 6, 0, 0],
    [0, 6, 8, 8, 12, 8, 8, 8, 12, 8, 8, 6, 0],
    [0, 6, 8, 12, 12, 8, 10, 8, 12, 12, 8, 6, 0],
    [0, 6, 8, 8, 12, 10, 10, 10, 12, 8, 8, 6, 0],
    [0, 6, 8, 8, 10, 10, 10, 10, 10, 8, 8, 6, 0],
    [0, 6, 6, 8, 10, 12, 12, 12, 10, 8, 6, 6, 0],
    [0, 0, 6, 6, 10, 10, 12, 10, 10, 6, 6, 0, 0],
    [0, 0, 0, 6, 6, 10, 10, 10, 6, 6, 0, 0, 0],
    [0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0],
  ],
  palette: { 4: '#3f7d3a', 6: '#c25a13', 8: '#e8801f', 10: '#f2b53c', 12: '#1d1d1b' },
  legend: { 4: 'green', 6: 'dark orange', 8: 'orange', 10: 'yellow', 12: 'black' },
};

/** Friendly ghost, 11x12. Multiplication edition: every key is a product. */
export const GHOST_MULTIPLICATION: PaintArt = {
  name: 'Friendly ghost',
  cells: [
    [0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0],
    [0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0],
    [0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0],
    [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0],
    [0, 0, 6, 6, 10, 6, 6, 10, 6, 6, 0],
    [0, 0, 6, 6, 10, 6, 6, 10, 6, 6, 0],
    [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0],
    [0, 0, 6, 6, 6, 10, 10, 6, 6, 6, 0],
    [0, 0, 6, 6, 6, 10, 10, 6, 6, 6, 0],
    [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0],
    [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0],
    [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 0],
  ],
  palette: { 6: '#f4f2ec', 10: '#232323', 12: '#7d5bb5' },
  legend: { 6: 'white', 10: 'black', 12: 'purple' },
};

/** Facts for a legend key so every cell shows a fresh-but-checkable problem. */
export function factsFor(key: number, mode: 'add' | 'mul'): { a: number; b: number }[] {
  if (mode === 'add') {
    const facts: { a: number; b: number }[] = [];
    for (let a = 1; a < key; a++) facts.push({ a, b: key - a });
    return facts;
  }
  const facts: { a: number; b: number }[] = [];
  for (let a = 1; a <= key; a++) {
    if (key % a === 0) facts.push({ a, b: key / a });
  }
  return facts;
}

/* ------------------------------------------------------------------ */
/* Page defs                                                           */
/* ------------------------------------------------------------------ */

export const halloweenPages: PageDef[] = [
  {
    slug: 'halloween-word-search',
    hub: 'halloween',
    h1: 'Halloween Word Search',
    metaTitle: 'Halloween Word Search — 2 Free Printable Puzzles (K-5) | ChartGlade',
    metaDescription:
      'Free printable Halloween word search in two levels: an easy K-2 puzzle with forwards words and a grade 3-5 puzzle with all eight directions. Print and go, no sign-up.',
    lead:
      'Two Halloween word searches on one page: an easy puzzle for kindergarten through second grade (words hide right, down and diagonally only) and a harder one for grades 3-5 (words run in all eight directions, backwards included). Print, copy, hand out — the word lists double as October vocabulary.',
    introHeading: 'What each level asks of the solver',
    intro: [
      'The easy puzzle keeps every word reading forwards — left to right, top to bottom, or down-right — because hunting backwards is a separate skill from recognizing words at all. For a kindergartner still anchoring letter names, finding CANDY along a diagonal is already real work: the eye must hold the letter sequence while ignoring the decoy letters packed around it. That is the quiet curriculum of any word search — visual discrimination, letter-sequence memory, and the discipline to scan a full line without skipping.',
      'The harder puzzle turns on the full eight directions, which is the standard upper-elementary format. Words like SKELETON and OCTOBER run long, so finding them takes systematic scanning: down each column, across each row, then the diagonals. Teachers use these as October morning work, Halloween-party-day seatwork that still counts as reading, and early-finisher bins — the seasonal vocabulary (costume, potion, phantom) rides along with the scanning practice.',
    ],
    printNote: 'Two puzzles, one letter page each (portrait). Word lists print under each grid.',
    tips: [
      {
        title: 'Front-load the vocabulary',
        body: 'Read the word list aloud together before the pencil touches the grid — a word search is a reading task only after the words are known. For English learners, a quick picture for witch, broom and cobweb pays for itself.',
      },
      {
        title: 'Teach the scan, not just the hunt',
        body: 'Strong solvers scan one full row at a time, then columns, then diagonals — not random hops. Naming that routine out loud once turns word search time into a strategy lesson instead of luck.',
      },
      {
        title: 'Party day without losing the room',
        body: 'A word search is the classic Halloween-party station: it holds a full class period of focus while costumed chaos rotates around it. Print double-sided with the color-by-number sheet and the party runs itself.',
      },
      {
        title: 'Found is not finished',
        body: 'Have early finishers write each found word in a sentence on the back — October vocabulary becomes October writing, and you get five quiet minutes of assessment for free.',
      },
    ],
    faqs: [
      {
        q: 'What words are in the Halloween word search?',
        a: 'The easy puzzle (K-2) hides bat, cat, hat, owl, web, moon, corn, fall, ghost, candy, witch and spooky. The harder puzzle (grades 3-5) hides pumpkin, october, costume, skeleton, phantom, potion, haunted, cobweb, spider, broom, mummy and monster.',
      },
      {
        q: 'How hard is each puzzle?',
        a: 'The easy puzzle is a 12x12 grid where words run only right, down, or down-right — nothing reads backwards. The hard puzzle is a 13x13 grid where words run in all eight directions, including reversed and upward, which is the standard grades 3-5 format.',
      },
      {
        q: 'What grade is a Halloween word search for?',
        a: 'Kindergarten through fifth grade. The easy grid suits K-2 as letter-recognition and seasonal vocabulary work; the eight-direction grid suits grades 3-5 as morning work or a party-day station that still counts as reading practice.',
      },
      {
        q: 'Does it print in black and white?',
        a: 'Yes — the puzzles are letters only, so a plain black-and-white copier print works fine. Print one letter page per puzzle at 100% scale.',
      },
    ],
    related: [
      { href: '/halloween-color-by-number/', label: 'Halloween color by number (math facts)' },
      { href: '/halloween-cursive-practice/', label: 'Halloween cursive practice' },
      { href: '/sight-words/', label: 'Sight words printables' },
    ],
  },
  {
    slug: 'halloween-color-by-number',
    hub: 'halloween',
    h1: 'Halloween Color by Number',
    metaTitle: 'Halloween Color by Number — Free Printable Math Facts Sheets | ChartGlade',
    metaDescription:
      'Free printable Halloween color by number worksheets with real math inside: a jack-o-lantern addition sheet and a ghost multiplication sheet. Solve, match, color — K-5.',
    lead:
      'Color by number with the math left in: every cell of the jack-o’-lantern holds an addition fact whose sum matches the color key, and every cell of the ghost holds a multiplication fact. Solve, check the legend, color — a full sheet works dozens of math facts without feeling like a worksheet.',
    introHeading: 'Why math-facts coloring works',
    intro: [
      'A color-by-number page is retrieval practice in costume. Each cell asks one fact, the legend checks the answer, and the picture rewards a full page of correct recall — the same repetitions as a facts worksheet, but with a built-in answer key the student actually wants to consult. Because wrong answers show up immediately as wrong-colored patches, self-checking is built in: a pumpkin with a green nose announces exactly which facts to review.',
      'The jack-o’-lantern sheet uses sums to 12 (addition within 20, the grade 1-2 sweet spot), and the ghost sheet uses products from the easiest tier (multiplication within 12, grades 3-4). Both pictures read clearly even in the marker-heavy hands of a class party, and the ghost is deliberately forgiving — large body regions of a single product mean early success while the face details hold the attention.',
    ],
    printNote: 'Two sheets, one letter page each (portrait). Crayon-friendly; color legend prints in color.',
    tips: [
      {
        title: 'Color the legend first',
        body: 'Have students outline each legend square with its crayon before starting — it prevents the classic mid-page discovery that the orange is buried at the bottom of the box.',
      },
      {
        title: 'Answers under the fact',
        body: 'Ask students to write each answer lightly in the cell corner before coloring. You can grade 30 sheets of math in ten seconds flat, and the picture still comes out clean.',
      },
      {
        title: 'Use it as an informal diagnostic',
        body: 'The color patches make error patterns visible at a glance: a student who colors every 2×3 cell with the 2+3 color is telling you exactly which fact family to reteach.',
      },
      {
        title: 'Party-day pairing',
        body: 'This sheet plus the word search is a complete party-day packet that keeps math and reading alive under the costumes. Print double-sided and the room stays quiet for a full rotation.',
      },
    ],
    faqs: [
      {
        q: 'Is this a real math worksheet?',
        a: 'Yes — every cell contains an addition or multiplication fact, and its answer maps to a legend color. The jack-o’-lantern sheet drills addition facts with sums to 12; the ghost sheet drills multiplication facts with products to 12. Coloring without solving gets the picture wrong.',
      },
      {
        q: 'What grades is it for?',
        a: 'The addition jack-o’-lantern fits grades 1-2 (addition within 20); the multiplication ghost fits grades 3-4 (facts through 12). Both print on one letter page each.',
      },
      {
        q: 'Can I print it in black and white?',
        a: 'The legend squares print in color, but every cell also names its color in the legend — so a black-and-white copy still works: students match the answer to the color name, not just the swatch.',
      },
      {
        q: 'Do the two pictures share answers?',
        a: 'No. The addition sheet keys colors to sums; the multiplication sheet keys colors to products. Same format, two different operations — pick the sheet that matches the week’s math focus.',
      },
    ],
    related: [
      { href: '/halloween-word-search/', label: 'Halloween word search' },
      { href: '/halloween-cursive-practice/', label: 'Halloween cursive practice' },
      { href: '/addition-chart/', label: 'Addition chart (all facts)' },
      { href: '/multiplication-chart/', label: 'Multiplication chart 1-12' },
    ],
  },
  {
    slug: 'halloween-cursive-practice',
    hub: 'halloween',
    h1: 'Halloween Cursive Practice',
    metaTitle: 'Halloween Cursive Practice — Free Printable Cursive Words Sheet | ChartGlade',
    metaDescription:
      'Free printable Halloween cursive worksheet: trace and write seasonal words like pumpkin, ghost and spooky in cursive. Dotted-model tracing rows for grades 2-5.',
    lead:
      'Cursive practice with words kids actually want to write in October: pumpkin, ghost, spooky, skeleton. Each word gets a tracing row with dotted models followed by blank baselines for independent writing — the same trace-then-write routine as our letter sheets, now in Halloween vocabulary.',
    introHeading: 'Seasonal words, year-round technique',
    intro: [
      'Motivation is the scarce resource in handwriting practice, and October hands it to you for free: the words on this sheet are the ones students are already asking to spell. A word like pumpkin covers a useful stroke curriculum in seven letters — the p’s descenders, the k’s connectors, the double-n bounce — while feeling like play rather than penmanship.',
      'The sheet keeps the trace-then-write rhythm that makes practice stick: two dotted models to build the muscle memory, then blank baselines where the word must be produced from memory. Tracing alone drifts into drawing; writing alone drifts into frustration. Alternating the two, word by word, is the routine that carries a new letterform into a student’s daily handwriting.',
    ],
    printNote: 'One letter page, portrait. Lowercase models in a dotted-style cursive font.',
    tips: [
      {
        title: 'Say the strokes while tracing',
        body: 'Naming strokes aloud (”over, swing up, bounce”) while tracing locks the sequence in far better than silent tracing. Whisper it if the class is shy — the mouth teaches the hand.',
      },
      {
        title: 'Best two, not all five',
        body: 'Ask students to circle their best two attempts per row, not to fill every baseline. Self-evaluation beats volume: hunting for your best letter is closer attention than writing the word five more times.',
      },
      {
        title: 'Then make something with it',
        body: 'The sheet earns its keep as a warm-up for a real task — a Halloween card, a costume tag, a spooky classroom banner. Handwriting that goes somewhere is handwriting that sticks.',
      },
      {
        title: 'Join the letters they know',
        body: 'If a student has only covered a-c-e-o so far, have them trace just those letters inside each word. The sheet flexes down to partial-alphabet learners without any reprinting.',
      },
    ],
    faqs: [
      {
        q: 'What words are on the sheet?',
        a: 'Two levels: bat, cat, hat, moon, ghost, candy, witch and spooky for younger writers; pumpkin, october, costume, skeleton, phantom, spider, mummy and monster for grades 3-5.',
      },
      {
        q: 'What grade is Halloween cursive practice for?',
        a: 'Cursive typically starts in grade 2 or 3, and the word list stretches usefully through grade 5. Younger students can stay on the easy list; older ones get the long words with descenders and connectors.',
      },
      {
        q: 'Does it teach the cursive letters?',
        a: 'It practices them. For stroke-by-stroke instruction, pair it with our 26 letter sheets — each letter gets its own page with numbered stroke steps and a common-pitfall note. This sheet is the seasonal payoff once letters are known.',
      },
      {
        q: 'Can it be used for print handwriting instead?',
        a: 'The models are cursive. For print-style name writing, use the name tracing generator, which sets any name in a dotted traceable print font.',
      },
    ],
    related: [
      { href: '/cursive/', label: 'All cursive letter worksheets (A-Z)' },
      { href: '/cursive-alphabet/', label: 'Cursive alphabet chart' },
      { href: '/name-tracing/', label: 'Name tracing generator' },
      { href: '/halloween-word-search/', label: 'Halloween word search' },
    ],
  },
];
