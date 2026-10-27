/**
 * A segmented control: pick one of a few options shown side by side, each an icon with a label.
 * Use for view switching and short exclusive choices (2–5 options); use MenuButton for longer lists.
 * @tier fundamental
 * @a11y A radio group: one tab stop, arrow keys move the choice.
 * @key Left / Right: previous / next option
 */
import type { IconName } from '../../design/icons';
import { Glyph } from '../../design/glyph';
import s from './Segmented.module.css';

type Option = { value: string; label: string; icon?: IconName };
type Props = {
  /** The group's name, read before the options. */
  label: string;
  /** The options in order. */
  options: Option[];
  /** The chosen option's value. */
  value: string;
  /** Called with the newly chosen value. */
  onChange: (value: string) => void;
  /** Shows only icons on narrow windows; labels stay as accessible names. */
  compact?: boolean;
};

export function Segmented({ label, options, value, onChange, compact = false }: Props) {
  const move = (e: KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = options[(i + d + options.length) % options.length];
    onChange(next.value);
    const group = (e.currentTarget as HTMLElement).parentElement;
    requestAnimationFrame(() => (group?.querySelector('[aria-checked="true"]') as HTMLElement | null)?.focus());
  };
  const at = (e: Event) => Number((e.currentTarget as HTMLElement).dataset.index);
  const pick = (e: Event) => onChange(options[at(e)].value);
  const key = (e: KeyboardEvent) => move(e, at(e));
  return (
    <div class={s.group} role="radiogroup" aria-label={label} data-compact={compact ? 'true' : undefined}>
      {options.map((o, i) => (
        <button
          type="button"
          role="radio"
          class={s.option}
          aria-checked={o.value === value}
          tabIndex={o.value === value ? 0 : -1}
          title={o.label}
          data-index={i}
          onClick={pick}
          onKeyDown={key}
        >
          {o.icon && <Glyph name={o.icon} size="sm" />}
          <span class={s.text}>{o.label}</span>
        </button>
      ))}
    </div>
  );
}
