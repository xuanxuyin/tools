# 图集拆图/打回工具调研 —— 不立项（负结论档）

> 2026-10-09 调研，同日 👤 裁决收口：「原位替换打回没什么难度，可能就是大站不做的原因，工具没意义了」。
> 存档目的：防重复调研。再想起图集工具时先读这页。

## 需求原型

一堆散图按原图集坐标替换后打回图集 / 图集+json 拆成散图替换后再打回，含压缩纹理格式解析。

## 结论：不做站（双重死）

1. **无壁垒**：原位打回 = 拆的逆操作（json 坐标已知 + canvas 贴回 + 旋转还原），头部在位者（ToolBuddy）已有全套解析器，补此功能是一两周的事——做站占词 = 替别人产品路线图探路
2. **需求薄**：真需要"打回原位"的人群（mod / 汉化组 / rip 重组）已在桌面工具闭环（UnityPy / UABE / AssetStudio / ASU 全免费开源）；在线工具主流用户"拿散图走人"不回流。需求小 × 无壁垒 = 大站不做是理性

## SERP 实勘【实勘 2026-10-09 DDG us-en，代理出口 AWS Oregon】

`sprite sheet unpacker` 前排：ASU 桌面开源（GitHub+itch.io 霸榜）｜ ezgif.com/sprite-cutter（图片大站）｜ spritesheet.tools（专站，标题直打 TexturePacker Alternative）｜ spritecutter.com ｜ hans5958.id 小工具 ｜ ToolBuddy 第 10 位。拆与打两个方向免费在位者密度均已饱和。

## 市面工具盘点（调研明细）

- **拆**：ToolBuddy（免费本地浏览器，JSON/PLIST/PAC/CSS/XML/ATLAS/YAML/Unity META 八种配置 + multipack/trim/旋转，25 语言 SEO 矩阵站）｜ Leshy SpriteSheet Tool（老牌）｜ TextureAtlas Toolbox（开源，create/extract/edit）
- **打**：CodeAndWeb free packer ｜ FreeTexPacker（开源）｜ Leshy ｜ itch.io Atlas Packer
- **原位替换打回**：无专门在线工具（空隙确认，但见上"双重死"判读）
- **Unity bundle 线**：UnityPy（可改 Texture2D 后 save 回 bundle）/ UABE / AssetStudio——桌面专属，在线做不了（需重建 bundle 二进制）

## 格式难度分级（复用知识，自用脚本时查）

- L0 PNG/JPEG/WebP + json/plist：trivial（H5/Cocos/Phaser/Pixi 图集 90% 此形态）
- L1 旋转/trim/multipack 还原：纯逻辑，测试量问题
- L2 .pvr.ccz/.gz + PVRTC/ETC/ASTC 解码：texture2ddecoder-wasm（ASTC+BC1-7+ETC+PVRTC 一站）、@arkntools/astc-decode（Rust WASM）、Khronos Basis WASM——全现成拼装
- L3 块压缩**重编码**：浏览器无现成编码 WASM（astcenc 理论可自编译，PVRTC 开源编码器差）——真墙，规避法 = 打回输出 PNG + 改引擎配置一行
- L4 Unity AssetBundle：在线不可行，桌面已占死

## 残值

h5-game-ripper 流水线的自用脚本（拆→替换→原位打回，PNG 系先行 + texture2ddecoder-wasm 解码预览）——需要时几天攒，工具项非站，不进任何批次。
