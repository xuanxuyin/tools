# B 组 GitHub PR 执行包（2026-11-03 备，👤 直接照抄）

> 目标：4 个 awesome-list repo 的 Color 区各提 1 个 PR → 4 条 dofollow 外链（DR90+ 域）。
> 纪律（§7-B 在案）：一 repo 一 PR 不催不@；被拒不缠；先读各 repo CONTRIBUTING（若有）按其格式。
> 前置核实（🤖 代理断线未完成，👤 提 PR 前在浏览器里花 1 分钟看一眼 README）：找到 Color/Colors 区 → 照该区现有条目的列表格式（一般是 `- [Name](url) - 描述`）→ 若该区按字母排序则按序插入。

## 通用条目行（4 个 repo 都用这句）

```markdown
- [TintBrew](https://tintbrew.com/) - Free color mixer (Oklab perceptual blending), HEX/RGB/HSL converter & printable color mixing charts
```

- 若 repo 要求句末加句号 → 结尾补 `.`；若条目格式是表格 → 按 table 列名填
- 链接必须带尾斜杠（与站内 URL 规范一致）

## PR 标题（英文，各 repo 通用）

```
Add TintBrew to Color tools
```

## PR 描述（英文，各 repo 通用，直接贴）

```markdown
Adds TintBrew (https://tintbrew.com/) to the Color section.

TintBrew is a free color tool:
- Color mixer using Oklab perceptual blending (shows the real mixed color, not naive RGB averaging)
- HEX / RGB / HSL converter
- Printable color mixing charts ("what colors make brown/purple/green/orange" answers with mixed swatches)
- Photo-to-bead-pattern converter

No account required, no ads interstitials, works in the browser.
```

> 最后一句 photo converter 视 repo 气质可删——纯 design-list 保留无妨，能多带一个差异点。

## Repo 清单与插入点

| # | Repo | 插入位置 | 备注 |
|---|---|---|---|
| 1 | [bradtraversy/design-resources](https://github.com/bradtraversy/design-resources) | README 的 **Color** 区（表内有此区，位于 Fonts 前后） | 老牌 repo，star 多，合并慢，最值得等 |
| 2 | [MohamedYoussouf/Design-Resources](https://github.com/MohamedYoussouf/Design-Resources) | README **Color Tools** 或同级区 | 活跃维护，合并快 |
| 3 | [F4dhil9ant3ng/awesome-design](https://github.com/F4dhil9ant3ng/awesome-design) | **Color Tools** 类目 | — |
| 4 | [GracieCreates/Design-Resources-for-Developers](https://github.com/GracieCreates/Design-Resources-for-Developers) | Color/Design tools 区 | — |

## 提 PR 步骤（GitHub 网页版，每 repo 约 2 分钟）

1. 打开 repo → 右上 **Fork** → Create fork
2. Fork 里打开 `README.md` → 铅笔图标编辑
3. 在 Color 区按现有条目格式贴入通用条目行（注意排序）
4. 提交：commit message 用 PR 标题那行（`Add TintBrew to Color tools`），选 **Propose changes**
5. 点 **Create Pull Request** → 标题/描述已预填，确认 base 是原 repo 的 main → Submit

## 记账

- 每 repo 提完在 TASKS.md B 组行勾掉并记 PR 链接
- 合并被拒都记一笔（被拒 = 该 repo 放弃，不缠）
- 11/17 SEMrush 对账（§7 生效判定：38 → 45+）
