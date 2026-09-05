import type { PageDef } from './pageTypes';

/**
 * Cursive single-letter matrix — one page per letter at /cursive/<letter>/.
 *
 * SERP basis (audited 2026-09-05): noun-form letter queries ("cursive capital
 * f", "cursive f worksheet") are held by three specialist/worksheet sites
 * (MyCursive, Superstar, SuryasCursive) whose pages are blog posts + PDF
 * downloads — plus small blogs ranking top 5, which is the DR-0 entry proof.
 * How-to queries are video-heavy and skipped. Our angle: the page IS the
 * practice sheet (open → print), no download, no email.
 */

/** Printable sheet data beyond the shared PageDef SEO fields. */
export interface LetterSheet {
  capital: string;
  lower: string;
  /** Numbered strokes for the capital — the "cursive capital X" answer. */
  capitalSteps: string[];
  /** Numbered strokes for the lowercase. */
  lowerSteps: string[];
  /** The #1 mistake for this specific letter. */
  pitfall: string;
}

export interface CursiveLetterDef extends PageDef {
  sheet: LetterSheet;
}

export const cursiveLetters: CursiveLetterDef[] = [
  {
    slug: 'a',
    hub: 'cursive',
    h1: 'Cursive A',
    metaTitle: 'Cursive A — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital A and lowercase a, stroke by stroke, with a free printable practice sheet — plus the entry stroke that makes a look like c, not print.',
    lead:
      'Lowercase a is a c in disguise — same opening curve, same swing, plus one straight downstroke to finish. This page breaks both forms into numbered strokes, gives you a trace-and-write sheet to print, and flags the one mistake that turns an a into a u.',
    introHeading: 'One motion, not a ball and a stick',
    intro: [
      'The cursive a belongs to the curve family — the first family taught, because its opening stroke is the engine half the alphabet reuses. You do not draw a circle and add a stem the way print does; you swing in from the baseline, curve up to the middle line, then slide back down that same curve and drop a straight stroke to the baseline. One continuous motion, ending in a small tail that reaches for the next letter. That tail is the whole point of the exercise — a written without its exit stroke cannot connect, and a letter that cannot connect is just print with a slant.',
      'The capital A runs on different geometry: a tall diagonal that peaks in a small left-turning loop at the top line, then slants back down and sweeps right. It is one of the quieter capitals — no crossing, no second bowl — which is why it is often taught early alongside C and L. In connected writing capitals never actually touch the next letter; the sweep-out is decorative tradition, not a connector. Practice the lowercase until the curve-plus-downstroke is automatic, because d, g and q are all waiting in line behind it.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Say "swing, slide, drop" out loud',
        body: 'Three beats for three strokes — swing in, slide up the curve, drop straight down. First-graders who narrate the strokes drop ball-and-stick habits twice as fast as those who trace silently.',
      },
      {
        title: 'Check the exit before you check the shape',
        body: 'A slightly wobbly bowl with a confident tail is better cursive than a perfect bowl that stops dead. The tail tells the hand where the next letter starts.',
      },
      {
        title: 'Pair it with c and d in one session',
        body: 'Write c c c, then a a a, then d d d — same opening, three letters. Ten minutes of family practice beats thirty minutes of a-alone.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital A in cursive?',
        a: 'Slant up from the baseline toward the top line, peak in a small loop that turns left, slant back down to the baseline, then sweep right into the tail. It resembles a pointed peak with a looped summit — no crossbar, unlike print.',
      },
      {
        q: 'How do you write a lowercase a in cursive?',
        a: 'Swing in from the baseline and curve up to the middle line (exactly like c), slide back down the curve, then make one straight downstroke to the baseline and exit right with a small tail.',
      },
      {
        q: 'Why does my cursive a look like a u?',
        a: 'The closing downstroke drifted right or the opening curve never reached the middle line, leaving the bowl open at the top. Slow the entry swing down and land the downstroke on the curve itself, not beside it.',
      },
      {
        q: 'Does a capital A connect to the next letter?',
        a: 'No — in standard American cursive, capitals never connect. The lowercase that follows starts fresh with its own entry stroke.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/c/', label: 'Cursive C — the a family opener' },
      { href: '/cursive/d/', label: 'Cursive D — same opening stroke' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'A',
      lower: 'a',
      capitalSteps: [
        'Start at the baseline and slant up-right toward the top line.',
        'At the top, make a small loop turning left (narrower than it feels).',
        'Slant down-left, parallel to the entry stroke, back to the baseline.',
        'Sweep right into a short tail.',
      ],
      lowerSteps: [
        'Swing in from the baseline and curve up to the middle line — the c stroke.',
        'Slide back down along the same curve.',
        'Drop a straight downstroke to the baseline.',
        'Exit right with a small tail for the next letter.',
      ],
      pitfall: 'the closing downstroke landing beside the curve instead of on it, leaving a gap that turns a into u.',
    },
  },

  {
    slug: 'b',
    hub: 'cursive',
    h1: 'Cursive B',
    metaTitle: 'Cursive B — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital B and lowercase b, stroke by stroke, with a free printable practice sheet — the tall-loop letter that borrows its bottom half from c.',
    lead:
      'Lowercase b is two letters in one motion: the tall loop of l on top, the bowl of a on the bottom. This page numbers every stroke for both forms, prints as a practice sheet, and names the tell-tale mistake that makes a b collapse into an h.',
    introHeading: 'A tall loop with a c stitched on',
    intro: [
      'The lowercase b is where two families meet: it starts like the loop letters (l, h, k, f) with a narrow loop up to the top line, then finishes like the curve family — retrace up to the middle line, curve left exactly like c, close, and drop a clean downstroke to the baseline. Because it borrows from two learned motions, b is usually taught only after both are secure, and it is the letter that reveals whether a child really owns them. The stroke order matters more here than anywhere else in the lowercase: loop first, bowl second, and never the reverse.',
      'The capital B is a stacked pair of loops — up-and-over at the top, down, then two bowls that get slightly wider toward the baseline. It is one of the busier capitals and rewards slow practice: the top bowl should be visibly smaller than the bottom, the way it is in print. Watch the width of the tall loop as well; a loop fatter than the letter is wide will collide with neighbors and slow the whole line down.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Loop narrow, always',
        body: 'The tall loop should be a sliver, not a balloon — wide loops eat horizontal space and make b take up two letters of room. Aim for a loop you could thread a needle through.',
      },
      {
        title: 'Test it against h',
        body: 'b and h share the same first stroke. Write h, then b underneath: if the second halves look identical, the bowl is missing. The b bowl closes; the h bumps and slides.',
      },
      {
        title: 'Capitals: bottom bowl bigger',
        body: 'When tracing the capital, check that the lower loop is the wider of the two. Equal bowls read as a clumsy 3; uneven bowls read as B.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital B in cursive?',
        a: 'Swing up and over at the top line, come down to the baseline, then loop up and around twice — a smaller top bowl, a wider bottom bowl — closing each back to the stem, and finish at the baseline.',
      },
      {
        q: 'How do you write a lowercase b in cursive?',
        a: 'Make a tall narrow loop to the top line and come back down to the baseline, retrace up to the middle line, curve left like a c, close the bowl, then drop straight down and exit right.',
      },
      {
        q: 'Why does my b look like an h or an l?',
        a: 'The bowl stroke is missing or never closed — usually because the retrace up skipped past the middle line straight into the exit. Go slower at the retrace: up only to the middle line, then the c-curve.',
      },
      {
        q: 'Is cursive b written in one stroke?',
        a: 'Yes — one continuous motion without lifting the pencil: loop down, retrace, bowl, down, tail. Lifting after the loop is the habit that breaks the letter\'s rhythm.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/h/', label: 'Cursive H — same tall loop, different ending' },
      { href: '/cursive/l/', label: 'Cursive L — the pure tall loop' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'B',
      lower: 'b',
      capitalSteps: [
        'Swing up to the top line and curve back left over the top.',
        'Come down to the baseline.',
        'Loop up and around to the stem for the top bowl (smaller).',
        'Loop again for the bottom bowl (wider), closing at the baseline.',
      ],
      lowerSteps: [
        'Sweep up past the middle line to the top line, forming a narrow loop.',
        'Come back down the same line to the baseline.',
        'Retrace up to the middle line, curve left like c, and close the bowl.',
        'Drop straight to the baseline and exit right.',
      ],
      pitfall: 'skipping the bowl closure — the letter becomes an h with a stutter instead of a finished b.',
    },
  },

  {
    slug: 'c',
    hub: 'cursive',
    h1: 'Cursive C',
    metaTitle: 'Cursive C — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital C and lowercase c, stroke by stroke, with a free printable practice sheet — the gateway letter whose opening curve powers a, d, g and q.',
    lead:
      'Cursive c is the most important letter on the page — not because it is hard, but because its opening curve is the entry stroke for a, d, g and q. Master c and you have pre-learned a third of the lowercase alphabet. Print this sheet first.',
    introHeading: 'The letter that teaches five',
    intro: [
      'The lowercase c is a single unhurried curve: swing in from the baseline, arc up and over to the middle line, then back down toward the baseline — and stop. The door stays open. That open ending is what makes it c: close the curve and you have written an o, added a downstroke and you have an a. Teaching c first, then pointing out that a, d, g and q start with the identical motion, is how every major American cursive program builds early momentum — one stroke, five letters.',
      'The capital C is the lowercase at full scale — same arc, same open door, with a small inward curl at the baseline that gives it finish. It is the first capital worth teaching because it reinforces rather than introduces. The classic error at both sizes is over-closing: the c that ends pointing down instead of right has nowhere to send its exit stroke, and the habit spreads to every letter in its family.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Trace it as a family, immediately',
        body: 'After one session of c, have the writer try a, d and g cold — the shared opening does half the teaching. This is the highest-leverage five minutes in early cursive.',
      },
      {
        title: 'The door stays open',
        body: 'Picture the curve as a cup holding its water for the next letter. A c that closes becomes an o; a c that over-shoots downward loses its exit stroke.',
      },
      {
        title: 'Big C, same rules',
        body: 'The capital is not a new letter — it is the lowercase stretched to full height. Say the same stroke words at both sizes to anchor the connection.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital C in cursive?',
        a: 'Swing in from the baseline and arc up over the top toward the left, then sweep down and around to the baseline, finishing with a small open curl — the curve never closes.',
      },
      {
        q: 'How do you write a lowercase c in cursive?',
        a: 'One smooth curve: enter from the baseline, arc to the middle line, curl back left and down toward the baseline, then exit right — leaving the bottom open.',
      },
      {
        q: 'Why is c taught first in cursive?',
        a: 'Its entry stroke is the opening move of a, d, g and q as well. Mastering c pre-loads a third of the lowercase alphabet, which is why nearly every program starts the curve family here.',
      },
      {
        q: 'What is the difference between cursive c and o?',
        a: 'The door. Cursive c ends open, with an exit stroke ready to connect; cursive o closes its circle at the top before exiting. If your c is closing, slow down the ending.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/a/', label: 'Cursive A — c plus one downstroke' },
      { href: '/cursive/g/', label: 'Cursive G — c with a tail' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'C',
      lower: 'c',
      capitalSteps: [
        'Swing in from the baseline, curving up toward the top line.',
        'Arc up and over to the left at the top.',
        'Sweep down and around toward the baseline.',
        'Finish with a small open curl heading right.',
      ],
      lowerSteps: [
        'Swing in from the baseline and curve up to the middle line.',
        'Curl back left over the top.',
        'Curve down toward the baseline — stop short of closing.',
        'Exit right with a small tail.',
      ],
      pitfall: 'closing the curve — an over-closed c becomes an o and loses its exit stroke.',
    },
  },

  {
    slug: 'd',
    hub: 'cursive',
    h1: 'Cursive D',
    metaTitle: 'Cursive D — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital D and lowercase d, stroke by stroke, with a free printable practice sheet — c\'s opening stroke carried up to full height.',
    lead:
      'Lowercase d is a c that keeps climbing: same swing in, but the slide runs all the way to the top line before dropping a tall stem. Both forms numbered stroke by stroke below, with a printable trace-and-write sheet and the fix for the classic a/d mix-up.',
    introHeading: 'The c that keeps going',
    intro: [
      'If a child can write c and l, they can already write d — the lowercase is the c entry stroke sliding up to the top line, then the l stem dropping straight back to the baseline. It is the tallest member of the curve family and the easiest tall letter in the alphabet, which is why programs teach it almost immediately after c. The diagnostic value is in the mix-up: a d written short is an a, an a written tall is a d. Height discipline — middle line for a, top line for d — is the whole game at this stage.',
      'The capital D opens like a cursive C that changes its mind: up-and-over at the top, down to the baseline, then one big bowl sweeping around to close. Its personality is that bowl — rounder and prouder than print\'s vertical stem, it should touch the baseline exactly where the entry stroke began. Keep the bowl from sagging past the line; a D that droops reads as a lowercase g at distance.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Drill a and d as a pair',
        body: 'Write a a d, then d d a — alternating forces the height decision every single time. Within a week the top line versus middle line call becomes automatic.',
      },
      {
        title: 'The stem is straight',
        body: 'After the long slide up, the drop down should be a clean vertical on the slant — no wave, no lean away from the curve. A wavy d stem is usually a speed problem, not a skill problem.',
      },
      {
        title: 'Name check for capitals',
        body: 'D is a name letter — Daniel, Daisy, Dad. Use it: capitals stick twice as fast when they spell someone the writer knows.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital D in cursive?',
        a: 'Swing up and over at the top line, come down to the baseline, then make one big bowl — up, around to the right, and back — closing at the baseline where the stroke began.',
      },
      {
        q: 'How do you write a lowercase d in cursive?',
        a: 'Swing in from the baseline like a c, but keep sliding up to the top line; then drop a straight downstroke all the way to the baseline and exit right with a small tail.',
      },
      {
        q: 'What\'s the difference between cursive a and d?',
        a: 'Height of the slide. The a slides up only to the middle line; the d continues to the top line before its downstroke. Same opening stroke, same closing move.',
      },
      {
        q: 'Why does my d look like a printed d?',
        a: 'The ball-and-stick habit — drawing the bowl and stem as separate pieces. Slow the entry down and think "c that keeps climbing": one motion, no pencil lift.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/a/', label: 'Cursive A — the short version of the same stroke' },
      { href: '/cursive/g/', label: 'Cursive G — the family\'s tailed member' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'D',
      lower: 'd',
      capitalSteps: [
        'Swing up to the top line and curve back left over the top.',
        'Come down to the baseline.',
        'Bowl up and around to the right — one wide sweep.',
        'Close at the baseline where the entry began.',
      ],
      lowerSteps: [
        'Swing in from the baseline and curve up — past the middle line.',
        'Keep sliding up to the top line.',
        'Drop a straight downstroke to the baseline.',
        'Exit right with a small tail.',
      ],
      pitfall: 'stopping the slide at the middle line — which quietly turns the d into an a.',
    },
  },

  {
    slug: 'e',
    hub: 'cursive',
    h1: 'Cursive E',
    metaTitle: 'Cursive E — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital E and lowercase e, stroke by stroke, with a free printable practice sheet — the small loop that must stay small.',
    lead:
      'Lowercase e is a short slant with a loop-de-loop: up to the middle line, loop back across the entry, curve down and away. Simple — until the loop grows. This page numbers both letterforms, prints a practice sheet, and keeps the loop on a diet.',
    introHeading: 'The loop that must stay small',
    intro: [
      'The lowercase e is cursive\'s first loop letter and its easiest bad habit. The stroke is quick — slant up from the baseline to the middle line, loop back left crossing the entry stroke, then curve around and down to the baseline — but the loop wants to grow. A loop the size of the whole letter turns e into a leaning l; the fix is a loop no bigger than a grain of rice, crossed exactly where the entry stroke meets the middle line. Because e is the most common letter in English, a sloppy e multiplies across every line of writing — worth policing early.',
      'The capital E surprises people: it looks like a backwards 6 with an open tail. Up-and-over at the top line, a small loop turning down, retrace, then sweep out right at the baseline with a curl. There is no crossbar in cursive E — writers who add one are remembering print. It is one of the less intuitive capitals, so trace it larger and slower than feels necessary the first few passes.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Rice-grain loop rule',
        body: 'Say it out loud while tracing: small loop, small loop. An e loop wider than the letter is tall is doing l\'s job — and crowding the neighbors.',
      },
      {
        title: 'Cross at the corner',
        body: 'The loop should cross the entry stroke right at the middle line. Cross lower and the e looks like it is tripping; not crossing at all leaves a stray c.',
      },
      {
        title: 'Capitals: it\'s a backwards 6, embrace it',
        body: 'Trace the capital next to a written 6 — seeing the mirror relationship once fixes the shape in memory faster than ten blind repetitions.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital E in cursive?',
        a: 'Swing up and over at the top line into a small loop turning down, retrace past it, then curve down to the baseline and sweep out right with an open curl — no crossbar.',
      },
      {
        q: 'How do you write a lowercase e in cursive?',
        a: 'Slant up from the baseline to the middle line, loop back left crossing the entry stroke (small loop), then curve around and down to the baseline, exiting right.',
      },
      {
        q: 'Why does my cursive e look like an l?',
        a: 'The loop is too big or too tall — a wide loop converts e into a leaning l. Shrink the loop to rice-grain size and cross exactly at the middle line.',
      },
      {
        q: 'Does cursive capital E have a crossbar?',
        a: 'No — that is the print habit. The cursive E is a loop-and-retrace shape ending in an open tail; adding a crossbar is a mixed-style error teachers flag.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/l/', label: 'Cursive L — the tall loop done right' },
      { href: '/cursive/f/', label: 'Cursive F — loops at both extremes' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'E',
      lower: 'e',
      capitalSteps: [
        'Swing up to the top line and curve back left.',
        'Make a small loop at the top turning downward.',
        'Retrace down toward the baseline.',
        'Sweep out right at the baseline, finishing with an open curl.',
      ],
      lowerSteps: [
        'Slant up from the baseline to the middle line.',
        'Loop back left, crossing the entry stroke — keep the loop small.',
        'Curve around to the right and down to the baseline.',
        'Exit right with a small tail.',
      ],
      pitfall: 'the oversized loop — a fat e-loop reads as a leaning l and swamps the line\'s rhythm.',
    },
  },

  {
    slug: 'f',
    hub: 'cursive',
    h1: 'Cursive F',
    metaTitle: 'Cursive F — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital F and lowercase f, stroke by stroke, with a free printable practice sheet — loops above and below the line, plus the crossbar.',
    lead:
      'Lowercase f is the only letter that breaks both borders: a loop above the top line, a tail below the baseline, and a crossbar in between. Three extremes in one letter. Both forms numbered below, with a printable sheet and the connection rule most writers get wrong.',
    introHeading: 'The letter that crosses every line',
    intro: [
      'The lowercase f is cursive\'s showpiece: up to a tall loop at the top line, one long stroke down through the baseline into a sweeping tail, then a crossbar at the middle line. It is the tallest and deepest letter in the lowercase alphabet, and it is the letter that tests whether the writer trusts their lines — the downstroke must pass the baseline without slowing, or the tail dies. The crossbar comes last, after the tail, and in connected writing the tail itself often serves as the crossbar for the next letter\'s connection.',
      'The capital F is a curl, a stem, and a crossbar with flourish: small loop at the top line, sweep down to the baseline, then cross back to the right through the upper stem, curving into the exit. It ranks among the trickier capitals because the crossbar must sit high — near the top, not the middle — and leaving it off entirely turns F into a naked J-adjacent squiggle. Take it slow; f rewards patience more than talent at both sizes.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Commit to the descender',
        body: 'The f tail must dive past the baseline without braking. A timid tail that stops at the line makes f read as a tall s. Trust the line, keep the speed.',
      },
      {
        title: 'Crossbar high on the capital',
        body: 'The capital\'s cross sits near the top of the stem, not the middle. Low crossbars are the number-one capital-F error on classroom walls.',
      },
      {
        title: 'Watch f in double duty',
        body: 'When f connects — as in "fl" or "ff" — the exit tail of the first letter becomes the crossbar of the next. Practicing "fl" pairs teaches the timing better than f alone.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital F in cursive?',
        a: 'Make a small curl at the top line turning left, sweep straight down to the baseline, then cross back right through the upper part of the stem and curve up into the exit tail.',
      },
      {
        q: 'How do you write a lowercase f in cursive?',
        a: 'Climb to the top line and loop back left (narrow loop), sweep straight down past the baseline into a long tail, then cross at the middle line and exit right.',
      },
      {
        q: 'Do you cross an f before or after the tail?',
        a: 'After — the loop and full downstroke-with-tail come first as one motion, then the crossbar. Crossing early forces a pencil lift and kills the letter\'s flow.',
      },
      {
        q: 'Why is cursive f considered hard?',
        a: 'It is the only lowercase that exceeds the space both above (tall loop) and below (descender tail) while adding a crossbar — three extremes in one continuous stroke. Slow tracing of the loop-tail rhythm sorts it out fast.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/j/', label: 'Cursive J — the other descender family member' },
      { href: '/cursive/l/', label: 'Cursive L — the simple tall loop' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'F',
      lower: 'f',
      capitalSteps: [
        'Start with a small curl at the top line turning left.',
        'Sweep straight down to the baseline.',
        'Cross back to the right through the upper stem.',
        'Curve up and over into the exit tail.',
      ],
      lowerSteps: [
        'Climb to the top line and loop back left — narrow loop.',
        'Sweep straight down, past the baseline, into a long tail.',
        'Cross at the middle line.',
        'Exit right along the tail.',
      ],
      pitfall: 'the tail braking at the baseline — a short descender turns f into a tall s.',
    },
  },

  {
    slug: 'g',
    hub: 'cursive',
    h1: 'Cursive G',
    metaTitle: 'Cursive G — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital G and lowercase g, stroke by stroke, with a free printable practice sheet — the a-family bowl with a descender tail.',
    lead:
      'Lowercase g is an a that keeps going: same c-opening, same closing downstroke — then straight through the baseline into a tail. Both letterforms numbered below, with a printable practice sheet and the fix for the flat-tailed g.',
    introHeading: 'The a that dives',
    intro: [
      'Everything true of the cursive a is true of the g until the final stroke, where instead of stopping at the baseline the downstroke dives through into a tail — hooked left in Zaner-Bloser tradition, looped in D\'Nealian. That continuation is the teaching moment: g is not a new letter but an old one extended, and presenting it that way (write a... now keep going) gets it in a single session. The tail has rules of its own: it must clear the baseline decisively but never reach the next line of writing — descenders that graze the line below turn a page fuzzy within a week.',
      'The capital G is a C with a handshake: big open curve exactly like the capital C, then at the baseline the stroke hooks inward and up like a small j, sometimes finishing with a horizontal bar in D\'Nealian styles. The hook is what separates it from C in reading, so give it real height — a lazy nub of a hook leaves G looking like a C wearing a costume.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Teach it as "a, keep going"',
        body: 'Have the writer produce three a\'s, then on the fourth say "keep going." The g appears without a single new instruction — the cheapest win in the lowercase alphabet.',
      },
      {
        title: 'Tails respect the next line',
        body: 'The descender ends in the upper half of the space below, never touching the line beneath. Trace rows on this sheet keep that lane visible.',
      },
      {
        title: 'Hook with intent',
        body: 'The capital\'s inward hook should rise at least to the middle of the letter. A shallow hook reads as smudge; aim for a hook you could hang something on.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital G in cursive?',
        a: 'Draw a big open curve like a capital C, then at the baseline hook inward and upward like a small j — some styles finish with a short horizontal bar through the hook.',
      },
      {
        q: 'How do you write a lowercase g in cursive?',
        a: 'Swing in like a c to the middle line, slide back down, drop the closing downstroke through the baseline into a tail — hooked left (or looped, style-dependent) — and exit right.',
      },
      {
        q: 'Should the g tail loop or hook?',
        a: 'Both are correct: Zaner-Bloser hooks the tail left; D\'Nealian closes it into a loop. Match the school\'s style, and above all keep the tail in the descender lane without touching the line below.',
      },
      {
        q: 'Why does my g look like an a?',
        a: 'The downstroke stopped at the baseline instead of passing through it. Re-trace with the cue "through the line, then out" — the tail is just the stroke\'s momentum continuing.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/a/', label: 'Cursive A — g without the dive' },
      { href: '/cursive/q/', label: 'Cursive Q — the family\'s crossed tail' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'G',
      lower: 'g',
      capitalSteps: [
        'Swing in from the baseline and arc up over the top like a C.',
        'Sweep down and around toward the baseline.',
        'At the baseline, hook inward — up like a small j.',
        'Finish the hook (add the short bar if your style uses one).',
      ],
      lowerSteps: [
        'Swing in from the baseline and curve up to the middle line.',
        'Slide back down along the curve.',
        'Drop the downstroke through the baseline into a tail — hook or loop.',
        'Exit right above the tail.',
      ],
      pitfall: 'stopping the downstroke at the baseline — the missing dive turns g into a every time.',
    },
  },

  {
    slug: 'h',
    hub: 'cursive',
    h1: 'Cursive H',
    metaTitle: 'Cursive H — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital H and lowercase h, stroke by stroke, with a free printable practice sheet — the tall loop that lands on a hill.',
    introHeading: 'Tall loop, then the hill',
    intro: [
      'The lowercase h is l and n fused: the tall loop of the loop family climbing to the top line, and on the way back down, instead of exiting, the hand bumps up into the hill of n and over. It is the letter that proves a child has both families — loop on top, hill on the bottom — and it is worth checking that the hump actually reaches the middle line. An h whose bump is timid collapses into something unreadable between h and r; the hump should have the confidence of a fully paid n.',
      'The capital H is a top loop, a leg, and a crossbar: up-and-over into a loop at the top line, down to the baseline, then a crossbar at the middle, and a second downstroke — or, in the one-stroke tradition, the crossbar flows directly into the right leg. It is a workhorse capital — names, Helen and Henry, Houston — and its failure mode is a crossbar that climbs. The bar is level; a rising bar makes the letter look like it is shrugging.',
    ],
    lead:
      'Lowercase h is a tall l-loop that lands on n\'s hill instead of exiting. Both forms numbered stroke by stroke below, with a printable trace-and-write sheet and the hump-height check that keeps h from collapsing into r.',
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Full-price hump',
        body: 'The hump must reach the middle line — a half-height bump is an r wearing h\'s loop. Trace an n directly above the h to calibrate the hump\'s ceiling.',
      },
      {
        title: 'Loop, check, then hump',
        body: 'Beginners who rush fuse the loop and hump into one mush. Pause (pencil down) between loop and hump for the first week — clean beats continuous at this stage.',
      },
      {
        title: 'Level crossbar on the capital',
        body: 'The capital\'s bar runs flat through the middle. A tilted bar is the difference between H and A leaning on its side.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital H in cursive?',
        a: 'Swing up and over into a loop at the top line, come down to the baseline, cross at the middle line with a level bar, then make the second downstroke — many styles connect the bar directly into that right leg.',
      },
      {
        q: 'How do you write a lowercase h in cursive?',
        a: 'Sweep up into a tall narrow loop to the top line, come back down, bump up to the middle line like an n, and come back down to the baseline, exiting right.',
      },
      {
        q: 'What\'s the difference between cursive h, n and r?',
        a: 'Height and hump count: h has the tall loop plus one full hump to the middle line; n has no loop, one hump; r has no loop and only half a hump. The loop is h\'s only identifier — keep it narrow.',
      },
      {
        q: 'Why does my h look like an l?',
        a: 'The hump is missing or too shallow to read — usually the downstroke went straight into the exit. Retrace the sequence: loop, down, UP to the middle line, over, down, tail.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/n/', label: 'Cursive N — h without the loop' },
      { href: '/cursive/b/', label: 'Cursive B — loop family, bowl ending' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'H',
      lower: 'h',
      capitalSteps: [
        'Swing up to the top line and loop back left.',
        'Come down to the baseline.',
        'Cross with a level bar at the middle line.',
        'Finish the right downstroke and exit right.',
      ],
      lowerSteps: [
        'Sweep up past the middle line to the top line in a narrow loop.',
        'Come back down to the baseline.',
        'Bump up to the middle line — a full n-hump.',
        'Come back down and exit right.',
      ],
      pitfall: 'a hump that quits below the middle line — h slides into r territory.',
    },
  },

  {
    slug: 'i',
    hub: 'cursive',
    h1: 'Cursive I',
    metaTitle: 'Cursive I — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital I and lowercase i, stroke by stroke, with a free printable practice sheet — the shortest letter and its lookalike capital.',
    lead:
      'Lowercase i is cursive\'s shortest letter — one downstroke, one tail, one dot — and the first letter kids write connected into words. Its capital is the classic J-confusion letter. Both numbered below, with a printable sheet and the dot rule everyone forgets.',
    introHeading: 'Shortest stroke, busiest dot',
    intro: [
      'The lowercase i is deliberately boring: downstroke from the middle line to the baseline, small exit tail, dot above — placed on the slant, over the downstroke, not floating to the right. Because it is the simplest letter, i is where connected writing begins: i-t, i-n, i-s. The dot discipline is the whole teaching point. Dots placed late, placed right, or placed as slashes are the most-photographed errors in cursive classrooms; the dot belongs directly above the stem, added after the word is written, in one quick pass.',
      'The capital I is a curl, a stem, and an underhook — and it is famous for looking like a J. The distinguishing feature is proportion: the I\'s hook stays small and the stem is straight and vertical, while J sweeps deeper with a fuller curve. In fact the capital I is often described as a J that never learned to commit. It matters because I opens more English sentences than any other capital — it is the most-used capital in the language, and one of the easiest to get wrong.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Dot last, dot on the slant',
        body: 'Write the whole word first, then dot every i (and cross every t) in one pass. Dots placed letter-by-letter slow the hand and drift right — the #1 rookie tell.',
      },
      {
        title: 'I vs J proportion check',
        body: 'Trace capital I and capital J side by side: I\'s hook is a nub, J\'s is a full swing. Feeling the difference once beats memorizing it.',
      },
      {
        title: 'First words start here',
        body: 'Once i is secure, connect immediately — "it", "in", "is". The first successful connected word does more for buy-in than ten sheets of isolated letters.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital I in cursive?',
        a: 'Make a small curl at the top line, drop a straight stem to the baseline, then hook under toward the right with a short, restrained curve — much shallower than a J.',
      },
      {
        q: 'How do you write a lowercase i in cursive?',
        a: 'One short downstroke from the middle line to the baseline, exit right with a small tail, then dot above the stem — on the slant, after the word is done.',
      },
      {
        q: 'Why does capital I look like a J?',
        a: 'They share curl-stem-hook construction; the difference is depth. The I hook barely lifts off the baseline while J swings fully under. Small hook = I.',
      },
      {
        q: 'Where does the dot on cursive i go?',
        a: 'Directly above the downstroke, on the slant line — not hovering to the right, not slashed. Traditional pedagogy adds dots in a single pass after writing the word.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/j/', label: 'Cursive J — the I with commitment' },
      { href: '/cursive/t/', label: 'Cursive T — the other dot-and-cross partner' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'I',
      lower: 'i',
      capitalSteps: [
        'Make a small curl at the top line.',
        'Drop a straight stem to the baseline.',
        'Hook under toward the right — keep it shallow.',
        'Finish level, without a deep swing.',
      ],
      lowerSteps: [
        'Start at the middle line.',
        'One short downstroke to the baseline.',
        'Exit right with a small tail.',
        'Dot above the stem, on the slant.',
      ],
      pitfall: 'the dot drifting right of the stem — the dot sits on the slant line, directly overhead.',
    },
  },

  {
    slug: 'j',
    hub: 'cursive',
    h1: 'Cursive J',
    metaTitle: 'Cursive J — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital J and lowercase j, stroke by stroke, with a free printable practice sheet — the dotted descender that must dive deep.',
    lead:
      'Lowercase j is an i sent below the line: same short downstroke, same dot, but the stroke dives through the baseline and hooks. The capital is the grandest single sweep in the alphabet. Both numbered below, with a printable sheet.',
    introHeading: 'The diving i',
    intro: [
      'The lowercase j takes everything the i does and extends it one lane down: downstroke from the middle line, straight through the baseline, curving left into a hook (or loop, in D\'Nealian style), then the exit, then the dot. It is the second letter children meet with a descender — g came first — and the pairing is worth making explicit: same dive rule, same lane, don\'t touch the line below. The j\'s dot follows the i\'s rule exactly: on the slant, above the stem, after the word.',
      'The capital J is cursive\'s most dramatic stroke — a top curl into one continuous sweep all the way down past the baseline, hooking left and finishing with an exit above the hook. It is the letter that most often gets drawn too timidly: writers stop the sweep at the baseline as if writing a capital I. The J commits — the deeper curve belongs to it alone among the letters it resembles. Use the sentence-starting J ("January...") to give it room to breathe.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Borrow the g dive',
        body: 'If j tails stall at the baseline, trace three g\'s first — the dive motion is identical, and the g primes the hand to keep going.',
      },
      {
        title: 'Capital: commit to the sweep',
        body: 'The J\'s curve should pass well below the baseline. A shallow J is just a sad I — check depth against the row beneath before moving on.',
      },
      {
        title: 'Hook, don\'t close',
        body: 'The lowercase tail hooks left with a gap; it does not close into a loop unless the style calls for it. Closed hooks in a hook-style program blur j into a tiny anchor.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital J in cursive?',
        a: 'Curl in at the top line, then one continuous sweep down past the baseline, hooking left beneath — deeper than an I — and finish with an exit stroke rising to the right above the hook.',
      },
      {
        q: 'How do you write a lowercase j in cursive?',
        a: 'From the middle line, make a short downstroke through the baseline into a leftward hook (or loop, style-dependent), exit right, then dot above the stem on the slant.',
      },
      {
        q: 'Do you dot a cursive j?',
        a: 'Yes — same rule as i: a dot above the stem, placed on the slant after the word is written. The descender changes nothing about the dot.',
      },
      {
        q: 'How is cursive j different from g?',
        a: 'j has no bowl — it is a bare stroke with a tail and a dot, while g wraps its tail beneath a closed a-bowl. Straight dive vs curve-then-dive is the visual tell.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/g/', label: 'Cursive G — the other descender' },
      { href: '/cursive/i/', label: 'Cursive I — j without the dive' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'J',
      lower: 'j',
      capitalSteps: [
        'Curl in at the top line.',
        'Sweep down in one continuous curve, past the baseline.',
        'Hook left beneath — go deep, past where an I would stop.',
        'Exit up and right above the hook.',
      ],
      lowerSteps: [
        'Start at the middle line.',
        'Downstroke through the baseline.',
        'Hook the tail left (or loop it, in loop styles).',
        'Exit right, then dot above the stem.',
      ],
      pitfall: 'stopping the sweep at the baseline — a timid capital J reads as capital I.',
    },
  },

  {
    slug: 'k',
    hub: 'cursive',
    h1: 'Cursive K',
    metaTitle: 'Cursive K — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital K and lowercase k, stroke by stroke, with a free printable practice sheet — the tall loop with a knot in the middle.',
    lead:
      'Lowercase k is a tall l-loop with a tiny knot stitched into its stem. Both forms numbered stroke by stroke below, with a printable practice sheet and the size rule that keeps k from becoming R.',
    introHeading: 'The loop with a knot',
    intro: [
      'The lowercase k builds on l and adds the trickiest little structure in the lowercase: after the tall loop and its downstroke, the hand retraces up to the middle line and ties a small slanted loop — in, down across the stem, out. The loop is a knot, and like any knot it must be small: a loop the size of the letter\'s bowl turns k into a lowercase R or a drowning b. Programs teach k last among the loop letters for exactly this reason — it demands a retrace and a size judgment at the same time.',
      'The capital K shares the l-loop opening and then splits into a kick: top loop, stem, then in toward the middle and out into a diagonal leg. The common error mirrors print muscle memory — a straight-in diagonal and straight-out leg with no loop, which is fine handwriting but not cursive. The small inward loop is the letter\'s cursive credential; trace it deliberately slow for the first several passes.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'The knot is a grain of rice',
        body: 'Same diet rule as the e loop: the k\'s inner loop should be the smallest thing on the page. If you can see daylight through it at ten paces, it is too big.',
      },
      {
        title: 'Retrace before you knot',
        body: 'Go up the stem first, then start the loop from the middle line. Knots tied from the baseline upward make the letter lean and collide with its tail.',
      },
      {
        title: 'Capital: loop, don\'t print',
        body: 'Watch for the print reflex — straight diagonal in, straight leg out. The inward loop at the middle is what makes capital K cursive; slow-trace it five times before speed.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital K in cursive?',
        a: 'Swing up and over into a loop at the top line, come down to the baseline, then make a small inward loop at the middle line and kick out into the diagonal leg, finishing with the exit tail.',
      },
      {
        q: 'How do you write a lowercase k in cursive?',
        a: 'Tall narrow loop to the top line, down to the baseline, retrace up to the middle line, tie a small slanted loop in and back out across the stem, then exit right.',
      },
      {
        q: 'Why does my cursive k look like an R?',
        a: 'The inner loop has grown to bowl size — when the knot fills the space between the lines, k reads as a lowercase R. Shrink the loop until it barely closes.',
      },
      {
        q: 'Is cursive k one stroke or two?',
        a: 'One, without lifting: loop down, retrace, knot, exit. The knot feels like a separate motion at first, but keep the pencil down — lifting is what makes the knot clumsy.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/l/', label: 'Cursive L — the plain tall loop' },
      { href: '/cursive/b/', label: 'Cursive B — loop plus bowl' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'K',
      lower: 'k',
      capitalSteps: [
        'Swing up and over into a loop at the top line.',
        'Come down to the baseline.',
        'Loop inward at the middle line — small.',
        'Kick out into the diagonal leg and exit right.',
      ],
      lowerSteps: [
        'Sweep up into a tall narrow loop to the top line.',
        'Come back down to the baseline.',
        'Retrace up to the middle line, tie a small slanted loop across the stem.',
        'Exit right from the loop.',
      ],
      pitfall: 'the knot inflating — an inner loop at bowl size turns k into R.',
    },
  },

  {
    slug: 'l',
    hub: 'cursive',
    h1: 'Cursive L',
    metaTitle: 'Cursive L — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital L and lowercase l, stroke by stroke, with a free printable practice sheet — the pure tall loop every loop letter builds on.',
    lead:
      'Lowercase l is the alphabet\'s cleanest stroke: up, loop, down, tail — nothing else. It is the first loop letter taught and the foundation for h, b, k and f. Both forms numbered below, with a printable sheet and the narrow-loop rule.',
    introHeading: 'The pure loop',
    intro: [
      'The lowercase l is cursive reduced to its essence: sweep from the baseline up past the middle line to the top, loop back left, come straight down, exit right. No bowl, no hump, no cross — the letter is a single climbing loop and it teaches the loop motion every other tall letter reuses. That is why programs teach it first in the loop family: once l is automatic, h is "l plus a hump," b is "l plus a bowl," k is "l plus a knot," f is "l with a tail and a crossbar." Five letters, one stroke, purchased once.',
      'The capital L is the lowercase wearing a long coat: loop at the top line, but instead of stopping at the baseline, the stroke sweeps out in a wide horizontal tail — the longest exit stroke in the alphabet. That tail is the capital\'s signature and its trap: too short and L reads as a grown-up l; too long and it strangles the next word. Aim for a tail about as wide as the letter is tall, and let it rise slightly — a sinking tail looks tired.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Loop like a needle thread',
        body: 'The l loop should be the narrowest stroke on the page — a sliver barely wider than the pencil line. Wide l-loops make tall letters eat two spaces each.',
      },
      {
        title: 'Name the derivatives',
        body: 'After l is smooth, narrate the family: "l plus hump is h... l plus bowl is b." Learners who hear the recipe remember they already own the hard part.',
      },
      {
        title: 'Capital tail: wide and slightly rising',
        body: 'The big L\'s sweep should be roughly letter-width, lifting a touch at the end. A drooping tail is the difference between L and a sickle.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital L in cursive?',
        a: 'Make a loop at the top line turning left, retrace down to the baseline, then sweep out horizontally into a long, slightly rising tail — the widest exit stroke of any capital.',
      },
      {
        q: 'How do you write a lowercase l in cursive?',
        a: 'Sweep up from the baseline to the top line in a narrow loop, come straight back down to the baseline, and exit right with a small tail.',
      },
      {
        q: 'Why are my cursive l\'s too wide?',
        a: 'The loop has lost its sliver shape — usually from writing at speed before the motion is set. Trace slowly with the cue "up like a flagpole, loop like a ribbon," and check that the loop is barely wider than the stroke itself.',
      },
      {
        q: 'Which letters are built from the l stroke?',
        a: 'h (loop + hump), b (loop + bowl), k (loop + knot) and f (loop + descender + crossbar) all begin with the identical tall loop — mastering l pre-loads the whole loop family.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/h/', label: 'Cursive H — l plus a hump' },
      { href: '/cursive/f/', label: 'Cursive F — l at both extremes' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'L',
      lower: 'l',
      capitalSteps: [
        'Loop at the top line, turning left.',
        'Retrace down to the baseline.',
        'Sweep out horizontally — long, letter-wide.',
        'Let the tail rise slightly at the end.',
      ],
      lowerSteps: [
        'Sweep up from the baseline to the top line.',
        'Loop back left — a narrow sliver.',
        'Come straight down to the baseline.',
        'Exit right with a small tail.',
      ],
      pitfall: 'the loop widening — a fat l-loop eats horizontal space and crowds every word it joins.',
    },
  },

  {
    slug: 'm',
    hub: 'cursive',
    h1: 'Cursive M',
    metaTitle: 'Cursive M — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital M and lowercase m, stroke by stroke, with a free printable practice sheet — the double-hump hill letter.',
    lead:
      'Lowercase m is n twice: downstroke, hump, hump, out. Two identical arches, evenly priced. Both forms numbered below, with a printable practice sheet and the second-hump check that catches most m mistakes.',
    introHeading: 'Two hills, same height',
    intro: [
      'The lowercase m is the alphabet\'s rhythm section: entry stroke, down, then two humps — each one up to the middle line and back down — before the exit. Its entire difficulty is equality. The second hump, written by a hand already moving, comes out shorter or narrower than the first almost every time, and an uneven m is the most common handwriting note on third-grade papers. The cure is counting: two humps, said out loud, at the same speed, each touching the same ceiling.',
      'The capital M is all shoulders: a top curve in, down to the baseline, then two retrace-and-hump sequences like a giant lowercase m, exiting with a tail. It is among the easiest capitals precisely because it reuses the lowercase motion at scale — teach the lowercase first and the capital arrives nearly free. The failure mode is drift: three humps instead of two, added when the hand is on autopilot. M has exactly two; count them.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Count the humps aloud',
        body: '"One... two... out." Spoken counts stop the mystery third hump and keep both arches the same height — the two fixes m needs most.',
      },
      {
        title: 'Same ceiling, same rent',
        body: 'Both humps touch the middle line. Trace a dashed middle line across the practice row so the second hump has no excuse.',
      },
      {
        title: 'Capital M = lowercase m at scale',
        body: 'Show the side-by-side once: same retrace-and-hump rhythm, taller walls. Learners who see the reuse skip a week of separate practice.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital M in cursive?',
        a: 'Curve in at the top line, down to the baseline, then retrace up and over two humps — like a large lowercase m — finishing the second hump at the baseline with an exit tail.',
      },
      {
        q: 'How do you write a lowercase m in cursive?',
        a: 'Entry stroke down to the baseline, then two humps — each rising to the middle line and returning — followed by the exit tail to the right.',
      },
      {
        q: 'Why does my m look like an n?',
        a: 'The second hump went missing — usually the hand exited early. Say "two" out loud while writing until the count is muscle, not memory.',
      },
      {
        q: 'How many strokes is cursive m?',
        a: 'One continuous stroke: down, up-over (hump one), up-over (hump two), tail. No pencil lift — retracing the same line is what keeps the humps connected.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/n/', label: 'Cursive N — the single-hump original' },
      { href: '/cursive/w/', label: 'Cursive W — valleys instead of hills' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'M',
      lower: 'm',
      capitalSteps: [
        'Curve in at the top line.',
        'Down to the baseline.',
        'Retrace up and over — first hump.',
        'Second hump the same height, then exit right.',
      ],
      lowerSteps: [
        'Entry stroke down to the baseline.',
        'Hump: up to the middle line and back down.',
        'Second hump — identical height.',
        'Exit right with a small tail.',
      ],
      pitfall: 'the second hump shrinking — an uneven m is the single most-flagged letter on school papers.',
    },
  },

  {
    slug: 'n',
    hub: 'cursive',
    h1: 'Cursive N',
    metaTitle: 'Cursive N — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital N and lowercase n, stroke by stroke, with a free printable practice sheet — the single-hump hill letter m multiplies.',
    lead:
      'Lowercase n is one entry stroke and one hump — the simplest of the hill letters and the template m and v build on. Both forms numbered below, with a printable sheet and the hump-height rule.',
    introHeading: 'One hill, fully paid',
    intro: [
      'The lowercase n is cursive\'s minimal hill: downstroke, then up to the middle line and over — one arch, one descent, one exit. It is the letter that teaches the retrace, the skill of climbing back up the same line before arching over, and it is deliberately taught before m so the doubled version is an extension, not a new challenge. The hump\'s height is the whole letter: an arch that stops short of the middle line produces r, and one that overshoots produces something read as h at a glance.',
      'The capital N is the lowercase stretched — curve in at the top, down, then one retrace-hump and out. As with M, the capital is free once the lowercase is owned; the only calibration is scale, the hump still rising to the letter\'s own middle. Names make it stick — Noah, Natalie, November — and the classic capital error is the print reflex: two separate uprights and a diagonal, drawn as pieces. Cursive N is one continuous road.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'The retrace is the lesson',
        body: 'Go up the same line you came down — not beside it. A retrace that drifts right leaves a gap that makes n look stitched together from parts.',
      },
      {
        title: 'Hump to the ceiling',
        body: 'The arch tops out exactly at the middle line — short of it is r, past it is h. Trace rows with a visible middle line until the ceiling is felt, not checked.',
      },
      {
        title: 'n first, then m for free',
        body: 'Teach n alone until automatic; then m is "n, do it again." One new letter becomes two with almost no extra teaching.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital N in cursive?',
        a: 'Curve in at the top line, down to the baseline, retrace up and over one hump to the middle of the letter, then down and out to the exit tail — one continuous stroke.',
      },
      {
        q: 'How do you write a lowercase n in cursive?',
        a: 'Entry downstroke to the baseline, retrace up to the middle line, arch over and come back down, then exit right with a small tail.',
      },
      {
        q: 'Why does my n look like an r?',
        a: 'The hump never reached the middle line. The arch has a ceiling — trace it against a marked middle line until full-height humps are automatic.',
      },
      {
        q: 'What\'s the difference between cursive n and m?',
        a: 'Hump count: n has one, m has two. They share the same entry, the same retrace, the same ceiling — m is just n asked to repeat itself.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/m/', label: 'Cursive M — n, twice' },
      { href: '/cursive/r/', label: 'Cursive R — the half-hump sibling' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'N',
      lower: 'n',
      capitalSteps: [
        'Curve in at the top line.',
        'Down to the baseline.',
        'Retrace up and over one full hump.',
        'Down and out to the exit tail.',
      ],
      lowerSteps: [
        'Entry stroke down to the baseline.',
        'Retrace up to the middle line.',
        'Arch over and come back down.',
        'Exit right with a small tail.',
      ],
      pitfall: 'the hump quitting below the middle line — n collapses into r.',
    },
  },

  {
    slug: 'o',
    hub: 'cursive',
    h1: 'Cursive O',
    metaTitle: 'Cursive O — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital O and lowercase o, stroke by stroke, with a free printable practice sheet — the curve that finally closes, and exits at the top.',
    lead:
      'Lowercase o is a c that shuts its door and exits over the top — the only letter that leaves from the summit. Both forms numbered below, with a printable practice sheet and the direction rule most self-taught writers get wrong.',
    introHeading: 'Close the door, leave from the top',
    intro: [
      'The lowercase o starts like its whole family — swing in from the baseline, curve up to the middle line — then commits where c held back: around the left, down, along the bottom, and up to close exactly where the curve began. And then the twist that defines the letter: the exit stroke leaves from the top, a small tail flicking right at the middle line. Every other letter exits from the baseline; o alone departs from the summit. That high exit is why the oa in "boat" and the ow in "snow" connect with a visible horizontal link — a detail that looks decorative until you write it wrong.',
      'The capital O is the lowercase at full height — same counterclockwise swing, close at the top, exit tail to the right. Direction is the rule most self-taught writers miss: the cursive o travels up and over to the left first (counterclockwise), the opposite of the print o most adults draw clockwise. Trace it big and slow a few times — the correct direction is what keeps o consistent with c, a, d and g, whose openings it shares.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Counterclockwise, always',
        body: 'Swing up and over to the left first — the same direction as c and a. A clockwise o is print with a slant, and it will fight every connection it meets.',
      },
      {
        title: 'Exit from the summit',
        body: 'The tail leaves at the top of the closed curve, not the baseline. Write "ol" and "on" to feel the high link — that is o\'s signature in connected words.',
      },
      {
        title: 'Round, not egg-shaped',
        body: 'Check traced o\'s for a tilt toward vertical egg shape — a wide egg o makes following letters crowd. The row lines on this sheet keep the proportion honest.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital O in cursive?',
        a: 'Swing in at the top line, arc up and over to the left (counterclockwise), sweep down around the bottom and up to close at the top, then exit right with a tail.',
      },
      {
        q: 'How do you write a lowercase o in cursive?',
        a: 'Swing in from the baseline to the middle line like a c, keep going around the left and bottom, close at the starting point, and exit with a small tail at the top.',
      },
      {
        q: 'Which direction does a cursive o go?',
        a: 'Counterclockwise — up and over to the left first, the same opening direction as c, a, d and g. Clockwise o\'s are a print habit that breaks connections.',
      },
      {
        q: 'Why does my o look disconnected from the next letter?',
        a: 'The exit left from the baseline instead of the top. Cursive o closes its circle and departs from the summit — a small rightward tail at the middle line.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/c/', label: 'Cursive C — o with the door open' },
      { href: '/cursive/a/', label: 'Cursive A — the family\'s workhorse' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'O',
      lower: 'o',
      capitalSteps: [
        'Swing in at the top line, arcing up.',
        'Curve over to the left — counterclockwise.',
        'Sweep down, around the bottom, and up.',
        'Close at the top, then exit right with a tail.',
      ],
      lowerSteps: [
        'Swing in from the baseline up to the middle line.',
        'Continue around the left and along the bottom.',
        'Rise to close where the curve began.',
        'Exit at the top with a small rightward tail.',
      ],
      pitfall: 'traveling clockwise — a reversed o breaks the curve family\'s shared opening and every connection after it.',
    },
  },

  {
    slug: 'p',
    hub: 'cursive',
    h1: 'Cursive P',
    metaTitle: 'Cursive P — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital P and lowercase p, stroke by stroke, with a free printable practice sheet — the straight-stemmed descender with a hill on top.',
    lead:
      'Lowercase p dives on a straight stem — the only letter besides q that descends without a bowl first. Both forms numbered below, with a printable sheet and the descender-lane rule.',
    introHeading: 'The straight diver',
    intro: [
      'The lowercase p is built like a signpost: a long straight stem driven well below the baseline, then back up the same line to build a small hill at the top — retrace, arch over, down, exit. It is the mirror lesson of g and j: those letters dive out of a curve, while p dives bare, which makes it the cleanest descender to teach. The stem\'s depth is the discipline — far enough to claim the descender lane, never so far it touches the writing line beneath, where it will fuzz into the next row.',
      'The capital P is a top loop with a bowl: up-and-over into a loop at the top line, down to the baseline, then back up to close a round bowl against the stem. Its reading risk is with the capital F at distance — both are loop-plus-stem letters — but P\'s bowl closes fully where F ends in a crossbar flourish. P also matters socially: it opens Please, and every letter a child signs "Please" on has already been practiced.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Stem straight, lane respected',
        body: 'The descender is a clean vertical on the slant, ending halfway into the space below — never touching the next line. Trace with the lane visible until the depth is automatic.',
      },
      {
        title: 'Hill after the return',
        body: 'Complete the stem first, then retrace up to the middle line for the hump — p\'s hump is n\'s hump wearing a diving board.',
      },
      {
        title: 'Bowl closes on the capital',
        body: 'The capital\'s bowl must meet the stem again before the letter ends. An open bowl is F territory — close it firmly and the letter is unmistakably P.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital P in cursive?',
        a: 'Swing up and over into a loop at the top line, come down to the baseline, retrace up and bowl around to the right, closing against the stem near the middle line.',
      },
      {
        q: 'How do you write a lowercase p in cursive?',
        a: 'Make a long straight downstroke from the middle line, well past the baseline into the descender lane; retrace up, arch over at the middle line like an n-hump, come down, and exit right.',
      },
      {
        q: 'How deep should the p tail go?',
        a: 'Roughly halfway into the space below the baseline — deep enough to read as a descender, never touching the writing line beneath. Same lane rule as g, j, q and y.',
      },
      {
        q: 'Why does my p look like an n on a stick?',
        a: 'The stem is too short — barely clearing the baseline. Give the stem its full dive before retracing; the hill needs its signpost.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/n/', label: 'Cursive N — the hill p wears' },
      { href: '/cursive/q/', label: 'Cursive Q — the other straight diver' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'P',
      lower: 'p',
      capitalSteps: [
        'Swing up and over into a loop at the top line.',
        'Come down to the baseline.',
        'Retrace up, then bowl around to the right.',
        'Close the bowl against the stem.',
      ],
      lowerSteps: [
        'Long straight downstroke — past the baseline into the descender lane.',
        'Retrace up to the middle line.',
        'Arch over and back down like an n-hump.',
        'Exit right with a small tail.',
      ],
      pitfall: 'a shallow stem — p needs the full dive before its hill, or it reads as n on a stick.',
    },
  },

  {
    slug: 'q',
    hub: 'cursive',
    h1: 'Cursive Q',
    metaTitle: 'Cursive Q — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital Q and lowercase q, stroke by stroke, with a free printable practice sheet — the crossed descender that ends nothing.',
    lead:
      'Lowercase q is an a with a comeback tail: the family stroke, the dive — then the tail crosses back to become its own exit. Both forms numbered below, with a printable sheet and the tail rule that keeps q from being a g.',
    introHeading: 'The tail that comes back',
    intro: [
      'The lowercase q runs the family play — swing in like c, close the bowl, dive through the baseline — and then adds the alphabet\'s only crossed descender: the tail swings left, loops or angles back to the right, crossing the downstroke and becoming the exit itself. In many American styles the result is described as a tiny number 8 or an open curl, and that cross-back is the entire difference from g: g\'s tail ends its business below the line, while q\'s tail returns to street level to connect. In connected writing q almost never ends a word — English orthography settles that — so its tail\'s homecoming is not decoration; it is the letter\'s job.',
      'The capital Q is a big O that grew a tail from its shoulder: full counterclockwise oval, closed at the top, then from the right side a sweep down past the baseline, swinging back right with an open curl. The D\'Nealian tradition closes that sweep into a figure-8 flourish. Either way the tail must be decisive — a capital Q whose tail barely clears the oval is just an O in costume, and the difference matters on the very first page of every alphabet book.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'The tail returns',
        body: 'q\'s descender is round-trip: down, swing left, cross back right over the stem, exit. A one-way tail is a g — say "come back" while tracing until the cross is automatic.',
      },
      {
        title: 'Family review first',
        body: 'Warm up with c, a, d, g — q is the last of the curve family and reuses all of them. Arriving warm, it takes one session.',
      },
      {
        title: 'Capital: give the tail room',
        body: 'The big Q\'s tail should pass clearly below the baseline before curling. Trace it next to a capital O — the contrast locks in which letter owns a tail.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital Q in cursive?',
        a: 'Draw a large counterclockwise oval closed at the top like an O, then from the right side sweep down past the baseline and swing back right into an open curl (D\'Nealian styles close it into a figure-8).',
      },
      {
        q: 'How do you write a lowercase q in cursive?',
        a: 'Swing in like a c to the middle line, close the bowl, dive through the baseline, then swing the tail left and cross back right over the downstroke — the cross becomes the exit.',
      },
      {
        q: 'What\'s the difference between cursive q and g?',
        a: 'The tail\'s return trip: g\'s tail finishes below the line (hook or loop), while q\'s tail crosses back up over its stem to connect. g ends its dive; q comes home.',
      },
      {
        q: 'Why does cursive q look like an 8?',
        a: 'The bowl plus the round-trip tail form two stacked closed shapes — many American styles teach it as "a small 8 that starts like a." The description sticks because the shape is honest.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/g/', label: 'Cursive G — the tail that stays down' },
      { href: '/cursive/a/', label: 'Cursive A — the shared opening' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'Q',
      lower: 'q',
      capitalSteps: [
        'Big counterclockwise oval, closed at the top — like an O.',
        'From the oval\'s right side, sweep down past the baseline.',
        'Swing back right with an open curl.',
        'Keep the tail decisive — clear the oval before curling.',
      ],
      lowerSteps: [
        'Swing in from the baseline to the middle line.',
        'Close the bowl like an a.',
        'Dive through the baseline.',
        'Swing left, then cross back right over the stem — the cross is the exit.',
      ],
      pitfall: 'the one-way tail — without the cross-back, q is just a g with stage fright.',
    },
  },

  {
    slug: 'r',
    hub: 'cursive',
    h1: 'Cursive R',
    metaTitle: 'Cursive R — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital R and lowercase r, stroke by stroke, with a free printable practice sheet — the half-hump letter that refuses to commit.',
    lead:
      'Lowercase r is n\'s little sibling: the entry stroke, then a shoulder that starts a hump and changes its mind. Half a hill, by design. Both forms numbered below, with a printable sheet and the bump rule.',
    introHeading: 'The half-hearted hump',
    intro: [
      'The lowercase r is the shortest of the hill letters because its hump never happens: entry stroke, retrace up, then a small shoulder bump that rises and turns right immediately into the exit — an arch that begins and leaves before reaching a full n\'s ceiling. That brevity is the letter. Writers who let the bump keep climbing have written n; writers who skip it entirely have written v or a bare stem. r lives in the gap between, and tracing it directly against n is the fastest way to feel the boundary.',
      'The capital R is a P that learned to kick: same top loop, same bowl, but from where the bowl meets the stem the stroke kicks out into a diagonal leg. It is one of the more elegant capitals — loop, bowl, leg, done — and its common failure is a leg that starts too low, dragging the letter into a stumble. The kick leaves from the bowl\'s closing point at the middle of the letter, not from the baseline.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Trace r over n',
        body: 'Write a row of n, then r directly beneath on the same lines. Seeing the identical start and the early exit once is worth ten explanations of "half hump."',
      },
      {
        title: 'Bump, then bail',
        body: 'The shoulder rises a third of the way and turns right — say "up and out." Any higher and r is impersonating n; the costume never fits.',
      },
      {
        title: 'Capital kick from the middle',
        body: 'The leg launches at the bowl\'s close, mid-letter. A kick from the baseline makes R look like it tripped on its own coat.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital R in cursive?',
        a: 'Loop at the top line, down to the baseline, bowl up and around closing against the stem, then kick out from that closing point into a diagonal leg, finishing with the tail.',
      },
      {
        q: 'How do you write a lowercase r in cursive?',
        a: 'Entry downstroke, retrace up, then a small shoulder bump that turns right almost immediately — half a hump — and exit with the tail.',
      },
      {
        q: 'Why does my r look like an n?',
        a: 'The shoulder climbed to the full middle line before exiting. r\'s bump is a suggestion, not a commitment — turn out a third of the way up.',
      },
      {
        q: 'How do you connect r to other letters?',
        a: 'Its exit tail is short and high, so r links cleanly into vowels (ri, re, ra) with a shallow join — one reason "are," "red" and "run" are standard early connected words.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/n/', label: 'Cursive N — the full-hump version' },
      { href: '/cursive/p/', label: 'Cursive P — the capital minus the kick' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'R',
      lower: 'r',
      capitalSteps: [
        'Loop at the top line.',
        'Down to the baseline.',
        'Bowl up and around, closing on the stem.',
        'Kick out from the close into the diagonal leg, then tail.',
      ],
      lowerSteps: [
        'Entry stroke down to the baseline.',
        'Retrace up a third of the height.',
        'Shoulder out right — half a hump.',
        'Exit with the tail.',
      ],
      pitfall: 'the shoulder climbing to a full hump — r dressed as n fools nobody for long.',
    },
  },

  {
    slug: 's',
    hub: 'cursive',
    h1: 'Cursive S',
    metaTitle: 'Cursive S — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital S and lowercase s, stroke by stroke, with a free printable practice sheet — the small swan and the big one.',
    lead:
      'Lowercase s is a swan in profile: a curve in, a neck down, a small tail-hook. The capital is the same bird at full size — and the most commonly mangled capital in the alphabet. Both numbered below, with a printable sheet.',
    introHeading: 'The swan, small and large',
    intro: [
      'The lowercase s keeps its print skeleton but learns to flow: swing in and up to the middle line, then a single S-curve down — out left, back right — finishing in a small hook that curls and exits along the baseline. One stroke, no pencil lift, and the letter should stay modest in size; an s written large develops a gap in its middle that reads as carelessness at any speed. The exit tail matters more here than in most letters: s is a high-frequency connector (st, sh, sk, sp), and its tail is the hinge for all of them.',
      'The capital S is the alphabet\'s prima donna — a big open double curve that writers either own or fear. The trick is scale and commitment: swing in at the top line with a full open curve down through the middle, then curl out at the baseline to the right. Small capital S\'s (a top-10 error) look cramped and juvenile; the letter wants its full height. It is also, with G and F, one of the three capitals teachers most often redraw on student work — trace it large, and slowly, several times before attempting it in words.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Keep the small s small',
        body: 'The lowercase lives between baseline and middle line — enlarging it opens a gap in the waist. If the middle of the s looks hollow, shrink the letter, don\'t fix the curve.',
      },
      {
        title: 'Big S: full height, full commitment',
        body: 'The capital uses its whole two-line height. A half-size capital S is the most common capital error on classroom walls — bigger and slower is the fix.',
      },
      {
        title: 'Practice s as a connector',
        body: 'Once the letter is smooth, drill "st" and "sh" — the s tail is the hinge of English\'s most common consonant clusters, and it deserves targeted reps.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital S in cursive?',
        a: 'Swing in at the top line into a full open curve, sweep down through the middle line in a big S-bend, then curl out to the right at the baseline with a small open tail — use the letter\'s full height.',
      },
      {
        q: 'How do you write a lowercase s in cursive?',
        a: 'Swing in and up to the middle line, curve back left and down in a single S-shape, then finish with a small hook at the baseline, exiting right along it.',
      },
      {
        q: 'Why does my cursive s look messy?',
        a: 'Almost always size — an oversized s develops a hollow waist and a drifting exit. Keep it between the two lines and let the exit tail stay flat along the baseline.',
      },
      {
        q: 'Does cursive s connect to t and h?',
        a: 'Constantly — st, sh, sk and sp are English workhorses. The s exit tail is deliberately flat and low, the perfect hinge for letters that start with a downstroke.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/t/', label: 'Cursive T — s\'s most common partner' },
      { href: '/cursive/g/', label: 'Cursive G — the other red-pen capital' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'S',
      lower: 's',
      capitalSteps: [
        'Swing in at the top line — full open curve.',
        'Sweep down through the middle in a big S-bend.',
        'Curl out to the right at the baseline.',
        'Finish with a small open tail.',
      ],
      lowerSteps: [
        'Swing in and up to the middle line.',
        'Curve back left and down — one S-shape.',
        'Finish in a small hook at the baseline.',
        'Exit right, flat along the line.',
      ],
      pitfall: 'an oversized lowercase — the s waist hollows out and the exit drifts off its hinge.',
    },
  },

  {
    slug: 't',
    hub: 'cursive',
    h1: 'Cursive T',
    metaTitle: 'Cursive T — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital T and lowercase t, stroke by stroke, with a free printable practice sheet — the up-and-over stroke with a crossbar.',
    lead:
      'Lowercase t swings up and over before dropping to the baseline — a short stroke with a curl on top and a crossbar at the middle. Both forms numbered below, with a printable sheet and the crossbar rule.',
    introHeading: 'Up, over, down, cross',
    intro: [
      'The lowercase t begins differently from every letter before it: instead of entering from the baseline, the stroke starts just below the middle line, swings up and curls left over the top, then drops to the baseline and exits. The crossbar comes after, at the middle line — and its placement is the letter\'s identity: a cross that rides high crowds the curl, one that rides low makes the t read as an undotted something. In connected writing t\'s tail flows on, and t is the letter that makes "it," "to" and "the" the first real words a cursive class writes.',
      'The capital T is a top flourish and a stem: the stroke curls in at the top line, loops or swings left, then comes down to the baseline and sweeps out in a wide rightward tail — the whole top of the letter made in one horizontal gesture. That top sweep is T\'s signature and its trap: too small and the letter reads as a plain stem, too big and it bullies the next word. Aim for a top about as wide as the letter is tall — a gate, not a fence.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Cross at the middle, cross last',
        body: 'Same pass rule as i\'s dot: write the word, then cross every t in one sweep. Middle-line placement — high crosses crowd the curl, low crosses read as noise.',
      },
      {
        title: 'Feel the up-and-over entry',
        body: 't is the first letter entered from above — starting just below the middle line and curling over. Trace it slowly; the reversed entry is t\'s only new skill.',
      },
      {
        title: 'Capital: gate, not fence',
        body: 'The big T\'s top sweep is letter-width — wide enough to declare itself, narrow enough to let the next word breathe.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital T in cursive?',
        a: 'Curl in at the top line and swing left into a wide top loop or sweep, then come down to the baseline and finish with a rightward tail — the entire top of the letter made in one horizontal gesture.',
      },
      {
        q: 'How do you write a lowercase t in cursive?',
        a: 'Start just below the middle line, swing up and curl left over the top, drop straight to the baseline, exit right — then cross at the middle line.',
      },
      {
        q: 'Where does the crossbar go on cursive t?',
        a: 'On the middle line, added after the word is written in the same pass as i-dots. The cross is level and just wide enough to clear the stem\'s curl.',
      },
      {
        q: 'Why does cursive t start from the top?',
        a: 'Its entry stroke arrives from above — a small curl over the top — so the letter flows into downstroke letters like no baseline-entry letter can. That curl is also what keeps t distinct from a short l.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/i/', label: 'Cursive I — dot and cross, the daily pair' },
      { href: '/cursive/f/', label: 'Cursive F — the other crossed letter' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'T',
      lower: 't',
      capitalSteps: [
        'Curl in at the top line.',
        'Swing left into a wide top loop or sweep.',
        'Come down to the baseline.',
        'Finish with a rightward tail.',
      ],
      lowerSteps: [
        'Start just below the middle line.',
        'Swing up and curl left over the top.',
        'Drop to the baseline and exit right.',
        'Cross at the middle line, after the word.',
      ],
      pitfall: 'the crossbar wandering — middle line, level, last. Everywhere else it is just a stray mark.',
    },
  },

  {
    slug: 'u',
    hub: 'cursive',
    h1: 'Cursive U',
    metaTitle: 'Cursive U — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital U and lowercase u, stroke by stroke, with a free printable practice sheet — the cup shape that must stay sharp.',
    lead:
      'Lowercase u is two downstrokes joined by a curve underneath — a cup with a tail. Both forms numbered below, with a printable sheet and the second-stroke check that keeps u from blurring into w.',
    introHeading: 'The cup and its second wall',
    intro: [
      'The lowercase u is the straight-line family\'s curve lesson: downstroke, then a rounded swing under (the cup) rising back to the middle line, then a second downstroke and exit. Its subtlety is in that second wall — it must mirror the first in height and slant, or the letter lists to one side. And its neighbor-confusion is with w, which is two cups, not one: writers on autopilot sometimes round the second downstroke into a second swing and discover they have written w with no intention to. Count walls: u has two, w has three.',
      'The capital U can be built two ways — the print-like twin stems with an under-curve, or the cursive-traditional bowl: curve in at the top, down, sweep under and up, then down again to the baseline with a tail. The cursive bowl version keeps the letter in the script\'s family and connects the eye to the lowercase; the stem version is easier for tired hands. Both appear in American classrooms — this sheet teaches the bowl, with the stems drawn in one continuous road.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Count the walls',
        body: 'One cup, two walls. A third wall or a rounded second downstroke means w snuck in — writers genuinely do this on autopilot at speed.',
      },
      {
        title: 'Cup is round, walls are straight',
        body: 'The underneath curve is a half-circle; the walls are straight on the slant. If the walls curve inward, the cup becomes a saucer and the letter loses height.',
      },
      {
        title: 'Same exit as everything else',
        body: 'The second downstroke exits right with the standard small tail — a u that skips the tail dead-ends before v, its next-of-kin.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital U in cursive?',
        a: 'Curve in at the top line, down to the baseline, sweep under in a bowl and back up to the top line, then down again to the baseline, finishing with the exit tail.',
      },
      {
        q: 'How do you write a lowercase u in cursive?',
        a: 'Downstroke from the middle line, curve under to the right and back up to the middle line (the cup), then a second downstroke to the baseline and exit right.',
      },
      {
        q: 'What\'s the difference between cursive u and w?',
        a: 'Cup count: u is one cup (two walls), w is two cups (three walls). At speed, rounding u\'s second wall into another cup is how accidental w\'s happen.',
      },
      {
        q: 'Why does my u look like a saucer?',
        a: 'The walls leaned inward — usually the slant drifting between strokes. Trace over marked slant lines until both walls stand at the same angle; the cup does the curving, not the walls.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/w/', label: 'Cursive W — u, doubled' },
      { href: '/cursive/v/', label: 'Cursive V — the cup\'s sharp cousin' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'U',
      lower: 'u',
      capitalSteps: [
        'Curve in at the top line.',
        'Down to the baseline.',
        'Sweep under in a bowl, back up to the top line.',
        'Down again to the baseline, exit right.',
      ],
      lowerSteps: [
        'Downstroke from the middle line.',
        'Curve under to the right — the cup.',
        'Rise back to the middle line.',
        'Second downstroke, then exit right.',
      ],
      pitfall: 'the second wall rounding into another cup — the writer has made a w nobody ordered.',
    },
  },

  {
    slug: 'v',
    hub: 'cursive',
    h1: 'Cursive V',
    metaTitle: 'Cursive V — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital V and lowercase v, stroke by stroke, with a free printable practice sheet — the valley letter with a point, not a cup.',
    lead:
      'Lowercase v looks like u until you reach the bottom: where u curves, v turns on a dime. Both forms numbered below, with a printable sheet and the sharp-valley rule.',
    introHeading: 'The valley with a point',
    intro: [
      'The lowercase v runs u\'s opening play — downstroke — but at the baseline it refuses the cup and makes a point instead: a sharp turn back up to the middle line, then the standard exit tail. The point is the letter. A rounded valley is a u; a hesitant one drifts into a scribble; only a confident corner reads as v. This is the first letter where "stop and turn" is the skill, and it transfers directly to w (two valleys) and y (valley plus dive), so the crispness learned here pays out three times.',
      'The capital V is a top curve and a clean diagonal pair: curl in at the top line, slant down to a point at the baseline, then back up — with, in many styles, a small top curl finishing the second stroke before the exit. The classic error at both sizes is the sagging valley: the point drifting up the page until the letter looks like a shallow bowl. Trace with the baseline visible and touch it — the valley\'s floor belongs exactly on the line.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Point, not cup',
        body: 'Say "down, TURN, up" — the middle word is a corner, not a curve. Ten traced v\'s against a marked baseline install the turn faster than a hundred blended ones.',
      },
      {
        title: 'The valley touches bottom',
        body: 'The point sits exactly on the baseline. A valley that floats high makes v read as a weak u — check the floor on every rep.',
      },
      {
        title: 'Preview w and y',
        body: 'After v is crisp, write w (two valleys) and note y\'s valley-plus-dive. The point skill is shared — point it out and two future letters arrive pre-installed.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital V in cursive?',
        a: 'Curl in at the top line, slant down to a sharp point at the baseline, then back up to the top, finishing with a small curl and the exit tail.',
      },
      {
        q: 'How do you write a lowercase v in cursive?',
        a: 'Downstroke to the baseline, turn sharply at the bottom — point, not curve — back up to the middle line, then exit right with a small tail.',
      },
      {
        q: 'What\'s the difference between cursive v and u?',
        a: 'The bottom: u swings under in a rounded cup, v turns on a sharp point. Same two walls, completely different floor.',
      },
      {
        q: 'Why does my v look like a u?',
        a: 'The valley rounded off — the turn needs a corner. Slow the downstroke\'s ending so the change of direction is a decision, not a drift.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/w/', label: 'Cursive W — v, twice' },
      { href: '/cursive/y/', label: 'Cursive Y — the valley that dives' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'V',
      lower: 'v',
      capitalSteps: [
        'Curl in at the top line.',
        'Slant down to a sharp point at the baseline.',
        'Back up to the top line.',
        'Finish with a small curl and exit tail.',
      ],
      lowerSteps: [
        'Downstroke from the middle line.',
        'Turn sharply at the baseline — a corner.',
        'Back up to the middle line.',
        'Exit right with a small tail.',
      ],
      pitfall: 'the rounded valley — without its point, v is just u with posture problems.',
    },
  },

  {
    slug: 'w',
    hub: 'cursive',
    h1: 'Cursive W',
    metaTitle: 'Cursive W — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital W and lowercase w, stroke by stroke, with a free printable practice sheet — two valleys, matched like a pair.',
    lead:
      'Lowercase w is v written twice without stopping — two sharp valleys, evenly matched. Both forms numbered below, with a printable sheet and the pairing rule.',
    introHeading: 'Two valleys, one letter',
    intro: [
      'The lowercase w inherits everything from v — downstroke, sharp turn, upstroke — and simply repeats it: valley, valley, out. Its single demand is equality. The second valley, written by a hand already moving, tends to run narrower or shallower than the first, and an uneven w is instantly recognizable as beginner work. Trace the pair to a rhythm — "down-up, down-up, out" — and the two valleys come out twins.',
      'The capital W is the doubled capital V: top curl, valley, peak, valley, and out with a tail. It is one of the wider capitals and needs its full width — a compressed W crams both valleys until the letter reads as a stack of slashes. Give the first valley the same depth as the second and both peaks the same height; symmetry is the entire job.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Rhythm over geometry',
        body: '"Down-up, down-up, out" — spoken evenly. A metronome mouth makes matched valleys faster than a careful eye does.',
      },
      {
        title: 'Give it width',
        body: 'The lowercase w is one of the widest small letters; squeezing it makes the valleys unreadable. Two v\'s of space, minimum.',
      },
      {
        title: 'Peaks match too',
        body: 'Both upstrokes return to the same middle-line ceiling. A second peak that quits early is the subtle version of the same error.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital W in cursive?',
        a: 'Curl in at the top line, slant down to the first valley point at the baseline, back up, down to the second valley, then up and out with the exit tail — two matched V-shapes.',
      },
      {
        q: 'How do you write a lowercase w in cursive?',
        a: 'Downstroke to a sharp point, up to the middle line, then a second downstroke to another sharp point, back up, and exit right — v twice without lifting.',
      },
      {
        q: 'Why does my w look lopsided?',
        a: 'The second valley went narrower or shallower than the first — the standard autopilot error. Slow to a spoken rhythm and both valleys come out even.',
      },
      {
        q: 'Is cursive w just two v\'s?',
        a: 'Exactly — same point turn, same ceiling, written twice in one stroke. Every fix that works on v installs on w for free.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/v/', label: 'Cursive V — the single valley' },
      { href: '/cursive/u/', label: 'Cursive U — the cupped contrast' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'W',
      lower: 'w',
      capitalSteps: [
        'Curl in at the top line.',
        'Down to the first valley point, back up.',
        'Down to the second valley point.',
        'Up and out with the exit tail.',
      ],
      lowerSteps: [
        'Downstroke to a sharp point.',
        'Up to the middle line.',
        'Second downstroke to a second sharp point.',
        'Back up and exit right.',
      ],
      pitfall: 'the second valley shrinking — uneven twins are the tell-tale of beginner w.',
    },
  },

  {
    slug: 'x',
    hub: 'cursive',
    h1: 'Cursive X',
    metaTitle: 'Cursive X — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital X and lowercase x, stroke by stroke, with a free printable practice sheet — the crossing letter that still needs a tail.',
    lead:
      'Lowercase x is two slanted strokes that cross — and then, unlike print, one of them keeps going into an exit tail. Both forms numbered below, with a printable sheet.',
    introHeading: 'Crossed, and still connecting',
    intro: [
      'The lowercase x is the hill family\'s rebel: two straight slants, drawn separately, crossing at the middle. The first stroke runs down-right from the middle line to the baseline; the second starts back at the middle line and slants down-left, crossing the first — and this second stroke, in cursive, continues past the crossing to become the exit tail. That continuing tail is the letter\'s cursive credential: print x stops dead at the crossing, cursive x flows out of it. In connected writing the tail is real work, because x ends plenty of words (box, fox, six) but begins almost none.',
      'The capital X is two grand curves and a cross: curl in at the top, slant down to the baseline, then a second top curl slanting down-left through the first stroke, finishing with the exit. The mirrored top curls are what make it cursive rather than two printed diagonals — resist the reflex to draw bare sticks. X is rare enough in words that it survives mostly on assignments\' "X the correct box" — which is, fittingly, one more place good handwriting shows.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Second stroke owns the tail',
        body: 'Only the down-left stroke continues into the exit. Drawing the tail off the first stroke makes the crossing lopsided — the exit belongs to stroke two.',
      },
      {
        title: 'Cross at the middle',
        body: 'The intersection sits at the middle line, halfway down both strokes. A high cross makes the letter top-heavy; a low one, anemic.',
      },
      {
        title: 'Curls, not sticks, on the capital',
        body: 'Both capital strokes open with the small top curl. Bare diagonals are print — the curls are the whole difference in style.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital X in cursive?',
        a: 'Curl in at the top line and slant down to the baseline; then curl in again at the top and slant down-left, crossing the first stroke near the middle, finishing with the exit tail.',
      },
      {
        q: 'How do you write a lowercase x in cursive?',
        a: 'From the middle line, slant down-right to the baseline; return to the middle line and slant down-left, crossing the first stroke — then continue that second stroke into the exit tail.',
      },
      {
        q: 'Does cursive x connect to other letters?',
        a: 'Through the second stroke\'s tail — and mostly at the ends of words (box, six, fox), since almost no English word begins with x. The tail is still drawn; the next letter simply rarely comes.',
      },
      {
        q: 'Why does my cursive x look printed?',
        a: 'Missing exit tail, missing top curls. Cursive x flows out of its crossing — add the tail on the lowercase and the curls on the capital and the letter rejoins the script.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/z/', label: 'Cursive Z — the family\'s finale' },
      { href: '/cursive/y/', label: 'Cursive Y — the other hill descender' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'X',
      lower: 'x',
      capitalSteps: [
        'Curl in at the top line, slant down to the baseline.',
        'Curl in at the top again.',
        'Slant down-left, crossing the first stroke near the middle.',
        'Continue into the exit tail.',
      ],
      lowerSteps: [
        'From the middle line, slant down-right to the baseline.',
        'Return to the middle line.',
        'Slant down-left, crossing the first stroke.',
        'Continue the second stroke into the exit tail.',
      ],
      pitfall: 'stopping dead at the crossing — cursive x flows out of the intersection or it is just print.',
    },
  },

  {
    slug: 'y',
    hub: 'cursive',
    h1: 'Cursive Y',
    metaTitle: 'Cursive Y — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital Y and lowercase y, stroke by stroke, with a free printable practice sheet — the valley that keeps going below the line.',
    lead:
      'Lowercase y is v with commitment: the same sharp valley, then the second stroke dives through the baseline into a tail. Both forms numbered below, with a printable sheet and the dive rule.',
    introHeading: 'The valley that dives',
    intro: [
      'The lowercase y takes v\'s motion and extends its second act: downstroke to a sharp valley point, back up — and then a long drop through the baseline into the descender lane, tailing left and exiting right. The valley must keep its point even though the letter\'s center of gravity moves underground; a y that softens its turn becomes a u with a tail, and the eye notices instantly. The dive follows the standard descender rules — halfway into the space below, never touching the line beneath.',
      'The capital Y is built two ways in American classrooms: the straightforward two-stroke — small top loop on the first slant, then the second slant crossing down through the baseline into a tail — or the more ornamental one-stroke swing. This sheet teaches the two-stroke: it is the version children meet in most programs, and its pitfall is the same as the lowercase\'s — a tail that loses its nerve at the baseline. The capital\'s tail should pass below the line with the same confidence the lowercase shows.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'Keep the point, add the dive',
        body: 'The letter is still v until the second stroke drops — sharp valley, then through the line. Softening the turn to "help" the dive is how y becomes u-with-tail.',
      },
      {
        title: 'Descender lane rules apply',
        body: 'The tail ends halfway into the space below — deep enough to claim the lane, clear of the next writing line. Trace with the row beneath visible.',
      },
      {
        title: 'Drill y next to v and g',
        body: 'v teaches the valley, g teaches the dive — y is both. A three-letter warm-up row (v g y) installs the combination faster than y alone.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital Y in cursive?',
        a: 'Make a small top loop and slant down to the baseline, then from the top line slant down-left, crossing the first stroke and continuing past the baseline into a tail with the exit.',
      },
      {
        q: 'How do you write a lowercase y in cursive?',
        a: 'Downstroke to a sharp valley point at the baseline, back up to the middle line, then drop straight through the baseline into the descender lane, tailing left and exiting right.',
      },
      {
        q: 'Why does my y look like a v?',
        a: 'The second stroke stopped at the baseline instead of diving. The valley is only half the letter — "down, up, THROUGH" is the full count.',
      },
      {
        q: 'How does y connect to the next letter?',
        a: 'Its tail swings left below the baseline, then the exit rises right back to the baseline to meet the next letter — the same hook-and-return rhythm as g and j.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/v/', label: 'Cursive V — y without the dive' },
      { href: '/cursive/g/', label: 'Cursive G — the dive from a bowl' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'Y',
      lower: 'y',
      capitalSteps: [
        'Small top loop, slant down to the baseline.',
        'From the top line, slant down-left.',
        'Cross the first stroke.',
        'Continue past the baseline into the tail and exit.',
      ],
      lowerSteps: [
        'Downstroke to a sharp valley point.',
        'Back up to the middle line.',
        'Drop straight through the baseline.',
        'Tail left, then exit right back at the baseline.',
      ],
      pitfall: 'a tail that loses its nerve — a y stopped at the baseline is only half a letter.',
    },
  },

  {
    slug: 'z',
    hub: 'cursive',
    h1: 'Cursive Z',
    metaTitle: 'Cursive Z — Capital & Lowercase, Free Printable | ChartGlade',
    metaDescription:
      'How to write a cursive capital Z and lowercase z, stroke by stroke, with a free printable practice sheet — the hill family\'s zigzag finale with a tail.',
    lead:
      'Lowercase z is the hill family\'s finale: a small curve over the top, a slanted dash down, and a swing out with the exit tail. Both forms numbered below, with a printable sheet.',
    introHeading: 'The zigzag that learned to connect',
    intro: [
      'The lowercase z keeps print\'s zigzag skeleton — top stroke, diagonal, bottom stroke — but rounds its corners and ends with an exit tail that print never had. Some styles add a tiny loop at the top instead of the plain curve; both are taught in American programs, and this sheet draws the looped version lightly, since it matches the entry style of the rest of the lowercase. The letter is rare — z closes out words like jazz and buzz — and short; its main risk is overthinking: writers who hesitate at the diagonal produce a kinked, cramped z. One confident motion, corner to corner.',
      'The capital Z is the lowercase scaled up with a flourish tradition: a top swing with a loop or wave, the diagonal down-left, then the bottom stroke sweeping right into the exit tail. In the looped styles the top loop is pronounced — a little ticket-scroll — while plainer styles keep it as a soft wave. Either way the diagonal is the spine: it should run corner to corner at the letter\'s full height, not sag into the middle. Z is the last letter most programs teach, which makes it the traditional "finish line" — worth a small ceremony on the sheet.',
    ],
    printNote: 'Sheet prints one letter page, portrait: both letterforms, numbered strokes, trace-and-write rows.',
    tips: [
      {
        title: 'One motion, corner to corner',
        body: 'Hesitation at the diagonal kinks the letter — say "over, down, out" and keep the pencil moving. A confident z is clean even when imperfect.',
      },
      {
        title: 'Don\'t inflate the top loop',
        body: 'If your style loops the top, keep it a curl, not a hoop — the loop is an entry gesture, not the letter\'s main event.',
      },
      {
        title: 'End the alphabet with words',
        body: 'z\'s celebratory words: jazz, buzz, zebra, zip. A finish-line row of real words lands the whole alphabet better than a final sheet of isolated letters.',
      },
    ],
    faqs: [
      {
        q: 'How do you write a capital Z in cursive?',
        a: 'Swing in at the top line with a loop or wave, slant down-left corner to corner, then sweep right along the baseline into the exit tail.',
      },
      {
        q: 'How do you write a lowercase z in cursive?',
        a: 'Curve over the top to the middle line, slant down-left to the baseline, then swing right along the line and out with the exit tail — one motion, corners rounded.',
      },
      {
        q: 'Does cursive z have a loop?',
        a: 'Some styles loop the top entry (this sheet draws it lightly), others use a plain curve — both are standard American forms. What is not optional is the exit tail.',
      },
      {
        q: 'Why is z taught last?',
        a: 'It is rare in words and adds no new skill — by the time a learner reaches it, everything z does has been learned twice over. Programs keep it for the finish line.',
      },
    ],
    related: [
      { href: '/cursive-alphabet/', label: 'Full cursive alphabet chart (all 26 letters)' },
      { href: '/cursive/x/', label: 'Cursive X — the penultimate rebel' },
      { href: '/cursive/y/', label: 'Cursive Y — the hill that dives' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
    sheet: {
      capital: 'Z',
      lower: 'z',
      capitalSteps: [
        'Swing in at the top line with a loop or wave.',
        'Slant down-left — corner to corner, no sag.',
        'Sweep right along the baseline.',
        'Finish with the exit tail.',
      ],
      lowerSteps: [
        'Curve over the top to the middle line.',
        'Slant down-left to the baseline.',
        'Swing right along the line.',
        'Exit right with the tail.',
      ],
      pitfall: 'hesitation at the diagonal — a kinked z is a slowed z; keep the motion corner to corner.',
    },
  },
];
