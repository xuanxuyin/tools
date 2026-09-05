# tintbrew 作战文档

> 本项目唯一计划文档 · 更新 2026-09-05 · 部署/运维细节见仓库根 [README.md](../README.md)
> 原则：本文档没写的 = 没计划；做完的立刻勾掉并写日期。

## 0. 北极星

**GSC 28 天曝光数（impressions）环比增长**。变现节点：自然流量稳定 ~300 访问/天 → 接广告（当前零广告代码）。

一句话现状：41 页上线（V1 33 + V2.1 W1/W2 共 8 页），81 测试全绿，GSC 效果数据已出现，进入「等收录 + 攒外链」阶段。

## 1. 已完成（时间线）

| 日期 | 里程碑 |
|---|---|
| 2026-09-03 | KD 调研定型：Oklab 混色工具 + KD 0 长尾矩阵双轨 |
| 2026-09-04 | **上线** tintbrew.com：33 页，Cloudflare Pages，GSC 验证 + sitemap，Email Routing |
| 2026-09-04 | Uneed 目录站提交（首批外链）；外链文案定稿（README「外链提交文案」） |
| 2026-09-05 | **V2.1 W1**：烘焙 4 页 + /what-colors-make-brown/（49.5K/月）+ /color-guides/ hub |
| 2026-09-05 | **V2.1 W2**：三色头词页 purple(22.2K)/green(18.1K)/orange(18.1K)，绿页按画家打法重写 |
| 2026-09-05 | GSC 效果页出现首批数据（说明已被索引参与排名） |

## 2. 关键词资产表

| 梯队 | 词/词族 | 量(US/月) | 目标页 | 状态 |
|---|---|---|---|---|
| 品牌 | tintbrew / tintbrew color mixer | — | 首页 / /color-mixer/ | 等 2~7 天出现 |
| 长尾矩阵 | what color does X and Y make（24 对） | KD≈0 | /mix/* | 已上线，等曝光 |
| V2.1 头词 | what colors make brown | 49.5K/KD38 | /what-colors-make-brown/ | 已上线，磨页龄 |
| V2.1 三色 | purple / green / orange | 58.4K 合计 | /what-colors-make-*/ | 已上线 |
| V2.1 烘焙 | black frosting / brown icing / icing chart / buttercream chart | 含万圣季节词 | 4 页 | 已上线 |
| 工具头词 | color mixer / converter / hex to rgb | KD 27 档 | /color-mixer/ /color-converter/ | 3~6 个月长跑 |
| V2.2 候选 | gray/cyan/gold/navy… 扩色配对 | 待拉 | /mix/* | 未启动 |
| 已评估暂缓 | what colors go with X（穿搭配色） | 未验证 | — | 见 §6 |

## 3. 接下来要做（优先级排序）

| # | 任务 | 谁 | 验收标准 | 期限 |
|---|---|---|---|---|
| 1 | Request indexing 9 个新 URL（W1+W2，清单在根 README） | 👤 | GSC 逐个显示"已请求" | 2026-09-06 |
| 2 | 外链：Peerlist Launchpad + AlternativeTo（文案抄 README） | 👤 | 两个平台提交成功 | 2026-09-07 |
| 3 | GSC 首查：效果→查询（28 天），看 W1/W2 词有没有曝光 | 👤+Claude | 截图记录，更新本文档 §2 状态 | 2026-09-10 |
| 4 | **V2.2 第二批配色对（+20~30 页）**：colors.ts 扩 8 色 → mixes.ts 配对 → 全自动出页 | Claude | 61~71 页，`_redirects` 重新生成，测试全绿 | 启动条件见 §6 |
| 5 | W3 木器染色 2 页（coffee wood stain 等，已锁定未建） | Claude | 2 页上线 | 跟 V2.2 同批或下批 |
| 6 | per-page OG 图：场景页用引擎生成对应色卡图（替代全站共用卡） | Claude | 场景页 og:image 唯一 | 2026-09 下旬 |
| 7 | V2.3 工具页：互补色/对比色生成器（`contrastRatio` 引擎已有） | Claude | 1 页 + WCAG 检查 | 2026-10 |

## 4. 每日 / 每周例行

**每日（≤10 分钟，两站共用，chartglade 见其 PLAN.md）**：

- [ ] GSC → 效果：有没有新冒头的查询词（2 分钟）
- [ ] Cloudflare → Web Analytics：访问曲线异常否（1 分钟）
- [ ] 新词/异动随手记到本文档 §2 表格（不展开分析）

**每周（~30 分钟）**：

- [ ] 周一：GSC 索引数（0→N 页）+ 效果 28 天环比，记入本文档
- [ ] 周三：1 个外链/分发动作（目录站、Reddit r/DIY r/painting、Pinterest 图钉）
- [ ] 周五：批次决策 —— 看数据定下周上不上 V2.2（对照 §6 条件）

## 5. 远期规划（V2.x 全景）

1. **V2.2** 扩色矩阵 +20~30 页（架构零改动，纯数据）
2. **V2.3** 工具页三件：互补色生成器（顺手）、图片取色/调色板导出（流量入口）、Oklab 渐变生成器（差异化）
3. **V2.4** 分发：每批次上线 → 提交一轮目录站；Product Hunt 正式发布（外链权重最高，单独准备）；Pinterest 场景图分发（第二流量引擎）
4. **变现**：~300 访问/天 → 接广告网络（AdSense/Ezoic 评估）
5. **重启候选**：穿搭配色词（what colors go with X）——V2.1 见效后先拉 6 个代表词数据再定

## 6. 决策点（数据说话，到点执行）

| 时间 | 看什么 | 条件 → 动作 |
|---|---|---|
| 2026-09-10 | GSC W1/W2 词曝光 | 有曝光 → 正常推进；零曝光 → 再等 1 周（页龄 <2 周不算数） |
| 2026-10-01（W1 上线 4 周） | /mix/ 矩阵词排名 | 有词进 top 30 → **启动 V2.2 加码 30 页**；全部 50 名外 → 暂停批次，转外链强度（PH 发布提前） |
| 2026-11-01 | 28 天曝光总量 | 环比 2 倍增长 → 按节奏走；停滞 → 复盘内容质量/ cannibalization |
| 随时 | 访问量 | 稳定 ~300/天 → 启动变现接入 |

## 7. 技术备忘（改动前必读）

- mixes.ts 加配色后**必须重新生成 `public/_redirects`**（反向 slug 301）
- 引擎基准：红+蓝 50/50 = `#8c53a2`（回归测试锚点）
- DOM 测试要加载真实 `dist/` + `vi.resetModules()`
- CF 统计自动注入 —— consts.ts 的 beacon 留空（防双计数）
