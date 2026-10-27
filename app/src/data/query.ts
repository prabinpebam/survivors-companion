/** Tier 0: pure queries over the codex: scope, facets, filters, sorting, fields and pairings. */
import type { Codex, Entity, MarkState, Recipe } from './types';
import { t, tOr } from '../copy/t';

export type Index = {
  codex: Codex;
  byRef: Map<string, Entity>;
  packName: Map<string, string>;
  recipesByInput: Map<string, Recipe[]>;
  recipesByResult: Map<string, Recipe[]>;
};

export function index(codex: Codex): Index {
  const byRef = new Map(codex.entities.map((e) => [e.ref, e]));
  const recipesByInput = new Map<string, Recipe[]>();
  const recipesByResult = new Map<string, Recipe[]>();
  for (const r of codex.recipes) {
    for (const i of r.inputs) if (i.ref) (recipesByInput.get(i.ref) ?? recipesByInput.set(i.ref, []).get(i.ref)!).push(r);
    (recipesByResult.get(r.result) ?? recipesByResult.set(r.result, []).get(r.result)!).push(r);
  }
  return { codex, byRef, packName: new Map(codex.packs.map((p) => [p.id, p.name])), recipesByInput, recipesByResult };
}

export type Context = { ix: Index; marks: Record<string, MarkState>; packs: string[] | null };

/** A field's raw value for faceting and sorting. */
export function raw(e: Entity, field: string, ctx: Context): string | number | null {
  if (field === 'mark') return ctx.marks[e.ref] ?? 'none';
  if (field.startsWith('stats.')) return 'stats' in e && !Array.isArray(e.stats) ? (e.stats as Record<string, string>)[field.slice(6)] ?? null : null;
  const v = (e as Record<string, unknown>)[field];
  if (v == null || v === '') return null;
  if (Array.isArray(v)) return v.length ? v.join(', ') : null;
  return typeof v === 'number' ? v : String(v);
}

/** A field's value as a person reads it. */
export function display(e: Entity, field: string, ctx: Context): string {
  const v = raw(e, field, ctx);
  if (v == null) return '–';
  switch (field) {
    case 'pack':
      return ctx.ix.packName.get(String(v)) ?? String(v);
    case 'type':
      return tOr(`type.${v}`, String(v));
    case 'mark':
      return t(`mark.state.${v}`);
    case 'startingWeapons':
      return ('startingWeapons' in e ? e.startingWeapons : []).map((r) => ctx.ix.byRef.get(r)?.name ?? r).join(', ') || '–';
    case 'timeLimit':
      return `${Math.round(Number(v) / 60)} min`;
    case 'bonus':
      return 'percent' in e && e.percent ? `${Math.round(Number(v) * 100)}%` : String(v);
    default:
      return String(v);
  }
}

export function facetLabel(facet: string, value: string, ctx: Context): string {
  if (facet === 'pack') return ctx.ix.packName.get(value) ?? value;
  if (facet === 'type') return tOr(`type.${value}`, value);
  if (facet === 'mark') return t(value === 'unlocked' ? 'mark.unlocked' : value === 'skipped' ? 'mark.state.skipped' : 'mark.none');
  return value;
}

export function inScope(e: Entity, packs: string[] | null): boolean {
  return !packs || packs.includes(e.pack);
}

function matches(e: Entity, q: string): boolean {
  if (!q) return true;
  const s = q.toLowerCase();
  return e.name.toLowerCase().includes(s) || e.page.toLowerCase().includes(s) || ('alias' in e && !!e.alias && e.alias.toLowerCase().includes(s));
}

export type Facet = { id: string; options: { value: string; label: string; count: number; active: boolean }[] };

/** Filters a list and counts each facet option against the other active filters. */
export function query(all: Entity[], o: { facets: string[]; filters: Record<string, string[]>; q: string; sort: string; dir?: Dir; ctx: Context }) {
  const scoped = all.filter((e) => inScope(e, o.ctx.packs));
  const hiddenByScope = all.length - scoped.length;
  const val = (e: Entity, f: string) => String(raw(e, f, o.ctx) ?? '');
  const passes = (e: Entity, except?: string) =>
    matches(e, o.q) && Object.entries(o.filters).every(([f, vs]) => f === except || !vs.length || !o.facets.includes(f) || vs.includes(val(e, f)));
  const items = scoped.filter((e) => passes(e)).sort(sorter(o.sort, o.dir ?? defaultDir(o.sort), o.ctx));
  const facets: Facet[] = o.facets.map((f) => {
    const counts = new Map<string, number>();
    for (const e of scoped) if (passes(e, f)) counts.set(val(e, f), (counts.get(val(e, f)) ?? 0) + 1);
    const values = new Set([...scoped.map((e) => val(e, f)), ...(o.filters[f] ?? [])]);
    const options = [...values].filter(Boolean).map((v) => ({ value: v, label: facetLabel(f, v, o.ctx), count: counts.get(v) ?? 0, active: (o.filters[f] ?? []).includes(v) }));
    const packOrder = o.ctx.ix.codex.packs.map((p) => p.id);
    options.sort((a, b) => (f === 'pack' ? packOrder.indexOf(a.value) - packOrder.indexOf(b.value) : b.count - a.count || a.label.localeCompare(b.label)));
    return { id: f, options };
  });
  return { items, facets, hiddenByScope };
}

export type Dir = 'asc' | 'desc';

const NUMERIC = new Set(['order', 'rarity', 'maxLevel', 'cost', 'maxRank', 'bonus', 'timeLimit']);
/** Whether a field holds numbers (compared and aligned as numbers). */
export const isNumeric = (field: string) => field.startsWith('stats.') || NUMERIC.has(field);
/** The direction a field sorts in first, as in a file manager: words A to Z, amounts largest first. */
export const defaultDir = (field: string): Dir => (isNumeric(field) && field !== 'order' ? 'desc' : 'asc');

const MARK_ORDER = ['unlocked', 'skipped', 'none'];
const num = (v: string | number | null) => (v == null ? NaN : typeof v === 'number' ? v : parseFloat(v));

/** Ascending comparison of two items by one field; empty values always come last, then by name. */
export function sorter(field: string, dir: Dir, ctx: Context) {
  const sign = dir === 'desc' ? -1 : 1;
  const byName = (a: Entity, b: Entity) => a.name.localeCompare(b.name);
  const packOrder = ctx.ix.codex.packs.map((p) => p.id);
  const key = (e: Entity): number | string | null => {
    if (field === 'name') return e.name;
    if (field === 'order') return e.order ?? null;
    if (field === 'pack') return packOrder.indexOf(e.pack);
    if (field === 'mark') return MARK_ORDER.indexOf(String(raw(e, 'mark', ctx)));
    const v = raw(e, field, ctx);
    if (isNumeric(field)) return Number.isFinite(num(v)) ? num(v) : null;
    return v == null ? null : display(e, field, ctx);
  };
  return (a: Entity, b: Entity) => {
    const ka = key(a);
    const kb = key(b);
    if (ka == null || kb == null) return ka == null && kb == null ? byName(a, b) : ka == null ? 1 : -1;
    const c = typeof ka === 'number' && typeof kb === 'number' ? ka - kb : String(ka).localeCompare(String(kb));
    return c ? c * sign : byName(a, b);
  };
}

export type Group<T> = { key: string; label: string; items: T[] };

const NAME_BUCKETS: [string, RegExp][] = [
  ['0–9', /^[0-9]/],
  ['A–H', /^[a-h]/i],
  ['I–P', /^[i-p]/i],
  ['Q–Z', /^[q-z]/i],
];

/**
 * Splits sorted items into groups by one field, as a file manager does: names fall into letter
 * ranges, everything else by value. Groups follow the field's natural order (reversed when the list
 * is sorted by the same field, descending); items keep their sorted order; empties go last.
 */
export function groupItems(items: Entity[], field: string, o: { dir: Dir; sort: string; ctx: Context; hidden: (e: Entity) => boolean }): Group<Entity>[] {
  const none = '\u0000none';
  const keyOf = (e: Entity): string => {
    if (field === 'name') return o.hidden(e) ? '\u0000hidden' : NAME_BUCKETS.find(([, re]) => re.test(e.name))?.[0] ?? '#';
    const v = raw(e, field, o.ctx);
    return v == null ? none : String(v);
  };
  const labelOf = (key: string, e: Entity): string => {
    if (key === none) return t('group.none');
    if (key === '\u0000hidden') return t('kind.secret');
    if (key === '#') return t('group.other');
    return field === 'name' ? key : display(e, field, o.ctx);
  };
  const map = new Map<string, Group<Entity>>();
  for (const e of items) {
    const k = keyOf(e);
    if (!map.has(k)) map.set(k, { key: k, label: labelOf(k, e), items: [] });
    map.get(k)!.items.push(e);
  }
  const groups = [...map.values()];
  const asc = sorter(field, 'asc', o.ctx);
  const isTail = (k: string) => k.startsWith('\u0000') || k === '#';
  const nameRank = (k: string) => (isTail(k) ? 99 : NAME_BUCKETS.findIndex(([b]) => b === k));
  const cmp = (a: Group<Entity>, b: Group<Entity>) => (field === 'name' ? nameRank(a.key) - nameRank(b.key) : asc(a.items[0], b.items[0]));
  const flip = o.sort === field && o.dir === 'desc' ? -1 : 1;
  groups.sort((a, b) => Number(isTail(a.key)) - Number(isTail(b.key)) || cmp(a, b) * flip);
  return groups;
}

/** Whether an item is a hidden secret right now. */
export function isHidden(e: Entity, prefs: { spoilers: string; revealed: string[] }): boolean {
  return e.kind === 'character' && e.secret && prefs.spoilers === 'hide' && !prefs.revealed.includes(e.ref);
}

/** The pairing answer for an item: recipes it takes part in and recipes that make it. */
export function pairings(ix: Index, ref: string) {
  return { uses: ix.recipesByInput.get(ref) ?? [], makes: ix.recipesByResult.get(ref) ?? [] };
}
