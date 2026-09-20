import type { PageDef } from './pageTypes';

/**
 * Name tracing generator (V1.6, judged 2026-09-06): "name tracing generator"
 * 1.6K/KD13 + "free name tracing generator" + "cursive name tracing" all land
 * on this one interactive page (KD 13 is the softest of the batch). SERP is
 * all small sites and EMD microsites — the independent-tool profile. V2
 * amplifier if it ranks: top-100 baby names matrix.
 */
export const nameTracingPage: PageDef = {
  slug: 'name-tracing',
  hub: 'cursive',
  h1: 'Name Tracing Generator',
  metaTitle: 'Name Tracing Generator — Free Printable Practice Sheet | ChartGlade',
  metaDescription:
    'Type any name and print a tracing worksheet: one model row, gray trace rows and blank guided lines — in print or cursive. Free, no sign-up, prints on letter paper.',
  lead:
    'Type a name, pick print or cursive, and print the sheet: the name in dark ink as a model, five rows to trace over in light gray, then blank lines with guides to write it solo. The sheet is ready to print right now with a sample name — no download, no sign-up.',
  introHeading: 'Why the name comes first',
  intro: [
    'A child\'s own name is the first word most American kids learn to write — usually in pre-K, before they can reliably form any other word. It is personal, it is on every paper they will ever hand in, and it carries the two habits handwriting is built on: a capital letter to start, and left-to-right order across the page. Name tracing worksheets are the standard vehicle because tracing lets the hand learn the letter shapes without yet having to remember them — the gray letters do the remembering while the muscle does the learning.',
    'Use the generator the way teachers do: type the first name exactly as it will appear at school (nicknames trace like throwaway practice; the real name sticks), print or cursive to match what the class is working on, and print several copies. One copy gets traced with a finger, one with a crayon, one saved for next week — the same name fresh three times beats three names once each. The rows follow the classic format: model, trace, then blank guide lines so the child graduates from following to producing in the same session.',
  ],
  printNote: 'Sheet prints on one letter page, portrait — model row, five trace rows, two blank rows.',
  interactive: true,
  tips: [
    {
      title: 'Finger before pencil',
      body: 'Trace the gray letters with a finger first — two slow passes. The motion lives in the muscle before it lives in the pencil, and finger-tracing never produces the wobbly-line frustration that makes kids quit.',
    },
    {
      title: 'Dry-erase pocket trick',
      body: 'Slide one printed sheet into a sheet protector and trace with a dry-erase marker. One printed name becomes twenty practices, and mistakes wipe clean instead of proving anything.',
    },
    {
      title: 'First name, then last',
      body: 'Master the first name, then generate the last name as a second sheet. Kindergarten teachers report name mastery as a milestone — the full first-and-last combo is the graduation exercise.',
    },
    {
      title: 'Five minutes, done',
      body: 'Stop while it is still fun. One sheet per sitting beats three in a row; handwriting is muscle memory, and muscles consolidate between sessions, not during them.',
    },
  ],
  faqs: [
    {
      q: 'How does this name tracing generator work?',
      a: 'Type the name in the box and the sheet updates instantly — a dark model row, five light-gray rows to trace, and blank rows with guide lines to write the name independently. Press Print and it comes out on one letter page. No account, no download, no watermark.',
    },
    {
      q: 'What age is name tracing for?',
      a: 'Pre-K through kindergarten is the core window — most children learn to write their name between ages 4 and 6. First graders still benefit from tracing when switching to cursive, and the cursive option here covers exactly that transition.',
    },
    {
      q: 'Should my child trace print or cursive letters?',
      a: 'Match what the school teaches: print for pre-K and kindergarten, cursive when the class starts it (usually grade 3). The style selector switches the same sheet between the two.',
    },
    {
      q: 'Why does the traced name start with a capital letter?',
      a: 'Names are proper nouns — the capital is part of the spelling, and the generator capitalizes the first letter automatically. Starting the habit now is much easier than fixing lowercase-first names in first grade.',
    },
    {
      q: 'How many times should a child trace their name?',
      a: 'One full sheet per session is plenty — that is up to 24 traced names across the rows. Quality of the strokes matters more than count; stop when the letters start drifting, and pick it up again tomorrow.',
    },
  ],
  related: [
    { href: '/cursive-alphabet/', label: 'Cursive alphabet chart (the next step)' },
    { href: '/alphabet-chart/', label: 'Print alphabet chart' },
    { href: '/kindergarten-sight-words/', label: 'Kindergarten sight words (same age)' },
    { href: '/half-inch-graph-paper/', label: 'Half-inch graph paper (big squares, same age)' },
  ],
};
