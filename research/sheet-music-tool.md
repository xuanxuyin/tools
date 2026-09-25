# 谱纸生成器 + 作曲工具岛 立项调研档

> 2026-09-25 建 · 由 👤 提案触发:「提供五线谱和音符,让用户自己谱曲,选择不同乐器播放,觉得可以就下载/打印出来」(交互流程后补定:拖音符上谱 → 选乐器试听 → 打印成品)
> 状态:**已终局(9/25 当日闭环)—— 谱纸打印族立项成立进 chartglade 11 月批;作曲工具随车做工具岛,不押 SEO 词**(§六/§七 + chartglade PLAN §2/§3)
> 纪律提醒:本档只管调研与判定;排期与开工按 PLAN 批次日历走

## 一、产品形态(👤 原意 → 站内语言)

用户想要 = **谱曲工作流**:谱面(五线谱)→ 放音符(拖动)→ 选乐器试听 → 满意就打印。技术对应:

- **谱面渲染** = SVG 五线谱(五线+谱号+小节线),站内打印机器直系子孙(.printable 体系)
- **音符交互** = 拖放/点击摆音符 + 时值选择(全/二分/四分/八分 + 休止符)——tintbrew 涂色画布同级 island
- **乐器播放** = Web Audio **程序合成音色**(钢琴=正弦+衰减包络 / 吉他=Karplus-Strong 拨弦 / 长笛=正弦+颤音 / 音乐盒=高频 ping)——零音频文件、零版权风险,纯前端
- **下载/打印** = ① 谱面 PDF 打印(现役 .printable)② WAV 音频导出(OfflineAudioContext 离线渲染,无需编码器)③ 顺手 MIDI 文件导出(手写文件格式)

## 二、SERP 实勘(2026-09-25,US 区,Claude 探针)

| 查询 | 前 5~7 实况 | 判定 |
|---|---|---|
| blank sheet music printable PDF | ①**Pinterest**(#1)②Scribd(旧 PDF)③大学网站镜像页 ④Etsy(付费包)⑤blanksheetmusic.net(上古生成器) | **软**:Pinterest 头名 + 老小站,无教育巨头(K5/Twinkl 本部缺席),DR0 可进形状 |
| blank sheet music | ①Amazon(买纸书)②**Pinterest**(免费 PDF 集合)③Etsy(付费) | **软**:KD33 构成 = 商务页混排(Amazon/Etsy),免费打印槽位全小站;打法 = title 带 PDF/printable 打信息面,不碰买书意图 |
| staff paper(经 free printable 变体) | ①blanksheetmusic.net(上古自定义生成器)②8notes ③Iowa 大学工作室页 ④小乐器行博客 ⑤Facebook 群帖 | **软 + 形态实锤**:KD38 确认惯性虚标(cursive KD41 先例);**排第一的是生成器形态 = 工具站在此 SERP 是被证明的赢家** |
| music composition worksheet elementary | ①TPT(付费市场)②Bright Sprout(小站)③Pinterest ④Twinkl(.com.eg/.co.za 区域变体 = 美国本部没锁)⑤Etsy | **软**:免费打印意图无巨头接,教师人群正对 |
| song maker / compose online for kids | ①**Chrome Music Lab Song Maker(Google 官方)**②Soundtrap ③MTNA 目录 | **硬**:Google 免费官方工具锁死在线作曲头词,正面不可打 |

## 三、竞争面与切入点(本案关键判断)

1. **在线作曲头词死**:Chrome Music Lab Song Maker = 免费无账号、格子放音符、多乐器、可录音——与 👤 描述的交互几乎一致,Google 官方 DR 顶格;Soundtrap 占高年级段。`compose music online` 480/KD77/商务意图,三杀弃。
2. **但 Song Maker 有结构性缺口**:格子界面,**不能输出真五线谱、不能打印谱面**;MuseScore/Flat/Noteflight 专业制谱对小孩/课堂又太重。「放音符 → 试听 → **打印出一张真五线谱**」完整闭环无人在位。
3. **空白谱纸供给停在上古时代**:blanksheetmusic.net 排第一但体验是 2000 年代水平(无现代预览/移动端);Pinterest/Etsy/Scribd = 静态 PDF 无自定义。**现代生成器(选谱号/行数/行距 → 实时预览 → 打印)= 升级位实锤**。
4. **IP 零风险**:音色程序合成、谱面自渲染;示例曲只用公有领域(Twinkle Twinkle / Ode to Joy 贝多芬)。

## 四、落位与形态拆分(SEO 与工具各归各位)

| 件 | 吃什么 | 形态 | 排期 |
|---|---|---|---|
| `/blank-sheet-music/` | blank sheet music **6.6K** + manuscript 320 + printable 210 + treble clef 110 长尾 | **谱纸生成器**:选谱号(高音/低音/大谱表)、每页行数、行距 → 实时 SVG 预览 → 打印 PDF;FAQ 吸收变体词 | 11 月批 |
| `/staff-paper/` | staff paper **5.4K** | 同引擎第二前门,变体角度(piano grand staff / 小孩宽行版) | 11 月批(同批) |
| **作曲工具岛**(👤 原始提案完整保留) | 无词押注 | 挂谱纸页内的升级动作:「空白谱纸 → 直接在谱上作曲,选乐器试听,打印成品谱 + WAV」——AI 免疫交互 + Pinterest pin 素材 + 停留时长 | 11 月批(随车,若工作量超预期可拆 12 月) |

> 落位 chartglade 而非 tintbrew:搜索者 = 音乐老师/家长/学琴家庭 = 教学打印件人群 ✅ 打印动作同场景 ✅ .printable 机器现成 ✅。聚焦定性沿「课堂/家庭教学打印件」不外扩(音乐属教学科目,护栏三问①②③全过)。

## 五、AITDK 拉量清单(9/25 👤 已拉,US/月 + KD)

12 词全量实测,见 §六表。

## 六、AITDK 实测与终局(2026-09-25,👤 拉)

| 词 | 量 | KD | 去向 |
|---|---|---|---|
| blank sheet music | **6,600** | 33 | ✅ 主页面头词(单词过线) |
| staff paper | **5,400** | 38 | ✅ 独立页(实勘翻案:SERP 全老小站,KD 惯性虚标) |
| how to read music notes | 2,900 | 35 | ❌ 弃:SERP = 教学长文/视频课群,打印形态错配(漂题);记观察池 |
| sheet music maker | 6,600 | **61** | ❌ 弃:KD 越 26 点 + maker 意图 = Noteflight/Flat/MuseScore 工具场 |
| compose music online | 480 | **77** | ❌ 三杀(量差 4% + KD 翻倍 + 商务意图):反向验证「不碰在线作曲头词」 |
| music manuscript paper | 320 | 17 | 页内吸收(blank-sheet-music 页 FAQ/变体段) |
| blank staff paper printable | 210 | 17 | 页内吸收 |
| music notes for kids | 170 | 30 | 页内吸收或 FAQ |
| treble clef staff paper | 110 | 13 | 页内吸收(生成器谱号选项即内容) |
| write your own song | 90 | 18 | 工具岛措辞吸收 |
| songwriting for kids | 40 | 7 | 工具岛措辞吸收 |
| music composition for kids | 0 | 不可用 | ❌ 死档 |

**终局判定**:打印谱纸族合计 **≈12,640/月**(blank sheet music + staff paper + 3 长尾)过 ≥10K 族线;两头词一个单词过线、一个实勘翻案 → **立项成立**。CPC $0.63~0.94 一般,价值在词池扩容(527K→540K)+ 工具形态卡位,变现预期不拉高。作曲工具岛 = 👤 原始提案,零 SEO 负担随车落地。**排 11 月批**(10/25 批已满:感恩节 5 页 + 公式表 2 页 + 数学 island + PDF 升格,死线不动)。
