"""Verifies the Definition of Done (resources/DEFINITION_OF_DONE.md) and writes
inventory/manifest.sha256.jsonl + inventory/verification_report.json. Exit code 0 only if ALL PASS."""
import sys
from collections import Counter

from common import *

results = []


def check(cid, desc, ok, detail=""):
    results.append({"id": cid, "description": desc, "pass": bool(ok), "detail": detail})
    log(f"[{'PASS' if ok else 'FAIL'}] {cid} {desc} {detail}")


def live_count_pages():
    ns = [int(k) for k in api(action="query", meta="siteinfo", siprop="namespaces")["query"]["namespaces"] if int(k) >= 0]
    c = {}
    for n in ns:
        t = 0
        for d in api_all(action="query", list="allpages", apnamespace=n, aplimit="max"):
            t += len(d["query"]["allpages"])
        c[n] = t
    return c


def main(write_manifest=True):
    pages = read_jsonl(INV / "pages.jsonl")
    unavailable = {u["item"] for u in read_json(INV / "known_unavailable.json", [])}
    media = read_jsonl(INV / "media.jsonl")
    revs = read_jsonl(INV / "revisions.jsonl")

    # A1
    live = live_count_pages()
    idx = Counter(p["ns"] for p in pages)
    disk = Counter()
    bad_sha = []
    for p in pages:
        f = RES / p["path"]
        if f.exists():
            disk[p["ns"]] += 1
            if p.get("sha1") != sha1_file(f):
                bad_sha.append(p["title"])
    mism = {n: (live[n], idx.get(n, 0), disk.get(n, 0)) for n in live if not (live[n] == idx.get(n, 0) == disk.get(n, 0))}
    check("A1", "every page of every namespace saved (live == index == disk) with matching sha1",
          not mism and not bad_sha, f"total={sum(live.values())} mismatches={mism} badsha={bad_sha[:5]}")
    ondisk = len(list((RES / "pages").rglob("*.*")))
    check("A1b", "no stray files under pages/", ondisk == len(pages), f"disk={ondisk} index={len(pages)}")

    # A2 / A3
    total = 0
    for d in api_all(action="query", list="allimages", ailimit="max", aiprop="sha1"):
        total += len(d["query"]["allimages"])
    on_disk = sum(1 for m in media if (RES / m["path"]).exists())
    bad = [m["name"] for m in media if (RES / m["path"]).exists() and (RES / m["path"]).stat().st_size != m["size"]]
    check("A2", "every file downloaded (live count == records == disk), sizes match",
          total == len(media) == on_disk and not bad, f"live={total} records={len(media)} disk={on_disk} badsize={bad[:5]}")
    sha_bad = [m["name"] for m in media if sha1_file(RES / m["path"]) != m["sha1"]] if on_disk == len(media) else ["skipped"]
    check("A2b", "SHA-1 of every downloaded file equals wiki-reported SHA-1", not sha_bad, f"bad={sha_bad[:5]}")
    ov = [v for m in media for v in m["old_versions"]]
    ov_missing = [v["path"] for m in media for v in m["old_versions"]
                  if not (RES / v["path"]).exists() and f"{m['name']}@{v['timestamp']}" not in unavailable]
    check("A2c", "all old file versions downloaded", not ov_missing, f"old_versions={len(ov)} missing={ov_missing[:3]}")
    req = ("url", "sha1", "size", "mime", "uploader", "upload_ts", "path", "categories", "used_on")
    miss = [m["name"] for m in media if any(k not in m or m[k] in (None, "") for k in req if k not in ("categories", "used_on")) or "categories" not in m]
    check("A3", "every file has complete metadata", not miss, f"incomplete={miss[:5]}")

    # A4
    bt = read_json(INV / "bucket_tables.json", [])
    schema_pages = [p for p in pages if p["ns"] == 9592]
    ok4 = len(bt) == len(schema_pages) and bt
    for t in bt:
        rows = read_jsonl(RES / t["rows_path"])
        if len(rows) != t["row_count"]:
            ok4 = False
        r = get(API, params=dict(action="bucket", query=f"bucket('{t['bucket']}').select('page_name').limit(5000).run()",
                                 format="json", formatversion=2)).json()
        if len(r.get("bucket", [])) != t["row_count"]:
            ok4 = False
            log(f"bucket mismatch {t['bucket']} live={len(r.get('bucket', []))} saved={t['row_count']}")
    check("A4", "all Bucket tables exported with live row-count match", ok4,
          f"tables={len(bt)} rows={sum(t['row_count'] for t in bt)}")

    # A5
    must = {"Template": 10, "Module": 828, "MediaWiki": 8, "Bucket": 9592}
    check("A5", "templates, Lua modules, MediaWiki: pages and Bucket schemas present",
          all(idx[n] == live[n] and idx[n] > 0 for n in must.values()), {k: idx[v] for k, v in must.items()})

    # A6
    hidx = read_jsonl(INV / "html_index.jsonl")
    want = [p for p in pages if p["ns"] in (0, 4, 12, 14, 10000, 10002) and not p["redirect"]]
    hset = {h["pageid"]: h for h in hidx}
    hmiss = [p["title"] for p in want if p["pageid"] not in hset or not (RES / hset[p["pageid"]]["html_path"]).is_file()
             or (RES / hset[p["pageid"]]["html_path"]).stat().st_size == 0]
    check("A6", "rendered HTML saved for every non-redirect page in presentation namespaces", not hmiss,
          f"expected={len(want)} saved={len(hidx)} missing={hmiss[:5]}")

    # A7
    rev_ids = {r["revid"] for r in revs}
    rev_by_page = {}
    for r in revs:
        rev_by_page.setdefault(r["pageid"], set()).add(r["revid"])
    nolatest = [p["title"] for p in pages if p["revid"] not in rev_by_page.get(p["pageid"], ())]
    check("A7", "revision history captured; latest revision per page matches saved source",
          len(rev_ids) == len(revs) and not nolatest, f"revisions={len(revs)} pages_with_mismatch={nolatest[:5]}")

    # A8
    gfiles = ["categories", "category_members", "page_links", "template_usage", "file_usage", "redirects", "external_links"]
    sizes = {g: len(read_jsonl(RES / "graph" / f"{g}.jsonl")) for g in gfiles}
    live_cats = 0
    for d in api_all(action="query", list="allcategories", aclimit="max"):
        live_cats += len(d["query"]["allcategories"])
    red_live = sum(1 for p in pages if p["redirect"])
    rids = {r["from_pageid"] for r in read_jsonl(RES / "graph" / "redirects.jsonl")}
    unmapped = [p["title"] for p in pages if p["redirect"] and p["pageid"] not in rids]
    check("A8", "structural graph saved (categories count matches live; redirects match)",
          all(sizes[g] > 0 for g in gfiles) and sizes["categories"] == live_cats and not unmapped,
          f"{sizes} live_categories={live_cats} redirect_pages={red_live} redirects_without_target={len(unmapped)}")

    # A9
    site = ["siteinfo.json", "namespaces.json", "extensions.json", "interwiki.json", "magicwords.json", "statistics.json",
            "license.json", "robots.txt", "sitemaps/index.xml", "messages_customised.json"]
    smiss = [s for s in site if not (RES / "site" / s).is_file() or (RES / "site" / s).stat().st_size == 0]
    brand = list((RES / "site" / "branding").glob("*"))
    check("A9", "site-level configuration saved", not smiss and len(brand) >= 2, f"missing={smiss} branding={len(brand)}")

    # A10
    di = read_json(RES / "design" / "index.json", {})
    shots = [(RES / p["screenshot"]) for p in di.get("pages", [])]
    cssn = sum(1 for a in di.get("assets", []) if a["content_type"].startswith("text/css"))
    check("A10", "Playwright visual reference (desktop+mobile screenshots, HTML, CSS)",
          len(shots) >= 10 and all(s.is_file() and s.stat().st_size > 10000 for s in shots) and cssn >= 1,
          f"screenshots={len(shots)} css_assets={cssn}")

    # B
    inv_needed = ["pages.jsonl", "media.jsonl", "revisions.jsonl", "categories.json", "bucket_tables.json", "crossref.jsonl", "snapshot.json"]
    check("B1", "README present", (RES / "README.md").is_file())
    check("B2", "inventory files present", all((INV / f).is_file() for f in inv_needed), [f for f in inv_needed if not (INV / f).is_file()])
    paths = [p["path"].lower() for p in pages] + [m["path"].lower() for m in media] + [v["path"].lower() for m in media for v in m["old_versions"]]
    check("B3", "page/media path mapping collision-free (case-insensitive)", len(paths) == len(set(paths)), f"paths={len(paths)}")
    check("B4", "cross-reference covers every page", len(read_jsonl(INV / "crossref.jsonl")) == len(pages))

    # C2, C3, C5
    empty_ok = {t["rows_path"] for t in bt if t["row_count"] == 0}
    zero = [str(p.relative_to(RES)) for p in RES.rglob("*") if p.is_file() and p.stat().st_size == 0 and p.parent.name not in ("Module", "MediaWiki")
            and "pages" not in p.relative_to(RES).parts and p.relative_to(RES).as_posix() not in empty_ok]
    check("C2", "no zero-byte files outside pages/ (except Bucket tables that are empty on the live wiki)", not zero, zero[:5])
    fails = read_json(INV / "failures.json", [])
    unexplained = [x for x in fails if x["item"] not in unavailable]
    check("C3", "failure list empty (except documented server-side 404s in known_unavailable.json)", not unexplained,
          f"unexplained={unexplained[:5]} documented={len(fails) - len(unexplained)}")
    check("C4", "scraper code present", all((ROOT / "tools" / "archive" / f).is_file() for f in
                                           ["common.py", "site.py", "pages.py", "media.py", "bucket.py", "revisions.py", "graph.py", "render_html.py", "visual.py", "verify.py"]))
    stats = api(action="query", meta="siteinfo", siprop="statistics")["query"]["statistics"]
    check("C5", "reconciled with API statistics (pages, images)",
          abs(stats["images"] - len(media)) <= 2 and abs(stats["pages"] - len(pages)) <= 5,
          f"stats.pages={stats['pages']} saved={len(pages)} stats.images={stats['images']} saved={len(media)} stats.edits={stats['edits']} revisions_saved={len(revs)}")

    # D
    notice = RES / "LICENSE-NOTICE.md"
    txt = notice.read_text(encoding="utf-8") if notice.is_file() else ""
    check("D1", "license notice present", "CC BY-NC-SA 3.0" in txt and "poncle" in txt.lower())
    import common
    check("D2", "descriptive UA + throttle < 5 req/s", "VSWiki" in common.UA and common.MIN_INTERVAL >= 0.2)

    # C1 manifest
    if write_manifest:
        man = INV / "manifest.sha256.jsonl"
        rows = []
        for p in sorted(RES.rglob("*")):
            if p.is_file() and p.name not in ("manifest.sha256.jsonl", "verification_report.json") and not p.name.endswith(".part"):
                rows.append({"path": p.relative_to(RES).as_posix(), "bytes": p.stat().st_size, "sha256": sha256_file(p)})
        write_jsonl(man, rows)
        # re-verify from the written manifest
        bad = [r["path"] for r in read_jsonl(man) if not (RES / r["path"]).is_file() or sha256_file(RES / r["path"]) != r["sha256"]]
        check("C1", "manifest sha256 re-verified for every file", not bad, f"files={len(rows)} bad={bad[:5]}")

    ok = all(r["pass"] for r in results)
    write_json(INV / "verification_report.json", {"all_pass": ok, "checks": results})
    log("ALL PASS" if ok else "SOME CHECKS FAILED")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
