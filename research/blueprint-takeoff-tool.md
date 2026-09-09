# 候选 D 调研档 —— 在线建筑图查看 / 蓝图算量工具（订阅方向首个候选）

> 2026-09-10 建 · 背景：用户 2026-09-10 定调转向订阅方向（"知识普及类收不到付费用户"），问"有没有在线打开建筑图的软件"
> 产品假设：免费在线看 PDF 建筑图 + 比例尺测算（面积/长度/数量）= freemium，Pro 订阅解锁无限测算/导出
> 纪律：量 + KD + SERP 实勘三样齐全才立项；开发前必须先 presell 验证付费意愿（Stripe 支付链接 + 人工交付）

## 一、SERP 实勘 + 在位者定价（2026-09-10，google.com US 区）

| 层 | 在位者 | 定价 | 判定 |
|---|---|---|---|
| 纯在线看图 | Autodesk Viewer（官方，DWG/DXF/RVT/STEP）、ShareCAD（免注册 25+ 格式）、DWG FastView、DWGSee Online、AllinPDF、AutoDWG、SmartCAD（本地处理隐私卖点） | 全免费 | 死路，不做 |
| 看+编辑 | AutoCAD Web | $9.99/月、$99/年 | 官方便宜占位 |
| 图纸标注+现场协同 | Fieldwire（Hilti，免费层+无限图纸）、PlanRadar | $39 / $32 每人每月 | B2B 订阅已验证 |
| 工程量测算 takeoff | STACK（$249-299/人/月，有免费层）、PlanSwift、Bluebeam Revu、Easy Takeoffs | 💰 | **钱在这里** |

【实勘】STACK 用户 Reddit 抱怨续费 ~$2,800/年公开找替代 → **个人/小分包商与专业平台间的 $20-50/月 价格真空带** = 假设的缝隙。

## 二、可行性论据（2026-09-10）

1. **技术**：投标图纸均 PDF → pdf.js + canvas + 比例尺校准（量已知长度定标）纯前端可做；不碰 DWG 私有格式（LibreDWG GPL/ODA 收费的坑全绕开）
2. **全程本地处理**：文件不出浏览器 = 隐私卖点（承包商投标文件敏感，SmartCAD 验证此卖点有效）+ 零服务器成本；Pro 订阅只需解锁前端功能
3. 订阅三问：谁付钱 = 小分包商（油漆/地板/石膏板/屋顶/混凝土按图算材料量）；付多少 = Pro $15-29/月（免费版限 3 次测算）；怎么被找到 = 行业细分词 SEO + `stack alternatives` 类逃亡词
4. 风险：STACK 有免费层、Fieldwire 免费层含标注；测算→材料报告的专业度决定付费理由；信任（钱+图纸都敏感）

## 三、待拉量词单（用户 AITDK，US/月）

```
dwg viewer online
dwg viewer
dxf viewer online
blueprint viewer
construction takeoff software
blueprint takeoff software
drywall takeoff
flooring takeoff
roofing takeoff
paint takeoff calculator
concrete takeoff
lumber takeoff
measure floor plan online
square footage from blueprint
stack takeoff alternatives
planswift alternatives
construction estimating software for small contractors
free takeoff software
```

看三个信号：takeoff 族量（付费人群搜索行为）、行业细分词量（分包商 B2B 信号）、`stack alternatives` 量（逃亡需求）。`dwg viewer` 只测池子不打（官方免费在位）。

## 四、判死记录（2026-09-10，用户抽测后弃）

用户抽查词量后裁决：**没什么量 + KD 很高 → 候选 D 弃**（未做全量 18 词拉取，【用户实测·抽查】）。

**方法论备注（重要，留给下一个订阅候选）**：KD 门槛是"SEO 获客 + 广告变现"模式的尺子，它系统性筛出商业价值低的软区——和"找付费用户"目标天然相反（本候选 KD 高的同一个场子里 STACK 收 $249-299/月）。订阅产品的立项判据应是：痛点强度 / 付费意愿 / CAC vs LTV / 可触达渠道，**不是 KD**。下一个订阅候选换验证法：社区痛点挖掘（价格抱怨/替代品求购）→ presell，不走 AITDK。

## 五、候选状态总览（2026-09-10）

A cheat sheet = 死（数据）｜C 挂牌平台 = 停｜D 算量工具 = 弃（抽测）｜B 宠物手册站 = 唯一存活，挂 10/17 门
