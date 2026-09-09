import type { PageDef } from './pageTypes';

/**
 * Cursive cluster — the volume pillar (bare "cursive alphabet" is 201K US/mo;
 * page-level SERP is soft: a Pinterest pin, a Reddit thread, two UR-0 internal
 * search pages and an EMD microsite hold 5 of the top 10 spots).
 *
 * Worksheet/practice-sheets intent is ABSORBED by the trace strip on this page
 * (audited: those SERPs are worksheet-library home turf — K5, SuperTeacher,
 * Canva, TPT — so we don't build a separate worksheet page and don't expect
 * to rank there first). Chart + bare word + "alphabet in cursive" are the
 * primary targets; they share this SERP's page set.
 */
export const cursivePages: PageDef[] = [
  {
    slug: 'cursive-alphabet',
    hub: 'cursive',
    h1: 'Cursive Alphabet',
    metaTitle: 'Cursive Alphabet Chart (A-Z, Free Printable) | ChartGlade',
    metaDescription:
      'The full cursive alphabet — uppercase and lowercase A-Z in one printable chart, with a tracing strip and the stroke groups teachers use to teach it.',
    lead:
      'One printable cursive chart with the whole alphabet on it: capitals and lowercase together, in a continuous script with a consistent slant, plus a light-gray tracing strip below for practice. Print it for the wall or the desk — and read how the letters are actually taught, in stroke families rather than A-to-Z order.',
    introHeading: 'How the cursive alphabet is actually taught',
    intro: [
      'Cursive is taught in stroke families, not alphabetical order. The lowercase letters that start with the same curve — c, a, d, g, q — are learned together as one motion; then the straight-line letters (i, t, u, w); then the loop letters (l, h, b, k, f); then the hill letters (n, m, v, x, y, z). A group learned once carries five letters. Capitals come after lowercase, and only the letters a child actually uses — the I, the first letter of their name — get real mileage at first.',
      'Two habits decide whether cursive looks like cursive: consistent slant and consistent height. Every downstroke should lean the same direction, and every lowercase letter should sit between the baseline and the same top line. The chart above keeps both uniform on purpose — when tracing, match the slant exactly, and speed is never the goal. Legible-and-steady beats fast-and-shaky every time, and shaky speed is the habit that takes months to unlearn.',
      'One honest note on styles: American schools teach different cursive styles — Zaner-Bloser letters are rounder and more upright, D\'Nealian letters slant with looping tails — and your child\'s school may ask for a specific one. The chart here is a clean, continuous script in the general American tradition; the letterforms a child traces at school may differ in small strokes. The stroke families above are common to nearly all of them, which is why this chart teaches the families explicitly.',
    ],
    extraSection: {
      heading: 'Every cursive letter, A to Z — the chart and the letter pages',
      paras: [
        'This cursive chart is the one-page overview: all 52 forms — 26 capitals and 26 lowercase letters — on a single printable sheet for the wall or the desk. When one letter needs more than a glance, every letter also has its own page here, from /cursive/a/ through /cursive/z/. Each letter page breaks the capital and the lowercase into numbered strokes, prints as a trace-and-write practice sheet, names the single most common mistake for that specific letter, and answers the questions people actually ask (how to write the capital, why it looks wrong, whether it connects).',
        'The chart and the letter pages serve two different moments. Searching for a "cursive chart" usually means the overview moment — one sheet, every letter, hang it up and go. Searching for one cursive letter usually means the stuck moment — a capital that keeps coming out wrong, a child who needs tonight\'s homework letter explained. Print the chart once for reference, then jump straight to the letter page you are stuck on; start with the family letters (c, a, d) and the rest arrive faster than the alphabet order suggests.',
      ],
    },
    printNote: 'Chart + tracing strip fit one letter page, portrait.',
    interactive: true,
    tips: [
      {
        title: 'Start with the family, not the alphabet',
        body: 'c → a → d → g → q is one stroke learned five times. Practicing the family in order builds the motion; practicing a-to-z builds nothing but fatigue.',
      },
      {
        title: 'Trace slow, then write bare',
        body: 'Two or three passes over the gray tracing letters, then the same letters on blank paper. If the blank version collapses, the tracing went too fast — slow is the shortcut.',
      },
      {
        title: 'Tilt the paper, not the wrist',
        body: 'Right-handers tilt the page about 30° left (top-left corner up); left-handers mirror it. The slant comes from the paper angle — wrists that bend to force a slant are the source of most cursive pain.',
      },
      {
        title: 'The name is the prize',
        body: 'Capitals click when they spell something: a child\'s own name, then family names, then the days of the week. Signature-first is not cheating; it is the oldest motivation in the book.',
      },
    ],
    faqs: [
      {
        q: 'What is the cursive alphabet?',
        a: 'The 26 letters written in their connected, flowing forms — each uppercase and lowercase letter has a cursive version with entry and exit strokes that link letters into words. The chart above shows all 52 forms on one printable sheet.',
      },
      {
        q: 'Is cursive still taught in schools?',
        a: 'In many states, yes — a wave of legislation in the 2010s-2020s restored cursive requirements that had lapsed under Common Core, which left the decision to states. Where it is taught, third grade is the most common year for formal instruction.',
      },
      {
        q: 'What grade do students learn cursive?',
        a: 'Typically grade 3, after print handwriting is secure — some schools start the simplest lowercase strokes at the end of grade 2. By grades 4-5 students usually choose between print and cursive for daily work.',
      },
      {
        q: 'Capital or lowercase first?',
        a: 'Lowercase, nearly always. Lowercase letters connect into words, occur far more often, and cluster into stroke families that teach five letters at once. Capitals are introduced after — usually starting with the letters in the child\'s own name.',
      },
      {
        q: 'What are the different cursive styles?',
        a: 'The two common American school styles are Zaner-Bloser (rounder, more upright) and D\'Nealian (slanted with looping tails); other programs add their own variants. The stroke families are shared across nearly all of them, which is why the chart teaches by family — but if your school specifies a style, match it for homework.',
      },
      {
        q: 'Can I print this as a practice sheet?',
        a: 'Yes — the chart and the gray tracing strip print on one letter page. For repeated practice, print several copies or slide one into a dry-erase pocket and trace with a marker.',
      },
      {
        q: 'Where can I get a free cursive chart to print?',
        a: 'This page is one: the cursive chart above prints straight from your browser on a single letter sheet — no download, no sign-up, no watermark. For letter-by-letter practice, every letter also has its own sheet at /cursive/a/ through /cursive/z/.',
      },
      {
        q: 'Do you have every cursive letter from A to Z?',
        a: 'Yes — the chart above shows all 26 at once, and each letter has its own page at /cursive/a/ through /cursive/z/ with numbered strokes for both forms, a printable practice sheet, that letter\'s most common mistake, and letter-specific teaching tips.',
      },
      {
        q: 'What\'s the difference between a cursive alphabet chart and cursive worksheets?',
        a: 'A chart is the one-page reference — every letterform visible together for the wall or a quick check. Worksheets are for repeated practice of one letter at a time. The letter pages here combine both: the explanation a chart can\'t give, plus trace-and-write rows that print like a worksheet.',
      },
    ],
    related: [
      { href: '/cursive/f/', label: 'Cursive F — a full stroke-by-stroke letter page' },
      { href: '/alphabet-chart/', label: 'Print alphabet chart (the pre-cursive step)' },
      { href: '/third-grade-sight-words/', label: 'Third grade sight words (same age, reading side)' },
      { href: '/cursive/', label: 'Cursive hub' },
    ],
  },
];
