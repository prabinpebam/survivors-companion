/**
 * The kind mark: a shape in the kind's colour, so kind never depends on colour alone.
 * Use on tiles, rows and headers next to the item; not as a decoration elsewhere.
 * @tier fundamental
 * @a11y With a label it is an image with that name; without one it is hidden, and the kind must be in nearby text.
 */
import { SHAPES, type Kind } from '../../design/icons';
import s from './KindMark.module.css';

type Props = {
  /** The item's kind: picks the shape and colour. */
  kind: Kind;
  /** The kind's name, when no visible text near the mark says it. */
  label?: string;
  /** Size step from the size.icon tokens. */
  size?: 'sm' | 'md';
};

export function KindMark({ kind, label, size = 'sm' }: Props) {
  return (
    <svg class={s.mark} data-kind={kind} data-size={size} viewBox="0 0 24 24" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'} focusable="false">
      <path d={SHAPES[kind]} />
    </svg>
  );
}
