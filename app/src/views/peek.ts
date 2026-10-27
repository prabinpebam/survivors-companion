/**
 * Views: the detail for one item. The glance first (the answer: pairing, start, unlock; key facts;
 * the mark), then the full source page as sections, then where it comes from.
 */
import { t } from '../copy/t';
import collections from '../data/collections.json';
import { display, isHidden, pairings } from '../data/query';
import type { DetailLoad } from '../data/detail';
import { href, navigate } from '../data/router';
import { store } from '../data/store';
import type { Entity, MarkState } from '../data/types';
import type { Block, OverlaySpec } from '../render/registry';
import { fieldLabel, glance, markOf, type ViewContext } from './context';
import { detailSections, leadBlocks, sharedOf } from './detail';
import { recipeBlock } from './pairings';

const WIKI = 'https://vampire.survivors.wiki/w/';
const label = (key: string): Block => ({ type: 'Text', props: { variant: 'heading', as: 'h3', children: t(key) } });
const status = (key: string): Block => ({ type: 'Text', props: { variant: 'muted', as: 'p', children: t(key) } });

function answer(c: ViewContext, e: Entity): Block[] {
  const { uses, makes } = pairings(c.ix, e.ref);
  switch (e.kind) {
    case 'weapon':
    case 'passive': {
      const head = e.kind === 'weapon' ? 'answer.requires' : 'answer.pairsWith';
      if (!uses.length && !makes.length) return [label(head), status('answer.none')];
      return [label(head), ...uses.map((r) => recipeBlock(c, r, e.ref)), ...(makes.length ? [label('answer.madeFrom'), ...makes.map((r) => recipeBlock(c, r, e.ref))] : [])];
    }
    case 'evolution': {
      const out: Block[] = [label('answer.madeFrom'), ...(makes.length ? makes.map((r) => recipeBlock(c, r, e.ref)) : [status('answer.none')])];
      if (uses.length) out.push(label('answer.becomes'), ...uses.map((r) => recipeBlock(c, r, e.ref)));
      return out;
    }
    case 'character': {
      const starts = e.startingWeapons.map((ref) => c.ix.byRef.get(ref)).filter((w): w is Entity => !!w);
      return [
        label('peek.starts'),
        ...starts.map((w): Block => ({ type: 'EntityRow', key: w.ref, props: { ...glance(c, w), facts: [] } })),
        ...(e.unlock ? [{ type: 'ProseBlock', props: { items: [{ lead: t('peek.unlock'), text: e.unlock }] } } as Block] : []),
      ];
    }
    case 'arcana': {
      const out: Block[] = [];
      if (e.affects.length) {
        const items = e.affects.map((a) => ({ c: [], name: a.name, r: a.ref ?? undefined, pic: a.pic ? { ...a.pic, a: a.name } : undefined }));
        out.push(label('peek.affects'), { type: 'RichCards', props: { look: 'tiles', items, ...sharedOf(c) } });
      }
      const prose = [...(e.unlock ? [{ lead: t('peek.unlock'), text: e.unlock }] : []), ...(e.notes ? [{ lead: t('peek.notes'), text: e.notes }] : [])];
      if (prose.length) out.push({ type: 'ProseBlock', props: { items: prose } });
      return out;
    }
    case 'relic':
      return [{ type: 'ProseBlock', props: { items: [...(e.effects ? [{ lead: t('peek.effect'), text: e.effects }] : []), ...(e.location ? [{ lead: t('peek.location'), text: e.location }] : [])] } }];
    default:
      return [];
  }
}

function facts(c: ViewContext, e: Entity): { label: string; value: string; numeric?: boolean }[] {
  const f = (field: string, numeric = false) => ({ label: fieldLabel(field), value: display(e, field, c.q), numeric });
  const keep = <T extends { value: string }>(list: T[]) => list.filter((x) => x.value !== '–');
  switch (e.kind) {
    case 'weapon':
    case 'evolution':
      return keep([...['damage', 'cooldown', 'area', 'amount', 'pierce'].map((s) => f(`stats.${s}`, true)), f('maxLevel', true)]).slice(0, 6);
    case 'passive':
      return keep([f('stat'), f('perLevel'), f('maxEffect'), f('maxLevel', true)]);
    case 'character':
      return e.stats.slice(0, 5).map((s) => ({ label: s.name, value: String(s.value), numeric: true }));
    case 'stage':
      return keep([f('stageType'), f('timeLimit', true), ...Object.entries(e.modifiers).slice(0, 3).map(([k, v]) => ({ label: k.replace(/_/g, ' ').replace(/^\w/, (x) => x.toUpperCase()).replace(/\bxp\b/i, 'XP'), value: `×${v}`, numeric: true }))]);
    case 'powerup':
      return keep([f('maxRank', true), f('bonus', true), f('cost', true)]);
    default:
      return [];
  }
}

export function peekOverlay(c: ViewContext, ref: string, load: DetailLoad | null): OverlaySpec | null {
  const e = c.ix.byRef.get(ref);
  if (!e) return null;
  const closeHref = href({ ...c.route, peek: null });
  const onClose = () => navigate(closeHref);
  const hidden = isHidden(e, c.prefs);
  const g = glance(c, e);
  const def = collections.collections.find((col) => col.kinds.includes(e.kind));
  const cover = !hidden && g.sprite !== null && def !== undefined && 'headerPicture' in def && def.headerPicture === 'cover';
  // An arcana's own type (Arcana or Darkana) says more than its kind.
  const kindLine = e.kind === 'arcana' && e.arcanaType ? e.arcanaType : g.kindLabel;
  const hero: Block[] = [
    {
      type: 'PeekHeader',
      props: { name: g.name, kind: g.kind, meta: hidden ? [] : [kindLine, c.ix.packName.get(e.pack) ?? e.pack], sprite: g.sprite, hidden, icon: !cover, headingId: 'peek-title', close: { label: t('peek.close'), href: closeHref } },
    },
  ];
  if (hidden) {
    return {
      layout: 'Inspector', itemKey: e.ref, labelledBy: 'peek-title', closeHref, onClose, hero,
      answer: [status('reveal.hint'), { type: 'Button', props: { variant: 'primary', icon: 'eye', onPress: () => store.reveal(e.ref), children: t('reveal.item') } }],
      facts: [], actions: [], proof: [],
    };
  }
  const mark = markOf(c, e.ref);
  const set = (m: MarkState) => () => store.setMark(e.ref, mark.state === m ? null : m);
  const list = facts(c, e);
  return {
    layout: 'Inspector',
    itemKey: e.ref,
    labelledBy: 'peek-title',
    closeHref,
    onClose,
    hero,
    media: cover ? [{ type: 'Sprite', props: { sprite: g.sprite, kind: g.kind, name: g.name, size: 'cover' } }] : undefined,
    answer: answer(c, e),
    ...detailSections(c, e, load),
    facts: [...(list.length ? [{ type: 'FactList', props: { facts: list } } as Block] : []), ...(e.caption ? [{ type: 'ProseBlock', props: { items: [{ text: e.caption }] } } as Block] : [])],
    actions: [
      {
        type: 'MarkActions',
        props: {
          label: t('mark.actions'),
          state: mark.state,
          stateLabel: mark.label,
          actions: [
            { id: 'unlocked', label: t('mark.done'), icon: 'check', pressed: mark.state === 'unlocked', onPress: set('unlocked') },
            { id: 'skipped', label: t('mark.skip'), icon: 'skip', pressed: mark.state === 'skipped', onPress: set('skipped') },
          ],
        },
      },
    ],
    proof: e.source ? sourceProof(e.source) : [],
  };
}

/** Where a page's facts come from: the snapshot date and a link to the live page. */
function sourceProof(source: { title: string; edited: string }): Block[] {
  return [
    { type: 'Text', props: { variant: 'muted', as: 'p', children: t('source.snapshot', { date: source.edited.slice(0, 10) }) } },
    { type: 'Button', props: { variant: 'quiet', href: WIKI + encodeURIComponent(source.title.replace(/ /g, '_')), external: true, children: t('source.visit') } },
  ];
}

/**
 * The detail column with nothing picked in a Codex tab: the tab's own page (what weapons are, how
 * they level and evolve…) without the list the tab already shows. Its introduction is open; the
 * rest is sections. Docked only; falls back to the empty state when the page isn't there.
 */
export function overviewInspector(c: ViewContext, tab: string, load: DetailLoad | null): OverlaySpec {
  if (load?.status === 'failed') return emptyInspector();
  const name = t(`collection.${tab}`);
  const owner = { ref: `category:${tab}`, kind: 'overview' };
  const source = load?.status === 'ready' ? load.detail.source : null;
  return {
    layout: 'Inspector',
    itemKey: owner.ref,
    resting: true,
    label: t('overview.name', { name }),
    hero: [{ type: 'Text', props: { variant: 'title', as: 'h2', children: name } }],
    answer: leadBlocks(c, owner, load),
    ...detailSections(c, owner, load, false),
    facts: [],
    actions: [],
    proof: source ? sourceProof(source) : [],
  };
}

/** The detail column with nothing picked: what will show here. */
export function emptyInspector(): OverlaySpec {
  return {
    layout: 'Inspector',
    itemKey: '',
    label: t('inspector.name'),
    hero: [{ type: 'EmptyState', props: { icon: 'details', message: t('inspector.empty') } }],
    answer: [],
    facts: [],
    actions: [],
    proof: [],
  };
}
