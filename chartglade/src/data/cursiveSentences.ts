import type { PageDef } from './pageTypes';

/**
 * Cursive sentence practice — 8 public-domain American quotes, each with a
 * gray trace row, a hollow outline row and a blank write-on row (Nov pre-dev
 * wave 1). "cursive sentences" 1.3K US/mo, KD 17; soft SERP (TPT listings,
 * teacher blogs). Every author's death year is pinned in data (deathYear
 * < 1930) and guarded by test — a copyright takedown on a penmanship page
 * would be an avoidable own goal.
 */

export interface SentenceDef {
  /** The quote itself, plain ASCII, short enough for one practice row. */
  text: string;
  author: string;
  /** One-line background — the "why this sentence" fact. */
  fact: string;
  /** Author\'s death year. Guarded < 1930 = public domain in the US. */
  deathYear: number;
}

export const CURSIVE_SENTENCES: SentenceDef[] = [
  {
    text: 'Whatever you are, be a good one.',
    author: 'Abraham Lincoln (attributed)',
    fact: 'Attributed to Lincoln; lines like this rode 19th-century copybooks into American classrooms.',
    deathYear: 1865,
  },
  {
    text: 'Let us, then, be up and doing,',
    author: 'Henry Wadsworth Longfellow',
    fact: 'From "A Psalm of Life" (1838), probably the most-memorized poem in 19th-century American schools.',
    deathYear: 1882,
  },
  {
    text: 'I am a slow walker, but I never walk back.',
    author: 'Abraham Lincoln (attributed)',
    fact: 'Attributed to Lincoln and quoted by civil-rights leaders ever since — steady w\'s and a\'s make it a join drill.',
    deathYear: 1865,
  },
  {
    text: 'These are the times that try men\'s souls.',
    author: 'Thomas Paine',
    fact: 'The opening line of "The American Crisis" (December 1776), written to rally Washington\'s army.',
    deathYear: 1809,
  },
  {
    text: 'The heights by great men reached and kept',
    author: 'Henry Wadsworth Longfellow',
    fact: 'From "The Ladder of St. Augustine" — Longfellow was the most popular American poet of his century.',
    deathYear: 1882,
  },
  {
    text: 'Nothing great was ever achieved without enthusiasm.',
    author: 'Ralph Waldo Emerson',
    fact: 'Emerson (1803-1882), the Concord essayist behind "Self-Reliance" — the line is a staple of his essay collections.',
    deathYear: 1882,
  },
  {
    text: 'An investment in knowledge pays the best interest.',
    author: 'Benjamin Franklin (attributed)',
    fact: 'Long attributed to Franklin, America\'s most-quoted self-teacher — his whole life was the case study.',
    deathYear: 1790,
  },
  {
    text: 'I went to the woods because I wished to live deliberately.',
    author: 'Henry David Thoreau',
    fact: 'From "Walden" (1854), Thoreau\'s account of two years in a one-room cabin near Concord, Massachusetts.',
    deathYear: 1862,
  },
];

export const cursiveSentencesPage: PageDef = {
  slug: 'cursive-sentences',
  hub: 'cursive',
  h1: 'Cursive Sentences',
  metaTitle: 'Cursive Sentences — Trace & Write Quotes, Free Printable | ChartGlade',
  metaDescription:
    'Eight public-domain American quotes to trace in cursive: a gray trace row, a hollow outline row, then write solo. Prints on two letter pages. No sign-up.',
  lead:
    'Sentence practice is where cursive stops being letters and starts being handwriting. These eight lines — Lincoln, Longfellow, Paine, Emerson, Thoreau, Franklin — each get three rows: trace the gray letters, fill the hollow outlines, then write the sentence on your own. Print the sheet and the training wheels come off one row at a time.',
  introHeading: 'Why sentences, and why these sentences',
  intro: [
    'Letters behave differently inside words. The o in "slow" links across the line to a w; the t pair in "little" crosses twice; and the slant that looked steady across four letters starts drifting by the ninth. Sentence practice is the only drill that tests everything at once — joins, spacing, slant held across a full line — which is why every serious penmanship program ends its letter sequences with copybook sentences rather than more isolated letters.',
    'These eight lines are chosen the way 19th-century American copybooks chose them: short enough to hold in the eye, famous enough that the writer already knows how they end, and public domain, so the practice sheet belongs to everyone. Each sentence carries its own one-line history — the Paine line was written to rally Washington\'s army in December 1776, the Longfellow line comes from the most-memorized poem in 19th-century schools. Knowing the sentence gives the hand a reason to finish the line; that is not decoration, it is the oldest motivation trick in penmanship.',
    'Use the three rows in order and honestly. The gray trace row teaches the shape at speed — trace it slowly, two full passes. The hollow outline row is the real test: outlines can be ignored, so the hand must remember where the strokes go. The blank row is the grade. When a sentence\'s blank row comes out clean, move to the next one; when it collapses, the letter to blame is almost always visible in the row above, circled by comparison rather than inspection.',
  ],
  extraSection: {
    heading: 'How the trace, hollow and write rows work together',
    paras: [
      'The three-row stack is a fading-support sequence, borrowed from the way name tracing is taught: full support (gray letters to trace), partial support (hollow outlines to fill), no support (guide lines only). The rule that makes it work is that support is never restored mid-sentence. If the hollow row fails — letters shrinking, slant tipping, joins pulling apart — the fix is to finish the row anyway, then trace the gray row once more and try the hollow again. Reworking one letter inside a failing sentence teaches nothing; repeating the whole line with fresh eyes teaches rhythm.',
      'One sentence per sitting is a real pace, not a slow one. Eight sentences a week with honest blank rows beats forty traced-and-forgotten lines, for the same reason ten minutes of daily practice beats an hour on Saturday: handwriting is muscle memory, and the muscle does its learning between sessions. Date each sheet — a wall of dated pages is its own progress chart, and a child who can see October\'s writing next to September\'s needs no speech about practice.',
    ],
  },
  printNote: 'Two letter pages, portrait: sentences 1-4, then 5-8 — each with a trace row, a hollow row and a blank write-on row.',
  tips: [
    {
      title: 'One sentence per sitting',
      body: 'Three honest rows on one line, then stop for the day. Eight sentences a week with clean blank rows beats forty traced-and-forgotten lines.',
    },
    {
      title: 'Say the words as you write',
      body: 'Speaking the sentence in rhythm keeps the pen moving through the joins — hesitating mid-word is what snaps the o-w and b-o connections.',
    },
    {
      title: 'Judge the line, not the letter',
      body: 'Finish the row, then look. Circling mid-line to fix a wobble teaches stopping; glancing at a finished line teaches the slant and spacing that sentences exist to train.',
    },
    {
      title: 'Date the page and keep it',
      body: 'A stack of dated sheets is a visible progress chart. The September-to-November comparison motivates better than any speech about practice.',
    },
  ],
  faqs: [
    {
      q: 'What are good sentences for cursive practice?',
      a: 'Short, familiar sentences whose letters are mostly baseline joins — and that the writer already knows by heart, so the hand can carry the rhythm instead of the memory. The eight on this sheet run 30 to 59 characters, ordered roughly easiest joins first, and every one is a public-domain American classic.',
    },
    {
      q: 'How do the trace, hollow and write rows work?',
      a: 'Row one is gray letters to trace — slow passes that teach the shape. Row two is hollow outlines to fill in, where the hand has to remember where the strokes go. Row three is blank guide lines: write the sentence solo. Support is never restored mid-sentence; if the blank row fails, retrace the gray row and try again next sitting.',
    },
    {
      q: 'What grade is cursive sentence practice for?',
      a: 'Grades 3-5, once the letters and the basic joins are secure — sentence copywork is the stage after single letters and single words. It works equally well for adults relearning cursive, who usually skip ahead to this sheet once the stroke families feel automatic.',
    },
    {
      q: 'Are these quotes public domain?',
      a: 'Yes, all of them. The authors died between 1790 and 1882 and the sources were published before 1930, so every sentence is public domain in the United States. Two lines are marked "attributed" — their wording passed through 19th-century copybooks, which is itself the honest version of their history.',
    },
    {
      q: 'How long should one sentence take?',
      a: 'Two slow trace passes, one hollow row and one blank row — about five to ten minutes per sentence. One sentence per sitting is a real pace; the learning happens between sessions, not inside a marathon.',
    },
    {
      q: 'Where do I start if the letters themselves are still shaky?',
      a: 'One step back: the how-to page walks the full sequence (posture, the four basic strokes, lowercase families, joins, words), and every letter of the alphabet has its own printable page here with numbered strokes. Sentence practice pays off only after the joins are automatic — otherwise every line re-teaches the letters at the hardest possible length.',
    },
  ],
  related: [
    { href: '/how-to-write-in-cursive/', label: 'How to write in cursive — the full six-step lesson' },
    { href: '/cursive-alphabet/', label: 'Cursive alphabet chart (all 26 letters)' },
    { href: '/cursive/', label: 'Cursive hub — every letter, its own page' },
    { href: '/name-tracing/', label: 'Name tracing generator (trace, hollow or wipe rows)' },
    { href: '/states-that-require-cursive/', label: 'States that require cursive in school' },
  ],
};
