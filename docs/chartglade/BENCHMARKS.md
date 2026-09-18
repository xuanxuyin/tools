# chartglade 对标拆解笔记

> 竞品/对标站拆解统一入此文件（替代散落 PLAN）。#12 InkPx/Printabulls 完成后追加。更新 2026-09-18。

---

## 1. MiriCanvas（미리캔버스）— 2026-09-18 拆解

> 起因：用户注意到这个韩国设计平台火了，要求拆可参考点。方法：官网实勘 + 韩文侧源交叉，未用付费工具。

### 1.1 它是什么

Miridih 公司的韩国版 Canva【实勘官网 9/18】：月活 200 万+ / 服务 180+ 国 / 设计下载 4 亿+ / **模板 53 万+**；商业闭环 = 免费设计器 + 订阅 + **Print Hub（设计→印刷）** + 教育版/企业版；11 语言站（ko/en/ja/fr/id/it/es/nl/de/pt/vi）。2025/11 官方新闻稿：累计订阅 1,600 万、创建设计 1.9 亿。

### 1.2 起量机制（4 个机关）

1. **53 万模板 = 程序化内容矩阵极致**：每个"用途 × 风格"一个 gallery 页（URL 模式 `/template/{类型}/{类别}`，韩国 Google 在收【实勘：gallery URL 出现在索引】）。骨架 = 我们 26 字母矩阵 / graph paper 6 变体的放大版。
2. **缩略图墙双吃搜索**：gallery 页几十张模板真图，同一内容同时打文字 SERP + Google Images。最值得抄的细节：**每张缩略图 alt 均为程序化生成描述句**（官网首页 80 张图 alt 全是"颜色+风格+用途"句式，如"베이지색과 갈색의 미니멀한 비지니스 발표자료"）—— 53 万张图零人工成本。
3. **UGC 飞轮**：模板由创作者贡献（有分成计划，韩国创作者社区在研究"平台内 SEO 上位"【实勘侧源】）—— 内容自增长。
4. **首页季节位轮换**：首页模板墙随韩国校历/节日换（방학특강假期特训、입학 축하入学庆祝模板在首页位），季节流量向全站导流。

### 1.3 chartglade 落位（过滤后）

**⭐ 唯一进排期的：图片 SEO 通道**（PLAN §3 #17，10/05 批搭车）：
- printables 搜索一大块走 Google Images / visual SERP；本站页面本体是 HTML 表格/SVG，**Google 图片收不到 = 白丢一条流量口**
- 动作：核心页生成真实 PNG 内容图（复用 `npm run pins` 无头 Edge 管线，截 `.printable` 区域非品牌卡）+ 描述性文件名（`cursive-alphabet-chart-printable.png`）+ alt 按"内容+年级+用途"句式从 PageDef 程序化生成 + 图放正文 preview 位（`@media print` 隐藏，打印零影响）

**低优先/零成本**：
- **首页季节位**：10/05 批合并后首页加 Halloween 板块（其首页轮换的静态版）—— 季节内链 + 信号，不加页
- **矩阵化路线对标确认**：53 万模板骨架 = 实体×变体全枚举，与现有打法（字母×capital、graph paper×密度、halloween 三页一 hub）同构 —— 路线确认，不加动作
- **Print-first 差异化保持**：它靠 Print Hub 变现但设计要登录；本站"开页即打、零账号"是反向差异化 —— 学打印闭环心智，不加墙

**不抄**：编辑器 SaaS / AI 功能 / 视频模板 / 多语言（US-only 纪律）/ UGC 账号系统 / 53 万体量（DR0 先 65 页打透）。

**一句话**：MiriCanvas 验证矩阵化+季节轮换路线正确；增量启发只有一个实招 —— 打开 Google Images 流量口，其余是"别做什么"的确认。

---

## 2. SERP 在位者 sitemap 逆向 — 2026-09-18

> 起因：用户批评"调研从没研究过大站为什么量大"。方法：sitemap_index/post-sitemap 直接抓取（curl + 10808 代理过 CF 盾），统计 URL 分类法与图片声明【实勘】。**纪律已入根 CLAUDE.md：选品固定加这步。**

| 站 | 页数 | 结构拆解 | 对我们的含义 |
|---|---|---|---|
| K5 Learning | **~10,000 URL**（分页 sitemap ×2） | free-math-worksheets 1,829 + grammar 824 + preschool/K 647 + reading comprehension 437 + vocabulary 280 + science 188 + **cursive-writing 91**；**blog 1,059** = 内容营销第二引擎 | 量与内容双巨墙；不拼量，拼单页质量 + 矩阵聚焦（cursive 91 页 vs 我们 27 页但逐字母深读） |
| **Superstar Worksheets** | **930 页** | **21,118 条 `<image:image>` sitemap 声明 = 均值 ~23 图/页**；目录：math 164 / coloring 101 / **templates 100** / science 53 / cursive 33 / tracing 32 / holiday 30 | **#17 图片 SEO 的直接实锤**——在位者把每个 worksheet 变体都做成独立图片喂 Google Images；我们 5 支柱页已上线内容图（main `c91c5ac`），字母/变体页分批跟 |
| Printabulls | 522 页 | **calendars 154 / coloring-pages 141 / holidays 67** = 季节+日历量引擎；halloween 词 URL 已 22 条 | 季节页是独立站的量支柱——万圣节簇（分支就绪）+ 日历类（V2 候选：2027 calendars 12 月批）值得按此加码 |
| MyCursive | **仅 63 页**（post-sitemap） | 小站；外链靠州立法数据页（EdWeek/CNN 引用）；另有 web-story sitemap（Google Web Stories 尝试）+ local-sitemap | **63 页也能立在位**：小站路径 = 外链诱饵 + 单页深度，不靠页数——我们 #16 州立法页同款打法已在排 |
| InkPx | —（SPA，sitemap 不可读，CF 盾） | 待 #12 拆解补 | 延后 |

**结论三条**：① 图片 SEO 是 printables 赛道结构性流量机器（Superstar 23 图/页）→ #17 从"参考 MiriCanvas"升级为"竞品实锤"，已当日落地首期；② 季节+日历是独立站的量支柱（Printabulls 一半页面在 calendars/coloring/holidays）→ 万圣节簇按计划上，2027 日历簇入 V2 候选；③ 页数不是唯一解（MyCursive 63 页在位）→ 外链诱饵页 #16 优先级维持。
