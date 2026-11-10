# SEO 竞品逆向：yesnopicker.com — 单页吃 56K/月的样本

- **调研日期**：2026-11-06（用户发现并提供流量数据点，Claude 当日拆解）
- **流量量级**：~56K 访问/月【实测·用户提供，AITDK/Similarweb 口径】——全词群已知单站最高，超过我们主词 yes-no-oracle 6.6K 一个量级
- **方法**：curl 直抓首页 + sitemap 解析（伪 UA Chrome 124）+ WebSearch 美区 SERP 探针 ×2
- 原始 HTML 存档：`d:\tmp\teardown-ynp\`

---

## 1. 站点形态【实测】

**整站 = 1 个页面。** sitemap.xml 仅 1 条 URL（`/`，lastmod **2026-03-20**）——站龄约 7 个月，56K/月全部由首页一个 URL 承载。无内链矩阵、无 hub、无博客，全站唯一内链是首页自指。

**一个页面上挂两个工具**：
1. **Yes/No Picker**：输入问题 → "Ask the Universe" 按钮 → 50/50 直答（文案明说 statistically fair，浏览器本地随机）
2. **Wheel of Fortune mode**：自定义选项转盘（"Add your options, spin the wheel"）——顺手把 wheel 人群也接住了

## 2. 内容深度【实测】：UX 简单 ≠ 页面简单

可见正文 **3,773 词**，结构完整：

| 区块 | 内容 |
|---|---|
| How It Works（两套） | picker 三步 + wheel 三步，各配 3 条 |
| When People Actually Use It | **12+ 条 emoji 场景清单**：dinner debate / snooze / 发不发的短信 / 订不订的机票 / impulse buy / one more round / where to eat / what to watch / chore roulette / gift ideas / where to travel / game night——这就是我们"问题级变体矩阵"的**页内版**，它全塞在一个页面里 |
| FAQ | **9 问全带人味**（"no voodoo" / "if you've asked ten times and still don't like the answer, you already know what you really want. Go do that."） |
| 三段信息型长文 | The Psychology of Yes or No Decisions / How to Beat Decision Fatigue / When to Trust Randomness——吃 decision fatigue 类信息词 |
| About + Privacy/Cookie modal | Google 政策外链 = AdSense 个性化广告合规件 |

**这就是 PLAYBOOK"长文包工具"打法的单页执行**：工具 1 屏 + 3.7K 词内容 + 干净 FAQ。

## 3. SEO 基建【实测】

- H1 = 裸词 **"Yes or No Picker"**；title "Yes or No Picker — Instant Random Answer | YesNoPicker"，词前置
- **JSON-LD 两件：WebApplication + FAQPage**，干净无嵌 HTML（正是我们清单第 4 条）
- OG 全套，og:image 1200×630 实文件 137KB
- viewport/mobile-first；无 Next/WP/React 痕迹——手写静态或轻栈
- 变现：**AdSense + gtag**（FAQ 里写明 "supported by ads, no paywall"）
- **分享链接机制**：结果 URL 用 `URLSearchParams` 编码问题+答案生成可分享链接（"proof-of-decision"，无账号全设备可开）——社交分发回路，56K 里大概率有相当比例是 share/direct 回流而不全是 SEO

## 4. SERP 位次【实勘 2026-11-06，美区 WebSearch】

- **"yes or no picker" → 第 1 位**（yesnopicker.com）
- **"yes or no wheel" → 不在前列**：该词由 pickerwheel.com（/tools/yes-or-no-wheel）/ wheeldecide.com / spinthewheel.app / uplup.com / 1000logos.net 占据
- 结论：它吃的是 **picker/生成器词臂**（URL+H1+title 三重精确匹配），wheel 词臂没碰——两个词臂是不同的 SERP 生态

## 5. 对立项评审的意义

**利好（三个新证据）**：
1. **词族天花板重估**：此前 playbook 只按 oracle 词臂算（6.6K+1.3K+720…），picker/wheel/generator 词臂没拉过数——单站单页 56K 证明这条臂的量级可能 ≥ oracle 臂
2. **DR0 新站 7 个月爬到 56K**：比 dogemuchwow（6 年老域）更强的"新站可进"证据，且执行的就是我们的技术打法（SSR 内容+schema 全套）
3. **AI 截流风险低**：picker 是交互动作词，AI Overview 替代不了"点一下出答案"

**它的空档（我们仍可差异化的）**：
- 无矩阵：0 个变体页/问题页/场景页/hub——12 场景全在页内，没有 love/career/money 问题级页面
- 无日签/日期化页面，无新鲜度机制（lastmod 停在 3 月）
- 纯 50/50 无"why+行动建议"层，无签文库资产，无规模宣称
- wheel 词臂它不设防（那是 pickerwheel 的地盘）

## 6. 词臂数据【实测·用户 AITDK 2026-11-07】+ SERP 实勘（同日 Claude WebSearch 美区）

| 词 | 量 US/月 | KD | CPC | 判 |
|---|---|---|---|---|
| yes or no wheel | 135,000 | 68 | 0.01 | 头词不打（pickerwheel/wheeldecide/spinthewheel.app 地盘），变体+长尾包抄 |
| yes no wheel | 27,100 | 58 | 0.01 | 同上 |
| decision wheel | 14,800 | 78 | 0.01 | 同上 |
| **yes or no generator** | 9,900 | 44 | 0.94 | **B 级**：SERP=pickerwheel#1+ultimatesolver/uplup/yesnopicker/1000logos，全是工具页无内容怪兽，矩阵可打 |
| spin the wheel yes or no | 5,400 | 61 | 0.01 | 头词带，搭车 |
| **yes or no button** | 5,400 | 38 | 0.00 | **A 级**：SERP 前列 = yesnobutton.com / theyesnobutton.com 两个 EMD 薄站 + commentpicker + 应用商店，软 |
| yes no spinner | 1,900 | 63 | 0.01 | B 级搭车 |
| **yes or no coin flip** | 1,600 | **11** | 0.00 | **A 级首选**：KD11，SERP 混 Google Play/Apple 应用商店×2 + Reddit（弱信号=可进），在位 = yesornoai.com/coin 等薄工具页 |
| yes or no picker | 1,300 | 58 | 0.01 | B 级：KD58 但实勘 yesnopicker（7 月龄）#1 —— 实勘压 KD，可打 |
| random yes or no | 880 | 63 | 0.01 | B 级搭车 |
| yes no picker | 480 | 57 | 0.00 | 搭车 |
| yes or no decision maker | 260 | 52 | 0.01 | 搭车 |
| pick yes or no for me | 210 | 52 | 2.24 | 搭车（CPC 异常高，意图更真） |
| **合计** | **204,230** | | | **10K 新机会线过 20 倍** |

**判定**：
- 词臂合计 204K/月【实测】——单独过线，加上 oracle 臂（~8.6K）与待拉的 magic 8 ball 臂，整族量级看齐 chartglade 级别
- A 级两个词（coin flip KD11 / button KD38）三样齐全（量+KD+SERP 实勘），可直接进正式批次
- CPC 几乎全 $0.01：变现纯靠展示广告吃量（与 horoscope.com games 家族同模式），不是 CPC 词族——量就是钱
- 头词 135K 的 wheel 臂是 pickerwheel（工具公司级在位者）的地盘，不正面打；yesnopicker 56K 的量也证明不拿头词一样吃得饱
