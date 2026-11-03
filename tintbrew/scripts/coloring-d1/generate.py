"""Generate D1 insert SQL for coloring_assets from D:/tmp/coloring_out.
ord = position in index.json (verts-asc complexity order), rings = ring count.
Output: D:/tmp/coloring_sql/001.sql ... chunked ~1MB each.
"""
import json, os, io

OUT = 'D:/tmp/coloring_out'
DST = 'D:/tmp/coloring_sql'
os.makedirs(DST, exist_ok=True)
for f in os.listdir(DST):
    os.remove(os.path.join(DST, f))

idx = json.load(open(f'{OUT}/index.json', encoding='utf-8'))

def q(s):
    return "'" + s.replace("'", "''") + "'"

chunk = []
size = 0
n = 0
for ord_, e in enumerate(idx):
    data = open(f"{OUT}/data/{e['slug']}.json", encoding='utf-8').read()
    # compact: index.json rings is authoritative; verify payload matches
    payload = json.loads(data)
    assert len(payload['r']) == e['rings'], (e['slug'], len(payload['r']), e['rings'])
    stmt = (
        f"INSERT OR REPLACE INTO coloring_assets (slug, ord, rings, data) "
        f"VALUES ({q(e['slug'])}, {ord_}, {e['rings']}, {q(data)});\n"
    )
    if size + len(stmt) > 900_000 and chunk:
        n += 1
        open(f'{DST}/{n:03d}.sql', 'w', encoding='utf-8', newline='\n').write(''.join(chunk))
        chunk, size = [], 0
    chunk.append(stmt)
    size += len(stmt)
if chunk:
    n += 1
    open(f'{DST}/{n:03d}.sql', 'w', encoding='utf-8', newline='\n').write(''.join(chunk))

total = sum(os.path.getsize(f'{DST}/{f}') for f in os.listdir(DST))
print(f'{len(idx)} rows -> {n} files, {total/1e6:.1f}MB total')
