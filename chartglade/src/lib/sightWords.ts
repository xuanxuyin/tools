/**
 * Dolch sight-word lists (220 words across 5 levels) and the Fry first-100
 * instant words, in standard order. Public-domain lists, verbatim.
 *
 * Grade mapping used across the site:
 *   preschool  -> pre-primer (40)
 *   kindergarten -> primer (52)
 *   1st-3rd grade -> first/second/third (41/46/41)
 */

export const dolch = {
  preprimer: [
    'a', 'and', 'away', 'big', 'blue', 'can', 'come', 'down', 'find', 'for', 'funny', 'go',
    'help', 'here', 'I', 'in', 'is', 'it', 'jump', 'little', 'look', 'make', 'me', 'my',
    'not', 'one', 'play', 'red', 'run', 'said', 'see', 'the', 'three', 'to', 'two', 'up',
    'we', 'where', 'yellow', 'you',
  ],
  primer: [
    'all', 'am', 'are', 'at', 'ate', 'be', 'black', 'brown', 'but', 'came', 'did', 'do',
    'eat', 'four', 'get', 'good', 'have', 'he', 'into', 'like', 'must', 'new', 'no', 'now',
    'on', 'our', 'out', 'please', 'pretty', 'ran', 'ride', 'saw', 'say', 'she', 'so', 'soon',
    'that', 'there', 'they', 'this', 'too', 'under', 'was', 'want', 'well', 'went', 'what',
    'white', 'who', 'will', 'with', 'yes',
  ],
  first: [
    'after', 'again', 'an', 'any', 'as', 'ask', 'by', 'could', 'every', 'fly', 'from', 'give',
    'going', 'had', 'has', 'her', 'him', 'his', 'how', 'just', 'know', 'let', 'live', 'may',
    'of', 'old', 'once', 'open', 'over', 'put', 'round', 'some', 'stop', 'take', 'thank',
    'them', 'then', 'think', 'walk', 'were', 'when',
  ],
  second: [
    'always', 'around', 'because', 'been', 'before', 'best', 'both', 'buy', 'call', 'cold',
    'does', "don't", 'fast', 'first', 'five', 'found', 'gave', 'goes', 'green', 'its', 'made',
    'many', 'off', 'or', 'pull', 'read', 'right', 'sing', 'sit', 'sleep', 'tell', 'their',
    'these', 'those', 'upon', 'us', 'use', 'very', 'wash', 'which', 'why', 'wish', 'work',
    'would', 'write', 'your',
  ],
  third: [
    'about', 'better', 'bring', 'carry', 'clean', 'cut', 'done', 'draw', 'drink', 'eight',
    'fall', 'far', 'full', 'got', 'grow', 'hold', 'hot', 'hurt', 'if', 'keep', 'kind',
    'laugh', 'light', 'long', 'much', 'myself', 'never', 'only', 'own', 'pick', 'seven',
    'shall', 'show', 'six', 'small', 'start', 'ten', 'today', 'together', 'try', 'warm',
  ],
} as const;

/** Fry instant words, first hundred, standard order (frequency-ranked). */
export const fryFirst100: string[] = [
  'the', 'of', 'and', 'a', 'to', 'in', 'is', 'you', 'that', 'it', 'he', 'was', 'for', 'on',
  'are', 'as', 'with', 'his', 'they', 'I', 'at', 'be', 'this', 'have', 'from', 'or', 'one',
  'had', 'by', 'word', 'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can',
  'said', 'there', 'use', 'an', 'each', 'which', 'she', 'do', 'how', 'their',
  'if', 'will', 'up',
  'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her', 'would',
  'make', 'like', 'him', 'into', 'time', 'has', 'look', 'two', 'more', 'write', 'go', 'see',
  'number', 'no', 'way', 'could', 'people', 'my', 'than', 'first', 'water', 'been', 'call',
  'who', 'oil', 'its', 'now', 'find', 'long', 'down', 'day', 'did', 'get', 'come', 'made',
  'may', 'part',
];

export type DolchLevel = keyof typeof dolch;

export const dolchLevels: { key: DolchLevel; label: string; slug: string }[] = [
  { key: 'preprimer', label: 'Pre-Primer (Preschool)', slug: 'preschool-sight-words' },
  { key: 'primer', label: 'Primer (Kindergarten)', slug: 'kindergarten-sight-words' },
  { key: 'first', label: 'First Grade', slug: 'first-grade-sight-words' },
  { key: 'second', label: 'Second Grade', slug: 'second-grade-sight-words' },
  { key: 'third', label: 'Third Grade', slug: 'third-grade-sight-words' },
];

export function wordsFor(level: DolchLevel): string[] {
  return [...dolch[level]];
}

/** Chunk a list into rows of n (for card grids that print in tidy rows). */
export function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

export const dolchTotal = Object.values(dolch).reduce((sum, list) => sum + list.length, 0);
