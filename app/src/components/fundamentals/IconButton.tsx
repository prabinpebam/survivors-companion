/**
 * An icon-only button whose label is its accessible name and tooltip.
 * Use where space is tight and the icon is well known (close, back); otherwise use Button with a label.
 * @tier fundamental
 * @a11y aria-label and title both carry the label, so it is never an unnamed control.
 * @key Enter / Space: activates
 */
import type { IconName } from '../../design/icons';
import { Glyph } from '../../design/glyph';
import s from './IconButton.module.css';

type Props = {
  /** The icon to draw. */
  icon: IconName;
  /** What pressing it does, as words: the accessible name and tooltip. */
  label: string;
  /** Does something. */
  onPress?: () => void;
  /** Goes somewhere instead. */
  href?: string;
  /** For toggles and choices: whether it is on. */
  pressed?: boolean;
};

export function IconButton({ icon, label, onPress, href, pressed }: Props) {
  if (href)
    return (
      <a class={s.button} href={href} aria-label={label} title={label}>
        <Glyph name={icon} />
      </a>
    );
  return (
    <button type="button" class={s.button} aria-label={label} title={label} aria-pressed={pressed} onClick={onPress}>
      <Glyph name={icon} />
    </button>
  );
}
