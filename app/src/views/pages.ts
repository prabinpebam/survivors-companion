/** Views: Home, the not-yet-built destinations, Settings and the app navigation, all as data. */
import type { IconName } from '../design/icons';
import { t } from '../copy/t';
import collections from '../data/collections.json';
import { store, type Scheme } from '../data/store';
import type { Block, ViewSpec } from '../render/registry';
import type { ViewContext } from './context';

const header = (title: string, meta?: string): Block[] => [{ type: 'PageHeader', props: { title, meta } }];

export function navBlock(section: string, scheme: 'light' | 'dark'): Block {
  return {
    type: 'AppNav',
    props: {
      appName: t('app.name'),
      tag: t('app.prototype'),
      label: t('nav.main'),
      items: collections.nav.map((n) => ({ id: n.id, label: t(`nav.${n.id}`), icon: n.icon as IconName, href: n.path, current: n.id === section })),
      settings: { label: t('nav.settings'), href: '/settings', current: section === 'settings' },
      theme: { label: t('nav.dark'), dark: scheme === 'dark', onToggle: () => store.setPrefs({ scheme: scheme === 'dark' ? 'light' : 'dark' }) },
    },
  };
}

export function homeView(c: ViewContext): ViewSpec {
  const marked = Object.values(c.marks).filter((m) => m === 'unlocked').length;
  return {
    layout: 'Hub',
    header: header(t('app.name'), t('app.unofficial')),
    modules: [
      {
        key: 'start',
        heading: t('home.startHere'),
        wide: true,
        blocks: collections.collections.map((col): Block => ({ type: 'Button', key: col.id, props: { href: `/codex/${col.id}`, icon: 'codex', children: t(`collection.${col.id}`) } })),
      },
      {
        key: 'pairings',
        heading: t('collection.pairings'),
        blocks: [
          { type: 'Text', props: { variant: 'muted', as: 'p', children: t('home.pairingsHint') } },
          { type: 'Button', props: { variant: 'primary', href: '/codex/pairings', icon: 'pairings', children: t('home.openPairings') } },
        ],
      },
      {
        key: 'marks',
        heading: t('home.marks'),
        blocks: [
          { type: 'Text', props: { variant: 'number', as: 'p', children: t('home.markCount', { n: marked }) } },
          { type: 'Button', props: { href: '/progress', icon: 'progress', children: t('home.openProgress') } },
        ],
      },
    ],
  };
}

const SOON: Record<string, IconName> = { unlocks: 'unlocks', builds: 'builds', progress: 'progress' };

export function soonView(section: string): ViewSpec {
  return {
    layout: 'Hub',
    header: header(t(`${section}.title`)),
    modules: [
      {
        key: 'soon',
        wide: true,
        blocks: [{ type: 'EmptyState', props: { icon: SOON[section] ?? 'codex', message: t(`soon.${section}`), action: { label: t('soon.openCodex'), href: '/codex/weapons', icon: 'codex' } } }],
      },
    ],
  };
}

export function settingsView(c: ViewContext): ViewSpec {
  const { prefs } = c;
  const packs = c.ix.codex.packs;
  const owned = (id: string) => !prefs.packs || prefs.packs.includes(id);
  const togglePack = (id: string) => {
    const cur = packs.map((p) => p.id).filter(owned);
    const next = cur.includes(id) ? cur.filter((p) => p !== id) : [...cur, id];
    store.setPrefs({ packs: next.length === packs.length ? null : next });
  };
  return {
    layout: 'Settings',
    header: header(t('settings.title')),
    groups: [
      {
        key: 'appearance',
        heading: t('settings.appearance'),
        blocks: [
          {
            type: 'Segmented',
            props: {
              label: t('settings.scheme'),
              options: (['system', 'light', 'dark'] as const).map((v) => ({ value: v, label: t(`scheme.${v}`) })),
              value: prefs.scheme,
              onChange: (v) => store.setPrefs({ scheme: v as Scheme }),
            },
          },
        ],
      },
      {
        key: 'content',
        heading: t('settings.content'),
        hint: t('settings.contentHint'),
        blocks: [{ type: 'ChoiceGroup', props: { legend: t('settings.packs'), name: 'packs', type: 'checkbox', options: packs.map((p) => ({ value: p.id, label: p.name, checked: owned(p.id) })), onChange: togglePack } }],
      },
      {
        key: 'spoilers',
        heading: t('settings.spoilers'),
        blocks: [
          {
            type: 'ChoiceGroup',
            props: {
              legend: t('settings.secrets'),
              name: 'spoilers',
              type: 'radio',
              options: [
                { value: 'hide', label: t('spoilers.hideSecrets'), checked: prefs.spoilers === 'hide' },
                { value: 'show', label: t('spoilers.showAll'), checked: prefs.spoilers === 'show' },
              ],
              onChange: (v) => store.setPrefs({ spoilers: v as 'hide' | 'show', revealed: v === 'hide' ? [] : prefs.revealed }),
            },
          },
        ],
      },
      { key: 'data', heading: t('settings.data'), blocks: [{ type: 'Text', props: { variant: 'muted', as: 'p', children: t('storage.saved') } }] },
      {
        key: 'about',
        heading: t('settings.about'),
        blocks: [
          { type: 'Text', props: { as: 'p', children: t('app.unofficial') } },
          { type: 'Text', props: { variant: 'muted', as: 'p', children: c.ix.codex.snapshot.licence } },
          { type: 'Button', props: { variant: 'quiet', href: c.ix.codex.snapshot.source, external: true, children: t('about.wiki') } },
          { type: 'Button', props: { variant: 'quiet', href: 'https://creativecommons.org/licenses/by-nc-sa/3.0/', external: true, children: t('about.licence') } },
        ],
      },
    ],
  };
}

export function statusView(message: string, failed: boolean): ViewSpec {
  return {
    layout: 'Hub',
    header: header(t('app.name')),
    modules: [{ key: 'status', wide: true, blocks: [{ type: 'EmptyState', props: { icon: failed ? 'close' : 'codex', message, live: true } }] }],
  };
}
