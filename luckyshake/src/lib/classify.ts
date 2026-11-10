/**
 * Custom-question routing (PRODUCT.md 流程规范 v1.2): a question typed in
 * the visitor's own words is answered by the NEAREST lens — the way a real
 * sign-reader works: the fortune is general, the reading is matched to what
 * you actually asked.
 *
 * Heuristic v1, priority love > career > money (relationship words are the
 * most specific, transaction words like "buy" are the most generic and show
 * up inside love/career questions too). No hit -> 'own' (overall reading).
 * Visitors can always switch lenses on the chips — the router is a convenience,
 * not a cage. English words match on word boundaries; Chinese on substrings
 * (\b does not fire between CJK characters).
 */
import type { Focus } from './reading';

/** compile single words to \b regexes; multi-word phrases stay substrings */
function compile(en: string[]): (RegExp | string)[] {
  return en.map((w) =>
    w.includes(' ')
      ? w
      : new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'),
  );
}

const LOVE = compile([
  'love', 'crush', 'boyfriend', 'girlfriend', 'husband', 'wife',
  'fiancé', 'fiance', 'dating', 'relationship', 'marriage', 'marry', 'married',
  'breakup', 'divorce', 'valentine', 'text him', 'text her', 'ask out',
]);
const LOVE_ZH = [
  '恋爱', '爱情', '喜欢', '表白', '追求', '追她', '追他', '挽回', '复合', '分手',
  '结婚', '婚', '对象', '男朋友', '女朋友', '男友', '女友', '老公', '老婆', '前任',
  '相亲', '脱单', '暧昧',
];

const CAREER = compile([
  'job', 'jobs', 'work', 'works', 'working', 'boss', 'manager', 'career',
  'promotion', 'promote', 'interview', 'interviews', 'resume', 'cv', 'quit',
  'resign', 'resignation', 'coworker', 'colleague', 'office', 'startup',
  'business', 'project', 'client', 'clients', 'layoff', 'layoffs', 'fired',
  'hired', 'hire', 'offer', 'degree', 'exam', 'exams', 'thesis', 'internship', 'intern',
]);
const CAREER_ZH = [
  '工作', '职业', '事业', '跳槽', '辞职', '离职', '升职', '晋升', '面试', '简历',
  '老板', '上司', '领导', '同事', '客户', '项目', '生意', '创业', '开店', '考试',
  '考研', '考公', '毕业', '实习', '上班', '打工', '副业',
];

const MONEY = compile([
  'money', 'buy', 'buys', 'buying', 'purchase', 'spend', 'spending', 'spent',
  'expensive', 'afford', 'price', 'prices', 'discount', 'sale', 'invest',
  'investment', 'investing', 'stock', 'stocks', 'crypto', 'bitcoin',
  'lottery', 'lotto', 'ticket', 'tickets', 'gamble', 'gambling', 'bet',
  'betting', 'casino', 'loan', 'loans', 'debt', 'debts', 'save', 'saving',
  'savings', 'salary', 'raise', 'paycheck', 'bills', 'rent', 'mortgage',
  'tax', 'taxes', 'sell', 'selling', 'refund',
]);
const MONEY_ZH = [
  '钱', '财', '买', '投资', '股票', '基金', '彩票', '乐透', '抽奖', '加薪', '工资',
  '薪水', '收入', '债', '贷款', '借钱', '还钱', '花钱', '消费', '报价', '存款',
  '存钱', '房贷', '车贷', '亏', '赚',
];

function hits(qLower: string, en: (RegExp | string)[]): boolean {
  return en.some((m) => (typeof m === 'string' ? qLower.includes(m) : m.test(qLower)));
}

/** Route a custom question to its nearest lens; 'own' = no match, overall reading. */
export function focusForQuestion(q: string): Focus {
  const s = q.toLowerCase();
  if (LOVE_ZH.some((w) => s.includes(w)) || hits(s, LOVE)) return 'love';
  if (CAREER_ZH.some((w) => s.includes(w)) || hits(s, CAREER)) return 'career';
  if (MONEY_ZH.some((w) => s.includes(w)) || hits(s, MONEY)) return 'money';
  return 'own';
}
