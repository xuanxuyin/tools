# coloring_assets D1 payloads

`coloring_assets` 表的 210 条向量 payload（slug → ord/rings/data），由分割器
`node scripts/coloring-seg/seg.mjs <outDir>` 产出（默认 `D:/tmp/coloring_out`，
ord = rings 升序 + slug 升序 = 难度递增的每日解锁顺序，与
`src/data/coloring.ts` 的 COLORING_PIECES 顺序必须一致）。
本机已 `wrangler login`（代理见下），直接执行即可。

## 一次性上传

```bash
# 0. 清库重建（DROP 全部画廊/涂色表后 CREATE，可在已有数据的库上重复执行）：
npx wrangler d1 execute tintbrew-gallery --remote --file scripts/coloring-d1/000-setup.sql

# 1. 上传 payload（000-setup 之外的分片数以目录为准——2026-11-06 二轮(封口+微区归并)后为 24 片，
#    每片 <900KB，合计约 20MB，约 10s/片；判错只看命令退出码，别 grep 报错文本——
#    wrangler 报错是大写 [ERROR]，小写 error|Error 匹配不到会假报 ok）：
for n in $(seq -w 1 24); do
  npx wrangler d1 execute tintbrew-gallery --remote --file "scripts/coloring-d1/0$n.sql" || exit 1
done

# 2. 验收
npx wrangler d1 execute tintbrew-gallery --remote --command \
  "SELECT COUNT(*) AS n, MIN(ord) AS minOrd, MAX(ord) AS maxOrd FROM coloring_assets"
# 预期：n=210, minOrd=0, maxOrd=209
```

代理：本机 wrangler 走 `HTTPS_PROXY=http://127.0.0.1:10808`（10808 为
HTTP+SOCKS 混合端口；10809 常不在监听，undici 也不认 socks5h://）。

## 重新生成（管线改动时）

```bash
node scripts/coloring-seg/seg.mjs D:/tmp/coloring_out          # 重新分割全部 210 张
node scripts/coloring-seg/gencat.mjs D:/tmp/coloring_out       # 重写 src/data/coloring.ts（顺序=难度）
node scripts/coloring-d1/generate.mjs D:/tmp/coloring_out      # 重写本目录的 0xx.sql 分片
```

注意：重跑后若 rings 有变，`src/data/coloring.ts` 也要按同一顺序重新生成
（解锁门槛 ord 对的是目录索引），并同步更新前端存档版本号（coloringPaint.ts
的 STORE_V）让旧 localStorage 存档作废。
