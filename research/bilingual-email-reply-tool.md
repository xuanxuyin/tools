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

### 拉量后判定门槛（9/24 改按用户新定标）
- **总门：三组合计 US ≥ 10K/月 才立项**（用户 9/24 定标：词族合计 ≥10K 才有做的机会；A 组 10+ 语言矩阵的合计是主判定数）
- A 组头部词 KD ≤ 40（量级并入总门合计）
- C 组的 "generator" 类若有量 → 直接验证工具意图存在
- AI Overview 占位情况逐词记录

## 四、终局（2026-09-24 复测门裁决：死于 10K 门，归档）

- **复测**（刷新指标后，👤 AITDK）【实测】：how to end an email in spanish **480/KD31** + how to write an email in spanish **260/KD20** —— 两头词合计 740。此二词已是全矩阵最大头词，其余 35 词皆更小变体，全组乐观合计 ~2-4K → **够不到 10K 总门，项目终止**
- 首拉"全组没量"确系工具数据态（复测即有数），但数据纠正后量级仍不过线——复测门立了功，死得明白
- **经验沉淀（选品层，供以后复用）**：① **SERP 大站在位 ≠ 有量**——Babbel/Berlitz/Preply 追同题文章是课程转化生意，不能反推搜索量；② **"用外语写邮件"是真实需求但不表现为搜索需求**——美国用户真遇到时在 Gmail 里用 Gemini/粘贴 ChatGPT 解决，去搜 how to write 的是学语言人群（小量教学词）；工具内解决的需求没有内容站入口 → 回到最初"纯扩展无分发"死结，双向都堵死；③ 形态判断（内容站+生成器）本身没错，错在需求侧证只有 SERP 没有量——**新机会先拉量再谈形态**的流程价值再次确认
- 归档处置：本档留 research/ 作选品案例；选题回池，第三站候选 10/17 后议
