/**
 * Hub layout: a page header, then an ordered list of modules, each a titled group of blocks.
 * One column on compact windows, two from medium up. Use for Home and the placeholder destinations.
 * @tier layout
 * @a11y Each module is a section named by its heading.
 */
import type { ComponentChildren } from 'preact';
import { Text } from '../components/fundamentals/Text';
import s from './Hub.module.css';

type Props = {
  /** The page header region. */
  header: ComponentChildren;
  /** The modules in order. A module with `wide` spans both columns. */
  modules: { key: string; heading?: string; wide?: boolean; content: ComponentChildren }[];
};

export function Hub({ header, modules }: Props) {
  return (
    <div class={s.hub}>
      <div class={s.header}>{header}</div>
      <div class={s.modules}>
        {modules.map((m) => (
          <section key={m.key} class={s.module} data-wide={m.wide ? 'true' : undefined} aria-labelledby={m.heading ? `hub-${m.key}` : undefined}>
            {m.heading && (
              <span id={`hub-${m.key}`}>
                <Text variant="heading" as="h2">
                  {m.heading}
                </Text>
              </span>
            )}
            <div class={s.content}>{m.content}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
