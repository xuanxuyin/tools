import type { PageDef } from './pageTypes';
import type { PaintArt } from './halloween';

/**
 * Christmas seasonal cluster (11/29 batch, PLAN §3 #22). Ships four weeks
 * before the 2026-11-15 deadline and 4-6 weeks before the December search
 * spike, riding the same PageDef pipeline and the same engines as the
 * Halloween and Thanksgiving clusters: wordSearch.ts, factsFor, the
 * SignInSheet/WordSearchSheet/ColorByNumberSheet components. New surface
 * area is exactly one component (LetterToSantaSheet) and one hub page.
 */

export const CHRISTMAS_WORDS_EASY: string[] = [
  'santa', 'tree', 'star', 'gift', 'snow', 'bell', 'elf', 'deer', 'toy',
  'candle', 'stocking', 'wreath',
];

export const CHRISTMAS_WORDS_HARD: string[] = [
  'ornament', 'reindeer', 'snowflake', 'chimney', 'gingerbread', 'sleigh',
  'mistletoe', 'carol', 'jingle', 'tinsel', 'nog', 'coal',
];

/* ------------------------------------------------------------------ */
/* Color-by-number art (same contract as Halloween/Thanksgiving:        */
/* 0 = leave blank). Tree = addition sums to 12; snowman =              */
/* multiplication products to 12. Art is painted as strings then        */
/* parsed once at module load; the exported `cells` is a pure number    */
/* matrix.                                                              */
/* ------------------------------------------------------------------ */

const TREE_PAINT = [
  '......Y......',
  '.....YYY.....',
  '.....GGG.....',
  '....GRGRG....',
  '...DDDDDDD...',
  '....GGGGG....',
  '...GGGGGGG...',
  '..DDDDDDDDD..',
  '...GGGRGGG...',
  '..GGRGGGGRG..',
  '.GGRGGGGGGRG.',
  'DDDDDDDDDDDDD',
  '.....BBB.....',
  '.....BBB.....',
];

const SNOWMAN_PAINT = [
  '...KKKKK...',
  '...KKKKK...',
  '.KKKKKKKKK.',
  '..WWWWWWW..',
  '..WKWWWKW..',
  '..WWWOOWW..',
  '.SSSSSSSSS.',
  '.WWWWWWWWW.',
  '.WWKWWWKWW.',
  '.WWWWWWWWW.',
  'WWWWWWWWWWW',
  'WWKWWKWWKWW',
  'WWWWWWWWWWW',
];

// Tree chars: Y star, G green, D dark green, R ornament, B trunk.
// Snowman chars: K hat/eyes/buttons, W body, O nose, S scarf.
const ART_KEY: Record<string, number> = {
  Y: 10, G: 6, D: 4, R: 12, B: 9, K: 12, W: 6, O: 8, S: 4,
};

/** Christmas tree with ornaments, 14x13. Addition edition: every key is a sum. */
export const TREE_ADDITION: PaintArt = {
  name: 'Christmas tree',
  cells: TREE_PAINT.map((row) => [...row].map((ch) => ART_KEY[ch] ?? 0)),
  palette: {
    4: '#2c5e2e',
    6: '#3f7d3a',
    9: '#7a4a21',
    10: '#f2b53c',
    11: '#d4a017',
    12: '#c0392b',
  },
  legend: {
    4: 'dark green',
    6: 'green',
    9: 'brown',
    10: 'yellow',
    11: 'gold', // declared but never painted — usedKeys drops it (ghost precedent)
    12: 'red',
  },
};

/** Snowman with top hat and scarf, 13x11. Multiplication edition: products. */
export const SNOWMAN_MULTIPLICATION: PaintArt = {
  name: 'Snowman',
  cells: SNOWMAN_PAINT.map((row) => [...row].map((ch) => ART_KEY[ch] ?? 0)),
  palette: { 4: '#c0392b', 6: '#f4f2ec', 8: '#e8801f', 12: '#1d1d1b' },
  legend: { 4: 'red', 6: 'white', 8: 'orange', 12: 'black' },
};

/** Legend keys the art actually uses — unused palette entries never print. */
export function usedKeys(art: PaintArt): number[] {
  const used = new Set(art.cells.flat().filter((k) => k !== 0));
  return [...used].sort((a, b) => a - b);
}

/* ------------------------------------------------------------------ */
/* Page defs                                                           */
/* ------------------------------------------------------------------ */

export const christmasPages: PageDef[] = [
  {
    slug: 'christmas-word-search',
    hub: 'christmas',
    h1: 'Christmas Word Search',
    metaTitle: 'Christmas Word Search — 2 Free Printable Puzzles (K-5) | ChartGlade',
    metaDescription:
      'Free printable Christmas word search in two levels: an easy K-2 puzzle with forwards words and a grade 3-5 puzzle with all eight directions. Print and go.',
    lead:
      'Two Christmas word searches, one letter page each: an easy puzzle for kindergarten through second grade (words run right, down and diagonally only) and a harder one for grades 3-5 (all eight directions, backwards included). The lists stick to classroom-safe December vocabulary — santa, stocking, reindeer, gingerbread — so the hunt doubles as vocabulary work for the last stretch before winter break.',
    introHeading: 'What each level asks of the solver',
    intro: [
      'The easy puzzle keeps every word reading forwards — left to right, top to bottom, or down-right — because reading a word backwards is a separate skill from recognizing it at all. For a kindergartner, finding STOCKING along a diagonal is real work: the eye has to hold eight letters in order while the decoy letters around them compete for attention. That is the quiet curriculum inside any word search — visual discrimination, letter-sequence memory, and the discipline to scan a full line without skipping.',
      'The harder puzzle unlocks all eight directions, the standard upper-elementary format, and the Christmas list runs long: GINGERBREAD is eleven letters, MISTLETOE and SNOWFLAKE nine. Finding them takes a system — down each column, across each row, then both diagonals — which is exactly the systematic scanning teachers want from morning work in the final days of December. The vocabulary stays secular and school-safe (ornament, carol, tinsel, chimney), so the puzzle flies in public-school classrooms without a second thought.',
    ],
    printNote: 'Two puzzles, one letter page each (portrait). Word lists print under each grid.',
    tips: [
      {
        title: 'Front-load the vocabulary',
        body: 'Read the word list aloud together before pencils touch the grid — a word search is a reading task only after the words mean something. Ornament and mistletoe are the two that usually need a quick picture or definition first, especially for English learners.',
      },
      {
        title: 'Name the scanning routine',
        body: 'Strong solvers scan one full row at a time, then the columns, then the diagonals — never random hops. Saying that routine out loud once turns the puzzle into a strategy lesson instead of ten minutes of lucky guessing.',
      },
      {
        title: 'The last week before break',
        body: 'December word searches are the classic pre-break seatwork: they hold focus while the room hums with holiday energy. Print double-sided with the color-by-number sheet and you have a two-station packet that survives even the party-day schedule.',
      },
      {
        title: 'Found is not finished',
        body: 'Early finishers pick three words from the list and write a sentence for each on the back — "I hung the stocking by the fireplace" counts. December vocabulary becomes December writing, and you get a quiet window of assessment for free.',
      },
    ],
    faqs: [
      {
        q: 'What words are in the Christmas word search?',
        a: 'The easy puzzle (K-2) hides santa, tree, star, gift, snow, bell, elf, deer, toy, candle, stocking and wreath. The harder puzzle (grades 3-5) hides ornament, reindeer, snowflake, chimney, gingerbread, sleigh, mistletoe, carol, jingle, tinsel, nog and coal.',
      },
      {
        q: 'How hard is each puzzle?',
        a: 'The easy puzzle is a 12x12 grid where words run only right, down, or down-right — nothing reads backwards. The hard puzzle is a 13x13 grid where words run in all eight directions, including reversed and upward, the standard grades 3-5 format.',
      },
      {
        q: 'What grade is a Christmas word search for?',
        a: 'Kindergarten through fifth grade. The easy grid suits K-2 as letter-recognition and December vocabulary work; the eight-direction grid suits grades 3-5 as morning work in the days before winter break.',
      },
      {
        q: 'Is the word list okay for public school?',
        a: 'Yes — the lists stick to secular holiday vocabulary: santa, gifts, trees, snow, reindeer, ornaments and treats (gingerbread, nog). No religious terms, so the puzzles work in any classroom and at any family table.',
      },
      {
        q: 'Does it print in black and white?',
        a: 'Yes — the puzzles are letters only, so a plain black-and-white copier print works fine. Print one letter page per puzzle at 100% scale.',
      },
    ],
    related: [
      { href: '/christmas-color-by-number/', label: 'Christmas color by number (math facts)' },
      { href: '/letter-to-santa/', label: 'Letter to Santa template' },
      { href: '/christmas-printables/', label: 'All Christmas printables' },
      { href: '/halloween-word-search/', label: 'Halloween word search' },
    ],
  },
  {
    slug: 'christmas-color-by-number',
    hub: 'christmas',
    h1: 'Christmas Color by Number',
    metaTitle: 'Christmas Color by Number — Free Printable Math Facts | ChartGlade',
    metaDescription:
      'Free printable Christmas color by number with real math inside: a tree addition sheet (sums to 12) and a snowman multiplication sheet (facts to 12).',
    lead:
      'A December coloring page that is secretly a math sheet: every cell of the Christmas tree holds an addition fact whose sum points to a legend color, and every cell of the snowman holds a multiplication fact. Solve, check the legend, color — a full page works dozens of math facts without ever feeling like a worksheet, and the last week of December needs exactly that.',
    introHeading: 'Why math-facts coloring works',
    intro: [
      'A color-by-number page is retrieval practice in costume: each cell asks one fact, the legend checks the answer, and the picture rewards a full page of correct recall. Wrong answers announce themselves — a red patch where the green tree should be tells a student exactly which fact to fix before an adult ever sees the paper. That built-in answer key is why these sheets hold up during the week before break when ordinary worksheets do not.',
      'The tree sheet uses addition facts with sums to 12, the grade 1-2 sweet spot, with wide bands of green so the picture reads early and momentum holds. The snowman sheet uses multiplication facts with products to 12 for grades 3-4 — the white body regions are the forgiving cells, while the hat, scarf, buttons and carrot nose split the remaining facts into small patches that demand care.',
    ],
    printNote: 'Two sheets, one letter page each (portrait). Crayon-friendly; legend names its colors.',
    tips: [
      {
        title: 'Color the legend first',
        body: 'Have students outline each legend square with its crayon before starting. It prevents the classic mid-page discovery that the red is buried at the bottom of the pencil box, and it fixes the color-to-number mapping in memory before the math starts.',
      },
      {
        title: 'Answers in the corner',
        body: 'Ask students to write each answer lightly in the cell corner before coloring. Thirty sheets grade in ten seconds flat, and the picture still comes out clean under the crayon.',
      },
      {
        title: 'Read the error patches',
        body: 'The colors make error patterns visible at a glance: a student who colors 2×3 cells with the 2+3 color is telling you exactly which fact family to reteach before the break. A wrong-colored patch is a diagnostic, not a mess.',
      },
      {
        title: 'Pair it with the word search',
        body: 'Printed double-sided with the Christmas word search, the two sheets make a complete party-day or pre-break packet: reading on one side, math on the other, zero preparation for the teacher.',
      },
    ],
    faqs: [
      {
        q: 'Is this a real math worksheet?',
        a: 'Yes — every cell contains an addition or multiplication fact, and its answer maps to a legend color. The Christmas tree drills addition facts with sums to 12; the snowman drills multiplication facts with products to 12. Coloring without solving gets the picture wrong.',
      },
      {
        q: 'What grades is it for?',
        a: 'The addition tree fits grades 1-2 (sums capped at 12); the multiplication snowman fits grades 3-4 (facts through 12). Both print on one letter page each.',
      },
      {
        q: 'Can I print it in black and white?',
        a: 'The legend squares print in color, but every legend entry also names its color — dark green, green, brown, yellow and red for the tree; white, black, orange and red for the snowman — so a black-and-white copy still works: students match the answer to the color name, not just the swatch.',
      },
      {
        q: 'Why is the snowman mostly white?',
        a: 'By design. The white body regions carry the friendliest products (1×6, 2×3 and friends), so early success comes fast, while the hat, scarf and nose hold the smaller, trickier patches. Students can leave white cells uncolored or shade them lightly with a white or gray crayon.',
      },
      {
        q: 'Do the two pictures share answers?',
        a: 'No. The tree keys colors to sums; the snowman keys colors to products. Same format, two operations — pick the sheet that matches the week\'s math focus.',
      },
    ],
    related: [
      { href: '/christmas-word-search/', label: 'Christmas word search' },
      { href: '/letter-to-santa/', label: 'Letter to Santa template' },
      { href: '/christmas-printables/', label: 'All Christmas printables' },
      { href: '/addition-chart/', label: 'Addition chart (all facts)' },
      { href: '/multiplication-chart/', label: 'Multiplication chart 1-12' },
    ],
  },
  {
    slug: 'letter-to-santa',
    hub: 'christmas',
    h1: 'Letter to Santa Template',
    metaTitle: 'Letter to Santa Template — Free Printable Writing Paper | ChartGlade',
    metaDescription:
      'Free printable letter to Santa template with three sentence frames, a draw-for-Santa box and a Love line. Christmas writing practice for K-5.',
    lead:
      'A write-a-letter-to-Santa page built for real teaching: three sentence frames — "For Christmas, I would like ___ because ___" — walk hesitant writers past the blank page, a "Love," line closes the letter properly, and a drawing box gives pre-writers their part. One letter page, kindergarten through grade 5.',
    introHeading: 'Why sentence frames carry a Santa letter',
    intro: [
      'A blank "Dear Santa" page defeats exactly the kids who need writing practice most. Frames do the structural lifting — the student supplies the content, not the sentence architecture — and the because blank does the teaching: "For Christmas, I would like a telescope because I can see the stars from my yard" is a sentence that required a reason, not just a wish. And the audience does the motivating; kids write willingly when Santa is on the receiving end.',
      'The sheet flexes across the whole elementary range. Kindergartners dictate or inventive-spell the first frame, then spend their energy in the drawing box. Grades 1-3 work all three frames with the printed models as training wheels. Grades 4-5 treat the page as a draft and copy a polished letter onto nice paper for the mailbox — the frames keep even strong writers specific instead of "I want a lot of toys."',
    ],
    printNote: 'One letter page, portrait. Three frames, a signature line and a drawing box.',
    tips: [
      {
        title: 'Ask for one big thing',
        body: 'Push students past the catalog list: one main wish plus the because. The frame makes the constraint feel official, and one reasoned request is a better writing lesson than ten nouns in a row.',
      },
      {
        title: 'The proud frame is the keeper',
        body: '"This year I am proud that ___" turns a wish list into a reflection. Read a stack aloud with permission and the room goes genuinely warm — and families report this line is the one they keep.',
      },
      {
        title: 'Mail it for real',
        body: 'Fold the letter, address an envelope to the North Pole, add a stamp. The US Postal Service runs an Operation Santa program that answers children\'s letters, so the ritual of mailing is the writing motivation. Send in early December for the best chance of a reply.',
      },
      {
        title: 'For pre-writers',
        body: 'The drawing box is the assignment, not the reward: draw the gift first, then dictate one frame while an adult or older buddy writes the words lightly in pencil for the child to trace over.',
      },
    ],
    faqs: [
      {
        q: 'What is on the letter to Santa template?',
        a: 'A title, name and date lines, a "Dear Santa," greeting, three sentence frames — "For Christmas, I would like … because …", "This year I am proud that …" and "One question I have for you is …" — a "Love," signature line, and a drawing box.',
      },
      {
        q: 'What grade is it for?',
        a: 'Kindergarten through grade 5. K-1 students dictate or trace a frame and use the drawing box; grades 2-3 write all three frames independently; grades 4-5 use the page as a draft and copy a polished letter for the mailbox.',
      },
      {
        q: 'Does the post office really answer letters to Santa?',
        a: 'Yes — the US Postal Service\'s Operation Santa program lets volunteers adopt and fulfill children\'s letters, and many local post offices reply to letters dropped in branch mailboxes. Write early in December if a reply matters.',
      },
      {
        q: 'Is the template religious?',
        a: 'No — Santa, gifts and winter fun are the whole theme, so it works in public-school classrooms and for families of any tradition.',
      },
      {
        q: 'Can families use it at home?',
        a: 'Yes — print one per child before December gets away from you. Plenty of families keep finished letters in the ornament box; reading them back years later is the whole payoff.',
      },
    ],
    related: [
      { href: '/christmas-word-search/', label: 'Christmas word search' },
      { href: '/christmas-color-by-number/', label: 'Christmas color by number' },
      { href: '/i-am-thankful-for-worksheet/', label: 'I am thankful for worksheet' },
      { href: '/christmas-printables/', label: 'All Christmas printables' },
    ],
  },
];
