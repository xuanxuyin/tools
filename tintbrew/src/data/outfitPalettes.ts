/**
 * V2.2 outfit-pairing family (what colors go with X). Same contract as
 * data/scenarios.ts: hand-written pairing knowledge lives here (the
 * anti-thin-content layer); every "why it works" line, swatch sublabel and
 * gradient ladder is computed by the engine at build time (lib/outfitContent).
 *
 * Data conventions the template and tests rely on:
 *  - items[0] of every combo is the anchor piece from the page's color family
 *  - every combo covers top + pants + shoes (the figure draws all of them);
 *    outer and accent are optional layers
 *  - decor palettes carry 3-4 colors, avoid entries explain themselves
 *
 * Add a page = add an entry + a thin wrapper in src/pages/.
 */

export type OutfitRole = 'top' | 'pants' | 'outer' | 'shoes' | 'accent';

export interface OutfitItem {
  role: OutfitRole;
  /** Short human label, e.g. 'tan chinos'. */
  label: string;
  hex: string;
}

export interface OutfitCombo {
  name: string;
  scene: string;
  note: string;
  items: OutfitItem[];
}

export interface DecorPalette {
  name: string;
  note: string;
  colors: { label: string; hex: string }[];
}

export interface AvoidColor {
  name: string;
  hex: string;
  why: string;
}

export interface OutfitDef {
  /** Flat URL slug, e.g. 'what-colors-go-with-brown' → /what-colors-go-with-brown/ */
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  /** The anchor swatch shown in the hero. */
  baseName: string;
  baseHex: string;
  introHeading: string;
  intro: string[];
  combosHeading: string;
  combos: OutfitCombo[];
  decor: DecorPalette[];
  avoid: AvoidColor[];
  tips: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  /** Mixer island preload. */
  mixerColors: string[];
  related: { href: string; label: string }[];
}

export const outfitPages: OutfitDef[] = [
  {
    slug: 'what-colors-go-with-brown',
    h1: 'What Colors Go With Brown',
    metaTitle: 'What Colors Go With Brown? 10 Pairings + HEX | TintBrew',
    metaDescription:
      'What colors go with brown? Ten outfit pairings and four room palettes, each with exact HEX codes and an Oklab read on why the pairing works.',
    lead:
      'Brown is the friendliest "hard" color in a wardrobe: it is a dark neutral with a warm bias, which means almost every classic neutral answers to it — cream, white, navy, olive, black leather — and the failures are rare and specific. The ten outfits below anchor on a different brown each time (tan, chocolate, camel, espresso), and every swatch carries its exact HEX plus the computed lightness gap that makes the pairing read right.',
    baseName: 'chestnut brown',
    baseHex: '#6b4423',
    introHeading: 'Why brown pairs with almost everything',
    intro: [
      'Brown is dark orange. That single fact explains every pairing below: colors near orange on the wheel (tan, camel, rust, gold) blend with it tone-on-tone, while colors far from orange (navy, light blue, forest green) provide the contrast that keeps brown from going monotone. Because brown sits at low brightness, it also behaves like a neutral — the same way black and navy do — so pale neutrals such as cream and off-white can sit next to it without competing.',
      'The practical rule most stylists converge on: anchor the outfit with one brown piece, pick partners from either the same warm family or a quiet contrast color, and keep at least one sizable lightness gap between the pieces. That gap — measurable, not vibes — is what the Oklab read under each combo reports: a 0.3+ lightness difference reads crisp, near-equal lightness reads relaxed, and it is a dial you can turn on purpose.',
    ],
    combosHeading: 'Ten outfits, anchored on brown',
    combos: [
      {
        name: 'Tan chinos, white tee, brown loafers',
        scene: 'The everyday default',
        note: 'The uniform of brown-friendly dressing: light tan pants, a plain white top, dark brown leather underneath. Works nine months a year without thinking about it.',
        items: [
          { role: 'pants', label: 'tan chinos', hex: '#c8a17a' },
          { role: 'top', label: 'off-white tee', hex: '#f5f2ec' },
          { role: 'shoes', label: 'brown loafers', hex: '#5b3a2e' },
        ],
      },
      {
        name: 'Chocolate knit, cream trousers, espresso boots',
        scene: 'Fall office',
        note: 'Deep chocolate on top, cream on the bottom, espresso boots to ground it — the sweater-weather formula that never reads wrong in an office.',
        items: [
          { role: 'top', label: 'chocolate knit', hex: '#4e3020' },
          { role: 'pants', label: 'cream trousers', hex: '#ece3d2' },
          { role: 'shoes', label: 'espresso boots', hex: '#3a281c' },
        ],
      },
      {
        name: 'Brown leather jacket, black tee, gray jeans',
        scene: 'Weekend',
        note: 'Brown and black stopped being a sin — a leather jacket is the easiest place to prove it. Keep the rest grayscale so the jacket does the talking.',
        items: [
          { role: 'outer', label: 'brown leather jacket', hex: '#6f4a2f' },
          { role: 'top', label: 'black tee', hex: '#1f1f22' },
          { role: 'pants', label: 'gray jeans', hex: '#6a6d73' },
          { role: 'shoes', label: 'black boots', hex: '#26262a' },
        ],
      },
      {
        name: 'Camel coat, navy sweater, dark denim',
        scene: 'Winter commute',
        note: 'Camel is brown’s dressiest register. Over navy and denim it reads expensive without a logo in sight; brown boots close the loop at the bottom.',
        items: [
          { role: 'outer', label: 'camel coat', hex: '#b98f56' },
          { role: 'top', label: 'navy sweater', hex: '#2c3a52' },
          { role: 'pants', label: 'dark denim', hex: '#36415c' },
          { role: 'shoes', label: 'brown chelsea boots', hex: '#4a3226' },
        ],
      },
      {
        name: 'Brown corduroys, olive shirt, white sneakers',
        scene: 'Campus',
        note: 'Brown corduroy and olive are neighbors on the wheel, which is exactly why they relax together. White sneakers keep the low-contrast pair from going muddy.',
        items: [
          { role: 'pants', label: 'brown corduroys', hex: '#8a5a33' },
          { role: 'top', label: 'olive button-down', hex: '#5d6b3f' },
          { role: 'shoes', label: 'white sneakers', hex: '#e9e6df' },
        ],
      },
      {
        name: 'Espresso trousers, blush top, tan heels',
        scene: 'Date night',
        note: 'Brown’s surprising best friend is dusty pink — the warmth matches, the lightness gap does the work. Tan heels extend the leg line instead of interrupting it.',
        items: [
          { role: 'pants', label: 'espresso trousers', hex: '#4a3226' },
          { role: 'top', label: 'blush blouse', hex: '#e6c3ba' },
          { role: 'shoes', label: 'tan heels', hex: '#b98f56' },
        ],
      },
      {
        name: 'Brown maxi skirt, rust sweater, gold jewelry',
        scene: 'Autumn',
        note: 'Tone-on-tone brown dressing with one degree of hue shift: rust is brown’s hotter cousin. Gold hardware belongs here, not silver.',
        items: [
          { role: 'pants', label: 'brown maxi skirt', hex: '#7a4f30' },
          { role: 'top', label: 'rust sweater', hex: '#b05a2f' },
          { role: 'shoes', label: 'brown ankle boots', hex: '#4f3626' },
          { role: 'accent', label: 'gold jewelry', hex: '#c9a227' },
        ],
      },
      {
        name: 'Brown blazer, light blue oxford, charcoal trousers',
        scene: 'Business casual',
        note: 'Light blue and brown is the underrated power pairing — watch any well-dressed newscaster. The chocolate blazer reads authoritative, not casual.',
        items: [
          { role: 'outer', label: 'brown blazer', hex: '#6e4a35' },
          { role: 'top', label: 'light blue oxford', hex: '#a9c4de' },
          { role: 'pants', label: 'charcoal trousers', hex: '#3d4046' },
          { role: 'shoes', label: 'dark brown derbies', hex: '#2f2a26' },
        ],
      },
      {
        name: 'Taupe pants, burgundy top, ankle boots',
        scene: 'Color-curious',
        note: 'Taupe is brown cooled toward gray, and burgundy is the red that shares its restraint. For anyone bored of navy-on-taupe, this is the one-step upgrade.',
        items: [
          { role: 'pants', label: 'taupe pants', hex: '#9a8874' },
          { role: 'top', label: 'burgundy top', hex: '#6d2a35' },
          { role: 'shoes', label: 'brown ankle boots', hex: '#54382a' },
        ],
      },
      {
        name: 'Brown overalls, breton stripes, white shoes',
        scene: 'Weekend errands',
        note: 'The French-market combo: brown denim overalls over a navy-and-white striped top. Hard to wear badly, easy to wear daily.',
        items: [
          { role: 'pants', label: 'brown overalls', hex: '#77502f' },
          { role: 'top', label: 'navy breton top', hex: '#22304a' },
          { role: 'shoes', label: 'white shoes', hex: '#eceae4' },
        ],
      },
    ],
    decor: [
      {
        name: 'Leather, cream, olive',
        note: 'The living-room default: a leather or leather-brown sofa, cream walls, olive cushions, warm wood underneath.',
        colors: [
          { label: 'leather sofa', hex: '#6f4a2f' },
          { label: 'cream wall', hex: '#efe8da' },
          { label: 'olive cushion', hex: '#6b7250' },
          { label: 'warm wood', hex: '#c19a6b' },
        ],
      },
      {
        name: 'Walnut and white',
        note: 'The kitchen pairing: walnut cabinets or butcher block against true white walls and a near-black counter.',
        colors: [
          { label: 'walnut', hex: '#59402c' },
          { label: 'white wall', hex: '#f4f1ea' },
          { label: 'black counter', hex: '#2f2a26' },
        ],
      },
      {
        name: 'Espresso and brass',
        note: 'The bedroom register: espresso wood, brass lamps, washed linen. Dark, warm, quiet.',
        colors: [
          { label: 'espresso wood', hex: '#3a2a1e' },
          { label: 'brass', hex: '#b08d57' },
          { label: 'linen', hex: '#e8ddca' },
        ],
      },
      {
        name: 'Tan and sage',
        note: 'The entryway version: tan baskets and jute, sage paint, white trim. Brown’s two calmest partners in one spot.',
        colors: [
          { label: 'tan basket', hex: '#c8a17a' },
          { label: 'sage paint', hex: '#9caf88' },
          { label: 'white trim', hex: '#f0ece2' },
        ],
      },
    ],
    avoid: [
      {
        name: 'Bright orange',
        hex: '#f0741f',
        why: 'One hue step too close to brown: it reads as a failed shade match rather than a deliberate pairing. Rust yes, traffic-cone orange no.',
      },
      {
        name: 'Neon lime',
        hex: '#b9e33c',
        why: 'Full-saturation green fights brown’s warmth head-on. Olive and sage do the same job in agreement instead of in argument.',
      },
      {
        name: 'Icy pink',
        hex: '#f7c9d4',
        why: 'The one pastel that mocks brown’s yellow undertone instead of flattering it. Dusty blush (see combo six) is the version that works.',
      },
    ],
    tips: [
      {
        title: 'Keep one lightness gap per outfit',
        body: 'Brown outfits fail by going uniformly mid-dark, not by picking a wrong hue. Make sure at least one piece sits well above or below the rest — the Oklab read under each combo tells you which piece that is.',
      },
      {
        title: 'Match your leathers',
        body: 'Shoes, belt, watch strap: keep them in the same brown family, not necessarily the same shade. Cognac with cognac-leaning tan, espresso with espresso.',
      },
      {
        title: 'Warm grays over cool grays',
        body: 'Gray and brown work when the gray leans warm (greige, taupe). A cold blue-gray next to brown makes both look like mistakes.',
      },
      {
        title: 'Let texture carry tone-on-tone',
        body: 'The safest bold move with brown is all-brown dressing in mixed textures — suede, corduroy, leather, knit. The material differences supply the contrast the hues refuse to.',
      },
    ],
    faqs: [
      {
        q: 'What colors go with brown clothes?',
        a: 'The reliable partners are cream and off-white, navy, light blue, olive, forest green, black leather, dusty pink, and other browns (tan, camel, espresso). Two rules cover almost everything: pick partners from the warm family for a relaxed read, or from navy/green for contrast — and keep one clear lightness gap between pieces.',
      },
      {
        q: 'Does black go with brown?',
        a: 'Yes — the old ban is gone. The version that works is textured brown (leather, suede) with black basics, so the materials separate the two darks. The version that still fails is flat black fabric next to flat brown fabric at nearly the same lightness with no contrast piece anywhere.',
      },
      {
        q: 'Does gray go with brown?',
        a: 'Warm grays do: greige, taupe, stone. Cool blue-grays clash with brown’s yellow undertone and make both colors look dirty. If your gray reads cold, swap it for cream or olive.',
      },
      {
        q: 'What color shoes go with brown pants?',
        a: 'Darker brown shoes — the classic rule is that leather below the hem should be a shade or two deeper than the pants. Tan chinos take chestnut or espresso; chocolate trousers take near-black brown. Black shoes work when something black elsewhere backs them up.',
      },
      {
        q: 'Is brown a neutral color?',
        a: 'In wardrobe terms, yes: brown is dark orange at low brightness, and like navy or black it recedes enough to anchor an outfit. That is why pale colors and muted colors pair with it so freely — you get the contrast without the competition.',
      },
    ],
    mixerColors: ['#6b4423', '#ece3d2'],
    related: [
      { href: '/what-colors-make-brown/', label: 'What colors make brown (why it is dark orange)' },
      { href: '/what-colors-go-with-burgundy/', label: 'What colors go with burgundy' },
      { href: '/mix/brown-white/', label: 'Brown and white: the tan ladder, every ratio' },
      { href: '/color-guides/', label: 'All color guides' },
    ],
  },

  {
    slug: 'what-colors-go-with-green',
    h1: 'What Colors Go With Green',
    metaTitle: 'What Colors Go With Green? 10 Pairings + HEX | TintBrew',
    metaDescription:
      'What colors go with green? Ten outfit pairings and four room palettes across olive, sage, forest and emerald, each with exact HEX and an Oklab read.',
    lead:
      'Green is four wardrobes in one — olive, sage, forest, emerald — and each register has different friends. The outfits below span all four, anchored each time on a green piece, with exact HEX codes and the computed lightness gap that tells you why the pairing reads right instead of just asserting it.',
    baseName: 'forest green',
    baseHex: '#386641',
    introHeading: 'Why green is four different pairing problems',
    intro: [
      'Green sits in the middle of the spectrum, which is wardrobe-speak for: everything is either a neighbor or a contrast. Blues and teals are neighbors — they share green’s cool side and blend easily. Cream, tan and camel are the neutral crowd — they let green be the only voice. Burgundy and mustard are the classic dark-warm contrasts, and they work precisely because they sit far from green on the wheel while matching its muted, natural register.',
      'The register matters more than the hue. Olive wants tan, cream and burgundy; sage wants cream, gray and camel; forest wants camel and dark denim; emerald wants black and gold. Treat each combo below as a register lesson, not just a color pairing — and use the Oklab read to check that at least one piece creates a real lightness gap.',
    ],
    combosHeading: 'Ten outfits, anchored on green',
    combos: [
      {
        name: 'Olive pants, white tee, tan shoes',
        scene: 'The everyday default',
        note: 'Olive is the green civilians actually wear. With white and tan it becomes the default casual uniform — military color, civilian manners.',
        items: [
          { role: 'pants', label: 'olive pants', hex: '#6b7245' },
          { role: 'top', label: 'white tee', hex: '#f4f2ec' },
          { role: 'shoes', label: 'tan shoes', hex: '#b98f56' },
        ],
      },
      {
        name: 'Sage sweater, cream trousers, brown boots',
        scene: 'Soft office',
        note: 'Sage is green pulled halfway to neutral, so it asks for quiet partners: cream below, brown leather at the feet. The low-contrast read is the point.',
        items: [
          { role: 'top', label: 'sage sweater', hex: '#9caf88' },
          { role: 'pants', label: 'cream trousers', hex: '#eae2d2' },
          { role: 'shoes', label: 'brown boots', hex: '#5b3a2e' },
        ],
      },
      {
        name: 'Emerald blouse, black trousers, black heels',
        scene: 'Evening',
        note: 'Jewel greens want black the way rubies want velvet: emerald supplies all the saturation, black supplies the frame. Silver or gold jewelry, nothing between.',
        items: [
          { role: 'top', label: 'emerald blouse', hex: '#1f7a5c' },
          { role: 'pants', label: 'black trousers', hex: '#26262a' },
          { role: 'shoes', label: 'black heels', hex: '#1a1a1e' },
        ],
      },
      {
        name: 'Forest coat, camel turtleneck, dark denim',
        scene: 'Winter commute',
        note: 'Forest green and camel is the winter pairing that reads money. The denim keeps it from going formal; the boots tie back to the coat.',
        items: [
          { role: 'outer', label: 'forest coat', hex: '#2c4f3a' },
          { role: 'top', label: 'camel turtleneck', hex: '#c19a6b' },
          { role: 'pants', label: 'dark denim', hex: '#36415c' },
          { role: 'shoes', label: 'espresso boots', hex: '#3a281c' },
        ],
      },
      {
        name: 'Cargo pants, black hoodie, white sneakers',
        scene: 'Street',
        note: 'The streetwear default for green: utilitarian cargos, black layer, white soles. The green piece works hardest when everything else stays grayscale.',
        items: [
          { role: 'pants', label: 'green cargo pants', hex: '#4f6b45' },
          { role: 'top', label: 'black hoodie', hex: '#232326' },
          { role: 'shoes', label: 'white sneakers', hex: '#e9e6df' },
        ],
      },
      {
        name: 'Green overshirt, white tank, blue jeans',
        scene: 'The western default',
        note: 'A green shirt-jac over a white tank and blue jeans is the range-country uniform. Denim’s blue is green’s wheel neighbor, so the pair never fights.',
        items: [
          { role: 'outer', label: 'green overshirt', hex: '#3f7a52' },
          { role: 'top', label: 'white tank', hex: '#f6f4ef' },
          { role: 'pants', label: 'blue jeans', hex: '#3f5a8a' },
          { role: 'shoes', label: 'white shoes', hex: '#eceae4' },
        ],
      },
      {
        name: 'Kelly skirt, white blouse, tan flats',
        scene: 'Spring event',
        note: 'Kelly green is the loudest register, so everything around it goes quiet: white above, tan below. One loud piece, two whispers.',
        items: [
          { role: 'pants', label: 'kelly skirt', hex: '#2f7f45' },
          { role: 'top', label: 'white blouse', hex: '#f6f4ef' },
          { role: 'shoes', label: 'tan flats', hex: '#c8a17a' },
        ],
      },
      {
        name: 'Olive jacket, burgundy scarf, gray trousers',
        scene: 'Autumn layers',
        note: 'Green and burgundy is the fall pairing menswear writers will not stop recommending — for good reason: both are dark, both are muted, neither competes.',
        items: [
          { role: 'outer', label: 'olive jacket', hex: '#5c6b3c' },
          { role: 'top', label: 'oatmeal tee', hex: '#e3d9c5' },
          { role: 'accent', label: 'burgundy scarf', hex: '#6d2a35' },
          { role: 'pants', label: 'gray trousers', hex: '#7a7d84' },
          { role: 'shoes', label: 'dark boots', hex: '#3a3a3e' },
        ],
      },
      {
        name: 'Pine trousers, mustard knit, cream sneakers',
        scene: 'Autumn color',
        note: 'Green and mustard sit near each other on the wheel and both read autumnal, so the pairing feels coordinated rather than matched. Cream at the feet keeps it from going dark.',
        items: [
          { role: 'pants', label: 'pine trousers', hex: '#2f4a38' },
          { role: 'top', label: 'mustard knit', hex: '#d3a24a' },
          { role: 'shoes', label: 'cream sneakers', hex: '#efece5' },
        ],
      },
      {
        name: 'Mint top, white jeans, silver flats',
        scene: 'Summer',
        note: 'Pale mint is green’s summer register. It pairs with white like spring pairs with April, and silver (not gold) is the metal that belongs with it.',
        items: [
          { role: 'top', label: 'mint top', hex: '#bfe3cf' },
          { role: 'pants', label: 'white jeans', hex: '#f2f0ea' },
          { role: 'shoes', label: 'silver flats', hex: '#c5c8cc' },
        ],
      },
    ],
    decor: [
      {
        name: 'Sage, cream, oak',
        note: 'The calm living room: sage walls or upholstery, cream textiles, pale oak floors. The default of every farmhouse-era catalog for a reason.',
        colors: [
          { label: 'sage', hex: '#9caf88' },
          { label: 'cream', hex: '#f0ece2' },
          { label: 'pale oak', hex: '#c8a97e' },
        ],
      },
      {
        name: 'Forest and brass',
        note: 'The library pairing: deep forest green cabinetry, brass hardware, ivory walls. Green’s most expensive-looking register.',
        colors: [
          { label: 'forest green', hex: '#24402f' },
          { label: 'brass', hex: '#b08d57' },
          { label: 'ivory wall', hex: '#e5dcc8' },
        ],
      },
      {
        name: 'Olive and ecru',
        note: 'The bedroom version: olive bedding or paint, ecru linen, walnut legs. Warm, muted, sleep-adjacent.',
        colors: [
          { label: 'olive', hex: '#6b7245' },
          { label: 'ecru linen', hex: '#ece5d3' },
          { label: 'walnut', hex: '#4a3f30' },
        ],
      },
      {
        name: 'Emerald and navy',
        note: 'The dining room: emerald velvet, navy wall, off-white trim. Two jewel tones that share a cool undertone.',
        colors: [
          { label: 'emerald velvet', hex: '#1f7a5c' },
          { label: 'navy wall', hex: '#2c3a52' },
          { label: 'off-white trim', hex: '#f2efe6' },
        ],
      },
    ],
    avoid: [
      {
        name: 'Bright red',
        hex: '#d52525',
        why: 'Christmas by default. If the assignment is a holiday party, ignore this entry; otherwise the pairing does costume work you did not ask for.',
      },
      {
        name: 'Fuchsia',
        hex: '#d937a2',
        why: 'Green’s loud neighbor at full saturation — they fight for the same glance instead of sharing it. Dusty pink does the job cooperatively.',
      },
      {
        name: 'Bright orange',
        hex: '#ff6a13',
        why: 'Two loud warm hues competing for attention. Mustard and rust do the warm-plus-green job at volumes that cooperate.',
      },
    ],
    tips: [
      {
        title: 'Name your green before pairing',
        body: 'Olive, sage, forest and emerald have different best friends. Decide which register the piece is in first, then pick partners for that register — not for "green" in the abstract.',
      },
      {
        title: 'Muted greens love warm neutrals',
        body: 'Olive and sage pair most safely with tan, camel, cream and brown leather. The shared low saturation is what makes the combination read natural instead of seasonal-costume.',
      },
      {
        title: 'Denim is the free answer',
        body: 'Blue jeans go with every green register because denim is a desaturated blue at a familiar lightness. When in doubt, green piece plus denim plus white or tan shoes is a complete outfit.',
      },
      {
        title: 'One loud piece per outfit',
        body: 'Kelly green and emerald are full-volume colors. Everything around them should drop to neutrals — white, tan, black — or the outfit becomes a competition.',
      },
    ],
    faqs: [
      {
        q: 'What colors go with green clothes?',
        a: 'Across registers: cream and off-white, tan and camel, brown leather, navy, blue denim, gray, burgundy and mustard. Olive and sage prefer the warm neutrals; emerald and forest prefer black, camel and denim. One clear lightness gap between pieces keeps any of these crisp.',
      },
      {
        q: 'Does red go with green?',
        a: 'Bright red with green reads Christmas — that is a costume association, not a color-law violation. If you want red-family contrast, use burgundy or rust: the muted, dark versions of red pair with olive and forest constantly and read autumnal instead of seasonal.',
      },
      {
        q: 'Does blue go with green?',
        a: 'Yes — they are neighbors on the color wheel, which makes them easy blending partners. Blue denim with a green top is the everyday proof; forest green with navy is the dressy version. Keep one piece clearly lighter than the other so the pair does not merge.',
      },
      {
        q: 'What colors go with sage green?',
        a: 'Cream, off-white, greige, camel, blush, muted gold, and softer browns. Sage is already half-neutral, so it wants quiet company; strong colors overwhelm it. Sage plus cream plus brown leather is the canonical version.',
      },
      {
        q: 'What colors go with olive green?',
        a: 'Tan, cream, white, black, burgundy, rust, navy and gray. Olive is the most menswear-friendly green precisely because it behaves like an earth tone — treat it like brown’s cousin and the same pairings apply.',
      },
    ],
    mixerColors: ['#386641', '#c19a6b'],
    related: [
      { href: '/what-colors-make-green/', label: 'What colors make green (why the blue decides)' },
      { href: '/what-colors-go-with-brown/', label: 'What colors go with brown' },
      { href: '/mix/green-white/', label: 'Green and white: the sage ladder, every ratio' },
      { href: '/color-guides/', label: 'All color guides' },
    ],
  },

  {
    slug: 'what-colors-go-with-purple',
    h1: 'What Colors Go With Purple',
    metaTitle: 'What Colors Go With Purple? 10 Pairings + HEX | TintBrew',
    metaDescription:
      'What colors go with purple? Ten outfit pairings and four room palettes across lavender, plum, violet and aubergine, with exact HEX codes and Oklab reads.',
    lead:
      'Purple has a reputation for being hard to wear that its actual pairings do not support: gray, black, navy, cream, camel and denim all answer to it, and the failures are concentrated in two or three loud hues. The ten outfits below anchor on a different purple each time — lavender, plum, violet, aubergine — with exact HEX codes and the computed lightness gap behind every read.',
    baseName: 'grape purple',
    baseHex: '#6f4a8c',
    introHeading: 'Why purple pairs best with quiet colors',
    intro: [
      'Purple is the most saturated color most wardrobes contain, which means it arrives pre-loaded with attention. The pairings that work are almost all quiet: grays and creams let purple be the statement, black frames it, navy partners it at the same darkness, and camel warms it without competing. The pairings that fail are the other loud hues — yellow and orange at full volume — because they compete for the exact attention purple already claimed.',
      'Register matters here even more than with green. Lavender and lilac are pastels that want white, cream and silver; plum and aubergine are jewel tones that want black and gold; the mid violets live happily with gray and denim. Pick the register first, the pairing second, and use the Oklab read under each combo to keep one clear lightness gap in the outfit.',
    ],
    combosHeading: 'Ten outfits, anchored on purple',
    combos: [
      {
        name: 'Lavender sweater, white trousers, gray flats',
        scene: 'Brunch',
        note: 'Lavender is purple’s friendliest register. White keeps it airy, gray flats keep it grounded — the pastel version of a no-brainer outfit.',
        items: [
          { role: 'top', label: 'lavender sweater', hex: '#c3b2e0' },
          { role: 'pants', label: 'white trousers', hex: '#f4f2ec' },
          { role: 'shoes', label: 'gray flats', hex: '#a7a9b0' },
        ],
      },
      {
        name: 'Plum skirt, black top, black boots',
        scene: 'Evening',
        note: 'The evening default for purple: one saturated plum piece over black. The lightness gap does the styling for you.',
        items: [
          { role: 'pants', label: 'plum skirt', hex: '#5a3a68' },
          { role: 'top', label: 'black top', hex: '#1f1f22' },
          { role: 'shoes', label: 'black boots', hex: '#26262a' },
        ],
      },
      {
        name: 'Purple blouse, gray trousers, white sneakers',
        scene: 'Office',
        note: 'The office-safe version: a royal-leaning blouse tucked into gray. Purple supplies the color, the grays supply the professionalism.',
        items: [
          { role: 'top', label: 'purple blouse', hex: '#7a4d8f' },
          { role: 'pants', label: 'gray trousers', hex: '#8a8d94' },
          { role: 'shoes', label: 'white sneakers', hex: '#e9e6df' },
        ],
      },
      {
        name: 'Violet knit, cream jeans, tan boots',
        scene: 'Weekend',
        note: 'Mid violet with cream below is the soft weekend read. Tan boots bridge the two — warm leather between cool pastels.',
        items: [
          { role: 'top', label: 'violet knit', hex: '#5f4b9c' },
          { role: 'pants', label: 'cream jeans', hex: '#eae2d2' },
          { role: 'shoes', label: 'tan boots', hex: '#a9825a' },
        ],
      },
      {
        name: 'Aubergine coat, camel sweater, dark denim',
        scene: 'Winter',
        note: 'Deep aubergine reads almost-black until the light hits it, which makes it the easiest purple to wear daily. Camel underneath is the classic warm counter.',
        items: [
          { role: 'outer', label: 'aubergine coat', hex: '#43284f' },
          { role: 'top', label: 'camel sweater', hex: '#c19a6b' },
          { role: 'pants', label: 'dark denim', hex: '#36415c' },
          { role: 'shoes', label: 'black boots', hex: '#2f2a30' },
        ],
      },
      {
        name: 'Lilac shirt, navy chinos, white shoes',
        scene: 'Smart casual',
        note: 'Lilac and navy is the spring pairing that looks deliberate with zero effort — pale purple above, deep blue below, white at the finish line.',
        items: [
          { role: 'top', label: 'lilac shirt', hex: '#c9b8ea' },
          { role: 'pants', label: 'navy chinos', hex: '#2c3a52' },
          { role: 'shoes', label: 'white shoes', hex: '#eceae4' },
        ],
      },
      {
        name: 'Purple skirt, black tee, denim jacket',
        scene: 'Concert',
        note: 'The casual-cool register: saturated purple against a black tee, denim jacket breaking it up. Studs optional, attitude included.',
        items: [
          { role: 'pants', label: 'purple skirt', hex: '#7b4d9e' },
          { role: 'top', label: 'black tee', hex: '#1f1f22' },
          { role: 'outer', label: 'denim jacket', hex: '#45536b' },
          { role: 'shoes', label: 'black ankle boots', hex: '#26262a' },
        ],
      },
      {
        name: 'Amethyst pullover, charcoal suit',
        scene: 'Formal',
        note: 'The formal lane nobody else takes: an amethyst knit under a charcoal suit reads considered instead of loud. Silver tie bar, dark shoes.',
        items: [
          { role: 'top', label: 'amethyst pullover', hex: '#7452a8' },
          { role: 'pants', label: 'charcoal suit', hex: '#33353c' },
          { role: 'shoes', label: 'black derbies', hex: '#1c1c20' },
        ],
      },
      {
        name: 'Mauve cardigan, white tank, blue jeans',
        scene: 'Everyday soft',
        note: 'Mauve is purple resigned to being a neutral, and it deserves the neutral uniform: white tank, blue jeans, tan shoes. The easiest entry into purple.',
        items: [
          { role: 'outer', label: 'mauve cardigan', hex: '#b08a9e' },
          { role: 'top', label: 'white tank', hex: '#f6f4ef' },
          { role: 'pants', label: 'blue jeans', hex: '#3f5a8a' },
          { role: 'shoes', label: 'tan shoes', hex: '#c8a17a' },
        ],
      },
      {
        name: 'Purple hoodie, black joggers, white sneakers',
        scene: 'Street',
        note: 'Streetwear’s take: a deep purple hoodie over black and white. The one-color-plus-grayscale formula, applied to purple.',
        items: [
          { role: 'top', label: 'purple hoodie', hex: '#5e3f8a' },
          { role: 'pants', label: 'black joggers', hex: '#26262a' },
          { role: 'shoes', label: 'white sneakers', hex: '#e9e6df' },
        ],
      },
    ],
    decor: [
      {
        name: 'Lavender, cream, honey wood',
        note: 'The soft bedroom: lavender walls or bedding, cream curtains, honey-toned wood. Purple’s calmest possible register.',
        colors: [
          { label: 'lavender', hex: '#c3b2e0' },
          { label: 'cream', hex: '#f0ece2' },
          { label: 'honey wood', hex: '#b99055' },
        ],
      },
      {
        name: 'Aubergine and gold',
        note: 'The dining room: deep aubergine walls, brass or gold fixtures, ivory linen. The jewel-box version of purple decor.',
        colors: [
          { label: 'aubergine', hex: '#3d2645' },
          { label: 'gold', hex: '#c9a227' },
          { label: 'ivory linen', hex: '#ece5d8' },
        ],
      },
      {
        name: 'Violet and gray',
        note: 'The studio or office: violet accent chair, warm gray walls, white trim. The most livable purple scheme.',
        colors: [
          { label: 'violet accent', hex: '#6f4a8c' },
          { label: 'warm gray', hex: '#9aa0a8' },
          { label: 'white trim', hex: '#f2f0ec' },
        ],
      },
      {
        name: 'Plum and sage',
        note: 'The bathroom pairing: plum tile, sage towels, off-white walls. Two muted colors sharing one quiet room.',
        colors: [
          { label: 'plum tile', hex: '#5a3a68' },
          { label: 'sage towels', hex: '#9caf88' },
          { label: 'off-white wall', hex: '#eee9de' },
        ],
      },
    ],
    avoid: [
      {
        name: 'Bright yellow',
        hex: '#f2c500',
        why: 'Purple’s complement at full volume: mathematically opposite, visually a shouting match. Pale gold and honey are the truce versions.',
      },
      {
        name: 'Bright orange',
        hex: '#ff6a13',
        why: 'Two attention-seeking hues with nothing shared between them. Camel does warmth next to purple without the argument.',
      },
      {
        name: 'Olive',
        hex: '#6b7245',
        why: 'Army green and purple clash over undertone — one earthy, one jewel — at nearly the same darkness. Gray or navy covers the same ground in agreement.',
      },
    ],
    tips: [
      {
        title: 'Let purple be the only loud piece',
        body: 'Purple arrives saturated. Build the rest of the outfit from neutrals — gray, cream, black, denim — and the color does the styling for you.',
      },
      {
        title: 'Match the metal to the register',
        body: 'Lavender and lilac belong with silver; plum, aubergine and amethyst belong with gold. The wrong metal does not break the outfit, but the right one finishes it.',
      },
      {
        title: 'Purple plus black is not funeral wear',
        body: 'The pairing reads formal, not somber, as long as the purple piece is clearly purple in indoor light. If your purple reads black, lift it one register toward violet.',
      },
      {
        title: 'Gray is the office answer',
        body: 'If you want purple in a professional setting, gray trousers or a gray suit is the accepted bridge — the combination reads considered at every office dress code short of banking.',
      },
    ],
    faqs: [
      {
        q: 'What colors go with purple clothes?',
        a: 'Gray, black, navy, cream, white, camel and tan, blue denim, and softer greens like sage. Purple is the loudest color in most wardrobes, so its best partners are quiet — pick one neutral base and let the purple piece be the statement.',
      },
      {
        q: 'Does gray go with purple?',
        a: 'Yes — gray is purple’s most reliable partner, especially for office wear. The pairing works because gray is chroma-free: it borrows warmth or coolness from whatever sits next to it, including your purple.',
      },
      {
        q: 'Does navy go with purple?',
        a: 'Yes. Navy and purple sit close in darkness but far enough in hue to stay distinct — the pairing reads rich rather than matched. Lilac with navy is the spring version; aubergine with navy is the winter one.',
      },
      {
        q: 'What colors go with lavender?',
        a: 'White, cream, soft gray, navy, silver, and pale gold. Lavender is a pastel, so it wants other soft values or one deep anchor — white trousers with gray flats, or navy chinos under a lilac shirt.',
      },
      {
        q: 'What colors should you avoid with purple?',
        a: 'Bright yellow, bright orange, and earthy olive. The first two compete with purple at full saturation; olive clashes over undertone while matching its darkness, which reads like an accident. Muted or pale versions of all three are fine.',
      },
    ],
    mixerColors: ['#6f4a8c', '#8a8d94'],
    related: [
      { href: '/what-colors-make-purple/', label: 'What colors make purple (every route)' },
      { href: '/what-colors-go-with-burgundy/', label: 'What colors go with burgundy' },
      { href: '/mix/purple-white/', label: 'Purple and white: the lavender ladder, every ratio' },
      { href: '/color-guides/', label: 'All color guides' },
    ],
  },

  {
    slug: 'what-colors-go-with-burgundy',
    h1: 'What Colors Go With Burgundy',
    metaTitle: 'What Colors Go With Burgundy? 10 Pairings + HEX | TintBrew',
    metaDescription:
      'What colors go with burgundy? Ten outfit pairings and four room palettes with exact HEX codes and the Oklab lightness read on why each pairing works.',
    lead:
      'Burgundy is red that went to finishing school: dark, muted, and quietly formal, it pairs with cream, navy, camel, gray, black leather, forest green and gold — a longer list than red itself can manage. The ten outfits below anchor on a different burgundy piece each time, with exact HEX codes and the computed lightness gap behind every pairing.',
    baseName: 'burgundy',
    baseHex: '#6d2a35',
    introHeading: 'Why burgundy pairs easier than red',
    intro: [
      'Burgundy is red darkened and desaturated toward brown, and both of those moves make it easier to wear: darker means it anchors like a neutral, desaturated means it stops fighting other colors. Bright red demands to be the only loud thing in the outfit; burgundy merely suggests it. That is why it survives next to navy, camel and forest green — colors that clash with scarlet — and why gold hardware looks intended rather than festive.',
      'The working rules: cream and off-white give burgundy its classic high-contrast read; navy and forest green partner it at matched darkness for the autumn register; camel and tan warm it up; gray cools it down; black leather sharpens it. The one trap is bright red — see the avoid list — because it is close enough in hue to look like a failed shade match rather than a choice.',
    ],
    combosHeading: 'Ten outfits, anchored on burgundy',
    combos: [
      {
        name: 'Burgundy sweater, cream trousers, brown loafers',
        scene: 'The everyday default',
        note: 'The canonical burgundy outfit: dark wine on top, cream below, brown leather at the feet. The lightness gap does all the work.',
        items: [
          { role: 'top', label: 'burgundy sweater', hex: '#6d2a35' },
          { role: 'pants', label: 'cream trousers', hex: '#ece3d2' },
          { role: 'shoes', label: 'brown loafers', hex: '#5b3a2e' },
        ],
      },
      {
        name: 'Maroon pants, gray hoodie, white sneakers',
        scene: 'Casual',
        note: 'The weekend proof that burgundy is a neutral: maroon sweatpants-grade pants, gray layer, white soles. Nothing tries, everything works.',
        items: [
          { role: 'pants', label: 'maroon pants', hex: '#722f37' },
          { role: 'top', label: 'gray hoodie', hex: '#8a8d94' },
          { role: 'shoes', label: 'white sneakers', hex: '#e9e6df' },
        ],
      },
      {
        name: 'Burgundy blazer, light blue oxford, charcoal trousers',
        scene: 'Business',
        note: 'The boardroom version: a burgundy blazer reads as personality, not rebellion, when the rest is charcoal and pale blue. Dark brown or black shoes.',
        items: [
          { role: 'outer', label: 'burgundy blazer', hex: '#63232e' },
          { role: 'top', label: 'light blue oxford', hex: '#a9c4de' },
          { role: 'pants', label: 'charcoal trousers', hex: '#3d4046' },
          { role: 'shoes', label: 'black derbies', hex: '#262226' },
        ],
      },
      {
        name: 'Wine skirt, black top, black boots, gold jewelry',
        scene: 'Evening',
        note: 'Evening burgundy: one saturated wine piece, black frame, gold at the ears and wrist. The jewelry is what keeps it from going somber.',
        items: [
          { role: 'pants', label: 'wine skirt', hex: '#58202a' },
          { role: 'top', label: 'black top', hex: '#1f1f22' },
          { role: 'shoes', label: 'black boots', hex: '#1c1c20' },
          { role: 'accent', label: 'gold jewelry', hex: '#c9a227' },
        ],
      },
      {
        name: 'Burgundy scarf, camel coat, dark denim',
        scene: 'Winter commute',
        note: 'The scarf-first version for anyone not ready to wear a whole burgundy garment: camel coat, cream sweater, blue jeans, wine at the throat.',
        items: [
          { role: 'accent', label: 'burgundy scarf', hex: '#6d2a35' },
          { role: 'outer', label: 'camel coat', hex: '#b98f56' },
          { role: 'top', label: 'oatmeal sweater', hex: '#e3d9c5' },
          { role: 'pants', label: 'dark denim', hex: '#36415c' },
          { role: 'shoes', label: 'brown boots', hex: '#4a3226' },
        ],
      },
      {
        name: 'Maroon turtleneck, pleated tan skirt, knee boots',
        scene: 'Seventies',
        note: 'The 1970s register: maroon and tan in one warm, tall-booted silhouette. It reads costume only if you add a third period piece.',
        items: [
          { role: 'top', label: 'maroon turtleneck', hex: '#722f37' },
          { role: 'pants', label: 'pleated tan skirt', hex: '#c8a17a' },
          { role: 'shoes', label: 'knee boots', hex: '#4f3324' },
        ],
      },
      {
        name: 'Burgundy chinos, navy sweater, white shoes',
        scene: 'Smart casual',
        note: 'Burgundy and navy at matched darkness: the autumn pairing that reads coordinated rather than matched. White shoes keep it current.',
        items: [
          { role: 'pants', label: 'burgundy chinos', hex: '#722f37' },
          { role: 'top', label: 'navy sweater', hex: '#2c3a52' },
          { role: 'shoes', label: 'white shoes', hex: '#eceae4' },
        ],
      },
      {
        name: 'Wine hoodie, black joggers, white sneakers',
        scene: 'Street',
        note: 'Streetwear’s favorite shade of red: a wine hoodie over black and white. The formula needs nothing else.',
        items: [
          { role: 'top', label: 'wine hoodie', hex: '#5c2630' },
          { role: 'pants', label: 'black joggers', hex: '#26262a' },
          { role: 'shoes', label: 'white sneakers', hex: '#e9e6df' },
        ],
      },
      {
        name: 'Burgundy leather jacket, white tee, blue jeans',
        scene: 'Weekend',
        note: 'The rocker route: oxblood leather, white tee, blue jeans. Brown boots if you want it warmer, black if you want it sharper.',
        items: [
          { role: 'outer', label: 'burgundy leather jacket', hex: '#63242f' },
          { role: 'top', label: 'white tee', hex: '#f4f2ec' },
          { role: 'pants', label: 'blue jeans', hex: '#3f5a8a' },
          { role: 'shoes', label: 'black boots', hex: '#26262a' },
        ],
      },
      {
        name: 'Maroon sweater, mustard skirt, tall boots',
        scene: 'Autumn color',
        note: 'The boldest safe pairing: burgundy plus mustard is complementary on paper but muted enough in practice to read autumnal rather than loud.',
        items: [
          { role: 'top', label: 'maroon sweater', hex: '#722f37' },
          { role: 'pants', label: 'mustard skirt', hex: '#d3a24a' },
          { role: 'shoes', label: 'tall boots', hex: '#3a281c' },
        ],
      },
    ],
    decor: [
      {
        name: 'Wine, cream, walnut',
        note: 'The living-room default: a wine accent wall or armchair, cream sofa, walnut legs. Burgundy’s calmest register.',
        colors: [
          { label: 'wine accent', hex: '#58202a' },
          { label: 'cream sofa', hex: '#efe8da' },
          { label: 'walnut', hex: '#59402c' },
        ],
      },
      {
        name: 'Burgundy and brass',
        note: 'The bar-corner pairing: burgundy walls or banquettes, brass rail, charcoal ground. Where every good cocktail bar lands.',
        colors: [
          { label: 'burgundy', hex: '#63232e' },
          { label: 'brass', hex: '#b08d57' },
          { label: 'charcoal ground', hex: '#2b2420' },
        ],
      },
      {
        name: 'Maroon and forest',
        note: 'The study: maroon leather chair, forest green walls, ivory trim. The two darkest autumns in one room.',
        colors: [
          { label: 'maroon leather', hex: '#722f37' },
          { label: 'forest wall', hex: '#24402f' },
          { label: 'ivory trim', hex: '#e8ddca' },
        ],
      },
      {
        name: 'Oxblood and gray',
        note: 'The bedroom version: oxblood bedding, warm gray walls, off-white lampshades. Dark, quiet, adult.',
        colors: [
          { label: 'oxblood bedding', hex: '#4a1d24' },
          { label: 'warm gray wall', hex: '#9aa0a8' },
          { label: 'off-white shade', hex: '#f0ece2' },
        ],
      },
    ],
    avoid: [
      {
        name: 'Bright red',
        hex: '#e02525',
        why: 'The almost-match trap: close enough in hue to look attempted, far enough to look failed. Let one red own the outfit — in this family, that red is burgundy.',
      },
      {
        name: 'Neon lime',
        hex: '#b9e33c',
        why: 'Burgundy’s whole register is restraint; neon anything breaks the spell, and lime breaks it loudest.',
      },
      {
        name: 'Hot pink',
        hex: '#ff4f9a',
        why: 'Adjacent brights that read like a color-coordination accident. Blush is the pink that belongs next to burgundy — see the dusty-pink pairing on the brown page.',
      },
    ],
    tips: [
      {
        title: 'Burgundy is a dark neutral — use it like one',
        body: 'Treat burgundy pieces the way you treat navy: as anchors that pair with pale neutrals above or below. Cream, ivory and off-white are its classic high-contrast partners.',
      },
      {
        title: 'Gold over silver',
        body: 'Burgundy’s warmth is what separates it from purple, and gold hardware matches it. Silver reads like an afterthought next to wine tones.',
      },
      {
        title: 'Matched-darkness pairings read autumnal',
        body: 'Navy, forest green and charcoal sit at burgundy’s lightness. Worn together the outfit reads rich and seasonal; add one pale piece if it starts feeling heavy.',
      },
      {
        title: 'Start with a scarf',
        body: 'The lowest-commitment burgundy is an accessory: scarf, beanie, gloves over camel or navy. If the color works for you there, graduate to knitwear.',
      },
    ],
    faqs: [
      {
        q: 'What colors go with burgundy?',
        a: 'Cream and off-white, navy, camel and tan, gray, black leather, forest green, mustard, blush, and gold hardware. Burgundy is dark and muted enough to anchor an outfit like a neutral, which is why the list is longer than bright red’s.',
      },
      {
        q: 'Does navy go with burgundy?',
        a: 'Yes — it is one of the strongest pairings: both dark, both muted, distinct in hue. Navy sweater over burgundy chinos (or the reverse) reads coordinated without matching. Add one pale piece if the outfit feels heavy.',
      },
      {
        q: 'What is the difference between burgundy and maroon?',
        a: 'In wardrobe use they are interchangeable — both are dark reds. Strictly, burgundy leans slightly purple (named for the wine), maroon leans slightly brown (from the French marron, chestnut). If a shade reads plum-ish call it burgundy; if it reads brick-ish call it maroon.',
      },
      {
        q: 'Should I wear gold or silver with burgundy?',
        a: 'Gold. Burgundy carries warmth from its red-brown base, and gold hardware matches that warmth; silver reads colder than the outfit around it. The exception is burgundy with a visible purple cast, which can take silver.',
      },
      {
        q: 'What colors should you avoid with burgundy?',
        a: 'Bright red (the almost-match trap), neon shades of any hue, and hot pink. The common thread: colors that are close in hue but louder, or so loud they mock burgundy’s restraint. Muted and pale versions of the same hues are fine.',
      },
    ],
    mixerColors: ['#6d2a35', '#ece3d2'],
    related: [
      { href: '/what-colors-make-brown/', label: 'What colors make brown (burgundy’s next-door family)' },
      { href: '/what-colors-go-with-brown/', label: 'What colors go with brown' },
      { href: '/what-colors-go-with-purple/', label: 'What colors go with purple' },
      { href: '/mix/red-black/', label: 'Red and black: the maroon ladder, every ratio' },
      { href: '/color-guides/', label: 'All color guides' },
    ],
  },
];
