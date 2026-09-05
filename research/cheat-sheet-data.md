# Cheat Sheet 赛道调研数据（2026-09-04）

数据来源：Semrush 免费关键词概览 + Ahrefs 免费 SERP 分析（美国区 / 桌面）。原始截图在 `research/cheat-sheet/`（16 张，已 gitignore：5 个代表词 10 张 + K-5 终审 6 张）。
KD 口径：Semrush KD%（0–100）。这是第二个项目的选品调研，门槛规则见根 README 第 0 步。

## 五个代表词记分板

| 赛道 | 关键词 | KD | US 量/月 | 全球量 | CPC | 词族规模 | AI Overview |
|---|---|---|---|---|---|---|---|
| 学生 | python cheat sheet | 27 | 3.6K | 18.1K | $2.38 | 1,431 词 | ✅ 有 |
| 开发 | git cheat sheet | 43 | 2.4K | 16.1K | $2.63 | 405 词 | ❌ 无 |
| 办公 | excel cheat sheet | 46 | 4.4K | 8.7K | $0.67 | 1,279 词 / 147.5K | ✅ 有 + 精选摘要 |
| AI | chatgpt prompts cheat sheet | 30 | **70** | 170 | **$22.69** | 22 词 / 600 | ❌ 无 |
| 新工具 | tailwind cheat sheet | **24 (Easy)** | 880 | 3.8K | $0 | 24 词 / 1.7K | ❌ 无 |

## 各词详情

### python（学生轨）KD 27 · US 3.6K · CPC $2.38
- 词族：programming 1.0K/27 · pdf 720/27 · syntax 720/32 · regex 480/21
- SERP 弱位 4–5 个：uta.edu 课程 PDF(#3)、valdosta.edu 课程 PDF(#5)、ehmattes.github.io(#6)、mosh CDN 裸 PDF(#10)、reddit 帖(#1)
- 硬位：realpython(#2)；quickref.me(#7) = 交互式形态能排的证明
- 风险：AI Overview + 论坛 + 视频三重分流；季节尖峰 4/5 月、12 月（期末）
- **判定：考试季红利盘。可做，不当主入口。12 月就在眼前，页面须 10–11 月上线**

### git（开发轨）KD 43 · US 2.4K · CPC $2.63
- 词族亮点：**git commands cheat sheet 12.1K/KD34**（量 = 头部词 5 倍、难度更低）
- SERP：github education(#1)、git-scm(#2)、atlassian(#4) 三巨头压顶；**同一 msoe.edu PDF 排 #7 和 #9 两次 = 供给枯竭**；4 个大学 PDF 弱位
- 无 AI Overview（五个词里 CTR 分流最少之一）
- **判定：头词 KD 43 不碰；git commands 12.1K 值得立刻建页长期磨（最长的仗，页龄越早攒越好）**

### excel（办公轨）KD 46 · US 4.4K（占全球一半，受众最美国化）· CPC $0.67
- 词族巨肥：**shortcuts 110K/38** · formulas 3.6K/30 · functions 3.6K/37 · formula 1.9K/22
- SERP 最拥挤：AI Overview + 精选摘要 + 图片包 + 双视频 + 论坛（六重分流）；微软官方 PDF(#1)、customguide(#2 专卖 cheat sheet 的竞品)
- 但 **Instagram 账号排 #7** = Google 供给不足信号；CPC $0.67 = 办公室受众 RPM 偏低
- **判定：子词（formula 22 / formulas 30 / functions 37）进首批；头词与 110K shortcuts 当 12 个月天花板**

### chatgpt prompts（AI 轨）KD 30 · US 70 · CPC $22.69
- **量极小（全球 170，全族 600）——"AI 轨当入口"的假设被数据否掉**
- 但 SERP 是五个词里最烂的：CUNY openlab PDF（AS 0、1 条反链）排 #2；#4/#9 LinkedIn 帖、#8 Facebook 群全是 AS 0；只有 github(#6, AS59) 一个真强页
- CPC $22.69 = 全场最高单次点击商业价值；无 AI Overview
- **判定：不当入口。作为"权威种子页"早上车——需求若随 AI 普及起量，先发优势极大；成本只是一页**

### tailwind（新工具轨）KD 24 Easy · US 880 · CPC $0
- 词族：tailwind css 480/16 · **v4 50/KD5** · v4 变体 40/20；聚类面板提示 css cheat sheet 族（未测，建站前补测）
- SERP：nerdcave(#1, AS64/429 反链 = 堡垒抢不动)、creative-tim(#2, AS59) 之后，**#5 flyonui、#7 github 讨论、#8 skillademia、#10 daily.dev 全是 AS 0 零反链页；#3 reddit 帖 0 权重却带 108 月流量**
- 无 AI Overview；开发者全年搜，季节性平
- **判定：最佳入口词——KD Easy + SERP 中段 5 个零权重页 + v4 新版本词近乎无防守（老竞品全是 v3 时代内容）**

## 总判定：立项（入口换轨）

原定生死线"AI/office KD ≤ 30 且平流池 ≥ 40K PV/月"**按字面两条都没全过**：AI 轨量死（170/月），office 头词 KD 46。但调研中冒出第三条路——**开发轨**，它才是真正的门：

| 优先级 | 轨道 | 角色 | 关键词 |
|---|---|---|---|
| 1 入口 | 开发工具 | KD 5–34、SERP 弱、季节平、CPC 高 | tailwind(24) / tailwind v4(5) / git commands(12.1K, 34) |
| 2 量池 | 办公子词 | 最大奖池，美国受众 | excel formula(22) / formulas(30) / functions(37)，shortcuts 110K 当天花板 |
| 3 红利 | 学生 | 考试季尖峰（12 月、4/5 月） | python(27) / regex(21) / syntax(32) |
| 4 种子 | AI | CPC $22.69，赌需求增长 | chatgpt prompts(30) |

- 可直吃 US 池（KD≤35）≈ 16K/月；乘词族长尾（python 1,431 + excel 1,279 词）× 2–3、全球 × 2 → 理论 60–90K，12 个月现实目标 20–40K PV/月
- 变现：混合受众 RPM 估 $8–12；30–50K PV ≈ $300–600/月；吃下 shortcuts/commands 后上探 $500–1000

## 产品形态（全部由 SERP 证据反推）

1. **单品牌多主题站**（quickref.me 模式——它同时出现在 python #7 和 chatgpt #3，权威跨主题复用）
2. **交互式速查 + 打印/PDF 友好**（pdf 变体贯穿所有词族；python SERP 前 10 里 4 个就是 PDF 文件；print CSS 成本≈0）
3. **SSR 无 JS 也完整**（SEO 底线，tintbrew 同款架构）
4. **版本化 URL 吃版本词**（/tailwind/v4/ 等，见下方护城河）
5. **不接 AI agent**：纯静态速查，零 API 成本、零正确性风险、零 ToS 风险

## 护城河：版本新鲜度

tailwind v4 cheat sheet KD 5，而前排竞品内容停留在 v3；一条 0 反链的 reddit 帖仅因"updated for v4.1"就排到 #3 并带走 108 月流量——**这个利基里新鲜度打得过域名权重**。每个 dev 工具版本更新都会再造一批 KD<20 新词（react 19、next 15、vue 4…），大学 PDF 和停更博客永远跟不上。这是可持续的内容机器，也是新站对老站的唯一系统性优势。

## 首批页面（约 20 页，方向确认后执行）

| 波次 | 页面 | 目标词（KD） |
|---|---|---|
| W1 入口 | tailwind cheat sheet（v4 原生，一页吃 tailwind/css/v4 三变体） | 24/16/5 |
| W1 入口 | git commands cheat sheet | 12.1K/34 |
| W1 入口 | css cheat sheet（建站前补测词族） | 待测 |
| W2 办公 | excel formulas（一页吃 formula/formulas 两变体） | 1.9K/22 + 3.6K/30 |
| W2 办公 | excel functions cheat sheet | 3.6K/37 |
| W3 学生 | python cheat sheet（支柱页） | 3.6K/27 |
| W3 学生 | python regex cheat sheet | 480/21 |
| W4 种子 | chatgpt prompts cheat sheet | 70/30（量小，赌增长） |

## 下一步

1. 用户确认方向 → 2. 域名候选（单品牌、覆盖全主题、Spaceship 买）→ 3. 复用 tintbrew 的 Astro 架构建站 → 4. 先上 W1 入口轨

---

## K-5 打印件轨补测（2026-09-05 · 12 词批量，Semrush 美区）

背景：用户提出"从幼儿园到大学"定位 → 按仓库铁律先补测 K-5 段。数据推翻"死轨"预期：**12 词毛量池 ≈ 98.6K US/月**（全场最大单簇；对比四轨 KD≤35 直吃池 16K），趋势列全为 I（开学季爬坡）。结构性短板不变：无版本新鲜度机器 · CPC 均值 ~$0.66（≈excel 水平）· 季节尖峰 8~10 月。

### 记分板

| 词 | US 量/月 | KD | CPC | 判定 |
|---|---|---|---|---|
| kindergarten sight words | 12,100 | 25 | **$1.50** | ✅ 过 KD 线（CPC 全场最高 = 老师受众有广告价值） |
| fraction chart | 9,900 | 23 | $0.74 | ✅ 过 KD 线 |
| number line printable | 1,600 | 20 | $0.44 | ✅ 过 KD 线 |
| addition chart | 1,300 | 21 | $0.93 | ✅ 过 KD 线 |
| shape chart | 590 | 19 | — | ✅ 过 KD 线（量小，簇内顺手） |
| **place value chart** | **27,100** | 29 | $0.78 | ✅ **SERP 终审过**（2026-09-05，头词族 104.7K，见下节） |
| multiplication chart (printable) | 12,100 | 32 | $0.62 | ✅ **SERP 终审过**（2026-09-05，词族 58.2K） |
| dolch sight words | 9,900 | 29 | $0.70 | ⬇️ 降级：sightwords.com（AS61）主场词，收进 kindergarten 页对照段 |
| hundred chart | 3,600 | 30 | $0.19 | 顺手页（数学阶梯簇内，不再单测） |
| sight words list | 1,900 | 32 | $0.32 | 并入 kindergarten/dolch 页 FAQ |
| states and capitals printable | 390 | 32 | $0.89 | 顺手页（量小） |
| times table chart | 18,100 | 35 | $0.61 | ❌ 出局（最商品化的头词，防守最重） |

过线池 ≈ 25.5K/月 + 终审新增 place value/multiplication 两词 ≈ **39.2K/月**（余 4 词降级/收编）。终审记录见下方「SERP 终审」节。

### 簇结构（tintbrew 矩阵同款打法）

1. **数学图表阶梯**：place value → hundred → number line → addition → fraction → multiplication（K~5 年级一条线）；一页模板（交互图表 + 打印 CSS + 变体：1-15 / 1-20 / blank）× 6+ 页互链成环
2. **Sight words 族**：kindergarten / dolch / list + fry 变体（未测），词表页天然程序化（年级 × 列表类型）

### 定位判定

- "从幼儿园到大学"作为**品牌定位**仍然否掉（受众断层、稀释 topical authority、= inclusivelearn 反面教材——它就是"字母表到线性代数"的散弹枪，17 个月才第 5 页）；但 K-5 **簇**按数据进站
- 排期：**W5**（开发轨/办公/学生/种子先走）。K-5 页 2026 底~2027 初建好，养页龄过冬春，**专吃 2027-08/09 开学季**（今年窗口已在身后）；高中~大学段由 python/公式页覆盖，年龄线靠簇拼齐，不靠品牌跨度讲故事
- 品牌名按原计划选中性宽品牌（quickref.me 模式），不被 K-5 绑架
### SERP 终审（2026-09-05 · 3 词全过，K-5 轨定稿为 W5）

| 词 | SERP 关键证据 | 终审 |
|---|---|---|
| place value chart 27.1K/29 | **#1 是裸 PDF 文件**（acentral.education，AS6/1 引荐域/2 反链，1.0K 流量）；#2 TPT 商城搜索页 AS0；#3 Facebook 视频；#6 teachingwithkaylee **AS0 拿 733 流量**；#8 thethinkacademy **AS0 拿 643**；#9 Pinterest 图钉；前 10 页面 AS 全部 ≤24 | ✅ KD 高估实锤 |
| multiplication chart printable 12.1K/32 | **#4 goodandbeautiful：1 引荐域/1 反链，月流量 17.4K**（单反链页吃 17K = 相关性+格式打得过权重，全组最硬证据）；#3 TPT AS0 拿 1.4K；#5 CAASPP 官方 PDF（AS10）/#8 alberta.ca PDF（AS18）；#10 superstar AS13。头位 mometrix AS36 拿 55.9K = 页面天花板参照 | ✅ KD 高估实锤 |
| kindergarten sight words 12.1K/25 | #1 abcmouse 仅 AS17/5 引荐域（6.4K 流量）；**#2 goodandbeautiful AS0 零反链**；#3/#6 两条 YouTube；#4 TPT AS0；#7 thesixshifts AS6 单反链 705 流量；#8/#10 零反链 PDF ×2；唯一堡垒 sightwords.com AS61/197 域只在 **#5** | ✅ 确认 |

三 SERP 共同形态：视频/Pinterest/TPT 商城页占坑 + 真 PDF 文件裸奔上榜（5 处排进前 10）+ AS0 页面拿真实流量——与 brown 头词同剧本，**KD 全部虚标 10 分以上**。

**词族奖池（比预估大一档）**：place value 族 3.6K 变体/**104.7K**（decimal 6.6K/32 · with decimals 3.6K/29 · anchor chart 2.4K/21）· sight words 族 3,678 变体/**105.9K**（for kindergarten 12.1K/25 · word list 2.4K/23；问题词 110 条，teach 类 KD 8~18）· multiplication 族 956 变体/**58.2K**（printable 反序词 9.9K/29 · free printable 词群 2.4~2.9K/27~29）。三族 ~270K，与 excel shortcuts 族（110K）同量级偏上，是全项目已知最大词族板块。

**结构洞察：printable 意图天然抗 AI Overview**。place value 与 kindergarten 两词都有 AIO + 图片包，排名页照样拿 6~17K 流量——用户要的不是答案是**能打印的文件**，AI 给不出 PDF（与 tintbrew「可动手 mixer 抗 AIO」同款护城河逻辑）。5 个真 PDF 排前 10 = 「页面即打印件」形态被反复验证（SSR 页 + print CSS 零成本达成）。

**观察区剩余词处置**：dolch 降级（sightwords.com 主场）；hundred/sight words list/states 不再单测，按簇内顺手页/FAQ 收编。

### W5 页面规划（~15-20 页，2026 底~2027 初建，养页龄吃 2027-08/09 开学季）

1. **Place value 簇（4 页）**：主图表页（交互位值高亮）· decimals 版（6.6K+3.6K 变体）· anchor chart 版（2.4K，老师墙面场景）· printable 变体汇总
2. **Multiplication 簇（3 页）**：主打印页（吃 printable/free printable 词群）· blank 练习版 · 1-15/1-20 扩展版
3. **Sight words 年级阶梯（6-8 页）**：kindergarten 主页（$1.50 CPC 全场最高）+ preschool → 1st → 2nd → 3rd grade 矩阵 + dolch/fry 对照段（年级 × 列表 = tintbrew /mix/ 同款程序化打法，Semrush 聚类树直接给出该结构）
4. **散页（4-5 页）**：fraction chart · hundred chart · number line · addition chart（+shape chart 顺手）

### 真实 SERP 复核（2026-09-05 · 9 词 google.com 美区第一页实测；用户新硬门槛：头词 US ≥1 万/月）

起因：用户批评"分析太简单，该去 Google 逐词看前排是什么" + 立门槛"流量至少月上万"。方法：WebSearch（美区源）逐词拉第一页（工具只见 ~10 条/页，看不到 11-100 名；量仍以 Semrush 为准）。

| 词 | 第一页实际构成 | 空子 | 复核判定 |
|---|---|---|---|
| place value chart 27.1K/29 | TPT 商城搜索页（要登录下载）+ 教师博客 + 出版社博客；Ahrefs 佐证 #1 裸 PDF、全页 AS≤24、零交互页 | ① 前排无任何交互工具页 ② TPT 要登录 → 即打即印直接赢 ③ decimal 6.6K / anchor 2.4K 变体无专页 | ✅ **全项目最软的万级词，头号支柱** |
| kindergarten sight words 12.1K/25 | 课程公司博客（goodandbeautiful AS0 #2）+ 识字专家博客 + 2×YouTube；abcmouse 仅 AS17、2 个零反链 PDF | ① 年级阶梯仅 2 个小博客在做 ② 词表+可打印闪卡+练习三合一无人做 | ✅ 支柱 |
| multiplication chart printable 12.1K/32 | 全是打印件专业户：mometrix / dadsworksheets / math-salamanders / suncatcher / inkpx / canva | 无产品级空子（交付物就是 PDF 本身）；只能拼变体新鲜度（1-15/1-20/blank）+ 免下载即打；goodandbeautiful 单反链 #4 拿 17.4K = 中位可进 | ⚠️ 支柱，预期第 4~10 位 |
| times table chart 18.1K/35 | timestables.com / dadsworksheets / math-salamanders / twinkl / mathsisfun——同一批专业户 | 无 | ❌ 维持出局 |
| multiplication worksheets（量未拉） | canva / education.com / commoncoresheets / superteacher / multiplication.com / prodigy 全是 DR80+ 巨头库站 | 无 | ❌ **worksheets 类词划为禁区**（数学阶梯只做 chart 词，不碰 worksheet 词） |
| git commands cheat sheet 12.1K/34 | github education PDF #1 · git-scm 官方 #2 · atlassian #3 · dev.to · coursera | 头词无空子（官方三连）；空子在长尾 how-to 变体（undo commit / discard changes 类，reddit/SO 在排） | ⚠️ **KD 34 这次没高估**。建页维持（养页龄），预期改第 2 页起步 + 长尾变体先起量 |
| excel shortcuts（族 110K） | 微软官方 #1 · **ExcelJet #2（244 条 Win/Mac 对照 + 免费 PDF = 我们的设想产品已存在且成熟）** · 大学 PDF · keychron 博客 · linkedin 帖 · reddit 帖 | 头词无空子；仅子词散兵位（pdf / mac / 具体函数页） | ⚠️ 族目标，子词渗透，头词当 12 个月天花板 |
| css cheat sheet（量未测） | htmlcheatsheet.com #1（"Interactive, not a PDF"）· geeksforgeeks · github repo · coddy · codecademy | 中等，无独占空子 | 待 Semrush 拉量再定 |
| sight words（裸头词，量未测） | sightwords.com #1（精确匹配域 = 堡垒本体）· 机构站 ×2 · 做年级阶梯的小博客 ×2 | 裸头词别碰；年级阶梯可复制可打 | 打法不变：只做年级页 |

**结论修正（推翻前两天三处判定）**：
1. 门槛"头词 US ≥1 万"立起后，合格支柱池 = place value 27.1K · kindergarten sight words 12.1K · multiplication printable 12.1K（中危）· times table ❌ · git commands ⚠️ 官方墙 · excel 族 ⚠️ —— **真正可赢的支柱集中在 K-5**；tailwind 880 / python 3.6K / excel formulas 3.6K 等全部降为簇内支撑页，不再当"入口"讲故事
2. git commands"值得立刻建页长期磨"维持建页但预期砍半（官方三连钉死 1~3 位）
3. 站点叙事从"dev 入口的速查表站"修正为"**K-5 打印件为主干、dev/office/student 为侧翼**"（域名仍选中性宽品牌，两者兼容；W5 的季节排期逻辑不变——K-5 页 2026 底建，吃 2027-08/09 开学季）

**待用户 Semrush 批量补拉（≥1 万候选系统性枚举，防 brown 式漏头词；拉完逐个实勘 SERP）**：
K-5：number chart 1 100 · cursive alphabet · alphabet chart · roman numerals chart · periodic table printable · fry sight words · place value（裸）· states and capitals quiz
办公/开发：windows keyboard shortcuts · mac keyboard shortcuts · google sheets formulas · sql cheat sheet · javascript cheat sheet · vscode shortcuts

### 14 词批量结果 + 万级词终审（2026-09-05 · Semrush 美区 + 实勘）

| 词 | US 量/月 | KD | CPC | 终审 |
|---|---|---|---|---|
| **cursive alphabet** | **201,000** | 43 | $0.32 | ⚠️ **全组合量王**（= brown 的 4 倍）。实勘（带修饰词）：K5 Learning + Superstar worksheets 巨头 + **mycursive.com / suryascursive.com 两个 cursive 专科站** + canva/TPT/Pinterest/Etsy。头词硬（KD 43 属实，专科站+巨头在位），按磨页处理；但 201K 体量第 4~10 位 = 2~6K 访问/月，簇价值经变体兑现（chart · 大写/小写 · D'Nealian/Zaner-Bloser 样式词）。裸词 SERP 建议 Ahrefs 复核一次再终定 |
| roman numerals chart | 49,500 | 64 | $0.48 | ❌ RapidTables + Wikipedia + Britannica + DadsWorksheets 一字排开，KD 64 属实，死 |
| place value（裸） | 14,800 | 35 | $0.56 | 并入 place value 簇：chart 27.1K 主词 + 裸词 14.8K 同一页吃 |
| states and capitals quiz | 12,100 | 48 | $0.84 | ❌ Britannica / Seterra / Sporcle / Sheppard 全是交互 quiz 巨头——产品即 SERP，死（printable 变体仅 390） |
| periodic table printable | 9,900 | 50 | $1.00 | ❌ 不过量线 + KD 50 |
| alphabet chart | 6,600 | 15 | $0.34 | ✅ 支撑页（KD 15 全批次最软，配 cursive/ABC 簇） |
| mac / windows keyboard shortcuts | 6,600 / 4,400 | 48 / 48 | — | ❌ 不过线 + 官方文档墙（apple.com / microsoft.com） |
| google sheets formulas | 4,400 | 27 | $2.72 | 支撑页（CPC 高，办公簇） |
| sql cheat sheet | 3,600 | 28 | $2.44 | 支撑页（CPC 高，开发簇） |
| fry sight words | 2,900 | 35 | $0.87 | 支撑页（sight words 阶梯的列表维度） |
| number chart 1 100 | 880 | 37 | — | 死词（预感 2 万+ 落空；本簇词是 hundred chart 3.6K） |
| vscode shortcuts | 880 | 56 | — | ❌ 死 |
| javascript cheat sheet | 590 | 35 | $3.93 | ❌ 量太小（CPC 倒是全表最高） |

**支柱池终稿**（门槛：US ≥1 万 + SERP 实勘过）：
1. **place value chart 27.1K**——已实勘，全项目最软万级词，头号支柱
2. **kindergarten sight words 12.1K**——已实勘
3. **multiplication chart printable 12.1K**——中危（专业户在位，预期 4~10 位）
4. **cursive alphabet 201K**——量王硬骨，磨页 + 变体群兑现（簇内 alphabet chart 6.6K/15 顺手带走）

死词增补：roman numerals · states quiz · periodic table · vscode · javascript · number chart。
**开发/办公轨终局**：万级头词全灭（git 官方墙 · excel ExcelJet · 键盘词官方墙 · js 590），只剩高 CPC 支撑页（google sheets 4.4K/$2.72 · sql 3.6K/$2.44，CPC 是 K-5 词的 3~8 倍）——降为 RPM 调剂侧翼，"dev 入口"叙事正式作废。
**站点定位定稿**：K-5 打印件主干（charts 数学阶梯 + sight words 词表阶梯 + cursive 三簇）+ 高 CPC 办公/开发支撑 + 学生轨季节页（python 12 月窗口照旧）。
