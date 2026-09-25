/**
 * Zone-studio island tests against the real SSR markup from `astro build`
 * (the cat page). The picker is a fixed bottom sheet appended to the studio
 * root (it used to live inside the zone chip <button>, where clicks on the
 * custom color input bubbled into the chip-toggle branch and tore it down
 * mid-click — the native color dialog never opened). These lock the behavior:
 * sheet clicks are swallowed, the current zone color is echoed (active bead +
 * seeded input), custom hexes apply live (snapped to the nearest bead), and
 * the Use button commits.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';
import { nearestBead } from '../lib/beadPalette';

const htmlPath = resolve(
  fileURLToPath(import.meta.url),
  '../../../dist/perler-bead-animals/cat/index.html',
);

async function loadPage() {
  const html = readFileSync(htmlPath, 'utf8');
  const window = new Window({ url: 'https://tintbrew.com/perler-bead-animals/cat/' });
  const { document } = window;
  document.write(html);
  (globalThis as Record<string, unknown>).document = document;
  (globalThis as Record<string, unknown>).window = window;
  vi.resetModules();
  await import('./bead');
  return { window, document: document as unknown as Document };
}

function fireClick(el: Element) {
  el.dispatchEvent(new (el.ownerDocument!.defaultView!.MouseEvent)('click', { bubbles: true }));
}

function fireInput(el: Element, value: string) {
  (el as HTMLInputElement).value = value;
  el.dispatchEvent(new (el.ownerDocument!.defaultView!.Event)('input', { bubbles: true }));
}

function openPicker(doc: Document) {
  const chip = doc.querySelector(
    '[data-bead-studio] [data-zone]',
  ) as unknown as HTMLButtonElement;
  fireClick(chip);
  const picker = doc.querySelector('[data-bead-studio] .bead-picker');
  expect(picker).toBeTruthy();
  return { chip, picker: picker! };
}

describe('zone studio island (real SSR markup)', () => {
  let ctx: Awaited<ReturnType<typeof loadPage>>;

  beforeEach(async () => {
    ctx = await loadPage();
  });

  it('opening a picker echoes the zone: one active bead, seeded custom input, Use button', () => {
    const { chip, picker } = openPicker(ctx.document);
    expect(picker.querySelectorAll('.picker-bead.active')).toHaveLength(1);
    const input = picker.querySelector('[data-custom]') as HTMLInputElement;
    expect(input.value.toLowerCase()).toBe((chip.dataset.hex ?? '').toLowerCase());
    expect(picker.querySelector('[data-bead-use]')).toBeTruthy();
  });

  it('clicking the custom input or hint does not close the picker (regression)', () => {
    const { picker } = openPicker(ctx.document);
    fireClick(picker.querySelector('[data-custom]')!);
    expect(ctx.document.querySelector('[data-bead-studio] .bead-picker')).toBeTruthy();
    fireClick(picker.querySelector('.picker-hint')!);
    expect(ctx.document.querySelector('[data-bead-studio] .bead-picker')).toBeTruthy();
  });

  it('a custom hex applies live (snapped to the nearest bead) and Use commits and closes', () => {
    const { chip, picker } = openPicker(ctx.document);
    const bead = nearestBead('#ff0000');
    fireInput(picker.querySelector('[data-custom]')!, '#ff0000');

    const key = chip.dataset.zone!;
    const name = chip.querySelector('.zone-bead')!;
    expect(name.textContent).toContain(bead.name);
    expect(
      ctx.document
        .querySelector(`[data-bead-mode="blank"] .bd-blank[data-region="${key}"]`)
        ?.classList.contains('colored'),
    ).toBe(true);

    fireClick(picker.querySelector('[data-bead-use]')!);
    expect(ctx.document.querySelector('[data-bead-studio] .bead-picker')).toBeNull();
    expect(chip.getAttribute('aria-expanded')).toBe('false');
    expect(chip.querySelector('.zone-bead')!.textContent).toContain(bead.name); // state persists
  });
});
