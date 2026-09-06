# chartglade 作战文档

> 本项目唯一计划文档 · 更新 2026-09-06 · 部署/运维细节见仓库根 [README.md](../../README.md)
> 原则：本文档没写的 = 没计划；做完的立刻勾掉并写日期。

## 0. 北极星

**GSC 28 天曝光数（impressions）环比增长**。变现节点：自然流量稳定 ~300 访问/天 → 接广告（当前零广告代码）。

一句话现状：**上线当天（2026-09-05）完成全部上线动作并扩容到 53 页**（27 基础页 + cursive 单字母矩阵 26 页），22 测试全绿，GSC 已收录 26 条 sitemap URL，进入「等收录」阶段。上线时点正落在美国**开学使用高峰**（8 月中~10 月，老师全年搜打印件最凶的窗口）—— 不是错过开学季，是正在其中。

### 目标阶梯（三档情景，2026-09-05 按基率校准 —— 不是预测承诺）

> **先认基率**：printables 赛道同样多数新站一年无声无息；且**单字母族搜索量还没实测**（26 页矩阵是赌注不是数据）。下表 = "论点成立时的路径"；**真正管用的是三档判定 + 止损线**，到点落哪档执行 §6 对应动作。

| 时点 | 悲观（多数站的命） | 基准（论点成立） | 乐观 |
|---|---|---|---|
| 1 个月（10/05） | 曝光 <100，访问 ~0 | 200~800/月，0.5~3/天；字母词摸进 30~50 名 | 1,500+，5/天 |
| 6 周（10/17） | 长尾全 50 外 → **§6 大决策点**：转 B 计划 | 零星词 top 30 → 加码矩阵 | 词族成规模进 top 30 |
| 3 个月（12/05） | 停滞 <1K | 1K~8K，5~30/天；单字母族 ≥10 词 top 30 | 10K，60/天 |
| 6 个月（2027/03） | 停滞 | 5K~25K，30~150/天；季节页（万圣/圣诞）脉冲验证 | 40K，250/天；cursive-alphabet 主页摸 top 20 |

**止损线**：**2027-01-31 复盘**，28 天曝光 <3K **且** 单字母族零词进 top 30 → 停止新增投入（站保留零成本），主力转下一站；在此之前不加页、不花钱。

> 与 tintbrew 的差别：词池更大（251K）但 SERP 更硬（教育站在位）、单字母族量未实测；起量更依赖矩阵页数与季节脉冲；变现线同 300 访问/天。

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

## 2. 关键词资产表

| 梯队 | 词/词族 | 量(US/月) | 目标页 | 状态 |
|---|---|---|---|---|
| 量王 | cursive alphabet（裸词） | 201K/KD43 | /cursive-alphabet/ | 磨页龄，别指望 3 个月 |
| 量王变体 | cursive X / cursive capital X（名词型） | **6 裸词均值 33K、合计 198K + capital 变体 17.6K【实测 9/6】** | **/cursive/a/~/z/ 26 页** | **矩阵转正**（赌注→实测资产）；论点成立触发加码 → §3 #13 |
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
| **V1.7 候选** | geometry formula sheet | 2.9K/KD23【实测 9/6】 | /geometry-formula-sheet/ | 三样齐全✅：实勘软（MathWords #2/Scribd #4/Pinterest #7）；矩阵长尾 = 州考变体（Regents/STAAR/Keystone，量未勘） |
| **V1.7 候选** | algebra formula sheet（cheat/reference 三变体并页吃） | 合计 1.66K/KD13~19【实测 9/6】 | /algebra-formula-sheet/ | 实勘软（Pinterest #5/Reddit #6）；与数学簇内链互通 |
| 弃 | physics / chemistry formula/reference sheet | 4.4K / 590【实测 9/6】 | — | #1 = College Board / NYSED 官方 PDF，意图被官方直接满足 |
| **V1.8 正式** | sign in sheet 教师场景族（open house 头名 + template/printable 通用页 + PT conference/field trip/volunteer 变体） | ≈10.7K 合计/KD 4~31【实测 9/6】 | /sign-in-sheets/ hub + 4~5 页 | SERP 混合可打【实勘 9/6】：eForms #1 / Spreadsheet123 / InkPx / Visit-Us 独立站在排；visitor（办公人群）不做目标词 |
| 第三站候选池 | habit tracker printable（2.4K/KD30，成人 planner 人群漂出教师主题） | — | — | 双杀：量未过线 + 主题护栏；归未来 planner 站或第三站，10/17 后议 |
| **数学练习 island（成立）** | **mad minute 族 + worksheet generator 族**：mad minute math 480/KD18 + mad minute multiplication 480/KD17【实测 9/7】+ multiplication worksheet generator 480/KD15 + addition/subtraction worksheet generator 230【实测 9/7】，**合计 ≈1,670/月** 过 generator 族 500 合计线 | 乘法簇 island（挑运算/范围/题量 → 打印 mad-minute 题卡） | 【实勘 2026-09-07】`mad minute math printable` 前 5 = ①webmathminute.com **独立小 generator 站** ②SuperTeacher ③TPT ④EdHelper ⑤Rudolph Academy + Pinterest/Etsy 混排 —— DR0 能进的工具站形态✅；**10/25 批**（V1.7 同批，不挤 10/05） |
| 弃（实勘+实测） | 100以内混合加减 / 两位数乘除 worksheets 族（6 词全勘：long division 6.6K/KD35、double digit mult 2.9K/KD31、2-digit mult worksheets 1.9K/**KD18**、2-digit regrouping 1.3K/KD32、mixed 320、within 100 210）【实测 9/7】 | — | — | 【实勘 2026-09-07】前 5 全为 K5/Math-Drills/Math-Aids/HomeschoolMath/SuperTeacher/TPT（long division 单独补勘：K5 #1 + HomeschoolMath + Math-Drills + Dad's + Math-Aids）—— worksheets 后缀词 9K+ 量全判死，"需求大≠能做"；**KD18 的 2-digit mult worksheets = KD 过线 SERP 不过线第 2 实例**（第 1 例 physics KD24），KD 估计与实勘冲突时实勘赢；需求真实（Common Core 2.NBT.B.5/4.NBT.B.5 原文）但静态词死路 |

**单字母族 SERP 实勘（2026-09-05，google.com US 区，4 词抽样）**：

| 查询 | 前 5 实况 | 判定 |
|---|---|---|
| cursive capital f | ①MyCursive ②brush calligraphy 视频教程 ③**Reddit 帖** ④Superstar ⑤Facebook 视频 | 弱 ✅（UGC 占 3/5） |
| capital i in cursive | ①**Pinterest pin** ②**Reddit** ③YouTube Short ④SuryasCursive ⑤YouTube | 极弱 ✅，且 **Pinterest pin 能直接排 Google #1** —— 分发手册的 Pinterest 策略双重确认 |
| cursive b | ①MyCursive ②K5 ③**Quora** ④fancy-text 字体站（意图不符）⑤**Pinterest** | 弱 ✅ |
| cursive f worksheet | 前 7 = K5 / Superstar / BrightSprout / Itsy Bitsy Fun / SplashLearn / Canva / Teach Prints | **硬 ❌ —— worksheet 后缀词不打**：大厂垄断，我们页面里 FAQ 接住即可，不当目标词 |

> 结论：**名词型**（cursive X / capital X in cursive）SERP 全弱可打；**worksheet 修饰型**放弃竞争。剩下唯一未知 = 量（§3 #7 补测）。

## 3. 接下来要做（优先级排序）

| # | 任务 | 谁 | 验收标准 | 期限 |
|---|---|---|---|---|
| 1 | **Request indexing 5 个 URL**（今天推迟，明天做）：`/` `/place-value-chart/` `/cursive-alphabet/` `/cursive/f/` `/cursive/a/` | 👤 | GSC 逐个"已请求"（每天配额 ~10，勿超） | **2026-09-06** |
| 2 | Pinterest 分享包：26 字母页 + 4 大页的 pin 标题/描述文案（printables 赛道第二流量引擎） | Claude | 文案表落 PLAN 附录或独立文件 | 2026-09-06 |
| 3 | 目录站提交文案（照 tintbrew 模式：Uneed/Peerlist/AlternativeTo） | Claude+👤 | 首批 1~2 个提交成功 | 2026-09-08 |
| 4 | GSC 收录复查：`site:chartglade.com` 数 + 索引覆盖报告 | 👤 | 记录数字入本文档 | 2026-09-12 |
| 5 | **6 周长尾验收**（§6 决策点） | 👤+Claude | 变体词排名截图 | **2026-10-17** |
| 6 | V1.5 cursive worksheet generator（文本→可打印练习页，OFL 字体+print CSS+零登录） | Claude | 1 交互页 | 10 月，视 §6 结果 |
| 7 | ~~单字母族量补测~~ **✅ 完成（2026-09-06，提前 2 天）**：6 裸词均值 33,033 = 门槛 1K 的 33 倍 → 论点成立，矩阵转正 + 加码授权，数字记入 §2 | 👤 | — | 完成 |
| 8 | **V1.6 graph paper 簇**：/graph-paper/ hub + 静态变体页（1/4″、1/2″、1cm、5mm、dot grid、isometric —— 纯 print CSS 网格，零新引擎）+ 自定义 island（间距/线色/纸型 → `window.print()`），同簇吸收 graph paper generator/maker 710 长尾 | Claude | **✅ 预开发完成 2026-09-07（v1.6-predev 分支，hub+6 页+island，47 测试绿）**；上线 = 合并 main | **10/05 批次**（合并门 = 9/19 检查点收录正常） |
| 9 | **V1.6 name tracing generator**：输入名字 → Caveat 描红页 → print；SSR 预渲染默认示例名（无 JS 完整）+ WebApplication JSON-LD；同页吃 free name tracing generator / cursive name tracing | Claude | **✅ 预开发完成 2026-09-07（v1.6-predev 分支，SSR Emma + print/cursive 双样式）**；上线 = 合并 main | **10/05 批次**（与 #8 同批） |
| 10 | **V1.7 数学公式表 2 页**：/geometry-formula-sheet/（2.9K/KD23）+ /algebra-formula-sheet/（三变体并页 1.66K），公式表 = print CSS 表格 + 与数学簇互链 | Claude | 2 页上线，公式排版打印验证 | **10/25 批次**（与感恩节季节页同批） |
| 11 | **V1.8 sign in sheet 族**：/sign-in-sheets/ hub + /open-house-sign-in-sheet/（3.6K 头名）+ /sign-in-sheet/（template+printable 6.7K 教师角度通用页）+ PT conference / field trip 变体页；visitor/attendance 只做 FAQ 接住 | Claude | hub + 4~5 页，print 剥纸验证，测试全绿 | **2026-11 月批**（10 月批次已满）；家长会页赶 10~11 月 PT conference 季 |
| 12 | 对标站拆解：InkPx（name tracing #5 + sign in sheet #3 跨词族排名的纯打印站）+ Printabulls（合集页吃大词模式）——词池结构/页面形态/内链策略各出一份笔记 | Claude | 拆解笔记入 docs/chartglade/ | 2026-09 下旬（V1.6 开发前，给 hub 结构参考） |
| 13 | **字母矩阵加码**：cursiveLetters.ts 每字母补 "capital cursive X" 变体段（capitalSteps 字段已有，capital 变体词 3 个合计 17.6K：capital i 8.1K / capital f 6.6K / capital b 2.9K）；/cursive-alphabet/ 主页 SEO 措辞补 "cursive chart"（2.4K/KD21） | Claude | **✅ 预开发完成 2026-09-07（v1.6-predev：26 页标题/trace 措辞 + 主页 cursive chart FAQ）**；上线 = 合并 main | **10/05 批次**（V1.6 同批） |
| 14 | **数学练习生成器 island**（mad minute 族 960 + mult/add/sub worksheet generator 710，合计 ≈1,670/月【实测 9/7】）：挂乘法 chart 页，选运算/范围/题量 → 打印 mad-minute 计时题卡（30/60 题+答案行），SSR 预渲染默认一套 | Claude | island 上线 + 无 JS 可打印 + 测试绿 | **10/25 批次**（V1.7 同批顺手，不挤 10/05） |

**AITDK 拉数词表（#7 用，逐词查 US 月搜 + KD）**：

```
cursive f
cursive b
cursive a
cursive k
cursive z
cursive x
cursive capital f
capital i in cursive
cursive capital b
cursive chart
cursive letters a to z
cursive f worksheet
```

**补测后判定规则（拉完数字自动落位，不用再讨论）**：

| 6 个裸词（f/b/a/k/z/x）均值 | 结论 → 动作 |
|---|---|
| ≥1,000 US/月 | 论点成立 → 矩阵加码（每字母页补 "capital cursive X" 变体段），10/17 按原计划验收字母族 |
| 200~1,000 | 矩阵保留（已建零边际成本）但**不扩张**；10/17 验收主看 place value 变体 + 万圣节 |
| <200 | 空池 → 字母页只留 26 页躺页龄；主战场转向支柱变体页 + 季节页，§6 的 B 计划概率大增 |

## 4. 每日 / 每周例行

**每日（≤10 分钟，两站共用，tintbrew 见其 PLAN.md）**：

- [ ] GSC → 效果：有没有新冒头的查询词（2 分钟，**界面怎么点见根 README「每周数据检查 SOP」**）
- [ ] Cloudflare → Web Analytics：访问曲线（1 分钟）
- [ ] 新词/异动记到本文档 §2（不展开分析）
- [ ] **禁令（2026-09-06 立）**：不手动 google 搜自己的站 —— 自搜/自点污染 GSC 数据，国内直连非美区 SERP；看收录用 GSC「索引」→「页面」，看排名等周一例行

**每周（~30 分钟）**：

- [ ] 周一：`site:chartglade.com` 收录数 + GSC 索引覆盖 + 效果 28 天环比，记入本文档
- [ ] 周三：1 个分发动作 —— **详细步骤+现成文案见 [DISTRIBUTION.md](./DISTRIBUTION.md)**（Pinterest 每周 3~5 pin、目录站顺序表、Reddit 发帖模板全在里面）
- [ ] 周五：无批次在跑时保持不动（新站隔 3~4 周上批次，别一次堆页）

## 5. 远期规划

1. **V1.5** worksheet generator 交互工具页（cursive 文本→练习页；MyCursive 已验证此形态在 worksheet 意图下有排名）
2. **矩阵扩容候选**（按验收结果挑）：multiplication 1-100 等变体页 / sight words 按年级细分裂变页 / alphabet chart 场景变体
3. **季节窗（排期唯一依据 = 美国校历，准则见根 [CLAUDE.md](../../CLAUDE.md)「美国日历准则」+ 下方 §5.1 日历表）**：printables 赛道季节词是大流量脉冲，每个节点**提前 4~6 周上线**（Google 收录+爬排名要时间）。候选池（节点前 1 个月拉量筛选定稿）：halloween word search / halloween coloring math facts / thanksgiving gratitude tree / thankful ABC list / halloween cursive practice（复用字母矩阵架构）/ pumpkin math chart
4. **外链与分发**：Pinterest 常态化（每周 pin）、教师社区（r/Teachers r/homeschool，先读版规）、TPT 形态研究（商城不做，引流可）
5. **变现**：~300 访问/天 → 接广告
6. **第二曲线**（本仓第三个站候选）：excel shortcuts / sql cheat sheet 等高 CPC 打印工具 —— chartglade 验收数据出来后再定
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
- GSC sitemap 输入框自带域名前缀，只填 `sitemap-index.xml`
- 加图表页 = `src/data/*.ts` 加 PageDef + find-by-slug wrapper（Footer/hub 自动带出）；**字母级矩阵走动态路由** `pages/cursive/[letter].astro`
- Dolch 220 逐字 / Fry first 100（含 #49 their）在 `src/lib/sightWords.ts` —— 改动必跑测试
- 字体仅 cursive 页按需加载（Dancing Script + Caveat woff2 自托管）；name-tracing 页另有 Patrick Hand woff2（print 样式），graph paper 引擎在 `lib/graphPaper.ts`（1/100in 单位，改间距只动 GRAPH_PAPER_VARIANTS）
