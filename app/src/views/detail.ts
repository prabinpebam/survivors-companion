/**
 * Views: an item's full source page as detail sections, closed to one line each until opened.
 * The order is the glance's backstory (About), every infobox fact (All stats), then the page's own
 * sections in source order. Which sections are open is remembered per kind of item. A Codex tab's
 * own page (its overview) uses the same sections, with its lead shown open above them.
 */
import { t, tCount } from '../copy/t';
import { isMechanics, withCards } from '../data/cards';
import { firstSentence, infoboxBlocks, measure, plain, type DetailLoad, type RichBlock, type Section } from '../data/detail';
import { store } from '../data/store';
import type { Entity } from '../data/types';
import type { Block, OverlaySpec } from '../render/registry';
import { peekHref, type ViewContext } from './context';

type Part = { id: string; title: string; blocks: RichBlock[]; teaser?: string };

/** A section's subsections join it under their own subheadings. */
const flatten = (s: Section): RichBlock[] => [...s.blocks, ...s.subs.flatMap((x) => [{ k: 'h' as const, c: [x.title] }, ...x.blocks])];

/** One line about what a section holds: its first sentence, or how many rows or pictures it has. */
export function teaser(blocks: RichBlock[]): string {
  const m = measure(blocks);
  const counts = [m.rows && tCount('detail.rows', m.rows), m.pictures && tCount('detail.pictures', m.pictures)].filter(Boolean) as string[];
  const sentence = firstSentence(blocks);
  if (counts.length && (!sentence || m.rows > 0)) return counts.join(' · ');
  if (sentence) return sentence;
  for (const b of blocks) if (b.k === 'ul' || b.k === 'ol') return plain(b.items[0].c);
  const heads = blocks.flatMap((b) => (b.k === 'h' ? [plain(b.c)] : []));
  return heads.join(' · ');
}

function parts(load: Extract<DetailLoad, { status: 'ready' }>, lead: boolean): Part[] {
  const d = load.detail;
  const facts = d.infobox.reduce((n, g) => n + g.rows.length, 0);
  return [
    ...(lead && d.lead.length ? [{ id: 'about', title: t('detail.about'), blocks: d.lead }] : []),
    ...(facts ? [{ id: 'stats', title: t('detail.stats'), blocks: infoboxBlocks(d.infobox), teaser: tCount('detail.facts', facts) }] : []),
    ...d.sections.map((s) => ({ id: s.id, title: s.title, blocks: flatten(s) })),
  ];
}

const status = (key: string): Block[] => [{ type: 'Text', props: { variant: 'muted', as: 'p', children: t(key) } }];

type Shared = { hrefFor: (ref: string) => string; marks: { yes: string; no: string }; more: { all: (n: number) => string; fewer: string } };
/** What every block of rich cards or text needs from the view: links, tick words, show-all labels. */
export const sharedOf = (c: ViewContext): Shared => ({
  hrefFor: (ref: string) => peekHref(c, ref),
  marks: { yes: t('detail.yes'), no: t('detail.no') },
  more: { all: (n: number) => t('detail.showAll', { n }), fewer: t('detail.showFewer') },
});

/** A section's content: its cards as RichCards, its waves as WaveCards, the runs of blocks between them as RichContent. */
function content(key: string, p: Part, self: string, shared: Shared): Block[] {
  const out: Block[] = [];
  let run: RichBlock[] = [];
  const flush = () => {
    if (run.length) out.push({ type: 'RichContent', key: `${key}-${out.length}`, props: { blocks: run, ...shared } });
    run = [];
  };
  for (const b of withCards(p.blocks, { points: isMechanics(p.title), self })) {
    if (b.k === 'cards') {
      flush();
      out.push({ type: 'RichCards', key: `${key}-${out.length}`, props: { look: b.look, items: b.items, caption: b.caption, ...shared } });
    } else if (b.k === 'waves') {
      flush();
      out.push({ type: 'WaveCards', key: `${key}-${out.length}`, props: { labels: b.labels, items: b.items, seconds: (n: string) => t('detail.seconds', { n }), ...shared } });
    } else run.push(b);
  }
  flush();
  return out;
}

/** Whose page it is: an item, or a Codex tab's own page (`category:<tab>`, kind `overview`). */
type Owner = Pick<Entity, 'ref'> & { kind: string };

/** A page's lead, shown open above its sections (a tab's overview starts with its introduction). */
export function leadBlocks(c: ViewContext, owner: Owner, load: DetailLoad | null): Block[] {
  if (load?.status !== 'ready') return [];
  return content(`${owner.ref}-lead`, { id: 'lead', title: '', blocks: load.detail.lead }, owner.ref, sharedOf(c));
}

/** The page's sections; `lead: false` when the lead already shows above them. */
export function detailSections(c: ViewContext, e: Owner, load: DetailLoad | null, lead = true): Pick<OverlaySpec, 'sectionsHead' | 'sections' | 'sectionsStatus' | 'onSection'> {
  if (!load || load.status === 'loading') return { sectionsStatus: status('detail.loading') };
  if (load.status === 'failed') return { sectionsStatus: status('detail.failed') };
  const list = parts(load, lead);
  if (!list.length) return {};
  const open = new Set(c.prefs.open[e.kind] ?? []);
  const setOpen = (ids: string[]) => store.setPrefs({ open: { ...store.get().prefs.open, [e.kind]: ids } });
  const current = () => store.get().prefs.open[e.kind] ?? [];
  const allOpen = list.every((p) => open.has(p.id));
  const shared = sharedOf(c);
  return {
    sectionsHead: [
      { type: 'Text', props: { variant: 'heading', as: 'h3', children: t('detail.title') } },
      {
        type: 'Button',
        props: {
          variant: 'quiet',
          icon: allOpen ? 'up' : 'down',
          onPress: () => setOpen(allOpen ? current().filter((id) => !list.some((p) => p.id === id)) : [...new Set([...current(), ...list.map((p) => p.id)])]),
          children: t(allOpen ? 'detail.closeAll' : 'detail.openAll'),
        },
      },
    ],
    sections: list.map((p) => ({
      id: p.id,
      title: p.title,
      teaser: p.teaser ?? teaser(p.blocks),
      open: open.has(p.id),
      blocks: content(`${e.ref}-${p.id}`, p, e.ref, shared),
    })),
    onSection: (id, isOpen) => setOpen(isOpen ? [...new Set([...current(), id])] : current().filter((x) => x !== id)),
  };
}
