# 调研档 —— 双语商务邮件回复工具（内容站 + Chrome 扩展）

> 2026-09-23 建 · 背景：用户想做"邮件翻译插件"，2026-09-22 首轮判断纯翻译死路（Gmail/Outlook 内置免费翻译 + DeepL 官方插件焊死），转向"帮美国生意人用客户语言写商务回复"角度
> 产品假设：模板内容站（语言 × 邮件场景矩阵）+ 页面内嵌免费生成器 + Chrome 扩展（Gmail 写信框一键双语回复）= freemium，$8-10/月订阅
> 纪律：量 + KD + SERP 实勘三样齐全才立项；本文先出 SERP 实勘 + 待拉量词单，量由 AITDK 拉

## 一、SERP 实勘（2026-09-23，google.com US 区）

### 实勘词 1：how to write an email in spanish
| 排名方 | 类型 | 内容形态 | 有没有生成器 |
|---|---|---|---|
| happyhourspanish.com | 语言学习站 | 静态教程（**2016 年的文**） | ❌ |
| berlitz.com | 语言学校 | 静态教程 | ❌ |
| baselang.com | 西语课程 | 静态短语表 | ❌ |
| languagetrainers.com | 培训机构 | 分步教程 | ❌ |
| vivalanguageservices.co.uk | 翻译服务 | 静态教程 | ❌ |
| babbel.com | 语言 App 头部 | 模板教程 | ❌ |
| tandem.net | 语伴 App | 结尾语教程 | ❌ |

**判定：清一色静态模板文，没有一家页面内有"帮你写/生成"的工具。** 语言站的商业模式是卖课（要你学，不会做生成器）；教程老到 2016 年还在前排 = 供给陈旧。这正是 Grammarly 当年吃 "how to write X" 的空位。

### 实勘词 2：how to reply to an email in french business
同类格局：reginacoeli.com / preply.com / swissfrenchschool.ch / lexicogs.com 全是静态短语教学。无工具。

### 实勘词 3：email translator online
| 排名方 | 判定 |
|---|---|
| translate.google.com / deepl.com / quillbot.com | 三巨头压顶，死路，不碰 |
| languex.co（人工翻译服务） | 另一赛道 |
| immersivetranslate.com | 沉浸式翻译，证明"双语对照"形态有用户 |

**判定：translator 类词不做，意图也不对（读信 vs 回信）。**

### 扩展竞品（Chrome 商店 / Workspace Marketplace，2026-09-23 初查）
| 竞品 | 形态 | 定位 | 弱点 |
|---|---|---|---|
| AI Mail Assistant (ChatGPT for Gmail) | Workspace 插件 | 什么都做的 AI 邮件助手 | 无 SEO 内容护城河，通用定位不占任何词 |
| MailMaestro | Chrome 扩展 | AI 代写邮件，多语 | 同上，面向效率人群不是双语商务人群 |
| DeepL for Gmail/Outlook | 官方插件 | 翻译器 | 只翻译不代写，不做语气/商务模板 |

## 二、缝隙分析

1. **语言站占着词但不会做工具**（卖课利益冲突），**工具公司有工具但不占词**（Grammarly 只做英语，DeepL 只做翻译）→ 词 × 工具交叉处是空的
2. **美国本土楔子（最贴合 US-only 前提）**：美国 4300 万+ 西语人口，水管工/诊所/地产/律师/承包商都在服务西语客户，"用西语给客户回邮件"是美国国内需求不是外贸需求——语言学习站完全不覆盖生意人视角
3. 形态升级：不只做扩展，**先做内容站+页面生成器**（回流自家 SEO 打法），扩展是转化留存层。这解决了上一轮"扩展没有获客入口"的死穴
4. 风险：① Gemini/Copilot 原生功能挤压 ② 语言站 DR 高（但内容老、意图匹配差，quickref.me 式交互形态有先例能排）③ AI Overview 分流信息词

## 三、关键词矩阵 + 待拉量词单（AITDK，US/月）

### A 组 · 语言 × 写信场景（流量主力，信息意图）
```
how to write an email in spanish
how to write an email in french
how to write an email in german
how to write an email in italian
how to write an email in portuguese
how to write an email in japanese
how to write an email in chinese
how to write an email in korean
how to write an email in arabic
how to write an email in russian
how to write an email in vietnamese
how to write an email in tagalog
how to reply to an email in spanish
how to reply to an email in french
formal email in spanish
business email in spanish
professional email in spanish
how to start an email in spanish
how to end an email in spanish
how to end an email in french
follow up email in spanish
thank you email in spanish
apology email in spanish
```

### B 组 · 美国本土西语商务（差异化楔子，最贴合本站前提）
```
customer service email in spanish
email to spanish speaking clients
bilingual customer service email templates
how to communicate with spanish speaking customers
appointment reminder in spanish
estimate email in spanish
welcome email in spanish
hispanic marketing email templates
```

### C 组 · 工具/转化词
```
spanish email generator
email reply generator
gmail translate extension
translate email gmail
write email in spanish generator
```

### 拉量后判定门槛（沿用根 README 第 0 步）
- A 组头部词 US ≥ 1K/月 且 KD ≤ 40 → 矩阵成立（10+ 语言 × 几十场景词复利）
- B 组合计 US ≥ 3K/月 → 楔子成立（这组词 SERP 应最弱，重点看）
- C 组的 "generator" 类若有量 → 直接验证工具意图存在
- AI Overview 占位情况逐词记录

## 四、下一步

1. 用户 AITDK 拉上表词单（A/B/C 三组，US 区）
2. 量 + KD 达标 → 出 MVP 方案（先内容站 + 生成器，扩展二期）
3. 不达标 → 本档归档，回到选题
