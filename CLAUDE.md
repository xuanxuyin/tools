# CLAUDE.md

这是**海外工具栈仓库**：一个放多个出海工具站的基地，每个子文件夹 = 一个独立上线的站（独立域名、独立部署、独立变现）。**全仓前提：所有工具和网页都只针对美国市场做**，任何决策先过这条。与用户交流用**中文**；站点本身全部**英文**。

完整运维/部署手册在 [README.md](./README.md)（含从 0 到部署的 11 步实录、关键词验收清单、V2 计划）。部署/DNS/GSC/外链问题先读它。

## 仓库级约定（适用所有项目）

- 每个子文件夹一个站；新项目 = 新建子文件夹，**部署时 Root directory 填子文件夹名**
- **文档与代码分离**：作战文档统一放 `docs/<项目名>/`（PLAN.md / DISTRIBUTION.md…），**项目子文件夹只放代码**，文档不进项目文件夹
- **每日工作实时入 PLAN**：每天做了什么（上线/数据/分发/决策）**当天**更新进 `docs/<项目名>/PLAN.md` —— 时间线加一行、任务表勾掉、数字记进 §2；PLAN 没写 = 没发生
- **所有命令在子文件夹里跑**，仓库根目录没有 package.json
- `.gitignore`/`.gitattributes` 在根目录，对所有子项目生效（勿搬进子文件夹）

### 选品门槛（每个新项目必须先过）

先 KD 调研再动手：0~10 长尾做内容矩阵起步 / 20~30 做工具页 / 40+ 新站不碰。用 Ahrefs 或浏览器 AITDK 插件拉量和 SERP 竞品 DR。数据说话再买域名（Spaceship 买，DNS 托管 Cloudflare）。

### 语言与受众规则（硬约束）

目标市场是**美国**（唯一市场，不是"美国/海外"泛指）—— 一切面向用户的语言和用法遵循**美式习惯**：

- **美式拼写**：color（非 colour）、gray（非 grey）、center、optimize、favorite；关键词调研也用美式拼法
- **美式度量与文化语境**：英制单位（inches/feet/oz/°F）、math（非 maths）、US 常见品牌/节日/场景类比；涉及地理的例子用美国语境
- **语气**：直接、利益先行、口语化可读，符合美国 web 用户习惯；避免英式/中式表达直译
- **SERP 以 google.com 美国区为准**：验收排名、看竞品、拉关键词都用 US 视角（无痕 + 美国代理，或工具默认 US 数据源）
- **美国日历准则（做任何"季节/时间"判断前先过这条）**：开学季 = 8 月中下旬（不是 9/1，8 月~10 月是使用高峰）；感恩节 = 11 月第四个周四；100th Day of School = 1~2 月（K-2 大日子）；Teacher Appreciation Week = 5 月第一周。季节性内容**提前 4~6 周上线**（Google 收录+爬排名需要时间）。绝不用中国日历（9/1 开学、10/1 假期）推美国节奏

### 技术栈模板（tintbrew 验证过，直接复用）

Astro 5 纯静态 SSG + 原生 TS islands（无框架）+ 原生 CSS tokens + 系统字体（零字体请求）。
部署 Cloudflare Pages（push 到 main 自动部署）；统计 CF Web Analytics 自动注入；邮箱 CF Email Routing。

### SEO 纪律（每个站都必须遵守）

- **SSR-shell 模式**：服务端渲染真实计算值，island 经 `data-*` 接管交互；**关键内容无 JS 也完整**（SEO 底线）
- **反薄内容**：每页有计算出的唯一数据 + 手写事实 + 多变体文案，禁模板腔
- **URL 带尾斜杠**（Cloudflare Pages 规范），canonical/sitemap/JSON-LD 一致
- JSON-LD 三件套：工具页 WebApplication、内容页 FAQPage + BreadcrumbList；404 唯一 noindex
- 文案语气：朴素英文，标语禁黑话禁 AI 腔；技术词只出现在 how-it-works 正文
- 发布前 `npm run build` + `npx vitest run` 全绿

### 本机环境坑（国内开发机）

- 本地打不开站 ≠ 站挂了：验证用权威 NS（`nslookup 域名 chin.ns.cloudflare.com`）或 `curl --resolve 域名:443:<CF IP>`
- Vercel 已弃用（账号被手机验证封禁）—— 基地内项目一律 Cloudflare
- Node ESM 不能 import 无扩展名 TS —— 一次性脚本走临时 vitest 文件
- happy-dom Document ≠ lib.dom Document —— 边界处一次 `as unknown as Document`

---

## 项目档案

### chartglade/ — chartglade.com（2026-09-05 上线）

> 作战计划 `docs/chartglade/PLAN.md` · 分发手册 `docs/chartglade/DISTRIBUTION.md`（每日工作当天更新进 PLAN）

免费教学打印图表站（printables）：4 支柱簇 + 散页 + 3 hubs + **cursive 单字母矩阵 26 页（/cursive/a/~/z/）= 53 页**，22 测试全绿。关键词池 251K US/月（cursive alphabet 201K 量王 / place value chart 27.1K / kindergarten sight words 12.1K / multiplication chart 12.1K），调研档在 `research/cheat-sheet-data.md`。

- **页面即打印件**：`@media print` 剥成一张 letter 纸（`.printable` 系统、landscape 子页给宽表格、`.sheet-break` 双页套打）；`[data-print]` → `window.print()`
- **数据驱动**：`src/data/*.ts` 每页一条 PageDef（内容/SEO/FAQ/tips 全在数据里）→ `ChartPage.astro` 唯一模板 + `components/printables/*` 渲染；加图表页 = 数据文件加一条 + 一个 find-by-slug wrapper，Footer/hub 自动带出。**单字母矩阵走动态路由** `pages/cursive/[letter].astro`（getStaticPaths 遍历 `cursiveLetters.ts`，LetterSheet 扩展字段给打印组件：capitalSteps/lowerSteps/pitfall）
- **引擎纯函数在 `src/lib/`**：`mathCharts.ts`（乘法表/位值列/formatUs）+ `sightWords.ts`（Dolch 220 逐字 + Fry first 100 含第 49 位 their，曾漏）
- **交互只是文本替换**：SSR 把 data-fact 句子预写在单元格，`scripts/interact.ts` 全局委托只换 `.fact-line` 的 textContent
- **字体自托管**：Dancing Script 700（草书展示）+ Caveat 500（描红）woff2，仅 cursive 页加载；其余页零字体请求
- **部署差异**：CF Pages Root directory = `chartglade`；GSC 验证值填 `src/consts.ts` gscVerification；CF 统计自动注入（beacon 留空）

### tintbrew/ — tintbrew.com（2026-09-04 上线）

> 作战计划 `docs/tintbrew/PLAN.md` · 分发手册 `docs/tintbrew/DISTRIBUTION.md`（每日工作当天更新进 PLAN）

颜色工具站：Oklab 混色器 + 格式转换器 + 24 个"两种颜色混成什么"矩阵页 + 8 个场景/头词页（what-colors-make-{brown,purple,green,orange} + 烘焙 2 + 色卡 2）+ /color-guides/ hub，41 页，81 测试。

- **色彩引擎**：`src/lib/color.ts`（Oklab 感知混色，纯函数，内部全浮点显示时才取整）+ `colorName.ts`
- **数据驱动矩阵页**：`data/colors.ts` + `data/mixes.ts` → `lib/mixContent.ts` 生成全部内容（meta/答案/FAQ/3 变体按 slug hash）。**加一对配色 = 改这两个文件，其余全自动；改了 mixes.ts 必须重新生成 `public/_redirects`**（反向 slug 301）
- **测试基准**：红+蓝 50/50 = `#8c53a2`；DOM 测试加载真实 `dist/` HTML + `vi.resetModules()`
- **统计**：CF Web Analytics 边缘自动注入 —— **不要**往 `consts.ts` 填 beacon token（双重计数）
- **V2.1 进度**：W1 烘焙 4 页 + brown 头词页 + hub（2026-09-05）与 W2 三色头词页 purple/green/orange（合计 58.4K/月，2026-09-05）均已上线，共 41 页；后续波次计划在 `docs/tintbrew/PLAN.md`
