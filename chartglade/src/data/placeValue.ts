import type { PageDef } from './pageTypes';

/**
 * Place value cluster (4 pages). Head pillar of the site: the softest 10K+
 * US keyword we audited (#1 in its SERP is a bare PDF file).
 * Example number used across the cluster: 4,302,175.
 */

export const placeValuePages: PageDef[] = [
  {
    slug: 'place-value-chart',
    hub: 'charts',
    h1: 'Place Value Chart',
    metaTitle: 'Place Value Chart (Free Printable, Ones to Millions) | ChartGlade',
    metaDescription:
      'A free printable place value chart from ones to millions, with periods, an interactive example number, and teaching notes for grades 1-5.',
    lead:
      'Every digit in a number has a job, and the place value chart is the map of those jobs. This one runs from ones to millions, marks the comma periods, and works through a full seven-digit example. Click any column to see what that digit is worth — then print it and hang it up.',
    introHeading: 'What a place value chart actually teaches',
    intro: [
      'A place value chart is a row of labeled columns — ones, tens, hundreds, and on up — where each column is worth ten times the one to its right. Write 7 in the ones column and it means seven. Move that same digit one column left and it now means seventy. That single idea, that the position of a digit changes its value, is the foundation of every operation in elementary math, from regrouping in subtraction to rounding to decimals.',
      'The commas matter too. In American notation, commas split a number into three-digit groups called periods: the ones period, the thousands period, the millions period. The chart above colors each period separately because kids who see the periods stop reading 4,302,175 as a string of seven digits and start reading it as "four million, three hundred two thousand, one hundred seventy-five" — three small numbers inside one big one.',
    ],
    printNote: 'Fits one letter page, portrait. Prints black and white.',
    interactive: true,
    tips: [
      {
        title: 'Teach with the chart, not over it',
        body: 'Ask "what is the 3 worth?" and let fingers point at the column before anyone says a number. The pointing is the lesson — the value lives in the position, not the digit.',
      },
      {
        title: 'Zero is a placeholder, not nothing',
        body: 'The classic trip-up: 4,302,175 has a 0 in the ten thousands place. Cover it and the number collapses to 432,175. Zero holds the seat so every other digit stays in its lane.',
      },
      {
        title: 'Expand the number out loud',
        body: 'Expanded form — 4,000,000 + 300,000 + 2,000 + 100 + 70 + 5 — is just reading the chart one column at a time. Kids who can expand a number can also round it and regroup it.',
      },
      {
        title: 'Laminate one per desk',
        body: 'Print, laminate, hand out dry-erase markers. A writable chart survives the whole year and works for every number that shows up in grades 2 through 5.',
      },
    ],
    faqs: [
      {
        q: 'What is a place value chart?',
        a: 'A table whose columns are labeled with place names — ones, tens, hundreds, thousands, and so on — used to show what each digit in a number is worth. A digit\'s value equals the digit times its place: the 3 in 4,302,175 sits in the hundred thousands place, so it is worth 300,000.',
      },
      {
        q: 'What grade do students learn place value charts?',
        a: 'Place value builds across grades: tens and ones in grade 1, hundreds in grade 2, up to a million by grade 4, and decimals to thousandths in grade 5. The same chart covers the whole climb — kids just use more of the columns each year.',
      },
      {
        q: 'What are periods in a place value chart?',
        a: 'Periods are the three-digit groups separated by commas: the ones period, the thousands period, the millions period. Each period contains a ones, tens and hundreds column of its own, which is why big numbers read as a series of small ones.',
      },
      {
        q: 'What is the difference between place and value?',
        a: 'The place is the column (tens, hundreds, millions); the value is what the digit is worth in that column. The digit 4 in the millions place has a value of 4,000,000 — same digit, different seat, different worth.',
      },
      {
        q: 'Is this chart free to print for my classroom?',
        a: 'Yes. Print as many copies as you need for your class or your kids — no sign-up, no download, no watermark beyond a small site credit. Hit the print button and it comes out as one clean letter page.',
      },
    ],
    related: [
      { href: '/decimal-place-value-chart/', label: 'Decimal place value chart (tenths and beyond)' },
      { href: '/place-value-anchor-chart/', label: 'Place value anchor chart for the classroom wall' },
      { href: '/place-value-chart-printable/', label: 'Blank and filled printable versions' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'decimal-place-value-chart',
    hub: 'charts',
    h1: 'Decimal Place Value Chart',
    metaTitle: 'Decimal Place Value Chart (Printable, Tenths to Millionths) | ChartGlade',
    metaDescription:
      'Free printable decimal place value chart from hundred thousands to thousandths, with the decimal point, money examples, and how to read decimals out loud.',
    lead:
      'Decimals are just place value continuing to the right, past a dot. This chart runs from hundred thousands down to thousandths in one strip, works through 42.607 as an example, and shows the sentence you say when you read a decimal out loud. Print it for grade 4 and 5.',
    introHeading: 'The decimal point does not end the pattern — it marks it',
    intro: [
      'Everything to the left of the decimal point follows the rule you already know: each place is ten times the place to its right. The decimal point simply announces that the rule keeps going in the other direction: each place to its right is one tenth of the place to its left. Tenths, hundredths, thousandths — the columns march on, just divided by ten each step instead of multiplied.',
      'Reading decimals trips people up until they learn the trick: read the whole-number part normally, say "and" for the decimal point, then read the decimal digits as if they were a whole number and name the final column. 42.607 becomes "forty-two and six hundred seven thousandths." Reserving "and" for the decimal point (instead of saying it inside big whole numbers) is the habit that makes this foolproof.',
    ],
    printNote: 'Fits one letter page, portrait.',
    interactive: true,
    tips: [
      {
        title: 'Anchor tenths and hundredths with money',
        body: 'A dime is one tenth of a dollar and a penny is one hundredth. $4.25 is four ones, two tenths, five hundredths — kids who can count money already understand decimal places; the chart just names what they know.',
      },
      {
        title: 'Line up the points, always',
        body: 'Adding and subtracting decimals is a place value skill: stack the numbers so the decimal points form one column. Every "my answer is wrong by a factor of ten" mistake is a point that drifted.',
      },
      {
        title: 'Trailing zeros are free',
        body: '4.5 and 4.50 name the same number — the extra zero just shows the hundredths place is empty. Comparing 4.5 with 4.47 gets easy once kids pad to 4.50 and see it is 3 hundredths more.',
      },
      {
        title: 'Use grid models alongside',
        body: 'A 10×10 grid where one square is one hundredth makes the columns visible. Shade 0.4 and it fills four columns of ten — tenths you can literally count.',
      },
    ],
    faqs: [
      {
        q: 'What are the decimal place values?',
        a: 'Moving right from the decimal point: tenths (10⁻¹), hundredths (10⁻²), thousandths (10⁻³), then ten thousandths, hundred thousandths and millionths. Each is one tenth of the place to its left, mirroring how whole-number places each get ten times bigger moving left.',
      },
      {
        q: 'Is the decimal point a place value?',
        a: 'No — it is a marker, not a column. It has no value of its own; it just tells you where the ones column ends and the tenths begin. That is why the point must line up in a column when you add or subtract decimals.',
      },
      {
        q: 'How do you read 42.607 out loud?',
        a: '"Forty-two and six hundred seven thousandths." Read the whole-number side, say "and" for the point, then read the decimal side as a plain number and attach the name of its last column.',
      },
      {
        q: 'What grade uses decimal place value charts?',
        a: 'Grade 4 introduces tenths and hundredths; grade 5 extends to thousandths and comparing decimals. The chart above also shows the whole-number columns so younger siblings get use out of the same printout.',
      },
    ],
    related: [
      { href: '/place-value-chart/', label: 'Place value chart (ones to millions)' },
      { href: '/place-value-chart-printable/', label: 'Blank and filled printable versions' },
      { href: '/fraction-chart/', label: 'Fraction chart (decimals\' other half)' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'place-value-anchor-chart',
    hub: 'charts',
    h1: 'Place Value Anchor Chart',
    metaTitle: 'Place Value Anchor Chart (Printable Classroom Poster) | ChartGlade',
    metaDescription:
      'A printable place value anchor chart for the classroom wall: labeled periods, value callouts, and what makes an anchor chart work — plus how to print it large.',
    lead:
      'An anchor chart is a reference that stays on the wall so students can reach for it mid-lesson. This one keeps the anchor-chart essentials: the place names, the comma periods, and what each digit of an example number is worth. Print it at letter size, or scale it up into a poster.',
    introHeading: 'What makes an anchor chart work',
    intro: [
      'The good ones share three traits: they answer a question students actually ask mid-work, they show one example worked all the way through, and they say little else. A wall plastered with dense posters becomes wallpaper by October. This chart earns its wall space by covering the question that stops the most kids — "what is this digit worth?" — with one number, worked column by column.',
      'The classic move is to build the chart with your class instead of before it: write the place names, drop digits into the columns one at a time, and let the value callouts get filled in as students figure them out. A chart the class built is checked constantly; a chart the teacher hung is decoration. Print this one blank of its callouts if you want that experience, or filled if the wall is needed tomorrow.',
    ],
    printNote: 'Letter portrait; scale up at the printer for a poster (see tips).',
    tips: [
      {
        title: 'Print it poster-size with your printer',
        body: 'Use your printer\'s "poster" or "tile" mode to split the page across 4 sheets, then tape. Kinkos-style shops can also print 18×24 from the same file. The design scales because it is plain black line.',
      },
      {
        title: 'Color the periods, keep the rest black',
        body: 'The single most useful color choice: shade each comma period (ones/thousands/millions) a different light color. Color anywhere else is noise; on periods it encodes the exact grouping kids misread.',
      },
      {
        title: 'Leave one worked example on it',
        body: 'Anchor charts fade fast when they show rules ("value = digit × place") without a number. One worked example — this 3 is worth 300,000 — stays readable from a desk six feet away.',
      },
      {
        title: 'Retire it when the class stops looking',
        body: 'The test of an anchor chart is whether eyes still flick to it in March. When they stop, swap the example number and hang it fresh — it costs one sheet of paper.',
      },
    ],
    faqs: [
      {
        q: 'What is an anchor chart?',
        a: 'A chart hung on the classroom wall that students can reference during independent work — usually built together during a lesson rather than bought pre-made. Good ones hold one core idea with one worked example, in print big enough to read from a desk.',
      },
      {
        q: 'What should a place value anchor chart include?',
        a: 'The place names in order, the comma periods marked, and one example number with each digit\'s value labeled. Anything more — operations, rounding rules, decimal extensions — belongs on its own chart.',
      },
      {
        q: 'Can I print this as a poster?',
        a: 'Yes. Print it directly at letter size for desk reference, or use your printer\'s poster/tile mode (4 sheets) or a print shop for a large format. The layout is intentionally simple line art, so it scales cleanly.',
      },
      {
        q: 'Should the anchor chart be filled in or blank?',
        a: 'Co-create if you can: hang the blank version and fill in the place names and value callouts with the class. Use the filled version when the chart has to be useful tomorrow.',
      },
    ],
    related: [
      { href: '/place-value-chart/', label: 'Place value chart (the interactive version)' },
      { href: '/place-value-chart-printable/', label: 'Blank and filled printable versions' },
      { href: '/decimal-place-value-chart/', label: 'Decimal place value chart' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'place-value-chart-printable',
    hub: 'charts',
    h1: 'Place Value Chart Printable',
    metaTitle: 'Place Value Chart Printable (Blank + Filled, Free) | ChartGlade',
    metaDescription:
      'Free printable place value charts: a filled reference version and a blank write-in version, ones to millions, one per letter page — plus how teachers actually use them.',
    lead:
      'This is the print shop for place value: a filled chart for the wall or a math journal, and a blank one for writing numbers in. Both print one to a letter page with plain black lines, no sign-up, no watermark beyond a small credit line. The how-to-use notes below are what teachers do in the first month of school.',
    introHeading: 'Two versions, two jobs',
    intro: [
      'The filled version is a reference: place names and periods labeled, ready to hang or tape inside a math journal cut to half-page height. The blank version is a workspace — students write a number into the columns themselves, which is the act that cements the idea that digits live in seats. Most classrooms keep both in the same folder: reference on one side, work surface on the other.',
      'The first-month routine that works: dictate a number out loud ("four million, three hundred two thousand, one hundred seventy-five"), students write it into the blank chart, then everyone reads their chart back digit by digit with values. Wrong answers are almost always a digit in the wrong column, which the chart makes instantly visible — that visibility is the entire point.',
    ],
    printNote: 'Prints as two letter pages: the filled reference, then the blank write-in version.',
    tips: [
      {
        title: 'Half-page journal inserts',
        body: 'Print two-up (two charts on one sheet) and cut — they fit a composition notebook perfectly. Students keep one filled reference glued on the inside cover all year.',
      },
      {
        title: 'Dry-erase pockets beat laminating',
        body: 'A class set of dry-erase pockets turns the blank chart into an instant whiteboard for warm-ups. No cutting, no lamination, and the same sheet works for weeks.',
      },
      {
        title: 'Dictate, write, read back',
        body: 'The 3-minute routine: say a number, students place it in the blank chart, then read it back with values ("3 in the hundred thousands — 300,000"). Do it daily for a week and regrouping lessons later in the year run themselves.',
      },
      {
        title: 'Then move to decimals with the same sheet',
        body: 'When grade 4-5 introduces decimals, redraw the blank chart with a decimal point after the ones column. Same routine, new territory — the continuity is what makes the idea stick.',
      },
    ],
    faqs: [
      {
        q: 'Where can I print a free place value chart?',
        a: 'Right here — the filled and blank versions above print directly from your browser, one per letter page, with no account or download. The print button strips everything except the chart itself.',
      },
      {
        q: 'Should I use the blank or the filled version?',
        a: 'Both, for different jobs: the filled chart is a reference for the wall or journal cover; the blank chart is where students write numbers themselves. The writing step is what turns the chart from decoration into practice.',
      },
      {
        q: 'What size paper does it need?',
        a: 'US letter, portrait, one chart per page — with standard margins it also scales to A4 without clipping. The blank version prints fine in fast-draft mode by the dozen.',
      },
      {
        q: 'Does it go past the millions place?',
        a: 'The printable covers ones through millions, which handles every whole-number standard through grade 4. For decimals, print the decimal chart, which continues through thousandths.',
      },
    ],
    related: [
      { href: '/place-value-chart/', label: 'Place value chart (interactive)' },
      { href: '/decimal-place-value-chart/', label: 'Decimal place value chart' },
      { href: '/place-value-anchor-chart/', label: 'Anchor chart version for the wall' },
      { href: '/hundred-chart/', label: 'Hundred chart (younger grades)' },
    ],
  },
];
