/** The composition root: loads the codex, reads the address and the store, picks the view spec and renders it in the shell. */
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { t } from './copy/t';
import collections from './data/collections.json';
import { useDetail } from './data/detail';
import { index, type Index } from './data/query';
import { BASE, useRoute } from './data/router';
import { useStore, effectiveScheme, store } from './data/store';
import type { Codex } from './data/types';
import { blocks, renderOverlay, renderView, type ViewSpec } from './render/registry';
import { Shell } from './shell/Shell';
import { codexView } from './views/codex';
import { contextOf } from './views/context';
import { homeView, navBlock, settingsView, soonView, statusView } from './views/pages';
import { pairingsView } from './views/pairings';
import { emptyInspector, overviewInspector, peekOverlay } from './views/peek';

type Load = { ix: Index } | { failed: true } | null;

export function App() {
  const route = useRoute();
  const { prefs, marks } = useStore();
  const [load, setLoad] = useState<Load>(null);
  // Only the Codex has items to show in detail; elsewhere the peek is ignored. With nothing picked,
  // the detail column shows the tab's own page.
  const inCodex = route.section === 'codex';
  const tab = route.tab ?? 'weapons';
  const detail = useDetail(inCodex && load && 'ix' in load ? (route.peek ?? `category:${tab}`) : null);

  useEffect(() => {
    fetch(`${BASE}data/codex.json`)
      .then((r) => (r.ok ? (r.json() as Promise<Codex>) : Promise.reject(new Error(String(r.status)))))
      .then((codex) => setLoad({ ix: index(codex) }))
      .catch(() => setLoad({ failed: true }));
  }, []);

  const ix = load && 'ix' in load ? load.ix : null;
  const c = useMemo(() => (ix ? contextOf(ix, route, prefs, marks) : null), [ix, route, prefs, marks]);

  let view: ViewSpec;
  let title = t('app.name');
  if (!c) view = statusView(t(load ? 'data.failed' : 'data.loading'), !!load);
  else if (route.section === 'codex') {
    const def = collections.collections.find((x) => x.id === tab);
    view = def ? codexView(c, def) : pairingsView(c);
    title = t(`collection.${def ? def.id : 'pairings'}`);
  } else if (route.section === 'settings') {
    view = settingsView(c);
    title = t('settings.title');
  } else if (['unlocks', 'builds', 'progress'].includes(route.section)) {
    view = soonView(route.section);
    title = t(`${route.section}.title`);
  } else view = homeView(c);

  const overlay = !inCodex || !c ? null : route.peek ? (peekOverlay(c, route.peek, detail) ?? emptyInspector()) : overviewInspector(c, tab, detail);

  useEffect(() => {
    document.title = title === t('app.name') ? title : `${title} · ${t('app.name')}`;
  }, [title]);

  // A new destination starts at the top; filters, views and the peek keep the scroll.
  // The page scrolls on compact windows, the main region from medium up.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('main')?.scrollTo(0, 0);
  }, [route.path]);

  // Closing a peek returns focus to the glance that opened it.
  const lastPeek = useRef<string | null>(null);
  useEffect(() => {
    const closed = lastPeek.current;
    lastPeek.current = route.peek;
    if (closed && !route.peek) document.querySelector<HTMLElement>(`main a[href$="peek=${CSS.escape(closed)}"]`)?.focus();
  }, [route.peek]);

  return (
    <Shell
      skipLabel={t('nav.skip')}
      nav={blocks([navBlock(route.section, effectiveScheme(prefs.scheme))])}
      main={renderView(view)}
      detail={overlay ? renderOverlay(overlay) : null}
      listWidth={prefs.list}
      resizeLabel={t('inspector.resize')}
      onResize={(list) => store.setPrefs({ list })}
    />
  );
}
