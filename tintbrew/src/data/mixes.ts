/**
 * The 24 mix pages. `a`/`b` are color ids; the slug is always the sorted
 * pair (mixSlug), so order here doesn't matter — but keep them consistent.
 *
 * resultName / additiveNote are hand-written (the anti-thin-content layer);
 * everything else on a mix page is computed from the engine at build time.
 */
export interface MixDef {
  a: string;
  b: string;
  /** Hand-tuned headline answer, e.g. "purple (a muted violet)" */
  resultName: string;
  /** Hand-written light-vs-paint fact for top pairs (additive vs subtractive) */
  additiveNote?: string;
  /** Hand-written synonym bridge (violet-vs-purple wording etc.) for pairs
   *  whose queries arrive under a different color name; rendered under
   *  "About these two colors". Keyed syn.<a>-<b> in mixNotesI18n. */
  synonymNote?: string;
  /** Shown in footer + home popular lists */
  popular?: boolean;
  /** Result-family pairing page: renders a "what colors go with X" link when
   *  the computed result clearly belongs to that family. Only set where the
   *  match is honest (purple/brown/green/burgundy) — no blanket cross-links. */
  pairsWith?: string;
}

export const mixes: MixDef[] = [
  {
    a: 'red',
    b: 'blue',
    resultName: 'purple (a muted violet)',
    pairsWith: 'purple',
    popular: true,
    additiveNote:
      'Red and blue are both primaries of light. Add them on a screen and the blend leans magenta-purple; mix red and blue paint and you get a murkier violet, because pigments subtract light instead of adding it — the more paint you combine, the darker and grayer the result.',
  },
  {
    a: 'blue',
    b: 'yellow',
    resultName: 'green in paint, a pale blue in light',
    popular: true,
    additiveNote:
      'In paint, blue and yellow make green — the classic subtractive mix taught in school. On a screen, blue and yellow light add together toward white, which is why this tool’s 50/50 screen blend looks pale and washed out instead of green. Same two colors, two different physical processes.',
  },
  {
    a: 'red',
    b: 'yellow',
    resultName: 'orange',
    popular: true,
    additiveNote:
      'Red and yellow sit next to each other on the color wheel, so they blend into a clean, vivid orange with none of the muddiness you get from mixing opposites — one of the most predictable mixes in both paint and light.',
  },
  {
    a: 'red',
    b: 'green',
    resultName: 'yellow in light, brown in paint',
    pairsWith: 'brown',
    popular: true,
    additiveNote:
      'Shine red and green light on the same spot and a screen adds them toward yellow — that is literally how your TV makes yellow, since it has no yellow pixel. Mix red and green paint and each pigment absorbs the other’s light, leaving brown or olive.',
  },
  {
    a: 'blue',
    b: 'green',
    resultName: 'teal',
    popular: true,
    additiveNote:
      'Blue and green are neighbors on the wheel, so they mix cleanly into teal or turquoise in both paint and light. Because they share a wavelength family, no muddiness appears even at unusual ratios.',
  },
  {
    a: 'yellow',
    b: 'green',
    resultName: 'chartreuse',
    pairsWith: 'green',
    popular: true,
    additiveNote:
      'Yellow and green are neighbors on the wheel, so they produce a clean yellow-green — chartreuse, halfway between grass and lemon. In light the result is brighter; in paint slightly deeper.',
  },
  {
    a: 'purple',
    b: 'pink',
    resultName: 'magenta pink',
    additiveNote:
      'Pink is already a tinted red, so purple plus pink stays inside the red–violet family: the blend is a saturated magenta pink in paint, and a brighter fuchsia where light is added.',
    synonymNote:
      '"Violet plus pink", "purple plus pink", "pink and purple" — all three wordings land on this page. Violet is the bluer synonym of purple, so a violet-and-pink blend reads one step bluer: orchid and lilac rather than warm magenta pink. The 50/50 swatch above is the center of that whole neighborhood.',
  },
  {
    a: 'red',
    b: 'pink',
    resultName: 'crimson pink',
  },
  {
    a: 'blue',
    b: 'purple',
    resultName: 'violet (a blue-purple)',
    pairsWith: 'purple',
    additiveNote:
      'Blue plus purple moves toward blue-violet — closer to indigo than to royal purple. In light the blend stays luminous; in paint it deepens quickly because purple paint already contains red.',
    synonymNote:
      'Asking about "blue and violet" or "violet and blue"? Violet is the bluer name for purple — those searches point at the same blend. Blue plus violet lands a half-step bluer than blue plus royal purple, still inside the indigo neighborhood, and the ratio table above is the map for either wording.',
  },
  {
    a: 'black',
    b: 'white',
    resultName: 'gray',
    popular: true,
    additiveNote:
      'Black and white are not colors of light — they are the extremes of brightness. Mixing them gives gray, and a perceptual 50/50 gray (what Oklab computes) is darker than the exact sRGB midpoint of 128, because your eye judges dark steps as larger than light ones.',
  },
  {
    a: 'red',
    b: 'white',
    resultName: 'salmon pink',
    additiveNote:
      'Any color plus white makes a tint — lighter and slightly cooler, because the white reflects every wavelength back at once. Red plus white lands on salmon or blush pink depending on ratio.',
  },
  {
    a: 'blue',
    b: 'white',
    resultName: 'periwinkle blue',
  },
  {
    a: 'yellow',
    b: 'white',
    resultName: 'cream',
    additiveNote:
      'Yellow plus white is the definition of cream. In paint, white does not dilute yellow the way it does other hues — yellow stays stubbornly warm, so even a small share of yellow holds the blend in butter-and-cream territory. On a screen, white adds every channel at once and the result reads as an ivory pastel rather than true dairy cream.',
  },
  {
    a: 'orange',
    b: 'yellow',
    resultName: 'gold',
  },
  {
    a: 'orange',
    b: 'red',
    resultName: 'vermilion (a coral orange)',
  },
  {
    a: 'pink',
    b: 'white',
    resultName: 'pastel pink',
    additiveNote:
      'Pink is already red plus white, so adding more white walks the same tint path further: blush, pastel rose, and at the far end a near-white rose. In paint this is the easiest blend to keep clean — there is nothing to cancel; on a screen the mix stays luminous and slightly cooler than the paint equivalent.',
  },
  {
    a: 'brown',
    b: 'white',
    resultName: 'tan',
    pairsWith: 'brown',
    additiveNote:
      'Brown is really dark orange. Add white and you get tan — the tint of orange — which is why tan, beige, and brown all belong to the same family no matter how different they look side by side.',
  },
  {
    a: 'green',
    b: 'white',
    resultName: 'sage green',
    pairsWith: 'green',
  },
  {
    a: 'black',
    b: 'red',
    resultName: 'maroon',
    pairsWith: 'burgundy',
    additiveNote:
      'Any color plus black makes a shade — darker and slightly warmer. Red plus black deepens into maroon or oxblood; a perceptual mix keeps more of the red than a straight channel average would.',
  },
  {
    a: 'blue',
    b: 'black',
    resultName: 'navy blue',
    additiveNote:
      'This is the navy route: black shades blue without shifting its hue the way orange, its complement, would. In paint, start from a single drop of black — pigments darken fast and blue pigment is already dark, so the leap from navy to midnight is two extra drops at most. On a screen the blend dims toward navy but never quite reaches the depth of mixed paint.',
  },
  {
    a: 'orange',
    b: 'white',
    resultName: 'peach',
    additiveNote:
      'White tints orange exactly the way it tints red: equal parts land in the peach lane, and more white walks toward apricot and cream. This page is the computed version of the recipe the peach guide opens with — and in frosting, the white butter base means you start from this end of the ramp by default.',
  },
  {
    a: 'purple',
    b: 'red',
    resultName: 'magenta (a red-violet)',
    additiveNote:
      'Red plus purple deepens into magenta and burgundy territory — the wine-dark end of red. Search with "violet" instead of "purple" and the answer barely moves: violet is simply the bluer name for the same family, so red plus violet lands a half-step bluer than red plus purple, still inside magenta. In paint, purple pigment already carries red; in light, the blend stays bright.',
  },
  {
    a: 'yellow',
    b: 'black',
    resultName: 'olive',
  },
  {
    a: 'green',
    b: 'black',
    resultName: 'forest green',
    pairsWith: 'green',
  },
  {
    a: 'yellow',
    b: 'brown',
    resultName: 'gold (a rich amber)',
    pairsWith: 'brown',
    popular: true,
    additiveNote:
      'Gold the color is simply yellow deepened with brown — no shine required. In paint this is the classic "old gold" recipe; on a screen the blend reads as a warm amber because screens cannot render metallic luster, only the underlying hue.',
  },
];
