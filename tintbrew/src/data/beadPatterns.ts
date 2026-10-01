/**
 * Aggregate of the fuse-bead pattern catalog, split by category file.
 * Import BEAD_PATTERNS (all) or the per-category arrays; the guard test in
 * lib/beadContent.test.ts locks invariants across the whole set.
 */
import type { BeadPatternDef } from '../lib/beadTypes';
import { BEAD_ANIMALS } from './beadAnimals';
import { BEAD_FOOD } from './beadFood';
import { BEAD_CHRISTMAS } from './beadChristmas';
import { BEAD_HALLOWEEN } from './beadHalloween';
import { BEAD_MINIS } from './beadMinis';

export const BEAD_PATTERNS: BeadPatternDef[] = [
  ...BEAD_ANIMALS,
  ...BEAD_FOOD,
  ...BEAD_CHRISTMAS,
  ...BEAD_HALLOWEEN,
  ...BEAD_MINIS,
];

export { BEAD_ANIMALS, BEAD_FOOD, BEAD_CHRISTMAS, BEAD_HALLOWEEN, BEAD_MINIS };
