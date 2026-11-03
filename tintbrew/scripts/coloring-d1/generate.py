"""Generate D1 insert SQL for coloring_assets from D:/tmp/coloring_out.
Order = payload ring count ascending (regions = player-perceived difficulty),
matching the COLORING_PIECES array in src/data/coloring.ts (same sort key:
rings asc, slug asc tie-break). rings = ring count from index.json.
Output: D:/tmp/coloring_sql/001.sql ... chunked <900KB per file.

D1 caps a single SQL statement at ~100KB, but 12 payloads run 100-118KB —
those are emitted as an INSERT (first slice) plus chained
`UPDATE ... SET data = data || '...'` statements, every statement <90KB.
"""
import json, os, io

OUT = 'D:/tmp/coloring_out'
DST = 'D:/tmp/coloring_sql'
os.makedirs(DST, exist_ok=True)
for f in os.listdir(DST):
    os.remove(os.path.join(DST, f))

idx = json.load(open(f'{OUT}/index.json', encoding='utf-8'))
idx.sort(key=lambda e: (e['rings'], e['slug']))  # regions asc = unlock order

def q(s):
    return "'" + s.replace("'", "''") + "'"

STMT_CAP = 90_000  # per-statement budget, well under D1's ~100KB cap

def longest_prefix(data, budget):
    """Longest data[:n] whose escaped literal fits `budget` chars."""
    lo, hi = 0, len(data)
    while lo < hi:
        mid = (lo + hi + 1) // 2
        if len(q(data[:mid])) <= budget:
            lo = mid
        else:
            hi = mid - 1
    return lo

chunk, size, n = [], 0, 0

def flush():
    global chunk, size, n
    if not chunk:
        return
    n += 1
    open(f'{DST}/{n:03d}.sql', 'w', encoding='utf-8', newline='\n').write(''.join(chunk))
    chunk, size = [], 0

def emit(stmt):
    global size
    if size + len(stmt) > 900_000 and chunk:
        flush()
    chunk.append(stmt)
    size += len(stmt)

for ord_, e in enumerate(idx):
    data = open(f"{OUT}/data/{e['slug']}.json", encoding='utf-8').read()
    payload = json.loads(data)
    assert len(payload['r']) == e['rings'], (e['slug'], len(payload['r']), e['rings'])
    head = (
        f"INSERT OR REPLACE INTO coloring_assets (slug, ord, rings, data) "
        f"VALUES ({q(e['slug'])}, {ord_}, {e['rings']}, "
    )
    cut = longest_prefix(data, STMT_CAP - len(head) - 4)  # -4: `);\n` + slack
    emit(f"{head}{q(data[:cut])});\n")
    rest = data[cut:]
    while rest:
        part_len = longest_prefix(rest, STMT_CAP - 80)
        part = rest[:part_len]
        rest = rest[part_len:]
        emit(
            f"UPDATE coloring_assets SET data = data || {q(part)} "
            f"WHERE slug = {q(e['slug'])};\n"
        )
flush()

total = sum(os.path.getsize(f'{DST}/{f}') for f in os.listdir(DST))
max_stmt = 0
for f in os.listdir(DST):
    for line in open(f'{DST}/{f}', encoding='utf-8'):
        if line.strip():
            max_stmt = max(max_stmt, len(line))
print(f'{len(idx)} rows -> {n} files, {total/1e6:.1f}MB total, max stmt {max_stmt/1024:.0f}KB')
