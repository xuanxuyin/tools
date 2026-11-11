# PRODUCT — 产品需求定义 v1（👤 已确认 2026-11-07）

> fortune-draw 项目核心需求。👤 三项拍板已落；本文是 PLAN 的需求地基，改需求先改这里。

## 站点定位

美国市场英文站：**问事/决定 玩具工具站**（道具家族），核心差异化 = 中式解签玩法的英文本土化——所有在位者都只有"随机出结果"一层，我们给**签文式三层解读**。

## 两大原生工具（👤 需求核心，两个独立页面）

### 1. Fortune Stick（抽签筒）

- 玩法：默念问题 → 摇签筒（动效）→ 抽出一支签（100 支签库随机）
- 输出：全息解签（见下）+ 本签链接可分享
- 对位词群：fortune stick / fortune teller / daily fortune 系（词待 PLAN 批次拉数）

### 2. Number Oracle（三数字解读）👤 原创机制

- 玩法：问事 → 随机掷出 **0-9 三个数字**（000-999）→ **数字定签**：三位数查表对应 100 支签中的一支（默认映射：前两位 = 签号 00-99，映射细则 PLAN 定）→ 出该签全息解签
- **三个数字本身兼作 lucky numbers**（数字就是签的入口，也是签的产物）
- 输出结构与 Fortune Stick 完全一致（同一签库同一渲染）
- 对位词群：number oracle / pick 3 lucky numbers / 3 number reading 系（⚠️ 不用裸 "Pick 3"——美国彩票玩法名，意图人群不同；lottery lucky numbers 可做兼容功能不当主词）

两工具共享同一套 100 支英文签库 = 内容一次建设、两处分发。

## 解签输出结构（全息版，👤 拍板）

每支签固定六件套：

1. **签文一句**（吉语——由签诗神韵意译，blessing / nudge / gentle warning 三级，**无凶签无 doom 语气**）
2. **整体解读**一段（这支签在说什么）
3. **love 断语**一条（场景断语，对位黄大仙"仙机"分类断语）
4. **money 断语**一条
5. **career 断语**一条
6. **行动建议**一条（可执行的一步）+ **3 个幸运数字**

场景断语是变体页弹药：love/money/career 三场景 × 签库 = 问题级变体页的取材面（组织按"用户的问题"不按签号，对齐 PLAYBOOK 反 tarostarot 78 牌矩阵教训）。

## 签库改编规格（升级 README 改编层计划）

- 源料：三套 100 签（观音/关帝/黄大仙，见 [README.md](./README.md)），取并集挑吉向签 → **目标 100 支主力签**（保 100 整数：Number Oracle 映射需要 00-99 满编）
- 每支字段：slug / 签号 / 吉语 / 整体解读 / love / money / career / 行动建议 / 典故名一行美国化场景（如"钟离成道"→ "the general who became immortal"）/ 三级吉凶标记
- **100 支 × 9 字段 ≈ 900 条手写英文** = 本站真资产（集群 9/10 不敢报库容，我们直接报 "100 handwritten fortunes"）

## 道具家族其余成员（SEO 量主力，PLAYBOOK 攻击序）

8-ball / yes-or-no coin flip / yes-no button / wheel / picker / yes-no oracle / fortune cookie / daily fortune（日签，按日期种子 SSR 预渲染）——全部工具页走仓库 SEO 纪律（SSR-shell + WebApplication + FAQPage + 长文包工具）。

## 改编示例（锁定调性，2026-11-07 👤 问"解答是否美国文化场景"时定稿）

**源料 → 成品的转换示范**：黄大仙第 1 签（上上，姜公封相）——

- **吉语**（blessing 级）："Your moment is assembling. What you've been quietly sharpening is about to be noticed."
- **典故一行**："the strategist who fished by the river into his 80s — then built a dynasty"
- **整体解读**：long preparation meeting its moment；签诗"龙虎风云际会时"的神韵意译
- **love**："Stop rehearsing and start showing up. The notice you wanted is closer than it looks."（源：仙机"婚姻同"）
- **money**："An opportunity that felt out of reach is entering range. Name the number, send the application."（源：仙机"求财丰"）
- **career**："The person who's been quietly excellent gets tapped this cycle. Make your work visible this week."（源：仙机"功名遂"）
- **行动建议**："Pick the one thing you've perfected in private and show it to one person who matters — this week."

**字段取舍规则（机械执行）**：
- 场景映射：功名→career ／ 求财→money ／ 婚姻→love ／ 行人至→"the reply finally arrives" ／ 谋望→overall
- **整类丢弃**：六畜/蚕（养殖业断语无美国对应）、问风水/问天时/问六甲（孕期断语风险区）
- 挑签标准：典故主题普世优先（等待/坚持/贵人/转机/踏实/谨慎），下下与中下大半弃用（无凶签），300 → 100 支满编（Number Oracle 映射需要 00-99）
- **调性红线**：不出现 temple/deity/Taoist 词汇；典故只留"人的故事"；语气 = 直接、第二人称、可执行（美式直接风格，禁翻译腔）

## 流程规范 v1.2（2026-11-07 晚 👤 反馈："先把问题放在心里→抽签/掷数→动画同时亮签号签名→三选一或自提一问（只能选一样）→按选择给答案"）

**签库类工具（Fortune Stick / Number Oracle）改为聚焦式四步**：

1. **默念**：问题先放在心里，不出现输入框——签不该提前知道问题（文案引导"Hold your question in mind"）
2. **占**：摇签/掷数动效，**签号+签名与动画同时亮出**（命中签跳起时签身上挂号码徽章 + 结果区顶部出签名横幅，此时不出判词）
3. **点题**：抽完后出选择面板——**财运/感情/事业三选一，或自己写一个问题，互斥只能选一样**（点 chip 清空输入框，打字取消 chip 高亮）
4. **答**：按选择只出那一面——选财运出财运断语、选感情出感情断语；**自提问题先过意图路由**（`lib/classify.ts`，感情 > 事业 > 财运 关键词匹配，中英双语；如"买彩票吗"→财运断语、"该跳槽吗"→事业断语），命中就出对应面断语，都不沾边才回显"你的问题"（转义防注入）+ 整体签文——对位真实解签"签通用、按你的事套那一面"；统一附行动建议+幸运数字。答后 chip 仍可点击换镜头看同一支签的其他两面（路由是启发式 v1，歧义句如"work I love"可能偏判，chip 兜底）

**是非类工具（8-ball / coin flip / yes-no）维持 v1.1 问→占→答**（打字问题在前——答案直接对着那个问题的是/否）。**例外不变**：daily fortune（共享日签无问题层）；fortune cookie（原生玩法免问题）。i-ching/tarot 建页时按各自 method 文档，沿用"默念→占→解"骨架（塔罗三张阵的阵型问法在抽前选，属玩法选择不属问题层）。

## 新工具候选 v1.1（2026-11-07 晚 👤 提供玩法；挂载与首版范围已拍板）

- **三数起卦（梅花易数）**：A mod 8 定上卦 / B mod 8 定下卦 / C mod 6 定动爻（余 0→8/6），查六十四卦表 → 本卦现状 + 动爻爻辞 + 变卦走向 + 行动建议四层输出。完整规格见 [iching-method.md](./iching-method.md)。**👤 拍板：独立新工具 /i-ching/**——Number Oracle 保留原创数字定签玩法喂签库，起卦单独吃 i ching 词臂
- **塔罗**：78 张结构（22 大阿卡纳 + 4 花色×14），洗→切→抽→解四步动效，v1 做 单张 + 三张牌阵（majors-only 44 条解读起步），凯尔特十字 v2。完整规格见 [tarot-method.md](./tarot-method.md)。**👤 拍板：进首版**。⚠️ tarot/i-ching 头词是真实战场（非化石集群），头词不打打长尾；词臂量/KD 待 👤 拉 AITDK（词表见两份文档）
- 两者都过调性红线检查（美国主流文化概念，无商标/版权风险；牌义卦辞全部手写）
- **首版三术齐全**：签（100 支）+ 卦（64 条 v1）+ 牌（44 条 majors）≈ 208 条手写内容资产

## 待 PLAN 定的细节

- 数字→签号映射细则（前两位定签 vs mod 100；第三位的语义）
- 100 支签是否出 /sign-47/ 独立内容页（有 tarot card-meanings 先例，但警惕"牌视角"反模式——按问题组织优先）
- 日签页 URL 结构（/fortune-of-the-day/2026-11-07/ 日期滚动 or 单页滚动更新）
- 域名（不含 Mattel 商标字样）与站名
