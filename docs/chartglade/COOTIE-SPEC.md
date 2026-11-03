# COOTIE-SPEC — Cootie Catcher 页族构建规格

> 依据 [teardown-cootie-catcher.md](../fortune-draw/teardown-cootie-catcher.md)（手工博客 5 站）+ [teardown-cootie-bigsites.md](../fortune-draw/teardown-cootie-bigsites.md)（大厂/教育站 7 家）汇总。调研日期 2026-11-03。
> 纪律：页面结构抄在位者配方，差异化只落在两路拆解验证过的空档上。证据分级沿用拆解文件（snippet 级结论上线前美国代理复核）。

## 0. 空档与堡垒（两路拆解终验结论）

**真空档（打）**：
1. 签语库成体系——在位者每主题固定 8 条预填，无人把 fortunes 当内容资产经营（无分级/无内容池）→ 签文库改编库填
2. 教学人群——Superstar 零布局（site: 搜索无命中【实勘·snippet 级】）；Super Teacher 有 math catcher 但深埋无独立矩阵；sight words 侧 SERP 只剩 Pinterest/个人博客，比 math 更弱 → **sight words 版是更好入口**
3. HowTo JSON-LD 4/5 缺失（教育站全没有）→ 低成本超车点
4. 交付链路——在位者 Drive PDF/会员墙/付费打包 vs 我方 SSR 零门槛直接打印（体验级差异）

**堡垒（避开）**：节日 joke teller 矩阵（brendid 18 篇收口，圣诞做 fortune teller 体裁不碰 joke teller）/ truth-or-dare（cassie）/ 动物纸偶造型（easypeasy 主业）

## 1. 页面配方（抄在位者标配结构）

标配 = intro（这是什么+年级标签）→ 折法 HowTo 分步（easypeasy 标准 8~12 步配图解）→ 模板本体 → how to play 四步（skiptomylou 规格）→ 变体清单 → 同簇内链。

chartglade 化改造：
- 模板 = SSR HTML 直接打印（`.printable` 体系，折线随打印输出），无下载无门槛
- 彩色 + 黑白可涂色双版本（brendid 教师向标配）
- 折法图解印在模板纸上（skiptomylou 做法），K-1 建议"老师预折"（education.com 课堂指引语汇）
- HowTo JSON-LD 每页必带 + FAQPage

## 2. 页族清单与词

| # | 页 | 打的词 | 内容来源 | 批次 |
|---|---|---|---|---|
| 1 | /cootie-catcher/ 主页（空白+已填+折法+玩法） | fortune teller template 880/KD23 + cootie catcher template 720/KD28 | 空白模板 + 签库样例 | **首批·圣诞死线 11/15** |
| 2 | /christmas-cootie-catcher/（fortune 体裁：圣诞吉语+kindness messages，不碰 joke） | christmas cootie catcher 40/KD14 + seasonal | 签库圣诞子池 | **首批·11/15 死线** |
| 3 | /cootie-catcher-fortunes/（已填 fortunes 页：分级 blessing/nudge/gentle warning，kid-friendly） | cootie catcher ideas 320/KD21 + printable 带 | 签库改编库（成体系=空档） | 首批 |
| 4 | /sight-words-cootie-catcher/ 按 Dolch level 分页 | sight words catcher（SERP 最弱带） | **复用 sightWords.ts**（thisreadingmama 标准：12 词/catcher、逐词拼读、中心格"选词造句"） | 二批 |
| 5 | /times-table-cootie-catchers/ 按表分页 1~12 + Tough Facts（Super Teacher 3s/8s/11s + multiplication.com 14 PDF 已验证做法） | math facts catcher（TPT 付费证据第一名） | **复用 mathCharts.ts factsFor** | 二批 |
| 6 | how-to 折法长文 | how to make a paper fortune teller 4,400/KD51 | 页族立住后攻 | 爬梯 |

课堂元素（education.com 语汇）：年级标签 + CCSS 码（math 3.OA.C.7 / reading RF.K.3c）+ 课堂用途指引（center / early finisher / take-home）。

## 3. 签语库改编规格（内容护城河）

- 原料：docs/fortune-draw/ 300 签（观音/关帝/黄大仙），挑吉签 120+ 改编
- 成体系经营（空档打法）：分级（blessing / nudge / gentle warning 三级无 doom）+ 每条 = 一句吉语 + 一条 kid-friendly 行动建议；每主题池 8 条起步（在位者规格）但跨主题共享内容池+总量宣称（如 "100+ fortunes and counting"）
- 圣诞子池：吉语改圣诞 kindness/magic 语汇；课堂子池：fortunes 位置可换 brain teaser/鼓励语（multiplication.com 验证的换槽做法）
- IP 红线：改编后与原文意译距离要够（古籍公版无版权问题，但避免直译腔）；不出现宗教神祇名（观音/关帝/黄大仙等标识性名词一律不出现在用户侧文案）

## 4. 验收标准

- 首批 3 页上线（圣诞 11/15 死线），build + 测试绿 + 打印剥纸验证（折线正反面对齐）+ HowTo JSON-LD 过验证器
- 截图自检走本地 ASCII/终端路线（Read 本地 PNG 走云端代理 = 违纪）
