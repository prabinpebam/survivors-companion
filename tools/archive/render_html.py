"""Phase: server-rendered HTML (action=parse) for presentation-relevant namespaces."""
from concurrent.futures import ThreadPoolExecutor, as_completed

from common import *

NAMESPACES = {0, 4, 12, 14, 10000, 10002}
PROGRESS = INV / "_html_progress.jsonl"


def main():
    clear_failures("html")
    pages = [p for p in read_jsonl(INV / "pages.jsonl") if p["ns"] in NAMESPACES and not p["redirect"]]
    done = {r["pageid"]: r for r in read_jsonl(PROGRESS)}
    todo = []
    for p in pages:
        hp = RES / "html" / p["path"].split("/", 1)[1].rsplit(".", 1)[0]
        hp = hp.with_name(hp.name + ".html")
        p["html_path"] = "html/" + hp.relative_to(RES / "html").as_posix()
        if not (done.get(p["pageid"], {}).get("revid") == p["revid"] and hp.exists()):
            todo.append(p)
    log(f"{len(pages)} renderable pages, {len(todo)} to fetch")

    def fetch(p):
        d = api(action="parse", pageid=p["pageid"], prop="text|displaytitle|sections|revid|modules",
                disablelimitreport="1", disableeditsection="1", disabletoc="1")["parse"]
        write_bytes(RES / p["html_path"], d["text"].encode("utf-8"))
        return {"pageid": p["pageid"], "title": p["title"], "revid": d["revid"], "html_path": p["html_path"],
                "displaytitle": d["displaytitle"], "sections": d.get("sections", []), "modules": d.get("modules", []),
                "html_bytes": len(d["text"].encode("utf-8"))}

    n = 0
    with open(PROGRESS, "a", encoding="utf-8") as prog, ThreadPoolExecutor(max_workers=4) as ex:
        futs = {ex.submit(fetch, p): p for p in todo}
        for fu in as_completed(futs):
            p = futs[fu]
            try:
                prog.write(json.dumps(fu.result(), ensure_ascii=False) + "\n")
                prog.flush()
            except Exception as e:
                record_failure("html", p["title"], repr(e))
            n += 1
            if n % 250 == 0:
                log(f"html {n}/{len(todo)}")
    final = {}
    for r in read_jsonl(PROGRESS):
        final[r["pageid"]] = r
    write_jsonl(INV / "html_index.jsonl", sorted(final.values(), key=lambda r: r["pageid"]))
    log(f"html phase done: {len(final)}/{len(pages)}")


if __name__ == "__main__":
    main()
