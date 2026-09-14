# 每日任务队列（两站共用）

> **每天开工第一眼看这里。** 👤 = 你的活（要做），🤖 = Claude 的活（不用管，列出是让你知道进度）。
> 本文件只管"现在做什么"：做完勾掉，过期由 Claude 清理归档；**决策、数字、时间线仍以各 PLAN 为准**（[chartglade](./chartglade/PLAN.md) / [tintbrew](./tintbrew/PLAN.md)）。
> 找文案：chartglade 分发 → [chartglade/DISTRIBUTION.md](./chartglade/DISTRIBUTION.md)；tintbrew 分发 → [tintbrew/DISTRIBUTION.md](./tintbrew/DISTRIBUTION.md)。

---

## 今天 · 2026-09-14（周一）

- [ ] 👤 **GA 数据验证（5 分钟，今日新增）**：两站 GA4 已 push main 部署 → 无痕窗各开一次站 → GA 后台「报告 → 实时」见活跃用户即通（tintbrew `G-5V4P4ZYYZH` / chartglade `G-EKH9T22FDT`）
- [x] 👤 ~~周一例行两站~~ **✅ 9/14 闭环**：效果侧四榜单体检入档；收录侧 sitemap 52/40 满格 0 错误 + site: 38/57；聚合索引报告读出 0/14 引发虚惊 → 定性**过期快照**（报表上次更新 9/4 停在上线日，PLAN 已入档 + 例行纪律修正：聚合数只在快照日期推进后环比）
- [ ] 👤 **Pinterest 测试 pin（9/12 滑档顺延）**：发 1 条 cursive-alphabet（文案 [DISTRIBUTION.md §1.3](./chartglade/DISTRIBUTION.md) #1）—— 拦截解除 → 本周内发剩余 4 条（红线 ≤5/周）；仍拦 → 不硬试，等 1~2 周信任期或申诉
- [ ] 👤（不强制）request indexing 续批：配额闲置时余下字母页 g/h/l 等按量续提（累计 14/53）
- [x] 🤖 **GA4 双站上线**（今日）：consts + BaseLayout `<head>` + **隐私页合规修正**（GA 种 `_ga` cookie，原 no-cookies 声明改为如实披露）；41/61 页全带，测试全绿（main `2b71a80` / `d4b814a`）
- [x] 🤖 **GSC 四榜单体检**（今日）：两站 best/worst 各 10 词 —— **判双站未偏航**（tintbrew 矩阵 5~8 位 / chartglade cursive 22~40 位，均快于新站锚点）；产出 3 个挂起项：preschool 页认领 pre-k 变体（搭下次部署车）、fondant 拉量（9/18）、词级 cursive 拉量（10/17 后）

**9/11~9/13 已完成归档**：Pinterest 域名认领 ✅（meta 上线 main `71774cc`，Verify 一次过；广告像素不装）｜ 3 board 建好但发 pin 被 spam 拦（判缓存时滞非故障）｜ 视力表词族 7 词实测 24.8K → 折中 2 页小簇进 11 月批（PLAN §3 #15）｜ 9/12 排的两项（Pinterest 测试 pin + GSC 收录复查）滑档 → 顺延至今日清
**9/10 已完成归档**：tintbrew GSC 首查（brown 1/purple 2/green 1/orange 0 = 噪音级冒头，不动盘，裁决窗 10-01）｜ 第三站候选调研完结（B 宠物手册站唯一存活，挂 10/17 门）｜ 订阅方向冻结（"订阅×SEO 量=空集"，改走同域订阅试验）
**9/9 已完成归档**：目录站三渠道全部提交 ｜ request indexing 第二批 9 条（累计 14/53）｜ GSC 曝光累计 13 / site: 5 条 ｜ 🤖 字母页变体段上线（main `3cbf225`）
**9/8 已完成归档**：GSC "0 已编入"排查（URL 检查抽查 3 条全过，实锤切片读数坑）｜ CF 首基线 42 visits/678ms ｜ AlternativeTo 提交 + 双向挂竞品 ｜ request indexing 启动（首批 5 条）

---

## 本周

| 日期 | 任务 | 去哪抄 |
|---|---|---|
| 9/16（周三） | 👤 tintbrew Pinterest 设置 + 首批 5 个色卡 pin | [tintbrew/DISTRIBUTION.md](./tintbrew/DISTRIBUTION.md) §3.1 / §3.3 |
| 9/18（周四） | 👤 tintbrew 周四例行 GSC 头词查 + **顺手 AITDK 拉 fondant 族量**（9/14 体检观察项：how to make brown fondant / fondant color chart，≥500/月 才进烘焙簇扩展） | AITDK 插件 |

---

## 近期日程（重要节点，到了会挪进上面）

| 日期 | 事件 |
|---|---|
| 9/14（周一） | 👤 周一例行两站：GSC 索引覆盖（**固定用 sitemap 视图**，数字才可比）+ 效果 28 天环比 → 发 Claude 记录 |
| 9/19（周六） | **chartglade 收录门**：👤 把 GSC 收录数告知 Claude；🤖 近全量 → 合并 v1.6-predev 到 main + 万圣节页，凑 10/05 批 |
| 9 月下旬 | 🤖 #12 InkPx/Printabulls 对标拆解 ｜ 🤖 tintbrew per-page OG 图 ｜ 🤖 万圣节页开发（分支上，9/19 前做完） |
| 10/01（周四） | **tintbrew 决策点**：/mix/ 词排名 —— 有词 top 30 → 启动 V2.2 加页；全 50 外 → 转外链强度（PH 提前） |
| 10 月第 1 周 | 👤 tintbrew 万圣分发：frosting/icing 色卡 pin 一轮 + Reddit 烘焙帖（页面已在位，只欠分发） |
| 10/05（周一） | **chartglade 10/05 批上线**：万圣节 + V1.6（graph paper 簇 + name tracing；#13 变体段已提前上线 main `3cbf225`，剩余措辞随批收尾）= 分支合并 push main |
| 10/17（周六） | **chartglade 6 周大验收**：变体词排名 → 加码矩阵 或 B 计划 |
| 10/25（周日） | chartglade 10/25 批：感恩节页 + V1.7 公式表 2 页 + #14 数学练习 island |
| 11 月 | chartglade V1.8 sign-in sheet 族（赶 PT conference 季） |
| 2027-01-31 | **双站止损线复盘**（chartglade <3K 且零词 top 30；tintbrew <5K 且零词 top 30 → 停投） |

---

## 例行小抄

**每天（≤3 分钟）**：GSC → 效果：有没有新冒头查询词 ｜ Cloudflare → Web Analytics：曲线异常否 ｜ ⚠️ 禁令：不手动 google 搜自己的站（污染 GSC；看收录用 GSC 索引报告）

**周一**：GSC 索引覆盖 + 效果 28 天环比 → 数字发 Claude（site: 只当粗信号，判定以 GSC 为准）
**周三**：1 个分发动作（pin / 目录站 / 社区帖，文案都在两份 DISTRIBUTION）
**周五**：无批次在跑就不动（新站隔 3~4 周上批，不堆页）
