import { describe, expect, it } from 'vitest';
import {
  additionTable,
  decimalPlaceColumns,
  digitAt,
  digitsOf,
  formatUs,
  hundredNumbers,
  isDiagonal,
  multTable,
  numberPeriods,
  periodPhrase,
  periodWords,
  placeFact,
  placeValueColumns,
  readNumberWithPeriods,
  smallNumberWord,
} from './mathCharts';

describe('multTable', () => {
  it('builds the full 1-12 grid with correct products', () => {
    const t = multTable(12);
    expect(t).toHaveLength(12);
    expect(t[0]).toHaveLength(12);
    expect(t[6][7]).toBe(56); // 7 × 8
    expect(t[11][11]).toBe(144); // 12 × 12
    expect(t[0][0]).toBe(1);
  });

  it('extends cleanly to 1-20', () => {
    const t = multTable(20);
    expect(t[19][19]).toBe(400);
    expect(t[14][19]).toBe(300); // 15 × 20
  });

  it('marks the perfect-square diagonal', () => {
    expect(isDiagonal(1, 1)).toBe(true);
    expect(isDiagonal(3, 4)).toBe(false);
  });
});

describe('additionTable', () => {
  it('starts at zero (identity row) and covers facts to 12', () => {
    const t = additionTable(12);
    expect(t).toHaveLength(13);
    expect(t[0][7]).toBe(7); // 0 + 7
    expect(t[12][12]).toBe(24);
  });
});

describe('hundredNumbers', () => {
  it('is 1..100 in order', () => {
    const n = hundredNumbers();
    expect(n).toHaveLength(100);
    expect(n[0]).toBe(1);
    expect(n[99]).toBe(100);
    expect(n[34]).toBe(35);
  });
});

describe('place value columns', () => {
  it('names, powers and periods agree for the standard 7-column chart', () => {
    const cols = placeValueColumns(7);
    expect(cols.map((c) => c.name)).toEqual([
      'ones',
      'tens',
      'hundreds',
      'thousands',
      'ten thousands',
      'hundred thousands',
      'millions',
    ]);
    expect(cols[5].value).toBe(100000);
    expect(cols[5].period).toBe('thousands');
    expect(cols[6].period).toBe('millions');
    expect(cols[0].period).toBe('ones');
  });

  it('formats values with en-US commas', () => {
    expect(formatUs(1000000)).toBe('1,000,000');
    expect(placeValueColumns(7)[6].valueLabel).toBe('1,000,000');
  });

  it('decimal places go tenths -> millionths', () => {
    const cols = decimalPlaceColumns(3);
    expect(cols.map((c) => c.name)).toEqual(['tenths', 'hundredths', 'thousandths']);
    expect(cols[0].valueLabel).toBe('0.1');
    expect(cols[2].valueLabel).toBe('0.001');
  });
});

describe('digits and facts', () => {
  it('extracts digits by power', () => {
    // 4,302,175
    expect(digitAt(4302175, 0)).toBe(5);
    expect(digitAt(4302175, 5)).toBe(3);
    expect(digitAt(4302175, 6)).toBe(4);
    expect(digitsOf(4302175, 7)).toEqual([5, 7, 1, 2, 0, 3, 4]);
  });

  it('builds the interactive fact sentence with the computed value', () => {
    expect(placeFact(3, 'hundred thousands', 5)).toBe(
      'The 3 is in the hundred thousands place — it is worth 300,000.'
    );
  });
});

describe('smallNumberWord', () => {
  it('reads 0-99 in words', () => {
    expect(smallNumberWord(0)).toBe('zero');
    expect(smallNumberWord(7)).toBe('seven');
    expect(smallNumberWord(13)).toBe('thirteen');
    expect(smallNumberWord(42)).toBe('forty-two');
    expect(smallNumberWord(90)).toBe('ninety');
  });
});

describe('periods (the three-digit comma groups)', () => {
  it('reads any 1-999 group the way a period is read', () => {
    expect(periodWords(0)).toBe('zero');
    expect(periodWords(7)).toBe('seven');
    expect(periodWords(42)).toBe('forty-two');
    expect(periodWords(300)).toBe('three hundred');
    expect(periodWords(914)).toBe('nine hundred fourteen');
    expect(periodWords(505)).toBe('five hundred five');
    expect(() => periodWords(1000)).toThrow();
  });

  it('splits a number into its comma periods, highest first', () => {
    expect(numberPeriods(471930862505)).toEqual([
      { name: 'billions', value: 471 },
      { name: 'millions', value: 930 },
      { name: 'thousands', value: 862 },
      { name: 'ones', value: 505 },
    ]);
    // leading empty periods drop; the ones period always stays
    expect(numberPeriods(505)).toEqual([{ name: 'ones', value: 505 }]);
    expect(numberPeriods(0)).toEqual([{ name: 'ones', value: 0 }]);
    expect(() => numberPeriods(1e12)).toThrow();
  });

  it('reads one period group with its name attached', () => {
    expect(periodPhrase(930, 'millions')).toBe('nine hundred thirty million');
    expect(periodPhrase(2, 'billions')).toBe('two billion');
    expect(periodPhrase(175, 'ones')).toBe('one hundred seventy-five');
    expect(() => periodPhrase(5, 'zillions')).toThrow();
  });

  it('reads whole numbers comma by comma (the cluster examples)', () => {
    // the worked example on the periods chart page
    expect(readNumberWithPeriods(471930862505)).toBe(
      'four hundred seventy-one billion, nine hundred thirty million, eight hundred sixty-two thousand, five hundred five',
    );
    // the example number used across the rest of the cluster
    expect(readNumberWithPeriods(4302175)).toBe(
      'four million, three hundred two thousand, one hundred seventy-five',
    );
    // a zero period is skipped, not said
    expect(readNumberWithPeriods(4000175)).toBe('four million, one hundred seventy-five');
    expect(readNumberWithPeriods(0)).toBe('zero');
  });
});
