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
| 11-12 | **unslop 视觉 polish**（👤 点名 unslop skill，polish mode 保留品牌世界只修 sign）：导航九色 pastel pill **安静化**——纸底墨字+细边，仅当前页 pill 保留工具身份色（Base.astro 加 `isActive`/`aria-current`）；大写宽字距标签收敛 0.14em→0.08em、字重 800/700→600（verdict 判词 900→700）；hero 右缘竖排装饰字删除；body 角落红绿 radial wash 删；卡片 hover `translateY` 全撤改边色+阴影；间距归一（card 26→24 / main 36→40 制）；`.incense-head` 更名 `.ritual-head` 与右栏共用；新增 `:focus-visible` 金色焦点环。**保留**：3D 签筒/香炉物件、印章配色、btn 实体按压投影、coin-face 900 铸币刻字、merit-band 庙金渐变、零水分文案。改后像素 diff 首页/签页各 7.5%（polish 量级），255 页 build + 63 测试全绿 |
| 11-12 | **香炉调校六连**（👤：加长→香底下移→炉筒同高→炉底=筒底→低 14px→**终版低 28px**）：香加长 `STICK_MAX` 150→260（显示 77→136px，viewBox 顶扩 `VB_TOP=-110` headroom）；香底深植 `BASE_Y` cy+21→**cy+35**（四连下移终值：整支香连带火苗烟下移 ~7px 显示，超出椭圆底的根段被 clip 藏进灰里 = 深插效果；腔 clip `CLIP_RY` 用满 `ry`）；对齐链前提 `.ritual-row` center→flex-start + `.incense-scene` 340=canvas 340；**落位**：筒身底=canvas 顶 330+291=621、炉底=svg 底=svg 顶+310、svg 顶=scene 顶 328+15−M/2 → `margin-bottom` 65（炉底=筒底差 0px）→36（低 14px）→**8**（svg 顶 339，炉底 649，**比筒底低 28px**，实测 DOM rect 对上；scene 底 668 余 19px，与下方 count 文案仍有清晰间距，视觉模型定性确认落地不飘）。方法论入档：物件对齐勿信视觉模型报的像素坐标（误差 30px+，多轮误报），用 DOM rect + element screenshot + sharp 逐像素闭环；火苗存在性用橙色像素计数验证（38px/22 列 ✓，数量随摇曳动画相位波动） |
| 11-12 | **敬香后无火 bug**（👤 "上香之后，香炉的香没有火了"）：根因 = 香加长扩 `VB_TOP=-110` headroom 时，clip 天空矩形还从 `y=0` 起（VB_TOP=0 时代 y=0 就是天空顶），香顶(-59)/火苗(-94)/烟(-100)全落进裁剪区——holder 里点燃的香有火、敬入炉中就没火。修复 = 矩形 y 跟 `skyTop=VB_TOP`、高 `MOUTH.cy-CLIP_RY+12-skyTop`（底边衔接椭圆 +12 不变）。验证 = 火焰像素 38→199（37 列）+ 视觉定性三尖各火苗/烟/不裁 ✓。教训入档：**扩 viewBox headroom 必查所有 clip/mask 的坐标系是不是也跟着扩**；另橙色火焰 RGB 判据会误抓炉体铜金高光（y 分布过宽即污染信号），严格验证靠视觉定性 + 修复前后像素量对比 |
| 11-12 | **整束上香**（👤 逐支六击太繁）：holder 改单按钮 `[data-incense-bundle]`——一击全燃（"Light all three"）、再一击全入炉（"Offer all three"）；点击按快照 forEach 逐支按相位推进（兼容旧混态数据：燃/未燃并存也一键收齐） |
| 11-12 | **上香/抽签九连微调**（👤 连发）：三支香靠近（每支 svg 宽 12 + gap 2 = 相邻间距 14px）；"In the censer: 3/3" 计数行全链删除；栏头精简并居中（"上香 · 一日三支"→"上香"、"摇签 · 一次一签"→"抽签"，`.ritual-head` text-align:center）；按钮"摇一摇签筒"→"抽签"并收窄 min-width 216→132；zh 全站"澄心"→"诚心"（👤 "至少是诚心吧"，6 处）；**香将燃尽催抽签 nudge**：任一支 burnRatio≥0.85 且今日免费/加抽仍在 → hint 换"香将燃尽——趁烟未散，快去抽一签。"（5s tick 自然触发）；**无机会时抽签按钮保持原样可点**（👤 两轮修正终态：不 disabled 不变暗）——点击靠 `gateDraw` 弹功德面板换机会；tapHint 改"点击数字，捐功德" |
| 11-12 | **功德倒计时模型定稿**（👤 "倒计时到了如果不领取是不会触发下一个倒计时的"）：`pendingMerit` 封顶 1——满 1 小时恰 1 枚待领即停，**不领不攒**（不会出现"领取 +2"），领取那刻 `accrueTs=now` 才重开 1 小时窗口；满箱同样停攒、花掉后重开。主页 ready 行显示反转：pending===0 且未满箱才显示"下一枚 mm:ss"——有待领时倒计时是误导（下一个还没开始走），待领交给领取按钮本身表达。测试 63→62（满箱两个 it 合并） |
| 11-12 | **全站文案 unslop**（👤 "需要优化的地方太多了"三点定纲）：①短标签句号清零——主页 h1「摇一摇签筒。让答案自己现前。」、拦截面板标题；②功德表述从说明书腔改缘语体——主页功德带 h2 改「一日一缘，功德可续」、blockedBody/fine/首页与签语饼 FAQ 同步精简；③破玄学感改写——「随机是天成，判词是人写」→「随机是天成，**签文有来处**」、「本站自己写、自己编」→「承老签之制，为今日之事重裁」（FAQ 直问处保留如实披露，营销段不自我拆台）；④zh 引号规范：直引号"X"全站→「」（signs.ts 58 处 + i18n-zh.ts 13 处 + 数字神谕/8号球/签语饼/今日运势场景与 FAQ 13 行；signClassical 的 `"` 是字符串定界符、注释、HTML 属性三者不碰） |
| 11-12 | **255 页逐页程序化巡检**（unslop-sweep.mjs，👤 "你肯定每页都需要处理的啊"）：每页断言电池（断图 / 桌面+移动双端横溢 / nav pill 安静化与 aria-current / :hover 带 transform 禁令 / focus-visible 存在 / 字重≥800 与大写字距>0.095em 白名单外清零 / EN 页零竖排）+ 全页截图 255 张 + 同族结构指纹离群检测 → **255/255 全过**；白名单入档：字重物件层 = coin-face·eight-note·slip-title·slip-label，字距 = seal--en（印章）；离群仅 daily-fortune 首末日（prev/next 单侧缺省，合法边界）。发现并修复：8号球窗口 EN 最长答案横向溢出 3px → 宽 100→104 + padding 14→12（底边圆弦 109.6px，余量仍在）。脚本坑入档：①可选组正则 `(zh\/)?$` 空匹配恒真；②Chrome CSS 嵌套后 CSSStyleRule 也有 cssRules（空 CSSRuleList 是 truthy 对象）——遍历样式表递归分组必须判 `.length`，否则所有规则被跳过 |
| 11-13 | **文案规范立档 [COPY-GUIDE.md](COPY-GUIDE.md)**（👤 "把所有的表述都去调研或者整理一下，是否符合玄学佛学的意境，是否言简意赅，而不是简单的优化"）：词汇表（缘=抽取机会·**点=功德计量**·十方功德=全站累计·支=香与签·枚仅硬币·现前/观照/聚）+ 五原则（按钮=动作二字；同一状态全界面只出现一处；机制词→仪式词，机制透明归 FAQ；营销段不自我拆台、披露只放 FAQ/fine print；短标签无句号·「」·阿拉伯数字；物件层字重字距白名单）。**功德箱去重落地**（👤 "下一枚 59:56？"+"领取+1 直接用领取"）：侧行"下一枚 mm:ss"整行删（与按钮倒计时重复 + 功德论点不论枚），按钮三态 = 领取 / mm:ss 后可领 / 功德已满；词汇替换 = 投一枚功德→捐一点·存了 n 次加抽→已续 n 缘·全站累计→**十方功德**·还差→尚缺·捐 n 功德→捐 n 点；页脚 zh 收紧。EN 同步：Collect +1 merit→Collect、nextOne 删。验证 = 四态 DOM 断言（fresh/pending/full/blocked）全过 + build 255 + 62/62；EN 页面级全文案审阅待 zh 层定稿（共享 UI 串已同步） |
| 11-13 | **文案第二批·九连批**（👤 连环指正）：①**摇签/抽签全局统一**——工具与动作统称**抽签**（去摇签筒→去抽签、再摇一次→再抽一次、shake-ring 摇签→抽签、incense claimHint/watching），"摇"只接物件**签筒**（h1 摇一摇签筒、ToolCard 摇签筒抽一签、title 摇签筒）；②**三路判词/三路解读 全站废除**→**一签三读 / 各有一读**（主页 features 三栏头定稿 = 摇筒抽签 / 一首签诗 / 一签三读，hero-sub、ToolCard×2、step、fortune-stick/cookie/signs/daily-fortune desc+FAQ 共 10 处）；③**营销位零披露词**（手写/免费/无需注册/本地存储→只留 FAQ 直问处+页脚 fine print）：筒中百签皆手写·每日一次免费机缘·无需注册→**筒中百签 · 一日一缘**（EN twin: A hundred sticks in the jar · one draw a day）、meta desc 5 页、8号球 hint"免费"、number-oracle hint"手写签"；④**FAQ 问句正向/中性**：为什么…才…→"…，有什么讲究？"（抽签/数字神谕）、真是五五开→五五开是怎么保证的、大事能信它→多大的事适合问它、真·经典→是经典的那 20 个答案吗、真能预言→它擅长的是什么、为什么还要抛硬币→两个选项难分高下时硬币能做什么、为什么带个看全文链接→「看全文」链接是做什么的、这些签文是认真的吗→签文可以当生活参考吗；⑤**不教训人**：想好了再摇一次→想再问时，签筒还在；EN "You don't pick the stick"→"Let the jar do the picking"；⑥**十方功德行**：API 不可达（astro preview 无 Functions）整行收起不挂「—」，捐币 POST 响应 total 直接回写（👤 "捐了还是—，不应该显示1吗"）；⑦**小部件按钮 .btn.small**（功德箱领取+上香领香，👤 "xx:xx 后可领的按钮太大了"），模态主 CTA 不动。规范同步进 COPY-GUIDE 词汇表+原则 3/4/5+界面清单。验证 = build 255 + vitest **62→64**（新增 tests/merit-communal.test.ts：真 SQL 捐1→total 1 + UI 三态链路）+ preview DOM 断言全过 + sweep 255/255（新增两条断言固化进巡检：widget-btn-big 小按钮高≤42 且带 .small、communal-dangling 可见十方功德行必须带实数）+ 领取按钮视觉复检后收窄 300→220→**160px**（高 37，居中不撑满） |
| 11-13 | **文案第三批·三连修**（👤 连环指正）：①**全站功德本地可见**（👤 "全站的功德数量没有地方可以看到"）——根因 = zh 审阅层全程 astro preview（无 Functions）→ 十方功德行按上批防悬挂设计整行收起，而 zh 层永不部署永远没 API，矛盾根源；新建 **`scripts/dev-server.mjs` 本地全栈预览**：node:http 服务 dist/ + 与生产 functions/api/{merit,count}.ts **同 SQL** 实现两 API（node:sqlite 文件库 `.fw-dev.db`，已 git-ignore），本地捐 1 涨 1，兼当 wrangler "write EOF" 故障日的替代；②**功德面板三行对齐**（👤 "我的功德 / 点击数字，捐功德 / 领取按钮这些都不对齐"）——`.merit-panel` 统一居中轴线（grid `justify-items:center` + `.merit-balance` flex 居中；原先 balance 行首 / hint 左 / 按钮居中三种轴线混排），与左侧箱侧"十方功德"行呼应，DOM 断言三行中心相对面板中线偏差 **0px**；③**机制 hint 撤除**（👤 "3 个数字 · 每一种都指向一支签 这个不需要提示用户吧"）——zh + EN number-oracle hint 两处删，EN 顺带清掉漏网披露词 hand-written；COPY-GUIDE 立"机制说明不进 hint"（hint 只放当下动作，讲原理归三步区/FAQ）。验证 = build 255 + vitest 64/64 + curl API 链路（GET total:0 → POST → 递增落盘重启仍在）+ merit-align-v5 DOM 断言（十方功德 2→捐→3 实时涨；balanceOff/hintOff/btnOff 全 0；oracle hint 无）+ 实拍视觉过审（"基本居中"；两条⚠️实据排除：按钮几何中心 DOM 0px、"箱顶遮挡文字"系截图抓到"功德 +1"飘字动画帧）+ sweep **255/255**（dev-server 真 API 环境复跑，零回归） |
| 11-08 | 账户 = Google OAuth 轻账户（历史同步）；AI 解签只做方案不动工 |

## 经济参数速查（改代码先对这行）

- 免费抽取：1/天/设备，本地日界（`fw_ration.day`），6 道具共用
- 功德：+1/小时（claim 制），上限 24，首访赠 1h 宽限；**不领不攒（👤 11-12 定稿）**：待领恒 ≤1——满 1 小时停下，领取（`accrueTs=now`）才重开下一小时；满箱同样停攒
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
- **wrangler pages dev 本机故障（11-13，未解决）**：上一条命令 11-12 还可用，11-13 连续四试全败（原命令 / `--noproxy` 已不存在 wrangler 4 / 清代理 env / CI=true+清 .wrangler state+钉 4.160.1），全部 "write EOF"（ProxyController: Failed to start ProxyWorker or InspectorProxyWorker）——判定本机环境回归，非代码问题；下次需要 D1 活链路验证时先解决它。当日替代 = 分件验证：真 handler（functions/api/merit.ts）+ node:sqlite 内存库跑同条 SQL（进 tests/merit-communal.test.ts，62→64），UI 链路 happy-dom + fetch mock 三态；**后续 `scripts/dev-server.mjs` 接管本地全栈预览**（dist 静态 + 同 SQL 两 API 文件库），D1 活链路验证不再依赖 wrangler
- **Windows 换预览服务器先查端口残留（11-13）**：TaskStop 杀 astro preview 后其子进程（node 树外孙）仍占 `0.0.0.0:4399` + `[::]:4399` 双栈，后起的 dev-server 被挤到只绑 `[::1]`——curl/playwright 命中旧服务（/api/* 回 Astro 404 页）而 localhost 浏览器看起来"正常"，极难察觉。解法 = `netstat -ano | findstr :4399` 找 PID → `taskkill //PID x //T //F` 清树 → `.listen(PORT, '0.0.0.0')` 显式绑定（已写进 dev-server.mjs）
- 部署/DNS/GSC 通用手册见根 [README.md](../README.md)
