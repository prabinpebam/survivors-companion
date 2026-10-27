"""Phase: structural graph (categories, links, templates, files, redirects, external links) + cross-reference."""
from collections import defaultdict

from common import *

G = RES / "graph"


def pairs(label, **params):
    rows = []
    for d in api_all(action="query", **params):
        rows += d["query"][label]
    return rows


def main():
    clear_failures("graph")
    pages = read_jsonl(INV / "pages.jsonl")
    byid = {p["pageid"]: p for p in pages}
    namespaces = [int(k) for k in api(action="query", meta="siteinfo", siprop="namespaces")["query"]["namespaces"] if int(k) >= 0]

    # categories
    cats = pairs("allcategories", list="allcategories", aclimit="max", acprop="size|hidden")
    write_jsonl(G / "categories.jsonl", cats)
    members = []
    for i, c in enumerate(cats):
        title = "Category:" + c["category"]
        for d in api_all(action="query", list="categorymembers", cmtitle=title, cmlimit="max",
                         cmprop="ids|title|type|sortkeyprefix|timestamp"):
            for m in d["query"]["categorymembers"]:
                members.append({"category": c["category"], "pageid": m["pageid"], "ns": m["ns"], "title": m["title"],
                                "type": m["type"], "sortkeyprefix": m.get("sortkeyprefix"), "added": m.get("timestamp")})
        if i % 50 == 0:
            log(f"category members {i}/{len(cats)}")
    write_jsonl(G / "category_members.jsonl", members)

    def per_ns(label, listname, prefix, extra, outname, keys):
        rows = []
        for ns in namespaces:
            args = {"list": listname, f"{prefix}limit": "max", f"{prefix}namespace": ns, **extra}
            for r in pairs(label, **args):
                rows.append({"from_pageid": r.get("fromid"), "to_ns": r["ns"], "to_title": r["title"],
                             **{k: r[k] for k in keys if k in r}})
            log(f"{outname} ns{ns}: {len(rows)}")
        write_jsonl(G / f"{outname}.jsonl", rows)
        return rows

    links = per_ns("alllinks", "alllinks", "al", {"alprop": "ids|title"}, "page_links", [])
    trans = per_ns("alltransclusions", "alltransclusions", "at", {"atprop": "ids|title"}, "template_usage", [])
    files = []
    for r in pairs("allfileusages", list="allfileusages", aflimit="max", afprop="ids|title"):
        files.append({"from_pageid": r["fromid"], "to_ns": r["ns"], "to_title": r["title"]})
    write_jsonl(G / "file_usage.jsonl", files)
    reds = []
    for ns in namespaces:
        for r in pairs("allredirects", list="allredirects", arlimit="max", arnamespace=ns,
                       arprop="ids|title|fragment|interwiki"):
            reds.append({"from_pageid": r["fromid"], "to_ns": r["ns"], "to_title": r["title"],
                         "fragment": r.get("fragment"), "interwiki": r.get("interwiki")})
    write_jsonl(G / "redirects.jsonl", reds)
    # redirects to special pages are not listed by allredirects; resolve them directly
    have = {r["from_pageid"] for r in reds}
    missing = [p for p in pages if p["redirect"] and p["pageid"] not in have]
    for i in range(0, len(missing), 50):
        batch = missing[i:i + 50]
        d = api(action="query", titles="|".join(p["title"] for p in batch), redirects="1")
        to = {r["from"]: r for r in d["query"].get("redirects", [])}
        for p in batch:
            r = to.get(p["title"])
            if r is None:
                record_failure("graph", p["title"], "redirect target unresolved")
                continue
            reds.append({"from_pageid": p["pageid"], "to_ns": -1 if r["to"].startswith("Special:") else None,
                         "to_title": r["to"], "fragment": r.get("tofragment"), "interwiki": r.get("tointerwiki")})
    write_jsonl(G / "redirects.jsonl", reds)
    ext = []
    for d in api_all(action="query", list="exturlusage", eulimit="max", euprop="ids|title|url", euprotocol="https"):
        ext += [{"pageid": r["pageid"], "ns": r["ns"], "title": r["title"], "url": r["url"]} for r in d["query"]["exturlusage"]]
    for d in api_all(action="query", list="exturlusage", eulimit="max", euprop="ids|title|url", euprotocol="http"):
        ext += [{"pageid": r["pageid"], "ns": r["ns"], "title": r["title"], "url": r["url"]} for r in d["query"]["exturlusage"]]
    write_jsonl(G / "external_links.jsonl", ext)
    log(f"graph raw: links={len(links)} templates={len(trans)} files={len(files)} redirects={len(reds)} ext={len(ext)} members={len(members)}")

    # cross-reference per page
    x = defaultdict(lambda: {"categories": [], "templates": [], "modules": [], "files": [], "redirect_to": None})
    for m in members:
        x[m["pageid"]]["categories"].append(m["category"])
    for t in trans:
        k = "modules" if t["to_ns"] == 828 else "templates"
        x[t["from_pageid"]][k].append(t["to_title"])
    for f in files:
        x[f["from_pageid"]]["files"].append(f["to_title"])
    for r in reds:
        x[r["from_pageid"]]["redirect_to"] = r["to_title"] + (("#" + r["fragment"]) if r.get("fragment") else "")
    outx = []
    for p in pages:
        v = x.get(p["pageid"], {})
        outx.append({"pageid": p["pageid"], "title": p["title"], "path": p["path"], "ns": p["ns"],
                     "categories": sorted(set(v.get("categories", []))),
                     "templates": sorted(set(v.get("templates", []))), "modules": sorted(set(v.get("modules", []))),
                     "files": sorted(set(v.get("files", []))), "redirect_to": v.get("redirect_to")})
    write_jsonl(INV / "crossref.jsonl", outx)

    # category summary
    summary = {c["category"]: {**{k: c[k] for k in c if k != "category"}, "members": []} for c in cats}
    for m in members:
        summary[m["category"]]["members"].append({"title": m["title"], "type": m["type"]})
    write_json(INV / "categories.json", summary)

    # attach categories to media records
    media = read_jsonl(INV / "media.jsonl")
    if media:
        fc = defaultdict(list)
        for m in members:
            if m["ns"] == 6:
                fc[m["title"]].append(m["category"])
        for m in media:
            m["categories"] = sorted(fc.get(m["title"], []))
            m["used_on"] = []
        usage = defaultdict(list)
        for f in files:
            usage[f["to_title"].replace("_", " ")].append(byid[f["from_pageid"]]["title"] if f["from_pageid"] in byid else f["from_pageid"])
        for m in media:
            m["used_on"] = sorted(set(usage.get(m["title"].replace("_", " "), [])))
        write_jsonl(INV / "media.jsonl", media)
    log("graph phase done")


if __name__ == "__main__":
    main()
