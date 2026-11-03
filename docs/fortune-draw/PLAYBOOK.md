# PLAYBOOK — 拆站汇总与打法清单

> 汇总自 [teardown-bigplayers.md](./teardown-bigplayers.md)（horoscope.com / astrostyle / 媒体系）与 [teardown-yesno-oracle.md](./teardown-yesno-oracle.md)（7 站小站集群）。调研日期 2026-11-03，结论均带证据分级，原始拆解细节见两份源文件。

## 在位者全景（一句话版）

| 在位者 | 形态 | 护城河 | 实底 |
|---|---|---|---|
| horoscope.com（词群#1） | ASP.NET postback 化石工具页，50 词+5 广告位 | 纯域权躺赢，games 家族 132 页 0 个 JSON-LD【实测】 | 一打就穿 |
| astrostyle.com（DR71） | 数千词长文包短工具，schema 齐全 | 占星品牌权威 | **该词群零布局**【实测】纯外溢，不构成防守 |
| yesnooracle.co | 集群最强：Next.js+FAQ schema+问题级变体矩阵 | 现代栈+内容 | 唯一像样对手 |
| tarostarot.com | 抽卡给 answer+the Why，78 牌×yes/no 矩阵 | 矩阵打法 | 第二对手，上线前真浏览器复勘 |
| 其余 5 小站+dogemuchwow | 化石站/薄壳站/0 词单页 | URL 精确匹配+域龄 | dogemuchwow 挤进前 10 证明门槛极低 |

## 打法清单（抄什么）

1. **结果三层**：Yes/No 直答 + why + 行动建议——超集群最强者一层（4/7 在位者实测只给一个单词）
2. **长文包工具**（抄 astrostyle）：数千词手写内容包 SSR 工具，schema 全套（FAQPage+WebApplication+Breadcrumb）——集群+大站 games 页双重空白
3. **问题级矩阵按"用户的问题"组织**（love/money/career/decision），不按牌组织；URL 去前缀化（抄 horoscope 分类法但不学它的 game- 前缀）
4. **每日日期化日签页**（抄大站日运思路）：/fortune-of-the-day/ 按日期滚动，制造每日回访+收录面
5. **签语库规模报数字**：300 签改编库是真资产，集群 9/10 不敢报库容
6. **胶囊互链墙**（抄大站 games hub）：footer/hub 把工具家族织成网
7. **广告克制**：上线期零广告，流量起来后再谈变现——在位者全是 AdSense 糊脸

## 攻击优先级（打什么）

1. **/yes-no-oracle/**（6.6K/KD37【实测+实勘双弱信号：两个真对手+五个化石】）— 主战场
2. **/fortune-cookie-of-the-day/ + 首页日签**（horoscope.com 化石位 KD18，dogemuchwow 证明可进）
3. /ask-the-oracle/（1.3K/KD30 工具带）
4. /my-lucky-numbers/（720/KD38，astrostyle 在此词群零设防）
5. 长尾矩阵：KD≤25 的 daily card / daily message + 问题级变体（love/money）从首日起布

## 风险与护栏

- **域权差距**：DR0 vs horoscope 的 132 页 games 家族——不硬碰头词，全部靠矩阵包抄+工具词精准匹配 URL
- **AI 截流**：答案型词（fortune cookie meaning 类）只做辅助内容页；主推交互工具型词（生成器/抽签动作），AI 替代不了点击动作
- **待补数据**：magic 8 ball 词族第二批拉数中（用户 AITDK），若过线则定位升级为"美国问事玩具工具站"，8-ball 升主位
- tarostarot 上线前用真浏览器复勘一次（直抓被 Vercel 屏蔽）
