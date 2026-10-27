"""Phase: page index + latest source of every page in every namespace."""
import hashlib

from common import *

EXT = {"wikitext": ".wikitext", "Scribunto": ".lua", "css": ".css", "javascript": ".js", "json": ".json",
       "sanitized-css": ".css", "text": ".txt", "bucket": ".json"}
PROGRESS = INV / "_pages_progress.jsonl"


def ns_dir(ns, name):
    return "Main" if ns == 0 else name.replace(" ", "_")


def build_index():
    namespaces = api(action="query", meta="siteinfo", siprop="namespaces")["query"]["namespaces"]
    rows = []
    for nsid, info in sorted(namespaces.items(), key=lambda kv: int(kv[0])):
        nsid = int(nsid)
        if nsid < 0:
            continue
        for d in api_all(action="query", generator="allpages", gapnamespace=nsid, gaplimit="max",
                         prop="info", inprop="protection|displaytitle|varianttitles"):
            for p in d.get("query", {}).get("pages", []):
                rows.append({
                    "pageid": p["pageid"], "ns": p["ns"], "title": p["title"],
                    "contentmodel": p["contentmodel"], "lastrevid": p["lastrevid"], "length": p["length"],
                    "touched": p.get("touched"), "lang": p.get("pagelanguage"),
                    "redirect": bool(p.get("redirect")), "protection": p.get("protection", []),
                    "displaytitle": p.get("displaytitle"),
                })
        log(f"index ns {nsid} ({info['name'] or 'Main'}): total so far {len(rows)}")
    rows.sort(key=lambda r: (r["ns"], r["pageid"]))
    nsname = {int(k): v["name"] for k, v in namespaces.items()}
    for r in rows:
        prefix = nsname[r["ns"]] + ":"
        r["dbkey"] = (r["title"][len(prefix):] if r["ns"] != 0 else r["title"]).replace(" ", "_")
    paths = {}
    used = set()
    for r in rows:
        d = ns_dir(r["ns"], nsname[r["ns"]])
        ext = EXT.get(r["contentmodel"], ".txt")
        cand = f"pages/{d}/{safe_name(r['dbkey'])}{ext}"
        if cand.lower() in used:
            cand = f"pages/{d}/{safe_name(r['dbkey'])}~{r['pageid']}{ext}"
        used.add(cand.lower())
        r["path"] = cand
    return rows


def main():
    INV.mkdir(parents=True, exist_ok=True)
    clear_failures("pages")
    rows = build_index()
    write_jsonl(INV / "_pages_index.jsonl", rows)
    done = {}
    for r in read_jsonl(PROGRESS):
        done[r["pageid"]] = r
    todo = [r for r in rows if not (done.get(r["pageid"], {}).get("revid") == r["lastrevid"] and (RES / r["path"]).exists())]
    log(f"{len(rows)} pages, {len(todo)} to fetch")
    byid = {r["pageid"]: r for r in rows}
    with open(PROGRESS, "a", encoding="utf-8") as prog:
        for i in range(0, len(todo), 50):
            batch = todo[i:i + 50]
            d = api(action="query", prop="revisions", pageids="|".join(str(b["pageid"]) for b in batch),
                    rvprop="ids|timestamp|user|userid|comment|size|sha1|contentmodel|tags|content", rvslots="main")
            got = set()
            for p in d["query"]["pages"]:
                if "revisions" not in p:
                    record_failure("pages", p.get("title", p.get("pageid")), "no revisions returned")
                    continue
                rev = p["revisions"][0]
                slot = rev["slots"]["main"]
                r = byid[p["pageid"]]
                if slot.get("texthidden") or "content" not in slot:
                    record_failure("pages", r["title"], "content hidden/missing")
                    continue
                data = slot["content"].encode("utf-8")
                sha1 = hashlib.sha1(data).hexdigest()
                if slot.get("sha1") and slot["sha1"] != sha1:
                    record_failure("pages", r["title"], f"sha1 mismatch {slot['sha1']} vs {sha1}")
                write_bytes(RES / r["path"], data)
                got.add(p["pageid"])
                prog.write(json.dumps({"pageid": p["pageid"], "revid": rev["revid"], "sha1": sha1,
                                       "timestamp": rev["timestamp"], "user": rev.get("user"),
                                       "comment": rev.get("comment"), "tags": rev.get("tags", []),
                                       "slot_sha1": slot.get("sha1"), "bytes": len(data)}) + "\n")
            prog.flush()
            if (i // 50) % 20 == 0:
                log(f"pages fetched {i + len(batch)}/{len(todo)}")
    # final inventory
    prog_rows = {}
    for r in read_jsonl(PROGRESS):
        prog_rows[r["pageid"]] = r
    out = []
    for r in rows:
        pr = prog_rows.get(r["pageid"])
        if pr:
            r = {**r, "revid": pr["revid"], "sha1": pr["sha1"], "last_edit_ts": pr["timestamp"],
                 "last_editor": pr["user"], "last_comment": pr["comment"], "bytes": pr["bytes"]}
        out.append(r)
    write_jsonl(INV / "pages.jsonl", out)
    log(f"pages phase done: {len(prog_rows)}/{len(rows)}")


if __name__ == "__main__":
    main()
