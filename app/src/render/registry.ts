/**
 * Views from data: the registry of block types a view may name, the view-spec shapes per layout,
 * and the renderer that resolves a spec into a layout with its regions filled.
 * A view never imports a component or a layout; it returns a ViewSpec. Unknown block types and
 * wrong props fail the type check, not the render.
 */
import { h, type ComponentChildren, type ComponentType } from 'preact';
import { AppNav } from '../components/compounds/AppNav';
import { ChoiceGroup } from '../components/compounds/ChoiceGroup';
import { CollectionToolbar } from '../components/compounds/CollectionToolbar';
import { EmptyState } from '../components/compounds/EmptyState';
import { EntityRow } from '../components/compounds/EntityRow';
import { EntityTable } from '../components/compounds/EntityTable';
import { EntityTile } from '../components/compounds/EntityTile';
import { FactList } from '../components/compounds/FactList';
import { FilterBar } from '../components/compounds/FilterBar';
import { PageHeader } from '../components/compounds/PageHeader';
import { PeekHeader } from '../components/compounds/PeekHeader';
import { ProseBlock } from '../components/compounds/ProseBlock';
import { RecipeCard } from '../components/compounds/RecipeCard';
import { RichCards } from '../components/compounds/RichCards';
import { RichContent } from '../components/compounds/RichContent';
import { TabStrip } from '../components/compounds/TabStrip';
import { WaveCards } from '../components/compounds/WaveCards';
import { Button } from '../components/fundamentals/Button';
import { Segmented } from '../components/fundamentals/Segmented';
import { Sprite } from '../components/fundamentals/Sprite';
import { Text } from '../components/fundamentals/Text';
import { Collection } from '../layouts/Collection';
import { Hub } from '../layouts/Hub';
import { Inspector } from '../layouts/Inspector';
import { Settings } from '../layouts/Settings';

export const REGISTRY = {
  AppNav,
  ChoiceGroup,
  CollectionToolbar,
  EmptyState,
  EntityRow,
  EntityTable,
  EntityTile,
  FactList,
  FilterBar,
  PageHeader,
  PeekHeader,
  ProseBlock,
  RecipeCard,
  RichCards,
  RichContent,
  TabStrip,
  WaveCards,
  Button,
  Segmented,
  Sprite,
  Text,
};

type Registry = typeof REGISTRY;
type PropsOf<C> = C extends ComponentType<infer P> ? P : C extends (p: infer P) => unknown ? P : never;

/** One block in a region: a registered type, its props, and an optional key for lists. */
export type Block = { [K in keyof Registry]: { type: K; key?: string; props: PropsOf<Registry[K]> } }[keyof Registry];
type Blocks = Block[];

export type ViewSpec =
  | { layout: 'Hub'; header: Blocks; modules: { key: string; heading?: string; wide?: boolean; blocks: Blocks }[] }
  | {
      layout: 'Collection';
      header: Blocks;
      tabs: Blocks;
      filters: Blocks;
      filtersLabel?: string;
      filtersActive?: number;
      toolbar: Blocks;
      mode: 'grid' | 'list' | 'table';
      resultsLabel: string;
      results: Blocks;
      groups?: { key: string; label: string; count: string; countLabel: string; blocks: Blocks }[];
    }
  | { layout: 'Settings'; header: Blocks; groups: { key: string; heading: string; hint?: string; blocks: Blocks }[] };

export type OverlaySpec = {
  layout: 'Inspector';
  /** The item shown; empty for the detail column's empty state. */
  itemKey: string;
  /** Shown while nothing is picked (a tab's overview): docked only, never a sheet. */
  resting?: boolean;
  labelledBy?: string;
  label?: string;
  closeHref?: string;
  onClose?: () => void;
  hero: Blocks;
  /** The item's picture as content under the identity, when the tab shows it as a cover. */
  media?: Blocks;
  answer: Blocks;
  facts: Blocks;
  actions: Blocks;
  /** The full page: a head (heading and open-all), the sections, or a status while they load. */
  sectionsHead?: Blocks;
  sections?: { id: string; title: string; teaser: string; open: boolean; blocks: Blocks }[];
  sectionsStatus?: Blocks;
  onSection?: (id: string, open: boolean) => void;
  proof: Blocks;
};

/** Renders a region's blocks through the registry. */
export function blocks(list: Blocks): ComponentChildren {
  return list.map((b, i) => h(REGISTRY[b.type] as ComponentType<object>, { key: b.key ?? `${b.type}-${i}`, ...b.props }));
}

const some = (list: Blocks) => (list.length ? blocks(list) : undefined);

export function renderView(v: ViewSpec): ComponentChildren {
  switch (v.layout) {
    case 'Hub':
      return h(Hub, { header: blocks(v.header), modules: v.modules.map((m) => ({ key: m.key, heading: m.heading, wide: m.wide, content: blocks(m.blocks) })) });
    case 'Collection':
      return h(Collection, {
        header: blocks(v.header),
        tabs: blocks(v.tabs),
        filters: some(v.filters),
        filtersLabel: v.filtersLabel,
        filtersActive: v.filtersActive,
        toolbar: blocks(v.toolbar),
        mode: v.mode,
        resultsLabel: v.resultsLabel,
        results: blocks(v.results),
        groups: v.groups?.map((g) => ({ key: g.key, label: g.label, count: g.count, countLabel: g.countLabel, content: blocks(g.blocks) })),
      });
    case 'Settings':
      return h(Settings, { header: blocks(v.header), groups: v.groups.map((g) => ({ key: g.key, heading: g.heading, hint: g.hint, content: blocks(g.blocks) })) });
  }
}

export function renderOverlay(o: OverlaySpec): ComponentChildren {
  return h(Inspector, {
    itemKey: o.itemKey,
    resting: o.resting,
    labelledBy: o.labelledBy,
    label: o.label,
    closeHref: o.closeHref,
    onClose: o.onClose,
    hero: blocks(o.hero),
    media: o.media && some(o.media),
    answer: some(o.answer),
    facts: some(o.facts),
    actions: some(o.actions),
    sectionsHead: o.sectionsHead && some(o.sectionsHead),
    sections: o.sections?.map((x) => ({ id: x.id, title: x.title, teaser: x.teaser, open: x.open, content: x.open ? blocks(x.blocks) : null })),
    sectionsStatus: o.sectionsStatus && some(o.sectionsStatus),
    onSection: o.onSection,
    proof: some(o.proof),
  });
}
