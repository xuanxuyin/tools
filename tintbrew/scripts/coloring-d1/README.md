# coloring_assets D1 payloads

`coloring_assets` 表的 210 条向量 payload（slug → ord/rings/data），从
`D:/tmp/coloring_out` 生成（ord = index.json 顺序 = 复杂度升序解锁顺序）。
分片每片 <900KB，共 12 片 10.2MB。

## 一次性上传（👤 侧，wrangler 可用环境）

```bash
# 0. 先建表（若无）：CF 控制台整段执行 functions/schema.sql
#    （含 ALTER TABLE authors ADD COLUMN coloring_slots，见 schema 尾部注释）

# 1. 上传 payload
for f in scripts/coloring-d1/0*.sql; do
  npx wrangler d1 execute tintbrew-gallery --remote --file "$f"
done

# 2. 验收
npx wrangler d1 execute tintbrew-gallery --remote --command \
  "SELECT COUNT(*) AS n, MIN(ord) AS minOrd, MAX(ord) AS maxOrd FROM coloring_assets"
# 预期：n=210, minOrd=0, maxOrd=209
```

## 重新生成（管线改动时）

先跑 `D:/tmp/coloring_pipeline.py`（产出 D:/tmp/coloring_out），再：

```bash
python scripts/coloring-d1/generate.py   # 重写本目录的 0xx.sql 分片
```
