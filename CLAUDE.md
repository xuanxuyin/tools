# CLAUDE.md

多项目仓库：每个子文件夹 = 一个独立部署的静态站。**完整运维/部署手册在 [README.md](./README.md)（中文）—— 任何部署、DNS、GSC、外链问题先读它。** 本文件是开发上下文。

## 仓库结构

- 根目录：`README.md`（运维手册）+ `.gitignore`/`.gitattributes`（对所有子项目生效）
- `tintbrew/` — tintbrew.com，Astro 5 静态站（32 页），**所有开发命令在这个目录里跑**，仓库根目录没有 package.json

## tintbrew 技术要点

- **栈**：Astro 5 纯静态 SSG + 原生 TS islands（无框架）+ 原生 CSS（tokens 在 `src/styles/global.css`）+ 系统字体（零字体请求）
- **色彩引擎**：`src/lib/color.ts` — Oklab 感知混色，纯函数；`colorName.ts` 最近命名色。内部全浮点，只在显示时取整
- **数据驱动的矩阵页**：`src/data/colors.ts` + `src/data/mixes.ts`（24 对）→ `src/lib/mixContent.ts` 生成全部页面内容（meta/答案/FAQ/按 slug hash 选 3 变体文案之一）→ `src/pages/mix/[slug].astro`。
  **加一对新配色 = 改这两个数据文件**，页面/目录/sitemap/内链全自动。**改了 mixes.ts 必须重新生成 `public/_redirects`**（反向 slug 301）
- **SSR-shell 模式**：组件在服务端渲染真实计算值，island（`src/scripts/*.ts`）通过 `data-*` 属性接管交互。**矩阵页必须无 JS 也完整回答问题**（SEO 底线）
- **测试**：vitest 70 个。DOM 测试加载真实 `dist/` HTML（先 `npm run build`）+ happy-dom + `vi.resetModules()`。引擎基准值：红+蓝 50/50 = `#8c53a2`
- **构建**：`npm run build`（32 页），发布前 `npx vitest run` 全绿

## 约定

- 站点文案**英文**；与用户交流**中文**
- 反薄内容：计算出的唯一数据 + 手写事实 + 3 变体文案，禁止模板腔
- URL 规范：**canonical/sitemap/JSON-LD 一律带尾斜杠**（Cloudflare Pages 规范，`SeoHead.astro` 已内置），不要破坏
- 文案语气：朴素英文，标语禁黑话禁 AI 腔（"powered by X" 已被禁过一次）；Oklab 只出现在 how-it-works 正文里
- 结构化数据：工具页 WebApplication、矩阵页 FAQPage + BreadcrumbList；404 是唯一 noindex 页

## 部署与运维（详见 README）

- push 到 main → Cloudflare Pages **自动部署**（Root directory = `tintbrew`），永不手动上传
- DNS 托管在 Cloudflare（zone `tintbrew.com`）。**Vercel 已弃用**（账号被手机验证封禁，`vercel.json` 是死配置仅存档）
- GSC 已验证（TXT 在 CF DNS）；统计 = CF Web Analytics **边缘自动注入**——**不要**往 `consts.ts` 填 beacon token（会双重计数）；备用 token 见 README
- 邮箱 `hello@tintbrew.com` = CF Email Routing 转发（已验证可用）

## 踩过的坑（勿重蹈）

- Node ESM 无法 import 无扩展名 TS —— 一次性引擎脚本改用临时 vitest 文件跑
- happy-dom 的 Document 与 lib.dom 名义类型不同 —— 在加载边界处一次 `as unknown as Document`
- 本机在国内：**本地打不开站 ≠ 站挂了**。验证用权威 NS（`nslookup tintbrew.com chin.ns.cloudflare.com`）或 `curl --resolve tintbrew.com:443:104.21.41.71`，不要凭本地解析下结论
- `mixes.ts` 里同对颜色反序算重复（sorted-key 唯一性测试守着），加新对子先跑测试

## V2 路线（完整计划在 README）

优先级：**V2.1 场景长尾页**（颜色×生活，如 coffee wood stain，词簇调研先行）→ V2.2 更多配色对 → V2.3 新工具（互补色/对比度可直接复用引擎的 `contrastRatio`）→ V2.4 外链。
**V2.1 启动条件：GSC 显示首批页面已编入索引。**
