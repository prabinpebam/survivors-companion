/**
 * A native radio button or checkbox with its label, as one target.
 * Use inside a ChoiceGroup; a single on/off setting may stand alone.
 * @tier fundamental
 * @a11y A native input inside its label, so the whole row is the target and the name is the visible words.
 * @key Space: toggles; arrows move within a radio group (native)
 */
import s from './Choice.module.css';

type Props = {
  /** radio: one of many; checkbox: any of many. */
  type: 'radio' | 'checkbox';
  /** The group's form name (radios). */
  name: string;
  /** The option's words. */
  label: string;
  /** Whether it is on. */
  checked: boolean;
  /** Called when the person changes it. */
  onChange: () => void;
};

export function Choice({ type, name, label, checked, onChange }: Props) {
  return (
    <label class={s.choice}>
      <input class={s.input} type={type} name={name} checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}
