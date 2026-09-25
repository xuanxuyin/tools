# 每日任务队列（两站共用）

> **每天开工第一眼看这里。** 👤 = 你的活（要做），🤖 = Claude 的活（不用管，列出是让你知道进度）。
> 本文件只管"现在做什么"：做完勾掉，过期由 Claude 清理归档；**决策、数字、时间线仍以各 PLAN 为准**（[chartglade](./chartglade/PLAN.md) / [tintbrew](./tintbrew/PLAN.md)）。
> 找文案：chartglade 分发 → [chartglade/DISTRIBUTION.md](./chartglade/DISTRIBUTION.md)；tintbrew 分发 → [tintbrew/DISTRIBUTION.md](./tintbrew/DISTRIBUTION.md)。

---

## 今天 · 2026-09-25（周五）

> 9/24 👤 未完项全部顺延（索引配额 PT 午夜已重置）；9/24 已完项归档在下方。

- [x] 👤 ~~周一例行收尾~~ **✅ 9/25 完成：两站 28 天数据入档**（chartglade 3 点击/1,194 曝光/排名 43.1，过基准档上限；tintbrew 10/**11,503**/37.1，超 1 月乐观档 3 倍）—— 判读明细各 PLAN 9/25 行
- [ ] 👤 tintbrew CF WA 数据面收尾（9/20 手动 token 上线后唯一余项）：访问 tintbrew 任一页 → dashboard 刷新看曲线冒头（几分钟内）
- [ ] 👤（顺延）tintbrew Pinterest **设置照常做**（账号/board/域名认领，[DISTRIBUTION.md](./tintbrew/DISTRIBUTION.md) §3.1）—— chartglade 三连拦先例：链接 pin 首测定 **10/01** 不硬试，色卡 pin 批（§3.3）改"门开则补"；**10 月第 1 周万圣分发主力 = Reddit 烘焙帖**（§3.4）
- [x] 👤 ~~request indexing 新页批次~~ **✅ 9/25 完成：12/12 新页当日全部推完**（万圣 4 + graph paper 簇 7 + name-tracing，超每日 ~10 常规量）→ 累计手动请求 **26/64**（9/8×5 + 9/9×9 + 9/25×12）。**下次例行继续**：**place-value 家族余页（decimal/anchor 变体）提到最前**（9/25 热门查询 8/10 是 place value 族、已破 top 10，吃簇势能）+ 支柱变体页（multiplication 1-20/blank/1-15）+ 字母页 g/h/l 打头，每天 ~10 条啃剩余 ~37 页池，跑完一轮回传数字 Claude 对账；⚠️ 若报"提交索引编制请求时出现问题"= GSC 界面 Google 侧瞬时故障（站端已巡检全 200）：等 2~5 分钟刷新重试，当天推不完不追（配额 PT 午夜重置 ≈ 北京 15:00）
- [x] 👤 ~~CF 修复 http://www.chartglade.com/ 403~~ **✅ 9/25 修复（实勘定性 + 👤 开 1 开关）**：已有 Redirect Rule（www→root 301）只匹配 `https://www.*` —— **http://www** 不命中规则 → 掉到 CF Pages（www 未在项目认领自定义域）→ 403；实测 https://www 一直正常 301。修法 = chartglade zone 开 **Always Use HTTPS**（SSL/TLS → Edge Certificates，1 次点击），未动规则。验证【实测 curl】：`http://www.chartglade.com/multiplication-chart/` 全链 301→301→**200 且路径保留**；`http://chartglade.com/` 亦 301。tintbrew 免检通过：http 与 http://www 均已 301→200【实测】，无需动
- [x] 🤖 ~~拼豆 studio 两修~~ **✅ 9/25 上线**：zone 取色器自定义色点了没反应（弹层挂 chip 按钮内、点击冒泡触发切换当场拆弹层 → 吞点击 + Use color 确定钮 + 当前色回显）｜ Blank canvas 加每 5 格坐标（顶列/左行，随图打印）；142→145 测试绿（PLAN 9/25 行）
- [x] 🤖 ~~拼豆三连反馈修~~ **✅ 9/25 上线 main `85aa129`**：① Bear Reference 黑圈不全 → **引擎级根因两处**（rim 扫描边转边写藏住空邻居成破洞 → 先标记后落子；dropSingles 4 邻域误删描边斜拐角 → 8 邻域）+ 18 处 rim 补丁 + 4 处几何修（熊阴影月牙 inset、圣诞帽雪花、铃铛高光、chick 大小写），**46 图全审计 37 过 / 9 设计留白记录在案**，unicorn 字节不变；② 坐标字太小 → 根因是 **Astro scoped 样式不跨组件边界**（画布卡借页面样式从未生效、svg 退到 416px、字实际 8px）+ 320px 侧栏压画布 → 组件自给自足 + 全宽画布 + gutter 16/12px 粗体 → **实测 15.1px**；③ brush 光标坐标徽章（悬浮 readout，出格即隐）。146 测试绿（明细 tintbrew PLAN 9/25 行）
- [x] 🤖 ~~拼豆 studio 三连修（同屏排版 + 精确镜像对称 + Mirror 笔刷）~~ **✅ 9/25 上线 main `af9f6a3`**：① 画布+调色板同屏（≥901px 双栏画布左工具右、svg 上限 1.25×viewBox），连带修 **Chrome sticky grid item 约束矩形 = 整个 grid 容器**的隐藏炸弹（zone 侧栏粘到底整块盖住工具栏 → 去 sticky）；② 👤 "对称坐标不同色" → 其例是 skull 页 52 宽（11 的真镜像是 42，46 在形外），但全站 46 图逐格镜像对拍揪出 781 格真不对称，5 张引擎伪影（超采样平票 + 圆心半格偏轴：bunny/chick/penguin 缺左鳍/草莓叶冠/寿司海苔）→ **引擎加镜像 OR 对称化终检**（rim 前，asymOk 白名单留设计例外）+ strawberry/sushi 误标纠正 + unicorn 鬃毛锁 3 格白名单，修后 mirror:true 全干净，其余 12 张不对称全是设计意图在档（狗尾/比萨斜边/月牙 C 等）；③ **Mirror 笔刷**新功能（笔画同步落镜像格）。测试 146→147 绿，线上 md5 与 dist 一致，IndexNow 51 URL 再推 200（明细 tintbrew PLAN 9/25 行）
- [x] 👤 ~~拼豆提案 AITDK 拉量（16 词）~~ **✅ 9/25 完成 → 立项成立，落位 tintbrew（👤 当日裁决推翻初判 chartglade：「成年女孩也爱卡通上色」「和衣服搭配功能一样，做 tintbrew 里」）**：主族 ≈30.4K/月过 10K 定标 3 倍（patterns 14.8K + ideas 9.9K + fuse/easy/templates/christmas/animals/halloween/food），KD 全带 14~35 → **tintbrew 拼豆上色族首批 5 页（hub + easy/animals/food/christmas），10-15 前**，全原创图案零 IP；perler beads 40.5K 导航词 KD41 弃、pony bead 6.6K 第二批。明细 [research/fuse-bead-patterns.md](../research/fuse-bead-patterns.md) §七 + tintbrew PLAN 9/25 行
- [x] 🤖 ~~tintbrew 穿搭页二连修（👤 "脖子脱离身体了""我在哪个页面可以自己搭配"）~~ **✅ 9/25 凌晨上线**：① 人台颈部断层修复（颈路径终点 y64 vs 躯干顶缘 y74 的 ~10px 空白 → 颈延长塞入躯干下；360px 放大截图 + AI 复检两图确认 chin→neck→torso 连续无白缝）② combos 后新增 **Style it yourself** 自由搭配卡（锚色 top + charcoal 裤 + ivory 鞋 + 金吊坠起步，复用换色 island 零新脚本，预设/自定义任选，read/阶梯实时重算）；114 测试全绿（PLAN 9/25 行）
- [x] 🤖 ~~拼豆选色面板挪到模板正下方（👤 "选 nose 时已经看不到图片效果"）~~ **✅ 9/25 上线 main `29e189c`**：根因 = 320px 右栏比模板卡还高，滚到列表低位 zone（bear nose）时重配色的模板早滚出屏顶 → studio 改**单列**（两卡并排在上、选色面板全宽紧贴其下），面板压扁（按钮并进标题行 / chips 多列网格 / 说明挪 chips 下方 / 弹层 max-width 420px），点模板选 zone 滚动预留 250px 弹层位；CDP 探针量化验收（707px 视口点 nose：色区+chip+弹层+62% 模板卡同屏共见）+ 147 测试绿 + 线上 bear/skull md5 与 dist 一致 + IndexNow 51 URL 200（明细 tintbrew PLAN 9/25 行）
- [x] 🤖 ~~拼豆取色弹层改固定底部浮层（👤 二次反馈 panda 页"往下拉选颜色就又看不到图案了"，`29e189c` 根修不彻底）~~ **✅ 9/25 上线 main `3ceffe0`**：弹层内嵌芯片下方必占流 → 点色板必须再滚、一滚模板出屏（布局自搏：模板下方一切都在和模板抢视口）→ **弹层改 `position:fixed` 底部居中浮层**，挂 studio 根、打开零位移、滚动中常驻、自带 zone 名标题，模板随时可滚到浮层上方完整看；点模板选区的自动滚动删除；顺带修 chip `<button>` 内嵌按钮非法 HTML。CDP 探针量化（panda 点末位芯片/点模板 cell 均 scrollY 零位移、浮层全屏内 32 色）+ 147 测试绿 + 线上 panda/bear md5 一致 + IndexNow 51 URL 200（明细 tintbrew PLAN 9/25 行）
- [x] 🤖 ~~拼豆模板卡视口自适应缩小（👤 三次反馈 bear 页"图案+横排颜色还是放不下"）~~ **✅ 9/25 上线 main `3868cc7`**：408px 卡 + 291px 浮层在短视口必超 → 两卡 svg 加 `max-height:max(216px, 100dvh-385px)` 保比例自适应（大屏不缩、短屏缩到整卡+浮层必然同屏）+ 浮层再压 20px；连带修真 bug：点击 studio 外（hero/正文）关不掉浮层（监听在 studio 根收不到）→ document 级 click 兜底。CDP 三视口量化（707/600 全卡+浮层同屏 8-9px 余隙、1000 不缩）+ 147 测试绿 + 线上 bear/panda md5 一致 + IndexNow 51 URL 200（明细 tintbrew PLAN 9/25 行）
- [x] 🤖 ~~图纸精确率双修（👤 "bunny inner ears 根本没填满耳朵，39/39,3 都是空，类似的还有很多"）~~ **✅ 9/25 上线 main `8704b81`**：两类根因 —— ① 引擎加**封闭洞治愈 pass**（两形状斜对角相遇的角落格对两区都够不着 FILL_MIN → 裸洞；4 邻全满+8 邻≥6 满 → 归多数邻区，跑在镜像前/rim 前；unicorn 2 格 holesOk 冻结字节不变）：全站治愈 13 洞（寿司 8/蝙蝠 3/驯鹿 2）+23 珠；② bunny 内耳细 banana 换 cat/fox 同款 leaf（耳内沿外缘白夹缝消除，粉填满 2-17 行，1096→1106 珠）。**"难道是特意设计的白色吗"——白边=设计毛色，裸洞=栅格化伪影已治愈**。验证：洞审计/占位镜像审计/astro check/96 页/147 测试/QA 拼图 4.5v 视觉评审全过；线上 4 页 md5 与 dist 一致 + IndexNow 51 URL 200【实测】（明细 tintbrew PLAN 9/25 行）

**9/24 已完成归档**：👤 chartglade Pinterest 三连拦 → 定性新域信誉门，改保温（隔天零链接 pin）+ 复试 10/01/10/15 ｜ 👤 AITDK 拉词五件全终局（fondant 330 死 / cursive 州词无量死 / halloween 8.2K 不加码 / 色觉敏锐度 B 组翻案上调 V2.2 第二梯队 / regents 780 不做 → ≥10K 定标入 CLAUDE.md）｜ 🤖 #18 支柱页下载按钮 `ece2230` + V1.8 sign-in 族 `76d1136`（均随 10/05 批）｜ 🤖 tintbrew per-page OG 33 张 + 扩容调研六组终局（tintbrew +90.7K：穿搭族 31.4K + make-X 59.3K 立项；chartglade +27K）｜ 🤖 V2.2 穿搭 4 页上线 `4e9aa06` + 交互升级（换色 island + croquis v2 重画）`d4f5b16`（明细各 PLAN 9/24 行）

**9/20~9/22 已完成归档**：统计"全 0"案全结案（GA 双站管道 ✅｜chartglade CF WA 活 39 visits/7d｜tintbrew WA 手动 token `5a142b1` 上线 + curl 双 URL 实勘）｜ 9/19 收录门执行（v1.6+万圣 `e0e8983` 上 main：65 页 61 测试绿、新页 3 条 200、sitemap 52→64、IndexNow 补推 12 URL 返 200）｜ MiriCanvas+竞品 sitemap 对标 → **#17 图片 SEO 5 支柱页上线 ✅**（lock 事故 `bcba67a` 复盘，"大站做法先行"入 CLAUDE.md）｜ 双站竞扫第二轮（Suncatcher/ClassWeekly/trycolors/colordesigner → 两 BENCHMARKS；#18 下载按钮 + V2.3 反向配色计算器立项）｜ #12 InkPx/Printabulls 拆解（#18 PDF 升格 10/25 正式项）｜ 9/22 docs 合并冲突裁决回填 `5e14847`（本地旧稿 × 远程 92 提交，e0e8983 核实在 main 历史无丢失）

**9/17 已完成归档**：👤 chartglade 外链首发 3/3 收工（homeschool.com + Cathy Duffy pitch ×2 提交，10 月第 1 周零回音各补 follow-up ｜ Reddit r/Handwriting 答帖已发）｜ 🤖 Peerlist launch 付费门定论更正（Verify Identity 收费，workplace 不解锁 → 搁置）

**9/15 已完成归档**：双站 IndexNow 上线（tintbrew 40 / chartglade 52 URL 推送 202/200【实测】；⚠️ 9/19 合并 main 后 chartglade 9 张新页补推一轮）｜ 🤖 万圣节簇开发完成 `f2be941`（word search 双难度 / color by number / cursive 词表 + hub = 4 URL，65 页 55 测试绿，9/19 门后随 V1.6 上 main）

**9/14 已完成归档**：GA 双站实时验证通过 ｜ 周一例行闭环（四榜单体检 + sitemap 满格 + 索引报告"0/14"虚惊定性过期快照）｜ Pinterest 复试仍拦 → 停止尝试进信任期（复试 9/21）｜ GA4 双站上线（`2b71a80`/`d4b814a`）｜ GSC 四榜单判双站未偏航 ｜ 竞品外链逆向（MyCursive 州立法页打法 → PLAN #16 + DISTRIBUTION §5）

**9/11~9/13 已完成归档**：Pinterest 域名认领 ✅（meta 上线 main `71774cc`，Verify 一次过；广告像素不装）｜ 3 board 建好但发 pin 被 spam 拦（判缓存时滞非故障）｜ 视力表词族 7 词实测 24.8K → 折中 2 页小簇进 11 月批（PLAN §3 #15）｜ 9/12 排的两项（Pinterest 测试 pin + GSC 收录复查）滑档 → 顺延至 9/14 清
**9/10 已完成归档**：tintbrew GSC 首查（brown 1/purple 2/green 1/orange 0 = 噪音级冒头，不动盘，裁决窗 10-01）｜ 第三站候选调研完结（B 宠物手册站唯一存活，挂 10/17 门）｜ 订阅方向冻结（"订阅×SEO 量=空集"，改走同域订阅试验）
**9/9 已完成归档**：目录站三渠道全部提交 ｜ request indexing 第二批 9 条（累计 14/53）｜ GSC 曝光累计 13 / site: 5 条 ｜ 🤖 字母页变体段上线（main `3cbf225`）
**9/8 已完成归档**：GSC "0 已编入"排查（URL 检查抽查 3 条全过，实锤切片读数坑）｜ CF 首基线 42 visits/678ms ｜ AlternativeTo 提交 + 双向挂竞品 ｜ request indexing 启动（首批 5 条）

---

## 本周

| 日期 | 任务 | 去哪抄 |
|---|---|---|
| （本周任务全在"今天"栏；下个节点 10/01 tintbrew 决策） | | |

---

## 近期日程（重要节点，到了会挪进上面）

| 日期 | 事件 |
|---|---|
| 9 月下旬 | 🤖 chartglade #18 支柱页下载按钮（v1.6-predev 开发，10/05 批）｜ tintbrew per-page OG 图 ✅ 9/24 |
| 10/01（周四） | **tintbrew 决策点**：/mix/ 词排名 —— 有词 top 30 → 启动 V2.2 加页；全 50 外 → 转外链强度（PH 提前） |
| 10 月第 1 周 | 👤 tintbrew 万圣分发：frosting/icing 色卡 pin 一轮 + Reddit 烘焙帖（页面已在位，只欠分发） |
| 10/05（周一） | **chartglade 10/05 批**（9/24 改版）：#18 支柱页下载按钮 + **V1.8 sign-in sheet 族**（hub + 4~5 页，用户指令提前赶 PT conference 季；万圣 + V1.6 已 9/20 提前发掉）= 分支合并 push main |
| 10/17（周六） | **chartglade 6 周大验收**：变体词排名 → 加码矩阵 或 B 计划 |
| 10/25（周日） | chartglade 10/25 批：感恩节页 + V1.7 公式表 2 页 + #14 数学练习 island |
| 11 月 | chartglade 11 月批：视力表 2 页小簇（V1.8 已提前至 10/05） |
| 2027-01-31 | **双站止损线复盘**（chartglade <3K 且零词 top 30；tintbrew <5K 且零词 top 30 → 停投） |

---

## 例行小抄

**每天（≤3 分钟）**：GSC → 效果：有没有新冒头查询词 ｜ Cloudflare → Web Analytics：曲线异常否（两站 9/20 起均可用）｜ ⚠️ 禁令：不手动 google 搜自己的站（污染 GSC；看收录用 GSC 索引报告）

**周一**：GSC 索引覆盖 + 效果 28 天环比 → 数字发 Claude（site: 只当粗信号，判定以 GSC 为准）
**周三**：1 个分发动作（pin / 目录站 / 社区帖，文案都在两份 DISTRIBUTION）
**周五**：无批次在跑就不动（新站隔 3~4 周上批，不堆页）
