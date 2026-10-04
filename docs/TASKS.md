# 每日任务队列（两站共用）

> **每天开工第一眼看这里。** 👤 = 你的活（要做），🤖 = Claude 的活（不用管，列出是让你知道进度）。
> 本文件只管"现在做什么"：做完勾掉，过期由 Claude 清理归档；**决策、数字、时间线仍以各 PLAN 为准**（[chartglade](./chartglade/PLAN.md) / [tintbrew](./tintbrew/PLAN.md)）。
> 找文案：chartglade 分发 → [chartglade/DISTRIBUTION.md](./chartglade/DISTRIBUTION.md)；tintbrew 分发 → [tintbrew/DISTRIBUTION.md](./tintbrew/DISTRIBUTION.md)。

---

## 今天 · 2026-10-04（周日）

> 10/02 批提前上线后 10/03 无记录。👤 已报 request indexing 进度：**chartglade 9/29 清单 10/10 完成（累计 39/70）**、**tintbrew 4/7**（blue/red/black/maroon ✅），peach/turquoise/color-mixing-chart 卡配额今日补。⚠️ **配额浪费教训**：9/29 清单里 cursive b/z/f 本就在 9/24 索引清单 15 条内（脚注自己写了"勿再请求"，切清单失察）= 3 条重复请求；**剩余字母池修正为 c d e j m n o p q r s t u v w（15 个）**。**明日 10/05（周一）= 周一例行**，9/30~10/04 滑档数据并入明天一次看，不单独补跑。

- [ ] 👤 **request indexing**（配额 PT 午夜重置 ≈ 北京 15:00，今日新额度应可用）：
  - **chartglade 10 条 = 6 sign-in 新页打头**（链接在下）+ cursive c / d / e / j
  - **tintbrew 补 4 条**：peach / turquoise / color-mixing-chart（链接在 10/02 归档行）+ 今日上线新页 hue-test（批 B，已 IndexNow 推过，GSC 补一手 request indexing）：`https://tintbrew.com/hue-test/`
  ```
  https://chartglade.com/sign-in-sheets/
  https://chartglade.com/sign-in-sheet/
  https://chartglade.com/open-house-sign-in-sheet/
  https://chartglade.com/parent-teacher-conference-sign-in-sheet/
  https://chartglade.com/field-trip-sign-in-sheet/
  https://chartglade.com/volunteer-sign-in-sheet/
  ```
- [ ] 👤 **分发两件（若 10/02~03 未发）**：① tintbrew **Reddit 烘焙帖**（万圣分发唯一渠道，文案在 tintbrew DISTRIBUTION）② chartglade **外链 follow-up ×2**（homeschool.com / Cathy Duffy，模板在 chartglade DISTRIBUTION §5.2）—— 已发过报一声即销项
- [x] 🤖 tintbrew 批 B = /hue-test/ ✅ **10/04 上线**（main `b1afa6e`；104 页 sitemap 实测 / 164 测试绿 / OG 卡 44；线上 200+canonical 自指 + OG 卡可取【外部 reader 实勘，本机 TLS 断】；IndexNow 200 —— V2.2 全批收官，明细 PLAN 10/04 时间线行）
- 明日预告：周一例行（GSC 索引覆盖 sitemap 视图+快照日期 / 28 天环比 / site: / DDG），两站数字一起报；**顺带复查 tintbrew CF WA 异常点：bear 页 9/27=11、/color-mixer/ 10/03=28**（对照当日 GSC 点击判来源：Google 爬位 vs Bing/IndexNow vs 直访）

---

## 10/02 已完成归档

**🤖 10/05 批提前上线（👤 拍板当日执行当日收）**：#18 支柱页下载按钮 + V1.8 sign-in 族 hub+5 页 + 首页 Halloween 季节板块 + "no download" 文案软化；71 页 / sitemap 64→70 / 81 测试绿；6 新页 200+canonical 自指、IndexNow 补推 6 URL 返 200【实勘 curl 权威 IP】；main `c222d13`+`b8a2e75`，predev reset 到 main = 10/25 批干净起点。**过程坑入档**：守卫测试放 `src/pages/` 炸 Astro 构建（pages 下 .ts 被当路由模块加载）→ 挪 `src/data/homepage.test.ts`；IndexNow key 文件真名 = `885ed6e41c45aaa0a07837bfe89d5937.txt`（9/15 档里 "cadecee" 是 commit 哈希非文件名，已勘误）。明细 PLAN 10/02 时间线行。

**9/29 已完成归档**：👤 周一例行补跑（tintbrew 20 词全 top 3~7.7 决策门撞开；chartglade 15/52 八天零转化收录门真堵；DDG ≈35）｜ 👤 查询明细两站 50 词入档（tintbrew 首个自然点击 brown 页）｜ 👤 chartglade CF WA 7d=18 判读自查直访 ｜ 👤 tintbrew CF WA token 管道确认活 ｜ 🤖 V2.2 批 A 当日上线 `3674025`（make-X 6 页 + mixing chart + gold，111 页 150 测试绿）。**9/29 未销项**：request indexing 清单（chartglade 10：decimal 重试 + mult 变体 3 + cursive g/h/l/b/z/f；tintbrew 7：make-blue/red/black/maroon/peach/turquoise + color-mixing-chart）—— 推没推待确认

**9/25 已完成归档**：👤 周一例行补录（两站 28 天数据入档）｜ 👤 request indexing 两批（新页 12/12 + place-value 家族 3/4，decimal 待重试，累计 26→29/64）｜ 👤 CF 修 http://www.chartglade.com/ 403（Always Use HTTPS 1 开关）｜ 👤 拼豆提案拉量 30.4K 立项落 tintbrew ｜ 🤖 拼豆 studio 连环修四推（`29e189c` 选色面板下移 → `3ceffe0` 固定底部浮层 → `3868cc7` 视口自适应 + 46 图×双视口全审计 → `af9f6a3` 画布同屏 + 引擎镜像对称 + Mirror 笔刷）｜ 🤖 图纸精确率双修 `8704b81`（引擎封闭洞治愈 + bunny 内耳 leaf 重画）｜ 🤖 穿搭页二连修 `ede4419`（颈部断层 + Style it yourself 自由搭配区）｜ 🤖 双站热门查询体检入档（两站头词簇破 top 10，两个门预演过线）

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
| 10/02（今天） | 👤 分发两件（Reddit 烘焙帖 + follow-up ×2）｜🤖 10/05 批执行（待拍板提前） | 各 DISTRIBUTION |
| 10/05（周一） | ~~10/05 批~~ **✅ 10/02 已提前上线**；当日只剩数据例行 | — |

---

## 近期日程（重要节点，到了会挪进上面）

| 日期 | 事件 |
|---|---|
| 10/01（周四） | ~~tintbrew 决策点~~ **已提前消化**：9/29 门线碾压（20 词 top 3~7.7 + 首点击），V2.2 批 A 当日上线；~~Pinterest 复试~~ **已提前试**：四连拦 → 双站休眠。当日只剩数据例行（GSC 28 天环比） |
| 10 月第 1 周 | 👤 tintbrew 万圣分发：**Reddit 烘焙帖单一渠道**（色卡 pin 已随 Pinterest 休眠取消；页面 + OG 卡 9/24 已就位，只欠分发）｜👤 chartglade 外链 follow-up（homeschool/Cathy Duffy 零回音补一发） |
| 10/15（周四） | **双站 Pinterest 探针 #1**（各发 1 个带链接 pin，1 分钟）：通了才重启渠道；仍拦 → 只剩 11/15 末次探针 |
| 10/05（周一） | ~~chartglade 10/05 批~~ **✅ 10/02 提前上线**（#18 + V1.8 + 首页季节位 + 文案软化；明细 PLAN 10/02 行）|
| 10/17（周六） | **chartglade 6 周大验收**：变体词排名（9/25 预演：place value 族 4.6~9.0）→ 加码矩阵 或 B 计划 |
| 10/25（周日） | chartglade 10/25 批：感恩节页 + V1.7 公式表 2 页 + #14 数学练习 island |
| 11 月 | chartglade 11 月批：视力表 2 页小簇（V1.8 已提前至 10/05）+ 谱纸生成器 + 作曲工具岛（9/25 立项，12.6K 词池） |
| 2027-01-31 | **双站止损线复盘**（chartglade <3K 且零词 top 30；tintbrew <5K 且零词 top 30 → 停投） |

---

## 例行小抄

**每天（≤3 分钟）**：GSC → 效果：有没有新冒头查询词 ｜ Cloudflare → Web Analytics：曲线异常否（两站 9/20 起均可用）｜ ⚠️ 禁令：不手动 google 搜自己的站（污染 GSC；看收录用 GSC 索引报告）

**周一**：GSC 索引覆盖 + 效果 28 天环比 → 数字发 Claude（site: 只当粗信号，判定以 GSC 为准）
**周三**：1 个分发动作（pin / 目录站 / 社区帖，文案都在两份 DISTRIBUTION）
**周五**：无批次在跑就不动（新站隔 3~4 周上批，不堆页）
