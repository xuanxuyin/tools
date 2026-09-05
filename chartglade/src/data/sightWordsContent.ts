import type { PageDef } from './pageTypes';

/**
 * Sight words ladder (5 pages). Kindergarten is the pillar (12.1K US, highest
 * CPC of the whole K-5 pool at $1.50 — teacher audience). Lists render from
 * lib/sightWords.ts; this file holds only the hand-written facts layer.
 */

export const sightWordPages: PageDef[] = [
  {
    slug: 'preschool-sight-words',
    hub: 'sight-words',
    h1: 'Preschool Sight Words',
    metaTitle: 'Preschool Sight Words (Pre-Primer List, Printable) | ChartGlade',
    metaDescription:
      'The 40 Dolch pre-primer sight words for preschool, in printable word cards — plus how to teach them at ages 3-5 without worksheets.',
    lead:
      'The preschool list is the 40 Dolch pre-primer words — a, and, away, big, blue and friends. Print the cards, read the notes, and keep sessions shorter than a cartoon. Below the cards: what "sight word" even means at this age, and the two-word-at-a-time rule.',
    introHeading: 'What a sight word is at age four',
    intro: [
      'A sight word is one a child learns to recognize on sight, without sounding it out. At the preschool level the label is a little generous — most of these 40 words (the Dolch pre-primer list, compiled in the 1930s from the children\'s books of the era) are being learned as spoken vocabulary first. That is exactly right: a four-year-old who can point to "the" on the page when you say it is doing pre-reading, and that is the entire goal.',
      'The two words that matter most come first on every list: a and the. They are also the two children see most on every page of every picture book ever read to them, which is the quiet engine of this whole list — these are the highest-frequency words in children\'s English, and exposure is already doing half the teaching. Your job is to make the seeing deliberate: a word on the fridge, a word in the book, a word pointed at.',
    ],
    printNote: 'Word cards print on one letter page, portrait. Card outlines in black.',
    tips: [
      {
        title: 'Two new words at a time, maximum',
        body: 'Introduce two cards, keep them in play for days, and only add more once both are named instantly. A preschooler with 6 fresh flashcards has zero flashcards.',
      },
      {
        title: 'Hunt the word in real books',
        body: 'After a card is known, hunt it during bedtime reading — "can you find \'the\' on this page?" Finding a word inside a story is worth ten drills on a card.',
      },
      {
        title: 'Keep sessions under five minutes',
        body: 'Attention at 3-5 is a match, not a candle. One quick pass through the known cards, one new word, done. Twice a day beats one long sit every time.',
      },
      {
        title: 'Say it, don\'t spell it',
        body: 'These words are learned as whole shapes and sounds, not letter-by-letter. If your child can spell "away" but can\'t read it in a sentence, the drill has drifted.',
      },
    ],
    faqs: [
      {
        q: 'How many sight words should a preschooler know?',
        a: 'There is no requirement — but a child heading into kindergarten who knows 10-20 of these 40 words (especially a, the, and, I, it, is) is comfortably set up. Some pre-K programs teach the full pre-primer list; many teach none, and both are normal.',
      },
      {
        q: 'What is the Dolch pre-primer list?',
        a: 'The 40 highest-frequency words from the children\'s books Edward Dolch analyzed in the 1930s, sorted by difficulty level. Pre-primer is the first of five levels, followed by primer (kindergarten) and grades 1-3.',
      },
      {
        q: 'Should preschoolers learn letters or sight words first?',
        a: 'Letters, hands down — most of both names and sounds first. Sight words ride on top of letter knowledge; a child who can\'t tell b from d is memorizing shapes, not reading. A handful of the pre-primer words can come along the way.',
      },
      {
        q: 'Can I print these as flashcards?',
        a: 'Yes — the cards above print six to a row with the word in large lowercase type. Cut along the lines, and they are the right size for small hands and fridge doors.',
      },
    ],
    related: [
      { href: '/kindergarten-sight-words/', label: 'Kindergarten sight words (the primer 52)' },
      { href: '/alphabet-chart/', label: 'Alphabet chart (letter knowledge first)' },
      { href: '/sight-words/', label: 'All sight word lists by grade' },
    ],
  },

  {
    slug: 'kindergarten-sight-words',
    hub: 'sight-words',
    h1: 'Kindergarten Sight Words',
    metaTitle: 'Kindergarten Sight Words (Primer List + Printable Cards) | ChartGlade',
    metaDescription:
      'The 52 Dolch primer sight words for kindergarten in printable cards, with the Dolch vs Fry difference explained and how teachers build fluency.',
    lead:
      'Kindergarten is where sight words get serious: 52 Dolch primer words — he, she, that, with, said — that carry most of the words on a guided-reading page. Print the cards, then read how the list works with (not instead of) phonics, and which list your school actually uses.',
    introHeading: 'Why these 52 words get their own list',
    intro: [
      'The Dolch primer list is 52 words that appear relentlessly in kindergarten-level text while refusing to follow the phonics rules being taught at the same time. "Said" is not spelled the way it sounds. "One" and "was" are spelling crimes. "They" defies the (long-a) pattern a kindergartner just mastered. Teachers call them high-frequency irregular words; the practical translation is: these are memorized by sight because sounding them out fails.',
      'That is why sight words and phonics are teammates, not rivals. Decodable words get sounded out; these 52 get recognized — and together they cover the overwhelming majority of words in a kindergarten reader. By the end of the year, the usual benchmark is the pre-primer 40 plus the primer 52 (92 words), read instantly in connected text: not on a flashcard, but inside a sentence.',
    ],
    printNote: '52 cards across one letter page, portrait. Black outlines.',
    tips: [
      {
        title: 'Read them in phrases, not one by one',
        body: '"she said" · "we can" · "they went" — two-word phrases are the bridge from card to sentence. A child who knows 52 words cold but stumbles in sentences has practiced cards, not reading.',
      },
      {
        title: 'New words in isolation first, context second',
        body: 'Meet a word on a card, then find it in three real sentences that day. Isolation builds the recognition; context makes it stick and transfer.',
      },
      {
        title: 'A few seconds per word is the bar',
        body: '"Instant" means about three seconds or less. Longer than that and the child is decoding or guessing — back to the card, and no penalty, guessing is a strategy we taught them for everything else.',
      },
      {
        title: 'Match the school\'s list, whatever it is',
        body: 'Some districts send home Fry first-100 instead of Dolch. Do not run both — they overlap almost completely at this level. Whatever the folder says is the right list.',
      },
    ],
    faqs: [
      {
        q: 'How many sight words should a kindergartner know?',
        a: 'The common year-end benchmark is the 92 words of the Dolch pre-primer and primer lists (or the first 50-100 Fry words), recognized instantly in connected text — not just on flashcards. 20-40 words mid-year is a typical checkpoint.',
      },
      {
        q: 'What is the difference between Dolch and Fry sight words?',
        a: 'Dolch (1936) is 220 words from children\'s books of the era, split into five levels; Fry (1990s) is 1,000 words from a broader corpus, split into ten lists of 100. They overlap heavily at the early levels — roughly nine of ten kindergarten words appear on both — so either list works; match whichever your school sends home.',
      },
      {
        q: 'Why are they called sight words?',
        a: 'Because they are recognized at first sight rather than sounded out. Many (said, one, was, they) are phonically irregular, and all of them are so frequent that instant recognition is faster than decoding — that speed is the entire point.',
      },
      {
        q: 'Should sight words replace phonics?',
        a: 'No — they cover different words. Phonics handles the decodable majority of English; sight words cover the frequent, irregular minority that decoding fails on. Kindergarten runs both tracks in parallel.',
      },
      {
        q: 'Can I print the kindergarten list as flashcards?',
        a: 'Yes — the 52 primer words above print as cards on one letter page, large lowercase type, no sign-up. Cut and go.',
      },
    ],
    related: [
      { href: '/first-grade-sight-words/', label: 'First grade sight words (the next 41)' },
      { href: '/preschool-sight-words/', label: 'Preschool sight words (the pre-primer 40)' },
      { href: '/number-line-printable/', label: 'Number line 0-20 (math side of kindergarten)' },
      { href: '/sight-words/', label: 'All sight word lists by grade' },
    ],
  },

  {
    slug: 'first-grade-sight-words',
    hub: 'sight-words',
    h1: 'First Grade Sight Words',
    metaTitle: 'First Grade Sight Words (Dolch 41 Words, Printable) | ChartGlade',
    metaDescription:
      'The 41 Dolch first grade sight words in printable cards, with how first grade shifts from learning words to reading them in real books.',
    lead:
      'First grade adds 41 words — after, again, could, every, know — to the 92 from preschool and kindergarten, for 133 total. This is the year the words have to leave the flashcards and live inside chapter books. Print the cards; the notes cover the move.',
    introHeading: 'The year it becomes reading',
    intro: [
      'First grade is when sight word knowledge stops being a subject and becomes infrastructure. The 41 words on this list (the Dolch first-grade level) are the connective tissue of early chapter books: after, again, could, from, know, let, live, put, take, think, when. A first grader who owns the running total — 133 words from pre-primer through first grade — reads a typical guided-reading page with enough automaticity left over to pay attention to what the sentence means. That attention is the whole prize.',
      'These words also start behaving differently. Several are pure grammar glue (an, any, as, by, of, then) that children have been saying since age two but have never once had to look at. The useful trick is contrast: then/them, as/ask, of/off. Pairs like those are where a first grader\'s eyes prove whether they are reading the whole word or its first letter.',
    ],
    printNote: '41 cards on one letter page, portrait.',
    tips: [
      {
        title: 'Contrast pairs are the best drill',
        body: 'then/them, as/ask, of/off, when/went — shuffle the pairs together. Discriminating between lookalikes is the skill; single cards alone can\'t test it.',
      },
      {
        title: 'Retire words into a sentence jar',
        body: 'Once a word is instant, move its card into a jar and pull two at a time for silly-sentence warm-ups ("The cat could know..."). Retrieval inside sentences is the maintenance plan.',
      },
      {
        title: 'Track the running total',
        body: '133 by year-end (pre-primer through first). Kids keep momentum when the number is visible — a paper chain with one link per word outgrows the room exactly on schedule.',
      },
      {
        title: 'Watch for word-guessing',
        body: 'First graders guess from first letters — that\'s smart, and it fails on this exact list. If "then" is read as "the," the word is a sight word again until it isn\'t.',
      },
    ],
    faqs: [
      {
        q: 'How many sight words should a first grader know?',
        a: 'The Dolch running total through first grade is 133 words (40 pre-primer + 52 primer + 41 first grade), read instantly in connected text by year-end. Mid-year benchmarks usually sit around 100.',
      },
      {
        q: 'What are the first grade Dolch words?',
        a: 'The 41 words on this sheet: after, again, an, any, as, ask, by, could, every, fly, from, give, going, had, has, her, him, his, how, just, know, let, live, may, of, old, once, open, over, put, round, some, stop, take, thank, them, then, think, walk, were, when.',
      },
      {
        q: 'What if my child is behind on sight words?',
        a: 'Shrink the pile — practice the five least-known words only until each is instant, then rotate. Behind is almost always "too many new words at once," and the fix is fewer words, more often, in sentences rather than on cards.',
      },
      {
        q: 'Do first graders still sound out sight words?',
        a: 'No — sounding out is for decodable words. Sight words are the ones decoding fails on; by first grade each one should be recognized in about three seconds or less, in context, every time.',
      },
    ],
    related: [
      { href: '/second-grade-sight-words/', label: 'Second grade sight words' },
      { href: '/kindergarten-sight-words/', label: 'Kindergarten sight words' },
      { href: '/addition-chart/', label: 'Addition chart (math side of first grade)' },
      { href: '/sight-words/', label: 'All sight word lists by grade' },
    ],
  },

  {
    slug: 'second-grade-sight-words',
    hub: 'sight-words',
    h1: 'Second Grade Sight Words',
    metaTitle: 'Second Grade Sight Words (Dolch 46 Words, Printable) | ChartGlade',
    metaDescription:
      'The 46 Dolch second grade sight words in printable cards — always, because, been — plus fluency practice that goes beyond word calling.',
    lead:
      'Second grade adds 46 words — always, because, been, before, both — bringing the Dolch total to 179. They are longer, less concrete, and appear constantly in chapter-book sentences. Print the cards; the notes cover fluency work that actually changes reading.',
    introHeading: 'Longer words, less forgiving text',
    intro: [
      'The second-grade Dolch list is where the words stop being picturable. A first grader can draw "jump"; nobody can draw "because." These 46 words — always, around, because, been, before, best, both, buy, call, does, fast, first, found, gave, goes, green, its, made, many, off, or, pull, read, right, sing, sit, sleep, tell, their, these, those, upon, us, use, very, wash, which, why, wish, work, would, write, your — are the abstract machinery of sentences, and chapter books lean on them page after page.',
      'Second grade is also when fluency practice changes shape. The words are mostly known; the work is speed and rhythm. Repeated reading of the same short passage — three passes, each faster than the last — does more for a second grader\'s reading than any new word list, because it converts known words into automatic ones. The card pile shrinks in importance; the stopwatch takes over.',
    ],
    printNote: '46 cards on one letter page, portrait.',
    tips: [
      {
        title: 'Three-pass repeated reading',
        body: 'One short passage, three reads, each aiming to beat the last. Known words become fast words on the second and third pass — that conversion is the entire goal of this year.',
      },
      {
        title: 'The contractions on this list are free wins',
        body: '"don\'t" is on the list because "do not" is two known words with an apostrophe job. Point at the missing letters once and the word is permanently owned.',
      },
      {
        title: 'Their/there/they\'re starts here',
        body: '"Their" is on this list; the homophone storm arrives now. Teach the triple as a set with a sentence anchor for each ("their dog, over there, they\'re home").',
      },
      {
        title: 'Because is a spelling project',
        body: 'Big, useful, misspelled forever. The classic fix: "Big Elephants Can Always Understand Small Elephants." One mnemonic retires the problem.',
      },
    ],
    faqs: [
      {
        q: 'How many sight words should a second grader know?',
        a: 'The Dolch running total through second grade is 179 words (pre-primer through the 46 on this list). At this point the emphasis shifts from adding words to reading known words fluently in connected text.',
      },
      {
        q: 'What are the second grade Dolch words?',
        a: 'The 46 words printed above, from always and around through would, write and your — the fourth of the five Dolch levels.',
      },
      {
        q: 'What comes after the Dolch lists?',
        a: 'Third grade finishes Dolch at 220 words; from there, vocabulary work moves to the Fry lists (second and third hundred), word parts (prefixes and suffixes like un- and -ing), and content-area words from science and social studies texts.',
      },
    ],
    related: [
      { href: '/third-grade-sight-words/', label: 'Third grade sight words (Dolch finale)' },
      { href: '/first-grade-sight-words/', label: 'First grade sight words' },
      { href: '/multiplication-chart/', label: 'Multiplication chart (math side of second grade)' },
      { href: '/sight-words/', label: 'All sight word lists by grade' },
    ],
  },

  {
    slug: 'third-grade-sight-words',
    hub: 'sight-words',
    h1: 'Third Grade Sight Words',
    metaTitle: 'Third Grade Sight Words (Dolch 41 Words, Printable) | ChartGlade',
    metaDescription:
      'The 41 Dolch third grade sight words — about, better, carry, laugh — that finish the 220-word Dolch list, in printable cards.',
    lead:
      'The last Dolch level: 41 words — about, better, bring, carry, laugh, light, together — that complete the full 220. After this, sight word work ends and word-part work begins. Print the cards; the notes cover the handoff.',
    introHeading: 'The end of one list, the start of another kind',
    intro: [
      'The third-grade Dolch words — about, better, bring, carry, clean, cut, done, draw, drink, eight, fall, far, full, got, grow, hold, hot, hurt, if, keep, kind, laugh, light, long, much, myself, never, only, own, pick, seven, shall, show, six, small, start, ten, today, together, try, warm — are noticeably more word-like than the primer list. Most are one and two syllables with regular spellings; several (draw, pick, hot, ten) are frankly decodable. That is not a flaw: by third grade, the strategy is morphing from memorize-the-word to read-the-word-parts, and these words are the transition material.',
      'Finishing all 220 Dolch words closes the early-reading chapter. What replaces the list is bigger and never ends: multi-syllable decoding, prefixes and suffixes, and the content vocabulary of science and social studies, where third graders officially cross from learning-to-read to reading-to-learn. If a third grader still has holes in the earlier lists, close those first — the 220 are load-bearing.',
    ],
    printNote: '41 cards on one letter page, portrait.',
    tips: [
      {
        title: 'Sort by syllables, not alphabet',
        body: 'Third grade words reward chunking: to-geth-er, my-self, laugh is one beat. Sorting the cards by syllable count is a five-minute activity that teaches the decoding habit that replaces sight words.',
      },
      {
        title: 'Hunt prefixes and suffixes',
        body: 'myself (my + self), together, "hotter" thinking with the -er from this list\'s better. Word parts generalize; whole-word memory does not. This is the pivot year.',
      },
      {
        title: 'Close holes in earlier lists first',
        body: 'A shaky primer word hurts a third grader more than a missing one here — earlier words are higher-frequency. Re-run the K and 1st card piles once as a diagnostic before drilling this list.',
      },
      {
        title: 'Read-to-learn is the new game',
        body: 'After Dolch ends, vocabulary grows from content: science units, social studies chapters. Keep a personal word wall for those — the sight word habit transfers directly.',
      },
    ],
    faqs: [
      {
        q: 'How many Dolch sight words are there in total?',
        a: '220 across five levels: 40 pre-primer, 52 primer, 41 first grade, 46 second grade and 41 third grade. Finishing the list is the end of formal sight word instruction — from here, word parts and content vocabulary take over.',
      },
      {
        q: 'What are the third grade Dolch words?',
        a: 'The 41 words on this sheet: about, better, bring, carry, clean, cut, done, draw, drink, eight, fall, far, full, got, grow, hold, hot, hurt, if, keep, kind, laugh, light, long, much, myself, never, only, own, pick, seven, shall, show, six, small, start, ten, today, together, try, warm.',
      },
      {
        q: 'What comes after the 220 Dolch words?',
        a: 'The Fry lists continue (third hundred through ninth hundred), but the real third-grade shift is structural: decoding multi-syllable words, prefixes and suffixes, and absorbing vocabulary from science and social studies reading.',
      },
      {
        q: 'Why do some third grade words look easy to sound out?',
        a: 'Because they are — draw, hot, ten follow the phonics patterns third graders have mastered. Later Dolch levels include plenty of decodable words; by this point the strategy is shifting from whole-word memory to word-part reading, and the easy words are the bridge.',
      },
    ],
    related: [
      { href: '/sight-words/', label: 'All sight word lists by grade' },
      { href: '/second-grade-sight-words/', label: 'Second grade sight words' },
      { href: '/cursive-alphabet/', label: 'Cursive alphabet (third grade\'s other classic)' },
    ],
  },
];
