# Fortune Willow（fortunewillow.com）作战 PLAN

> 站点代号目录 `luckyshake/`（历史遗留），品牌名 **Fortune Willow**。每日流水见 [../TASKS.md](../TASKS.md)，本文只记决策、参数、上线清单。

## 定位

美国问事玩具工具站：摇签筒抽签（100 支手写签）+ 数字神谕 + 8 号球 + 是与非 + 抛硬币 + 签语饼 + 今日运势 + 星座，一签多读。英文正式版（无 pray/deity 词汇红线），`/zh/` 为内部审阅层上线前移除。

## 已定决策

| 日期 | 决策 |
|---|---|
| 11-11 | 域名 **fortunewillow.com**（RDAP 未注册；柳=许愿树/签枝意象覆盖全家道具）。luckyshake.com 被挂 ¥39K 弃；fortunesticker.com 语义指向贴纸（错意图流量）不用；fortunesticks.com 已被注册 |
| 11-11 | **功德经济**（👤 定规则）：每天 1 次免费抽取全 6 道具共用；功德每小时聚 1 点、上限 24；**捐 8 点进功德箱 = 存 1 次加抽**；箱面计数 = 全站累计捐入，**不清零**。星座/今日运势是"读"不消耗机会；签语饼→数字神谕 `?d=` 深链不二次扣（饼上已付费） |
| 11-11 | 功德箱视觉 = 自绘 2.5D SVG（朱漆金边+牌匾"功德"+投币铜钱）——外网实拍图全是水印图库/许可不明，不用 |
| 11-12 | **功德箱交互批次**（👤 连环 QA）：领取/捐献动作分家（面板只余余额+领取，捐献归箱侧）→ 箱侧信息三行 = 全站累计 / 已投 n/8 / 存了 n 次加抽 → **数字即按钮**：功德余额做成金边币形 chip，点 1 下投 1 枚（少 1、飘「功德 +1」、铜钱落箱、POST 1），满 8 自动存票；箱底色浅黄庙墙（`--temple`），手机端内收圆角金边卡片；拦截面板捐献钮改两行（主行动+副进度）——进度文案光秃秃不像按钮的教训 |
| 11-12 | **上香仪式**（👤 定需求+参考照 docs/fortune-draw/xianglu.webp）：抽签页 tool-stage 左香右签两栏（50/50，问事前的祈福流程）；每日领 3 支香 → 点 1 下点燃 → 再 1 下敬入炉中 → 炉中 30min 燃尽留残枝；`fw_incense` 本地日界状态，烟/火星动画签名门控防重启闪跳 |
| 11-12 | **香炉/香真人照片落地**（👤 供图 xianglu.png/xiang.png + 五轮连环 QA）：两张供图棋盘格假透明（3 通道 0% alpha）→ sharp 本地抠图（中性色分类+封闭孔填充+最大连通域+羽化）→ `img/incense/censer.webp` 483×493 + `stick-one.webp` 40×635（单支、香体朝上）；incenseUi = **照片底图 + SVG 动态叠层**：泪滴火苗（红橙渐变 #b3270c→#ff7429 + 摇曳动画、起止同位姿防 5s tick 重启跳变）+ 烟缕 + 燃尽 clipPath 从顶裁烧剩竹签桩；香根定位 = **「天空 ∪ 腔体内椭圆」联合 clipPath**，口径实测 **cx246/cy180/rx166/ry23**（三次才测准：纯亮度判据两次被金褐阴影污染——首测炉身阴影、二测口沿下缘阴影带，加低饱和约束 lum<78 且 max-min<38 才得真腔；**测炉口暗腔必带饱和度约束**入档）；holder 火苗 viewBox 上抬留头（负区裁切只剩橙帽的教训）；**原件存 docs/fortune-draw/src-img/ 不随部署**，商用授权由 👤 自持 |
| 11-12 | **全站文案语域定调**（👤："中文佛学文学玄学，英文贴美国语法生活"）：zh = 佛学通名词库（缘起/照见/放下/观照/澄心/机缘/口业/万法唯心/签无喜怒）+ 意境先行、功能信息包在语境里；EN = 美式口语句（缩读/直接称呼/日常场景 job offer·text back·rent）+ 无 pray/deity 红线不破 + 经典产品词不动（8球 20 答案/等级名/工具名）；受众活在例子里不被点名 |
| 11-08 | 账户 = Google OAuth 轻账户（历史同步）；AI 解签只做方案不动工 |

## 经济参数速查（改代码先对这行）

- 免费抽取：1/天/设备，本地日界（`fw_ration.day`），6 道具共用
- 功德：+1/小时（claim 制），上限 24，首访赠 1h 宽限；满箱期间时长不保留
- 捐献：8 功德 = 1 次加抽（票，`extras`，不过期）；**主页交互 = 数字即按钮（👤 11-12"把1做成按钮"）：点一下投 1 枚（`donateOne`，`donated` 0..7 循环计数，满 8 自动存票归零）；拦截面板 = 补齐当前票（`donateRest`：只付差额 8−donated，已投部分计数在内，👤 11-12"在家投了 1 枚面板却显示 0/8"——面板与主页共享循环进度）**；面板捐献只存票、`gateDraw` 消费票（单一通路，勿改双消费）
- 全站计数：D1 `merit_box` 单行累计；POST 收整数 1..8（单枚投币=1，补差额=1..7，整票=8）；一张票的累计 POST 总额恒为 8，不重复计

## 上线清单（域名买好后）

1. 👤 Spaceship 买 fortunewillow.com（RDAP 11-11 未注册）→ DNS 托 Cloudflare
2. Cloudflare Pages 项目 Root directory = `luckyshake`；绑定 D1：binding 名 **DB** → 库 `fortunewillow`（已建好，5 表已应用）
3. 环境变量 GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET；Google Cloud Console 注册回调 `https://{域名}/api/auth/callback`
4. 删 `src/pages/zh/` + `i18n-zh.ts` + Base 的 lang 分支 + signs zh 字段（zh 审阅层退役）
5. `astro.config` 补 site URL → canonical/sitemap 生效
6. GSC 验证值填 `src/consts.ts`；提交 sitemap

## 技术备忘

- 栈：Astro 5 纯静态 + three.js 签筒（懒 boot）+ Pages Functions（/api/count、/api/merit、/api/auth/*、/api/history、/api/me）+ D1（schema.sql）
- 经济状态纯客户端 localStorage `fw_ration`（`src/lib/ration.ts` 纯函数 + `rationUi.ts` UI，12 vitest）；服务端只管全站累计计数
- 上香状态 localStorage `fw_incense`（`src/lib/incense.ts` 纯函数 9 vitest + `incenseUi.ts`：照片香炉+单支香图（`img/incense/censer.webp`+`stick-one.webp`，锚点/口径见上决策行）/ holder 双击交互 / 5s tick 签名门控渲染）；每日 3 支、单支燃 30min（`INCENSE_BURN_MS`）、燃尽留残枝至日界
- 本地全栈 QA（带 Functions + 计数）：`npm --cache d:/tmp/npmcache-fresh exec -- wrangler pages dev dist --d1 DB=fortunewillow --port 8789 --compatibility-date=2026-11-10`，访问 `http://127.0.0.1:8789/`（本机三坑见 memory wrangler-pages-dev-local-pitfalls：node:sqlite 造库/清 state 解僵尸锁/--noproxy）
- 部署/DNS/GSC 通用手册见根 [README.md](../README.md)
