import type { PageDef } from './pageTypes';

/**
 * Loose pages — single charts that don't form a cluster. Job: pick up soft
 * long-tail wins (alphabet chart is KD 15, the softest audited word on the
 * site) and feed internal links to the pillar clusters.
 */
export const loosePages: PageDef[] = [
  {
    slug: 'fraction-chart',
    hub: 'charts',
    h1: 'Fraction Chart',
    metaTitle: 'Fraction Chart (Printable Fraction Strips to 1/12) | ChartGlade',
    metaDescription:
      'Free printable fraction chart — bar-model strips from 1 whole to 1/12 that make equivalences visible, plus how teachers use fraction strips in grades 3-5.',
    lead:
      'Fraction strips are the honest way to see fractions: same-length bars split into 2, 3, 4 … 12 parts, stacked so the equivalences line up by themselves — 1/2 meets 2/4 meets 3/6. Print the chart, then read what folding and comparing with strips teaches that circles never will.',
    introHeading: 'Why bars beat circles for teaching fractions',
    intro: [
      'A fraction is a number, and the best way to see a number is on a length. Bar-model strips keep every fraction the same total length and vary only the cuts, so comparing fractions becomes literally lining them up: 1/3 falls short of 2/5, 3/4 edges out 2/3, and 1/2 aligns exactly with 2/4, 4/8 and 6/12. Those alignments are the chart\'s whole curriculum — equivalence, comparison and benchmarks, visible without a single rule being stated.',
      'Circles, the traditional fraction picture, hide all of that: wedge angles are hard to compare across different denominators, and nothing lines up with anything. Strips also fold — physically halving the 1/2 bar makes 1/4, and halving again makes 1/8 — which turns the equivalence table into a discovery instead of a lecture. Print on cardstock if you can; strips get handled.',
    ],
    printNote: 'All strips fit one letter page, portrait.',
    tips: [
      {
        title: 'Fold, don\'t tell',
        body: 'Hand over the printed chart and ask for folds: fold 1/2 in half, what appears? Fold a third bar into sixths by matching edges? Every correct fold is an equivalence the child now owns.',
      },
      {
        title: 'Find the twin',
        body: 'Lay 2/3 of the thirds-bar next to 8/12 of the twelfths-bar — same length. Hunt-the-twin across the whole chart is the equivalence table without the table.',
      },
      {
        title: 'Benchmark against 1/2 first',
        body: 'Is 5/8 more or less than half? The 1/2 strip answers in one glance. Estimating against one-half before comparing exactly is the habit grade 4-5 tests reward.',
      },
      {
        title: 'Cut the chart into a permanent manipulative',
        body: 'Slice each row into its parts and keep the set in an envelope. A cut-up chart survives a year of desk work; an intact one is a poster by Thursday.',
      },
    ],
    faqs: [
      {
        q: 'What is a fraction chart?',
        a: 'A set of same-length bars — the fraction strips above — each divided into a different number of equal parts, from one whole through twelfths. Stacking them makes fraction sizes, equivalences and comparisons visible by alignment.',
      },
      {
        q: 'How do you use fraction strips?',
        a: 'Compare (lay 3/4 next to 2/3 and see which is longer), find equivalences (1/2 aligns with 2/4, 3/6, 4/8 and 6/12), and fold to discover them (halving a bar doubles the denominator). Cut into pieces, they become a permanent hands-on manipulative.',
      },
      {
        q: 'What grade are fraction charts for?',
        a: 'Grade 3 introduces halves, thirds, fourths, sixths and eighths; grade 4 adds equivalences and comparisons with different denominators; grade 5 extends to tenths and hundredths alongside decimals. The same printed chart serves all three years.',
      },
      {
        q: 'Why use fraction strips instead of circles?',
        a: 'Lengths compare; wedge angles do not. Same-length bars let any two fractions line up for a direct visual comparison across denominators — which is exactly the skill fraction notation itself does not show.',
      },
    ],
    related: [
      { href: '/decimal-place-value-chart/', label: 'Decimal place value chart (fractions\' other half)' },
      { href: '/hundred-chart/', label: 'Hundred chart' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'hundred-chart',
    hub: 'charts',
    h1: 'Hundred Chart',
    metaTitle: 'Hundred Chart 1-100 (Free Printable) | ChartGlade',
    metaDescription:
      'Free printable hundred chart 1-100 with the patterns that teach number sense — plus the games and puzzles that make it a year-long tool for K-2.',
    lead:
      'The 1-100 grid that quietly runs kindergarten through second grade: skip-counting, plus-one and plus-ten patterns, missing numbers, mystery clues. Print the chart — the notes below are the games that keep it in use all year.',
    introHeading: 'A number line, folded into a grid',
    intro: [
      'A hundred chart is the counting sequence arranged ten to a row, which means it is secretly two tools at once: read across for the number line, read down for the tens. Move one square right and you have added one; move one square down and you have added ten. That second fact — that the number below is always ten more — is the chart\'s superpower, and it is the mental-math habit place value is built on.',
      'The chart earns its year-long wall spot through games rather than drills. Skip-count coloring (color every second number, watch the columns emerge) teaches the 2s pattern without a times table in sight. Missing-number puzzles — a chart with holes — turn writing numbers into detective work. And mystery-number clues ("I am more than 40, less than 60, and my digits add to 10") hit number sense, inequality and addition in one five-minute warm-up.',
    ],
    printNote: 'One letter page, portrait. Also prints fine as a desk strip.',
    tips: [
      {
        title: 'Color the skip counts',
        body: 'Every 2nd number, every 5th, every 10th — each with its own color. The columns that emerge are the multiplication patterns kids will meet in grade 3, learned here as pictures first.',
      },
      {
        title: 'The 10-more box',
        body: 'Point anywhere and ask "ten more?" — the answer is directly below. Then "ten less" (above). This single habit, repeated for a semester, is regrouping rehearsal without the column arithmetic.',
      },
      {
        title: 'Hole-punch a copy',
        body: 'White out a dozen numbers on a printed copy and kids fill the holes. Holes near row-ends (48→52 across a decade boundary) are the ones worth leaving.',
      },
      {
        title: 'Count by ones first, always',
        body: 'Before any pattern work, a new-to-the-chart child should read a full row aloud. The chart assumes the sequence; the sequence comes first.',
      },
    ],
    faqs: [
      {
        q: 'What is a hundred chart?',
        a: 'A 10×10 grid of the numbers 1-100, ten per row. Reading across gives the counting sequence; reading down adds ten each row — which makes it a tool for skip counting, place value patterns, and one-more/ten-more mental math.',
      },
      {
        q: 'Why do some hundred charts go 0-99 instead of 1-100?',
        a: 'Both layouts exist. A 0-99 chart lines up the decades in columns (every row starts a new ten); the 1-100 chart is the more common K-2 version in the US and matches how the counting sequence is said aloud. Either teaches the same patterns — match whichever version the school uses.',
      },
      {
        q: 'What grade uses a hundred chart?',
        a: 'Mainly K-2: counting and number recognition in kindergarten, plus-one/plus-ten patterns in grade 1, and skip counting in grade 2. It fades out in grade 3 as the multiplication chart takes over the same wall hook.',
      },
      {
        q: 'How is a hundred chart different from a number line?',
        a: 'Same numbers, different shape — and shape is the feature. A number line shows magnitude as distance; a hundred chart folds that line into rows so same-tens numbers stack into columns, making +10 a physical move downward.',
      },
    ],
    related: [
      { href: '/number-line-printable/', label: 'Number line printable 0-20' },
      { href: '/place-value-chart/', label: 'Place value chart (the grade 2+ version)' },
      { href: '/multiplication-chart/', label: 'Multiplication chart (grade 3+)' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'number-line-printable',
    hub: 'charts',
    h1: 'Number Line Printable',
    metaTitle: 'Number Line Printable 0-20 (Free, With Tips) | ChartGlade',
    metaDescription:
      'Free printable number line 0-20 for counting and early addition — how to use hops and jumps so the line teaches the operation, not just the answer.',
    lead:
      'A clean 0-20 number line, one per letter page, big enough for a finger to land on each tick. Print it for counting practice, then use the hop method below — the number line is where addition and subtraction become movements before they become symbols.',
    introHeading: 'Numbers you can walk on',
    intro: [
      'A number line turns quantity into position, and position is something a five-year-old already understands. More is to the right. Counting is stepping. The line below runs 0-20 with a tick and a numeral for each whole number, in print large enough that a fingertip can sit on one tick without covering its neighbor — that tactile bit matters, because the entire method is "put your finger on the first number and hop."',
      'The hop method is how the line teaches addition: to solve 4 + 3, put a finger on 4, then hop three ticks to the right, saying each landing number aloud — 5, 6, 7. Subtraction reverses the walk. Two things are silently happening: the child is practicing the count-on strategy (start at 4, not at 1) and learning that adding is motion in a direction. Both transfer directly to the hundred chart and the ruler.',
    ],
    printNote: 'One line per letter page, landscape orientation.',
    landscape: true,
    tips: [
      {
        title: 'Hop out loud, land by landing',
        body: 'Saying each landing number ("5, 6, 7") is what makes it counting-on instead of finger-flailing. Silent hopping quietly becomes guessing.',
      },
      {
        title: 'Start at the bigger number',
        body: 'For 2 + 7, start at 7 and hop twice. The line makes the commutative property visible — both walks end at 9 — and starting big is the habit that scales to 98 + 4 later.',
      },
      {
        title: 'Cover the numerals for estimation',
        body: 'Fold a strip of paper over the numbers and ask "where would 14 be?" Pointing first, checking after: that is number sense, rehearsed.',
      },
      {
        title: 'Laminate for skip counting',
        body: 'On a laminated line, hop by 2s and 5s with a dry-erase marker — dot, arc, dot, arc. The arcs are literally the jumps that addition notation will draw next year.',
      },
    ],
    faqs: [
      {
        q: 'How do you use a number line for addition?',
        a: 'The hop method: find the first number, hop one tick per count of the second number (landing numbers said aloud), and read where the finger stops. Subtraction is the same walk in reverse — the operation becomes a direction before it becomes a symbol.',
      },
      {
        q: 'What number line do kindergartners use?',
        a: 'Usually 0-10 at the start of the year and 0-20 by the end — one tick per whole number, numerals under the ticks. This page prints the 0-20 version; folding it in half gives a clean 0-10 line for beginners.',
      },
      {
        q: 'Should the number line start at 0 or 1?',
        a: 'Start at 0. Zero anchors the line — it is the "start here" for hopping and the reason every number\'s position has meaning. Counting objects starts at 1, but positions on a line start at 0.',
      },
      {
        q: 'How is a number line different from a hundred chart?',
        a: 'The line shows numbers as positions along a length — great for magnitude, order and addition-as-motion. The hundred chart folds 1-100 into rows so tens stack in columns — great for place value patterns. K-1 leans on the line; grades 1-2 lean on the chart; both transfer to each other.',
      },
    ],
    related: [
      { href: '/hundred-chart/', label: 'Hundred chart 1-100' },
      { href: '/addition-chart/', label: 'Addition chart' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'addition-chart',
    hub: 'charts',
    h1: 'Addition Chart',
    metaTitle: 'Addition Chart to 12+12 (Free Printable) | ChartGlade',
    metaDescription:
      'Free printable addition chart 0-12 with the strategies that end finger counting — doubles, making ten, and the mirror symmetry that halves the facts.',
    lead:
      'The addition facts chart from 0+0 to 12+12, with the doubles diagonal marked. Click any cell to check a fact. Below it: the three strategies — plus-one neighbors, doubles, make-a-ten — that retire finger counting for good.',
    introHeading: 'The chart that retires finger counting',
    intro: [
      'Addition fluency to 20 is a grade 1-2 milestone, and the chart above is its wall map: every fact from 0+0 through 12+12 in one grid, with the doubles (2+2, 5+5 …) shaded along the diagonal. Like the multiplication chart it mirrors, the grid is symmetric — 4+7 and 7+4 are the same cell reflected — so of the 169 facts here, students truly need to learn only half plus the shaded diagonal.',
      'The strategies matter more than the grid. Plus-one is the next number in the count. Doubles are memorized fast (they rhyme: four and four, door). Near-doubles lean on them (6+7 is double-six plus one). And make-a-ten is the workhorse: 8+5 becomes 8+2+3, landing on 10+3, which everyone knows. A child running those three strategies stops needing fingers mid-second-grade — the chart is where the strategies get pointed at.',
    ],
    printNote: 'One letter page, portrait. Doubles diagonal prints as light gray.',
    interactive: true,
    tips: [
      {
        title: 'Learn the +0 and +1 rows once, dismiss them',
        body: 'Zero keeps every number the same; plus-one is the next counting word. Two rows of the chart retired in one minute — start every chart lesson by crossing them out.',
      },
      {
        title: 'Doubles first, then their neighbors',
        body: 'Drill the shaded diagonal (2+2 through 6+6) until instant, then ask its neighbors (6+7, 7+8) as double-plus-one. Half the near-doubles row falls to one habit.',
      },
      {
        title: 'Make-a-ten is the graduation move',
        body: '8+4 → 10+2. 9+6 → 10+5. Facts that bridge ten are the ones fingers get called for; make-a-ten replaces the hand with a strategy. The chart\'s 10 row is the anchor.',
      },
      {
        title: 'Same chart, subtraction questions',
        body: '"Find the 12s" — any pair in a row or column summing to 12 is a subtraction fact read backwards. Cover the answer cell and the chart becomes a subtraction trainer for free.',
      },
    ],
    faqs: [
      {
        q: 'What is an addition chart?',
        a: 'A grid where row and column headers are addends and each cell holds their sum — this one covers every fact from 0+0 to 12+12 (169 cells). Click a cell above to hear the fact read back beneath the chart.',
      },
      {
        q: 'When should kids stop using an addition chart?',
        a: 'Grade 2 is the usual milestone for fluency with facts to 20 — about three seconds per fact without counting. Until then the chart is a legitimate reference; strategy work (doubles, make-a-ten) is what actually retires it.',
      },
      {
        q: 'Why is the diagonal shaded?',
        a: 'Cells where both addends are equal are the doubles — 1+1, 2+2 through 12+12. They are the fastest facts to memorize and the anchor for near-doubles (6+7 = double 6, plus one), so they get their own visual lane.',
      },
      {
        q: 'How does an addition chart help with subtraction?',
        a: 'Read it backwards: pick a sum, find it in the grid, and the row and column headers are the missing addends. Covering answer cells turns the same printed chart into subtraction practice.',
      },
    ],
    related: [
      { href: '/multiplication-chart/', label: 'Multiplication chart (grade 3+)' },
      { href: '/number-line-printable/', label: 'Number line printable (the pre-chart step)' },
      { href: '/hundred-chart/', label: 'Hundred chart' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'alphabet-chart',
    hub: 'charts',
    h1: 'Alphabet Chart',
    metaTitle: 'Alphabet Chart (A-Z Printable for Preschool & K) | ChartGlade',
    metaDescription:
      'Free printable alphabet chart — uppercase and lowercase pairs with a key word for each letter, plus how to run the letter-sound chant that builds phonics.',
    lead:
      'One page, 26 letter pairs, 26 key words: the chart that sits on kindergarten walls and gets pointed at ten times a day. Print it, then run the chant below — letter name, letter sound, key word — the three-beat routine that phonics instruction is built on.',
    introHeading: 'Letter names, letter sounds — and why the chart has both',
    intro: [
      'An alphabet chart pairs each uppercase and lowercase letter with a key word — A a apple, B b ball — because a child learning letters is actually learning three things per letter: its name (ay), its sound (/a/), and a memory anchor that connects them (apple). The chart puts all three in one glance, and lowercase gets equal billing on purpose: reading is mostly lowercase (the books are full of it), while capitals mostly mark beginnings.',
      'The chant is how the chart gets used: point, say the letter name, say its sound, say the key word — "A, /a/, apple," three beats, next square. Twenty-six squares at about four seconds each is a two-minute routine, and it is the highest-yield two minutes in early literacy. The key words matter more than they look: they are the retrieval cue. A child who forgets a sound but remembers "apple" can walk back to it.',
    ],
    printNote: 'One letter page, portrait. Key words in plain text.',
    tips: [
      {
        title: 'Point at one row, not the whole chart',
        body: 'The full 26-letter chant is a review; new letters get learned one row at a time. "Today\'s row" keeps attention on the four to six letters actually being taught.',
      },
      {
        title: 'Watch the vowel trap',
        body: 'Key words for vowels should use the short sound — apple, egg, igloo, octopus, umbrella. If a chart shows "apron" or "eagle," the anchor word is teaching the long sound and undermining phonics instruction.',
      },
      {
        title: 'Cover the letters, keep the words',
        body: 'Fold paper over the letter column and let the key words cue the sounds from memory. Then reverse — cover words, chant from letters alone. Both directions are the fluency check.',
      },
      {
        title: 'Same chart next year for alphabetical order',
        body: 'The chart outlasts letter-sound work: first graders use the same page for dictionary skills and alphabetical order. Leave it hanging; the lesson changes under it.',
      },
    ],
    faqs: [
      {
        q: 'What is an alphabet chart?',
        a: 'A one-page reference with all 26 letters — uppercase and lowercase pairs — each paired with a key word that anchors its most common sound (A a apple). It is the standard wall and desk reference for preschool and kindergarten phonics.',
      },
      {
        q: 'Why teach both uppercase and lowercase together?',
        a: 'Because reading is mostly lowercase — books, labels, screens — while capitals mostly appear at beginnings of names and sentences. Children need both forms early, and lowercase is the one that pays daily. Pairing them on one chart keeps the two forms attached to one sound.',
      },
      {
        q: 'How do you use an alphabet chart for phonics?',
        a: 'The three-beat chant: letter name, letter sound, key word — "A, /a/, apple." Two minutes a day, pointing as you go. Later, cover columns (letters or key words) so each part is recalled from the others.',
      },
      {
        q: 'What makes a good key word for each letter?',
        a: 'One that starts with the letter\'s most common sound — usually the short vowel sound for a, e, i, o, u — and is concrete enough to picture: apple, ball, cat. Avoid blends (sh- or ch- words for s and c) and long-sound anchors like "ice" for i. X is the one exception: its sound is /ks/ at the end of words, so fox or box beats xylophone.',
      },
    ],
    related: [
      { href: '/preschool-sight-words/', label: 'Preschool sight words (the next step)' },
      { href: '/cursive-alphabet/', label: 'Cursive alphabet chart (grade 3)' },
      { href: '/charts/', label: 'All charts' },
    ],
  },
];
