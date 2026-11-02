/**
 * Re-export shim. The 291-color Mardiy palette lives at
 * functions/api/gallery/_palette.ts — the Pages Functions bundler stages
 * functions/ outside the repo checkout, so shared code the gallery API uses
 * must physically live inside that tree. Edit the kernel file, not this one.
 */
export * from '../../functions/api/gallery/_palette';
