"""Shared helpers for the Vampire Survivors wiki archiver.

Politeness: descriptive User-Agent, global throttle (< 5 req/s), retry/backoff,
honours Retry-After and maxlag. All phases are idempotent/resumable.
"""
import hashlib
import json
import re
import threading
import time
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[2]
RES = ROOT / "resources"
INV = RES / "inventory"
BASE = "https://vampire.survivors.wiki"
API = BASE + "/api.php"
UA = "VSWiki-OpenSourceArchive/1.0 (archival of CC BY-NC-SA wiki content for an open-source rebuild)"
MIN_INTERVAL = 0.25  # seconds between request starts, global (<= 4 req/s)

_lock = threading.Lock()
_last = [0.0]
_local = threading.local()


def session():
    s = getattr(_local, "s", None)
    if s is None:
        s = requests.Session()
        s.headers["User-Agent"] = UA
        s.headers["Accept-Encoding"] = "gzip, deflate"
        _local.s = s
    return s


def throttle():
    with _lock:
        now = time.monotonic()
        wait = _last[0] + MIN_INTERVAL - now
        if wait > 0:
            time.sleep(wait)
        _last[0] = time.monotonic()


def get(url, params=None, stream=False, timeout=120, tries=8):
    delay = 2
    for attempt in range(tries):
        throttle()
        try:
            r = session().get(url, params=params, stream=stream, timeout=timeout)
        except requests.RequestException as e:
            if attempt == tries - 1:
                raise
            time.sleep(delay)
            delay = min(delay * 2, 60)
            continue
        if r.status_code in (429, 500, 502, 503, 504):
            ra = r.headers.get("Retry-After")
            time.sleep(min(int(ra), 120) if ra and ra.isdigit() else delay)
            delay = min(delay * 2, 60)
            if attempt == tries - 1:
                r.raise_for_status()
            continue
        return r
    raise RuntimeError("unreachable")


def api(**params):
    params.setdefault("format", "json")
    params.setdefault("formatversion", "2")
    params.setdefault("maxlag", "10")
    for attempt in range(6):
        r = get(API, params=params)
        r.raise_for_status()
        d = r.json()
        err = d.get("error")
        if err and err.get("code") == "maxlag":
            time.sleep(5)
            continue
        if err:
            raise RuntimeError(f"API error {err} for {params}")
        return d
    raise RuntimeError("maxlag persisted")


def api_post_free(**params):
    return api(**params)


def merge(dst, src):
    """Recursively merge continuation results (lists extend, dicts merge)."""
    for k, v in src.items():
        if k not in dst:
            dst[k] = v
        elif isinstance(v, list) and isinstance(dst[k], list):
            dst[k].extend(v)
        elif isinstance(v, dict) and isinstance(dst[k], dict):
            merge(dst[k], v)
        else:
            dst[k] = v


def api_all(**params):
    """Follow `continue` and yield each raw response."""
    cont = {}
    while True:
        d = api(**params, **cont)
        yield d
        if "continue" in d:
            cont = d["continue"]
        else:
            return


def query_pages_all(**params):
    """For prop= queries with generator batches: merge continuation per pageid."""
    pages = {}
    for d in api_all(action="query", **params):
        for p in d.get("query", {}).get("pages", []):
            pid = p.get("pageid", p.get("title"))
            if pid in pages:
                merge(pages[pid], p)
            else:
                pages[pid] = p
    return pages


# ---------- paths ----------
_ILLEGAL = re.compile(r'[<>:"/\\|?*%\x00-\x1f]')
_RESERVED = {"CON", "PRN", "AUX", "NUL", *(f"COM{i}" for i in range(1, 10)), *(f"LPT{i}" for i in range(1, 10))}


def safe_name(dbkey, maxlen=110):
    """Reversible, Windows-safe filename from a title (without extension)."""
    s = _ILLEGAL.sub(lambda m: "%%%02X" % ord(m.group()), dbkey)
    if s.endswith((".", " ")):
        s = s[:-1] + "%%%02X" % ord(s[-1])
    if s.split(".")[0].upper() in _RESERVED:
        s = "_" + s
    if len(s) > maxlen:
        s = s[: maxlen - 9] + "~" + hashlib.sha1(dbkey.encode()).hexdigest()[:8]
    return s or "_"


def assign_paths(items, key, dirfn, extfn):
    """Deterministically assign collision-free (case-insensitive) relative paths.
    items must be sorted deterministically by caller. Returns {key: relpath}."""
    used = set()
    out = {}
    for it in items:
        base = safe_name(key(it))
        d = dirfn(it)
        ext = extfn(it)
        cand = f"{d}/{base}{ext}"
        if cand.lower() in used:
            cand = f"{d}/{base}~{it['pageid'] if 'pageid' in it else hashlib.sha1(key(it).encode()).hexdigest()[:8]}{ext}"
        used.add(cand.lower())
        out[key(it)] = cand
    return out


def sha256_file(p, chunk=1 << 20):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        while b := f.read(chunk):
            h.update(b)
    return h.hexdigest()


def sha1_file(p, chunk=1 << 20):
    h = hashlib.sha1()
    with open(p, "rb") as f:
        while b := f.read(chunk):
            h.update(b)
    return h.hexdigest()


def write_bytes(path, data):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(path.name + ".part")
    tmp.write_bytes(data)
    tmp.replace(path)


def write_json(path, obj):
    write_bytes(path, (json.dumps(obj, ensure_ascii=False, indent=2) + "\n").encode("utf-8"))


def write_jsonl(path, rows):
    write_bytes(path, "".join(json.dumps(r, ensure_ascii=False) + "\n" for r in rows).encode("utf-8"))


def read_json(path, default=None):
    p = Path(path)
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else default


def read_jsonl(path):
    p = Path(path)
    if not p.exists():
        return []
    return [json.loads(l) for l in p.read_text(encoding="utf-8").splitlines() if l.strip()]


def log(msg):
    print(time.strftime("%H:%M:%S"), msg, flush=True)


_flock = threading.Lock()


def record_failure(phase, item, reason):
    with _flock:
        f = INV / "failures.json"
        d = read_json(f, [])
        d = [x for x in d if not (x["phase"] == phase and x["item"] == item)]
        d.append({"phase": phase, "item": item, "reason": str(reason)})
        write_json(f, d)


def clear_failures(phase):
    f = INV / "failures.json"
    d = read_json(f, [])
    write_json(f, [x for x in d if x["phase"] != phase])
