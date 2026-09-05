# chartglade 分发操作手册

> 配合 [PLAN.md](./PLAN.md) 每周三例行使用 · 更新 2026-09-05
> 三大渠道按投入产出排序：**Pinterest（主战场）→ 目录站（外链）→ 教师社区（真实用户）**

---

## 一、Pinterest（printables 赛道第二流量引擎）

**为什么重要**：老师/家长在 Pinterest 搜 "free printable ___" 是日常习惯；pin 的流量半衰期以月计（对比社交帖几小时），是打印件站点天然的常青流量池。图是唯一入口 —— pin 图上的字必须大。

### 1.1 一次性设置（15 分钟，只做一次）

1. **pinterest.com → Sign up → 选 Business account**（免费，能看每个 pin 的数据）。邮箱用 hello@chartglade.com（Email Routing 已通，验证邮件会转发到你的真实邮箱）
2. **资料页**：
   - 名字：`ChartGlade`
   - 简介（照抄）：`Free printable teaching charts for K-5 — place value, multiplication, sight words and cursive. No download, no sign-up: open and print.`
   - Website：`https://chartglade.com`
3. **认领域名**（让 pin 统计归到我们）：Settings → Claimed accounts → Claim a website → 选 HTML tag 方式 → 把给出的 `<meta name="p:domain_verify" ...>` 标签发给 Claude，接进 `SeoHead.astro` push 即可（同 GSC 验证的做法）
4. **建 3 个 Board**（Create board）：

| Board 名 | 描述（照抄） |
|---|---|
| Place Value & Math Charts | Free printable place value charts, multiplication tables, hundred charts and number lines for K-5 math. |
| Sight Words Printables | Free printable sight word lists and cards — Dolch and Fry, preschool through third grade. |
| Cursive Alphabet & Handwriting | Free printable cursive alphabet charts and letter-by-letter practice sheets. |

### 1.2 每周发 pin（15 分钟，3~5 个，固定节奏 > 一次轰炸）

**pin 图怎么做**（零设计基础版）：
1. 用 Canva（免费）→ 创建 1000×1500 竖版设计（Pinterest 最优比例 2:3）
2. 背景：站内绿色 `#2f7d4f` 或白底
3. 内容：**大字标题**（手机信息流 95% 的展现场景，字要占图 1/3）+ 打开对应页面截图打印件区域贴上去
4. 导出 PNG

**标题公式**：`FREE + 打印件名 + Printable +（年级/数量钩子）`
**描述公式**：一句话价值 + 网址 + 话题标签（3~5 个：`#printables #teacherresources #homeschool #kindergarten #freeresources` 里挑）
**链接**：指向**具体页面**（绝不发首页链接）

### 1.3 首批 5 个 pin（文案直接抄）

| # | pin 图大字 | 目标 URL | 标题 | 描述 |
|---|---|---|---|---|
| 1 | FREE Cursive Alphabet Chart — Print in One Click | /cursive-alphabet/ | Free Printable Cursive Alphabet Chart (A-Z) | All 26 letters, uppercase and lowercase, with a tracing strip — print straight from your browser, no download. https://chartglade.com/cursive-alphabet/ #cursive #handwriting #printables |
| 2 | FREE Place Value Chart (to Millions) | /place-value-chart/ | Free Printable Place Value Chart — Ones to Millions | Every grade 2-5 place value lesson starts here. Print it, use the interactive version in class. https://chartglade.com/place-value-chart/ #placevalue #mathprintables #teacherresources |
| 3 | Multiplication Chart 1-12 — Free & Printable | /multiplication-chart/ | Free Multiplication Chart 1-12 (Printable) | The classic 1-12 times table, print-ready. Diagonal highlighted, blank version included. https://chartglade.com/multiplication-chart/ #multiplication #timestables #3rdgrade |
| 4 | Kindergarten Sight Words — Full List Printable | /kindergarten-sight-words/ | Kindergarten Sight Words List (Free Printable) | The complete kindergarten word list in printable cards — click any card to hear how it's taught. https://chartglade.com/kindergarten-sight-words/ #sightwords #kindergarten #printables |
| 5 | Cursive F — How to Write It (Free Practice Sheet) | /cursive/f/ | How to Write a Cursive F (Free Practice Sheet) | The trickiest letter, stroke by stroke, with a trace-and-write sheet. https://chartglade.com/cursive/f/ #cursive #handwritingpractice #teaching |

**红线**：新号一周别超过 5 个 pin（限流）；不重复 pin 同一 URL 到同一 board；被限流就停一周。

---

## 二、目录站（首批外链，顺序执行）

| 平台 | 入口 | 动作 | 备注 |
|---|---|---|---|
| Uneed | uneed.best | Submit（tintbrew 走通过同流程） | 先做 |
| Peerlist Launchpad | peerlist.io/launchpad | 登录后点 Launch your product | 免费 |
| AlternativeTo | alternativeto.net | 搜竞品（"K5 Learning" 或 "MyCursive"）→ 进它页面 → **Suggest an alternative** → 填 chartglade.com | 审核数周，不急 |

**提交文案包（英文，直接复制）**：

- **Name**: ChartGlade
- **URL**: https://chartglade.com/
- **Tagline**: Free printable teaching charts that print straight from your browser.
- **Short description**: Free printable charts for K-5 — place value, multiplication, sight words and the cursive alphabet. No download, no sign-up, no email wall: open the page and hit print.
- **Long description**: ChartGlade is a free printables site for K-5 teachers, homeschool parents, and tutors. Every page IS the printable: place value charts to the millions, multiplication tables 1-12 through 1-20 (filled and blank), hundred charts, number lines, fraction strips, the full Dolch and Fry sight word lists by grade, and a 26-letter cursive alphabet section with letter-by-letter stroke breakdowns and practice sheets. Pages print on one clean letter sheet — landscape automatically for wide charts. Everything runs in the browser, free forever, with no accounts and no PDF downloads to manage.
- **Contact**: hello@chartglade.com

**红线**：不提交"350+ 高 DA"批量目录（外链农场，反噬）。

---

## 三、教师社区（真实用户 + 真实反馈）

**总原则**：Reddit 反硬广。**账号先养 1~2 周**（在目标版块评论、回答问题、攒 karma），再发第一帖。每月 1~2 帖，跨版不重发同一内容。

### 3.1 目标版块

| 版块 | 规模/特点 | 发帖角度 |
|---|---|---|
| r/Teachers | 最大教师社区 | "免费工具分享"角度 |
| r/Kindergarten | 幼师，printable 重度用户 | sight words / alphabet chart |
| r/homeschool | 在家教育家长，采购决策人 | 全科角度 |
| r/3rdGrade 或 r/teaching | cursive 正是 3 年级内容 | cursive 字母页 |

**发帖前必做**：读版规（Sidebar Rules）—— 多数版禁纯链接帖，违规会被删+标记，号就废了。

### 3.2 发帖模板（英文，改年级词复用）

**标题**（r/homeschool 版）：
```
I made a free printable cursive alphabet — no download, no email, just open and print
```

**正文**：
```
Hi all — I built a small free site for K-5 printable charts (place value, multiplication, sight words, cursive). No accounts, no PDF downloads, no email wall: you open the page and print, which always annoyed me about worksheet sites.

The cursive section has the full A-Z chart plus a page per letter with the strokes broken down and a trace-and-write sheet (my kid's teacher assigns cursive this year, so this started as a homework survival tool).

Would love feedback from people who actually teach: https://chartglade.com/cursive-alphabet/

Everything is free and I'm not selling anything — if a mod wants this formatted differently, happy to comply.
```

**要点**：第一句给价值 + 坦白是自己做的 + 主动提版规 → 社区接受度最高的三件套。评论区有人问就答，**别追着发链接**。

---

## 四、低优先级备忘（暂不做）

- **Facebook 教师群组**：闭群需申请，慢但精准 —— Pinterest/Reddit 跑顺后再说
- **TPT（Teachers Pay Teachers）**：商城形态，不做卖家；只当竞品研究对象
- **X/Twitter 教师圈**：投入产出低，放弃

## 五、节奏总表

| 频率 | 动作 | 时长 |
|---|---|---|
| 每周三 | 发 3~5 个 pin（§1.2） | 15 分钟 |
| 每月第 1 周 | 1 个社区帖（§3，换版块） | 15 分钟 |
| 每月 | 1 个目录站提交（§2 顺序往下走） | 10 分钟 |
| 随时 | 有 mod 要求/p:domain_verify 标签 → 找 Claude 接代码 | — |
