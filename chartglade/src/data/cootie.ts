import type { PageDef } from './pageTypes';
import { XMAS_CARDS } from './christmas';

/**
 * Cootie catcher cluster (11/03 batch, PLAN §3 #34, spec in
 * docs/chartglade/COOTIE-SPEC.md). Judged against two teardowns
 * (docs/fortune-draw/teardown-cootie-*.md): every incumbent ships a fixed
 * handful of pre-filled jokes per theme, nobody runs fortunes as a real
 * content library — so the library (tiered, shared across themes, counted
 * and claimed on-page) is the moat here. Christmas page rides the 12/25
 * window (shipped 11/03, inside the 4-6 week indexing run-up); the
 * Christmas variant deliberately stays a *fortune* teller — brendid's
 * joke-teller matrix is a fort we do not storm.
 *
 * Content provenance: adapted from the public-domain Chinese oracle corpus
 * in docs/fortune-draw/ (Guanyin / Guandi / Wong Tai Sin, 300 slips), rewritten
 * as kid-friendly English. IP red line (guarded in cootie.test.ts): no deity
 * or temple names on the user-facing side, no doom wording — tiers top out
 * at "gentle warning".
 */

export type FortuneTier = 'blessing' | 'nudge' | 'gentle warning';

export interface CootieFortune {
  /** The short line written on the catcher's corner flap. */
  line: string;
  /** The layer that makes the library a library: why + a kid-sized nudge. */
  meaning: string;
  tier: FortuneTier;
}

/** Classic sheet corner labels — the words themselves are the game token, so
 *  the sheet plays identically on a grayscale printer. */
export const CLASSIC_CORNER_LABELS = ['RED', 'BLUE', 'GREEN', 'YELLOW'] as const;

export const CHRISTMAS_CORNER_LABELS = ['SNOW', 'STAR', 'GIFT', 'BELL'] as const;

/* ---------------------------- the fortune library --------------------------- */

export const GENERAL_FORTUNES: CootieFortune[] = [
  // blessings (8)
  { line: 'Big things are starting for you.', meaning: 'Fresh chances show up when you keep showing up — say yes to one new thing today.', tier: 'blessing' },
  { line: 'A surprise is headed your way.', meaning: 'Good news often arrives from where you least expect it. Leave room for plans to change.', tier: 'blessing' },
  { line: 'Today your ideas shine.', meaning: 'Share one idea out loud today — the first telling is always the hardest.', tier: 'blessing' },
  { line: 'You are luckier than you think.', meaning: 'Notice three good things tonight; counting luck is how you find more of it.', tier: 'blessing' },
  { line: 'Help arrives right on time.', meaning: 'Asking for help is a strength move. Tell someone what you are stuck on.', tier: 'blessing' },
  { line: 'Your hard work is about to show.', meaning: 'Effort hides, then blooms. Keep going — the visible part comes next.', tier: 'blessing' },
  { line: 'Something you learned will save the day.', meaning: 'Old skills wake up right when you need them. Trust what you already know.', tier: 'blessing' },
  { line: 'A friend has good news to share.', meaning: 'Ask a friend what went well this week — celebrating together doubles the luck.', tier: 'blessing' },
  // nudges (8)
  { line: 'A small step today beats a big plan.', meaning: 'Pick the tiniest next action and do it before dinner. Momentum loves small starts.', tier: 'nudge' },
  { line: 'Listen closely today.', meaning: 'Let someone finish their whole sentence today; the useful detail hides in the last part.', tier: 'nudge' },
  { line: 'Your patience is about to pay off.', meaning: 'The slow thing you started is still moving. Water it once more before you judge it.', tier: 'nudge' },
  { line: 'Say the kind thing you are thinking.', meaning: 'Compliments expire fast. Deliver today’s one before bedtime.', tier: 'nudge' },
  { line: 'Try five brave minutes.', meaning: 'Trade five bored minutes for five brave ones — five minutes of trying fully counts.', tier: 'nudge' },
  { line: 'Tidy space, lucky space.', meaning: 'Clear one surface today. Open space invites open ideas.', tier: 'nudge' },
  { line: 'Ask your silly question.', meaning: '“Silly” questions win real answers. Raise your hand or send the message.', tier: 'nudge' },
  { line: 'Rest is part of the plan.', meaning: 'Even luck needs sleep. Finish early tonight and start fresh tomorrow.', tier: 'nudge' },
  // gentle warnings (8)
  { line: 'Double-check before you promise.', meaning: 'Look at the details once more today — a careful minute now saves a busy hour later.', tier: 'gentle warning' },
  { line: 'Slow down on the tricky part.', meaning: 'The hard step deserves your slow brain today, not your fast one.', tier: 'gentle warning' },
  { line: 'Keep your favorites close.', meaning: 'Share gladly, but leave your can’t-replace-it treasures safe at home today.', tier: 'gentle warning' },
  { line: 'Fix the small wobble now.', meaning: 'Something needs your attention, not your worry — a loose thread is easiest to trim today.', tier: 'gentle warning' },
  { line: 'Not every invitation needs a yes.', meaning: 'It is okay to skip one thing today to protect your energy.', tier: 'gentle warning' },
  { line: 'Check twice, send once.', meaning: 'Reread before you press send — messages travel faster than do-overs.', tier: 'gentle warning' },
  { line: 'Keep a small secret safe.', meaning: 'If someone trusted you with it, guard it well. Trust grows when it is protected.', tier: 'gentle warning' },
  { line: 'Save a little for later.', meaning: 'Keep a few minutes, a few stickers, a few snacks in reserve — future you says thanks.', tier: 'gentle warning' },
];

export const CHRISTMAS_FORTUNES: CootieFortune[] = [
  // blessings (4)
  { line: 'Holiday magic finds you this week.', meaning: 'Keep your eyes open for small wonders — twinkly lights count.', tier: 'blessing' },
  { line: 'A wish of yours is quietly coming true.', meaning: 'Give it a little patience — some gifts wrap slowly.', tier: 'blessing' },
  { line: 'You will make someone’s season.', meaning: 'One kind word from you this week might be the highlight of someone’s whole December.', tier: 'blessing' },
  { line: 'Cozy days are ahead.', meaning: 'Plan one warm, slow moment — cocoa counts as a strategy.', tier: 'blessing' },
  // nudges (4)
  { line: 'Share the treat, double the joy.', meaning: 'Split the last cookie today — holiday math makes halves bigger.', tier: 'nudge' },
  { line: 'Send the message you keep drafting.', meaning: 'A short hello to someone far away travels all the way to their tree.', tier: 'nudge' },
  { line: 'Make the crafty thing.', meaning: 'Make the crafty thing, not the perfect thing — glue, paper, done. The fun is in the making.', tier: 'nudge' },
  { line: 'Invite someone in.', meaning: 'Look for the person standing at the edge of the fun — wave them over.', tier: 'nudge' },
  // gentle warnings (4)
  { line: 'Check the list twice.', meaning: 'Reread your gift list and your homework list — December thanks careful eyes.', tier: 'gentle warning' },
  { line: 'Let one surprise stay wrapped.', meaning: 'Not every present needs peeking at — some surprises are worth the wait.', tier: 'gentle warning' },
  { line: 'Guard your mittens and your minutes.', meaning: 'Busy days drop things. Keep track of your warmest stuff and your quiet time.', tier: 'gentle warning' },
  { line: 'Protect one quiet evening.', meaning: 'It is fine to say no to one crowded plan — a calm evening is the season’s best gift to yourself.', tier: 'gentle warning' },
];

/** The count we claim on-page. One source of truth — tests guard it. */
export const FORTUNE_LIBRARY = {
  general: GENERAL_FORTUNES,
  christmas: CHRISTMAS_FORTUNES,
  get total() {
    return GENERAL_FORTUNES.length + CHRISTMAS_FORTUNES.length;
  },
};

/** Deterministic pick for a printed sheet: first N of a tier, rotated by seed.
 *  Same seed always folds the same sheet (SSR-stable, snapshot-friendly). */
export function pickSheetFortunes(
  pool: CootieFortune[],
  tier: FortuneTier,
  count: number,
  seed: number,
): CootieFortune[] {
  const ofTier = pool.filter((f) => f.tier === tier);
  const start = seed % ofTier.length;
  const out: CootieFortune[] = [];
  for (let i = 0; i < count && i < ofTier.length; i++) {
    out.push(ofTier[(start + i) % ofTier.length]);
  }
  return out;
}

/** Greedy word-wrap for SVG <tspan> stacks. Pure function — guarded by tests. */
export function wrapFortuneLine(line: string, maxChars: number): string[] {
  const words = line.split(' ');
  const rows: string[] = [];
  let row = '';
  for (const w of words) {
    const candidate = row ? `${row} ${w}` : w;
    if (candidate.length > maxChars && row) {
      rows.push(row);
      row = w;
    } else {
      row = candidate;
    }
  }
  if (row) rows.push(row);
  return rows;
}

/* ------------------------------- page definitions ------------------------------- */

const HOW_TO_STEPS = [
  { name: 'Print the sheet', text: 'Print this page and grab a pair of scissors. Plain paper works; cardstock lasts longer.' },
  { name: 'Cut the square', text: 'Cut out the big square along its solid border.' },
  { name: 'Fold the diagonals', text: 'Fold corner to corner both ways along the dashed diagonal lines, then unfold. The creases are guides.' },
  { name: 'Corners to the center', text: 'Fold all four corners into the middle of the square. You now have a smaller square.' },
  { name: 'Flip and repeat', text: 'Flip the square over and fold the four new corners into the middle again.' },
  { name: 'Fold in half', text: 'Fold the small square in half both ways and unfold, to soften the creases.' },
  { name: 'Open the pockets', text: 'Slip your thumb and index finger into the four pockets under the flaps and gently work them open.' },
  { name: 'Play', text: 'Pick a color and spell it out loud while opening and closing, then a number, then lift the flap to read the fortune underneath.' },
];

export const cootieCatcherPage: PageDef = {
  slug: 'cootie-catcher',
  hub: 'cootie',
  h1: 'Cootie Catcher Template (Free Printable)',
  metaTitle: 'Cootie Catcher Template — Free Printable Fortune Teller',
  metaDescription:
    'Free printable cootie catcher template with fortunes already filled in — fold lines printed right on the sheet. No sign-up, no download: print, cut, fold, play.',
  lead:
    'A print-and-fold fortune teller with the fortunes already written in. The fold lines print right on the sheet — cut, fold, and play in five minutes. Free, no sign-up.',
  introHeading: 'What is a cootie catcher?',
  intro: [
    'A cootie catcher — most of the world calls it a paper fortune teller — is a folded paper game that has been passing notes on playgrounds for generations. Four colors on the outside, numbers one through eight on the flaps, and a hidden fortune under each corner. One kid holds the catcher open and shut while a friend picks a color and a number, and whatever flap they land on “tells their fortune.”',
    'This template prints the whole game on one sheet: the color words, the numbers one through eight, and four fortunes already filled in, with the fold lines drawn right on the paper. You only need scissors and about five minutes. If your printer only does black and white, nothing breaks — the color words are the game tokens, so a gray-scale sheet plays exactly the same.',
    'Teachers use cootie catchers for more than fortunes: they double as icebreakers, story starters, and brain breaks. The folding itself is a fine-motor workout, and the call-and-response rhythm keeps a whole small group engaged with one sheet. Once your students can fold one, they can fold a thousand — which is when the blank corners come in handy for writing their own.',
  ],
  printNote: 'Fits one letter page, portrait. Fold lines print on the sheet.',
  tips: [
    { title: 'Icebreaker round', body: 'First week of school: partners fold one catcher and take turns reading fortunes to each other. Two shy kids get a script and a reason to talk.' },
    { title: 'Brain break', body: 'Keep two or three folded catchers in a “quiet bucket.” A one-minute turn with a fortune resets a wiggly table faster than free play.' },
    { title: 'Write-your-own', body: 'Print the blank corners version and let students write their own fortunes or vocabulary words — folding + writing in one center.' },
    { title: 'Take-home craft', body: 'Cheap, flat, and indestructible enough for a backpack: an easy take-home craft that parents will actually find on the fridge, not the floor.' },
  ],
  faqs: [
    { q: 'What is a cootie catcher?', a: 'A folded paper game also known as a paper fortune teller. You pick a color, spell it out while the catcher opens and closes, pick a number, then lift a flap to read the fortune written underneath.' },
    { q: 'Why is it called a fortune teller if it’s a cootie catcher?', a: 'Same toy, two names. “Fortune teller” describes what it does; “cootie catcher” is the playground nickname — “cooties” being the imaginary germs kids have joked about for about a century. This page uses both so you can find it either way.' },
    { q: 'What age is this good for?', a: 'Kindergarten and up can play with a pre-folded catcher; second and third graders can usually fold their own following the printed steps. For K–1, fold one ahead of time and let them run the game.' },
    { q: 'Does it work in black and white?', a: 'Yes. The four color words are the game tokens — players “pick a color” by reading the word. The sheet plays identically on a grayscale printer.' },
    { q: 'Can I write my own fortunes?', a: 'That’s the classic move. Fold it first, then lift each flap and write on the inside corners with a fine marker — or print the fortunes page and copy your favorites in.' },
  ],
  related: [
    { href: '/cootie-catcher-fortunes/', label: '36 cootie catcher fortunes' },
    { href: '/christmas-cootie-catcher/', label: 'Christmas cootie catcher' },
    { href: '/letter-to-santa/', label: 'Letter to Santa template' },
    { href: '/christmas-color-by-number/', label: 'Christmas color by number' },
  ],
  howTo: {
    name: 'How to fold a cootie catcher',
    steps: HOW_TO_STEPS,
  },
  sheetImage: {
    src: '/images/cootie-catcher-template-printable.png',
    alt: 'Free printable cootie catcher template — a foldable paper fortune teller with four fortunes already filled in, numbers one through eight, and fold lines printed on the sheet.',
    width: 2016,
    height: 2212,
    caption: 'The cootie catcher sheet exactly as it prints — cut, fold, play.',
  },
};

export const cootieCatcherFortunesPage: PageDef = {
  slug: 'cootie-catcher-fortunes',
  hub: 'cootie',
  h1: '36 Cootie Catcher Fortunes (Ready to Fold In)',
  metaTitle: 'Cootie Catcher Fortunes — 36 Kid-Friendly Ideas, Free Printable',
  metaDescription:
    '36 kid-friendly cootie catcher fortunes in three tiers — blessings, nudges, and gentle warnings — each with a meaning you can read aloud. Free printable, no sign-up.',
  lead:
    'A whole library of fortunes for your paper fortune teller, sorted into three tiers and each with a read-aloud meaning. Copy your favorites into a folded catcher, or print the template page where four are already filled in.',
  introHeading: 'Three tiers of fortune',
  intro: [
    `Most cootie catcher templates ship the same eight jokes on every sheet. This page is built differently: it is a real fortune library — ${FORTUNE_LIBRARY.total} fortunes, sorted into three tiers, each with a meaning you can read aloud after the flap opens. The tiers keep the game kind: a fortune should land as a small delight, never a diagnosis.`,
    'Blessings are the lucky-draw favorites — small, believable good news. Nudges are tiny actionable pushes (“tidy one surface,” “ask the question”). Gentle warnings look after the player: double-check, slow down, protect your energy. Nothing in this library predicts anything bad, because that’s not the game — the game is a five-minute reason to talk to the person across the table.',
    'To use them: fold any cootie catcher (the template page prints the fold lines for you), lift each corner flap, and copy a fortune inside with a fine marker. Classroom twist — have students write the short line on the flap and the meaning on the hidden corner, so the reader gets a bonus sentence when the flap opens.',
  ],
  printNote: 'Reference page — no printing needed. Grab the template for folding.',
  tips: [
    { title: 'Read the meaning aloud', body: 'The fortune line lands the laugh; the meaning lands the moment. Reading the small paragraph under a flap turns a toy into a conversation.' },
    { title: 'Tier-mix the sheet', body: 'For a balanced catcher, fold in one blessing, two nudges, and one gentle warning per game — four flaps, four flavors.' },
    { title: 'Kindness edition', body: 'Ask students to invent one new nudge for the class library. Reading everyone’s nudges is a ten-minute SEL circle, no worksheet needed.' },
    { title: 'Vocabulary swap', body: 'Replace fortunes with this week’s word-wall words: picking a number reveals a word, and the player has to use it in a sentence.' },
  ],
  faqs: [
    { q: 'What should I write in a cootie catcher?', a: 'Short, kind, specific lines work best — a compliment, a tiny dare, a lucky prediction. This page gives you 36 of them in three tiers, each with a meaning you can read aloud.' },
    { q: 'Are fortunes supposed to come true?', a: 'They are supposed to start a conversation. Every fortune here is small enough to be true for almost anybody on almost any day — that’s what makes the game fun instead of spooky.' },
    { q: 'How many fortunes fit in one catcher?', a: 'Four flaps, one fortune each — so four per game. Players re-pick and re-read, which is why a bigger library keeps the game fresh.' },
    { q: 'Can I print these fortunes?', a: 'The fortunes page is a screen reference by design. The template page prints a catcher with four fortunes already filled in, plus blank space to add your own.' },
  ],
  related: [
    { href: '/cootie-catcher/', label: 'Cootie catcher template' },
    { href: '/christmas-cootie-catcher/', label: 'Christmas cootie catcher' },
    { href: '/i-am-thankful-for-worksheet/', label: 'I am thankful worksheet' },
    { href: '/sight-words/', label: 'Sight words printables' },
  ],
};

export const christmasCootieCatcherPage: PageDef = {
  slug: 'christmas-cootie-catcher',
  hub: 'christmas',
  h1: 'Christmas Cootie Catcher (Free Printable)',
  metaTitle: 'Christmas Cootie Catcher — Free Printable Fortune Teller',
  metaDescription:
    'Free printable Christmas cootie catcher with holiday fortunes already filled in — snow, star, gift, and bell corners, fold lines printed on the sheet. No sign-up.',
  lead:
    'The classic paper fortune teller wearing its winter coat: snow, star, gift, and bell corners, twelve holiday fortunes, and fold lines printed right on the sheet. Print, cut, fold — five minutes to party-ready.',
  introHeading: 'A Christmas fortune teller, minus the fuss',
  intro: [
    'Instead of colors, this version spells holiday words: players pick SNOW, STAR, GIFT, or BELL and spell it out letter by letter while the catcher opens and closes. It’s the same playground mechanic with a December vocabulary bonus — and yes, spelling B-E-L-L four times is somebody’s idea of a great sleigh ride.',
    'The fortunes here are holiday fortunes: cozy blessings, small kindness nudges, and gentle December reminders (check the list twice). They are written for kids but they play fine at the family table — pass one catcher around after dinner and let every guest draw a fortune. Twelve fortunes ship with the page, so re-folds stay fresh.',
    'Classroom angle: it’s a zero-prep party station. Fold a handful during morning work, and the catchers run themselves at the holiday party — partners take turns, every round ends with a read-aloud, and the noise stays at the fun level. For a quieter version, swap in the fortunes from the main library page and let students write their own.',
  ],
  printNote: 'Fits one letter page, portrait. Fold lines print on the sheet.',
  tips: [
    { title: 'Party station', body: 'Two folded catchers + one printed instruction sheet = a self-running holiday party table. Rotate partners every few fortunes.' },
    { title: 'Spell the word', body: 'The Christmas twist: spelling S-N-O-W or B-E-L-L out loud is the game. Younger kids get letter practice without noticing it’s practice.' },
    { title: 'Kindness countdown', body: 'Draw one fortune per December morning as a mini advent ritual — the gentle warnings double as calm-down reminders in a loud season.' },
    { title: 'Stocking-stuffer trick', body: 'Fold one, tuck it in a card or stocking. Flat, free, and it survives the trip better than a candy cane.' },
  ],
  faqs: [
    { q: 'How does the Christmas version work?', a: 'Same as the classic, but you pick and spell a holiday word — SNOW, STAR, GIFT, or BELL — instead of a color, then a number, then lift a flap for your fortune.' },
    { q: 'Is it just for kids?', a: 'The fortunes are written for kids but play fine at a family table. Adults drawing fortunes after dinner is a reliably funny five minutes.' },
    { q: 'What if my printer is black and white?', a: 'It works fine. The corner words are printed as text — the game token is the word itself, not the ink color.' },
    { q: 'Can I use my own fortunes?', a: 'Yes — fold it, lift the flaps, and write inside with a fine marker. The fortunes page has 36 more you can copy from.' },
  ],
  related: [
    { href: '/cootie-catcher/', label: 'Cootie catcher template' },
    { href: '/cootie-catcher-fortunes/', label: '36 cootie catcher fortunes' },
    { href: '/christmas-word-search/', label: 'Christmas word search' },
    { href: '/letter-to-santa/', label: 'Letter to Santa template' },
  ],
  howTo: {
    name: 'How to fold a Christmas cootie catcher',
    steps: HOW_TO_STEPS,
  },
  sheetImage: {
    src: '/images/christmas-cootie-catcher-printable.png',
    alt: 'Free printable Christmas cootie catcher — a paper fortune teller with snow, star, gift, and bell corners, four holiday fortunes, and fold lines printed on the sheet.',
    width: 2016,
    height: 2212,
    caption: 'The Christmas catcher sheet exactly as it prints — party-ready in five minutes.',
  },
};

christmasCootieCatcherPage.variants = XMAS_CARDS.filter(
  (c) => c.href !== '/christmas-cootie-catcher/',
);
