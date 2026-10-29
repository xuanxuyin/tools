import type { PageDef } from './pageTypes';

/**
 * V1.7 math cluster: the two formula-sheet pages (PLAN #22). Geometry
 * formula sheet = 2.9K US/mo KD 23; algebra merges the three search
 * variants (formula sheet / cheat sheet / reference sheet ≈ 1.66K, KD
 * 13-19). Middle-school and Algebra 1 territory, so the cluster links up
 * to the elementary pillars (multiplication chart, place value, graph
 * paper) instead of sitting alone. The formulas and every worked example
 * live in src/lib/formulas.ts and are pinned by formulaGuards.test.ts.
 */
export const formulaSheetPages: PageDef[] = [
  {
    slug: 'geometry-formula-sheet',
    hub: 'charts',
    h1: 'Geometry Formula Sheet',
    metaTitle: 'Geometry Formula Sheet (Free Printable) | ChartGlade',
    metaDescription:
      'Free printable geometry formula sheet — perimeter, area, volume and the Pythagorean theorem, each formula with a worked example, one landscape page.',
    lead:
      'Every geometry formula middle school actually uses — area and perimeter of the 2-D figures, volume and surface area of prisms, cylinders, cones and spheres, plus the Pythagorean theorem — on one printable page. Each formula ships with a worked example, because a formula you have never watched produce a number is a formula you will freeze on mid-test.',
    introHeading: 'Why every formula carries a worked example',
    intro: [
      'Most formula sheets are lists, and lists get memorized as shapes — students recognize "A = ½(b₁ + b₂)h" without being able to run it. The example column fixes that: cover it, compute from the given numbers, uncover to check. Thirty seconds a row converts the sheet from reference into self-quizzing study material, which is the difference between a sheet that helps and a sheet that decorates a binder.',
      'The sheet is organized the way the courses sequence it. Perimeter and area are grade 6-7 work (with circles as the pi milestone), volume of prisms arrives in grade 5-7, and the Pythagorean theorem is the grade 8 standard — so the same page serves a three-year span: early grades use the top sections, grade 8 uses all of it. Most state end-of-course exams hand students a reference sheet anyway; the point of owning these formulas is speed and confidence, not surviving without paper.',
    ],
    printNote: 'One letter page, landscape. The print button rotates it for you.',
    landscape: true,
    tips: [
      {
        title: 'Let the units pick the formula',
        body: 'Test questions announce what they want: answer in square inches means area, plain inches means perimeter or circumference, cubic inches means volume. Students who read units first never compute the wrong thing with the right numbers.',
      },
      {
        title: 'Write the formula before substituting',
        body: 'The habit that survives every math audit: copy "A = ½bh", replace letters with numbers, then compute. Substituting straight into the calculator skips the step where mistakes are catchable — and where partial credit lives.',
      },
      {
        title: 'Watch the radius-diameter trap',
        body: 'Half the circle errors on any given quiz come from plugging a diameter into r. Before touching a circle problem, underline what is given and write r = or d = next to it. Ten seconds that saves the whole problem.',
      },
      {
        title: 'See the cone-cylinder third',
        body: 'A cone is a cylinder with one end pinched to a point, which is why its volume is exactly one-third: V = ⅓πr²h. Fill a cone with water, pour it into a same-size cylinder, repeat three times. Students who have watched it never forget which formula has the ⅓.',
      },
    ],
    faqs: [
      {
        q: 'What is on this geometry formula sheet?',
        a: 'Three groups: perimeter and area of rectangles, squares, triangles, parallelograms, trapezoids and circles (including circumference); volume and surface area of rectangular prisms, cylinders, cones and spheres; and the Pythagorean theorem in both directions — finding the hypotenuse and finding a missing leg.',
      },
      {
        q: 'What grade is a geometry formula sheet for?',
        a: 'Grades 6 through 8 are the core: area and perimeter are grade 6-7 standards, volume of prisms and cylinders lands in grades 5-7, and the Pythagorean theorem is the grade 8 standard. High school geometry students use it as a prerequisite review sheet.',
      },
      {
        q: 'Should students memorize all of these formulas?',
        a: 'Not by brute force. Triangle area, rectangle area and the Pythagorean theorem get memorized simply by use. The rest is fair to look up — most state end-of-course exams provide a reference sheet, because the skills being tested are reasoning and substitution, not recall. What students must know cold is which formula the situation calls for.',
      },
      {
        q: 'Why does the trapezoid formula work?',
        a: 'A trapezoid is two triangles sharing the slanted sides, one on each base. Half the sum of the bases times the height is exactly the average of the two triangle areas — the formula is the "average base" shortcut for the same computation.',
      },
      {
        q: 'How do I print the sheet?',
        a: 'The print button above prints it on one letter page in landscape orientation, no download needed. The worked-example column prints with the formulas; cover it with a folded scrap of paper to turn the sheet into a quiz.',
      },
    ],
    related: [
      { href: '/algebra-formula-sheet/', label: 'Algebra formula sheet (the companion page)' },
      { href: '/place-value-chart/', label: 'Place value chart (the elementary foundation)' },
      { href: '/printable-graph-paper/', label: 'Printable graph paper for the practice problems' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },

  {
    slug: 'algebra-formula-sheet',
    hub: 'charts',
    h1: 'Algebra Formula Sheet',
    metaTitle: 'Algebra Formula Sheet & Cheat Sheet (Free Printable) | ChartGlade',
    metaDescription:
      'Free printable algebra formula sheet — slope, linear equations, the quadratic formula, exponent laws and factoring patterns, each with a worked example.',
    lead:
      'The Algebra 1 essentials on one page: slope and the three forms of a linear equation, the quadratic formula and discriminant, distance and midpoint, the six exponent laws, and the FOIL and factoring patterns. Every formula comes with a worked example you can use as a self-check — cover the answer, run the numbers, uncover.',
    introHeading: 'A reference sheet that doubles as a quiz',
    intro: [
      'Algebra formulas fail students in a specific way: not by being forgotten, but by being half-remembered — the quadratic formula with a missing 2a, point-slope with the x and y swapped. Reading a formula list does not catch those errors; computing with one does. That is what the example column is for, and why this page pairs each rule with numbers a student can verify with a pencil in thirty seconds.',
      'The sections follow the Algebra 1 year in order. Lines come first because everything later is built on them — the distance formula is the Pythagorean theorem in coordinate clothing, and the quadratic formula is where factoring stops being enough. The exponent laws and factoring patterns at the bottom are the ones that carry into Algebra 2, which is why they earn space even on a one-page sheet. Whether it is called a formula sheet, cheat sheet or reference sheet, the job is the same: one place to glance instead of ten pages of notes.',
    ],
    printNote: 'One letter page, landscape. The print button rotates it for you.',
    landscape: true,
    tips: [
      {
        title: 'Check the discriminant before computing',
        body: 'Before running the quadratic formula, compute b² − 4ac: positive means two real roots, zero means one, negative means none exist. On a multiple-choice question that is the whole answer in one line of arithmetic.',
      },
      {
        title: 'Verify FOIL with the middle term',
        body: 'Expanding (x + 3)(x + 2), most errors land in the middle. The check: the middle coefficient should be the sum of the two numbers (3 + 2 = 5) when the leading term is x². Wrong middle term means the outer and inner products were added wrong.',
      },
      {
        title: 'Drill the (a + b)² trap with numbers',
        body: 'The most common algebra error in the wild: (a + b)² treated as a² + b². Numbers expose it instantly — (1 + 2)² is 9, but 1² + 2² is 5. Any student who has seen that pair once stops making the mistake.',
      },
      {
        title: 'Negative exponents flip, they do not negate',
        body: '2⁻³ is 1/8, not −8. The exponent moves the factor across the fraction bar and that is all it does. This one shows up on every standardized test, usually wearing a variable: x⁻² = 1/x².',
      },
    ],
    faqs: [
      {
        q: 'What is on an algebra formula sheet?',
        a: 'Slope from two points, slope-intercept and point-slope forms, the quadratic formula, the discriminant, the distance and midpoint formulas, the six exponent laws (product, quotient, power of a power, power of a product, zero and negative exponents), and the binomial patterns — FOIL, perfect squares and the difference of squares.',
      },
      {
        q: 'Who is this algebra reference sheet for?',
        a: 'Algebra 1 students (grade 8-9) are the core audience. It also works as an end-of-course review sheet, a summer-refresher reference before Algebra 2, and a parent-facing cheat sheet for homework help.',
      },
      {
        q: 'When should I use the quadratic formula instead of factoring?',
        a: 'Try factoring first when the leading coefficient is 1 and small — it is faster when it works. Switch to the formula when factoring stalls, when roots are fractions or irrational, or when the question only asks how many real roots exist (then the discriminant alone answers it).',
      },
      {
        q: 'What is the difference between slope-intercept and point-slope form?',
        a: 'Both describe the same line. Slope-intercept (y = mx + b) is the readable one — it shows the slope and y-intercept directly, which is why graphing uses it. Point-slope (y − y₁ = m(x − x₁)) is the working one — write it immediately from any point and the slope, then simplify into slope-intercept if needed.',
      },
      {
        q: 'Is this the same as a cheat sheet?',
        a: 'Same content, honest name: cheat sheet usually means a personal reference for studying, and most teachers allow reference sheets on algebra quizzes precisely because the skills being taught are using the formulas, not recalling them. This page is for studying and homework — during tests, use whatever the teacher provides.',
      },
    ],
    related: [
      { href: '/geometry-formula-sheet/', label: 'Geometry formula sheet (the companion page)' },
      { href: '/multiplication-chart/', label: 'Multiplication chart (with a mad-minute drill maker)' },
      { href: '/printable-graph-paper/', label: 'Graph paper for graphing the lines' },
      { href: '/charts/', label: 'All math charts' },
    ],
  },
];
