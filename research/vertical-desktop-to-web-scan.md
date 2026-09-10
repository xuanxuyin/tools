# 订阅方向扫描档 —— "垂直桌面软件上网"候选池

> 2026-09-10 建 · 起因：用户定调转订阅方向（免费额度+付费层），要求扫描"还没被搬上浏览器的垂直行业桌面软件"
> 前史：算量工具（blueprint-takeoff-tool.md）已弃；方法论结论——订阅产品不走 KD 判死，先社区痛点验证再拉词

## 一、大盘判断

"完全没人搬上网"的垂直基本绝迹。真实缝隙三类：
1. **质量缝隙**：桌面王贵且老旧、网页版存在但弱（用户宁可用 Inkscape）
2. **合规缝隙**：认证门槛挡走休闲玩家（Manual J/ACCA）——门是护城河也是障碍
3. **格式缝隙**：垂直文件格式处理链——viewer 已饱和、编辑器空白

## 二、四探针实勘（2026-09-10，google.com US 区）

| 候选 | 桌面王 | 网页现状 | 判定 |
|---|---|---|---|
| 绣花查看 | Wilcom $$$ / Embrilliance $150 | 免费 viewer 一堆（embroideryviewer.xyz / EMDigitizer / Stitch-Art） | ❌ 查看死；轻编辑（改色/合并/加字）仍是缝 |
| 绗缝设计 | EQ8 $200 一次性、老旧 | PreQuilt/Quiltler/NiftyFifty 都薄；Reddit 用户退回 Inkscape/GIMP | ✅✅ 质量缝隙实锤，首推 |
| 切割优化 | CutList Plus $89-189 | 免费网页饱和（OptiCutter / CutListOptimizer.com / Cutlist Evolution） | ❌ 已搬完 |
| HVAC Manual J | Wrightsoft/Elite $$$ | Cool Calc 免费 ACCA 认证 + AutoHVAC.ai（AI 上图算）；承包商一单收户主 $300-500 | ⚠️ 钱厚但认证门槛+竞争激烈 |

## 三、扩展扫描（【推断】未实勘）

| 垂直 | 桌面王 | 网页现状 | 深挖值 |
|---|---|---|---|
| 橱柜/厨房设计 | 2020/Cabinet Vision $$$ | Mozaik 低价 SaaS 已在 | 一般 |
| 泳池设计 | Pool Studio $$$ | 几乎空白 | 3D 太重 |
| 喷淋水力计算 | FHC ~$1k+ | 薄 | 合规重 |
| 石材台面料排版 | Slabsmith $$$ | 部分 SaaS | 中 |
| 模型火车规划 | AnyRail/SCARM（免费） | 薄 | 弱（桌面免费王在） |
| 缝纫打版 | Seamly2D 免费开源 | 免费在位 | 弱 |
| 绣花轻编辑 | Wilcom/Embrilliance | **编辑空白** | ✅ 中 |

## 四、首推：绗缝设计工具（2026-09-10）

- 市场规模【实勘 2026-09-10，Craft Industry Alliance 2025 调研】：美国绗缝产业年收入 **$4.2-4.5B**，活跃参与者 **900-1100 万**（十年稳定），平均年龄 ~63；r/quilting ~25 万人
- 风险标注：人群老化（平均 63）= 吃存量付费能力非增量；年长用户对易用性要求高（对老派 EQ8 是机会）
- 付费人群：EQ8 $200 卖几十年 + AccuQuilt $300-600 + 按码买布 = 高付费爱好群
- 窗口期：Quiltler 评"2026 最佳"却是薄产品 = 市场争抢中无赢家
- 订阅三问：谁付=绗缝爱好者/图案设计师；付多少=免费（块设计）→ Pro $8-15/月（完整布局+用布量+PDF 导出）；怎么找到=手工词 SEO（软 SERP 类型，chartglade 同生态）+ r/quilting 22 万人
- 技术：几何计算+canvas+PDF 导出 = 纯前端，tintbrew 打法加强版，零服务器

## 六、痛点挖掘（2026-09-10，Claude 探针，Reddit/论坛/官网）

**EQ8 骂点【实勘】**：①学习曲线陡（最高频，"too steep for the price"）②UX 老派笨重（clumsy and counter-intuitive）③$239.95 + 块包/配套书无尽加购 ④FPP（纸样拼缝）和自定义块设计是点名软肋 ⑤轻度用户常后悔购买。公认价值点 = 布局编排 / 布料试色 / 用布量计算。

**在位网页产品【实勘】**：PreQuilt 纯网页 ~$50/年，免费层试色，口碑正面；Quiltler 网页+移动，免费层=无限设计+用布量计算，订阅制；QuiltAssistant 免费桌面。**修正扫描时判断：网页挑战者是"便宜且尚可"，不是"薄"——EQ8 仍是公认标准。**

**格局定性**：桌面王贵且难用（$240），网页挑战者便宜（$50/年）但没赢 = **"换王"型机会，不是"空白"型**。

**三个楔子（2026-09-10 议）**：①轻度用户版（打曲线+价格，但 $50/yr 对手在，价格空间窄）②FPP/自定义块编辑器（打点名软肋，工程最重不宜首发）③**推荐：图案设计师出版套件**——块→布局→用布量→可出售 PDF 图纸（Etsy pattern $10-15/份），用户是"用工具赚钱的人"，订阅逻辑最硬（$15/月档），EQ8 服务此人群需 $240+加购。

## 七、判死记录（2026-09-10，用户拉量）

**候选 E（绗缝设计工具）死于词池**：15 词合计 <2,000 US/月（【用户实测】）。痛点真实、付费真实（EQ8 $240/PreQuilt $50yr），但 **SEO 需求通道不存在**——设计软件类搜索本来就是低频小众事件（用户买一次用几年，不搜）。

**结构性定律（三案验证：takeoff 词族 / cheat sheet 变体带 / 绗缝软件词，2026-09-10 立）**：
- 量大的功能词 → 早被"免费工具 + 广告"玩家占住（订阅挂不上去）
- 订阅价值高的产品 → 用户群小 + 搜索稀疏 → 量必然小（SEO 进不去）
- **"订阅产品 × SEO 量"交集在本打法下为空集**——这不是选品运气问题，是市场有效性把两头都占了

**推论**：订阅方向缺的不是产品点子，是**非 Google 获客渠道**（社区/YouTube/口碑/联盟）——我们没有这块肌肉。订阅探索冻结，改为：等 tintbrew/chartglade 流量起来后**在已验证的 SEO 流量上做同域订阅试验**（如 chartglade 教师包订阅、tintbrew Pro 功能），一条 Stripe 链接的成本就能测——比新站冷启动便宜一个量级。

候选终局：A 死｜C 停｜D 弃｜**E 死**｜B 手册站 = 唯一存活候选，挂 10/17 门。**回存量工作：tintbrew V2.1 后续波次 + chartglade 分发（DISTRIBUTION.md）**。

## 八、待拉量词单（用户 AITDK，US/月，每行一词）

```
quilt design software
quilt design software free
eq8 alternatives
electric quilt 8
prequilt
quiltler
quilt block designer
quilt pattern maker
quilt fabric calculator
quilt yardage calculator
how much fabric do i need for a quilt
quilt layout planner
foundation paper piecing pattern designer
quilt pattern writing software
free quilt design app
```

重点看：`quilt design software` 池子、`eq8 alternatives` 逃亡词、计算器族（免费层入口词形）。
