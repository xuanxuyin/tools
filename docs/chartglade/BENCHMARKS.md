# chartglade 对标拆解笔记

> 竞品/对标站拆解统一入此文件（替代散落 PLAN）。#12 InkPx/Printabulls 已完成（§5/§6）。更新 2026-09-20。

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
| InkPx | 首页导航枚举 **222 实体页**【实勘 9/20】；无 sitemap 可核对（robots.txt 不声明、未知路由返错误页）—— §2 勘误：非 SPA，是 ASP.NET 服务端渲染 | 每实体一条平级 URL 的下载格式站；页级拆解见 §5 | 已拆（2026-09-20） |

**结论三条**：① 图片 SEO 是 printables 赛道结构性流量机器（Superstar 23 图/页）→ #17 从"参考 MiriCanvas"升级为"竞品实锤"，已当日落地首期；② 季节+日历是独立站的量支柱（Printabulls 一半页面在 calendars/coloring/holidays）→ 万圣节簇按计划上，2027 日历簇入 V2 候选；③ 页数不是唯一解（MyCursive 63 页在位）→ 外链诱饵页 #16 优先级维持。

---

## 3. Suncatcher Studio — 支柱页形态拆解 — 2026-09-18

> 起因：用户指令"上 Google 拉同类站找提升点"。Suncatcher = `multiplication chart` SERP 常年在位（9/5 实勘 #3）的独立 printables 站。方法：页面渲染文实勘【实勘 9/18】。

### 3.1 它是什么

WordPress + Mediavine 广告的独立站；范围比我们宽（printables + lettering + SVG files + planners/calendars + apps）—— K-5 头词 SERP 前排常客。

### 3.2 乘法表页形态（/multiplication-charts/，SERP #3 级在位页）

1. **一页 16 个变体**：1-12 与 1-10 两大节 ×（完整 / 空白 / 对角线高亮 / 横版 / 竖版 / 缺答案）—— 实体×变体枚举做到极致；**每变体一张真图直接进正文**（全部可进 Google Images）+ **PDF/PNG 双下载按钮** + "Edit / Save" 换色（可设 3000px）
2. **16 张图 alt 一模一样**（同一串关键词 "…times table, sheet, pdf, blank, empty, 3rd grade…"）照样排进前 3 —— **alt 句式不是胜负手，变体图片覆盖密度才是**（与 §1 MiriCanvas 程序化描述句 alt 互为对照：我们 #17 手写 alt 只强不弱；#17 扩容方向 = 加变体图数量，非打磨 alt 文案）
3. 页尾 4 段朴素 SEO 文案 + 大量相关内链（lined paper / graph paper / planners / math drills）
4. robots meta 显式 `max-image-preview:large`；页尾 Pinterest "Pin for later" 按钮主动索取

### 3.3 chartglade 落位

- ⭐ **下载按钮进排期（PLAN §3 #18，10/05 批）**：PNG/PDF 下载是 printables 行业标配（Suncatcher / classweekly / InkPx 全有）。我们 #17 已产出 2016px PNG（≈219dpi letter），页面加 download 链接成本≈0 —— 手机用户（Pinterest 流量 9 成手机）没有 Ctrl+P，"下载再打印"是真实路径，补上它反而**强化** print-first 闭环。PDF 可后置（sheet-images 管线加 page.pdf() 再评估）
- **变体密度记为新页默认形态**：存量乘法 4 页按变体分页不动（已各有排名）；今后支柱页正文给"变体预览条"（每变体一图 + 链接各自页）—— graph paper 簇已是此结构
- **不学**：Edit/Save 换色编辑器（SaaS 化超纯静态边界）；Mediavine 广告（未到变现线）；planner/lettering 范围扩张（漂出 K-5 主题）

---

## 4. ClassWeekly — 9,101 URL 结构机器 — 2026-09-18

> 方法：sitemap 抓取分类统计 + /standards/1-ESS1-1 页面渲染文实勘【实勘 9/18】。

### 4.1 它是什么

Next.js + Supabase（worksheet 缩略图托管）+ Stripe freemium（30 天免费试用后 $14/月）的 worksheet 站；自带 worksheet maker 生成器。sitemap 9,101 URL 分类：math 2,352 / social studies 2,153 / grammar 1,124 / reading 929 / **event 776** / blog 380 / **teaching-wiki 360** / **standards 292** / workbooks 243 / vocabulary 156 / science 51 / posters 29。

### 4.2 三台我们没有的结构机器

1. **standards 矩阵（292 页）**：Common Core/NGSS 标准码一码一页（如 /standards/1-ESS1-1 = 一年级科学标准），聚合挂对应 worksheet —— 吃"教师按码搜"长尾；页面本体极薄（标题 + 7 张缩略图），纯结构驱动
2. **teaching-wiki（360 页）**：A–Z 教学术语定义页 + 按学科浏览
3. **event 季节矩阵（776 页）+ Teaching Calendar hub**：按月份浏览全部节日/季节页，季节流量内链全网收口

### 4.3 chartglade 落位

- **Teaching Calendar hub（1 页）进 11 月批候选**：感恩节簇上线后有 2+ 季节簇，做按月季节打印件索引页 —— classweekly 776 页季节矩阵的"1 页静态版"，顺带接 "october printables" 类词
- **standards 矩阵 = 远期候选池记档不动**：打的是标准码长尾（与"worksheets 词 SERP 锁死"判断不冲突，词形不同），但 292 薄聚合页撞反薄内容纪律 + DR0 阶段先打透 65 页 —— 10/17 验收后再议
- **freemium/付费墙/workbook 不学**（零账号 print-first 是反向差异化）；worksheet maker 与我们 V1.5 generator / #14 mad minute island 同形态 = 方向再验证

---

## 5. InkPx — "每实体一页"的下载格式站 — 2026-09-20（#12）

> 起因：PLAN #12 指名（name tracing + sign in sheet 跨词族排名的纯打印站）。方法：首页导航全量枚举 + 3 个对位页渲染文实勘 + robots/路由探针【实勘 9/20，10808 代理美区】。**§2 勘误**：它不是 SPA —— ASP.NET 服务端渲染（Bootstrap、26~35KB 轻页），只是 robots.txt 不声明 sitemap、未知路由全返服务器错误页，sitemap 逆向走不通；全站口径以首页导航枚举 222 条为准（无 sitemap 可核对，实际页数 ≥222）。

### 5.1 它是什么

打印模板站，**每个可打印实体一条平级 URL**（无 hub、无目录层级）。首页五大分区【实勘】：Word Art（文本工具）/ Cards（卡片请柬）/ Personal Printable（tracker 族）/ **Education & Worksheets（教育约 50 页）**/ Tools。变现 AdSense（ca-pub-6508214169551772，页内 1 广告位起步）；博客仅 2 条链接（内容营销缺位）。与 chartglade 对位的页几乎全有：multiplication / place value / hundreds / addition / subtraction / division / skip counting charts、number line、ten frame、graph paper、dot paper、handwriting / kindergarten writing paper、letter/number/shape/line tracing、telling time worksheets、name tracing generator、sign in/up sheets、gradebook、attendance sheets、usa maps。

### 5.2 页级形态（/multiplication-charts、/sign-in-sheet、/name-tracing-worksheet-generator）

1. **title 模板 = "Free Printable {实体} in PDF, PNG and JPG Formats · InkPx"** —— 下载格式关键词直接进 title，三页同款句式
2. **一页 ~20 张变体预览图**：乘法页按 1-9/1-10/1-12/1-15/1-20 分档 × 多设计；全部显式 width/height + loading=lazy；**alt 程序化带分档**（"Printable Multiplication Chart 1-20"）；签到页 alt 是"颜色+风格+人群"整句（"Free Printable Vermillion Color Minimalist Employee Sign In Sheet"）—— §1 MiriCanvas 同款程序化描述句，零人工
3. **每模板 PDF/PNG/JPG 三格式 + A4/Letter 双纸型下载**（SERP 摘要还展示 customizable fonts and colors）
4. **薄内容照样在位**：乘法页全文 ~757 词（同口径粗测，下节 Printabulls 3,957 词），H2 仅 benefits / download options / how to use / tips / related 五段 —— 薄文案 + 高变体图密度 + 格式关键词 = #6
5. Related Resources 平铺互链（addition/subtraction/division charts 等兄弟页），无 hub 收口
6. **乘法分档已覆盖 1-15 和 1-20**【实勘 alt 清单】—— 修正 `multiplication.ts` 注释"多数在位者止步 1-12"的 freshness wedge 论断：InkPx 每档 1 图但 0 专属文案；我们 1-15/1-20 页的差异化改为"每档整页深读 + 打印工程 vs 在位者一图带过"（论断带例外记档，非动作）

### 5.3 排名与缺口

【实勘 SERP 9/20，美区】printable multiplication chart **#6**（前 5 = DadsWorksheets / Mometrix / GoodAndBeautiful / Suncatcher / Prodigy）；name tracing worksheet generator **#4**（PLAN 9/6 记 #5，CreatePrintables #1）；sign in sheet printable **#4**（eForms #1 / Spreadsheet123 #2，与 9/6 实勘一致，**V1.8 判定第三次获佐证**）。

**两家都没接的词族**：`/cursive-worksheets`、`/cursive-alphabet`、`/sight-words` 探针全 404【实勘 9/20】—— 201K 量王 cursive 族与 12.1K sight words 族，InkPx 整站缺位；cursive alphabet printable 前 8 = K5 / SuperTeacher / PaperTrail / MyCursive / SuryasCursive / SplashLearn（老牌 + 独立深读站）。**我们的词王赛道对手不在这两家里。**

### 5.4 不学（反面教材）

**五垂直混合站**：教育 50 页 + 医疗护理 tracker（血压/血糖/nursing/药理/med-surg）+ 财务 tracker + 文本工具 + 卡片请柬 —— "打印模板"只是文件形态统一，搜索人群完全不同，正是根 CLAUDE.md 主题聚焦护栏判据的反面；它能活靠老站权重，DR0 不可学。fancy text / word art / signature 等生成器工具与 Suncatcher Edit/Save 同性质，超纯静态边界。

---

## 6. Printabulls — 合集页吃大词 + 图片墙机器 — 2026-09-20（#12）

> 起因：PLAN #12 指名（合集页吃大词模式）。9/18 已有总数（522 页），本次深挖页级形态与图片机器。方法：sitemap 三件全量统计 + 3 个对位页渲染文实勘【实勘 9/20，10808 代理美区】。WordPress + Yoast；变现 **Raptive（AdThrive）** 高端展示广告联盟而非 AdSense【实勘页源脚本；Raptive 接站有流量门槛 = 其体量信号，推断】；robots.txt 封 GPTBot / ClaudeBot / CCBot 等 12 家 AI 爬虫【实勘】。

### 6.1 sitemap 逆向（深化 §2 的 522 页）

post 522 / page 41 / category 9。分类法：**calendars 154**（月历回溯到 2020-11、**2027 全年已预建**、另有 yearly/academic/two-week/three-month 变体页）/ **coloring 141**（alphabet 27 + christmas 25 + halloween 15）/ **holidays 67**（christmas 27 / thanksgiving 11 / easter 8 / halloween 6 —— 加 coloring 下 15 + activities 下 1 = 全站 halloween 22 条，与 9/18 口径吻合）/ **education 63**（印刷体字母矩阵 26 页 + 数字 tracing 矩阵 11 页 + charts 族 4 合集页 + 教师工具：reading logs / attendance / lesson planners / first-day signs / pledge）/ organization 14 / planners 13 / parties 12 / signs 11 / health 10 / finance 10。

- **图片机器量化：20,213 条 `<image:image>` / 522 页 = 均值 38.7 图/页**（355 页 ≥20 图、161 页 ≥40、日历页 150~162）—— §2 Superstar 23 图/页的 **1.7 倍**，赛道图片密度上限再抬高
- **更新活跃**：lastmod 2026-08 单月 36 页；历史月历页不清档，2027 提前一年建库
- **月历 = 实体 × 变体维度矩阵**：october-2026 一页 **25 个 H2 变体节**（with holidays / blank / lined / notes / to-do / week numbers / prev-next month…）× 每节约 6 张设计 = 一页 150 图 150 PDF

### 6.2 页级形态（合集页吃大词的机关）

1. **数量承诺进 title**："Multiplication Charts - **75 FREE Printables**" / "Letter A Worksheets - **50 FREE Printables**" / "October 2026 Calendars - **150 FREE Printables**"；meta description 同款句式（"Choose from N free…"）
2. **图片墙即下载墙**：乘法页 96 图配 85 个 .pdf 链接、字母页 73 图 50 PDF、日历页 167 图 150 PDF —— 几乎每图一键 PDF；正文图 alt 是文件名式带编号（"Printable-1-12-Multiplication-Chart-7"）照样在位 —— 与 §3 Suncatcher 结论互证：**alt 文案不是胜负手，变体图密度才是**
3. **逐图 Pinterest 预置**：每张正文图挂 data-pin-url / data-pin-title / data-pin-description —— 用户 pin 图自动带文案+回链，Pinterest 分发全自动化
4. 正文不薄：乘法页 ~3,957 词、字母页 ~3,753 词（同口径粗测，含模板边栏）—— 与我们反薄内容纪律同向
5. **词族胜负规律**【实勘 SERP 9/20】：letter a worksheets printable **#1**（压 ABCmouse/K5/TPT/Superstar）、october 2026 calendar printable **#2**（仅次 print-a-calendar EMD）；但 printable multiplication chart **不在前 7** —— **设计集合型实体**（worksheet/日历/涂色：用户要"多选一"）合集墙赢；**参考图表型实体**（乘法表：用户要"那张权威表"）单表深读赢（DadsWorksheets SVG / Mometrix PDF / Suncatcher 16 变体 / InkPx 分档）。**chartglade 支柱全在参考图表型 —— 不必学它的 75 图墙**

### 6.3 chartglade 落位（对照现有 53 页找增量）

**进 10/05 批（零新增，已有项双实锤加固）**：
- #18 下载按钮照旧（PNG 复用 #17 资产）；**PDF 从 #18 的"后置评估"升格为 10/25 正式项** —— Printabulls 85 PDF/页 + InkPx PDF/PNG/JPG 三格式 = 行业标配双实锤，不再是单站参考

**进 10/25 批**：
1. **#18 加码：PDF 下载**——sheet-images 管线加 page.pdf()，5 支柱页与 PNG 同期；按钮文案带格式词（"Download PDF"）
2. **#17 扩容第一波：支柱页变体图 6~12 张**——乘法 4 页的既有 HTML 变体（blank / perfect-square diagonal / landscape / 1-15 / 1-20）逐个出 PNG 进正文"变体预览条"（互链兄弟页）；38.7 图/页 vs 我们 1 图/页是量级差，参考图表型打 6~12 张即够（§6.2 规律：不卷 75）
3. **支柱页 title 内容承诺微调**——'Multiplication Chart 1-12 (Free Printable)' 加格式词或变体数（InkPx #6 的 title 直接带 "in PDF, PNG and JPG Formats"）；纯文案零风险，一次改 5 支柱页；格式长尾量 👤 AITDK 顺手补测（"multiplication chart pdf" 类【假设：格式词有量，补测后定 title 是否带 PDF 字样】）

**进 11 月批**：
4. **V1.8 sign-in-sheet 族形态确认**——InkPx #4 的变体维度 = 人群（Employee/Visitor/Event 各一图一 alt）；open house 头名页做"场景变体条"（open house / PT conference / field trip / volunteer 每场景一段+一图），hub 结构照 PLAN #11 不变
5. Teaching Calendar hub 候选维持（§4 已立，感恩节簇上线后动工）

**不做（含理由）**：
- **2027 日历 154 页矩阵**：Printabulls 已把 2027 全年建完且当月词排 #2，后来者吃残渣；日历维持 V2 候选不提前（65 页打透止损纪律）
- **coloring 141 页**：涂色人群漂出 K-5 教学 + coloring 巨头混战（主题聚焦护栏）
- **一页 75~150 图极限墙**：它每页 ~3,900 词托底 + Raptive 变现闭环；我们参考图表型 6~12 图 + 深读即差异化，不卷体量
- **AI 爬虫封禁**（robots 封 12 家）：成熟站防御动作，DR0 流量优先，照抄无收益
- **InkPx 式五垂直混合**：见 §5.4

---

## 7. 全站五路对标批 — 2026-10-29（👤 "每页内容对标大站，现在太简陋" + "探索大站什么内容量大，做成单页上量"）

> 触发：thankful worksheet 被用户点名"太丑"（当日已按竞品形态重做：秋叶+描红+4 编号句式框+画框，签到表换皮废除）。5 路并行子代理实抓（webReader/代理 curl 过 CF），Superstar 933 页 + Math-Salamanders 882 页 + DadsWorksheets 760+ 页 sitemap 全量计数，K5 cursive 91 URL 精确计数。原始 sitemap 数据存 `D:\tmp\cgsm\`（3.3MB+6.5MB，不入库）。

### 7.1 Superstar Worksheets — 933 页纯 page 矩阵站（板块 URL 排名）

**Sitemap 全量【实测 10/29，Yoast 单分片 page-sitemap.xml，lastmod 10/28】**：933 可索引页（零 blog 零 shop），图片声明 21,512 条 = **均 22.9 图/页**：

| 板块 | 页数 | 板块 | 页数 |
|---|---|---|---|
| math-worksheets | 164 | holiday-seasons（**30 hub**：16 节日+4 季+8 特殊日+2 里程碑） | 30 |
| coloring-pages | 102 | alphabet / grammar / sight-words / mazes | 27/25/22/22 |
| **templates（手工轮廓实体矩阵）** | 100 | writing / kindergarten / prompts / crafts / cbn | 21/21/19/18/17 |
| science（动物 17/植物 13/器官 7） | 62 | wordsearch（主题×9 级难度，每主题页 20 谜题） | 16 |
| reading | 43 | vowels（长短元音×5 元音词表） | 14 |
| cursive | 33 | tracing（26 字母描红） | 32 |

**簇级形态【实勘】**：
- **cursive**：26 字母页 × 每页 **7 练习形态**（mat/海报/大小写/大写专/小写专/渐进描红/连写 chart）× DN+ZB 双字体 ≈ 14 PDF/字母；每字母页 **13 张内容图** + 笔画 how-to ~200 词 + 连写教学 ~130 词；hub 挂 days-of-week/months/planets 整套收藏页
- **sight words**（22 URL 树）：hub + 年级 5 + 年级 worksheets 5 + Dolch 支 4 + Fry 支 3 + 活动 4（flashcards/bingo/games/tracing）；**220 词零每词页**，全收在年级页"每变体一块一图"（kindergarten 页 13 min read、约 20 块、~20 图）；**assessment 是独立页形态**（教师版+学生卡+按季度）
- **holiday**：节日 hub = 全站最深页形态（Halloween hub 27+ 件/41 图/18 min read），按活动类型分节（crossword→maze→worksheets→math→coloring→crafts→fine motor→puzzles→writing→games），每件 2-3 句使用场景（sub plans/early finishers/laminate）
- **math multiplication**：变体不拆 URL（单页 10-12 变体），拆的是子品类 11 页（chart/wheels/flashcards/drills/games/BINGO/word problems）；细节页 26 图 14 min read，2020 年老页持续更新养排名
- **name tracing 1 URL**：editable PDF 路线，31 条评论 = 需求清单（要 cursive 版/要换字体/姓名放不下——站长答 nope）

**变现**：免费 PDF 直链无墙 + Mediavine 广告 + 付费 bundle 植入 + leadpages 邮箱捕获。robots `max-image-preview:large`。

### 7.2 Math-Salamanders — 882 页平铺 SBI! 站

**Sitemap 全量【实测 10/29，robots.txt 指路的单文件 RCgCU2iB.xml】**：图片声明 25,289 = **均 28.3 图/页**（高于 Superstar）；**robots 封 GPTBot/anthropic-ai/ClaudeBot 等 8 家 AI 爬虫**。板块：**grade×topic 笛卡尔积 ~130 页**（K~6 年级 × ~19 题维度，每年级固定 5 件套 games/help/worksheets/puzzles/quiz）、calculators 51（公式实体×计算器：area-of-X 13/volume-of-X 7）、times tables 63（**1-12 逐表**+15/20/25/30×30 放大+chart/grid/test/quiz 形态）、addition/subtraction 位数矩阵（2/3/4/5-digit × regrouping）、place value 26、number line **量程矩阵** 19（0-10/20/50/100/blank/negative/decimal/fraction 各一页）、节日×年级×题型三维 37（thanksgiving-math-{k..5th}）。

**页级形态【实勘 3 页】**：欢迎段模板腔 → 学习路径叙述 → **PDF 缩略图网格（核心）** → "Which chart should I use" 选型大段（按年级/用途）→ 12+ 姊妹页链接（各配缩略图）→ How to Print 支持页入口×2；每段绑 "Elementary Math Benchmarks for Grade N" 原文；单表条页每表 4 PDF（color/bw × 10/12）；PV 页 5 范围 × 3 形式（数字槽/10 槽练习/eco 省墨）。同内容有 UK Year 1-6 / AU 镜像站（违反我们"只做美国"不学）。

### 7.3 DadsWorksheets — 760+ 页，与我们同栈（Astro）

**Sitemap 全量【实测 10/29】**：/worksheets/ 平铺 ~450（一练习主题一页）+ /charts/ 家族 ~138 + /puzzles/ ~51。对位家族：**乘法图族 34 URL**（1 主页+10 旧变体页+23 新子目录页，含 8 主题版 summer/space/animals/video-games/sports/dinosaur/dog/pink-swirl）+ multiplication-table singles 7；**place value 族 9 URL = wholes/periods × millions/billions/thousandths/millionths 2×4 矩阵**；hundred chart 12 / roman numerals 12（1-20/1-50/1-100/1-1000 四页 **10-18 仍更新 = 活板块**）/ primes 13（1-100/101-200/201-300/301-400/1-1000 范围矩阵）/ trig 16 / **coordinate plane 14（我们 graph-paper 簇完全没有的最大邻居）** / blank clock 10 / number line 10 / fraction/sqrt/exponent 各 4。

**乘法主页形态【实勘】**：H1 即卖点（"86 High Resolution PDFs, 1-10, 1-12, 1-15 and More!"）→ 10 风格 section（bw/grid/proportioned/color/blank/shaded/口袋/30×30/50×50/100×100）每 section 链子页 → 底部 800+ 字教学。SVG 高清，prebid/gpt 重广告。

### 7.4 K5 Learning — cursive 91 URL 精确矩阵【实测 sitemap】

| 板块 | URL | 板块 | URL |
|---|---|---|---|
| cursive-alphabet（26+hub+guide） | 28 | letter-joins（bottom/bottom-e/top/top-e/c-shaped） | 6 |
| cursive-words（a-words…z-words） | 27 | sentences（**单收藏页不分年级**） | 1 |
| **passages（9 童谣 bo-peep/peter-piper…+11 主题 ocean/apples/baseball…）** | 21 | | |

单字母页**极薄**：一句话+1 缩略 GIF+5 worksheet 链接（4/5 会员锁 $24/年），零教学文字。K5 靠 DR 杠会员制，不靠内容。**两家跑通的新矩阵只有：单词首字母 26、passages 实体 20、joins 5；sentences 两家都不拆页；数字草书两家都没有。**

### 7.5 次级竞品速写

- **GetWorksheet**（Next.js 生成器站，name-tracing 最直接竞手）：一次 10 名字/大小写四选/描红样式 dashed·dotted·grey/字号三档/1-6 行+跟写空行/Letter·A4/**Andika 字体**（单层 a/g 附教学理由）/"浏览器内绘制不上传"隐私句；同引擎切 sight-word 8 词页/spelling/句子页；底部 9 工具缩略图互链网格
- **101planners**（sign-in 在位者）：每模板 **6 格式**（图/Word/填 PDF/GDocs/Excel/GSheets）；学校模板核心是 **18 学生×31 天月度格**+25 学生日表+5 天周格
- **signinsheethub**（EMD 新站，**2026-10-23 上线站龄 6 天**）：三件套下载+大预览 PNG+**浏览器自定义器**（标题/列头/行数/横竖/直接填格）——sign-in 战场 Superstar 缺席、在位者一个 6 天站龄 = 窗口开着
- **printabulls** 感恩节分类 11 帖**评论数 = 需求强度排序**【实勘】：**word scramble 37 条全类目第一** > I Am Thankful 12 > shopping lists/turkey templates 各 6 > bingo/placemats/place cards 各 4 > **word searches 3**；thankful 套装 ≥8 页变体（火鸡羽毛手工格式，与我们写作课取向分野）

### 7.6 跨站机制总结

1. **URL 策略三流派**：变体拆 URL 派（MS 10+ 页/簇、DW 34 页/族 —— SERP 占位多）/ 单页集齐派（Superstar 变体不拆、拆子品类 —— 单页权重集中）/ 碎片会员派（K5 91 薄页靠 DR）。**我们 = 单页集齐 + 对确有量的家族拆 URL（DW 双层结构）**，与 10/18 验收结论一致
2. **图片密度基准 22.9~28.3 图/页**（MS>DW≈Superstar）；K5 极薄页也有 1 图配 pin:media。**图片 SEO 是这些站的结构性流量机器**，不是装饰——#17/#18 扩容密度照 23~28 对标（参考图表型页 6~12 张即可，§6.2 规律不卷）
3. **程序化矩阵四型**（全部"一份数据 × 一个模板"）：实体枚举型（字母×4 模板族=104 页、templates 99 名词）、范围矩阵型（roman/primes/乘法 1-9~100×100、number line 量程、PV 2×4）、年级×活动笛卡尔型（grade×topic 130、sight words 年级×10 活动、节日×年级×题型）、主题×难度型（词搜主题×9 级，换词表即产线）。**最便宜的上量 = 给已验证枚举加第二/第三模板族，不是找新实体**
4. **PDF 是 table stakes 但可后置**：竞品全 PDF 直链；我们浏览器直印是差异化，构建期出 PDF（headless 管线）作为台阶保留，短期 PNG 下载补齐即可
5. **节日日历窗口**（§5.1 已有，竞品覆盖密度确认）：Christmas 两家最深 → **11/15 死线**；100th Day Superstar 专设 Classroom Milestones hub → 12/20 死线；Valentine's → 1/10

### 7.7 chartglade 落位（两线：改版 × 上量）

**A. 上量矩阵机会表**（在位者实锤 + 管线现成，按 确定性×页数 排）：

| # | 矩阵 | 页数 | 引擎/数据 | 立项门 |
|---|---|---|---|---|
| A1 | **Christmas 簇**（词搜+涂色+scramble+Letter-to-Santa 写作纸+hub） | 4-6+hub | 全现成（scramble=PLACEMAT_SCRAMBLES 泛化） | **无需拉量，死线 11/15 进 11 月批** |
| A2 | **乘法单表 matrix table-1..12** | +12 | mathCharts 参数化+[letter].astro 动态路由先例+每表规律文案 data | 无需拉量（multiplication chart 12.1K 在册，三站全重仓） |
| A3 | **100th Day 簇**（百数表×PaintArt=mystery picture 竞品手工做不出）+ "I wish I had 100…" 写作纸 | 3-5+hub | 百数表+PaintArt 现成乘积 | 无需拉量，死线 12/20 进 12 月批 |
| A4 | **节日词搜矩阵**（easter/valentine/st-patrick/spring/summer/winter/back-to-school 各 1 页起步） | +7~15 | wordSearch 引擎+新词表 | 随各节日簇走（valentine 1 月批） |
| A5 | **sight words 年级×活动变体页**（flashcards/bingo/assessment/dolch-nouns） | +5~8 | sightWords.ts 数据在库+SightWordCards 扩 | 👤 拉量：各变体词族合计 ≥10K |
| A6 | **数字 0-10 worksheet 家族 + 100/120 chart 变体** | +8~13 | mathCharts/hundred 引擎 | 👤 拉量 |
| A7 | **number line 量程矩阵**（0-10/20/50/100/blank） | +6~10 | graphPaper SVG 刻度改参 | 👤 拉量 |
| A8 | **telling time 钟面矩阵** | +6~9 | 新 SVG 钟面组件 | 👤 拉量 |
| A9 | **coordinate plane 并入 graph-paper 簇** | +8~14 | graph paper 同源+轴标注层 | 👤 拉量（graph paper 词池邻居） |
| A10 | **roman numerals 范围矩阵** | +5~8 | romanNumerals.ts 一下午 | 👤 拉量（DW 活板块但词量未测） |
| A11 | **宝宝名字库 100~300 页**（renderNameSheetHtml 纯函数 getStaticPaths 预渲染） | 100-300 | 现成纯函数，三家竞手全空白 | 👤 拉量（emma/liam name tracing 采样聚合） |
| A12 | **sign-in 月度考勤格**（18×31/25 学生×5 天） | +1~3 | 纯表格 | 👤 拉量（在位者弱：101planners+6 天站龄 EMD） |
| A13 | **cursive copywork 矩阵**（童谣 9+主题 11） | +10~20 | trace-then-write 泛化 | 👤 拉量（K5 第三大矩阵） |

**B. 改版差距清单**（内容质量对标，按簇）：

| 簇 | 差距（竞品证据） | 改法 |
|---|---|---|
| 全站 | 图片：字母页 26 页 0 图、math 8 页 0 图、读写簇 26 页 1 图（Superstar 22.9 图/页） | #17 扩容第二波：sheet-images 管线跑 26 字母+math 簇+og:image 全站补齐 |
| 全站 | 单页单 printable vs Superstar 每页 20 块（一变体一块一图） | PageDef 加 `variants[]`，ChartPage 渲染多变体锚点段（一次改造全簇受益） |
| cursive | 缺连写教学（Superstar 每字母 ~130 词两段）+单词描红行+prev/next 链 | CursiveLetterDef 加 connect/words 字段；CursiveAZ 加 prev/next（26 页零新 URL 深化） |
| 词搜 | 2 张/主题 vs Superstar 20 张 9 级难度；词表已内联 FAQ | 扩 3-4 档难度+每档节头+锚点；词表谜题旁再露一次 |
| sight words | 每页 1 词卡 vs 年级页 20 块（含 assessment/双序表） | A5 拉量过后按 variants[] 出块；字母序/频率序双表零新数据 |
| name tracing | 生成器单名固定结构 vs GetWorksheet 10 名字/case/行数/字号 | island 扩控件（纯客户端）；补 "My name is…" 句子页模式 |
| sign-in | 无月度格、无自定义器（signinsheethub 6 天站龄在跑） | A12 拉量过后加月度格页+行数/横竖 island |
| hub | 感恩节 hub ~300 词 vs 节日 hub 13-18 min read | hub 卡片下补 2-3 句使用场景（数据进 pages 数组）；#26 Calendar hub 已在 11 月批 |
| 数学支柱 | 无选型指南段/无"How to Print"页/年级 benchmark 未显式 | MS 选型表 + extraSection 补顺序专文 + CCSS 标号显式化（纯文案） |

**C. 明确不做**：Dolch 220 每词一页（两家头部都不做，薄内容风险最高）；cursive words 26 页矩阵（KD58 实测死）；cursive sentences 按年级拆页（两家都不拆）；数字草书（零在位者）；coloring 102/templates 100（漂出主题，§6.3 已裁）；年级×学科大网格（DR0 无底层支撑 = 空壳 hub）；UK/AU 镜像（只做美国）；MS calculators 交互工具族（非打印件场景）。

**一句话**：两站把已立项的 #17/#18 从"单站参考"变"双实锤"（PDF 标配、图片密度上限 38.7/页），真增量集中在 10/25 批三项（PDF 下载、变体图 6~12 张、title 承诺）；词族胜负规律确认参考图表型是 chartglade 主场，cursive / sight words 两族两站均缺位 —— 既有 53 页矩阵路线不动。
