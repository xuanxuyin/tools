/** Shared types for the fuse-bead pattern family (data + lib + island). */

export type BeadCategory = 'animals' | 'food' | 'christmas' | 'halloween' | 'minis';

export type BeadDifficulty = 'easy' | 'medium';

/** One recolorable area of a pattern ('K' eyes region can be recolored apart from the outline). */
export interface BeadRegion {
  /** Human label shown in the bead list and the region picker */
  label: string;
  /** Default bead id from lib/beadPalette.ts */
  color: string;
}

export interface BeadPatternDef {
  slug: string;
  name: string;
  category: BeadCategory;
  difficulty: BeadDifficulty;
  /** Grid width in beads; rows are padded to this */
  width: number;
  /** One-line card blurb on gallery pages */
  tagline: string;
  /** Two-sentence detail-page intro */
  blurb: string;
  /** Region key → region; '.' is reserved for "no bead" */
  regions: Record<string, BeadRegion>;
  /** Each string is one grid row; chars index into `regions`, '.' = empty */
  rows: string[];
}
