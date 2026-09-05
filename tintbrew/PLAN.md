# tintbrew 作战文档

> 本项目唯一计划文档 · 更新 2026-09-05 · 部署/运维细节见仓库根 [README.md](../README.md)
> 原则：本文档没写的 = 没计划；做完的立刻勾掉并写日期。

## 0. 北极星

**GSC 28 天曝光数（impressions）环比增长**。变现节点：自然流量稳定 ~300 访问/天 → 接广告（当前零广告代码）。

一句话现状：41 页上线（V1 33 + V2.1 W1/W2 共 8 页），81 测试全绿，GSC 效果数据已出现，进入「等收录 + 攒外链」阶段。

## 0.5 当前状况深度分析（2026-09-05）

**手里的牌（优势）**

1. **三层词池结构已成型**：KD 0 矩阵（24 个 /mix/ 页，新站唯一能立刻参与竞争的层）→ 腰部头词（brown 49.5K + 三色 58.4K + 烘焙，共 9 页场景页）→ 工具头词（KD 27，3~6 个月长跑）。任何一层起量都接得住。
2. **技术差异化是真的**：全竞品混色都是 sRGB 平均（灰 muddy），我们是 Oklab 感知混色 + paint-vs-screen 双答案；green 页按画家打法重写是内容侧同样的差异化。
3. **加页边际成本近零**：V2.2 加 30 页 = 改 colors.ts + mixes.ts 两个数据文件，页面/目录/301/sitemap/内链全自动。这个杠杆随时可拉。
4. **技术债为零**：81 测试全绿、线上 200/301 全验证、零控制台报错。
5. **已被索引参与排名**：GSC 效果数据出现 = 不在"没被发现"阶段，在"权重不够"阶段 —— 只能用页龄和外链解决。

**短板与风险（按杀伤力排序）**

1. **外链接近零** —— 当前最大杠杆缺口。只有 Uneed 一个提交（未确认收录）。DR 0 域名在 KD 38 的 brown 这类词上，没有外链就是磨十年页龄也难进前 5。
2. **站龄 1 天**，新站沙盒期（前 1~3 个月排名系统性压制）是常态，此期间数据差 ≠ 策略错。
3. **单一流量引擎**：全押 Google，Pinterest 第二引擎一直认可但没启动。
4. **回访钩子弱**：纯工具无账号无收藏提醒，访问质量靠 SEO 净新增。

## 0.6 目标阶梯（预测值，到点对照 §6 验收）

| 时点 | 索引 | 28 天曝光 | 访问/天 | 关键词里程碑 | 页数 |
|---|---|---|---|---|---|
| 1 个月（10/04） | 41/41 | 300~1,000/月 | 5~15 | /mix/ 至少 5 个词进 top 30；品牌词 top 3 | 41 |
| 3 个月（12/04） | 全部 | 5K~15K/月 | 30~80 | 首个长尾词 top 10；三色页 top 30 | 61~71（V2.2） |
| 6 个月（2027/03） | 全部 | 30K~60K/月 | 150~300 | 工具页（mixer）进 top 20；brown 进 top 30 | 71~78（V2.3） |
| 9~12 个月 | — | — | 300+ | 触及变现线 → 接广告（RPM $5~15 → $45~200/月起步，向 $500/月爬） | 80+ |

> 数字依据：KD 0 词 SERP 实勘全是弱内容（进 top 30 是新站合理预期）；头部词按外链进度保守估。**到点没达 → 回到 §6 表格执行对应动作，不硬扛。**

**Request indexing 9 个 URL 清单（2026-09-06 用，粘一个做一个）：**

```
https://tintbrew.com/what-colors-make-brown/
https://tintbrew.com/how-to-make-black-frosting/
https://tintbrew.com/how-to-make-brown-icing/
https://tintbrew.com/icing-color-chart/
https://tintbrew.com/buttercream-color-chart/
https://tintbrew.com/color-guides/
https://tintbrew.com/what-colors-make-purple/
https://tintbrew.com/what-colors-make-green/
https://tintbrew.com/what-colors-make-orange/
```

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
| 1 | Request indexing 9 个新 URL（W1+W2，**清单见下方代码块**） | 👤 | GSC 逐个显示"已请求" | 2026-09-06 |
| 2 | 外链：Peerlist Launchpad + AlternativeTo（**步骤+文案见 [DISTRIBUTION.md](./DISTRIBUTION.md)**） | 👤 | 两个平台提交成功 | 2026-09-07 |
| 3 | GSC 首查：效果→查询（28 天），看 W1/W2 词有没有曝光 | 👤+Claude | 截图记录，更新本文档 §2 状态 | 2026-09-10 |
| 4 | **V2.2 第二批配色对（+20~30 页）**：colors.ts 扩色 → mixes.ts 配对 → 全自动出页。**筛选规则**：候选色池 gray/cyan/magenta/gold/navy/turquoise/lavender/beige/silver/maroon/teal/coral，启动时逐对拉 AITDK/Ahrefs 数据，**只保留 搜索量≥500/月 + SERP 前 10 无 DR60+ 巨头** 的配对，凑满 24~30 对收工 | Claude | 61~71 页，`_redirects` 重新生成，测试全绿 | 启动条件见 §6 |
| 5 | W3 木器染色 2 页（coffee wood stain 等，已锁定未建） | Claude | 2 页上线 | 跟 V2.2 同批或下批 |
| 6 | per-page OG 图：场景页用引擎生成对应色卡图（替代全站共用卡） | Claude | 场景页 og:image 唯一 | 2026-09 下旬 |
| 7 | V2.3 工具页：互补色/对比色生成器（`contrastRatio` 引擎已有） | Claude | 1 页 + WCAG 检查 | 2026-10 |

## 4. 每日 / 每周例行

**每日（≤10 分钟，两站共用，chartglade 见其 PLAN.md）**：

- [ ] GSC → 效果：有没有新冒头的查询词（2 分钟，**界面怎么点见根 README「每周数据检查 SOP」**）
- [ ] Cloudflare → Web Analytics：访问曲线异常否（1 分钟）
- [ ] 新词/异动随手记到本文档 §2 表格（不展开分析）

**每周（~30 分钟）**：

- [ ] 周一：GSC 索引数（0→N 页）+ 效果 28 天环比，记入本文档
- [ ] 周三：1 个外链/分发动作（目录站、Reddit r/DIY r/painting、Pinterest 图钉）—— 提交文案抄根 README「外链提交文案」节；目录站清单 Peerlist → AlternativeTo（Uneed 已提交）
- [ ] 周五：批次决策 —— 看数据定下周上不上 V2.2（对照 §6 条件）

## 5. 远期规划（V2.x 全景）

1. **V2.2** 扩色矩阵 +20~30 页（架构零改动，纯数据）
2. **V2.3** 工具页三件：互补色生成器（顺手）、图片取色/调色板导出（流量入口）、Oklab 渐变生成器（差异化）
3. **V2.4** 分发：每批次上线 → 提交一轮目录站；Product Hunt 正式发布（外链权重最高，单独准备）；Pinterest 场景图分发（第二流量引擎）
4. **变现**：~300 访问/天 → 接广告网络（AdSense/Ezoic 评估）
5. **重启候选**：穿搭配色词（what colors go with X）——V2.1 见效后先拉 6 个代表词数据再定
6. **季节窗（美国日历，准则见根 [CLAUDE.md](../CLAUDE.md)）**：万圣节 frosting/icing 搜索 **10 月**起脉冲 —— 页面 9 月已在位，只欠分发：**10 月第 1 周把 /how-to-make-black-frosting/ + /icing-color-chart/ 的色卡 pin 发一轮**（[DISTRIBUTION.md](./DISTRIBUTION.md) §3 流程），Reddit 烘焙角度帖同周跟上

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
