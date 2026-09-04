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
  /** Shown in footer + home popular lists */
  popular?: boolean;
}

export const mixes: MixDef[] = [
  {
    a: 'red',
    b: 'blue',
    resultName: 'purple (a muted violet)',
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
    additiveNote:
      'Blue plus purple moves toward blue-violet — closer to indigo than to royal purple. In light the blend stays luminous; in paint it deepens quickly because purple paint already contains red.',
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
  },
  {
    a: 'brown',
    b: 'white',
    resultName: 'tan',
    additiveNote:
      'Brown is really dark orange. Add white and you get tan — the tint of orange — which is why tan, beige, and brown all belong to the same family no matter how different they look side by side.',
  },
  {
    a: 'green',
    b: 'white',
    resultName: 'sage green',
  },
  {
    a: 'black',
    b: 'red',
    resultName: 'maroon',
    additiveNote:
      'Any color plus black makes a shade — darker and slightly warmer. Red plus black deepens into maroon or oxblood; a perceptual mix keeps more of the red than a straight channel average would.',
  },
  {
    a: 'blue',
    b: 'black',
    resultName: 'navy blue',
  },
  {
    a: 'orange',
    b: 'white',
    resultName: 'peach',
  },
  {
    a: 'purple',
    b: 'red',
    resultName: 'magenta (a red-violet)',
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
  },
];
