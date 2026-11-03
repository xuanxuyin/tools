# 在位者拆解（大厂/教育站）：cootie catcher 课堂教育用法验证

> 调研日期：2026-11-03。服务于 chartglade cootie catcher 页族——重点是**课堂变体（math facts / sight words cootie catcher）**的开发前调研。
> 与 `teardown-cootie-catcher.md`（工艺博主站）互补：本篇拆大厂单页与教育资源站，验证"课堂用法"这条线在位者做到了什么程度。
>
> **数据来源与可信度说明**：本机直连环境受限——thesprucecrafts 403（DataDome 壳页）、twinkl 被 Incapsula 拦且区域跳转 .cn、superstarworksheets 403（Cloudflare）、superteacherworksheets / web.archive.org / TPT 直连全部 connection reset（000）、WebFetch 全域被网络策略拦。故本篇除 education.com 两页（curl 200 全文，【实勘】）、thisreadingmama 一页（curl 200 全文，【实勘】）、multiplication.com 一页（curl 200 全文，【实勘】）外，其余站点结论来自 **Google 美区搜索结果块 + 标题/snippet 实勘**（【实勘·snippet 级】，比 curl 全文低一档；无 curl 全文支撑的页面 DOM/JSON-LD 细节一律不写）。另注意：部分搜索返回 es./kr./pl. 等 Pinterest 地区镜像，属 Google 本地化索引噪音，主结论仍取美区来源。

---

## 一、逐站拆解

### 1. thesprucecrafts.com（Dotdash 大厂单页）— make-an-origami-cootie-catcher-4121204

**一句话形态**：大厂标准 how-to 单页——只教折法、不带课堂属性，craft 人群定位，SEO 靠 Dotdash 域权重 + 精美实拍分步。

| 维度 | 实况 |
|---|---|
| 页面形态 | **折法教程页**（published 2020-06-15）：step-by-step picture tutorial + printable template。挂 Origami 母分类（/origami-4162885 hub），文内互链自家 roundup（见下）。标题用 "Origami Cootie Catcher"，正文双词并称 "also known as origami fortune tellers"（双词占位写法与大厂一致）。 |
| 课堂适配 | **无**。无年级、无学科、无 Common Core 字样出现。这是 craft 人群页，不是教育页。 |
| fortunes/内容 | 空白模板为主，fortunes 用户自写。 |
| 变现 | Dotdash 模式：程序化广告（大厂壳页 680KB，DataDome 反爬），无付费墙。 |

### 2. thesprucecrafts.com — make-these-creative-cootie-catchers-4149965（roundup 页）

**一句话形态**：大厂 roundup——"10 Creative Printable Cootie Catchers"（2020-05-04），本身不做模板，**给别站免费模板导流**。

| 维度 | 实况 |
|---|---|
| 页面形态 | 列表式 roundup，每条一个主题（snippet 实证含鲨鱼/海洋主题，来自 easypeasyandfun 的 shark cootie catcher），每条链回原站。文内互链自家折法教程页。 |
| 课堂适配 | 无。主题全是节日/笑话/角色扮演（joke teller、书角色、海洋），与拆解一（博主站）的节日矩阵高度同质——**大厂在此词上也只做 craft 场景，教育场景没有大厂单页**。 |
| 变现 | 广告 + 给别站导流不分成（纯内容填充）。 |

> 大厂结论：**Dotdash 在 cootie catcher 上只有 craft 教程 + roundup 两页，没有课堂向页面**。教育用法这个角度大厂是空的。

### 3. twinkl.co.uk — blank-fortune-teller-template-us-e-476（教育资源站模板页）

**一句话形态**：订阅制教育站的"空白 fortune teller 模板"资源页——模板本身是钩子，**全套对齐/年级/变体体系才是它的产品**。（页面被 Incapsula 盾拦，仅能从搜索结果块看结构，【实勘·snippet 级】）

| 维度 | 实况 |
|---|---|
| 页面形态 | 资源页 + 全站资源体系。URL 带 `-us-` 前缀（US 版本资源编号体系）；同族资源可见：Chinese New Year 空白模板（t-t-1001，评分 4.8）、**Editable Fortune Teller（资源编号 t2-m-2088——编号里的 m = math 分类）**、Winter Fortune Teller **for 6th-8th Grade**（年级直接写进资源 slug）。另有 teaching wiki 页 "fortune-teller-ideas"（词条式内容收口）。 |
| 课堂适配 | **最强**：年级分层（6th-8th 直接标）、可编辑版（教师自定义内容）、主题/学科资源编号体系、博客佐证课堂卖点——折纸练 fine motor skills、空白处写想法练 creativity、SEL 用途（让孩子"讨论自己的感受"）。 |
| fortunes/内容 | 空白版学生自填；主题版预填（节日/季节/感受话题）。 |
| 变现 | **订阅墙**：部分资源免登录可下、完整访问要 Twinkl 订阅。评分体系（4.8/5）做信任背书。 |

### 4. superstarworksheets.com — 站内搜 cootie catcher / fortune teller

**结论：无布局（缺口证据成立）。**

- `site:superstarworksheets.com` + cootie catcher / fortune teller 严格 site 限定搜索 **零结果**（【实勘·snippet 级】2026-11-03）。
- 站内搜索路径 curl 全部 403（Cloudflare），无法逐页核对；sitemap.xml 同样 403。
- 该站定位（免费 preschool/kindergarten/math 打印件站，与 chartglade 人群重叠）**本应最像我们的对手**，它没做这个页族 = chartglade 抢先做不撞车。

> 注意区分：**Superstar Worksheets（superstarworksheets.com）没有**；**Super Teacher Worksheets（superteacherworksheets.com）做得很多**——两家名字只差一个词，缺口证据写文档时别混。

### 5. education.com — cootie catcher / fortune teller worksheet（curl 200 全文，【实勘】）

**一句话形态**：IXL 系订阅站，把 cootie catcher 做成**标准 worksheet 资源单元**——面包屑进站内学科分类树、挂 Common Core 对齐码、配 lesson plan 互链。这是**课堂形态的教科书实现**，逐页拆了两页全文：

**页 A：Back-to-School Fortune Teller（/worksheet/article/back-to-school-fortune-teller）**
- 定位：开学破冰 icebreaker，2~5 年级一页通吃（"makes a fun classroom icebreaker as second through fifth graders…"）。
- 分类树：Worksheets → 2nd Grade ELA → Writing → Writing Types → **About Me**（主题标签：ELA/Writing/Writing Types/About Me 三层）。
- 内容：color → cut → fold 三动作 + 图示折法 + Brainzy 品牌设计（自家 IP 吉祥物）。
- "View aligned standards" 段列出 CCSS / TEKS / Virginia SOL / NGSS / ACARA 等八套标准体系入口，**本页实际未挂任何标准码**（"No standards associated"）——破冰类不挂码，学科类才挂。
- 资源运营：**See in a set (10)**（打包成 10 件套）+ Add to collection + **Add to assignment**（直接挂到学生作业）——教师工作流三件套。
- 变现：Print Worksheet 免费可点，完整下载/assignment 走 Education.com 订阅（页脚 Pricing / For Schools 报价入口）。

**页 B：Calculate the Volume of Rectangular Prisms using Cootie Catchers（5 年级数学）**
- 定位：**学科深度用法实锤**——用 cootie catcher 练长方体体积计算（"Cootie catchers get a math update"），练心算。
- 分类树：5th Grade → Math → Geometry → **Volume**（年级→学科→知识点三层）。
- **挂了真实 CCSS 码：5.MD.C.5.b**（标准对齐不是摆设，学科版必挂码）。
- **lesson plan 配对**："Use along with the lesson Calculating Volume Using the Formula (l×w×h) and after the lesson What is Volume?"——cootie catcher 被明确放在"课讲完之后练"的位置（**课后练习/复习工具**，不是独立游戏）。
- 资源运营：See in a Lesson Plan（直接挂 lesson）。

> education.com 拆解要点：**它的页面本身很薄**（正文一段话 + 一张 PDF），所有价值在**结构化元数据**（年级/学科/知识点标签 + 标准码 + lesson/set 配对）。SSR 正文无 JS 也完整（SEO 底线达标），付费墙拦的是下载动作。

### 6. Teachers Pay Teachers — 搜 cootie catche（直连 000 被拦，来自搜索结果块，【实勘·snippet 级】）

**付费清单 = 课堂需求最硬证据**。能确证的代表性产品（价格大多未被 snippet 暴露，能确证的价格/件数已标注；TPT 单件典型区间 $1~5，下表件数均为 listing 描述实证）：

| # | 产品（卖家） | 主题 | 形态/卖点 |
|---|---|---|---|
| 1 | Literary Terms Cootie Catcher / Fortune Teller（Kim Kroll） | 语文·文学术语 | **16 个 catcher**：8 个"术语在上/定义在下"正反配对——复习/review game 形态 |
| 2 | Magic E Cootie Catchers — Fluency Practice | 语音·Phonics | **5 个 catcher**，Magic E 单词+句子练流利度 |
| 3 | Math Facts Cootie Catcher Bundle（Magnifying Math） | **数学口算** | 加/减/乘/除 facts 全家桶，配套 facts 2-9 系统训练课程——**math facts 是 TPT 上 cootie catcher 最重的付费主题** |
| 4 | Cootie Catcher Fortune Tellers DIVISION（Scott's Scholars） | 除法 | 除法复习游戏 |
| 5 | Bundle HMH Fortune Teller/Cootie Catcher Module 2（Second Grade） | **教材配套** | 绑定 HMH 教材 Module 2 的二年级 bundle，listing 明示"usage instructions and differentiation options"——**跟着教材单元走 + 差异化分层**是付费理由 |

付费动机归纳（从 listing 描述实证）：① 按知识点拆细（单个 fact family / 单个语音规则）② 可编辑/差异化分层 ③ 配教材单元 ④ review game/center 用途明确。**TPT 上没有"传统预言式 fortunes"付费产品——教育需求 100% 是学科内容容器**。另有 SEL/mindful 类（Itty Bitty Yogi 视频）与季节类（Winter $1.50、Valentine This-or-That）存在，属次要主题。

### 7. Google 两轮搜索：谁在做 math facts / sight words cootie catcher

**"math facts cootie catcher" 轮**（【实勘·snippet 级】）：
- **superteacherworksheets.com**：分表乘法 catcher 埋在乘法主题页里——`/multiplication-by-3s.html`（Cootie Catcher: Multiply by 3s）、`/multiplication-by-8s.html`（Multiply by 8s）、`/multiplication-0-12.html`（Cootie Catcher Multiplying by ELEVEN）；另有专属 hub `/cootie-catchers.html`（"Origami Cootie Catchers (aka Fortune Tellers)"，覆盖 math/reading/grammar/science 四学科）+ 空白模板 featured 页 + Thanksgiving 火鸡 catcher。变现 = 部分免费 + 会员解锁全部。
- **multiplication.com**（curl 200 全文，【实勘】）：`/resources/cootie-catchers/` ——**0~12 每个表一个 catcher + "Tough Facts" 难点专版，共 14 个免费 PDF**；玩法说明单独一页；**fortunes 位置换成 "Would-You-Rather" 问题 + 趣味冷知识 + brain teasers**（他们的明确卖点："where the fortunes are normally found"）。每张配图 = 下载入口，页内嵌广告变现。
- **mathtechconnections.com**：2023-12 文章 "Math Fact Fluency Fun with Cootie Catchers"，乘除法复习 + **可编辑模板**。
- **TPT（Magnifying Math 等）**：见上表。
- 大厂（Spruce/Dotdash）：**不在场**。

**"sight words fortune teller" 轮**（【实勘·snippet 级】）：
- **thisreadingmama.com**（curl 200 全文，【实勘】）：`/sight-word-cootie-catcher/` ——家庭/教学两用博文，做法极具体：**空白 catcher 折好后展开，填 12 个 Word Wall sight words**；中心格写"Pick one of your words to use in a sentence"；玩法 = 外圈选词→**逐字母拼读 aloud**（开合一次拼一个字母）→内圈再选词→最后翻 flap 造句；亲子对玩 5-10 分钟。给的是空白模板自填，非预填 PDF。
- **Pinterest 多个 pin**："sight word flippers / cootie catcher ideas —— a fun alternative to flash cards"（彩色+黑白双版）。
- **Teach Starter**：Dolch sight words 资源 hub 很全，但搜索未见其 cootie catcher 专项页。
- **SERP 弱信号**：sight words 这一轮返回大量 Pinterest/个人博客/词典类结果，**没有大厂或头部教育站在位**——比 math facts 更弱，可打信号明显。
- 注：本轮返回带 Pinterest 地区镜像噪音，属 Google 本地化索引，主判断仍成立但建议上线后用美国代理复核一轮。

---

## 二、大厂教育站在位情况总结

| 站点 | 有无课堂向 cootie catcher 布局 | 对我们的意义 |
|---|---|---|
| thesprucecrafts.com（Dotdash） | ❌ 只有 craft 折法教程 + roundup，零课堂属性 | 大厂不守教育场景 |
| twinkl.co.uk | ✅ 最完整的课堂体系（年级 slug/可编辑/SEL/标准体系）但**订阅墙** | 形态对标对象，变现错位可打 |
| superstarworksheets.com | ❌ **零结果（缺口证据：2026-11-03 site: 搜索零命中，站内 403 无法逐页核对）** | 同人群免费站没做 = 可抢先 |
| education.com | ✅ 学科版挂 CCSS 码 + lesson 配对，但**订阅墙**、页面正文很薄 | 课堂页该有的元数据清单来源 |
| superteacherworksheets.com | ✅✅ **最直接的免费站对手**：四学科 hub + 分表乘法 catcher + 空白模板，但站点直连全拦（爬不动其页内结构），且其 catcher 深埋在乘法主题页、无独立 SEO 单页矩阵迹象（snippet 级判断，需上线后复核） | 头号对标；它有 hub 无矩阵 |
| TPT | ✅ 付费市场验证了需求排序：**math facts > phonics/fluency > review game > 教材配套 > SEL/季节** | 需求证据源，非竞争者 |
| multiplication.com / thisreadingmama | ✅ 单站深度做法可抄（分表矩阵 / 玩法设计） | 实现细节参考 |

**总判断**：课堂用法真实存在且付费验证充分（TPT + 两家订阅站都在做），但**免费站里只有 Super Teacher Worksheets 一家做得深、且深埋无独立页矩阵；大厂 craft 巨头不碰教育场景；与我们定位最像的 Superstar Worksheets 完全空白**。math facts 侧竞争中等（multiplication.com 有完整免费矩阵），**sight words 侧 SERP 明显弱（Pinterest + 个人博客）**——sight words cootie catcher 是两个课堂变体里更好打的入口。

---

## 三、课堂变体的正确做法（开发依据）

### 3.1 页族结构（对标 + 差异化）

1. **hub 页** `/cootie-catchers/`：对标 Super Teacher 的 /cootie-catchers.html——一页收口折法（图文 6~8 步）+ 玩法 + 全部变体矩阵 + 学科分组。JSON-LD 用 HowTo（折法分步）+ FAQPage + BreadcrumbList；**博主站五家里只有 stlmotherhood 带 HowTo，教育大厂全没有——chartglade 上 HowTo 是低成本超车点**。
2. **math facts 矩阵**：每张表独立页 `/cootie-catchers/multiplication/2/` ~ `/12/` + **Tough Facts 难点版**（抄 multiplication.com 的收口法，覆盖"哪张表最难背"长尾）+ 加法/除法各一组。URL/标题双词占位（"Multiplication Cootie Catcher (Fortune Teller)"）。
3. **sight words 矩阵**：按 Dolch level 分页（pre-primer / primer / 1st / 2nd / 3rd grade）——**内容源直接复用 chartglade 现成的 `src/lib/sightWords.ts`（Dolch 220 逐字已在库里）**，每页一个 level 的 catcher + Fry 变体段。这页族与站内 sight words 既有页互链，主题聚焦护栏天然过关（同一批老师/家长、同一打印场景）。
4. **空白模板页**：Blank Cootie Catcher Template 独立一页（Super Teacher 把空白版做成 featured 入口、Twinkl 空白版评分 4.8——空白版是流量入口不是赠品）。

### 3.2 每页必备的课堂元数据（抄 education.com 的结构化清单）

- **年级标签**：math facts = Third Grade / Fourth Grade（CCSS 3.OA.C.7 是乘除法流利度的法定年级）；sight words = Kindergarten / First Grade / Second Grade（Dolch level 对应）。措辞照美国习惯写 "for 3rd grade" 不写 "Grade 3" 混用。
- **标准对齐段**：math 版挂 **CCSS 3.OA.C.7**（multiply/divide within 100, fluency）、加法版挂 2.OA.B.2；sight words 版挂 **RF.K.3c / RF.1.3g**（read common irregular words by sight）。education.com 实证学科版必挂码——这一段是"老师认定这是教学资源"的信任开关，写一句 "Aligned to CCSS 3.OA.C.7" + 一句解释即可，不必搬八套标准体系（那是订阅站的产品功能）。
- **课堂使用指引段**（教育站三家全有、博主站全无——差异化核心）：
  - 用途定位词照抄实证用法：**partner game / math center / literacy center / early finisher / take-home practice / test review / icebreaker**（back-to-school 一月后再加 icebreaker 场景页也不迟——美国日历：开学季 8 月中下旬是这词的第二高峰）。
  - 课堂管理实操（super Teacher/education.com 隐含、thisreadingmama 明说的）：K-1 学生**教师预折**（fold time 挑明：低年级折约 5 分钟，建议课前折好或用预折版）；对玩 5-10 分钟一个轮次；**预折再展开填词**是 sight words 版的标准操作流。
- **打印纪律**（chartglade 既有系统的延伸）：单张 letter 纸、`@media print` 后折线（fold lines）必须随纸输出、模板自带 cut line（正方形边线）+ 折线虚线标注、彩色 + 黑白双色双版本（brendid 拆解已实证黑白版专给没彩打的老师，TPT Pinterest 端也实证彩色/黑白双版本是标配）。

### 3.3 内容（fortunes 位置写什么——各家实证）

| 变体 | 外面 4 格 | 里面 8 格 | flap 内容 |
|---|---|---|---|
| **Multiplication catcher** | 数字/颜色（数数字环节照旧） | 该表的 facts（**题目式**：7×8，翻 flap 见 56——multiplication.com 全线此法） | 1 个 fact + Would-You-Rather / 趣味冷知识 / brain teaser 穿插（multiplication.com 明确卖点，防"纯做题"枯燥） |
| **Sight words catcher** | 颜色（拼读环节的颜色词） | **12 个词**（Dolch level 实词，thisreadingmama 实证 12 格容量） | 中心格固定任务句："Pick one of your words to use in a sentence"（thisreadingmama 原法）+ 变体任务（spell it aloud / use it in a silly sentence / find it in a book） |
| **Blank catcher** | 留白 | 留白 | 留白 + 折法 + 填写建议清单 |

玩法说明统一用 skiptomylou 已验证的四步：spell 颜色 → 数数字 → 开合 → 读 flap（课堂版把"spell 颜色"换成"拼读 sight word / 说出 fact"即可，引擎同一套）。

### 3.4 变现与风险

- **全免费**（chartglade 既有模式）：三家在做教育版的两家全收订阅墙、TPT 收 $1~5/件——免费全开 + 零邮件门槛是 chartglade 对这批在位者最大的变现错位优势；空白版不做"订阅才给下载"那套（Twinkl 的摩擦点）。
- **风险提示**：① Super Teacher Worksheets 的 catcher 埋在乘法主题页里，说明它 SEO 上没有独立矩阵页——我们做独立页矩阵是正面抢它 buried 流量，标题别直接复刻它的页面名；② sight words 轮 SERP 有地区镜像噪音，上线前用美国代理复核一轮再定标题措辞；③ 内容零版权风险（Dolch 220 是公有词表，乘法表公有）。

### 3.5 上线批次建议（数字待验证，不属本篇结论）

主题清单优先级按 TPT 付费证据排序：**multiplication 分表（3/4/6/7/8 优先——Tough Facts 是搜索高频痛点）> Dolch sight words 分级 > addition > division > blank 模板页**。页面数与词量数据（US/月 + KD + SERP 实勘）走 chartglade 正常批次验证流程，本篇只供形态与内容依据。
