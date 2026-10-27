import type { PageDef } from './pageTypes';

/**
 * Multiplication cluster (6 pages). Audited as "medium risk": printables
 * specialists hold this SERP, entry expected at positions 4-10. Variants
 * (blank, 1-15, 1-20) are the freshness wedge — most incumbents stop at 1-12.
 * November pre-dev wave 2 (2026-10-27): the printable pack (Q4 window word —
 * SERP audit 2026-10-04 found 4 of the top 5 are non-content sites plus a
 * dead link at #3) and the times-table-chart terminology page (audit
 * 2026-10-27: EMD mini-site at #1, blogs behind it — beatable on page quality).
 */

export const multiplicationPages: PageDef[] = [
  {
    slug: 'multiplication-chart',
    hub: 'charts',
    h1: 'Multiplication Chart',
    metaTitle: 'Multiplication Chart 1-12 (Free Printable) | ChartGlade',
    metaDescription:
      'Free printable multiplication chart 1-12 with the perfect-square diagonal marked, click-to-check facts, a mad-minute drill maker — and how to use the chart without it becoming a crutch.',
    lead:
      'The classic 1-12 multiplication chart, ready to print on one letter page. Click any cell to check the fact; the shaded diagonal marks the perfect squares. Below the chart: a mad-minute generator for timed drill sheets (addition, subtraction, multiplication or mixed, answer key included), the order kids actually memorize facts in, and how to use the chart as a bridge rather than a crutch.',
    introHeading: 'One chart, half the memorization',
    intro: [
      'The quiet power of the multiplication chart is symmetry: 7 × 8 and 8 × 7 are the same fact, so the grid is a mirror along the diagonal. Of the 144 cells on this chart, kids only need to learn a little more than half — the diagonal (perfect squares, shaded above) plus one triangle of the mirror. Pointing that out on day one turns a wall of numbers into a visibly smaller job.',
      'Grade 3 is when multiplication facts get serious in US schools — fluency within the 1-10 grid is a grade 3 standard — but the 11s and 12s on this chart earn their keep for telling time (12 hours, 60 minutes) and for the dozen-based arithmetic that still shows up everywhere. Most curricula sequence the facts 2s, 5s and 10s first (they have the friendliest patterns), then 9s and 4s, and save 6s, 7s and 8s for last.',
    ],
    printNote: 'Fits one letter page, portrait. Diagonal prints as light gray.',
    sheetImage: {
      src: '/images/multiplication-chart-1-12-printable.png',
      alt: 'Free printable multiplication chart 1-12 — a filled 12 by 12 grid with the perfect-square diagonal shaded, on one letter-size page.',
      width: 2016,
      height: 1136,
      caption: 'The 1-12 chart exactly as it prints — one letter page, free.',
    },
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
        body: '"Why is 6 × 7 six less than 6 × 8?" Locating neighbors on the grid builds the derived-fact habits (doubles, one-more-set) that carry kids past memorization.',
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
        q: 'What is a mad minute, and how does the drill maker work?',
        a: 'A mad minute is the classic timed fluency drill: as many problems as possible in 60 seconds. The generator on this page lays out 30 or 60 problems in addition, subtraction, multiplication or mixed operations, for numbers up to 10, 12 or 20 — pick the settings, print, and the answer key prints on its own page. The default sheet prints even with JavaScript off.',
      },
      {
        q: 'Is this chart free to print?',
        a: 'Free, no sign-up, one letter page. The print button strips the page down to the chart itself; the shaded diagonal prints as light gray and photocopies fine.',
      },
    ],
    related: [
      { href: '/multiplication-chart-printable/', label: 'Multiplication chart printable — 3 formats' },
      { href: '/multiplication-chart-blank/', label: 'Blank multiplication chart for practice' },
      { href: '/times-table-chart/', label: 'Times table chart (grid + list layouts)' },
      { href: '/multiplication-chart-1-15/', label: 'Multiplication chart 1-15' },
      { href: '/multiplication-chart-1-20/', label: 'Multiplication chart 1-20 (challenge grid)' },
      { href: '/algebra-formula-sheet/', label: 'Algebra formula sheet (where the facts lead)' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'multiplication-chart-printable',
    hub: 'charts',
    h1: 'Multiplication Chart Printable',
    metaTitle: 'Multiplication Chart Printable: 3 Free Formats | ChartGlade',
    metaDescription:
      'Free printable multiplication chart in three formats — the filled 1-12 grid, a blank practice chart, and every times table written out as a list. Black and white, no sign-up.',
    lead:
      'One print job, three multiplication charts: the classic filled 1-12 grid, a blank copy for practice, and every times table written out line by line. It all prints as black lines on white letter paper — pick the pages you want in the print dialog and skip the rest.',
    introHeading: 'Three formats, one print job',
    intro: [
      'The print button above sends three letter pages to your printer, portrait. Page one is the filled 1-12 chart with all 144 products, page two is the same grid with the answers removed, and page three lists each times table on its own line — the 4s run 4 × 1 = 4 straight through 4 × 12 = 48, then the 5s, all the way to the 12s. Everything prints as black lines on white: the green headers and shaded squares you see on screen are stripped at print time, so one black cartridge is all you need and draft mode is fine — these sheets are line work, not photos.',
      'The 1-12 chart is the format to print because it is the format schools actually use. The Common Core fluency standard (3.OA.C.7) asks third graders to know every product of two one-digit numbers from memory — that is the 1-through-9 heart of the grid. Charts traditionally run through 12 because dozens still count: 12 hours on a clock, 12 inches in a foot, eggs by the dozen. A chart that stops at 10 leaves off facts kids meet outside worksheets; a chart that runs to 20 is a reference for older students, not a memorization map (the site has both — 1-15 and 1-20, linked below).',
      'Each format does a different job. The filled chart is a reference: it hangs on the wall or lives in a binder while memory catches up. The blank chart is a workout — filling it in forces recall, and recall is what installs the facts; recognizing an answer is not the same as producing it. The list page is the bridge for kids who find grids busy: one table at a time, read down the line like a chant. Print the filled chart for the wall and a stack of blanks for practice — that pair covers a school year of fact work.',
    ],
    printNote:
      'Prints as three letter pages, portrait: filled chart, blank chart, times-table lists. Need just one? Print that page only in the print dialog.',
    tips: [
      {
        title: 'Print page two by the handful',
        body: 'The blank chart is the consumable — print five now. A filled chart for reference plus a weekly blank to fill in is a complete fact program that fits in a folder.',
      },
      {
        title: 'Draft mode is fine here',
        body: 'These sheets are line work with no solid fills, so your printer’s draft or grayscale setting prints them cleanly and stretches the cartridge for months. Save the high-quality setting for the wall copy.',
      },
      {
        title: 'Chant down the list page',
        body: 'Cover the answers on a line with a sticky note and call it out — 4, 8, 12, 16 — then uncover to check. That is skip counting, and it is exactly how the 2s, 5s and 10s get learned first.',
      },
      {
        title: 'A4 paper works too',
        body: 'The sheets are sized for US letter, but nothing clips on A4 — the tables shrink slightly and stay readable. Same three pages, no printer settings to fight.',
      },
    ],
    faqs: [
      {
        q: 'Is this multiplication chart printable free?',
        a: 'Yes — free, no sign-up, no email, no watermark. The charts print straight from your browser; there is nothing to download first.',
      },
      {
        q: 'Can I get the multiplication chart as a PDF?',
        a: 'No download needed: in the print dialog, choose “Save as PDF” as the printer and you get a clean three-page PDF of exactly these sheets — one page per format, black lines on white. Works the same on Windows, Mac, Chrome and Safari.',
      },
      {
        q: 'What do the three printed pages include?',
        a: 'Page one is the filled 1-12 chart, page two is the blank 1-12 chart, and page three lists each times table as its own line of equations, 1s through 12s. Every page is portrait letter and stands alone — print any one of them.',
      },
      {
        q: 'Does the chart print in color or black and white?',
        a: 'Black and white only. The color you see on screen — green headers, shaded perfect squares — is dropped at print time, so the sheets use about as little ink as a page can. Photocopies come out clean too.',
      },
      {
        q: 'Should I print the filled chart or the blank one?',
        a: 'Both, for different jobs. The filled chart is for looking facts up — wall or binder. The blank chart is for practice, because producing an answer from memory strengthens it far more than reading it does. One filled on the wall, blanks by the dozen.',
      },
      {
        q: 'Why does the chart go to 12 instead of 10?',
        a: 'Third-grade fluency standards cover products of one-digit numbers — through 9 × 9. Charts run to 12 × 12 because 12s are everywhere outside the classroom: hours on a clock, inches in a foot, eggs in a carton. The 10s column ends the easy patterns; 11s and 12s close out the facts that workbooks still drill.',
      },
    ],
    related: [
      { href: '/multiplication-chart/', label: 'Interactive multiplication chart 1-12' },
      { href: '/multiplication-chart-blank/', label: 'Blank multiplication chart (full page)' },
      { href: '/times-table-chart/', label: 'Times table chart (grid + list layouts)' },
      { href: '/multiplication-chart-1-15/', label: 'Multiplication chart 1-15' },
      { href: '/multiplication-chart-1-20/', label: 'Multiplication chart 1-20' },
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
      { href: '/multiplication-chart-printable/', label: 'Printable pack — filled, blank and lists' },
      { href: '/times-table-chart/', label: 'Times table chart (grid + list)' },
      { href: '/multiplication-chart-1-15/', label: '1-15 chart (next step up)' },
      { href: '/multiplication-chart-1-20/', label: 'Multiplication chart 1-20' },
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
      { href: '/multiplication-chart-printable/', label: 'Multiplication chart printable — 3 formats' },
      { href: '/multiplication-chart-blank/', label: 'Blank chart for practice' },
      { href: '/times-table-chart/', label: 'Times table chart' },
      { href: '/multiplication-chart-1-20/', label: 'Multiplication chart 1-20' },
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
      { href: '/multiplication-chart-printable/', label: 'Multiplication chart printable — 3 formats' },
      { href: '/multiplication-chart-1-15/', label: 'Multiplication chart 1-15' },
      { href: '/multiplication-chart-blank/', label: 'Blank chart for practice' },
      { href: '/times-table-chart/', label: 'Times table chart' },
      { href: '/hundred-chart/', label: 'Hundred chart for younger grades' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'times-table-chart',
    hub: 'charts',
    h1: 'Times Table Chart',
    metaTitle: 'Times Table Chart — Free Printable 1-12 | ChartGlade',
    metaDescription:
      'Free printable times table chart 1-12 in two layouts — the classic grid and each times table as its own list — plus the order kids actually learn the tables in.',
    lead:
      'The full 1-12 times table chart, free to print, in two layouts: the grid everyone knows, and each times table written out as its own list of facts. Same 144 answers, two ways to read them — plus the order teachers actually introduce the tables in, and how skip counting does the early work.',
    introHeading: 'The order kids actually learn the times tables',
    intro: [
      'Times tables are not learned counting up from 1 to 12. Nearly every curriculum starts with the 2s, 5s and 10s, because those rows show patterns you can see: doubles, endings that flip between 5 and 0, a zero bolted onto the other factor. Next come the 3s and 4s, usually through skip-counting songs and short daily chants. The 6s, 7s and 8s are the hard middle — most kids build them from facts they already know, so 6 × 8 becomes 5 × 8 plus one more 8. The 9s, 11s and 12s land last and easiest: the 9s carry the finger trick and the digits-add-to-9 pattern, the 11s read themselves almost to 9 × 11, and the 12s are just a 10 and a 2 stuck together.',
      'Skip counting is the engine underneath all of it. A times table is skip counting written down — the 4s row is exactly what you hear chanting 4, 8, 12, 16, 20. That is why the second sheet on this page lists each table as its own line: read down it as a chant, cover the answers, chant again. Coloring skip counts on a hundred chart is the same lesson a year earlier, and by third grade the standard asks for these products from memory — the chart is the map, the chants put on the miles.',
    ],
    extraSection: {
      heading: 'Times table or multiplication chart — what is the difference?',
      paras: [
        'Nothing, in the numbers. A times table chart and a multiplication chart show the same 1-12 grid with the same 144 products. “Times table” is the everyday phrase — what parents and kids say (“do you know your 7 times table?”) — while multiplication chart or multiplication table is the textbook term. British schools lean hard on times tables; England even runs a national on-screen times tables check at the end of Year 4. American teachers more often say multiplication facts or fact fluency, but US families search “times table chart” just as much — same tool, different dialect.',
        'Use whichever word your kid uses; the job is identical: facts recalled without counting, well enough to free up attention for bigger problems. If your child reads a grid as a wall of numbers, hand them the list sheet first — one table at a time, in learning order, is a smaller door into the same room. When the lists feel easy, the grid becomes what it is meant to be: a place to look up the two or three facts that still slip.',
      ],
    },
    printNote:
      'Prints as two letter pages, portrait: the 1-12 grid, then each times table as its own list. Print either page alone from the print dialog.',
    tips: [
      {
        title: 'Start with the 2s, 5s and 10s',
        body: 'These three tables carry the clearest patterns, and finishing them early gives kids three known rows to lean on. The 10s also set up place value, money math and the 9s trick later.',
      },
      {
        title: 'Chant, cover, chant again',
        body: 'Read one table down the list sheet aloud twice, cover the answers with a sticky note, and chant it from memory. Uncover to check. Two minutes per table per day beats a half-hour worksheet on Saturday.',
      },
      {
        title: 'Build the hard ones from easy ones',
        body: 'Is 6 × 8 slippery? It is 5 × 8 (40) plus one more 8. Kids who learn to lean on facts they know stop guessing — and the 6s, 7s and 8s shrink from three scary rows to a handful of genuinely new facts.',
      },
      {
        title: 'Color the skip counts first',
        body: 'Before any drills, color the 2s, 5s and 10s on a hundred chart. Watching the columns light up makes skip counting visible — and it is the same skill that will carry the 3s and 4s.',
      },
    ],
    faqs: [
      {
        q: 'What is a times table chart?',
        a: 'A chart that shows all the times tables from 1 to 12 in one grid: row 7 meets column 8 at 7 × 8 = 56. Each row is one full table — the 7s row runs 7, 14, 21 on up to 84. It is the same thing as a multiplication chart.',
      },
      {
        q: 'Which times table should kids learn first?',
        a: 'The 2s, 5s and 10s — the friendliest patterns. Then the 3s and 4s through skip counting, then the 6s, 7s and 8s built from known facts, with the 9s, 11s and 12s last. Schools vary a little — some pull the 9s earlier because the patterns are so satisfying — but 2s, 5s and 10s first is close to universal.',
      },
      {
        q: 'How can my child memorize the times tables?',
        a: 'Short daily practice beats long sessions: chant one table down the list sheet, cover the answers, chant again, check. Follow with a blank chart to fill in, and move to the timed mad-minute drills on the multiplication chart page once recall is reliable. Most kids need a few weeks per table — that is normal, not a problem.',
      },
      {
        q: 'Is a times table chart the same as a multiplication chart?',
        a: 'Yes — same grid, same products. “Times table” is the spoken, everyday term; “multiplication chart” is the textbook term. British usage favors times tables (England tests them nationally in Year 4); American classrooms say both.',
      },
      {
        q: 'Why does this page have two layouts?',
        a: 'The grid is for looking facts up and spotting patterns — the symmetry, the perfect squares down the diagonal. The list sheet shows one table at a time, which chants well and suits kids who find grids busy. Same 144 facts either way; print the one that fits the kid, or both.',
      },
      {
        q: 'Is the times table chart free to print?',
        a: 'Free, no sign-up. Both sheets print on letter paper in black and white — the grid on page one, the table-by-table list on page two. Pick a single page in the print dialog if that is all you need.',
      },
    ],
    related: [
      { href: '/multiplication-chart/', label: 'Multiplication chart 1-12 (interactive, with drills)' },
      { href: '/multiplication-chart-printable/', label: 'Multiplication chart printable — 3 formats' },
      { href: '/multiplication-chart-blank/', label: 'Blank multiplication chart' },
      { href: '/multiplication-chart-1-15/', label: 'Multiplication chart 1-15' },
      { href: '/multiplication-chart-1-20/', label: 'Multiplication chart 1-20' },
      { href: '/hundred-chart/', label: 'Hundred chart for skip counting' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },
];
