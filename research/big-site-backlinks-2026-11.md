# 大站外链结构拆解（2026-11-08）

> 触发：👤 "你提供的外链太弱了，分析一下大站用的是什么外链，看看我们能不能操作"。
> 方法：本轮为**定性实勘**（WebSearch 生态映射，对象 = 我们 SERP 上的真实在位者）；**定量确认（精确引用域列表/权重）依赖 👤 SEMrush/Ahrefs 拉数**，分工同 11/03 perlerbeadpatterns 先例（👤 拉 → 🤖 分拣）。局限：WebSearch 看不到引用域全量，只看到"浮出水面的提及"——所以本文结论全是【实勘】级的形态判断，量化排序等拉数。
> 前档：[incumbent-teardown-2026-10.md](./incumbent-teardown-2026-10.md)（SERP/内容/sitemap 层）、tintbrew PLAN 11/03 行（垃圾链拆解 + §7 六通道）。

---

## 一、四个在位者的链接模型（实勘 11/08）

### A. trycolors.com —— 工具站 · 兴趣社区模型

链接来源实证：
- **r/minipainting 官方 Wiki**（Color Matching 指南页把 www.trycolors.com 列为推荐资源）【实勘】—— subreddit wiki 是永久位，非一次性帖子
- Reddit 自然提及成片：r/minipainting "App that let's you mix paints digitally?"、r/ArtistLounge "Who is actually using online color mixers"、r/BeAmazed 等，语气全是用户自发推荐【实勘】
- Pinterest "21 Color Games" 类收藏板【实勘】
- 艺术教程博客引用（tertiary colors 教程等）【实勘】

支撑这套链接的**产品面**（关键）：真漆品牌库（Vallejo 等）/ Repaint 工具（照片取色→油漆配方）/ 挑战赛（游戏化）/ **embeddable widgets**——有独立产品页 /product/widgets + iframe 安装 + API 文档（docs.trycolors.com，2025-07 更新），把混色器做成别人网站可嵌入的部件【实勘】。e-commerce "Unmixer" widget 直接面向电商。

**模型总结**：社区权威位（wiki）× 可嵌入资产 × 兴趣人群（微缩模型涂装）三轮驱动。链接不是"换"来的，是产品长出了被社区引用的器官。

### B. colorkit.co / colordesigner.io —— 工具站 · 设计圈清单模型

链接来源实证：
- **设计工具 roundup 博客**：eagle.cool "48+ Best Color Tools for Designers"（收了 colorkit.io）、logodesign.net "Best Color Tools You Need to Try Today!"（ColorKit 列 #27）、UI/UX 设计资源清单【实勘】
- **软件评测/对比站**：Axiobench "Best Color Palette Software 2026 Edition" 给 colordesigner.io 打 6.1/10 独立评测位【实勘】——评测站是独立的一类链接源，不是博客随手一提
- 室内设计博客在"混搭家具"文里引 ColorKit 调色器【实勘】——长尾场景引用
- **学术引用**：IRC-SET 2022 会议论文引 colordesigner 渐变生成器做地图配色工具【实勘】
- App Store / Google Play 应用页（ColorKit – Palette & Picker 双端上架）【实勘】

**模型总结**：挤进"设计工具清单"生态（博客清单 + 评测站）+ 多端分发（app 商店页自身也是高权重引用域）。

### C. K5 Learning —— 教育站 · 教师媒体模型

链接来源实证：
- **教师媒体 roundup**：WeAreTeachers "95 Best Math Websites for Teaching and Learning in 2026"（K5 在榜）【实勘】；activityxpress "9 Best Free Printable Worksheet Sites for Teachers"（K5、Math-Drills、Common Core Sheets、HomeschoolMath 同榜）【实勘】；"Top 10 Teacher Websites" 类清单多篇【实勘】
- **homeschool freebie 聚合站**：homeschoolingwithfreebies.com 有 K5 专页推荐【实勘】
- r/Teachers 社区推荐（"Where can I get free worksheets for my class?" 帖里 TPT/Easy Teacher Worksheets/Education.com 并列）【实勘】
- Pinterest 收藏板【实勘】

**模型总结**：教师媒体的**年度清单文章**是教育站链接的主形态（每年更新，进一次吃一年）；freebie 聚合站是低门槛补充。Superstar Worksheets 同生态（"best free math worksheet" 类清单常客）。

### D. Wikipedia —— 反例（不可操作）

en.wikipedia Color mixing 词条**唯一引用源** = David Briggs "The Dimensions of Colour"（美术教师办的色彩教学站）【实勘 11/08 webReader】。Wikipedia 不收工具站，除非先发表有编辑价值的原创内容（学术/出版物级）。排除此通道。

---

## 二、共同规律：大站外链 = 「清单经济」+ 社区权威位

四个模型收敛成一句话：**大站的链接基本盘是"被别人维护的清单收编"**——设计工具清单 / 教师网站清单 / homeschool freebies 清单 / 评测站榜单，加上社区里的常驻位（subreddit wiki、置顶）。roundup 不是众多通道之一，它**就是**这个利基的链接生态主形态。

对现有通道的含义（对照 tintbrew PLAN §7 六通道）：
- **F 组 roundup 升级为绝对主通道**，但目标池要从"craft mom 博客"扩成四个池：①教师媒体清单（chartglade）②homeschool freebie 聚合（chartglade）③设计工具清单（tintbrew）④评测/对比站（tintbrew）
- **目录站 / Product Hunt / GitHub / Quora = 弱通道定案**（本轮分析的结论支持 👤 的判断）：它们不在任何大站的链接基本盘里
- **Reddit 通道升级目标**：从"发帖"升到"进 wiki/资源页"（r/minipainting wiki 模式）

---

## 三、可操作通道（按 ROI 排序）

### 1. Freebie 聚合站提交（chartglade · 最低门槛，本周可做）【实勘入口】
- **howtohomeschoolforfree.com**：有公开 **"Submit a Freebie" 表单**（howtohomeschoolforfree.com/submit-a-homeschooling-freebie）——填表即提交，这类站的存在意义就是罗列免费资源，接受率天花板【实勘 11/08】
- **freehomeschooldeals.com**：公开接受 guest posts【实勘 11/08】
- homeschoolingwithfreebies.com 等同型站（Facebook freebie 互换群也是分发位，非链接）
- 动作：以 /place-value-chart-printable/、/multiplication-chart-printable/ 等页面为提交物；文案模板 Claude 出

### 2. 教师媒体清单 pitch（chartglade · 中门槛，长收益）【实勘目标】
- **WeAreTeachers**：公开收稿——kelly@weareteachers.com，收 pitch（标题+2~3 句）或全稿，500~700 词，**付稿费**【实勘 11/08】。角度不是广告文：写"课堂免费资源"类实用文（如 5 个免费 printable 图表主题），自然引用自家页。风险：教育媒体对商业站链接谨慎，可能不给链或 nofollow——按"品牌+流量为主、链接为彩票"预期
- activityxpress 级小清单站：直接 pitch 收录（"你榜单里的死链/缺位我们补上"角度）
- Edutopia guest blog（GUESTBLOG@edutopia.org）同池更高门槛【实勘 11/08】

### 3. 设计工具清单 pitch（tintbrew · 中门槛）【实勘目标】
- eagle.cool / logodesign.net 型 roundup（ColorKit 就在这些清单里）：pitch "你清单里没有'simulates real paint mixing by recipe'这一类"——我们的差异位是 Oklab 现算 + 配方式输出
- Axiobench 型评测站：查提交/建议入口后 pitch 独立评测位【待勘：提交方式】

### 4. 嵌入式小组件（tintbrew 主推 · 工程批，被动获链）【实勘模式】
- trycolors 的 /product/widgets 实证这是行业玩法【实勘】。做法：/embed/ 独立 iframe 版混色器 + "embed this mixer" 代码段页面；**归因链接放 iframe 外**（让站长粘的代码自带 `Powered by TintBrew` 的 `<a>`——iframe 内链接的归属权有歧义，iframe 外归因才是干净的外链）
- 目标嵌入方：烘焙博客（frosting 色卡场景）、艺术课/教师站、手作博客
- chartglade 变体："embed this chart on your class website"（教师班级网站贴图表图+归因）——教师班级页是真实存在且常年不死的引用源【推断】
- 工程量：中（1~2 个 batch），收益模型被动持续

### 5. 死链替换 / broken-link building（双站通用 · 数据依赖 👤）【实勘方法】
- 10/04 曾实勘到 artsyfartsymama 乘法图表页 404 死链排 SERP #3——**11/08 复核该 URL 已 200 复活**【实测 curl】，该单一入口作废
- 正确路径：SEMrush/Ahrefs 对 SERP 在位者跑 **Backlinks → 过滤 status=broken / target=404**，拿"还链着死页"的引用域清单 → 逐个 pitch 换成我们对应页。10/04 快照里 "multiplication chart printable 前 5 中 4 个非内容站" 说明这个 SERP 生态位陈旧、死链概率高【推断】
- 这是替换率最高的 pitch 类型（帮人修坏链，人情成本低）

### 6. Reddit 升级：目标从发帖改占位（双站通用）
- r/minipainting wiki 模式【实勘】：每个兴趣社区都有官方 wiki/资源页/置顶——r/PerlerBeads wiki、r/Baking 相关资源帖、r/Teachers 常见问题帖。养号阶段就盯着这些**常驻位**，能进 wiki 一条 = 常驻链接
- tintbrew 的社区 angle：烘焙上色（frosting/icing 调色）是我们的专属生态位，trycolors 占的是模型涂装位，不冲突【推断】

### 7. 记者请求平台（双站通用 · 零成本数字 PR）【推断，未实勘入口】
- HARO 已死，接棒者 Featured / Qwoted / SourceBottle 免费档：答记者问题换新闻站引用。教育/色彩/手作主题的评论角度都可挂。时间成本中等，命中率低但链接质量高（DR50+ 新闻域）。列为试验通道，11/17 对账后定去留

---

## 四、不可操作清单（诚实边界）

| 大站拥有 | 为什么不可操作 |
|---|---|
| 学术引用（colordesigner 被会议论文引） | 需要真学术价值，工具站刷不出来 |
| Wikipedia 引用 | Color mixing 词条只收专家内容（Briggs 教学站）；先有出版物级原创才可能 |
| 新闻媒体自然报道（education.com 级） | 需 PR 预算或真实 news 事件；记者平台是唯一免费替代 |
| App Store 双端页（ColorKit） | 建 app 超预算，止损纪律内不做 |
| 十年积累的 editorial 存量 | 时间不可压缩；但**每一家当年都是从 roundup pitch 起步的**，这条起步路径可复制 |

---

## 五、👤 拉数清单（SEMrush/Ahrefs，定量确认用）

| 序 | 域 | 拉什么 | 验证什么 |
|---|---|---|---|
| 1 | k5learning.com | Referring Domains top 50（按 authority 排） | 教师媒体模型占比（WeAreTeachers 类清单应占大头） |
| 2 | trycolors.com | Referring Domains top 50 | 社区模型占比（reddit/pinterest/博客）；embed 是否产生引用域 |
| 3 | colorkit.co | Referring Domains top 30 | 设计清单模型占比；找我们也能 pitch 的清单站全名单 |
| 4 | 按词圈定的在位域（见下表） | **死页报告**：Ahrefs = Pages → Best by broken backlinks（一次给"死 URL+引用它谁"）；SEMrush = Domain → Pages → 过滤 404/error + 带 backlink 的 | 死链替换目标清单 |

**①②③ 是拉域不需要词；④ 用词圈域**——规则：只拉**我们有现成替换页**的词（死链才有东西可换），对每个词的 SERP 前 5 在位域跑死页报告：

### chartglade（优先：替换页全齐 + 10/04 实勘生态陈旧）

| 词 | 跑死页报告的在位域 | 我们的替换页 |
|---|---|---|
| multiplication chart printable | artsyfartsymama（全域）、ignitelearning（10/04 实勘"文已下线"，第二嫌疑）、designbundles | /multiplication-chart-printable/（11/03 已上线） |
| place value chart | acentral、thirdspacelearning、teachingwithkayleeb | /place-value-chart/ + 变体族 |
| kindergarten sight words | redcatreading、sightwords.com、splashlearn | /sight-words/ hub |
| multiplication chart | 复用 artsyfartsymama 报告不另跑 | /multiplication-chart/ |

### tintbrew（次要：主通道是清单 pitch，死链顺手）

| 词 | 跑死页报告的在位域 | 我们的替换页 |
|---|---|---|
| color mixing chart | thecoloratlas、thecolorsmeaning、image-color-picker | /color-mixing-chart/ |
| what colors make brown | jaejohns、marketingaccesspass、artstudiolife、artincontext | /what-colors-make-brown/ |
| what does red and blue make | paintlogs、color-meanings、thecolorsmeaning | /mix/red-blue/ |

**剔除名单（不跑不 pitch，死页也换不了链）**：pinterest / etsy / amazon / youtube / wikihow / facebook / khan / mathnasium / ixl 等平台大站。

**产出口径**：三列清单「死 URL × 还链着它的域 × 我们替换页」→ pitch 邮件 = "you're linking to a page that no longer exists — here's a live equivalent"。**时效纪律：拉数后一周内发完 pitch**（10/04 发现的 artsyfartsymama 死链 11/08 复核已复活 200【实测 curl + 正文验证】——单点入口随时消失，批量拉批量发才是正确姿势）。

拉回后 🤖 按四模型分拣 → 每域标"可 pitch/不可 pitch/已在 F 组名单"。

---

## 六、结论一句话

大站外链不是更"强"的链接，是**不同的获得机制**：它们被清单、wiki、评测站**收编**，而我们目前手里只有"主动提交"类弱通道。升级方向 = 把 roundup 从一个通道扩成四个目标池 + 补上"嵌入组件"这个被动获链器官 + 用 broken-backlink 报告开高替换率的 pitch。全部白帽、全部零现金成本，符合止损纪律。
