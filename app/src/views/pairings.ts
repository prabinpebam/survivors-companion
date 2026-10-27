/** Views: Pairings, every evolution and union recipe as "A + B → C", searchable by any part. */
import type { Kind } from '../design/icons';
import { t, tCount } from '../copy/t';
import { update } from '../data/router';
import type { Recipe } from '../data/types';
import type { Block, ViewSpec } from '../render/registry';
import { arrangeMenus, codexHeader, codexTabs, toggleFilter } from './codex';
import { peekHref, type ViewContext } from './context';

function part(c: ViewContext, ref: string | null, fallback: string, focus: string | null, note?: string) {
  const e = ref ? c.ix.byRef.get(ref) : undefined;
  if (!e) return { name: fallback || ref || '?', kind: 'weapon' as Kind, sprite: null, href: null, note: t('answer.notInCodex') };
  return { name: e.name, kind: e.kind as Kind, sprite: e.sprite, href: peekHref(c, e.ref), note, focus: e.ref === focus };
}

/** A recipe as a RecipeCard block; `focus` outlines the item the person asked about. */
export function recipeBlock(c: ViewContext, r: Recipe, focus: string | null): Block {
  const inputs = r.inputs.map((i) => part(c, i.ref, i.name ?? '', focus, i.max ? t('answer.atMax') : undefined));
  const result = part(c, r.result, r.result, focus);
  const sentence = `${inputs.map((p) => (p.note ? `${p.name} (${p.note})` : p.name)).join(' + ')} → ${result.name}`;
  // Beside an item, its heading already says Evolves with or Made from; only a Union needs its label.
  const typeLabel = focus && r.type === 'evolution' ? undefined : t(`pairing.type.${r.type}`);
  return { type: 'RecipeCard', key: r.ref, props: { sentence, typeLabel, inputs, result } };
}

const names = (c: ViewContext, r: Recipe) => [r.result, ...r.inputs.map((i) => i.ref ?? i.name ?? '')].map((ref) => (c.ix.byRef.get(ref)?.name ?? ref).toLowerCase());

const SORTS = ['name', 'type', 'pack'];
const GROUPS = ['type', 'pack'];

export function pairingsView(c: ViewContext): ViewSpec {
  const { route } = c;
  const scoped = c.ix.codex.recipes.filter((r) => !c.prefs.packs || c.prefs.packs.includes(r.pack));
  const q = route.q.trim().toLowerCase();
  const types = route.filters.type ?? [];
  const matchQ = (r: Recipe) => !q || names(c, r).some((n) => n.includes(q));
  const sort = route.sort && SORTS.includes(route.sort) ? route.sort : 'name';
  const dir = route.dir ?? 'asc';
  const group = route.group && GROUPS.includes(route.group) ? route.group : null;
  const packOrder = c.ix.codex.packs.map((p) => p.id);
  const resultName = (r: Recipe) => c.ix.byRef.get(r.result)?.name ?? r.result;
  const keyOf = (r: Recipe, f: string) => (f === 'pack' ? packOrder.indexOf(r.pack) : f === 'type' ? r.type : 0);
  const cmp = (f: string) => (a: Recipe, b: Recipe) => {
    const ka = keyOf(a, f);
    const kb = keyOf(b, f);
    return typeof ka === 'number' && typeof kb === 'number' ? ka - kb : String(ka).localeCompare(String(kb));
  };
  const items = scoped
    .filter((r) => matchQ(r) && (!types.length || types.includes(r.type)))
    .sort((a, b) => ((sort === 'name' ? 0 : cmp(sort)(a, b)) || resultName(a).localeCompare(resultName(b))) * (dir === 'desc' ? -1 : 1));
  const typeOptions = (['evolution', 'union'] as const).map((v) => ({ value: v, label: t(`pairing.type.${v}`), count: scoped.filter((r) => r.type === v && matchQ(r)).length, active: types.includes(v) }));
  const groupLabel = (r: Recipe) => (group === 'pack' ? c.ix.packName.get(r.pack) ?? r.pack : t(`pairing.type.${r.type}`));
  const groups = group
    ? [...new Set(items.map((r) => (group === 'pack' ? r.pack : r.type)))]
        .map((key) => ({ key, items: items.filter((r) => (group === 'pack' ? r.pack : r.type) === key) }))
        .sort((a, b) => cmp(group)(a.items[0], b.items[0]) * (sort === group && dir === 'desc' ? -1 : 1))
    : null;

  return {
    layout: 'Collection',
    header: codexHeader(),
    tabs: codexTabs('pairings'),
    filters: [
      {
        type: 'FilterBar',
        props: {
          label: t('filter.label'),
          facets: [{ id: 'type', label: t('filter.type'), options: typeOptions }],
          onToggle: (facet, value) => update({ filters: toggleFilter(route.filters, facet, value) }, { replace: true }),
          clear: types.length ? { label: t('filter.clear'), onPress: () => update({ filters: {} }, { replace: true }) } : null,
        },
      },
    ],
    filtersLabel: t('filter.label'),
    filtersActive: types.length,
    toolbar: [
      {
        type: 'CollectionToolbar',
        props: {
          search: { label: t('pairings.find'), placeholder: t('search.placeholder'), value: route.q, onInput: (v) => update({ q: v }, { replace: true }) },
          ...arrangeMenus({ sorts: SORTS, sort, dir, groups: GROUPS, group, label: (f) => t(f === 'name' ? 'sort.name' : f === 'type' ? 'filter.type' : 'sort.pack') }),
          count: tCount('pairings.count', items.length),
        },
      },
    ],
    mode: 'list',
    resultsLabel: t('collection.pairings'),
    groups: groups?.length
      ? groups.map((g) => ({ key: g.key, label: groupLabel(g.items[0]), count: String(g.items.length), countLabel: tCount('pairings.count', g.items.length), blocks: g.items.map((r) => recipeBlock(c, r, null)) }))
      : undefined,
    results: items.length
      ? items.map((r) => recipeBlock(c, r, null))
      : [{ type: 'EmptyState', props: { icon: 'pairings', message: t('empty.filtered'), live: true, action: { label: t('filter.clear'), onPress: () => update({ filters: {}, q: '' }, { replace: true }) } } }],
  };
}
