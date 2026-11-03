import type { PageDef } from './pageTypes';
import { hasLetterArt } from '../lib/drawings';

/**
 * Letter coloring pages — one page per letter at /coloring/letters/<letter>/.
 *
 * SERP basis (audited 2026-11-03): "letter coloring pages" runs 1.9K US/mo at
 * KD 16 and "letter a coloring pages" 2.4K at KD 24 — the softest corner of
 * the 197K/month coloring cluster the user pulled (AITDK, 2026-11-03). The
 * per-letter SERP is held by Crayola, ABCmouse and small blogs
 * (preschoolplayandlearn, natashalh) with Pinterest filling the gaps — small
 * blogs ranking top 5 is the DR-0 entry proof, same pattern the cursive
 * matrix rode in on. Incumbent page anatomy (kidsactivitiesblog, crayola,
 * mondaymandala — torn down 2026-11-03): image-led pages where the printable
 * itself is the content; mondaymandala gives every single drawing its own
 * URL. Rework same day (user caught the form mismatch — incumbents sell
 * galleries of many PICTURES per page, not worksheets): every letter now
 * renders a six-drawing gallery above the practice sheet, with hand-coded
 * SVG line art in src/lib/drawings.ts (70 objects, 26 hand-written
 * caption sets). Primary keyword targeted per page: "letter X coloring
 * pages" (plural — h1/metaTitle), 2.4K US/mo at KD 24 for letter a.
 */

/** Printable sheet data beyond the shared PageDef SEO fields. */
export interface ColoringLetterSheet {
  capital: string;
  lower: string;
  /** Three big bubble words to color — beginning-sound nouns (x mixes ending-sound). */
  words: string[];
  /** One-line phonics note printed under the word row. */
  wordNote: string;
  /** The draw-your-own box prompt. */
  drawPrompt: string;
}

export interface ColoringLetterDef extends PageDef {
  sheet: ColoringLetterSheet;
}

type RawLetterDef = Omit<ColoringLetterDef, 'related'>;

const RAW: RawLetterDef[] = [
  {
    slug: 'a',
    hub: 'coloring',
    h1: 'Letter A Coloring Pages',
    metaTitle: 'Letter A Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'A free printable letter A coloring page: big bubble A and a, three A words to color, a trace row, and a draw-your-own box. No sign-up — print and color.',
    lead:
      'One giant bubble A and a, three A words to color, a trace row, and an empty box daring your child to draw their own apple. It prints on two letter pages and needs nothing but crayons.',
    introHeading: 'The letter that starts everything',
    intro: [
      'A is where the alphabet starts, and it is also where the two trickiest sounds live: the short a of apple and the long a of acorn both open this page. The capital A is two slanted legs and a crossbar — three straight strokes a young child can outline in three different colors. The lowercase a is a circle with a wall on the right, which makes it a perfect first shape to color: round things are forgiving, and a wobbly circle still reads as an a.',
      'Coloring a letter before writing it is quietly good pedagogy. The crayon traces the same path a pencil will later, at whatever speed the hand can manage, and the child owns the shape before anyone asks them to reproduce it at small size. The word row gives the sound a job — apple, ant, acorn are all things a child can picture, which is what turns a shape into a letter.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Two colors, two sounds',
        body: 'Color the capital A in one color while you say "apple," the lowercase in another while you say "acorn." The page deliberately carries both sounds — this is the easiest place a child will ever meet long and short a side by side.',
      },
      {
        title: 'Rainbow the crossbar',
        body: 'Challenge an older preschooler to fill the crossbar with every red crayon in the box, darkest to lightest. Sorting shades is real color-vocabulary work hiding inside letter practice.',
      },
      {
        title: 'Apple prints for the box',
        body: 'Halve an apple, dip it in paint, and stamp the draw-your-own box before drawing stems and leaves on top. The page becomes an art project and the A sound gets repeated six more times without a single flashcard.',
      },
    ],
    faqs: [
      {
        q: 'What things that start with A can my child color on this page?',
        a: 'The word row has apple, ant, and acorn, and the letters themselves are the main coloring surface. Beyond the page: alligator, astronaut, and apron all extend the same sound if your child wants more to color after printing.',
      },
      {
        q: 'What sound does the letter A make?',
        a: 'Two of them, and this page shows both: the short a as in apple and ant, and the long a as in acorn, where the letter says its own name. Say each word slowly when your child starts coloring it — the sound lands better mid-activity than in a drill.',
      },
      {
        q: 'What age is this letter A coloring page for?',
        a: 'Ages three to six. Threes and fours mostly color the big shapes and ignore the trace row; fives and sixes use the whole page, then move on to writing the letter freehand on the draw box border — which is exactly the progression preschool and kindergarten teachers run.',
      },
      {
        q: 'How do I print the letter A coloring page?',
        a: 'Hit the print button — the page strips itself down to its two print pages: the picture gallery first, the bubble-letter practice sheet second, portrait, black outlines on white. The Download PNG button saves the picture page as an image if you would rather print from a photo app or load it onto a tablet for a drawing app.',
      },
    ],
    sheet: {
      capital: 'A',
      lower: 'a',
      words: ['Apple', 'Ant', 'Acorn'],
      wordNote: 'Apple and ant use the short a; acorn stretches it long. Same letter, two jobs.',
      drawPrompt: 'an apple tree, or a picnic interrupted by ants',
    },
  },

  {
    slug: 'b',
    hub: 'coloring',
    h1: 'Letter B Coloring Pages',
    metaTitle: 'Letter B Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Free printable letter B coloring page with big bubble B and b, ball-bear-boat to color, a trace row, and a draw box. Two pages, no sign-up.',
    lead:
      'A chunky bubble B and b, ball, bear and boat to color, plus a trace row and a draw-your-own box. Two pages, ready before the crayon box is even open.',
    introHeading: 'The letter with two bellies',
    intro: [
      'B is two bellies stacked on a stick — the capital carries a smaller hump on top and a rounder one below, and the lowercase b is a tall stick with a single belly at the bottom. That anatomy is exactly what makes b the letter children most often mirror into a d, and coloring it is a sneaky fix: while the crayon travels the outside of the shape, the hand learns that the bump belongs on the right side of the stick. Say "stick first, then belly" as they color the lowercase and the reversal habit loosens.',
      'The b sound is a quick pop — lips together, then release. It is one of the earliest sounds children say (babbling is literally b practice), so most kids arrive at this page already owning the sound; the page gives it a written body. Ball, bear and boat keep the pop at the front of every word, right where the ear catches it.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Belly check against d',
        body: 'If your child is fighting b/d reversals, print this page and a letter d page and color them side by side. The b belly faces right; the d belly faces left — the comparison on paper beats the verbal rule they will forget.',
      },
      {
        title: 'Bounce the B',
        body: 'B is for bounce: color the capital, then bounce a ball while saying b-words — ball, bat, baby. Pairing the sound with gross-motor movement is the classic speech-therapy trick, and it costs nothing.',
      },
      {
        title: 'Two bellies, two shades',
        body: 'Color the capital B\'s top belly one color and the bottom belly another, then count them: "one, two — B has two bellies." The counting gives the shape a story, which is what makes it stick.',
      },
    ],
    faqs: [
      {
        q: 'What B words are on this coloring page?',
        a: 'Ball, bear and boat — three nouns a preschooler can picture instantly, all in big bubble letters sized for crayons. The draw-your-own box invites a fourth: banana, bee, or butterfly are the usual candidates.',
      },
      {
        q: 'Why do kids mix up b and d, and does coloring help?',
        a: 'Because the shapes are mirror images and young brains do not lock in left-right orientation until five or six. Coloring the outside of the shape builds a motor memory of which side the belly sits on — it is the same trick handwriting programs use, just earlier and with crayons.',
      },
      {
        q: 'What age is this letter B coloring page for?',
        a: 'Three to six. The bubble letters are big enough for chunk toddler crayons, and the trace row gives kindergartners who are already writing their pencil warm-up before the writing starts.',
      },
      {
        q: 'Can I use this page in a classroom?',
        a: 'Yes — it prints clean on two letter pages with no watermark and no sign-up, so it copies well. Letter-of-the-week teachers usually run it as the Tuesday activity: color the six pictures, then the letter, then the words, and the draw box becomes a drawing-and-labeling exercise.',
      },
    ],
    sheet: {
      capital: 'B',
      lower: 'b',
      words: ['Ball', 'Bear', 'Boat'],
      wordNote: 'All three words pop the b sound right at the front, where young ears catch it.',
      drawPrompt: 'a bear in a boat, or a beach ball mid-bounce',
    },
  },

  {
    slug: 'c',
    hub: 'coloring',
    h1: 'Letter C Coloring Pages',
    metaTitle: 'Letter C Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter C coloring page: bubble C and c, cat-car-cake to color, a trace row, and a draw box. Free, two pages, no sign-up.',
    lead:
      'Bubble C and c wide enough for the chunkiest crayons, cat, car and cake to color, a trace row, and a draw box for whatever c thing your child invents.',
    introHeading: 'The letter that never closes',
    intro: [
      'C is a circle that stopped halfway — an open mouth, a crescent, a cookie with a bite out of it. That openness is the whole shape: color the capital in one long sweep around the curve and the hand has practiced the same rotation that will later draw o, g, and q. The lowercase c is the same arc at smaller size, which makes C-to-c one of the cleanest capital-lowercase pairs in the alphabet: same shape, different height.',
      'The sound is where c gets complicated. Cat, car and cake all run the hard c — a k sound — and those are the words on this page on purpose. Soft c (city, circus) arrives in first grade and confuses children far less when hard c is already automatic. Coloring three hard-c words plants the default before the exception shows up.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'One continuous sweep',
        body: 'Ask your child to color the capital c without lifting the crayon — one trip around the curve. It is a small fine-motor challenge that doubles as rehearsal for how the letter is written.',
      },
      {
        title: 'C is for cookie',
        body: 'Color the c brown, then add chocolate-chip dots with the crayon points. If You Give a Mouse a Cookie pairs perfectly — read it right after the coloring and the c sound gets a whole story attached.',
      },
      {
        title: 'Find the hidden c',
        body: 'After coloring, hunt for c shapes around the house: a half-open door, a banana, a couch arm. Letter hunting in the real world does more for recognition than any second worksheet.',
      },
    ],
    faqs: [
      {
        q: 'What C words does this page include?',
        a: 'Cat, car and cake — all hard-c words on purpose. Soft c (city, cell) is a first-grade surprise; children handle it much better once the hard sound is the one they know cold.',
      },
      {
        q: 'What sound does C make?',
        a: 'On this page, the hard c — a k sound, back of the mouth. C also borrows the s sound before e, i and y (circle, city), but that rule comes later; preschool and kindergarten should drill the hard c until it is reflexive.',
      },
      {
        q: 'How is this different from the letter O page?',
        a: 'Just the gap. C is an o that never closed, and setting the two pages side by side makes that visible — color both and your child sees the whole curve family sharing one motion, which is exactly how writing programs teach it.',
      },
      {
        q: 'What age is this letter C coloring page for?',
        a: 'Three to six. The wide bubble letters suit the palm grip of a three-year-old; the trace row and draw box give five- and six-year-olds the writing and drawing extension the older half of a preschool class always wants.',
      },
    ],
    sheet: {
      capital: 'C',
      lower: 'c',
      words: ['Cat', 'Car', 'Cake'],
      wordNote: 'Three hard-c words — the k sound. Soft c (city) can wait for first grade.',
      drawPrompt: 'a cake with candles, or a cat in a car',
    },
  },

  {
    slug: 'd',
    hub: 'coloring',
    h1: 'Letter D Coloring Pages',
    metaTitle: 'Letter D Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Free letter D coloring page to print: bubble D and d, dog-duck-door, a trace row, and a draw-your-own box. Two pages, no watermark.',
    lead:
      'A big bubble D and d, dog, duck and door to color, plus a trace row and an empty draw box. Two pages, prints clean, no sign-up.',
    introHeading: 'The drum of the alphabet',
    intro: [
      'Say d and you are beating a drum: tongue taps the ridge behind the teeth and releases in one dry pop. The capital D is a straight spine with one big round belly, and the lowercase is the same belly on a taller spine — color both and the family resemblance does the teaching. Belly on the left is what makes a d a d; that is the side the crayon should travel most carefully.',
      'D is the mirror twin of b, and this page is built to be printed alongside the letter B page. Same bellies, opposite sides. Children who color the pair in one sitting — b page, then d page, out loud, "b has its belly on the right, d on the left" — collect the reversal fix weeks earlier than children who meet the letters separately in workbooks.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Drum while you color',
        body: 'Tap the table like a drum every time you say a d-word — dog, drum, Dad. D is a percussive sound and the tapping pairs it with a beat, which anchors it faster than repetition alone.',
      },
      {
        title: 'B page first, D page second',
        body: 'Print the letter B coloring page for the sitting before this one. Coloring the mirror pair back to back turns the classic b/d confusion into a single learned contrast instead of two competing memories.',
      },
      {
        title: 'Doors are d-shaped',
        body: 'A door is literally a d in real life — tall rectangle with the hinge on one side. After coloring, walk to a door and trace its outline in the air: which side is the belly? The everyday match locks the shape in.',
      },
    ],
    faqs: [
      {
        q: 'What D words are on the page?',
        a: 'Dog, duck and door — all concrete nouns a three-year-old can draw from memory. The draw box is the fourth slot: dinosaurs dominate in this house, and the box has room for a whole herd.',
      },
      {
        q: 'Does coloring really help with b and d reversals?',
        a: 'It helps the way tracing does: the hand learns the shape\'s orientation through repetition of the outline. Color the b page and this one in the same week and say the belly sides out loud — motor memory plus verbal rule beats either alone.',
      },
      {
        q: 'What age is this letter D coloring page for?',
        a: 'Three to six. Toddlers color the big shapes and the words; kindergartners add the trace row and usually want to spell their own d-words (dog names are extremely common) in the draw box.',
      },
      {
        q: 'How big does the page print?',
        a: 'Exactly one US letter page, portrait, black outlines on white — the sheet fills the page edge to edge with no cropping. The Download PNG button hands you the same sheet as an image file for tablets or repeated printing.',
      },
    ],
    sheet: {
      capital: 'D',
      lower: 'd',
      words: ['Dog', 'Duck', 'Door'],
      wordNote: 'Three d-pops in a row — tongue taps, then releases. Say each word twice while coloring.',
      drawPrompt: 'a dog behind a door, or a duck paddling',
    },
  },

  {
    slug: 'e',
    hub: 'coloring',
    h1: 'Letter E Coloring Pages',
    metaTitle: 'Letter E Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter E coloring page with bubble E and e, egg-elf-envelope, a trace row, and a draw box. Free, two pages, no sign-up.',
    lead:
      'Bubble E and e, egg, elf and envelope to color, a trace row for pencil warm-ups, and a draw box waiting for an elephant. Two pages, free.',
    introHeading: 'The letter you are using most',
    intro: [
      'E is the most common letter in English — it is in roughly one of every eight letters on any page, including this one. That frequency makes it a high-value coloring session: the capital E is four straight strokes (spine plus three arms), which is the simplest possible geometry, and the lowercase e is one small curve with a shelf across the middle. Children who struggle to "see" the lowercase e benefit from coloring it fat first — the shelf line hiding inside the outline becomes obvious at crayon scale.',
      'Egg, elf and envelope are all short-e words — the eh sound at the front of the mouth. Short e is famously the last vowel sound children master because it sits acoustically close to short i; saying "egg" slowly while coloring gives the sound a concrete anchor, and the elephant in the draw box is the classic extension.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Count the arms',
        body: 'The capital E has three arms — color each a different color and count them out loud: one, two, three. Then compare with F on the next letter-of-the-week rotation: F is just E missing its bottom arm.',
      },
      {
        title: 'Egg-cellent decorations',
        body: 'Color the egg in the word row, then draw its pattern into the draw box — stripes, polka dots, cracks. Easter season turns this into the craft of the week without any extra printing.',
      },
      {
        title: 'Silent-e preview',
        body: 'For a kindergartner starting to read: write "bed" on scrap paper, add an e, and show it turns to "bee-de"... actually "bede" says bee. Too early to teach the rule, but coloring the letter that does the magic is a good first meeting.',
      },
    ],
    faqs: [
      {
        q: 'What E words can my child color here?',
        a: 'Egg, elf and envelope in the word row, and the elephant your child will almost certainly draw in the box. All short-e words — the eh sound — which is the sound this page is teaching.',
      },
      {
        q: 'Why is the letter E worth its own coloring page?',
        a: 'Sheer frequency: E is the most common letter in English, so it earns more recognition practice than almost anything else on the pre-literacy list. A child who owns E owns an eighth of every sentence they will ever read.',
      },
      {
        q: 'What age is this letter E coloring page for?',
        a: 'Three to six. The geometry suits beginners — the capital is four straight strokes even a two-year-old can outline roughly — and the trace row supports kindergartners moving from coloring to forming.',
      },
      {
        q: 'Is there a version with handwriting practice too?',
        a: 'The trace row on this sheet is the light version — hollow letters to trace with crayon or pencil. For full stroke-by-step instruction with numbered strokes, the site has a separate cursive E page and a print-friendly tracing generator for any name.',
      },
    ],
    sheet: {
      capital: 'E',
      lower: 'e',
      words: ['Egg', 'Elf', 'Envelope'],
      wordNote: 'Three short-e words — the eh sound at the front of the mouth, said slow.',
      drawPrompt: 'an elephant, or an Easter egg with a pattern',
    },
  },

  {
    slug: 'f',
    hub: 'coloring',
    h1: 'Letter F Coloring Pages',
    metaTitle: 'Letter F Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Free letter F coloring page: bubble F and f, fish-frog-fan, a trace row, and a draw-your-own box. Two pages, prints clean, no sign-up.',
    lead:
      'Bubble F and f, fish, frog and fan to color, a trace row, and a draw box — two pages of quiet, screen-free f-sound practice.',
    introHeading: 'The windy letter',
    intro: [
      'F is the only letter on this page whose sound is pure breath: top teeth on bottom lip, push air out, ffffff. No voice box at all. That makes it fun to teach while coloring — hold the f sound through one whole crayon stroke and see how long it lasts. The shape is a spine with two arms, the capital on a taller spine than the lowercase, and coloring the arms in different colors makes the two-arm anatomy impossible to miss.',
      'Fish, frog and fan all slam the f right at the front of the word, which is where young ears need it. F is a common first sound in children\'s names and family words — Dad, four, friend — so the letter tends to have personal attachments already. The draw box usually fills with fish; frogs are the second-place favorite and occasionally a family portrait appears, justified by someone\'s name.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'How long can you ffffff?',
        body: 'The f sound is unvoiced — just air — so it can run for as long as a breath. Play the endurance game while coloring: one crayon stroke, one long fffff. It is a phoneme-isolation exercise disguised as a contest.',
      },
      {
        title: 'Feather the arms',
        body: 'Color the F\'s two arms, then glue or draw feathers along them. The letter page turns into a craft, and Thanksgiving season gives the feather theme a holiday to land on.',
      },
      {
        title: 'F and E together',
        body: 'Print the letter E page from last week next to this one. F is E missing its bottom arm — seeing the subtraction in colored versions teaches more about letter construction than any verbal explanation.',
      },
    ],
    faqs: [
      {
        q: 'What F words are on this coloring page?',
        a: 'Fish, frog and fan in the bubble word row. The draw box takes the overflow: fox, flower and fire truck are the regulars, and fire truck season (any season, really) fills the box fastest.',
      },
      {
        q: 'How do you explain the f sound to a preschooler?',
        a: 'Put your top teeth on your bottom lip and blow — "the windy sound." Have them feel the air on their hand. F has no voice behind it (unlike v, its louder twin), which is why the long-fffff game works so well as a teaching trick.',
      },
      {
        q: 'What age is this letter F coloring page for?',
        a: 'Three to six. F is usually taught mid-alphabet in letter-of-the-week order, so most users are fours and fives; the bubble letters are still generous enough for a toddler grip.',
      },
      {
        q: 'Can the trace row be used with a pencil?',
        a: 'Yes — the hollow trace letters are sized for crayon at the top and pencil at the bottom of the same row. Pencil tracing after crayon coloring is exactly the progression handwriting programs use, one page can carry both.',
      },
    ],
    sheet: {
      capital: 'F',
      lower: 'f',
      words: ['Fish', 'Frog', 'Fan'],
      wordNote: 'Teeth on lip, push the air: fffff. No voice — just wind.',
      drawPrompt: 'a fish with fancy fins, or a frog on a fan',
    },
  },

  {
    slug: 'g',
    hub: 'coloring',
    h1: 'Letter G Coloring Pages',
    metaTitle: 'Letter G Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter G coloring page: bubble G and g, goat-gift-grapes, a trace row, and a draw-your-own box. Free, two pages, no sign-up.',
    lead:
      'Bubble G and g, goat, gift and grapes to color, a trace row, and a draw box for the giraffe your child will insist on. Two pages.',
    introHeading: 'Two letters wearing one shape',
    intro: [
      'G has the alphabet\'s most useful split personality: the hard g of goat and gift (a throaty pop like a gulping sound) and the soft g of giraffe (a j sound). This page teaches the hard g — goat, gift, grapes all front-load it — because that is the sound preschoolers meet first and the one reading programs expect them to know cold. The giraffe conversation will happen anyway; it goes better once hard g is already automatic.',
      'The shape is c with a collar: capital G is the open curve of C plus a small inward bar at the bottom, lowercase g is a circle with a tail that hangs below the line. That descender tail is new for children — most letters they have colored so far sit between the lines. Coloring the tail in a different color than the circle quietly teaches the two-part anatomy before any writing lesson names it.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Gulp the g',
        body: 'The hard g sound is a swallow-muscle sound — make exaggerated gulping noises together: guh, guh, guh. Goat starts with exactly that. Silly sounds stick; this is the letter where being ridiculous is the correct pedagogy.',
      },
      {
        title: 'Gift-wrap the G',
        body: 'Color the capital G, then decorate it with bows and ribbons like a present. Around December this page doubles as gift-season craft, and gift is conveniently one of the word-row words.',
      },
      {
        title: 'The tail hangs low',
        body: 'Point out that lowercase g\'s tail dives below everything else on the page. When handwriting starts, that "basement" is where descenders live — g, j, p, q, y — and this page is the first tour.',
      },
    ],
    faqs: [
      {
        q: 'What G words are on the page?',
        a: 'Goat, gift and grapes — all hard-g words. The soft g (giraffe, giant, gym) is deliberately left off the sheet; explain it verbally if your child asks, but let the hard g own the coloring.',
      },
      {
        q: 'What is the difference between hard g and soft g?',
        a: 'Hard g is the gulp sound in goat and gift; soft g is the j sound in giraffe and giant. Soft g appears before e, i and y, same pattern as soft c. This page teaches only the hard g because it is the default and the first sound programs introduce.',
      },
      {
        q: 'What age is this letter G coloring page for?',
        a: 'Three to six. The descender tail on lowercase g makes it slightly more interesting to fives and sixes, who enjoy noticing that the tail "breaks the rules" by going below the line.',
      },
      {
        q: 'Does this page have handwriting practice?',
        a: 'The trace row gives hollow G and g outlines to trace with crayon or pencil — the recognition-level version. For full formation instruction with numbered strokes, see the site\'s cursive G page, which breaks the letter down stroke by step.',
      },
    ],
    sheet: {
      capital: 'G',
      lower: 'g',
      words: ['Goat', 'Gift', 'Grapes'],
      wordNote: 'Three hard-g gulps — guh as in goat. Giraffe can wait; goat owns this page.',
      drawPrompt: 'a goat eating grapes, or a gift with too many bows',
    },
  },

  {
    slug: 'h',
    hub: 'coloring',
    h1: 'Letter H Coloring Pages',
    metaTitle: 'Letter H Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Free letter H coloring page to print: bubble H and h, hat-hen-house, a trace row, and a draw-your-own box. Two pages, no watermark.',
    lead:
      'Bubble H and h, hat, hen and house to color, a trace row, and a draw box. Two pages of h-sound practice with crayons.',
    introHeading: 'The letter that is only breath',
    intro: [
      'H is the quietest letter in the alphabet — a soft puff of air with nothing else attached, ha. Children who say "hat" as "at" are not being careless; they are skipping a sound that produces almost no sensation in the mouth. The fix is the hand-check: hold a palm in front of the mouth while saying hat and feel the puff. Then color the page. The puff, the shape, and the words all land in one sitting.',
      'The shape is architectural: the capital is two towers with a bridge, the lowercase a tower with a hump. Both are among the simplest outlines to color — long straight walls, which is why h pages tend to come home the most thoroughly filled-in of any letter. Hat, hen and house keep the puff at the front of each word, and house conveniently matches the shape of the capital: two towers and a bridge across.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'The palm test',
        body: 'Hand flat in front of the mouth: say hat, feel the puff; say at, feel nothing. That tiny sensation experiment is the single best fix for children who drop the h sound — do it before the crayons come out.',
      },
      {
        title: 'Build the bridge',
        body: 'The capital H is two towers and a bridge. Color the towers first, then the bridge, narrating: "wall, wall, bridge." The architecture language transfers straight to how the letter is later written.',
      },
      {
        title: 'House hunt',
        body: 'House is on the sheet, so hunt for other h things on a walk: hydrant, hill, hedge. Five minutes of real-world h-hunting beats a second worksheet and needs no printing at all.',
      },
    ],
    faqs: [
      {
        q: 'What H words does this coloring page include?',
        a: 'Hat, hen and house. The draw box will likely collect a horse — the most-demanded h animal — and hippo and hamburger are the other frequent occupants.',
      },
      {
        q: 'Why do some kids skip the h sound?',
        a: 'Because h is only breath — the mouth does almost nothing to produce it, so it is the easiest sound to drop without noticing. The palm test (feel the puff on your hand) makes the invisible sound visible, which is why speech teachers use exactly that trick.',
      },
      {
        q: 'What age is this letter H coloring page for?',
        a: 'Three to six. The long straight walls of H and h make this one of the easiest pages for toddlers to color within — and the bridge-and-towers story keeps older preschoolers engaged beyond plain coloring.',
      },
      {
        q: 'How does this compare to the cursive h page?',
        a: 'Different goal. This sheet teaches recognition and the h sound through coloring; the cursive h page on this site teaches how the letter is written in continuous script, stroke by stroke. Children usually color this one years before they need that one.',
      },
    ],
    sheet: {
      capital: 'H',
      lower: 'h',
      words: ['Hat', 'Hen', 'House'],
      wordNote: 'A puff of air, nothing more: ha. Feel it on your palm while you color.',
      drawPrompt: 'a house with a hat on the chimney, or a hen\'s family',
    },
  },

  {
    slug: 'i',
    hub: 'coloring',
    h1: 'Letter I Coloring Pages',
    metaTitle: 'Letter I Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter I coloring page with bubble I and i, igloo-ink-insect, a trace row, and a draw box. Free, two pages, no sign-up.',
    lead:
      'Bubble I and i, igloo, ink and insect to color, a trace row, and a draw box. The shortest letter on the alphabet gets a full page anyway.',
    introHeading: 'The smallest letter, the biggest vowel',
    intro: [
      'Lowercase i is the smallest letter your child will color — one short stroke and a floating dot — and it is secretly one of the most important. I is a vowel, the "in-between" sound: ih, as in igloo, ink and insect, the three words on this page. Short i is acoustically tangled with short e (children mix pen and pin for years), so every extra colorful pass over the ih sound helps untangle it early.',
      'The dot deserves its own attention. Children love the dot because it is the one piece of the alphabet that is purely decorative-looking — a period floating above a line. Explain it as the letter\'s hat: i wears it, and later j will too. The capital I, meanwhile, is three straight strokes, the same rectangle-build as the number one with a cap and base, and colors fast even for two-year-olds.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Dot gets a special color',
        body: 'Color the whole lowercase i one color, then the dot in gold, silver, or glitter crayon — whatever feels like treasure. Making the dot ceremonious is why children rarely forget it later when handwriting starts.',
      },
      {
        title: 'Pin vs pen rehearsal',
        body: 'Short i and short e are the classic mix-up. After coloring, say pin and pen back to back, exaggerating the difference. The page\'s ih words — igloo, ink, insect — are the anchors to return to.',
      },
      {
        title: 'Inchworm the box',
        body: 'Draw an inchworm in the draw box — a line of little humps — and measure it with a ruler afterward. I is for inch, and the measuring turns the drawing into a sneaky math moment.',
      },
    ],
    faqs: [
      {
        q: 'What I words are on this coloring page?',
        a: 'Igloo, ink and insect — all short-i words with the ih sound at the front. Ice cream is the word every child requests next, but it runs the long i (eye sound), so it belongs to a later conversation.',
      },
      {
        q: 'Why does lowercase i have a dot?',
        a: 'Historically, to mark it as separate from the strokes around it in medieval handwriting — practically, for us: it is i\'s hat, and children remember it as one. The dot matters in writing because without it i becomes just another vertical line.',
      },
      {
        q: 'What sound does I make on this page?',
        a: 'The short i — ih as in igloo, ink and insect. The long i (saying the letter\'s own name, as in ice and kite) comes later in reading instruction; this page plants the short sound first because it is the one simple readers need most.',
      },
      {
        q: 'What age is this letter I coloring page for?',
        a: 'Three to six. The capital colors in seconds for toddlers; the lowercase dot gives preschoolers their favorite detail on the page, and kindergartners take the trace row seriously as handwriting warm-up.',
      },
    ],
    sheet: {
      capital: 'I',
      lower: 'i',
      words: ['Igloo', 'Ink', 'Insect'],
      wordNote: 'Three ih words — the in-between vowel, short and pinned to the front.',
      drawPrompt: 'an insect parade, or an igloo with a doormat',
    },
  },

  {
    slug: 'j',
    hub: 'coloring',
    h1: 'Letter J Coloring Pages',
    metaTitle: 'Letter J Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Free letter J coloring page: bubble J and j, jam-jet-jelly, a trace row, and a draw-your-own box. Two pages, prints clean, free.',
    lead:
      'Bubble J and j, jam, jet and jelly to color, a trace row, and a draw box. Two pages, ready for the jar of crayons.',
    introHeading: 'The letter with the hook',
    intro: [
      'J is i grown up and gone somewhere: same stem, same dot on the lowercase, but the stem ends in a hook that dives below the line. That hook is the only structural difference between i and j on the lowercase side, and coloring the two pages in the same week — i\'s short stem, then j\'s diving stem — teaches the contrast better than any side-by-side worksheet. The capital J has the hook too, sweeping under itself with more room than any other capital gets.',
      'The sound is a quick voiced tap — jaw, jaw, jaw. Jam, jet and jelly front-load it, and jam is the word children say with the most enthusiasm, which is a real factor: enthusiasm gets a letter remembered. Jelly and jam together also set up the longest-running kindergarten joke, that jelly and jam are different foods, which your child will be delighted to explain to anyone who stands still.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Jump the j',
        body: 'J is for jump: color the letter, then jump while saying j-words — jump, jam, jelly. The j sound and the jumping motion both start with that same quick release, and gross-motor pairing is how active learners keep letters.',
      },
      {
        title: 'Color the hook last',
        body: 'Color the straight part of the lowercase j first, then the diving hook in a second color, then the dot in a third. Three colors, three parts — the anatomy lesson happens without a single word of instruction.',
      },
      {
        title: 'Jaguar in the box',
        body: 'The draw box usually gets a jaguar or a jet. If jaguars are hard to draw, suggest a jigsaw-puzzle pattern: jagged random shapes colored differently, which is literally a jigsaw and counts as a j-word.',
      },
    ],
    faqs: [
      {
        q: 'What J words can my child color?',
        a: 'Jam, jet and jelly in the bubble row. Juice, jacket and jaguar are the favorite box-drawing extensions — and jellyfish, which is technically two j-words in one animal and highly popular for that reason.',
      },
      {
        q: 'How is j different from i?',
        a: 'The hook. Lowercase i is a short stem with a dot; lowercase j is that same stem-plus-dot with a hook that dives below the line. Coloring both pages in one week makes the contrast visible — same stem, j just keeps going down.',
      },
      {
        q: 'What age is this letter J coloring page for?',
        a: 'Three to six. The capital\'s big sweeping hook is satisfying for toddlers to outline, and kindergartners enjoy the i-versus-j comparison once someone points out the family resemblance.',
      },
      {
        q: 'Does the trace row work for left-handed kids?',
        a: 'Yes — hollow outlines trace the same either-handed, and the sheet has no orientation-dependent content. Left-handed colorers tend to trace right-to-left; the row is built to survive both directions.',
      },
    ],
    sheet: {
      capital: 'J',
      lower: 'j',
      words: ['Jam', 'Jet', 'Jelly'],
      wordNote: 'A quick tap of the tongue behind the teeth: jaw, jam, jelly. Say it while you shade.',
      drawPrompt: 'a jar of jelly with a spoon, or a jet leaving a sky-writing j',
    },
  },

  {
    slug: 'k',
    hub: 'coloring',
    h1: 'Letter K Coloring Pages',
    metaTitle: 'Letter K Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter K coloring page: bubble K and k, kite-king-key, a trace row, and a draw-your-own box. Free, two pages, no sign-up.',
    lead:
      'Bubble K and k, kite, king and key to color, a trace row, and a draw box. Two pages of k-sound practice, free to print.',
    introHeading: 'The kicking letter',
    intro: [
      'K makes the same sound as hard c — a clean back-of-the-mouth click — which makes this page the perfect follow-up to the letter C page. Tell a child that k and c are twins who look nothing alike; then color both. Kite, king and key all front-load the click, and kite earns the featured spot because it literally starts with a kick of wind.',
      'The shape is a spine with two diagonal kicks: the capital a tall spine with an arm and a leg, the lowercase the same at half height. Diagonals are harder for young hands to color inside than verticals and circles — the corners pinch the crayon — so expect this page to take a little longer and look a little more abstract. That difficulty is the point: diagonals need practice, and few letters offer two of them this prominently.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Kick while you color',
        body: 'The k sound is a kick — air released in one click. Do an actual little kick with each k-word: kite, kick, king. Sound-plus-motion pairing again; it works for nearly every consonant and especially for k.',
      },
      {
        title: 'Twin check with C',
        body: 'After coloring, hold this page next to the letter C page and listen: kite and cat start identically. Explain that c and k are sound twins with different outfits. It sets up the later spelling rule (cat vs kitten) without teaching it yet.',
      },
      {
        title: 'Kite tail in the box',
        body: 'Draw a kite in the draw box with the longest tail the paper allows. Kites are the highest-yield drawing in the k category — every child can draw one, and the bow pattern colors beautifully.',
      },
    ],
    faqs: [
      {
        q: 'What K words are on this coloring page?',
        a: 'Kite, king and key. Koala and kangaroo are the box-drawing favorites — Australia supplies half the k-animal kingdom — and kettle appears whenever someone\'s household still boils one.',
      },
      {
        q: 'Do C and K make the same sound?',
        a: 'Yes — the hard c of cat and the k of kite are identical clicks. English spells the sound both ways (and ck locks it in kitten), which is why meeting the sound twice across two coloring pages is genuinely useful preparation for spelling later.',
      },
      {
        q: 'What age is this letter K coloring page for?',
        a: 'Four to six, mostly — the double diagonal makes K a slightly later coloring page than circles-and-sticks letters. Confident toddler colorers will still manage the capital\'s big shapes with a chunky crayon.',
      },
      {
        q: 'Why does the letter K start some words silently, like knife?',
        a: 'Historical spelling: the k was once pronounced, and English kept the letter after the sound went quiet. Knife, knee and know are the famous silent-k club. For a preschooler this does not matter yet — this page teaches only the sounded k.',
      },
    ],
    sheet: {
      capital: 'K',
      lower: 'k',
      words: ['Kite', 'King', 'Key'],
      wordNote: 'One clean click from the back of the mouth — the same sound cat starts with.',
      drawPrompt: 'a kite with the longest tail ever, or a king wearing a key on a chain',
    },
  },

  {
    slug: 'l',
    hub: 'coloring',
    h1: 'Letter L Coloring Pages',
    metaTitle: 'Letter L Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Free letter L coloring page to print: bubble L and l, lion-leaf-lamp, a trace row, and a draw-your-own box. Two pages, no watermark.',
    lead:
      'Bubble L and l, lion, leaf and lamp to color, a trace row, and a draw box. Two pages — the easiest shape in the alphabet to color well.',
    introHeading: 'The corner letter',
    intro: [
      'L is one straight line with one foot — the simplest possible letter construction after I. That makes this the highest-success page for youngest colorers: even a two-year-old can stay roughly inside a capital L, and the success matters, because coloring pages are as much about wanting to come back tomorrow as they are about letters. The lowercase l is just the taller stick — no foot — which makes l one of the easiest lowercase letters to recognize at a glance.',
      'The sound is the lightest liquid in the mouth: tongue tip up behind the teeth, voice on, la. Lion, leaf and lamp carry it, and lion is the strongest draw on the page — everything with a mane gets colored twice. L also happens to open love and like, which gives parents an unusual amount of personal use out of this particular letter.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Lick the lollipop',
        body: 'The classic l trick: the tongue tap in la is the same motion as licking a lollipop. Pretend-lick while saying l-words. The physical cue is why lollipop appears in every letter-l lesson ever taught.',
      },
      {
        title: 'Trace the corner',
        body: 'Walk two fingers along the capital L — down the spine, out the foot — before coloring. The finger-trace is the pre-writing rehearsal, and L\'s single corner makes it the best letter to learn the move on.',
      },
      {
        title: 'Leaf rubbings',
        body: 'Leaf is on the sheet, so take the page outside: hold paper over a leaf and rub with the flat side of a peeled crayon. The rubbing fills the draw box with a real leaf print — craft and letter practice in one.',
      },
    ],
    faqs: [
      {
        q: 'What L words are on the page?',
        a: 'Lion, leaf and lamp in the bubble row. Ladybug, lemon and love are the usual draw-box tenants — love especially, which is why this page gets printed for cards more than any other letter.',
      },
      {
        q: 'Why is L a good first coloring letter?',
        a: 'Shape simplicity: one vertical, one horizontal, one corner. Very young children get a clean win on this page, and an early win is what makes the next page welcome. Start toddlers on L or I before handing them a K or an R.',
      },
      {
        q: 'What sound does L make?',
        a: 'The liquid l — tongue tip up behind the top teeth with the voice on: la. It stays light and bright at the start of lion, leaf and lamp. (The darker l at the ends of words like ball comes years later, if ever explicitly.)',
      },
      {
        q: 'How is lowercase l different from capital I?',
        a: 'Almost identical shape, different height — which is exactly why this page and the letter I page make a good pair to color in one sitting. In print handwriting, lowercase l is simply the tall version of i without the dot.',
      },
    ],
    sheet: {
      capital: 'L',
      lower: 'l',
      words: ['Lion', 'Leaf', 'Lamp'],
      wordNote: 'Tongue up, voice on: la. Lick an imaginary lollipop between words.',
      drawPrompt: 'a lion with a rainbow mane, or a lamp shaped like a leaf',
    },
  },

  {
    slug: 'm',
    hub: 'coloring',
    h1: 'Letter M Coloring Pages',
    metaTitle: 'Letter M Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter M coloring page with bubble M and m, moon-milk-mouse, a trace row, and a draw box. Free, two pages, no sign-up.',
    lead:
      'Bubble M and m, moon, milk and mouse to color, a trace row, and a draw box. Two pages for the letter kids say first — mama.',
    introHeading: 'The hum with four legs',
    intro: [
      'M is the first letter most children ever say — mama predates the alphabet by a year or two — so this page usually arrives pre-loaded with affection. The sound is a closed-mouth hum: lips together, voice on, mmmm. Hold it while coloring and the letter literally hums. Moon, milk and mouse all start with it, and moon is the draw that makes this page special: a colored moon with a face is a keepsake project in any preschool.',
      'The shape is mountains: the capital is four vertical strokes with two valleys, the lowercase the same range at smaller scale. Coloring each leg a different color turns the page into a color-matching exercise — four legs, four crayons — and the counting is free numeracy smuggled into literacy. M pages tend to be among the most thoroughly completed in the whole matrix, mostly because of the moon.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Hum through the whole page',
        body: 'M is the only letter you can sing while coloring — lips closed, mmmm, sustained through an entire crayon stroke. It is a phoneme-awareness game that costs nothing and always gets a laugh.',
      },
      {
        title: 'Four legs, four colors',
        body: 'The capital M has four strokes. Assign each a different color and count as you go: one, two, three, four. The counting is the numeracy bonus this page carries for free.',
      },
      {
        title: 'Man in the moon',
        body: 'Color the moon word with a face — eyes, nose, a sleepy smile. Around the full moon, take the page outside and compare: same shape in the sky. Letter pages that leave the house get remembered.',
      },
    ],
    faqs: [
      {
        q: 'What M words does this page include?',
        a: 'Moon, milk and mouse. Monkey and monster are the dominant draw-box choices; mittens take over in winter, and mama gets written — unprompted, usually with enormous letters — somewhere on nearly every copy.',
      },
      {
        q: 'Why is M one of the first letters children learn?',
        a: 'Because mama is usually a child\'s first word, the m sound is years old before any letter instruction starts. Attaching a written shape to a sound the child has owned since infancy is the softest possible entry into the alphabet.',
      },
      {
        q: 'How do you make the m sound?',
        a: 'Lips together, voice humming, air out the nose: mmmm. It is a nasal sound — the only letter on this page you can hold while humming a tune, which is exactly the trick to use during coloring.',
      },
      {
        q: 'What age is this letter M coloring page for?',
        a: 'Three to six. The four-leg construction gives counting practice to older preschoolers, and the moon drawing keeps even two-year-olds engaged — circles and faces are the first things children learn to draw.',
      },
    ],
    sheet: {
      capital: 'M',
      lower: 'm',
      words: ['Moon', 'Milk', 'Mouse'],
      wordNote: 'Lips closed, hum out your nose: mmmm. The letter you can sing while coloring.',
      drawPrompt: 'a mouse on the moon, or a milk carton with a face',
    },
  },

  {
    slug: 'n',
    hub: 'coloring',
    h1: 'Letter N Coloring Pages',
    metaTitle: 'Letter N Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Free letter N coloring page: bubble N and n, nest-net-nine... nest, nut and net to color, a trace row, and a draw box. Two pages, free.',
    lead:
      'Bubble N and n, nest, nut and net to color, a trace row, and a draw box. Two pages for the letter that says no — and night, and nose.',
    introHeading: 'The nose letter',
    intro: [
      'N is a hum through the nose: tongue up behind the teeth like d, but the air routes out the nostrils instead of the mouth. Pinch your nose shut mid-nnnooo and the sound stops completely — that demonstration is the whole phonics lesson for this page, and children find it hilarious, which means they repeat it, which means they learn it. Nest, nut and net keep the n at the front of every word.',
      'The shape is half an M: two towers, one valley. Coloring the M page and this one in sequence shows the subtraction visually — same construction, one fewer valley. The lowercase n is among the most frequent letters in early reading (in, on, no, and), so recognition here pays out quickly in real sentences, sooner than with rarer letters like q or z.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Pinch the nose',
        body: 'Hum nnnn, then pinch your nostrils shut — the hum stops dead. That one-second experiment teaches what a nasal sound is better than any explanation, and children will perform it for relatives for weeks.',
      },
      {
        title: 'N page after M page',
        body: 'Color the letter M page first if you can. N is M missing one valley, and seeing the subtraction between two colored pages builds the compare-and-contrast habit that carries through the rest of the alphabet.',
      },
      {
        title: 'Build a nest in the box',
        body: 'Draw a nest in the draw box: layered wavy lines in browns, then a dot cluster of eggs. It is the easiest bird-adjacent drawing in the alphabet and fills the box fast for children who "cannot draw."',
      },
    ],
    faqs: [
      {
        q: 'What N words are on this coloring page?',
        a: 'Nest, nut and net. Night, nose and nine are the common extensions, and ninja appears with surprising frequency in the draw box — usually airborne, always colored black.',
      },
      {
        q: 'What sound does N make?',
        a: 'A nasal hum — tongue up like d, air out the nose: nnn. The pinch-your-nose test proves the air route instantly. It pairs the same way at the front of nest, nut and net, all three of which are on the sheet.',
      },
      {
        q: 'Is N the same shape as M?',
        a: 'N is half of M — two towers, one valley instead of two. Coloring both pages in one sitting makes the relationship visible and turns two letters into one construction lesson.',
      },
      {
        q: 'What age is this letter N coloring page for?',
        a: 'Three to six. The two-tower shape colors easily for toddlers, and the nose-pinch demonstration gives it a science-experiment angle that keeps fours and fives at the table longer than plain coloring does.',
      },
    ],
    sheet: {
      capital: 'N',
      lower: 'n',
      words: ['Nest', 'Nut', 'Net'],
      wordNote: 'A hum out the nose: nnnn. Pinch your nose mid-sound and feel it stop.',
      drawPrompt: 'a nest with eggs, or a nut with a door and windows',
    },
  },

  {
    slug: 'o',
    hub: 'coloring',
    h1: 'Letter O Coloring Pages',
    metaTitle: 'Letter O Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter O coloring page: bubble O and o, owl-octopus-ox, a trace row, and a draw-your-own box. Free, two pages, no sign-up.',
    lead:
      'Bubble O and o — the two easiest shapes in the alphabet — owl, octopus and ox to color, a trace row, and a draw box. Two pages.',
    introHeading: 'The circle that talks',
    intro: [
      'O is the shape children draw before they know any letters at all — circles come first in every child\'s drawing development, which makes this page the most accessible in the matrix. The letter form and the mouth form match: say ooo and the lips make a small circle. Owl, octopus and ox carry the short o — ah, the doctor\'s-say-ah sound — and owl is the reliable favorite, because owl eyes are two more circles to color.',
      'O also runs the long sound — its own name, as in open and over — but this page deliberately teaches only the short o. The two-sound conversation (pot vs open) belongs to reading instruction a year or two out; for now, ah is the sound, and the three words on the sheet all run it. The draw box will fill with octopuses, every one of them with eight deliberately counted arms, which is numeracy smuggled into the letter lesson yet again.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Say ah like the doctor',
        body: 'Short o is the doctor\'s sound — open wide, ah. Make the round mouth, then color the round letter. Matching the mouth shape to the letter shape is the oldest phonics trick there is, and o is where it works best.',
      },
      {
        title: 'Circle hunt first',
        body: 'Before coloring, hunt circles around the room: cup rims, clock faces, buttons. O is the letter most likely to be found already drawn in the child\'s own environment — the hunt takes two minutes and makes the page feel familiar.',
      },
      {
        title: 'Eight arms, count them',
        body: 'The octopus in the draw box gets exactly eight arms — count them out loud while drawing. Numbered arms turn a drawing into counting practice, and the count is why octopus beats owl as the box favorite.',
      },
    ],
    faqs: [
      {
        q: 'What O words are on this coloring page?',
        a: 'Owl, octopus and ox — all short-o words. Orange is the most-requested extra (it is both a color and a fruit, which children find disproportionately delightful), but it runs a different vowel sound and lives best in the draw box.',
      },
      {
        q: 'What sound does O make on this page?',
        a: 'The short o — ah, as in owl and ox, the sound you make at the doctor. O also says its own name in words like open; that long-o lesson comes later in reading, and this page keeps it out of the way on purpose.',
      },
      {
        q: 'Why is O a good very-first coloring letter?',
        a: 'Circles are the first shape children learn to draw, so the letter already sits in the hand. If you are starting letter-of-the-week with a young two or three, O and the circle-friendly letters (C, c) are the gentlest on-ramp in the alphabet.',
      },
      {
        q: 'How is O different from the zero on a math page?',
        a: 'Visually nearly identical — which children find hilarious and adults find pedagogically useful. The difference is what it means: O is a sound, zero is a quantity. Coloring both (this page and any number page with a zero) is a real conversation-starter.',
      },
    ],
    sheet: {
      capital: 'O',
      lower: 'o',
      words: ['Owl', 'Octopus', 'Ox'],
      wordNote: 'Round mouth, doctor\'s sound: ah. Owl, octopus, ox — all short o.',
      drawPrompt: 'an octopus with all eight arms colored differently',
    },
  },

  {
    slug: 'p',
    hub: 'coloring',
    h1: 'Letter P Coloring Pages',
    metaTitle: 'Letter P Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Free letter P coloring page to print: bubble P and p, pig-pen-pizza, a trace row, and a draw-your-own box. Two pages, no watermark.',
    lead:
      'Bubble P and p, pig, pen and pizza to color, a trace row, and a draw box. Two pages — and yes, the pizza wins.',
    introHeading: 'The pop of pursed lips',
    intro: [
      'P is a tiny explosion: lips pressed together, air built up, then released — puh. Hold a tissue in front of the mouth and say puh; the tissue jumps. That demonstration is the phonics lesson for this page, and it is a reliable laugh, which is the currency preschool teaching runs on. Pig, pen and pizza all pop at the front, and pizza generates more coloring enthusiasm per square inch than any other word on any page in this matrix.',
      'The shape: capital P is a spine with one loop at the top; lowercase p sends its spine diving below the line with the loop hanging in the basement alongside g and j. That descender makes p part of the below-the-line club children notice on their own — color the g page and this one in the same week and someone will point out that both tails go down. Let them; noticing is the lesson.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'The jumping tissue',
        body: 'Hold a tissue in front of the mouth and say puh — it jumps. P is a pop of air, and the jumping tissue proves it. Do it three times, then color. The demonstration is the most-remembered minute of the whole session.',
      },
      {
        title: 'Pizza toppings counting',
        body: 'Color the pizza in the word row, then in the draw box draw a bigger pizza and count the toppings: six pepperonis, four peppers. P is for pizza and for practice counting — two curricula on one page.',
      },
      {
        title: 'P and B, lip twins',
        body: 'P and b are both lip pops — p is just air, b has voice behind it. Say puh... buh... puh... buh and feel the difference in your throat. After coloring both pages, a child can usually explain the difference back to you.',
      },
    ],
    faqs: [
      {
        q: 'What P words are on this coloring page?',
        a: 'Pig, pen and pizza — the strongest three-word lineup on the sheet, by popular demand of the under-six demographic. Penguin, panda and pumpkin fill the draw box seasonally; pumpkin takes over every October.',
      },
      {
        q: 'How is P different from B?',
        a: 'Same lip pop, different voice: p is only air, b carries voice from the throat (say both with fingers on your throat and feel the buzz switch). The shapes mirror too — p\'s loop hangs below the line, b\'s belly sits on it. The two pages make a good pair.',
      },
      {
        q: 'What age is this letter P coloring page for?',
        a: 'Three to six. The tissue-jump demonstration works even for twos, the pizza keeps everyone at the table, and kindergartners take the trace row as pencil warm-up before writing practice.',
      },
      {
        q: 'Does the lowercase p go below the line?',
        a: 'Yes — p is one of the descenders (with g, j, q and y), whose tails dive below the baseline. Coloring the loop in a different color from the diving spine makes the two-part anatomy visible before any writing lesson names it.',
      },
    ],
    sheet: {
      capital: 'P',
      lower: 'p',
      words: ['Pig', 'Pen', 'Pizza'],
      wordNote: 'Lips together, then pop: puh. Say it at a tissue and watch it jump.',
      drawPrompt: 'a pizza with silly toppings, or a pig in a pen',
    },
  },

  {
    slug: 'q',
    hub: 'coloring',
    h1: 'Letter Q Coloring Pages',
    metaTitle: 'Letter Q Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter Q coloring page: bubble Q and q, queen-quilt-quiz, a trace row, and a draw-your-own box. Free, two pages, no sign-up.',
    lead:
      'Bubble Q and q, queen, quilt and quiz to color, a trace row, and a draw box. Two pages for the rarest letter kids meet.',
    introHeading: 'The letter that brings a friend',
    intro: [
      'Q almost never travels alone — in every word a child will read this year, q is holding u\'s hand: qu, qu, qu. That pairing is the real lesson of this page. Queen, quilt and quiz all open with the kw sound, and explaining that q and u are a packaged deal ("q is shy, it brings u everywhere") gives the letter a story, and stories are what rare letters need. Q appears in maybe one word per hundred; the story is why a child bothers to remember it.',
      'The shape is O with a tail — capital Q is a circle with a flick at the bottom right, lowercase q a circle with a descending tail. Set this page next to the letter O page and the family resemblance does half the work. The tail below the line also enrolls q in the descender club with g, j, p and y; children who have colored those pages will spot the pattern before you mention it.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Q brings U everywhere',
        body: 'Say the pair as one unit: kwuh, kwuh, queen. Write qu on a scrap card next to the page. Teaching q-and-u as one sound from day one prevents the most common q spelling error before it exists.',
      },
      {
        title: 'Crown the Q',
        body: 'Queen leads the word row, so the capital Q earns a crown: draw jewels along its top arc. When a letter gets a costume, it gets remembered — this is the most reliable trick in the rare-letter toolbox.',
      },
      {
        title: 'Quiet as a quiz',
        body: 'Play five-questions: five things that start with qu — quick, quiet, quilt, quarter, question. Fast oral recall after coloring locks the sound in, and five is a count a preschooler can win.',
      },
    ],
    faqs: [
      {
        q: 'What Q words are on this coloring page?',
        a: 'Queen, quilt and quiz — all running the qu pairing, which is how q appears in essentially every word a young child reads. Quail is the draw-box regular; quiet makes a frequent appearance as a labeled drawing of... nothing, which is arguably genius.',
      },
      {
        q: 'Why does Q always have a U after it?',
        a: 'Because q on its own would make a k sound — the u is what turns it into the kw sound English spells as qu. Teaching them as one package (q brings u everywhere) matches how reading programs introduce it and dodges the most common q spelling mistake.',
      },
      {
        q: 'How is Q different from O?',
        a: 'A tail. Capital Q is a circle with a flick at the bottom; lowercase q is a circle with a tail that dives below the line. Print the O page alongside this one — the two colored side by side make the difference impossible to miss.',
      },
      {
        q: 'What age is this letter Q coloring page for?',
        a: 'Four to six. Q usually arrives late in letter-of-the-week order, so users skew preschool-to-kindergarten; the crown-drawing extension keeps the older end engaged past plain coloring.',
      },
    ],
    sheet: {
      capital: 'Q',
      lower: 'q',
      words: ['Queen', 'Quilt', 'Quiz'],
      wordNote: 'Q never travels alone — qu says kwuh. Queen, quilt, quiz, all three bring their u.',
      drawPrompt: 'a queen\'s crown with a quilt cape, or a quiz show on TV',
    },
  },

  {
    slug: 'r',
    hub: 'coloring',
    h1: 'Letter R Coloring Pages',
    metaTitle: 'Letter R Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Free letter R coloring page: bubble R and r, rain-robot-rocket, a trace row, and a draw-your-own box. Two pages, prints clean, free.',
    lead:
      'Bubble R and r, rain, robot and rocket to color, a trace row, and a draw box. Two pages — and the rocket usually wins the box.',
    introHeading: 'The growling letter',
    intro: [
      'R is a growl with the tongue hovering — rr, never quite touching. English speakers barely roll it, but children can feel it: hold the r sound at the front of rain and it runs like a small motor. Rain, robot and rocket all fire it forward, and rocket is the word that turns this page into an event — a colored rocket in the draw box, complete with flame tiers, is one of the most ambitious drawings the whole matrix receives.',
      'The shape: capital R is a spine, a loop on top, and a kicking leg; the lowercase keeps the spine and loop and swaps the kick for a small arm. That leg-vs-arm difference is the whole R-to-r lesson and a good color-splitting opportunity — loop one color, leg or arm another. R also starts roughly a thousand words a kindergartner actually wants to say, which keeps demand for this page steady all year.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Motorboat the r',
        body: 'Hold the r sound — brrrm, like a motor — while coloring one long stroke. R is the engine sound, and children who play motorboat once will narrate the whole page with engine noises. Welcome it; the sound is being drilled.',
      },
      {
        title: 'Loop and leg, two colors',
        body: 'Color the R\'s top loop one color and its kicking leg another. Naming the parts while coloring — loop, leg — builds the anatomy vocabulary that makes letter-formation instruction land later.',
      },
      {
        title: 'Rocket engineering',
        body: 'Draw the rocket in the draw box with numbered stages: 1, 2, 3 from flame to nose. It is a letter page quietly teaching sequencing, and the numbered-stage rocket is a pattern children copy for weeks.',
      },
    ],
    faqs: [
      {
        q: 'What R words can my child color here?',
        a: 'Rain, robot and rocket in the bubble row. Rabbit and rainbow dominate the draw box — rainbows especially, because they solve two letters at once: r for rainbow, every color in order for free.',
      },
      {
        q: 'How do you explain the r sound?',
        a: 'Tongue bunched and hovering, never touching: a small growl or motor. English r is smoother than the rolled r of Spanish — for kids, "motorboat sound" is the image that works. Rain, robot, rocket give it three front-loaded reps on the sheet.',
      },
      {
        q: 'What age is this letter R coloring page for?',
        a: 'Three to six. The diagonal leg makes the capital a touch harder for toddlers than circle letters, but robot-and-rocket enthusiasm reliably carries older fours and fives through the whole sheet.',
      },
      {
        q: 'Why do kids replace r with w (rnning for running)?',
        a: 'Because r and w sit close together in a young child\'s sound inventory — a normal developmental substitution that resolves with practice, not correction. Coloring r pages and saying the three r-words slowly gives the sound more clean reps, which is exactly the practice that helps.',
      },
    ],
    sheet: {
      capital: 'R',
      lower: 'r',
      words: ['Rain', 'Robot', 'Rocket'],
      wordNote: 'The motorboat sound — rr, tongue hovering, engine running.',
      drawPrompt: 'a rocket with numbered stages, or a robot doing chores',
    },
  },

  {
    slug: 's',
    hub: 'coloring',
    h1: 'Letter S Coloring Pages',
    metaTitle: 'Letter S Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter S coloring page with bubble S and s, sun-sock-star, a trace row, and a draw box. Free, two pages, no sign-up.',
    lead:
      'Bubble S and s, sun, sock and star to color, a trace row, and a draw box. The snake letter gets its page — hiss while you color.',
    introHeading: 'The letter that hisses',
    intro: [
      'S is the snake: a continuous hiss with no stops — sssss, sustainable for as long as a breath, which makes it the best sound on the whole alphabet for the hold-the-sound-while-you-color game. Sun, sock and star all start with it, and sun is the most colored single word on this page — yellow crayons come out first, universally. Star takes silver or gold and anchors the draw box, where stars reproduce at a rate no other letter approaches.',
      'The shape is the hardest curve in the uppercase set: two opposing bends, a spine that switches direction twice. Expect the capital S to challenge a toddler\'s crayon — and expect the lowercase s, which is a smaller version of the same switchback, to get colored more neatly, because small shapes are easier than big ones for the same reason. The snake association is the memory hook: color the S green, add a tongue, and the letter becomes a craft.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Hiss through one stroke',
        body: 'S can be held for a whole breath: ssssss. Challenge your child to hiss from the top of the capital S to the bottom without stopping. It is the longest-running phoneme game on the site and it never stops being funny.',
      },
      {
        title: 'Snake craft mode',
        body: 'Color the S green, glue on a paper tongue, add dot eyes. The letter becomes a snake craft, and the switchback shape — the hardest part of S — has now been handled twice without complaint.',
      },
      {
        title: 'Star count',
        body: 'Stars are the draw-box favorite. Draw five, count them, then give each a different size. S is for star and for small-smaller-smallest — serendipitous size vocabulary in one drawing.',
      },
    ],
    faqs: [
      {
        q: 'What S words are on this coloring page?',
        a: 'Sun, sock and star. Snake is the obvious fourth — it is the letter\'s mascot — and spider and snowman rotate through the draw box by season, with snowman owning December and January outright.',
      },
      {
        q: 'Why is the letter S hard for young children to write?',
        a: 'Two opposing curves in one stroke — the hand has to switch direction mid-letter, which no other common letter asks for as sharply. Coloring the outline first builds the switchback into the hand before any pencil attempt, which is the entire argument for this page.',
      },
      {
        q: 'What sound does S make?',
        a: 'A hiss — sss — made with teeth nearly closed and air pushed through. It is unvoiced like f (breath only), which is why it can be held so long. Its voiced twin is z, and S even borrows that sound in words like nose and roses — a later lesson.',
      },
      {
        q: 'What age is this letter S coloring page for?',
        a: 'Three to six. The switchback shape challenges toddlers honestly — expect the capital S to look expressive rather than tidy — while the hiss game and snake craft keep preschoolers and kindergartners at the table.',
      },
    ],
    sheet: {
      capital: 'S',
      lower: 's',
      words: ['Sun', 'Sock', 'Star'],
      wordNote: 'Teeth almost closed, air hissing through: sssss. Hold it across one whole stroke.',
      drawPrompt: 'a star with a face, or a snake wearing sunglasses',
    },
  },

  {
    slug: 't',
    hub: 'coloring',
    h1: 'Letter T Coloring Pages',
    metaTitle: 'Letter T Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Free letter T coloring page to print: bubble T and t, tree-train-tiger, a trace row, and a draw-your-own box. Two pages, no watermark.',
    lead:
      'Bubble T and t, tree, train and tiger to color, a trace row, and a draw box. Two pages — the tick-tock letter, printed free.',
    introHeading: 'The tick-tock letter',
    intro: [
      'T is a clock tick: tongue taps the ridge behind the top teeth and releases — tuh, one clean strike, over before it starts. Tree, train and tiger all open with the tap, and train is the favorite word among vehicle-obsessed households, which is a large demographic. Tiger is the favorite animal among the same households, so this page carries two strong draws plus the tree, which is the easiest big drawing in the alphabet and fills draw boxes on the days ambition runs low.',
      'The shape is the simplest cross in the alphabet: one vertical, one horizontal, capital on a taller spine than lowercase. T and I are the two easiest uppercase letters to color, which makes this a good early page in any letter-of-the-week sequence. The t sound pairs with d — same tap, d voiced and t just air — and holding fingers on the throat to feel the difference is the quick science demo for this page.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Tick-tock tapping',
        body: 'Tap a rhythm on the table — tick, tock, tick, tock — while saying t-words in rhythm: tree, train, tiger. T is a percussive sound and the tapping matches it, the same trick the d page uses with drums.',
      },
      {
        title: 'T versus D throat check',
        body: 'Fingers on the throat: say tuh (silent), then duh (buzz). Same tap, one with voice and one without. The buzz-switch demo takes ten seconds and explains a distinction most children feel long before they can name.',
      },
      {
        title: 'Tree through the seasons',
        body: 'Draw one tree in the draw box four times across the year — bare, blossoming, full, snowy. It is the longest-running draw-box project on the site and quietly teaches seasons while the t sound repeats.',
      },
    ],
    faqs: [
      {
        q: 'What T words are on this coloring page?',
        a: 'Tree, train and tiger. Turtle and tooth take regular draw-box space, and around October the page fills with trick-or-treat labels — t owns more holiday vocabulary than any other letter except maybe h.',
      },
      {
        q: 'How do T and D differ?',
        a: 'Voice. Both are the same tongue tap; t carries only air, d carries voice from the throat. Fingers on the throat make the difference instantly feelable — tuh is quiet, duh buzzes. It is the same pair as p and b, one step up the alphabet.',
      },
      {
        q: 'What age is this letter T coloring page for?',
        a: 'Three to six. The simple cross shape suits the youngest colorers, and the train-tiger combination keeps the older end drawing long after the letter itself is colored — this page runs long in the best way.',
      },
      {
        q: 'Is the letter T the same in this sheet and on a typewriter?',
        a: 'Yes — T has no confusing printed variants, unlike a (two-story) or g (loop vs hook). Its shape is stable across every font a child will meet, which quietly makes it one of the most reliable early-reading letters.',
      },
    ],
    sheet: {
      capital: 'T',
      lower: 't',
      words: ['Tree', 'Train', 'Tiger'],
      wordNote: 'One clean tongue-tap: tuh, like a clock tick. D is the same tap with a buzz.',
      drawPrompt: 'a train pulling tiger-shaped cars, or a tree through all four seasons',
    },
  },

  {
    slug: 'u',
    hub: 'coloring',
    h1: 'Letter U Coloring Pages',
    metaTitle: 'Letter U Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter U coloring page: bubble U and u, umbrella-unicorn-under, a trace row, and a draw-your-own box. Free, two pages.',
    lead:
      'Bubble U and u, umbrella, unicorn and under to color, a trace row, and a draw box. Two pages for the upside-down cup of the alphabet.',
    introHeading: 'The cup that catches rain',
    intro: [
      'U is a cup — the only letter whose shape is also a usable object. Turn it upside down and it holds nothing; right side up, children immediately see an umbrella, which is conveniently the first word on the sheet. The sound is uh, the short u of umbrella and under, and short u is famously the hardest vowel for children to hear cleanly because it sits in the middle of the mouth with almost no distinguishing feature. Coloring it gives the vague sound one more concrete anchor.',
      'Unicorn is the real engine of this page. Unicorns dominate early-childhood culture to a degree no other u-word approaches, and the draw box on this page fills with unicorns at a rate second only to rockets and stars. The long-u conversation (unicorn says yoo, umbrella says uh) is worth having out loud while coloring — the two words on the same row deliberately disagree, and children who notice are doing exactly the phonics work reading programs will ask for later.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Cup the letter',
        body: 'Cup two hands together — that is u. Say uh while holding the cup, then pretend to catch rain. The shape-sound pairing is physical, which is the fastest route into a vowel this vague.',
      },
      {
        title: 'Umbrella craft',
        body: 'Color the umbrella word, then in the draw box draw the biggest umbrella the paper allows and decorate each panel differently. April makes this the seasonal page of the whole matrix.',
      },
      {
        title: 'Two u sounds, out loud',
        body: 'Point at umbrella (uh) and unicorn (yoo) on the same row and say both. The disagreement is intentional: u is the letter where children first meet the idea that one letter can carry two sounds — let them spot it.',
      },
    ],
    faqs: [
      {
        q: 'What U words are on this coloring page?',
        a: 'Umbrella, unicorn and under — a deliberately mixed row: umbrella runs the short uh, unicorn runs the yoo sound, and under is the positional word teachers like because it can be acted out (the crayon is under the chair).',
      },
      {
        q: 'Why is short u hard for children to hear?',
        a: 'Because it is the most neutral vowel in the mouth — tongue relaxed, nothing distinctive to feel. Children confuse it with short o and short e for years. Every concrete anchor helps, which is what a colored umbrella on a page does.',
      },
      {
        q: 'What age is this letter U coloring page for?',
        a: 'Three to six, with the unicorn economy pulling in the full range. The cup shape is easy for toddlers; the two-sounds conversation gives kindergartners a genuine pre-reading insight if anyone stops to point at it.',
      },
      {
        q: 'Is U the same shape as V?',
        a: 'U is the rounded cup, V the sharp valley — same skeleton, different corners. Coloring both pages in one sitting teaches the contrast cleanly, and children usually land on "u is the smooth one" as their memory rule.',
      },
    ],
    sheet: {
      capital: 'U',
      lower: 'u',
      words: ['Umbrella', 'Unicorn', 'Under'],
      wordNote: 'Umbrella says uh; unicorn says yoo. One letter, two sounds — spot the difference.',
      drawPrompt: 'a unicorn under a giant umbrella',
    },
  },

  {
    slug: 'v',
    hub: 'coloring',
    h1: 'Letter V Coloring Pages',
    metaTitle: 'Letter V Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Free letter V coloring page: bubble V and v, van-violin-volcano, a trace row, and a draw-your-own box. Two pages, prints clean, free.',
    lead:
      'Bubble V and v, van, violin and volcano to color, a trace row, and a draw box. Two pages — the valley letter, vibrating for free.',
    introHeading: 'The valley letter',
    intro: [
      'V is a valley — two slopes meeting in one sharp point, the letter version of the letter U with its curve sharpened to an edge. The sound is vvv: top teeth on bottom lip, voice buzzing behind it. That buzz is the entire lesson: v is f\'s loud twin, exactly the pairing p and b have one row up the alphabet. Hold fingers on the throat, say fff (silent), then vvv (buzz), and the letter explains itself in ten seconds.',
      'Van, violin and volcano front-load the buzz, and volcano is the heavyweight draw of the page — an erupting volcano in the draw box, red at the top and brown below, is one of the most dramatic regulars in the whole matrix. V itself is a rarer starting letter (the vocabulary picks thin out fast after violin), which makes the draw box carry more of this page than usual. Let it; a volcano is doing more teaching per square inch than any second word row would.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'F and F\'s loud twin',
        body: 'Teeth on lip for both: fff is breath only, vvv adds the throat buzz. Fingers on the throat, alternate the two. V is the clearest voiced-unvoiced pair in the alphabet and this demo is its best ten seconds.',
      },
      {
        title: 'Trace the valley',
        body: 'Walk two fingers down one slope and up the other before coloring — down, point, up. The finger path is the pre-writing rehearsal, and V\'s single point makes the direction change impossible to miss.',
      },
      {
        title: 'Volcano countdown',
        body: 'Draw the volcano in the draw box and count down from five, then erupt with a long vvvvv. Countdown-plus-eruption is the repeatable game this page generates, and every repeat is another v rep.',
      },
    ],
    faqs: [
      {
        q: 'What V words are on this coloring page?',
        a: 'Van, violin and volcano. Vacuum and vegetables are the frequent extensions, and vase appears whenever someone\'s household has fresh flowers. V is a thin letter for vocabulary — the volcano carries this page, and everyone knows it.',
      },
      {
        q: 'What sound does V make?',
        a: 'A buzz with teeth on lip: vvv — the voiced twin of f. Say both with fingers on your throat and feel the switch from silent to buzzing. That pairing (f/v) is the same structure as p/b and t/d, one row apart.',
      },
      {
        q: 'What age is this letter V coloring page for?',
        a: 'Three to six. The two-slope shape colors easily for toddlers, and the volcano draw gives the page its drama for the older end — eruptions are the most-repeated draw-box performance on the site.',
      },
      {
        q: 'Is V the same shape as U?',
        a: 'Same skeleton, sharpened corners: V is the valley, U the smooth cup. Children who color both pages usually invent the memory rule themselves — "v is pointy, u is round" — and self-invented rules are the durable kind.',
      },
    ],
    sheet: {
      capital: 'V',
      lower: 'v',
      words: ['Van', 'Violin', 'Volcano'],
      wordNote: 'Teeth on lip, voice buzzing: vvv — f\'s loud twin. Feel the throat switch.',
      drawPrompt: 'a volcano mid-eruption, counted down from five',
    },
  },

  {
    slug: 'w',
    hub: 'coloring',
    h1: 'Letter W Coloring Pages',
    metaTitle: 'Letter W Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter W coloring page with bubble W and w, whale-web-watermelon, a trace row, and a draw box. Free, two pages, no sign-up.',
    lead:
      'Bubble W and w, whale, web and watermelon to color, a trace row, and a draw box. Two pages for the only letter with three-letter name.',
    introHeading: 'Two valleys in one letter',
    intro: [
      'W is V done twice — two valleys, four slopes, the longest letter to write and the only one whose name takes three syllables to say (double-u, which is also the only letter named for another letter). The sound is a rounded puff: wuh, lips pushed forward like the start of oo. Whale, web and watermelon all front-load it, and watermelon is the seasonal heavyweight — this page spikes every summer without anyone planning it.',
      'Whale is the animal that makes the page. A colored whale with a fountain on top is a preschool keepsake, and whales are forgiving to draw — one big curve, a tail, a spout. The w sound is also the first sound of wonder and wow, which are conveniently the two reactions this page gets; narrate them ("wow, what a whale") and the letter gets two more reps disguised as praise.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Fish-kiss lips',
        body: 'The w sound starts with lips rounded and pushed forward — the fish-kiss face. Make the face, hold it, say wuh. The face is silly enough that children repeat it, and every repeat is a clean w.',
      },
      {
        title: 'Four slopes, four colors',
        body: 'The capital W has four slopes. Color them in alternating colors — down, up, down, up — and count the valleys: two. W is where V\'s lesson (last week, presumably) compounds into a pattern.',
      },
      {
        title: 'Watermelon season math',
        body: 'Draw a watermelon slice in the draw box and count the seeds: six, eight, whatever the crayon supplies. W pages double as counting pages every summer, and the seeds make the drawing look finished fast.',
      },
    ],
    faqs: [
      {
        q: 'What W words are on this coloring page?',
        a: 'Whale, web and watermelon. Wolf and windmill are the regular draw-box tenants, and worm shows up constantly despite the w-w difficulty — usually drawn wearing a hat, for reasons the site cannot explain.',
      },
      {
        q: 'Why is W called double-u when it looks like double-v?',
        a: 'History: in Roman times the letter was written as two u\'s (VV and UU were interchangeable), and the name double-u stuck even as print shapes drifted toward double-v. Children find this infuriating and delightful in equal measure — either reaction aids memory.',
      },
      {
        q: 'How do you make the w sound?',
        a: 'Lips rounded and pushed forward, then release into the vowel: wuh. It is the same mouth shape as oo (moon) gliding into whatever comes next — fish-kiss face first, sound second. Whale, web and watermelon give it three clean reps on the sheet.',
      },
      {
        q: 'What age is this letter W coloring page for?',
        a: 'Three to six. The double-valley shape is more crayon travel than most letters — satisfying for fours and fives — and the whale draw keeps the whole age range at the table longer than the letter alone would.',
      },
    ],
    sheet: {
      capital: 'W',
      lower: 'w',
      words: ['Whale', 'Web', 'Watermelon'],
      wordNote: 'Fish-kiss lips, then release: wuh. Whale, web, watermelon — three puffs.',
      drawPrompt: 'a whale with a big fountain, or a web with one friendly spider',
    },
  },

  {
    slug: 'x',
    hub: 'coloring',
    h1: 'Letter X Coloring Pages',
    metaTitle: 'Letter X Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter X coloring page: bubble X and x, X-ray, fox and box to color (x at the end!), a trace row, and a draw box. Free, no sign-up.',
    lead:
      'Bubble X and x, an X-ray to color, and — because x mostly hides at the end of words — a fox and a box. A trace row and a draw box finish the page.',
    introHeading: 'The letter that hides at the end',
    intro: [
      'X is the alphabet\'s shape celebrity and its sound introvert. The shape — two crossing lines — is the easiest uppercase construction to color and the first letter children recognize in the wild (no-parking signs, treasure maps, parenthesis-free hugs and kisses at the bottom of Grandma\'s letters). The sound, meanwhile, almost never starts an English word: x works for its living at the end — fox, box, six — where it delivers a crisp ks.',
      'This page teaches that reality honestly. The word row carries X-ray (the famous exception), then fox and box, and the word note on the sheet says plainly that x rides at the end. Children who learn x this way — one X-ray up front, two ending-sounds beside it — are structurally prepared for the reading of six, mix and box, which every kindergarten reader hits within months. Treasure maps in the draw box are practically mandatory.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Treasure map mandatory',
        body: 'The draw box gets a treasure map: dotted trail, landmarks, a big X. X marks the spot is the letter\'s cultural home, and the map gives the crossing shape a story every child retells unprompted.',
      },
      {
        title: 'Circle the x at the end',
        body: 'After coloring, point at fox and box and circle the x at the end of each. The explicit gesture teaches the ending-sound pattern — the single most useful x fact a beginning reader can own.',
      },
      {
        title: 'Cross two strokes',
        body: 'Color one diagonal of the X all one color, then the other diagonal in a second color — stroke one, stroke two, crossing in the middle. X is two letters\' worth of stroke practice in one outline.',
      },
    ],
    faqs: [
      {
        q: 'What X words are on this coloring page?',
        a: 'X-ray, fox and box — one word with x up front, two with x doing its usual job at the end. The sheet says so on its word note, because teaching x as an ending letter is the honest version and the reading-ready version.',
      },
      {
        q: 'Why do most X words put X at the end?',
        a: 'English borrowed its x words from Greek and Latin, where ks simply settled at word ends (fox, box, six, mix). True starting-x words are almost all Greek (X-ray, xylophone) and rare. Ending-x is the pattern children meet in every early reader.',
      },
      {
        q: 'What sound does X make?',
        a: 'Two sounds in one: ks, a crisp k immediately followed by s — fox, box, six. (X-ray softens to just the z-like gz in some words, but ks is the sound this page teaches and the one early readers need.)',
      },
      {
        q: 'What age is this letter X coloring page for?',
        a: 'Three to six. The crossing shape is the easiest capital on the whole matrix for toddlers, and the treasure-map draw keeps every age busy — X marks the spot has no upper age limit.',
      },
    ],
    sheet: {
      capital: 'X',
      lower: 'x',
      words: ['X-ray', 'Fox', 'Box'],
      wordNote: 'X usually rides at the END: fox, box. X-ray is the famous exception.',
      drawPrompt: 'a treasure map with a giant X at the spot',
    },
  },

  {
    slug: 'y',
    hub: 'coloring',
    h1: 'Letter Y Coloring Pages',
    metaTitle: 'Letter Y Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Free letter Y coloring page: bubble Y and y, yo-yo, yarn and yak to color, a trace row, and a draw-your-own box. Two pages, free.',
    lead:
      'Bubble Y and y, yo-yo, yarn and yak to color, a trace row, and a draw box. Two pages for the alphabet\'s part-time vowel.',
    introHeading: 'The letter with two jobs',
    intro: [
      'Y works two jobs. At the front of a word it is a consonant — yuh, as in yo-yo, yarn and yak, the three words on this page. At the end of a word it moonlights as a vowel: happy, my, funny, where it says ee or eye. This page teaches the front-of-the-word job, but the two-jobs story is worth telling out loud while coloring, because children meet y-at-the-end in nearly every early reader (my, by, happy, very) and knowing the letter moonlights makes the meeting less confusing.',
      'The shape is v on a stalk: the capital pairs one diagonal going down with one going up, then drops a stem to the baseline; the lowercase keeps the small v-cup atop a longer stem that dives below the line — y is a descender, in the g-j-p-q club, and children who have colored those pages will spot the basement tail immediately. Yo-yo is the star word: it is a palindrome, it is a toy, and it is the only word on the sheet children can act out mid-coloring.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Yo-yo while you color',
        body: 'If an actual yo-yo is in the house, deploy it: one trick, one y-word — yo-yo, yarn, yak, yell. The toy anchors the sound and burns energy, which are the two services a letter page most needs.',
      },
      {
        title: 'Y says ee at the end',
        body: 'Say happy, silly, funny and listen to the last sound — y is doing ee\'s job. One sentence of explanation now prevents the classic "why does happy end with y?" revolt in kindergarten.',
      },
      {
        title: 'Yarn art',
        body: 'Yarn is on the sheet, so glue real yarn onto the draw-box Y — wiggle curves, different colors. Letter-plus-craft pages survive on refrigerators for months; this one is the easiest glue project in the matrix.',
      },
    ],
    faqs: [
      {
        q: 'What Y words are on this coloring page?',
        a: 'Yo-yo, yarn and yak — all consonant-y words with the yuh sound at the front. Yellow is the most-requested extra and the easiest draw-box tenant; yawn is the funniest to act out mid-session.',
      },
      {
        q: 'Is Y a vowel or a consonant?',
        a: 'Both, by position: yuh at the front of yo-yo is a consonant; the y at the end of happy works as a vowel saying ee (and says eye in my and fly). This page teaches the consonant job; the vowel job is worth naming out loud once.',
      },
      {
        q: 'Does lowercase y go below the line?',
        a: 'Yes — its tail dives below the baseline, putting y in the descender club with g, j, p and q. Children who have colored those pages spot the pattern on sight; the tail is also the one part of y that handwriting practice will later treat specially.',
      },
      {
        q: 'What age is this letter Y coloring page for?',
        a: 'Four to six. Y usually arrives late in letter-of-the-week sequences, and the yo-yo draw plus the yarn craft keep the older preschool and kindergarten range engaged past the coloring itself.',
      },
    ],
    sheet: {
      capital: 'Y',
      lower: 'y',
      words: ['Yo-yo', 'Yarn', 'Yak'],
      wordNote: 'Yuh at the front: yo-yo, yarn, yak. At the end of happy, y sneaks in as a vowel.',
      drawPrompt: 'a yak holding a yo-yo, or a ball of rainbow yarn',
    },
  },

  {
    slug: 'z',
    hub: 'coloring',
    h1: 'Letter Z Coloring Pages',
    metaTitle: 'Letter Z Coloring Pages — 6 Designs to Color | ChartGlade',
    metaDescription:
      'Printable letter Z coloring page: bubble Z and z, zebra-zipper-zoo, a trace row, and a draw-your-own box. Free, two pages, no sign-up.',
    lead:
      'Bubble Z and z, zebra, zipper and zoo to color, a trace row, and a draw box. The alphabet\'s finale gets its own page — end with a buzz.',
    introHeading: 'The last letter, a fast buzz',
    intro: [
      'Z finishes the alphabet and buzzes while it does it: zzz, the voiced twin of s, teeth nearly closed with the throat humming. Hold a finger to your throat and alternate sss (silent) with zzz (buzz) — the same demo the s page ran, now on the loud side. Zebra, zipper and zoo carry the buzz, and zoo is the heavyweight: every zoo animal in existence is eligible for the draw box, which makes z\'s finale the highest-ceiling drawing page in the matrix.',
      'The shape is lightning: three zigzag strokes, two sharp corners, no curves anywhere. That geometry makes z the fastest capital to color for children who like strong angles and the most confusing for children still mastering direction switches — same challenge the s page posed, in a harder rhythm. The lowercase z is the same zigzag compressed, and tracing it after coloring is a genuine pre-handwriting workout: three direction changes in one small letter.',
    ],
    printNote: 'Prints on two letter pages: six pictures to color, then the practice sheet.',
    tips: [
      {
        title: 'Buzz versus hiss',
        body: 'Alternate sss and zzz with fingers on the throat — silent, then buzzing. Z is s with the voice switched on, and hearing both in one minute is the cleanest voiced-unvoiced demo on the site.',
      },
      {
        title: 'Sleepy z\'s',
        body: 'Z is the universal symbol for sleep — comic-strip snores are zzz. Color the letter, then draw a sleeping cat in the draw box wearing a trail of z\'s. The symbol connection makes z feel famous rather than rare.',
      },
      {
        title: 'Zigzag race',
        body: 'Draw a zigzag line across the draw box — fast, sharp, no curves — then color between the zigzags. It is z\'s own geometry practiced as a game, and it is the best pencil-control warm-up this page produces.',
      },
    ],
    faqs: [
      {
        q: 'What Z words are on this coloring page?',
        a: 'Zebra, zipper and zoo. Zero is the most-requested extra — the number connection makes it a two-curricula word — and zigzag appears in every draw box whether anyone assigns it or not.',
      },
      {
        q: 'What sound does Z make?',
        a: 'A buzz: zzz — the voiced version of s\'s hiss. Teeth nearly closed, throat humming, sustainable for a whole breath. Zebra, zipper and zoo all open with it, and the sleepy-zzz symbol children already know is literally the sound.',
      },
      {
        q: 'Is Z really the rarest letter in English?',
        a: 'Essentially yes — z appears in about one word in a thousand, which is why this page leans on zoo and zebra for vocabulary. Rare letters need stories more than drills; z\'s story is that it ends the alphabet and buzzes while doing it.',
      },
      {
        q: 'What age is this letter Z coloring page for?',
        a: 'Three to six. Z traditionally closes letter-of-the-week year — many classrooms celebrate with a zoo trip — and the page is built for that finale: the draw box was designed knowing a whole zoo is about to be filed into it.',
      },
    ],
    sheet: {
      capital: 'Z',
      lower: 'z',
      words: ['Zebra', 'Zipper', 'Zoo'],
      wordNote: 'The sleepy buzz: zzz — s\'s hiss with the voice switched on.',
      drawPrompt: 'a zoo in one box: as many animals as the paper holds',
    },
  },
];

/** One seasonal cross-link per letter, rotating through the holiday CBN pages. */
const THEMED_LINKS = [
  { href: '/christmas-color-by-number/', label: 'Christmas color-by-number (coloring meets math)' },
  { href: '/thanksgiving-color-by-number/', label: 'Thanksgiving color-by-number (coloring meets math)' },
  { href: '/halloween-color-by-number/', label: 'Halloween color-by-number (coloring meets math)' },
];

export const coloringLetters: ColoringLetterDef[] = RAW.map((def, i) => {
  const prev = RAW[(i + RAW.length - 1) % RAW.length];
  const next = RAW[(i + 1) % RAW.length];
  return {
    ...def,
    related: [
      { href: '/coloring/', label: 'All coloring pages — the letter matrix and more' },
      { href: `/coloring/letters/${prev.slug}/`, label: `Letter ${prev.sheet.capital} coloring page` },
      { href: `/coloring/letters/${next.slug}/`, label: `Letter ${next.sheet.capital} coloring page` },
      THEMED_LINKS[i % THEMED_LINKS.length],
    ],
    // Every sheet is the same layout, so the PNG dims are uniform across the
    // matrix (sheetImages.test.ts guards declared dims against the files).
    sheetImage: {
      src: `/images/letter-${def.slug}-coloring-page.png`,
      // Every letter shoots the six-drawing gallery (.lc-gallery) — the
      // incumbent form, where the pictures are the product (PLAN timeline
      // 2026-11-03). Heights are the pipeline's logged values: letter-a
      // snaps one device pixel taller than the rest at 2x.
      ...(hasLetterArt(def.slug)
        ? {
            alt: `Free printable letter ${def.sheet.capital} coloring pages — six designs to color: ${def.sheet.words.join(', ').toLowerCase()} pictures plus three big letter ${def.sheet.capital} designs.`,
            width: 1916,
            height: def.slug === 'a' ? 1510 : 1508,
            caption: `Letter ${def.sheet.capital}: six pictures to color — ${def.sheet.words.join(', ').toLowerCase()} and three big-letter designs.`,
          }
        : {
            alt: `Free printable letter ${def.sheet.capital} coloring page — big bubble ${def.sheet.capital} and ${def.sheet.lower} to color, the words ${def.sheet.words.join(', ')}, a trace row, and a draw-your-own box.`,
            width: 2016,
            height: 1334,
            caption: `Letter ${def.sheet.capital}: color the bubbles, color the words, trace, then draw ${def.sheet.drawPrompt}.`,
          }),
    },
  };
});
