# zh 审阅层备份（2026-11-13 退役）

上线工程批次：`/zh/` 审阅镜像层从 luckyshake 移除（上线清单第 4 条提前执行，👤 拍板"zh 放到其他地方备份"）。中文正式战线不受影响：`/guanyin-lingqian/`（zh-live 生产页）+ 今制灵签模式的 zh 管线（signs/signVerses zh 字段保留在生产代码里）。

## 内容

| 文件 | 原位置 | 说明 |
|---|---|---|
| `pages-zh/` | `luckyshake/src/pages/zh/` | 9 工具中文镜像 + 签库/今日运势/星座子路由 |
| `i18n-zh.ts` | `luckyshake/src/data/i18n-zh.ts` | zh 文案常量（EIGHT_BALL_ZH / YES/NO_ZH 等），仅 zh 镜像消费 |
| `Base.astro.bak` | `luckyshake/src/layouts/Base.astro` | 退役前夜全文快照（含 'zh' 审阅分支/语言开关/navZh） |

## 恢复方法

1. `pages-zh/` 拷回 `luckyshake/src/pages/zh/`
2. `i18n-zh.ts` 拷回 `luckyshake/src/data/`
3. Base.astro 用 `.bak` 对照恢复 `'zh'` 分支（review banner + navZh + lang-toggle）——注意 `zh-live` 分支（观音灵签生产页用）在退役时保留在 Base 里，勿覆盖丢失
4. engine.test.ts 曾有 `review-only zh data layer` 测试块（随层删除），可从 git 历史找回

## 为什么退役（决策出处）

PLAN.md 11-13 决策行 + TASKS 11-13 ④：中文长尾在 Google 美区无量【实测】，zh 收缩为词头单页战；镜像层 = 审稿工具（横幅自述"仅供本地看效果"），上线即删是 11-12 立项时的原始设计。
