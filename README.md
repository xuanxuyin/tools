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
- 域名邮箱：`hello@tintbrew.com` 经 Cloudflare Email Routing 免费转发到真实邮箱（已实测）
- URL 体系：尾斜杠规范 + www→主域 301 + 反向 slug 301，全部验证通过

---

## 从 0 到部署：完整流程实录（✅ 已全部完成；新项目照此复刻）

> 每一步标注了在哪个网站操作。做第二个项目时从第 1 步换成新域名，其余照抄。

### 第 0 步 · 选题与 KD 调研 —— 决定做什么，再花钱

**先调研、后买域名、再写代码** —— 顺序不能反。本站当时的调研结论直接决定了产品形态。

1. **拉关键词数据**（Ahrefs / 浏览器 AITDK 插件都行）：
   头部词搜索量、KD（关键词难度）、SERP 前 10 名的 DR（域名权重）
2. **判断新域名（DR 0）能打什么**：

   | KD | 打法 |
   |---|---|
   | 0~10（长尾） | 新站唯一能立刻拿流量的地方，**做内容矩阵起步** |
   | 20~30（腰部） | 用**工具页**打（工具有留存和自然外链，比文章能打） |
   | 40+ | 新站不碰 |

3. **本站调研实例**（2026-09 做的决策）：
   - "color mixer / mix colors online"：KD 27，竞品 DR 39~62 → 做工具页（/color-mixer）
   - "what color does red and blue make"：KD 0，SERP 全是弱内容 → 做长尾矩阵（24 个 /mix/ 页）
   - 差异点：竞品全是 sRGB 平均混色 → 我们用 Oklab 感知混色 + paint-vs-screen 双答案
4. 调研定型 → 选域名（品牌化、好记、.com）→ 才进入第 1 步

### 第 1 步 · 买域名 —— Spaceship

- spaceship.com → 搜索域名 → 购买（本站 `tintbrew.com`，$9.98/年）
- 刚买完默认用 Spaceship 自带 DNS，后面第 4 步会整体迁到 Cloudflare

### 第 2 步 · 写代码 —— 本地 + GitHub

- 在仓库子文件夹（`tintbrew/`）里开发；发布前 `npm run build`（32 页）+
  `npx vitest run`（70 测试）全绿
- `git push origin main` 推上去

### 第 3 步 · 注册托管账号 —— Cloudflare

- dash.cloudflare.com → 邮箱注册，免手机验证
- （先试过 Vercel，被手机验证封号卡死，遂切换 —— 详见"踩过的坑"第 1 条）

### 第 4 步 · 域名 DNS 搬进 Cloudflare（一次性）

- Cloudflare 首页 → **Add a domain** → `tintbrew.com` → **Free** 计划
- 检查扫描出的记录：**删掉指向旧托管商的**（Vercel 的 A `76.76.21.21`、
  CNAME `cname.vercel-dns.com`）；TXT 验证记录保留（没扫到就手动 Add record 补，见第 6 步）
- Cloudflare 分配 2 个 nameserver（本站：`chin.ns.cloudflare.com` / `rocco.ns.cloudflare.com`）
- **Spaceship** → Domains → tintbrew.com → **Nameservers** → Custom →
  填入两个新 NS（替换 launch1/launch2.spaceship.net）→ Save
- 回 Cloudflare 点 **I updated my nameservers** → 等激活（几分钟~几小时，有邮件）
- ⚠️ 从此 Spaceship 只管续费；**所有 DNS 记录都在
  Cloudflare → tintbrew.com → DNS → Records 里管理**（Spaceship 的 DNS 面板清空是正常的）

### 第 5 步 · 部署网站 —— Cloudflare Pages

- **Workers & Pages** → Create → **Pages** 标签 → Connect to Git →
  授权 GitHub → 选 `tools` 仓库，配置照抄：

| 配置项 | 值 |
|---|---|
| Project name | `tintbrew` |
| Production branch | `main` |
| **Root directory** | **`tintbrew`** ⚠️ 站点在子文件夹必填 |
| Build command | `npm run build` |
| Build output directory | `dist` |

- Save and Deploy → 得到 `tintbrew.pages.dev` 临时域名（国内打不开≠失败）

### 第 6 步 · Google 收录基础 —— GSC

- search.google.com/search-console → **Add Property → Domain 类型** → `tintbrew.com`
- 复制 TXT 值（`google-site-verification=...`）→ **Cloudflare → DNS → Add record**：
  Type `TXT` / Name `@` / Value 整串粘贴 / TTL Auto
- 回 GSC 点 **Verify**（DNS 生效后即过）
- **Sitemaps** → 输入**完整 URL**：`https://tintbrew.com/sitemap-index.xml` → Submit
  （⚠️ Domain 属性的输入框不带预填域名，必须带 `https://` 全称，只填路径会报"地址无效"）

### 第 7 步 · 绑主域名 —— Pages Custom domains

- Pages 项目 → **Custom domains** → Set up a custom domain → `tintbrew.com` → Activate
  （DNS 在同一家 Cloudflare → **自动创建解析记录、自动激活，无需手动加任何 DNS**）
- 同法再加 `www.tintbrew.com`
- 注：Production 部署卡片上显示的 Domains 是 pages.dev，正常；自定义域名在 Custom domains 标签页

### 第 8 步 · www 跳主域 —— 新增 Redirect Rule

- **Rules → Redirect Rules → Create**（可选 "Redirect from WWW to root" 模板）
- If 条件（点 `</>` Edit expression 切表达式模式）：

  ```
  (http.host eq "www.tintbrew.com")
  ```

- Then：Dynamic redirect → 目标填**表达式**（直接粘纯网址会报 parse error）：

  ```
  concat("https://tintbrew.com", http.request.uri.path)
  ```

- Status `301`，勾选保留查询串 → Deploy → 已验证：路径和查询串完整保留

### 第 9 步 · 访问统计 —— Web Analytics

- **Web Analytics → Add a site** → `tintbrew.com` → 开**自动注入**
  （Cloudflare 在边缘给真实浏览器请求自动插脚本，代码零改动）
- 备用 token 见顶部"当前状态"第 4 条

### 第 9.5 步 · 域名邮箱 —— Email Routing（免费，2026-09-04 已验证可用）

- Cloudflare → tintbrew.com → **Email → Email Routing** → 启用
  （自动往 DNS 加 MX/SPF 记录，一键）
- **Destination addresses** → 添加真实邮箱（QQ/163/Gmail 均可）→ 收确认邮件点验证
- **Routing rules** → Create → Custom address 填 `hello` → 动作选转发到真实邮箱
- 效果：`hello@tintbrew.com` 的来信自动转发到真实邮箱，零维护、零费用，
  站内 Contact/Privacy 页引用的地址即真实可用
- 注意：Cloudflare 会拒收无 SPF/DKIM 认证的直连裸投邮件（防伪造），属正常保护；
  首封转发信可能进垃圾箱，标记一次即可

### 第 10 步 · 上线验证 + 收尾

- 跑下节"验证清单"的 curl 命令（全 200/301 即通过）
- 按"上线后操作清单"做今天的 3 个 Request indexing

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

## 上线后操作清单（按时间顺序做）

### 今天 · 一次性（约 10 分钟）

1. **GSC 手动请求索引**（每个网址只请求一次，勿重复）：
   GSC 顶部搜索框 → 粘贴网址 → 回车 → **Request indexing** → 等它跑完，依次做这三个：
   - `https://tintbrew.com/`
   - `https://tintbrew.com/color-mixer/`
   - `https://tintbrew.com/mix/red-blue/`
2. 剩下 28 个页面**不用动** —— Google 会顺着站点地图和内链自己发现。

### 本周

3. **明天看站点地图状态**：GSC → Sitemaps → 应从"无法抓取"变"成功"；
   没变就重新提交一次。
4. **拿首批外链**：提交 2~3 个免费工具目录站（收录加速器）。
   要提交清单找 Claude 要。

### 每周例行（5 分钟，固定动作）

5. GSC → **Pages**：已索引页面数（目标 0 → 31）。
6. GSC → **Performance**：曝光/点击/出现的查询词（前 1~2 个月纯观察，没数据正常）。
7. Cloudflare → **Web Analytics**：访问量曲线。

### 什么时候找 Claude

- 想启动 V2 内容批次 / 加新工具（见下）
- GSC 出现异常（收录下降、报错、流量突变）
- 想分析哪些词开始有排名、下一步写什么

---

## V2 增长计划

### 核心洞察（2026-09-04 发现）

"How to Make Coffee Wood Stain" 这类**颜色 × 生活场景**的长尾词：竞争极低（KD≈0）、
搜索意图明确、总量巨大，而且与现有 24 个 `/mix/` 页面构成**天然内链漏斗** ——
场景页回答"为什么/怎么做"，混色工具页承接"动手试"。

### V2.1 场景长尾页（第一批 15~20 页）— 优先级最高

候选方向（上线前先批量拉搜索量/难度筛选 top 20）：

| 场景 | 例词 |
|---|---|
| 木器/DIY 染色 | how to make coffee wood stain、gray wash、weathered wood look |
| 肤色调色 | what colors make skin tone |
| 绘画颜料 | what colors make brown paint、how to darken acrylic paint |
| 烘焙糖霜 | icing color chart、how to make brown icing、fondant colors |
| 手工材料 | how to color slime、polymer clay colors |
| 家装墙面 | how to darken wall paint、paint tinting guide |

每页结构：场景科普 + 调色原理 + 色卡/比例表（引擎现算）+ 内链相关 `/mix/` 页 + FAQ。
执行流程：Claude 做词簇调研（搜索量+KD）→ 确认 top 20 → 复用 mixContent 模式批量生成。

### V2.2 第二批配色对（+20~30 页，低成本高确定性）

扩展 `colors.ts`（gray、cyan、magenta、gold、navy、turquoise、lavender、beige…）+
`mixes.ts` 配对 —— 现有架构**自动**生成全套：页面、目录、301、sitemap、内链。

### V2.3 新工具页

| 工具 | 备注 |
|---|---|
| 互补色/对比色生成器 | 引擎已有 `contrastRatio`，顺手加 WCAG 对比度检查 |
| 图片取色/调色板导出 | 流量入口型工具 |
| Oklab 渐变生成器 | 差异化（别人都是 sRGB 渐变） |

### V2.4 外链与分发

- 每个新工具/新批次上线 → 提交一轮工具目录站
- Reddit（r/DIY、r/painting，先读版规）、Pinterest 场景图分发

### 节奏与指标

- **启动条件**：GSC 显示首批页面已索引（预计上线后 1~2 周）→ 启动 V2.1
- **节奏**：每批上线后观察 3~4 周再上下一批（新站别一次堆太多页）
- **北极星指标**：GSC 每 28 天曝光数（impressions）环比增长
- **变现节点**：自然流量稳定过 ~300 次访问/天 后接入广告（当前零广告代码）
