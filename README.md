# tools — 多项目仓库

一个仓库放多个网站项目，每个项目一个子文件夹，独立部署。

| 项目 | 是什么 | 技术 | 托管 |
|---|---|---|---|
| [tintbrew/](./tintbrew) | [tintbrew.com](https://tintbrew.com) — 免费颜色工具站（Oklab 混色器、格式转换、"两种颜色混成什么"24 页答案矩阵） | Astro 5 静态生成 + 原生 TS islands | Cloudflare Pages |
| [chartglade/](./chartglade) | [chartglade.com](https://chartglade.com) — 免费教学打印图表站（place value / 乘法表 / 高频词 / 草书字母，27 页） | Astro 5 静态生成 + @media print 打印系统 | Cloudflare Pages |

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

- 网站线上地址：**https://tintbrew.com**（41 页，HTTP/2 + HTTPS + 全球 CDN）
- 域名：Spaceship 注册，NS 已指向 `chin.ns.cloudflare.com` / `rocco.ns.cloudflare.com`
- GSC：Domain 属性已验证（TXT 记录），站点地图已提交（37 个 URL）
- 访问统计：Cloudflare Web Analytics **自动注入模式**（已收到真实访问数据）
- 域名邮箱：`hello@tintbrew.com` 经 Cloudflare Email Routing 免费转发到真实邮箱（已实测）
- URL 体系：尾斜杠规范 + www→主域 301 + 反向 slug 301，全部验证通过

---

## chartglade — 第二个站（2026-09-05 上线）

- **域名**：chartglade.com 已购（Spaceship CN¥60.94），NS 已搬 Cloudflare，主域已绑 Pages
- **形态**：页面即打印件 —— `@media print` 把页面剥成一张干净的 letter 纸，打印按钮一键输出；宽表格（乘法 1-15/1-20、数轴）自动横版
- **27 页**：place value 簇 4 + multiplication 簇 4 + sight words 阶梯 5 + cursive 主页 1 + 散页 5（fraction/hundred/number line/addition/alphabet）+ 3 个 hub + 首页 + about/privacy/contact/404
- **关键词池 251K US/月（4 支柱）**：cursive alphabet 201K（裸词 SERP 已实勘：软）、place value chart 27.1K、kindergarten sight words 12.1K、multiplication chart printable 12.1K；调研全档在 `research/cheat-sheet-data.md`
- **本地验证**：`npm run build` 27 页 ✓ · `npx vitest run` 17/17 ✓ · `npx astro check` 0 错误 ✓
- **线上验证（2026-09-05）**：主域 200 ✓ · www 301 带路径 ✓ · sitemap/robots ✓ · 国内直连可开 ✓

### chartglade 部署实录（2026-09-05，含每个坑 —— 第三个站照此抄）

1. **加入 Cloudflare**：Add a domain → chartglade.com → 选 Free。问"要不要现在配 DNS 记录"时点 **Add records later**（空域名没有可迁记录，真记录后面全由 Pages 自动加）
2. **改 NS**：CF 会分配**新的 NS 对**（不一定和 tintbrew 的 chin/rocco 相同，以界面显示为准）→ Spaceship → Domains → Nameservers → Custom DNS 填这两个 → 等 CF 邮件确认 Active
3. **建 Pages 项目（⚠️ 最大的坑）**：Workers & Pages 只有 **Create application** 按钮 → 进去后顶部有 **Workers | Pages** 两个标签，**必须切到 Pages**；找不到标签就把地址栏结尾 `/create/workers` 手动改成 `/create/pages`
   - **建错成 Workers 的症状**：Build configuration 里出现 `Deploy command: npx wrangler deploy` 和 `Version command` —— 纯静态站没有 wrangler 配置必失败。发现建错就 Settings → 拉到底 Delete project，回第 3 步重来（改成 Pages 后这几个字段消失，只剩 Build command / Output directory / Root directory）
4. **Root directory（⚠️ 第二个坑）**：第一屏只有 Project name，**Root directory 在第二屏"Set up builds and deployments"里**（可能要点开 Advanced）。填 `chartglade`
   - **忘填的症状**：构建日志 `Could not read package.json: /opt/buildhome/repo/package.json`（它在仓库根找）。补救：项目 Settings → Builds & deployments → Build configuration → Edit → Root directory=`chartglade` → Save → Deployments → Retry deployment
   - 最终配置：Framework preset **Astro** / Build command `npm run build` / Build output directory `dist` / Root directory `chartglade`
5. **绑主域**：Pages 项目 → **Custom domains** 标签 → Set up a custom domain → `chartglade.com` → CF 识别到同账号 zone 自动配 DNS → **Activate domain**（zone 必须已 Active，否则一直转圈）
6. **www 301 跳主域**（⚠️ 表单语法坑）：
   - zone → DNS → 加 `www` CNAME → `chartglade.pages.dev`，**橙云 Proxied 开着**（流量先进 CF 规则才能接管）
   - zone → **Rules → Redirect Rules → Create rule** → 模板选 **Redirect from WWW to root**；匹配方式三选一里选 **Wildcard pattern**
   - Wildcard pattern：`https://www.chartglade.com/*`（必须带协议头，否则报 "Please include the protocol"）
   - Status **301**，Target URL：`https://chartglade.com/${1}` —— **必须花括号 `${1}`**，写 `$1` 会报 "Error in the replacement syntax"
7. **robots.txt 惊吓（正常）**：CF 会自动在静态 robots.txt 前面加一段 Content-Signal / AI 爬虫拦截（GPTBot、ClaudeBot 等 Disallow），**Google 搜索不受影响**（search=yes + Allow / 保留），对我们有利，不用管
8. **⚠️ DNS 里 Pages 自动生成的 CNAME 永远不要手动改（本站踩过，站挂了）**：绑主域时 CF 自动加的 apex CNAME 指向的是项目**真实子域名** —— 本项目创建时自动用了仓库名，真名是 `tools-6hx.pages.dev`（tools 被全球占用加了后缀），**不是** `chartglade.pages.dev`。手动改成猜的名字 → 全站 `error code: 1014`（CNAME Cross-User Banned）。判断项目真名：Pages 项目列表 → 项目名那一栏
9. **GSC 提交站点地图（⚠️ 输入框前面自带域名）**：Sitemaps 页的输入框**左侧已经印着你的域名**，框里只填 `sitemap-index.xml`（不带 https://、不带域名、不带斜杠）。填完整 URL 或带域名会报"站点地图地址无效 请输入一个指向您网站中的站点地图的有效路径"—— 查半天 DNS/robots 都是白查，其实就是多填了前缀

### chartglade 还差的两步

- [x] **GSC（2026-09-05 完成）**：Domain 属性已验证（TXT）→ 验证值已进 `consts.ts` 并上线 → 站点地图 `sitemap-index.xml` 已提交成功
- [ ] **Request indexing（3 个 URL，约 5 分钟）**：
  1. 打开 search.google.com/search-console，左上角属性下拉框确认选的是 **chartglade.com**（不是 tintbrew）
  2. 顶部搜索框（"在此输入网址…"）粘第一个网址 → 回车：
     - `https://chartglade.com/`
     - `https://chartglade.com/place-value-chart/`
     - `https://chartglade.com/cursive-alphabet/`
  3. 等报告加载几秒，看右侧：有蓝色按钮**请求编入索引**直接点；只看到**测试实际网址**就先点它（跑 30~60 秒），旁边会变出**请求编入索引**再点
  4. 弹窗自动跑"网址是否可编入索引"检查（1~2 分钟，**别关别刷新**）
  5. 显示绿色 **已提交网址，并请求将其编入索引** = 成功，关掉弹窗换下一个网址
  - 注意：每个网址只请求一次；提交 ≠ 立即收录（几小时~几天），进度用无痕窗口搜 `site:chartglade.com`
- [ ] **Email Routing**（约 5 分钟，tintbrew 2026-09-04 验证过可用）：
  1. dash.cloudflare.com → 域名列表点进 **chartglade.com** → 左侧菜单 **Email → Email Routing** → 点 **Get started**
  2. 界面提示需要加 DNS 记录（MX/SPF）→ 点 **Add records and enable**（一键，CF 自动加好）→ 状态变 **Active/已启用**
  3. 上方切到 **Destination addresses** 标签 → **Add destination address** → 填真实邮箱（tintbrew 用过的那个）→ Save → 去该邮箱收 Cloudflare 确认信（可能进垃圾箱）→ 点信里的 **Verify** → 状态变 **Verified**
  4. 切到 **Routing rules** 标签 → **Create address**：Custom address 填 `hello`（显示为 hello@chartglade.com），Action 选 **Send to an email** → 选刚验证的邮箱 → **Save**
  5. 验证：从任一邮箱发信到 `hello@chartglade.com`，真实邮箱应收到（首封可能进垃圾箱，标记一次）
  - Contact/Privacy 页引用的 `hello@chartglade.com` 从此真实可用；零费用零维护

验收关键词（2~4 周后看 GSC）：place value chart printable / multiplication chart 1-12 / kindergarten sight words list / cursive alphabet chart

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

- 在仓库子文件夹（`tintbrew/`）里开发；发布前 `npm run build`（41 页）+
  `npx vitest run`（81 测试）全绿
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
npm run build        # 本地验证构建（41 页）
npx vitest run       # 81 个测试全过再发布
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
| `src/data/scenarios.ts` | V2.1 场景页数据（手写事实 + 引擎混合配比；加场景页从这加） |
| `src/lib/scenarioContent.ts` | 场景页内容生成（方法落点色/整张色卡/meta/JSON-LD） |
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

3. ~~明天看站点地图状态~~ **已完成（2026-09-04）**：GSC → Sitemaps 显示"成功"，站点地图抓取通过。
4. **拿首批外链**：提交 2~3 个免费工具目录站（收录加速器）。推荐起步：
   - ✅ **Uneed**（uneed.best）：已提交（2026-09-04）
   - **Peerlist Launchpad**（peerlist.io）：免费。入口：右上角登录注册 →
     打开 peerlist.io/launchpad → **Launch your product** 按钮（登录后才显示）
   - **AlternativeTo**（alternativeto.net）：免费。作为竞品 alternative 提交：
     搜一个同类颜色工具 → 进它的页面 → **Suggest an alternative** → 填 tintbrew.com；
     审核数周，不急
   - ⚠️ MicroLaunch（microlaunch.net）2026-09 已改**付费发布**（/submit 跳付费墙），弃用
   - 进阶可选：Product Hunt 正式发布（外链权重最高，单独准备）；SaaSHub（审核慢）
   - ❌ 不要提交"350+ 高 DA"批量 SEO 目录 —— 外链农场，违反本仓 SEO 纪律
   - 提交文案（英文）见下方「外链提交文案」，联系邮箱 hello@tintbrew.com

### 每周例行（5 分钟，固定动作）

5. GSC → **Pages**：已索引页面数（目标 0 → 31）。
6. GSC → **Performance**：曝光/点击/出现的查询词（前 1~2 个月纯观察，没数据正常）。
7. Cloudflare → **Web Analytics**：访问量曲线。

### 什么时候找 Claude

- 想启动 V2 内容批次 / 加新工具（见下）
- GSC 出现异常（收录下降、报错、流量突变）
- 想分析哪些词开始有排名、下一步写什么

### 外链提交文案（目录站直接复制，英文）

- **Name**: Tintbrew
- **URL**: https://tintbrew.com/
- **Tagline**: Free color mixer and converter that runs right in your browser.
- **Short description**: Mix two colors and get the exact result, convert between HEX, RGB, and HSL, and find plain-English answers to common color questions. Free, no sign-up.
- **Long description**: Tintbrew is a free color toolkit for designers, painters, and anyone who works with color. The mixer blends colors in Oklab space, so results look the way a real mix would instead of turning muddy like plain RGB blending. Convert between HEX, RGB, HSL, and other formats, and browse a growing set of "what does red and blue make" pages with exact values, shades, and tints. Everything runs in your browser — no account, nothing to install.
- **Contact**: hello@tintbrew.com

---

## 目标关键词清单（过几天去 Google 验收用）

搜索时用**无痕窗口**（避免个性化干扰）；更准的进度数据永远在 GSC → 效果 里。

### 第一梯队 · 品牌词（最先出现，约 2~7 天）

| 关键词 | 目标页 |
|---|---|
| `tintbrew` | 首页 |
| `tintbrew color mixer` | /color-mixer/ |

### 第二梯队 · 长尾矩阵词（KD≈0，2~4 周开始有曝光，1~2 个月冲首页）

| 搜索词 | 目标页 |
|---|---|
| what color does red and blue make | /mix/red-blue/ |
| what does blue and yellow make | /mix/blue-yellow/ |
| what do red and yellow make | /mix/red-yellow/ |
| what does red and green make | /mix/red-green/ |
| what colors make purple | /mix/red-blue/（+blue-purple/） |
| what colors make orange | /mix/red-yellow/（+orange-red/） |
| what colors make green | /mix/blue-yellow/（+yellow-green/） |
| what colors make pink | /mix/red-white/（+red-pink/） |
| what colors make gray / grey | /mix/black-white/ |
| what do black and white make | /mix/black-white/ |
| what does blue and white make | /mix/blue-white/ |
| what does red and white make | /mix/red-white/ |

### 第三梯队 · 工具头部词（KD≈27，3~6 个月，靠工具页+外链慢慢磨）

| 搜索词 | 目标页 |
|---|---|
| color mixer / online color mixer | /color-mixer/ |
| mix colors online | /color-mixer/ |
| color converter | /color-converter/ |
| hex to rgb converter / rgb to hsl | /color-converter/ |

### V2.1 场景词（W1 已上线 2026-09-05 · KD 14~38 · 预期 1~3 个月起曝光，变体词先动）

| 搜索词 | 目标页 |
|---|---|
| what colors make brown | /what-colors-make-brown/（头词 US 49.5K/KD38，磨页龄；two/2 colors 变体走 FAQ 段） |
| how to make black frosting | /how-to-make-black-frosting/（Halloween 季词） |
| how to make brown icing | /how-to-make-brown-icing/ |
| icing color chart | /icing-color-chart/ |
| buttercream color chart | /buttercream-color-chart/ |

**W2 三色头词页（已上线 2026-09-05，commit 52cfa81）**：

| 搜索词 | 目标页 |
|---|---|
| what colors make purple | /what-colors-make-purple/（US 22.2K/KD26） |
| what colors make green | /what-colors-make-green/（US 18.1K/KD28） |
| what colors make orange | /what-colors-make-orange/（US 18.1K/KD37） |

### 搜索技巧

- `site:tintbrew.com` —— 看多少页已进 Google 索引（收录进度最快验证法）
- 直接搜完整问题（如 "what color does red and blue make"）—— 看我们的页排第几
- 新站前期排第 2~5 页都算健康，进了前 10 页说明已参与竞争



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

**筛选结论（2026-09-05，全 18 词数据见 `research/tintbrew-v21-keywords.md`）**：
烘焙 4 页 + 通用头词 1 页（/what-colors-make-brown/，US 49.5K）+ 颜料 3 页（W2）+ 木器 2 页（W3）共 10 页锁定，分波上线；
死词（tan icing/肤色/墙面子词）收容进相关页 FAQ 段落。
**W1 已构建（5 页 + hub）**：烘焙 4 页（/how-to-make-black-frosting/ · /how-to-make-brown-icing/ ·
/icing-color-chart/ · /buttercream-color-chart/）+ **/what-colors-make-brown/**
（US 49.5K/月 · KD 38 · 词族 196K 的全场头词，2026-09-05 补测锁定）+ /color-guides/ hub 页；
架构 = `data/scenarios.ts`（手写事实+配比）→ `lib/scenarioContent.ts`（引擎算色卡）
→ `components/ScenarioPage.astro` + 每页一个扁平 URL 薄包装；footer 自动带出全部场景页链接。
**W2 已上线（3 页，2026-09-05，线上 200 + sitemap 收录验证通过）**：/what-colors-make-purple/（22.2K/KD26）·
/what-colors-make-green/（18.1K/KD28）· /what-colors-make-orange/（18.1K/KD37）——
三色头词合计 58.4K/月，是 26 词批量终审后的最高 ROI 批次（color-first 问法，与 V1 24 页
pair-first 矩阵互补）。绿页因引擎是屏幕混色（蓝+黄光加起来趋白），全部路线按画家打法重写：
蓝入黄基 + green 家族起步走 chartreuse/teal/forest/sage，并在正文交代 paint-vs-screen 差异
（互链 /mix/blue-yellow/）。决策记录：3 页小批次 + 架构已被 W1 验证，选择不等观察窗直接上线，
页龄优先；3~4 周隔波纪律保留给 V2.2 的大批次（+20~30 页）。

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
1
### 节奏与指标

- **启动条件**：GSC 显示首批页面已索引（预计上线后 1~2 周）→ 启动 V2.1
- **节奏**：每批上线后观察 3~4 周再上下一批（新站别一次堆太多页）
- **北极星指标**：GSC 每 28 天曝光数（impressions）环比增长
- **变现节点**：自然流量稳定过 ~300 次访问/天 后接入广告（当前零广告代码）

### 已评估暂缓的方向（备忘）

- **穿搭/选色决策词**（what colors go with X / what color should I paint my X）：
  2026-09-04 评估过。SERP 实测全是 Pinterest 画板 + 小博客 + Reddit，无巨头，能打；
  但意图是"配色"不是"混色"，需要新页面模板（并排色板 + harmony 计算）+ 每色手写搭配事实，
  且量未验证。**决定：收录期不分心，先跑已调研的 V2.1 场景词。**
  重启条件：V2.1 见效后想扩受众时，先拉 6 个代表词的数据再定。
  （第二流量引擎 Pinterest 的价值当时也认可——新域名熬 Google 排名期间图钉可并行起量。）

