# tools — 多项目仓库

一个仓库放多个网站项目，每个项目一个子文件夹，独立部署。

| 项目 | 是什么 | 技术 | 托管 |
|---|---|---|---|
| [tintbrew/](./tintbrew) | tintbrew.com — 免费颜色工具站（Oklab 混色器、格式转换、"两种颜色混成什么"答案页矩阵） | Astro 5 静态生成 + 原生 TS | Cloudflare Pages |

---

## 四个平台各管什么（先记住这个）

| 平台 | 网址 | 职责 | 备注 |
|---|---|---|---|
| **GitHub** | github.com/xuanxuyin/tools | 存代码。`git push` 后 Cloudflare 自动重新部署 | 日常只需要碰它 |
| **Cloudflare** | dash.cloudflare.com | ① Pages：网站托管 ② DNS：域名解析 ③ Web Analytics：访问统计 | 三样都在这一家 |
| **Spaceship** | spaceship.com | 只剩一个职责：**域名续费**（$9.98/年） | DNS 已移交 Cloudflare，平时不用碰 |
| **Google Search Console** | search.google.com/search-console | SEO 监控：收录量、关键词排名、站点地图 | 每周看一次 |

**数据流**：改代码 → push 到 GitHub → Cloudflare 自动构建部署 → 用户访问 Cloudflare 上的站点 → Google 来抓取 → GSC 里看效果。

---

## 首次部署流程（进行中，✅ = 已完成）

1. ✅ 网站代码全部完成，推送到 GitHub `main`（6 个 commit）
2. ✅ Cloudflare 注册账号（免手机验证）
3. ✅ Cloudflare → Add a domain → `tintbrew.com` → Free 计划
   - ✅ 删掉指向 Vercel 的 A / CNAME 记录（换托管商了，没用了）
   - ✅ 保留 TXT `google-site-verification=...`（保住 GSC 验证）
4. ✅ Spaceship → tintbrew.com → Nameservers → 改成 Custom：
   `chin.ns.cloudflare.com` + `rocco.ns.cloudflare.com`
5. ✅ GSC：Domain 属性验证通过 + 提交站点地图 `https://tintbrew.com/sitemap-index.xml`
   （状态"未知"是正常的，几小时后变"成功"，31 个页面）
6. ⬜ **Cloudflare Pages 建项目**：Workers & Pages → Create → Pages 标签 →
   Import an existing Git repository → 选 `tools` 仓库 → 配置见下表 → Save and Deploy
7. ⬜ **绑主域名**：Pages 项目 → Custom domains → Set up a custom domain →
   先加 `tintbrew.com`，再加 `www.tintbrew.com`（DNS 在同一家，一键激活）
8. ⬜ **开访问统计**：Cloudflare → Web Analytics → Add a site → `tintbrew.com` →
   把代码片段里的 token 抄下来，填进 `tintbrew/src/consts.ts` 的 `cfBeaconToken` → push
9. ⬜ （可选）www 跳转主域：Cloudflare → Rules → Redirect Rules →
   条件 `Hostname equals www.tintbrew.com` → 301 → `https://tintbrew.com` + 保留路径

### Pages 项目配置（第 6 步照抄）

| 配置项 | 值 |
|---|---|
| Project name | `tintbrew` |
| Production branch | `main` |
| **Root directory** | **`tintbrew`** ⚠️ 必填（站点在子文件夹里） |
| Build command | `npm run build` |
| Build output directory | `dist` |

---

## 日常更新流程（以后改了代码怎么发布）

```bash
cd tintbrew
npm run build        # 本地验证构建（自动跑 sitemap 修正脚本）
npx vitest run       # 70 个测试全过再发布
git add -A && git commit -m "feat: 改了什么" && git push origin main
```

push 之后 1~2 分钟，Cloudflare 自动完成部署，**不需要手动上传任何东西**。
查看部署状态：Cloudflare → Workers & Pages → tintbrew → Deployments。

---

## 关键文件在哪（tintbrew/ 内）

| 文件 | 作用 |
|---|---|
| `src/consts.ts` | 站点常量：**GSC 验证码**、**CF 统计 token**（都填在这里） |
| `src/data/mixes.ts` | 24 个配色对的原始数据（加新配色页从这加） |
| `src/data/colors.ts` | 颜色定义表 |
| `src/lib/color.ts` | Oklab 混色引擎（纯函数，有测试） |
| `public/_redirects` | 反向 slug 301 跳转（如 /mix/blue-red → /mix/red-blue） |
| `public/_headers` | 静态资源永久缓存 |
| `public/robots.txt` | 指向站点地图 |
| `scripts/generate-og.mjs` | 重新生成分享卡片图 `npm run og` |
| `vercel.json` | Vercel 时代的遗留配置，在 Cloudflare 上不生效，留作备用 |

---

## 常见问题

- **国内打不开 `tintbrew.pages.dev` / 网站很慢**：Cloudflare/Vercel 在大陆连通性本来就差，
  **不影响 Google 收录和海外用户访问**。自己要看就用代理。
- **怎么确认部署成功**：Cloudflare → tintbrew → Deployments 最新一条是绿色 Success；
  或访问任意页面正常。
- **域名续费**：Spaceship → Domains → tintbrew.com，每年 ~$9.98。
- **DNS 改动**：现在都在 Cloudflare → tintbrew.com → DNS → Records，Spaceship 那边不用动了。
- **加第二个项目**：根目录建新文件夹 → 部署时 Root directory 填那个文件夹名 →
  在上面项目表格里加一行。

## 上线后的 SEO 节奏

- **GSC 每周看一次**：左侧 Pages/Indexed 看收录数（31 页起步）；
  Performance 看曝光和排名。新域名收录通常 2~7 天开始有效果，排名 1~3 个月。
- 站点地图已提交，Google 会自动重新抓取；改动大时可以在 GSC 手动提交 URL。
- 内容扩展（第二批配色对、新工具）= 后续增长的主要手段。
