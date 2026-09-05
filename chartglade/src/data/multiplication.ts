import type { PageDef } from './pageTypes';

/**
 * Multiplication cluster (4 pages). Audited as "medium risk": printables
 * specialists hold this SERP, entry expected at positions 4-10. Variants
 * (blank, 1-15, 1-20) are the freshness wedge — most incumbents stop at 1-12.
 */

export const multiplicationPages: PageDef[] = [
  {
    slug: 'multiplication-chart',
    hub: 'charts',
    h1: 'Multiplication Chart',
    metaTitle: 'Multiplication Chart 1-12 (Free Printable) | ChartGlade',
    metaDescription:
      'Free printable multiplication chart 1-12 with the perfect-square diagonal marked, click-to-check facts, and how to use it without it becoming a crutch.',
    lead:
      'The classic 1-12 multiplication chart, ready to print on one letter page. Click any cell to check the fact; the shaded diagonal marks the perfect squares. Below the chart: the order kids actually memorize facts in, and how to use the chart as a bridge rather than a crutch.',
    introHeading: 'One chart, half the memorization',
    intro: [
      'The quiet power of the multiplication chart is symmetry: 7 × 8 and 8 × 7 are the same fact, so the grid is a mirror along the diagonal. Of the 144 cells on this chart, kids only need to learn a little more than half — the diagonal (perfect squares, shaded above) plus one triangle of the mirror. Pointing that out on day one turns a wall of numbers into a visibly smaller job.',
      'Grade 3 is when multiplication facts get serious in US schools — fluency within the 1-10 grid is a grade 3 standard — but the 11s and 12s on this chart earn their keep for telling time (12 hours, 60 minutes) and for the dozen-based arithmetic that still shows up everywhere. Most curricula sequence the facts 2s, 5s and 10s first (they have the friendliest patterns), then 9s and 4s, and save 6s, 7s and 8s for last.',
    ],
    printNote: 'Fits one letter page, portrait. Diagonal prints as light gray.',
    interactive: true,
    tips: [
      {
        title: 'Cover a row, not the chart',
        body: 'The crutch worry is real but the fix is simple: once a row is memorized, cover it with a sticky strip. The chart shrinks as mastery grows, and kids can see the progress happening.',
      },
      {
        title: 'Teach the 9s finger trick',
        body: 'For 9 × n, hold up ten fingers and fold the nth one: fingers to the left are the tens digit, to the right the ones. 9 × 7 → six fingers, then three → 63. Works for the whole 9s row.',
      },
      {
        title: 'Use the chart to teach, not just quiz',
        body: '"Why is 6 × 7 one less than 6 × 8?" Locating neighbors on the grid builds the derived-fact habits (doubles, one-more-set) that carry kids past memorization.',
      },
      {
        title: 'Hang it where homework happens',
        body: 'The chart earns its wall spot at home too — next to the kitchen table beats inside a binder nobody opens. Confidence first, recall speed later.',
      },
    ],
    faqs: [
      {
        q: 'What is a multiplication chart?',
        a: 'A grid where the row and column headers are factors and each cell holds their product — 12 columns by 12 rows covers all 144 facts through 12 × 12. Clicking any cell above checks the fact aloud in the line beneath the chart.',
      },
      {
        q: 'When should students memorize multiplication facts?',
        a: 'Grade 3 is the standard-bearing year for facts up to 10 × 10, with fluency expected by the end of grade 4 including 11s and 12s. Facts are usually taught in order of pattern-friendliness: 2s, 5s and 10s first, 6s through 8s last.',
      },
      {
        q: 'Why is the diagonal shaded?',
        a: 'Cells where the row equals the column are perfect squares: 1, 4, 9, 16 through 144. The diagonal is also the mirror line of the chart — facts on either side are duplicates (7 × 8 = 8 × 7), which is why the grid feels half as big as it looks.',
      },
      {
        q: 'Should my child use a chart during practice?',
        a: 'Yes, as a bridge: look up unknown facts while solving bigger problems, then drill the looked-up facts separately. The chart keeps multi-step work moving while memorization catches up — cover mastered rows so it slowly retires itself.',
      },
      {
        q: 'Is this chart free to print?',
        a: 'Free, no sign-up, one letter page. The print button strips the page down to the chart itself; the shaded diagonal prints as light gray and photocopies fine.',
      },
    ],
    related: [
      { href: '/multiplication-chart-blank/', label: 'Blank multiplication chart for practice' },
      { href: '/multiplication-chart-1-20/', label: 'Multiplication chart 1-20 (challenge grid)' },
      { href: '/addition-chart/', label: 'Addition chart (the grade 1-2 version)' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'multiplication-chart-blank',
    hub: 'charts',
    h1: 'Blank Multiplication Chart',
    metaTitle: 'Blank Multiplication Chart 1-12 (Free Printable) | ChartGlade',
    metaDescription:
      'Free printable blank multiplication chart 1-12 for practice and quizzes — with the fill-it-in routines that build recall instead of copying.',
    lead:
      'The same 1-12 grid with every product removed. Filling in a blank chart is retrieval practice — the effort of recalling a fact is what welds it in — and a completed blank chart is also the cleanest quiz format there is. Print a stack.',
    introHeading: 'Why blank beats filled for practice',
    intro: [
      'Retrieval practice is one of the most replicated findings in learning science: pulling a fact out of memory strengthens it far more than re-reading it does. A filled chart on the wall is a reference; a blank chart under the pencil is a workout. The difference is the difference between recognizing 56 and producing 56.',
      'The routine matters more than the sheet. Filling the chart row by row works better than sweeping across, because a row is one times-table at a time; the pattern carries several cells and memory has to reach for the rest. A completed chart then self-checks against the filled version — kids grade their own, which is itself more retrieval — and the same sheet doubles as a record: date it, keep it, beat it next month.',
    ],
    printNote: 'One blank grid per letter page, portrait.',
    tips: [
      {
        title: 'Partial fills beat whole-sheet slogs',
        body: 'Sixth graders zone out on a full blank grid. Print one and cover all but a target row or column with paper — "today is the 7s" — then rotate. Same sheet, targeted practice.',
      },
      {
        title: 'Self-check against the filled chart',
        body: 'Keep the filled 1-12 chart next to the blank one. Grading their own work with the reference is another pass of retrieval, and the miss count becomes the score to beat.',
      },
      {
        title: 'Fill it forward, then backward',
        body: 'Row by row, then column by column. The 7s row and the 7s column are the same facts from two directions — filling both is what makes the mirror symmetry of multiplication click.',
      },
      {
        title: 'Date it and keep the stack',
        body: 'A dated stack of completed charts is a visible progress record. Beating last month\'s miss count matters more to a ten-year-old than any sticker chart.',
      },
    ],
    faqs: [
      {
        q: 'What is a blank multiplication chart used for?',
        a: 'Practice and quizzes: students fill in the products themselves, which forces retrieval instead of recognition. A completed blank chart doubles as a self-grading quiz when checked against a filled chart.',
      },
      {
        q: 'Should students fill in the whole chart at once?',
        a: 'Usually not — one row or column per session targets a single times table and keeps attention high. Covering parts of a printed blank chart with paper turns one sheet into a week of targeted drills.',
      },
      {
        q: 'What size is the blank chart?',
        a: '1-12 grid on one letter page, portrait, with header row and column filled in so the sheet is usable the moment it prints. A4 prints without clipping.',
      },
      {
        q: 'How is this different from the filled chart?',
        a: 'The filled chart is a reference for looking facts up; the blank chart is a practice surface for producing them. Most classrooms — and homework tables — want both in the same folder.',
      },
    ],
    related: [
      { href: '/multiplication-chart/', label: 'Filled multiplication chart 1-12' },
      { href: '/multiplication-chart-1-15/', label: '1-15 chart (next step up)' },
      { href: '/addition-chart/', label: 'Addition chart for grade 1-2' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'multiplication-chart-1-15',
    hub: 'charts',
    h1: 'Multiplication Chart 1-15',
    metaTitle: 'Multiplication Chart 1-15 (Free Printable) | ChartGlade',
    metaDescription:
      'Free printable multiplication chart 1-15 — the step past 1-12, with the extended facts students actually meet in grades 4-6 and how to print it wide.',
    lead:
      'Past 12 live the facts nobody drills but half of upper elementary meets anyway: 13s, 14s and 15s in area problems, elapsed time and mental-math warm-ups. This chart runs 1-15 in one printable grid — landscape, one letter page.',
    introHeading: 'What the 13-15 rows are actually for',
    intro: [
      'Nobody assigns the 14 times table for memorization, and that is the point of a 1-15 chart: it is a reference for derived facts, not a drill sheet. A fourth grader who needs 14 × 6 can find it on the grid once, notice it is 10 × 6 plus 4 × 6, and arrive at the next one without the chart. Extended charts are where partial-products thinking gets its reps.',
      'The 13-15 columns also carry real-world weight: 15 is the money number (quarters, quarter-hours, 15% tips later on), 14 is the fortnight, and 13 × 4 is the number of weeks in a year. Numbers with jobs are easier to remember than numbers on a worksheet, which is why this chart keeps those three columns instead of stopping at the conventional 12.',
    ],
    printNote: 'One letter page, landscape (the print button rotates it for you).',
    landscape: true,
    interactive: true,
    tips: [
      {
        title: 'Use it for partial-products practice',
        body: 'Cover the 13s column and ask for 13 × 7 from known facts: 10 × 7 plus 3 × 7. The chart confirms the answer — the strategy is the lesson, the grid is the check.',
      },
      {
        title: 'Quarter math lives in the 15s',
        body: '15, 30, 45, 60 — the 15s row is quarter-hours, quarters in dollars and 15% without a calculator. It is the most practically useful extended row on the page.',
      },
      {
        title: 'Landscape keeps it readable',
        body: 'Fifteen columns on portrait letter makes cells cramped; the sheet prints landscape automatically. If your printer insists on portrait, scale to fit and the cells stay legible at desk distance.',
      },
      {
        title: 'For grades 4-6, not grade 3',
        body: 'Hand the 1-12 chart to grade 3 and this one to grades 4-6. The extra rows are for deriving, not memorizing — different job, different tool.',
      },
    ],
    faqs: [
      {
        q: 'Why use a multiplication chart that goes to 15?',
        a: 'The 13-15 columns cover derived-fact practice for grades 4-6 and the numbers that show up in real problems: 15 for quarters and time, 14 for fortnights and weeks-per-year. It is a reference for building strategies, not a bigger memorization assignment.',
      },
      {
        q: 'Do students need to memorize facts past 12 × 12?',
        a: 'Generally no — fluency standards stop at 10 × 10 or 12 × 12. What extended charts train is deriving unknown facts from known ones: 14 × 6 from (10 × 6) + (4 × 6). That skill, not the extra rows, is the goal.',
      },
      {
        q: 'How does the 1-15 chart print?',
        a: 'One letter page in landscape orientation — the print stylesheet rotates the sheet automatically, so the print button is the only step. A4 works the same way.',
      },
      {
        q: 'Is there a blank 1-15 version?',
        a: 'The blank practice chart here is 1-12, which matches what actually gets drilled. For a blank 1-15, print the blank chart and have students extend it by hand — drawing the extra columns is itself good practice.',
      },
    ],
    related: [
      { href: '/multiplication-chart/', label: 'Multiplication chart 1-12' },
      { href: '/multiplication-chart-1-20/', label: 'Multiplication chart 1-20' },
      { href: '/multiplication-chart-blank/', label: 'Blank chart for practice' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'multiplication-chart-1-20',
    hub: 'charts',
    h1: 'Multiplication Chart 1-20',
    metaTitle: 'Multiplication Chart 1-20 (Free Printable, Landscape) | ChartGlade',
    metaDescription:
      'Free printable multiplication chart 1-20 — the full 400-fact challenge grid on one landscape letter page, with what the big grid is good for.',
    lead:
      'The full 20 × 20 grid: 400 facts on one landscape page, squares diagonal marked. It is the chart for middle-schoolers, math-team kids and anyone who has outgrown 1-12 — printed small enough to fit, large enough to read.',
    introHeading: 'What a 20-by-20 grid is for',
    intro: [
      'A 1-20 chart is not a bigger memorization assignment — no curriculum asks for the 17 times table. It is a dense reference for kids deep into derived facts and multi-digit work: 16 × 12 area problems, 18 × 4 pattern-hunting, the "is it divisible" scans that make prime-factor conversations possible. The density itself is interesting; plenty of students first see the structure of multiplication (the mirror symmetry, the perfect-square diagonal, how each row grows by its header) on a big grid like this.',
      'Printing is the engineering problem: 21 columns to a row including headers. This sheet prints landscape on one letter page with cell sizes tuned to stay readable at arm\'s length — smaller than the 1-12 chart by design. If it will live on a wall, print it once at a copy shop at 11×17 and the cells land back at full size.',
    ],
    printNote: 'One letter page, landscape. Copy-shop 11×17 for wall use.',
    landscape: true,
    interactive: true,
    tips: [
      {
        title: 'Pattern hunts beat row drills here',
        body: 'Nobody drills the 17s. Ask instead: which columns are all even? Where do multiples of 5 line up? What happens along the diagonal? A big grid rewards questions the small one is too cramped to ask.',
      },
      {
        title: 'Great for math teams and challenge work',
        body: 'Math Olympiad-style problems assume comfort with products past 12. A 1-20 chart on the table removes the arithmetic ceiling so the actual problem-solving gets the attention.',
      },
      {
        title: 'Print 11×17 for the wall',
        body: 'Letter-size 1-20 is a desk reference; at 11×17 the cells match the 1-12 letter chart and it works as a wall poster. The layout is identical — no redesign needed.',
      },
      {
        title: 'Use it to introduce square numbers properly',
        body: 'The shaded diagonal on a 20-grid runs 1, 4, 9, 16 … 225, 256 … 400 — far enough for students to see that perfect squares keep going and get sparser as they grow.',
      },
    ],
    faqs: [
      {
        q: 'What is a 1-20 multiplication chart used for?',
        a: 'Dense reference for upper elementary and middle school: products past 12 that appear in area problems, pattern explorations and math-team work. It is not a memorization target — fluency standards end at 10 × 10 or 12 × 12.',
      },
      {
        q: 'Does 1-20 fit on one page?',
        a: 'Yes — landscape letter, with cell sizes tuned to stay readable at desk distance. For a wall version, the same file prints clean at 11×17 at any copy shop.',
      },
      {
        q: 'How many facts are on a 20 × 20 chart?',
        a: '400 cells — though the mirror symmetry means only 210 unique products (the 20 perfect squares plus both triangles of the mirror). Spotting that symmetry is a good pattern hunt all by itself.',
      },
      {
        q: 'Which grades use this chart?',
        a: 'Roughly grades 5-8: after 1-12 fluency, when multi-digit multiplication and pre-algebra start pulling products past 144. Younger students are better served by the 1-12 chart.',
      },
    ],
    related: [
      { href: '/multiplication-chart/', label: 'Multiplication chart 1-12' },
      { href: '/multiplication-chart-1-15/', label: 'Multiplication chart 1-15' },
      { href: '/hundred-chart/', label: 'Hundred chart for younger grades' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },
];
