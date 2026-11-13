/**
 * REVIEW-ONLY Chinese layer (内部审阅用) — deleted at launch.
 * Chinese mirrors for the non-sign tools (8-ball / yes-no / coin), so the
 * whole site can be reviewed in Chinese locally. Signs carry their own zh
 * fields in signs.ts. Draw logic mirrors engine.ts picks (same shapes,
 * same uniform picks) — only the strings differ.
 */
import type { Rand } from '../lib/engine';

export type Tone = 'yes' | 'lean-yes' | 'neutral' | 'lean-no' | 'no';

export interface EightAnswerZh {
  text: string;
  tone: Tone;
  gloss: string;
}

/** 经典 20 答案中文版（与 eightball.ts 同一套，自含挑选逻辑） */
export const EIGHT_BALL_ZH: EightAnswerZh[] = [
  { text: '毫无疑问', tone: 'yes', gloss: '球都这么说了，就不必再装犹豫——缘已定，直接去办。' },
  { text: '确定如此', tone: 'yes', gloss: '答案早已现前，你问的其实是勇气。当下就用掉它。' },
  { text: '不用怀疑', tone: 'yes', gloss: '再验三遍也不会变。把求证的力气，转去行持。' },
  { text: '当然是', tone: 'yes', gloss: '这件事的「不」，从来不在选项里。去做，且不打折扣地做。' },
  { text: '尽管放心去做', tone: 'yes', gloss: '可以押上去的一支。纵有岔子，也在你承受之内。' },
  { text: '依我看，是', tone: 'lean-yes', gloss: '倾向明确，球留一分余地——先迈半步，试试水温。' },
  { text: '很可能', tone: 'lean-yes', gloss: '机缘在你这边。想让它再足一点，就去做手上那件事。' },
  { text: '前景不错', tone: 'lean-yes', gloss: '方向是对的，别让完美主义拖住脚步。先跑起来，再调。' },
  { text: '是', tone: 'yes', gloss: '一字干净利落。配套动作：今天迈出第一步，别让「是」过夜。' },
  { text: '种种迹象都指向「是」', tone: 'yes', gloss: '不是直觉，是证据。把已见的信号列出来，照着走便是。' },
  { text: '有点模糊，再问一次', tone: 'neutral', gloss: '模糊多因问题问大了。拆成更小、更能动手的一问再问。' },
  { text: '稍后再问', tone: 'neutral', gloss: '非不答，是未到时。先补一块信息，明日机缘再问。' },
  { text: '现在先不告诉你', tone: 'neutral', gloss: '球在卖关子，生活亦然。先把这一周过完，答案自会现形。' },
  { text: '现在还算不出来', tone: 'neutral', gloss: '变量未落定。与其反复摇问，不如先推动一个变量落定。' },
  { text: '集中精神，再问一次', tone: 'neutral', gloss: '你问时心里存着三件事。挑那件真正让你夜不能寐的，重问。' },
  { text: '别抱太大指望', tone: 'lean-no', gloss: '非全盘否定，是叫你收注。改走小成本试探的那条路。' },
  { text: '我的回答是「不」', tone: 'no', gloss: '答得干脆，但别只听字面——它拦的是「此刻这个做法」，换个做法再议。' },
  { text: '我查到的消息是「不」', tone: 'no', gloss: '具体的障碍真实存在。找到它、处理它，胜过换个球再问。' },
  { text: '前景不太妙', tone: 'no', gloss: '趋势向下。止损不是认输，是把力气挪到还在生长处。' },
  { text: '十分可疑', tone: 'no', gloss: '红灯在闪。这单先不签、这话先不说、这钱先不动——睡一觉再定。' },
];

export function eightBallZh(rand: Rand): EightAnswerZh {
  return EIGHT_BALL_ZH[Math.floor(rand() * EIGHT_BALL_ZH.length) % EIGHT_BALL_ZH.length];
}

/* ---------- 是与非（中文层） ---------- */

export const YES_WHY_ZH = [
  '答案早已在你心里——你来问，不过求一声「允诺」。',
  '输得起，赢面却大得多。这种不对称本身就是答案。',
  '这几周你收集到的所有信号，都指向同一个方向。',
  '再等一周的代价，已经高过「做错了」的代价。',
];
export const NO_WHY_ZH = [
  '你会来问，是心里已有一部分先举了旗——听它的，那是最先照见的。',
  '拉着你点头的只有沉没成本。沉没成本不是理由。',
  '你现在真正负担得起的那个版本，还不存在。',
  '直觉最先说了不，而且至今没改口。这种稳定值得当回事。',
];
export const YES_NEXT_ZH = [
  '今天就走出看起来不可逆的第一步——它比感觉上可逆得多。',
  '告诉一个人你要做了，让明天的自己没法悄悄反悔。',
  '定一个日期。没有日期的「是」，会烂成「再说吧」。',
];
export const NO_NEXT_ZH = [
  '写下一个真正的「是」需要什么条件，再决定要不要去凑齐它。',
  '给自己一个干脆的「不」，别用慢性的「再说」——今天就把话说完。',
  '把刚省下来的力气，花在你一直偷偷画草稿的备选方案上。',
];

export interface YesNoResultZh {
  answer: '是' | '否';
  why: string;
  next: string;
}

export function yesNoZh(rand: Rand): YesNoResultZh {
  const yes = rand() < 0.5;
  const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length) % arr.length];
  return yes
    ? { answer: '是', why: pick(YES_WHY_ZH), next: pick(YES_NEXT_ZH) }
    : { answer: '否', why: pick(NO_WHY_ZH), next: pick(NO_NEXT_ZH) };
}

/** 抛硬币：正面=是，反面=否 */
export function coinFlipZh(rand: Rand): { side: '正面' | '反面'; answer: '是' | '否' } {
  const heads = rand() < 0.5;
  return heads ? { side: '正面', answer: '是' } : { side: '反面', answer: '否' };
}
