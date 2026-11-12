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
    intro: 'A shared fortune is a starting gun — most folks need a push; you need a leash. Do what you always do with instructions: read the action step first, skim the rest. Your weak spot was never starting, it’s week two. So take the one small step today, and skip the ten-step plan.',
    introZh: '对别人是签，对你是发令枪——众人缺的是推力，你缺的是缰绳。读签如读行军令：先取行动那一步，其余权当注脚。你难得的不是开始，是第二周仍肯持守；今日只取一小步，莫取十步之图。',
  },
  {
    slug: 'taurus', name: 'Taurus', nameZh: '金牛座', symbol: '♉', dates: 'Apr 20 – May 20', datesZh: '4月20日 – 5月20日', element: 'earth',
    intro: 'You read a fortune the way you read a lease — slowly, twice, watching the fine print. That’s the skill. The money lens speaks your language today; let the love lens catch you off guard. Faster signs call it luck. Your sign calls it patience — and patience compounds.',
    introZh: '你读签如读契约——慢读两遍，先看小字里藏着什么。这便是你的功力。今日财运一栏说的是你的母语；感情一栏，且让它给你意外。快签谓之运气，你的签谓之耐心——而耐心最经得起复利。',
  },
  {
    slug: 'gemini', name: 'Gemini', nameZh: '双子座', symbol: '♊', dates: 'May 21 – Jun 20', datesZh: '5月21日 – 6月20日', element: 'air',
    intro: 'Two minds, one fortune. You’ll want to read it as both the optimist and the cynic — fine, that’s the feature, not the bug. Say the verdict out loud once: whichever version you don’t stumble over is the one you actually believe.',
    introZh: '一签两心读——乐观的你与刻薄的你各过一遍，这不是分心，是你的天赋。把判词出声念一次：没磕绊的那个版本，才是你真信的。',
  },
  {
    slug: 'cancer', name: 'Cancer', nameZh: '巨蟹座', symbol: '♋', dates: 'Jun 21 – Jul 22', datesZh: '6月21日 – 7月22日', element: 'water',
    intro: 'You’ll feel this fortune before you parse it — trust the first flinch, then check it against the words. Love is your home water, but the action step is what actually moves today. Read it with someone; your sign keeps what it shares.',
    introZh: '你会先感觉到这支签，再读懂它——信第一下心头一动，再以文字核对。感情栏是你的主场，今日真正挪动你的是那一小步；拉一个人同读——你的签，分享了才留得住。',
  },
  {
    slug: 'leo', name: 'Leo', nameZh: '狮子座', symbol: '♌', dates: 'Jul 23 – Aug 22', datesZh: '7月23日 – 8月22日', element: 'fire',
    intro: 'A fortune everyone shares can feel small to you — you want the one with your name on it. Here’s the thing: your name is in the staging. Read the career lens as a spotlight cue and the action step as opening night.',
    introZh: '人人同得一签，你或嫌它不够专属——其实专属处，在你如何把它活出来。事业栏当聚光灯提示来读，行动那一步当首演之夜：签是台本，你在台上。',
  },
  {
    slug: 'virgo', name: 'Virgo', nameZh: '处女座', symbol: '♍', dates: 'Aug 23 – Sep 22', datesZh: '8月23日 – 9月22日', element: 'earth',
    intro: 'You’ll be tempted to grade this fortune — the writing, the logic, the odds. Go ahead, then read it once for content. The one small step was written for people who quietly fix things; that’s you on your best days.',
    introZh: '你会先给这支签打分——文笔、逻辑、概率。打便打，打完再为内容读一遍。那一小步，是写给默默把事情改好的人的；那是你最好的样子。',
  },
  {
    slug: 'libra', name: 'Libra', nameZh: '天秤座', symbol: '♎', dates: 'Sep 23 – Oct 22', datesZh: '9月23日 – 10月22日', element: 'air',
    intro: 'You didn’t draw this so it could decide for you — you drew it for a second opinion, which is exactly what it’s for. Read the yes-ish and the no-ish lenses before you weigh in: holding both is your gift, holding them forever is your risk. The step is small on purpose.',
    introZh: '你抽签不为让它替你决断——为求第二意见，它恰好为此而来。偏「是」与偏「否」两栏都读完再落秤：两端端得住是你的天赋，端一辈子不放是你的风险。那一步之所以小，是故意的。',
  },
  {
    slug: 'scorpio', name: 'Scorpio', nameZh: '天蝎座', symbol: '♏', dates: 'Oct 23 – Nov 21', datesZh: '10月23日 – 11月21日', element: 'water',
    intro: 'One reading in and you’re already three layers deep — what it says, what it hides, why it says it that way. Fine, but come up for air: a verdict is meant to be used, not solved. Your sign calls it depth; everyone else calls it a Tuesday.',
    introZh: '别人读一层，你已入第三层——它说了什么、藏了什么、为何这样说。可以，但记得浮上来换气：判词是拿来用的，不是拿来破案的。你谓之深观，旁人谓之平常。',
  },
  {
    slug: 'sagittarius', name: 'Sagittarius', nameZh: '射手座', symbol: '♐', dates: 'Nov 22 – Dec 21', datesZh: '11月22日 – 12月21日', element: 'fire',
    intro: 'A shared fortune is a map with one road on it, and you’re already eyeing the side trails. Take the action step as a direction, not a fence — the sign sets the weather, you pick the route. Just make it back by tomorrow’s reading.',
    introZh: '一支人人相同的签，在你眼里是一张只画了一条路的地图——你已在看岔路了。行动那一步当方向，莫当围栏：签定天气，你选路线；只是明天的签出来之前，记得回来。',
  },
  {
    slug: 'capricorn', name: 'Capricorn', nameZh: '摩羯座', symbol: '♑', dates: 'Dec 22 – Jan 19', datesZh: '12月22日 – 1月19日', element: 'earth',
    intro: 'You’ll read this like a quarterly report — grade, outlook, action item. Efficient, and honestly, it works. Just don’t skip the love lens because it doesn’t file neatly; the sturdiest things in your year rarely start inside the plan.',
    introZh: '你会把这支签当季报读：评级、展望、行动项——高效，且有效。只是别因感情栏不好归档便跳过它：你这一年最结实的东西，往往不在计划里起头。',
  },
  {
    slug: 'aquarius', name: 'Aquarius', nameZh: '水瓶座', symbol: '♒', dates: 'Jan 20 – Feb 18', datesZh: '1月20日 – 2月18日', element: 'air',
    intro: 'Everyone got this same fortune, so the interesting part is what you do differently with it. Read it once as written, once as if you’d written it. The action step scales better in your hands than in most.',
    introZh: '众人同得此签，有意思处是你能把它用出什么不一样。先照原文读一遍，再当作你写的读一遍——那一步到了你手上，比在旁人手里更放得大。',
  },
  {
    slug: 'pisces', name: 'Pisces', nameZh: '双鱼座', symbol: '♓', dates: 'Feb 19 – Mar 20', datesZh: '2月19日 – 3月20日', element: 'water',
    intro: 'This fortune will mean three things by sunset, and all three will be true — your sign reads in watercolors. Let the first reading be the official one; the rest is commentary. The love lens speaks softly today; turn it up.',
    introZh: '这支签到日落时会有三个意思，而三个都对——你读签如读水彩。以第一遍为正，其余算批注。今日感情栏声音很轻，把它调大些。',
  },
];
