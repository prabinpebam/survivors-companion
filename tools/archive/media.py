"""Phase: every file (current + old versions) with metadata, downloaded and SHA-1 verified."""
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import unquote, urlparse

from common import *

INFO = "timestamp|user|userid|comment|canonicaltitle|url|size|sha1|mime|mediatype|bitdepth|archivename"
PROGRESS = INV / "_media_progress.jsonl"


def list_files():
    rows = []
    for d in api_all(action="query", list="allimages", ailimit="max", aisort="name", aiprop=INFO):
        rows += d["query"]["allimages"]
    return rows


def with_history(rows):
    """Fetch full version history for files (batch by 50 titles)."""
    hist = {}
    for i in range(0, len(rows), 50):
        titles = "|".join("File:" + r["name"] for r in rows[i:i + 50])
        pages = query_pages_all(titles=titles, prop="imageinfo", iiprop=INFO, iilimit="max")
        for p in pages.values():
            hist[p["title"]] = p.get("imageinfo", [])
        if (i // 50) % 20 == 0:
            log(f"history {i}/{len(rows)}")
    return hist


def split_ext(name):
    if "." in name:
        b, e = name.rsplit(".", 1)
        return b, "." + e
    return name, ""


def main():
    INV.mkdir(parents=True, exist_ok=True)
    clear_failures("media")
    cache = INV / "_media_list.json"
    if cache.exists():
        files = read_json(cache)
    else:
        rows = list_files()
        log(f"{len(rows)} files listed")
        hist = with_history(rows)
        files = []
        for r in rows:
            h = hist.get("File:" + r["name"].replace("_", " "), None) or hist.get("File:" + r["name"], [])
            files.append({"name": r["name"], "title": r["title"], "versions": h or [r]})
        write_json(cache, files)
    files.sort(key=lambda f: f["name"])
    used = set()
    for f in files:
        base, ext = split_ext(f["name"])
        first = f["name"][0].upper()
        shard = first if first.isalnum() and first.isascii() else "_other"
        cand = f"media/files/{shard}/{safe_name(base)}{ext}"
        if cand.lower() in used:
            cand = f"media/files/{shard}/{safe_name(base)}~{hashlib.sha1(f['name'].encode()).hexdigest()[:8]}{ext}"
        used.add(cand.lower())
        f["path"] = cand
        cur = f["versions"][0]
        f["current"] = cur
        f["old_versions"] = []
        for v in f["versions"][1:]:
            an = v.get("archivename") or (v["timestamp"] + "!" + f["name"])
            vp = f"media/versions/{shard}/{safe_name(base)}/{an.replace(':', '').replace('!', '__')}"
            f["old_versions"].append({**v, "path": vp[:230]})
    jobs = []
    for f in files:
        jobs.append((f["name"], f["path"], f["current"]))
        for v in f["old_versions"]:
            jobs.append((f["name"] + "@" + v["timestamp"], v["path"], v))
    log(f"{len(files)} files, {len(jobs)} downloads (incl. old versions)")

    def fetch(job):
        key, path, v = job
        p = RES / path
        if p.exists() and p.stat().st_size == v["size"] and sha1_file(p) == v["sha1"]:
            return key, "cached"
        base_url = v["url"].split("?", 1)[0]
        cands = [base_url] + ([v["url"]] if base_url != v["url"] else []) + [base_url + "?vsarchive=orig"]
        last = "no candidates"
        for u in cands:
            r = get(u, stream=True)
            if r.status_code != 200:
                last = f"HTTP {r.status_code}"
                continue
            data = r.content
            if hashlib.sha1(data).hexdigest() != v["sha1"]:
                last = "sha1 mismatch"
                continue
            write_bytes(p, data)
            return key, "ok"
        return key, last

    n = 0
    with ThreadPoolExecutor(max_workers=4) as ex:
        futs = [ex.submit(fetch, j) for j in jobs]
        for fu in as_completed(futs):
            try:
                key, st = fu.result()
            except Exception as e:
                key, st = "?", repr(e)
            n += 1
            if st not in ("ok", "cached"):
                record_failure("media", key, st)
            if n % 250 == 0:
                log(f"media {n}/{len(jobs)}")

    out = []
    for f in files:
        c = f["current"]
        out.append({
            "name": f["name"], "title": f["title"], "path": f["path"], "url": c["url"], "sha1": c["sha1"],
            "size": c["size"], "width": c.get("width"), "height": c.get("height"), "mime": c.get("mime"),
            "mediatype": c.get("mediatype"), "bitdepth": c.get("bitdepth"), "uploader": c.get("user"),
            "upload_ts": c.get("timestamp"), "upload_comment": c.get("comment"),
            "old_versions": [{k: v.get(k) for k in ("timestamp", "user", "comment", "url", "sha1", "size", "width",
                                                    "height", "archivename", "path")} for v in f["old_versions"]],
        })
    write_jsonl(INV / "media.jsonl", out)
    log("media phase done")


import hashlib  # noqa: E402

if __name__ == "__main__":
    main()
