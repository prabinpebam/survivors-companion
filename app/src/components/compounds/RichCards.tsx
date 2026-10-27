/**
 * Things from an item's full page shown as cards, not paragraphs: entries (a picture and a name,
 * then what it does and any sub-points), tiles (a picture and a name), points (one statement
 * each, led by the picture of the stat it names), rows (a small table's row: a title, its
 * words and labelled values), or records (a wide table's row as a tile: its title, its picture
 * and name, its labelled values, then its note). Long sets show their first cards with a way to
 * see all. Use inside a detail section for content found by data/cards; not for UI text or for
 * recipes (RecipeCard).
 * @tier compound
 * @a11y A list of cards, named by the source's caption when there is one. Each card's picture and
 * name are one link; a leading picture without a name keeps the name as its alt text. A row's
 * values are a description list with their column names. The show-all button says how many more
 * there are.
 */
import { useId, useState } from 'preact/hooks';
import type { Card } from '../../data/cards';
import { mediaUrl, type Inline } from '../../data/detail';
import { Button } from '../fundamentals/Button';
import { RichText } from '../fundamentals/RichText';
import s from './RichCards.module.css';

type Props = {
  /** How the cards read: entries, tiles, points, rows, or records. */
  look: 'entries' | 'tiles' | 'points' | 'rows' | 'records';
  /** The cards, in source order. */
  items: Card[];
  /** The source's title for the set (a table's caption row), shown above the cards. */
  caption?: Inline[];
  /** Where an in-app link to a codex ref goes. */
  hrefFor: (ref: string) => string;
  /** The words a tick and a cross stand for. */
  marks: { yes: string; no: string };
  /** Cards shown before "show all". */
  limit?: number;
  /** The show-all label for a count, and the show-fewer label. */
  more: { all: (n: number) => string; fewer: string };
};

export function RichCards({ look, items, caption, hrefFor, marks, limit = 12, more }: Props) {
  const [all, setAll] = useState(false);
  const captionId = useId();
  const shown = all ? items : items.slice(0, limit);
  const text = (c: Inline[]) => <RichText runs={c} hrefFor={hrefFor} marks={marks} />;
  const head = (x: Card) => {
    const pic = x.pic && (
      <img class={s.pic} src={mediaUrl(x.pic.i)} width={x.pic.w} height={x.pic.h} alt={x.name ? '' : x.pic.a} loading="lazy" decoding="async" />
    );
    const body = (
      <>
        {pic}
        {x.name && <span class={s.name}>{x.name}</span>}
      </>
    );
    if (!pic && !x.name) return null;
    return x.r ? (
      <a class={s.head} href={hrefFor(x.r)}>
        {body}
      </a>
    ) : (
      <span class={s.head}>{body}</span>
    );
  };
  return (
    <div class={s.block}>
      {caption && <p class={s.caption} id={captionId}>{text(caption)}</p>}
      <ul class={s.cards} data-look={look} aria-labelledby={caption ? captionId : undefined}>
        {shown.map((x) => (
          <li class={s.card} data-lead={x.pic && !x.name ? 'picture' : undefined} data-stat={x.value ? 'true' : undefined}>
            {x.title && <span class={s.title}>{text(x.title)}</span>}
            {head(x)}
            {x.value && <span class={s.value}>{text(x.value)}</span>}
            {x.c.length > 0 && <p class={s.words}>{text(x.c)}</p>}
            {x.fields && x.fields.length > 0 && (
              <dl class={s.fields}>
                {x.fields.map((f) => (
                  <div class={s.field}>
                    <dt class={s.fieldLabel}>{f.label}</dt>
                    <dd class={s.fieldValue}>{text(f.c)}</dd>
                  </div>
                ))}
              </dl>
            )}
            {x.subs && (
              <ul class={s.subs}>
                {x.subs.map((c) => (
                  <li>{text(c)}</li>
                ))}
              </ul>
            )}
            {x.note && (
              <div class={s.note}>
                <span class={s.fieldLabel}>{x.note.label}</span>
                <p class={s.words}>{text(x.note.c)}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <span class={s.more}>
          <Button variant="quiet" icon={all ? 'up' : 'down'} onPress={() => setAll(!all)}>
            {all ? more.fewer : more.all(items.length)}
          </Button>
        </span>
      )}
    </div>
  );
}
