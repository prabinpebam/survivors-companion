/**
 * The resize handle between the item column and the detail column. Drag it, or focus it and use
 * the keys; double-click or Enter restores the default width. Shown only while both columns show.
 * @tier shell
 * @a11y A focusable separator (APG window splitter) that names and controls the item column, with
 * its width in rem as the value.
 * @key Right / Left: widens / narrows the item column by one step (Shift: four steps)
 * @key Home / End: narrowest / widest
 * @key Enter: restores the default width
 */
import { useRef } from 'preact/hooks';
import { remToken, widthAt, widthForKey, type Range } from '../design/resize';
import s from './Splitter.module.css';

type Props = {
  /** What the handle resizes, as words. */
  label: string;
  /** The id of the item column it controls. */
  controls: string;
  /** The current width in rem, or null for the default. */
  width: number | null;
  /** While dragging: show this width without saving it. */
  onPreview: (rem: number) => void;
  /** Save this width (null restores the default). */
  onCommit: (rem: number | null) => void;
};

function rangeOf(el: Element): Range {
  return {
    min: remToken(el, '--size-list-min'),
    max: remToken(el, '--size-list-max'),
    step: remToken(el, '--size-list-step'),
    initial: remToken(el, '--size-list'),
  };
}

export function Splitter({ label, controls, width, onPreview, onCommit }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ left: number; rem: number; last: number } | null>(null);
  const range = () => rangeOf(ref.current ?? document.documentElement);
  const current = () => width ?? range().initial;

  function down(e: PointerEvent) {
    if (e.button !== 0 || !ref.current) return;
    e.preventDefault();
    const left = document.getElementById(controls)?.getBoundingClientRect().left ?? 0;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    drag.current = { left, rem, last: current() };
    ref.current.setPointerCapture(e.pointerId);
    ref.current.dataset.dragging = 'true';
  }
  function move(e: PointerEvent) {
    const d = drag.current;
    if (!d) return;
    d.last = widthAt(e.clientX, d.left, d.rem, range());
    onPreview(d.last);
  }
  function up(e: PointerEvent) {
    const d = drag.current;
    if (!d || !ref.current) return;
    drag.current = null;
    ref.current.releasePointerCapture(e.pointerId);
    delete ref.current.dataset.dragging;
    onCommit(d.last);
  }
  function key(e: KeyboardEvent) {
    const r = range();
    const next = widthForKey(e.key, e.shiftKey, current(), r, 'end');
    if (next === null) return;
    e.preventDefault();
    onCommit(next === r.initial ? null : next);
  }
  const r = ref.current ? range() : null;

  return (
    <div
      ref={ref}
      class={s.splitter}
      role="separator"
      aria-orientation="vertical"
      aria-label={label}
      aria-controls={controls}
      aria-valuenow={Math.round(current())}
      aria-valuemin={r ? r.min : undefined}
      aria-valuemax={r ? r.max : undefined}
      title={label}
      tabIndex={0}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onKeyDown={key}
      onDblClick={() => onCommit(null)}
    />
  );
}
