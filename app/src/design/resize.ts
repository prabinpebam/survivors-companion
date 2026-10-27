/** Tier 0: pure geometry and keyboard models for resize handles (APG window splitter): the item column and table columns. */

export type Range = { min: number; max: number; step: number; initial: number };

/** Keeps a width inside the range, rounded to a tenth of a rem so saved values stay tidy. */
export function clampWidth(width: number, r: Range): number {
  return Math.round(Math.min(r.max, Math.max(r.min, width)) * 10) / 10;
}

/** The width of a box whose end edge follows a pointer at `pointerX`, given the box's start edge, in rem. */
export function widthAt(pointerX: number, startEdge: number, remPx: number, r: Range): number {
  return clampWidth((pointerX - startEdge) / remPx, r);
}

/**
 * The new width for a key on a resize handle, or null when the key isn't the handle's.
 * `edge` is the side of the resized box the handle sits on: on its start (a box to the handle's
 * right) Left widens; on its end (the item column, a table column) Right widens.
 */
export function widthForKey(key: string, shift: boolean, width: number, r: Range, edge: 'start' | 'end' = 'start'): number | null {
  const step = r.step * (shift ? 4 : 1) * (edge === 'start' ? 1 : -1);
  switch (key) {
    case 'ArrowLeft':
      return clampWidth(width + step, r);
    case 'ArrowRight':
      return clampWidth(width - step, r);
    case 'Home':
      return r.min;
    case 'End':
      return r.max;
    case 'Enter':
      return r.initial;
    default:
      return null;
  }
}

/** Reads a rem-valued custom property (a token) from an element, for scripts that need the number. */
export function remToken(el: Element, name: string): number {
  return parseFloat(getComputedStyle(el).getPropertyValue(name)) || 0;
}

const remPx = () => parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

/** Each column's laid-out width in rem, keyed by its header's `data-col`. */
export function measureColumns(table: HTMLTableElement): Record<string, number> {
  const out: Record<string, number> = {};
  for (const th of table.querySelectorAll<HTMLElement>('thead th[data-col]')) out[th.dataset.col!] = Math.round((th.getBoundingClientRect().width / remPx()) * 10) / 10;
  return out;
}

/**
 * The width in rem that fits a column's widest cell, measured by laying the table out at its
 * natural size for one synchronous read (the table opts in with a `data-measure` style rule).
 */
export function fitColumn(table: HTMLTableElement, col: string): number {
  table.dataset.measure = 'true';
  const th = table.querySelector<HTMLElement>(`thead th[data-col="${col}"]`);
  const w = th ? th.getBoundingClientRect().width : 0;
  delete table.dataset.measure;
  return Math.ceil((w / remPx()) * 10) / 10;
}
