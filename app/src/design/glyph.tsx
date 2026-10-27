/**
 * Tier 0: draws an icon from the icon data as a stroked SVG. Styled by base.css (`svg[data-glyph]`)
 * from the size.icon tokens, so fundamentals can show an icon without importing another fundamental.
 * Always aria-hidden: the control or label beside it carries the words.
 */
import { ICONS, type IconName } from './icons';

export function Glyph({ name, size = 'md' }: { name: IconName; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <svg data-glyph="" data-size={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {ICONS[name].map((d) => (
        <path d={d} />
      ))}
    </svg>
  );
}
