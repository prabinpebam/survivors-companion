/**
 * The head of a peek: the item's picture, name, kind and pack, with close (and an optional page link).
 * Use at the top of the inspector; the heading takes focus when the peek opens.
 * @tier compound
 * @a11y The name is the inspector's heading (h2, focusable with tabindex -1); close is an icon button with a name.
 */
import type { Kind } from '../../design/icons';
import { IconButton } from '../fundamentals/IconButton';
import { KindMark } from '../fundamentals/KindMark';
import { Sprite } from '../fundamentals/Sprite';
import { Text } from '../fundamentals/Text';
import s from './PeekHeader.module.css';

type Props = {
  /** The item's name, or the hidden-secret words. */
  name: string;
  kind: Kind;
  /** The kind's name and the pack's name, shown under the title. */
  meta: string[];
  sprite: { file: string; w: number; h: number } | null;
  hidden?: boolean;
  /** The id the inspector uses to name itself and to move focus. */
  headingId: string;
  /** The close control's words and address. */
  close: { label: string; href: string };
  /** Leaves out the picture frame, when the view shows the picture as content instead (wide art such as stages). */
  icon?: boolean;
};

export function PeekHeader({ name, kind, meta, sprite, hidden = false, headingId, close, icon = true }: Props) {
  return (
    <header class={s.head} data-icon={icon ? 'true' : 'false'}>
      {icon && (
        <span class={s.art}>
          <Sprite sprite={sprite} kind={kind} name={name} hidden={hidden} size="lg" />
        </span>
      )}
      <div class={s.text}>
        <h2 class={s.title} id={headingId} tabIndex={-1}>
          {name}
        </h2>
        <span class={s.meta}>
          <KindMark kind={hidden ? 'secret' : kind} />
          {meta.map((m) => (
            <Text variant="muted">{m}</Text>
          ))}
        </span>
      </div>
      <span class={s.close}>
        <IconButton icon="close" label={close.label} href={close.href} />
      </span>
    </header>
  );
}
