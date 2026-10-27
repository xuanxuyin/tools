/**
 * Teaching Calendar hub (November pre-dev wave 1). A month-by-month index
 * of what a K-5 classroom actually prints and when, pinned to the US school
 * calendar: back to school mid-to-late August (NOT September), 100th Day of
 * School in Jan-Feb, Thanksgiving on the fourth Thursday, Teacher
 * Appreciation Week the first full week of May. This is the static one-page
 * answer to the "october/november/december printables" rolling-month
 * cluster — every month links ONLY pages that already ship; months without
 * a matching page keep their scene text and link nothing. Guards in
 * teachingCalendar.test.ts pin both promises.
 */

export interface CalendarLink {
  href: string;
  /** Matches the target page's real h1 — keep in sync with src/data/*.ts */
  label: string;
  /** When in the month this page earns its place (one honest sentence). */
  note: string;
}

export interface CalendarMonth {
  month: string;
  /** Key US school-calendar dates, one compact line — reused by the printed grid. */
  dates: string;
  /** Hand-written scene text: what the month feels like in a real classroom. */
  scene: string[];
  links: CalendarLink[];
}

export const teachingCalendarMonths: CalendarMonth[] = [
  {
    month: 'January',
    dates: 'Back from break · MLK Day (third Monday) · 100th Day season opens',
    scene: [
      'The first day back is reteaching routines; the second is starting the count, because in districts that start in August the 100th day of school lands in late January or early February. Kindergarten teams start planning the celebration now.',
      'Winter is also when place value gets serious. Trading tens for ones stops being a demo and becomes student work, and the wall chart carries the lesson for the next two months.',
    ],
    links: [
      {
        href: '/hundred-chart/',
        label: 'Hundred Chart',
        note: '100th Day station work: hunt the numbers, skip-count, build 100.',
      },
      {
        href: '/place-value-chart/',
        label: 'Place Value Chart',
        note: 'The regrouping unit’s wall anchor for the winter number-talks.',
      },
      {
        href: '/second-grade-sight-words/',
        label: 'Second Grade Sight Words',
        note: 'Mid-year refresh of the word cards that went home in fall.',
      },
    ],
  },
  {
    month: 'February',
    dates: '100th Day of School (Jan–Feb, the K-2 event) · Valentine’s Day (February 14) · Presidents Day (third Monday)',
    scene: [
      '100th Day is the kindergarten Super Bowl: collections of a hundred things, station rotations, crowns. In the upper grades it slides by with a hundred-chart warm-up and a shrug.',
      'Then Valentine’s Day — twenty-five valentines per child, signed. That makes February the month of name practice in K-1 and, in cursive states, signature practice above it.',
    ],
    links: [
      {
        href: '/hundred-chart/',
        label: 'Hundred Chart',
        note: 'The spine of the 100th Day station rotation.',
      },
      {
        href: '/name-tracing/',
        label: 'Name Tracing Generator',
        note: 'Valentine signing practice for writers whose names still wobble.',
      },
      {
        href: '/addition-chart/',
        label: 'Addition Chart',
        note: 'A Valentine math center: sort the facts into mailboxes.',
      },
    ],
  },
  {
    month: 'March',
    dates: 'Read Across America Day (March 2) · St. Patrick’s Day (March 17) · spring conferences',
    scene: [
      'Reading month opens on Dr. Seuss’s birthday and runs on guest readers, door decorations and Drop Everything and Read. Word cards move from the wall into take-home envelopes this month.',
      'Mid-semester also brings the fraction unit — the time when fraction strips come out and circles go back in the drawer. Spring conference night lands before spring break in most districts.',
    ],
    links: [
      {
        href: '/sight-words/',
        label: 'Sight Words',
        note: 'Reading month: all five Dolch levels, preschool through third grade.',
      },
      {
        href: '/fraction-chart/',
        label: 'Fraction Chart',
        note: 'Fraction strips for the March number-talks wall.',
      },
      {
        href: '/parent-teacher-conference-sign-in-sheet/',
        label: 'Parent-Teacher Conference Sign-In Sheet',
        note: 'Spring conference night stays on schedule when parents sign the line.',
      },
    ],
  },
  {
    month: 'April',
    dates: 'Spring break · Earth Day (April 22) · state testing season',
    scene: [
      'Spring break splits the month; state testing fills the rest of it. The pages that matter now are calm and familiar — reference sheets, plain grid paper, nothing new the week of the test.',
      'Earth Day sneaks math in the back door: tally the litter on the playground, chart it, talk about it. Graphing practice with a reason.',
    ],
    links: [
      {
        href: '/printable-graph-paper/',
        label: 'Printable Graph Paper',
        note: 'Testing-season graphing practice on real grid paper.',
      },
      {
        href: '/geometry-formula-sheet/',
        label: 'Geometry Formula Sheet',
        note: 'The reference sheet students keep re-reading before the math test.',
      },
      {
        href: '/multiplication-chart-1-20/',
        label: 'Multiplication Chart 1-20',
        note: 'One last fact-fluency sweep for grades 4-5.',
      },
    ],
  },
  {
    month: 'May',
    dates: 'Teacher Appreciation Week (first full week) · Mother’s Day · field trips · the last weeks',
    scene: [
      'Teacher Appreciation Week is the first full week of May — room parents already know. After that the calendar floods: field trips, field day, spring conferences, and the volunteer log finally gets totaled for the year-end report.',
      'The last instructional weeks are review weeks. Word cards and formula sheets do the daily work while the schedule falls apart around them.',
    ],
    links: [
      {
        href: '/field-trip-sign-in-sheet/',
        label: 'Field Trip Sign-In Sheet',
        note: 'The roster that rides the spring-trip clipboard, emergency contacts included.',
      },
      {
        href: '/volunteer-sign-in-sheet/',
        label: 'Volunteer Sign-In Sheet',
        note: 'Turns a year of helping into one reportable number.',
      },
      {
        href: '/parent-teacher-conference-sign-in-sheet/',
        label: 'Parent-Teacher Conference Sign-In Sheet',
        note: 'The spring conference night version, slots and all.',
      },
    ],
  },
  {
    month: 'June',
    dates: 'Field day · report cards · summer packets go home',
    scene: [
      'The last week is field day, room cleanup and the summer packet. Whatever goes home now has to survive a backpack and a beach: plain charts, word cards, five-minute routines.',
      'A multiplication chart and a set of word cards cost nothing to send and cover most of the summer slide on their own.',
    ],
    links: [
      {
        href: '/multiplication-chart/',
        label: 'Multiplication Chart',
        note: 'The chart that goes home in the summer packet.',
      },
      {
        href: '/number-line-printable/',
        label: 'Number Line Printable',
        note: 'K-1 summer counting practice on one strip.',
      },
      {
        href: '/third-grade-sight-words/',
        label: 'Third Grade Sight Words',
        note: 'Summer word cards for rising fourth graders.',
      },
    ],
  },
  {
    month: 'July',
    dates: 'Summer break · library reading programs · road-trip season',
    scene: [
      'The only teachers printing in July are pre-K and kindergarten teams prepping for August — and parents of rising kindergartners, who suddenly need the alphabet chart and name writing before school starts.',
      'Five minutes a day on letters and facts beats a July workbook binge. The charts on this page are enough; print a few and tape them to the fridge.',
    ],
    links: [
      {
        href: '/alphabet-chart/',
        label: 'Alphabet Chart',
        note: 'For the rising kindergartner learning letters before August.',
      },
      {
        href: '/name-tracing/',
        label: 'Name Tracing Generator',
        note: 'Writing the name before day one — the single best kindergarten prep.',
      },
      {
        href: '/multiplication-chart-1-15/',
        label: 'Multiplication Chart 1-15',
        note: 'Five minutes of facts at the kitchen counter.',
      },
    ],
  },
  {
    month: 'August',
    dates: 'Back to school · meet-the-teacher night · most US districts start mid-to-late August',
    scene: [
      'Setup week first: bulletin boards, then the wall charts that run all year — the alphabet line, the hundred chart, a place value poster. Then meet-the-teacher night, then the students, most of them inside the last two weeks of August. The August-start crowd hits 100th Day in January; September-start districts hit it in February.',
      'The first printing priority is names. A kindergartner who can write their own name by Friday feels like they own the room — a tracing page per shaky writer settles arrival time all week.',
    ],
    links: [
      {
        href: '/open-house-sign-in-sheet/',
        label: 'Open House Sign-In Sheet',
        note: 'Meet-the-teacher night: parents leave name, email and phone on one clipboard.',
      },
      {
        href: '/alphabet-chart/',
        label: 'Alphabet Chart',
        note: 'The K-1 wall line — print it now, it hangs until June.',
      },
      {
        href: '/hundred-chart/',
        label: 'Hundred Chart',
        note: 'Day-one warm-up board; start counting the days of school the first morning.',
      },
      {
        href: '/kindergarten-sight-words/',
        label: 'Kindergarten Sight Words',
        note: 'First word-wall cards for incoming kindergartners.',
      },
      {
        href: '/name-tracing/',
        label: 'Name Tracing Generator',
        note: 'Custom tracing pages for every name that arrives shaky.',
      },
    ],
  },
  {
    month: 'September',
    dates: 'Labor Day · Grandparents Day (first Sunday after Labor Day) · curriculum night',
    scene: [
      'Routines are the whole month. Small groups get going, curriculum night brings the adults through, and the volunteer calendar finally has names on it.',
      'It is also when the desk references go out. A number line taped to a first-grade desk in September is still there, peeling, in May.',
    ],
    links: [
      {
        href: '/volunteer-sign-in-sheet/',
        label: 'Volunteer Sign-In Sheet',
        note: 'Room parents and weekly helpers start logging hours this month.',
      },
      {
        href: '/sign-in-sheet/',
        label: 'Sign-In Sheet',
        note: 'The plain template for curriculum night, tutoring and everyday check-ins.',
      },
      {
        href: '/number-line-printable/',
        label: 'Number Line Printable',
        note: 'Desk strips for K-1, taped down before the counting unit.',
      },
      {
        href: '/first-grade-sight-words/',
        label: 'First Grade Sight Words',
        note: 'Word cards for the readers who arrived ready.',
      },
    ],
  },
  {
    month: 'October',
    dates: 'Fire Prevention Week (the week of October 9) · Halloween',
    scene: [
      'Fire drills, the fire-safety unit, and a month that ends in orange. Halloween falls on whichever day it falls on — the class party is the last Friday, and the parade is whenever the office says.',
      'October is where seasonal printables earn their keep or lose it: the word search doubles as October vocabulary, and the coloring sheet is math-fact practice dressed for the day.',
    ],
    links: [
      {
        href: '/halloween/',
        label: 'Halloween Printables',
        note: 'The whole October set on one page.',
      },
      {
        href: '/halloween-word-search/',
        label: 'Halloween Word Search',
        note: 'Two levels — forwards only for K-2, all eight directions for 3-5.',
      },
      {
        href: '/halloween-color-by-number/',
        label: 'Halloween Color by Number',
        note: 'Addition and multiplication facts with a jack-o’-lantern finish.',
      },
      {
        href: '/halloween-cursive-practice/',
        label: 'Halloween Cursive Practice',
        note: 'Pumpkin, ghost, skeleton — seasonal words in trace-then-write rows.',
      },
    ],
  },
  {
    month: 'November',
    dates: 'Veterans Day (November 11) · Thanksgiving (the fourth Thursday)',
    scene: [
      'Conference nights land in the first weeks; then the month narrows to one meal. Thanksgiving is the fourth Thursday, so the last full week is short and the class feast is the Friday before.',
      'Gratitude writing is the November writing unit in most K-5 rooms — one "I am thankful for… because…" sentence per child becomes the bulletin board leaf by the last week.',
    ],
    links: [
      {
        href: '/thanksgiving-printables/',
        label: 'Thanksgiving Printables',
        note: 'The full November set: word search, color by number, thankful writing, placemat.',
      },
      {
        href: '/thanksgiving-word-search/',
        label: 'Thanksgiving Word Search',
        note: 'Two puzzle levels with word lists that double as November vocabulary.',
      },
      {
        href: '/thanksgiving-color-by-number/',
        label: 'Thanksgiving Color by Number',
        note: 'Turkey addition and pie multiplication facts to solve and color.',
      },
      {
        href: '/i-am-thankful-for-worksheet/',
        label: 'I Am Thankful For Worksheet',
        note: 'The gratitude writing sheet — eight framed sentences, one per leaf.',
      },
      {
        href: '/thanksgiving-placemat-printable/',
        label: 'Thanksgiving Placemat',
        note: 'The kids’-table activity page for the feast, one letter sheet each.',
      },
      {
        href: '/parent-teacher-conference-sign-in-sheet/',
        label: 'Parent-Teacher Conference Sign-In Sheet',
        note: 'Fall conference nights run on time slots and signatures.',
      },
    ],
  },
  {
    month: 'December',
    dates: 'Last days before winter break · class parties · mid-year fact checks',
    scene: [
      'The countdown is on the whiteboard. The last week is assemblies, a class party, and holding the line: short routines kept beat routines dropped.',
      'Many districts run mid-year checks before the break — a blank multiplication chart under a timer tells you which facts went stale by January. A short handwriting packet goes home too, because two weeks off unwrites cursive faster than any other skill.',
    ],
    links: [
      {
        href: '/multiplication-chart-blank/',
        label: 'Blank Multiplication Chart',
        note: 'The fill-it-in mid-year check: which facts survived the fall?',
      },
      {
        href: '/cursive-alphabet/',
        label: 'Cursive Alphabet',
        note: 'The reference page for the over-break handwriting packet.',
      },
    ],
  },
];

export interface CalendarFaq {
  q: string;
  a: string;
}

export const teachingCalendarFaqs: CalendarFaq[] = [
  {
    q: 'What is a teaching calendar?',
    a: 'A month-by-month map of the printables a K-5 classroom actually needs and when: back-to-school pages in August, Halloween and Fire Prevention Week in October, Thanksgiving activities in November, the 100th Day of School in January and February, field trip rosters in spring. It follows the US school calendar, not the calendar year — August is the real January of teaching.',
  },
  {
    q: 'How do I use monthly printables without losing a prep period?',
    a: 'Batch-print at the start of the month, not the morning of the lesson. Most teachers run one printing pass in the last week of the previous month, while the copy room is still empty. Everything this calendar links to prints on plain letter paper straight from the browser.',
  },
  {
    q: 'When should I print seasonal activities?',
    a: 'Two to three weeks before the holiday, not the week of. Class party weeks compete with assemblies and half days, and every teacher in the building wants the copier at once. Count back from the anchors on this calendar — Fire Prevention Week in October, the fourth Thursday of November, Teacher Appreciation Week in May.',
  },
  {
    q: 'When is the 100th Day of School?',
    a: 'It depends on your district’s start date: districts that start school in mid-August hit day 100 in late January; Labor-Day-start districts hit it in February. Snow days push it later, so count your own hundredth day rather than trusting a neighbor’s. Kindergarten teams usually start planning it right after winter break.',
  },
  {
    q: 'Is everything on this teaching calendar free?',
    a: 'Yes. Every page this calendar links to is free to print — no sign-up, no watermark, no download queue. Print this calendar itself as a one-page year index and tape it inside your plan book.',
  },
];
