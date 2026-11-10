/**
 * Shared six-piece reading renderer — one source of markup for both
 * SSR (daily fortune) and interactive islands. Content comes exclusively
 * from our own data files (no user input), so template injection is safe.
 * lang: 'zh' renders the REVIEW-ONLY Chinese mirrors (deleted at launch).
 */
import type { Sign } from '../data/signs';
import { SIGN_VERSES } from '../data/signVerses';
import { SIGN_SLIPS } from '../data/signClassical';
import { youAsked } from './ask';

/** Which lens the visitor names after the draw (PRODUCT.md 流程规范 v1.2). */
export type Focus = 'love' | 'money' | 'career' | 'own';

const GRADE_LABEL: Record<Sign['grade'], string> = {
  blessing: 'Blessing',
  nudge: 'Nudge',
  'gentle-warning': 'Gentle Warning',
};
const GRADE_LABEL_ZH: Record<Sign['grade'], string> = {
  blessing: '吉签',
  nudge: '提点',
  'gentle-warning': '温和提醒',
};

/**
 * The verse layer (👤 11/08 拍板): the four-line poem the stick carries —
 * the artifact itself. EN pages get the hand-translated verse; zh review
 * pages get the source poem verbatim. Falls back to '' if a record is
 * missing (tests guard full coverage).
 */
export function verseBlock(sign: Sign, zh: boolean): string {
  const v = SIGN_VERSES[sign.id];
  if (!v) return '';
  const lines = zh ? v.zh : v.en;
  return `
  <div class="verse-block">
    <div class="verse-label">${zh ? '签诗' : 'The verse on this stick'}</div>
    ${lines.map((l) => `<p class="verse-line">${l}</p>`).join('')}
  </div>`;
}

/**
 * Terse verdict row (三字断语, 👤 11/08): the slip's 仙机-style quick
 * verdicts — Love/Money/Career in one or two words each. EN pages only
 * (the zh review layer already carries the classical 断语 on the slip).
 * Rendered once the hand-written terse entries land (batch-filled).
 */
export function terseRow(sign: Sign, zh: boolean): string {
  if (zh) return '';
  const t = SIGN_SLIPS[sign.id]?.terse;
  if (!t) return '';
  return `
  <div class="terse-row">
    <span class="terse"><i>Love</i> ${t.love}</span>
    <span class="terse"><i>Money</i> ${t.money}</span>
    <span class="terse"><i>Career</i> ${t.career}</span>
  </div>`;
}

export function renderReading(
  sign: Sign,
  digits?: [number, number, number],
  opts?: { note?: string; lang?: 'en' | 'zh'; luckyLabel?: string },
): string {
  const zh = opts?.lang === 'zh';
  const lucky = digits
    ? `<div class="lucky-row"><span class="lbl">${opts?.luckyLabel ?? (zh ? '你的幸运数字' : 'Your lucky numbers')}</span>
        ${digits.map((d) => `<span class="pill">${d}</span>`).join('')}
       </div>`
    : '';
  const note = opts?.note ? `<p class="again-line">${opts.note}</p>` : '';
  if (zh) {
    return `
    <article class="reading card">
      <div class="reading-head">
        <span class="sign-no">第 ${String(sign.id).padStart(2, '0')} 签</span>
        <span class="sign-name">${sign.nameZh}</span>
        <span class="chip ${sign.grade}">${GRADE_LABEL_ZH[sign.grade]}</span>
      </div>
      <div class="reading-title">${sign.titleZh}</div>
      <div class="reading-story">—— ${sign.storyZh}</div>
      ${verseBlock(sign, true)}
      <p class="overall">${sign.overallZh}</p>
      <div class="scenarios">
        <div class="scenario"><div class="who">感情</div><p>${sign.loveZh}</p></div>
        <div class="scenario"><div class="who">财运</div><p>${sign.moneyZh}</p></div>
        <div class="scenario"><div class="who">事业</div><p>${sign.careerZh}</p></div>
      </div>
      <div class="action-box"><div class="who">今天的一小步</div><p>${sign.actionZh}</p></div>
      ${lucky}
      ${note}
    </article>`;
  }
  return `
  <article class="reading card">
    <div class="reading-head">
      <span class="sign-no">FORTUNE NO. ${String(sign.id).padStart(2, '0')}</span>
      <span class="sign-name">${sign.name}</span>
      <span class="chip ${sign.grade}">${GRADE_LABEL[sign.grade]}</span>
    </div>
    <div class="reading-title">${sign.title}</div>
    <div class="reading-story">— ${sign.story}</div>
    ${verseBlock(sign, false)}
    ${terseRow(sign, false)}
    <p class="overall">${sign.overall}</p>
    <div class="scenarios">
      <div class="scenario"><div class="who">Love</div><p>${sign.love}</p></div>
      <div class="scenario"><div class="who">Money</div><p>${sign.money}</p></div>
      <div class="scenario"><div class="who">Career</div><p>${sign.career}</p></div>
    </div>
    <div class="action-box"><div class="who">One small step</div><p>${sign.action}</p></div>
    ${lucky}
    ${note}
  </article>`;
}

/**
 * Drawn banner — the SLIP (签底) itself, 👤 11/08 定版, 👤 11/09 EN 改版:
 * EN pages = EN-forward slip (STICK NO. + traditional grade seal + EN name +
 * source 典故名 · grade as a small sub line + the classical verdict paragraph
 * hand-rendered in EN) — no poem, no Chinese verdict (👤: "服务英语的,保留中文诗词很尴尬");
 * the EN verse still shows in the reading below (verseBlock). The zh review
 * layer keeps the full classical slip: 第X签·等级 + 签诗 + 断语 verbatim.
 */
export function drawnBanner(sign: Sign, lang: 'en' | 'zh' = 'en'): string {
  const zh = lang === 'zh';
  const slip = SIGN_SLIPS[sign.id];
  if (zh) {
    const poem = SIGN_VERSES[sign.id] ? SIGN_VERSES[sign.id].zh.map((l) => `<p class="slip-poem-line">${l}</p>`).join('') : '';
    const verdict = slip
      ? `<div class="slip-orn">❖</div><div class="slip-verdict"><span class="slip-label">${slip.label}</span><p>${slip.verdictZh}</p></div>`
      : '';
    return `
  <div class="reading card drawn-banner slip">
    <div class="slip-head">
      <span class="slip-no">第 ${String(sign.id).padStart(2, '0')} 签</span>
      ${slip ? `<span class="seal seal--${sign.grade}">${slip.gradeZh}</span>` : ''}
    </div>
    <div class="slip-title">${sign.nameZh}</div>
    <div class="slip-poem">${poem}</div>
    ${verdict}
  </div>`;
  }
  const label = slip ? (slip.label === '注' ? 'The note' : 'The verdict') : '';
  const verdict = slip
    ? `<div class="slip-orn">❖</div><div class="slip-verdict slip-verdict--en"><span class="slip-label">${label}</span><p>${slip.verdictEn}</p></div>`
    : '';
  return `
  <div class="reading card drawn-banner slip slip--en">
    <div class="slip-head">
      <span class="slip-no">STICK NO. ${String(sign.id).padStart(2, '0')}</span>
      ${slip ? `<span class="seal seal--${sign.grade}" title="traditional grade">${slip.gradeZh}</span>` : ''}
    </div>
    <div class="slip-title slip-title--en">${sign.name}</div>
    <div class="slip-sub">${sign.nameZh} · ${GRADE_LABEL[sign.grade]}</div>
    ${verdict}
  </div>`;
}

/**
 * Focused answer (流程规范 v1.2): the visitor picked exactly ONE lens —
 * love / money / career — or typed their own question. Render only that
 * verdict (own question → the overall reading) plus the action step.
 */
export function renderFocusedReading(
  sign: Sign,
  focus: Focus,
  digits?: [number, number, number],
  opts?: { note?: string; lang?: 'en' | 'zh'; echo?: string },
): string {
  const zh = opts?.lang === 'zh';
  const echo = opts?.echo ? youAsked(opts.echo, zh ? 'zh' : 'en') : '';
  const lucky = digits
    ? `<div class="lucky-row"><span class="lbl">${zh ? '你的幸运数字' : 'Your lucky numbers'}</span>
        ${digits.map((d) => `<span class="pill">${d}</span>`).join('')}
       </div>`
    : '';
  const note = opts?.note ? `<p class="again-line">${opts.note}</p>` : '';
  const label =
    focus === 'own'
      ? zh ? '整体签文' : 'Your reading'
      : zh
        ? { love: '感情', money: '财运', career: '事业' }[focus]
        : { love: 'Love', money: 'Money', career: 'Career' }[focus];
  const verdict =
    focus === 'own'
      ? zh ? sign.overallZh : sign.overall
      : focus === 'love'
        ? zh ? sign.loveZh : sign.love
        : focus === 'money'
          ? zh ? sign.moneyZh : sign.money
          : zh ? sign.careerZh : sign.career;
  const story = `<div class="reading-story">— ${zh ? sign.storyZh : sign.story}</div>`;
  const verse = verseBlock(sign, zh);
  // the sign's advice hook (its old "title") — now revealed here, since the
  // banner above carries the proper name instead (👤 11/08)
  const hook = `<div class="reading-title">${zh ? sign.titleZh : sign.title}</div>`;
  return `
  <article class="reading card focused">
    ${echo}
    ${hook}
    ${story}
    ${verse}
    ${terseRow(sign, zh)}
    <div class="answer-main">
      <div class="who">${label}</div>
      <p class="verdict">${verdict}</p>
    </div>
    <div class="action-box"><div class="who">${zh ? '今天的一小步' : 'One small step'}</div><p>${zh ? sign.actionZh : sign.action}</p></div>
    ${lucky}
    ${note}
  </article>`;
}
