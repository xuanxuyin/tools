# tintbrew 分发操作手册

> 配合 [PLAN.md](./PLAN.md) 每周三例行使用 · 更新 2026-09-05
> 渠道顺序：**目录站（外链，最急）→ Reddit（真实用户）→ Pinterest 色卡 pin → Product Hunt（10 月择日）**

---

## 一、目录站（外链，当前最大缺口）

**现状**：✅ Uneed 已提交（2026-09-04）｜⬜ Peerlist ｜⬜ AlternativeTo

| 平台 | 步骤 | 状态 |
|---|---|---|
| Peerlist Launchpad | peerlist.io → 右上角注册登录 → 打开 peerlist.io/launchpad → **Launch your product**（登录后才显示）→ 表单文案抄根 README「外链提交文案」 | ⬜ |
| AlternativeTo | alternativeto.net → 搜一个同类颜色工具（如 "color mixer"）→ 进它的页面 → **Suggest an alternative** → 填 tintbrew.com + 一句话描述 | ⬜ 审核数周不急 |
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

---

## 三、Pinterest 色卡 pin（每周 2~3 个，常青流量）

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
