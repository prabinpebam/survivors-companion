/**
 * A set of named records in a grid inside its container (a panel), as many to a row as fit between
 * the shared record widths. Records have no surface of their own. Each record is led by its
 * picture and name (with a short aside, such as the source's summary line) and followed by its
 * labelled values, which line up within the record. Use for short
 * records that each list their own values (a stage's map events); to compare the same columns
 * across many items use EntityTable.
 * @tier fundamental
 * @a11y A list named by the label; each record is a table captioned by its name, and each label
 * heads its row (scope row). Pictures carry their source alt text.
 */
import { mediaUrl, type Inline } from '../../data/detail';
import s from './RecordTable.module.css';

type Pic = Extract<Inline, { i: string }>;
export type TableRecord = { pics: Pic[]; name: string; aside?: string; rows: { label: string; value: string }[] };

type Props = {
  /** The records, in source order. */
  records: TableRecord[];
  /** The list's accessible name (the source's column name). */
  label: string;
};

export function RecordTable({ records, label }: Props) {
  return (
    <ul class={s.records} aria-label={label}>
      {records.map((r) => (
        <li class={s.record}>
          <table class={s.table}>
            <caption class={s.head}>
              <div class={s.title}>
                {r.pics.length > 0 && (
                  <span class={s.pics}>
                    {r.pics.map((p) => <img class={s.pic} src={mediaUrl(p.i)} width={p.w} height={p.h} alt={p.a ?? ''} loading="lazy" decoding="async" />)}
                  </span>
                )}
                <span class={s.words}>
                  <span class={s.name}>{r.name}</span>
                  {r.aside && <span class={s.aside}>{r.aside}</span>}
                </span>
              </div>
            </caption>
            <tbody>
              {r.rows.map((x) => (
                <tr class={s.row}>
                  <th class={s.label} scope="row">{x.label}</th>
                  <td class={s.value}>{x.value.replace(/(\d) (?=\S)/g, '$1\u00a0')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </li>
      ))}
    </ul>
  );
}
