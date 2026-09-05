# chartglade 作战文档

> 本项目唯一计划文档 · 更新 2026-09-05 · 部署/运维细节见仓库根 [README.md](../README.md)
> 原则：本文档没写的 = 没计划；做完的立刻勾掉并写日期。

## 0. 北极星

**GSC 28 天曝光数（impressions）环比增长**。变现节点：自然流量稳定 ~300 访问/天 → 接广告（当前零广告代码）。

一句话现状：**上线当天（2026-09-05）完成全部上线动作并扩容到 53 页**（27 基础页 + cursive 单字母矩阵 26 页），22 测试全绿，GSC 已收录 26 条 sitemap URL，进入「等收录」阶段。

### 目标阶梯（预测值，到点对照 §6 验收）

| 时点 | 28 天曝光 | 访问/天 | 关键词里程碑 |
|---|---|---|---|
| 1 个月（10/05） | 200~800/月 | 3~10 | 字母页若干进 top 30；alphabet chart（全站最软词）冒头 |
| 6 周（10/17） | — | — | **§6 大决策点**：长尾 top 30 有无 → 加码 / B 计划 |
| 3 个月（12/05） | 3K~10K/月 | 20~60 | cursive 单字母族 ≥10 词 top 30；place value 变体首现 |
| 6 个月（2027/03） | 20K~40K/月 | 100~250 | cursive-alphabet 主页 top 20~30；季节页（万圣/圣诞）脉冲验证 |

> 与 tintbrew 的差别：词池更大（251K）但 SERP 更硬（教育站在位），起量更依赖矩阵页数与季节脉冲；变现线同 300 访问/天。

## 1. 已完成（时间线）

| 日期 | 里程碑 |
|---|---|
| 2026-09-05 | KD 调研定型：4 支柱 251K/月词池（档在 `../research/cheat-sheet-data.md`） |
| 2026-09-05 | **上线** chartglade.com：27 页，CF Pages（项目真名 `tools-6hx`），主域 200 / www 301 |
| 2026-09-05 | GSC：Domain 属性验证 + meta 上线 + sitemap 提交（当天 26 条全部进索引管道） |
| 2026-09-05 | Email Routing：hello@chartglade.com 转发可用 |
| 2026-09-05 | **OG 品牌卡**全站接入（`scripts/generate-og.mjs`，`npm run og` 重生成） |
| 2026-09-05 | **cursive 单字母矩阵 26 页上线**（/cursive/a/~/z/，SERP 实勘名词型词可打）→ 53 页 |

## 2. 关键词资产表

| 梯队 | 词/词族 | 量(US/月) | 目标页 | 状态 |
|---|---|---|---|---|
| 量王 | cursive alphabet（裸词） | 201K/KD43 | /cursive-alphabet/ | 磨页龄，别指望 3 个月 |
| 量王变体 | cursive chart / capital cursive X / cursive X worksheet | 单字母族量待拉 | **/cursive/a/~/z/ 26 页** | 已上线，主战场 |
| 支柱 2 | place value chart（+printable/4th grade 变体） | 27.1K | /place-value-chart/ 等 4 页 | 已上线 |
| 支柱 3 | kindergarten sight words（+dolch/fry 变体） | 12.1K | 5 阶梯页 | 已上线 |
| 支柱 4 | multiplication chart（+1-12/1-100 变体） | 12.1K | 4 页 | 已上线 |
| 软词 | alphabet chart | 6.6K/KD15 | /alphabet-chart/ | 全站最软词，先动 |
| 禁区 | states and capitals quiz / multiplication worksheets | 12K+/KD48 | 不做 | SERP 巨头，已标注 |
| V1.5 候选 | cursive worksheet generator | 待拉 | 交互工具页 | MyCursive 生成器 SERP #5 验证过形态 |

## 3. 接下来要做（优先级排序）

| # | 任务 | 谁 | 验收标准 | 期限 |
|---|---|---|---|---|
| 1 | **Request indexing 5 个 URL**（今天推迟，明天做）：`/` `/place-value-chart/` `/cursive-alphabet/` `/cursive/f/` `/cursive/a/` | 👤 | GSC 逐个"已请求"（每天配额 ~10，勿超） | **2026-09-06** |
| 2 | Pinterest 分享包：26 字母页 + 4 大页的 pin 标题/描述文案（printables 赛道第二流量引擎） | Claude | 文案表落 PLAN 附录或独立文件 | 2026-09-06 |
| 3 | 目录站提交文案（照 tintbrew 模式：Uneed/Peerlist/AlternativeTo） | Claude+👤 | 首批 1~2 个提交成功 | 2026-09-08 |
| 4 | GSC 收录复查：`site:chartglade.com` 数 + 索引覆盖报告 | 👤 | 记录数字入本文档 | 2026-09-12 |
| 5 | **6 周长尾验收**（§6 决策点） | 👤+Claude | 变体词排名截图 | **2026-10-17** |
| 6 | V1.5 cursive worksheet generator（文本→可打印练习页，OFL 字体+print CSS+零登录） | Claude | 1 交互页 | 10 月，视 §6 结果 |

## 4. 每日 / 每周例行

**每日（≤10 分钟，两站共用，tintbrew 见其 PLAN.md）**：

- [ ] GSC → 效果：有没有新冒头的查询词（2 分钟，**界面怎么点见根 README「每周数据检查 SOP」**）
- [ ] Cloudflare → Web Analytics：访问曲线（1 分钟）
- [ ] 新词/异动记到本文档 §2（不展开分析）

**每周（~30 分钟）**：

- [ ] 周一：`site:chartglade.com` 收录数 + GSC 索引覆盖 + 效果 28 天环比，记入本文档
- [ ] 周三：1 个分发动作 —— **详细步骤+现成文案见 [DISTRIBUTION.md](./DISTRIBUTION.md)**（Pinterest 每周 3~5 pin、目录站顺序表、Reddit 发帖模板全在里面）
- [ ] 周五：无批次在跑时保持不动（新站隔 3~4 周上批次，别一次堆页）

## 5. 远期规划

1. **V1.5** worksheet generator 交互工具页（cursive 文本→练习页；MyCursive 已验证此形态在 worksheet 意图下有排名）
2. **矩阵扩容候选**（按验收结果挑）：multiplication 1-100 等变体页 / sight words 按年级细分裂变页 / alphabet chart 场景变体
3. **季节窗**：秋季开学季（8~9 月）已过一半赶不上，**万圣节/感恩节 printable（10 月中前必须上线）**、圣诞 winter printable（11 月上线）—— printables 赛道季节词是大流量脉冲。候选池（10 月初拉量筛选后定稿）：halloween word search / halloween coloring math facts / thanksgiving gratitude tree / thankful ABC list / halloween cursive practice（复用字母矩阵架构）/ pumpkin math chart
4. **外链与分发**：Pinterest 常态化（每周 pin）、教师社区（r/Teachers r/homeschool，先读版规）、TPT 形态研究（商城不做，引流可）
5. **变现**：~300 访问/天 → 接广告
6. **第二曲线**（本仓第三个站候选）：excel shortcuts / sql cheat sheet 等高 CPC 打印工具 —— chartglade 验收数据出来后再定

## 6. 决策点（数据说话，到点执行）

| 时间 | 看什么 | 条件 → 动作 |
|---|---|---|
| 2026-09-19（2 周） | `site:` 收录数 + GSC 曝光词列表 | 全品牌词/零曝光 → 正常再等；变体词冒头 → 记录并加速 Pinterest 分发 |
| **2026-10-17（6 周）** | **长尾变体词（cursive capital f 等）排名** | **有词进 top 30 → 加码矩阵扩容；全 50 名外 → 启动 B 计划**（worksheet generator 提前 / KD 0 长尾平移打法 / 停更止损评估） |
| 2026-10-31 | 28 天曝光总量 | 起不来 → 复盘：单字母族量是否本身就是空池（拉 Ahrefs 数据补量验证） |
| 随时 | 访问量 | 稳定 ~300/天 → 启动变现接入 |

## 7. 技术备忘（改动前必读）

- Pages 项目真名 **tools-6hx**（仓库名自动命名）；**CF 自动生成的 CNAME 永不手改**（改了全站 1014）
- GSC sitemap 输入框自带域名前缀，只填 `sitemap-index.xml`
- 加图表页 = `src/data/*.ts` 加 PageDef + find-by-slug wrapper（Footer/hub 自动带出）；**字母级矩阵走动态路由** `pages/cursive/[letter].astro`
- Dolch 220 逐字 / Fry first 100（含 #49 their）在 `src/lib/sightWords.ts` —— 改动必跑测试
- 字体仅 cursive 页按需加载（Dancing Script + Caveat woff2 自托管）
