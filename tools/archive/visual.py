"""Phase: visual reference of the current wiki design using Playwright in an independent browser
(fresh, non-persistent context: no profile, cookies or extensions)."""
import re
from urllib.parse import quote

from playwright.sync_api import sync_playwright

from common import *

OUT = RES / "design"
PAGES = ["Vampire Survivors Wiki", "Bracelet", "Weapons", "Characters", "Stages", "Arcanas",
         "Category:Weapons", "Guide:New player guide", "Whip"]
VIEWPORTS = {"desktop": {"width": 1440, "height": 900}, "mobile": {"width": 390, "height": 844}}


def slug(t):
    return safe_name(t.replace(" ", "_")).replace("%3A", "-")


def main():
    clear_failures("visual")
    known = {p["title"] for p in read_jsonl(INV / "pages.jsonl")}
    pages = [t for t in PAGES if t in known]
    skipped = [t for t in PAGES if t not in known]
    (OUT / "screenshots").mkdir(parents=True, exist_ok=True)
    assets = {}
    manifest = []
    with sync_playwright() as pw:
        try:
            browser = pw.chromium.launch(channel="msedge", headless=True)
        except Exception:
            browser = pw.chromium.launch(headless=True)
        for vp_name, vp in VIEWPORTS.items():
            ctx = browser.new_context(viewport=vp, user_agent=UA + " Playwright", is_mobile=(vp_name == "mobile"))
            for title in pages:
                page = ctx.new_page()
                captured = []

                def on_resp(r, captured=captured):
                    try:
                        ct = r.headers.get("content-type", "")
                        u = r.url
                        if r.status == 200 and u.startswith(BASE) and ("/load.php" in u or re.search(r"\.(css|js|woff2?|ttf|svg)(\?|$)", u)) \
                                and "/images/thumb" not in u:
                            captured.append((u, ct, r.body()))
                    except Exception:
                        pass

                page.on("response", on_resp)
                url = f"{BASE}/w/{quote(title.replace(' ', '_'), safe=':/')}"
                try:
                    page.goto(url, wait_until="networkidle", timeout=90000)
                    page.wait_for_timeout(1500)
                    base = f"{slug(title)}.{vp_name}"
                    page.screenshot(path=str(OUT / "screenshots" / f"{base}.png"), full_page=True)
                    write_bytes(OUT / "html_snapshots" / f"{base}.html", page.content().encode("utf-8"))
                    manifest.append({"title": title, "url": url, "viewport": vp_name,
                                     "screenshot": f"design/screenshots/{base}.png",
                                     "html": f"design/html_snapshots/{base}.html", "final_url": page.url})
                    for u, ct, body in captured:
                        assets[u] = (ct, body)
                except Exception as e:
                    record_failure("visual", f"{title}@{vp_name}", repr(e))
                finally:
                    page.close()
                log(f"visual {vp_name} {title}")
            ctx.close()
        browser.close()
    asset_rows = []
    for i, (u, (ct, body)) in enumerate(sorted(assets.items())):
        m = re.search(r"\.(\w{2,5})(\?|$)", u)
        ext = ".css" if "css" in ct else ".js" if "javascript" in ct else "." + (m.group(1) if m else "bin")
        name = f"{i:03d}_{re.sub(r'[^A-Za-z0-9._-]+', '_', u.replace(BASE, ''))[:60]}{ext}"
        write_bytes(OUT / "assets" / name, body)
        asset_rows.append({"url": u, "content_type": ct, "path": f"design/assets/{name}", "bytes": len(body)})
    write_json(OUT / "index.json", {"pages": manifest, "skipped_titles_not_found": skipped, "assets": asset_rows})
    log(f"visual phase done: {len(manifest)} captures, {len(asset_rows)} assets")


if __name__ == "__main__":
    main()
