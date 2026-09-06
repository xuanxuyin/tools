import type { PageDef } from './pageTypes';
import type { GraphPaperVariantId } from '../lib/graphPaper';

/**
 * Graph paper cluster (V1.6, judged 2026-09-06). Head word "printable graph
 * paper" = 12.1K US/mo, KD 30; SERP is held by EMD microsites and small
 * generators (GraphPaperGenerator, Gridzzly, Mathpolate), not by K5/Canva —
 * an independent-tool profile our DR-0 site can enter. Variant pages absorb
 * the long tail (half inch / 1 cm / 5mm / dot grid / isometric); the hub
 * carries the customizer island so "graph paper generator/maker" (710/mo
 * combined) lands on an interactive page without a separate URL.
 */

export interface GraphPaperDef extends PageDef {
  variant: GraphPaperVariantId;
}

export const graphPaperPages: GraphPaperDef[] = [
  {
    slug: 'printable-graph-paper',
    hub: 'graph-paper',
    variant: 'quarter-inch',
    h1: 'Printable Graph Paper',
    metaTitle: 'Printable Graph Paper — Free 1/4 Inch Grid, Letter Size | ChartGlade',
    metaDescription:
      'Free printable graph paper that prints at true size from your browser: 1/4 inch squares with darker inch lines, one full letter sheet, no download and no sign-up.',
    lead:
      'Standard 1/4 inch graph paper — four squares to the inch, with the inch lines slightly heavier so counting by ones or fours stays easy. It prints straight from this page on one letter sheet, at exactly the size a math worksheet expects.',
    introHeading: 'Why 1/4 inch is the standard grid',
    intro: [
      'Ask for "graph paper" in an American classroom and this is what comes back: a quarter-inch grid, four little squares per inch. It is the grid printed in most math workbooks and the one coordinate-plane activities are drawn for — when a worksheet says "plot each point on graph paper," it means squares this size. The darker line every inch on this sheet is deliberate: students counting to (3, 4) can hop in ones for small numbers or count by fours along an inch block for big ones, which is the same skip-counting the multiplication chart is teaching them.',
      'The quarter-inch grid is also the size where a full letter page holds a genuinely useful plot area — 29 columns by 39 rows of squares. That is enough for a 20×20 coordinate picture with room for axes and labels, an entire line graph with sensible scale, or a weekend of doodling. Print at 100% (the browser default here — do not choose "fit to page," which shrinks the grid by a few percent and breaks the four-squares-per-inch promise).',
    ],
    printNote: 'One letter page, portrait. Print at 100% scale — not "fit to page" — to keep true 1/4 inch squares.',
    tips: [
      {
        title: 'One square, one unit',
        body: 'Before plotting, have the student declare the scale out loud: "each square is one." Most coordinate-plane mistakes are scale mistakes — a point placed on an inch line instead of a quarter-inch square. The heavier inch lines make the miscount obvious at a glance.',
      },
      {
        title: 'Draw axes with a ruler, not freehand',
        body: 'Two ruler lines through the middle of the sheet beat a wobbly freehand axis every time. Leave a two-square margin on the left and bottom for numbering the axes — the classic lost points on graphing homework.',
      },
      {
        title: 'Stock the homework folder',
        body: 'Print five at a time. Graph paper replaces scratch paper for long division and multi-digit multiplication too — the columns keep digits aligned without any effort, which is half the battle in grades 3-5.',
      },
    ],
    faqs: [
      {
        q: 'What size is standard graph paper?',
        a: 'In the US, standard graph paper has a 1/4 inch grid — four squares per inch — usually with a slightly heavier line every inch. That is the size printed in most math textbooks and workbooks, and the size this sheet prints at.',
      },
      {
        q: 'How do I print graph paper the correct size?',
        a: 'Print at 100% scale (sometimes labeled "actual size"). Avoid the "fit to page" or "shrink to fit" option — it scales the sheet down slightly and the squares are no longer exactly 1/4 inch, which matters for measurement activities.',
      },
      {
        q: 'Is this graph paper free to print?',
        a: 'Yes — no download, no sign-up, no watermark. It renders directly from the browser; the Print button produces one letter page. Teachers may print class sets, and parents may print as many copies as the homework eats.',
      },
      {
        q: 'Can I get other grid sizes?',
        a: 'This page is the 1/4 inch standard. For younger students there is half-inch graph paper, for metric work 1 cm and 5mm sheets, plus dot grid and isometric paper — all linked below and all from the Graph Paper hub.',
      },
    ],
    related: [
      { href: '/half-inch-graph-paper/', label: 'Half-inch graph paper (K-3 big squares)' },
      { href: '/graph-paper/', label: 'All graph paper sizes + custom grid maker' },
      { href: '/multiplication-chart/', label: 'Multiplication chart (same grades)' },
      { href: '/hundred-chart/', label: 'Hundred chart for K-2' },
    ],
  },

  {
    slug: 'half-inch-graph-paper',
    hub: 'graph-paper',
    variant: 'half-inch',
    h1: 'Half-Inch Graph Paper',
    metaTitle: 'Half-Inch Graph Paper (Free Printable, K-3) | ChartGlade',
    metaDescription:
      'Free printable half-inch graph paper — big 1/2 inch squares for kindergarten through third grade: block letters, name writing, bar graphs and counting. Prints from the browser.',
    lead:
      'Half-inch graph paper is the young-kid grid: squares twice the size of standard, so block letters, counting boxes and first bar graphs fit hands that are still learning to control a pencil. One letter sheet, printed straight from this page.',
    introHeading: 'Big squares for small hands',
    intro: [
      'Fine motor control is the bottleneck in K-3, and a quarter-inch grid asks for precision those hands do not have yet. Half-inch squares double the target: a kindergartner can write one block letter per square, a first grader can color exactly one box for each vote in the class pet graph, a third grader can draw an area model of 6×4 without the regions dissolving into scribble. Teachers reach for the big grid precisely because the square does part of the thinking — the boundary marks the unit, and staying inside it is the whole lesson.',
      'This sheet keeps a slightly heavier line every inch (every two squares), which quietly previews the standard grid children graduate to. Counting-by-twos along the dark lines is a freebie: it is the same skip pattern as the pairs on a hundred chart. When block letters start looking cramped somewhere in grade 3 or 4, that is the signal to move down to quarter-inch paper.',
    ],
    printNote: 'One letter page, portrait. Print at 100% scale so squares are true half-inch.',
    tips: [
      {
        title: 'One letter per square',
        body: 'Write names block-letter style, one capital per square — the grid forces spacing better than any reminder. Nightly name practice on half-inch paper is a classic kindergarten warm-up that also teaches left-to-right order.',
      },
      {
        title: 'Graph real things',
        body: 'Snack counts, shoe colors, pets. One colored square per vote, columns labeled by a drawing. The grid keeps the bars comparable, which is the entire point of a graph a five-year-old can read back.',
      },
      {
        title: 'Area models before the word "area"',
        body: 'Shade a 3-by-4 block of squares and count them up. Second graders who have colored arrays on big-grid paper meet "area" in third grade already owning the picture.',
      },
    ],
    faqs: [
      {
        q: 'What size graph paper do kindergartners use?',
        a: 'Half-inch squares are the usual choice for K-2 — some teachers go up to one-inch for the earliest writers. Quarter-inch standard paper is too small until handwriting control firms up, usually grade 3 or 4.',
      },
      {
        q: 'How many squares are on a half-inch sheet?',
        a: 'A letter sheet in portrait holds about 14 columns by 19 rows of half-inch squares in the printable area — plenty for a name, a picture, or a class survey graph.',
      },
      {
        q: 'Why is there a darker line every inch?',
        a: 'Every two squares the line is heavier, marking full inches. It makes counting large shaded regions faster (count by twos along the dark lines) and visually rehearses the standard quarter-inch grid students move to later.',
      },
    ],
    related: [
      { href: '/printable-graph-paper/', label: 'Printable graph paper (standard 1/4 inch)' },
      { href: '/graph-paper/', label: 'All graph paper sizes + custom grid maker' },
      { href: '/alphabet-chart/', label: 'Alphabet chart (same age)' },
      { href: '/hundred-chart/', label: 'Hundred chart for K-2' },
    ],
  },

  {
    slug: '1-cm-graph-paper',
    hub: 'graph-paper',
    variant: 'one-cm',
    h1: '1 cm Graph Paper',
    metaTitle: '1 cm Graph Paper (Free Printable Centimeter Grid) | ChartGlade',
    metaDescription:
      'Free printable 1 cm graph paper — true centimeter squares for metric measurement, science labs and unit-cube math. Prints at actual size from your browser, letter sheet.',
    lead:
      'Centimeter graph paper with uniform one-centimeter squares — the grid American science classes and metric measurement units run on, and the exact size of the plastic unit cubes stacked on them. Prints at true size, one letter page.',
    introHeading: 'The metric grid',
    intro: [
      'Even in a country that measures in inches, school science goes metric: mass in grams, volume in milliliters, length in centimeters. A one-centimeter grid is the paper that matches. Measure a pencil in cm and the answer is countable on the paper itself; draw a 5 cm × 3 cm rectangle and a centimeter ruler confirms it without any conversion. The grid and the ruler agree because the squares really are a centimeter — print at 100%, not "fit to page."',
      'The quiet superpower of cm paper is the unit cube. Base-ten blocks, counting cubes, and volume-unit manipulatives are all built on the centimeter, so a 1 cm grid is literally the footprint of the math manipulatives on the shelf. Place-and-trace volume work, area in square centimeters, perimeter walks around drawn shapes — it all lines up. This sheet uses uniform line weight (no darker inch lines) because metric work counts in ones, not in fours.',
    ],
    printNote: 'One letter page, portrait. Print at 100% scale — "fit to page" shrinks the squares below a true centimeter.',
    tips: [
      {
        title: 'Ruler check first',
        body: 'Have students lay a centimeter ruler across the printed grid before starting — if a ruler centimeter spans exactly one square everywhere, the print scale is right and every later measurement is trustworthy.',
      },
      {
        title: 'Area in square centimeters, early',
        body: 'Shade a rectangle, count the squares, write "12 square centimeters." The unit name stops being strange the moment it was literally counted off squares on paper.',
      },
      {
        title: 'Trace the base-ten cube',
        body: 'One unit cube fills one square exactly. Tracing cubes to build shapes — then stacking and drawing the footprint — is the standard bridge from holding volume to calculating it in grade 5.',
      },
    ],
    faqs: [
      {
        q: 'How big is 1 cm graph paper?',
        a: 'Each square is one centimeter (about 0.39 inches) on a side. A letter sheet in portrait holds roughly 18 columns by 25 rows of true centimeter squares in the printable area.',
      },
      {
        q: 'Should I use 1 cm or 1/4 inch graph paper?',
        a: 'It depends on the unit being measured. Metric work — science labs, measurement units, base-ten and unit-cube activities — matches 1 cm paper; standard coordinate-plane math work is usually drawn for the 1/4 inch grid.',
      },
      {
        q: 'Will the centimeters print accurately?',
        a: 'Yes, if the print dialog is set to 100% / actual size rather than "fit to page." The sheet is drawn in true physical units; the browser only scales it if told to.',
      },
    ],
    related: [
      { href: '/5mm-graph-paper/', label: '5mm graph paper (the fine metric grid)' },
      { href: '/printable-graph-paper/', label: 'Printable graph paper (1/4 inch standard)' },
      { href: '/graph-paper/', label: 'All graph paper sizes + custom grid maker' },
      { href: '/place-value-chart/', label: 'Place value chart (base-ten companion)' },
    ],
  },

  {
    slug: '5mm-graph-paper',
    hub: 'graph-paper',
    variant: 'five-mm',
    h1: '5mm Graph Paper',
    metaTitle: '5mm Graph Paper — Free Printable Fine Grid | ChartGlade',
    metaDescription:
      'Free printable 5mm graph paper — the fine engineering-style grid with a darker line every centimeter. Prints at true size from your browser on one letter sheet.',
    lead:
      'The 5 millimeter grid is the precision sheet: fine squares with a darker line every centimeter, the same layout as engineering and lab notebooks. For older students and detailed drawings it holds more data per page than any school-size grid. One letter sheet, true size.',
    introHeading: 'The fine grid',
    intro: [
      'Five-millimeter graph paper is the unofficial standard of engineering notebooks — dense enough that a full page of data or a detailed sketch still has guidance under every line, with the darker line each centimeter keeping count. Students meet it around middle school: science labs that want a full-page line graph, graphing-calculator work transferred by hand, technical drawings where a quarter-inch grid is cartoonish. Twice the resolution of 1 cm paper means the same axes carry twice the range, or the same data reads at double the size.',
      'It is also the paper of people who just like grids. The fine squares keep handwriting aligned and sketches proportional without shouting about it — darker lines every centimeter frame the page into calm blocks. Print at 100% so the squares are honest millimeters; on this sheet the precision is the point.',
    ],
    printNote: 'One letter page, portrait. Print at 100% scale — the 5mm spacing and cm emphasis are exact.',
    tips: [
      {
        title: 'Choose scale before drawing',
        body: 'Fine grids tempt tiny plots. Decide "1 cm = 10 units" (or whatever fits) and write it in the corner before the first point is plotted — a stated scale is also full credit on lab reports.',
      },
      {
        title: 'Use the darker cm lines as tenths',
        body: 'Each centimeter block is ten small squares. Reading 3 blocks + 4 squares as 3.4 is decimal-place rehearsal hiding inside a graphing assignment.',
      },
      {
        title: 'Fold it into a lab notebook',
        body: 'Three-hole-punch a stack and it becomes the lab book. Data tables on one side, the graph on the grid side, same page spread — the format science fairs ask for.',
      },
    ],
    faqs: [
      {
        q: 'Is 5mm the standard for graph paper?',
        a: 'Internationally and in engineering notebooks, 5mm is the most common grid. American schools default to the 1/4 inch grid for math class; the 5mm sheet is the choice for science labs and detailed work.',
      },
      {
        q: 'What is the darker line for on 5mm paper?',
        a: 'Every tenth square — every centimeter — is heavier, so you can count by tens at a glance. It makes the fine grid readable instead of dizzying, and it maps perfectly onto decimal plotting.',
      },
      {
        q: '5mm or 1 cm for middle school?',
        a: '5mm for graphs that carry real data (labs, statistics, calculator transfer); 1 cm when the activity is about the concept — measuring, area with unit cubes. Many binders stock both.',
      },
    ],
    related: [
      { href: '/1-cm-graph-paper/', label: '1 cm graph paper (metric, big squares)' },
      { href: '/printable-graph-paper/', label: 'Printable graph paper (1/4 inch standard)' },
      { href: '/graph-paper/', label: 'All graph paper sizes + custom grid maker' },
      { href: '/multiplication-chart-1-20/', label: 'Multiplication chart 1-20 (middle school)' },
    ],
  },

  {
    slug: 'dot-grid-paper',
    hub: 'graph-paper',
    variant: 'dots',
    h1: 'Dot Grid Paper',
    metaTitle: 'Dot Grid Paper (Free Printable 5mm Dots) | ChartGlade',
    metaDescription:
      'Free printable dot grid paper — 5mm dot spacing instead of lines, the gentler grid for sketching, coordinate pictures and notes. Prints from your browser, one letter sheet.',
    lead:
      'Dot grid paper replaces lines with dots at 5 millimeter spacing — all the alignment of a grid, none of the cage. The standard sheet for sketching, coordinate mystery pictures, and older students taking structured notes. One letter page.',
    introHeading: 'A grid that gets out of the way',
    intro: [
      'Lines have opinions: they close every square and compete with whatever you draw inside it. Dots just mark the lattice — connect them and a grid appears where you want one; ignore them and they fade into spacing guides. That is why sketchers, designers and note-takers picked dot paper as the default, and why it works in schools too: a coordinate mystery picture drawn dot-to-dot has clean open spaces to color, and a mind map or sketch-note can sprawl across the page while lines of writing still stay level.',
      'This sheet spaces dots 5mm apart — fine enough for detailed work, the same spacing as most dot journals. For classroom coordinate pictures, students plot points on the dots and connect them with rulers; for art and STEM journals, the dots quietly keep proportions honest. Print at 100% and the spacing is true.',
    ],
    printNote: 'One letter page, portrait. Print at 100% scale for true 5mm dot spacing.',
    tips: [
      {
        title: 'Mystery pictures love dots',
        body: 'Coordinate pictures (plot the points, connect in order, a shape appears) read cleaner on dots — no printed lines fighting the finished drawing, and every plotted point lands exactly on a dot.',
      },
      {
        title: 'Sketch small, then scale',
        body: 'Count dots to keep proportions when sketching: "3 dots tall, 5 dots wide." It is grid discipline without grid lines — the habit that makes freehand drawing transferable.',
      },
      {
        title: 'Notes that stay level',
        body: 'Older students writing by hand lean on the dot rows as baselines. Writing sits on a row of dots the way it sits on ruled lines, but arrows, boxes and diagrams can cross without looking broken.',
      },
    ],
    faqs: [
      {
        q: 'What is dot grid paper used for?',
        a: 'Anywhere a grid helps but lines get in the way: sketching and design work, coordinate-point plotting, STEM journals, sketch-notes, and structured handwriting notes that need room for diagrams.',
      },
      {
        q: 'Is dot paper better than lined or squared?',
        a: 'Different job. Lines win for pure writing; squares win for calculation and precise plots; dots win when drawing and writing share the page — guidance without visible cages.',
      },
      {
        q: 'How far apart are the dots?',
        a: '5 millimeters, the common dot-journal spacing — about 38 columns by 51 rows on the letter sheet. Print at 100% and a metric ruler confirms the pitch.',
      },
    ],
    related: [
      { href: '/5mm-graph-paper/', label: '5mm graph paper (same pitch, with lines)' },
      { href: '/isometric-graph-paper/', label: 'Isometric graph paper (3D drawing)' },
      { href: '/graph-paper/', label: 'All graph paper sizes + custom grid maker' },
      { href: '/number-line-printable/', label: 'Number line printable' },
    ],
  },

  {
    slug: 'isometric-graph-paper',
    hub: 'graph-paper',
    variant: 'iso',
    h1: 'Isometric Graph Paper',
    metaTitle: 'Isometric Graph Paper (Free Printable, 1/4 Inch) | ChartGlade',
    metaDescription:
      'Free printable isometric graph paper — equilateral triangle grid for 3D drawing: cubes, buildings, volume work. Prints true size from your browser on one letter sheet.',
    lead:
      'Isometric graph paper is built for the third dimension: a grid of equilateral triangles whose three line directions are exactly the axes of an isometric cube. Draw straight along the lines and whatever you build looks solid. One letter sheet, 1/4 inch triangles.',
    introHeading: 'How the triangle grid makes 3D easy',
    intro: [
      'On ordinary graph paper a cube must be faked — a square front, some slanted parallels, and hope. On isometric paper the three visible faces of a cube are already there: the horizontal lines and the two diagonal families run along the cube\'s three edges, at exact 60° angles. Trace six strokes, each one along a printed line, and a perfect cube appears — no ruler, no vanishing points, no practice. That is why elementary STEM bins, middle-school tech ed, and art classes all keep a stack: it delivers instant, satisfying 3D with none of the drawing mechanics that usually scare students off.',
      'The math payoff is volume. Fifth graders drawing unit cubes on isometric paper are literally building the mental model behind volume = layers × cubes per layer — draw a 3×2×2 structure as stacked cubes and counting comes naturally. The grid here uses 1/4 inch triangle sides: big enough for young hands, standard for classroom isometric work.',
    ],
    printNote: 'One letter page, portrait. Print at 100% scale to keep the 60° geometry exact.',
    tips: [
      {
        title: 'Start with one cube, then stack',
        body: 'First cube: two verticals and four slanted strokes along printed lines. Then stack — every new cube shares edges with the old one. Structures of 10+ cubes come fast, and the counting conversation ("how many cubes total?") is volume instruction.',
      },
      {
        title: 'Draw your name in 3D',
        body: 'Block letters extruded along one diagonal family — a favorite art-class warm-up that teaches the extrusion idea better than any explanation. Younger students extrude single letters; older ones attempt whole names.',
      },
      {
        title: 'Sketch real objects as cube stacks',
        body: 'A bookshelf, a robot, the classroom — approximate each part as stacked cubes first, refine after. Engineering sketching starts exactly here, and the grid makes first attempts look intentional.',
      },
    ],
    faqs: [
      {
        q: 'What is isometric graph paper?',
        a: 'Paper printed with a grid of equilateral triangles — three sets of parallel lines meeting at 60°. The three directions match the three visible edges of a cube drawn in isometric view, so 3D shapes can be drawn by following the printed lines.',
      },
      {
        q: 'How do you draw a cube on isometric paper?',
        a: 'Pick a point, draw two short strokes along the two diagonal families (the top edges), drop a vertical from each end and one from the point between, then close the bottom with two more diagonal strokes — six strokes total, every one along a printed line.',
      },
      {
        q: 'What grade is isometric paper used in?',
        a: 'Mostly grades 4-8: elementary STEM and maker activities, fifth-grade volume lessons (drawing unit-cube structures), and middle-school technical drawing. Art classes use it for 3D lettering and design sketching at almost any grade.',
      },
    ],
    related: [
      { href: '/dot-grid-paper/', label: 'Dot grid paper (sketching, 2D)' },
      { href: '/printable-graph-paper/', label: 'Printable graph paper (1/4 inch standard)' },
      { href: '/graph-paper/', label: 'All graph paper sizes + custom grid maker' },
      { href: '/multiplication-chart-1-15/', label: 'Multiplication chart 1-15' },
    ],
  },
];
