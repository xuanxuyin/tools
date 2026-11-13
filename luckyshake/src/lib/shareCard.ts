/**
 * 分享签卡（👤 11-13 "加一个分享的功能，就分享这个卡片即可，加上日期"）：
 *  - 卡底 = public/img/sticks/sign-{id}.png（scripts/make-sign-cards.mjs 的产物，
 *    也是 signs/[slug] 的 og:image——SEO 与分享同一资产）；
 *  - 分享时 canvas 叠印当天日期（"Drawn on November 13, 2026"，右下深底角），
 *    静态 PNG 不动，og 用干净版、分享版带日期；
 *  - Web Share API Level 2（files）直接调系统分享；不支持的桌面端回落下载 +
 *    按钮文案提示（"Card saved…"），链接用户自己贴。
 * 绑定 = document 级委托 [data-share-card]，揭示 banner 是后插入的也接得住。
 */

const stamp = (d: Date): string =>
  new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(d);

async function composeCard(signId: number): Promise<Blob> {
  const img = new Image();
  img.src = `/img/sticks/sign-${signId}.png`;
  await img.decode();
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  // 日期戳:卡面下方的深底带(卡 438px 高居中,底带 y≈508-630),右下角避开居中页脚
  ctx.font = 'italic 24px Georgia, serif';
  ctx.fillStyle = '#9a94ad';
  ctx.textAlign = 'right';
  ctx.fillText('Drawn on ' + stamp(new Date()), canvas.width - 34, canvas.height - 26);
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('canvas toBlob failed'))), 'image/png'),
  );
}

const t = (zh: boolean) => ({
  share: zh ? '分享中…' : 'Sharing…',
  saved: zh ? '签卡已存图——聊天相册直接发' : 'Card saved — attach it anywhere',
});

async function handle(btn: HTMLButtonElement): Promise<void> {
  const id = Number(btn.dataset.shareCard);
  if (!id || btn.disabled) return;
  const zh = document.documentElement.lang.startsWith('zh');
  const L = t(zh);
  const orig = btn.textContent;
  btn.disabled = true;
  btn.textContent = L.share;
  try {
    const blob = await composeCard(id);
    const file = new File([blob], `fortune-no-${id}.png`, { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: zh ? `Fortune Willow · 第 ${id} 签` : `Fortune Willow — Fortune No. ${id}`,
      });
    } else {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `fortune-no-${id}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      btn.textContent = L.saved;
      setTimeout(() => {
        btn.textContent = orig;
        btn.disabled = false; // 降级路径也要还按键——否则 Firefox 等无系统分享的浏览器按钮永久卡死
      }, 2600);
      return;
    }
  } catch {
    /* 用户取消分享属正常路径,静默还原即可 */
  }
  btn.textContent = orig;
  btn.disabled = false;
}

let wired = false;

/** 全站接一次;揭示 banner 动态插入的 [data-share-card] 也走这条委托 */
export function wireShareButtons(): void {
  if (wired) return;
  wired = true;
  document.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    const btn = el.closest<HTMLButtonElement>('[data-share-card]');
    if (btn) void handle(btn);
  });
}
