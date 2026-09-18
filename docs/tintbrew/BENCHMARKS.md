# tintbrew 对标拆解笔记

> 竞品/对标站拆解统一入此文件（与 [chartglade/BENCHMARKS.md](../chartglade/BENCHMARKS.md) 同规）。更新 2026-09-18。

---

## 1. trycolors.com — 混色 SaaS 头部 — 2026-09-18

> 起因：用户指令"上 Google 拉同类站找提升点"。trycolors 在 teal SERP 在位（PLAN §2 实勘 09-07）。方法：首页 + 功能面实勘【实勘 9/18】；sitemap 403（带 UA + gzip 均拦），页数结构未知。

### 1.1 它是什么

Next.js 混色 SaaS：自称 100,000+ 用户（艺术家/学生/教师/企业四人群），订阅制（用户证词提到买年订阅），颜料品牌库 250+ 品牌。

### 1.2 功能面（对照我们 /color-mixer/）

| 功能 | trycolors | tintbrew |
|---|---|---|
| 手动混色（选色 + 比例） | ✅ | ✅（Oklab 感知混色，差异化在） |
| **目标色 → 自动配方**（reverse recipe） | ✅ | ❌ |
| PRO 着色强度模拟（Kubelka-Munk） | ✅ 付费 | ❌（不做） |
| 品牌颜料库 / 相似颜料查找 | ✅ 250+ 品牌 | ❌（不做） |
| B2B widget + API | ✅ | ❌（不做） |

### 1.3 tintbrew 落位

- ⭐ **反向配方 = 唯一可抄进排期的**：目标 hex → 常用基色组合与比例。纯前端求解问题（Oklab 引擎延伸，纯函数合我们架构），SSR 默认示例 + island 交互 —— **V2.3 工具页候选首位**，交互工具型 = AI 截流免疫（选词纪律加分）；开建全等 10-01 门
- **不学**：品牌颜料库（重数据 + 持续维护）/ PRO Kubel-Munk（付费墙，超零账号边界）/ B2B API（SaaS 化）
- 证词墙 + "Save time and materials" 价值主张 = 转化文案参考，低优先

---

## 2. colordesigner.io — 工具矩阵站 — 2026-09-18

Nuxt + 广告位；robots.txt 本身是 CF 挑战页（curl 直连 + 10808 代理均 403），sitemap 不可读、页数结构未知。mixer 支持**任意多色 + 各自数量权重**，结果多模式输出（HLC/HSL/LAB/RGB/LRGB）。

**落位**：多色混色（3~5 色 + 数量权重）= mixer island 升级候选（现双色比例，引擎需扩 n 色接口）→ V2.3 与反向配方同批顺手；多模式输出 converter 已覆盖大半，不动。

---

## 3. 内容 SERP 在位者（what colors make 族）— 2026-09-18

内容侧在位者形态【实勘 搜索】：Golden Artist Colors 官方 mixing guide（颜料品牌具体、pigment 角度）/ Will Kemp Art School（3 原色调色教学）/ Cowling & Wilcox、Blue Beach House Art（互补色调 brown/gray 画家打法）/ Homedit（室内设计角度）/ Reddit 手绘 cheat sheet / YouTube 教程 / 烘焙博客群（chelsweets / Wilton blog）。

**落位**：无新结构性招 —— "画家/场景深读段"路线（green 页先例）就是他们的核心内容形态，fondant 族过 500 线即建（9/18 👤 拉量在办）；acrylic chart 390 词已档由 /color-mixing-chart/ 覆盖。维持现有路线零动作。

---

## 结论（2026-09-18 拆解轮）

可过约束（US-only / 纯静态 / 零账号 / 主题聚焦）落排期的只有两个**工具型**功能，均进 V2.3 候选、10-01 门后与 V2.2 同规划：① **反向配色计算器**（首位，trycolors 产出）；② **mixer 多色升级**（colordesigner 产出）。内容侧零新增；图片 SEO 对 tintbrew 弱需求（色卡图 image search 意图弱于 printables 实物图），不立任务，per-page OG 图（PLAN §3 #6）足矣。
