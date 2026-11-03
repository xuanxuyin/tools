import type { PageDef } from './pageTypes';

/**
 * Christmas coloring singles — the coloring product line's holiday branch
 * (Phase B, PLAN §3 #35). Entry word: "christmas stocking coloring pages"
 * 320/KD8 — the softest keyword in the 75.6K/month christmas coloring
 * family (AITDK 2026-11-03); SERP audited same day: Crayola + small blogs
 * (prudentpennypincher, everydaychaosandcalm) + Pinterest fills, no
 * giant-matrix lock — the same small-blog SERP shape the letter matrix
 * entered on. Tree/snowman singles queue behind this one; they already
 * exist as color-by-number editions on /christmas-color-by-number/ and
 * only graduate to standalone coloring pages if GSC shows the family
 * pulling impressions.
 */

export const christmasStockingPage: PageDef = {
  slug: 'christmas-stocking-coloring-page',
  hub: 'christmas',
  h1: 'Christmas Stocking Coloring Pages',
  metaTitle: 'Christmas Stocking Coloring Pages — Free Printable Set | ChartGlade',
  metaDescription:
    'Free printable Christmas stocking coloring pages: one big stocking with cuff, stripes and toe cap to color, plus two mini stockings to quilt patchwork-style. No sign-up — print and color.',
  lead:
    'One big Christmas stocking with a fluffy cuff, three candy stripes, a toe cap and stars to color — then two mini stockings waiting to be quilted patchwork-style, a different color in every square. It prints on one letter page and needs nothing but crayons.',
  introHeading: 'Why stockings hang at Christmas',
  intro: [
    'The stocking is the oldest prop in the Christmas morning story. The legend that started it is a simple one: a poor man had no money for his daughters, and Saint Nicholas slipped bags of gold down the chimney — where, the story goes, they landed in stockings drying by the fire. That is why the small gifts that still land in a stocking today are called "fillers," and why an orange in the toe is a tradition in plenty of American families: the orange is the gold ball, five hundred years later. A child coloring a stocking is coloring the container the whole legend depends on.',
    'This page treats the stocking as a design project, not just a picture. The big stocking has separate regions — cuff, three stripes, toe cap, heart, stars — that beg for a color plan (stripes alternate, cuff contrasts, toe matches or clashes on purpose). The two mini stockings are drawn as patchwork quilts, one color per square, which is where the real decision-making happens: repeating patterns, alternating colors, and the discovery that a plan looks better than a scribble. It is the same color-planning muscle the site\'s color-by-number pages train, minus the math.',
  ],
  printNote: 'Fits one letter page, portrait: one big stocking and two mini quilting stockings, black outlines on white.',
  tips: [
    {
      title: 'Plan the stripes before coloring',
      body: 'Ask for a pattern out loud first — red-white-red, or green-gold-green — then color. Choosing an alternating pattern and sticking to it is the actual skill on this page, and it is the same pattern logic the color-by-number pages use, just self-directed.',
    },
    {
      title: 'Quilt the minis two different ways',
      body: 'Color one mini stocking in an ABAB pattern (alternate every square) and the other in an AABB pattern (pairs). Comparing the two finished quilts side by side is a real patterning lesson for kindergarten and first grade, disguised as decoration.',
    },
    {
      title: 'Name the stocking',
      body: 'After coloring, write the family member\'s name across the cuff in marker and "hang" the page on the wall or real mantel. Three stockings, three names, and the page becomes the family\'s paper mantel until the real stockings go up.',
    },
  ],
  faqs: [
    {
      q: 'What is on this Christmas stocking coloring page?',
      a: 'One large stocking — hanging loop, pom-pom, cuff, body with three stripes, toe cap, heart and stars — plus two mini stockings drawn as patchwork quilts. Every region is a closed outline sized for crayons, and the whole set prints on one letter page.',
    },
    {
      q: 'Why do people hang stockings at Christmas?',
      a: 'The tradition comes from the Saint Nicholas legend: gold secretly dropped down a chimney reportedly landed in stockings drying by the fire, so stockings have been the gift\'s landing spot ever since. The orange-in-the-toe custom many families keep is a nod to those gold balls.',
    },
    {
      q: 'What age is this printable for?',
      a: 'Ages three to eight, with a split: threes and fours color the big stocking\'s large regions, while fives through eights get the most out of the mini quilting stockings, where the patterning challenge lives. The quilt squares are small on purpose — they reward older kids who want detail work.',
    },
    {
      q: 'How do I print the stocking coloring pages?',
      a: 'Hit the print button — the page strips down to just the sheet, one letter page, portrait, black outlines on white. The Download PNG button saves the identical sheet as an image for tablets, drawing apps, or reprinting when the first copy gets colored twice.',
    },
  ],
  related: [
    { href: '/christmas-printables/', label: 'All Christmas printables' },
    { href: '/christmas-color-by-number/', label: 'Christmas color-by-number — the math edition of coloring' },
    { href: '/letter-to-santa/', label: 'Letter to Santa writing paper' },
    { href: '/coloring/', label: 'Letter coloring pages A-Z — the rest of the coloring line' },
  ],
  sheetImage: {
    src: '/images/christmas-stocking-coloring-page.png',
    alt: 'Free printable Christmas stocking coloring pages — one big stocking with a cuff, three stripes, a toe cap, a heart and stars, plus two mini patchwork stockings to quilt, all black outlines on white.',
    width: 2016,
    height: 2540,
    caption: 'Color the big stocking, then give each mini quilt its own pattern.',
  },
};
