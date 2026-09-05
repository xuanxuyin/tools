import { describe, expect, it } from 'vitest';
import { chunk, dolch, dolchLevels, dolchTotal, fryFirst100 } from './sightWords';

describe('Dolch lists', () => {
  it('has the canonical counts: 40/52/41/46/41 = 220', () => {
    expect(dolch.preprimer).toHaveLength(40);
    expect(dolch.primer).toHaveLength(52);
    expect(dolch.first).toHaveLength(41);
    expect(dolch.second).toHaveLength(46);
    expect(dolch.third).toHaveLength(41);
    expect(dolchTotal).toBe(220);
  });

  it('has no duplicates within a level', () => {
    for (const list of Object.values(dolch)) {
      expect(new Set(list).size).toBe(list.length);
    }
  });

  it('starts and ends with the canonical words', () => {
    expect(dolch.preprimer[0]).toBe('a');
    expect(dolch.preprimer[39]).toBe('you');
    expect(dolch.primer[0]).toBe('all');
    expect(dolch.primer[51]).toBe('yes');
    expect(dolch.third[40]).toBe('warm');
  });

  it('maps five levels to five grade slugs', () => {
    expect(dolchLevels).toHaveLength(5);
    const slugs = dolchLevels.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(5);
  });
});

describe('Fry first hundred', () => {
  it('has exactly 100 unique words in standard order', () => {
    expect(fryFirst100).toHaveLength(100);
    expect(new Set(fryFirst100).size).toBe(100);
    expect(fryFirst100.slice(0, 10)).toEqual([
      'the', 'of', 'and', 'a', 'to', 'in', 'is', 'you', 'that', 'it',
    ]);
    expect(fryFirst100[99]).toBe('part');
  });
});

describe('chunk', () => {
  it('splits into printable rows', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([], 3)).toEqual([]);
  });
});
