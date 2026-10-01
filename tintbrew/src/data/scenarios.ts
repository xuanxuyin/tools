/**
 * V2.1 scenario pages (W1: frosting & icing). Same contract as data/mixes.ts:
 * hand-written facts live here (the anti-thin-content layer), every displayed
 * color value is computed by the engine at build time from the mix/chart specs.
 *
 * Add a scenario = add an entry + a thin page wrapper in src/pages/.
 */

export interface MethodDef {
  name: string;
  summary: string;
  /** What goes in the bowl; the engine computes the result swatch from this. */
  mix: { label: string; hex: string; weight: number }[];
  /** Hand-written fact that makes this method worth reading. */
  note: string;
}

export interface ChartSpec {
  baseName: string;
  baseHex: string;
  baseBlurb: string;
  gels: { name: string; brand: string; hex: string; note: string }[];
  /** Drop counts per row, ascending. */
  drops: number[];
  /** Weight units of base per batch; one gel drop = dropStrength units. */
  baseWeight: number;
  dropStrength: number;
}

export interface ScenarioDef {
  /** Flat URL slug, e.g. 'how-to-make-black-frosting' → /how-to-make-black-frosting/ */
  slug: string;
  kind: 'method' | 'chart';
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  /** Target answer for the hero swatch (method pages; chart pages compute it). */
  answerHex: string;
  answerLabel: string;
  introHeading: string;
  intro: string[];
  listHeading: string;
  methods?: MethodDef[];
  chart?: ChartSpec;
  chartIntro: string[];
  tips: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  /** Mixer island preload. */
  mixerColors: string[];
  related: { href: string; label: string }[];
}

/** Shared gel palette for the two chart pages (Wilton / Americolor numbering). */
const gels = [
  {
    name: 'Red',
    brand: 'Wilton Red-Red · Americolor Super Red',
    hex: '#d91d3c',
    note: 'The trickiest gel: deep red needs rest time, not more drops.',
  },
  {
    name: 'Yellow',
    brand: 'Wilton Lemon Yellow · Americolor Lemon Yellow',
    hex: '#f2c231',
    note: 'The tube you will replace first; every warm mix wants more yellow.',
  },
  {
    name: 'Orange',
    brand: 'Wilton Orange · Americolor Orange',
    hex: '#ef7215',
    note: 'At one drop it drifts toward peach and skin tones.',
  },
  {
    name: 'Green',
    brand: 'Wilton Kelly Green · Americolor Leaf Green',
    hex: '#1f9e50',
    note: 'Kelly runs cool; add a whisper of yellow for a leaf green.',
  },
  {
    name: 'Blue',
    brand: 'Wilton Royal Blue · Americolor Royal Blue',
    hex: '#1554c0',
    note: 'Four drops and up approaches navy territory.',
  },
  {
    name: 'Purple',
    brand: 'Wilton Violet · Americolor Violet',
    hex: '#7440a8',
    note: 'Violet pulls pink inside buttercream\'s yellow base.',
  },
  {
    name: 'Brown',
    brand: 'Wilton Brown · Americolor Chocolate Brown',
    hex: '#5b3a1e',
    note: 'One drop is caramel; eight is dark chocolate.',
  },
  {
    name: 'Black',
    brand: 'Wilton Black · Americolor Super Black',
    hex: '#141418',
    note: 'Takes the high end of the scale, or start from chocolate.',
  },
];

export const scenarios: ScenarioDef[] = [
  {
    slug: 'what-colors-make-brown',
    kind: 'method',
    h1: 'What Colors Make Brown',
    metaTitle: 'What Colors Make Brown (Every Route, With Exact HEX) | TintBrew',
    metaDescription:
      'Red and green, orange and blue, yellow and purple, or all three primaries — every way to mix brown, with the exact color each combination lands on.',
    lead:
      'Brown is not a mistake you make when colors go muddy — it is dark orange, and there are five clean routes to it: two complementary pairs, a shade route through black, and the all-primaries blend. Each route lands on a slightly different brown, and every swatch below is the computed blend, not a photograph.',
    answerHex: '#6b4423',
    answerLabel: 'warm chestnut brown',
    introHeading: 'Why so many colors make brown',
    intro: [
      'On the color wheel, brown sits nowhere — it is a dark, desaturated orange. That is why nearly any pair of opposites (complementary colors) mixes to it: each pigment absorbs what the other reflects, and the dim warm leftover your eye receives is brown. Red and green, orange and blue, yellow and purple: all three pairs land in the same family, just with different temperatures.',
      'The same logic explains the school-lunch version: mix all three paint primaries (red, yellow, blue) and you get brown too, because between them they absorb nearly everything. And because brown is really orange, darkening orange with black gets you there directly — the shade route. Paint, frosting, icing or slime: the arithmetic below is the same, only the medium changes.',
    ],
    listHeading: 'Five routes, computed',
    methods: [
      {
        name: 'Red + green',
        summary: 'The classic answer: red and green are complements, so each cancels the other.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'green', hex: '#008000', weight: 1 },
        ],
        note: 'The workhorse brown. Keep them roughly equal; lean red for a warm russet, lean green for an olive cast.',
      },
      {
        name: 'Orange + blue',
        summary: 'The other complementary pair — usually the cleanest, least muddy brown.',
        mix: [
          { label: 'orange', hex: '#ffa500', weight: 1 },
          { label: 'blue', hex: '#0000ff', weight: 1 },
        ],
        note: 'Because orange is already "brown waiting to happen" (it is the same hue, just brighter), this route reaches a natural chocolate tone with the least fighting. Blue in a smaller amount keeps it from going gray.',
      },
      {
        name: 'Yellow + purple',
        summary: 'The third complementary pair: a mustard-leaning, earthy brown.',
        mix: [
          { label: 'yellow', hex: '#ffff00', weight: 1 },
          { label: 'purple', hex: '#800080', weight: 1 },
        ],
        note: 'Yellow is the brightest pigment and purple the darkest of the pairs, so the blend lands warmer and dustier than the first two routes. Good for ochre and soil tones.',
      },
      {
        name: 'All three primaries',
        summary: 'Red + yellow + blue together: what every kid discovers in the paint tray.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'yellow', hex: '#ffff00', weight: 1 },
          { label: 'blue', hex: '#0000ff', weight: 1 },
        ],
        note: 'It works, but it is the least controllable route — the three pigments cancel so thoroughly that small ratio changes swing the result between warm, cool and gray. Use it to understand color, not to hit a target shade.',
      },
      {
        name: 'Orange + black (the shade route)',
        summary: 'Skip mixing complements: just darken orange, because brown IS dark orange.',
        mix: [
          { label: 'orange', hex: '#ffa500', weight: 3 },
          { label: 'black', hex: '#000000', weight: 1 },
        ],
        note: 'The most predictable route when you already have orange. A quarter black by weight gives a chestnut; push further for chocolate. This is also why "what colors make dark brown" and "what colors make brown" share one answer family.',
      },
    ],
    chartIntro: [],
    tips: [
      {
        title: 'Warm brown vs. cool brown',
        body: 'Nudge any route toward red or orange for warmth (chestnut, terracotta), toward blue or green for coolness (umber, taupe). Same route, one whisper of bias.',
      },
      {
        title: 'Light brown and tan are the same routes plus white',
        body: 'Tan, beige and light brown are not new colors — extend your brown with white. A quarter-white pull reads tan; that is the whole difference.',
      },
      {
        title: 'The medium changes the landing spot',
        body: 'Acrylic dries darker, watercolor dries lighter, frosting starts from a white base. The computed blends hold for the mixing logic; expect the physical version to sit one step lighter or darker.',
      },
      {
        title: 'Mix complements a little at a time',
        body: 'Complementary brown deepens fast at the end. Add the complement in tiny passes and stop one step early — it keeps developing as you blend it out.',
      },
    ],
    faqs: [
      {
        q: 'What two colors make brown?',
        a: 'Any complementary pair: red and green, orange and blue, or yellow and purple. Each lands on a slightly different brown — orange and blue is usually the cleanest, red and green the classic. Darkening straight orange with black also works, because brown is literally dark orange.',
      },
      {
        q: 'What colors make brown paint?',
        a: 'The same complementary routes: in acrylic or oil paint, orange plus a touch of blue is the most controllable, red plus green the most traditional. Start with your dominant color and add the complement in small passes until the brown reads right.',
      },
      {
        q: 'How do you make dark brown?',
        a: 'Take any brown route and push it: more of the complement deepens it, or add a touch of black directly. For paint, mixing a little ultramarine into burnt sienna is the classic dark-brown shortcut on the same theory.',
      },
      {
        q: 'How do you make light brown or tan?',
        a: 'Add white. Tan, beige and light brown are all the browns above pulled toward white — a quarter white by feel already reads tan. In frosting terms, that is exactly how tan icing is made from brown gel.',
      },
      {
        q: 'Why do mixed colors turn brown instead of a new color?',
        a: 'Pigments subtract light: each one absorbs wavelengths, and stacked pigments absorb more and more of the spectrum. What survives a heavy mix is a dim band in the red-to-yellow range — which your eye reports as brown. On a screen the same mix behaves differently, because screens add light instead of absorbing it.',
      },
    ],
    mixerColors: ['#ff0000', '#008000'],
    related: [
      { href: '/mix/red-green/', label: 'Red and green: the classic brown, every ratio' },
      { href: '/mix/brown-white/', label: 'Brown and white make tan' },
      { href: '/how-to-make-brown-icing/', label: 'How to make brown icing: five ways' },
      { href: '/color-guides/', label: 'All color guides' },
    ],
  },

  {
    slug: 'what-colors-make-purple',
    kind: 'method',
    h1: 'What Colors Make Purple',
    metaTitle: 'What Colors Make Purple (Every Mix, With Exact HEX) | TintBrew',
    metaDescription:
      'Red and blue make purple — but magenta and blue make it cleaner. Every route to purple, violet and plum, with the exact color each mix lands on.',
    lead:
      'Purple is the odd one out on the color wheel: it has no wavelength of its own. Red and blue make it in paint, magenta and blue make it brighter, and white or black turn it into lavender or aubergine. Every swatch below is the computed blend, so you can see exactly where each route lands before you squeeze a tube.',
    answerHex: '#8c53a2',
    answerLabel: 'red and blue in equal parts',
    introHeading: 'Why purple is the trickiest classic mix',
    intro: [
      'Unlike red, green, or blue, purple is not a color your screen can emit as a single channel — and it is not a wavelength your eye sees on its own either. Purple lives in the gap between the red end and blue end of the spectrum, which is why it only exists as a mixture. That makes it the classic school answer (red and blue) and, in practice, the classic disappointment: the mixed paint often comes out grayer and darker than expected.',
      'The reason is subtraction. Red pigment absorbs most blue light, and blue pigment absorbs most red light — so stacking the two leaves only a dim violet leftover. Painters dodge this by swapping red for magenta, a pigment that reflects both red and blue. Same idea, much livelier purple. The routes below show both, with the exact landing spot for each.',
    ],
    listHeading: 'Five routes, computed',
    methods: [
      {
        name: 'Red + blue (the school answer)',
        summary: 'The classic: equal parts red and blue land on a muted, true purple.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'blue', hex: '#0000ff', weight: 1 },
        ],
        note: 'This is the answer everyone learns, and it works — but notice the result is duskier than the purple in your head. Red absorbs blue and blue absorbs red, so the mix arrives pre-dimmed. Fine for most jobs; the next route is the fix when you want fireworks.',
      },
      {
        name: 'Magenta + blue (the vivid route)',
        summary: 'Swap red for magenta and the same mix turns electric.',
        mix: [
          { label: 'magenta', hex: '#ff00ff', weight: 1 },
          { label: 'blue', hex: '#0000ff', weight: 1 },
        ],
        note: 'Magenta is a printer\'s primary — it reflects red and blue light instead of eating half of it. In paint terms this is quinacridone magenta plus ultramarine, the standard recipe for a clean royal purple. Whenever a red-and-blue mix disappoints, this is the upgrade.',
      },
      {
        name: 'Lean blue for violet',
        summary: 'Twice as much blue as red pushes the mix toward blue-violet and indigo.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'blue', hex: '#0000ff', weight: 2 },
        ],
        note: 'Violet is simply purple with extra blue in it. This is the lane for iris, lavender-leaning blues, and the deep end of dusk skies. In paint, adding a touch of ultramarine to your purple does the same job.',
      },
      {
        name: 'Lean red for plum',
        summary: 'Flip the ratio and the mix warms up into plum and wine territory.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 2 },
          { label: 'blue', hex: '#0000ff', weight: 1 },
        ],
        note: 'Extra red slides the blend toward red-violet: plum, wine, magenta-leaning purple. This is the family that reads cozy instead of cool, and it is also where pink-tinted purples like fuchsia begin.',
      },
      {
        name: 'Purple + black (the shade route)',
        summary: 'Darken finished purple with a quarter-share of black for aubergine.',
        mix: [
          { label: 'purple', hex: '#800080', weight: 4 },
          { label: 'black', hex: '#000000', weight: 1 },
        ],
        note: 'The most predictable way to reach deep eggplant and aubergine. Add black a finger at a time — purple darkens fast at the end and there is no un-mixing it. For the opposite direction, white does the job: see the lavender FAQ below.',
      },
    ],
    chartIntro: [],
    tips: [
      {
        title: 'Vivid purple lives or dies on your red',
        body: 'A yellow-biased red (cadmium, vermilion) drags the mix toward mud, because yellow and blue pull in opposite directions. If your purple keeps going gray, switch to magenta, rose, or quinacridone — the blue-loving reds.',
      },
      {
        title: 'Lavender is a tint, not a new color',
        body: 'Lavender, lilac and light purple are all purple plus white. A quarter-share of white already reads lavender; keep going for lilac. In frosting, the white base does this for free.',
      },
      {
        title: 'Keep yellow away from your purple',
        body: 'Yellow is purple\'s complement: the moment it sneaks in (dirty brush, contaminated gel), the mix collapses toward gray and brown. If that is the effect you want, it is called muting — see what colors make brown for the full map.',
      },
      {
        title: 'Screens cheat, paint subtracts',
        body: 'Your monitor mixes red and blue light directly, so digital purple looks cleaner than any paint mix. Expect the tube version to land one step darker and grayer than the on-screen swatch.',
      },
    ],
    faqs: [
      {
        q: 'What two colors make purple?',
        a: 'Red and blue — that is the classic answer, and the equal-parts blend lands on a muted violet. The cleaner mix is magenta plus blue, because magenta reflects both red and blue light instead of absorbing half of it. Lean blue for violet, lean red for plum.',
      },
      {
        q: 'How do you make dark purple?',
        a: 'Two ways: add more blue to the mix (deepens and cools it), or shade finished purple with a small amount of black, which gives aubergine and eggplant. Go slowly — purple darkens quickly in the last stretch of either route.',
      },
      {
        q: 'How do you make lavender or light purple?',
        a: 'Add white. Lavender, lilac and periwinkle are tints of purple: roughly one part white to four parts purple already reads lavender, and more white walks it toward lilac. In buttercream or icing the white base does this automatically.',
      },
      {
        q: 'Why did my red and blue make gray or brown instead of purple?',
        a: 'Almost always the red\'s fault. Reds with a yellow bias (cadmium, vermilion) carry the one color into the mix that kills purple. Switch to magenta or a rose red, and rinse the brush — trace yellow from earlier mixing does the same damage.',
      },
      {
        q: 'What is the difference between purple and violet?',
        a: 'In everyday use they are interchangeable. Strictly, violet is the bluer member of the family — closer to indigo — while purple leans red toward plum and magenta. Artists use violet for blue-leaning mixes and purple for red-leaning ones; the two ratio routes above show the difference side by side.',
      },
    ],
    mixerColors: ['#ff0000', '#0000ff'],
    related: [
      { href: '/mix/red-blue/', label: 'Red and blue: the exact color at every ratio' },
      { href: '/mix/blue-purple/', label: 'Blue and purple make violet' },
      { href: '/mix/purple-red/', label: 'Purple and red make magenta' },
      { href: '/what-colors-make-brown/', label: 'What colors make brown (why complements collide)' },
      { href: '/color-mixer/', label: 'Mix your own purple live' },
    ],
  },

  {
    slug: 'what-colors-make-green',
    kind: 'method',
    h1: 'What Colors Make Green',
    metaTitle: 'What Colors Make Green (Every Mix, With Exact HEX) | TintBrew',
    metaDescription:
      'Blue and yellow make green — but which blue decides whether you get teal, chartreuse, or a muted olive. Every route to green, with the exact landing spot.',
    lead:
      'Blue and yellow make green — the first mix everyone learns, and the one where the choice of blue quietly decides everything. A violet-leaning blue gives a muted, natural green; a cyan-leaning blue gives a vivid one; more yellow slides toward chartreuse and more blue toward teal. Every swatch below is the computed blend, not a photo.',
    answerHex: '#008000',
    answerLabel: 'blue and yellow in paint',
    introHeading: 'Why blue and yellow make green at all',
    intro: [
      'Green is a primary color of light — your screen does not mix it, it just fires the green pixel. Paint has no such shortcut: green pigment has to come from a blend, and blue plus yellow is the route. It works by subtraction. Blue pigment absorbs the red and orange end of the spectrum, yellow pigment absorbs the violet and blue end, and the band they both leave alone is green. That surviving band is the color you see.',
      'Because the mix depends on what each pigment lets through, the specific blue matters more than the ratio. A violet-leaning blue (ultramarine) leaks a little red, so the green arrives muted and natural — think sage and moss. A cyan-leaning blue (phthalo) leaks nothing warm, so the green comes out vivid and cold. The routes below start where a painter starts: blue worked into a yellow base for the classic blend, then green as the hub, with yellow, blue, black and white walking it to chartreuse, teal, forest and sage.',
    ],
    listHeading: 'Five routes, computed',
    methods: [
      {
        name: 'Blue into yellow (the painter\'s route)',
        summary: 'Work blue into a yellow base — twice the yellow — for the classic fresh green.',
        mix: [
          { label: 'azure blue', hex: '#0080ff', weight: 1 },
          { label: 'yellow', hex: '#ffff00', weight: 2 },
        ],
        note: 'This is how the mix is actually done at a palette: blue goes into yellow, a little at a time, never the reverse. Equal parts overshoot into a dull grayish middle on most pigments — and on a screen, a 50/50 blue-and-yellow blend washes out to a pale blue instead of green at all, because light adds toward white. Paint is the process that makes green.',
      },
      {
        name: 'Green + yellow (the chartreuse route)',
        summary: 'Start from green and lean yellow for lime, chartreuse and spring green.',
        mix: [
          { label: 'green', hex: '#008000', weight: 1 },
          { label: 'yellow', hex: '#ffff00', weight: 1 },
        ],
        note: 'The cleanest way to a vivid yellow-green: green already sits where you want to be, and yellow just walks it toward lime. It is also the fix when a blue-and-yellow mix refuses to get bright — restart from a green pigment instead of fighting the wash-out.',
      },
      {
        name: 'Green + blue (the teal route)',
        summary: 'Lean the other way for teal, sea green and spruce.',
        mix: [
          { label: 'green', hex: '#008000', weight: 1 },
          { label: 'azure blue', hex: '#0080ff', weight: 1 },
        ],
        note: 'Blue-heavy greens read cool and calm — the spa-and-deep-forest end of the family. In real tubes, a cyan-leaning blue (phthalo) gives the crispest teal and a violet-leaning one (ultramarine) a moodier, dustier spruce.',
      },
      {
        name: 'Green + black (the forest route)',
        summary: 'Shade finished green with a quarter-share of black for forest and pine.',
        mix: [
          { label: 'green', hex: '#008000', weight: 4 },
          { label: 'black', hex: '#000000', weight: 1 },
        ],
        note: 'The shade route to dark green. Black flattens as it darkens, so stop just before it reads stylized — for natural depth, deepen with extra blue instead and keep black as the final trim.',
      },
      {
        name: 'Green + white (the sage route)',
        summary: 'Tint finished green toward sage, mint and pastel.',
        mix: [
          { label: 'green', hex: '#008000', weight: 1 },
          { label: 'white', hex: '#ffffff', weight: 1 },
        ],
        note: 'Sage is green pulled halfway to white, and it is the most-wanted green in interiors for a reason: the white softens everything loud out of it. Equal parts already read sage; mint is the same walk starting from a blue-leaning green.',
      },
    ],
    chartIntro: [],
    tips: [
      {
        title: 'The blue decides the mood',
        body: 'Ultramarine (violet-leaning) makes muted, natural greens; phthalo (cyan-leaning) makes vivid, cold ones. When a green mix keeps disappointing, change the blue, not the ratio.',
      },
      {
        title: 'Darken with blue for nature, black for style',
        body: 'Extra blue deepens green while keeping it alive — that is how you get natural pine and moss. Black darkens faster but flatter, which suits graphic forest greens and stylized art.',
      },
      {
        title: 'Olive is a bruised green',
        body: 'A whisper of red — green\'s complement — drags green toward olive and moss. It is the exact same collision that makes brown, just stopped earlier. Useful for earthy palettes, fatal if you wanted vivid.',
      },
      {
        title: 'Screens do not mix green',
        body: 'Green is a primary of light: your monitor fires it directly, no blend involved. That is why digital green looks neon next to any paint — and blue plus yellow light adds toward white, so a screen 50/50 of the two looks washed out rather than green, exactly backwards from paint.',
      },
    ],
    faqs: [
      {
        q: 'What two colors make green?',
        a: 'Blue and yellow. The blend works by subtraction: blue absorbs the warm end of the spectrum, yellow absorbs the cool end, and the green band in between survives. Equal parts give a middle green; more yellow makes chartreuse, more blue makes teal.',
      },
      {
        q: 'How do you make dark green or forest green?',
        a: 'Two routes: add more blue to deepen while keeping the green alive (natural pine, moss), or shade finished green with a small amount of black (graphic forest green). Blue deepens gently; black hits hard and flattens, so add it in small passes.',
      },
      {
        q: 'How do you make light green, mint, or sage?',
        a: 'Add white. Sage is roughly equal parts green and white; mint is the same tint starting from a blue-leaning green. In frosting and icing the white base builds the tint in for you — one drop of green gel already lands pastel.',
      },
      {
        q: 'How do you make olive green?',
        a: 'Add a touch of red. Red is green\'s complement, so a small amount bruises the green toward olive and moss without going all the way to brown. A pinch of orange or brown does the same job warmer.',
      },
      {
        q: 'Why do blue and yellow make green instead of just getting darker?',
        a: 'Because the two pigments block different halves of the spectrum. Blue absorbs reds and oranges; yellow absorbs violets and blues. Stack them and the only wavelengths both still reflect are the green band in between — so that is what reaches your eye.',
      },
    ],
    mixerColors: ['#0000ff', '#ffff00'],
    related: [
      { href: '/mix/blue-yellow/', label: 'Blue and yellow: the exact color at every ratio' },
      { href: '/mix/yellow-green/', label: 'Yellow and green make chartreuse' },
      { href: '/mix/green-black/', label: 'Green and black make forest green' },
      { href: '/what-colors-make-brown/', label: 'What colors make brown (the olive–brown border)' },
      { href: '/color-guides/', label: 'All color guides' },
    ],
  },

  {
    slug: 'what-colors-make-orange',
    kind: 'method',
    h1: 'What Colors Make Orange',
    metaTitle: 'What Colors Make Orange (Every Mix, With Exact HEX) | TintBrew',
    metaDescription:
      'Red and yellow make orange — plus the amber, vermilion, peach, and burnt-orange variants. The exact color every ratio lands on, computed.',
    lead:
      'Red and yellow make orange — the friendliest mix on the wheel, because the two colors are neighbors and blend cleanly. Ratios do the rest: more yellow gives gold and amber, more red gives vermilion, white gives peach, and black turns it toward burnt orange. Every swatch below is computed, not photographed.',
    answerHex: '#ffa000',
    answerLabel: 'red and yellow in equal parts',
    introHeading: 'Why orange mixes so easily',
    intro: [
      'Orange is the only major color named after a fruit — English had no word for it before oranges reached Europe and called it yellow-red (geoluread). On the wheel it sits exactly halfway between red and yellow, and because the two are neighbors rather than opposites, they blend without any of the muddiness that plagues purple and brown mixes. Whatever ratio you pick, you land somewhere useful.',
      'On a screen, orange is a pure addition: red light plus green light, summed. Your TV has no orange pixel — it paints the fruit-bowl orange by lighting red and green together, which is also why orange and brown sit so close together in digital photos: brown is just dark orange, rendered by the same arithmetic with the brightness turned down.',
    ],
    listHeading: 'Five routes, computed',
    methods: [
      {
        name: 'Red + yellow (the classic)',
        summary: 'Equal parts red and yellow land on a clean, true orange.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'yellow', hex: '#ffff00', weight: 1 },
        ],
        note: 'The school answer, and the most forgiving mix in paint. Because red and yellow are neighbors on the wheel, no ratio here turns muddy — you simply slide along the ramp between them. This blend is the anchor for every variation below.',
      },
      {
        name: 'More yellow for amber',
        summary: 'Twice the yellow walks the mix toward gold and amber.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'yellow', hex: '#ffff00', weight: 2 },
        ],
        note: 'Yellow-heavy oranges read as gold, amber and marigold — the sunlight end of the family. Yellow is the stronger pigment in most paints, so measure the red rather than the yellow when you are chasing a specific spot on this ramp.',
      },
      {
        name: 'More red for vermilion',
        summary: 'Flip the ratio and the mix heats up toward vermilion and red-orange.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 2 },
          { label: 'yellow', hex: '#ffff00', weight: 1 },
        ],
        note: 'Red-heavy oranges are vermilion and scarlet territory — fire, poppy, and coral. Historically vermilion was its own mercury pigment, but the blend gets you the same lane with the two primaries you already own.',
      },
      {
        name: 'Orange + white (the peach route)',
        summary: 'Tint finished orange for peach, apricot and pastel coral.',
        mix: [
          { label: 'orange', hex: '#ffa500', weight: 3 },
          { label: 'white', hex: '#ffffff', weight: 1 },
        ],
        note: 'Peach is orange pulled toward white, the same way pink is red pulled toward white. A quarter-share already reads peach; keep walking for apricot and pastel coral. In frosting, the white base means you start here by default.',
      },
      {
        name: 'Orange + black (the burnt route)',
        summary: 'Shade finished orange toward burnt orange — and from there, brown.',
        mix: [
          { label: 'orange', hex: '#ffa500', weight: 4 },
          { label: 'black', hex: '#000000', weight: 1 },
        ],
        note: 'A quarter-share of black gives burnt orange and rust. Push further and you cross the border into brown country — because brown IS dark orange, which is the whole premise of our what colors make brown guide. One ramp, three colors.',
      },
    ],
    chartIntro: [],
    tips: [
      {
        title: 'Pick a warm red',
        body: 'Bluish reds (alizarin, magenta) make dusty, rusty oranges; warm reds (cadmium, scarlet, vermilion) keep the blend bright. If your orange keeps going brick, the red is the suspect.',
      },
      {
        title: 'Gold is a ratio, not a pigment',
        body: 'The gold–amber–marigold range is just orange with more yellow. You do not need a gold tube; you need to lean the ramp. Same for fire colors in the other direction — more red, more heat.',
      },
      {
        title: 'Peach and burnt are the same knob',
        body: 'White walks orange toward peach and apricot; black walks it toward burnt orange and rust. Every other orange in a palette is one of these two moves away from the center blend.',
      },
      {
        title: 'Orange plus blue goes brown',
        body: 'Blue is orange\'s complement: mix them and you land in rust, tan and brown. Perfect when you want to mute orange into something earthy — the fastest way to ruin a clean orange when you do not.',
      },
    ],
    faqs: [
      {
        q: 'What two colors make orange?',
        a: 'Red and yellow, in any proportion. They are neighbors on the color wheel, so the blend is clean at every ratio: equal parts give a true orange, more yellow leans gold and amber, more red leans vermilion.',
      },
      {
        q: 'How do you make dark orange or burnt orange?',
        a: 'Add a small amount of black to finished orange — a quarter-share lands on burnt orange and rust. A touch of blue (orange\'s complement) darkens while keeping it warmer and earthier; push either far enough and you reach brown, because brown is dark orange.',
      },
      {
        q: 'How do you make peach or light orange?',
        a: 'Add white. Peach is roughly one part white to three parts orange; more white walks it toward apricot and pastel coral. It is the same move that turns red into pink.',
      },
      {
        q: 'How do you make orange without red?',
        a: 'Mix yellow with magenta. Magenta is a primary of ink and paint mixing, and yellow plus magenta covers the red channel between them — printers make every orange they print from exactly this pair.',
      },
      {
        q: 'What colors make orange paint?',
        a: 'Cadmium red plus cadmium yellow is the classic tube recipe for a clean, opaque orange. Scarlet or vermilion red with a lemon yellow runs hotter; swap in alizarin and the same mix turns earthy and rust-toned.',
      },
    ],
    mixerColors: ['#ff0000', '#ffff00'],
    related: [
      { href: '/mix/red-yellow/', label: 'Red and yellow: the exact color at every ratio' },
      { href: '/mix/orange-yellow/', label: 'Orange and yellow make gold' },
      { href: '/mix/orange-red/', label: 'Orange and red make vermilion' },
      { href: '/what-colors-make-brown/', label: 'What colors make brown (dark orange, explained)' },
      { href: '/color-mixer/', label: 'Mix your own orange live' },
    ],
  },

  {
    slug: 'how-to-make-black-frosting',
    kind: 'method',
    h1: 'How to Make Black Frosting',
    metaTitle: 'How to Make Black Frosting (That\'s Actually Black) | TintBrew',
    metaDescription:
      'Make true black buttercream at home: gel amounts per cup, why you should start from chocolate, and the overnight trick that gets you to real black.',
    lead:
      'Black is the one color home bakers fight with. Add black gel to white frosting and you get gray, then bitterness, long before you get black. The fix is to stop starting from white: begin with chocolate, use gel instead of liquid, and let the color develop overnight. You reach a deep, camera-ready black with a fraction of the dye.',
    answerHex: '#1d1713',
    answerLabel: 'deep charcoal black',
    introHeading: 'Why black frosting fights back',
    intro: [
      'Frosting looks white because sugar and fat scatter every wavelength of light back at you. Food coloring can only subtract light, never add it, so a black frosting has to absorb almost everything that hits it. From a white start that takes a shocking amount of dye, and heavy dye tastes bitter. That is the whole problem in one paragraph.',
      'The second problem is the coloring itself. Liquid food coloring is mostly water; to get anywhere near black you would need tablespoons of it, and your buttercream turns to soup. Gel colors (Americolor, Wilton, Chefmaster) are concentrated pastes: a quarter teaspoon does what a quarter cup of liquid cannot, and your consistency survives.',
    ],
    listHeading: 'Four ways to get there',
    methods: [
      {
        name: 'Chocolate base + black gel (the bakery method)',
        summary:
          'Start from dark chocolate buttercream, then add black gel. Brown already absorbed most of the light for you.',
        mix: [
          { label: 'chocolate buttercream', hex: '#2e1c12', weight: 10 },
          { label: 'black gel', hex: '#141418', weight: 2 },
        ],
        note: 'This is how bakeries actually do it. Chocolate frosting is 80% of the way to black before you open the gel bottle, so you need a fifth of the dye, there is no bitter edge, and it tastes like chocolate instead of chemicals.',
      },
      {
        name: 'Black cocoa buttercream',
        summary:
          'Onyx (black) cocoa powder colors as it flavors: an Oreo-dark frosting with no dye at all.',
        mix: [
          { label: 'black cocoa buttercream', hex: '#211710', weight: 10 },
          { label: 'black gel', hex: '#141418', weight: 1 },
        ],
        note: 'Black cocoa is the ingredient that makes Oreo filling taste like Oreo filling. Swap a quarter of your regular cocoa for it and the frosting lands near-black on its own; a touch of gel finishes the job for photos.',
      },
      {
        name: 'White base + heavy black gel',
        summary:
          'The vanilla-tastes-must-stay route: heavy gel loading straight into white buttercream.',
        mix: [
          { label: 'vanilla buttercream', hex: '#fff3e2', weight: 10 },
          { label: 'black gel', hex: '#141418', weight: 4 },
        ],
        note: 'The computed swatch is the honest ceiling of this route: charcoal, not black. It deepens overnight, but if you need true black for a photo, this is why pros quietly start from chocolate instead.',
      },
      {
        name: 'No black gel? Combine red, blue and green',
        summary:
          'Emergency mix: the three primaries in white frosting cancel each other\'s light out.',
        mix: [
          { label: 'vanilla buttercream', hex: '#fff3e2', weight: 10 },
          { label: 'red gel', hex: '#d91d3c', weight: 1 },
          { label: 'blue gel', hex: '#1554c0', weight: 1 },
          { label: 'green gel', hex: '#1f9e50', weight: 1 },
        ],
        note: 'Each pigment absorbs what the others reflect, so together they leave almost nothing: that is subtractive color theory in a bowl. It lands muddy and it eats flavor, so treat it as a rescue, not a plan.',
      },
    ],
    chartIntro: [],
    tips: [
      {
        title: 'Let it rest overnight before judging',
        body: 'Black gel darkens as it hydrates. What looks dark gray at 8 pm reads black by morning. Resting is free; extra dye costs flavor.',
      },
      {
        title: 'Count by the cup',
        body: 'From a chocolate base, start with an eighth of a teaspoon of gel per cup of buttercream and cap around a quarter. From white, budget up to half a teaspoon per cup and expect charcoal-deep, not ink.',
      },
      {
        title: 'Camera black is not eye black',
        body: 'What reads as black in photos is usually a dark charcoal. Truest-black frosting looks flat and obviously dyed in person, so aim one step lighter than you think.',
      },
      {
        title: 'Re-whip before piping',
        body: 'Black buttercream that sits a while looks streaky gray on the surface. A quick 15-second re-whip brings the color back together.',
      },
    ],
    faqs: [
      {
        q: 'How much black food coloring does it take to make black frosting?',
        a: 'From a chocolate base, an eighth to a quarter teaspoon of gel per cup of buttercream. From a white base, expect half a teaspoon or more per cup, and accept a charcoal result unless it rests overnight. Never use liquid food coloring for black: the amount required waters the frosting down before it darkens it.',
      },
      {
        q: 'Why did my black frosting turn gray?',
        a: 'Almost always one of three things: you started from white (the hardest route), you did not let it rest (gel deepens for hours), or the gel loading topped out. The reliable fix is restarting from chocolate frosting, where brown does most of the darkening for free.',
      },
      {
        q: 'How do I make black frosting without black food coloring?',
        a: 'Use black cocoa powder, also sold as onyx cocoa. It colors the frosting a very dark brown-black while flavoring it, no dye involved. Add a small amount of black gel only if you need a true black under camera lights.',
      },
      {
        q: 'Does black frosting taste bad?',
        a: 'Only when it takes a lot of gel to get there. Heavy black gel reads bitter and chemical. The chocolate-base method exists precisely to dodge this: less dye, and the chocolate carries the flavor instead.',
      },
      {
        q: 'Does this work for royal icing too?',
        a: 'Yes, with two adjustments. Royal icing starts whiter than buttercream, so it needs more gel to look equally dark, and it must stay stiff, which is one more reason to prefer gel over liquid. The overnight rest trick works even harder in royal icing.',
      },
    ],
    mixerColors: ['#2e1c12', '#141418'],
    related: [
      { href: '/mix/red-green/', label: 'Why red and green make brown (the theory behind the emergency mix)' },
      { href: '/how-to-make-brown-icing/', label: 'How to make brown icing: five ways' },
      { href: '/icing-color-chart/', label: 'Icing color chart: every gel by drop count' },
      { href: '/color-mixer/', label: 'Mix your own frosting colors' },
    ],
  },
  {
    slug: 'how-to-make-brown-icing',
    kind: 'method',
    h1: 'How to Make Brown Icing',
    metaTitle: 'How to Make Brown Icing (5 Ways, With Exact Colors) | TintBrew',
    metaDescription:
      'Five ways to make brown icing: cocoa, brown gel, red plus green, orange plus blue, or espresso — with the exact color each method lands on.',
    lead:
      'Brown is the friendliest "hard" color in the kitchen, because you have five ways in: cocoa powder, brown gel, red plus green, orange plus blue, or a shot of espresso. Each one lands on a different brown, from baker\'s chocolate to warm caramel, and the swatches below are computed blends rather than eyeballed photos.',
    answerHex: '#6f4a2c',
    answerLabel: 'warm baker\'s brown',
    introHeading: 'What brown actually is',
    intro: [
      'Brown is dark orange. Any route that knocks the brightness out of a red-yellow color gets you there, which is why so many "different" methods land in the same family. In pigment, red and green make brown because each absorbs the other\'s light and what survives is a dim, warm leftover.',
      'Tan and beige are the same story with the volume turned down: brown pulled toward white. If you are chasing tan icing, use the exact methods below with a quarter of the color and you are already there.',
    ],
    listHeading: 'Five ways to get there',
    methods: [
      {
        name: 'Cocoa powder (color plus flavor)',
        summary:
          'Stir cocoa into white icing: color and chocolate flavor arrive together, no dye involved.',
        mix: [
          { label: 'white icing', hex: '#fffbf4', weight: 10 },
          { label: 'cocoa powder', hex: '#43290f', weight: 3 },
        ],
        note: 'One to two tablespoons per cup of icing for color; add more for intensity and dial the powdered sugar back a little to compensate.',
      },
      {
        name: 'Brown gel coloring',
        summary:
          'The most controllable route: brown gel in white icing, adjustable drop by drop.',
        mix: [
          { label: 'white icing', hex: '#fffbf4', weight: 10 },
          { label: 'brown gel', hex: '#5b3a1e', weight: 1 },
        ],
        note: 'One drop per cup lands caramel; two to three gets you chocolate. Wilton Brown and Americolor Chocolate Brown are the common tubes. Dutch-process cocoa and brown gel mix cleanly if you use both.',
      },
      {
        name: 'Red plus green gels',
        summary:
          'The color-theory answer: two complementary gels cancel each other into brown.',
        mix: [
          { label: 'white icing', hex: '#fffbf4', weight: 10 },
          { label: 'red gel', hex: '#d91d3c', weight: 1 },
          { label: 'green gel', hex: '#1f9e50', weight: 1 },
        ],
        note: 'Red pigment absorbs green light and green pigment absorbs red; what reflects back is a muted, warm brown. Keep the two gels roughly equal or the mix leans brick or olive.',
      },
      {
        name: 'Orange plus blue gels',
        summary:
          'The other complementary pair: orange with a shorter shot of blue for a walnut brown.',
        mix: [
          { label: 'white icing', hex: '#fffbf4', weight: 10 },
          { label: 'orange gel', hex: '#ef7215', weight: 1 },
          { label: 'blue gel', hex: '#1554c0', weight: 0.5 },
        ],
        note: 'Blue is strong, so it gets half the orange\'s amount. Lean blue and you slide toward gray; lean orange and it reads caramel.',
      },
      {
        name: 'Espresso (the mocha route)',
        summary:
          'Instant espresso dissolved into white icing: flavor-first brown for grown-up desserts.',
        mix: [
          { label: 'white icing', hex: '#fffbf4', weight: 10 },
          { label: 'espresso', hex: '#3a2414', weight: 2 },
        ],
        note: 'Dissolve the instant powder in a few drops of water first so it streaks less. Two teaspoons per cup gives a mocha tan; combine with the cocoa method for a serious coffee brown.',
      },
    ],
    chartIntro: [],
    tips: [
      {
        title: 'Tan is just shy brown',
        body: 'For tan icing, take any method above and use a quarter of the color, or extend your brown icing with plain white. Tan, beige and brown are one family; only the white content changes.',
      },
      {
        title: 'Brown deepens as royal icing dries',
        body: 'Pipe a test stroke on parchment and give it 20 minutes before you judge the color. Dried royal runs noticeably darker and warmer than it looks in the bowl.',
      },
      {
        title: 'Match the brown to the job',
        body: 'Gingerbread men want a warm red-leaning brown (more red gel); chocolate sandwich cookies want the dark cocoa end. Pick the method by flavor first, then fine-tune with gel.',
      },
    ],
    faqs: [
      {
        q: 'What two colors make brown icing?',
        a: 'Red plus green, or orange plus blue: complementary pigments each absorb the other\'s light and what is left is brown. The no-dye answer is cocoa powder. Each route lands on a slightly different brown, from caramel to baker\'s chocolate.',
      },
      {
        q: 'How do you make brown frosting without brown food coloring?',
        a: 'Cocoa powder is the standard answer: one to two tablespoons per cup colors and flavors at once. The backup is red plus green gel in equal amounts, which mixes the brown by subtraction.',
      },
      {
        q: 'What colors make tan icing?',
        a: 'The same ones as brown, in smaller doses: brown is dark orange, and tan is that same brown pulled toward white. Use a quarter of the gel, or mix finished brown icing with more plain white icing until it reads tan.',
      },
      {
        q: 'Why does my brown icing look gray?',
        a: 'Too many pigments stacked: once blue, green and red all pile up, they absorb everything and the mix goes flat gray. Start over from white base and build the brown with one route instead of patching three.',
      },
      {
        q: 'How much cocoa should I use per cup of icing?',
        a: 'One tablespoon per cup for a milk-chocolate brown, two for dark. Beyond that the icing thickens and turns dusty; trade a spoonful of powdered sugar for the extra cocoa rather than adding liquid.',
      },
    ],
    mixerColors: ['#fffbf4', '#5b3a1e'],
    related: [
      { href: '/what-colors-make-brown/', label: 'What colors make brown: five routes, computed' },
      { href: '/mix/red-green/', label: 'Red and green make brown — see the exact color' },
      { href: '/mix/brown-white/', label: 'Brown and white make tan (the tan icing trick)' },
      { href: '/how-to-make-black-frosting/', label: 'How to make black frosting' },
      { href: '/icing-color-chart/', label: 'Icing color chart: every gel by drop count' },
    ],
  },
  {
    slug: 'icing-color-chart',
    kind: 'chart',
    h1: 'Icing Color Chart',
    metaTitle: 'Icing Color Chart (Gel Drops to Exact Colors) | TintBrew',
    metaDescription:
      'A computed icing color chart: the exact color 1–8 drops of each gel makes in white icing, with HEX codes, drop counts per cup, and brand notes.',
    lead:
      'Most icing color charts are photographs, and photographs lie: lighting shifts, printers shift, batches shift. This chart is computed. Pick your gel color, count your drops per cup of white icing, and the swatch is the exact blend you will see in the bowl, with the HEX code to match anything.',
    answerHex: '#df7285',
    answerLabel: 'four drops of red gel in white icing',
    introHeading: 'How to read this chart',
    intro: [],
    listHeading: 'The chart: one cup of white icing, 1 to 8 drops',
    chart: {
      baseName: 'white royal icing',
      baseHex: '#fffbf4',
      baseBlurb:
        'The starting point: vanilla royal icing before any color. It is near-white with a faint warm cast from vanilla and dried egg white.',
      gels,
      drops: [1, 2, 4, 8],
      baseWeight: 16,
      dropStrength: 2,
    },
    chartIntro: [
      'Gel versus liquid first, because the units only make sense for gel. Liquid food coloring is dye in water; a "drop" of it barely tints a whole cup and enough drops to matter waters your icing down. Gel colors are concentrated pastes, so single drops are the working unit everywhere below.',
      'The scale reads like this: one drop per cup is pastel (baby-shower territory), two is the classic birthday-cake shade, four is a jewel tone, and eight is deep, heading toward the maximum the icing will take. The swatches are perceptual blends of base and gel, so what you see is what the mix looks like to your eye, not to raw channel math.',
      'Brand note: drop sizes vary slightly between Wilton\'s toothpick-dip style and Americolor\'s squeeze bottle. Treat every count below as approximate to within about 20 percent, and mix a test batch before committing the whole bowl.',
    ],
    tips: [
      {
        title: 'Color develops over 20 minutes',
        body: 'Gel keeps blooming after mixing, and royal icing dries darker than it looks wet. Mix, wait, then adjust; adjusting immediately is how people overshoot.',
      },
      {
        title: 'Deep shades need rest, not more drops',
        body: 'Red and black especially. If the chart says you are at the deep end and it still looks light, give it time (or overnight) before adding more gel.',
      },
      {
        title: 'Count per cup and scale',
        body: 'The counts are per cup of icing. Two cups means double the drops; keep the ratio and every swatch above still applies.',
      },
      {
        title: 'Test in a small bowl first',
        body: 'Pull a spoonful of icing, color it, dry a streak of it, then match against the chart. Cheaper than discovering eight drops was two too many after the fact.',
      },
    ],
    faqs: [
      {
        q: 'How many drops of gel color per cup of icing?',
        a: 'One drop for pastel, two for a classic medium shade, four for a deep jewel tone, eight and up for near-saturated colors like dark red or black. The chart above shows the exact color each count lands on.',
      },
      {
        q: 'What is the difference between gel and liquid food coloring for icing?',
        a: 'Concentration. Liquid coloring is mostly water, so you need tablespoons to color a cup of stiff icing, which thins it into soup. Gel is a concentrated paste where drops are the working unit, and the icing\'s consistency barely moves.',
      },
      {
        q: 'Which gel colors should I buy first?',
        a: 'Red, yellow, blue and green cover the mixing basics, and black plus brown save you from building dark colors the hard way. Every other shade on the chart can be mixed from those six.',
      },
      {
        q: 'Do Wilton and Americolor drops measure the same?',
        a: 'Close but not identical: Wilton jars are toothpick-dip style and Americolor bottles are squeeze droppers. Real-world counts land within about 20 percent of each other, so mix, compare against the chart, and fine-tune.',
      },
      {
        q: 'How do I make a pastel version of any color?',
        a: 'Use a single drop per cup, or extend finished icing with plain white until it reads right. Pastels are just deep colors pulled toward white, and one drop is usually already there.',
      },
    ],
    mixerColors: ['#fffbf4', '#d91d3c'],
    related: [
      { href: '/buttercream-color-chart/', label: 'Buttercream color chart (why butter shifts everything warm)' },
      { href: '/how-to-make-brown-icing/', label: 'How to make brown icing: five ways' },
      { href: '/how-to-make-black-frosting/', label: 'How to make black frosting' },
      { href: '/color-mixer/', label: 'Mix custom colors in the color mixer' },
    ],
  },
  {
    slug: 'buttercream-color-chart',
    kind: 'chart',
    h1: 'Buttercream Color Chart',
    metaTitle: 'Buttercream Color Chart (With the Yellow Shift Explained) | TintBrew',
    metaDescription:
      'Buttercream color chart from a realistic butter-yellow base: what 1–8 drops of gel really make, why every color shifts warm, and how to whiten it.',
    lead:
      'Buttercream never starts white. It starts butter-yellow, and that changes every color you swirl in: blues drift teal, pinks go coral, and "white" turns cream. This chart starts from a realistic American buttercream base, so the swatches are what you will actually see leaving the bowl, not what a whitened demo frosting pretends.',
    answerHex: '#c76a6a',
    answerLabel: 'four drops of red gel in buttercream',
    introHeading: 'How to read this chart',
    intro: [],
    listHeading: 'The chart: one cup of American buttercream, 1 to 8 drops',
    chart: {
      baseName: 'American buttercream',
      baseHex: '#fff2d8',
      baseBlurb:
        'The starting point: butter and powdered sugar whipped with vanilla. Not white: a buttery ivory that every color below has to fight through.',
      gels,
      drops: [1, 2, 4, 8],
      baseWeight: 16,
      dropStrength: 2,
    },
    chartIntro: [
      'The yellow shift is the whole story of buttercream color. Butter and vanilla tint the base ivory, so every mix below is really "gel color plus a little yellow". That is why the same drop count reads warmer here than it does in the royal icing chart: blue leans teal, purple leans mauve, and pure pastels are simply not on the menu from this base.',
      'If you need truer, cooler colors, whiten the base first: whip the butter five minutes longer until it pales, use clear vanilla instead of the brown kind, or build a whiter buttercream (Swiss meringue, or a blend with shortening). Every step toward white buys back accuracy in the chart.',
      'One practical difference from royal icing: fat carries color evenly and forgivingly, so buttercream is actually the easier medium to color deep. The same 1-2-4-8 drop scale applies, with one extra drop of patience where the chart runs slightly softer than you expected.',
    ],
    tips: [
      {
        title: 'Whip the butter before any color goes in',
        body: 'Five extra minutes of whipping pales the butter noticeably. Starting lighter means every swatch above lands closer to true.',
      },
      {
        title: 'Use clear vanilla',
        body: 'Regular vanilla extract is brown and it tints. Clear vanilla exists precisely for pale buttercreams; it is the cheapest whitening step there is.',
      },
      {
        title: 'Fix too-dark with plain buttercream',
        body: 'If a color runs past the chart, extend with uncolored buttercream rather than trying to lighten it back with white dye. Ratios recover, consistency survives.',
      },
      {
        title: 'Check colors in daylight',
        body: 'Kitchen spotlights flatter warm tones and lie about blues. A north window or overcast daylight is where the chart\'s hex codes actually match.',
      },
    ],
    faqs: [
      {
        q: 'Why does my buttercream color look different from the chart or photo?',
        a: 'Two usual suspects: the yellow base and the lighting. Butter\'s ivory shifts every gel warm, and indoor lights shift it again. Whip the butter paler, use clear vanilla, and compare in daylight before adjusting the drops.',
      },
      {
        q: 'How do I make white buttercream?',
        a: 'Whip the butter long and pale, switch to clear vanilla, and accept ivory, or build a whiter base: Swiss meringue buttercream or an American recipe with part shortening. True snow-white from pure butter does not exist.',
      },
      {
        q: 'How many drops of gel per cup of buttercream?',
        a: 'The same 1-2-4-8 scale as royal icing: one pastel, two medium, four deep, eight saturated. Fat hides color slightly, so where precision matters, budget one extra drop versus the royal icing chart.',
      },
      {
        q: 'Can I use the same gel colors in fondant?',
        a: 'Yes. Knead the gel into the fondant instead of stirring, and expect color to deepen faster than in buttercream, so start at the low end of the drop scale.',
      },
      {
        q: 'How do I mix custom shades like sage or dusty blue?',
        a: 'Start from the closest chart color and walk it over with a whisper of its neighbor or its complement: sage is green plus a touch of yellow and black, dusty blue is blue plus a pinch of orange. The color mixer does the same arithmetic live.',
      },
    ],
    mixerColors: ['#fff2d8', '#1554c0'],
    related: [
      { href: '/icing-color-chart/', label: 'Icing color chart (the whiter-base version)' },
      { href: '/how-to-make-black-frosting/', label: 'How to make black frosting' },
      { href: '/color-mixer/', label: 'Mix custom shades in the color mixer' },
      { href: '/color-converter/', label: 'Convert any HEX to RGB or HSL' },
    ],
  },

  {
    slug: 'what-colors-make-blue',
    kind: 'method',
    h1: 'What Colors Make Blue',
    metaTitle: 'What Colors Make Blue (The Honest Answer, With Proof) | TintBrew',
    metaDescription:
      'No mix makes true blue — it is a primary. See the computed swatches of every near-miss route, plus how to reach navy, sky and denim blue from a base blue.',
    lead:
      'Blue is one of the three paint primaries, which means no combination of other colors lands on it — every "recipe" you have seen produces a muted indigo or a gray. Below is the arithmetic to prove it, computed swatch by swatch, and the shade-and-tint routes that actually work when you need navy or sky blue.',
    answerHex: '#0000ff',
    answerLabel: 'true blue — a primary you start from, not a mix you reach',
    introHeading: 'Why nothing mixes into blue',
    intro: [
      'Pigments work by absorbing light. A primary blue reflects the band your eye reads as blue and absorbs most of the rest — there is no pair of pigments whose leftovers add up to that. Mixing purple and green, the most-recommended recipe, gives you a gray-violet mud, because between them they absorb almost everything and leave a dim, colorless remainder.',
      'Screens are the opposite case: they add light, and blue is a primary of light too. So whether you mix paint or mix light, blue is something you start with. What mixing CAN do is move an existing blue — darken it to navy, lift it to sky — and that is the practical half of this page.',
    ],
    listHeading: 'The near-misses, computed',
    methods: [
      {
        name: 'Purple + green (the popular recipe)',
        summary: 'The combo most sites recommend — computed honestly, it lands on gray-violet.',
        mix: [
          { label: 'purple', hex: '#800080', weight: 1 },
          { label: 'green', hex: '#008000', weight: 1 },
        ],
        note: 'Each pigment cancels what the other reflects. The swatch above is the real landing spot — a muted mauve-gray, nowhere near blue. This is the proof, not a recipe.',
      },
      {
        name: 'Purple + black (the closest miss)',
        summary: 'Darkening purple drifts into indigo — the nearest any mix gets to blue.',
        mix: [
          { label: 'purple', hex: '#800080', weight: 1 },
          { label: 'black', hex: '#000000', weight: 0.4 },
        ],
        note: 'This reads as a midnight blue-violet — respectable for deep shadow colors, but hold it next to true blue and the purple bias shows immediately.',
      },
      {
        name: 'Blue + black (the route that works: shade)',
        summary: 'Start from real blue and darken it — how navy is actually made.',
        mix: [
          { label: 'blue', hex: '#0000ff', weight: 1 },
          { label: 'black', hex: '#000000', weight: 0.4 },
        ],
        note: 'This is the honest answer for "what colors make navy": blue, plus black in small passes. The full ratio table lives on the blue and black page.',
      },
    ],
    chartIntro: [],
    tips: [
      {
        title: 'Buy the blue, mix the family',
        body: 'Any tube labeled ultramarine, cobalt or phthalo blue is a primary purchase. From that one tube you can reach navy (add black), sky (add white), teal (add green) and periwinkle (add violet) — the mixing happens after, not before.',
      },
      {
        title: 'Warm blue vs. cool blue',
        body: 'Ultramarine leans violet (warm), phthalo leans green (cool). Pick the base by which family you are heading toward — it saves you from fighting the bias later with complements.',
      },
      {
        title: 'The frosting case is different',
        body: 'Frosting starts from a white base, so "making blue" there means dosing blue gel into whiteness — a drop-count problem, not a mixing-theory problem. The buttercream chart handles it with exact drops.',
      },
    ],
    faqs: [
      {
        q: 'What two colors make blue?',
        a: 'None. Blue is a primary in both paint and light, so no pair of other colors mixes to it — the popular purple-and-green recipe computes to a gray-violet, as the swatches above show. Start from a blue pigment and adjust from there.',
      },
      {
        q: 'What colors make navy blue?',
        a: 'Blue plus a small amount of black. Add the black in tiny passes — a quarter as much by feel already reads navy, and a little more takes you to midnight. See the blue and black page for the full ratio walk.',
      },
      {
        q: 'What colors make light blue or sky blue?',
        a: 'Blue plus white. Small amounts of white lift blue to sky and powder tones quickly, so add white gradually. A whisper of green takes sky blue toward the turquoise family.',
      },
      {
        q: 'What colors make blue frosting?',
        a: 'Frosting is a dosing problem: start from white buttercream and add blue gel one drop at a time. Two drops read pastel, four to five read a medium blue — the buttercream color chart lists exact drop counts per shade.',
      },
    ],
    mixerColors: ['#800080', '#008000'],
    related: [
      { href: '/mix/blue-black/', label: 'Blue and black: the navy ratio table' },
      { href: '/mix/blue-white/', label: 'Blue and white make sky blue' },
      { href: '/mix/blue-green/', label: 'Blue and green make teal' },
      { href: '/color-guides/', label: 'All color guides' },
    ],
  },

  {
    slug: 'what-colors-make-red',
    kind: 'method',
    h1: 'What Colors Make Red',
    metaTitle: 'What Colors Make Red (Honest Answer + Nearest Blends) | TintBrew',
    metaDescription:
      'Red is a primary — no mix reaches it. The computed near-misses (coral, raspberry), plus the tint-and-shade routes that make pink, maroon and burgundy.',
    lead:
      'Red is a paint primary: like blue and yellow, it is a pigment you buy, not a blend you build. What mixing gets you is the family around red — coral, raspberry, maroon, rust. Here are those blends computed honestly, plus the routes that genuinely produce the reds people actually search for.',
    answerHex: '#ff0000',
    answerLabel: 'true red — the primary every other red is mixed from',
    introHeading: 'Why red cannot be mixed',
    intro: [
      'A primary red pigment reflects the long wavelengths your eye reads as red and absorbs the rest. No two pigments combine their leftovers into that band — which is exactly what makes it primary. Recipes that claim otherwise (magenta plus yellow) quietly assume you already own magenta, which is simply a different red-family primary.',
      'What mixing does beautifully is move red around its own family: white pushes it to pink, black to maroon, a complement to rust and terracotta. Those routes are real, computed below, and they cover almost every "what colors make X red" question.',
    ],
    listHeading: 'The nearest blends, computed',
    methods: [
      {
        name: 'Pink + orange (the coral route)',
        summary: 'The closest a mix gets to red — a warm coral that flirts with it.',
        mix: [
          { label: 'pink', hex: '#ff69b4', weight: 1 },
          { label: 'orange', hex: '#ffa500', weight: 1 },
        ],
        note: 'Squeeze the orange down and push the pink up and the blend walks toward red — but it stalls at coral-berry territory. Useful color, honest label: it is not red.',
      },
      {
        name: 'Pink + brown (the raspberry route)',
        summary: 'Deepening pink with brown lands on raspberry — the darker near-miss.',
        mix: [
          { label: 'pink', hex: '#ff69b4', weight: 3 },
          { label: 'brown', hex: '#a52a2a', weight: 1 },
        ],
        note: 'Brown is dark orange, so this is pink darkened by its own family. The result reads raspberry-berry — the natural landing zone for "red-ish without a red tube".',
      },
      {
        name: 'Red + white (the route that works: tint)',
        summary: 'From real red, white makes the pink family with full control.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'white', hex: '#ffffff', weight: 1 },
        ],
        note: 'The honest answer for "what colors make pink": red, lightened. Half and half already reads bubblegum; smaller amounts of white give salmon and rose. Full ratio table on the red and white page.',
      },
    ],
    chartIntro: [],
    tips: [
      {
        title: 'One red tube, whole family',
        body: 'A cadmium or naphthol red plus white (pink), black (maroon), orange (vermilion) and its complement green (rust, terracotta) covers the red family. The primary is the purchase; everything after is mixing.',
      },
      {
        title: 'Bright red frosting is a gel problem',
        body: 'Deep red icing famously takes a full tube of red gel and overnight rest — the color blooms as it sits. The icing chart gives drop counts; the patience is on you.',
      },
      {
        title: 'Maroon and burgundy are one step away',
        body: 'Maroon is red darkened with brown or black; burgundy is red pulled toward purple. Both routes are computed on the maroon page — no second primary required.',
      },
    ],
    faqs: [
      {
        q: 'What two colors make red?',
        a: 'None — red is a primary pigment. Blends like pink plus orange stop at coral, and pink plus brown at raspberry; both swatches above are the computed proof. Start from a red pigment and mix outward.',
      },
      {
        q: 'What colors make dark red or maroon?',
        a: 'Red plus a little brown, or red plus a touch of black. Equal red and brown lands at brick; adding a whisper of black deepens it to maroon. The maroon page walks all three routes.',
      },
      {
        q: 'What colors make pink?',
        a: 'Red plus white. Equal parts give bubblegum pink; less white gives salmon and rose. Because pink is a tint of red, no other route is needed — see the red and white page for ratios.',
      },
      {
        q: 'What colors make red frosting?',
        a: 'White frosting plus red gel, dosed high: pastel red needs two or three drops, true red can take eight or more, and deep reds should rest overnight to bloom. The icing color chart has the drop table.',
      },
    ],
    mixerColors: ['#ff69b4', '#ffa500'],
    related: [
      { href: '/what-colors-make-maroon/', label: 'What colors make maroon' },
      { href: '/mix/red-white/', label: 'Red and white make pink' },
      { href: '/mix/red-green/', label: 'Red and green make brown — the complement lesson' },
      { href: '/color-guides/', label: 'All color guides' },
    ],
  },

  {
    slug: 'what-colors-make-black',
    kind: 'method',
    h1: 'What Colors Make Black',
    metaTitle: 'What Colors Make Black (Every Route, Computed) | TintBrew',
    metaDescription:
      'Mix all three primaries for charcoal, or a complementary pair for warm and cool near-blacks. Every route computed — plus when to just buy carbon black.',
    lead:
      'True black is the one color pigment mixing never quite reaches — stack pigments and you get rich charcoal, not void. But those near-blacks are genuinely useful, and each route has a temperature: the all-primaries blend is the textbook answer, complementary pairs give you warm and cool versions. All computed below.',
    answerHex: '#70697c',
    answerLabel: 'the darkest a full mix reaches — a soft charcoal',
    introHeading: 'Why mixed black is always a near-black',
    intro: [
      'Pigments absorb light, and a perfect black would absorb everything. Real pigments each leave some wavelengths unabsorbed, so every blend leaks a little color — the deepest mix below still leans slightly violet. That is not failure; artists pay for mixes like this under names like neutral tint.',
      'The two mechanisms worth knowing: combining all three primaries stacks three absorptions, and combining complementary pairs (red-green, blue-orange) cancels hue the same way. The commercial answer — carbon black, mars black pigment — is soot ground in oil, which is why it is truly neutral and truly cheap.',
    ],
    listHeading: 'The routes, computed',
    methods: [
      {
        name: 'All three primaries',
        summary: 'Red + yellow + blue: the school answer, landing on a warm violet-gray.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'yellow', hex: '#ffff00', weight: 1 },
          { label: 'blue', hex: '#0000ff', weight: 1 },
        ],
        note: 'It works, and it is the least controllable route — small ratio changes swing the temperature. The computed landing spot is a dusty violet-taupe, a shade warmer than most people expect.',
      },
      {
        name: 'Red + green (warm near-black)',
        summary: 'The complementary pair cancels hue and leaves a warm, olive-leaning dark.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'green', hex: '#008000', weight: 1 },
        ],
        note: 'Because green already contains yellow, this route lands warm — an umber-chocolate territory rather than gray. Good when your "black" should sit next to earth tones.',
      },
      {
        name: 'Red + green + blue (the deepest blend)',
        summary: 'Swap the yellow for blue: the darkest, most neutral mix on the page.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'green', hex: '#008000', weight: 1 },
          { label: 'blue', hex: '#0000ff', weight: 1 },
        ],
        note: 'Blue does the absorbing that yellow was leaking. This is the practical "mixed black" — a soft charcoal with a cool bias, and the closest any blend here comes to neutral.',
      },
    ],
    chartIntro: [],
    tips: [
      {
        title: 'When to mix, when to buy',
        body: 'Mix your black when it needs to harmonize with a painting — the slight temperature bias glues shadows into the scene. Buy carbon black when you need coverage and neutrality: it is one of the cheapest pigments on the shelf.',
      },
      {
        title: 'Gray is this page plus white',
        body: 'Every near-black above plus white gives a gray with the same temperature — warm gray from the red-green route, cool gray from the three-color blend. The black and white page walks those ratios.',
      },
      {
        title: 'Black frosting has its own physics',
        body: 'Buttercream starts white, so black frosting means dosing gel into whiteness — start from chocolate, not white, or the drop count gets brutal. The black frosting page has the full method.',
      },
    ],
    faqs: [
      {
        q: 'What colors make black?',
        a: 'Mix all three primaries (red, yellow, blue) for a warm charcoal, or a complementary pair like red and green for a darker, warmer version. The deepest blend here is red, green and blue together. True neutral black comes from carbon pigment, not mixing.',
      },
      {
        q: 'What colors make black paint?',
        a: 'For acrylic or oil: the red-green-blue blend gives a controllable soft black; commercial tubes use carbon black or mars black pigment for a neutral, opaque result. Mixed blacks shine as shadow colors because their slight color bias unifies a painting.',
      },
      {
        q: 'What colors make gray?',
        a: 'Take any near-black route above and add white — equal parts black and white give a medium gray. Warm and cool grays come from the warm (red-green) and cool (three-color) black routes respectively.',
      },
      {
        q: 'What colors make black frosting?',
        a: 'Start from chocolate buttercream, not white — a dark base means far less black gel. Add black gel, then let it rest: black frosting deepens over an hour. The full method is on the black frosting page.',
      },
    ],
    mixerColors: ['#ff0000', '#008000', '#0000ff'],
    related: [
      { href: '/mix/black-white/', label: 'Black and white make gray' },
      { href: '/how-to-make-black-frosting/', label: 'How to make black frosting' },
      { href: '/mix/red-green/', label: 'Red and green: the complementary cancel' },
      { href: '/color-guides/', label: 'All color guides' },
    ],
  },

  {
    slug: 'what-colors-make-maroon',
    kind: 'method',
    h1: 'What Colors Make Maroon',
    metaTitle: 'What Colors Make Maroon (3 Routes, Computed) | TintBrew',
    metaDescription:
      'Red plus brown is the direct route to maroon; red plus purple bends it toward burgundy. Every blend computed in a perceptual space, with exact HEX results.',
    lead:
      'Maroon is red that has been darkened and slightly muddied — officially a brown-red, which is why the simplest recipe is red plus brown. There are three useful routes depending on which flavor of maroon you want: brick, true maroon, or the purple-leaning burgundy side. All three computed below.',
    answerHex: '#ad1a19',
    answerLabel: 'deep maroon',
    introHeading: 'What maroon actually is',
    intro: [
      'On paper maroon is dark brownish red — think brick, oxblood, the color of a university hoodie. It sits between red and brown on the shade axis, which is why darkening red with its own family (brown, or a touch of black) is the cleanest route. Pull it toward purple instead and you slide into burgundy, maroon\'s cooler cousin.',
      'The three routes below differ in exactly that bias. Pick by destination: brick and rust for the brown side, the deep route for hoodie maroon, the purple route for wine tones.',
    ],
    listHeading: 'Three routes, computed',
    methods: [
      {
        name: 'Red + brown (the direct route)',
        summary: 'Equal parts land on brick — the bright, rusty end of maroon.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'brown', hex: '#a52a2a', weight: 1 },
        ],
        note: 'Because brown is dark orange, this is red warmed and deepened in one move. Equal parts give brick; this is the starting ratio for every other maroon on this page.',
      },
      {
        name: 'Red + brown + black (the deep route)',
        summary: 'A whisper of black takes brick down to true hoodie maroon.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'brown', hex: '#a52a2a', weight: 1 },
          { label: 'black', hex: '#000000', weight: 0.3 },
        ],
        note: 'The computed landing spot is the maroon people mean when they say maroon — deep, slightly brown, unmistakably red family. Add the black last, in tiny passes.',
      },
      {
        name: 'Red + purple (the burgundy route)',
        summary: 'The same darkness reached from the purple side — wine territory.',
        mix: [
          { label: 'red', hex: '#ff0000', weight: 1 },
          { label: 'purple', hex: '#800080', weight: 1 },
        ],
        note: 'This is the one to use when the brief says burgundy or oxblood rather than maroon: equal parts read as a rich berry-maroon with a cool cast. Technically a different color; practically the same search.',
      },
    ],
    chartIntro: [],
    tips: [
      {
        title: 'Maroon vs. burgundy in one line',
        body: 'Maroon is red darkened by brown (warm); burgundy is red darkened by purple (cool). Same depth, different bias — pick your route above accordingly.',
      },
      {
        title: 'Fixing a maroon that went too dark',
        body: 'Walk it back with red, never with white — white pinks it out and kills the identity. If it went muddy instead, a small amount of red-orange revives the warmth.',
      },
      {
        title: 'Maroon frosting starts from chocolate',
        body: 'For icing and buttercream, start from a chocolate base and dose red gel — building maroon from white frosting costs drops and patience. The buttercream chart covers the base.',
      },
    ],
    faqs: [
      {
        q: 'What colors make maroon?',
        a: 'Red and brown in equal parts give brick maroon; add a small amount of black to deepen it to classic maroon. For the purple-leaning burgundy version, mix red with purple instead. All three computed above.',
      },
      {
        q: 'What is the difference between maroon and burgundy?',
        a: 'Both are dark reds. Maroon leans brown (warm, brick-like) and burgundy leans purple (cool, wine-like) — so maroon comes from red plus brown, burgundy from red plus purple. The routes above show both landings.',
      },
      {
        q: 'What colors make dark red?',
        a: 'Dark red is the same family one step lighter than maroon: red plus a touch of brown or black, kept red-dominant. Roughly two parts red to one part brown reads as dark red before it becomes maroon.',
      },
      {
        q: 'What colors make maroon paint?',
        a: 'In acrylic or oil, the red-brown route is most controllable: cadmium red plus burnt umber, deepened with a touch of black if needed. The red-purple route maps to quinacridone red plus dioxazine violet for the burgundy side.',
      },
    ],
    mixerColors: ['#ff0000', '#a52a2a'],
    related: [
      { href: '/what-colors-make-red/', label: 'What colors make red (the primary truth)' },
      { href: '/mix/red-purple/', label: 'Red and purple: the burgundy blend' },
      { href: '/how-to-make-brown-icing/', label: 'How to make brown icing' },
      { href: '/color-guides/', label: 'All color guides' },
    ],
  },

  {
    slug: 'what-colors-make-peach',
    kind: 'method',
    h1: 'What Colors Make Peach',
    metaTitle: 'What Colors Make Peach (3 Easy Blends, Computed) | TintBrew',
    metaDescription:
      'Orange plus white is the direct peach; pink plus yellow gives a rosier peach. Three blends computed in a perceptual space with exact HEX results for each.',
    lead:
      'Peach is orange that has been softened toward skin tone — which makes it one of the easiest custom colors to mix, because the whole recipe is orange plus white, tuned pink or yellow as you like. Three routes below, from the classic to the rosy version, every swatch computed.',
    answerHex: '#ffdab9',
    answerLabel: 'soft peach',
    introHeading: 'Why peach is an easy mix',
    intro: [
      'Peach sits between orange and pink at high lightness — formally it is a light, slightly pink-shifted orange. Because nothing needs canceling (no complements fighting), the routes are simple tints: lighten orange with white, then bias the result toward pink or yellow to taste. No route here can go badly muddy.',
      'That lightness is also the thing to protect: peach dies when it gets dark. If a blend slips toward salmon or apricot, walk it back with white, not with more orange.',
    ],
    listHeading: 'Three routes, computed',
    methods: [
      {
        name: 'Orange + white (the direct route)',
        summary: 'Equal parts land on the classic peach — light, warm, skin-adjacent.',
        mix: [
          { label: 'orange', hex: '#ffa500', weight: 1 },
          { label: 'white', hex: '#ffffff', weight: 1 },
        ],
        note: 'This is the textbook peach and the ratio to remember. More white pushes it toward cream; more orange pulls it toward apricot — both are fine neighbors, not mistakes.',
      },
      {
        name: 'Pink + yellow (the rosy route)',
        summary: 'Mixing the parents of orange gives a peach with a pink cast.',
        mix: [
          { label: 'pink', hex: '#ff69b4', weight: 1 },
          { label: 'yellow', hex: '#ffff00', weight: 1 },
        ],
        note: 'Pink is itself light red, so this route builds peach from its components and lands rosier than the direct one — the peach of blush palettes rather than fruit palettes.',
      },
      {
        name: 'Orange + white + a touch of pink (the skin-tone route)',
        summary: 'The direct peach nudged pink — the blend portrait painters recognize.',
        mix: [
          { label: 'orange', hex: '#ffa500', weight: 1 },
          { label: 'white', hex: '#ffffff', weight: 1 },
          { label: 'pink', hex: '#ff69b4', weight: 0.2 },
        ],
        note: 'A whisper of pink is what makes peach read as skin tone rather than fruit. Keep the pink small — at this lightness a little goes far.',
      },
    ],
    chartIntro: [],
    tips: [
      {
        title: 'Peach vs. apricot vs. salmon',
        body: 'Same family, different bias: peach is balanced, apricot is the yellow-orange side, salmon is the darker pink side. Your dial is the pink-yellow balance and the amount of white — nothing else.',
      },
      {
        title: 'Peach frosting is a dosing problem',
        body: 'White buttercream plus a little orange gel, touched with pink, gives peach icing — two drops orange and one drop pink per cup is the working recipe. The buttercream chart has the base drop table.',
      },
      {
        title: 'Keep it light or lose it',
        body: 'Peach collapses into salmon and terracotta the moment it darkens. When adjusting, reach for white first; when it needs warmth, add orange in amounts smaller than you think.',
      },
    ],
    faqs: [
      {
        q: 'What colors make peach?',
        a: 'Orange and white in equal parts — that is the whole classic recipe. For a rosier peach, mix pink and yellow instead, or add a touch of pink to the orange-white blend for a skin-tone version.',
      },
      {
        q: 'What colors make peach paint?',
        a: 'White paint with a small amount of orange, tuned with a touch of pink or yellow. Because peach is a light tint, start from mostly white and add orange gradually — it is much easier to darken than to walk back.',
      },
      {
        q: 'What is the difference between peach and orange?',
        a: 'Peach is orange lightened and slightly pinked — same hue family, much lighter and softer. Orange plus white closes most of the gap; the remaining difference is that small pink bias.',
      },
      {
        q: 'What colors make pink?',
        a: 'Red and white — pink is a tint of red. Peach then follows with a little orange or yellow added to that pink, which is why pink plus yellow lands on peach above.',
      },
    ],
    mixerColors: ['#ffa500', '#ffffff'],
    related: [
      { href: '/mix/orange-white/', label: 'Orange and white: the base blend' },
      { href: '/mix/pink-yellow/', label: 'Pink and yellow: the rosy route' },
      { href: '/mix/red-white/', label: 'Red and white make pink' },
      { href: '/color-guides/', label: 'All color guides' },
    ],
  },

  {
    slug: 'what-colors-make-turquoise',
    kind: 'method',
    h1: 'What Colors Make Turquoise',
    metaTitle: 'What Colors Make Turquoise (3 Blends, Computed) | TintBrew',
    metaDescription:
      'Blue and green make teal; lean green and add white for true turquoise. Three computed blends from teal to bright Caribbean turquoise, with exact HEX codes.',
    lead:
      'Turquoise is blue and green in agreement — but the default equal-parts blend actually lands on teal, the darker cousin. For the bright turquoise people picture (pool water, Caribbean shallows) the recipe leans green and lifts with white. Three routes below, computed swatch by swatch.',
    answerHex: '#40e0d0',
    answerLabel: 'bright turquoise',
    introHeading: 'Turquoise, teal and the green lean',
    intro: [
      'Turquoise sits between blue and green but closer to green, at high brightness — think gemstone and tropical water. Teal is the same idea darker and bluer, which is why the naive blue-green 50/50 gives you teal, not turquoise. The fix is two dials: push the green, then add white for the glow.',
      'None of this requires colors you do not have. Blue, green and white — the trio in the mixer below — cover the whole journey from deep teal to bright turquoise.',
    ],
    listHeading: 'Three routes, computed',
    methods: [
      {
        name: 'Blue + green (the base blend — lands on teal)',
        summary: 'Equal parts give the deep blue-green that is properly called teal.',
        mix: [
          { label: 'blue', hex: '#0000ff', weight: 1 },
          { label: 'green', hex: '#008000', weight: 1 },
        ],
        note: 'Start here to see the problem: the computed landing spot is a deep marine blue-green — handsome, but it is teal. Every turquoise recipe on this page is this blend plus two corrections.',
      },
      {
        name: 'Green-heavy blend (the true turquoise route)',
        summary: 'Two parts green to one part blue rotates the blend onto the turquoise hue.',
        mix: [
          { label: 'green', hex: '#008000', weight: 2 },
          { label: 'blue', hex: '#0000ff', weight: 1 },
        ],
        note: 'This is the hue of turquoise — the green lean does the work. The computed result is a deep turquoise, the gemstone register of the color.',
      },
      {
        name: 'Green + blue + white (the bright turquoise route)',
        summary: 'Lift the green-heavy blend with white for pool-water turquoise.',
        mix: [
          { label: 'green', hex: '#008000', weight: 2 },
          { label: 'blue', hex: '#0000ff', weight: 1 },
          { label: 'white', hex: '#ffffff', weight: 1 },
        ],
        note: 'White adds the brightness that separates turquoise from teal. More white walks it toward aqua and pastel pool tones; less keeps it saturated and gemmy.',
      },
    ],
    chartIntro: [],
    tips: [
      {
        title: 'Turquoise vs. teal in one line',
        body: 'Teal is the dark, blue-leaning sibling; turquoise is brighter and green-leaning. Same two parent colors — the difference is the green ratio and the white lift.',
      },
      {
        title: 'If it goes back toward teal',
        body: 'Add green, not yellow — yellow shifts the blend toward spring green and lime. If it goes muddy instead, the blue is dominating: pull some out rather than piling green on top.',
      },
      {
        title: 'Turquoise frosting is forgiving',
        body: 'Sky blue gel plus a touch of lemon yellow in white buttercream gives turquoise icing, and the yellow base of buttercream does half the leaning for you. The buttercream chart has the drop counts.',
      },
    ],
    faqs: [
      {
        q: 'What colors make turquoise?',
        a: 'Blue and green — but lean green, two parts to one, or the blend lands on teal instead. For bright turquoise, add white to lift the green-heavy blend toward pool-water tones.',
      },
      {
        q: 'What is the difference between turquoise and teal?',
        a: 'Teal is darker and leans blue; turquoise is brighter and leans green. Both come from blue and green — the equal-parts blend gives teal, the green-heavy blend gives turquoise.',
      },
      {
        q: 'What colors make teal?',
        a: 'Blue and green in equal parts — the first computed blend on this page. The full ratio walk from teal to turquoise lives on the blue and green page.',
      },
      {
        q: 'What colors make turquoise paint?',
        a: 'Phthalo or sky blue with a green-leaning phthalo green, roughly one part blue to two parts green, then white to brighten. The green pigment matters: a blue-leaning green like phthalo keeps the mix clean.',
      },
    ],
    mixerColors: ['#0000ff', '#008000', '#ffffff'],
    related: [
      { href: '/mix/blue-green/', label: 'Blue and green make teal: the full ratio walk' },
      { href: '/what-colors-make-blue/', label: 'What colors make blue' },
      { href: '/mix/green-white/', label: 'Green and white make mint' },
      { href: '/color-guides/', label: 'All color guides' },
    ],
  },
];
