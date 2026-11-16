import type { PageDef } from './pageTypes';
import { defHref, familyGallery } from './variantGallery';

/**
 * 100th Day of School cluster (11/16 batch, judged against the US school
 * calendar: August-start districts hit day 100 in late January, Labor-Day
 * districts in February — pages ship early December so Google can index and
 * rank them before the spike, per the 4-6-week rule). Four printables + a
 * hub, riding the existing PageDef pipeline. Volume data (user AITDK pull,
 * 11/16): 100th day of school 9,900/KD 13 + activities 1,300/KD 6 — 11.2K
 * combined over the 10K family line. Sub-page words (glasses, roll to 100,
 * writing prompt, certificate) ride the family; SERP teardown 11/16 found
 * idea-listicles (happyheartsin1st, WeAreTeachers) and one same-form
 * incumbent (Superstar Worksheets' 100-days page) — no big-publisher wall.
 */

export const hundredDayPages: PageDef[] = [
  {
    slug: '100th-day-glasses',
    hub: 'hundred-day',
    h1: '100th Day of School Glasses',
    metaTitle: '100th Day of School Glasses — Free Printable Template | ChartGlade',
    metaDescription:
      'Free printable 100th day of school glasses: a "100" frame kids color, cut and wear. Bold outlines, dashed fold lines, one letter page — no sign-up.',
    lead:
      'The "100" glasses are the photo of the day: two lens circles for the zeros, a bold 1 for the end piece, and arms that fold back and tape to fit. Color them, cut the solid lines, fold the dashed ones, tape the arms — then parade. One letter page, cardstock if you have it.',
    introHeading: 'How the template is built',
    intro: [
      'The frame spells the number: a big serif 1 on the left, two circle lenses as the zeros. Every line a child cuts is solid; every line they fold is dashed, and the difference is printed right on the sheet so non-readers can follow the legend too. The lens holes cut out completely — the glasses are worn on the face, not held — and the arms fold back at the tabs, then tape (or staple) at whatever length fits the wearer. Kindergarten arms land around five inches; adults need the full arm plus a repeat strip.',
      'Paper choice decides how long they survive the party. Standard copy paper wears by the second try-on; a cardstock sheet (or a copy-paper sheet glued to a cereal-box panel before cutting) lasts the whole rotation and the bus ride home. Leave decorating before cutting: with the frame still whole, the paper lies flat and the color stays inside the outlines. The classic move is one color per digit — red 1, blue zeros — so the number reads from across the room in the hallway photo.',
    ],
    printNote: 'One letter page, portrait. Print on cardstock for all-day wear; copy paper works with tape-reinforced arms.',
    sheetImage: {
      src: '/images/100th-day-glasses-printable.png',
      alt: 'Free printable 100th day of school glasses template — a "100" shaped frame with two circle lenses, dashed fold lines and tape-on arms, on one letter page.',
      width: 2016,
      height: 1506,
    },
    tips: [
      {
        title: 'Color first, cut second',
        body: 'A whole sheet colors flat in two minutes; a cut frame colors in a wobbly hand. Finish all the decorating before the first snip, then cut — the outlines double as coloring boundaries either way.',
      },
      {
        title: 'Press the folds with a ruler',
        body: 'Crease the dashed tabs by folding over a ruler edge and pressing flat. Sharp folds are what keep the arms pointing back instead of drooping into the wearer’s cheeks by mid-parade.',
      },
      {
        title: 'Fit before the photo',
        body: 'Tape one arm, try the glasses on, then set the second arm to the measured length. Two minutes of fitting saves the do-over in every class photo — and keep a strip of spare tape on your desk for the inevitable.',
      },
      {
        title: 'Older kids design the frame',
        body: 'Grades 3-5 find plain coloring babyish — hand them the sheet as a design brief instead: patterns inside the digits, a rhinestone bridge, a theme from a book the class just finished. The template is the starting point, not the ceiling.',
      },
    ],
    faqs: [
      {
        q: 'What grade are the 100th day glasses for?',
        a: 'Kindergarten through second grade wear them straight — color, cut, tape, done. PreK needs help with the lens holes. Grades 3-5 still join in when the sheet is framed as a design-your-own-frame challenge instead of a coloring page.',
      },
      {
        q: 'How do I attach the arms?',
        a: 'Fold the side tabs back along the dashed lines, tape or staple an arm to each tab, then fit: tape one arm, try the glasses on, and set the second arm to the length that reaches the ear. Masking tape holds better than glue on cardstock.',
      },
      {
        q: 'Can I print the glasses in black and white?',
        a: 'Yes — the template is pure black outlines on white, made for crayons and markers. A black-and-white copier print is exactly what it is designed for; the color comes from the kids.',
      },
      {
        q: 'What paper works best?',
        a: 'Cardstock if the copier takes it. On copy paper, glue the sheet to an opened cereal box before cutting — recycled-cardboard backing survives a full school day. Plain paper alone sags by the second wear.',
      },
    ],
    related: [
      { href: '/roll-to-100/', label: 'Roll to 100 dice game' },
      { href: '/100th-day-certificate/', label: '100th day certificate' },
      { href: '/when-i-am-100-writing-prompt/', label: 'When I am 100 writing prompt' },
      { href: '/100th-day-of-school/', label: 'All 100th day printables' },
    ],
  },
  {
    slug: 'roll-to-100',
    hub: 'hundred-day',
    h1: 'Roll to 100',
    metaTitle: 'Roll to 100 — Free Printable Hundred Chart Dice Game | ChartGlade',
    metaDescription:
      'Free printable Roll to 100 game board: a hundred chart that doubles as the 100th day countdown all year, plus a two-dice addition race for the party itself.',
    lead:
      'One hundred chart, two games. All year: color one more box each school day and the chart becomes the countdown to the 100th day itself. On the day: two dice, add the dots, shade the sum — first partnership to claim a row of five wins the board. Print one per student or one per pair.',
    introHeading: 'Two games, one board',
    intro: [
      'The countdown version is the quiet one that runs from September. Each morning the class rolls a die and colors that many more boxes, saying the running total aloud — day one lands on five, day two on nine, and the question "how many boxes are filled?" becomes a daily mental-math warm-up that never feels like one. Because the box count tracks the real days of school, the chart fills to 100 exactly when the 100th day arrives (give or take a snow day), and the last ten boxes get their own ceremony. August-start classrooms finish the countdown in January; September-start rooms in February — the board does not care which.',
      'The dice-race version is the party game. Partners share one board and take turns rolling two dice, adding the dots, and shading the sum — any sum already shaded goes to the roller as a "bump" and they try again next turn (or house-rule it as a skipped turn; pick one before the game starts, not mid-argument). First partnership to shade five boxes in a row — across, down, or diagonal — calls bingo and reads their numbers back to prove it. Reading the row aloud is the audit step: it catches the addition slips that shading hides, and it is where the quietest student gets a speaking part.',
    ],
    printNote: 'One letter page, portrait — rules printed on the sheet above the board. One copy per student (countdown) or per pair (race).',
    sheetImage: {
      src: '/images/roll-to-100-game-printable.png',
      alt: 'Free printable Roll to 100 game — a hundred chart board with two printed rule sets, a daily countdown version and a two-dice addition race, on one letter page.',
      width: 2016,
      height: 1406,
    },
    tips: [
      {
        title: 'Start the countdown on day one',
        body: 'The countdown works only if it starts the first week — tape the chart inside a cabinet door and roll before attendance. A chart started in November still teaches daily sums, but it will not reach 100 by the 100th day, and the kids will count the shortfall out loud.',
      },
      {
        title: 'Say the total, then the hops',
        body: 'After each roll, name the running total, then the moves: "34… 35, 36, 37." The verbal hop-count across the tens (38, 39, 40!) is where the regrouping live — give it the two seconds of pause it deserves.',
      },
      {
        title: 'Race with the tens column visible',
        body: 'Before the dice race, have partners shade the tens column lightly as a landmark. Spotting 47 under the 57 speeds the find, and "down two rows is twenty more" gets said by the students, not the teacher.',
      },
      {
        title: 'The empty board is a worksheet',
        body: 'The last week before the 100th day, hand out a fresh board as a fill-in: blank hundred charts with ten missing numbers per row make the countdown literal — write 1 to 100 yourself, then keep the sheet as the official day-100 board.',
      },
    ],
    faqs: [
      {
        q: 'How does Roll to 100 work?',
        a: 'Two ways, one board. Countdown: roll one die each school day and color that many boxes, watching the chart fill to 100 by the 100th day of school. Dice race: partners take turns rolling two dice, adding the dots and shading the sum on a shared board — first to shade five in a row wins.',
      },
      {
        q: 'What grade is Roll to 100 for?',
        a: 'Kindergartners run the countdown with help saying the running total. Grade 1 owns both versions — the two-dice race is a genuine addition workout. Grade 2 plays it as fluency practice and designs house rules (three dice, multiply the roll) without any reprinting.',
      },
      {
        q: 'What do I need to play?',
        a: 'Two dice, one crayon or pencil per player, and the printed board. The rules print on the sheet, so a substitute can run the game cold. Nothing else — no counters, no cards, no laminating.',
      },
      {
        q: 'Is this the same as a hundred chart?',
        a: 'It is a hundred chart with game rules printed above it. If you want the reference version — skip-counting colors, missing-number puzzles, the plus-ten drills — that lives on our hundred chart page, and the two boards work side by side in the same lesson.',
      },
    ],
    related: [
      { href: '/hundred-chart/', label: 'Hundred chart (the reference version)' },
      { href: '/100th-day-glasses/', label: '100th day glasses template' },
      { href: '/100th-day-of-school/', label: 'All 100th day printables' },
      { href: '/number-line-printable/', label: 'Number line 0-20' },
    ],
  },
  {
    slug: 'when-i-am-100-writing-prompt',
    hub: 'hundred-day',
    h1: 'When I Am 100 Years Old',
    metaTitle: 'When I Am 100 Years Old — Free Printable Writing Prompt | ChartGlade',
    metaDescription:
      'Free printable "When I am 100 years old" writing prompt: a draw-your-face box, five sentence starters on dotted lines — the classic 100th day page, no sign-up.',
    lead:
      'The 100th day writing classic: draw the face you will make at 100, then finish five sentence starters about the century ahead — what you will have learned, where you will have gone, the advice you will give. Dotted baselines for early writers, one framed portrait box, one letter page.',
    introHeading: 'Why this prompt keeps working',
    intro: [
      'A hundred is too big to imagine and just small enough to draw. That is the whole trick of this page: the portrait box forces the number into a face — glasses, gray hair, a wrinkle count some kindergartner will make literal — and once the face exists, the writing has somewhere to go. The five starters follow the same arc a birthday interview would: what you will have done, what you will have seen, what you will know by then. Kindergartners dictate their sentences to an adult and copy the first word; first and second graders write on the baselines; third graders ignore the starters and negotiate for a second portrait box.',
      'The math under the writing is worth surfacing, not skipping. Every student on this page was born a hundred years after someone who is one hundred right now — "you will have been alive since 20XX" is real subtraction the class can do together, and the century framing turns the page into number sense disguised as a craft. Teachers who run the page every year keep them: the "I will have a robot that does my homework" predictions age spectacularly, and a class book of them — one portrait box per page, laminated cover, the year stamped on the front — is the 100th day artifact parents actually ask about at pickup.',
    ],
    printNote: 'One letter page, portrait. The portrait box takes crayon or marker; the baselines suit pencil.',
    sheetImage: {
      src: '/images/when-i-am-100-writing-prompt.png',
      alt: 'Free printable When I Am 100 Years Old writing prompt — a draw-yourself box and five dotted writing lines with sentence starters, on one letter page.',
      width: 2016,
      height: 1206,
    },
    tips: [
      {
        title: 'Brainstorm the century first',
        body: 'Ten minutes of "what will exist in a hundred years that does not now?" loads every starter with material — flying buses, robot dogs, grandmother’s hologram. A blank starter sentence produces a blank page; a loaded brainstorm produces five sentences and a argument over whose future is better.',
      },
      {
        title: 'Interview a real hundred',
        body: 'A two-minute video call with a grandparent or a centenarian news clip turns the page into primary-source work: compare the guest’s hundred years to the student’s imagined one. "They did not have TV at five" lands harder than any worksheet sentence.',
      },
      {
        title: 'Non-writers dictate, then trace',
        body: 'Let pre-writers say the sentence while an adult writes it in yellow marker; the child traces underneath in pencil. The thought still belongs to them — and the traced line reads as handwriting at the class-book level.',
      },
      {
        title: 'Bind the class book same day',
        body: 'One hole punch, one ribbon, one cover page with the year: the book exists before dismissal. Class books assembled "later" become photocopiers’ food; the ones bound the same afternoon survive to graduation.',
      },
    ],
    faqs: [
      {
        q: 'What grade is this writing prompt for?',
        a: 'Kindergarten dictates and traces; grades 1-2 write on the dotted baselines; grade 3 and up expand the starters into a paragraph on the back. The portrait box keeps every level busy — drawing is the part nobody outgrows.',
      },
      {
        q: 'What sentence starters are on the page?',
        a: 'Five: what I will have learned, where I will have gone, what will have changed, what I will still love doing, and the advice I will give. Each sits on its own dotted baseline with room above for fixing a word without a rewrite.',
      },
      {
        q: 'Does it print in black and white?',
        a: 'Yes — the page is black lines on white, built for the classroom copier. The portrait box and the baselines both survive a cheapest-possible duplicate machine, which is the machine that exists the morning of the 100th day.',
      },
      {
        q: 'How long does the activity take?',
        a: 'About thirty minutes: five for the portrait, five for the brainstorm, fifteen for writing, five for sharing two or three pages aloud. Pair it with the glasses template and you have a full 100th day morning block.',
      },
    ],
    related: [
      { href: '/name-tracing/', label: 'Name tracing generator' },
      { href: '/100th-day-glasses/', label: '100th day glasses template' },
      { href: '/100th-day-certificate/', label: '100th day certificate' },
      { href: '/100th-day-of-school/', label: 'All 100th day printables' },
    ],
  },
  {
    slug: '100th-day-certificate',
    hub: 'hundred-day',
    h1: '100th Day of School Certificate',
    metaTitle: '100th Day of School Certificate — Free Printable Award | ChartGlade',
    metaDescription:
      'Free printable 100th day of school certificate: a "100 Days Smarter" award with a colorable border and a 100 medallion — landscape, one per page, no sign-up.',
    lead:
      'The award that marks the day: "100 Days Smarter," a colorable star border, and a big 100 medallion the class colors before the ceremony. Print one per student on letter paper (landscape), write names in marker, sign, hand out — the whole ceremony fits inside a morning meeting.',
    introHeading: 'Running the ceremony',
    intro: [
      'The certificate earns its moment by being handed out, not mailed home. Read the wording aloud once ("has counted, built, puzzled and read their way to the one hundredth day of school"), then call students one by one while the class holds a hundred-applause — ten claps, ten times, which is its own counting exercise and burns exactly enough energy to settle the room afterward. Names in marker beat pens at this age; the teacher signature line and the date line make it official enough to go on the refrigerator, which is the actual venue.',
      'Print it plain or let the class earn the decoration. The border stars and the medallion print as outlines, so a morning-work session can color certificates for everyone — each student decorates their own, which is faster than thirty unique awards and turns the certificate into a second artifact of the day. Cardstock takes marker without the buckle; copy paper works and reinforces the "this is real paper from real school" feel some families frame. One sheet per student, landscape, no cutting — the border is the edge.',
    ],
    printNote: 'One letter page, landscape — one certificate per student, no cutting. Cardstock for marker names; copy paper works.',
    landscape: true,
    sheetImage: {
      src: '/images/100th-day-certificate-printable.png',
      alt: 'Free printable 100th day of school certificate — a 100 Days Smarter award with a colorable star border, a 100 medallion, and name, teacher and date lines, on one landscape letter page.',
      width: 2016,
      height: 1100,
    },
    tips: [
      {
        title: 'Names before the assembly',
        body: 'Write all thirty names the afternoon before — ceremony-day handwriting under audience pressure is where the smudged certificates come from. Keep them in line order in a folder, and the handout takes ninety seconds.',
      },
      {
        title: 'The hundred-applause is the warm-up',
        body: 'Ten sets of ten claps, counted out loud, right before the first name is called. It rehearses skip counting, fills the room with noise, and makes the first certificate feel like a finish line instead of a worksheet with good manners.',
      },
      {
        title: 'Color a class set in morning work',
        body: 'The outline-only design means the class can decorate every certificate during morning work. Students color their own or trade — either way the ceremony starts with work they already own, and no two awards look mass-produced.',
      },
      {
        title: 'Pair it with the countdown chart',
        body: 'The certificate lands hardest on classes that ran the countdown all year: "remember box number one in September?" is the story the award certifies. Snap the finished chart next to the certificate for the classroom door and the story tells itself.',
      },
    ],
    faqs: [
      {
        q: 'What does the certificate say?',
        a: 'The headline is "100 Days Smarter." The body reads: "This certifies that ____ has counted, built, puzzled and read their way to the 100th day of school." Teacher and date lines sit at the bottom, and the 100 medallion anchors the corner.',
      },
      {
        q: 'What grade is the certificate for?',
        a: 'Kindergarten through second grade is the core audience — that is the range that counts the days of school. Third-grade rooms running a countdown for younger book-buddies print a set for their buddies, which is the year’s most reliable cross-grade goodwill.',
      },
      {
        q: 'Does it print in color or black and white?',
        a: 'It is designed black-and-white: outline stars, outline medallion, black text. The color arrives via crayons during morning work. A color copier makes the medallion gold, but nothing on the page requires it.',
      },
      {
        q: 'Do I need to cut the certificates apart?',
        a: 'No — one certificate fills one landscape letter page and the border is the sheet edge. That is deliberate: no paper trimmer in the ceremony stack, and every award comes out the same size no matter who runs the copier.',
      },
    ],
    related: [
      { href: '/100th-day-glasses/', label: '100th day glasses template' },
      { href: '/when-i-am-100-writing-prompt/', label: 'When I am 100 writing prompt' },
      { href: '/cootie-catcher/', label: 'Cootie catcher (party station)' },
      { href: '/100th-day-of-school/', label: 'All 100th day printables' },
    ],
  },
];

/** Family gallery (one hand-written "why this page" blurb per sibling). */
const HUNDRED_DAY_BLURBS: Record<string, string> = {
  '100th-day-glasses': 'The photo of the day — a "100" frame kids color, cut and tape to fit, worn for the hallway parade.',
  'roll-to-100': 'One hundred chart, two games: the all-year countdown to day 100 and a two-dice addition race for the party.',
  'when-i-am-100-writing-prompt': 'The classic writing page — draw the face, finish the five sentence starters, bind the class book.',
  '100th-day-certificate': 'The ceremony piece — "100 Days Smarter" award with a colorable border, handed out one per student.',
};
for (const p of hundredDayPages) {
  p.variants = familyGallery(hundredDayPages, defHref(p), HUNDRED_DAY_BLURBS);
}
