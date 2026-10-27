/**
 * Table structure fixes, tier 0. The source's combination tables put an empty corner cell above the item,
 * so the item spans only the rows under the first row of icons. Folding the corner away lets the item
 * span every row: icons, marks, icons, marks.
 */
import { plain, type Inline, type RichBlock } from './detail';

type Table = Extract<RichBlock, { k: 'table' }>;
export type Row = Table['rows'][number];

/** A header row: all header cells, apart from an item cell spanning down beside them. */
export const isHead = (r: Row) => !!r.h && r.cells.every((c) => c.h || (c.rs ?? 1) > 1);
/** A cell of only pictures, ticks, crosses and note markers ([1]): centred as the source shows it. */
export const glyphs = (c: Inline[]) => c.length > 0 && c.every((x) => (typeof x === 'string' ? !/[a-z]{2}/i.test(x) : !('t' in x)));

const empty = (c: Table['rows'][number]['cells'][number]) => plain(c.c).trim() === '' && c.c.every((x) => typeof x === 'string');

const allHead = (r: Row) => !!r.h && r.cells.length > 0 && r.cells.every((c) => c.h);

/**
 * A combination grid split into its parts: the item spanning every row, and bands of a header row of
 * icons with the rows of marks under it. Null when the table isn't one.
 */
export function bandsOf(t: Table): { item: Row['cells'][number]; bands: Row[][] } | null {
  const item = t.rows[0]?.cells[0];
  if (!item || t.rows.length < 2 || (item.rs ?? 1) !== t.rows.length || item.cs) return null;
  const rows = [{ ...t.rows[0], cells: t.rows[0].cells.slice(1) }, ...t.rows.slice(1)];
  if (!allHead(rows[0])) return null;
  const bands: Row[][] = [];
  for (const r of rows) {
    if (r.cells.some((c) => (c.rs ?? 1) > 1)) return null;
    if (allHead(r)) bands.push([r]);
    else bands[bands.length - 1].push(r);
  }
  return bands.every((b) => b.length > 1) ? { item, bands } : null;
}

/** The table with an empty header corner folded into the cell that spans every row below it. */
export function foldCorner(t: Table): Table {
  const [top, next, ...rest] = t.rows;
  const corner = top?.cells[0];
  const item = next?.cells[0];
  if (!corner || !item || !corner.h || corner.cs || corner.rs || !empty(corner)) return t;
  if ((item.rs ?? 1) !== t.rows.length - 1 || item.cs) return t;
  return {
    ...t,
    rows: [
      { ...top, cells: [{ ...item, rs: t.rows.length }, ...top.cells.slice(1)] },
      { ...next, cells: next.cells.slice(1) },
      ...rest,
    ],
  };
}
