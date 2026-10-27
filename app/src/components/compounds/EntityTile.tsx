/**
 * A grid tile for one item: its sprite, name, kind mark and progress mark. Opens the item's peek.
 * Use in a grid arrangement; for a scannable list use EntityRow, for comparisons EntityTable.
 * @tier compound
 * @a11y A link whose name is the item's name (or "Hidden secret") plus its mark; aria-current marks the open peek.
 */
import type { Kind } from '../../design/icons';
import { KindMark } from '../fundamentals/KindMark';
import { MarkBadge } from '../fundamentals/MarkBadge';
import { Sprite } from '../fundamentals/Sprite';
import s from './EntityTile.module.css';

type Props = {
  /** The item's name, or the hidden-secret words. */
  name: string;
  /** The item's kind, for the mark and monogram. */
  kind: Kind;
  /** The kind's name, as the mark's accessible text. */
  kindLabel: string;
  /** The item's picture. */
  sprite: { file: string; w: number; h: number } | null;
  /** Where pressing the tile goes (the peek address). */
  href: string;
  /** Whether this tile's peek is open. */
  selected: boolean;
  /** The item's progress mark and its words. */
  mark: { state: 'unlocked' | 'skipped' | null; label: string };
  /** Shows the hidden-secret keyhole instead of the picture. */
  hidden?: boolean;
};

export function EntityTile({ name, kind, kindLabel, sprite, href, selected, mark, hidden = false }: Props) {
  return (
    <a class={s.tile} href={href} aria-current={selected ? 'true' : undefined} data-mark={mark.state ?? undefined}>
      <span class={s.kind}>
        <KindMark kind={hidden ? 'secret' : kind} label={kindLabel} />
      </span>
      <span class={s.badge}>
        <MarkBadge state={mark.state} label={mark.label} compact />
      </span>
      <Sprite sprite={sprite} kind={kind} name={name} hidden={hidden} size="lg" />
      <span class={s.name}>{name}</span>
    </a>
  );
}
