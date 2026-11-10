# 反面样本解剖：yesornot.net — 为什么没做起来

- **调研日期**：2026-11-07（👤 提出"这站为什么没起来"，Claude 当日拆解）
- **方法**：curl 直抓首页/robots/sitemap + 3 个内页抽样（工具页/博客页/中文页）+ WebSearch 品牌词足迹
- 原始存档：`d:\tmp\teardown-yesornot\`

## 一句话结论

**SEO 清单全对（Next.js + 全套 JSON-LD + viewport/canonical/robots），但输在四件清单外的事：域名选了个不存在的词、65% 内容是中文、页面薄、一个月冲刺后弃养 14 个月。** 它是"执行了 checklist ≠ 会赢"的活证据。

## 实测数据

| 维度 | 实测 |
|---|---|
| 站体 | Next.js，113 URL：/tools ×14 + /posts ×24 + **/zh ×39 + /tw ×35（65% 中文）** + 首页 |
| schema | **全套齐**：WebSite + WebApplication + Offer + FAQPage(7问) + HowTo(4步)——checklist 优等生 |
| 内容深度 | 首页 1,156 词；**钱词页 /tools/yes-no-decision-maker 仅 408 词**（对照 yesnopicker 单页 3,773 词） |
| 博客 | 24 篇里 **20 篇是数字 slug**（/posts/2 ~ /posts/22，2025-05 每日一更形态）——零关键词瞄准，永远接不到词 |
| 时间线 | 2025-05 冲刺建 53 页 → 06 月 9 页 → 08 月 3 页 → **静默 14 个月** → 2026-10 集中改 lastmod 续命 |
| 分发 | Show HN 2025-06 发帖 **得 1 分**；Saashub/Microlaunch 目录站；博客评论外链——全是零杠杆渠道 |
| AI-SEO | llms.txt + robots 屏蔽 GPTBot/anthropic-ai（中文注释，运营者是中文开发者）——功夫花在潮流上 |
| 品牌词 SERP | 搜 "yesornot.net" 只有自身 + 目录对比页，**零关键词排名足迹** |
| 中文页质量 | /zh/tools/flip-a-coin 全文仅 78 词——中文版更薄，纯 farm 形态 |

## 死因 × 成功样本对照

| # | 死因 | yesornot（败） | yesnopicker 56K（成） | wheeldecide（在位） |
|---|---|---|---|---|
| 1 | **域名选错词** | "yesornot" = yes-or-NOT，**没人这么搜**，exact-match 优势归零，品牌记不住 | "yes or no picker" 实词，URL+H1+title 三重匹配 → #1 | "wheel decide" 实词 |
| 2 | **语言/主题漂移** | 英文词站挂 65% 中文内容（zh+tw），Google 判不清人群——yesandnowheel 13 语 farm 同款病 | 100% 英文单页 | 100% 英文 |
| 3 | **深度不足** | 钱词页 408 词，38 个英文页无一处深 | 单页 3,773 词 + 9 条人味 FAQ + 心理学长文段 | 单页浅但 **58 个预制盘 = 58 个长尾词位** |
| 4 | **URL 零词瞄准** | 博客 /posts/8 数字 slug；工具页反而还行 | 不需要矩阵（一词一页打穿） | 预制盘 URL 即搜索词 |
| 5 | **节奏断崖** | 一个月 spurt → 弃 14 个月 → lastmod 续命（无效信号） | 2026-03 建，持续在位 | 2012 年域名，**域龄即资产**（本词群在位者共性：doge 2019、horoscope 2018 lastmod） |
| 6 | **分发零杠杆** | Show HN(1分)/目录站/评论链 | **share 结果链接内建**——社交回路长在产品里 | Embed 按钮外链机器 + r/WheelDecide |

## 对 luckyshake 的直接教训（已对齐/待补）

1. ✅ 域名含实词、无商标字样——候选清单按此标准（护栏已有）
2. ✅ US-only 单语——绝不挂 zh/tw 版（仓库纪律本就有，此为实证加强）
3. ✅ 页面深度——8 页原型每页 900+ 词起步，签库是持续深度来源；上线批次继续加厚到 3K 级
4. ⚠️ **节奏**：PLAN 必须排上线后内容批次日程（周更节奏），spurt-and-abandon 是本词群头号死法
5. ⚠️ **分发**：产品内建 share 回路（原型已有 cookie→oracle 深链雏形；上线加"分享本次抽签结果"URL）
6. ❌ 不追 llms.txt 类潮流，基本功（词/深度/聚焦/坚持）优先
