/**
 * Settings layout: a header, then labelled groups of controls in one readable column.
 * Use for Settings only.
 * @tier layout
 * @a11y Each group is a section named by its heading.
 */
import type { ComponentChildren } from 'preact';
import { Text } from '../components/fundamentals/Text';
import s from './Settings.module.css';

type Props = {
  /** The page header region. */
  header: ComponentChildren;
  /** The groups in order. */
  groups: { key: string; heading: string; hint?: string; content: ComponentChildren }[];
};

export function Settings({ header, groups }: Props) {
  return (
    <div class={s.settings}>
      {header}
      {groups.map((g) => (
        <section key={g.key} class={s.group} aria-labelledby={`set-${g.key}`}>
          <span id={`set-${g.key}`}>
            <Text variant="heading" as="h2">
              {g.heading}
            </Text>
          </span>
          {g.hint && <Text variant="muted" as="p">{g.hint}</Text>}
          <div class={s.content}>{g.content}</div>
        </section>
      ))}
    </div>
  );
}
