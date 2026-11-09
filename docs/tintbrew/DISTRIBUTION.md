# tintbrew 分发操作手册

> 配合 [PLAN.md](./PLAN.md) 每周三例行使用 · 更新 2026-09-09
> 渠道顺序：**目录站（外链，最急）→ Reddit（真实用户）→ Pinterest 色卡 pin → Product Hunt（10 月择日）**

---

## 一、目录站（外链，当前最大缺口）

**现状（2026-09-17 更新）**：✅ Uneed 已提交（2026-09-04）｜✅ Peerlist 项目卡上线（2026-09-07，Design Resources 类目，visit 链接实测通；**launch 搁置** —— 实测卡付费 "Verify Identity" 门，免费 workplace 验证不解锁，不买）｜✅ AlternativeTo 已提交（2026-09-07，审核数周）

| 平台 | 步骤 | 状态 |
|---|---|---|
| Peerlist Launchpad | peerlist.io → 右上角注册登录 → 打开 peerlist.io/launchpad → **Launch your product**（登录后才显示）→ 表单文案抄根 README「外链提交文案」 | ✅ 2026-09-07 卡片上线：类目 Design Resources，外链自动挂 `?ref=peerlist&utm_source=peerlist`（canonical 自指无重复 URL，CF Analytics 可按 utm 归因）。**launch 有验证门（09-07 撞墙；9/17 定论）**：点 Launch 弹 "Get verified to Launch" → 实际要走的 "Verify Identity" **收费**，免费 workplace 验证（09-07 已交）通过也**不解锁** launch —— 早前"通过即解锁"的判断作废。止损纪律不买 → **launch 搁置**，项目卡外链不受影响。**可选加分**：profile headline 改 "Building Tintbrew — ..."、到项目编辑确认 tagline 存的是全文（卡片在 60 字符截断属显示行为）、cover 图用现成 og-default.png（1200×630 正中推荐尺寸） |
| AlternativeTo | alternativeto.net → 搜一个同类颜色工具（如 "color mixer"）→ 进它的页面 → **Suggest an alternative** → 填 tintbrew.com + 一句话描述 | ✅ 已提交 2026-09-07，等审核（收录与否 10 月初查） |
| Product Hunt | 见本手册 §四（要预备，不是随手提） | ⬜ |

**红线**：不提交批量 SEO 目录（外链农场）。

---

## 二、Reddit（真实用户 + 最快反馈）

**总原则**：账号先养 1~2 周（目标版块里评论、答题、攒 karma）；每月 1~2 帖；**发帖前必读版规 Sidebar**（多数版禁纯链接/自我推广日限）。

### 2.1 目标版块与角度

| 版块 | 角度 |
|---|---|
| r/DIY（最大） | "配色工具"角度：调木器漆/颜料的人常问混色 |
| r/painting | 画家混色问答，答帖附工具 |
| r/webdev 或 r/SideProject（可选） | "我用 Oklab 做了个混色器" 技术角度 |

### 2.2 发帖模板（英文，直接抄改）

**主帖（r/DIY 版）—— 标题**：
```
What does red and blue ACTUALLY make? I built a free mixer that blends colors the way paint does
```

**正文**：
```
Every color mixer I found online just averages RGB values, so red + blue gives you a muddy gray-ish purple — nothing like actual paint.

I built a free tool that blends in Oklab (a perceptual color space), so the result looks like what you'd get mixing pigments. There's also a paint-vs-screen toggle, because paint subtracts light and screens add it — two different answers to the same question.

https://tintbrew.com/color-mixer/

Also has plain-English answer pages like "what does red and blue make" with exact hex values if you just want the answer: https://tintbrew.com/mix/red-blue/

Free, no sign-up, nothing to install. Would love feedback from people who mix colors for a living.
```

**答帖姿势**（长期主力）：搜 `site:reddit.com "what color does red and blue make"` 这类问题帖 → 先认真回答 → 自然附上 /mix/ 页链接（答帖比主帖存活率高得多）。

### 2.3 万圣烘焙帖（10 月季节主力，2026-10-04 补位）

> **勘误**：9/24（"§3.4 文案在位"）与 9/29（"§二文案在位"）两处判定引用悬空——git 实勘 frosting 文案从未写入本手册（§二自 9/09 起只有 mixer/DIY 模板），本节为当日补齐。

**版块选择**：

| 版块 | 用法 |
|---|---|
| r/Baking（主战场，量最大） | 主帖 text post，Halloween 角度（文案在下） |
| r/cakedecorating（备选，人群最准） | 若 r/Baking 版规禁 text 帖/外链，同文案微改发这里 |
| r/AskBaking（答帖池） | 搜 `black frosting gray` 新旧问帖 → 认真答 + 附页面链接 |

**账号门槛（Reddit 通用现实）**：新号带链接发帖大概率被 AutoMod 静默过滤；多数大版要求账号 ≥7 天 + 少量 karma。无老号 → 10/04 建号养 7~10 天，10/12~15 发帖（万圣烘焙窗持续到 ~10/28，来得及）。**养号**：订阅上述版块 → 每天 2~3 条真诚评论（任何兴趣版均可）→ 攒 50+ karma → 发帖前一晚读目标版 Sidebar 确认版规（以版规为准：text/外链/自推日限/账号门槛）。

**发帖时机**：周二~周四，美东 9~11 点（= 北京 21:00~23:00）；发后守评论区 1 小时（帖生死在前一小时）。

**主帖文案（r/Baking，直接抄）——标题**：
```
Why your black frosting is gray, not black — and four ways to fix it before Halloween
```

**正文**：
```
If you've ever loaded a whole bottle of black gel into white buttercream and still ended up with gray, it's not you. It's physics.

White frosting reflects basically all light. Dye can only subtract light, never add it — so going from white to true black means subtracting almost everything, and that takes enough dye to taste bitter (and turn buttercream to soup if you're using liquid coloring; gel or bust).

Four routes that actually work:

1. Chocolate base + black gel (how bakeries do it). Dark chocolate buttercream is already 80% of the way to black, so you need a fraction of the gel, no bitter edge, and it tastes like chocolate. Start with an eighth of a teaspoon of gel per cup of buttercream, cap around a quarter.

2. Black cocoa. Swap a quarter of your regular cocoa for onyx (black) cocoa — the ingredient that makes Oreo filling taste like Oreo filling. Lands near-black on its own, basically no dye.

3. White base + heavy gel. The vanilla-must-stay route. Fair warning: it has a ceiling — charcoal, not true black, even after it deepens overnight.

4. No black gel at all? Red + blue + green gel in white frosting cancels itself out. It works as a rescue, but it lands muddy and eats flavor. Emergency only.

And the free trick everyone sleeps on: black gel darkens as it hydrates. What looks dark gray at 8pm reads black by morning. Let it rest overnight before you add more dye — extra dye costs flavor, resting is free.

I got deep enough into frosting color math that I ended up building a free tool that computes what any blend of icing colors actually looks like, at exact ratios (no signup, nothing for sale): https://tintbrew.com/how-to-make-black-frosting/

There's a full icing color chart too if you're building out a whole Halloween palette: https://tintbrew.com/icing-color-chart/

Happy to take color questions in the comments — "orange that doesn't look neon" is another fun one.
```

**发帖操作坑（10/14 实勘）**：r/Baking 强制 flair（中文界面叫"帖子标识"，不选发布时报"你的帖子必须包含帖子标识"）→ 发帖页标题框下方点 **"标识"（Flair）按钮 → 选 General Baking Discussion**【实测 10/14 全列表】。勿选 Recipe Included（强制附完整配方）/ Baking Advice Needed（求助专用）/ Showcase (No-Recipe)（晒成品专用）。

**⚠️ 10/14 实战判读：主帖被站方 spam filter 移除**（发帖+flair 全对，发布即被"Reddit 筛选器"移除，非版主手删）——9 天新号 + 主帖带 2 个商业链接 = **账号信誉门**，与 Pinterest 域名信誉门同构。红线执行：**不重发、不删帖**。处置双路线：A. modmail 申诉一次（文案见下），24h 无回音不追问；B. **主线转答帖**（本节红线既定"答帖永远优先于主帖"）——r/Baking 搜 `black buttercream`/`black frosting` 按 New 排序找 7 天内求助帖，先实答后带链、单帖单链。主帖重试门槛：账号 ≥1 个月 + karma 有积累。

**Modmail 申诉文案（直接抄）**：标题 `Spam filter removed my post — could you take a look?`；正文如下。**入口坑（10/14 实勘，判读二次修正）**：modmail 通道（收件人 = r/Baking 团队）也报 "You can't message that user" —— **不是走错入口，是发消息这个动作本身被拦**：疑① 零 karma 新号消息门槛 ② 帖子被 filter 移除后账号进观察状态。排查：无痕窗口开 `reddit.com/user/<用户名>/` ——"找不到用户"= 被隐藏（shadowban），登录态走 `reddit.com/appeals` 申诉；主页正常 = 新号消息门槛，**modmail 直接放弃**（本就白赚路线），主线转答帖（评论门槛远低于消息，r/Teachers 答帖先例在）

> Hi mods — my post about getting buttercream to true black (General Baking Discussion flair) was removed by Reddit's spam filter right after posting. My account is only about a week old, so I'm guessing that's what tripped it. The post is a practical guide — four routes to black frosting, why gel beats liquid, the overnight-darkening trick — and it links to a free color-mixing calculator I built (no signup, nothing for sale). If it looks okay within the rules, would you consider restoring it? Happy to edit or trim the links if that's the concern. Thanks!

**红线**：帖被过滤/删除不要原样重发（spam 判定会加重）；同文案不连发多版（换版块隔天 + 改角度）；答帖永远优先于主帖（存活率高）；不买 upvote。

---

## 三、Pinterest 色卡 pin（每周 2~3 个，常青流量）

> **⚠️ 渠道休眠（2026-09-29 裁定）**：chartglade 同日四连拦实锤 DR0 新域**域名级信誉门**（拦 link 不拦账号），tintbrew 域更年轻必同拦 —— 本节冻结，设置（§3.1）暂不做。探针随双站日历：**10/15、11/15 各发 1 个带链接 pin**，通了才启动本节；11/15 仍拦 = 永久关案。**10 月万圣分发主力 = Reddit 烘焙帖单一渠道**（§二文案在位）。

和 chartglade 的打印件 pin 不同 —— **tintbrew 的 pin 是色卡**：一张大色块结果图 + 问题式标题。

### 3.1 一次性设置（15 分钟）
和 chartglade 手册 §1.1 相同流程（Business 账号 + 认领 tintbrew.com），简介改用：
`Free color tools: a paint-accurate color mixer, format converter, and plain-English answers to "what does red and blue make" and 23 more mixes.`

Board 建 1 个：**Color Mixing Answers**（描述：What two colors make ___? Exact answers with hex values, tints and shades.）

### 3.2 pin 图做法
Canva 1000×1500 竖版 → 上 2/3 放两个大色块（原料色）+ 中间加号 + 结果大色块 → 底部大字问题标题。字要占 1/3。

### 3.3 首批 5 个 pin（文案直接抄）

| # | pin 图大字 | 目标 URL | 描述 |
|---|---|---|---|
| 1 | What Does Red and Blue Make? (Answer + Exact Hex) | /mix/red-blue/ | The real answer, plus tints, shades and the paint-vs-screen difference. https://tintbrew.com/mix/red-blue/ #colormixing #painting #colortheory |
| 2 | What Does Blue and Yellow Make? | /mix/blue-yellow/ | Exact result with hex values — and why screens show green but paint shows green too (when done right). https://tintbrew.com/mix/blue-yellow/ #colormixing #arttips |
| 3 | What Colors Make Purple? | /what-colors-make-purple/ | Every route to purple: red+blue ratios, tints, shades. https://tintbrew.com/what-colors-make-purple/ #colortheory #purple #painting |
| 4 | What Colors Make Brown? | /what-colors-make-brown/ | Brown has more recipes than any color — here they all are with exact values. https://tintbrew.com/what-colors-make-brown/ #colormixing #brownpaint |
| 5 | What Does Black and White Make? (It's Not Just Gray) | /mix/black-white/ | The exact grays at every ratio. https://tintbrew.com/mix/black-white/ #colortheory #grayscale |

---

## 四、Product Hunt 预备清单（10 月择日，外链权重最高）

**选日**：周二~周四（周一竞争大、周末流量死）。避开大牌发布日（当天 X 上有大厂 launch 就顺延）。

**上线前 1 周备齐**：
- [ ] 5 张截图：mixer 交互中 / converter / 一个 /mix/ 答案页 / 一个场景页（icing chart）/ 手机端
- [ ] 1 个 15~30 秒 GIF 或视频（混色过程最好卖）
- [ ] Tagline（≤60 字符）：`Mix colors the way paint actually mixes`
- [ ] First comment 故事稿（为什么做：现有 mixer 都是 RGB 平均会变灰泥）——发布后立刻自己发
- [ ] 首页加 PH badge（可选）

**红线**：不能买 upvote/刷票（封号+社区拉黑）。冷启动靠真实朋友+邮件列表。

---

## 五、节奏总表

| 频率 | 动作 | 时长 |
|---|---|---|
| 每周三 | 2~3 个色卡 pin（§3）或 1 个目录站/社区动作 | 15 分钟 |
| 每月 | 1~2 个 Reddit 帖（§2，主帖+答帖混着来） | 15 分钟 |
| 10 月 | Product Hunt 发布（§四） | 半天 |

## §6 Reddit 蹲守班工具包（2026-10-26 配齐；万圣窗口至 10/31）

**入口（Reddit 站内搜索，sorted=New + t=week，只答 7 天内新帖——老帖零流量不碰）：**

- https://www.reddit.com/r/Baking/search/?q=black%20frosting&restrict_sr=1&sort=new&t=week
- https://www.reddit.com/r/AskBaking/search/?q=black%20frosting&restrict_sr=1&sort=new&t=week
- https://www.reddit.com/r/cakedecorating/search/?q=black%20frosting&restrict_sr=1&sort=new&t=week （10/26 实勘新增：黑霜饰主战场，原清单漏）
- https://www.reddit.com/r/Baking/search/?q=orange%20frosting&restrict_sr=1&sort=new&t=week
- https://www.reddit.com/r/AskBaking/search/?q=frosting%20color&restrict_sr=1&sort=new&t=week

**模板 A · 黑霜饰帖（先实答后带链，链接 = /how-to-make-black-frosting/）：**

> Black frosting is the classic Halloween trap. What actually works:
>
> Start from chocolate — white buttercream needs a mountain of black gel and ends up bitter with tooth-stain. Make a dark chocolate buttercream first, then add black cocoa powder. That gets you most of the way with no bitter aftertaste.
>
> Finish with gel (Americolor Super Black), a few drops at a time — never liquid food color.
>
> And the step everyone skips: let it rest. It deepens a lot overnight. Dark gray at 10pm is properly black by morning.
>
> I wrote up the full method with drop counts here if it helps: https://tintbrew.com/how-to-make-black-frosting/

**模板 B · 调色问法帖（链接 = /buttercream-color-chart/）：**

> Gel color, not liquid — and mix 15 minutes before you judge it, colors deepen as they sit. If you're blending (a true orange, a deep purple), start with the lighter color and add the darker one drop by drop — it's way easier to darken than to walk back.
>
> I keep a buttercream color chart with drop counts I made for reference: https://tintbrew.com/buttercream-color-chart/

**纪律：单帖单链；一条账号一天最多 1~2 带链答（养号在先）；无对口新帖 = 零动作收班，不硬答。**

**判定口令（10/26 实战补）：标题对口 ≠ 正文对口 —— 必须点开读原帖正文，确认问的是"颜色怎么调"才出手。** 实例：r/Baking "Black buttercream frosting help"（48 票/31 评）标题完美对口，正文实为油水分离质地救援帖（热评全在讲 rewhip/喷枪），调黑答案在那里 = 答非所问+热帖当众 spam。撤答零损失，窗口到 10/31 每天侦查成本 2 分钟。

## §7 外链扩容清单（2026-11-03 立）

> 背景：SEMrush 引荐域名 38 / 曝光走低（11/03 GSC 判读在案）——DR0 期**权威与收录是第一瓶颈**，本节是外链通道的扩容清单。红线照旧：不买链、不碰链农场、不在无关内容里塞链。

### A. 手作 Reddit 三版（最高优先 —— 正中拼豆主战场）

- **版块**：[r/PerlerBeads](https://www.reddit.com/r/PerlerBeads/) · [r/beadsprites](https://www.reddit.com/r/beadsprites/) · [r/PerlerBeadArt](https://www.reddit.com/r/PerlerBeadArt/)
- **先例实勘（11/03）**：r/beadsprites 有 **"I made a free tool that turns pictures into bead patterns" 发布帖被社区接受** —— photo 工具发布帖姿势成立，照抄
- **规则红线（实勘）**：作品帖必须原创或注明出处；Reddit 站内 90/10 自推比；单帖单链；养号纪律与 §2 一致
- **三张牌**：① 晒成品帖（gallery 出图 + "pattern here" 评论带链，最自然的姿势）② 图纸资源帖（117 张免费图纸，按题材分发）③ photo 工具发布帖（养号满后，对标先例帖写法）
- **蹲守入口**（答帖用，模式同 §6）：`r/PerlerBeads/search/?q=pattern+help&restrict_sr=1&sort=new&t=week`、`q=how+to+make`、`q=color`

### B. GitHub awesome-list PR（dofollow，DR90+，单条质量最高）

- **候选 repo（11/03 实勘）**：`bradtraversy/design-resources`（老牌，有 Color 区）/ `MohamedYoussouf/Design-Resources` / `F4dhil9ant3ng/awesome-design`（有 Color Tools 类）/ `GracieCreates/Design-Resources-for-Developers`
- **动作**：各 repo 提 1 个 PR，在 Color Tools 区加一行：`TintBrew — free color mixer (Oklab perceptual blending), HEX/RGB/HSL converter & printable color mixing charts`
- **纪律**：先读各 repo CONTRIBUTING（多数要求按字母序/格式）；一 repo 一 PR 不催不@；被拒不缠
- **门槛**：👤 需 GitHub 账号；PR 文案 🤖 已备（上句直接抄）

### C. Quora 答帖（AI 截流对冲的第二战场）

- 逻辑：what colors make X 族在 Quora 有存量问题帖且 Quora 自己对这类词有排名——答帖骑 Quora 的排名吃长尾点击
- 动作：搜 `site:quora.com "what colors make brown"`（及 purple/green/orange/blue）→ 找近 2 年内有问题 → 先实答（Oklab 混色结论 + 实操比例）→ 自然附 /mix/ 或头词页链接
- 红线：同 §6 判定口令——问题对口才答；单号日 1~2 带链答上限

**答帖文案包（11/03 🤖 备齐，Quora 问题 URL 均实搜现存）**

主答对象（各 1 条，48h 无删再复投备选）：
- Brown → [What two colors do you mix to make brown?](https://www.quora.com/What-two-colors-do-you-mix-to-make-brown)（备选 B2: ...primary-colors-needed-to-make-brown-without-using-black / B3: ...what-crayon-colors-make-brown）
- Purple → [What colours mix to make purple?](https://www.quora.com/What-colours-mix-to-make-purple)（备选 P2: ...what-primary-colors-make-purple-when-combined / P3: ...ways-to-mix-paint-colors-to-create-different-shades-of-purple）

**Brown 版（~165 词，主体知识>80%，链接只出现在末句延伸位）**：

> Brown isn't a single recipe — it's what you get whenever the three primaries end up in the same mix. The three easiest ways:
>
> 1. **Red + yellow + blue.** Equal-ish parts give a middle brown; more yellow pushes it toward tan, more red toward rust, more blue toward a cooler chocolate.
> 2. **Complementary pairs.** Orange + blue, red + green, or yellow + purple — complements neutralize each other into brown. Orange + blue is my favorite because a little extra orange keeps it warm and sandy.
> 3. **Orange + black**, if you don't mind a flatter, duller brown. It's fast but less lively than a complementary mix.
>
> The tricky part is that ratios matter more than the colors themselves, and tube paints vary a lot by brand. When I'm testing a mix for a project I use a free color mixer like [tintbrew.com/color-guides/what-colors-make-brown/](https://tintbrew.com/color-guides/what-colors-make-brown/) — it shows the actual blended result with hex values so I can preview the shade before committing real paint.

**Purple 版（~155 词）**：

> Purple is simply **red + blue** — but which red and which blue decides everything.
>
> A cool blue (ultramarine, cobalt) with a warm red gives a rich, true purple. If you use a red that leans orange (like cadmium red), the orange fights the blue and you get a muddy, brownish plum instead. Same with green-leaning blues. So the classic beginner frustration "my purple turns gray" is almost always the paint choice, not the mixing.
>
> Quick adjustments from the base mix: more blue for a cooler violet, more red for magenta-leaning purple, a touch of white for lavender tints, a tiny bit of black (or the complement, yellow) for deep eggplant.
>
> I got tired of wasting paint testing ratios, so I use a free color mixer — [tintbrew.com/color-guides/what-colors-make-purple/](https://tintbrew.com/color-guides/what-colors-make-purple/) has the full breakdown, and you can see any red-blue blend rendered live before touching a brush.

### D. Product Hunt 正式排期（§四预备清单激活）

- 9 月立预备未发，**现在时机更好**：gallery UGC + 117 张图纸 + photo 工具三件套齐了，launch 故事完整
- PH 本体链接 nofollow，但真实价值在**二次聚合**（launch roundup 博客/目录抓取站）——这才是引荐域名增量
- 时机：与 §3 每周节奏错开，选周二~周四美东 0:01 PT 标准打法；物料照 §四清单准备

### E. 目录站补一轮（nofollow 为主，价值 = 加速发现与收录，低优先有空再投）

- [SaaSHub](https://www.saashub.com/add-service)（color tool 类目，较正规）→ 备选：Launching Next / Startup Stash / StartupBase（长尾目录，质量一般，不排队）

### F. Roundup / 资源页外联（最慢，但引荐域名质量最高）

- **Craft 博客 roundup**：搜 `"best perler bead patterns" blog -reddit -pinterest` → 博客 listicle → 定制邮件求收录（hook = 117 张免费图纸 + 在线编辑器，都是别人没有的差异点）
- **教育/homeschool 资源页**：搜 `"color mixing chart" printable resources page` → 教师资源清单页 → 求 /color-mixing-chart/ 入列
- 节奏：👤 每周 5 封定制邮件；🤖 每轮拉 20 个目标 + 每站一句定制切入点

**扩容名单（11/03 🤖 全量调研 23 目标，全部实抓 200 或实搜确认；hook 逐站定制禁群发；除 CraftGossip 外均无投稿入口 = 邮件外联）**

| # | 站点 | roundup 文章 | 推资产 | hook 一句 | 验证 |
|---|------|------|------|------|------|
| 1 | itsalwaysautumn.com | The GIANT list of Perler Bead Patterns | photo 转换器 | ✅ 已发（附注四） | ✅ |
| 2 | redtedart.com | Melty Bead Crafts (Hama) | photo 转换器 | hama 项目多是平面图形——转换器让孩子把自画/全家福变成可拼图纸 | ✅ |
| 3 | frugalfun4boys.com | Printable Christmas Perler Bead Patterns | photo+editor | 四娃妈省钱手工——免费照片转图纸省下图纸书钱，带自动珠数购物清单 | ✅ |
| 4 | onelittleproject.com | FREE Christmas Perler Bead Patterns | photo 转换器 | 你出季节免费图纸——读者还能免费从自己照片生成 | 🛡 |
| 5 | picklebums.com | 40 Best Perler Bead Ideas | photo+editor | 混龄娃家长——291 色编辑器让大孩子自己设计而非抄现成 | ✅ |
| 6 | thatkidscraftsite.com | Back to School Perler Bead Patterns | photo 转换器 | 季节图纸之间给读者一个自制名字/照片图纸的生成器 | ✅ |
| 7 | fusebeadpatterns.com | Free Patterns: Go-To Resource Guide | photo+editor+gallery | 你的资源指南缺"自己造图纸"入口——免费转换器+291 色编辑器补位 | ✅ |
| 8 | doodlecraftblog.com | Minecraft Perler Beads + 100 Crafting Ideas | photo 转换器 | 像素画×拼豆交叉读者——精灵图/照片一键转图纸 | ✅ |
| 9 | **craftgossip.com** | Things To Do With Perler Beads | photo 转换器 | **唯一有官方投稿入口**（/suggest-a-link/ 抓到 200）→ 投 jewelry/crafts 子站编辑 | ✅ |
| 10 | 3dinosaurs.com | Fine Motor Perler Bead Planets | photo 转换器 | 精细动作活动用简单网格——孩子自画变可拼图纸是自然下一步 | 🛡 |
| 11 | weareteachers.com | Best Websites for Teaching Drawing | mixer+brown 指南 | Chromebook 可用配色混合器，art-on-a-cart 老师零备课 | ✅ |
| 12 | theartofeducation.edu | 12 Ways to Teach the Color Wheel | mixer+指南 | 数字站点：学生先预测混色再用感知混合器验证（真名+hex） | ✅ |
| 13 | myartlesson.com | Resources for Playing and Learning About Color | mixer | 你的色彩资源合集收免费 mixer——感知混色+命名结果适合 mixing station | 🛡 |
| 14 | ideasforlearners.com | Perler Beads in the Library | photo+gallery | 图书馆拼豆项目靠打印图纸——孩子照片变图纸+画廊展示可能性 | ✅ |
| 15 | arttecheducation.com | 10 Art Teacher Tech Tool Must-Haves | mixer+editor | 科技清单补免费浏览器混色器+像素编辑器，学生 Chromebook 免账号 | ✅ |
| 16 | cursorup.com | 9 Color Palette Generators | mixer | 别人选色——我们混色：Oklab 感知混合是清单缺的"这两色出什么"工具 | ✅ |
| 17 | fueler.io | Top Color Palette Generators for US Brands | mixer | 品牌团队吵中间色——免费混合器当场定案并命名结果 | ✅ |
| 18 | logodesign.net | Best Color Tools You Need to Try | mixer | 清单有取色器无"两色混什么"——正好是它缺的 | ✅ |
| 19 | designmantic.com | 100+ Color Tools | mixer | 100+ 工具里仍无感知混色器——Oklab+hex+人话色名 | ✅ |
| 20 | recsitedesign.com | 30 Color Tools to Spice Up Web Design | mixer | 有 Khroma/ColorZilla——补一个可分享的真中间点混色器（非 RGB 平均） | ✅ |
| 21 | schoolofmotion.com | 10 Tools to Design a Color Palette | mixer | 动态设计师做渐变要感知中点——任意两色真中点+hex 输出 | ✅ |
| 22 | tckpublishing.com | 14 Color Palette Generators for Brand | mixer | 作者建品牌色板要知道两色合出什么——即时混合+命名 | ✅ |
| 23 | weseegiants.com | Color Generators 资源页 | mixer | 生成器页缺 blending 用例（都只 pick 不 mix） | ✅ |

执行序：CraftGossip（唯一有入口）→ 手作 2~8/10（推 photo 工具）→ 设计类 16~23（推 mixer，同质化低）。🛡 = 反爬 403/429 但 URL 来自该站真实搜索结果页（页面存在），外联时先核邮箱。

### 生效判定

- **两周后（11/17）SEMrush 引荐域名 38 → 45+** = 本清单通道生效；不到 → 复盘哪组没执行而不是换通道
- 分工：🤖 备全部文案/目标清单；👤 执行提交（账号在手：Reddit 号已养、GitHub/Quora 需注册）

### §7.1 竞品外链拆解实勘（2026-11-03，👤 SEMrush 拉数）

> 对象：`perlerbeadpatterns.org`（2026-06 上线、排 #2 的对位竞品）Backlink Analytics · Referring Domains。数据部分在案（👤 后续滚动补样，重点是找真编辑链接）。

| 链型 | 代表 | 定性 |
|---|---|---|
| 垃圾目录群发 | alive-directory.com ×30+（同站几十个分类页挂同一锚文本 "Perler Bead Patterns"） | 自动提交机器人，凑数 |
| **付费 PBN/链农场（买链实锤）** | offpagebuilders.xyz / *.xyz 站群（"Thanks to... paid blog posts 🎯" 假证言互抄）、"Buy Backlinks Online Cheap"/"Professional Tiered Link Building" 锚文本页 ×10+ | **它雇了便宜 SEO 黑手**；锚文本裸奔，Google spam update 清理高危 |
| 正路免费目录 | startupfa.st / firstsited.com（launch 页）/ trustprofile.com（会员页 nofollow） | 唯一像样的动作，都是免费提交 |
| **真实编辑链接** | fannyprintable.com（printable 博客，锚 "Free Perler Bead Patterns PDF" → /free-patterns） | **全 profile 仅 1 条** |
| 杂项 | LeakIX 扫描页 / skywalkerband.com 盗图热链 / Yahoo 快照 | 无价值 |

**三条定论**：
1. **外链不是它的护城河，内容才是**——5 个月冲 #2，白帽编辑链接仅 1 条。本细分排名门槛 = 内容+收录，外链是加速器不是门票。我方"外链太少"焦虑再降一档。
2. **垃圾链大概率没帮它，但也确实没被罚**（诚实存疑：无法证伪 PBN 对当前排名的贡献）。**我方不跟**：红线"不买链不碰链农场"不变——它 "Buy Backlinks Online Cheap" 锚文本是裸奔状态，spam update 一到整批清理有先例；且我方双站矩阵连坐赌不起。
3. **§7 执行到位，两周内外链质量全面反超**：4 条 dofollow DR90 GitHub PR > 它全部外链之和。

**火力分配定稿（勘定 11/03）**：
- **F 组升主通道**：它唯一的真链接来自 printable 博客 roundup 形态 → 证明有效且无人抢。20 目标清单 + 每周 5 封 = 最高优先执行。
- **E 组扩名单**：startupfa.st、firstsited.com 照做（免费提交，photo 工具吃 startup/productivity 目录形态）。
- **A/B/C 不变；不复制 PBN 黑链（红线在案）**。

> **附注（11/03）：tintbrew 自身也被垃圾链群发命中** —— bl.rankvance.com / now.rankvance.com 两条中介广告页链（2000 外链/页模板群发，锚 `tintbrew.com`，11/02 SEMrush 发现）。判定：**链群轰炸/删链勒索漏斗，非我方产出**。处置：忽略不 disavow（Google 自动打折）、收到"付钱删毒链"邮件一律不回、11/17 对账时这两条不计入通道产出。

> **附注二（11/03 晚）：tintbrew 自身 profile 深查 —— 垃圾链轰炸从 9/8 起持续，38 基线是脏的**
> ① 全貌：rankvance.com 子域 ×50+ / fiverr-seo-*.site 站群 / linkly.agency *.xyz 假证言站群 / keywordrocket.shop / seoimprovementtool.shop / kaila.biz 类 WHOIS 爬虫站，9/8~9/10 起持续至今，全 nofollow/AS 0~41 模板页。**铁证无差别扫描**：kaila.biz 列表页标题即 "New & Old Domains (2026/09/07/140)" —— 专爬新注册域名批量喷链，tintbrew 9/4 上线 9/7 入快照。**判定：被动中招的炮灰，非我方产出，与竞品主动买链性质不同**。处置不变：忽略不 disavow、不回删链邮件；GSC 曝光曲线持续涨 = 实证未伤。
> ② **⚠️ 对账口径修正**：原 11/17 线 "SEMrush 引荐域名 38 → 45+" 里 38 含大量上述垃圾域 → 照原口径垃圾链一涨就"达标"。**改数质量引荐域名**：排除 rankvance.com / *.xyz 站群 / fiverr-seo-*.site / *.shop SEO 广告站 / WHOIS 爬虫站后的人工编辑域。**新线：11/17 质量域名 ≥15 即胜**（B 组 4 + A 组 Reddit 1~2 + E 组目录 2~3 + 自然增长）。

> **附注三（11/03 晚）：Referring Domains 全量分拣（👤 导出，38 域全在案）**
> 分拣：**明确垃圾网络 28**（rankvance.com 独占 165 条链接=全站 3/4；*.xyz 假证言 ×12；fiverr-seo-*.site ×5；*.shop 广告站 ×6；WHOIS 爬虫 ×3）+ **可疑杂域 9**（nairmobilya/假 pandora/假 nike 等，9/9~9/12 同批喷入）+ **质量域名仅 1** = **launchindex.net**（AS7/nofollow/10/14，startup launch 目录，**非我方提交**——自动收录新工具站的生态存在，E 组可行性反向验证）。
> **终版基线：质量引荐域名 = 1（launchindex.net）**。11/17 对账线终定：**1 → ≥15**（拆解：B组 GitHub 4 + A组 Reddit 1~2 + C组 Quora 1 + E组目录 3~4 + 自然 2~4 ≈ 11~15，全通道执行才够得着，不到=复盘执行率）。

> **附注四（11/03）：F 组首发已发** —— 目标 #1 itsalwaysautumn.com（GIANT list of Perler Bead Patterns，autumn@itsalwaysautumn.com，👤 邮箱直发）。钩子：117 张 1:1 打印图纸 + 在线换色编辑器 + photo 转换器。**Follow-up 时点 11/13**（7~10 天无回 → 发一封 follow-up，再无回 → 弃站换下一目标，不缠）。余 4 目标（kidsactivitiesblog / rockyourhomeschool / teacherscoutmom / montessorilessons）👤 找邮箱 → 🤖 逐站定制文案（钩子各不同，禁一稿群发）。
