/** Tier 0: the address is the state. Path picks the destination; the query holds view, sort, filters, search and the open peek. */
import { options } from 'preact';
import { useEffect, useState } from 'preact/hooks';

/**
 * Where the app is served ("/" locally, "/survivors-companion/" on GitHub Pages). App paths stay
 * root-relative ("/codex/weapons"); the base is added when an address leaves the app (a link's
 * href, the history entry, a file URL) and removed when one comes in.
 */
export const BASE = import.meta.env.BASE_URL;
export const withBase = (p: string) => (BASE !== '/' && p.startsWith('/') && !p.startsWith('//') ? BASE + p.slice(1) : p);
const appPath = (p: string) => (BASE !== '/' && (p + '/').startsWith(BASE) ? '/' + p.slice(BASE.length) : p);
const here = () => ({ pathname: appPath(location.pathname), search: location.search });

if (BASE !== '/') {
  const prev = options.vnode;
  options.vnode = (v) => {
    const props = v.props as { href?: unknown };
    if (v.type === 'a' && typeof props.href === 'string') props.href = withBase(props.href);
    prev?.(v);
  };
}

export type Route = {
  path: string;
  section: string;
  tab: string | null;
  view: string | null;
  sort: string | null;
  /** Sort direction; null means the sort field's natural direction. */
  dir: 'asc' | 'desc' | null;
  /** The field results are grouped by; null means no groups. */
  group: string | null;
  q: string;
  filters: Record<string, string[]>;
  peek: string | null;
};

export function parse(loc: { pathname: string; search: string }): Route {
  const parts = loc.pathname.split('/').filter(Boolean);
  const p = new URLSearchParams(loc.search);
  const filters: Record<string, string[]> = {};
  for (const f of (p.get('f') ?? '').split(',').filter(Boolean)) {
    const i = f.indexOf(':');
    if (i < 0) continue;
    (filters[f.slice(0, i)] ??= []).push(f.slice(i + 1));
  }
  return {
    path: loc.pathname,
    section: parts[0] ?? 'home',
    tab: parts[1] ?? null,
    view: p.get('view'),
    sort: p.get('sort'),
    dir: p.get('dir') === 'asc' || p.get('dir') === 'desc' ? (p.get('dir') as 'asc' | 'desc') : null,
    group: p.get('group'),
    q: p.get('q') ?? '',
    filters,
    peek: p.get('peek'),
  };
}

export function href(r: Partial<Route> & { path: string }): string {
  const p = new URLSearchParams();
  if (r.view) p.set('view', r.view);
  if (r.sort) p.set('sort', r.sort);
  if (r.dir) p.set('dir', r.dir);
  if (r.group) p.set('group', r.group);
  if (r.q) p.set('q', r.q);
  const f = Object.entries(r.filters ?? {}).flatMap(([k, vs]) => vs.map((v) => `${k}:${v}`));
  if (f.length) p.set('f', f.join(','));
  if (r.peek) p.set('peek', r.peek);
  const qs = p.toString().replace(/%3A/g, ':').replace(/%2C/g, ',');
  return qs ? `${r.path}?${qs}` : r.path;
}

const listeners = new Set<() => void>();
window.addEventListener('popstate', () => listeners.forEach((l) => l()));

/** Goes to an address; replace keeps typing and toggles out of the back stack. */
export function navigate(to: string, opts: { replace?: boolean } = {}) {
  const now = here();
  if (to === now.pathname + now.search) return;
  history[opts.replace ? 'replaceState' : 'pushState'](null, '', withBase(to));
  listeners.forEach((l) => l());
}

/** Changes part of the current address. */
export function update(patch: Partial<Route>, opts: { replace?: boolean } = {}) {
  const cur = parse(here());
  navigate(href({ ...cur, ...patch }), opts);
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(here()));
  useEffect(() => {
    const on = () => setRoute(parse(here()));
    listeners.add(on);
    return () => listeners.delete(on);
  }, []);
  return route;
}

/** Turns a same-origin link press into an in-app navigation. */
export function onLink(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = (e.target as Element).closest('a');
  if (!a || a.target || a.origin !== location.origin) return;
  e.preventDefault();
  navigate(appPath(a.pathname) + a.search);
}
