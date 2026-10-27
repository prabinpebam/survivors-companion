"""Phase: site-level configuration & static site assets."""
import re
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

from common import *

OUT = RES / "site"


def main():
    props = ("general|namespaces|namespacealiases|specialpagealiases|magicwords|interwikimap|statistics|"
             "usergroups|libraries|extensions|fileextensions|rightsinfo|restrictions|languages|skins|"
             "extensiontags|functionhooks|variables|protocols|defaultoptions")
    si = api(action="query", meta="siteinfo", siprop=props)["query"]
    write_json(OUT / "siteinfo.json", si)
    write_json(OUT / "namespaces.json", si["namespaces"])
    write_json(OUT / "extensions.json", si["extensions"])
    write_json(OUT / "interwiki.json", si["interwikimap"])
    write_json(OUT / "magicwords.json", si["magicwords"])
    write_json(OUT / "statistics.json", si["statistics"])
    write_json(OUT / "license.json", si["rightsinfo"])

    # customised system messages
    msgs = {}
    for d in api_all(action="query", meta="allmessages", amcustomised="modified", amlimit="max"):
        for m in d["query"]["allmessages"]:
            msgs[m["name"]] = m.get("content")
    write_json(OUT / "messages_customised.json", msgs)

    tags = []
    for d in api_all(action="query", list="tags", tglimit="max", tgprop="displayname|description|hitcount|defined|active"):
        tags += d["query"]["tags"]
    write_json(OUT / "tags.json", tags)

    # robots + sitemaps + logos
    write_bytes(OUT / "robots.txt", get(BASE + "/robots.txt").content)
    idx = get(BASE + "/images/sitemaps/index.xml").content
    write_bytes(OUT / "sitemaps" / "index.xml", idx)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    for loc in ET.fromstring(idx).findall(".//s:loc", ns):
        r = get(loc.text)
        if r.ok:
            write_bytes(OUT / "sitemaps" / loc.text.rsplit("/", 1)[-1], r.content)
    g = si["general"]
    for key in ("logo", "favicon"):
        url = g.get(key)
        if url:
            if url.startswith("/"):
                url = BASE + url
            r = get(url)
            if r.ok:
                write_bytes(OUT / "branding" / url.rsplit("/", 1)[-1], r.content)

    write_json(INV / "snapshot.json", {
        "snapshot_utc": datetime.now(timezone.utc).isoformat(),
        "wiki_time": g["time"],
        "generator": g["generator"],
        "statistics_at_snapshot_start": si["statistics"],
        "license": si["rightsinfo"],
    })
    log("site phase done")


if __name__ == "__main__":
    main()
