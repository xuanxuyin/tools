# 在位者拆解：cootie catcher / paper fortune teller 模板页

> 调研日期：2026-11-03。服务于 chartglade cootie catcher 页族开发前调研。
> 数据来源：stlmotherhood / cassiesmallwood 用 curl 全文抓取（【实勘】）；skiptomylou / easypeasyandfun / brendid 的 curl 直连被 Cloudflare 盾拦（403，Googlebot UA 也不放行），改走 web reader 取全文（【实勘】，正文与 meta 齐全，DOM 层 JSON-LD 未逐条验证的已标注）。

---

## 一、五站逐站拆解（六维）

### 1. stlmotherhood.com — how-to-make-a-cootie-catcher-free-printable

**一句话形态**：角度刁钻的"cootie catcher = 纸偶（puppet）"教程页，模板几乎不是重点，卖点是把折纸打开画脸。

| 维度 | 实况 |
|---|---|
| 页面形态 | **没有可下载 PDF**。折法呈现在正文里的一张长图（"How to Fold a Paper Cootie Catch"），加上实拍照片分步（小孩出镜）；另有 Schema 食谱卡（recipe-card 样式）把 8 步写成 Instructions 卡片。WordScry 插件渲染。 |
| 内容深度 | 正文 **545 词**。无 FAQ。无主题变体列表。玩法说明弱——大部分篇幅在讲 80 年代"cooties"校园文化考据（为什么叫 cootie catcher）。 |
| 模板清单 | 实际给 **0 个预填模板**——只教"用彩纸折+打开画脸"，fortunes 一律让用户自己写（"filled with your own custom fortunes"）。 |
| 图片用法 | 26 张 `<img>`。og:image = `cootie-catcher8.jpg`（实拍成品照）。alt 写得较认真（"paper cootie catcher puppet shown folded and unfolded"），但多数照片有重复（懒加载导致同 alt 出现两次），且末尾多张空 alt。 |
| SEO 基建 | title = "How to Make a Cootie Catcher \| Free Printable"。**JSON-LD 带 HowTo + 11 个 HowToStep**（全站五个里唯一带 HowTo 的），加 Article + BreadcrumbList。内链挂 "Crafts for Kids" 分类，无 fortune-teller hub。 |
| 变现 | **Mediavine 广告**（脚本 14 处，密度高）。无 Etsy。订阅钩子 2 处（轻）。 |

### 2. skiptomylou.org — cootie-catcher-template

**一句话形态**：经典"空白模板 + Magic-8-Ball 式答案库"页——模板是空白的，正文把"该写什么答案"用三组列表喂给用户。

| 维度 | 实况 |
|---|---|
| 页面形态 | 模板 = **JPG 图片直接看**（`cootie-catcher-template.jpg`，内含步骤），旁边一张 download 按钮图；评论区可见 download 按钮图替代真实下载链接的老化痕迹。折法 = 模板图内嵌步骤，正文无独立分步照片。 |
| 内容深度 | 正文约 **600 词**（reading time 标 2 分钟）。**有 How to Play 四步玩法**（spell 颜色→数数字→开 flap 读答案）。无 FAQ。 |
| 模板清单 | 本页 **1 个空白模板**；"More Cootie Catcher Ideas" 段内链 3 个别站内主题页：summer activity fortune teller（活动清单）、positive messages（激励）、**wedding fortune teller**（婚礼破冰——独一份的场景）。答案风格 = **Magic 8 Ball 三档**：Positive（"Signs point to yes"）/ Neutral（"Ask again later"）/ Negative（"Very doubtful"）。 |
| 图片用法 | 6 张图。og:image = `cootie-catcher.jpg`（成品实拍）。alt 简短（"cootie catcher template"），不堆关键词。模板图**本身可直接看但下载有门槛**（订阅）。 |
| SEO 基建 | title = "Cootie Catcher Template \| Skip To My Lou"，meta description 平实。JSON-LD 未能逐条验证（DOM 层被 reader 剥掉），但 WP + Site Kit 结构看是 Article 级别，**无 HowTo 迹象**。挂分类 free-printables + print。 |
| 变现 | **AdThrive 广告**（preconnect ads.adthrive.com）。newsletter block（订阅即模板）。affiliate-links block（素材联盟链接）。 |

### 3. cassiesmallwood.com — cootie-catchers

**一句话形态**：本词族商业形态最完整的一页——**9 个全部预填内容的主题模板**，每主题独立 PDF，打包价 $1.50。

| 维度 | 实况 |
|---|---|
| 页面形态 | 每个主题 = 一个 **Google Drive PDF 链接**（点文内链接或配图即打开 PDF，右上角下载/打印）。折法 = 6 步文字详解（Fold Diagonally→…→Form the Pockets），配一张独立"折法说明 PDF"；**每主题 PDF 里都自带折法+玩法说明**。无视频。 |
| 内容深度 | 正文 **902 词**（五站最长）。无 FAQ（靠 heading 分节）。有完整 How to Print 段。 |
| 模板清单 | **9 个主题**，全部预填：① Zoo Animal（动物名+动物动作）② Birthday（生日动作）③ Preschool（颜色+简单动作，k- 学前定位）④ Unicorn（would you rather 问题）⑤ **Truth or Dare**（emoji 真心话大冒险）⑥ Valentine（正面激励 fortunes）⑦ Halloween（would you rather）⑧ Christmas（圣诞动作）⑨ **Blank 空白版**。内容风格四类并存：**动作指令 / would-you-rather / truth-or-dare / 正面激励**——注意：**没有一家是传统"预言式 fortunes"成体系**，Valentine 那个才是最接近签语的。 |
| 图片用法 | 33 张图（每主题 2 张：预览图+下载图）。og:image = `Cute-Cootie-Catchers-Free-Printable.png`。**alt 全部是关键词堆叠式**（"free printable zoo animal cootie catcher pdf, cute animal paper fortune teller game for kids free printable pd…"）——粗糙但说明在位者把 alt 当 SEO 主战场在打。 |
| SEO 基建 | title = "9 CUTE Cootie Catchers (FREE Printable)"（全大写形容词+FREE Printable 是该站 title 套路）。JSON-LD = **Article + BreadcrumbList，无 HowTo**。内链：挂 /diy-home-craft-projects-home-page/ 母页，文内每个主题带一条跨卖内链（animal flashcards / unicorn coloring pages / Valentine Bingo）——**模板页互相导流的交叉销售写法值得抄**。 |
| 变现 | **Mediavine 广告**。**付费打包**："全部 9 个模板合一个 PDF，$1.50"（大写加粗喊话）。无 Etsy 链接（etsy 出现 3 次都是站内 selling-on-etsy 分类）。**无邮件订阅**（0 处 subscribe/newsletter）。 |

### 4. brendid.com — Fortune Tellers 分类 + Christmas Joke Teller（代表文章）

**一句话形态**：唯一把 fortune teller 做成**内容矩阵**的站——分类页本身是一篇 Yoast 写足的支柱内容，18 篇文章每篇一个预填主题，主业靠付费 e-book 打包。

| 维度 | 实况 |
|---|---|
| 页面形态 | **分类页即支柱页**（罕见打法）：brendid.com/category/crafts/fortune-tellers/ 不是普通文章列表，而是写了几百词的 How to Make Paper Fortune Tellers + 折法 + 历史考据 + 18 篇链接列表。单篇模板交付 = **下载走"free printables 页"集中收口**（评论区多年有人找不到/求邮件发送——交付路径对用户有摩擦）；每模板**全彩 + 黑白可涂色双版本**（黑白版专给没彩打预算的老师，是少见的教师向设计）。折法 = 文字 6 步 + 折法说明随模板 PDF 下载。 |
| 内容深度 | Christmas 篇正文约 **700~900 词**（含 8 条笑话全文列出）。分类页几百词。**无 FAQ 结构但历史考据段落实质回答了 FAQ 类问题**（origin / 别名叫什么）。 |
| 模板清单 | **18 个免费主题**（分类页列全）：Easter/St.Patrick/Thanksgiving/Valentine/Hanukkah/Christmas/Halloween/Back-to-School/Mother's Day/April Fools/Father's Day/New Year×2/Snowman/Gratitude(Thanksgiving)/选电影/Christmas 随善事。内容风格 = **8 条节日笑话为主**（joke teller 定位），辅以 conversation-starter 问题和 random acts of kindness。付费 e-book = "12 Month of Fortune Tellers" 39 个模板。 |
| 图片用法 | og:image 固定站图（Yoast SEO Image），单篇配 4~11 张实拍+模板预览，**pin-title/pin-description 全套 Pinterest meta**（Pinterest 是其主流量来源，评论区可证）。alt 长句式带完整描述+关键词。 |
| SEO 基建 | title = "Christmas Joke Teller (Fortune Teller) for Kids"——**双词同时占位**（joke teller + fortune teller）是刻意写法。JSON-LD 未逐条验证（reader 剥离），WP+Yoast 结构，无 HowTo 迹象。内链结构最强：面包屑 Home»Crafts»Fortune Tellers + 文末"More Free Fortune Tellers"4 条同族互链 + 分类页 18 条收口。 |
| 变现 | **AdThrive 广告** + **ConvertKit 邮件订阅**（newsletter 签名档）+ **付费 e-book 打包**（39 模板 instant download，带折扣话术）+ affiliate links（matte photo paper 之类的打印纸联盟链接）。 |

### 5. easypeasyandfun.com — how-to-make-a-fortune-teller

**一句话形态**：折法教程 + **动物纸偶设计库**的引流页——正文免费教折法，全部模板锁在付费会员墙后面。

| 维度 | 实况 |
|---|---|
| 页面形态 | 折法 = **实拍照片逐帧分步**（12 步，每步一张独立照片，五站中唯一做到"一步一图"的）。模板 = 站内链接跳转各动物模板页，**模板本体在 members.easypeasyandfun.com 会员体系里**（订阅制）。附一张免费 folding diagram 兜底。 |
| 内容深度 | 正文约 **900 词**。折法部分 12 步讲得最细（含斜折小技巧）。无 FAQ。 |
| 模板清单 | 列出 **13+ 个动物纸偶设计**：Shark / Forest Animals / Tiger / Peacock / Mouse / Unicorn / Horse / Pig / Dinosaur / Crab / Chicken / Turkey……全部是**造型设计**（耳朵/眼睛/尾巴贴纸），fortunes 内容几乎不涉及——他们是把 cootie catcher 当**手工玩具**卖，不是当**签语游戏**卖。 |
| 图片用法 | 26 张。og:image = Peacock 成品照。alt 认真但不堆词（"Origami Fortune Teller Shark Cootie Catcher"）。模板图本身可见但不可印（会员墙）。 |
| SEO 基建 | title = "How to Make a Fortune Teller (Printable Diagram Included) + Cootie Catcher Design Ideas"——**一 title 塞双词+承诺可打印**。JSON-LD 未逐条验证，Elementor 站，无 HowTo 迹象。内链靠站内 animal 模板页群。 |
| 变现 | **Mediavine 广告** + affiliate（origami paper）+ **会员订阅**（核心变现：thousands of printables 一价全包，Sign Up Now 收口）。 |

---

## 二、共同配方（这类页的标配骨架）

五站拼出来一个高度一致的骨架，按顺序：

1. **H1 = how to make / template 双承诺**：标题几乎都同时含 "cootie catcher" 和 "fortune teller" 双词（brendid 和 easypeasy 最明显），title 带免费/可打印承诺（FREE Printable / Printable Diagram Included）
2. **怀旧 intro**：开头 2~3 段童年回忆杀（"I loved these in school…"），顺便把别名族谱铺一遍（cootie catcher / fortune teller / chatterbox / salt cellar）——这既是情感钩子也是变体词 SEO 铺垫
3. **（可选）历史考据段**：origin 不明 / 17 世纪欧洲 vs 日本折源 / 20 世纪初流行——brendid 和 stl 有，其他站没有
4. **How to Fold：5~12 步**。两种呈现：实拍照片分步（easypeasy 12 步一步一图最细）或一张长图解 + 文字步骤（其余站 6~8 步）
5. **How to Play**：spell-颜色→数数字→开 flap 三段式（skiptomylou 和 cassie 写在模板 PDF 里，stl 没有）
6. **模板下载**：每主题一段（小标题 + 1~2 句说明 + 1~2 张图 + 下载链接）。**交付载体三家四态**：Drive PDF（cassie）/ JPG 直看+订阅墙（skiptomylou）/ 集中 printables 页收口（brendid）/ 会员墙（easypeasy）
7. **"该写什么内容"段**：空白模板站靠正文喂答案清单（skiptomylou 的 8-ball 三档），预填模板站靠每主题一两句描述内容构成
8. **More ideas 互链收口**：文末同族模板链接列表（brendid 最强：18 条；cassie 每主题旁挂跨品类导流）
9. **订阅钩子收尾**：3/5 站文末接 newsletter/会员

**信息密度共识**：正文 500~900 词，图 6~33 张，步骤 5~12 步，单模板内容 8 条（8 个 flap 对应 8 条内容）。

**SEO 基建共识（差距点）**：**只有 stlmotherhood 一家带 HowTo JSON-LD**（11 步），其余全是 Article 级。内链 hub 只有 brendid 做了（分类页支柱化）。alt 只有 cassie 在堆关键词。

---

## 三、空档与差异化（chartglade 打法验证）

### 空档验证核心问题：有没有人提供"已填好 fortunes 且成体系"的模板？

**结论【实勘】：'预填内容'不是空档，但'成体系的签语库'是空档。**

- **预填已普遍存在**：cassie 9 个主题全预填（动作/would-you-rather/truth-or-dare/激励四类）、brendid 18 个主题全预填（笑话为主）、skiptomylou 正文喂了 Magic-8-Ball 三档答案。所以"我们的模板带内容"这句话**不能当差异化卖点**，SERP 上已有人做。
- **但预填质量全部是"8 条一拍脑门"级别**：每主题固定 8 条（对应 8 个 flap），无内容分层（简单/进阶）、无跨主题的签语体系、无内容池概念。cassie 内容方向最杂（一个站里混四种体裁，fortune 体裁反而最弱——只有 Valentine 一版是真签语）；brendid 体裁统一（笑话）但只覆盖节日；skiptomylou 的 8-ball 答案是通用模板货。
- **真空档 = 签语库作为可复用引擎**：没有任何一家把 fortunes 当**内容资产成体系经营**（分级签语库、按场景换装、同一折法 × 多套签语可组合）。chartglade 的签语库打法（数据文件驱动、一套折法页 × N 套签语主题、SSR 出真内容）在这个词族里没有在位者做。这条成立。

### 其他空档（按可信度排）

1. **教学人群定位没人占**【实勘】：五站全是 mom-blog 视角。唯一教师向细节是 brendid 的黑白可涂色版（"teachers don't have budget for color copies"）和 cassie 的 preschool 版——但没人按课堂场景做系统内容（sight words / math facts / spelling words 塞进 cootie catcher 是美国课堂真实玩法，五站零覆盖）。chartglade 老师/家长人群 + 课堂打印场景是现成本钱，可直接嫁接。
2. **HowTo 结构化数据 4/5 缺失**【实勘】：只有 stl 一家有 HowTo JSON-LD。折法步骤是天然 HowTo 内容，chartglade 按 SEO 纪律标配 HowTo+FAQPage 三件套就超过 80% 在位者。
3. **无交互/生成器**【实勘】：五站全部是"下载-打印-手写"静态模式，零交互。空白模板 + 前端填 fortune 预览（输入→定制输出，正好是 CLAUDE.md 认定的 AI 截流安全工具型形态）没人做。
4. **交付链路普遍烂**【实勘】：skiptomylou 靠邮件发模板（评论区连环投诉收不到）、brendid 评论区多年有人在问"去哪下载"。**无下载门槛的 SSR 直接可打印页面**（chartglade 现成的 @media print 体系）是体验级差异。
5. **alt/图片 SEO 两极分化**【实勘】：cassie 疯狂堆关键词、其余站敷衍。chartglade 的 alt 规范化写法（描述性+关键词自然嵌入）即可对齐。

### 需要警惕的（在位者已占、别硬碰的点）

- **节日主题矩阵**：brendid 18 个节日主题 + 付费 e-book，多年老站+Pinterest 流量盘。节日 joke teller 词别当主战场，最多跟 1~2 页挂进内链。
- **truth or dare / would you rather**：cassie 已占且是其最像"游戏"的两版。做的话要换角度（课堂版/破冰版）。
- **动物纸偶造型**：easypeasy 的主业堡垒（会员墙+13 造型），完全绕开。

### 对开发的直接输入（建议，待 PLAN 定夺）

- 页族骨架照"共同配方"走，但步骤数取 6~8 步 + 每步一图（对齐 easypeasy 的呈现密度，这是五站最佳实践）
- JSON-LD 全套：HowTo（折法）+ FAQPage + WebApplication（若有交互填签）
- 差异化主打：**签语库成体系**（分级/场景化）+ **课堂场景嫁接**（sight words / math / kindness）+ **零门槛直接打印**
- alt 规范：`free printable {theme} cootie catcher for kids, {场景} paper fortune teller` 一句式，描述在前关键词在后，不学 cassie 的堆叠腔
