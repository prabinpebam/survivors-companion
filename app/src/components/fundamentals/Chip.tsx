/**
 * A filter chip: a toggle with a label and how many items it would show.
 * Use in a FilterBar to narrow a list; not for actions (use Button).
 * @tier fundamental
 * @a11y A toggle button with aria-pressed; the count is part of its name.
 * @key Enter / Space: toggles
 */
import { Glyph } from '../../design/glyph';
import s from './Chip.module.css';

type Props = {
  /** The option's name. */
  label: string;
  /** How many items match with this option on. */
  count?: number;
  /** Whether the filter is on. */
  selected: boolean;
  /** Turns the filter on or off. */
  onToggle: () => void;
};

export function Chip({ label, count, selected, onToggle }: Props) {
  return (
    <button type="button" class={s.chip} aria-pressed={selected} data-empty={count === 0 && !selected ? 'true' : undefined} onClick={onToggle}>
      {selected && <Glyph name="check" size="sm" />}
      <span>{label}</span>
      {count != null && <span class={s.count}>{count}</span>}
    </button>
  );
}
