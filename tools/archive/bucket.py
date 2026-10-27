"""Phase: export every Bucket (structured data) table: schema + all rows."""
from common import *

LIMIT = 5000


def q(name, fields, offset):
    sel = ",".join("'%s'" % f for f in fields)
    query = f"bucket('{name}').select({sel}).orderBy('page_name','asc').limit({LIMIT}).offset({offset}).run()"
    r = get(API, params=dict(action="bucket", query=query, format="json", formatversion=2))
    r.raise_for_status()
    return r.json()


def main():
    clear_failures("bucket")
    pages = [p for p in read_jsonl(INV / "pages.jsonl") if p["ns"] == 9592]
    tables = []
    for p in pages:
        schema = json.loads((RES / p["path"]).read_text(encoding="utf-8"))
        name = p["dbkey"].lower()
        fields = ["page_name", "page_name_sub"] + [f for f in schema if f not in ("page_name", "page_name_sub")]
        rows, offset = [], 0
        while True:
            for _ in range(6):
                d = q(name, fields, offset)
                err = d.get("error")
                if err and err.startswith("Invalid field name: "):
                    fields.remove(err.split(": ", 1)[1].rstrip("."))
                    continue
                break
            if "error" in d:
                record_failure("bucket", name, d["error"])
                break
            chunk = d["bucket"]
            rows += chunk
            if len(chunk) < LIMIT:
                break
            offset += LIMIT
        write_json(RES / "data" / "bucket" / "schemas" / f"{name}.json", schema)
        write_jsonl(RES / "data" / "bucket" / "rows" / f"{name}.jsonl", rows)
        tables.append({"bucket": name, "schema_page": p["title"], "fields": fields, "row_count": len(rows),
                       "schema_path": f"data/bucket/schemas/{name}.json", "rows_path": f"data/bucket/rows/{name}.jsonl"})
        log(f"bucket {name}: {len(rows)} rows")
    write_json(INV / "bucket_tables.json", tables)
    log("bucket phase done")


if __name__ == "__main__":
    main()
