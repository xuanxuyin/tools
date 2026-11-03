# 在位者拆解：coloring pages 页面形态实录（2026-11-03）

> 背景：Phase A 上线后用户指出形态错配——"别人是图纸图片，你怎么给我上的是字母，而且别人一个里面有好多图片"。
> 本文是对两个在位者的**页面级实勘**（webReader 全文抓取，非 SERP 快照），作为 coloring 产品线返工的依据。

## 1. mondaymandala — "20 Letter A Coloring Pages"（SERP 主力形态）

URL: `mondaymandala.com/letter-a-coloring-pages/`（Word7.1.4/WP+Gutentor，Mediavine 广告）

**一页的结构（自上而下）：**
1. H1 "20 Letter A Coloring Pages (Free PDF Printables)" + 作者/日期
2. 2 段导语（设计清单式描述：animals like ants/alligators/apples + objects like airplanes/anchors）
3. **Featured image**（1920×1080，多设计拼贴预览）
4. 使用说明一句："click any image to open the free PDF...US letter-sized, scales to A4"
5. **20 张设计图纵向画廊**——每张图 = 缩略图 + 底下一行图注（"Letter A Is For Airplane Coloring Sheet For Preschoolers"）。**点击图片打开该设计的 PDF**，PDF 内可下载/打印
6. "While you're here, grab these related printables" 内链条（Cursive A Worksheet / Airplane / Avocado）
7. "More Free Printable Coloring Pages" 站内聚合链接（apple/numberblocks/Dr. Seuss…）

**20 张设计的题材构成**（这是产品本质）：
- 单词实物线稿：airplane / acorn+apple+airplane 组合 / apple 带描线
- 字母拟物：大 A 内嵌 A 开头物品 / 卡通鳄鱼抱着大 A / 大写 A 被苹果环绕
- 装饰化字母：大 A + 花卉曼陀罗背景 / 3D 立体 A + 花 / serif 字体 A + 花
- 卡通 IP 风：Alphablocks A（标识性 IP，我们有 [IP 下架红线]，不碰）
- kawaii 风 A is for Ant

**关键机制：1 关键词页 = 20+ 张独立画稿，每张独立 PDF。** 图片是产品，文字是包装。全站 351 篇 post × 20+ 设计 ≈ 7000+ 画稿。

## 2. kidsactivitiesblog — Coloring 分类 + 单篇页

**分类页** `kidsactivitiesblog.com/category/coloring-pages-kids/`（250+ 篇，32 页分页）：
- 8 个子栏目导航（Coloring Games / Coloring Pictures / Letter Coloring Pages / Christmas / Valentines / Easter / Halloween / Thanksgiving Coloring Pages）
- 帖子卡片流：**竖版缩略图 378×567，内容全是"打印出来的黑白画稿摆在彩色卡纸+蜡笔旁"的实拍摆拍**——黑白画稿本体+彩色环境，一眼传达"这是能打印能涂的"
- 下载机制：每篇 post 内红色下载按钮 → PDF（CDN 直链，如 `wp-content/uploads/2020/11/Christmas-Stocking-Coloring-Pages.pdf`）

**单篇页** `christmas-coloring-pages`（post 21325）：
1. 导语（crayons/pencils/paints 可用场景 + fine motor/color recognition 益处话术）
2. **"Set Includes" 概览图**：一张图里摆开全部 3 张画稿（用户说的"一个里面有好多图片"就是这种）
3. 每张画稿一节：`### 1. December Coloring Page` + 3~4 句描述（画面里有什么、孩子涂哪里）
4. 红色下载按钮 + 打印说明
5. "More Christmas Coloring Page Fun" 内链列表（6 篇同类）
6. 版权注记："created by our friends at PetiteLemon.com"（**原创画稿有署名/来源体系**）

**KAB 形态小结：1 post = 1 个画稿 set（2~8 张）+ 每张一节文字 + 一键 PDF 下载。** 文字比我现在的页面短得多、家长口吻、无 FAQ 区。

## 3. 形态差距清单（我方现状 vs 在位者）

| 维度 | 在位者 | 我方现状（Phase A 上线版） | 判定 |
|---|---|---|---|
| 页面核心 | 20+ 张独立画稿画廊 | 1 张程序排版字母练习纸 | ❌ 根本错配 |
| 画稿内容 | 实物线稿+字母拟物+装饰字母 | bubble 字母+单词文字+空画框 | ❌ 没有实物画 |
| 下载 | 每设计独立 PDF | 整页 PNG 一张 | ⚠️ 可接受但形态弱 |
| 每页画稿数 | 20（MM）/ 3~8（KAB） | 1 | ❌ |
| 文字量 | 短导语+每图一行图注 | 长 intro+3 tips+4 FAQ | ⚠️ 超重（SEO 保留但视觉降权） |
| 预览图 | 黑白画稿实拍/数字渲染 | 整页截图（含文字排版） | ⚠️ 应改成纯画稿渲染 |

## 4. 返工方案（用户已拍板：SVG 程序插画路线）

**产品形态改为"每页多张画稿的画廊"**，先 A/B/C 三字母试点：

1. **画稿库 `src/lib/drawings.ts`**：SVG 线稿函数库（closed region 白填充+描边，同 stocking 管线）。每字母选 2~3 个 **SVG 可画** 的单词画实物（apple/ant/airplane/arrow/axe/acorn 级别几何可画；alligator 类曲线生物走简化卡通轮廓），外加 2~3 个字母设计（bubble 字母内嵌物品 / 字母+图案边框）
2. **页面重构**：`LetterColoringSheet.astro` → 画廊组件，每张画稿一张卡片（画稿 SVG + 图注），打印时一张 letter 纸 2~4 张画稿（`sheet-break` 分页）；Download PNG 改拍纯画廊区
3. ** stocking 页同规则补画稿**：条纹/拼布/格纹/雪花纹变体，凑 ≥5 张设计
4. **图注文案**：每画稿一行（"A is for airplane — color the wings and windows"），对齐在位者
5. **sheet-images 管线**：改拍画廊整体（每页 1 张 PNG 不变，但 PNG 内容=画稿集不含文字段落）
6. 单词表同步替换：不可画的词（umbrella 级）换成可画词，测试同步改

**验收口径**：A 页截图给用户目检通过后，才铺 B~Z（26 页 × 重拍 PNG 的工作量不小，试点先行）。

## 5. 不跟进的形态（记录判断依据）

- MM 的 1 设计 1 PDF：需要 PDF 生成管线，我们的 print-button+PNG 双通道已覆盖需求，不建 PDF 管线
- KAB 的实拍摆拍 featured image：无法程序生成摄影图，用纯画稿渲染 PNG 替代
- Alphablocks 等 IP 风：[IP 下架红线] 直接排除
- MM 的字数/页宽：我们保留长文案（反薄内容是全站纪律），但移到画廊下方，视觉以画稿为主
