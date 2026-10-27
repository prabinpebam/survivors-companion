/**
 * A comparison table: one row per item, columns chosen by the collection's data. The name cell opens
 * the peek. Columns sort and resize like a file manager's details view; rows can come in groups,
 * each under a header row that collapses it.
 * Use when a person compares numbers across items; the table scrolls sideways inside its frame, never the page.
 * @tier compound
 * @a11y A real table with a caption and column headers (aria-sort on the sorted one); each group is a
 * row group named by its header, whose button states whether it is expanded.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import type { Kind } from '../../design/icons';
import { Glyph } from '../../design/glyph';
import { clampWidth, fitColumn, measureColumns, remToken } from '../../design/resize';
import { ColumnHead } from '../fundamentals/ColumnHead';
import { MarkBadge } from '../fundamentals/MarkBadge';
import { Sprite } from '../fundamentals/Sprite';
import s from './EntityTable.module.css';

type Row = {
  ref: string;
  name: string;
  kind: Kind;
  sprite: { file: string; w: number; h: number } | null;
  href: string;
  selected: boolean;
  hidden: boolean;
  mark: { state: 'unlocked' | 'skipped' | null; label: string };
  /** Cell text for each column after the name, already worded. */
  cells: string[];
};
type Props = {
  /** The table's caption (read by screen readers). */
  caption: string;
  /** Column headers; the first is the name column. `resizeLabel` names each column's resize edge. */
  columns: { id: string; label: string; numeric?: boolean; resizeLabel: string }[];
  /** Rows in groups; a single group without a label is an ungrouped table. */
  groups: { key: string; label?: string; count?: string; rows: Row[] }[];
  /** The column the rows are sorted by, and its order. */
  sort: { field: string; dir: 'asc' | 'desc' };
  /** Sorts by a column (the view decides whether that reverses the order). */
  onSort: (field: string) => void;
  /** Saved column widths in rem, or null for natural widths. */
  widths: Record<string, number> | null;
  /** Saves new column widths. */
  onWidths: (widths: Record<string, number>) => void;
};

export function EntityTable({ caption, columns, groups, sort, onSort, widths, onWidths }: Props) {
  const table = useRef<HTMLTableElement>(null);
  const base = useRef<Record<string, number> | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const fixed = !!widths && columns.every((c) => widths[c.id]);
  const total = (w: Record<string, number>) => columns.reduce((n, c) => n + (w[c.id] ?? 0), 0);
  // The pinned name column covers whatever scrolls under it; scroll padding keeps focus beside it.
  useEffect(() => {
    const pin = table.current?.querySelector<HTMLElement>('th[data-pinned]');
    const frame = table.current?.parentElement;
    const ro = new ResizeObserver(() => frame?.style.setProperty('--pin-w', `${pin?.offsetWidth ?? 0}px`));
    if (pin) ro.observe(pin);
    return () => ro.disconnect();
  }, []);

  function apply(next: Record<string, number>) {
    const t = table.current!;
    t.dataset.fixed = 'true';
    t.style.setProperty('--table-w', `${total(next)}rem`);
    for (const col of t.querySelectorAll<HTMLElement>('col[data-col]')) col.style.setProperty('--col-w', `${next[col.dataset.col!]}rem`);
  }
  function resize(id: string, rem: number, done: boolean) {
    base.current ??= fixed ? widths! : measureColumns(table.current!);
    const next = { ...base.current, [id]: rem };
    apply(next);
    if (!done) return;
    base.current = null;
    onWidths(next);
  }
  function fit(id: string) {
    const t = table.current!;
    const range = { min: remToken(t, '--size-column-min'), max: remToken(t, '--size-column-max'), step: 0, initial: 0 };
    resize(id, clampWidth(fitColumn(t, id), range), true);
  }
  function toggle(key: string) {
    const next = new Set(collapsed);
    if (!next.delete(key)) next.add(key);
    setCollapsed(next);
  }
  const rest = columns.slice(1);

  return (
    <div class={s.frame} tabIndex={0} role="region" aria-label={caption}>
      <table ref={table} class={s.table} data-fixed={fixed ? 'true' : undefined} style={fixed ? { '--table-w': `${total(widths!)}rem` } : undefined}>
        <caption class="visually-hidden">{caption}</caption>
        <colgroup>
          {columns.map((c) => (
            <col key={c.id} data-col={c.id} style={fixed ? { '--col-w': `${widths![c.id]}rem` } : undefined} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <ColumnHead
                key={c.id}
                id={c.id}
                label={c.label}
                numeric={c.numeric}
                pinned={i === 0}
                sort={sort.field === c.id ? (sort.dir === 'asc' ? 'ascending' : 'descending') : null}
                onSort={() => onSort(c.id)}
                resizeLabel={c.resizeLabel}
                onResize={(rem, done) => resize(c.id, rem, done)}
                onFit={() => fit(c.id)}
              />
            ))}
          </tr>
        </thead>
        {groups.map((g) => {
          const open = !collapsed.has(g.key);
          return (
            <tbody key={g.key}>
              {g.label && (
                <tr class={s.groupRow}>
                  <th scope="rowgroup" colSpan={columns.length} class={s.groupHead}>
                    <button type="button" class={s.groupButton} aria-expanded={open} onClick={toggle.bind(null, g.key)}>
                      <span class={s.chevron}>
                        <Glyph name={open ? 'chevron' : 'chevron-end'} size="sm" />
                      </span>
                      <span class={s.groupLabel}>{g.label}</span>
                      <span class={s.groupCount}>{g.count}</span>
                    </button>
                  </th>
                </tr>
              )}
              {open &&
                g.rows.map((r) => (
                  <tr key={r.ref} aria-current={r.selected ? 'true' : undefined}>
                    <th scope="row" class={s.nameCell}>
                      <a class={s.link} href={r.href}>
                        <Sprite sprite={r.sprite} kind={r.kind} name={r.name} hidden={r.hidden} size="sm" />
                        <span class={s.name}>{r.name}</span>
                      </a>
                    </th>
                    {rest.map((c, i) =>
                      c.id === 'mark' ? (
                        <td>
                          <MarkBadge state={r.mark.state} label={r.mark.label} />
                        </td>
                      ) : (
                        <td data-numeric={c.numeric ? 'true' : undefined}>{r.cells[i]}</td>
                      ),
                    )}
                  </tr>
                ))}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
