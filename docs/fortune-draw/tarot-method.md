# 塔罗 — 完整玩法规格

> 2026-11-07 👤 给出骨架（洗牌/切牌/抽牌/解牌四步 + 新手牌阵），Claude 检索补全。
> 78 张结构、四花色 14 张制、正逆位经多源确认【实勘】；凯尔特十字 10 牌位经 thetarotlady/celticstudio 等多源确认【实勘】。

## 一、牌组结构（78 张 = 22 大阿卡纳 + 56 小阿卡纳）

**大阿卡纳 22 张（编号 0-21，"愚人之旅"，主叙事层）**：

0 愚人 The Fool · 1 魔术师 The Magician · 2 女祭司 The High Priestess · 3 皇后 The Empress · 4 皇帝 The Emperor · 5 教皇 The Hierophant · 6 恋人 The Lovers · 7 战车 The Chariot · 8 力量 Strength · 9 隐士 The Hermit · 10 命运之轮 Wheel of Fortune · 11 正义 Justice · 12 倒吊人 The Hanged Man · 13 死神 Death · 14 节制 Temperance · 15 恶魔 The Devil · 16 高塔 The Tower · 17 星星 The Star · 18 月亮 The Moon · 19 太阳 The Sun · 20 审判 Judgement · 21 世界 The World

（编号按 Rider-Waite 惯例：Strength=8 / Justice=11；牌名是通用名词无版权，**牌义文字全部手写**，不抄任何塔罗站）

**小阿卡纳 56 张 = 4 花色 × 14（Ace-10 + 侍从/骑士/王后/国王）**：

| 花色 | 象征 | 对位我们的场景层 |
|---|---|---|
| 权杖 Wands 🔥 | 行动、热情、创造 | career 亲缘 |
| 圣杯 Cups 💧 | 情感、人际、爱 | love 亲缘 |
| 宝剑 Swords 🌬 | 思想、沟通、冲突 | decision/冲突 |
| 星币 Pentacles 🌍 | 物质、金钱、实际 | money 亲缘 |

## 二、操作流程（👤 四步，站点交互还原）

1. **定问题**：问题要具体，避免宽泛是非题（是/否交给 8-ball 和 coin），聚焦"现状/原因/建议"方向——页面层 = 问题输入框（可填可不填，本地留存）
2. **洗牌**：牌面朝下摊开搓乱 / 扑克式洗——页面层 = 洗牌动效（1.2s 左右，卡背交叠滑动）
3. **切牌**：左手分三堆再合并——页面层 = 三叠切牌动效（0.8s，仪式感关键帧，可简化为一步"cut the deck"）
4. **抽牌与摆阵**：扇形推开，左手抽对应张数按阵位摆——页面层 = 扇形展开 → 点击/自动落位 → 翻牌
5. **解牌**：正逆位 × 阵位 × 组合 → 页面层 = 每张牌给"牌名+正逆位+该阵位下的解读"，最后一段综合

**正逆位**：抽出的牌约 50% 概率逆位（reversed）——同一张牌正位/逆位是两条解读（能量顺行 vs 受阻/内化）。

## 三、牌阵规格（v1 做前两个）

### 单张牌（Daily Card）
一张即答案——日常指引/简单问题。页面 = /tarot-card-of-the-day/ 的天然形态（对位 PLAYBOOK 的日签打法）。

### 三张牌（Three-Card）— 新手经典
三种解读维度（页面做成可切换的三种问法，同一引擎）：
- **过去 — 现在 — 未来**：梳理事件发展脉络
- **现状 — 挑战 — 建议**：分析当下困境与应对（与签库六件套的结构亲缘最强）
- **现状 — 阻碍 — 结果**：预判行动走向与潜在阻碍

### 凯尔特十字（Celtic Cross）10 牌位 — v2
①问题核心 ②横跨的挑战 ③根基/潜意识 ④近过去 ⑤冠顶/意识目标 ⑥近未来 ⑦自我/姿态 ⑧环境/他人 ⑨希望与恐惧 ⑩最终结果。10 张重牌阵，v1 不做（首屏太重 + 内容量不够），v2 做成进阶页兼内容长尾（"celtic cross spread" 自带词量）。

## 四、内容工程量与 v1 砍法

| 层 | 条数 | 说明 |
|---|---|---|
| 大阿卡纳正位+逆位 | 22×2 = 44 条 | **v1 核心**（每条 ~50 词）——majors-only 牌阵是行业常见简化，且"愚人之旅"叙事完整 |
| 小阿卡纳 56×2 | 112 条 | v2 按花色分四批补（每批一个花色 28 条，权杖先——career 亲缘补强） |
| 阵位通用解读 | ~10 条 | "这个位置意味着什么"的通用段（三阵 × 3 位 + 单张） |
| 组合解读 | 0 条 | v1 不做牌组合学（两张以上互解是深水区），靠阵位通用段兜底 |

对比：v1（44 条）< 16 支签首版工作量；全量（156 条）≈ 签库六件套的 1.5 倍单条更短。

## 五、页面/URL 草案（待批）

- /tarot/ 主工具页（三张牌阵，majors，洗切抽翻全动效）
- /one-card-tarot/ 或并入 /tarot-card-of-the-day/（单张日卡，日期种子 SSR——对位日签引擎复用）
- /three-card-tarot/ 三张阵独立词页（若词量支撑）
- /celtic-cross/ v2
- 卡面视觉：CSS/SVG 抽象牌面（编号+符号+花色色块），**不用任何 Rider-Waite 图像**（1909 版美国已公版，但自绘既零风险又零素材体积，对齐原型站"纯 CSS 道具"风格）

## 六、市场与护栏（诚实评估）

- **符合定位**：塔罗就是"美国问事玩具工具站"的标配道具；"tarot yes or no" 更直接打通我们已有 yes-no 臂
- **⚠️ 竞争实情**：tarot 头词是真实战场（tarot.com / Biddy Tarot / Labyrinthos / 大量 app），完全不同于 yes/no 匣的化石集群——**不打头词**，打工具+牌阵+场景长尾
- 红线检查：塔罗在美国主流文化内，不触宗教词红线；调性沿用"entertainment + reflection"框架；死神/高塔/恶魔等重牌按"温和提醒"级改写（同无凶签纪律——hard truth 有, doom 没有）
- 商标检查：通用名词无商标问题；不用任何牌组专名（Rider-Waite/Thoth 只在内容页作公版知识提及，不作品牌词）

## 六b、词臂数据与实勘判定（2026-11-07 👤 AITDK 拉数 + Claude SERP 实勘，三样齐全）

| 词 | 量 US/月 | KD | 判定 |
|---|---|---|---|
| **yes or no tarot** | **74,000** | **60** | ★★**全项目最大可攻词**（+ tarot yes or no 18.1K/KD59 词序变体 = 92K 簇）。实勘【11/07】：astrology.com + horoscope.com 两个占星大站在前列，但中段软——jobcannon.io（职业站侧页）、dailyom 都能排——空位信号。打法：/yes-or-no-tarot/ 桥页（单卡→是/否+理由+下一步），塔罗×yes-no 双臂交汇 |
| free tarot reading | 40,500 | 58 | 头词级"free"，人人抢——不主动打，工具 URL /free-tarot-reading/ 自然承接 |
| tarot reading | 33,100 | 71 | 头词不打（app/大站地盘） |
| **one card tarot** | **12,100** | **40** | ★单卡工具位（+ one card tarot reading 1.9K/KD26）。实勘：tarot.com + labyrinthos 硬，其余 dailytarotdraw（EMD 小站）/thatoracleguy/dailyom 小站 + Reddit/论坛弱信号 = 可进 |
| **daily tarot** | **4,400** | **52** | ★日卡页（复用日签引擎，日期种子 SSR）；+ tarot card of the day 1.9K/KD50 |
| tarot reading free | 3,600 | 56 | 同 free tarot reading，变体承接 |
| **tarot spread** | **2,900** | **38** | ★牌阵 hub 内容页（18 种三张阵清单式长文） |
| **3 card tarot reading / three card tarot** | **480+320** | **33/34** | ★三张阵工具位。实勘：tarot.com + Reddit + **cbdtarot.com（majors-only 无逆位 3 卡小站在排）——验证了我们 v1 majors-only 砍法成立** |

**合计 ~195.4K/月**，可攻簇（yes/no 塔罗 92K + 单卡 14K + 日卡 6.3K + 牌阵 3.7K）≈ 116K/月——本站第二条大腿。
