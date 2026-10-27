/**
 * Label and value pairs, laid out two to a row where there's room.
 * Use for an item's stats or short facts in a peek; numbers align and use tabular figures.
 * @tier compound
 * @a11y A description list (dl), so each value is read with its label.
 */
import s from './FactList.module.css';

type Props = {
  /** The facts in reading order; empty values are skipped. */
  facts: { label: string; value: string; numeric?: boolean }[];
};

export function FactList({ facts }: Props) {
  const shown = facts.filter((f) => f.value && f.value !== '–');
  if (!shown.length) return null;
  return (
    <dl class={s.list}>
      {shown.map((f) => (
        <div class={s.fact}>
          <dt class={s.label}>{f.label}</dt>
          <dd class={s.value} data-numeric={f.numeric ? 'true' : undefined}>
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
