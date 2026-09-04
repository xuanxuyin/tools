# CLAUDE.md

这是**海外工具栈仓库**：一个放多个出海工具站的基地，每个子文件夹 = 一个独立上线的站（独立域名、独立部署、独立变现）。与用户交流用**中文**；站点本身全部**英文**。

完整运维/部署手册在 [README.md](./README.md)（含从 0 到部署的 11 步实录、关键词验收清单、V2 计划）。部署/DNS/GSC/外链问题先读它。

## 仓库级约定（适用所有项目）

- 每个子文件夹一个站；新项目 = 新建子文件夹，**部署时 Root directory 填子文件夹名**
- **所有命令在子文件夹里跑**，仓库根目录没有 package.json
- `.gitignore`/`.gitattributes` 在根目录，对所有子项目生效（勿搬进子文件夹）

### 选品门槛（每个新项目必须先过）

先 KD 调研再动手：0~10 长尾做内容矩阵起步 / 20~30 做工具页 / 40+ 新站不碰。用 Ahrefs 或浏览器 AITDK 插件拉量和 SERP 竞品 DR。数据说话再买域名（Spaceship 买，DNS 托管 Cloudflare）。

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

### tintbrew/ — tintbrew.com（2026-09-04 上线）

颜色工具站：Oklab 混色器 + 格式转换器 + 24 个"两种颜色混成什么"矩阵页，32 页，70 测试。

- **色彩引擎**：`src/lib/color.ts`（Oklab 感知混色，纯函数，内部全浮点显示时才取整）+ `colorName.ts`
- **数据驱动矩阵页**：`data/colors.ts` + `data/mixes.ts` → `lib/mixContent.ts` 生成全部内容（meta/答案/FAQ/3 变体按 slug hash）。**加一对配色 = 改这两个文件，其余全自动；改了 mixes.ts 必须重新生成 `public/_redirects`**（反向 slug 301）
- **测试基准**：红+蓝 50/50 = `#8c53a2`；DOM 测试加载真实 `dist/` HTML + `vi.resetModules()`
- **统计**：CF Web Analytics 边缘自动注入 —— **不要**往 `consts.ts` 填 beacon token（双重计数）
- **V2.1**（场景长尾页，如 coffee wood stain）启动条件：GSC 首批页面已编入索引；完整计划在 README
