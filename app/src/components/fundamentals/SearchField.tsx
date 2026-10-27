/**
 * A search field with a visible label (visually hidden on dense toolbars) and a search icon.
 * Use to narrow the list on screen as the person types; not for global search.
 * @tier fundamental
 * @a11y A native search input with a label element; Escape clears it (browser default).
 */
import { Glyph } from '../../design/glyph';
import s from './SearchField.module.css';

type Props = {
  /** The field's name. */
  label: string;
  /** The current text. */
  value: string;
  /** An example of what to type, never the label. */
  placeholder?: string;
  /** Called on every change. */
  onInput: (value: string) => void;
};

export function SearchField({ label, value, placeholder, onInput }: Props) {
  return (
    <label class={s.field}>
      <span class="visually-hidden">{label}</span>
      <Glyph name="search" size="sm" />
      <input class={s.input} type="search" value={value} placeholder={placeholder} autocomplete="off" spellcheck={false} onInput={(e) => onInput((e.currentTarget as HTMLInputElement).value)} />
    </label>
  );
}
