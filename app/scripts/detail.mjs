// Projects one archived wiki page (the wiki's own rendered HTML) into a structured detail record:
// the lead, every infobox field, and every section as paragraphs, lists, tables, galleries and
// figures, with links resolved to codex items where they exist. Navigation boxes, edit links and
// hidden metadata are dropped; reference markers ([1]) stay as text so cells keep their notes.
// Nothing else is summarised away.
// Shape (compact keys; mirrored in src/data/detail.ts):
//   Inline = string | { t, r?, x? } (text; r: codex ref, x: external url) | { i, w, h, a?, r? } (image) | { m: 'yes'|'no' } (a tick or cross)
//   Block  = { k:'p'|'note'|'quote'|'h', c } | { k:'ul'|'ol', items:[{ c, sub? }] }
//          | { k:'table', rows:[{ h?, cells:[{ c, h?, cs?, rs? }] }] } | { k:'gallery', items:[{ i, w, h, c }] }
//          | { k:'figure', i, w, h, c }
//   Detail = { ref, lead: Block[], infobox: [{ title, cols?, rows:[{ label, hint?, cells: Inline[][] }] }], sections: [{ id, title, blocks, subs:[{ id, title, blocks }] }] }
//   A tab's overview (category.<tab>.json) is a Detail without its item list, plus source: { title, revid, edited }.
import { parse } from 'node-html-parser';

const DROP = ['navbox', 'mw-editsection', 'mw-empty-elt', 'noprint', 'table-metadata', 'infoboxNew-switch-resources', 'hatnote', 'toc', 'mw-cite-backlink'];
const dropped = (el) => DROP.some((c) => el.classList?.contains(c)) || ['STYLE', 'SCRIPT', 'AUDIO', 'VIDEO', 'SOURCE'].includes(el.tagName) || el.getAttribute?.('role') === 'navigation';

/** A media file name from an image src: /images/thumb/A.png/24px-A.png or /images/A.png?x. */
export function mediaName(src) {
  const m = String(src).match(/^\/images\/(?:thumb\/)?(?:[0-9a-f]\/[0-9a-f]{2}\/)?([^/?]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}
/** A page title from a wiki href: /w/Armor_(item)#x -> "Armor (item)". */
export function hrefTitle(href) {
  const m = String(href).match(/^\/w\/([^#?]+)/);
  return m ? decodeURIComponent(m[1]).replace(/_/g, ' ') : null;
}
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';

/**
 * @param {string} html the page's parser output
 * @param {{ ref: string, linkRef: (title: string) => string | null, image: (name: string) => boolean }} ctx
 *   linkRef resolves a page title (after redirects) to a codex ref; image records a used media file and says if it exists.
 */
export function pageDetail(html, ctx) {
  const root = parse(html, { comment: false }).querySelector('.mw-parser-output');
  if (!root) return null;

  function inline(node, out = []) {
    if (node.nodeType === 3) {
      const s = node.text.replace(/\s+/g, ' ');
      if (s) out.push(s);
      return out;
    }
    if (node.nodeType !== 1 || dropped(node)) return out;
    const tag = node.tagName;
    if (tag === 'BR') out.push('\n');
    else if (tag === 'IMG') {
      const name = mediaName(node.getAttribute('src'));
      const mark = { 'Yes_check.svg': 'yes', 'X_mark.svg': 'no' }[name];
      if (mark) out.push({ m: mark });
      else if (name && ctx.image(name)) {
        const a = node.closest('a');
        const title = a && hrefTitle(a.getAttribute('href'));
        const r = title && !title.startsWith('File:') ? ctx.linkRef(title) : null;
        out.push({ i: name, w: Number(node.getAttribute('width')) || 24, h: Number(node.getAttribute('height')) || 24, ...(node.getAttribute('alt') ? { a: node.getAttribute('alt') } : {}), ...(r ? { r } : {}) });
      }
    } else if (tag === 'A' && !node.querySelector('img')) {
      const t = node.text.replace(/\s+/g, ' ');
      const href = node.getAttribute('href') || '';
      const title = hrefTitle(href);
      const r = title ? ctx.linkRef(title) : null;
      if (!t.trim()) return out;
      if (r && r !== ctx.ref) out.push({ t, r });
      else if (/^https?:/.test(href)) out.push({ t, x: href });
      else out.push(t);
    } else for (const c of node.childNodes) inline(c, out);
    return out;
  }
  const tidy = (runs) => {
    const out = [];
    for (const r of runs) {
      if (typeof r === 'string' && typeof out.at(-1) === 'string') out[out.length - 1] += r;
      else out.push(r);
    }
    if (typeof out[0] === 'string') out[0] = out[0].replace(/^[\s\n]+/, '');
    if (typeof out.at(-1) === 'string') out[out.length - 1] = out.at(-1).replace(/[\s\n]+$/, '');
    return out.map((r) => (typeof r === 'string' ? r.replace(/ *\n */g, '\n').replace(/ {2,}/g, ' ') : r)).filter((r) => r !== '');
  };
  const runs = (node) => tidy(inline(node));
  const hasContent = (c) => c.some((r) => typeof r !== 'string' || r.trim());

  function list(el) {
    const items = [];
    for (const li of el.childNodes) {
      if (li.nodeType !== 1 || li.tagName !== 'LI' || dropped(li)) continue;
      const own = [];
      let sub = null;
      for (const c of li.childNodes) {
        if (c.nodeType === 1 && (c.tagName === 'UL' || c.tagName === 'OL')) sub = list(c);
        else inline(c, own);
      }
      const c = tidy(own);
      if (hasContent(c) || sub) items.push({ c, ...(sub ? { sub } : {}) });
    }
    return { k: el.tagName === 'OL' ? 'ol' : 'ul', items };
  }

  function table(el) {
    const rows = [];
    for (const tr of el.querySelectorAll('tr')) {
      if (tr.closest('table') !== el || dropped(tr)) continue;
      const cells = [];
      for (const td of tr.childNodes) {
        if (td.nodeType !== 1 || !['TD', 'TH'].includes(td.tagName) || dropped(td)) continue;
        const cs = Number(td.getAttribute('colspan')) || 1;
        const rs = Number(td.getAttribute('rowspan')) || 1;
        cells.push({ c: runs(td), ...(td.tagName === 'TH' ? { h: 1 } : {}), ...(cs > 1 ? { cs } : {}), ...(rs > 1 ? { rs } : {}) });
      }
      if (cells.length) rows.push({ ...(cells.every((c) => c.h) ? { h: 1 } : {}), cells });
    }
    return rows.length ? { k: 'table', rows } : null;
  }

  function gallery(el) {
    const items = [];
    for (const box of el.querySelectorAll('li.gallerybox')) {
      const img = box.querySelector('img');
      const name = img && mediaName(img.getAttribute('src'));
      if (!name || !ctx.image(name)) continue;
      const cap = box.querySelector('.gallerytext');
      items.push({ i: name, w: Number(img.getAttribute('width')) || 0, h: Number(img.getAttribute('height')) || 0, c: cap ? runs(cap) : [] });
    }
    return items.length ? { k: 'gallery', items } : null;
  }

  /** Content blocks from an element's children; containers are walked through. */
  function blocks(el, out = []) {
    for (const n of el.childNodes) {
      if (n.nodeType === 3) {
        if (n.text.trim()) out.push({ k: 'p', c: tidy([n.text.replace(/\s+/g, ' ')]) });
        continue;
      }
      if (n.nodeType !== 1 || dropped(n)) continue;
      const tag = n.tagName;
      const cls = n.getAttribute('class') || '';
      if (tag === 'P') {
        const c = runs(n);
        if (hasContent(c)) out.push({ k: 'p', c });
      } else if (tag === 'UL' && cls.includes('gallery')) {
        const g = gallery(n);
        if (g) out.push(g);
      } else if (tag === 'UL' || tag === 'OL') {
        const l = list(n);
        if (l.items.length) out.push(l);
      } else if (tag === 'DL') {
        const c = runs(n);
        if (hasContent(c)) out.push({ k: 'note', c });
      } else if (tag === 'BLOCKQUOTE') {
        const c = runs(n);
        if (hasContent(c)) out.push({ k: 'quote', c });
      } else if (tag === 'TABLE') {
        const t = table(n);
        if (t) out.push(t);
      } else if (tag === 'FIGURE') {
        const img = n.querySelector('img');
        const name = img && mediaName(img.getAttribute('src'));
        const cap = n.querySelector('figcaption');
        if (name && ctx.image(name)) out.push({ k: 'figure', i: name, w: Number(img.getAttribute('width')) || 0, h: Number(img.getAttribute('height')) || 0, c: cap ? runs(cap) : [] });
      } else if (/^H[4-6]$/.test(tag) || cls.includes('mw-heading')) {
        out.push({ k: 'h', c: runs(n) });
      } else if (cls.includes('tabber')) {
        for (const tab of n.childNodes) {
          if (tab.nodeType !== 1 || !tab.classList.contains('tabbertab')) continue;
          out.push({ k: 'h', c: [tab.getAttribute('data-title') || ''] });
          blocks(tab, out);
        }
      } else if (['DIV', 'SECTION', 'CENTER', 'SPAN'].includes(tag)) {
        if (tag === 'SPAN' || (n.childNodes.every((c) => c.nodeType === 3 || !/^(DIV|P|UL|OL|TABLE|DL|FIGURE|BLOCKQUOTE)$/.test(c.tagName)) && !n.querySelector('table, ul, ol, p, figure'))) {
          const c = runs(n);
          if (hasContent(c)) out.push({ k: 'p', c });
        } else blocks(n, out);
      }
    }
    return out;
  }

  function infoboxRoot(el) {
    const groups = [{ title: null, rows: [] }];
    const row = (rc) => {
      const label = rc.querySelector('.infobox-row-label');
      const value = rc.querySelector('.infobox-row-value');
      if (!label || !value) return null;
      const hint = label.querySelector('[title]')?.getAttribute('title');
      return { label: label.text.replace(/\s+/g, ' ').trim(), ...(hint ? { hint } : {}), cells: [runs(value)] };
    };
    const walk = (node) => {
      for (const n of node.childNodes) {
        if (n.nodeType !== 1 || dropped(n)) continue;
        if (n.classList.contains('infobox-header')) groups.push({ title: n.text.trim(), rows: [] });
        else if (n.classList.contains('infobox-row-container')) {
          const r = row(n);
          if (r) groups.at(-1).rows.push(r);
        } else if (n.classList.contains('tabber') && n.querySelector('.infobox-row-container')) {
          // Tabs of the same rows (Normal / Max): one column per tab, rows matched by label.
          const g = groups.at(-1);
          const tabs = n.childNodes.filter((t) => t.nodeType === 1 && t.classList.contains('tabbertab'));
          g.cols = tabs.map((t) => t.getAttribute('data-title') || '');
          tabs.forEach((t, i) => {
            for (const rc of t.querySelectorAll('.infobox-row-container')) {
              const r = row(rc);
              if (!r) continue;
              let have = g.rows.find((x) => x.label === r.label);
              if (!have) g.rows.push((have = { label: r.label, ...(r.hint ? { hint: r.hint } : {}), cells: g.cols.map(() => []) }));
              have.cells[i] = r.cells[0];
            }
          });
        } else if (!n.classList.contains('tabber') && !n.classList.contains('infobox-title')) walk(n);
      }
    };
    walk(el);
    return groups.filter((g) => g.rows.length);
  }

  function infoboxTable(el) {
    const groups = [{ title: null, rows: [] }];
    for (const tr of el.querySelectorAll('tr')) {
      if (dropped(tr) || tr.querySelector('.table-metadata')) continue;
      const th = tr.childNodes.filter((c) => c.nodeType === 1 && c.tagName === 'TH');
      const td = tr.childNodes.filter((c) => c.nodeType === 1 && c.tagName === 'TD');
      if (th.length === 1 && !td.length && th[0].classList.contains('infoboxNew-subheader')) groups.push({ title: th[0].text.trim(), rows: [] });
      else if (th.length === 1 && td.length) groups.at(-1).rows.push({ label: th[0].text.replace(/\s+/g, ' ').trim(), cells: td.map(runs) });
    }
    return groups.filter((g) => g.rows.length);
  }

  const lead = [];
  let infobox = [];
  const sections = [];
  const ids = new Set();
  const uid = (t) => {
    let id = slug(t);
    while (ids.has(id)) id += '-x';
    ids.add(id);
    return id;
  };
  let target = lead;
  for (const n of root.childNodes) {
    if (n.nodeType !== 1 || dropped(n)) {
      if (n.nodeType === 3 && n.text.trim()) target.push({ k: 'p', c: tidy([n.text]) });
      continue;
    }
    const cls = n.getAttribute('class') || '';
    if (cls.includes('infobox-root')) infobox = infobox.concat(infoboxRoot(n));
    else if (cls.includes('infoboxNew')) infobox = infobox.concat(infoboxTable(n));
    else if (cls.includes('mw-heading')) {
      const h = n.querySelector('h2, h3, h4, h5');
      const title = h.text.replace(/\s+/g, ' ').trim();
      if (h.tagName === 'H2' || !sections.length) {
        sections.push({ id: uid(title), title, blocks: [], subs: [] });
        target = sections.at(-1).blocks;
      } else if (h.tagName === 'H3') {
        const s = sections.at(-1);
        s.subs.push({ id: uid(`${s.id} ${title}`), title, blocks: [] });
        target = s.subs.at(-1).blocks;
      } else target.push({ k: 'h', c: [title] });
    } else blocks({ childNodes: [n] }, target);
  }
  // Sections with nothing left after dropping navigation (a lone "See also" heading) go.
  const kept = sections.map((s) => ({ ...s, subs: s.subs.filter((x) => x.blocks.length) })).filter((s) => s.blocks.length || s.subs.length);
  return { ref: ctx.ref, lead, infobox, sections: kept };
}

/** Distinct codex refs of the given kinds a block links to. */
const ownRefs = (b, kinds) => new Set((JSON.stringify(b).match(/"r":"[a-z]+:[^"]+"/g) || []).map((x) => x.slice(5, -1)).filter((r) => kinds.includes(r.split(':')[0]))).size;
/** Characters of words outside links and pictures. */
const words = (n) =>
  typeof n === 'string' ? n.replace(/\s+/g, '').length
  : Array.isArray(n) ? n.reduce((a, x) => a + words(x), 0)
  : n && typeof n === 'object' ? (n.r || n.i ? 0 : Object.entries(n).reduce((a, [k, v]) => a + (k === 'k' ? 0 : words(v)), 0))
  : 0;

/**
 * A category page (Weapons, Characters…) without its own list of items, which the Codex already shows:
 * tables naming three or more items of the listed kinds (or one item for every other row, as in a
 * pack's one-item table), and runs of their links with next to no words between them (picture grids
 * of characters). Everything else stays: the introduction, mechanics, notes, update history, trivia.
 * Headings left with nothing under them go.
 * @returns {{ detail: object, dropped: number }}
 */
export function withoutList(d, kinds) {
  let dropped = 0;
  const isList = (b) => {
    const n = ownRefs(b, kinds);
    const body = b.k === 'table' ? b.rows.filter((r) => !r.h).length : 0;
    const hit = n >= 1 && (b.k === 'table' ? n >= 3 || n * 2 >= body : ['p', 'ul', 'ol'].includes(b.k) && n >= 3 && words(b) / n < 10);
    if (hit) dropped++;
    return hit;
  };
  const keep = (blocks) => {
    const out = blocks.filter((b) => !isList(b));
    return out.filter((b, i) => b.k !== 'h' || (out[i + 1] && out[i + 1].k !== 'h'));
  };
  const sections = d.sections
    .map((s) => ({ ...s, blocks: keep(s.blocks), subs: s.subs.map((x) => ({ ...x, blocks: keep(x.blocks) })).filter((x) => x.blocks.length) }))
    .filter((s) => s.blocks.length || s.subs.length);
  return { detail: { ...d, lead: keep(d.lead), sections }, dropped };
}
