/**
 * The blocks of one part of an item's full page: paragraphs, notes, quotes, subheadings, lists,
 * tables, stat tiles, pictures and galleries. Long tables and lists show their first rows with a
 * way to see all. Use inside a detail section; not for UI text.
 * @tier compound
 * @a11y Tables keep their header cells. Stat tiles are a description list; their hints follow once
 * as a second list. A long table or list says how many more it holds on the button that shows
 * them. Wide tables scroll sideways inside their own frame. A combination grid keeps its item beside
 * separate tables, one per band, each with its own header row.
 */
import { useState } from 'preact/hooks';
import { mediaUrl, type Cell, type Inline, type ListItem, type RichBlock } from '../../data/detail';
import { bandsOf, glyphs, isHead, type Row } from '../../data/tables';
import { Button } from '../fundamentals/Button';
import { RichText } from '../fundamentals/RichText';
import s from './RichContent.module.css';

type Props = {
  /** The blocks, in source order. */
  blocks: RichBlock[];
  /** Where an in-app link to a codex ref goes. */
  hrefFor: (ref: string) => string;
  /** The words a tick and a cross stand for. */
  marks: { yes: string; no: string };
  /** Rows or entries shown before "show all". */
  limit?: number;
  /** The show-all label for a count, and the show-fewer label. */
  more: { all: (n: number) => string; fewer: string };
};


export function RichContent({ blocks, hrefFor, marks, limit = 10, more }: Props) {
  const [open, setOpen] = useState<number[]>([]);
  const text = (c: Inline[]) => <RichText runs={c} hrefFor={hrefFor} marks={marks} />;
  const tile = (c: Inline[], lead: boolean) => <RichText runs={c} hrefFor={hrefFor} marks={marks} pictures={lead ? 'lead' : 'tile'} />;
  const toggle = (i: number) => setOpen(open.includes(i) ? open.filter((x) => x !== i) : [...open, i]);
  const moreButton = (i: number, total: number) =>
    total > limit && (
      <span class={s.more}>
        <Button variant="quiet" icon={open.includes(i) ? 'up' : 'down'} onPress={toggle.bind(null, i)}>
          {open.includes(i) ? more.fewer : more.all(total)}
        </Button>
      </span>
    );

  const list = (b: { k: 'ul' | 'ol'; items: ListItem[] }, cut: boolean) => {
    const Tag = b.k;
    const items = cut ? b.items.slice(0, limit) : b.items;
    return (
      <Tag class={s.list} data-ordered={b.k === 'ol' ? 'true' : undefined}>
        {items.map((it) => <li>{text(it.c)}{it.sub && list(it.sub, false)}</li>)}
      </Tag>
    );
  };
  const cell = (c: Cell, head: boolean) => {
    const Tag = c.h ? 'th' : 'td';
    const look = glyphs(c.c) ? ((c.rs ?? 1) > 1 ? 'item' : 'true') : undefined;
    return (
      <Tag colSpan={c.cs} rowSpan={c.rs} scope={c.h ? (head ? 'col' : 'row') : undefined} data-glyphs={look}>
        {look === 'item' ? tile(c.c, false) : text(c.c)}
        {c.sub && <span class={s.sub}>{text(c.sub)}</span>}
      </Tag>
    );
  };
  const figure = (x: { i: string; w: number; h: number; c: Inline[] }, look: string) => (
    <figure class={s.figure}>
      <img class={look} src={mediaUrl(x.i)} width={x.w || undefined} height={x.h || undefined} alt="" loading="lazy" decoding="async" />
      {x.c.length > 0 && <figcaption class={s.caption}>{text(x.c)}</figcaption>}
    </figure>
  );
  const table = (head: Row[], body: Row[]) => (
    <table class={s.table}>
      {head.length > 0 && <thead>{head.map((r) => <tr>{r.cells.map((c) => cell(c, true))}</tr>)}</thead>}
      <tbody>{body.map((r) => <tr data-head={isHead(r) ? 'true' : undefined}>{r.cells.map((c) => cell(c, isHead(r)))}</tr>)}</tbody>
    </table>
  );

  return (
    <div class={s.content}>
      {blocks.map((b, i) => {
        const cut = !open.includes(i);
        switch (b.k) {
          case 'p':
          case 'note':
            return <p class={s[b.k]}>{text(b.c)}</p>;
          case 'quote':
            return <blockquote class={s.quote}>{text(b.c)}</blockquote>;
          case 'h':
            return <h4 class={s.h}>{text(b.c)}</h4>;
          case 'ul':
          case 'ol':
            return <div class={s.block}>{list(b, cut)}{moreButton(i, b.items.length)}</div>;
          case 'table': {
            const split = bandsOf(b);
            if (split)
              return (
                <div class={s.combo}>
                  <div class={s.comboItem}>{tile(split.item.c, false)}</div>
                  <div class={s.bands}>{split.bands.map(([top, ...rest]) => <div class={s.band}>{table([top], rest)}</div>)}</div>
                </div>
              );
            // Only leading header rows head the table; a later one (a second row of icons) stays in place.
            // A cell spanning past them can't sit in a thead, so then every row stays in the body.
            const lead = b.rows.findIndex((r) => !isHead(r));
            const n = lead < 0 ? b.rows.length : lead;
            const spans = b.rows.slice(0, n).some((r, y) => r.cells.some((c) => y + (c.rs ?? 1) > n));
            const head = spans ? [] : b.rows.slice(0, n);
            const body = b.rows.slice(head.length);
            return (
              <div class={s.block}>
                <div class={s.frame}>{table(head, cut ? body.slice(0, limit) : body)}</div>
                {moreButton(i, body.length)}
              </div>
            );
          }
          case 'facts': {
            const notes = b.items.filter((f) => f.hint);
            return (
              <div class={s.block}>
                <dl class={s.facts}>
                  {b.items.map((f) => (
                    <div class={s.fact} data-wide={f.wide ? 'true' : undefined}>
                      <dt class={s.factLabel}>{f.label}</dt>
                      {f.values.map((v) =>
                        v.col ? (
                          <dd class={s.alt}><span class={s.altLabel}>{v.col}</span> {text(v.c)}</dd>
                        ) : (
                          <dd class={s.value} data-named={f.named ? 'true' : undefined}>{tile(v.c, !!f.named && !f.wide)}</dd>
                        ),
                      )}
                    </div>
                  ))}
                </dl>
                {notes.length > 0 && (
                  <dl class={s.notes}>
                    {notes.map((f) => <div class={s.noteRow}><dt class={s.noteName}>{f.label}</dt><dd>{f.hint}</dd></div>)}
                  </dl>
                )}
              </div>
            );
          }
          case 'gallery':
            return <ul class={s.gallery}>{b.items.map((g) => <li>{figure(g, s.thumb)}</li>)}</ul>;
          case 'figure':
            return figure(b, s.picture);
        }
      })}
    </div>
  );
}
