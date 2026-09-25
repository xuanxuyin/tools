# tintbrew 作战文档

> 本项目唯一计划文档 · 更新 2026-09-09 · 部署/运维细节见仓库根 [README.md](../../README.md)
> 原则：本文档没写的 = 没计划；做完的立刻勾掉并写日期。

## 0. 北极星

**GSC 28 天曝光数（impressions）环比增长**。变现节点：自然流量稳定 ~300 访问/天 → 接广告（当前零广告代码）。

一句话现状：41 页上线（V1 33 + V2.1 W1/W2 共 8 页），81 测试全绿，GSC 真实曝光 ≈0（9/10 复查：累计 650 **全为自操作查询污染**，无新增），进入「等收录 + 攒外链」阶段。

## 0.5 当前状况深度分析（2026-09-05）

**手里的牌（优势）**

1. **三层词池结构已成型**：KD 0 矩阵（24 个 /mix/ 页，新站唯一能立刻参与竞争的层）→ 腰部头词（brown 49.5K + 三色 58.4K + 烘焙，共 9 页场景页）→ 工具头词（KD 27，3~6 个月长跑）。任何一层起量都接得住。
2. **技术差异化是真的**：全竞品混色都是 sRGB 平均（灰 muddy），我们是 Oklab 感知混色 + paint-vs-screen 双答案；green 页按画家打法重写是内容侧同样的差异化。
3. **加页边际成本近零**：V2.2 加 30 页 = 改 colors.ts + mixes.ts 两个数据文件，页面/目录/301/sitemap/内链全自动。这个杠杆随时可拉。
4. **技术债为零**：81 测试全绿、线上 200/301 全验证、零控制台报错。
5. **已被索引参与排名**：GSC 效果数据出现 = 不在"没被发现"阶段，在"权重不够"阶段 —— 只能用页龄和外链解决。

**短板与风险（按杀伤力排序）**

1. **外链接近零** —— 当前最大杠杆缺口。已提交 3 个：Uneed（9/4）+ Peerlist + AlternativeTo（9/9 用户提交，审核期未确认收录）。DR 0 域名在 KD 38 的 brown 这类词上，没有外链就是磨十年页龄也难进前 5。
2. **站龄 1 天**，新站沙盒期（前 1~3 个月排名系统性压制）是常态，此期间数据差 ≠ 策略错。
3. **单一流量引擎**：全押 Google，Pinterest 第二引擎一直认可但没启动。
4. **回访钩子弱**：纯工具无账号无收藏提醒，访问质量靠 SEO 净新增。

## 0.6 目标阶梯（三档情景，2026-09-05 按基率校准 —— 不是预测承诺）

> **先认基率**：新站 SEO 多数一年做不出成果（身边实例就是中位数，不是尾部）。常见死法：以为的蓝海其实是红海 / 只发布零分发 / 沙盒期 2~5 个月没数据就放弃或乱改 / 内容无差异 / **从不设止损越陷越深**。下表数字 = "论点成立时的路径"，**本节真正管用的是三档判定 + 下方止损线**；到点实测落在哪一档，就执行 §6 对应动作。

| 时点 | 悲观（多数站的命） | 基准（论点成立） | 乐观 | 页数 |
|---|---|---|---|---|
| 1 个月（10/04） | 曝光 <300，访问 <0.5/天，零词 top 30 | 曝光 300~1,000，访问 0.5~3/天；部分 /mix/ 词进 30~50 名 | 曝光 1,500+，5/天 | 41 |
| 3 个月（12/04） | 曝光 <1K，零词 top 30 | 1K~8K，5~30/天；首个长尾词 top 10 | 15K，50/天 | 61~71（V2.2） |
| 6 个月（2027/03） | 停滞 1~3K | 5K~30K，30~150/天；三色页 top 30 | 60K，300/天 | 71~78（V2.3） |
| 9~12 个月 | 已止损离场 | 30K~80K，100~300/天 → 触及变现线（RPM $5~15 = $45~200/月起步） | 300+/天接广告，向 $500/月爬 | 80+ |

**止损线（钱只花了域名，要管住的是时间）**：**2027-01-31 复盘**，若 28 天曝光 <5K **且** /mix/ + 场景词合计零个进 top 30 → tintbrew **停止新增投入**（站保留零成本躺着、外链维持最小动作），主力转下一站。**在此之前：不加页不加码、不买任何付费东西** —— 每一步投入先过 §6 的门。

**凭什么和多数站不一样（当假设看，不是事实）**：① KD 0 词是 SERP 逐个实勘的弱结果 —— 但 SERP 里能看见的都是幸存者，"弱"不等于轮得到我们；② Oklab 工具差异化真实存在；③ 分发计划具体到文案。三条只是降险，DR0+零外链的墙还在。

**Request indexing 9 个 URL：✅ 全部完成 2026-09-09（用户 GSC 操作；6 条 how-to/what-colors 页 + icing/buttercream 色卡页 + color-guides hub）**

## 1. 已完成（时间线）

| 日期 | 里程碑 |
|---|---|
| 2026-09-03 | KD 调研定型：Oklab 混色工具 + KD 0 长尾矩阵双轨 |
| 2026-09-04 | **上线** tintbrew.com：33 页，Cloudflare Pages，GSC 验证 + sitemap，Email Routing |
| 2026-09-04 | Uneed 目录站提交（首批外链）；外链文案定稿（README「外链提交文案」） |
| 2026-09-05 | **V2.1 W1**：烘焙 4 页 + /what-colors-make-brown/（49.5K/月）+ /color-guides/ hub |
| 2026-09-05 | **V2.1 W2**：三色头词页 purple(22.2K)/green(18.1K)/orange(18.1K)，绿页按画家打法重写 |
| 2026-09-05 | GSC 效果页出现首批数据（说明已被索引参与排名） |
| 2026-09-05 | 作战文档体系定稿：PLAN/DISTRIBUTION 迁入 `docs/tintbrew/`，每日工作当天更新进 PLAN；万圣节分发窗写入 §5（10 月第 1 周 frosting/icing pin） |
| 2026-09-05 | **目标阶梯按基率校准**（用户质疑"太理想"成立）：改三档情景表 + 认基率（多数站一年无成果是中位数）+ **2027-01-31 止损线** |
| 2026-09-05 | **探测工具边界确认**：AITDK 官网 = AI 写作工具集，无查量 API → 拉量固定走用户插件（分工入根 CLAUDE.md）；Google 补全接口三条管道全堵（WebFetch 域名校验 / webReader 拒 query 串 / 本机 curl 无代理），变体枚举继续走自动搜索 |
| 2026-09-05 | **短词机会实勘（用户提问"有没有在短词里找机会"触发）**：`color mixing chart` SERP 极软 → 新页候选入 §2（量 9/8 拉）；gold/teal 扩色预勘可打；同批 `multiplication chart`（chartglade）硬、`cursive alphabet` 探针区域污染作废 —— 证据分级规则入根 CLAUDE.md |
| 2026-09-06 | **GSC 基线（day 2）**：2 点击 / 29 曝光，疑自搜/自点污染 → **手动搜站禁令**入 §4。判读：上线第 2 天属正常区间（预期锚：1~2 周收录爬完、2~6 周曝光爬升、2~3 月长尾进前两页），裁决窗口 = 10-01（§6 已有），中途不动盘 |
| 2026-09-06 | **AI 截流分级**入根 CLAUDE.md 选词纪律（用户观察"SERP 第一被 AI Overview 挡"触发）：what-colors-make 族 = 答案型，截流风险最高，已建 9 页躺页龄不加码；工具页 = 交互型，AI 替代不了，词池重心逐波移向工具型（分级备注入 §2） |
| 2026-09-06 | **收录基线：GSC 40/41（98%）**，上线第 2 天近全量 —— 正常偏快；缺的 1 页周一例行查「索引覆盖」，不处理。Request indexing 9 URL 已完成（用户） |
| 2026-09-07 | **9/6 调研批四词拉量落位**（用户 AITDK + Claude SERP 复勘）：color mixing chart 6.600K/KD27 触发 ≥2K 规则 → /color-mixing-chart/ 锁 V2.2 首批；gold 3.6K、teal 1.9K 双门槛过 → 配对进扩色池；acrylic 390<500 不单独建页、由 chart 页覆盖。复勘 4 词全软无区域污染。开建仍等 §6 的 10-01 决策点 |
| 2026-09-07 | **周一例行（首次，数字全部【实测】GSC）**：编入索引 52 / 未收录 14（重定向 2 + 已抓取未索引 8 + 已发现未索引 4）—— **52 > 站内 41 页**：全站视图含 sitemap 外 URL 变体，与上周 40/41（sitemap 口径）不可直接环比，9/14 复核固定用「网页索引编制」的 sitemap 视图；效果 28 天 = 2 点击 / 29 曝光无新增（day 4 自搜污染基线，裁决窗 10-01 不动盘）。**site: 修正归因**：用户查询走美区外网（非国内直连），"约 153 条" = Google 估算值（翻到最后一页才是实数），仅粗信号、判定以 GSC 为准。**判读：全部正常，无一项需要动作** |
| 2026-09-07 | **移动端小屏打磨上线（用户反馈"感觉不像手机站"触发）**：审计确认组件本有完整断点（Mixer/Converter/Scenario 均为 48rem 桌面双栏塌手机单栏，26rem 还有微调）—— 实修两处观感：MixTable 比例行固定列压缩（≤30rem，**24 个 mix 页**名称列从 ~60px 回 ~130px）+ hero 间距收紧（≤40rem）。41 页/81 测试绿，main 直推部署，与 chartglade 移动端热修同批（见其 PLAN） |
| 2026-09-07 | **Peerlist 项目卡上线（外链 #2，Uneed 后第二根）**：peerlist.io/xuanxuyin，Design Resources 类目，visit 链接 `?ref=peerlist&utm_source=peerlist` 实测通 —— canonical 自指无重复 URL 之忧，utm 参数后续在 CF Analytics 按 source=peerlist 归因真实引流。挂着 = 外链已生效；**流量入口是周榜 feed，但 launch 有验证门**（官方 help：verified 账号才进 Launchpad）—— 已走 workplace 免费验证（09-07 交，Under Review），通过即解锁；identity 付费不买（PLAN 止损纪律：不买任何付费东西）。cover 用现成 og-default.png（1200×630 正中推荐）。**【9/17 更正】launch 门实测是收费 "Verify Identity"，workplace 验证不解锁 → launch 搁置不买；卡片外链不受影响** |
| 2026-09-07 | **AlternativeTo 提交（外链 #3）**：用户走 "color mixer" 竞品页 → Suggest an alternative 路径提交 tintbrew.com；审核数周，收录与否 10 月初周例行顺手查。**当日外链格局：Uneed(09-04) + Peerlist 卡片(09-07) + AlternativeTo(09-07) 三根齐**，后续增量看周榜（等 workplace 验证）与 PH（10 月） |
| 2026-09-07 | **GSC 首查提前（用户拉热门查询）**：10 词 14 展示 0 点击【实测】—— 矩阵层全面起跑（blue plus yellow 34.0 最接近 10-01 的 top 30 门）；**what two colors make yellow? 3.0**（1 展示小样本，答案型词、后续盯"位次进 top10 + 点击仍零"的截流指标）；工具头词 color mixer 62.7（3 展示，KD27 词 day 5 有名次是好信号）；0 点击与位次匹配非截流证据；用户手搜样本混在 blue and yellow make what color（43.0）里。判读：day 5 属预期轨道偏快，不动盘 |
| 2026-09-09 | Request indexing 9 个 URL 全部完成（用户 GSC 操作，剩 3 条色卡/hub 今日补齐） |
| 2026-09-09 | **GSC 曝光首查：累计 650**【实测 GSC，上线以来】—— 疑混自操作查询（手动 Google 搜词验排名、翻到看到自己站 = 计入曝光；site: 查询与 GSC 界面内操作**不计入**）；待查询明细拆分真实/污染。**新纪律：查排名只用 GSC 查询报告（被动记录含平均排名列），不再手动 Google 搜词** |
| 2026-09-09 | 外链 Peerlist + AlternativeTo 提交完成（用户操作）→ 目录站三渠道全提交（Uneed 9/4 + Peerlist + AlternativeTo 9/9），进入等审核收录期 |
| 2026-09-10 | **GSC 头词首查（9/10 周四固定任务）**【实测 GSC】：what colors make brown 展示 1 / purple 2 / green 1 / orange 0 —— 4 词合计 108K/月池，展示 4 次 = 噪音级刚冒头；长尾矩阵词（orange+white/pink+purple 等）排名 6~7 但展示 1~2 = 样本太小不判。**判读：day 6 DR0 零外链正常表现，不动盘，裁决窗 10-01** |
| 2026-09-10 | **GSC 复查（§6 决策点）**：曝光无变动，累计 650 确认**全为自操作查询污染 → 真实曝光 ≈0**（上线第 6 天，沙盒常态）。按规则"零曝光再等 1 周"，下一检查 9/17，10/01 批次门不变 |
| 2026-09-14 | **GA4 gtag.js 上线（G-5V4P4ZYYZH，用户建账号触发）**：ID 进 consts.ts `gaMeasurementId`，脚本挂 BaseLayout `<head>`（`is:inline` + `define:vars`），41 页全带（含 404）；与 CF Web Analytics 双跑（CF 防双计数的告诫只管它自家 beacon，GA 是独立体系）。**连带合规修正**：/privacy/ 原文案 "sets no cookies" 只提 CF cookieless —— GA 会种 `_ga`/`_ga_*`，已改为如实披露两套统计 + GA cookie 用途（否则虚假声明）。41 页构建 + 81 测试绿，push main（`2b71a80`）部署后 **GA 实时验证 ✅ 9/14 通过（两站数据均流入）** |
| 2026-09-14 | **GSC 最差 10 词体检（用户拉热门查询按排名倒序，问"是否偏航"）**【实测 GSC】：全部 0 点击 / 1 展示 / 排名 73~96 —— **判读：未偏航，上榜结构与站架构对位**。分布：头词变体 1（what color makes brown 80.0，49.5K 头词 day 10 深位 = 预期轨道）+ 工具词 2（rgb color mixing online 73.0 爬坡中；rgb color mixing formula 73.0 = 无公式内容，V2.2 建页顺带收）+ 未建页相邻需求 2（**color mixing chart online 83.0 = V2.2 /color-mixing-chart/ 需求侧证，建页带 online 交互角度**；how to make brown fondant 74.0 = 烘焙簇 fondant 缺口，入观察池 9/18 周四例行顺手 AITDK 拉量再判）+ 噪音 5（colour ×2 = **非美区展示直接证据**，看 GSC 必须加美国筛选；orange color 泛意图；purple pigments 画材人群）。**基本盘反向确认：矩阵词无一上榜**（9/7 实测排名 6~7）—— 若偏航该集体沉底，实际相反。单一曝光的排名均值无统计意义（Google 试探派词）。裁决窗 10-01 不动盘 |
| 2026-09-14 | **GSC 最好 10 词体检（用户问"要不要做成单页/有没有扩展基础"）**【实测 GSC】：0 点击 / 1~3 展示 / 排名 5~8（首屏）—— **10/10 全部对位既有页**：pink+purple 族 ×4 + orange+white 族 ×3 + yellow+white ×1 → 三个矩阵页（mixes.ts 已核存在）；color to green → green 头词页变体；#6d28d9 → **本站主题色 hex 被人搜**（converter 类页顺带收，无动作价值）。**判定：不做任何变体拆页** —— 同对颜色 N 种问法 = 同一意图，矩阵页一页吸收变体是设计本意（3 变体文案机制），拆页 = 自相蚕食 + doorway/薄内容红线；排名 5~8 恰证明现有页吸收变体能力已被认可。**扩展：基础有但证据不够** —— 矩阵 = day 10 最强排名资产，pink 系变体密度 4/10 最高（最强需求簇）；但 13 展示 0 点击在位置 5~8 的 CTR 噪声带内，变体密度只当辅助信号。主判据仍是量：gold 3.6K / teal 1.9K 已在扩色池、V2.2 chart 页已锁定，全等 10-01；届时扩色批可把 pink 新配对（pink+gray / pink+gold 类）列为候选先拉量 |
| 2026-09-14 | **site: 57（周一例行粗信号）**：vs 9/7 "约 153 条"缩水 2/3 —— 估算值口径本就不稳（9/7 已入档：翻到最后一页才是实数），且 57 > 站内实际 41 页 = 估计值含 URL 变体/去重残影；无动作。权威判定源 = GSC 索引覆盖 Indexed 数（当日待用户补 sitemap 视图读数，与上周 40/41 可比）。site: 查询不污染 GSC 曝光（9/6 定性） |
| 2026-09-14 | **GSC 站点地图报告（周一例行·结构面）**【实测 GSC】：sitemap-index **40 条已发现 / 0 错误** / 上次读取 9/13（新鲜）—— 40 = 41 页 − 404，满格覆盖，结构健康；索引覆盖 sitemap 视图 Indexed 数待补（上周可比 40/41） |
| 2026-09-14 | **索引报告"14 已编入"虚惊 → 定性：过期快照**：用户读出 未编入 52 / 已编入 14（无筛选、未点原因行），报表顶部**「上次更新日期 9/4」** —— 谜底：快照停在上线日（9/4 当天初始爬取状态 ≈14 已编入属正常起步节奏；顺带 52/14 与 9/7 周一实测"52 已编入/14 未收录"恰为同对数字镜像，聚合报告在旧快照/视图间摆动是常态）。**四路旁证定案**：site: 57 >> 14 ｜ 查询拿曝光（矩阵词 5~8 位）｜ sitemap 40 发现/0 错误（9/13 新鲜读取）｜ 服务端 200 + canonical + 零 noindex。**例行纪律修正（同 chartglade）**：聚合索引数只在「上次更新」推进后环比、读数必带快照日期；新站期以 sitemap + 曝光 + site: 为准 —— 今日三样全绿，周一例行闭环 |
| 2026-09-14 | **域名前世诊断：wayback 零快照**（👤 美区浏览器查，同 chartglade 当日）—— tintbrew.com 全新域名无历史，**9/16 Pinterest 设置时链接 pin 预期同被拦**（新域+新号双新组合信誉制，chartglade 先例 9/11/9/14 两拦）；处置同预案：账号保温零链接 pin，等信誉自然涨，不硬试不申诉 |
| 2026-09-14 | **GA「今日 7 活跃用户/22 事件」数量级疑虑定性（用户问"和预期差太多"，同 chartglade 当日）**：判读 = **如期非故障** —— ① GA 当日装机（9/14 `2b71a80`）+ 实时验证自访为大头（~3 事件/用户单页短会话形态吻合，【推断】）；② 北极星 = GSC 曝光（§0），矩阵词 5~8 位但展示仅 1~3 = 词未被广泛派发，非排名问题；③ §0.6 基准档 1 个月预期 0.5~3 访问/天，day 10 的 7（含自访）不落后。服务端复核【实勘 curl 权威 NS+CF IP】**200 正常**。流量真口径 = CF Web Analytics + GSC 曝光；GA 标准报表 9/16 后可读。无动作，裁决窗 10-01 不变 |
| 2026-09-15 | **Bing/DDG 收录洞实勘 + IndexNow 主动推送上线（用户质疑"别总依赖 GSC，数据停 9/4"触发，数据源纪律已修正入长期记忆）**：DDG `site:` 实勘【实勘 10808 代理美区，Bing 生态口径】= **仅首页 1 条**——Google 侧 40/41 满格（9/6 已档）无恙，洞只在 Bing 系。当日补：IndexNow key 文件入 public/（`0d754f5` 部署）+ api.indexnow.org 批量 POST 全 40 URL，单测 202 / 批量 200【实测】。**SERP 竞品实勘顺带**：orange+red top10 全小站（color-meanings / paintlogs / artincontext 级，零大厂零 Reddit 位）；black frosting top10 全中小烘焙博客（chelsweets / cakewhiz / wikiHow / Wilton blog）—— V2.2 扩量再添可打性侧证。判读：Google 路线不动（矩阵词 5~8 位等派发，裁决窗 10-01）；Bing 路线从 1 页启动，9/22 周一例行加查 DDG site: 复核 |
| 2026-09-18 | **同类站竞扫（用户指令，与 chartglade 同批）**【实勘 页面渲染文】：trycolors.com（混色 SaaS：目标色→自动配方 / 250+ 品牌库 / PRO Kubelka-Munk / B2B API，teal SERP 在位）+ colordesigner.io（多色 mixer + 数量权重；CF 盾 sitemap 不可读）+ what-colors-make 内容 SERP 在位者（Golden / Will Kemp / Homedit / 烘焙博客群）→ 拆解入新建 [BENCHMARKS.md](./BENCHMARKS.md)。**产出：V2.3 候选重排 —— 反向配色计算器升首位（目标色→基色比例，交互型 AI 免疫）+ mixer 多色升级**，开建全等 10-01 门；内容侧零新增动作（现路线即他们的核心形态） |
| 2026-09-20 | **"GA 全 0"诊断（用户报双站统计归零触发）+ CF Web Analytics 实锤断流**：【实勘 curl 浏览器 UA + Accept: text/html，双站首页+内页 4 URL】GA4 gtag 完好在位（G-5V4P4ZYYZH，9/14 装机未动过）；CF beacon **4/4 全缺** —— chartglade 9/9 同法实测可见（其 PLAN 9/9 行），今日双站全无 = 注入 9/9~9/20 间停了（本站曾工作的证据 = chartglade consts "same as tintbrew prod" 注释【推断】；时点机制不明，疑与 9/14 GA 部署同期【假设】）。判读：GA 管道大概率没坏，"全 0"最可能 = 真实流量≈0（矩阵词 5~8 位但展示 1~3 = 词未被派发 + 答案型疑截流；基准档 0.5~3 访问/天）+ 短日期范围盖掉 9/14 尖峰（7 用户/22 事件）。裁决三步（Realtime 自测 / 拉宽范围找尖峰 / CF dash 徽章）已进 TASKS；CF 修复 = dashboard 重开自动注入或 token 进 consts（**二选一**防双计）。**CF WA 修复前，流量真口径暂以 GSC 曝光/点击为准** |
| 2026-09-20 | **CF WA 真死实锤 + 修复路径（同日第二翻案）**：真无头 Edge 探针（chartglade `scripts/beacon-probe.mjs`，chartglade 同批对照 beacon 在位）抓本站首页 + /mix/red-blue/ 原始 HTML —— **beacon 2/2 全缺**（gtag 对照在位 = 页面与 GA 无恙，Realtime 自测亦过）→ **CF 注入对本站从未生效**（【推断】WA 站点建了但自动注入没开过：本 PLAN 历史无一条 WA 读数在档，与用户 dashboard 全 0 吻合；非 9/9~9/20 间断流）。**修复（待 👤）**：dash.cloudflare.com → Web Analytics → tintbrew.com → Settings/Get site tag 拿 token 发 Claude → 进 consts.ts `cfBeaconToken`（手动模式，token public by design；本站现无自动注入故无双计风险）→ 部署后真浏览器探针复验；连带 consts 注释与 §7 技术备忘"自动注入留空"条随 token 提交一并更新 |
| 2026-09-20 | **CF WA 修复当日上线并线上验证 ✅（手动 token 模式）**：👤 选 Enable with JS Snippet 拿 token → consts.ts `cfBeaconToken` 填值（BaseLayout 预埋渲染块当天启用，**零新代码**）→ 41 页 build + 81 测试绿 → push main `5a142b1` 部署 → **线上 curl 实勘 token 在位**（首页 + /mix/red-blue/ 双 URL；手动模式 = 构建时嵌入静态 HTML，curl 直接可见，不再依赖按指纹的边缘注入）。双计数防护：dashboard 只开 JS Snippet 未开 Automatic Setup；数据面验证 = 👤 访问一页后回 dashboard 刷新看曲线冒头 |
| 2026-09-20 | **GSC 全站视图读数 54 编入/15 未编入**【实测 用户报】：对 9/7 的 52/14 微增，41 页站收录满格状态保持，无动作（未带快照日期，周一例行补 sitemap 口径环比） |
| 2026-09-24 | **索引报告 53 编入/16 未编入【实测 GSC 全站视图，快照 9/21，👤 报】→ 健康，无动作**：对 9/7 52/14、9/20 54/15（无快照日期）均在 ±2 摆动带内，41 页站收录满格保持；原因分布 = 重定向 12（www+URL 变体）/ 已发现-未编 4 / 已抓取-未编 0 / **无 403 无异常**。效果 28 天环比 + sitemap 口径周一例行顺手补 |
| 2026-09-24 | **chartglade Pinterest 三连拦（9/11/9/14/9/24）→ 本站 9/14 "预期同被拦"预判强化 + 万圣分发改道**：同 CF Pages/同新域/同新号组合，本站链接 pin 大概率同门（2~6 周信誉窗）。**10 月第 1 周万圣分发主力改 Reddit 烘焙帖**（DISTRIBUTION §3.4 文案在位），frosting/icing 色卡 pin 降为"10/01 门开则补发"；本站 Pinterest 设置照常做（账号/board/域名认领），链接 pin 不硬试，10/01 与 chartglade 同日首测 |
| 2026-09-24 | **色盲测试提案判定（👤 "加色盲测试卡，测几轮看是否色盲/色弱"）—— 筛查向否决、敏锐度向新入候选**：① 医疗筛查向（Ishihara 类）双杀 —— 人群漂移（搜者 = 健康自查/职业体检人群 ≠ 调色 DIY 人群，聚焦护栏三问①②不过）+ **YMYL 医疗属性**（E-E-A-T 门槛，SERP 被 EnChroma/视力专业站垄断，DR0 打不动；"仅供参考"标注解不了排名难度与主题代价）；chartglade 9/11 已裁"在线交互色盲测试归第三站候选池"，先例直接适用本站。② **变体提案入候选：色觉敏锐度测试**（color IQ / hue 排序挑战 / 找不同色块）—— 非医疗非 YMYL、设计师趣味挑战形态（X-Rite Color IQ 先例）、人群与 mixer 用户 100% 重合、交互工具型 AI 免疫（与词池重心方向一致），可与 mixer 互导流 → **入 V2.2+ 候选（排 V2.3 反向配色计算器后）**，AITDK 拉量后再判。开建全等 10-01 门 |
| 2026-09-24 | **色觉敏锐度拉量+SERP 实勘收官 → 降级为观察池（非 SEO 量级方向）**【实测 AITDK 用户拉 + 实勘 Claude 美区】：主词三件 = color perception test **1,600/KD51**（唯一过 500 线）/ color IQ test 140/KD16（品牌词被 X-Rite 吸走，如预判）/ how well do you see color 20（无量）。SERP 实勘 `color perception test` 前 7 = ①X-Rite 官方 hue 测试（品类"原版"，仪器巨头）②EnChroma（医疗向品牌王）③ColorLitelens 小厂 ④**ArtyClick 小工具站（tintbrew 级玩家能进前 5 的实锤）**⑤Colormax 诊所 ⑥⑦Reader's Digest / PetaPixel 媒体文章。**判定**：①量王仅 1.6K 且 KD51 + 前排被 X-Rite/EnChroma 双品牌钉死（KD51 构成即此）→ 对比 V2.2 已锁 color mixing chart 6.6K/KD27 无巨头，本词性价比全面落败；②但 ArtyClick #4 = 小站形态在此 SERP 有生存位，**降级不删除**：入观察池，动机若成立也是"工具矩阵深度 + mixer 导流"而非 SEO 量，排在反向配色计算器/扩色配对/chart 页之后；③B 组 farnsworth 学名族不补拉（主词量级已定，专业词只会更小），D 组对照组不拉（医疗向已弃，量再大够不着）—— 拉词收档 |
| 2026-09-24 | **B 组补拉 + farnsworth SERP 实勘 → 翻案：观察池上调 V2.2 第二梯队（同日第二改）**【实测 AITDK 用户拉 + 实勘 Claude 美区】：用户顺手拉了 B 组 —— farnsworth munsell 100 hue test **880/KD31** ✅ + hue test **590/KD27** ✅（两词过 500 线且 KD 显著软于主词的 51）+ color discrimination test 70 ❌。SERP 实勘 \`farnsworth munsell 100 hue test online\` 前 7 = ①X-Rite 官方（收购 Munsell = 品类原版）②Colorlitelens ③colorblindnesstest.org ④colorblindtest.ai ⑤color-blind-test.com ⑥blindnesstest.com（40/85 caps + 误差分 polar 图）⑦Alan Ranger 摄影博 —— **除 #1 全小站，零医疗巨头零大媒体** = 中段可进。**并页账**：color perception test 1,600 + farnsworth 880 + hue test 590 ≈ **3,070/月一页吃**（同族同意图，9/14"一页吸收变体"纪律），与 gold 3.6K 配对同量级，且是 V2.2 候选里唯一**交互工具型**（AI 免疫）+ 可与 mixer 互导流。**终局排位：color mixing chart 6.6K > gold/teal 扩色配对 ≈ hue test 并页 ~3K（工具形态加分）> 反向配色计算器（未拉量）**，启动全等 10-01 门。**人群备注**：在位者多 colorblind 自筛站 = 该词人群偏自查非纯设计师 → 页面形态做"趣味 hue 挑战 + 误差分 polar 图"两边人群都接（X-Rite/ArtyClick 趣味形态真实在位）；medical 免责标注随页带上 |
| 2026-09-24 | **per-page OG 图上线（9 月下旬排期当日做掉）**：24 张 mix 页 Venn 卡（A 圆 + B 圆，重叠透镜 = Oklab 引擎真混色，双方与结果 hex 码手写像素字体压印）+ 8 张场景/色卡页"源色 → 箭头 → hero 答案"卡 + 品牌默认卡保留给工具页 = 33 张 1200×630 共 640K（`npm run og` 可重生成）。纯 JS pngjs，字体扩到 0-9 A-F # + 空格；Node 不能 import TS 引擎（本机坑）→ `scripts/og-color.mjs` 逐字移植 Oklab 数学 + `scripts/og-data.mjs` 数据快照，`src/lib/og.test.ts` 8 条测试三重防漂移（快照=数据源 ｜ 移植=引擎逐对一致 ｜ dist og:image 引用→文件存在），81→89 测试全绿 + astro check 0 错。**坑入档：mix 页 slug = 数据顺序 `${a}-${b}`（getStaticPaths 原文），不是 mixSlug 排序名 —— 排序名是 `public/_redirects` 反向 301 的来源侧**；生成器/测试第一版都踩了这坑（dist 无 blue-red 目录才暴露）。意义：Reddit 烘焙帖 / Pinterest 色卡 pin / 后续外链的链接卡片从品牌默认卡升级为逐页真值卡（hex 直接可见 = 卡片即工具广告） |
| 2026-09-24 | **GSC 效果首报**【实测 用户 GSC 报数，窗口未注明按默认视图】：点击 10 / 曝光 **4,924** / CTR 0.2% / 平均排名 **37.2**。对 9/10 基线（曝光累计 13、brown 1/purple 2/green 1/orange 0）= 两周曝光 13→4,924，分发链路实锤打通，全站已进大量词候选池；平均排名 37.2 离 10/01 决策门 top 30 线差 7 位，均值附近通常意味着已有词在 20~35 晃。**读数纪律（回应"没参考价值"）**：点击/CTR 在排名到位前恒零无信息量；活信号 = 曝光量级（分发量）+ 平均排名（爬升位）+ 查询明细（哪些词在冒头，10/01 门判断输入） |
| 2026-09-24 | **fondant 族拉量收官 → 终局不进烘焙簇**【实测 AITDK US/月，👤 拉 + "太少了没意义"】：black 140/KD23 + brown 70/KD22 + blue/green/orange/pink/purple/red 各 20 —— **族合计 ≈330，对当日新定标（词族 ≥10K/月才做）差 30 倍 → 否决**。9/14 该词入观察池的原始信号 = GSC how to make brown fondant 排名 74 的单曝光试探派词，非需求量证据（单曝光不入决策的既有纪律再次验证）；烘焙簇维持现状（frosting/icing 色卡 + brown 头词页），不扩 |
| 2026-09-24 | **扩容调研日 AITDK 六组全终局（👤 拉 43 词 + Claude SERP 实勘 9 词）—— tintbrew 净增词池 +90.7K，头词池 108K→199K**：① **穿搭配色族立项 31.4K**（what colors go with X，10 词 KD22~33 趋势全 I，9/5"未验证暂缓"终结）：SERP 实勘 4 词 —— Pinterest pin #1 ×3（brown/purple/burgundy）+ **Coolors、Palette Hunt 两个配色工具站排 top5**（工具站形态可进的实锤）+ The Spruce 仅 1 现身、Benjamin Moore 全程不见 = 混合 SERP 非禁区；decor 修饰变体 SERP 偏杂志（House Beautiful/Farrow & Ball）→ 打 raw 词 + outfit/decor 双场景分段。落位 V2.2：每色一页"搭配色板"（Oklab 真渲染 swatch + hex + print CSS 可撕色卡），首批 brown 8.1K/green 6.6K/purple 5.4K/burgundy 2.9K 四页；与 make 页兄弟互链不蚕食。② **make-X 头词扩容立项 59.3K**：blue 22.2K/KD29 + red 18.1K/KD29 + black 14.8K/KD32（三头 55.1K，9/5 枚举盲区漏网，教训第三次）+ maroon 1.6K/peach 1.3K/turquoise 1.3K 过 500 线；SERP 实勘三头全软 —— blue：**ColorKit 工具站 #1** + Pinterest；red：Pinterest #1 + 小博客群；black：艺术家个人博客（2019 文）+ Masterclass。blue/red = 原色陷阱词（真做不出来 + 近似/shade 路线 = 内容差异化点），black = chromatic black 互补对路线（brown 页同款）。**纪律修订：9/6 "make-X 不加码"按 9/24 10K 定标推翻**（量差 5 倍 + ColorKit 头名 + 模板零边际成本），AI 对冲 = 页面强制带 Oklab 现算 swatch 表 + mixer 嵌入。③ **圣季 frosting 族 3.09K 死档**（8 词全 <600；已建 black frosting 1.3K 实为全族头词，烘焙簇维持现状即最优）；lavender 390/coral 320/navy 110/mint 20（工具态）弃由 FAQ 吸收。两族全部开建等 10-01门 |

| 2026-09-24 | **V2.2 穿搭配色族 4 页上线（👤 "开工不等 10-01 门"指令，#8 ② 提前做掉，main `4e9aa06`）**：/what-colors-go-with-{brown,green,purple,burgundy}/，41→45 页。**形态落地**：每页 10 套 outfit 组合（OutfitFigure SVG 纸娃娃人台：top/pants/outer/shoes/accent 五角色→部位填色，回应 👤 "没衣服模板怎么展示搭配"——不需要照片，SERP 里 Coolors 裸色板即先例，我们加人台+角色标签超出它）+ 4 decor 色板（同色房间场景，吃 raw 词的 decor 意图混合）+ 3 avoid + 5 FAQ + mixer 嵌入。**计算层 lib/outfitContent = 反薄内容/AI 对冲**：每组合 Oklab 明度差 why-line（锚件 vs 明度差最大伴件的 L 值/差值/高中低对比 + hue 关系分桶：中性锚/同族回声/中轮对比/对轮对比）+ 9 步 Oklab 阶梯 + 最近色名子标签——全 build 时算出，无 JS 也完整。print CSS 可撕色卡（@media print 隐藏导航/mixer/tips/FAQ，组合卡虚线边框 break-inside avoid）。hub/Footer/OG 全数据驱动接线（OG 第四段 anchor 大圆+partner 扇形，pngjs 像素级验证）；112 测试全绿（+23：数据守卫 top+pants+shoes 完备性/items[0] 家族锚定/related 必带 make 兄弟链 + 计算层唯一性 + dist 接线 + OG parity）。**数量克制线在档**：族内剩余 6 词（gold/teal 1.9K、gray 1.6K、black 1.3K、beige 1K、navy 720 合计 ~8.4K）不建——单页无 ≥2.5K 头词不配模板，扩到 10 页是数量 vanity；make-X 6 页仍等 10-01 门。IndexNow 补推 4 URL |
| 2026-09-24 | **V2.2 交互升级（👤 两项批评驱动："不能自己换颜色？都是固定搭配？""人台很丑"，当日第二推 main `d4f5b16`）**：① **换色 island** `scripts/outfit.ts` —— 组合卡每色块升级为按钮（data-swap），点击弹本页预设色 chips + 原生 custom 取色器，拖动实时预览；换色后**人台部位（data-part/data-attr）+ 最近色名子标签 + Oklab read + 9 步阶梯全部实时重算**。架构关键：配对纯数学抽 `lib/pairingRead.ts`，build（outfitContent）与 island 共用同一实现 —— island 若 import outfitContent 会把 outfitPalettes 全量数据拖进浏览器包；新增 parity 测试锁"客户端重算 === 服务端渲染"永不漂移。② **人台重画 v2（视觉验证流程立档：headless Edge 截图 dist → AI 视觉评审两轮）**：v1 评审揪出六缺陷全修 —— 头发路径自交（外弧顶 y22 vs 内弧 y21 零厚度）→ 重算发帽+髻；无手截肢感 → 腕下手圆；裤腿 w17 内缘距 1px 并柱+脚悬浮 → 踝距开到 x66/94、裤腿 15、鞋重定位；外套斗篷化 → 门襟弧线+下摆收窄+袖 13；项链悬空 → 沉入新增领口 scoop；无领口线上身熔颈 → skin 挖领。v2 评审通过（剩余"缺陷"核实均为数据本色：白鞋=搭配真色、窄腿缝=阔腿裤型）。114 测试全绿（+2：parity + dist island 接线守卫） |
| 2026-09-25 | **穿搭页二连修（👤 两反馈："脖子脱离身体了""我在哪个页面可以自己搭配"，main `ede4419`）**：① **颈部断层修复** —— v2 颈路径终点 y≈64 vs 躯干顶缘中心 y≈74，锁骨处 ~10px 白缝（"头悬浮"观感根源）；颈延长至 y74 且带弧度塞入躯干之下（躯干后绘覆盖颈根，领口 scoop 不动）。360px 放大截图 + AI 视觉复检两图：chin→neck→torso 皮肤连续无白缝，领口/发/臂/腿/鞋各接点全过。② **Style it yourself 自由搭配区**（combos 与 decor 之间，no-print）：起步 outfit = 锚色 top + charcoal 裤 #3b3936 + ivory 鞋 #f1ede6 + 金吊坠 #c9a24b；卡片结构 = combo-card 同款 markup + data-studio 标记 → scripts/outfit.ts 换色 island **零改动自动接管**（每角色点色块 → 预设 18 色/自定义取色器，人台部位 + 最近色名 + Oklab read + 9 步阶梯实时重算）；SSR 预写完整默认 outfit，SSR-shell 底线不破。114 测试（守卫升级：每页 reads 10→11、swap chips = items+4、data-studio 在位断言） |
| 2026-09-25 | **拼豆细节层 WIP（未提交待验收）——独角兽 v3 重画 + 自由涂色画布**：👤 对 v2 样例判定「大小可以了，但就是太丑了」→ ① **独角兽 v3**：对照真实在位可爱图纸结构重画（蛋形头 10→12→14→16 宽四行圆角阶梯 + 下颌对称收窄、3×4 大眼带高光且靠拢、鬃毛从贴边细条改 4~5 宽鳞状双色厚发垂过下颌、口鼻缩小至 6 宽带鼻孔/阴影行/小笑、腮红贴颊缘、刘海小发簇+投影带、角右缘阴影），24 宽 15 区域体系不变，剪影机械审计对称通过；放大截图自审通过（v2 教训：先自审美学再给人看）。② **Blank canvas 自由涂色（👤 新需求：白底+画笔选色+橡皮+八方向拖动复制）**：每个拼豆详情页 studio 第三卡 —— 图形剪影全白珠格 + 空位珠钉（SSR 即完整可打印白模），画笔/橡皮/一键清空 + 32 珠色板 + 自定义色吸附最近珠色，pointer 拖动经 8 连通 Bresenham 插值（快速/斜向拖动不断线），实时用料清单计数（rAF 合并刷新）；顺手修存量 bug：renderList 运行时重建的 li/swatch 原被 scoped 样式漏掉（重涂色后列表丢样式），规则挪全局块。142 测试全绿（+14：paintLine 八方向几何 8 + island 真实 DOM 交互 6），astro check 0 错。**等 👤 验收 v3 美观 + 画布交互后**：批量铺 45 张图 → 批量审计/截图 → ship 仪式 |
| 2026-09-25 | **拼豆上色族立项（👤 提案当日闭环；原判落 chartglade 被三连裁决推翻移入本站）—— 词池 +30.4K（199K→229K），首批 5 页 10-15 前**：👤 裁决原文「为什么做第三站/chartglade，和衣服搭配功能一样，可以做 tintbrew」「不只小孩喜欢，很多成年女孩也爱卡通上色玩法」「应该做 tintbrew 里，替换衣服搭配」。**初判的家长/老师人群假设被推翻**——拼豆/涂色人群主体含大量成年女性手工艺玩家，与 tintbrew「自己挑颜色」定位重合；区域换色 island 即穿搭页现役机器，零新交互架构。词证据与 SERP 实勘全档 [research/fuse-bead-patterns.md](../../research/fuse-bead-patterns.md)：主族 ≈30.4K 过 10K 定标 3 倍（patterns 14.8K/KD35 + ideas 9.9K/KD20 + fuse/melty/easy/templates/christmas/animals/halloween/food），SERP 软（Pinterest #1 + 小博客群，原创图纸供给薄；「选模板→区域换色→打印」无在位者）。**IP 红线：零受版权角色，全原创像素图**（Pokemon/Minecraft/Doraemon 全不做）。首批 = /perler-bead-patterns/ hub + easy/animals/food/christmas 4 页（§3 #9），print 引入 chartglade 同款 .printable 模式；**穿搭 4 页处置已裁决（9/25 👤）：原样保留不动，卡通上色只出现在拼豆新页——31.4K 穿搭词池与 30.4K 拼豆词池两套并存，一套 island 机器两处用** |
| 2026-09-25 | **V2.2 拼豆上色族上线（👤 验收后推送，main `a474fd5`）—— 45→96 页（+51），测试 114→128 全绿**：/perler-bead-patterns/ hub + animals/food/christmas/easy 四画廊 + **46 张全原创图纸详情页**（动物 12/食物 10/圣诞 10/万圣 6/迷你 8；halloween 与 minis 挂 hub 目录，其余挂类目目录）。**架构**：`data/bead*.ts` 每图一条 BeadPatternDef（rows 字符=区域键，'.'=空，padEnd 到 width）→ BeadFigure 单网格三渲染（彩色参考图 / 分区字母模板 / 交互模板）；区域 4~8 个，26 珠色可换（island `scripts/bead.ts` 经 data-* 接管，只 import 纯 lib —— 数据文件不进浏览器包）；每页精确珠子用量表（build 时算出，无 JS 完整）+ .printable 打印模板（letter 纸，window.print 外置 chunk）。**守护测试 +14**：矩形网格/字符↔区域双向覆盖/计数合计/调色板合法/宽图 ≥4 区域/类目数量锁/IP 禁词（pokemon·disney·hello kitty 等 16 词零容忍）/dist 接线/island chunk/sitemap。**视觉 QA 两轮共修 31 处**：① headless Edge 截图 + AI 视觉评审（hub 全览 46 缩略图 + 放大页）揪 21 处（独角兽脸中轴跳变/恐龙下巴/青蛙头顶缺口/幽灵裙摆/南瓜嘴/雪人嘴/冰棒眼/蜘蛛贴左缘等）；② 机械对称审计（临时 vitest：逐行边界中心 vs 全图 bbox 中心，半格=可接受、≥1 格=缺陷）再揪 10 处守护测试与肉眼都漏的（ghost/jack-o'-lantern/spider 各有 1 行比邻行窄 1、reindeer 角+额头整体左移 1、bell 筒身右侧窄 1、watermelon 穹顶左肩多 1 格重画、panda 瞳孔行窄 1 且瞳孔出圈、chick 呆毛左偏、butterfly 尾珠错列）；剩余不对称全是故意设计（比萨斜边/月牙 C 形/圣诞帽右倾/蝙蝠角月/仙人掌单臂/熊猫瞳孔看左）或奇数行固有半格偏移。**方法论入档：守护测试查结构不查视觉，对称性靠逐行中心审计，肉眼数字符不可靠（V 数错 3 次）**。IndexNow 补推 51 URL |
| 2026-09-25 | **独角兽 v4→v4.2 三连修 + AI 视觉评审管线修复（未提交，👤 "行吧先这样，其实分辨率还是很差、整个框架（=图案轮廓骨架）很丑"）**：v4（32 宽/21 区域/568 珠）上线前自审 —— 参考图取证补齐（kandipatterns 实物图定结构基线：鬃毛恒宽色带+错落收梢、软无黑边、眼只 1-2 珠平色 → 我们的分层眼是超越点）；两轮严苛评审修 5 处（角螺旋严格 2 珠宽 V 形折返斜带/前额帘阴影 2 行→1 行/口鼻 tan 只留下巴行/右灰月牙缩到上颊/角尖纯金帽+鼻孔上移拉开嘴角呼吸位），终判 SHIP。**管线坑入档（重要，复用）**：① Astro scoped `data-astro-cid-*` 属性以无值形式输出 —— 合法 HTML 非法 XML，独立 SVG 必须先 strip；② Read 上传图走 CDN URL 且按内容去重 → 同字节新文件名仍拿旧 URL 旧图，**解法 = 截图窗口 ±2px 让字节不同 + curl md5 对拍后才送视觉模型**（本机 zai MCP 401、cloudflared 未装、GitHub 直下 exit 56 全试过） |
| 2026-09-25 | **分辨率天花板定论 + v5 矢量栅格化管线立项（👤 选定"先冲高分辨率试点"）—— 手排 ASCII 网格路线就此终结**：👤 裁定 v4.2 的 32 宽仍是"分辨率很差+轮廓骨架丑"，手排网格到 32 已是人力极限 → 换管线：**图案 = 矢量形状（贝塞尔香蕉形/蛋形/参数心形/环扇）按 painter 序绘制 → 12×12 超采样逐格多数投票 → 网格 + 分区映射**，描边/镜像/分区全由代码保证（`tmp/gen-v5-uni.mjs`，全零依赖纯 Node）。v5 = 64×50/1613 珠/22 区域（+L 前额帘），关键设计决策：蛋形头（颊圆下巴窄 taper 0.14 杀底部楼梯）、鬃毛三锁相贴+阴影条落接缝当分界（v4 'aAbBC' 哲学）、描边只给头+耳（K 占比 30%→12%）、角条纹模板裁剪（stencil clip）2 珠宽、分层眼（黑框+浅蓝虹膜+深蓝底月牙+左上高光）。AI 评审两轮：首轮 8/10（下巴楼梯/呆毛/直条鬃）修完 → 次轮 8.5 SHIP。**待 👤 验收 v5 vs v4.2 对比图**（tmp/uni-compare-v42-vs-v5.png）→ 认可后该管线铺其余 45 图 + 独角兽数据落 beadAnimals.ts；参考来源只学结构不抄格（kandipatterns/kandipad/fusebeadpatterns） |
| 2026-09-25 | **v5 铺满全部 46 图 + studio 同屏排版修（👤 "先按这种把其他的所有图片都处理一下，还有排版…选完颜色不能在同一平面看到效果"，当日验收通过上线 main `0cf5b9f`，IndexNow 推 51 URL）**：① **同屏修**：图纸详情页 studio 布局改画布+调色板同屏可见（不再选完色要往上拉）。② **v5 管线铺全站**：矢量 def 全部迁入 `scripts/beadgen/`（animals/food/christmas/halloween/minis.mjs + engine.mjs + build.mjs 一键生成 5 个 src/data 文件；audit 不过或独角兽漂移即拒写——unicorn 字节级不变守卫通过）。46/46 重画：动物 12（56 宽，猫 1166 珠）/食物 10/圣诞 10/万圣 6（ghost·jack-o'-lantern·bat·skull·candy-corn·spider）/迷你 8（14~22 宽恰 4 区域，~150-400 珠），总 39,932 珠。③ **引擎真 bug 修**：stroke() 端帽原用固定角度只对竖笔正确，横笔自交致偶奇填充对消、笔画塌成 1 珠——改方向感知端帽（atan2 端段方向，半圆从左法线扫到右法线），回归测试过且独角兽（无 stroke）字节不变。④ **文案对齐三级尺度**：pegboardsFor()（≤16 小方板/≤29 单大板/≤58 双大板/64 三板）+ 每图 FAQ 用真宽高；删假话（"五区域以内"、56 宽动物谈钥匙扣）；迷你心 blurb 150→190 珠实数。⑤ 三门全绿：astro check 0 错 / build 96 页 / vitest 142（beadPaint 测试按新 56×40 猫格重写）。视觉 QA：圣诞 zoom 双页 + 万圣 + 迷你放大图 + 站内 cat/mini-heart 详情页截图均过。**坑入档**：输出行号是 trim 后坐标（映射回网格要加回裁掉行）；镜像只点镜像 `poly.map(([x,y])=>[W-x,y])`，不可换参重调；描边中心线走格中线（x+0.5），整数码 50/50 对消会消失 |
| 2026-09-25 | **效果 28 天第二报**【实测 GSC 👤 报，28 天窗口】：点击 10 / 曝光 **11,503** / CTR 0.2% / 平均排名 **37.1** —— 对 9/24 首报（10/4,924/0.2%/37.2，窗口未注明）曝光 +133%：一日跨度异常大，两解 = 真实放量或 9/24 口径不同【假设】，周一例行同口径核实。即便保守取 9/24 数也已超 1 个月乐观档（1,500+）3 倍；11.5K = 3 个月基准档（1K~8K）上限、止损线（<5K）的 2.3 倍安全垫。平均排名 37.1 平走，**10/01 决策门（/mix/ 词 top 30？）届时以查询明细逐词判，不看均值**；自搜污染在此量级已被稀释（9/10 基线 650 全污染 → 现真实分发占大头）【推断】。注：本数据早于当日拼豆 51 页上线，96 页大盘效果后置 |
| 2026-09-25 | **拼豆 studio 两修上线（👤 反馈当日修，main）**：① **zone 取色器"自定义色点了没反应"修复** —— 根因：`.bead-picker` 弹层挂在 zone chip `<button>` 内部，点自定义 input 的 click 冒泡进 chip-toggle 分支当场拆掉弹层（连同 input），原生取色器根本没机会开。修法四件：弹层内点击吞掉不落 chip 切换 ｜ 自定义行加 **Use color 确定钮**（原 label 改 div，防 label 把按钮点击转发给 input）｜ 回显当前选中（网格 active 高亮 + input 初始值 = 当前 zone 色 + hint 显示 hex→nearest）｜ 补监听 `change`（部分浏览器只在原生对话框确认时触发）。② **Blank canvas 加坐标**（👤 "格子无法辨别位置"）：SVG 顶/左各留 6 viewBox 单位边距，每 5 格标数字（猫页 = 列 5..55 / 行 5..40，等宽字体，随图打印——纸上数位更有用）；island `cellAt` 改为从 viewBox 属性自推边距与缩放，不硬编码。**测试 142→145**（+3 zone 弹层回归：active 回显 / 点 input 不关弹层 / 自定义 hex 实时吸附 + Use 提交收口；px() 助手按新 viewBox 换算 + 坐标 label 断言），96 页 build 绿 |

## 2. 关键词资产表

| 梯队 | 词/词族 | 量(US/月) | 目标页 | 状态 |
|---|---|---|---|---|
| 品牌 | tintbrew / tintbrew color mixer | — | 首页 / /color-mixer/ | 等 2~7 天出现 |
| 长尾矩阵 | what color does X and Y make（24 对） | KD≈0 | /mix/* | 已上线；**GSC 实测起跑（09-07，day 5）**：矩阵词批量 18~52 名（blue plus yellow 34.0 / black and white mix 18.0 / mix col 20.0 / red blue make 52.0 / blue-and-yellow 族 40~49），what two colors make yellow? **3.0**（1 展示小样本）；手搜"第 8 页"的权威读数 = 43.0。10 词合计 14 展示 0 点击（位次 34 名外无人点，正常） |
| V2.1 头词 | what colors make brown | 49.5K/KD38 | /what-colors-make-brown/ | 已上线，磨页龄 |
| V2.1 三色 | purple / green / orange | 58.4K 合计 | /what-colors-make-*/ | 已上线 |
| V2.1 烘焙 | black frosting / brown icing / icing chart / buttercream chart | 含万圣季节词 | 4 页 | 已上线 |
| 工具头词 | color mixer / converter / hex to rgb | KD 27 档 | /color-mixer/ /color-converter/ | 3~6 个月长跑；GSC 首现（09-07）：online/digital color mixer 族 67~81 名有展示【实测】 |
| V2.2 候选 | gray/cyan/gold/navy… 扩色配对 | gold 3.6K / teal 1.9K【实测 2026-09-07】，其余待拉 | /mix/* | 未启动；gold/teal 双门槛过（≥500 + SERP 无 DR60+）：gold 前 5 = J Fisher Interiors 博客 + EttaVee + Quora/UGC【实勘 09-05 复勘 09-07】；teal = trycolors 工具站 + Facebook 群组 + 小博客。**走配对页不走头词页**（AI 截流纪律：答案型头词不再加码） |
| **V2.2 候选·第二梯队**（9/24 两改定案） | **hue 排序测试并页**（吃全家族变体） | 家族并页 ≈**3,070/月**：color perception test 1,600/KD51 + farnsworth munsell 100 hue test 880/KD31 + hue test 590/KD27【实测 9/24】（IQ test 140 / how well 20 / discrimination 70 不计） | /hue-test/（或 /color-iq-test/） | farnsworth 词实勘：X-Rite #1 外全小站（6/7 席 DR<50）= 中段可进；唯一交互工具型候选（AI 免疫）+ mixer 互导流；人群偏自查 → 趣味挑战+误差分形态两边接；排 chart 页后扩色配对同梯队，10-01 门启 |
| **V2.2 首批锁定** | **color mixing chart** | **6.6K / KD 27【实测 2026-09-07】** | /color-mixing-chart/（打印版混色总表） | **三样齐全**：SERP 实勘 2 次一致（09-05/09-07）——①Visual Arts Passage ②MyModernMet ③Pinterest ④⑤YouTube ⑥Daniel Smith，UGC+小博客，无工具站无巨头；chart 型 = 打印/参考件，AI 截流低。acrylic 变体（390/KD24，SERP 有 Golden+Liquitex 颜料厂）不单独建页，本页 acrylic 段覆盖 |
| **V2.2 立项（9/24 实测）** | **make-X 头词扩容**：blue + red + black + maroon/peach/turquoise | **合计 59.3K**：blue 22.2K/KD29 · red 18.1K/KD29 · black 14.8K/KD32 · maroon 1.6K · peach 1.3K · turquoise 1.3K【实测 9/24】 | /what-colors-make-{blue,red,black,maroon,peach,turquoise}/ 6 页 | SERP 三头实勘软（blue：ColorKit 工具站 #1；red：Pinterest #1；black：艺术家博客群）；blue/red = 原色陷阱结构、black = 互补对路线，brown 页模板复用；9/6 不加码纪律被 10K 定标推翻（时间线 9/24） |
| **V2.2 立项（9/24 实测）** | **穿搭配色族** what colors go with X（10 词） | **合计 31.4K**/KD22~33【实测 9/24】：brown 8.1K 头名 · green 6.6K · purple 5.4K · burgundy 2.9K · gold/teal 1.9K · gray 1.6K · black 1.3K · beige 1K · navy 720 | /what-colors-go-with-{brown,green,purple,burgundy}/ 首批 4 页，可扩 10 页 | SERP 实勘 4 词：Pinterest #1 ×3 + Coolors/Palette Hunt 工具站 top5 + 家装巨头未锁死；形态 = Oklab 真渲染色板 + outfit/decor 双场景 + print 色卡（工具型对冲 AIO）；与 make 页互链不蚕食 |
| **V2.2 立项（9/25 实测，👤 裁决移入）** | **拼豆上色族** perler bead patterns（9 词主族，**✅ 51 页上线 9/25**） | **合计 ≈30.4K**/KD14~35【实测 9/25】：patterns **14.8K**/KD35 · ideas **9.9K**/KD20 · fuse 1.6K/KD24 · melty 1.6K/KD27 · easy 1.3K/KD25 · templates 720 · christmas 590/KD21 · animals 590/KD29 · halloween 480/KD14 · food 390/KD31 | /perler-bead-patterns/ hub + easy/animals/food/christmas 4 页（halloween → hub 小节）；pony bead 6.6K 第二批；perler beads 40.5K 导航词/KD41 弃 | SERP 软【实勘 9/25】：Pinterest #1 + 小博客群，原创图纸供给薄；「选模板→区域换色→打印」形态无在位者；**IP 红线：全原创像素图零版权角色**；调研档 [research/fuse-bead-patterns.md](../../research/fuse-bead-patterns.md) |

**AI 截流分级（2026-09-06 立 · 9/24 修订）**：what colors make X 族 = **答案型**（AI Overview 一句答完，点击截流风险最高）—— ~~已建 9 页躺页龄，不加码~~ **（9/24 推翻：blue/red/black 三头 55.1K 实测 + ColorKit 工具站头名先例，按 10K 定标扩容，页面强制带 Oklab 现算 swatch + mixer 嵌入做工具型对冲）**；/mix/ 矩阵 = 半答案型，意图偏"看表对照"，风险居中；工具页（mixer / converter / V2.3 生成器族）= **交互型，AI 替代不了**，词池重心逐波移向这里。实锤指标：曝光涨 + 排名进 top 10 + 点击仍零 → 确认截流，加速移仓。

## 3. 接下来要做（优先级排序）

| # | 任务 | 谁 | 验收标准 | 期限 |
|---|---|---|---|---|
| 1 | ~~Request indexing 9 个新 URL（W1+W2，清单原见下方代码块）~~ **✅ 完成 2026-09-09**（当日补齐剩 3 条色卡/hub，明细见时间线） | 👤 | GSC 逐个显示"已请求" | 2026-09-06 |
| 2 | ~~外链：Peerlist Launchpad + AlternativeTo~~ **✅ 完成 2026-09-07**（Peerlist 项目卡上线 + AlternativeTo 已提交、审核期数周 —— 详见时间线与 [DISTRIBUTION.md](./DISTRIBUTION.md)） | 👤 | 两个平台提交成功 | 2026-09-07 |
| 3 | ~~GSC 首查：效果→查询（28 天），看 W1/W2 词有没有曝光（拉数加筛选国家/地区=美国）~~ **✅ 完成 2026-09-10**：头词首查 brown 1 / purple 2 / green 1 / orange 0 = 噪音级冒头（明细见时间线）；累计 650 确认全为自操作污染 → 真实曝光 ≈0，按规则等 1 周（下查 9/17） | 👤+Claude | 截图记录，更新本文档 §2 状态 | 2026-09-10 |
| 4 | **V2.2 第二批配色对（+20~30 页）**：colors.ts 扩色 → mixes.ts 配对 → 全自动出页。**筛选规则**：候选色池 gray/cyan/magenta/gold/navy/turquoise/lavender/beige/silver/maroon/teal/coral，启动时逐对拉 AITDK/Ahrefs 数据，**只保留 搜索量≥500/月 + SERP 前 10 无 DR60+ 巨头** 的配对，凑满 24~30 对收工。**gold 3,600 / teal 1,900 已实测过筛（2026-09-07），color mixing chart 总表页（6,600/KD27）进首批** | Claude | 61~71 页，`_redirects` 重新生成，测试全绿 | 启动条件见 §6 |
| 5 | W3 木器染色 2 页（coffee wood stain 等，已锁定未建） | Claude | 2 页上线 | 跟 V2.2 同批或下批 |
| 6 | per-page OG 图：场景页用引擎生成对应色卡图（替代全站共用卡） | Claude | 场景页 og:image 唯一 | 2026-09 下旬 |
| 7 | V2.3 工具页：互补色/对比色生成器（`contrastRatio` 引擎已有） | Claude | 1 页 + WCAG 检查 | 2026-10 |
| 8 | **V2.2 内容扩容两族（9/24 立项）**：① make-X 头词 6 页（blue/red/black/maroon/peach/turquoise —— scenarios.ts 加条 + 薄 wrapper；blue/red 走"原色陷阱"文案角度：真做不出来 + shade/近似路线表）—— 仍等 10-01 门 ② ~~穿搭配色族首批 4 页~~ **✅ 9/24 用户指令提前上线**（brown/green/purple/burgundy，main `4e9aa06`，形态与计算层见时间线 9/24 第二行；112 测试全绿） | Claude | ① 6 页上线 + 测试全绿 + `npm run og` 重生成（scenarios 加条后 OG 快照同步） | ① 10-01 门通过后启动；② 已完成 |
| 9 | ~~拼豆上色族~~ **✅ 完成 2026-09-25**（超额：5 页 → hub+4 画廊+46 图纸详情页=51 页，96 页站 128 测试绿，两轮视觉 QA 31 修，👤 验收通过当日上线；原始设计）**：/perler-bead-patterns/ hub（patterns 14.8K + ideas 9.9K，吸收 fuse/melty/templates 变体）+ /easy-perler-bead-patterns/（1.3K）+ /perler-bead-animals/（590）+ /perler-bead-food/（390）+ /christmas-perler-bead-patterns/（590，12 月提前窗充足）；每页多张**原创像素图纸**（IP 红线：零受版权角色，动物/食物/节日/emoji 风）+ 区域换色 island（OutfitFigure 同款 data-part 机制，图纸区域→珠色）+ print 可打印（引入 .printable 模式）；halloween 图纸 = hub 内小节不单独建页；pony bead 6.6K 第二批（编织形态不同）；词证据 §2 拼豆行 + 调研档 | Claude | 5 页 build + 测试绿 + print 验证 + 图纸全原创无 IP | **2026-10-15 前**（早于 chartglade 10/25 车，避双站同周合并） |

**9/6 调研批四词已拉量落位（2026-09-07，量 = 用户 AITDK【实测】，SERP = Claude 复勘【实勘】）**：

| 词 | 量 / KD | SERP 复勘（09-07） | 落位 |
|---|---|---|---|
| color mixing chart | 6.6K / 27 | 软，同 9/5：Visual Arts Passage、MyModernMet、Pinterest、YouTube、Daniel Smith | **≥2K 规则触发 → /color-mixing-chart/ 进 V2.2 首批**（引擎现算全部色值 + print CSS，打通 /mix/ ↔ color-guides 内链） |
| what colors make gold | 3.6K / 33 | J Fisher、EttaVee、Quora/TikTok UGC，无巨头 | 过双门槛 → gold（yellow+brown）配对进扩色池 |
| what colors make teal | 1.9K / 33 | trycolors、Facebook 群组、小博客 | 过双门槛 → teal（blue+green）配对进扩色池 |
| acrylic color mixing chart | 390 / 24 | Golden Artist Colors + Liquitex 颜料厂在列 | <500 不单独建页；chart 页 acrylic 段覆盖 |

开建时点不变：等 §6 的 10-01 决策点（/mix/ 有词进 top 30 → 启动 V2.2），不破「在此之前不加页」纪律。

## 4. 每日 / 每周例行

**每日（≤10 分钟，两站共用，chartglade 见其 PLAN.md）**：

- [ ] GSC → 效果：有没有新冒头的查询词（2 分钟，**界面怎么点见根 README「每周数据检查 SOP」**）
- [ ] Cloudflare → Web Analytics：访问曲线异常否（1 分钟）
- [ ] 新词/异动随手记到本文档 §2 表格（不展开分析）
- [ ] **禁令（2026-09-06 立）**：不手动 google 搜自己的站看排名 —— 自搜/自点污染 GSC（day2 基线 2 点击/29 曝光疑全是自己的），且国内直连非美区 SERP。看收录用 GSC「索引」报告，看排名等周一例行

**每周（~30 分钟）**：

- [ ] 周一：GSC 索引数（0→N 页）+ 效果 28 天环比，记入本文档
- [ ] 周一：DDG `site:tintbrew.com` 复核 Bing 系收录（IndexNow 2026-09-15 推 40 URL 后新增；走代理美区口径）
- [ ] 周三：1 个外链/分发动作（目录站、Reddit r/DIY r/painting、Pinterest 图钉）—— 提交文案抄根 README「外链提交文案」节；目录站清单 Peerlist → AlternativeTo（Uneed 已提交）
- [ ] 周五：批次决策 —— 看数据定下周上不上 V2.2（对照 §6 条件）

## 5. 远期规划（V2.x 全景）

1. **V2.2** 扩色矩阵 +20~30 页（架构零改动，纯数据）
2. **V2.3** 工具页五件（9/18 竞扫重排，前两件新增，详见 [BENCHMARKS.md](./BENCHMARKS.md)）：**反向配色计算器（目标色→基色比例配方，trycolors 拆解产出，首位）**、mixer 多色升级（3~5 色+数量权重，colordesigner 产出）、互补色生成器（顺手）、图片取色/调色板导出（流量入口）、Oklab 渐变生成器（差异化）
3. **V2.4** 分发：每批次上线 → 提交一轮目录站；Product Hunt 正式发布（外链权重最高，单独准备）；Pinterest 场景图分发（第二流量引擎）
4. **变现**：~300 访问/天 → 接广告网络（AdSense/Ezoic 评估）
5. **重启候选**：穿搭配色词（what colors go with X）——V2.1 见效后先拉 6 个代表词数据再定
6. **季节窗（美国日历，准则见根 [CLAUDE.md](../../CLAUDE.md)）**：万圣节 frosting/icing 搜索 **10 月**起脉冲 —— 页面 9 月已在位，只欠分发：**10 月第 1 周把 /how-to-make-black-frosting/ + /icing-color-chart/ 的色卡 pin 发一轮**（[DISTRIBUTION.md](./DISTRIBUTION.md) §3 流程），Reddit 烘焙角度帖同周跟上

## 6. 决策点（数据说话，到点执行）

| 时间 | 看什么 | 条件 → 动作 |
|---|---|---|
| 2026-09-10 | GSC W1/W2 词曝光 | 有曝光 → 正常推进；零曝光 → 再等 1 周（页龄 <2 周不算数） |
| 2026-10-01（W1 上线 4 周） | /mix/ 矩阵词排名 | 有词进 top 30 → **启动 V2.2 加码 30 页**；全部 50 名外 → 暂停批次，转外链强度（PH 发布提前） |
| 2026-11-01 | 28 天曝光总量 | 环比 2 倍增长 → 按节奏走；停滞 → 复盘内容质量/ cannibalization |
| **2027-01-31（止损线）** | 28 天曝光 + 矩阵/场景词排名 | 曝光 <5K **且** 零词 top 30 → **止损**：停新增投入，站保留，主力转下一站；任一达标 → 继续，按实测重定阶梯 |
| 随时 | 访问量 | 稳定 ~300/天 → 启动变现接入 |

## 7. 技术备忘（改动前必读）

- mixes.ts 加配色后**必须重新生成 `public/_redirects`**（反向 slug 301）
- 改 mixes.ts / colors.ts / scenarios.ts 后**必须 `npm run og` 重生成 OG 图**（`scripts/og-data.mjs` 快照要同步手改，`src/lib/og.test.ts` 漂移测试会拦）；**mix 页文件名 = 数据顺序 `a-b`**，不是 mixSlug 排序名
- 引擎基准：红+蓝 50/50 = `#8c53a2`（回归测试锚点）
- **outfit 页 island 纪律**：客户端换色脚本只许 import `lib/pairingRead.ts`（纯函数）——import `outfitContent.ts` 会把 outfitPalettes 全量数据拖进浏览器包；两端输出一致性由 outfitContent.test.ts 的 parity 测试锁死
- DOM 测试要加载真实 `dist/` + `vi.resetModules()`
- CF Web Analytics = **手动 token 模式**（consts.ts `cfBeaconToken`，2026-09-20 起 —— 自动注入对本站从未生效，详见当日时间线）；dashboard 勿再开 Automatic Setup（双计数）；线上体检直接 curl 查 token 即可（构建时嵌入，无需真浏览器）
- GA4 在 BaseLayout `<head>` 直出（ID 在 consts.ts `gaMeasurementId`，与 CF beacon 同款"空值不渲染"守卫）；/privacy/ 已披露 GA cookie —— 若未来加广告脚本需再改隐私页 |
