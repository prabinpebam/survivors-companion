/**
 * A destination's title, with an optional short line under it.
 * Use once at the top of each destination; it holds the page's only h1.
 * @tier compound
 * @a11y The title is the page's h1.
 */
import { Text } from '../fundamentals/Text';
import s from './PageHeader.module.css';

type Props = {
  title: string;
  /** A short line under the title (a count or a status). */
  meta?: string;
};

export function PageHeader({ title, meta }: Props) {
  return (
    <header class={s.head}>
      <div class={s.text}>
        <Text variant="title" as="h1">
          {title}
        </Text>
        {meta && <Text variant="muted">{meta}</Text>}
      </div>
    </header>
  );
}
