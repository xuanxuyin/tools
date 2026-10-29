import type { PageDef } from './pageTypes';
import type { PaintArt } from './halloween';

/**
 * Thanksgiving seasonal cluster (10/25 batch, PLAN §3 #19). Judged against
 * the US school calendar: Thanksgiving is the fourth Thursday of November
 * (2026-11-26), so pages ship 10/25 — inside the 4-6 week indexing window
 * before the November search spike. Four printables + a hub, riding the
 * same PageDef pipeline and the same engines as the Halloween cluster
 * (wordSearch.ts, factsFor, the SignInSheet component).
 */

export const THANKSGIVING_WORDS_EASY: string[] = [
  'pie', 'corn', 'yam', 'fall', 'leaf', 'bake', 'share', 'family', 'turkey',
  'feast', 'thanks', 'autumn',
];

export const THANKSGIVING_WORDS_HARD: string[] = [
  'grateful', 'harvest', 'november', 'pumpkin', 'tradition', 'celebrate',
  'cranberry', 'stuffing', 'gratitude', 'blessing', 'drumstick', 'cornucopia',
];

/* ------------------------------------------------------------------ */
/* Color-by-number art (same contract as Halloween: 0 = blank cell).   */
/* Turkey = addition sums to 12; pumpkin pie = multiplication to 12.   */
/* ------------------------------------------------------------------ */

/** Turkey with a fanned tail, 13x13. Addition edition: every key is a sum. */
export const TURKEY_ADDITION: PaintArt = {
  name: 'Turkey',
  cells: [
    [0, 0, 0, 0, 8, 8, 8, 8, 8, 0, 0, 0, 0],
    [0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0],
    [0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0],
    [0, 8, 8, 8, 8, 8, 10, 10, 10, 8, 8, 0, 0],
    [0, 8, 8, 8, 8, 8, 10, 12, 10, 5, 8, 8, 0],
    [0, 8, 8, 8, 8, 8, 10, 10, 10, 4, 8, 8, 0],
    [0, 0, 8, 8, 6, 6, 6, 6, 6, 8, 8, 0, 0],
    [0, 0, 8, 6, 6, 6, 10, 10, 10, 6, 8, 0, 0],
    [0, 0, 6, 6, 6, 6, 10, 10, 10, 6, 6, 0, 0],
    [0, 0, 6, 6, 6, 6, 10, 10, 10, 6, 6, 0, 0],
    [0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0],
    [0, 0, 0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 0],
  ],
  palette: {
    4: '#c0392b',
    5: '#f2b53c',
    6: '#8c5a2b',
    8: '#e8801f',
    10: '#e5c29f',
    12: '#1d1d1b',
  },
  legend: {
    4: 'red',
    5: 'yellow',
    6: 'brown',
    8: 'orange',
    10: 'tan',
    12: 'black',
  },
};

/** Pumpkin pie with a cream swirl, 12x12. Multiplication edition: products. */
export const PIE_MULTIPLICATION: PaintArt = {
  name: 'Pumpkin pie',
  cells: [
    [0, 0, 0, 0, 8, 8, 8, 8, 0, 0, 0, 0],
    [0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0],
    [0, 8, 8, 8, 6, 6, 6, 6, 8, 8, 8, 0],
    [0, 8, 8, 6, 6, 6, 6, 6, 6, 8, 8, 0],
    [8, 8, 6, 6, 6, 10, 10, 6, 6, 6, 8, 8],
    [8, 8, 6, 6, 10, 10, 10, 10, 6, 6, 8, 8],
    [8, 8, 6, 6, 10, 10, 10, 10, 6, 6, 8, 8],
    [8, 8, 6, 6, 6, 10, 10, 6, 6, 6, 8, 8],
    [0, 8, 8, 6, 9, 6, 6, 9, 6, 8, 8, 0],
    [0, 8, 8, 8, 6, 6, 6, 6, 8, 8, 8, 0],
    [0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0],
    [0, 0, 0, 0, 8, 8, 8, 8, 0, 0, 0, 0],
  ],
  palette: { 6: '#c97a2b', 8: '#d9a05b', 9: '#7a4a21', 10: '#f6f1e3' },
  legend: { 6: 'orange', 8: 'golden brown', 9: 'dark brown', 10: 'cream' },
};

/** Legend keys the art actually uses — unused palette entries never print. */
export function usedKeys(art: PaintArt): number[] {
  const used = new Set(art.cells.flat().filter((k) => k !== 0));
  return [...used].sort((a, b) => a - b);
}

/* ------------------------------------------------------------------ */
/* Placemat word scramble — hand-fixed, checked by tests to be a true  */
/* permutation that never equals the answer.                          */
/* ------------------------------------------------------------------ */

export interface ScramblePair {
  word: string;
  scrambled: string;
}

export const PLACEMAT_SCRAMBLES: ScramblePair[] = [
  { word: 'turkey', scrambled: 'kyetur' },
  { word: 'family', scrambled: 'mylifa' },
  { word: 'feast', scrambled: 'tsafe' },
  { word: 'thanks', scrambled: 'snatkh' },
  { word: 'corn', scrambled: 'nocr' },
  { word: 'pie', scrambled: 'eip' },
];

/* ------------------------------------------------------------------ */
/* Page defs                                                           */
/* ------------------------------------------------------------------ */

export const thanksgivingPages: PageDef[] = [
  {
    slug: 'thanksgiving-word-search',
    hub: 'thanksgiving',
    h1: 'Thanksgiving Word Search',
    metaTitle: 'Thanksgiving Word Search — 2 Free Printable Puzzles (K-5) | ChartGlade',
    metaDescription:
      'Free printable Thanksgiving word search in two levels: an easy K-2 puzzle with forwards words and a grade 3-5 puzzle with all eight directions. Print and go.',
    lead:
      'Two Thanksgiving word searches on one page each: an easy puzzle for kindergarten through second grade (words hide right, down and diagonally only) and a harder one for grades 3-5 (words run in all eight directions, backwards included). The word lists are real November vocabulary — harvest, gratitude, cornucopia — so the hunt doubles as a vocabulary lesson.',
    introHeading: 'What each level asks of the solver',
    intro: [
      'The easy puzzle keeps every word reading forwards — left to right, top to bottom, or down-right — because hunting backwards is a separate skill from recognizing words at all. For a kindergartner, finding TURKEY along a diagonal is genuine work: the eye has to hold six letters in order while ignoring the decoy letters packed around them. That is the quiet curriculum inside any word search — visual discrimination, letter-sequence memory, and the discipline to scan a full line without skipping.',
      'The harder puzzle turns on all eight directions, the standard upper-elementary format. The Thanksgiving list runs long — CORNUCOPIA is ten letters, TRADITION and CELEBRATE nine — so finding them takes systematic scanning: down each column, across each row, then both diagonals. Teachers use these the week before break, at the kids\' table on the day itself, and as early-finisher bins all November, and the gratitude vocabulary (grateful, blessing, gratitude) rides along with the scanning practice.',
    ],
    printNote: 'Two puzzles, one letter page each (portrait). Word lists print under each grid.',
    tips: [
      {
        title: 'Front-load the vocabulary',
        body: 'Read the word list aloud together before the pencil touches the grid — a word search is a reading task only after the words are known. Cornucopia and gratitude are the two that usually need a quick definition or picture first.',
      },
      {
        title: 'Teach the scan, not just the hunt',
        body: 'Strong solvers scan one full row at a time, then columns, then diagonals — not random hops. Naming that routine out loud once turns word search time into a strategy lesson instead of luck.',
      },
      {
        title: 'The week before break',
        body: 'November word searches are the classic pre-break seatwork: they hold focus while the room is full of pumpkin-bread energy. Print double-sided with the color-by-number sheet and the morning runs itself.',
      },
      {
        title: 'Found is not finished',
        body: 'Have early finishers write each found word in a sentence on the back — "I am grateful for…" works for half the list. November vocabulary becomes November writing, and you get five quiet minutes of assessment for free.',
      },
    ],
    faqs: [
      {
        q: 'What words are in the Thanksgiving word search?',
        a: 'The easy puzzle (K-2) hides pie, corn, yam, fall, leaf, bake, share, family, turkey, feast, thanks and autumn. The harder puzzle (grades 3-5) hides grateful, harvest, november, pumpkin, tradition, celebrate, cranberry, stuffing, gratitude, blessing, drumstick and cornucopia.',
      },
      {
        q: 'How hard is each puzzle?',
        a: 'The easy puzzle is a 12x12 grid where words run only right, down, or down-right — nothing reads backwards. The hard puzzle is a 13x13 grid where words run in all eight directions, including reversed and upward, the standard grades 3-5 format.',
      },
      {
        q: 'What grade is a Thanksgiving word search for?',
        a: 'Kindergarten through fifth grade. The easy grid suits K-2 as letter-recognition and seasonal vocabulary work; the eight-direction grid suits grades 3-5 as morning work the week before Thanksgiving break.',
      },
      {
        q: 'Is the word list secular?',
        a: 'Yes — the lists stick to food, family, fall and gratitude vocabulary (feast, harvest, grateful, cornucopia). Nothing religious, so the puzzles work in public-school classrooms and at any family table.',
      },
      {
        q: 'Does it print in black and white?',
        a: 'Yes — the puzzles are letters only, so a plain black-and-white copier print works fine. Print one letter page per puzzle at 100% scale.',
      },
    ],
    related: [
      { href: '/thanksgiving-color-by-number/', label: 'Thanksgiving color by number (math facts)' },
      { href: '/i-am-thankful-for-worksheet/', label: 'I am thankful for worksheet' },
      { href: '/thanksgiving-printables/', label: 'All Thanksgiving printables' },
      { href: '/halloween-word-search/', label: 'Halloween word search' },
    ],
  },
  {
    slug: 'thanksgiving-color-by-number',
    hub: 'thanksgiving',
    h1: 'Thanksgiving Color by Number',
    metaTitle: 'Thanksgiving Color by Number — Free Printable Math Facts | ChartGlade',
    metaDescription:
      'Free printable Thanksgiving color by number with real math inside: a turkey addition sheet (sums to 12) and a pumpkin pie multiplication sheet (facts to 12).',
    lead:
      'Color by number with the math left in: every cell of the turkey holds an addition fact whose sum matches the color key, and every cell of the pumpkin pie holds a multiplication fact. Solve, check the legend, color — a full sheet works dozens of math facts without feeling like a worksheet.',
    introHeading: 'Why math-facts coloring works',
    intro: [
      'A color-by-number page is retrieval practice in costume. Each cell asks one fact, the legend checks the answer, and the picture rewards a full page of correct recall — the same repetitions as a facts worksheet, but with a built-in answer key students actually want to consult. Wrong answers show up immediately as wrong-colored patches, so self-checking is built in: a turkey with a red beak announces exactly which facts to review.',
      'The turkey sheet uses sums to 12 (the grade 1-2 sweet spot), with big regions of brown and orange so the picture reads early and keeps momentum. The pumpkin pie sheet uses products to 12 for grades 3-4 — the crust ring, the filling and the cream swirl split the facts into three bands, and the dark-brown nutmeg dots are the few cells that demand care.',
    ],
    printNote: 'Two sheets, one letter page each (portrait). Crayon-friendly; legend names its colors.',
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
        body: 'The color patches make error patterns visible at a glance: a student who colors every 3×2 cell with the 3+2 color is telling you exactly which fact family to reteach before the break.',
      },
      {
        title: 'Half-day before Thanksgiving',
        body: 'Schools dismiss at lunch on the Wednesday before, and that half day still counts. This sheet plus the word search is a complete packet that keeps math and reading alive under the November chaos.',
      },
    ],
    faqs: [
      {
        q: 'Is this a real math worksheet?',
        a: 'Yes — every cell contains an addition or multiplication fact, and its answer maps to a legend color. The turkey drills addition facts with sums to 12; the pumpkin pie drills multiplication facts with products to 12. Coloring without solving gets the picture wrong.',
      },
      {
        q: 'What grades is it for?',
        a: 'The addition turkey fits grades 1-2 (facts within 20, sums capped at 12); the multiplication pie fits grades 3-4 (facts through 12). Both print on one letter page each.',
      },
      {
        q: 'Can I print it in black and white?',
        a: 'The legend squares print in color, but every legend entry also names its color — red, yellow, brown, orange, tan, black for the turkey — so a black-and-white copy still works: students match the answer to the color name, not just the swatch.',
      },
      {
        q: 'Do the two pictures share answers?',
        a: 'No. The turkey keys colors to sums; the pie keys colors to products. Same format, two different operations — pick the sheet that matches the week\'s math focus.',
      },
    ],
    related: [
      { href: '/thanksgiving-word-search/', label: 'Thanksgiving word search' },
      { href: '/thanksgiving-placemat-printable/', label: 'Thanksgiving placemat printable' },
      { href: '/thanksgiving-printables/', label: 'All Thanksgiving printables' },
      { href: '/addition-chart/', label: 'Addition chart (all facts)' },
      { href: '/multiplication-chart/', label: 'Multiplication chart 1-12' },
    ],
  },
  {
    slug: 'i-am-thankful-for-worksheet',
    hub: 'thanksgiving',
    h1: 'I Am Thankful For Worksheet',
    metaTitle: 'I Am Thankful For Worksheet — Free Printable (K-5) | ChartGlade',
    metaDescription:
      'Free printable "I am thankful for" worksheet: traced starter, four sentence frames, and a draw-it box. November gratitude writing for K-5.',
    lead:
      'A gratitude writing sheet built around one sentence frame: "I am thankful for ___ because ___." A traced starter gets hesitant writers moving, four numbered frames on tall kid-sized handwriting lines carry the idea, and a draw-it box at the bottom lets pre-writers answer in pictures — the "because" half is where the actual thinking happens.',
    introHeading: 'Why the "because" is the lesson',
    intro: [
      'Ask a kid what they\'re thankful for and you get a list: family, dog, tablet. Ask why and you get the real assignment — noticing. "I am thankful for my grandma because she makes my favorite soup" is a sentence that required observation, memory and a judgment about what matters. The frame on this sheet deliberately has two blanks, and the second one is the point: gratitude exercises that stop at the noun are attendance; the because is reflection.',
      'The sheet stays simple so it flexes across the whole elementary range. Kindergartners trace the starter, then draw their answer in the box and label it with one word. Second and third graders work through all four frames with the sentence as training wheels. Fourth and fifth graders treat it as a quick-write draft and take their best frame into a full paragraph. However it\'s used, one letter page holds the whole sheet with room to spare for kid-sized handwriting.',
    ],
    printNote: 'One letter page, portrait. Traced starter sentence, four tall sentence frames and a draw-it box.',
    tips: [
      {
        title: 'Model one row yourself',
        body: 'Write your own "I am thankful for the class library because..." on the board first — specific and a little personal. Students copy the level of honesty you show, not the level you ask for.',
      },
      {
        title: 'Push past the first three answers',
        body: 'Family, friends and food arrive in sixty seconds. Ask what would you miss that you never notice — the bus driver, your warm coat, the person who cooks. The last two frames are where the noticing starts.',
      },
      {
        title: 'Share out in a circle',
        body: 'Ten minutes of reading rows aloud turns eight private sentences into a class portrait. Keep it optional — some students write things they want to keep to themselves, and that boundary is worth respecting.',
      },
      {
        title: 'Save them for spring',
        body: 'File the sheets and hand them back at the end of the year. Reading November gratitude in May is a free reflection lesson, and it makes a genuinely moving portfolio piece for families.',
      },
    ],
    faqs: [
      {
        q: 'What is on the worksheet?',
        a: 'A script title with fall-leaf trim, name and date lines, one traced starter sentence ("I am thankful for my family because they read with me every night") with room to copy it, four numbered frames that each finish "I am thankful for ___ because ___" on handwriting lines, and a draw-it box for a picture of one answer.',
      },
      {
        q: 'What grade is it for?',
        a: 'Kindergarten through fifth. K-1 students trace the starter, then draw in the box and label it with a word; grades 2-3 write independently with the frame as support; grades 4-5 use the four frames as a brainstorm and expand the best one into a paragraph.',
      },
      {
        q: 'Is it religious?',
        a: 'No — the language is "thankful," which is the secular gratitude vocabulary used in public-school classrooms. It works for church groups too, but nothing on the sheet assumes any tradition.',
      },
      {
        q: 'Can I use it at the kids\' table on Thanksgiving Day?',
        a: 'Yes — it prints on plain letter paper and works with any pen or pencil. Many families use it while the real meal cooks, then read answers over dinner; it pairs well with our Thanksgiving placemat for younger siblings.',
      },
    ],
    related: [
      { href: '/thanksgiving-placemat-printable/', label: 'Thanksgiving placemat printable' },
      { href: '/thanksgiving-word-search/', label: 'Thanksgiving word search' },
      { href: '/name-tracing/', label: 'Name tracing generator' },
      { href: '/thanksgiving-printables/', label: 'All Thanksgiving printables' },
    ],
  },
  {
    slug: 'thanksgiving-placemat-printable',
    hub: 'thanksgiving',
    h1: 'Thanksgiving Placemat',
    metaTitle: 'Thanksgiving Placemat Printable — Free Kids Activity Sheet | ChartGlade',
    metaDescription:
      'Free printable Thanksgiving placemat for kids: a word scramble, tic-tac-toe and a draw-your-feast box on one letter page. Set the kids\' table in minutes.',
    lead:
      'One letter page, three activities, zero preparation: a six-word Thanksgiving scramble, two tic-tac-toe boards, and a big draw-your-feast box, framed with a printable border. Set one at each kids\'-table seat with a cup of crayons and you have bought the grown-ups a sit-down meal.',
    introHeading: 'What a placemat actually has to do',
    intro: [
      'A kids\' placemat has one job: hold attention long enough for the adults to eat while the food is still warm. That means several small activities beat one big one — when the scramble is solved, the tic-tac-toe boards are already waiting, and when a game goes sideways, the draw-your-feast box absorbs the rest of the energy. Six scramble words (turkey, family, feast, thanks, corn, pie) sit in the sweet spot: short enough for a six-year-old with help, real enough for a nine-year-old to do alone.',
      'It prints on plain letter paper in black and white, which matters at Thanksgiving scale — twenty cousins means twenty copies from the nearest copier. The answers print upside down along the bottom edge, the traditional placemat move, so a grown-up can glance without picking up the page. For a reusable version, slide a print inside a sheet protector and hand over dry-erase markers.',
    ],
    printNote: 'One letter page, portrait, black-and-white friendly. Answers print upside down at the bottom.',
    tips: [
      {
        title: 'Plain paper is fine',
        body: 'Card stock feels nicer and survives gravy, but standard copier paper works — the border keeps crayon inside the lines better than a bare page does. Print one per kid plus two spares for the neighbor who shows up with twins.',
      },
      {
        title: 'Pair big kids with little kids',
        body: 'A third grader who "isn\'t doing baby activities" becomes the scramble reader for a kindergartner in exchange for tic-tac-toe bragging rights. The placemat is designed to be shared, not soloed.',
      },
      {
        title: 'Make the feast drawing a game',
        body: 'Challenge: draw your plate with everything you\'d actually put on it, then defend your choices. The kids\' table debate about stuffing versus mac and cheese is half the fun of the holiday anyway.',
      },
      {
        title: 'Laminate for second helpings',
        body: 'A sheet protector and dry-erase markers turn one print into an all-afternoon activity center — the scramble can be re-solved, the boards re-played, the feast redrawn from scratch. Wipe and pass to the next kid.',
      },
    ],
    faqs: [
      {
        q: 'What activities are on the placemat?',
        a: 'Three: a word scramble with six Thanksgiving words (turkey, family, feast, thanks, corn, pie), two tic-tac-toe boards for a best-of-two match, and a large "draw your Thanksgiving feast" box — plus a belongs-to line and a decorative border.',
      },
      {
        q: 'What ages is it for?',
        a: 'Roughly 4 to 10. Younger kids skip the scramble and go straight to tic-tac-toe and the drawing; older kids race the scramble and then run tournament brackets on the boards.',
      },
      {
        q: 'Where are the scramble answers?',
        a: 'Upside down in small print along the bottom edge of the page — flip the sheet to check. Adults can read them right-side up by rotating the page, which is exactly how diner placemats have always done it.',
      },
      {
        q: 'Does it work in black and white?',
        a: 'Yes — the whole sheet is line art and text with no color dependencies. A basic copier print is the intended format.',
      },
      {
        q: 'Can restaurants and schools use it?',
        a: 'Yes — print as many copies as you need, no sign-up and no watermark. It suits kids\' tables at home, school feasts, library story hours, and any restaurant that wants a November kids\' sheet.',
      },
    ],
    related: [
      { href: '/i-am-thankful-for-worksheet/', label: 'I am thankful for worksheet' },
      { href: '/thanksgiving-word-search/', label: 'Thanksgiving word search' },
      { href: '/thanksgiving-color-by-number/', label: 'Thanksgiving color by number' },
      { href: '/thanksgiving-printables/', label: 'All Thanksgiving printables' },
    ],
  },
];
