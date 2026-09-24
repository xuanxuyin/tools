# chartglade 作战文档

> 本项目唯一计划文档 · 更新 2026-09-11 · 部署/运维细节见仓库根 [README.md](../../README.md)
> 原则：本文档没写的 = 没计划；做完的立刻勾掉并写日期。

## 0. 北极星

**GSC 28 天曝光数（impressions）环比增长**。变现节点：自然流量稳定 ~300 访问/天 → 接广告（当前零广告代码）。

一句话现状：**上线当天（2026-09-05）完成全部上线动作并扩容到 53 页**（27 基础页 + cursive 单字母矩阵 26 页），9/9 变体段加码后 23 测试全绿，sitemap 53 条已提交（9/5 首提时 26 条被发现），**实际编入 ~5 条**（9/9 site: 实查）；9/8 GSC 官方邮件确认曝光数据 **9/5 起已在收集**（部分查询已展示本站页）；9/9 首查累计曝光 **13**【实测 GSC】（疑似多为自操作查询，噪音级，9/12 §3 #4 复查时一并看查询明细）—— 进入「等曝光冒头」阶段。上线时点正落在美国**开学使用高峰**（8 月中~10 月，老师全年搜打印件最凶的窗口）—— 不是错过开学季，是正在其中。

### 目标阶梯（三档情景，2026-09-05 按基率校准 —— 不是预测承诺）

> **先认基率**：printables 赛道同样多数新站一年无声无息。~~单字母族搜索量还没实测~~ **已实测（2026-09-06）：6 裸词均值 ~33K/月 = 阈值 33 倍，论点成立档（§2 落位）**。下表 = "论点成立时的路径"；**真正管用的是三档判定 + 止损线**，到点落哪档执行 §6 对应动作。

| 时点 | 悲观（多数站的命） | 基准（论点成立） | 乐观 |
|---|---|---|---|
| 1 个月（10/05） | 曝光 <100，访问 ~0 | 200~800/月，0.5~3/天；字母词摸进 30~50 名 | 1,500+，5/天 |
| 6 周（10/17） | 长尾全 50 外 → **§6 大决策点**：转 B 计划 | 零星词 top 30 → 加码矩阵 | 词族成规模进 top 30 |
| 3 个月（12/05） | 停滞 <1K | 1K~8K，5~30/天；单字母族 ≥10 词 top 30 | 10K，60/天 |
| 6 个月（2027/03） | 停滞 | 5K~25K，30~150/天；季节页（万圣/圣诞）脉冲验证 | 40K，250/天；cursive-alphabet 主页摸 top 20 |

**止损线**：**2027-01-31 复盘**，28 天曝光 <3K **且** 单字母族零词进 top 30 → 停止新增投入（站保留零成本），主力转下一站；在此之前不加页、不花钱。

> 与 tintbrew 的差别：词池更大（基础 251K + 单字母族实测 12 词 219K）但 SERP 更硬（教育站在位）；起量更依赖矩阵页数与季节脉冲；变现线同 300 访问/天。

## 1. 已完成（时间线）

| 日期 | 里程碑 |
|---|---|
| 2026-09-05 | KD 调研定型：4 支柱 251K/月词池（档在 `../research/cheat-sheet-data.md`） |
| 2026-09-05 | **上线** chartglade.com：27 页，CF Pages（项目真名 `tools-6hx`），主域 200 / www 301 |
| 2026-09-05 | GSC：Domain 属性验证 + meta 上线 + sitemap 提交（当天 26 条全部进索引管道） |
| 2026-09-05 | Email Routing：hello@chartglade.com 转发可用 |
| 2026-09-05 | **OG 品牌卡**全站接入（`scripts/generate-og.mjs`，`npm run og` 重生成） |
| 2026-09-05 | **cursive 单字母矩阵 26 页上线**（/cursive/a/~/z/，SERP 实勘名词型词可打）→ 53 页 |
| 2026-09-05 | **美国日历准则**入库（根 CLAUDE.md）+ 本文档 §5.1 美国教育内容日历（修正"开学季已过"误判：8 月中开学，9 月正在高峰）；文档迁入 `docs/chartglade/` |
| 2026-09-05 | **目标阶梯按基率校准**（用户质疑"太理想"成立）：改三档情景表 + 认基率 + **2027-01-31 止损线** |
| 2026-09-05 | **单字母族 SERP 实勘 4 词**（名词型全弱✅ / worksheet 型硬❌）；AITDK 量补测词表 + 判定规则入 §3 #7；**关键词验证纪律**入根 CLAUDE.md（brown 漏词教训：最大词是用户找到的） |
| 2026-09-05 | 短词补充实勘：`multiplication chart` 裸词 US SERP 硬（①Mometrix ②Dad's Worksheets ③Suncatcher ④Good&Beautiful ⑤Math Salamanders + Twinkl 在位）→ 头部词维持页龄策略，不加码；`cursive alphabet` 自动探针返回非美区结果（剑桥词典+翻译站）**作废**，以 2026-09-04 人工 US 实勘（软）为准 |
| 2026-09-06 | **generator 家族判定完成**（8 词 SERP 实勘 + 11 词 AITDK 实测，起源"要不要绑 generator"）：核心发现 **generator 是功能不是关键词** —— printable graph paper 12.1K/KD30 vs graph paper generator 390/KD38（17 倍量差 + 更低 KD）。graph paper 簇 + name tracing generator 进 V1.6（§3 #8/#9）；word search maker 弃（27.1K 但 KD72，Canva/Education.com/Discovery 实勘在位）；cursive / multiplication worksheet generator 降长尾 island；sight word worksheet generator 暂缓（90/月）。新增词池 ≈16K/月 |
| 2026-09-06 | **手动搜站禁令**入 §4（tintbrew day2 基线 2 点击/29 曝光疑全是自搜：污染 GSC + 国内直连非美区 SERP）；**AI 截流分级**入根 CLAUDE.md —— 本站整站打印/工具型 = AI 吃不掉，是护城河不是风险 |
| 2026-09-06 | **高中学科公式赛道判定**（用户质疑"只做 a-z 和乘法表太简单"触发，5 词 SERP 实勘 + 8 词 AITDK 实测）：数学家族 ≈4.5K/月进 **V1.7 候选**（geometry formula sheet 2.9K/KD23 三样齐全✅ + algebra 三变体并页 1.66K/KD13~19）；physics 4.4K 但 #1 College Board 官方 PDF（量过线 KD 过线 SERP 不过线的活例子）❌、chemistry 官方垄断❌。结构性结论：高中公式表 = 残余需求（老师发+官方配发表替代了主路径），8 词合计 12.4K ≈ K-5 词池的 1/20 —— "简单内容"市场反而大 |
| 2026-09-06 | **收录基线：GSC 26/51（day 1）**，恰好 = 9/5 首批进管道数；本地 dist sitemap 自查 51 条 URL 含全部 26 个 /cursive/ 字母页 —— 排除 sitemap 缺页事故，剩余 ~25 页正常分批爬。预期 9/12 复查 45+、9/19 近全量。Request indexing 5 URL 已完成（用户）；批次日历定稿：**10/05 批 = 万圣节 + V1.6（graph paper 簇 + name tracing）**、**10/25 批 = 感恩节 + V1.7（数学公式表 2 页）** |
| 2026-09-06 | **大学论文模板提案评估否决**（用户提议"加论文模板"，4 词 SERP 实勘）：APA/MLA = Purdue OWL + Microsoft 官方 + Scribbr 权威锁死；research outline = .edu libguides 垄断；且三重结构性否决——意图错位（大学生要 docx 不打印，打印工程差异化解不了）、AI 截流正中（essay outline 答案型 × ChatGPT 采用率最高人群，根本不搜了）、主题稀释（K-5 教师站装不下大学生内容）。真缝隙 = K-12 outline worksheet / graphic organizer（TPT #3 / Pinterest #4 软信号，教师打印意图）→ 入远期候选池；"大学生高价值人群"归第三站候选（§5.6），10/17 后议 |
| 2026-09-06 | **sign in sheet 族判定 → V1.8 成立**（起源：用户发现 Edusign 签到 SaaS 流量大，实勘+Serp+10 词实测）：**教师场景族 ≈10.7K/月，4~5 页，KD 4~31**——open house 3.6K/KD20 头名 + template/printable 6.7K 通用页（教师角度）+ PT conference 390/KD12 + field trip/volunteer 变体接住；SERP 混合可打（eForms #1、Spreadsheet123、InkPx、Visit-Us 四个独立站在排）。habit tracker printable **双杀不进**（2.4K<5K 未过线 + 成人人群漂出教师主题）；**主题聚焦护栏**立入根 CLAUDE.md（人群+场景判"杂"，孤岛页禁令）；对标站 InkPx / Printabulls 待拆解。Edusign 本体不学（B2B SaaS + FERPA/COPPA，非我们打法），它证实痛点存在，纸质长尾归我们 |
| 2026-09-06 | **单字母族量补测提前完成（原 9/8 任务）→ 论点成立，矩阵转正**：6 裸词均值 **33,033/月**（门槛 1K 的 **33 倍**），f 60.5K / z 40.5K / a 33.1K / b 27.1K / k 27.1K / x 9.9K，KD 15~35；capital 变体 3 词 17.6K（capital i 8.1K/KD25、capital f 6.6K/KD31、capital b 2.9K/KD27）；cursive chart 2.4K/KD21 → 主页措辞接住。**词池重估 251K → 500K 级**。触发加码 §3 #13（capital 变体段并入 10/05 批）；维持弃：worksheet 型（cursive f worksheet 210，SERP 实勘大厂垄断优先于 KD22）、a to z（KD43）。10/17 字母族验收概率上移，阶梯数字不动 |
| 2026-09-07 | **V1.6 + #13 预开发完成（分支 `v1.6-predev`，不推 main——推 main 即自动部署，会破坏 10/05 批次门）**：graph paper 簇 7 页（/graph-paper/ hub + 1/4″、1/2″、1cm、5mm、dot、iso 六变体 + hub 上自定义 island，几何引擎 `lib/graphPaper.ts` 以 1/100in 单位画 SVG，打印物理尺寸精确）+ /name-tracing/ 交互页（SSR 默认 Emma 无 JS 可打印，print/cursive 双字体：Patrick Hand 新自托管 woff2）+ 26 字母页 capital 变体措辞（#13）+ cursive hub 面包屑改 "Cursive & Handwriting" + Header/Footer 第 4 栏。**61 页，47 测试全绿，sitemap 60 条含全部 8 个新 URL**。合并 main = 9/19 检查点过门后、与万圣节页同批（10/05 前） |
| 2026-09-07 | **美国口算/计算题卡赛道判定（用户问"100以内混合加减/两位数乘除需求大吗"触发，5 词 SERP 实勘）**：需求真实且制度化（mad minute = 全美课堂计时口算，Common Core 2.NBT.B.5/4.NBT.B.5 原文），**但静态 worksheets 词 SERP 全锁死**（4 词前 5 = K5/Math-Drills/Math-Aids/SuperTeacher/CommonCoreSheets/TPT，同 KD48 禁区守门员）——与国内"题卡生态弱家长狂搜"相反，美国免费题库站在位 20 年。唯一缝隙：`mad minute math printable` #1 = webmathminute 独立小 generator 站 → **题卡生成器 island 打法**进赌注批次（§2，量 9/7 批 AITDK 补，判定规则已挂） |
| 2026-09-07 | **口算赛道判定落位（12 词实测回填，long division 补勘共 6 词实勘）**：worksheets 静态词 9K+ 量全判死（long division 6.6K/KD35 补勘 = K5 #1+HomeschoolMath+Math-Drills+Dad's+Math-Aids；**2-digit mult worksheets 1.9K/KD18 = KD 过线 SERP 不过线第 2 实例**）；math worksheet generator 1.3K/KD46 弃（>35 线+商务意图）；**数学练习 island 成立**（§3 #14，池合计 ≈1,670/月过 generator 族线，排 10/25 批）；mad minute 主词 480 差 4% 到 500 线按家族合计放行进 island 池不独立建页 |
| 2026-09-07 | **周一例行（首次，数字全部【实测】GSC）**：GSC 编入 26 / 页面报告 30 条（重定向 1 = 尾斜杠/www 规范化，正常勿动；已抓取未索引 3 = 新站分批爬常态）—— 与 9/6 基线 26/51 持平，day 3 在轨道（锚 = 9/12 复查 45+、9/19 近全量）；效果报告暂无数据（<1 周，正常）。**site: 修正归因**：用户 site: 查询走美区外网（非国内直连），chartglade 仅回 3 条 = site: 对新站显示滞后/抽样，**周一判定一律以 GSC 为准，site: 只当粗信号**（tintbrew 侧同日确认"约 N 条"是估算值） |
| 2026-09-07 | **分发文案包两件交付**（任务 #2/#3 Claude 侧清零）：26 字母 pin 文案全表入 DISTRIBUTION.md §1.4（钩子句逐条取自每页 "#1 mistake" 实文 = pin 与落地页首屏一致）；目录站三家（Uneed/Peerlist/AlternativeTo）提交字段对照 + AlternativeTo 一句话文案补入 §2，剩用户侧提交 |
| 2026-09-07 | **移动端响应式热修上线（main 直推，用户拍板）**：用户手机实测反馈"不适配"触发 —— 审计发现全站 **0 个屏幕断点**（唯一 @media 是 print），13 列乘法表/位值表/双栏 stroke-steps 靠横向滚动硬撑。加 ≤40rem 断点（表格缩字号压到 ~25px/列、stroke-steps 单栏、大字形缩小、头部收紧），cherry-pick 热修推 main 即时部署。**纯 CSS 零加页，不破 10/05 批纪律**；动机 = Google mobile-first 索引正在评估手机版 + Pinterest 流量 9 成手机。v1.6-predev 已 merge main 同步 |
| 2026-09-07 | **cursive 26 字母页 canonical 事故热修上线（main 直推 `3bc1efd`）**：用户 GSC 收录数疑问触发线上全面体检——发现 /cursive/a/~/z/ 的 canonical/og:url/面包屑 JSON-LD **全指向不存在的 /a/ 类 404 URL**【实勘 curl】，根因 = ChartPage 拼 `/${def.slug}` 而字母页真实路径是 /cursive/<slug>/（sitemap 一直正确，页面自声明错 = 半个站告诉 Google"我的规范地址是死链"）。修法：PageDef 增可选 `path` 覆盖位 + ChartPage 统一取 `pagePath` + [letter].astro 注入 `/cursive/${slug}`。47 测试绿，dist 抽查 a/z 自指，部署后线上实测自指✅。**归因【推断】**：收录停在 26/51 且两日走平（9/6→9/7），26 恰≈非字母页数——字母页被 canonical 指死链压在管道外是最大嫌疑。**后果修正**：9/12 复查 45+ 预期作废（bug 影响窗口 09-05~09-07），9/19 收录门判定计入此事故；用户侧补 request indexing 26 页加速重抓（TASKS 9/8） |
| 2026-09-08 | GSC 官方邮件确认：**9/5 起已开始收集搜索曝光数据**（网页已在部分查询中展示）—— 上线→被展示链路走通，效果报告开始积累数据；邮件本身不带数字，有价值的是效果报告里冒出的查询词（每日例行盯） |
| 2026-09-08 | Request indexing 5 个 URL 全部完成（用户 GSC 操作）；**Pinterest 全量 30 条 pin 文案包**落盘 [PINTEREST-PINS.md](./PINTEREST-PINS.md)（26 字母逐字母钩子，基于 cursiveLetters.ts 真实内容非模板；7 周排期，AITDK 量落地后按量重排）；DISTRIBUTION.md §2.1 目录站文案升级为逐平台表单级（Uneed / Peerlist launch 帖 / AlternativeTo 三竞品位一句话）—— 只剩 👤 提交动作 |
| 2026-09-08 | **GSC"0 已编入索引"排查（用户报告触发，site: 仅 4 条）**：线上体检全绿【实勘 curl】—— 主域 200 / www 301 / robots Googlebot 放行（CF 托管段只封 AI 爬虫，Google-Extended ≠ Googlebot 不影响搜索索引）/ sitemap 52 条含全部字母页 / 首页 + /cursive/a/ + /cursive/z/ + /cursive-alphabet/ canonical 全自指 / 旧死链 /a/ 维持 404。**判定：技术侧不存在任何可致全站掉索引的因子**，"0"最大嫌疑 = 9/7 同款切片读数坑 + 索引报告 1~2 天数据延迟；site: 3→4 条 = 滞后粗信号微涨非下跌。**已实锤【实测 9/8】：URL 检查工具抽查首页 / /cursive-alphabet/ / /place-value-chart/ 三条全部"网页已编入索引" → 报告读到的"0"确认为切片读数坑/数据延迟，非真实掉索引**；9/12 复查照旧走 sitemap 视图。收录慢的结构性原因之一 = 零外链（Pinterest/目录站均未落地），本周分发任务同时是收录加速器。**request indexing 当日启动，配额提前耗尽，余量 9/9 起从断点接续**（配额 PT 午夜重置 ≈ 北京 15:00，不影响 9/12 复查判定——复查看爬取恢复趋势，不要求全量提交完）。**CF Analytics 首基线【实测 9/8】：visits 42 / page views 57 / load 678ms —— 搜索/外链/社媒渠道全部为 0 的阶段，42 大概率=自访计数（同 tintbrew 自搜教训），非用户信号；678ms 为真实健康技术指标；后续真实流量以 GSC 曝光先行，CF 曲线用于对减此基线** |
| 2026-09-09 | 竞品页实勘（用户担心 K5 体量触发）：K5 letter-f 页 = 正文一句话 + 5 个 PDF 下载链接 + 会员墙（2019 年页龄），零"怎么写"答案内容 → worksheet 下载意图我们不打（原判不变）、名词答案意图 K5 不认真服务（主攻不变）；与量实测互相印证：池是真的 + 缝隙是真的 |
| 2026-09-09 | GSC 曝光首记：累计 **13**【实测 GSC，上线以来】—— 量级噪音级且疑含自操作查询；查排名纪律同 tintbrew：只用 GSC 查询报告，不手动 Google 搜词 |
| 2026-09-09 | **字母页变体段上线（§3 #13 同任务，commit `3cbf225`，main 直推）**：26 字母页各增 "Capital X in cursive" 深读段（每字母 2 段手写非模板）+ 大写专属 FAQ；/cursive-alphabet/ 增 chart↔字母页接客段 + 2 FAQ + /cursive/f/ 内链；实现走 PageDef 可选 `extraSection`（模板通用，打印输出零影响——`@media print` 不打 .prose）；53 页 build + **23 测试绿**（含新增变体段断言测试），push 自动部署 CF Pages。**注：与 v1.6-predev 的 #13 措辞改动同源不同实现，两分支合并时需去重核对** |
| 2026-09-09 | GSC 索引报告疑问（用户报）：已编入 **0** / 未编入 **4** —— 与效果报告矛盾（9/5 起有曝光 = 有页面实际在 Google 服务中）。判定：**索引覆盖报告快照滞后**（新站 4 天常见，报告顶部"上次更新"可证）+ 本地源码核查排除技术原因（仅 404 noindex，canonical 全站规范）。以单条网址检查 + site: 为准，9/12 §3 #4 对数（9/8 已用 URL 检查实锤切片读数坑，见上） |
| 2026-09-09 | 目录站三渠道提交完成（用户操作）：Uneed + Peerlist + AlternativeTo，全部进入审核期（AlternativeTo 审核数周常态；其中 AlternativeTo 含 9/8 已做的双向挂竞品）—— 两站外链均从 0 → 3 提交在途。**【9/17 更正】Peerlist launch 实测卡付费 "Verify Identity" 门（免费 workplace 验证不解锁）→ launch 搁置不买；外链格局 = Uneed + AlternativeTo 在途 + Peerlist 项目卡** |
| 2026-09-09 | **site: 实查 = 5 条**【实勘 用户查】—— 高度疑 = 9/8 手动请求的 5 条优先编入（哪 5 条待确认）；其余 ~48 页处「已发现/已抓取-未编入」= DR0 新站第 4 天常态，非故障。加速手段：每日 request indexing 配额 ~10 条，按量优先请求 z(40.5K)/b(27.1K)/k(27.1K)/x(9.9K) 等高量字母页；根本解仍是页龄 + 外链。9/12 §3 #4、9/19 §6 节点看趋势 |
| 2026-09-09 | GSC 未编入 4 条原因明细【实勘 用户查】：自动重定向 **1**（= www/http 变体 301 归主域，设计内不用动）+ 已抓取-尚未编入索引 **3**（Google 已爬未收 = 新站信任门；列表无 noindex/重复/服务器错误类）→ **无技术故障**。3 条 URL 明细新 UI 暂不可见（数据滞后），不阻塞：明日请求批次按量选页顺带覆盖 |
| 2026-09-09 | **计算机打印件方向实勘（用户问"要不要跟 K5 扩科目"触发）**：①`computer shortcuts for kids classroom poster` **硬 ❌**——TPT×2 + Twinkl + Amazon 占位（教师 poster 是教育市场主场，同 worksheet 禁区逻辑）；②`keyboard shortcuts chart printable` **软 ✅**——前 10 = 大学随机 PDF / 内华达 DMV 挂的 PDF / Pinterest×2 / Wikipedia / Etsy，零专业 printables 站 → 判定：**chartglade 不扩计算机科目**（主题聚焦 + 课堂词被占），软的成人/通用图表词**并入第三站候选**（§5.6 第二曲线，high CPC），10/17 chartglade 验收后再评估 |
| 2026-09-09 | Request indexing 第二批 9 条完成（用户 GSC 操作，原定 9/10 提前当日完成）→ **累计已请求 14/53**（9/8 首批 5 + 本批 9；已请求字母页 f/a/z/b/k/x/i = 实测高量 7 词全覆盖）。若明日配额闲置，余下字母页 g/h/l 等可续批；9/12 §3 #4 对数 |
| 2026-09-09 | 用户再报「CF Analytics 空 + GSC 0 已编入」→ 双查均判**非故障**：① **beacon 注入实测正常**【实勘 curl：带浏览器 UA + Accept: text/html 头请求线上首页，cloudflareinsights 脚本在响应 HTML 里；裸 curl 头被 CF 自动注入跳过——**线上体检必带浏览器头，否则误判 beacon 掉线**（方法论坑，记档）】；CF 数据管道通（9/8 基线 42 visits 在档），面板空 = 时间切片当天无访问（新站真实状态）或看错站点。② GSC 0 = 索引报告快照滞后（9/8 URL 检查抽查 3 条全过实锤 + site: 5 条在涨 + 效果报告 9/5 起收曝光），维持以 URL 检查/site: 为准、9/12 §3 #4 对数，无需任何修复 |
| 2026-09-11 | 用户报 **site: 38 (9/10) → 25 (9/11)**，全站体检判**非故障**【实勘 curl 权威 NS+CF IP】：首页/cursive 页 200 / robots 200（Sitemap 指向 sitemap-index.xml，200，52 条）/ 非尾斜杠 308→尾斜杠 / www 301→裸域 —— **无任何可致掉索引的技术因子**（重复版本被合并的空间也已排除）。site: 完整轨迹 4 (9/8) → 5 (9/9) → 38 (9/10) → 25 (9/11) = 新站试探期采样波动的标准形状：`site:` 条数是 Google 采样估计值非精确计数，DR0 新域头 2~4 周上蹿下跳属常态。**权威判定源 = GSC 索引覆盖报告的 Indexed 数（不受采样影响）+ 单条 URL 检查**；警惕阈值 = GSC Indexed 数同步下跌且 Crawled-not-indexed/Duplicate 变多（现无此象）。9/12 §3 #4 对数照旧 |
| 2026-09-11 | **视力表词族实测落位（👤 晚 AITDK 7 词 + 裸词 SERP 补勘 2 词）**：合计 24.8K/月【实测】（eye exam chart 14.8K/KD57 + snellen eye chart 8.1K/KD65 + printable eye chart 1.3K/KD40 + tumbling e chart 480/KD24 + 长尾）—— 量过 5K 判定线 5 倍但主力词 KD 全超 35，预设三档套不上；裸词补勘【实勘】：snellen / eye exam 两词 top3 均为裸 PDF（HVES #1 ×2）+ 地方诊所博客/小非营利（Cincinnati Vision Group、Safe Eyes America）在排，权威（AAO/Wikipedia/Cleveland Clinic）在场未锁死前三 = 混合 SERP 非禁区。**判定：规则外第四情态 → 折中 2 页小簇**（§2 落位 + §3 #15）：可打意图 ≈1.9K、裸词 22.9K 当页龄期权（同 cursive alphabet 201K 先例：磨页龄不进 6 周验收），11 月批 V1.8 同期 |
| 2026-09-11 | **视力/色盲在线测试赛道判定（用户问"在线测视力/色盲需求"触发，3 组 SERP 实勘）**：**色盲卡不进本站**双杀——① 打印色准硬伤：Ishihara 有效性 100% 依赖色相/饱和度精度，家用打印机未校准即失效（SERP 自标 "official printed book recommended"），YMYL 下给用户无效筛查结果比没有更糟（视力表黑白字母无此问题，此为两类内容本质分界）；② 人群漂移：色盲主力人群 = 成年自查 + 职业体检备考者（FAA 2025-01 新规只认计算机化色觉测试 = 新练习需求缝隙），非教师/家长，且美国学校常规查视力**不查色觉** → 在线交互色盲测试 + FAA 练习词归第三站候选池（§5.6）。**视力表打印件（printable eye chart 族）护栏三问全过**：人群 = 家长/学校护士 K-5 筛查 = 本站核心人群 ✅；场景 = 打印挂墙使用，同现有打印件 ✅；可自建 Vision Screening 小 hub 收口 ✅。【实勘 9/11】`printable eye chart` SERP = 眼科诊所裸 PDF（Coastal Eye Group 等）+ 医疗信息站附下载（Vision Source / All About Vision / AAO），**零 printables 垂直站认真占位且页面 SEO 糙**；tumbling E 侧证 = Printablee 在排 + Etsy 付费 bundle 在卖（形态可排 + 变现先例）。**7 词未实测 → 赌注批次入 §2，👤 9/11 晚 AITDK 补测，判定规则已挂** |
| 2026-09-11 | **Pinterest 域名认领完成**（用户操作 + Claude 部署）：token `9e2c0ccd...` 接入 `consts.ts` + `SeoHead.astro`（同 GSC 模式，main `71774cc` 全站 head），CF Pages 部署后用户 Verify 一次过。**两个入档坑**：① 认领入口改名 —— 新 UI 左侧导航叫 **「Link to Pinterest」**，旧名 Claimed accounts 的直达 URL `/settings/claimed-accounts` 已死（跳 `?show_error=true` 实测）；用户首次 Verify 报 "No relevant meta tag found" = 标签未部署前的预期报错，非故障。② **Pinterest tag（广告转化像素）不装** —— 纯自然流量零广告投放，装了白加第三方脚本。**后续实测（同日）：认领生效（Websites 列表确认）+ 3 board 建好后，发链接 pin 仍被 spam 拦** —— 判定：拦截器与认领状态是两套系统，缓存未同步（认领生效 <1h）；处置 = 当日停止尝试（防新号负信号积累），9/12 发 1 条测试，仍拦则按 §1.1 预案等 1~2 周信任增长或申诉。原判"认领即解除拦截"修正为"认领是必要非充分条件，拦截解除有时滞" |
| 2026-09-12 | **GSC 收录复查（§3 #4 节点）上半场 —— site: 25 条持平**【实勘 用户查】：轨迹 4 (9/8) → 5 (9/9) → 38 (9/10) → 25 (9/11) → 25 (9/12) = 38→25 未续跌、企稳在跳升后平台，与 9/11 采样波动判定一致，无新信息无动作。**判定准据（索引覆盖报告 sitemap 视图 Indexed 数 + 效果查询明细拆污染）待用户回传，到数补记本行**（→ 后续 9/14 行收口） |
| 2026-09-14 | **GA4 gtag.js 上线（G-EKH9T22FDT，用户建账号触发，同 tintbrew 当日先例）**：ID 进 consts.ts `gaMeasurementId`，脚本挂 BaseLayout `<head>`（`is:inline` + `define:vars`），61 页全带；与 CF Web Analytics（边缘自动注入）双跑。**连带合规修正**：/privacy/ 原文 "no tracking cookies" + Analytics 节只提 CF cookieless —— GA 会种 `_ga`/`_ga_*`，已改为如实披露两套统计 + 新增 Cookies 节（含儿童站措辞：打印件使用者不接触 cookie）。61 页构建 + 48 测试绿，push main（`d4b814a`）部署后 **GA 实时验证 ✅ 9/14 通过（两站数据均流入）**。9/14 晚用户报"GA 主页无数据"→ 实勘服务端双站 gtag ID 在位 + Google 安装助手已发检测确认 → **定性：标准报表 24~48h 处理延迟非故障**（新属性当天 Home 空 = 预期；当下口径只看「实时」报告，需边访问边看，实时窗口仅 30 分钟） |
| 2026-09-14 | **GSC 最差 10 词体检（用户问"是否偏航"，同 tintbrew 当日先例）**【实测 GSC】：0 点击 / 1~3 展示 / 排名 69~93 —— **判读：未偏航**。分布：**三根支柱头词全在最差榜深水区**（multiplication chart 92.7 = 12.1K / place value chart 69~86 含 charts、to millions pdf、whole numbers ×2 变体 = 27.1K / kindergarten sight word list 73.0 = 12.1K）—— day 9 DR0 标准起点，磨页龄轨道；变体已吸收核查【实勘代码】：whole numbers 文案 ×3 处、millions ×11 处在位；time table chart 1-12 = **英式术语证据**（美式 = times table，非美区展示，看 GSC 加美国筛选）；multiplication graph = 松散变体噪音。**最差榜零 cursive 词**（219K 最大量池不在最差集，同 tintbrew 矩阵反向确认逻辑）。**唯一动作项 ⭐：preschool 页认领 "pre-k" 变体** —— pre k sight words list 排 70.0 落到 kindergarten 页，/preschool-sight-words/ 存在但通篇 0 次 "pre-k"（美式同义词未认领）；改法文案级（title 变体/H2/FAQ 自然带入 Pre-K），**搭下次部署车不单独发**（10/17 验收窗内少动页） |
| 2026-09-14 | **GSC 最好 10 词体检（用户疑"排名很差"）**【实测 GSC】：0 点击 / 1~2 展示 / 排名 22~40 —— **判读：不差，是 day 9 快于锚点的轨迹**（预期锚"长尾进前两页 2~3 月"，现 day 9 已在第 2~3 页）。**9/10 是 cursive 簇**（字母页 + capital 变体问法 ×5）= 确认最差榜的反向推断：最大量池就是最强排名资产；**9/9 capital 变体加码上线 5 天即被派词 = 加码决策被需求验证**（capital b in cursive = 实测 2.9K/KD27 词）。alphabet chart for kindergarten 22.0 = 唯一非 cursive，/alphabet-chart/ 爬坡正常。**两站"最好榜"不可比位次**：tintbrew 5~8 位打零竞争超长尾（pink plus purple），本站 22~40 打真量词真竞品（K5/MyCursive 前排）—— 位置深一档 = 词池回报大一档。**新观察项（只记不动作）**：fin cursive / bay in cursive = **词级 cursive 需求**（搜整个单词的草书写法，撞上单字母页被接住）—— 2 次展示噪音不入池，与 /name-tracing/ 同族，10/17 后顺手拉量判"常用词草书"有无缝隙。字母族 10/17 验收看 top 20 推进 |
| 2026-09-14 | **site: 38（周一例行粗信号）**：轨迹 4(9/8)→5(9/9)→38(9/10)→25(9/11)→**38(9/14)** —— 25~38 区间震荡，与 9/11"采样估计值波动非故障"定性一致，无动作；权威判定源仍是 GSC 索引覆盖 Indexed 数（当日待用户补 sitemap 视图读数，与上周 52 可比） |
| 2026-09-14 | **GSC 站点地图报告（周一例行·结构面）**【实测 GSC】：sitemap-index **52 条已发现 / 0 错误** / 上次读取 9/11 —— 52 = 生产(main) 53 页 − 404，满格覆盖。**口径备注**：此为"发现数"非"已编入索引数"（上周可比 52 是 indexed 口径），索引覆盖 sitemap 视图读数待补。**预录台阶（防未来误读）**：v1.6-predev 分支已 61 页（V1.6 graph paper 簇 + sight words 扩展在车上），9/19 收录门过后合并 main → sitemap 阶跃 52→~60，下周一数字跳升属计划内非异常 |
| 2026-09-14 | **索引报告"0 已编入"虚惊 → 定性：过期快照**：用户读出 未编入 4 / 已编入 0（自称无筛选、未点原因行），追问出报表顶部**「上次更新日期 9/4」** —— 谜底：页面编制索引聚合报告快照停在上线日（本站 9/5 上线，9/4 快照 = 未上线状态，0/4 恰是该时刻正确读数）；该报告为数天~周级更新节奏，新属性常驻初始快照，非实时数据（准实时只有 URL 检查）。**四路旁证定案站体健康**：site: 38（Google 实返页数 >> 0）｜ 当日查询拿曝光（cursive 22~40 位）｜ sitemap 52 发现/0 错误 ｜ 服务端 curl 200 + canonical 自指 + 零 noindex（GA 部署未碰坏任何东西）。**例行纪律修正：新站期聚合索引数只在「上次更新」日期推进后环比，读数必带快照日期**；周一例行以 sitemap 报告 + 效果曝光 + site: 为准（今日三样全绿，周一例行闭环） |
| 2026-09-14 | **Pinterest 测试 pin #2 仍被拦**（按 9/11 预案执行的 1 条测试，cursive-alphabet URL）→ 走"仍拦"分支：**停止尝试进信任期**，首拦 9/11 → 复试 **9/21**，再拦则申诉一次。**机制归因**：链接拦截是域名信誉制，认领只证明所有权不清信誉分；本站 9 天 DR0 新域 + 新 Pinterest 账号双新组合默认高危，信誉靠时间/外链/pin 历史攒。**信任期纪律**：账号保温（浏览/save 他人教学 pin/关注 board），零链接 pin；9/16 tintbrew Pinterest 设置照常但链接 pin 预期同样被拦（同款双新）。**待办诊断**：web.archive.org 查两域名有无前世（Claude 侧网络不通 archive.org —— curl/WebFetch 双失败，仓库根 wayback_cdx.json 实为 9 月初 API 宕机错误页非数据；👤 美区浏览器代查：有历史快照=拦截有历史原因申诉优先级↑，零记录=纯新域不信任安心等）→ **✅ 9/14 查讫：chartglade.com 零快照，前世=无** —— 判定：全新域名，拦截无历史黑名单成分 = 纯"新域+新号"信誉评分问题；**等待策略确认正确（9/21 复试不变），申诉降级**；"server does not respond" 字样 = archive.org 自己抓站的网络失败非本站问题（当日 curl 200 实证）。待补：全域名通配确认 + tintbrew.com 同查（9/16 上 Pinterest 前）→ **✅ tintbrew.com 9/14 亦零快照，两域名双双全新实锤**（通配逐条未点，根 URL 无快照已足判定）。Pinterest 不在关键路径（当日四路数据全绿） |

| 2026-09-14 | **竞品外链逆向实探（用户求免费外链渠道触发）**：四竞品（Superstar/Math-Salamanders/MyCursive/K5）域名反查谁在引用【实勘 搜索快照，全美源无区域污染】—— **最大发现：MyCursive 一页「states that require cursive」州立法追踪数据页换来 EdWeek/Snopes/Fox/CNN/报纸引用**（其数据停在 2023 年 21 州，2026/2 宾州立法后已过半 = 缝隙），DR0 新站可整体复制此打法 → 立 §3 #16 建页。筛出 5 类免费渠道：州立法数据页 / 权威指南 pitch（homeschool.com + Cathy Duffy，编辑选品不收费）/ 育儿媒体 round-up pitch（Tinybeans / Mommy Poppins）/ LibGuides 馆员推荐（先例 Centennial College 挂 MyCursive）/ **r/Handwriting 答帖**（草书被推荐的真实发生地，原 §3 版块表漏，已补 DISTRIBUTION §3.1）；Scribd（二手文档）/ YouTube 自营频道判不做。行动清单 + pitch 邮件模板入 DISTRIBUTION §5；r/Handwriting 答帖与 3 封 pitch 邮件挂 TASKS 本周 |
| 2026-09-14 | **GA「今日 4 活跃用户/12 事件」数量级疑虑定性（用户问"和预期差太多"）**：判读 = **如期非故障**。三因叠加：① GA 当日装机（9/14）+ 用户实时验证自访 = 大头是自访（~3 事件/用户的单页短会话形态吻合，【推断】）；② 北极星是 GSC 28 天曝光非 GA 用户数（§0），当下正处"曝光冒头、排名爬坡"段（cursive 簇 22~40 位 = 第 3~4 页物理零点击）；③ 对照目标阶梯**基准档 1 个月预期 0.5~3 访问/天**，day 9 的 4（含自访）贴基准档不落后——251K~500K 词池是排名成熟后的天花板非第 10 天预期。服务端复核【实勘 curl 权威 NS+CF IP】：**200 正常**，"本地打不开"仍是国内网络老问题。流量真口径 = CF Web Analytics（对减 9/8 自访基线 42）+ GSC 曝光；GA 标准报表 9/16 后才有可读数据。无动作，判定点不变（9/19 收录门 → 10/17 验收） |
| 2026-09-15 | **Bing/DDG 收录洞排查 + IndexNow 主动推送上线（tintbrew 同日先例复制，用户指令"chartglade 也看下"触发）**：DDG site: 探针两次空 + 对照组 tintbrew 亦空（anomaly 验证码页实锤）→ **DDG 对本机代理 IP 渐进限流，本站 Bing 系收录现状无定论，不纠结**——tintbrew 当日已实锤同款新站 11 天 Bing 系只收首页 1 条（同 CF Pages / 同新域 / 同部署模式，【推断】本站大概率同病），IndexNow 推送无论现状如何均正收益 → 当日落地：key 文件入 public/（`cadecee` 部署验证 200）+ api.indexnow.org 批量 POST 全 52 URL，单测 202 / 批量 200【实测】。**⚠️ 补推钩子**：本轮推的是 main 当前 52 URL；v1.6-predev 的 9 张新页（graph paper 簇 + sight words 扩展）9/19 合并 main 后**必须补推一轮 IndexNow**（新 URL 不会自动进 Bing 队列的加速通道，自然爬在 Bing 系对 DR0 新站极慢） |
| 2026-09-15 | **万圣节簇开发完成（分支 `v1.6-predev` `f2be941`，9/19 门后随 V1.6 同批上 main，凑 10/05 批）**：3 打印页 + /halloween/ hub = 4 新 URL（65 页 / sitemap 64，55 测试绿）—— ① /halloween-word-search/ 双难度：K-2 正向 3 方向 12×12 + 3-5 全 8 向 13×13，引擎 `lib/wordSearch.ts`（mulberry32 种子随机，固定 seed 保 build 稳定，词可交叉共享字母，填充字母取自词池；8 项测试）；② /halloween-color-by-number/ 真算式涂色：南瓜=加法和≤12（grades 1-2）+ 幽灵=乘法≤12（3-4），`factsFor` 每格算式按 (row×cols+col) 轮转分解池（同 build 稳定），legend 自动过滤未用色号；③ /halloween-cursive-practice/：trace-then-write 词表描红（8+8 词复用 word search 词表，>5 字母自动小字号档）；④ hub 收口主打"一份词表三用：扫→算→写"。接线：hub 枚举 + 面包屑 + Footer。**词量【假设】**挂 9/18 用户 AITDK 顺手补测（halloween word search / halloween color by number / halloween cursive words），按三档规则判加码或缩簇 |
| 2026-09-18 | **MiriCanvas 对标拆解（用户指名触发）**：拆解笔记入 [BENCHMARKS.md](./BENCHMARKS.md)（今后对标统一进该文件）。结论：矩阵化+季节轮换路线获同构验证（53 万模板 gallery = 实体×变体枚举的极致）；**唯一增量实招 = 打开 Google Images 流量口**（本站页面全是 HTML 表格/SVG，图片搜索收不到）→ 立 §3 #17 图片 SEO，10/05 批搭车；连带小项：10/05 合并后首页加 Halloween 季节位（学其首页季节轮换，不加页）。不抄清单（SaaS/AI/多语言/UGC/大体量）见 BENCHMARKS |
| 2026-09-18 | **竞品 sitemap 逆向（用户批评"从没研究过大站为什么量大"触发，新纪律入根 CLAUDE.md）**【实勘 sitemap 抓取，10808 代理美区】：K5 **~10,000 URL**（worksheets 族 3,300+ / blog 1,059 = 量+内容营销双引擎）｜ Superstar **930 页挂 21,118 张 sitemap 图片声明（均值 ~23 图/页）—— 图片 SEO 就是在位者的结构性流量机器，#17 的直接实锤**｜ Printabulls 522 页（calendars 154 / coloring 141 / holidays 67 = 季节量引擎，halloween 已 22 页在排）｜ MyCursive **仅 63 页** = 小站路径靠外链诱饵页（州立法页）不靠页数（我们两招都在车上）。数据入 [BENCHMARKS.md](./BENCHMARKS.md) §2 |
| 2026-09-18 | **#17 图片 SEO 当日开发上线（main `c91c5ac`，走 #13"只加内容不加页"先例不破批次门；线上验证 ✅ 同日）**：5 支柱页（multiplication / place-value / kindergarten sight words / cursive-alphabet / alphabet-chart）正文内嵌 `.printable` 真图 PNG（2016px 宽 37~148KB、lazy、描述性文件名、手写 alt"内容+形态+用途"句式、`no-print` 打印零影响）；新管线 `npm run sheet-images`（本地 http 服务 dist + 无头 Edge @2x，自托管字体真实渲染，Dancing Script 目检过）；+6 守卫测试（声明尺寸必须与磁盘 PNG 一致）。main 53 页 29 测试绿 / v1.6-predev 65 页 61 测试绿。**部署事故一笔（已修）**：push 后 CF 构建连败 3 次线上停 9/14 版 ~40 分钟 —— 根因 = main 手改 package.json 加 playwright-core devDep 但 package-lock.json 未同步，`npm ci` 报 "Missing from lock file"（排查曾误判：在 v1.6-predev 工作区模拟构建全绿，但那分支 lock 是全的）；`bcba67a` 在 main 补 lock 修复，部署后 5 PNG + 5 页 figure 全 200【实勘 curl 权威 IP】。后续：字母页/变体页分批补图；Google Images 收录效果 10 月中旬随 10/17 验收复盘 |
| 2026-09-17 | **外链首发 pitch ×2 提交（用户操作，DISTRIBUTION §5.2 #3）**：homeschool.com 联系页表单（Reasons=Partner/Advertise With Us + Comments 版文案）+ Cathy Duffy Reviews 联系表单（按其官方 PDF"别信息超载"纪律用精简 Message，点名 Handwriting 分类 / Free Homeschooling Resources 对口）—— 两处均无时效承诺，进入等回复期；**跟进规则：10 月第 1 周例行轮转时若零回音，各补一封 follow-up（引用首封）**。当日附带：两入口实勘入档（表单字段/邮箱/勾选项，§5.2 #3 升级可执行级）；Peerlist launch 付费门定论更正（launch 卡收费 Verify Identity，workplace 验证不解锁 → 搁置不买，见 9/9 行更正注）。当日收尾：Reddit r/Handwriting 答帖已发（版内唯一近期真人求建议帖 "childish handwriting 求改进" —— 真建议在前四条 + cursive-alphabet 链接嵌在第三条"我用过"，学习者口吻；帖内链接只一次，有回复正常跟）—— **外链首发 3/3 收工**。打猎教训：Reddit 搜索只给几年前的存量帖，猎场 = `r/Handwriting/new/` feed，求建议帖同样算目标 |
| 2026-09-18 | **同类站竞扫第二轮（用户指令"上 gg 拉同类站找提升点，含 tintbrew"）**【实勘 页面渲染文 + sitemap】：Suncatcher 乘法页 = 一页 16 变体 × 每变体真图 + PDF/PNG 下载（16 张图 alt 全同串照样前排 → 胜负手是变体图密度不是 alt 文案）；ClassWeekly 9,101 URL 三台结构机器（standards 292 标准码页 / teaching-wiki 360 / event 776 + Teaching Calendar hub，freemium $14/月）→ 拆解入 [BENCHMARKS.md](./BENCHMARKS.md) §3/§4 + 新建 tintbrew/BENCHMARKS.md。**产出**：⭐ §3 **#18 支柱页下载按钮**（10/05 批，PNG 复用 #17 资产零成本）＋ Teaching Calendar hub 进 11 月批候选 ＋ standards 矩阵入远期池（10/17 后议）；tintbrew 侧产出见其 PLAN 同日行 |
| 2026-09-20 | **"GA 全 0"诊断（用户报双站统计归零触发）+ CF Web Analytics 实锤断流**：【实勘 curl 浏览器 UA + Accept: text/html，双站首页+内页 4 URL】GA4 gtag 完好在位（G-EKH9T22FDT）；CF beacon **4/4 全缺** —— **对照本站 9/9 同法实测可见（§1 9/9 行"线上体检必带浏览器头"）= 注入 9/9~9/20 间停了**（时点机制不明，疑与 9/14 GA 部署同期【假设】，dashboard 核实）。判读：GA 管道大概率没坏，"全 0"最可能 = 真实流量≈0（cursive 簇 22~40 位 = 第 3~4 页物理零点击，9/14 已定性"如期"）+ 短日期范围盖掉 9/14 尖峰（4 用户/12 事件）。裁决三步 + CF 修复路径已进 TASKS（重开自动注入或 token 进 consts，**二选一**防双计）；**CF WA 修复前其曲线读数无效，真口径暂以 GSC 曝光/点击为准**。连带：**9/19 收录门已过期未跑**（👤 sitemap 视图收录数 → 🤖 合并 v1.6-predev 上 main + IndexNow 补推 9 新页）—— 万圣分发窗口（提前 4~6 周）已开，最迟本周执行 |
| 2026-09-20 | **收录门执行（用户授权 + 证据覆盖正式口径）**：👤 只报了全站视图 14 编入/41 未编入（14+41=55≠52 确认非 sitemap 口径；判过期快照第三次——旁证全绿：9/7 sitemap 视图 52 / 9/11 sitemap 0 错 / site: 38↑ / 曝光持续；WebSearch site: 探针仅首页级，判别力弱不采信）。**风险不对称裁决**：错合并 = 12 页晚收录几天无实害；拖 = 万圣窗口烧真时间 → 执行。过程：docs `ebdc70a` 上 main → v1.6-predev 合并零冲突 → **#13 双实现去重核对**（built /cursive/a/ 变体段仅一份，4 处命中 = JSON-LD/可见 FAQ/标题/正文各一）→ `npm ci` 模拟 CI 过（lock 一致，9/18 事故教训复用）+ build 65 页 + 61 测试绿 → `e0e8983` push → 新页 /halloween-word-search/ /graph-paper/ /name-tracing/ 全 **200**【实勘】→ sitemap **52→64**（+12 = graph paper 簇 7 + name tracing 1 + 万圣 4，零丢失，线上与本地 diff=0）→ **IndexNow 批量补推 12 URL 返 200**【实测】。⚠️ 正式口径（sitemap 视图 + 快照日期 + URL 抽查）👤 周一例行后补追认；下周一 sitemap 读数阶跃 52→64 属计划内（9/14 预录台阶）。附带：探针乌龙一笔 = 中文版 nslookup 输出里 awk 抓到权威 NS 自身 IP（172.64.32.84），SNI 撞错节点全线 403 —— 权威 NS 取 IP 需取应答段地址（1.1.1.1 解析 172.67.137.197/104.21.46.105 为准） |
| 2026-09-20 | **CF WA 断流判定更正（同日两翻案）+ 真浏览器探针方法论升级**：① 用户 dashboard 截图（近 7 天 **39 visits / 40 page views**，今日含自访尖峰 ~5）= WA 活；② 真无头 Edge 探针（`scripts/beacon-probe.mjs`，复用 #17 管线启动方式）抓原始响应 HTML，首页+/cursive/a/ **beacon 2/2 在位** —— **早间 curl（含浏览器 UA+Accept）判"断流"作废**：CF 自动注入已改按客户端指纹过滤，curl 一律不注入，**9/9 方法论"线上体检必带浏览器头"失效，升级为必带真浏览器**（探针脚本常驻 scripts/，30 秒定性）；③ GA Realtime 双站自测通过（各见 1）= 管道+property 均对。**chartglade 终局：GA ✓ CF WA ✓ 双健康**，"全 0"= 默认日期范围盖掉 9/14 尖峰 + 真实流量≈0（39/7d 大头自访，与 9/8 基线 42 同量级）。tintbrew 侧真死待修，见其 PLAN 同日行 |
| 2026-09-20 | **#12 InkPx/Printabulls 对标拆解完成（后台探员，产出 [BENCHMARKS.md](./BENCHMARKS.md) §5/§6）**：① **词族胜负规律** —— 集合型实体（worksheets/日历）合集墙赢（Printabulls letter a worksheets **#1** 压 K5/TPT）、参考图表型（乘法表）单表深读赢 → 本站支柱全在参考图表型，**不学 75 图墙**；② 图片密度标尺再抬 —— Printabulls 522 页挂 **20,213 图声明（均值 38.7/页**，Superstar 23 的 1.7 倍）→ #17 扩容列 10/25 批第一波（支柱页变体图 6~12 张）；③ 两站在 cursive/sight words **全缺位**（201K 量王族无人接，对手仍是 K5/SuperTeacher/MyCursive 老牌）；④ **#18 PDF 下载升格 10/25 正式项**（Printabulls 85 PDF/页 + InkPx 三格式双实锤）+ 5 支柱页 title 加格式词（文案级）。不做：2027 日历矩阵（对手全年已建排 #2）/ coloring 141 页（漂题）/ AI 爬虫封禁（DR0 无收益）。**10/05 批维持零新增** |
| 2026-09-24 | **索引报告 15 编入/52 未编入【实测 GSC 全站视图，快照 9/21，👤 报】→ 初判镜像伪读，**同日被 15 条在档清单推翻，更正为真实收录门（见下一行）**：原因分布 = 重定向 2 / 已发现-未编 49 / **403 屏蔽 1（新警号）** / 已抓取-未编 0。① 15/52 与 9/7 实测 52 编入/14 未编恰为同对数字镜像（前科三连：9/8 "0 已编入"、9/14 双站 "14 已编入" 虚惊、9/20 14/41 —— 聚合报告摆动已定性常态）；② 未编 41→52 的 +11 ≈ 9/20 新上 12 页被 sitemap 重读后真实发现（"已发现-尚未编入" = 新页 Google 侧正常暂态，非异常）【推断】；③ **403×1 当日核排查端**：64 条 sitemap URL 全量巡检（curl 双 CF IP 并行 + 浏览器 UA）**64/64 全 200、零 403**【实勘】→ 403 非站端配置问题，候选解释 = CF 边缘按客户端指纹过滤爬虫（9/20 beacon 事件已实锤 CF 按指纹区别对待）或部署切换瞬态【假设】，👤 点开原因行看具体 URL 即定。**抽查结果**：/cursive/a/ 在册 ✅、/halloween-word-search/ 未编入 —— 当日据此续判伪读，**但 👤 同日贴出的 15 条在档清单推翻此判（下一行）**。效果 28 天环比未报待补；request indexing 12 新页优先级因此上调（新页正卡"已发现"暂态，配额推一把） |
| 2026-09-24 | **15 条在档索引清单入档 → 推翻同日"镜像伪读"初判，更正为真实收录门（诚实修正）**：👤 贴出"已编入索引"明细 15 条，日期分布 = 9/8×5（首页、/cursive-alphabet/、/cursive/a/、/place-value-chart/、/cursive/f/）+ 9/9×9（/alphabet-chart/、/multiplication-chart/、/kindergarten-sight-words/、/place-value-chart-printable/、/cursive/{i,b,k,x,z}/）+ 9/21×1（/cursive/y/）—— **与 request indexing 手工提交队列完美对账**（9/8 首批 5 + 9/9 二批 9 = 累计 14/53，TASKS 9/9 归档在案）：Google 当前稳定编入的 ≈ 手动推过的页 + 1 条自然重爬。**初判三处错误修正**：① "9/7 实测 52/14 镜像" = tintbrew 数字张冠李戴（本站 9/7 实为编入 26 / 页面报告 30 条）；② "9/7 sitemap 视图 52" = 52 是 sitemap **发现**数非编入数（9/14 行已备注发现≠编入，9/20 行引用时失察）；③ 26(9/7)→14(9/20)→15(9/21) 轨迹自洽（新站先收后复核降级，或 9/7 读数混入发现数 —— 无法回溯；当下硬口径 = **15 编入 + 49 已发现-未编 + 2 重定向 + 1 403**【实测】）。**判读：非故障、是门槛** —— 已抓取-未编 = 0、64/64 全 200、canonical/noindex 全绿、无重复类原因，纯 Google 索引门槛（DR0 + day 19 + 64 页中 26 页同模板矩阵）压着 49 页"已发现"暂态；对照组 tintbrew 同基建同模式自然满格（53 编入/16 未编）= 判**站内因素非基建因素**【推断】。**行动**：① request indexing 提速为每日例行（~10 条/天，49 页池 5 天一轮，今日 12 新页打头）② 根本解 = 外链（Pinterest 复试 9/21 到期 + homeschool.com/Cathy Duffy 审核在途）+ 页龄 ③ 收录门与 10/05 批不冲突（新页已发现 = 在库，加页只摊薄爬取优先级不烧收录） |
| 2026-09-24 | **403×1 定位收官：http://www.chartglade.com/（www + 明文 80 组合）站外可复现、站内代码无从修**：👤 点开原因行得 URL；curl 实测 http://www.chartglade.com/ → **403（双 CF IP 一致复现）**，https://www → 301 → apex 正常、http://apex → 301 正常、**tintbrew 同四组合全 301 正常**；1.1.1.1 权威解析 www 与 apex 同指（104.21.46.105/172.67.137.197 双栈）→ 判 **CF 边缘对本 zone 的 www:80 路由缺口**（非 Pages 非代码，dashboard 层）。**修复（👤 可选 2 分钟，收益 = 清掉 GSC 403 行 + 合并规范化信号）**：CF dash → chartglade.com → Rules → Redirect Rules → 新建 Hostname equals `www.chartglade.com` → 301 → `https://chartglade.com/${http.request.uri.path}`；或先对比 tintbrew zone 的 SSL/TLS → Edge Certificates → Always Use HTTPS 状态找差异。不修无实害（该 URL 非 sitemap 页，首页 canonical 已编入）|
| 2026-09-24 | **Pinterest 复试第三次被拦 → 定性升级为新域信誉门（处置预案随之改版）**：👤 复试报 "Sorry! We blocked this link because it may lead to spam"（9/11 首拦、9/14 二拦、10 天信任期后 9/24 三拦）。**改判**：① 文案 "blocked this **link**" = 链接/域名级拦截非账号封（账号封文案与按钮禁用形态不同）→ chartglade.com 域名在 Pinterest spam 信誉名单（新注册域常规误伤，DR0+零外链+新号三新组合）；② "缓存时滞"解释三连失败作废；③ 社区经验此门 2~6 周自然开（域名 9 月初注册起算 → 窗口尾 ≈ 10 月中），申诉无用处不申诉。**处置**：链接 pin 停发不硬试；**保温改版** = 隔天发 1 条零链接 pin（图+文案，不带本域 URL）养账号信誉；**复试节奏 = 10/01（与 tintbrew 决策点同日顺手）→ 仍拦则 10/15（信誉窗尾）**。**外链破口不受此卡**：homeschool.com/Cathy Duffy 审核在途（10 月第 1 周零回音各补 follow-up）+ Reddit r/Handwriting 已发 + 9/17 pitch 队列 —— Pinterest 从外链主力位降为"门开则补" |
| 2026-09-24 | **"其他学科公式"再提案 → 引用 9/6 既有裁决，零新动作**：👤 问能否加其他学科公式 —— 9/6 已实勘定案：数学公式家族 4.5K/月 = **V1.7 已在 10/25 批车上**（geometry 2.9K/KD23 + algebra 1.66K 两页）；physics/chemistry 官方 PDF 垄断 SERP 不过线 ❌（College Board #1）；其他学科无"公式表"打印形态。增量一条：州考变体词族（regents formula sheet / STAAR formula sheet，9/6 标注量未勘）进 AITDK 待拉清单，≥500/月 才谈加页 |
| 2026-09-24 | **"表单生成 + 二维码收集"提案判定 → 结构性否决（👤 提议自定义表单→生成二维码→扫码填表做统计调研）**：三重不匹配，非 SEO 层面问题 —— ①**架构**：本站 = Astro 纯静态 + CF Pages 零后端零库（技术栈模板的核心优势），表单收集产品 = 后端 + 数据库 + 结果仪表盘 + 滥用防护的 SaaS，等于另起一个生意的工程量，"加个功能"装不下；②**人群/场景**：搜表单生成器/QR 表单的是活动组织者/企业行政/调研人，非 K-5 老师（老师侧表单 = 直接用 Google Forms，免费 + 全员已有账号），聚焦三问①②不过且站内无 hub 可挂；③**合规**：收集调研数据 = PII 处理，教育受众含未成年 → COPPA/隐私政策重写，DR0 个人站不该背这个。**竞品常识**：Google Forms 免费统治 + Jotform/SignUpGenius 锁 QR 表单与教师 signup 位。**两个已接住的碎片**：打印形态的"表单" = V1.8 sign-in sheet 族已排 11 月批（PT conference 季，正是老师的表单场景）；二维码若要只做纯前端 QR 生成器（静态可做）但 \`qr code generator\` SERP 是 SaaS 红海不作 SEO 入口。**在线表单 SaaS 想法 → 第三站候选池极低位**（架构重 + 合规重 + 红海，低于 B 宠物手册站；且同"订阅×SEO=空集"9/10 裁决逻辑：SaaS 要分发不是自然量），10/17 后议 |
| 2026-09-24 | **V1.8 sign-in sheet 族提前至 10/05 批（👤 指令"11 月太晚了，和 10 月的一起上"，季节复核支持）**：原排 11 月纯因"10 月批次已满"日历原因非季节最优 —— PT conference 10 月中开始 + 新页收录要 2~4 周（当前还在收录门内）→ 10/05 上线正好，11 月会错过头两周。代价两条已知悉：①节奏 9/20→10/05 = 15 天，比 3~4 周纪律紧（季节窗优先接受）；②6 张新页进 49 页未编池 → request indexing 配额 10/05 后把这批打头。**诚实预期**：open house 3.6K 头名今年开学黄金窗（8~9 月）已过，本批吃其长尾 + 6.7K 通用模板常青 + PT conference 当季。10/05 批新构成 = #18 下载按钮 + V1.8 hub+4~5 页；11 月批改为视力表 2 页小簇 |
| 2026-09-24 | **GSC 效果首报**【实测 用户 GSC 报数，窗口未注明按默认视图】：点击 2 / 曝光 **1,113** / CTR 0.2% / 平均排名 **44.6**。首条曝光基线入档（此前只有 tintbrew 有 9/10 基线）—— 15 页已编页在被真实分发，收录门（15/64）在松动而非死锁；平均排名 44.6 = 第 5 页徘徊，六周验收（10/17）看的就是这个数往 30 以内走。**读数纪律（回应"没参考价值"）**：点击/CTR 排名到位前恒零无信息量，活信号 = 曝光量级 + 平均排名 + 查询明细（新冒头词直接喂选词） |
| 2026-09-24 | **州考变体词族拉量终局 → 独立变体页否决，改 V1.7 页内变体段吸收**【实测 AITDK US/月，👤 拉】：staar formula sheet 320/KD20 + algebra 1 regents formula sheet 260/KD10 + staar algebra 1 formula chart 170/KD19 + regents formula sheet 30 —— 单词全 <500 线（本日"其他学科公式"行立的门槛）→ 不加页。反向亮点：KD 10~20 极低 + 打印文件型本可做页内变体段吸收，但 **👤 同日定标：新机会词族合计 ≥10K/月才做（780 差一个数量级）→ 变体段撤销不做，数据留档**；定标同日入 CLAUDE.md 选品门槛，已定批次不追溯 |
| 2026-09-24 | **万圣簇量级补测收官 → 维持现状吃当季（不加码、不缩簇）**【实测 AITDK US/月，👤 拉，9/15 开发行挂测条款兑现】：halloween word search **6,600/KD19**（头词质量好，KD 软）+ halloween color by number 1,600/KD15 + halloween cursive worksheets **0** —— 族合计 ≈8.2K。裁：① 加码否决：<10K 新定标线，不添万圣变体页；② 缩簇否决：4 页已上线 + 收录管道在跑（同日 request indexing 打头）+ 峰值窗口 10 月上中旬就在眼前，拆页 = 烧沉没成本；③ cursive 页 0 量留档不拆（挂 hub 复用词表零维护，AITDK 0 ≠ 绝对零）；④ 头词实测 = 簇存在性从【假设】转【实测】，**10 月 GSC 查询明细盯 word search 冒头 = 10/17 验收的季节脉冲验证点** |
| 2026-09-24 | **州立法词族拉量收官 → 死**【实测 AITDK，👤 报无量】：states require cursive 四变体全无量级 —— #16 的 MyCursive 州立法页打法在 SEO 量维度无支撑，收档不再以量为由推进 |

## 2. 关键词资产表

| 梯队 | 词/词族 | 量(US/月) | 目标页 | 状态 |
|---|---|---|---|---|
| 量王 | cursive alphabet（裸词） | 201K/KD43 | /cursive-alphabet/ | 磨页龄，别指望 3 个月 |
| 量王变体 | cursive X / cursive capital X（名词型） | **6 裸词均值 33K、合计 198K + capital 变体 17.6K【实测 9/6，12 词明细见下块】** | **/cursive/a/~/z/ 26 页** | **矩阵转正**（赌注→实测资产）；论点成立触发加码 → §3 #13 —— **变体段已上线（main `3cbf225` 09-09）**，v1.6-predev 措辞版待合并去重 |
| 支柱 2 | place value chart（+printable/4th grade 变体） | 27.1K | /place-value-chart/ 等 4 页 | 已上线 |
| 支柱 3 | kindergarten sight words（+dolch/fry 变体） | 12.1K | 5 阶梯页 | 已上线 |
| 支柱 4 | multiplication chart（+1-12/1-100 变体） | 12.1K | 4 页 | 已上线 |
| 软词 | alphabet chart | 6.6K/KD15 | /alphabet-chart/ | 全站最软词，先动 |
| 禁区 | states and capitals quiz / multiplication worksheets | 12K+/KD48 | 不做 | SERP 巨头，已标注 |
| V1.5 候选 | cursive worksheet generator | 1K/KD29【实测 9/6】 | cursive 簇 island 升级（长尾打法） | MyCursive SERP #1【实勘 9/6】；KD29 不独立硬打，并入 cursive 簇吃 26 页内链 |
| **V1.6 正式** | printable graph paper（变体：1/4″、1/2″、1cm、dot grid、isometric） | 12.1K/KD30【实测 9/6】 | /graph-paper/ hub + 变体矩阵 + 自定义 island | SERP 实勘弱✅（EMD 小站霸 top5：GraphPaperGenerator/Gridzzly/Mathpolate）；generator/maker 710 长尾同簇吸收 |
| **V1.6 正式** | name tracing generator（free / cursive 变体同页吃） | 合计 1.74K/KD13【实测 9/6】 | /name-tracing/ 交互工具页 | SERP 全小站✅（CreatePrintables/InkPx/EMD nametracingworksheets）；V2 放大器 = top100 宝宝名矩阵 |
| V1.6 长尾 | multiplication worksheet generator | 480/KD15【实测 9/6】 | 并入 §3 #14 数学练习 island（mad minute 族同池） | mathCharts.ts 纯函数现成 |
| 弃 | word search maker | 27.1K/KD72【实测 9/6】 | — | KD72 大厂垄断（Canva/Education.com/Discovery Puzzlemaker 实勘在位） |
| 暂缓 | sight word worksheet generator | 90/KD10【实测 9/6】 | — | 量太小，V2 复查 |
| **V1.7 候选** | geometry formula sheet | 2.9K/KD23【实测 9/6】 | /geometry-formula-sheet/ | 三样齐全✅：实勘软（MathWords #2/Scribd #4/Pinterest #7）；矩阵长尾 = 州考变体【实测 9/24 ≈780 → 弃（9/24 定标：词族 ≥10K/月才做）】 |
| **V1.7 候选** | algebra formula sheet（cheat/reference 三变体并页吃） | 合计 1.66K/KD13~19【实测 9/6】 | /algebra-formula-sheet/ | 实勘软（Pinterest #5/Reddit #6）；与数学簇内链互通 |
| 弃 | physics / chemistry formula/reference sheet | 4.4K / 590【实测 9/6】 | — | #1 = College Board / NYSED 官方 PDF，意图被官方直接满足 |
| **V1.8 正式** | sign in sheet 教师场景族（open house 头名 + template/printable 通用页 + PT conference/field trip/volunteer 变体） | ≈10.7K 合计/KD 4~31【实测 9/6】 | /sign-in-sheets/ hub + 4~5 页 | SERP 混合可打【实勘 9/6】：eForms #1 / Spreadsheet123 / InkPx / Visit-Us 独立站在排；visitor（办公人群）不做目标词 |
| 第三站候选池 | habit tracker printable（2.4K/KD30，成人 planner 人群漂出教师主题） | — | — | 双杀：量未过线 + 主题护栏；归未来 planner 站或第三站，10/17 后议 |
| **数学练习 island（成立）** | **mad minute 族 + worksheet generator 族**：mad minute math 480/KD18 + mad minute multiplication 480/KD17【实测 9/7】+ multiplication worksheet generator 480/KD15 + addition/subtraction worksheet generator 230【实测 9/7】，**合计 ≈1,670/月** 过 generator 族 500 合计线 | 乘法簇 island（挑运算/范围/题量 → 打印 mad-minute 题卡） | 【实勘 2026-09-07】`mad minute math printable` 前 5 = ①webmathminute.com **独立小 generator 站** ②SuperTeacher ③TPT ④EdHelper ⑤Rudolph Academy + Pinterest/Etsy 混排 —— DR0 能进的工具站形态✅；**10/25 批**（V1.7 同批，不挤 10/05） |
| **V1.9 小簇（判定 9/11 晚落位）** | printable eye chart 1.3K/KD40 + tumbling e chart 480/KD24 + 变体长尾（chart printable 70 等）≈ **1.9K 可打主战场**；裸词 snellen eye chart 8.1K/KD65 + eye exam chart 14.8K/KD57 = **22.9K 页龄期权不计验收**；vision screening chart 50/KD50 弃、printable eye chart for kids 0 量弃（FAQ 接住） | 合计 24.8K【实测 9/11】 | /printable-eye-chart/（Snellen 10ft 家用版 + 筛查记录表 + 距离标尺同页）+ /tumbling-e-chart/（学龄前）共 **2 页**，2 页不建 hub（V2 扩容再收口） | 【实勘 9/11 晚】两裸词 top3 均有裸 PDF（HVES #1 ×2）/地方诊所博客/小非营利在排，权威（AAO/Wikipedia/Cleveland）在场未锁死前三 = 混合 SERP 非禁区；判定 = **规则外第四情态**（量过线 5 倍 + KD 全超 35 + 实勘混合）→ 折中 2 页小簇，**11 月批（V1.8 同期）**；YMYL：每页"筛查非诊断"免责 + 引 AAO 来源；色盲卡不随批（色准硬伤，见时间线 9/11） |
| 弃（实勘+实测） | 100以内混合加减 / 两位数乘除 worksheets 族（6 词全勘：long division 6.6K/KD35、double digit mult 2.9K/KD31、2-digit mult worksheets 1.9K/**KD18**、2-digit regrouping 1.3K/KD32、mixed 320、within 100 210）【实测 9/7】 | — | — | 【实勘 2026-09-07】前 5 全为 K5/Math-Drills/Math-Aids/HomeschoolMath/SuperTeacher/TPT（long division 单独补勘：K5 #1 + HomeschoolMath + Math-Drills + Dad's + Math-Aids）—— worksheets 后缀词 9K+ 量全判死，"需求大≠能做"；**KD18 的 2-digit mult worksheets = KD 过线 SERP 不过线第 2 实例**（第 1 例 physics KD24），KD 估计与实勘冲突时实勘赢；需求真实（Common Core 2.NBT.B.5/4.NBT.B.5 原文）但静态词死路 |

**单字母族 SERP 实勘（2026-09-05，google.com US 区，4 词抽样）**：

| 查询 | 前 5 实况 | 判定 |
|---|---|---|
| cursive capital f | ①MyCursive ②brush calligraphy 视频教程 ③**Reddit 帖** ④Superstar ⑤Facebook 视频 | 弱 ✅（UGC 占 3/5） |
| capital i in cursive | ①**Pinterest pin** ②**Reddit** ③YouTube Short ④SuryasCursive ⑤YouTube | 极弱 ✅，且 **Pinterest pin 能直接排 Google #1** —— 分发手册的 Pinterest 策略双重确认 |
| cursive b | ①MyCursive ②K5 ③**Quora** ④fancy-text 字体站（意图不符）⑤**Pinterest** | 弱 ✅ |
| cursive f worksheet | 前 7 = K5 / Superstar / BrightSprout / Itsy Bitsy Fun / SplashLearn / Canva / Teach Prints | **硬 ❌ —— worksheet 后缀词不打**：大厂垄断，我们页面里 FAQ 接住即可，不当目标词 |

> 结论：**名词型**（cursive X / capital X in cursive）SERP 全弱可打；**worksheet 修饰型**放弃竞争。~~剩下唯一未知 = 量~~ 量已实测 ✅（下表）。

**单字母族量实测（AITDK，2026-09-06，US/月 + KD%）**：

| 词 | 量 | KD | 词 | 量 | KD |
|---|---|---|---|---|---|
| cursive f | 60,500 | 29 | capital i in cursive | 8,100 | 25 |
| cursive z | 40,500 | 35 | cursive capital f | 6,600 | 31 |
| cursive a | 33,100 | 30 | cursive capital b | 2,900 | 27 |
| cursive b | 27,100 | 24 | cursive chart | 2,400 | 21 |
| cursive k | 27,100 | 15 | cursive letters a to z | 1,000 | 43 |
| cursive x | 9,900 | 16 | cursive f worksheet | 210 | 22 |

**判定落位（2026-09-06 实测当日，按 §3 预定规则自动执行）**：6 裸词均值 **~33,000/月 = ≥1,000 档的 33 倍 → 第一档，论点成立 → 矩阵加码**（每字母页补 capital 变体段，§3 #13）；10/17 按原计划验收字母族。三条注：① 量级偏乐观（单词 f 60.5K，AITDK 可能含词族聚合）—— **10/17 排名实测才是真验收，不因量高改节奏**；② KD 15~35 全在可打带，k(15)/x(16)/b(24) 最软；③ worksheet 型仅 210/月 —— 双重确认放弃 worksheet 后缀。cursive chart 2.4K/KD21 与 cursive letters a to z 1K/KD43 由 /cursive-alphabet/ 顺带接住（FAQ/变体段），不单独建页。

## 3. 接下来要做（优先级排序）

| # | 任务 | 谁 | 验收标准 | 期限 |
|---|---|---|---|---|
| 1 | ~~Request indexing~~ **✅ 两波完成（勿重复）**：9/6 首批 5 条 + 9/8 canonical 修复后重提 5 条（`/` `/place-value-chart/` `/cursive-alphabet/` `/cursive/f/` `/cursive/a/`）+ 9/9 第二批 9 条 → **累计已请求 14/53**（明细见时间线与表格下方说明） | 👤 | — | 完成 |
| 2 | ~~Pinterest 分享包~~ **✅ 完成 2026-09-08**：全量 30 条 + 7 周排期 → [PINTEREST-PINS.md](./PINTEREST-PINS.md)（26 字母逐字母钩子；DISTRIBUTION §1.3/§1.4 存首批与节选） | Claude | — | 完成 |
| 3 | ~~目录站提交~~ **✅ 完成 2026-09-09**（用户提交三渠道：Uneed + Peerlist + AlternativeTo，均审核期未确认收录；AlternativeTo 含 9/8 双向挂竞品；文案 = DISTRIBUTION.md §2.1） | Claude+👤 | — | 完成 |
| 4 | GSC 收录复查：`site:chartglade.com` 数 + 索引覆盖报告 | 👤 | 记录数字入本文档 | 2026-09-12 |
| 5 | **6 周长尾验收**（§6 决策点） | 👤+Claude | 变体词排名截图 | **2026-10-17** |
| 6 | V1.5 cursive worksheet generator（文本→可打印练习页，OFL 字体+print CSS+零登录） | Claude | 1 交互页 | 10 月，视 §6 结果 |
| 7 | ~~单字母族量补测~~ **✅ 完成（2026-09-06，提前 2 天）**：6 裸词均值 33,033 = 门槛 1K 的 33 倍 → 论点成立，矩阵转正 + 加码授权，12 词量+KD 记入 §2 | 👤 | — | 完成 |
| 8 | **V1.6 graph paper 簇**：/graph-paper/ hub + 静态变体页（1/4″、1/2″、1cm、5mm、dot grid、isometric —— 纯 print CSS 网格，零新引擎）+ 自定义 island（间距/线色/纸型 → `window.print()`），同簇吸收 graph paper generator/maker 710 长尾 | Claude | **✅ 预开发完成 2026-09-07（v1.6-predev 分支，hub+6 页+island，47 测试绿）**；上线 = 合并 main | **10/05 批次**（合并门 = 9/19 检查点收录正常） |
| 9 | **V1.6 name tracing generator**：输入名字 → Caveat 描红页 → print；SSR 预渲染默认示例名（无 JS 完整）+ WebApplication JSON-LD；同页吃 free name tracing generator / cursive name tracing | Claude | **✅ 预开发完成 2026-09-07（v1.6-predev 分支，SSR Emma + print/cursive 双样式）**；上线 = 合并 main | **10/05 批次**（与 #8 同批） |
| 10 | **V1.7 数学公式表 2 页**：/geometry-formula-sheet/（2.9K/KD23）+ /algebra-formula-sheet/（三变体并页 1.66K），公式表 = print CSS 表格 + 与数学簇互链 | Claude | 2 页上线，公式排版打印验证 | **10/25 批次**（与感恩节季节页同批） |
| 11 | **V1.8 sign in sheet 族**：/sign-in-sheets/ hub + /open-house-sign-in-sheet/（3.6K 头名）+ /sign-in-sheet/（template+printable 6.7K 教师角度通用页）+ PT conference / field trip 变体页；visitor/attendance 只做 FAQ 接住 | Claude | hub + 4~5 页，print 剥纸验证，测试全绿 | **10/05 批（9/24 用户指令提前**，原 11 月：赶 10 月中~11 月 PT conference 季 + 收录需 2~4 周；⚠️ open house 3.6K 头名今年黄金窗 8~9 月已过，此批吃长尾+模板常青量）|
| 12 | 对标站拆解：InkPx（name tracing #5 + sign in sheet #3 跨词族排名的纯打印站）+ Printabulls（合集页吃大词模式）——词池结构/页面形态/内链策略各出一份笔记 | Claude | 拆解笔记入 docs/chartglade/ | 2026-09 下旬（V1.6 开发前，给 hub 结构参考） |
| 13 | **字母矩阵加码**：每字母补 "capital cursive X / capital X in cursive" 变体段（capitalSteps 字段已有，capital 变体词 3 个合计 17.6K：capital i 8.1K / capital f 6.6K / capital b 2.9K）；/cursive-alphabet/ 主页 SEO 措辞补 "cursive chart"（2.4K/KD21） | Claude | **变体段已上线（main `3cbf225` 2026-09-09：26 页 Capital X 深读段 + 大写 FAQ + 接客段，53 页 build + 23 测试绿）**；v1.6-predev 的 26 页措辞/主页 FAQ 版**合并时与 3cbf225 去重后收尾** | 原 **10/05 批次**（变体段部分已提前上线，只加内容不加新页不破止损线） |
| 14 | **数学练习生成器 island**（mad minute 族 960 + mult/add/sub worksheet generator 710，合计 ≈1,670/月【实测 9/7】）：挂乘法 chart 页，选运算/范围/题量 → 打印 mad-minute 计时题卡（30/60 题+答案行），SSR 预渲染默认一套 | Claude | island 上线 + 无 JS 可打印 + 测试绿 | **10/25 批次**（V1.7 同批顺手，不挤 10/05） |
| 15 | **V1.9 视力表 2 页**：/printable-eye-chart/（Snellen 10ft 家用版 8.5×11 + 筛查记录表 + 同页距离标尺；标题吃 printable eye chart，正文并吃 snellen chart printable / chart printable 变体）+ /tumbling-e-chart/（学龄前 E 表）；每页"筛查非诊断"免责 + AAO 来源引用（YMYL 纪律）；Snellen 视标按 10ft 标准物理尺寸渲染（打印后拿尺可验） | Claude | 2 页 build + 测试绿 + print 剥纸物理尺寸验证 | **2026-11 月批**（V1.8 同期） |
| 16 | **外链诱饵页 /states-that-require-cursive/**（9/14 竞品逆向最大产出）：50 州草书立法追踪表（州 / 要求与否 / 立法年份 / 州 DOE 来源链接）+ 署"数据更新于 2026 年 X 月"，吃新闻与教育博主引用（MyCursive 同款页 2023 版被 EdWeek/Snopes/Fox/CNN 引用【实勘 9/14】）；**非流量页（外链优先）**，states require cursive 词量 👤 AITDK 顺手记录不阻塞；内链接入 cursive hub | Claude | 页面 build + 测试绿，50 州每行带州 DOE 来源链 | 10 月批（赶得上 10/05 则搭车，否则 10/25） |
| 17 | **图片 SEO 通道**（9/18 MiriCanvas 拆解立 → 竞品 sitemap 实锤加急：Superstar 930 页 21K 图声明，细节见 [BENCHMARKS.md](./BENCHMARKS.md)）：核心页生成真实 PNG 内容图 + 描述性文件名 + 手写 alt + 正文 preview 位（print 隐藏零影响）—— 打开 Google Images 流量口（HTML 表格/SVG 图片搜索收不到）；连带：10/05 合并后首页加 Halloween 季节板块 | Claude | **首期 ✅ 2026-09-18 上线（main `c91c5ac`，5 支柱页 + `npm run sheet-images` 管线 + 6 守卫测试）**；字母页/变体页分批补图；收录效果 10 月中旬复盘 | 首期完成；扩容随批次 |
| 18 | **支柱页下载按钮**（9/18 Suncatcher 拆解产出，[BENCHMARKS.md](./BENCHMARKS.md) §3）：5 支柱页 `.printable` 工具条加 "Download PNG"（直接复用 #17 已上线 2016px PNG，`download` 属性零脚本）+ SeoHead 显式 `max-image-preview:large`（保险项一行）—— PNG/PDF 下载是行业标配（Suncatcher/classweekly/InkPx 全有），手机用户（Pinterest 9 成手机）无 Ctrl+P，下载再打印是真实路径；PDF 下载 = sheet-images 管线加 page.pdf() 再评估可后置 | Claude | 5 页带下载按钮 + 测试绿，开发在 v1.6-predev 随批合并 | **2026-10-05 批**（开发 9 月下旬） |

**（Request indexing 两批共 14/53 已全部请求完毕，勿重复：9/8 首批 5 条 + 9/9 第二批 9 条 —— 明细见时间线 9/9 行；下一批候选 = 余下字母页，配额闲置时再做）**

**（#7 的 AITDK 拉数词表与三档判定规则已于 2026-09-09 执行完毕并清理，勿重复拉取 —— 产出见 §2 实测表 + 判定落位：6 裸词均值 ~33K → 第一档加码）**

## 4. 每日 / 每周例行

**每日（≤10 分钟，两站共用，tintbrew 见其 PLAN.md）**：

- [ ] GSC → 效果：有没有新冒头的查询词（2 分钟，**界面怎么点见根 README「每周数据检查 SOP」**）
- [ ] Cloudflare → Web Analytics：访问曲线（1 分钟）
- [ ] 新词/异动记到本文档 §2（不展开分析）
- [ ] **禁令（2026-09-06 立）**：不手动 google 搜自己的站 —— 自搜/自点污染 GSC 数据，国内直连非美区 SERP；看收录用 GSC「索引」→「页面」，看排名等周一例行

**每周（~30 分钟）**：

- [ ] 周一：`site:chartglade.com`（粗信号：新站显示滞后 + "约 N 条"是估算值，不作判定）+ **GSC 索引覆盖（判定准据）** + 效果 28 天环比，记入本文档
- [ ] 周一：DDG `site:chartglade.com` 复核 Bing 系收录（IndexNow 2026-09-15 推 52 URL 后新增；走代理美区口径，DDG 限流时换时段）
- [ ] 周三：1 个分发动作 —— **详细步骤+现成文案见 [DISTRIBUTION.md](./DISTRIBUTION.md)**（Pinterest 每周 3~5 pin、目录站顺序表、Reddit 发帖模板全在里面）
- [ ] 周五：无批次在跑时保持不动（新站隔 3~4 周上批次，别一次堆页）

## 5. 远期规划

1. **V1.5** worksheet generator 交互工具页（cursive 文本→练习页；MyCursive 已验证此形态在 worksheet 意图下有排名）
2. **矩阵扩容候选**（按验收结果挑）：multiplication 1-100 等变体页 / sight words 按年级细分裂变页 / alphabet chart 场景变体
3. **季节窗（排期唯一依据 = 美国校历，准则见根 [CLAUDE.md](../../CLAUDE.md)「美国日历准则」+ 下方 §5.1 日历表）**：printables 赛道季节词是大流量脉冲，每个节点**提前 4~6 周上线**（Google 收录+爬排名要时间）。候选池（节点前 1 个月拉量筛选定稿）：halloween word search / halloween coloring math facts / thanksgiving gratitude tree / thankful ABC list / halloween cursive practice（复用字母矩阵架构）/ pumpkin math chart
4. **外链与分发**：Pinterest 常态化（每周 pin）、教师社区（r/Teachers r/homeschool，先读版规）、TPT 形态研究（商城不做，引流可）
5. **变现**：~300 访问/天 → 接广告
6. **第二曲线**（本仓第三个站候选）：技术/办公打印件（excel shortcuts 110K/KD38 量王 + sql cheat sheet 3.6K/CPC$2.44 高 CPC）—— 调研档落 [research/third-site.md](../../research/third-site.md)（2026-09-09 量实测+SERP 实勘三样齐全；SERP 中等非软区，打法 = 变体长尾切入+头词磨页龄）—— **10/17 验收后再定立项，此前零动作**。候选池新增方向（2026-09-11 实勘入档）：**健康筛查交互工具站**（在线色盲测试词族：SERP 无基建巨头、ColorBlindnessTest.org/Colblindor 等中小独立站在排、EnChroma/Pilestone 眼镜公司拿测试当获客漏斗 = 商业价值背书；纯前端 Canvas/SVG 可做零后端；FAA 计算机化色觉练习 2025 新规缝隙词）—— 同 10/17 后议，不与 chartglade 混站
7. **V1.6**（2026-09-06 判定入排期）：graph paper 簇（12.1K 头名，品牌契合 chart≈graph，SERP 奖励独立小工具站）+ name tracing generator（KD13 全场最软，V2 放大器 = top100 宝宝名矩阵）—— 定性结论：**generator 是功能不是关键词策略**（generator 词 710 合计 vs 静态词 12.1K，17 倍差距），交互化本身是 AI 截流护城河

### 5.1 美国教育内容日历（季节排期唯一依据）

> 2026-09-05 修正一个错误判断：美国学校 **8 月中下旬**开学（不是 9/1）—— 9 月初不是"开学季已过"，而是**开学使用高峰正当时**，53 页全部在吃这波红利，10/17 验收正落在窗口内。以下日历按节点倒排上线期限。

| 节点 | 美国时间 | 内容方向 | 上线期限 |
|---|---|---|---|
| 开学使用高峰（**现在**） | 8 月中~10 月 | 已有 53 页 + 持续分发 | 已在窗口内 |
| 万圣节 Halloween | **10/31** | word search / coloring math / cursive practice | **2026-10-05 前** |
| 感恩节 Thanksgiving | **11 月第 4 个周四**（2026=11/26） | gratitude tree / thankful ABC | 2026-10-25 前 |
| 圣诞·寒假 | 12/25，寒假 12 月中~1 月初 | winter / holiday printable | 2026-11-15 前 |
| 100th Day of School | 1 月底~2 月初（K-2 大日子） | 100 chart 玩法 / 100th day 活动 | 2026-12-20 前 |
| 情人节 Valentine's | **2/14**（教室交换卡刚需） | valentine 词卡 / cursive | 2027-01-10 前 |
| 春季 | 3~4 月（Easter 2027=3/28） | spring math / earth day | 2027-02-15 前 |
| 学年收尾 | 5~6 月 | end-of-year keepsake / summer slide packet | 2027-04-15 前 |
| **2027 开学季 Back-to-School** | 7 月备课~8 月中开学 | **全站大盘词冲排名黄金窗**（cursive alphabet 201K 峰值在此） | 2027-06-30 前内容全就位 |

## 6. 决策点（数据说话，到点执行）

| 时间 | 看什么 | 条件 → 动作 |
|---|---|---|
| 2026-09-19（2 周） | `site:` 收录数 + GSC 曝光词列表 | 全品牌词/零曝光 → 正常再等；变体词冒头 → 记录并加速 Pinterest 分发 |
| **2026-10-17（6 周）** | **长尾变体词（cursive capital f 等）排名** | **有词进 top 30 → 加码矩阵扩容；全 50 名外 → 启动 B 计划**（worksheet generator 提前 / KD 0 长尾平移打法 / 停更止损评估） |
| 2026-10-31 | 28 天曝光总量 | 起不来 → 复盘：单字母族量是否本身就是空池（拉 Ahrefs 数据补量验证） |
| **2027-01-31（止损线）** | 28 天曝光 + 单字母族排名 | 曝光 <3K **且** 零词 top 30 → **止损**：停新增投入（站保留），主力转下一站；任一达标 → 继续，按实测重定阶梯 |
| 随时 | 访问量 | 稳定 ~300/天 → 启动变现接入 |

## 7. 技术备忘（改动前必读）

- Pages 项目真名 **tools-6hx**（仓库名自动命名）；**CF 自动生成的 CNAME 永不手改**（改了全站 1014）
- GSC sitemap 输入框自带域名前缀，只填 `sitemap-index.xml`；**新版 GSC 已砍掉 sitemap 的"重新提交/移除"按钮**（2026-09-08 实勘：⋮ 菜单只剩网页/视频索引编制报告跳转）—— sitemap Google 自动定期重读（≈每天），无需也无法手动重提；输入框重复提交同 URL = 无害刷新，不会堆重复行
- 加图表页 = `src/data/*.ts` 加 PageDef + find-by-slug wrapper（Footer/hub 自动带出）；**字母级矩阵走动态路由** `pages/cursive/[letter].astro`
- Dolch 220 逐字 / Fry first 100（含 #49 their）在 `src/lib/sightWords.ts` —— 改动必跑测试
- 字体仅 cursive 页按需加载（Dancing Script + Caveat woff2 自托管）；name-tracing 页另有 Patrick Hand woff2（print 样式），graph paper 引擎在 `lib/graphPaper.ts`（1/100in 单位，改间距只动 GRAPH_PAPER_VARIANTS）
- **AITDK 报 "sitemap.xml missing" = 误报**（2026-09-08 定性）：工具只探测默认路径 /sitemap.xml，本站是 Astro 命名 sitemap-index.xml，且 robots.txt 声明 + GSC 提交双覆盖（52 条已发现为证）。**可选消音项待办**：`_redirects` 加 301 `/sitemap.xml → /sitemap-index.xml`，搭下次 main 部署车，不单独发
- GA4 在 BaseLayout `<head>` 直出（ID 在 consts.ts `gaMeasurementId`）；/privacy/ 已披露 GA cookie —— 若未来加广告脚本需再改隐私页（儿童站尤其）
- **改依赖必须 `npm install` 让 package-lock.json 同步落地再提交**（CF Pages 走 `npm ci` 严格校验，手改 package.json 不动 lock = 构建必败）；**模拟 CF 构建必须在目标分支检出上跑**（2026-09-18 事故：在 v1.6-predev 工作区 npm ci 全绿 → 误判 main 也绿，实际 main 缺 lock 条目连败 3 次）
