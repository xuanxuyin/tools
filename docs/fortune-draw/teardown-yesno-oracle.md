# SEO 竞品逆向：yes/no oracle 赛道在位小站集群拆解

- 调研日期：2026-11-03
- 目标词：**yes or no oracle（6,600 US/月，KD 37）**，SERP 前列为无品牌小工具站集群
- 方法：curl 直抓 7 站原始 HTML（UA 伪装 Chrome 124）逐站拆五维；tarostarot.com 主动屏蔽数据中心 IP（Vercel `X-Vercel-Mitigated: deny`，换 Googlebot UA / sitemap 均 403），该站情报改由搜索快照 + SERP snippet 补齐，已标注
- 原始 HTML 存档：`d:\tmp\teardown\`（本次调研的临时工作区，未入仓库）

---

## 1. freeoracle.com（freeoracle.com 首页即 YES NO ORACLE）

**【实测】curl 200，HTML 4.01 Transitional + 表格布局**

- **交互形态**：textarea 输入问题 → "Yes or No?" 按钮，POST 回 `index.html`（结果渲染在同一 URL，无独立结果页可分享/收录）。1 步出结果。提交按钮整段用 `document.write` 写出（无 JS 时 noscript 兜底）；Enter 键提交有专门 JS。**无任何仪式感动效**，提交后就是普通页面刷新。
- **内容深度**：工具上方仅一行副标题（"Get a free Yes/No Oracle Reading"）；下方约 150 词两段（教用户"只问 yes-no 问题""不必同意答案，用常识"）。**无 FAQ、无 how it works、无科普段**。签语库规模零宣称。"Discover your Horoscope for today!" 同一句在页面重复出现 **3 次**（桌面表格布局强行塞的侧栏+底栏+中栏）。
- **矩阵/变体**：站内主线是**星座运势**，不是 oracle——12 星座页（/aries…/pisces）+ 6 主题运势（/love /flirting /work /family /money /health）+ /horoscopes hub。URL 平铺无分类法。oracle 是首页钩子，页脚 19 个内链全是运势页，yes/no 主题被稀释。
- **SEO 基建**：title 就是裸词 `YES NO ORACLE`（全大写）；meta description 关键词堆砌（一句塞 4 次 "YES NO ORACLE"）；**meta keywords 还在用**（Google 2009 年就忽略）；**无 viewport = 非响应式**，手机上是 1024px 表格横滚；microdata 标了 `schema.org/Other`（等于没标）；无 JSON-LD；图片有 alt（"Free Oracle Yes/No"）；结果靠 POST 无独立 URL = 结果态内容完全不可收录。
- **变现痕迹**：AdSense 2 个单元（336×280 侧栏 + 250×250 中部）+ **blockadblock 反广告拦截脚本**（与用户对抗的信号）+ cookie consent 弹窗 + privacy policy 页。

**弱点**：无移动适配、结果无解释、结果页不可收录、内容薄、oracle 主题被运势站稀释、反拦截脚本伤信任。

## 2. yesnooracle.co —— 集群里最强的一个

**【实测】curl 200，Next.js（App Router）+ Tailwind，暗色霓虹主题**

- **交互形态**：输入问题 + **场景芯片（love / career / self）** + "Shuffle" 重摇 + **热门问题芯片一键填入**（"♥ Does he miss me?" 等胶囊按钮）。结果 = **Yes / No / Maybe + 一段短解释**（"full answer for reflection, not a 100% guaranteed prediction"）。客户端渲染出结果，有 Sign in（**带账号体系**，存疑：是否注册墙）。胶囊按钮有 hover 光晕/active 缩放微动效，仪式感在集群里最好。
- **内容深度**：**全文 1,557 词**，集群第一。结构：What Is Yes No Oracle?（含医疗/法律/财务免责声明）→ How the Reading Works（3 步：问一个问题→抽信号→对照现实证据）→ "Free Oracle Yes No Answers With Full Context"（直接吃 "100% accurate yes or no oracle" 搜索意图再收回来）→ When to Use（love/career/everyday 三场景）→ Popular Yes/No Questions（链到 6 个问题指南页）→ Blog 3 篇 → FAQ（问 5-6 个，正文与 schema 双份）。
- **矩阵/变体**：`/yes-no`（工具）→ `/yes-no/love`、`/yes-no/career` 主题 hub → 每个主题 hub 下挂 **6 个具体问题指南页**（will-he-come-back / does-he-miss-me / should-i-text-him-first / should-i-quit-my-job / accept-offer / save-or-spend），hub 页 344 词、面包屑 `Home / Yes/No Tarot / Love & Relationships`；另有 `/blog` 3 篇。URL 分类法清晰，是集群里唯一做出"问题级"变体矩阵的。
- **SEO 基建**：title/canonical/meta description/viewport 齐全；**FAQPage JSON-LD**（cluster 内唯一，注意其 Answer text 里塞了 `<strong>` HTML 标签，合规性存疑）；共 2 个 ld+json 块；Tailwind 响应式到位。
- **变现痕迹**：AdSense（页面引用 adsbygoogle 2 处）+ 账号注册（数据/邮件收集嫌疑）。

**弱点**：答案是 **Maybe 三态**，对"要个准话"的用户反而含糊；每主题只 6 个问题页、hub 只有 344 词，矩阵深度有限；暗色霓虹风与求签人群的信任感错位；强 JS 依赖（爬虫只见壳+文案）；FAQ schema 里嵌 HTML 标签。

## 3. asktheorb.com

**【实测】curl 200 + 实测 POST 一问，HTML 3.2KB（全场最小）**

- **交互形态**：单个 input（placeholder "Will the trip go well?"）+ 提交按钮，**POST 回首页**，同页显示：问题回显 + 一句 8-ball 风格短语（实测 "Better not tell you now"）+ "Ask another question.."。1 步。**有一张 magic.gif 动图**（预加载魔法球动画）——集群里唯一有"仪式感"意识的，但实现停留在 2016。
- **内容深度**：**正文约 0 词**。无 FAQ、无科普、无 footer（导航都没有），还残留 `<div class="footer-meta">11</div>` 调试占位。
- **矩阵/变体**：**单页站**——canonical 指向首页，全站就一页，零内链、零兄弟工具。
- **SEO 基建**：title/meta description/OG/Twitter card/viewport 全有（基础合规）；**一个 WebSite JSON-LD**（它唯一的 SEO 资产）；Bootstrap 3 + bootstrap-theme + jQuery 3.1（2016 年代技术栈）；**Google Analytics 还是 Universal Analytics UA-2280906-26 老属性——UA 已停服，它的统计是死的**，说明多年无人打理。
- **变现痕迹**：无广告、无 affiliate（只有失效的 GA）。

**弱点**：零内容、零矩阵、结果是不直接回答的 8-ball 短语、统计失效无人维护。能排上来纯靠域名+外链老本。

## 4. the-oracle-answers.com

**【实测】curl 200，正文 4,178 词但含大量 2012-2013 年用户评论**

- **交互形态**：输入问题 → "Ask THE ORACLE" 按钮。正文整段引导语（"Clear your mind, center yourself…Take THE ORACLE's answer as a mirror for your needs"）——仪式感靠文案不做动效。结果形态未直接实测（POST 型），页面定位是"oracle reading"而非严格 yes/no。
- **内容深度**：约 1,500 词玄学科普（oracle 历史 priest/priestess/landmark 那一套，"oracle" 关键词在正文反复堆），**下方挂了 2,000+ 词的评论存档——最新一条 2013 年**，管理员（Mod-Irrlicht，德语 ID）逐条回复，之后整个评论区荒废十几年，成了页面的负资产。
- **矩阵/变体**：约 14 个工具页：lovemeter / lucky-numbers / clairvoyance / numerology×5（destiny/life-path/partner/letters/cross-sum）/ biorhythm / runes×4。URL 平铺无 hub。
- **SEO 基建**：**无 canonical、无 JSON-LD**；title 和 meta description 是关键词倾倒（一句塞进 "Tarot, horoscope, Lucky Numbers, astrology, numerology, past life, intuitive, palm reading"）；有 viewport（算是集群里少数移动可用的老站）。
- **变现痕迹**：**AdSense 5 个块**（全场最重广告）；站群互链网络：book-of-changes.net / gypsy-cards.net / lenormand-reading.com / tarot.cafe / totem-tarot.de / honey-chat.com / tuwort.net——典型多语言玄学站群，内链全是导出不是积累。

**弱点**：2012 年内容+2012 年评论原封不动、无 schema、关键词堆砌 meta、5 广告块、权重外流给站群姐妹站。

## 5. facade.com/yesno（Facade，老牌玄学站）

**【实测】curl 200（注意 /yesno 会 301 到 `:80/yesno/` 的怪重定向），实测 GET 结果页**

- **交互形态**：input 输入问题 + "Yes or No" 按钮 → GET `/yesno/answer/?UID=…&Query=…`。**结果实测 = 一个单词**（问 "Will I get the job" 返回整页只有 "No"，**零解释零装饰**）。有隐藏 UID 字段做会话追踪。无任何动效。
- **内容深度**：一段约 70 词的 floaty pen（漂浮笔）玩笑文案（"often correct about half of the time"）。**无 FAQ、无科普、无 how it works**。结果页比首页更空。
- **矩阵/变体**：老牌玄学全家桶——/tarot /runes /iching /stichomancy /numerology /coin_flip /biorhythms /bibliomancy /celebrity /personal /store /content(webmasters)。**导航全是图片按钮**（90×15 gif，好在有 alt）。分类法是 90 年代目录式平铺。
- **SEO 基建**：**table 表格布局、无 viewport、无 meta description、无 canonical、无 JSON-LD**；分析用的是 **urchin.js——Google Analytics 的前身，2007 年前的产物**；版权行 "Copyright 1993-2026"（页面骨架确实 30 年没换过）。
- **变现痕迹**：**AdSense 史前版**（`pub-1213244671506605` + `pagead2.../show_ads.js` 旧协议，728×90 头尾两块，广告在正文之前）+ /store 卖实体周边（floaty pen）。

**弱点**：单词结果无解释、无移动适配、无 schema 无 description、广告前置、30 年未改版。它是 DR 老本换排名的极端样本——**这条 SERP 位置是它能被打下来的最大空档**。

## 6. tarostarot.com/yes-no-oracle —— 打法上最接近我们要做的东西【快照拆解】

**【实勘受限】站方主动屏蔽非浏览器 IP（Vercel deny，Googlebot UA 也 403），以下来自搜索快照与 SERP snippet，页面代码级细节未验证**

- **交互形态**：**抽 1 张 oracle 卡片出结果**——从 3 副自建牌库（Deck of Virtues / Hearts Revealed / Wild Guidance）随机洗牌抽一张，给 **Yes/No/Maybe + 该牌的完整解读 = 明确卖 "the Why"**。title 直接写 "Free Yes or No Oracle 🔮 Accurate Full Answer + the Why"。免费无注册。卡片翻牌式，仪式感靠"真牌库"实现。
- **内容深度**：有 how-it-works 哲学话术（"The value is in making that hidden knowing conscious"）；明确对比自家 /yes-or-no-wheel（纯随机转盘）并解释 oracle 比转盘多在哪——**用内容给自己的工具分层**，这是高阶做法。
- **矩阵/变体**：**全场最凶**——`/tarot-cards/{card}/yes-no` **78 张牌 × yes/no 的矩阵页**（如 two-of-wands/yes-no）、/ask-the-oracle（开放问题全解答）、/oracle-reading、/love-oracle（Hearts Revealed 牌库）、/spreads/decision（2 牌阵）、/tarot-card-of-the-day、/yes-or-no-wheel、/blog/*（oracle vs tarot 科普）。
- **SEO 基建 / 变现**：代码级未验证（403）。托管在 Vercel，有主动反爬策略。

**弱点（可推）**：Maybe 三态同样含糊；78 牌矩阵是"牌"视角不是"用户问题"视角（two-of-wands/yes-no 搜的人问的是牌意，不是自己的事）；3 副自建牌库是真数据资产，**规模宣称上它是集群唯一对手**。

## 7. yesandnowheel.com/oracle

**【实测】curl 200，正文仅 267 词，疑似模板化多语言壳站**

- **交互形态**：wheel spinner 转盘系（客户端 JS 渲染，静态 HTML 里看不到工具本体）。转盘=纯随机，结果无解释。
- **内容深度**：**267 词，且几乎全是模板 boilerplate**——"Overview: Yes No Oracle…This version is designed so visitors can move through the site in English…"三段 Overview/Highlights/More Details 全是描述"本页已本地化"的填充句，**没有一句关于 oracle 本身的实质内容**。13 语言版本（ar/bn/hi/zh/fr/pt/ru/ur/id/de/ja/mr/te）× 这种壳文案 = 典型多语言薄内容 farm，是 Google helpful content 政策的教科书打击对象。
- **矩阵/变体**：15+ 个 wheel 页（rainbow / fate / word / letter-picker / truth-or-dare / **DTI theme**（Dress to Impress 游戏梗）/ country / zodiac / **hair-color** / random-food / chance-fortune / yes-no-maybe / coin-flip / dice / **god-yes-or-no** / **custom yes or no** / **classroom yes or no**）+ /tarot + /blog + about/contact/faq/privacy/terms/sitemap。yes/no 赛道内它反而是变体最多的（custom/classroom/maybe/god 四个切口）。
- **SEO 基建**：**schema 全场最全**——6 个 JSON-LD：WebSite / Organization / WebApplication / HowTo / SiteNavigationElement；title/canonical/meta description/viewport 齐全；图片 2 张均带 alt。基建合格，**输在页面上没给人看的内容**。
- **变现痕迹**：静态 HTML 里未见广告代码；contact 给了邮箱 + **电话 (415) 555-0199——555-01XX 是北美影视保留假号段**，信任元素造假实锤；FB/LinkedIn/Pinterest 主页链接大概率空壳（LinkedIn 公司页对个人站尤为可疑）。

**弱点**：壳内容、13 语种薄内容 farm、假电话、主题漂移严重（DTI/发色/食物 wheel 和 oracle 人群根本不是一批人）。

---

## 集群共同弱点（横对比）

| # | 弱点 | 验证站 |
|---|------|--------|
| 1 | **结果无解释**：单词/短语/转盘随机，不回答"为什么" | facade【实测单词】、asktheorb【实测 8-ball 短语】、freeoracle【POST 无解读痕迹】、yesandnowheel【转盘】= 4/7 |
| 2 | **正文薄、无 FAQ**：无 FAQ 的占 5/7 | facade ~70 词、asktheorb ~0 词、freeoracle ~150 词、oracleanswers 全靠 2012 评论凑、yesandnowheel 267 词 boilerplate |
| 3 | **结构化数据缺失或残缺** | facade 0、oracleanswers 0、freeoracle 标成 `schema.org/Other`（无效）、asktheorb 仅 WebSite；**有 FAQPage 的只有 yesnooracle 一家** |
| 4 | **技术化石、无移动适配** | facade（table + urchin.js + 无 viewport）、freeoracle（HTML 4.01 + 无 viewport + meta keywords）、asktheorb（Bootstrap3 + jQuery + **已停服的 UA-GA 统计**）、oracleanswers（2012 内容评论原样） |
| 5 | **无品牌信任元素**：about/how-it-works/真实联系方式缺位 | facade 30 年老页面、asktheorb 连导航都没有、oracleanswers 无 about、yesandnowheel **用 555 假号段+空壳社媒**、freeoracle 只有 privacy 页 |
| 6 | **广告重且伤体验** | oracleanswers 5 块、facade 2 块 728×90 广告在正文**之前**、freeoracle 2 块 + **反拦截脚本**与用户对抗 |
| 7 | **关键词堆砌 meta** | oracleanswers title 倾倒 8 个词、freeoracle description 一句重复 4 次 |
| 8 | **答案确定性差**："要个准话"的用户得不到准话 | yesnooracle/tarostarot 都给 Maybe；asktheorb 直接给 "Better not tell you now" 这种不回答的回答 |
| 9 | **零独特数据可宣称**：签语库/结果池规模无一家敢报数字 | facade、freeoracle、asktheorb、oracleanswers、yesandnowheel 全部不提（唯一例外 tarostarot 报了 3 副牌库） |
| 10 | **主题漂移**：oracle 页被无关内容稀释 | freeoracle 首页 19 个内链全是星座运势；yesandnowheel 混 DTI/发色/食物 wheel；oracleanswers 权重外流给德语站群 |
| 11 | **结果态不可收录**：结果靠 POST/客户端渲染，无独立可收录内容 | freeoracle、facade（GET 但结果页空白）、asktheorb、yesandnowheel（转盘 JS 渲染） |

## 我们的打法（差异化清单，按优先级）

1. **结果 = Yes/No 直答 + why + 一步行动建议**。正面接 tarostarot 的 "answer + the Why" 卖点并加码：它停在"牌意解读"，我们给"你下一步该做什么"（行为建议），这是集群里没有人做到第三层的。第 8 条弱点（Maybe 含糊）的对策：默认二态直答，Maybe 作为明确定义的可选项（"条件不足，先去确认 X"）而不是逃避短语。
2. **签语库规模可宣称、可验证**：页面直接写数字（如 "300+ hand-written verdicts across 8 life scenarios"）。集群 9/10 的站不敢报数，报了就是差异化；库按场景分类（love/career/money/health/timing…），每条签语带独立文案，杜绝 asktheorb 式 8-ball 短语。
3. **SSR-shell 静态渲染**（仓库既定技术纪律）：无 JS 时结果池、FAQ、科普全在 HTML 里。对位打 yesnooracle.co 的 JS 依赖和 yesandnowheel 的 267 词空壳；结果态若有独立 URL 更佳（补第 11 条弱点）。
4. **Schema 全套**：WebApplication（工具）+ FAQPage（干净 JSON，不嵌 HTML 标签）+ BreadcrumbList + Organization + HowTo。做到集群第一而不是并列。
5. **现代响应式设计 + 移动优先**：对位 4 个化石站（弱点 3/4），这是最便宜的可感知差异——用户从 facade/freeoracle 点进来立刻感到代差。
6. **信任元素齐**：About（讲 randomness 与娱乐定位）、How it works（结果如何生成，透明化）、Privacy、真实联系方式。绝不出现 555 号码/空壳社媒。
7. **变体矩阵学 yesnooracle.co 的结构、超过它的深度**：`/yes-no-oracle` 工具页 → 场景 hub（love/career/money）→ 问题级页面（should-i-text-him / will-he-come-back…），但每页做厚（yesnooracle 的 hub 只有 344 词、每主题 6 问），问题级页面用"该问题的常见答案分布 + 证据清单 + 行动建议"做唯一数据。tarostarot 的 78 牌矩阵反向验证：**按"用户的问题"组织矩阵，不按"牌"组织**。
8. **主题聚焦**：只做 decision oracle 一条线，不混星座/wheel 杂货（弱点 10），符合仓库"主题聚焦护栏"。
9. **广告克制**：初期零广告或结果页下方单单元，永远不在工具上方放广告——对位 oracleanswers/facade/freeoracle 的重广告（弱点 6），这也是回访率差异。
10. **签语内容手写事实化**（反薄内容纪律）：每条 verdict 是一句有人味的话，不是 "Yes, the signs point favorably" 模板腔——集群全员的通用文案腔是可听出来的。

## 附：调研中的关键实测证据

- facade 结果页实测：问 "Will I get the job"，整页返回正文仅 `Will I get the job → No`（一个词，无解释）。
- asktheorb 结果页实测：问 "Will I get the job"，返回 `Better not tell you now`（8-ball 短语，不回答）。
- freeoracle 提交按钮由 `document.write` 生成，POST 回首页同 URL，无独立结果页。
- yesandnowheel `/oracle/` 正文 267 词，contact 电话 (415) 555-0199 为北美影视保留假号段。
- asktheorb 统计为 Universal Analytics `UA-2280906-26`——该服务 2023 年已停，站多年无人打理的直接证据。
- tarostarot.com 对数据中心 IP 返回 Vercel `X-Vercel-Mitigated: deny`（Googlebot UA 亦 403），其 "answer + the Why" 定位、3 副牌库、78 牌矩阵来自搜索快照，**上线后建议用真浏览器复勘一次**。
- 本机出口在新加坡（AMS/sin1 CF 节点），所有抓取为真实站点内容，不涉及 SERP 区域污染问题（本次未做 SERP 实勘）。
