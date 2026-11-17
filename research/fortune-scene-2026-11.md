# 寺庙实景抽签（hall3d）设计与实现存档 — 2026-11-17

灵感来源：sansatemple.com（산사，韩国爆火虚拟寺庙，一周百万访客）。拆解：Three.js + 风格化 GLB + **照片 360° 环境光 IBL** + PBR 三件套贴图 = "实景感"配方；多人在线（不抄，用计数替代）；无登录无聊天纯情绪价值。参考资产存档 `research/sansa-ref/`（jsDelivr 可再下，未入库）。

## 配方（hall3d.ts，全部程序化、零外部资产）

- **场景**：indigo 雾（FogExp2 0x241f3d）+ 门洞暖光点 + 石阶（坡向：门侧高起步侧低，曾反向成凹陷已修）+ 山门（叠檐顶/匾额/灯笼）+ 法堂（寺墙泥色前墙+红门楣+石门槛、红棂窗自发光、金边大匾、院墙+瓦帽+两翼墙）+ 供案（青铜三足香炉+烛台+签筒 0.7 缩放）+ 挂轴（远山淡墨+柳枝 canvas 贴图）+ 光柱尘埃/柳叶粒子。
- **`buildRoof(w,d)`**：三层叠涩瓦面+朱红檐板+正脊金宝顶+四角翘檐——山门/大殿同一配方，程序化最像中式殿顶的解。
- **镜头**：三段动线（石阶仰望→穿山门→**院中望门**终局机位）+ 视差；`focusAltar()/unfocusAltar()` 摇签/敬香时推近供桌特写。竖窗/横窗自适应（fov 50 竖窗水平仅 ~38°，机位要退）。
- **`buildJar()` 重构**：jar3d.ts 抽出 JarRig（pivot/api/update/drag 钩子/dispose），createJar3D 变薄壳——三页 + 场景共用同一签筒动画。**重构后对外接口零变化**。

## 上香进场景（👤 11/17 "把上香做到场景里"）

- DOM 香炉组件（incenseUi/mountIncense）在 fs 页下线（模块保留，onChange 钩子仍在）；fs 页左下角 incense-strip 状态条直接驱动 incense.ts 原语（领香→点香→敬香→燃尽，每日三支/30min 燃尽规则不变）。
- 场景青铜香炉 `setIncense(ratios)`：三支香随 burnRatio 燃短+燃点自亮+青烟 ×4 精灵；敬香瞬间 focusAltar 推近 4.5s。
- **踩坑**：燃尽/燃烧中无按钮态只剩 12px 小字 → 用户以为流程没了；已升为描边徽章（.has-no-action）。无按钮态也要一眼可见。

## 匾额双语

`createHall(host, { quick?, plaques?: {gate,hall} })`：makePlaqueTexture 漆木底+双金边；CJK 逐字等距（Noto Serif SC/SimSun），拉丁文整排+量宽缩字号（Georgia）。en 页：WILLOW TEMPLE / ANSWERS WITHIN；zh：柳寺 / 有求必应。`/hall?lang=en` 评审钩子。

## 铺开范围

- fortune-stick：全宽法堂 hero（clamp(380px,50vw,540px)）+ 上香状态条，摇签流零破坏
- index：hero 右栏法堂窗（min(460px,100%) × 5/4，英文匾），draw-duo 小签筒保留
- guanyin-lingqian：stage-visual 换 560×16/10 法堂窗（中文匾），摇签流零破坏
- hall.astro：全页沉浸版（noindex），`?snap=steps|gate|draw`、`?lang=en` 评审钩子

## 工程经验

- 无头 Chrome 截帧：虚拟时钟下 journey 实耗≈5×budget；冻结帧（seek）用小 budget 提速；SwiftShader 一帧 2-5 分钟，**构建与截图勿并发**（dist 清空重建会撞 404）
- 静态服必须给 .js 正确 MIME，ES module 才不静默拒载（python http.server 需自定义 extensions_map）
- jar3d 大场景化后签杆总高 ~3.6m（0.7 缩放后 ~2.5m），终局机位距离 ≥3.5m 防裁头
- 逐文件验收帧存 `research/fortune-scene-mockups/`（m1→m6 迭代史，未入库）

## 待打磨

- 石阶帧台阶仍不入画（灯笼已挪中段，下一步 P0 机位再压/台阶加灯池）
- 香炉烟与 30min 燃尽的同步粒度是 5s tick；近景柳叶尺寸
- GLB 化资产升级（Blender 殿宇/山门，Draco+KTX2 <2MB）+ CC0 360 环境图 IBL——往 Sansa 配方靠
- 首页 draw-duo 小签筒仍是独立画布（是否统一进场景待定）
