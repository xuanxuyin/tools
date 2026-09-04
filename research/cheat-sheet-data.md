# Cheat Sheet 赛道调研数据（2026-09-04）

数据来源：Semrush 免费关键词概览 + Ahrefs 免费 SERP 分析（美国区 / 桌面）。原始截图在 `research/cheat-sheet/`（10 张，已 gitignore）。
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
