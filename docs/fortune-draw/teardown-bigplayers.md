# SEO 竞品逆向调研：美国"抽签/日签"赛道在位大站拆解

- **调研日期**：2026-11-03
- **调研方式**：curl 抓取原始 HTML + sitemap 直接解析（伪 UA），不用云端代理
- **源 URL**：
  - https://www.horoscope.com/us/games/divination/game-fortune-cookie.aspx
  - https://www.horoscope.com/us/games/index-games.aspx （games hub）
  - https://www.horoscope.com/us/games/index-games-fortune-teller.aspx （fortune teller 子 hub）
  - https://www.horoscope.com/tarot/tarot-yes-no.aspx
  - https://www.horoscope.com/sitemap.xml → sitemap-main.xml + us/editorial/sitemap.aspx
  - https://astrostyle.com/ （首页 + /astrology/calculators/ + /cosmic-calculators/rising-sign/）
  - https://dogemuchwow.com/ + https://dogemuchwow.com/chinese-fortune-cookie/
  - USA Today / WaPo horoscopes（见 §4）

---

## 1. horoscope.com（该词群 #1）

### 站点量级【实测】
- sitemap-main.xml：**1343 条 URL**；us/editorial/sitemap.aspx：**2481 条文章 URL** → 全站 ≈ **3.8K+ 页**
- URL 分类法（main sitemap 聚类）：us/horoscopes 547 / love/compatibility 145 / **us/games 132** / us/planets 131 / tarot-card-meaning 110 / us/profiles 34 / zodiac-signs 8×12
- 中文版（/fr/）同构，国际复制

### Games 家族 URL 分类法【实测】（在位者"抽签类"页面地图，132 页全列出）
按 `/us/games/{类型}/game-{名}.aspx` 组织，四大类 + 7 个分类 hub：

| 类型 | URL 段 | 页数 | 代表 |
|---|---|---|---|
| 占卜抽签 | `/us/games/divination/` | ~33 | game-fortune-cookie / magic-8-ball / ask-genie / crystal-ball / love-cookie / chinese-fortune-dragon / luck-meter / lucky-cat / lucky-clover / lucky-lady-bug / shell-oracle / daisy-love-oracle / origami-fortune-teller / daily-dice |
| 计算器 | `/us/games/calculator/` | 7 | lotto-number-generator（彩票号生成！） / zodiac-sign-finder / bmi / dog-years / exact-age |
| 配对 | `/us/games/compatibility/` | 9 | name/love/friendship/career/celebrity/pet/chinese/mayan compatibility |
| 测验 | `/us/games/quiz/` | ~70 | game-quiz-what-will-bring-you-luck 等 |

分类 hub：index-games（总 hub "All Games"）、index-games-fortune-teller（"Fortune Tellers Games"，17 个工具）、index-games-love / instant-advice / compatibility / calculator / unique / quizzes。

### fortune-cookie 单页四维拆解【实测】

**页面形态**
- 首屏 = H1 "Fortune Teller Games"（站级泛标题）+ H2 "Fortune Cookie" + 一句文案 + **一张 475×300 PNG**（`/images-US/games/game-fortune-cookie-1.png`，alt="Fortune Cookie"）+ 一个紫色按钮 "Crack open your Fortune Cookie"
- 技术：**ASP.NET WebForms postback**（`<form name="MainForm">` + hidden UniqueID + `onClick="javascript:UserSubmit();"`）。无 Flash、无 canvas、无 iframe 游戏体——就是**表单提交后服务端回一句话**，交互 1 步 1 击
- 抽取结果大概率不再变（服务端渲染回传），SSR-shell 式，与我们同构

**内容深度**
- 正文（工具之外）**只有 1 句话**："Need a little bit of sage advice or a quick pick-me-up? Get the wisdom of your fortune cookie without the calories!"
- 全页可见文本 ≈ 355 词（含导航/页脚/tarot 模块），**页面自身内容 ≈ 50 词**
- **无 FAQ、无科普、无助运数字/变体段**；hub 页的 "FAQs" 区只是 12 条链到泛占星编辑文章（What is Astrology? 之类），与 fortune cookie 无关
- meta description 有一句（"without the calories" 玩梗），meta keywords 塞了 30 个泛词（2010 年代做法）

**变体/矩阵结构**
- 裂变逻辑 = **"占卜道具 × 是否限定爱情"**：fortune-cookie（通用）→ love-cookie（爱情变体）→ magic-8-ball → magic-love-ball → crystal-ball → ask-genie → cupids-oracle → love-fairy → luck-meter → lucky-cat/clover/lady-bug……
- **没有按星座×主题裂变，没有按问题类型裂变**——一个道具一页，页与页之间靠 "More Games" 按钮墙互链（8 个胶囊按钮）+ 右侧栏 "Today's Tip" + 底部 Card of the Day / Today's Reading（tarot）模块

**图片/富媒体**
- 每个道具一张静态 PNG，alt 即道具名，475×300；tarot 卡牌图有 lazyload（data-original）
- 无图集、无插图内容区、图片声明量极少（对比 Superstar 930 页 21K 图片声明是另一个量级）

**变现痕迹**
- 广告密度**高**：顶部 banner（top-slot）+ 桌面右栏 2 个 300×250 medrec（其一 sticky）+ 移动端 medrec ×2 + **Primis 视频广告位**（live.primis.tech）+ GTM 容器
- 头部导航直挂 /psychics（ psychic 通话**联盟/自营付费咨询**）+ store.horoscope.com（周边商店，UTM 带满）
- 无付费墙，免费+广告模式

**Schema**
- **全站 games 页 0 个 JSON-LD**（fortune-cookie、games hub、fortune-teller hub、yes-no tarot 四页逐一验证，`ld+json` 计数均为 0）。只有 OG 标签
- yes-no tarot 页同病：内容 1 句 + 选卡图 + postback，881 词（含导航）

### horoscope.com 一句话结论
站点权威极高（十几年老站+巨型内链网），但**游戏页本身是 2010 年代遗留物**：50 词内容、无 schema、ASP.NET postback、道具图老旧、广告密到影响体验——它是靠域权重躺在这个词上的。

---

## 2. astrostyle.com（SERP #7，DR 71）

### 站点形态【实测 + 部分推断】
- **WordPress 媒体品牌站**（AstroTwins 双胞胎作者，ELLE 官方占星合作方），不是工具站。首页 21,151 词（含导航），H1 "Daily Horoscopes by Zodiac Sign"，以**日运/周运/月运文章**为主体
- sitemap-index 实测 23 个子 sitemap：post-sitemap1~10（Yoast 每片默认 1000，**推断文章量 ≈ 数千到 1 万级**【推断】）、as_dailies（日运）×3、as_learn_article ×4、celebrities ×2、as_tarot、cosmic_calculator、page、news
- **Cloudflare managed challenge 挡 curl**（sitemap 子页/深层页抓取 403 "Just a moment"）——首页和 /astrology/calculators/ 偶尔放行【实测】

### fortune / lucky / lottery 相关页面【实测】
- **没有**。首页 69 条内链逐条过关键词（fortune/lucky/lottery/cookie/oracle），**零命中**；首页正文文本同样零命中
- WebSearch 实勘确认：astrostyle.com 无 fortune cookie / lucky numbers / lottery 专页。它出现在这个 SERP 纯靠**占星大类的域权威外溢**
- 它的"工具层"是 `/cosmic-calculators/`：**23 个计算器**（sun/moon/rising/mercury…sign calculator、life-path number、moon-phase、saturn-return、composite chart、retrograde checker 等），URL 命名 `cosmic-calculators/{slug}/`

### 代表页拆解：cosmic-calculators/rising-sign/【实测】（对标它的工具页天花板）
- 结构：H1 "What's My Rising Sign?—Rising Sign Calculator" → H2 四段（What is…? / How do I find…? / **Calculator** / The meaning of your Rising Sign）→ H3 "Try This Next!"（兄弟工具内链）+ 播客模块
- **17,386 词**（含导航；正文也是数千级）、22 张图、JSON-LD **Article + BreadcrumbList + WebPage + Person + Organization** 齐全
- 形态 = **长文包短工具**：科普占 80%，计算器是文中一段。SEO 打法是"头词长文+工具钩子"，与 horoscope.com 的"裸工具"完全相反

### 四维小结
- 页面形态：媒体长文 + 文中嵌计算器；首屏是内容不是工具
- 内容深度：极深（数千词/页，手写水准，作者 IP 强）
- 变体结构：按占星实体裂变（行星/相位/计算器 23 个），**没有抽签/日签类道具页**
- 图片：22 图/页，编辑配图为主
- 变现：**Astrology Advantage 付费会员**（/astrology-advantage/）+ 图书（/2026-book）+ 播客 + 广告

### astrostyle 一句话结论
内容怪兽，但没有抽签类交互工具——它在这个词群是"路过"，不是"驻守"。

---

## 3. dogemuchwow.com/chinese-fortune-cookie/（袖珍站挤进前 10 的样本）

### 为什么能排上【实测 + 推断】
- **页龄**：JSON-LD 实测 datePublished **2019-11-29**——六年老页，域名同样老（uploads 里有 2016 年的文件）。在这个"在位者内容都是 2010 年代化石"的词群，**老页本身就是资产**【实测+推断】
- **URL 精确匹配**：`/chinese-fortune-cookie/` 直击 "chinese fortune cookie" 修饰词；title "Daily Chinese Fortune Cookie 🥠 | Doge Much Wow" 关键词前置
- **站虽杂但有行为信号**：PWA 可安装（页面文案明说 "install as a Progressive Web App for offline availability"）、每日一次机制（"only the first fortune is your daily prediction" + daily blessing + **lucky numbers**）→ 回访/停留信号好【推断】
- 外链迹象：无法直测（无工具），但站是 WordPress 站长圈内/browser 游戏站，社交分发痕迹明显（meme 站自然外链）【推断】

### 四维拆解【实测】
- **页面形态**：首屏 = H1 "Daily Fortune Cookie" + 卡通禅意狗 "master Kuki" 形象 + jQuery/typed.js 打字机效果出 fortune；点击饼干抽签，**每日首签固定**（cookie 记忆）。技术 = jQuery 2.2.4 + `FortuneCookies.min.js`（**实测 JS 里仅 ~109 条 fortune 文案，全部前端随机**）+ PWA
- **内容深度**：可见正文 **~250 词**（角色背景故事 + PWA 说明 + 一段 precognition 科普）；无 FAQ、无结构化问答；title/meta 有 OG 无 robots 问题
- **变体/矩阵结构**：**没有矩阵**。全站是 doge meme 娱乐站（posts 分页到 /page/58/，≈600 篇杂烩），fortune cookie 只是其中一页；同站散落 biorhythm-calculator、random-excuse-generator 等零星小工具，互不相干
- **图片/富媒体**：**全页 1 张图**（`images/chinese-fortune-cookie.png`，alt="Literally Chinese Fortune Cookie"）+ 一张站头 PNG。图片声明量约等于零
- **变现**：**零广告**（外链脚本只有 Google Analytics），无 affiliate，无付费。纯兴趣站

### schema
- 有 JSON-LD 但只有 Organization / WebSite / WebPage 三件套——**无 FAQPage、无 WebApplication**

### dogemuchwow 一句话结论
一个六年老 meme 站靠 URL 精确匹配 + 域龄 + 单图单工具挤进前 10——**说明这个 SERP 的门槛低到小站可进**，它没有任何护城河。

---

## 4. 媒体日运页（一句话记录）

- **USA Today horoscopes**（https://www.usatoday.com/horoscopes/，直接抓 403）【实测 403】：形态为**媒体文章流**——每天一篇 "Horoscopes Today, {date}"，URL `/story/life/horoscopes/YYYY/MM/DD/horoscopes-today/{id}/`，每篇列全 12 星座运势，链向 horoscope hub。纯编辑内容，无抽签工具【实勘 via WebSearch】
- **WaPo horoscopes**（https://www.washingtonpost.com/horoscopes/）：**抓取失败**（TLS 连接被拒，exit 35）【实测】。媒体日运页，同 USA Today 形态，无抽签工具，不作重点
- 共同点：**媒体日运页 ≠ 抽签工具页**，它们满足的是 "horoscope today" 不是 "fortune cookie / yes or no"，与我们的词群只有边缘重叠

---

## 5. 我们能抄什么 / 能打什么

### 能抄的（在位者已验证的招）
1. **"道具家族 + 分类 hub"的 URL 分类法**照抄升维：horoscope.com 用 `/games/{道具}.aspx` 一道具一页 + 7 个 hub，我们可做 `/fortune-cookie/`、`/yes-no-oracle/`、`/magic-8-ball/`、`/lottery-numbers/`… + `/drawings/`（或 /oracle/）hub，命名直用搜索词（horoscope.com 用 "game-" 前缀浪费了 URL 关键词，我们不带）
2. **"每日一签"回访机制**抄 dogemuchwow：daily fortune 固定（按日期种子生成，SSR 当天答案预渲染）+ lucky numbers——它把这个写进页面文案当卖点，我们做成 SEO 可抓的 "Today's Fortune, November 3, 2026" 日期页就是它没有的变体页
3. **yes/no oracle 用"抽卡"呈现**抄 horoscope.com tarot-yes-no：扇形牌背、点一张翻开——纯 DOM + CSS 可做，交互 1 步
4. **astrostyle 的"工具页包长文"结构**抄一半：工具在上、下面接 600~1000 词手写科普/FAQ/变体段（它的 H2 四段式：What is / How to use / Tool / Meaning 直接可用作模板）
5. **兄弟工具胶囊互链墙**抄 horoscope.com 的 "More Games"（8 个按钮一排）——工具站内链密度就是排名本钱

### 能打的（在位者薄弱点，逐条）
1. **horoscope.com 游戏页全站 0 个 JSON-LD**【实测】——WebApplication/FAQPage 我们全上，结构化数据直接空白区拿分
2. **fortune cookie 页正文只有 1 句话（~50 词）**【实测】——我们 600+ 词 + FAQ + lucky numbers 段，内容深度碾压
3. **无 FAQ 段**：它的 hub "FAQs" 只是链去泛占星文章，词群内没有任何页面有 FAQPage；"how many fortunes in a fortune cookie / do fortune cookies expire / why do fortune cookies have numbers" 这类问法全部无人认领
4. **道具页之间无变体矩阵**：没有按主题（love/money/career 抽签）×按问题类型的裂变页——同义词群（fortune teller / oracle / daily fortune）每页可以独立占词
5. **ASP.NET postback + 2010 年代视觉**【实测】：移动端体验差（sticky 广告 + medrec 挤压）、475×300 老图；我们原生 TS island + 移动优先，体验代差明显
6. **广告密度过高**：单页 5+ 广告位 + Primis 视频；我们克制留白，CWV/体验指标可赢
7. **astrostyle 在该词群零布局**【实测】——DR 71 的邻居完全不设防，说明无人在做内容防守，谁先做结构化矩阵谁占
8. **dogemuchwow 无护城河**【实测】：1 张图、~250 词、109 条 fortune、零 schema 富结果、零变现——正面内容战必赢；唯一要避的是别跟它比"域名老"
9. **lotto-number-generator 是 horoscope.com 全家唯一彩票工具**【实测 sitemap】但藏在 /games/calculator/ 深处、无内容包装——"lucky numbers / lottery numbers" 词群可以单独做工具页收口
10. **usa今天/wapo 媒体页不构成竞争**：文章流形态对"工具意图"词无防御
11. **在位者页面都极老**（horoscope.com lastmod 2018、doge 2019）—— freshness 信号弱，日期化日签页天然带新鲜度

### 风险提示（同样来自本次实勘）
- horoscope.com 域权极强且 132 页游戏内链墙互喂，单页硬刚拼不过域权重——**必须靠页数矩阵 + 长尾变体包抄**（对齐 tintbrew 24 矩阵页打法），不打头词正面对决
- 该 SERP AI Overview 截流风险：fortune cookie 名言/寓意属"答案型"问法（what do fortune cookies mean）——主战场压在**交互工具型**（抽签动作本身）和 printable/清单型衍生词上，对齐仓库 AI 截流分级纪律
