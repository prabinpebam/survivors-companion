"""Phase: full revision metadata for every page (for attribution) + contributor summary."""
from collections import Counter

from common import *


def main():
    out = INV / "revisions.jsonl"
    n = 0
    contrib = Counter()
    tmp = []
    for d in api_all(action="query", list="allrevisions", arvlimit="max", arvdir="newer",
                     arvprop="ids|timestamp|user|userid|comment|size|sha1|tags|flags|contentmodel"):
        for p in d["query"]["allrevisions"]:
            for r in p["revisions"]:
                tmp.append({"pageid": p["pageid"], "ns": p["ns"], "title": p["title"], "revid": r["revid"],
                            "parentid": r["parentid"], "ts": r["timestamp"], "user": r.get("user"),
                            "userid": r.get("userid"), "anon": bool(r.get("anon")), "minor": bool(r.get("minor")),
                            "comment": r.get("comment"), "size": r.get("size"), "sha1": r.get("sha1"),
                            "tags": r.get("tags", []), "contentmodel": r.get("contentmodel"),
                            "hidden": [k for k in ("userhidden", "commenthidden", "sha1hidden") if r.get(k)]})
                contrib[r.get("user") or "(hidden)"] += 1
                n += 1
        if (n // 500) % 20 == 0:
            log(f"revisions {n}")
    write_jsonl(out, tmp)
    write_json(INV / "contributors.json", [{"user": u, "edits": c} for u, c in contrib.most_common()])
    log(f"revisions phase done: {n} revisions, {len(contrib)} contributors")


if __name__ == "__main__":
    main()
