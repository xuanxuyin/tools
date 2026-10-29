import type { PageDef } from './pageTypes';

/**
 * The single times-table matrix (PLAN #29, the A2 competitor-teardown batch:
 * DadsWorksheets rides 34 times-table URLs; we had zero). One page per
 * table, 1-12, at /times-table/<n>/ — same dynamic-route pattern as the
 * cursive letters. Every page's facts, skip-count list and FAQ answer list
 * are COMPUTED from n; the strategy content (intro, tips, trick FAQs) is
 * hand-written per table because each table has a genuinely different job.
 */

interface TableSeed {
  n: number;
  /** one-line hook for the meta description, unique per table */
  metaHook: string;
  lead: string;
  introHeading: string;
  intro: string[];
  tips: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

const SEEDS: TableSeed[] = [
  {
    n: 1,
    metaHook: 'the identity property on one page',
    lead: 'The 1 times table is every number itself: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12. That sounds like nothing to practice — it is actually the first property of multiplication kids ever meet, and the row that explains what the × sign means.',
    introHeading: 'Why the 1s matter more than they look',
    intro: [
      'Read “7 × 1” out loud as “seven, one time” and the answer is obviously seven: one group of seven things is just those seven things. That is the identity property — multiplying by 1 leaves a number unchanged — and it is the first rule of multiplication children can state in words. The 1s row earns its page not because it is hard, but because it is the sentence kids say for every later table: “how many groups, how many in each group.”',
      'The 1s row is also the header row of the whole multiplication chart. Every column of the 12×12 grid starts with 1, 2, 3 … 12 because one group of n is n. A student who can explain why 12 × 1 = 12 without counting on fingers is ready for the 2s; a student who cannot is telling you the × sign still means nothing, and no amount of drilling bigger tables will fix that.',
    ],
    tips: [
      {
        title: 'Say it the long way first',
        body: 'Before memorizing anything, have your student read each fact as “one group of ___”: one group of 8 is 8. The × sign means “groups of,” and the 1s table is where that sentence gets installed.',
      },
      {
        title: 'Use it as a pattern hunt',
        body: 'The 1s answers are just the counting numbers — point at that out loud. Kids love that the “trick” table is secretly the number line itself, and it makes the 2s row (“add the number to itself”) feel like the next step in a game.',
      },
      {
        title: 'The classic wrong answer',
        body: 'Some children answer 1 × n with n + 1 because they add the two numbers they see. If that shows up here, slow down: it means facts are being added, not multiplied, and it will follow them into every table.',
      },
      {
        title: 'One day is enough',
        body: 'Unlike the 6s or 7s, the 1s need one session, not a week. Take the win, print the practice strip, and move to the 2s while the momentum is hot.',
      },
    ],
    faqs: [
      {
        q: 'Why is anything times 1 itself?',
        a: 'Multiplication counts groups of equal size. “n × 1” asks for one group of n — and one group of anything is just the thing itself. This rule is called the identity property of multiplication, and it stays true for every number your student will ever meet, including fractions and decimals.',
      },
      {
        q: 'What grade is the 1 times table for?',
        a: 'Grade 2-3, at the very start of multiplication. The 1s (with the 0s and 10s) are taught first precisely because the answers are already known — the lesson is what the × sign means, not what the answers are.',
      },
      {
        q: 'Should we drill the 1s at all?',
        a: 'Briefly. One page of practice is plenty — the point is fluency with reading “groups of,” not memorizing answers that are already automatic. If a student misses 1s facts later, it is almost always an adding-not-multiplying habit, not a memory problem.',
      },
      {
        q: 'What comes after the 1 times table?',
        a: 'The 2s and 5s and 10s, in most curricula — the tables whose patterns are visible on the first look. Our 2 times table page is the natural next print.',
      },
    ],
  },
  {
    n: 2,
    metaHook: 'doubles kids already know from addition',
    lead: 'The 2 times table is the doubles row: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24. Kids arrive already knowing most of it, because doubling is the first mental-math trick addition ever teaches — this page turns that head start into the first multiplication table they truly own.',
    introHeading: 'The table that is already in their head',
    intro: [
      'Every 2s fact is an addition double wearing a costume: 2 × 7 is 7 + 7, and by the time multiplication starts in grade 2-3, most children can double single-digit numbers without thinking. That is why curricula teach the 2s first (with the 5s and 10s) — the answers are effectively pre-loaded, so all the effort goes into the new skill: recalling doubles as multiplication facts instead of adding on fingers.',
      'The 2s also carry the first structural insight in the whole chart: the answers are exactly the even numbers, every other number on the number line. Say them out loud — two, four, six, eight — and you are skip counting, the skill that underlies every times table from here on. A student who can count by 2s while bouncing a ball has already memorized this page.',
    ],
    tips: [
      {
        title: 'Rebrand the doubles',
        body: 'Write 7 + 7 = 14 and 2 × 7 = 14 side by side on the same card. The connection is the lesson: same fact, two costumes. One week of “if you can double it, you know it” retires half the table.',
      },
      {
        title: 'Count the pairs around you',
        body: 'Shoes, gloves, eyes, wings, socks — the world is full of twos. “Three pairs of shoes is 3 × 2 shoes” is the sentence that turns skip counting into multiplication meaning.',
      },
      {
        title: 'Bounce or clap the evens',
        body: 'Rhythm carries skip counting better than worksheets: clap on 2, 4, 6, 8 while counting aloud, then ask “what comes after 12?” The body remembers the cadence and supplies the next number.',
      },
      {
        title: 'Watch for the 2n + 2 slip',
        body: 'The common 2s error is answering 2 × 7 with 9 (adding 2 instead of doubling). Cover the top reference strip of this sheet, have the student write answers, and the slip is obvious immediately — and cheap to fix.',
      },
    ],
    faqs: [
      {
        q: 'How do you learn the 2 times table fast?',
        a: 'Use the doubles you already have: 2 × n is the same as n + n. Practice recalling doubles as multiplication facts — 2 × 7 is “double seven,” 14 — and the whole table falls in one or two sessions.',
      },
      {
        q: 'What are the numbers in the 2 times table?',
        a: '2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24 — the even numbers in order, from 2 × 1 through 2 × 12. Because the list is so regular, skip counting by 2 and knowing the table are the same skill.',
      },
      {
        q: 'What grade is the 2 times table for?',
        a: 'Grade 2 introduces it as repeated addition and doubles; grade 3 expects fluency. It is usually the first or second table taught, right alongside the 5s and 10s.',
      },
      {
        q: 'Why are all the answers even?',
        a: 'Doubling any number gives an even number — an even number is literally “a number that can be split into two equal groups,” and 2 × n is exactly two equal groups of n. Seeing that connection is an early look at the structure behind the whole chart.',
      },
    ],
  },
  {
    n: 3,
    metaHook: 'double it, then add one more set',
    lead: 'The 3 times table is 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36 — the first table with no free pattern, and the first that rewards a real strategy: double the number, then add one more set. 3 × 7? Double 7 (14), add one more 7 (21).',
    introHeading: 'The first table you cannot fake',
    intro: [
      'The 1s answer themselves, the 2s are doubles, the 5s and 10s have obvious patterns — and then the 3s arrive with nothing to grab. That is not a flaw; it is the point where multiplication stops being pattern-matching and starts being derived facts. The workhorse strategy is “double plus one set”: 3 × 8 is 2 × 8 (16) plus one more 8 (24). Every 3s fact can be built that way from a known double.',
      'Teachers also love the 3s for skip counting with body weight: three, six, nine, twelve is the waltz rhythm, and counting by 3s while stepping or clapping installs the sequence faster than any flashcard drill. The answers do have one soft pattern — the digits cycle 3, 6, 9, 2, 5, 8, 1, 4, 7, 0 through the multiples of ten — but that is a curiosity to notice after the facts are solid, not a shortcut to rely on before.',
    ],
    tips: [
      {
        title: 'Double, then add one set',
        body: 'Teach 3 × n as a two-step build: double n, then add n once more. Students who own their 2s can derive any 3s fact in two seconds — and deriving counts as knowing while the memory firms up.',
      },
      {
        title: 'Waltz while you count',
        body: 'THREE-six-nine-TWELVE with a step or clap on each number. The 3s cadence is dance rhythm, and rhythm beats flashcards for sequence memory. Thirty seconds of stepping per day outperforms a ten-minute drill.',
      },
      {
        title: 'Triangles and tricycles',
        body: 'Anchor the table in threes kids can picture: triangle sides (4 triangles = 4 × 3 = 12 sides), tricycle wheels, three-leaf clovers. A picture per fact is a memory hook a naked “3 × 4” never provides.',
      },
      {
        title: 'Do not teach the digit trick too early',
        body: 'The multiples-of-3 digit-sum rule (a number divides by 3 if its digits sum to a multiple of 3) is real math — but it checks divisibility, it does not produce the answer. Show it after fluency, or students use it to avoid recalling.',
      },
    ],
    faqs: [
      {
        q: 'Is there a trick for the 3 times table?',
        a: 'The reliable one is a build, not a trick: 3 × n = 2 × n plus one more n. Double the number, add it again. There is also a divisibility check — a number is a multiple of 3 if its digits sum to 3, 6 or 9 (later: any multiple of 3) — but that confirms answers, it does not generate them.',
      },
      {
        q: 'What are the 3 times tables up to 12?',
        a: '3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33 and 36 — that is 3 × 1 through 3 × 12. The last fact, 3 × 12 = 36, doubles as 36 = 6 × 6, a nice square-number conversation.',
      },
      {
        q: 'What grade do students learn the 3s?',
        a: 'Grade 2-3. The 3s usually follow the 2s, 5s and 10s — the first table without a visible pattern, which is why strategies like “double plus one set” get taught right here.',
      },
      {
        q: 'Why is 3 × 7 = 21 worth extra reps?',
        a: 'Because it sits in the 3s row with no landmark near it — no square, no money anchor, no finger trick — so it is one of the first facts kids lose under pressure. Put it on the fridge; it repays the attention.',
      },
    ],
  },
  {
    n: 4,
    metaHook: 'double the doubles',
    lead: 'The 4 times table is 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48 — and every fact is two doublings: 4 × 7 is double 7 (14), double again (28). If the 2s are doubles, the 4s are the doubles of the doubles, and kids who own that chain never memorize this table cold.',
    introHeading: 'Double, then double again',
    intro: [
      'The 4s strategy is the cleanest derived-fact chain in elementary math: 4 × n = 2 × (2 × n). Double seven to fourteen, double fourteen to twenty-eight. Two steps, both using a skill the student has had since before multiplication started. This is worth teaching as an idea, not just a table — “when a fact feels too big, halve the problem and double the answer” returns later in mental math, in fractions (fourths are halves of halves), and in area problems.',
      'The 4s are also full of real-world anchors, which is what makes them stick: four quarters in a dollar (4 × 25 later), four wheels on a car, four legs on a chair or a dog, four seasons. And the row contains a landmark square — 4 × 4 = 16 — the first perfect square past the trivial ones, worth pointing at on the multiplication chart’s shaded diagonal.',
    ],
    tips: [
      {
        title: 'Two doubles beat one memorization',
        body: 'Practice the chain out loud: “4 × 6 … double 6 is 12 … double 12 is 24.” After a week of deriving, the recall arrives on its own — and the habit of building big facts from small ones transfers to the 6s and 8s.',
      },
      {
        title: 'Legs, wheels, quarters',
        body: 'Pictures carry the 4s: 5 dogs = 5 × 4 = 20 legs; 6 cars = 24 wheels; a dollar = 4 quarters. Ask “what comes in fours?” and let the student generate the facts.',
      },
      {
        title: 'All answers even — mostly ×4 apart',
        body: 'Point out the rhythm: each answer jumps by 4. Cover the reference strip and ask “what is 10 after 36?” Skip counting by 4s is the fallback path when recall stalls mid-table.',
      },
      {
        title: '16 is the square to know',
        body: '4 × 4 = 16 shows up everywhere — fourth grade area problems, 4×4 arrays, later powers of 2. Say it as “four squared” once in a while so the vocabulary arrives early and free.',
      },
    ],
    faqs: [
      {
        q: 'What is the trick for the 4 times table?',
        a: 'Double, then double again: 4 × n is 2 × (2 × n). For 4 × 9, double 9 to 18, double 18 to 36. Students who own their doubles can build any 4s fact in under three seconds.',
      },
      {
        q: 'What are the 4 times tables to 12?',
        a: '4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44 and 48 — 4 × 1 through 4 × 12. All even, each four more than the last.',
      },
      {
        q: 'What grade are the 4s taught in?',
        a: 'Grade 3, usually after the 2s and alongside or just after the 3s. The doubling chain makes the 4s feel like an extension of the 2s rather than new memorization.',
      },
      {
        q: 'How are the 4s and 8s related?',
        a: 'The 8s are the 4s doubled — 8 × n = 2 × (4 × n). Learning the 4s first makes the 8s a one-step build later, which is exactly the order most curricula teach them.',
      },
    ],
  },
  {
    n: 5,
    metaHook: 'the clock, nickels, and 0-or-5',
    lead: 'The 5 times table is 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 — the friendliest table in the book: every answer ends in 0 or 5, the skip count is how Americans already read clock minutes, and half of every answer is the 10s table.',
    introHeading: 'The table you already use every day',
    intro: [
      'Most children can count by 5s before they know what multiplication is, because it is how minutes are read on a clock and how nickels are counted. The 5s table formalizes that existing skill: 5 × 6 is “six nickels” (30¢) and “the minute hand on the 6” (30 minutes past). No other table arrives with this much real-world rehearsal already banked.',
      'The pattern does the rest of the teaching: answers alternate ending in 5 and 0, and each answer is exactly half the matching 10s fact — 5 × 8 = 40 because 10 × 8 = 80. That halving connection is worth saying out loud; it is the student’s first taste of how tables reference each other, a habit that pays off when the 6s and 7s get hard.',
    ],
    tips: [
      {
        title: 'Use the clock face',
        body: 'The minute hand is a 5s skip counter: on the 3 means 15, on the 7 means 35. Practicing “what does the hand say?” converts time-telling drills into 5s fluency for free.',
      },
      {
        title: 'Count nickels, then dimes',
        body: 'Five cents × how many nickels — money is the 5s table with a reason to care. Then set dimes beside them: the dime stack shows why every 5s answer is half the 10s one.',
      },
      {
        title: 'The 0-or-5 self-check',
        body: 'Teach the fastest self-check in all of multiplication: a 5s answer always ends in 5 or 0. It catches finger-slips instantly and gives shaky students a rule to trust while recall firms up.',
      },
      {
        title: 'Half of ten, stated out loud',
        body: '“5 × 7 … the 10s say 70 … half is 35.” Deriving 5s from 10s feels slow at first but installs the tables-reference-each-other habit that later carries the 6s (5s + one more set).',
      },
    ],
    faqs: [
      {
        q: 'What is the pattern of the 5 times table?',
        a: 'Answers alternate between ending in 5 and ending in 0 — 5, 10, 15, 20 — and each answer is half the matching 10s fact: 5 × 6 = 30 because 10 × 6 = 60. Both patterns make the 5s one of the fastest tables to master.',
      },
      {
        q: 'What are the 5 times tables up to 12?',
        a: '5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55 and 60 — from 5 × 1 to 5 × 12. The last one, 5 × 12 = 60, is the number of minutes in an hour, which is a nice anchor to point out.',
      },
      {
        q: 'What grade is the 5 times table for?',
        a: 'Grade 2-3, taught in the first batch alongside the 2s and 10s. Because skip counting by 5 is already familiar from clocks and money, most classrooms reach fluency here in a week or two.',
      },
      {
        q: 'How does the 5s table help with telling time?',
        a: 'The minute hand counts by fives: on the 4 is 20 minutes, on the 9 is 45. A student fluent in the 5s reads any clock to the minute; a student still counting by ones around the face is the one still writing “9:43” at 9:47.',
      },
    ],
  },
  {
    n: 6,
    metaHook: 'five and one more set',
    lead: 'The 6 times table is 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72 — where the easy patterns run out. The strategy that carries it: 6 × n is the 5s fact plus one more set (6 × 7 = 35 + 7 = 42), and every answer is even.',
    introHeading: 'Where the training wheels come off',
    intro: [
      'The 6s sit at the start of the hard tier — 6s, 7s, 8s — where there is no ending-in-0 trick and no finger fold. What saves students is building: 6 × n = 5 × n + n. Five sevens is 35, one more seven is 42. The 5s are solid by now, so every 6s fact is one easy addition away. That is not a workaround; derived facts are how adults do arithmetic, and this table is where the skill gets built.',
      'The 6s also carry more real-world weight than any table past the 5s: half-dozens and egg cartons (6 × 2 = a dozen, 6 × 12 = 72), six-packs, hexagons in nature. And the row holds one of the great landmark facts: 6 × 7 = 42, which combines with 6 × 6 = 36 and 6 × 8 = 48 to form the fact trio teachers probe first when checking fluency.',
    ],
    tips: [
      {
        title: '5s plus one more set',
        body: 'The workhorse: 6 × n = 5 × n + n. Say it as a chant — “five sixes is thirty, one more six is thirty-six.” Students with solid 5s derive the whole table in a day.',
      },
      {
        title: 'Egg cartons are the 6s model',
        body: 'A carton is 2 × 6; half a carton is 6. Baking in dozens means the 6s come with the territory — 6 × 4 = 24 muffins is a real question a kid has actually faced.',
      },
      {
        title: 'Probe the 36-42-48 trio',
        body: '6 × 6, 6 × 7, 6 × 8 are the three facts that separate real fluency from pattern-guessing. Drill them as a set — mixed order, not in sequence — until all three fire instantly.',
      },
      {
        title: 'Even answers, jumping by 6',
        body: 'Skip counting by 6s is the safety net when recall stalls mid-problem. Practice it as “six, twelve, eighteen” on fingers — twelve answers, twelve fingers, one pass through the table.',
      },
    ],
    faqs: [
      {
        q: 'How can I learn my 6 times table easily?',
        a: 'Build it from the 5s: 6 × n is 5 × n plus one more n. For 6 × 8, five eights is 40, one more eight is 48. The 5s are already solid for most students, so every 6s fact is a one-step build.',
      },
      {
        q: 'What are the 6 times tables to 12?',
        a: '6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66 and 72 — 6 × 1 through 6 × 12. All even, each answer six more than the one before.',
      },
      {
        q: 'What grade are the 6s taught in?',
        a: 'Grade 3, in the second wave after the 2s, 5s and 10s. The 6s, 7s and 8s are the memorization core of grade 3, with fluency expected by the end of grade 4.',
      },
      {
        q: 'Why do eggs come in 6s and 12s?',
        a: 'Old English units: a dozen is 12, a half-dozen is 6. It makes egg cartons a ready-made 6s teaching model — one carton 2 × 6, a flat of six cartons 6 × 12 = 72 eggs.',
      },
    ],
  },
  {
    n: 7,
    metaHook: 'the hardest table and 7×8=56',
    lead: 'The 7 times table is 7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84 — famous as the hardest row in the chart, because sevens offer no pattern at all. The fixes: build from 5s + 2s, drill 7×7=49 and 7×8=56 as landmarks, and lean on 7×8 = 56, the “5 6 7 8” fact.',
    introHeading: 'The table with no pattern — by design',
    intro: [
      'Ask any adult which times table they never quite learned and the answer is the 7s. Sevens are prime, so nothing in the row repeats a friendlier table, skip counting by 7s has no rhythm a child has ever heard, and the answers (21, 28, 35…) do not end in anything predictable. The honest teaching move is to name that out loud: this table is hard for everyone, it is hard for a mathematical reason, and the way through is building facts, not hoping a pattern appears.',
      'Two builds carry the row. First, 7 × n = 5 × n + 2 × n (five sevens plus two sevens: 35 + 14 = 49). Second, the landmark facts: 7 × 7 = 49 (a perfect square, worth owning cold) and 7 × 8 = 56, the single most-missed multiplication fact in America — and the one with the best mnemonic, because the answer reads the counting line: 56 = 7 × 8, five-six-seven-eight. Students who own those two plus the build can reach every fact in the row inside three seconds.',
    ],
    tips: [
      {
        title: 'Five-and-two build',
        body: '7 × n = 5 × n + 2 × n. Both smaller tables are already fluent by the time 7s arrive. Practice narrating it: “7 × 6 … 30 plus 12 … 42.” The narration is temporary; the recall it produces is permanent.',
      },
      {
        title: 'Own 49 and 56 cold',
        body: '7 × 7 = 49 and 7 × 8 = 56 are the two facts to over-drill. 56 = 7 × 8 is the “five, six, seven, eight” fact — the answer and the question read as one counting string, the best free mnemonic in multiplication.',
      },
      {
        title: 'Neighbors from the square',
        body: 'Once 7 × 7 = 49 is solid, the facts beside it are one step away: 7 × 8 is one more seven (56), 7 × 6 is one less (42). Anchor facts pay rent in every direction.',
      },
      {
        title: 'Seven days a week',
        body: 'Weeks are the 7s anchor: 2 weeks = 14 days, 10 weeks = 70 days. “How many days until the field trip, 5 weeks out?” is a 7s question children genuinely want answered.',
      },
    ],
    faqs: [
      {
        q: 'Why is the 7 times table so hard?',
        a: 'Because 7 is prime and awkwardly sized: no 7s answer ends in a predictable digit, skip counting by 7s has no familiar rhythm, and the row does not repeat any easier table. Every other hard row (6s, 8s) can be built from doubles; the 7s mostly cannot, which is why they need strategies and landmark facts.',
      },
      {
        q: 'What are the 7 times tables up to 12?',
        a: '7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77 and 84 — from 7 × 1 to 7 × 12.',
      },
      {
        q: 'What is the 7×8 mnemonic?',
        a: '56 = 7 × 8 — read the digits in order: five, six, seven, eight. It is the most reliable trick in the times tables and covers the single most-missed fact in US classrooms.',
      },
      {
        q: 'What grade are the 7s taught in?',
        a: 'Grade 3, typically last of the core tables alongside the 8s, after every table that can build them (2s, 5s, 10s, then 3s, 4s, 6s) is in place. Fluency with 7s is the standard marker for grade-4 readiness in multiplication.',
      },
    ],
  },
  {
    n: 8,
    metaHook: 'double the 4s',
    lead: 'The 8 times table is 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96 — the doubles of the 4s: 8 × n = 2 × (4 × n). Double seven to 28, double again to 56. Students with solid 4s already own this table; they just have not noticed yet.',
    introHeading: 'One doubling away from the 4s',
    intro: [
      'The 8s look like the second-hardest row and are secretly one of the easier builds: every 8s fact is a 4s fact doubled. 8 × 6 = 48 because 4 × 6 = 24. The full chain — 2s to 4s to 8s — is three doublings, and it is worth drawing as a family portrait: 7, 14, 28, 56 down one line. Kids who see that ladder stop fearing the “big” tables, because big is just small doubled.',
      'The 8s also hold two landmark facts. 8 × 8 = 64 is a perfect square with cultural range — the chessboard, the squares on a checkerboard, “sixty-four” in music — and 8 × 7 = 56 shares the five-six-seven-eight mnemonic with the 7s. Between the doubling chain and those two anchors, the row is fully covered before any cold memorization starts.',
    ],
    tips: [
      {
        title: 'Double the 4s',
        body: 'The whole table in one rule: 8 × n = double (4 × n). Practice down the ladder — 6, 12, 24, 48 — so the doubling chain itself becomes automatic, not just the 8s answers.',
      },
      {
        title: '64 is a landmark square',
        body: '8 × 8 = 64: chessboard, checkerboard, squares in a pantry of 8×8 grids. Own it cold; it anchors 8 × 7 (56) and 8 × 9 (72) as one-step neighbors.',
      },
      {
        title: 'Spider legs and octopuses',
        body: 'Eight is the animal number: spider legs, octopus arms. “Five spiders have how many legs?” gives the 8s a picture the bare facts never provide — and second graders volunteer to draw the model.',
      },
      {
        title: 'Watch the 6s/8s cross-wiring',
        body: 'Under pressure, 8 × 6 and 8 × 7 swap with 6 × 8 and 7 × 8 — same facts, but students often answer 48 vs 54 vs 56 inconsistently. Drill the 48-54-56 cluster as a set until each has its own instant answer.',
      },
    ],
    faqs: [
      {
        q: 'What is the trick for the 8 times table?',
        a: 'Double the 4s: 8 × n = 2 × (4 × n). For 8 × 9, four nines is 36, doubled is 72. The 2-4-8 doubling family covers three tables with one skill.',
      },
      {
        q: 'What are the 8 times tables to 12?',
        a: '8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88 and 96 — 8 × 1 through 8 × 12. All even, each answer eight more than the last.',
      },
      {
        q: 'What grade are the 8s taught in?',
        a: 'Grade 3, alongside the 7s in the last wave of tables. Because the 8s reduce to doubling the 4s, they usually fall faster than the 7s despite looking scarier.',
      },
      {
        q: 'What is 8×8 and why does it matter?',
        a: '8 × 8 = 64, a perfect square. It is the size of a chessboard and shows up constantly in grids and arrays from grade 3 on. With 8 × 7 = 56 beside it, the two facts anchor the top of the 8s row.',
      },
    ],
  },
  {
    n: 9,
    metaHook: 'finger trick and the digit-sum rule',
    lead: 'The 9 times table is 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 108 — the hard table that turns easy: fold a finger and the answer appears, and every answer’s digits add up to 9. 9 × n is also just 10 × n minus n.',
    introHeading: 'The easiest hard table',
    intro: [
      'The 9s wear two tricks that actually work. First, the finger fold: hold up ten fingers, fold the nth one for 9 × n — fingers to the left of the fold are the tens digit, fingers to the right are the ones. Fold your 7th finger for 9 × 7: six fingers, three fingers, 63. Second, the digit check: every multiple of 9 up to 90 has digits summing to 9 (18 → 9, 27 → 9, 99 → 18 → 9), which makes wrong answers self-announcing.',
      'Under the tricks sits the idea worth keeping: 9 × n = 10 × n − n. Nine nines is ten nines, one nine fewer — 90 − 9 = 81. That “one group less than a round number” build generalizes far beyond the 9s (it is how adults compute 19 × 7), so teach it alongside the finger trick: the fingers are the shortcut, the ten-minus-one is the understanding.',
    ],
    tips: [
      {
        title: 'The finger fold, taught once',
        body: 'Ten fingers up, fold the nth finger for 9 × n. Left of the fold = tens, right = ones. It looks like a magic trick to third graders, works for the whole row through 9 × 10, and buys confidence while real recall builds.',
      },
      {
        title: 'Ten minus one set',
        body: '9 × n = 10 × n − n. “Nine fours … forty, minus four … thirty-six.” This is the understanding under the trick, and it is the same move as computing 19 × 7 as 140 − 7 years later.',
      },
      {
        title: 'Digits sum to nine',
        body: 'The self-check: 9, 18, 27, 36 … every answer’s digits add to 9 (or 18 for 99). Students can verify their own answers with zero external key, which is worth more than the checking itself.',
      },
      {
        title: 'The descending-ascending pattern',
        body: 'Write the row downward: the tens go 0,1,2,3…9 while the ones go 9,8,7…0. Kids spot this within a minute of looking at the chart and it locks the sequence visually — let them discover it rather than showing them.',
      },
    ],
    faqs: [
      {
        q: 'How does the 9 times table finger trick work?',
        a: 'Hold up all ten fingers and fold the nth finger for 9 × n. Fingers still up to the LEFT of the fold are the tens digit; to the RIGHT are the ones. For 9 × 7, fold your seventh finger: six fingers left, three right — 63. It works through 9 × 10.',
      },
      {
        q: 'What are the 9 times tables up to 12?',
        a: '9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99 and 108 — 9 × 1 through 9 × 12. The first ten answers all have digits summing to 9; 9 × 11 = 99 sums to 18; 9 × 12 = 108 sums to 9 again.',
      },
      {
        q: 'Why do 9s answers always add up to 9?',
        a: 'Because 9 is one less than 10: every time the tens digit goes up by 1, the ones digit drops by 1, so their sum never changes. Formally, every multiple of 9 has a digit sum divisible by 9 — the same rule used to check divisibility by 9 and by 3.',
      },
      {
        q: 'What grade are the 9s taught in?',
        a: 'Grade 3, after the 2s through 5s. The finger trick and digit patterns mean the 9s usually fall faster than the 6s, 7s and 8s despite being “bigger” facts.',
      },
    ],
  },
  {
    n: 10,
    metaHook: 'the place-value shift',
    lead: 'The 10 times table is 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120 — one fact per line, and the fact is place value itself: 10 × n is n with a zero after it. No drill required; this table is an idea, and the idea is how our number system works.',
    introHeading: 'The table that teaches place value',
    intro: [
      'Multiplying by 10 does not add anything — it moves the number one place left and parks a zero in the old seat. That is the place-value shift, the single most important structural idea in elementary arithmetic, and the 10s table is where it becomes visible: 10 × 4 shifts the 4 into the tens place and writes 40. Students who see the shift here meet decimals years later with far less panic, because “moving by tens” is already an old friend.',
      'The 10s also anchor estimation and mental math for life: if you know 10 × 7 is 70, then 9 × 7 is one seven less (63), 20 × 7 is two of them (140), and 15 × 7 is halfway between (105). Almost every friendly-number strategy in later grades is built on 10s facts. That is why this table, which never needs a drill session, still deserves its own page.',
    ],
    tips: [
      {
        title: 'Say it as a shift, not a rule',
        body: '“The zero is not added — the digits move.” Write 10 × 4 with the 4 in a place-value chart and slide it one column left. The sentence costs thirty seconds and prevents years of “just add a zero” confusion when decimals arrive.',
      },
      {
        title: 'Dimes and dollars',
        body: 'Ten dimes is a dollar, ten tens is a hundred. Money makes the 10s concrete: 10 × 6 = 60 dimes = $6.00 in dimes. The shift and the currency land together.',
      },
      {
        title: 'Estimate with 10s first',
        body: 'Train the habit: for 8 × 43, think “10 × 43 is 430, so 8 × 43 is a bit under 400.” Estimation built on 10s is the skill state tests actually probe in grades 4-6.',
      },
      {
        title: 'The launchpad for other tables',
        body: 'Use 10 × n as the reference point for 9 × n (one less set) and 5 × n (half). Every table past the 5s is faster to learn when the 10s are instant — which they already are.',
      },
    ],
    faqs: [
      {
        q: 'Why does multiplying by 10 add a zero?',
        a: 'It does not add anything — the digits shift one place to the left and a zero holds the empty seat. 10 × 4 moves the 4 from the ones place to the tens place: 40. Saying “shift,” not “add a zero,” keeps decimals from becoming a mystery later (10 × 0.5 is 5, not 0.50).',
      },
      {
        q: 'What are the 10 times tables to 12?',
        a: '10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110 and 120 — 10 × 1 through 10 × 12. Past 100, the pattern keeps going without changing, which is exactly the point.',
      },
      {
        q: 'Do students need to drill the 10s?',
        a: 'Almost never — the pattern is the answer. What deserves practice is using the 10s: halving them for 5s, stepping down one set for 9s, doubling for 20s. Those moves are real math and do need reps.',
      },
      {
        q: 'What grade is the 10 times table for?',
        a: 'Grade 2-3, first among tables taught, right with the 2s and 5s. It doubles as early place-value instruction, which is why teachers spend more time talking about it than drilling it.',
      },
    ],
  },
  {
    n: 11,
    metaHook: 'the repeat-the-digit table',
    lead: 'The 11 times table is 11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121, 132 — through 9 it is the digit repeated (11 × 4 = 44), which makes it the confidence table students meet right after the 10s. 11 × 11 = 121 lands a palindrome.',
    introHeading: 'The confidence table',
    intro: [
      'Through 11 × 9, the rule is irresistible: repeat the digit. 11 × 7 = 77, no thinking required. That makes the 11s the best fluency-builder in the chart — students who have struggled with the 6s and 7s get a whole table where the answers arrive instantly, and the feeling of “I know all of these” is worth more pedagogically than the facts themselves. Confidence is an input to memorization, not a byproduct.',
      'The pattern breaks exactly twice, and both breaks are gifts. 11 × 10 = 110 follows the 10s rule (one shift), and 11 × 11 = 121 is a palindrome — read it forward or backward — plus a perfect square, the square of eleven. 11 × 12 = 132 is the one fact in the row that genuinely needs a look: build it as 10 × 12 plus 1 × 12 (120 + 12). Pointing at where patterns break, and why, is how students learn that patterns are observations, not laws.',
    ],
    tips: [
      {
        title: 'The repeat rule, then its edge',
        body: 'Teach the repeat through 99, then deliberately break it: “What about 11 × 10? Why does the pattern stop?” The moment of noticing a pattern fail teaches more about number structure than ten worksheets of drills.',
      },
      {
        title: '121 is a palindrome',
        body: '11 × 11 = 121 reads the same both directions — and it is 11 squared. Palindromic squares are rare (11 × 11 and 22 × 22 = 484 are the famous small ones); students who catch this collect it like a trading card.',
      },
      {
        title: 'Build 11×12 honestly',
        body: 'The one row-fact without a free pattern: 11 × 12 = 10 × 12 + 1 × 12 = 132. Practice the build — it is the same “friendly number plus adjustment” move as 21 × 4 later on.',
      },
      {
        title: 'Use it to repair the 7s and 8s',
        body: 'Because 11 × n is quick, ask for 11 × 7 (77) right before 7 × 7 (49) — the instant fact primes the hard one. Interleaving easy and hard rows is a standard fluency technique, and the 11s are the easiest row you own.',
      },
    ],
    faqs: [
      {
        q: 'What is the trick for the 11 times table?',
        a: 'Through 11 × 9, repeat the digit: 11 × 4 = 44, 11 × 8 = 88. After that, build from 10s: 11 × 12 = 120 + 12 = 132. (For two-digit numbers beyond the table there is also the “split the digits” trick — 11 × 23 = 2_3 with 2+3 in the gap — but the times-table row itself needs only the repeat.)',
      },
      {
        q: 'What are the 11 times tables up to 12?',
        a: '11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121 and 132 — 11 × 1 through 11 × 12.',
      },
      {
        q: 'Why is 11 × 11 special?',
        a: '121 is both a perfect square (11²) and a palindrome — it reads the same forward and backward. Squares that are palindromes are rare, which makes this the collectible fact of the row.',
      },
      {
        q: 'What grade are the 11s taught in?',
        a: 'Grade 3-4, after the core tables. The repeat rule makes them a fast win and a natural confidence reset after the 6s-8s grind; the 12s follow as the last table.',
      },
    ],
  },
  {
    n: 12,
    metaHook: 'dozens, 10-plus-2, and the 144 finish line',
    lead: 'The 12 times table is 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144 — the last row in US fluency standards and the one grown-ups actually use: dozens of eggs, inches in a foot, months in a year. Build every fact as 10 × n + 2 × n; 12 × 12 = 144 is the finish line.',
    introHeading: 'The top of the chart, and the most useful one',
    intro: [
      'American life runs on twelves: 12 months, 12 inches in a foot, 12 in a dozen, 12 hours on the clock. That makes the 12s the table adults unconsciously use most, and the one with the richest anchors for kids. It is also the last row in the standard US fluency expectation (through 12 × 12), so 12 × 12 = 144 — a gross, and a perfect square — is literally the finish line of multiplication memorization.',
      'No one drills the 12s cold; the build is too good: 12 × n = 10 × n + 2 × n. Twelve fours is ten fours plus two fours, 40 + 8 = 48. Both parts are instant by the time the 12s arrive, and this “split into friendly parts” strategy is the single most transferable skill in the whole times-table sequence — it is exactly how people multiply by 21, 15 or 45 in real life. The 12s are where multiplication stops being memorization and becomes arithmetic.',
    ],
    tips: [
      {
        title: 'Ten-and-two build',
        body: '12 × n = 10 × n + 2 × n. Narrate it until the narration is unnecessary: “12 × 7 … 70 plus 14 … 84.” This build is the graduation skill of the entire times-table sequence.',
      },
      {
        title: 'Dozens, inches, months',
        body: 'The 12s have the best anchors in arithmetic: a dozen eggs (12 × 2 = 24 in a half-flat), a foot (12 × 5 = 60 inches in 5 feet), a year (12 × 4 = 48 months). Ask which anchor each student prefers — the fact sticks to the anchor.',
      },
      {
        title: '144 is the diploma',
        body: '12 × 12 = 144 closes the chart. It is also “a gross” — an old counting word for 144 that kids find hilarious and never forget. A perfect square AND the finish line: celebrate it.',
      },
      {
        title: 'Telling time runs on 12s',
        body: 'Hours on a clock face: 12 × 2 = 24 hours in a day. Half the schedule math children do — “how many hours in 3 days?” — is a 12s fact wearing a costume.',
      },
    ],
    faqs: [
      {
        q: 'What is the trick for the 12 times table?',
        a: 'Split it: 12 × n = 10 × n + 2 × n. For 12 × 8: ten eights is 80, two eights is 16, total 96. Both pieces are instant by the time the 12s arrive, so the row falls faster than the 7s despite being “bigger.”',
      },
      {
        q: 'What are the 12 times tables up to 12?',
        a: '12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132 and 144 — 12 × 1 through 12 × 12. All even, each answer twelve more than the last.',
      },
      {
        q: 'Why do the times tables stop at 12?',
        a: 'Tradition plus utility: 12 divides evenly by 2, 3, 4 and 6, which made dozens the currency of commerce for centuries, and US customary units (inches per foot, months per year, hours per day) still run on 12. Modern fluency standards say 10 × 10; the 11s and 12s remain the customary ceiling in American classrooms.',
      },
      {
        q: 'Why is 144 called a gross?',
        a: 'A gross is 144 — a dozen dozen. It is a real old trade quantity (buttons, pencils, screws still sell by the gross), and it doubles as 12², a perfect square. Two facts in one word.',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Computed content — the numbers can never drift from the math        */
/* ------------------------------------------------------------------ */

const facts = (n: number) => Array.from({ length: 12 }, (_, i) => (i + 1) * n);
const skipSentence = (n: number) => facts(n).join(', ');

export interface TimesTableDef extends PageDef {
  n: number;
}

export const timesTablePages: TimesTableDef[] = SEEDS.map((s) => {
  const prev = s.n > 1 ? s.n - 1 : null;
  const next = s.n < 12 ? s.n + 1 : null;
  return {
    n: s.n,
    slug: `times-table-${s.n}`,
    path: `/times-table/${s.n}`,
    hub: 'charts' as const,
    h1: `${s.n} Times Table`,
    metaTitle: `${s.n} Times Table — Free Printable Chart & Practice | ChartGlade`,
    metaDescription: `Free printable ${s.n} times table: the full ${s.n}×1 to ${s.n}×12 chart on one letter page — ${s.metaHook}.`,
    lead: s.lead,
    introHeading: s.introHeading,
    intro: s.intro,
    extraSection: {
      heading: `Skip counting by ${s.n}`,
      paras: [
        `Skip counting is the fallback path when a fact will not come: ${skipSentence(s.n)}. Counting by ${s.n}s IS the ${s.n} times table — each step is one more group of ${s.n} — so thirty seconds of rhythmic counting a day quietly drills the whole row.`,
        `Use it as a self-check too: any answer to a ${s.n}s fact has to land somewhere in that list. A student who writes ${s.n} × 6 = ${facts(s.n)[5]! + 1} can catch it without an answer key, because ${facts(s.n)[5]! + 1} is not on the skip-count path.`,
      ],
    },
    printNote: 'One letter page, portrait: the filled facts on top, the same facts blank for practice below.',
    tips: s.tips,
    faqs: [
      {
        q: `What is the ${s.n} times table?`,
        a: `The ${s.n} times table is ${s.n} × 1 through ${s.n} × 12: ${skipSentence(s.n)}.`,
      },
      ...s.faqs,
    ],
    related: [
      { href: '/multiplication-chart/', label: 'Multiplication chart 1-12 (the full grid)' },
      { href: '/times-table/', label: 'All times tables 1-12' },
      ...(prev ? [{ href: `/times-table/${prev}/`, label: `${prev} times table` }] : []),
      ...(next ? [{ href: `/times-table/${next}/`, label: `${next} times table` }] : []),
      { href: '/multiplication-chart-blank/', label: 'Blank multiplication chart (practice grid)' },
    ],
  };
});
