# 账户体系 + AI 解签:在位者做法与我们 的落地方案(2026-11-08)

- **缘起**:👤 "别人的账户体系和 AI 解签是怎么做的,我觉得这个我们也可以弄一下"。
- **来源**:两路代理实勘(账户 ×6 站、AI 产品 ×8 站)+ 直扒前端/JS/llms.txt(模型接入)。gap-vs-bigplayers.md 中"明确不补"条目按本档结论修订:账户与 AI 从"不补"改为"分档可上"。

---

## 一、在位者怎么做(实勘结论)

### 账户体系
| 站点 | 登录方式 | 账户给用户什么 | 付费挂法 |
|---|---|---|---|
| flipsimu【实测】 | 邮箱密码 / Google OAuth | 自定义配色、存档、跨设备 | 无付费——**核心工具永远免登录,账号只锁"个性化+存储"**(最贴我们形态) |
| tarot.com【实测】 | 邮箱 | **Journal 自动存全部占卜记录**、生日档案、Karma Coins 余额 | 一次性报告 + 充值包 + 订阅 |
| labyrinthos【实测】 | 邮箱一次性验证码(Shopify,无密码) | Web 端仅订单;日记在免费 App | 实物电商 + 免费邮件课 |
| co-star【实测】 | 手机/Apple + 短信验证,注册**强制收割生日时辰地点** | 本命盘、好友合盘、已购永久存 | 100% IAP;首问免费→credits |
| Sanctuary【实测】 | 邮箱密码(注册收生日,默认勾邮件营销) | 本命盘、credits 余额、解读记录 | $4.99–19.99/分钟真人聊 |
| numerologist【推断】 | 无真账户,纯邮箱捕获 | 免费报告 | 邮件序列卖高价报告 |
| fortunecookiemessage【实测】 | 无注册,投稿只要昵称 | — | 展示广告 + 卖饼干 |

**共同套路**:①账户=历史沉淀+跨设备+付费余额,三者缺一价值骤降;②登录摩擦极低(一次性验证码/OAuth,没人用重验证流程);③一次性 credits/买断为主流,**订阅只属于 App 级玩家**;④邮件是万能底牌;⑤纯工具站证明零账号可存活。

### AI 解签
- **形态主流 = 一次性 AI 报告**(输处境→签文套进处境),聊天/追问是加价项(openfate:报告存档后再追问单独计费)。
- **教科书漏斗**(kaucim ≡ openfate):免费静态判词 SEO 引流 → AI 深读付费。**我们 16 页现状恰好是这个漏斗的前半段**。
- **定价带**:单次 $2.99–4.99 / 深度 $9–19 / credit 打包摊 $0.2–0.3 / 订阅 $10–27 月 / 真人 $5/分钟;**"不订阅、一次买断"正成为品类卖点**(kaucim 长明灯 "nothing renews")。
- **防滥用统一套路**:静态零门槛,AI 挡在限次/账号/预付后(通行证日 20 次、共享日配额、3 次/天)。
- **营销细节**:AI 输出样例公开但**截断在付费线前**(先看半段再买);kaucim 支付走 Airwallex + iOS 内购。

### 模型接入(直扒前端/JS/llms.txt)
- **无一家在前端暴露模型或密钥,全部服务端代理**——kaucim 前端 JS 只有 /api/referral、/api/analytics;openfate 前端零披露。
- kaucim llms.txt 透露:内部评测同时调 **gpt-5.5 / claude-sonnet-5 / gemini-2.5-flash** 官方 API;生产解读"**AI 对照固定签文/命盘写成,按命理师访谈微调**,无逐篇人工审"。
- goodbyby 站内 AI 厂商不披露,配额是**全站共享每日免费池**(常用完),兜底是**一键复制 prompt 到用户自己的 ChatGPT/Claude/Gemini**(BYO-AI,零成本长尾)。

---

## 二、我们要弄:四档方案(Cloudflare 全家桶落地)

> 原则:①工具永远免登录("free, no sign-up"文案不用改,账户是可选叠加=flipsimu 模式);②AI 永远服务端代理;③**system prompt = 我们的手写签库 + 已定稿解签公式**——AI 只做"把签文套进用户处境",语气红线与 100 签同源,这是 kaucim 们抄不走的部分(他们引寺庙原文,我们整套手写)。

| 档 | 内容 | 技术 | 成本 | 风险 |
|---|---|---|---|---|
| **0 现状增强** | localStorage 抽签历史(本机"我的签史") | 零后端 | 0 | 无 |
| **1 免费限次 AI 解签** | 抽中签后"AI 帮我问这支队"(输处境→一次性报告,套用该签数据);**3 次/天/IP** | Pages Functions + Turnstile(免费) + 模型 API | Claude Haiku:≈$0.001/次(1.5k in+0.7k out)→ 1 万次/月 ≈ $13;Gemini Flash 更低;Workers AI 免费档但文风风险大 | 滥用(Turnstile+限次兜住)、文风漂移(prompt 锁签库语气) |
| **2 轻账户** | 云端签史+收藏+跨设备 | 邮箱魔法链接(Resend 免费 3k/月)或 Google OAuth;D1(SQLite)免费档 | ≈0 | 合规隐私页(我们以隐私为卖点,账户要做成"只存签史,不存个人信息") |
| **3 付费 AI 深读** | 一次性买断 $2.99–4.99(反订阅话术),样例截断展示 | Lemon Squeezy(5%+50¢,个人可收)或 Stripe(2.9%,需主体) | 抽成 | 定价/退款/客服——**建议需求验证后再上** |

**推荐路线**(对齐"先 SEO 矩阵后变现"的既定打法):
1. **上线不带账户、不带 AI**——16 页 + /signs/ 全文页 + 12 星座页先抢索引(纯静态 CWV 优势不动摇);
2. 上线后第一迭代上**第 1 档**(免费限次):留存钩子 + 需求验证 + AI 搜索内容源;BYO-AI 复制按钮同期做(零成本兜底,goodbyby 已验证);
3. 1 档数据(使用率/复访)决定要不要 2、3 档。

> **👤 拍板(2026-11-08)**:AI 与账户**只做方案不动工**,近期火力全部给 SEO 矩阵(/signs/ 全文页 + 12 星座页 + 日期化归档);将来启动时账户直接做到**第 2 档轻账户**(魔法链接/OAuth + D1 云签史),再按数据决定付费档。
>
> **👤 拍板(同日晚,修订)**:"都开始吧,我们也做全局免费计数,然后用 google 授权当账号记录"——第 0/1/2 档当周落地(授权选 Google OAuth,不做魔法链接),AI(付费/免费深读)仍等需求验证。

## 附录:工程落位(2026-11-08 已建)

- **代码已就位**:`functions/api/`(count / history / me / auth/{google,callback,logout})、`schema.sql`(counters/users/sessions/history)、`src/lib/track.ts`、`/account/` 页;12 个工具页已挂 trackDraw(计数+入史)。
- **本地预览**:纯 `astro dev` 下 /api/* 不存在,account 页与首页计数条均优雅降级;要完整跑 `npx wrangler pages dev`(需 D1 本地绑定)。
- **上线三步(域名定后)**:
  1. `npx wrangler d1 create luckyshake` → Pages 项目 Bindings 绑定为 `DB`;`npx wrangler d1 execute luckyshake --file=./schema.sql`
  2. Google Cloud Console 建 OAuth 客户端,重定向 URI 填 `https://{最终域名}/api/auth/callback`,凭据配到 Pages 环境变量 `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
  3. 重建部署;确认 /api/count GET 返回 JSON、首页计数条亮起
- **隐私口径**(对外文案已按此写):计数只记工具名;账户只存 Google 名/邮箱/头像 + 签史;问题文本永不离开浏览器。

---

### 来源(2026-11-08)
- 账户:flipsimu.com/login · tarot.com FAQ · labyrinthos.co/account/login · costarastrology.com/faq · sanctuaryworld.co/faq · fortunecookiemessage.com/submit.php
- AI:kaucim.ai/en/pricing · openfate.ai/en(/bazi) · goodbyby.com/en/poem/GuanYin/37 · tarotreadingapp.com · asksoma.ai 对比评测 · Sanctuary App Store
- 模型接入:直扒 kaucim/openfate/goodbyby 前端与 JS chunk + kaucim.ai/llms-en.txt
