# TPT（Teachers Pay Teachers）实勘档案 — 2026-11-11

> 调研目标（用户定题）：**卖什么、卖多少钱、怎么上**。产出即可执行的试水方案。
> 证据分级：【实测】= 当日用代理直接抓取 TPT 线上页面/官方 help API 提取的数字 ｜【实勘】= 新闻/指南原文所见 ｜【推断】= 由以上推出 ｜【假设】= 未验证。
> 背景：chartglade 图表引擎（纯代码确定性生成 PDF/PNG，非 LLM 生成）+ 美国 K-5 教师人群 = 与 TPT 买家完全同一批人（对照主题聚焦三问全部通过）。

## 0. 一句话结论（先说硬门）

**平台可以进，但 2026 年 10 月刚发生两件大事，直接改变进入策略**：

1. **10/8 Town Hall 宣布将禁止 AI 生成资源**并建检测工具（政策全文未落地）【实勘】
2. **10/1 起 Premium 会员废除**，改两档：Exclusive（77.5% 分成、$59.95/年、强制站内独家）或 Basic（55%、$29 一次性、$0.30/件抽成）【实测官方原文】

收款走 Hyperwallet，中国大陆**没有明文禁止**，但大概率只能走 Wire Transfer（美元电汇）或 PayPal，TPT 官方对中国的具体配置【未取到】，需小额实测验证。

## 1. 卖什么（品类与竞争实勘）

### 1.1 定价带实勘（今日抓取 TPT 站内搜索首屏，【实测】）

| 品类 | 定价带 | 聚集区 | 头部实例 | 判定 |
|---|---|---|---|---|
| multiplication fluency | $2.5–$40 | 单包 $2.5–$4.75；大包 $18–$40 | *Worksheet Bundle Facts 1-12*（350+ 页）$20.00，470 评价 4.87 星 | 量大、供给老、形态陈旧 → **首选** |
| place value | $3.68–$22 | $4–$8.5 | *Standard/Expanded/Word Form*（50 页）$4.00，193 评价 | 竞争弱于乘法 → **次选** |
| cursive handwriting | $2–$39 | $4–$7 | *Year Long Daily Worksheets* $15.00，491 评价 | 头部强、差异化靠主题不靠引擎 → **第二波** |
| coloring pages | $2.2–$8.5 | — | 季节性洪水供应 | **红海不碰** |

- 形态：纯 PDF 绝对主流；部分大包附 Google Slides/Easel 版本作加价理由
- 平台文化：永久"原价→现价"双标（抽查 5 商品全部带 Original Price），实际成交≈标价 5–7 折
- 评价数是唯一公开销量代理指标（1–5% 评价率反推，470–491 评价 ≈ 万级销量【推断】）
- 全站商品规模 "over 7 million resources"【实勘】

### 1.2 差异化空白（供给实勘，【实测】+【实勘】）

站内搜 "multiplication worksheets step by step answer key" 首屏 13 件中 7 件标题含 "Step-by-Step Keys"（$3.25–$9.99）——**同款定位已存在但很年轻**，listing 命名高度模板化（疑似已有玩家程序化套件），首屏无一显示评价数（新品或字段未回填，存疑）。

**空白点**：绝大多数 "answer key" 只是答案表；**逐题 worked solution（分步过程）+ 三档难度 + CCSS 标注**的组合首屏未见同规格供给。CCSS 标注是平台原生字段（官方有 standards crosswalking 工具）【实勘】。另有卖家明示"工具一键生成无限工作表"形态存在——程序生成在 TPT 非空白【实勘】。

## 2. 卖多少钱（定价方案，对齐实勘定价带）

| 角色 | 规格 | 定价 |
|---|---|---|
| 免费引流件 | 8–12 页 mini-pack（一个难度 × 一个事实族，含完整 worked solution 样张） | $0，设为店铺 Featured Free |
| 主力单包 | 35–45 页（≈20 页练习 × 3 难度 + worked solutions + answer key + CCSS 对照页） | **$5.50–$6.50**，标原价 $12–$14 挂常驻 5 折 |
| bundle | 90–120 页 | $12.99–$15.99（×0.99 尾数是平台惯例） |

- 上架即设 50% off launch sale 挂双标（平台文化，不吃亏）
- sitewide sale 机制：TPT 出 5% + 卖家可选最高 20% = 最高 25% off【实勘官方原文】
- 到手净额实例（$5 商品）：Basic = 55% − $0.30 = **$2.45/件**；Exclusive = 77.5% = **$3.88/件**（净多 58%）

## 3. 怎么上（费率/注册/收款硬门）

### 3.1 费率两档（官方原文逐字，2026-11-11 抓取【实测】）

| | Basic Seller | Exclusive Seller |
|---|---|---|
| 会员费 | **$29 一次性（不退）** | **$59.95/年** |
| 分成 | 55% | 77.5%（2026-10-01~12-31 入驻享 80% intro 至 2027-01-01） |
| 交易费 | $0.30/件 | 订单 ≥$3 免；<$3 每件 $0.15 |
| 独家要求 | 无 | **数字资源只能经 TPT 成交**（自有网站只许导流） |

Premium 已于 2026-10-01 废除，引发请愿抗议【实勘】。**策略：先 $29 Basic，不做年费承诺。**

### 3.2 注册与收款（中国大陆可行性）

- 注册：免费 Buyer 账户 → 付费升级 Seller，**升级付款走 PayPal**【实勘】
- 非美卖家**不需要 SSN**（仅 US Seller 必须提供）【实测官方原文】
- W8-BEN：官方原文 "**No, you do not need to complete a W-8BEN form**… optional" → 官方明文接受非美卖家【实测，2026-11-07 更新版文章】
- 收款：月结（约每月 10 日，最晚 21 日），经 Hyperwallet（PayPal 旗下），方式"取决于国家"（direct deposit/PayPal/Venmo/wire transfer）【实测原文】
- 中国大陆证据链：TPT ToS 无国籍限制【实测】；Hyperwallet 网络 CNY 数据页存在但 JS 渲染取不到正文【未取到】；同网络 WorkMarket 费率表 China=Wire Transfer 档（2% 手续费，最低 $10 最高 $30，USD 无汇兑费）【实测抓取】
- **判定【推断】：可注册、可收款，摩擦显著。到账路径大概率 = ① Wire Transfer USD 电汇（2%）或 ② Hyperwallet→PayPal→国内结汇**

### 3.3 收款验证顺序（先跑通再投入）

1. PayPal 账户（付 $29 注册费）
2. 出第一单后注册 Hyperwallet（Individual，非美不填 SSN，W8-BEN 可选）
3. 用一笔 $1–$5 真实销售实测转账方式：优先试 Wire Transfer USD 到国内银行
4. **到账跑通前不升级 Exclusive、不做大宗包生产**

### 3.4 上架规则（Seller Guidelines【实勘原文】）

只能卖自己创作/设计的资源、必须拥有全部组件商用权、免费品只能占店铺少数、设最低价、禁止导向站外成交渠道。无人工审核。

## 4. 头号风险：AI 禁令（时间线）

- **2026-10-08 Seller Town Hall**：宣布禁止 AI 生成资源（覆盖资源本体、封面、预览图、listing 文案），要求下架/替换存量 AI 内容；检测与移除工具建设中【实勘，转引行业纪要】
- **2026-10-15 Chalkbeat**（官方发言人 on record）：资源应当 "unique, expertly crafted, and AI-free"；"we're building tools that will speed up our ability to identify and remove AI-generated resources"【实勘】；此前 Chalkbeat 曝光站内 AI slop；卖家社群反映已有店铺因疑似 AI 被处理【实勘】
- **政策全文未落地**（2026-11-11 help center API 检索无 AI 政策条款文章，仅有《Will TPT use my resources to train AI?》承诺不擅用卖家资源训练 AI）【实测】。关键未明：人机判定标准、辅助使用边界、存量整改方式
- **对我们的含义【推断】**：引擎是确定性代码生成（非 LLM），但检测工具大概率不区分"程序生成"与"AI 生成"，且措辞指向 "expertly crafted" → 进入必须做人的加工层，第一批内容避免任何 AI 生成插图

## 5. 站内流量逻辑（怎么被买到）

- 搜索排名因素（第三方实测共识【实勘】）：① 关键词相关性（标题/描述开头/封面图内文字/文件名/学科标签）② 词竞争强度 ③ listing 质量 + 买家行为信号（**CTR、转化率 > 评价数本身**【推断】）④ 新鲜度（季节品吃更新）
- 官方工具（现 Exclusive 专属）：Search Analytics（关键词级 visits/conversions/earnings）+ Keyword Finder【实测 help 原文】——Basic 档没有
- 店铺排名 = 上月总销售额全站百分位，每月约 5 日更新【实测】
- 免费引流惯例：Featured Free 首屏位导流付费品；痛点是免费下载→评价转化极低（有卖家 800+ 下载个位数评价）【实勘】
- **季节节奏**：back-to-school（7–9 月）全年最高峰；11–12 月节假日次高峰；暮春-初夏最淡【实勘】。与仓库美国日历准则一致：**季节品提前 4–6 周上架**
- TPT 官方 seller blog 每月发布 "What teachers are searching for in X 月"

## 6. 落地节奏（对齐美国日历，今天 11/11）

| 时点 | 动作 |
|---|---|
| 现在～11 月底 | 注册 Basic（$29）+ 上免费件与主力包，蹭 12 月 end-of-semester review + 平台促销季 |
| 12 月～1 月 | 观察 AI 政策全文落地 → 决定是否加量 |
| 1–2 月 | 100th Day of School 数学包（K-2 大日子） |
| 4–5 月 | 为 7 月 back-to-school 高峰囤 grade-level bundle |

**进入姿态：小成本试水（$29 Basic），等 AI 政策全文落地再决定加码。**

### 第一包切入

1. **首选 multiplication facts fluency + worked solutions（Grade 3–4，CCSS 3.OA）**——量最大、头部形态陈旧（纯 drill + 答案表），逐题分步解析正好打引擎差异化
2. 次选 place value（Grade 2–4，CCSS 4.NBT，聚集价 $4–$8.5）
3. cursive 不作首发（头部 491 评价 year-long 玩法，差异化靠主题不靠引擎）；第二波试"cursive + 数学事实抄写"跨界
4. listing 文案强调 "scaffolded / leveled / step-by-step worked solutions"，**绝不出现 AI / generator / auto-generated 字样**
5. 封面与预览图用 chartglade 引擎输出（自制图表，无 AI 图）；预览图内放一页完整 worked solution 样张——转化率核心
6. 每包配 1 页 "How to use / 3-tier differentiation guide"（教师语言，降低生成感）

## 7. 未取到清单（探针已试）

- TPT 官方 AI 政策全文：help center API 搜 "artificial intelligence" / "AI generated resources" 均无政策文章；Town Hall 细节仅第三方纪要转述
- TPT 对中国大陆的 Hyperwallet 转账方式官方配置：help API 全检索 + ToS 扫描 + Hyperwallet docs（JS 渲染拦截）无明确答案，仅 WorkMarket 同网络费率表旁证
- 中国 TPT 卖家真实收款案例帖：知乎/CSDN/Reddit 只命中 AdSense 圈 Hyperwallet 教程，无 TPT 一手案例
- 评价数→销量换算官方比率（按行业经验 1–5% 推算，已标注【推断】）
- payout 最低起付金额：官方 payout 文章未提及

## 8. 来源清单

官方 help center：Seller-Fees-and-Payout-Rates（360044219891）、Exclusive-Seller-FAQs（53904743536276）、How-do-I-get-paid（360042580932）、W8-BEN 非美卖家（8472714118676）、SSN（8475435924500）、注册（360041266191）、sitewide sale（360042616532）、加入费用（360042906631）、Seller Guidelines（360042626591）、Search Analytics（47576021987348）、Keyword Finder（52639259916692）、Store Ranking（21774856269204）、standards crosswalking（360042194852）、AI training consent（55110176560276）

商品实勘：Multiplication Worksheet Bundle 5265447 / Math Facts Review 11846373 / Place Value Worksheets 5277239 / Cursive Year Long 4639290 / browse 搜索首屏（multiplication fluency、place value、cursive、coloring、step-by-step answer key）

新闻/行业：chalkbeat.org/2026/10/15（官方发言人 on record）、brightlearning.ai（Town Hall 10/8 纪要）、efinstitute.org、Reddit r/TeachersPayTeachers（1x5r866、1x1bn21）、Change.org 请愿

收款旁证：workmarket.zendesk.com 31431909954455（China=Wire Transfer）、docs.hyperwallet.com CNY supplemental data（JS 拦截未取到正文）、TPT ToS 全文

SEO 指南：seolumina.com 2026 TPT ranking guide、lindsaybowden.com / teachcreatesell.com（freebie 引流惯例）
