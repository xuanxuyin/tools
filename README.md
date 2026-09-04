# tools — 多项目仓库

一个仓库放多个网站项目，每个项目一个子文件夹，独立部署。

| 项目 | 是什么 | 技术 | 托管 |
|---|---|---|---|
| [tintbrew/](./tintbrew) | [tintbrew.com](https://tintbrew.com) — 免费颜色工具站（Oklab 混色器、格式转换、"两种颜色混成什么"24 页答案矩阵） | Astro 5 静态生成 + 原生 TS islands | Cloudflare Pages |

---

## 平台分工（谁管什么）

| 平台 | 网址 | 职责 | 备注 |
|---|---|---|---|
| **GitHub** | github.com/xuanxuyin/tools | 存代码。`git push` 到 main → Cloudflare **自动**重新部署（1~3 分钟） | 日常只需要碰它 |
| **Cloudflare** | dash.cloudflare.com | ① Pages 网站托管 ② DNS 解析 ③ Web Analytics 访问统计 ④ Redirect Rule（www 跳主域） | 四样都在这一家 |
| **Spaceship** | spaceship.com | 只剩一个职责：**域名续费**（$9.98/年） | DNS 已移交 Cloudflare，平时不用碰 |
| **Google Search Console** | search.google.com/search-console | SEO 监控：收录量、关键词排名、站点地图状态 | 每周看一次 |

**数据流**：改代码 → push 到 GitHub → Cloudflare 自动构建部署 → 用户访问 → Google 抓取 → GSC 看效果。

---

## 当前状态：✅ 2026-09-04 全部上线完成

- 网站线上地址：**https://tintbrew.com**（32 页，HTTP/2 + HTTPS + 全球 CDN）
- 域名：Spaceship 注册，NS 已指向 `chin.ns.cloudflare.com` / `rocco.ns.cloudflare.com`
- GSC：Domain 属性已验证（TXT 记录），站点地图已提交（31 个 URL）
- 访问统计：Cloudflare Web Analytics **自动注入模式**（已收到真实访问数据）
- URL 体系：尾斜杠规范 + www→主域 301 + 反向 slug 301，全部验证通过

---

## 首次部署全记录（已完成，重配时照抄）

1. ✅ 网站代码完成，推送 GitHub `main`
2. ✅ Cloudflare 账号（免手机验证）
3. ✅ Cloudflare → Add a domain → `tintbrew.com` → Free 计划；
   删掉旧的 Vercel A/CNAME 记录，保留 GSC TXT
4. ✅ Spaceship → Nameservers → Custom → `chin.ns.cloudflare.com` + `rocco.ns.cloudflare.com`
5. ✅ GSC 验证 + 提交 `https://tintbrew.com/sitemap-index.xml`
6. ✅ Pages 建项目：Workers & Pages → Create → Pages → Import Git → `tools` 仓库
7. ✅ 绑域名：Custom domains → `tintbrew.com` + `www.tintbrew.com`（同账号 DNS，自动激活）
8. ✅ Web Analytics 自动注入（token `a6abcb30a8034b84b7d619bd6e67bd29` 备用：
   若日后关自动注入，填进 `tintbrew/src/consts.ts` 的 `cfBeaconToken`）
9. ✅ www 跳主域：Rules → Redirect Rules → 表达式 `(http.host eq "www.tintbrew.com")` →
   Dynamic → `concat("https://tintbrew.com", http.request.uri.path)` → 301

### Pages 项目配置（照抄）

| 配置项 | 值 |
|---|---|
| Project name | `tintbrew` |
| Production branch | `main` |
| **Root directory** | **`tintbrew`** ⚠️ 必填（站点在子文件夹里） |
| Build command | `npm run build` |
| Build output directory | `dist` |

---

## 日常更新流程（改了代码怎么发布）

```bash
cd tintbrew
npm run build        # 本地验证构建（32 页）
npx vitest run       # 70 个测试全过再发布
git add -A && git commit -m "feat: 改了什么" && git push origin main
```

push 后 1~3 分钟 Cloudflare 自动部署完成。查看进度：Cloudflare → Workers & Pages →
tintbrew → Deployments。部署卡住/失败时：最新那条 → ⋯ → **Retry deployment**。

> 注：Production 部署下面显示的 Domains 是 `tintbrew.pages.dev` —— 这是正常的，
> 自定义域名在单独的 **Custom domains** 标签页里，自动指向 Production。

---

## URL 规范（重要，改动前必读）

- **带尾斜杠是标准形**：Cloudflare Pages 把 `/mix/red-blue` 308 到 `/mix/red-blue/`。
  canonical 标签、sitemap、301 跳转目标**全部带斜杠**（`SeoHead.astro` 已内置）。
- **www → 主域 301**：由 Cloudflare Redirect Rule 处理，保留路径和查询串。
- **反向 slug 301**：`/mix/blue-red` → `/mix/red-blue/`（单跳），定义在 `public/_redirects`。
- **静态资源永久缓存**：`/_astro/*` 一年 immutable，定义在 `public/_headers`。

## 验证清单（每次改版后跑一遍）

```bash
# 国内 DNS 可能缓存旧记录，用 --resolve 直接打 Cloudflare IP 最准
curl -s -o /dev/null -w "%{http_code}\n" --resolve tintbrew.com:443:104.21.41.71 https://tintbrew.com/
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" --resolve www.tintbrew.com:443:104.21.41.71 https://www.tintbrew.com/mix/red-blue
curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" --resolve tintbrew.com:443:104.21.41.71 https://tintbrew.com/mix/blue-red
curl -s --resolve tintbrew.com:443:104.21.41.71 https://tintbrew.com/sitemap-index.xml | head -3
```

预期：200 / 301 到主域 / 301 到 `/mix/red-blue/` / XML 正常。

---

## 关键文件在哪（tintbrew/ 内）

| 文件 | 作用 |
|---|---|
| `src/consts.ts` | 站点常量：GSC 验证码、CF 统计 token（备用） |
| `src/data/mixes.ts` | 24 个配色对原始数据（加新配色页从这加） |
| `src/data/colors.ts` | 颜色定义表 |
| `src/lib/color.ts` | Oklab 混色引擎（纯函数 + 测试） |
| `src/lib/mixContent.ts` | 矩阵页内容生成（meta/答案/FAQ/变体文案） |
| `src/components/SeoHead.astro` | canonical/OG/结构化数据（尾斜杠规则在这） |
| `public/_redirects` | 反向 slug 301 |
| `public/_headers` | 静态资源缓存规则 |
| `public/robots.txt` | 指向站点地图 |
| `scripts/generate-og.mjs` | 重新生成分享卡片图：`npm run og` |
| `vercel.json` | Vercel 时代遗留，已废弃（保留备用） |

---

## 踩过的坑（备忘）

1. **Vercel 注册被手机验证卡死**（"Too many phone numbers attempted"，账号被标记）
   → 切 Cloudflare Pages，一切顺利。教训：验证码类操作失败后别连续重试。
2. **国内 DNS 缓存旧记录**：删掉 Vercel A 记录后，本地解析还指向 `76.76.21.21`
   长达 1 小时+，看起来像"网站挂了"。**判断真相查权威 NS**：
   `nslookup tintbrew.com chin.ns.cloudflare.com`
3. **`tintbrew.pages.dev` 国内经常打不开** ≠ 站点故障；Google 和海外用户正常。
4. **curl 检测统计脚本需要浏览器 UA**：Cloudflare 自动注入只对浏览器请求生效。
5. **Redirect Rule 的 Dynamic URL 必须是表达式**：`concat("https://tintbrew.com", http.request.uri.path)`，
   直接粘纯网址会报 `could not parse filter value expression`。
6. 构建日志里 `undici EBADENGINE` 警告无害，可忽略。

---

## 上线后的 SEO 节奏

- **明天**：看 GSC 站点地图是否变"成功"（站点已可抓取，最迟一两天）；没变就重新提交。
- **每周**：GSC → Pages（收录数，31 页起步）/ Performance（曝光与排名）。
  新域名收录 2~7 天开始有效果，排名 1~3 个月起量，**前期没数据是正常的**。
- **增长手段**：第二批配色对（加 `mixes.ts` + `colors.ts` 即自动生成全套页面）、
  新工具页（对比色生成器、调色板导出等）、外链（工具目录站提交）。
- Google 会自动重抓；重大更新可在 GSC 里手动提交 URL。
