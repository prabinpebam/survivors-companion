/**
 * A titled set of choices: one of several (radio) or any of several (checkbox), with an optional hint.
 * Use in Settings and other forms; choices apply at once, so there's no save button.
 * @tier compound
 * @a11y A fieldset with a legend; the hint is tied to the group with aria-describedby.
 */
import { Choice } from '../fundamentals/Choice';
import s from './ChoiceGroup.module.css';

type Props = {
  /** The group's title. */
  legend: string;
  /** One short sentence about what the choice does. */
  hint?: string;
  /** A unique name for the inputs. */
  name: string;
  type: 'radio' | 'checkbox';
  options: { value: string; label: string; checked: boolean }[];
  onChange: (value: string) => void;
};

export function ChoiceGroup({ legend, hint, name, type, options, onChange }: Props) {
  const hintId = hint ? `${name}-hint` : undefined;
  return (
    <fieldset class={s.group} aria-describedby={hintId}>
      <legend class={s.legend}>{legend}</legend>
      {hint && (
        <p class={s.hint} id={hintId}>
          {hint}
        </p>
      )}
      <div class={s.options} data-type={type}>
        {options.map((o) => (
          <Choice type={type} name={name} label={o.label} checked={o.checked} onChange={() => onChange(o.value)} />
        ))}
      </div>
    </fieldset>
  );
}
