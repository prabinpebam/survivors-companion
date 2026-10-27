/**
 * An icon from the project's icon data, drawn as a stroked SVG.
 * Use beside a text label, or inside a control that names its action; never alone as meaning.
 * @tier fundamental
 * @a11y Always aria-hidden: the control or label next to it carries the words.
 */
import type { IconName } from '../../design/icons';
import { Glyph } from '../../design/glyph';

type Props = {
  /** Which icon to draw. */
  name: IconName;
  /** Size step from the size.icon tokens. */
  size?: 'sm' | 'md' | 'lg';
};

export function Icon({ name, size = 'md' }: Props) {
  return <Glyph name={name} size={size} />;
}