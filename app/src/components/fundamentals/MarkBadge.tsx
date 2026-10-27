/**
 * A progress mark badge: an open lock for marked unlocked, a skip sign for skipped, with its words.
 * Use on tiles, rows and peeks wherever an item's mark is shown; shows nothing when not marked.
 * @tier fundamental
 * @a11y The words are always present: visible, or as the badge's accessible name when compact.
 */
import { Glyph } from '../../design/glyph';
import s from './MarkBadge.module.css';

type Props = {
  /** The mark. */
  state: 'unlocked' | 'skipped' | null;
  /** The mark's words, from the catalogue. */
  label: string;
  /** Icon only, words as the accessible name (tiles). */
  compact?: boolean;
};

export function MarkBadge({ state, label, compact = false }: Props) {
  if (!state) return null;
  return (
    <span class={s.badge} data-state={state} data-compact={compact ? 'true' : undefined} role={compact ? 'img' : undefined} aria-label={compact ? label : undefined} title={compact ? label : undefined}>
      <Glyph name={state === 'unlocked' ? 'unlocks' : 'skip'} size="sm" />
      {!compact && <span>{label}</span>}
    </span>
  );
}
