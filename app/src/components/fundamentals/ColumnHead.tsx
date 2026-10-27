/**
 * A table column header that sorts and resizes, like a file manager's detail columns: press the
 * header to sort by it (again to reverse), drag its right edge to resize, double-click the edge to
 * fit the column to its widest cell. Use only inside a table's header row.
 * @tier fundamental
 * @a11y A real column header with aria-sort; the sort control is a button named by the column; the
 * edge is a focusable separator (APG window splitter) valued in rem.
 * @key Enter / Space on the header: sorts by it, or reverses the order
 * @key Right / Left on the edge: widens / narrows by one step (Shift: four steps)
 * @key Home / End on the edge: narrowest / widest
 * @key Enter on the edge: fits the column to its widest cell
 */
import { useRef } from 'preact/hooks';
import { Glyph } from '../../design/glyph';
import { clampWidth, remToken, widthForKey, type Range } from '../../design/resize';
import s from './ColumnHead.module.css';

type Props = {
  /** The column's id, matched by the table's `col` and its cells. */
  id: string;
  /** The column's name. */
  label: string;
  /** Numbers align to the end. */
  numeric?: boolean;
  /** Stays in view when the table scrolls sideways (the name column). */
  pinned?: boolean;
  /** This column's sort order, or null when the table is sorted by another. */
  sort: 'ascending' | 'descending' | null;
  /** Sorts by this column (or reverses it). */
  onSort: () => void;
  /** The edge's name, as words ("Resize Damage column"). */
  resizeLabel: string;
  /** Called with a new width in rem while dragging (`done` false) and when it settles (`done` true). */
  onResize: (rem: number, done: boolean) => void;
  /** Fits the column to its widest cell. */
  onFit: () => void;
};

function rangeOf(el: Element): Range {
  return { min: remToken(el, '--size-column-min'), max: remToken(el, '--size-column-max'), step: remToken(el, '--size-column-step'), initial: 0 };
}

export function ColumnHead({ id, label, numeric, pinned, sort, onSort, resizeLabel, onResize, onFit }: Props) {
  const th = useRef<HTMLTableCellElement>(null);
  const drag = useRef<{ left: number; rem: number; last: number } | null>(null);
  const width = () => (th.current ? th.current.getBoundingClientRect().width / parseFloat(getComputedStyle(document.documentElement).fontSize) : 0);

  function down(e: PointerEvent) {
    if (e.button !== 0 || !th.current) return;
    e.preventDefault();
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    drag.current = { left: th.current.getBoundingClientRect().left, rem, last: width() };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    th.current.dataset.resizing = 'true';
  }
  function move(e: PointerEvent) {
    const d = drag.current;
    if (!d) return;
    // A column's width runs from its left edge to the pointer.
    d.last = clampWidth((e.clientX - d.left) / d.rem, rangeOf(th.current!));
    onResize(d.last, false);
  }
  function up() {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    delete th.current?.dataset.resizing;
    onResize(d.last, true);
  }
  function key(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onFit();
      return;
    }
    const next = widthForKey(e.key, e.shiftKey, width(), rangeOf(th.current!), 'end');
    if (next === null) return;
    e.preventDefault();
    onResize(next, true);
  }

  return (
    <th ref={th} scope="col" class={s.head} data-col={id} data-numeric={numeric ? 'true' : undefined} data-pinned={pinned ? 'true' : undefined} aria-sort={sort ?? undefined}>
      <button type="button" class={s.sort} onClick={onSort}>
        <span class={s.label}>{label}</span>
        <span class={s.dir} data-on={sort ? 'true' : undefined}>
          <Glyph name={sort === 'descending' ? 'down' : 'up'} size="sm" />
        </span>
      </button>
      <span
        role="separator"
        aria-orientation="vertical"
        aria-label={resizeLabel}
        aria-valuenow={Math.round(width()) || undefined}
        tabIndex={0}
        class={s.edge}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onDblClick={onFit}
        onKeyDown={key}
      />
    </th>
  );
}
