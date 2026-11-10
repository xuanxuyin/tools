# PLAYBOOK — 拆站汇总与打法清单

> 汇总自 [teardown-bigplayers.md](./teardown-bigplayers.md)（horoscope.com / astrostyle / 媒体系）、[teardown-yesno-oracle.md](./teardown-yesno-oracle.md)（7 站小站集群）与 [teardown-yesnopicker.md](./teardown-yesnopicker.md)（yesnopicker 单页样本，11/06 补拆）。结论均带证据分级，原始拆解细节见源文件。

## 在位者全景（一句话版）

| 在位者 | 形态 | 护城河 | 实底 |
|---|---|---|---|
| **yesnopicker.com（11/06 新增）** | **单页 3.7K 词包双工具（picker+wheel），WebApplication+FAQ schema，~7 个月站龄吃 56K/月**【实测+用户流量数据】 | "yes or no picker" 第 1（URL+H1+title 三重精确匹配）+ share 链接社交回流 | **打法与我们 PLAYBOOK 80% 重合的执行者**；无矩阵/无日签/无 why 层，wheel 词臂不设防 |
| horoscope.com（词群#1） | ASP.NET postback 化石工具页，50 词+5 广告位 | 纯域权躺赢，games 家族 132 页 0 个 JSON-LD【实测】 | 一打就穿 |
| astrostyle.com（DR71） | 数千词长文包短工具，schema 齐全 | 占星品牌权威 | **该词群零布局**【实测】纯外溢，不构成防守 |
| yesnooracle.co | 集群最强：Next.js+FAQ schema+问题级变体矩阵 | 现代栈+内容 | 唯一像样对手 |
| tarostarot.com | 抽卡给 answer+the Why，78 牌×yes/no 矩阵 | 矩阵打法 | 第二对手，上线前真浏览器复勘 |
| 其余 5 小站+dogemuchwow | 化石站/薄壳站/0 词单页 | URL 精确匹配+域龄 | dogemuchwow 挤进前 10 证明门槛极低 |
| **yesornot.net（11/07 反面样本）** | Next.js + 全套 schema 的"优等生"，但 65% 中文内容 + 钱词页 408 词 + 数字 slug 博客 + 冲刺后弃养 14 个月 | 无 | **零排名零流量**——checklist 全对也救不了选错词/失焦/薄/断更；详见 [teardown-yesornot.md](./teardown-yesornot.md) |

## 打法清单（抄什么）

1. **结果三层**：Yes/No 直答 + why + 行动建议——超集群最强者一层（4/7 在位者实测只给一个单词）
2. **长文包工具**（抄 astrostyle）：数千词手写内容包 SSR 工具，schema 全套（FAQPage+WebApplication+Breadcrumb）——集群+大站 games 页双重空白
3. **问题级矩阵按"用户的问题"组织**（love/money/career/decision），不按牌组织；URL 去前缀化（抄 horoscope 分类法但不学它的 game- 前缀）
4. **每日日期化日签页**（抄大站日运思路）：/fortune-of-the-day/ 按日期滚动，制造每日回访+收录面
5. **签语库规模报数字**：300 签改编库是真资产，集群 9/10 不敢报库容
6. **胶囊互链墙**（抄大站 games hub）：footer/hub 把工具家族织成网
7. **广告克制**：上线期零广告，流量起来后再谈变现——在位者全是 AdSense 糊脸

## 攻击优先级（打什么）

> 11/07 五臂数据齐后重排（晚间新增 i ching 臂 44.8K + tarot 臂 195.4K）。全族 = oracle 臂 ~8.6K + picker/wheel 臂 204K + 8-ball 臂 ~763K + i ching 臂 ~44.8K + tarot 臂 ~195.4K ≈ **1.22M/月**【实测·AITDK】，定位 = **"美国问事玩具工具站"（道具家族站）**：8-ball/picker/coin/button/oracle/fortune cookie/起卦/塔罗道具矩阵 + 场景变体，对位 horoscope.com games 家族的现代化版本。

1. **/yes-or-no-tarot/**（tarot×yes-no 双臂桥页）——**yes or no tarot 74K/KD60 + tarot yes or no 18.1K/KD59 = 92K 簇，全族最大可攻词**【实测+实勘 11/07】：astrology.com/horoscope.com 大站在前列但中段软（jobcannon.io 职业站侧页、dailyom 在排 = 空位信号）
2. **/magic-8-ball/ + /magic-8-ball-online/**（8-ball 臂工具主位）——"magic 8 ball online" 40.5K/KD67 **实勘打脸 KD**：前列 = indra.com/8ball（90 年代个人页化石）+ magic-8ball.com + utils.com + playmagic8ball.com 全小站【实勘 11/07】，无大厂
2. **/yes-or-no-coin-flip/**（1.6K/**KD11**，SERP 混应用商店×2+Reddit）+ **/yes-or-no-button/**（5.4K/KD38，两个 EMD 薄站在位）——最软入口，首批上线
3. **/magic-8-ball-answers/**（8.1K/KD47，Pinterest 挤前列【实勘】）——内容页收 20 答案清单+解释，兼答 FAQ 富结果
4. **/yes-no-oracle/**（6.6K/KD37【实测+实勘双弱信号】）+ **/ask-the-magic-8-ball/**（5.4K/KD44，indra 化石 #1）
5. **/yes-or-no-generator/**（9.9K/KD44）+ **/yes-or-no-picker/**（1.3K/KD58，yesnopicker 7 月龄单页 #1 实勘压 KD）
6. **/i-ching/**（i ching online 9.9K/KD51 + iching online 3.6K/KD56 + reading/free/oracle 变体 ~2.4K）——实勘【11/07】前列全是在位老小站（ichingonline.net EMD/cafeausoul/onlineclarity 课程站）零大厂；差异化 = 三数起卦（在位者全是掷硬币玩法）
7. **/book-of-changes/**（4.4K/**KD17**，书意图 SERP：维基+Amazon/Princeton——工具意图空缺）+ **/i-ching-hexagrams/ hub + 64 卦逐卦矩阵页**（1.9K/**KD20**，在位 = 维基/cafeausoul 参考页，无交互工具）——chartglade cursive 单字母矩阵同款打法，长尾 hexagram 1 meaning / hexagram 23 …
8. **/one-card-tarot/**（12.1K/KD40 + one card tarot reading 1.9K/KD26；实勘仅 tarot.com+labyrinthos 硬，其余 EMD 小站+Reddit）+ **/tarot-card-of-the-day/ + /daily-tarot/**（4.4K/52 + 1.9K/50，复用日签引擎）+ **/tarot-spread/ hub**（2.9K/KD38）+ /three-card-tarot/（480+320，KD33/34；实勘 cbdtarot majors-only 3 卡小站在排 = 我们 v1 砍法有先例）
9. **/fortune-cookie-of-the-day/ + 首页日签**（horoscope.com 化石位 KD18）+ /ask-the-oracle/（1.3K/KD30）+ /my-lucky-numbers/（720/KD38）
10. **不打**：magic 8 ball 673K/KD75（品牌词，Mattel/维基/电商的地盘）、yes or no wheel 135K/KD68 与 decision wheel 14.8K/KD78（pickerwheel/wheeldecide/spinthewheel.app 工具公司级在位）、tarot reading 33.1K/KD71 与 free tarot reading 40.5K/KD58（tarot.com/app/人人抢的"free"头词；工具 URL /free-tarot-reading/ 自然承接不主动打）、i ching 22.2K/KD59（概念词维基地盘）——头词全靠变体+长尾包抄（tintbrew brown 打法）
11. 长尾矩阵：KD≤25 词 + 问题级变体（love/money/career）+ maybe/for-kids/classroom 类修饰词从首日起布

## 风险与护栏

- **域权差距**：DR0 vs horoscope 的 132 页 games 家族——不硬碰头词，全部靠矩阵包抄+工具词精准匹配 URL
- **AI 截流**：答案型词（fortune cookie meaning 类）只做辅助内容页；主推交互工具型词（生成器/抽签动作），AI 替代不了点击动作
- ~~**待补数据**：magic 8 ball 词族第二批拉数~~ **✅ 11/07 已拉：10 词合计 ~762.7K US/月**【实测·AITDK】（magic 8 ball 673K/KD75 头词 + magic 8 ball online 40.5K/KD67 + magic eight ball 27.1K/KD78 + answers 8.1K/47 + ask 5.4K/44 + online 变体 5.4K/61 + yes or no 1.9K/59 + fortune teller 1K/72 + generator 320/47）——**预定条件触发：定位升级"美国问事玩具工具站"，8-ball 升主位**。SERP 实勘 3 词全软【实勘 11/07】：online/ask/answers 前列均为化石小站（indra.com 90 年代页 #1）+ 应用商店 + Pinterest + Mattel 产品页（服务实体玩具意图，不防守工具意图）
- ~~**待补数据（11/06 新增）**：picker/wheel/generator 词臂拉数~~ **✅ 11/07 已拉：合计 204,230 US/月，10K 线过 20 倍**【实测·AITDK】——A 级入口 = yes or no coin flip（1.6K/KD11）+ yes or no button（5.4K/KD38），SERP 实勘均软（EMD 薄站/应用商店/Reddit 混前列）；头词 wheel 135K/KD68 是 pickerwheel 地盘不打，变体包抄。数据表与判定见 [teardown-yesnopicker.md](./teardown-yesnopicker.md) §6
- **三臂合并判定（11/07）→ 五臂更新（11/07 晚）**：全族 **~1.22M/月**【实测】（原三臂 976K + i ching 44.8K + tarot 195.4K，新臂数据表见 [iching-method.md](./iching-method.md) §6b / [tarot-method.md](./tarot-method.md) §6b）。可打区间（去品牌头词与工具公司头词）≈ 50K 原三臂 + tarot 可攻簇 ~116K（yes/no 塔罗 92K + 单卡 14K + 日卡 6.3K + 牌阵 3.7K）+ i ching 可攻簇 ~22K（工具 15.9K + 低KD内容 6.3K）≈ **190K/月起步** + "online"类头词矩阵包抄上行空间——**10K 线过 19 倍，立项数据三样齐全，待 👤 拍板**
- **商标护栏（11/07 新增）**：Magic 8 Ball 是 Mattel 注册商标——**域名绝不买含 magic-8-ball/magic8ball 的**（UDRP 风险，magic-8ball.com 属在位者冒险）；页面标题用描述性用法（"Magic 8 Ball" 仅作工具名词性指称），主打词另备 generic 变体页（8 ball fortune teller / magic ball answers / yes no oracle）对冲
- tarostarot 上线前用真浏览器复勘一次（直抓被 Vercel 屏蔽）
