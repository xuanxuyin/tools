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

**一句话**：两站把已立项的 #17/#18 从"单站参考"变"双实锤"（PDF 标配、图片密度上限 38.7/页），真增量集中在 10/25 批三项（PDF 下载、变体图 6~12 张、title 承诺）；词族胜负规律确认参考图表型是 chartglade 主场，cursive / sight words 两族两站均缺位 —— 既有 53 页矩阵路线不动。
