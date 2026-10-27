/**
 * A game sprite in a fixed frame: whole-number scaling with crisp edges, or a monogram on the kind colour
 * when there is no picture (or the item is a hidden secret).
 * Use for item pictures only; never as a UI icon.
 * @tier fundamental
 * @a11y Decorative (empty alt): the item's name is always in text next to it.
 */
import { useState } from 'preact/hooks';
import { fileUrl } from '../../data/detail';
import type { Kind } from '../../design/icons';
import { SHAPES } from '../../design/icons';
import s from './Sprite.module.css';

/** Nominal frame sizes in CSS px at the default text size, matching size.sprite.* (2, 3, 4.5, 6, 16 rem). A cover has no frame: it uses the picture's own pixels. */
const FRAME_PX = { sm: 32, md: 48, lg: 72, xl: 96, banner: 256 } as const;

type Props = {
  /** The picture file under /sprites, with its pixel size; null shows the monogram. */
  sprite: { file: string; w: number; h: number } | null;
  /** The item's kind, for the monogram's colour and shape. */
  kind: Kind;
  /** The item's name, for the monogram's letter. */
  name: string;
  /**
   * Frame size step. `banner` is a wide frame whose height follows the picture (landscape art such as stages);
   * `cover` fills its container's width at the picture's own shape (a stage's screenshot shown as content).
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'banner' | 'cover';
  /** Shows the hidden-secret keyhole instead of the picture. */
  hidden?: boolean;
};

export function Sprite({ sprite, kind, name, size = 'md', hidden = false }: Props) {
  const [failed, setFailed] = useState(false);
  if (hidden || !sprite || failed) {
    return (
      <span class={s.frame} data-size={size} data-kind={hidden ? 'secret' : kind} aria-hidden="true">
        <svg class={s.shape} viewBox="0 0 24 24" focusable="false">
          <path d={SHAPES[hidden ? 'secret' : kind]} />
        </svg>
        {!hidden && <span class={s.letter}>{name.slice(0, 1)}</span>}
      </span>
    );
  }
  const cover = size === 'cover';
  const big = Math.max(sprite.w, sprite.h);
  const frame = size === 'cover' ? big : FRAME_PX[size];
  const scale = big <= frame ? Math.max(1, Math.floor(frame / big)) : frame / big;
  return (
    <span class={s.frame} data-size={size}>
      <img
        class={s.img}
        data-pixel={big <= frame ? 'true' : 'false'}
        src={fileUrl('sprites', sprite.file)}
        alt=""
        loading={cover ? 'eager' : 'lazy'}
        decoding="async"
        width={Math.round(sprite.w * scale)}
        height={Math.round(sprite.h * scale)}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
