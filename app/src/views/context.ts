/** Views: what every view reads, and small mappings from an entity to glance props. Data only, no markup. */
import type { Kind } from '../design/icons';
import { t } from '../copy/t';
import { isHidden, type Context, type Index } from '../data/query';
import { href, type Route } from '../data/router';
import type { Prefs } from '../data/store';
import type { Entity, MarkState } from '../data/types';

export type ViewContext = { ix: Index; route: Route; prefs: Prefs; marks: Record<string, MarkState>; q: Context };

export function contextOf(ix: Index, route: Route, prefs: Prefs, marks: Record<string, MarkState>): ViewContext {
  return { ix, route, prefs, marks, q: { ix, marks, packs: prefs.packs } };
}

export function markOf(c: ViewContext, ref: string) {
  const state = c.marks[ref] ?? null;
  return { state, label: t(`mark.state.${state ?? 'none'}`) };
}

export const peekHref = (c: ViewContext, ref: string) => href({ ...c.route, peek: ref });

/** The glance identity of an entity, with hidden secrets reduced to the keyhole. */
export function glance(c: ViewContext, e: Entity) {
  const hidden = isHidden(e, c.prefs);
  return {
    name: hidden ? t('hidden.tile') : e.name,
    kind: (hidden ? 'secret' : e.kind) as Kind,
    kindLabel: t(hidden ? 'kind.secret' : `kind.${e.kind}`),
    sprite: hidden ? null : e.sprite,
    href: peekHref(c, e.ref),
    selected: c.route.peek === e.ref,
    mark: markOf(c, e.ref),
    hidden,
  };
}

/** A field label for tables and fact lists. */
export const fieldLabel = (field: string) => t(field.startsWith('stats.') ? `stat.${field.slice(6)}` : `col.${field}`);
