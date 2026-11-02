/**
 * Re-export shim. The gallery kernel (compact cell encoding, publish
 * validation, hour buckets) lives at functions/api/gallery/_kernel.ts —
 * the Pages Functions bundler stages functions/ outside the repo checkout,
 * so shared code the gallery API uses must physically live inside that
 * tree. Edit the kernel file, not this one.
 */
export * from '../../functions/api/gallery/_kernel';
