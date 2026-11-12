import type { Jar3D } from './jar3d';

/**
 * Shared lazy boot for every 3D jar host on a page — the homepage runs
 * two (hero + draw duo), the fortune-stick tool page one. The dynamic
 * import keeps three.js out of the critical path; whoever asks first
 * (the component sweep or the tool-page script) gets the SAME promise,
 * so a host can never be booted twice.
 *
 * 👤 11/11 "非要一个过渡的吗": NO placeholder, NO crossfade — the box is
 * empty until the 3D jar appears, once (an empty transparent canvas is
 * invisible, so the very first painted frame is the jar). If WebGL is
 * unavailable the box simply stays empty — the old photo poster was
 * removed on 👤 11/11 ("太丑").
 */
const registry = new WeakMap<HTMLElement, Promise<Jar3D | null>>();

export function bootJar(host: HTMLElement): Promise<Jar3D | null> {
  let p = registry.get(host);
  if (p) return p;
  p = import('./jar3d').then(({ createJar3D }) => createJar3D(host));
  registry.set(host, p);
  return p;
}
