# 独立项目调研档 —— 宠物付费挂牌平台（listing-only 分类信息）

> 2026-09-10 立 · 用户定位原话：卖家付费发布售卖信息（拟按天收费）→ 平台只挂信息留卖家邮箱 → 买家私下联系、平台外成交 → 每条挂牌按品种关联饲养手册（如 Toy Poodle 挂牌 → 泰迪/玩具贵宾饲养手册按钮）
> **与宠物手册站（pet-care-site.md）是两个独立项目**；手册关联仅作为挂牌页的内容层链接，不合并项目
> 纪律：三样齐全（量 + KD + SERP 实勘）才立项；分工 = 用户 AITDK 拉量 / Claude SERP 实勘

## 一、合法性判定【实勘 2026-09-10】

- **平台本身合法**：只售广告位（挂牌费）不售动物、不碰交易 = Hoobly 同类形态，无需 USDA 执照（USDA 管的是卖动物的人）
- **卖家侧法律边界（写进 ToS 的依据）**：AWA 2013 retail pet store rule——**≥5 只繁殖母犬 + sight-unseen（含网络）销售 = 必须 USDA-APHIS 执照并接受检查**（dvm360 / AKC GR FAQ / APHIS Blue Book）；多数州禁售 8 周以下猫狗；跨州运输要健康证明；各州 puppy lemon law 管卖家责任
- **平台要做的事**：ToS 明确卖家合规责任 + 禁野保物种（Lacey Act/ESA/CITES）+ 举报/下架通道 + DMCA 代理；CDA §230 给第三方内容的托管方兜底
- 【假设】支付通道：挂牌费 = 广告服务类目，Stripe 等限制清单禁的是"卖活体"，广告位不受限——**接入支付前复核处理器条款**
- ⚠️ 诈骗暴露面：宠物诈骗是 FTC 常年重灾区，裸邮箱展示 = 经典诈骗/爬虫收割面 → 建议站内联系表单转发，保留"私下联系"本质

## 二、市场存在性【实勘 2026-09-10】

**卖家付费意愿真实存在，但集中在高价值品类**：
- Puppies.com：卖家会员费挂牌【实勘】
- Good Dog：免费入驻 + 成交抽 ~6.5% 服务费（Whelpify 对比文）【实勘】
- PuppySpot：marketplace 加价模式，繁育者只得约 50%（Reddit r/puppy101 控诉帖）【实勘】
- Whelpify：$29/月 平价订阅打 Good Dog【实勘】
- Hoobly：发帖免费 + 付费推广位（最贴近本站形态的免费对手）【实勘】
- MorphMarket（爬宠）/AquaBid（观赏鱼）：垂直付费挂牌先例【已知，待实勘定价】
- 【推断】$10 转送仓鼠的人永远不会付挂牌费 → 收得动钱的 ≈ 狗（$1,500-3,000/只）+ 高价值异宠

## 三、在位者地图【实勘 2026-09-10】

| 象限 | 在位者 | 对我们的含义 |
|---|---|---|
| 狗·付费挂牌（红海） | Good Dog（审查+抽佣）、Puppies.com（会员费）、PuppySpot（自营加价）、Greenfield/Lancaster（broker）、AKC Marketplace（免费限 AKC 繁育者） | 付费模式已被验证 = 市场真；但信任/流量强敌在位 |
| 通用分类（免费） | **Hoobly**（免费+推广位，最直接对标）、Craigslist（仅 rehoming）、FB Marketplace（禁售活体，实勘确认） | 免费占住"轻量直联"心智，收费必须给出差异化理由 |
| 公益转送 | Adopt-a-Pet Rehome、GetYourPet、Home To Home | 占住 rehoming 叙事，别碰 |
| 垂直 | MorphMarket（爬宠）、AquaBid（鱼）、backyardchickens 论坛、FaunaClassifieds | 证明垂直付费挂牌能成，各有存量信任 |

**竞争判读**【推断】：能收费的品类（狗）是红海，蓝海品类（小宠/鸡）收不起费。差异化只能来自：①品种手册内容层（用户的关联按钮想法 = 每条挂牌带唯一内容，SEO+买家价值+收费理由三合一，**这是对的**）②州级结构化目录 ③平价自助定位（打 Good Dog 审查门槛和抽佣）

## 四、可行性判定（2026-09-10）

1. **法律：✅ 可行**（listing-only 责任面窄，按 §一 配齐 ToS/审核）
2. **市场：✅ 存在**（买家侧词量大到用头词测；卖家付费有四个先例）
3. **两个模式参数建议修正**（不改本质只调参数）：
   - **"按天收费"→ 改"挂到售出一口价"（$5-15）或月订阅**：日费有支付摩擦（天天刷卡心理+手续费），行业无日费先例（flat/订阅/抽佣三种）
   - **冷启动期免收费招种子卖家**（如 30 个繁育者免 60 天），先证明买家联系量再开收费墙——零流量+收费 = 无供给
4. **技术形态变化**：不再是静态站——账户/挂牌 CRUD/支付/审核/过期任务 = CF Pages + Functions + D1/KV 可做，但按 4-8 周 app 开发 + 永久运营（审核/客服）预期
5. **风险**：诈骗治理（付费卖家用偷来的卡付挂牌费→拒付）、空站鬼城循环、Google 对 UGC 挂牌页收录慢（内容层=手册页是 SEO 引擎，挂牌页吃长尾）

## 五、待拉量词单（用户 AITDK，US/月，每行一词）

买家头部（只测池子大小，不打）：

```
puppies for sale
puppies for sale near me
dogs for sale
kittens for sale
cats for sale
```

品种长尾（核心买家词；注意"泰迪"美国叫 Toy Poodle）：

```
toy poodle puppies for sale
golden retriever puppies for sale
french bulldog puppies for sale
labrador puppies for sale
corgi puppies for sale
cavapoo puppies for sale
```

非狗猫物种（垂直付费可行性测试）：

```
chickens for sale near me
hatching eggs for sale
axolotl for sale
bearded dragon for sale
leopard gecko for sale
ball python for sale
betta fish for sale
rabbits for sale near me
guinea pigs for sale near me
cockatiel for sale
```

卖家意图（付费人群的获客词）：

```
where to sell puppies online
how to sell puppies online
where to list puppies for sale
best websites to sell puppies
hoobly alternatives
sites like craigslist to sell pets
```

信任/目录意图（Good Dog 护城河词）：

```
reputable breeders near me
dog breeders in texas
how to find a reputable breeder
```

## 六、下一步

- **用户**：AITDK 拉 §五 共 30 词 → 回填；重点看：狗品种长尾量、`hoobly alternatives` 类卖家词有没有量（= 不满在位者的缝隙信号）
- **Claude**：`puppies for sale` SERP 实勘（确认在位者形态）+ MorphMarket 定价实勘（垂直付费基准）
- 量回来后判：若狗品种长尾 + 卖家词有量 → 出 MVP 参数表（收费定价/品类切入口/审核流程）；若无量 → 此项目降级，资源回到手册站
