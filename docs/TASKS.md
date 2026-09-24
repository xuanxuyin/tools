# 每日任务队列（两站共用）

> **每天开工第一眼看这里。** 👤 = 你的活（要做），🤖 = Claude 的活（不用管，列出是让你知道进度）。
> 本文件只管"现在做什么"：做完勾掉，过期由 Claude 清理归档；**决策、数字、时间线仍以各 PLAN 为准**（[chartglade](./chartglade/PLAN.md) / [tintbrew](./tintbrew/PLAN.md)）。
> 找文案：chartglade 分发 → [chartglade/DISTRIBUTION.md](./chartglade/DISTRIBUTION.md)；tintbrew 分发 → [tintbrew/DISTRIBUTION.md](./tintbrew/DISTRIBUTION.md)。

---

## 今天 · 2026-09-25（周五）

> 9/24 👤 未完项全部顺延（索引配额 PT 午夜已重置）；9/24 已完项归档在下方。

- [ ] 👤 **周一例行收尾（只剩一步）**：两站**效果 28 天环比**数字发 Claude（chartglade 顺带看查询明细有无新冒头词）
- [ ] 👤 tintbrew CF WA 数据面收尾（9/20 手动 token 上线后唯一余项）：访问 tintbrew 任一页 → dashboard 刷新看曲线冒头（几分钟内）
- [ ] 👤（顺延）tintbrew Pinterest **设置照常做**（账号/board/域名认领，[DISTRIBUTION.md](./tintbrew/DISTRIBUTION.md) §3.1）—— chartglade 三连拦先例：链接 pin 首测定 **10/01** 不硬试，色卡 pin 批（§3.3）改"门开则补"；**10 月第 1 周万圣分发主力 = Reddit 烘焙帖**（§3.4）
- [ ] 👤 **request indexing 每日例行（今日 10 条）**：GSC → URL 检查 → 逐条"请求编入索引"，今日打头：① /1-cm-graph-paper/ ② /5mm-graph-paper/（9/24 配额断点续），此后支柱页 + 高量字母页 z/b/k，每天 ~10 条啃 49 页池，跑完一轮回传数字 Claude 对账；⚠️ 若报"提交索引编制请求时出现问题"= GSC 界面 Google 侧瞬时故障（站端已巡检全 200）：等 2~5 分钟刷新重试，当天推不完不追（配额 PT 午夜重置 ≈ 北京 15:00）
- [ ] 👤（可选，2 分钟）CF 修复 http://www.chartglade.com/ 403：CF dash → chartglade.com → Rules → Redirect Rules → 新建：Hostname equals `www.chartglade.com` → 301 → `https://chartglade.com/${http.request.uri.path}`（保留路径）；顺手对比 tintbrew zone 的 SSL/TLS → Edge Certificates → Always Use HTTPS 状态。不修无实害
- [x] 👤 ~~拼豆提案 AITDK 拉量（16 词）~~ **✅ 9/25 完成 → 立项成立，落位 tintbrew（👤 当日裁决推翻初判 chartglade：「成年女孩也爱卡通上色」「和衣服搭配功能一样，做 tintbrew 里」）**：主族 ≈30.4K/月过 10K 定标 3 倍（patterns 14.8K + ideas 9.9K + fuse/easy/templates/christmas/animals/halloween/food），KD 全带 14~35 → **tintbrew 拼豆上色族首批 5 页（hub + easy/animals/food/christmas），10-15 前**，全原创图案零 IP；perler beads 40.5K 导航词 KD41 弃、pony bead 6.6K 第二批。明细 [research/fuse-bead-patterns.md](../research/fuse-bead-patterns.md) §七 + tintbrew PLAN 9/25 行
- [x] 🤖 ~~tintbrew 穿搭页二连修（👤 "脖子脱离身体了""我在哪个页面可以自己搭配"）~~ **✅ 9/25 凌晨上线**：① 人台颈部断层修复（颈路径终点 y64 vs 躯干顶缘 y74 的 ~10px 空白 → 颈延长塞入躯干下；360px 放大截图 + AI 复检两图确认 chin→neck→torso 连续无白缝）② combos 后新增 **Style it yourself** 自由搭配卡（锚色 top + charcoal 裤 + ivory 鞋 + 金吊坠起步，复用换色 island 零新脚本，预设/自定义任选，read/阶梯实时重算）；114 测试全绿（PLAN 9/25 行）

**9/24 已完成归档**：👤 chartglade Pinterest 三连拦 → 定性新域信誉门，改保温（隔天零链接 pin）+ 复试 10/01/10/15 ｜ 👤 AITDK 拉词五件全终局（fondant 330 死 / cursive 州词无量死 / halloween 8.2K 不加码 / 色觉敏锐度 B 组翻案上调 V2.2 第二梯队 / regents 780 不做 → ≥10K 定标入 CLAUDE.md）｜ 🤖 #18 支柱页下载按钮 `ece2230` + V1.8 sign-in 族 `76d1136`（均随 10/05 批）｜ 🤖 tintbrew per-page OG 33 张 + 扩容调研六组终局（tintbrew +90.7K：穿搭族 31.4K + make-X 59.3K 立项；chartglade +27K）｜ 🤖 V2.2 穿搭 4 页上线 `4e9aa06` + 交互升级（换色 island + croquis v2 重画）`d4f5b16`（明细各 PLAN 9/24 行）

**9/20~9/22 已完成归档**：统计"全 0"案全结案（GA 双站管道 ✅｜chartglade CF WA 活 39 visits/7d｜tintbrew WA 手动 token `5a142b1` 上线 + curl 双 URL 实勘）｜ 9/19 收录门执行（v1.6+万圣 `e0e8983` 上 main：65 页 61 测试绿、新页 3 条 200、sitemap 52→64、IndexNow 补推 12 URL 返 200）｜ MiriCanvas+竞品 sitemap 对标 → **#17 图片 SEO 5 支柱页上线 ✅**（lock 事故 `bcba67a` 复盘，"大站做法先行"入 CLAUDE.md）｜ 双站竞扫第二轮（Suncatcher/ClassWeekly/trycolors/colordesigner → 两 BENCHMARKS；#18 下载按钮 + V2.3 反向配色计算器立项）｜ #12 InkPx/Printabulls 拆解（#18 PDF 升格 10/25 正式项）｜ 9/22 docs 合并冲突裁决回填 `5e14847`（本地旧稿 × 远程 92 提交，e0e8983 核实在 main 历史无丢失）

**9/17 已完成归档**：👤 chartglade 外链首发 3/3 收工（homeschool.com + Cathy Duffy pitch ×2 提交，10 月第 1 周零回音各补 follow-up ｜ Reddit r/Handwriting 答帖已发）｜ 🤖 Peerlist launch 付费门定论更正（Verify Identity 收费，workplace 不解锁 → 搁置）

**9/15 已完成归档**：双站 IndexNow 上线（tintbrew 40 / chartglade 52 URL 推送 202/200【实测】；⚠️ 9/19 合并 main 后 chartglade 9 张新页补推一轮）｜ 🤖 万圣节簇开发完成 `f2be941`（word search 双难度 / color by number / cursive 词表 + hub = 4 URL，65 页 55 测试绿，9/19 门后随 V1.6 上 main）

**9/14 已完成归档**：GA 双站实时验证通过 ｜ 周一例行闭环（四榜单体检 + sitemap 满格 + 索引报告"0/14"虚惊定性过期快照）｜ Pinterest 复试仍拦 → 停止尝试进信任期（复试 9/21）｜ GA4 双站上线（`2b71a80`/`d4b814a`）｜ GSC 四榜单判双站未偏航 ｜ 竞品外链逆向（MyCursive 州立法页打法 → PLAN #16 + DISTRIBUTION §5）

**9/11~9/13 已完成归档**：Pinterest 域名认领 ✅（meta 上线 main `71774cc`，Verify 一次过；广告像素不装）｜ 3 board 建好但发 pin 被 spam 拦（判缓存时滞非故障）｜ 视力表词族 7 词实测 24.8K → 折中 2 页小簇进 11 月批（PLAN §3 #15）｜ 9/12 排的两项（Pinterest 测试 pin + GSC 收录复查）滑档 → 顺延至 9/14 清
**9/10 已完成归档**：tintbrew GSC 首查（brown 1/purple 2/green 1/orange 0 = 噪音级冒头，不动盘，裁决窗 10-01）｜ 第三站候选调研完结（B 宠物手册站唯一存活，挂 10/17 门）｜ 订阅方向冻结（"订阅×SEO 量=空集"，改走同域订阅试验）
**9/9 已完成归档**：目录站三渠道全部提交 ｜ request indexing 第二批 9 条（累计 14/53）｜ GSC 曝光累计 13 / site: 5 条 ｜ 🤖 字母页变体段上线（main `3cbf225`）
**9/8 已完成归档**：GSC "0 已编入"排查（URL 检查抽查 3 条全过，实锤切片读数坑）｜ CF 首基线 42 visits/678ms ｜ AlternativeTo 提交 + 双向挂竞品 ｜ request indexing 启动（首批 5 条）

---

## 本周

| 日期 | 任务 | 去哪抄 |
|---|---|---|
| （本周任务全在"今天"栏；下个节点 10/01 tintbrew 决策） | | |

---

## 近期日程（重要节点，到了会挪进上面）

| 日期 | 事件 |
|---|---|
| 9 月下旬 | 🤖 chartglade #18 支柱页下载按钮（v1.6-predev 开发，10/05 批）｜ tintbrew per-page OG 图 ✅ 9/24 |
| 10/01（周四） | **tintbrew 决策点**：/mix/ 词排名 —— 有词 top 30 → 启动 V2.2 加页；全 50 外 → 转外链强度（PH 提前） |
| 10 月第 1 周 | 👤 tintbrew 万圣分发：frosting/icing 色卡 pin 一轮 + Reddit 烘焙帖（页面已在位，只欠分发） |
| 10/05（周一） | **chartglade 10/05 批**（9/24 改版）：#18 支柱页下载按钮 + **V1.8 sign-in sheet 族**（hub + 4~5 页，用户指令提前赶 PT conference 季；万圣 + V1.6 已 9/20 提前发掉）= 分支合并 push main |
| 10/17（周六） | **chartglade 6 周大验收**：变体词排名 → 加码矩阵 或 B 计划 |
| 10/25（周日） | chartglade 10/25 批：感恩节页 + V1.7 公式表 2 页 + #14 数学练习 island |
| 11 月 | chartglade 11 月批：视力表 2 页小簇（V1.8 已提前至 10/05） |
| 2027-01-31 | **双站止损线复盘**（chartglade <3K 且零词 top 30；tintbrew <5K 且零词 top 30 → 停投） |

---

## 例行小抄

**每天（≤3 分钟）**：GSC → 效果：有没有新冒头查询词 ｜ Cloudflare → Web Analytics：曲线异常否（两站 9/20 起均可用）｜ ⚠️ 禁令：不手动 google 搜自己的站（污染 GSC；看收录用 GSC 索引报告）

**周一**：GSC 索引覆盖 + 效果 28 天环比 → 数字发 Claude（site: 只当粗信号，判定以 GSC 为准）
**周三**：1 个分发动作（pin / 目录站 / 社区帖，文案都在两份 DISTRIBUTION）
**周五**：无批次在跑就不动（新站隔 3~4 周上批，不堆页）
