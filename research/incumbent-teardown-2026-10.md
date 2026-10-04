# 双站竞品大站逆向（每月复查第 1 轮，2026-10-04）

> 触发：👤 "上线一个月没成绩，去竞品大站看别人怎么做的"（= CLAUDE.md「大站做法先行 + 已上线站每月复查」既定动作，两站满月执行）。
> 方法：双后台 agent 并行实抓。SERP = WebSearch + DDG Lite 双通道（区域污染场次作废重试）；页面 = WebFetch 全域失败后全部走 webReader；sitemap = curl 原始 XML / webReader / Common Crawl 三线交叉。全部结论基于实抓，失败与缺口见各节尾注。
> **当场战果：抓出并当日修复 tintbrew /color-mixing-chart/ canonical 双斜杠 bug（main `3444c18`，165 测试）；chartglade 同款构造防御加固（`e89df17`，82 测试）。**

---

## 一、tintbrew

### SERP 快照（前 5）
| 查询 | 前 5（域名级） | 形态判读 |
|---|---|---|
| what colors make brown | wikihow ×2、jaejohns、marketingaccesspass、artstudiolife | Google 视角偏大媒体（prepscholar/bhg/artincontext）；DDG 视角全小站 |
| color mixing chart | **trycolors、image-color-picker、colordesigner**、thecoloratlas、thecolorsmeaning | **前 10 中 6 个交互工具页** = 我方 chart 页的直接对手形态 |
| color mixer | colordesigner、get-color、colorffy、trycolors、colormagic（Google 视角 w3schools #1） | 全工具 SERP |
| what does red and blue make | paintlogs、color-meanings、artincontext、colordesigner、thecolorsmeaning | **前 10 中 8 个「每对一页」专页** |

### 在位页 teardown 要点
- **prepscholar**（brown）：1,300~1,500 词，7 张库存图（pexels 文件名），一页含 5 变体，无变体互链，SERP 显示日期 Aug 2024
- **artincontext**：25 配方长文；Yoast sitemap 每页 2~65 张图 + lastmod 持续更新；站内已有 /color-mixer/ 工具页 + per-pair 变体页
- **trycolors**（chart 词 #1）：每格 **5 档比例（3:1→1:3）**、Kubelka-Munk 颜料模型、Next.js
- **chromilla**：交互图表 + 比例阶梯 + 打印 + HowTo/FAQ schema ~10 条 + 「Last checked August 2026」+ 作者 byline
- **paintlogs**：WordPress/Yoast，每对一页矩阵，sitemap lastmod 到 2026-08（一年内激进扩张站）
- 我方 4 页：brown ~800 词 0 图、chart ~450 词 0 图、mixer ~460 词 0 图、mix/red-blue ~520 词 0 图；schema 三件套齐（含 HowTo/WebApplication——**领先项**）

### sitemap 逆向
- **paintlogs.com**：128 URL = **~48 两色对页** + 1 三元页 + 12 单色头词（含 white、gray）+ 10 理论 + 3 色调 + ~54 油漆实操文
- **artincontext.org**：wp-sitemap 9 子表，每页 2~65 图声明，总数未取到（Bot 墙）
- w3schools 无标准 sitemap（404）

### 差距清单
**高**：① 配对矩阵 25 vs 48（含 gray 的对页 0 个）② chart 每格单档 vs trycolors 5 档 ③ ~~canonical 双斜杠~~ ✅已修 ④ **全站 0 图片文件**（图片 SERP 无入口）⑤ 零新鲜度信号
**中**：⑥ chart/mixer 用 og-default（应专页卡）⑦ 单色头词缺 white/gray ⑧ 正文深度 800 vs 1300+ ⑨ 工具 SERP 差权威不差功能 ⑩ 无作者/E-E-A-T
**低**：⑪ FAQ 深度 4~5 vs ~10 ⑫ 无可下载 PDF ⑬ 无三元页

---

## 二、chartglade

### SERP 快照（前 5）
| 查询 | 前 5（域名级） | 形态判读 |
|---|---|---|
| cursive alphabet | **k5learning**、pinterest、newamericancursive、mycursive、amazon | K5 内容矩阵 + Pinterest 大位 |
| cursive letter a | **mycursive、k5learning**、youtube、tiktok、facebook | 每字母一页形态双雄 |
| place value chart | **mathnasium（400 词薄术语页）**、acentral、ixl、thirdspacelearning、teachingwithkayleeb | #1 靠域名权威不靠内容；9 月审计时 #1 是裸 PDF |
| multiplication chart printable | **pinterest #1**、ignitelearning（文已下线）、**artsyfartsymama（404 死链仍排 #3）**、designbundles、etsy | **前 5 中 4 个非内容站 + 1 死链 = SERP 换血窗口** |
| kindergarten sight words | 学区裸 PDF、redcatreading、学区站、splashlearn、sightwords.com | 内容门槛低 |

### 在位页 teardown 要点
- **Mathnasium**（place value #1）：~400 词、无 schema、无打印物、1 图；变现 = 辅导中心线索。**内容深度低于我方同主题页数倍** → 排名靠 DR
- **Third Space Learning**：按年级分变体 + dateModified + PDF 直链（无注册墙）+ 每变体一图
- **messymommacrafts**（与我方体量最接近的对照站）：700 词、5 张原创预览图（关键词文件名）、专属 og:image 683×358、modified 2025-02-22 可见、**邮件墙发 PDF**（ConvertKit 双 opt-in）、AdSense
- **K5**：mega-menu 每页数百内链；cursive 按 字母→词→句→段落 梯队
- **MyCursive**：字母间互链成网 + SurferSEO + 邮件铅磁
- 我方 5 页基线：Breadcrumb+FAQ schema 齐（领先项）、每页 1 图、每页 ~6 内链、og 全站共用 og-default、twitter:card=summary、无日期、交付 = Print + PNG（无 PDF）

### sitemap 逆向
- **K5 Learning**（原始 XML 实测，最高可信）：**总 5,668 URL**；free-math-worksheets 1,829 / blog 1,063 / grammar 824 / preschool-K 647 / reading 437 / vocabulary 280 / science 188 / spelling 128 / **cursive 90** / holidays 61；lastmod 2023 年大批量刷新 2,519 条；image:image = 0
- **Superstar Worksheets**：三线交叉（活体索引 <1,000 + Common Crawl 636 捕获 + 文本层）≈ 930 页成立；9/18 旧档 21,118 图片声明作基线（活体数被 CF 盾拦，未复取）
- **Math-Salamanders**：SBI 平台，sitemap 混淆名 + 网络不可达，仅分类学（K-Grade 6 / 生成器 / 计算器 / Raptive 广告）
- **关键词族深度对比**：

| 族 | K5 | chartglade | 差距 |
|---|---|---|---|
| cursive | 90 | 27 | 3.3× |
| place value | 93 | 4 | **23×** |
| multiplication | 256 | 4 | **64×** |
| sight words | 33 | 6 | 5.5× |

### 差距清单
**高**：① **内链骨架断裂**——/cursive-alphabet/ 正文 3 处纯文本提到 "/cursive/a/ through /cursive/z/"（cursive.ts 33/91/95 行）0 条链接；字母页只从 hub 出链；无全站导航（每页 6 内链 vs K5 数百）② **关键词族深度差 3~64×**（DR0 吃长尾的主通道）③ 无 Pinterest 专属竖版 pin 图 + twitter:card 只是 summary ④ **无 PDF 交付**（SERP 直接排裸 PDF；竞品 PDF 直链/邮件墙）
**中**：⑤ 无新鲜度信号 ⑥ 每页 1 图 vs 竞品 5~12 ⑦ 无邮件捕获（不建议强制墙，no sign-up 是卖点）⑧ schema 已领先保持即可（Mathnasium 无 schema 仍 #1 = 不是瓶颈）
**低**：⑨ Q4 SERP 换血窗口 = multiplication 变体梯队加急理由 ⑩ 域名权威是最终瓶颈（打法 = 梯队扩页 + 图床引流，不是加深现有页）

---

## 三、合并行动清单（2026-10-04 定稿，批次归属见各 PLAN）

**已修（当日）**：tintbrew canonical 双斜杠 + 双站 urlGuards 守卫测试。

**A. 立刻可做批（纯工程零词门槛）**：chartglade 内链骨架修复（字母 A-Z 条带 + 正文纯文本转链接 + 全站导航）｜两站新鲜度信号（页面 Last updated + JSON-LD dateModified + sitemap lastmod）｜chartglade og:image 专页化 + twitter:card 升 summary_large_image｜tintbrew chart/mixer 专页 OG 卡。

**B. 10/25 chartglade 批（已排车，纳入新发现）**：multiplication/place-value 变体梯队（**族量已过线无需重拉**：cursive 201K / place value 27.1K / multiplication 12.1K / sight words 12.1K 均在档；变体词拉量只为排优先级）+ PDF 交付管线 + Thanksgiving 簇（原计划不变）。

**C. 待 👤 拉量判定**：tintbrew gray 系配对（blue-and-gray 等 4+ 对）+ white/gray 单色头词——扩容 10K 定标判定。

**D. 立项讨论（工程量大）**：图片资产战略（两站原创图生成管线：多版本预览图 / 色卡图）——同时喂 Google Images、Pinterest 通道、OG 卡，是「高差距」里唯一需要单独设计的。

**不动**：schema（已领先）、工具功能（已达标）、邮件强制墙（不上）。

---

## 失败与限制摘要
WebFetch 双站调研全域失败（全走 webReader 补救）；Superstar/Math-Salamanders 原始 XML 不可达（三线交叉/部分数据）；artincontext sitemap 总数未取到；WebSearch 多次 429（DDG Lite 补全）；部分 SERP 深链未存档（域名+排名+标题为准，未伪造任何 URL）。数据可信度：K5 = 活体原始 XML 最高；Superstar = 三线交叉高；我方自身 = 代码 + dist 实测最高。
