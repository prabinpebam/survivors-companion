/**
 * A run of rich text from an item's full page: words, links to other items (they open in the
 * detail), links out, small pictures, and ticks and crosses. Line breaks in the data are kept.
 * Use only for content projected from the source; UI text uses Text.
 * @tier fundamental
 * @a11y A picture that links to the same item as the words after it is decorative, so each item is
 * one link; other pictures keep their source alt text. Ticks and crosses carry their words.
 */
import { Fragment } from 'preact';
import { mediaUrl, type Inline } from '../../data/detail';
import { Glyph } from '../../design/glyph';
import s from './RichText.module.css';

type Props = {
  /** The runs, in order. */
  runs: Inline[];
  /** Where an in-app link to a codex ref goes. */
  hrefFor: (ref: string) => string;
  /** The words a tick and a cross stand for. */
  marks: { yes: string; no: string };
  /** How pictures sit: their own size in running text; enlarged in a tile; enlarged on their own line above the words (lead). */
  pictures?: 'text' | 'tile' | 'lead';
};

const linkOf = (r: Inline | undefined) => (r && typeof r !== 'string' && 't' in r ? r.r : undefined);

/** The next run that isn't blank space. */
function after(runs: Inline[], i: number): Inline | undefined {
  for (let j = i + 1; j < runs.length; j++) if (typeof runs[j] !== 'string' || (runs[j] as string).trim()) return runs[j];
  return undefined;
}

export function RichText({ runs, hrefFor, marks, pictures = 'text' }: Props) {
  return (
    <>
      {runs.map((r, i) => {
        if (typeof r === 'string')
          return (
            <Fragment key={i}>
              {r.split('\n').map((line, j) => (
                <Fragment key={j}>
                  {j > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </Fragment>
          );
        if ('m' in r)
          return (
            <span key={i} class={s.mark} data-mark={r.m}>
              <Glyph name={r.m === 'yes' ? 'check' : 'close'} size="sm" />
              <span class="visually-hidden">{r.m === 'yes' ? marks.yes : marks.no}</span>
            </span>
          );
        if ('i' in r) {
          const twin = !!r.r && linkOf(after(runs, i)) === r.r;
          const img = <img class={s.image} data-size={pictures} src={mediaUrl(r.i)} width={r.w} height={r.h} alt={twin ? '' : (r.a ?? '')} loading="lazy" decoding="async" />;
          return r.r && !twin ? (
            <a key={i} class={s.link} href={hrefFor(r.r)}>
              {img}
            </a>
          ) : (
            <Fragment key={i}>{img}</Fragment>
          );
        }
        if (r.r)
          return (
            <a key={i} class={s.link} href={hrefFor(r.r)}>
              {r.t}
            </a>
          );
        if (r.x)
          return (
            <a key={i} class={s.link} href={r.x} target="_blank" rel="noreferrer">
              {r.t}
            </a>
          );
        return <Fragment key={i}>{r.t}</Fragment>;
      })}
    </>
  );
}
