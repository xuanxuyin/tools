/**
 * Zodiac layer for /horoscope/{slug}/ — the SHARED daily fortune read through
 * each sign's temperament (gap-vs-bigplayers.md action #2: the "daily fortune
 * for {sign}" queries are all served by 12-way splits; we keep one fortune for
 * everyone and write each sign's READ of it — our library stays shared, the
 * framing is the sign's own).
 * intros are hand-written, EN + ZH review mirror.
 */
export interface ZodiacSign {
  slug: string;
  name: string;
  nameZh: string;
  symbol: string;
  dates: string;
  datesZh: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  intro: string;
  introZh: string;
}

export const ZODIAC: ZodiacSign[] = [
  {
    slug: 'aries', name: 'Aries', nameZh: '白羊座', symbol: '♈', dates: 'Mar 21 – Apr 19', datesZh: '3月21日 – 4月19日', element: 'fire',
    intro: 'A shared fortune is a starting gun to you — most people need a push, and you need a leash. Read the action step first; the rest is context. Your rare failure is not starting, it is the second week, so take the one small step today, not the ten-step plan.',
    introZh: '对别人是签，对你是发令枪——大多数人缺的是推力，你缺的是缰绳。先读行动那一步，其余都是背景。你难得的不是开始，是第二周；所以今天只取那一小步，别取十步计划。',
  },
  {
    slug: 'taurus', name: 'Taurus', nameZh: '金牛座', symbol: '♉', dates: 'Apr 20 – May 20', datesZh: '4月20日 – 5月20日', element: 'earth',
    intro: 'You read a fortune the way you read a contract — slowly, twice, with an eye on what it costs. Good. The money lens speaks your language today; let the love lens surprise you. What this sign calls patience, the faster signs call luck.',
    introZh: '你读签像读合同——慢，两遍，盯着成本。这很好。今天财运那一栏说的是你的母语，感情那一栏会给你惊喜；这支签叫耐心，性子快的签叫运气。',
  },
  {
    slug: 'gemini', name: 'Gemini', nameZh: '双子座', symbol: '♊', dates: 'May 21 – Jun 20', datesZh: '5月21日 – 6月20日', element: 'air',
    intro: 'Two minds, one fortune. You will want to read it as both the optimist and the cynic — fine, that is a feature. Say the verdict out loud once: the version you did not stumble over is the one you actually believe.',
    introZh: '两个脑子读同一支签——乐观的那个和刻薄的那个都想过一遍，这本是你的天赋。把判词大声念一次：没磕绊的那个版本，才是你真信的。',
  },
  {
    slug: 'cancer', name: 'Cancer', nameZh: '巨蟹座', symbol: '♋', dates: 'Jun 21 – Jul 22', datesZh: '6月21日 – 7月22日', element: 'water',
    intro: 'You will feel this fortune before you parse it — trust the first flinch, then check it against the words. The love lens is your home water, but the action step is where today actually moves. Read it with someone; shared readings stick better for you.',
    introZh: '你会先感觉到这支签，再读懂它——信第一下，再用文字核对。感情栏是你的主场，但今天真正挪动你的是那一小步；拉上一个人一起读，你的签要分享才留得住。',
  },
  {
    slug: 'leo', name: 'Leo', nameZh: '狮子座', symbol: '♌', dates: 'Jul 23 – Aug 22', datesZh: '7月23日 – 8月22日', element: 'fire',
    intro: 'A fortune shared with everyone might feel small to you — you want the one with your name on it. It has one: your name is in how you stage it. Read the career lens like a spotlight cue and the action step like an opening night.',
    introZh: '所有人同一支签，你可能嫌它不够“专属”——其实专属的部分在你怎么把它活出来。把事业栏当聚光灯提示来读，把行动那一步当首演之夜。',
  },
  {
    slug: 'virgo', name: 'Virgo', nameZh: '处女座', symbol: '♍', dates: 'Aug 23 – Sep 22', datesZh: '8月23日 – 9月22日', element: 'earth',
    intro: 'You will be tempted to grade this fortune — the writing, the logic, the odds. Notice that, then read it once for content. The one small step was written for the person who improves things quietly; that is you on your best days.',
    introZh: '你会先给这支签打分——文笔、逻辑、概率。打完分，再为内容读一遍。那一小步，是写给默默把事情改好的人的；那是你状态最好的样子。',
  },
  {
    slug: 'libra', name: 'Libra', nameZh: '天秤座', symbol: '♎', dates: 'Sep 23 – Oct 22', datesZh: '9月23日 – 10月22日', element: 'air',
    intro: 'You did not draw this to decide for you — you drew it for a second opinion, which is exactly what it is for. Read both the yes-ish and the no-ish lenses before you weigh in: holding both is your gift, holding them forever is your risk. The step is small on purpose.',
    introZh: '你来抽签不是要它替你决定——是要个第二意见，而它正好就是这个用途。把偏是的和偏否的两栏都读完再下判断：端得住两边是你的天赋，端一辈子是你的风险。所以那一步才故意这么小。',
  },
  {
    slug: 'scorpio', name: 'Scorpio', nameZh: '天蝎座', symbol: '♏', dates: 'Oct 23 – Nov 21', datesZh: '10月23日 – 11月21日', element: 'water',
    intro: 'One reading and you are already three layers deep — what it says, what it hides, why it says it that way. Fine, but come up for air: a verdict is meant to be used, not solved. What this sign calls depth, other signs call a Tuesday.',
    introZh: '别人读一层，你已经到第三层——它说了什么、藏了什么、为什么这样说。可以，但要浮上来换气：判词是拿来用的，不是拿来破案的。这支签叫深度，别的签叫周二。',
  },
  {
    slug: 'sagittarius', name: 'Sagittarius', nameZh: '射手座', symbol: '♐', dates: 'Nov 22 – Dec 21', datesZh: '11月22日 – 12月21日', element: 'fire',
    intro: 'A shared fortune is a map with one road on it, and you are already eyeing the side trails. Read the action step as a direction, not a fence — the sign sets the weather, you pick the route. Just be back by tomorrow’s reading.',
    introZh: '一支人人相同的签，在你眼里是一张只有一条路的地图——而你已经开始看岔路了。把行动那步当方向，别当围栏：签定天气，你选路线。明天的签出来前赶回来就行。',
  },
  {
    slug: 'capricorn', name: 'Capricorn', nameZh: '摩羯座', symbol: '♑', dates: 'Dec 22 – Jan 19', datesZh: '12月22日 – 1月19日', element: 'earth',
    intro: 'You will read this like a quarterly report: grade, outlook, action item. Efficient — and it works. Just do not skip the love lens because it does not file neatly; the sturdiest things in your year rarely start inside the plan.',
    introZh: '你会把这支签当季报读：评级、展望、行动项。高效，而且有效。只是别因为感情栏不好归档就跳过它——你这一年最结实的东西，往往不在计划里起头。',
  },
  {
    slug: 'aquarius', name: 'Aquarius', nameZh: '水瓶座', symbol: '♒', dates: 'Jan 20 – Feb 18', datesZh: '1月20日 – 2月18日', element: 'air',
    intro: 'Everyone got this same fortune, which means the interesting part is what you do differently with it. Read it once as written, once as if you wrote it. The action step scales better in your hands than in most.',
    introZh: '所有人拿到同一支签，有意思的部分是你能拿它做出什么不一样的。先照原文读一遍，再当它是你自己写的读一遍。那一小步，到了你手上比别人手上更放大。',
  },
  {
    slug: 'pisces', name: 'Pisces', nameZh: '双鱼座', symbol: '♓', dates: 'Feb 19 – Mar 20', datesZh: '2月19日 – 3月20日', element: 'water',
    intro: 'This fortune will mean three things by sunset, and all three will be true — your sign reads in watercolors. Let the first reading be the official one; the others are commentary. The love lens speaks softly today; turn it up.',
    introZh: '这支签到日落时会有三个意思，而且三个都对——你的签是水彩画的。以第一遍为准，其余算批注。今天感情栏声音很轻，把它调大一点。',
  },
];
