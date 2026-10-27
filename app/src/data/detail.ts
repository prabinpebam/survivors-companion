/**
 * Tier 0: an item's full page, projected from the archived wiki by scripts/detail.mjs, loaded on
 * demand (one file per item) and kept for the session. The shapes mirror that script.
 */
import { useEffect, useState } from 'preact/hooks';
import { BASE } from './router';

/** A run of text: plain, an in-app link (r: a codex ref), an external link (x), an image, or a tick or cross. */
export type Inline = string | { t: string; r?: string; x?: string } | { i: string; w: number; h: number; a?: string; r?: string } | { m: 'yes' | 'no' };
export type ListItem = { c: Inline[]; sub?: Extract<RichBlock, { k: 'ul' | 'ol' }> };
/** `sub` is a muted second line under a cell (an infobox hint). */
export type Cell = { c: Inline[]; h?: 1; cs?: number; rs?: number; sub?: Inline[] };
export type RichBlock =
  | { k: 'p' | 'note' | 'quote' | 'h'; c: Inline[] }
  | { k: 'ul' | 'ol'; items: ListItem[] }
  | { k: 'table'; rows: { h?: 1; cells: Cell[] }[] }
  | { k: 'facts'; items: Fact[] }
  | { k: 'gallery'; items: { i: string; w: number; h: number; c: Inline[] }[] }
  | { k: 'figure'; i: string; w: number; h: number; c: Inline[] };
/** One stat: the first value leads; later values carry their column's name (Max, Hyper...). `wide` holds prose; `named` is a thing (a picture or long words), shown at body size under its picture. */
export type Fact = { label: string; hint?: string; wide?: 1; named?: 1; values: { col?: string; c: Inline[] }[] };
export type InfoGroup = { title: string | null; cols?: string[]; rows: { label: string; hint?: string; cells: Inline[][] }[] };
export type Section = { id: string; title: string; blocks: RichBlock[]; subs: { id: string; title: string; blocks: RichBlock[] }[] };
export type Detail = { ref: string; lead: RichBlock[]; infobox: InfoGroup[]; sections: Section[]; source?: { title: string; edited: string } | null };

export type DetailLoad = { status: 'loading' } | { status: 'failed' } | { status: 'ready'; detail: Detail };

/** Where an image from the archive is served. */
// `&` and `,` stay literal: they are safe in a path, and the dev server misreads their escaped forms.
export const fileUrl = (dir: 'media' | 'sprites', name: string) =>
  `${BASE}${dir}/${encodeURIComponent(name).replace(/%(26|2C)/g, (m) => decodeURIComponent(m))}`;
export const mediaUrl = (name: string) => fileUrl('media', name);
const fileOf = (ref: string) => `${BASE}data/detail/${ref.replace(/:/g, '.')}.json`;

const cache = new Map<string, Promise<Detail>>();
function load(ref: string): Promise<Detail> {
  let p = cache.get(ref);
  if (!p) {
    p = fetch(fileOf(ref)).then((r) => (r.ok ? (r.json() as Promise<Detail>) : Promise.reject(new Error(String(r.status)))));
    p.catch(() => cache.delete(ref));
    cache.set(ref, p);
  }
  return p;
}

/** The full page for a ref; re-renders when it arrives. Null ref: nothing to load. */
export function useDetail(ref: string | null): DetailLoad | null {
  const [state, setState] = useState<{ ref: string; load: DetailLoad } | null>(null);
  useEffect(() => {
    if (!ref) return;
    let live = true;
    load(ref).then(
      (detail) => live && setState({ ref, load: { status: 'ready', detail } }),
      () => live && setState({ ref, load: { status: 'failed' } }),
    );
    return () => {
      live = false;
    };
  }, [ref]);
  if (!ref) return null;
  return state && state.ref === ref ? state.load : { status: 'loading' };
}

/** The plain words of a run, for teasers and counts. */
export function plain(runs: Inline[]): string {
  return runs.map((r) => (typeof r === 'string' ? r : 't' in r ? r.t : '')).join('').replace(/\s+/g, ' ').trim();
}

/** The first sentence of the first paragraph in some blocks, or ''. */
export function firstSentence(blocks: RichBlock[]): string {
  for (const b of blocks) {
    if (b.k !== 'p' && b.k !== 'quote') continue;
    const text = plain(b.c);
    if (!text) continue;
    const m = text.match(/^.+?[.!?](?=\s|$)/);
    return m ? m[0] : text;
  }
  return '';
}

/** How much a section holds: data rows in its tables, entries in its lists, pictures in its galleries. */
export function measure(blocks: RichBlock[]): { rows: number; entries: number; pictures: number } {
  const out = { rows: 0, entries: 0, pictures: 0 };
  for (const b of blocks) {
    if (b.k === 'table') out.rows += b.rows.filter((r) => !r.h).length;
    else if (b.k === 'ul' || b.k === 'ol') out.entries += b.items.length;
    else if (b.k === 'gallery') out.pictures += b.items.length;
    else if (b.k === 'figure') out.pictures += 1;
  }
  return out;
}

/** Characters past which a stat's value reads as prose and its tile takes a whole row. */
const PROSE = 32;
/** Characters a value can have and still be shown large, like a number. */
const SHORT = 12;
const plainLength = (c: Inline[]) => c.reduce((n, x) => n + (typeof x === 'string' ? x.trim().length : 't' in x ? x.t.length : 2), 0);

/**
 * The infobox as rich blocks: a heading per group, then one tile per stat. Tabs become named
 * values; a row with fewer values than tabs (one value for every level or mode) has just one.
 */
export function infoboxBlocks(groups: InfoGroup[]): RichBlock[] {
  const out: RichBlock[] = [];
  for (const g of groups) {
    if (!g.rows.length) continue;
    if (g.title) out.push({ k: 'h', c: [g.title] });
    const many = (g.cols?.length ?? 0) > 1;
    const items = g.rows.map((r) => ({
      label: r.label,
      ...(r.hint ? { hint: r.hint } : {}),
      ...(r.cells.some((c) => plainLength(c) > PROSE) ? { wide: 1 as const } : {}),
      ...(r.cells[0] && (r.cells[0].some((x) => typeof x !== 'string' && 'i' in x) || plainLength(r.cells[0]) > SHORT) ? { named: 1 as const } : {}),
      values: r.cells
        .map((c, i) => (many && r.cells.length > 1 && i > 0 ? { col: g.cols![i], c } : { c }))
        .filter((v, i) => i === 0 || plainLength(v.c) > 0),
    }));
    out.push({ k: 'facts', items });
  }
  return out;
}
