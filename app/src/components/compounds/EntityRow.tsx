/**
 * A row for one item: sprite, name, a few facts, and its progress mark. Opens the item's peek.
 * Use in list (short facts) or details (facts plus the item's caption) arrangements.
 * @tier compound
 * @a11y A link whose name is the item's name; facts follow as plain text for screen readers.
 */
import type { Kind } from '../../design/icons';
import { KindMark } from '../fundamentals/KindMark';
import { MarkBadge } from '../fundamentals/MarkBadge';
import { Sprite } from '../fundamentals/Sprite';
import { Text } from '../fundamentals/Text';
import s from './EntityRow.module.css';

type Props = {
  /** The item's name, or the hidden-secret words. */
  name: string;
  /** The item's kind. */
  kind: Kind;
  /** The kind's name. */
  kindLabel: string;
  /** The item's picture. */
  sprite: { file: string; w: number; h: number } | null;
  /** Where pressing the row goes (the peek address). */
  href: string;
  /** Whether this row's peek is open. */
  selected: boolean;
  /** Short facts, already worded, shown after the name. */
  facts: string[];
  /** The item's caption, shown in the details arrangement. */
  caption?: string;
  /** Picture size in the details arrangement: a large square, or a wide banner for landscape art. Defaults to `xl`. */
  picture?: 'xl' | 'banner';
  /** The item's progress mark and its words. */
  mark: { state: 'unlocked' | 'skipped' | null; label: string };
  /** Shows the hidden-secret keyhole instead of the picture. */
  hidden?: boolean;
};

export function EntityRow({ name, kind, kindLabel, sprite, href, selected, facts, caption, picture = 'xl', mark, hidden = false }: Props) {
  const details = caption != null;
  return (
    <a class={s.row} href={href} aria-current={selected ? 'true' : undefined} data-details={details ? 'true' : undefined} data-picture={details ? picture : undefined}>
      <Sprite sprite={sprite} kind={kind} name={name} hidden={hidden} size={details ? picture : 'sm'} />
      <span class={s.body}>
        <span class={s.title}>
          <KindMark kind={hidden ? 'secret' : kind} label={kindLabel} />
          <Text variant={details ? 'heading' : 'label'} truncate>
            {name}
          </Text>
          <MarkBadge state={mark.state} label={mark.label} />
        </span>
        {facts.length > 0 && (
          <span class={s.facts}>
            {facts.map((f) => (
              <span class={s.fact}>{f}</span>
            ))}
          </span>
        )}
        {caption && <span class={s.caption}>{caption}</span>}
      </span>
    </a>
  );
}
