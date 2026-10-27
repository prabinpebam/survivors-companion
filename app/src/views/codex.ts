/** Views: a Codex collection as data. Tabs, facets, sorts, groupings, views and columns come from collections.json. */
import type { Kind } from '../design/icons';
import { t, tCount, tOr } from '../copy/t';
import collections from '../data/collections.json';
import { defaultDir, display, groupItems, isHidden, isNumeric, query, type Dir } from '../data/query';
import { update } from '../data/router';
import { store } from '../data/store';
import type { Entity } from '../data/types';
import type { Block, ViewSpec } from '../render/registry';
import { fieldLabel, glance, type ViewContext } from './context';

export type CollectionDef = (typeof collections.collections)[number];

const TAB_KIND: Record<string, Kind> = { weapons: 'weapon', passives: 'passive', characters: 'character', stages: 'stage', arcanas: 'arcana', relics: 'relic', powerups: 'powerup' };

export function codexHeader(): Block[] {
  return [{ type: 'PageHeader', props: { title: t('codex.title') } }];
}

export function codexTabs(current: string): Block[] {
  const ids = [...collections.collections.map((c) => c.id), 'pairings'];
  return [
    {
      type: 'TabStrip',
      props: { label: t('codex.tabs'), tabs: ids.map((id) => ({ id, label: t(`collection.${id}`), href: `/codex/${id}`, current: id === current, kind: TAB_KIND[id] })) },
    },
  ];
}

export function toggleFilter(filters: Record<string, string[]>, facet: string, value: string) {
  const cur = filters[facet] ?? [];
  const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
  return { ...filters, [facet]: next };
}

const sortLabel = (f: string) => tOr(`sort.${f}`, fieldLabel(f));
/** The group value meaning "None" when a tab has a default grouping. */
const NO_GROUP = 'none';

/**
 * The Sort and Group by menus, as a file manager offers them: sort by any field, ascending or
 * descending (a new field starts in its natural order); group by none or a field. Shared by every
 * collection-like view.
 */
export function arrangeMenus(o: { sorts: string[]; sort: string; dir: Dir; groups: string[]; group: string | null; defaultGroup?: string; label?: (f: string) => string }) {
  const label = o.label ?? sortLabel;
  return {
    sort: {
      label: t('sort.label'),
      value: label(o.sort),
      sections: [
        { label: t('sort.by'), options: o.sorts.map((f) => ({ value: f, label: label(f) })), value: o.sort, onChange: (f: string) => update({ sort: f, dir: null }, { replace: true }) },
        { label: t('sort.dir'), options: (['asc', 'desc'] as const).map((d) => ({ value: d, label: t(`sort.${d}`) })), value: o.dir, onChange: (d: string) => update({ dir: d as Dir }, { replace: true }) },
      ],
    },
    group: o.groups.length
      ? {
          label: t('group.label'),
          value: o.group ? label(o.group) : t('group.off'),
          sections: [
            {
              label: t('group.label'),
              options: [{ value: '', label: t('group.off') }, ...o.groups.map((f) => ({ value: f, label: label(f) }))],
              value: o.group ?? '',
              // With a default grouping, None must be written down or the default comes back.
              onChange: (g: string) => update({ group: g === o.defaultGroup ? null : g || (o.defaultGroup ? NO_GROUP : null) }, { replace: true }),
            },
          ],
        }
      : undefined,
  };
}

export function codexView(c: ViewContext, def: CollectionDef): ViewSpec {
  const { route } = c;
  const mode = route.view && def.views.includes(route.view) ? route.view : def.defaultView;
  const sorts = [...new Set([...def.sorts, ...def.columns])];
  const sort = route.sort && sorts.includes(route.sort) ? route.sort : def.sorts[0];
  const dir = route.dir ?? defaultDir(sort);
  const defaultGroup = def.defaultGroup ?? undefined;
  const asked = route.group ?? defaultGroup ?? null;
  const group = asked && def.groups.includes(asked) ? asked : null;
  const all = c.ix.codex.entities.filter((e) => def.kinds.includes(e.kind));
  const res = query(all, { facets: def.facets, filters: route.filters, q: route.q, sort, dir, ctx: c.q });
  // A search must never surface a hidden secret by its name.
  const items = route.q ? res.items.filter((e) => !isHidden(e, c.prefs)) : res.items;
  const anyFilter = Object.values(route.filters).some((v) => v.length) || !!route.q;
  const groups = group ? groupItems(items, group, { dir, sort, ctx: c.q, hidden: (e) => isHidden(e, c.prefs) }) : null;

  const facts = (e: Entity) =>
    def.facts
      .map((f) => {
        const v = display(e, f, c.q);
        return v === '–' ? null : f.startsWith('stats.') ? `${fieldLabel(f)} ${v}` : v;
      })
      .filter((v): v is string => !!v);
  const row = (e: Entity) => {
    const g = glance(c, e);
    return { ref: e.ref, ...g, cells: def.columns.slice(1).map((f) => (g.hidden ? '–' : display(e, f, c.q))) };
  };
  const block = (e: Entity): Block => {
    const g = glance(c, e);
    if (mode === 'grid') return { type: 'EntityTile', key: e.ref, props: g };
    return { type: 'EntityRow', key: e.ref, props: { ...g, facts: g.hidden ? [] : facts(e), caption: mode === 'details' ? (g.hidden ? '' : (e.caption ?? '')) : undefined, picture: def.detailsPicture === 'banner' ? 'banner' : 'xl' } };
  };

  let results: Block[];
  if (!items.length) {
    results = [
      {
        type: 'EmptyState',
        props: { icon: 'search', message: t('empty.filtered'), live: true, action: anyFilter ? { label: t('filter.clear'), onPress: () => update({ filters: {}, q: '' }, { replace: true }) } : undefined },
      },
    ];
  } else if (mode === 'table') {
    results = [
      {
        type: 'EntityTable',
        props: {
          caption: t(`collection.${def.id}`),
          columns: def.columns.map((f) => ({ id: f, label: fieldLabel(f), numeric: isNumeric(f), resizeLabel: t('table.resize', { name: fieldLabel(f) }) })),
          groups: groups ? groups.map((g) => ({ key: g.key, label: g.label, count: String(g.items.length), rows: g.items.map(row) })) : [{ key: 'all', rows: items.map(row) }],
          sort: { field: sort, dir },
          onSort: (f) => update(f === sort ? { dir: dir === 'asc' ? 'desc' : 'asc' } : { sort: f, dir: null }, { replace: true }),
          widths: c.prefs.columns[def.id] ?? null,
          onWidths: (w) => store.setPrefs({ columns: { ...c.prefs.columns, [def.id]: w } }),
        },
      },
    ];
  } else {
    results = groups ? [] : items.map(block);
  }

  const count = tCount('count', items.length) + (res.hiddenByScope ? ` · ${t('scope.filteredCount', { n: res.hiddenByScope })}` : '');
  return {
    layout: 'Collection',
    header: codexHeader(),
    tabs: codexTabs(def.id),
    filters: def.facets.length
      ? [
          {
            type: 'FilterBar',
            props: {
              label: t('filter.label'),
              facets: res.facets.map((f) => ({ id: f.id, label: t(`filter.${f.id}`), options: f.options })),
              onToggle: (facet, value) => update({ filters: toggleFilter(route.filters, facet, value) }, { replace: true }),
              clear: Object.values(route.filters).some((v) => v.length) ? { label: t('filter.clear'), onPress: () => update({ filters: {} }, { replace: true }) } : null,
            },
          },
        ]
      : [],
    filtersLabel: t('filter.label'),
    filtersActive: Object.values(route.filters).reduce((n, v) => n + v.length, 0),
    toolbar: [
      {
        type: 'CollectionToolbar',
        props: {
          search: { label: t('search.label'), placeholder: t('search.placeholder'), value: route.q, onInput: (q) => update({ q }, { replace: true }) },
          views: { label: t('view.label'), options: def.views.map((v) => ({ value: v, label: t(`view.${v}`), icon: v as 'grid' })), value: mode, onChange: (view) => update({ view }, { replace: true }) },
          ...arrangeMenus({ sorts, sort, dir, groups: def.groups, group, defaultGroup }),
          count,
        },
      },
    ],
    mode: mode === 'table' ? 'table' : mode === 'grid' ? 'grid' : 'list',
    resultsLabel: t(`collection.${def.id}`),
    results,
    groups:
      groups && items.length && mode !== 'table'
        ? groups.map((g) => ({ key: g.key, label: g.label, count: String(g.items.length), countLabel: tCount('count', g.items.length), blocks: g.items.map(block) }))
        : undefined,
  };
}
