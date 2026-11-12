/**
 * Letter-connection teaching data (2026-11-12 engagement batch).
 *
 * Writing one letter is step one; joining it into words is the skill that
 * makes cursive cursive — and it is what the specialist incumbents serve
 * (Inky Letters' connect sections audited 2026-11-12: three join classes per
 * letter + joining-letters worksheets + first words). This file carries the
 * same service for every letter page: where the exit stroke lives, how it
 * hands off to the three following-letter classes, join drills for the
 * printed sheet, and the first words a class writes with the letter.
 *
 * Every note echoes the letter's own taught stroke vocabulary from
 * cursiveLetters.ts (baseline/middle line, exit tail, curve family), and the
 * word examples are real English words showing that exact join.
 */

export interface ConnectionGroup {
  /** The following letters in this class, display form: 'a, c, e, g, o, q'. */
  letters: string;
  /** How the letter's exit hands off to this class — one sentence, with a
   *  real English word showing the join where one exists. */
  note: string;
}

export interface LetterConnections {
  /** Where this letter's exit stroke lives and what that means for joins. */
  summary: string;
  /** Exactly three classes: the round letters, the tall letters, the rest. */
  groups: ConnectionGroup[];
  /** Two-letter join drills printed on the sheet's connect row. */
  drills: string[];
  /** First words to write with the letter — the model line on the sheet. */
  words: string[];
  /** Overrides the default "First words" label (used for x, whose words mix positions). */
  wordsLabel?: string;
}

const ROUND = 'a, c, e, g, o, q';
const TALL = 'b, d, h, k, l, t';

export const connections: Record<string, LetterConnections> = {
  a: {
    summary:
      'The lowercase a exits at the baseline with a small rightward tail — the join happens right there on the line, no climbing required.',
    groups: [
      { letters: ROUND, note: 'Let the tail rise straight into the next curve-family opening — a·o and a·g read as one continuous swing.' },
      { letters: TALL, note: 'Feed the tail into the tall letter\'s entry sweep, so a·b and a·l feel like one upward motion into the loop.' },
      { letters: 'the short letters and descenders', note: 'Keep the tail on the baseline and arc into short letters (a·m, a·n); before j, p, y, z the next stroke dives away from your hand-off (a·y in away).' },
    ],
    drills: ['ad', 'am', 'at', 'an'],
    words: ['and', 'am', 'at', 'ask', 'art', 'ant'],
  },
  b: {
    summary:
      'b is a high-exit letter: the stroke leaves from the top of the bowl at the middle line, so every b join starts from up high.',
    groups: [
      { letters: ROUND, note: 'From the bowl top, let the stroke drift down into the next letter\'s opening curve — b·a and b·o join high-to-low in one fall.' },
      { letters: TALL, note: 'The hand-off rides at the middle line — carry it across so b·l and b·h keep the tall line unbroken between them.' },
      { letters: 'the short letters and descenders', note: 'Descend from the bowl top into short letters (b·e in be, b·u in but); into y the fall becomes the descender\'s dive (b·y in by).' },
    ],
    drills: ['ba', 'be', 'bo', 'bu'],
    words: ['bat', 'big', 'box', 'ball', 'bed', 'bus'],
  },
  c: {
    summary:
      'c exits at the baseline with a small tail — leave the curve open enough to hand off, and the join is free.',
    groups: [
      { letters: ROUND, note: 'The tail swings up into the next curve opening — c·a and c·o are one motion, not two letters.' },
      { letters: TALL, note: 'Let the exit sweep up into the tall loop — c·h and c·l should feel like the c\'s curve simply keeps growing.' },
      { letters: 'the short letters and descenders', note: 'Keep the tail low and arc into the short letters (c·u in cup, c·i in city); descenders (c·y in fancy) drop away from the hand-off.' },
    ],
    drills: ['ca', 'co', 'ch', 'cl'],
    words: ['cat', 'can', 'cup', 'come', 'car', 'cake'],
  },
  d: {
    summary:
      'd exits from the top of its stem, exactly like b — the join leaves from the top line and slides down into whatever comes next.',
    groups: [
      { letters: ROUND, note: 'From the stem top, glide down into the next round opening — d·o and d·a run downhill into the curve.' },
      { letters: TALL, note: 'Keep the hand-off high and pass it across — d·l and d·h hold the tall line between the two letters.' },
      { letters: 'the short letters and descenders', note: 'Slide from the stem top into short letters (d·i in did, d·u in duck); into y the descent becomes the dive (d·y in lady).' },
    ],
    drills: ['da', 'de', 'do', 'du'],
    words: ['dog', 'day', 'did', 'down', 'desk', 'door'],
  },
  e: {
    summary:
      'e exits at the baseline out of the loop\'s bottom — one of the easiest hand-offs in the alphabet.',
    groups: [
      { letters: ROUND, note: 'The loop\'s exit feeds straight into the next curve — e·a in each and e·o in people flow without a pause.' },
      { letters: TALL, note: 'Swing the exit up into the tall stem — e·l and e·b climb right out of the loop.' },
      { letters: 'the short letters and descenders', note: 'Baseline arc into short letters (e·m in remember, e·n in enter); descenders (e·y in they) drop from the line.' },
    ],
    drills: ['ea', 'el', 'em', 'en'],
    words: ['end', 'egg', 'eat', 'elf', 'elm', 'even'],
  },
  f: {
    summary:
      'f is the one low-exit letter: the join leaves from below the baseline, out of the long tail — everything after f has to climb.',
    groups: [
      { letters: ROUND, note: 'From the tail, rise into the next curve\'s opening — f·a and f·o climb out of the descender in one swing.' },
      { letters: TALL, note: 'The climb is longer: swing from below the line straight up into the tall loop (f·l, f·b) without braking at the baseline.' },
      { letters: 'the short letters and descenders', note: 'The tail hands off low, so short letters arc away from it (f·u in fun, f·i in fill) — the arc starts below the line.' },
    ],
    drills: ['fa', 'fe', 'fl', 'fr'],
    words: ['fun', 'for', 'fan', 'fall', 'fish', 'farm'],
  },
  g: {
    summary:
      'g\'s exit returns to the baseline above its tail — the dive is finished before the join starts, so g connects like any baseline letter.',
    groups: [
      { letters: ROUND, note: 'From the baseline, swing up into the next curve opening — g·o and g·a come back to life right at the line.' },
      { letters: TALL, note: 'Let the recovered tail feed the tall entry — g·l in glow is the showcase join.' },
      { letters: 'the short letters and descenders', note: 'Arc along the baseline into short letters (g·i in gift, g·u in gum); descenders drop away from the hand-off.' },
    ],
    drills: ['ga', 'go', 'gl', 'gu'],
    words: ['get', 'go', 'game', 'gift', 'green', 'grass'],
  },
  h: {
    summary:
      'h exits at the baseline after its second leg — a clean, low hand-off with nothing hanging over it.',
    groups: [
      { letters: ROUND, note: 'The tail rises into the next curve opening (h·a, h·o) — two shapes, one swing.' },
      { letters: TALL, note: 'Hand the tail to the next tall stem — h·t in night and h·l keep the height continuous.' },
      { letters: 'the short letters and descenders', note: 'Arc into the short letters (h·i in him, h·u in hug); descenders drop from the line as soon as the hand-off lands.' },
    ],
    drills: ['ha', 'he', 'ho', 'hu'],
    words: ['he', 'hat', 'his', 'has', 'help', 'home'],
  },
  i: {
    summary:
      'i exits at the baseline with a small tail — and its dot goes on after the word, so the join never waits for the dot.',
    groups: [
      { letters: ROUND, note: 'The tail rises into the curve-family opening (i·o in lion, i·c in music) — one swing, two letters.' },
      { letters: TALL, note: 'Lift the exit into the tall stem — i·t in it is i\'s daily partner and should be the smoothest join you own.' },
      { letters: 'the short letters and descenders', note: 'Baseline arc into the short letters (i·m, i·n) — the most common joins in the language; descenders (i·p?) are rare, and the arc stays low.' },
    ],
    drills: ['it', 'in', 'is', 'im'],
    words: ['it', 'in', 'is', 'if', 'its', 'ink'],
  },
  j: {
    summary:
      'j\'s tail hooks back to the baseline, so the join starts on the line while the dot waits above until the word is done.',
    groups: [
      { letters: ROUND, note: 'Swing from the recovered tail into the next curve opening (j·a in jam, j·e in jet).' },
      { letters: TALL, note: 'Tall letters after j are rare in English words — when one happens, climb from the tail into the loop in one motion and don\'t stop at the line.' },
      { letters: 'the short letters and descenders', note: 'Baseline arc into short letters (j·u in jump) — descenders almost never follow j, so the arc stays at the line.' },
    ],
    drills: ['ja', 'je', 'jo', 'ju'],
    words: ['jet', 'jam', 'jog', 'jump', 'just', 'joke'],
  },
  k: {
    summary:
      'k exits from its knot at the middle line — joins leave from the middle of the letter, not the baseline.',
    groups: [
      { letters: ROUND, note: 'From the knot, glide down into the next curve opening — k·e in keep runs downhill from the middle line.' },
      { letters: TALL, note: 'Carry the knot\'s height across to the next tall stem — the two letters share the top line even though k\'s exit starts lower.' },
      { letters: 'the short letters and descenders', note: 'Descend from the knot into short letters (k·i in kid, k·n in know — the silent-k join is a showcase); descenders (k·y in sky) catch the fall.' },
    ],
    drills: ['ka', 'ke', 'ki', 'kn'],
    words: ['kid', 'kit', 'key', 'kind', 'kick', 'keep'],
  },
  l: {
    summary:
      'l exits at the baseline after its tall loop — the join leaves the bottom of a very tall letter with a fresh small tail.',
    groups: [
      { letters: ROUND, note: 'The tail rises into the next curve opening (l·o, l·a) — the loop\'s downstroke feeds it directly.' },
      { letters: TALL, note: 'The join to write beautifully is l·l in belly: both loops must come out the same height, and the hand-off never drops below the line.' },
      { letters: 'the short letters and descenders', note: 'Baseline arc into short letters (l·i in lip, l·u in luck); descenders (l·y in silly) drop away from the line.' },
    ],
    drills: ['la', 'le', 'lo', 'll'],
    words: ['let', 'look', 'like', 'love', 'leaf', 'light'],
  },
  m: {
    summary:
      'm exits at the baseline after its second hump — a routine hand-off that quietly closes most words it appears in.',
    groups: [
      { letters: ROUND, note: 'The tail rises into the next curve opening (m·e in me, m·o in mop).' },
      { letters: TALL, note: 'Feed the tall stem from the line — m·b in comb and m·t in most are the workhorse joins.' },
      { letters: 'the short letters and descenders', note: 'Arc into short letters (m·u in much); descenders (m·p in jump) dive straight from the hand-off.' },
    ],
    drills: ['ma', 'me', 'mo', 'mu'],
    words: ['me', 'my', 'man', 'map', 'more', 'must'],
  },
  n: {
    summary:
      'n exits at the baseline after its arch — the same grammar as m with one hump fewer.',
    groups: [
      { letters: ROUND, note: 'The tail rises into the curve opening (n·e in net, n·o in no) — the most common join n ever makes.' },
      { letters: TALL, note: 'Hand off to the tall stem — n·t in not and n·d in and are two of the highest-frequency joins in English.' },
      { letters: 'the short letters and descenders', note: 'Arc into short letters (n·i in nine, n·u in number); descenders (n·y in any) drop from the line.' },
    ],
    drills: ['na', 'ne', 'nt', 'nd'],
    words: ['no', 'new', 'now', 'net', 'next', 'night'],
  },
  o: {
    summary:
      'o is a high-exit letter like b: the stroke leaves from the top of the circle, so o joins start at the middle line.',
    groups: [
      { letters: ROUND, note: 'Descend from the circle top into the next curve\'s opening — o·a in boat and o·e in shoe run high-to-low.' },
      { letters: TALL, note: 'From the top, sweep across to the tall stem — o·l in old and o·b in obey keep the top line busy.' },
      { letters: 'the short letters and descenders', note: 'Slide from the top into short letters (o·n in on, o·x in ox); descenders (o·y in toy) aim their dive from up high.' },
    ],
    drills: ['oa', 'ol', 'on', 'ox'],
    words: ['on', 'ox', 'old', 'one', 'over', 'open'],
  },
  p: {
    summary:
      'p\'s exit returns to the baseline above its dive, like g — the descender is finished before the join begins.',
    groups: [
      { letters: ROUND, note: 'Swing from the recovered baseline into the next curve opening (p·a in pan, p·o in pop).' },
      { letters: TALL, note: 'Lift the tail into the tall loop — p·l in play is the showcase and should feel like the letter keeps rising.' },
      { letters: 'the short letters and descenders', note: 'Arc into short letters (p·i in pig, p·u in push); descenders (p·y in happy) dive from the same hand-off.' },
    ],
    drills: ['pa', 'pe', 'pi', 'pl'],
    words: ['pan', 'pen', 'pig', 'pop', 'put', 'play'],
  },
  q: {
    summary:
      'q\'s exit IS the cross-back over its stem — the join starts from that little horizontal swing at the baseline.',
    groups: [
      { letters: ROUND, note: 'Round letters after q are rare in English — when one appears, curve from the cross-back into its opening without re-dipping the pen.' },
      { letters: TALL, note: 'Tall letters after q are rare too; the cross-back simply rises into the tall stem in the same motion.' },
      { letters: 'the short letters and descenders', note: 'The cross-back flows into u almost every time — q·u in quick, quilt, queen is the pair to drill until it is one reflex.' },
    ],
    drills: ['qu', 'qa', 'qo', 'qe'],
    words: ['quiz', 'quilt', 'quick', 'queen', 'quiet', 'quart'],
  },
  r: {
    summary:
      'r exits at the baseline after its small shoulder — a modest hand-off that keeps the words it sits in airy.',
    groups: [
      { letters: ROUND, note: 'The tail rises into the curve opening (r·e in red, r·o in road) — keep the shoulder small so the rise has room.' },
      { letters: TALL, note: 'Feed the tall stem from the line — r·t in art and r·d in card are the standard clusters.' },
      { letters: 'the short letters and descenders', note: 'Arc into short letters (r·u in run, r·i in rip); descenders (r·y in try) drop straight from the hand-off.' },
    ],
    drills: ['ra', 're', 'rt', 'rd'],
    words: ['run', 'red', 'ran', 'rug', 'rain', 'right'],
  },
  s: {
    summary:
      's exits flat along the baseline — the hook\'s tail is short, so its joins stay tight and close to the line.',
    groups: [
      { letters: ROUND, note: 'Rise from the flat exit into the next curve opening (s·o in so, s·e in set) — no slack in the tail.' },
      { letters: TALL, note: 'Swing up into the tall stem — s·t in stop is the classic cluster and s·l in slow runs the same move.' },
      { letters: 'the short letters and descenders', note: 'Keep the arc low into short letters (s·i in sit, s·u in sun); descenders (s·p in spy) dive from the line.' },
    ],
    drills: ['sa', 'se', 'st', 'sl'],
    words: ['see', 'say', 'sit', 'sun', 'six', 'some'],
  },
  t: {
    summary:
      't exits at the baseline under its crossbar — and the cross waits until the whole word is written, joins included.',
    groups: [
      { letters: ROUND, note: 'Let the tail glide into the next curve opening — t·o and t·a in table are one continuous swing.' },
      { letters: TALL, note: 'Raise the exit into the tall stem — t·h in the and t·l in little should read as one climb.' },
      { letters: 'the short letters and descenders', note: 'Keep the end stroke soft into short letters (t·i in time, t·u in turn); descenders (t·y in try) drop from the line.' },
    ],
    drills: ['ta', 'te', 'to', 'th'],
    words: ['to', 'the', 'ten', 'top', 'tub', 'two'],
  },
  u: {
    summary:
      'u exits at the baseline after its second downstroke — watch that the exit stays a small tail, not a third cup.',
    groups: [
      { letters: ROUND, note: 'Round letters after u usually start a fresh syllable — hand off at the baseline and let their curve open cleanly.' },
      { letters: TALL, note: 'Climb into the tall stem — u·b in tub is the everyday case.' },
      { letters: 'the short letters and descenders', note: 'Arc into short letters (u·n in under, u·m in gum); descenders (u·p in up) dive straight from the tail.' },
    ],
    drills: ['ub', 'un', 'um', 'up'],
    words: ['up', 'us', 'use', 'under', 'upon', 'uncle'],
  },
  v: {
    summary:
      'v exits from the middle line, back up out of its valley — joins leave from on high, like o and b.',
    groups: [
      { letters: ROUND, note: 'Descend from the exit into the next curve\'s opening (v·a in van, v·e in very) — the fall is the join.' },
      { letters: TALL, note: 'Tall letters after v are uncommon — when one comes, glide the exit across at the middle line so the tall stem grows out of it.' },
      { letters: 'the short letters and descenders', note: 'Slide down into short letters (v·i in visit); descenders (v·y in heavy) catch the descent and dive.' },
    ],
    drills: ['va', 've', 'vi', 'vy'],
    words: ['van', 'vet', 'very', 'visit', 'vine', 'voice'],
  },
  w: {
    summary:
      'w exits from the middle line after its second valley — the hand-off is high, and the two valleys must come out twins.',
    groups: [
      { letters: ROUND, note: 'Descend into the next curve opening (w·a in was, w·e in we) — the drop from the valley top is the join.' },
      { letters: TALL, note: 'Sweep across at the middle line into the tall stem — tall letters after w are rare, so keep the exit sweep ready.' },
      { letters: 'the short letters and descenders', note: 'Slide into short letters (w·i in will, w·n in down); descenders dive from the same high hand-off.' },
    ],
    drills: ['wa', 'we', 'wi', 'wn'],
    words: ['we', 'will', 'went', 'with', 'wish', 'water'],
  },
  x: {
    summary:
      'x is the only letter built from two strokes, and the second stroke IS the exit — the connection flows straight through the crossing.',
    groups: [
      { letters: ROUND, note: 'Round letters after x are rare in English; keep the second stroke\'s tail alive and let it rise into the curve when one comes.' },
      { letters: TALL, note: 'The exit rises into the tall stem — x·t in next is the standard build.' },
      { letters: 'the short letters and descenders', note: 'x usually ends a word (fox, six), so its joins matter inside longer builds mostly — keep the exit flowing out of the crossing rather than stopping dead.' },
    ],
    drills: ['xa', 'xe', 'xi', 'xt'],
    words: ['box', 'fox', 'six', 'wax', 'X-ray', 'xylophone'],
    wordsLabel: 'Words where x shows up',
  },
  y: {
    summary:
      'y\'s descender scoops back to the baseline, so the join happens on the line after the dive is fully finished.',
    groups: [
      { letters: ROUND, note: 'Swing from the recovered tail into the next curve opening — y·o in yo-yo is the playful drill.' },
      { letters: TALL, note: 'Tall letters after y are rare — climb from the recovered tail into the loop in one motion.' },
      { letters: 'the short letters and descenders', note: 'Arc into short letters (y·u in you) — a descender never follows y, because y is already the dive.' },
    ],
    drills: ['ya', 'ye', 'yo', 'yu'],
    words: ['yes', 'yet', 'you', 'yell', 'yarn', 'yellow'],
  },
  z: {
    summary:
      'z exits at the baseline off its flat bottom swing — the join leaves from a lying-down stroke, which makes z joins look slow if you hesitate.',
    groups: [
      { letters: ROUND, note: 'The swing\'s tail rises into the next curve opening (z·o in zoo, z·e in size) — keep the swing moving.' },
      { letters: TALL, note: 'Tall letters after z are rare — let the flat swing feed the tall stem in the same motion.' },
      { letters: 'the short letters and descenders', note: 'Arc into short letters (z·i in zip, z·u in buzzard); descenders are rare after z, so the arc is the join to own.' },
    ],
    drills: ['za', 'ze', 'zi', 'zo'],
    words: ['zip', 'zoo', 'zap', 'zigzag', 'zero', 'zebra'],
  },
};
