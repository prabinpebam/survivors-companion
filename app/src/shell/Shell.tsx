/**
 * The app frame: the navigation region, the main region for the current view's layout, and the
 * detail host that places the Inspector. Not a page layout; it holds exactly one of them at a time.
 * From medium windows the frame fills the viewport and each region scrolls on its own. On expanded
 * windows a view that has a detail becomes two columns: the items (main, resizable by a handle)
 * and the detail, which is always there (empty until something is picked), so picking an item
 * never reflows the list. Below that the detail is a sheet over the list.
 * @tier shell
 * @a11y One main landmark (the items); a skip link reaches it first. The resize handle is a
 * focusable separator that controls the main region.
 */
import type { ComponentChildren } from 'preact';
import { useRef } from 'preact/hooks';
import s from './Shell.module.css';
import { Splitter } from './Splitter';

type Props = {
  /** Skip-link text. */
  skipLabel: string;
  /** The navigation region (AppNav). */
  nav: ComponentChildren;
  /** The current view's layout. */
  main: ComponentChildren;
  /** The detail column's content (the Inspector), or null for views without one. */
  detail: ComponentChildren | null;
  /** The item column's saved width in rem; null for the default. */
  listWidth: number | null;
  /** The resize handle's label. */
  resizeLabel: string;
  /** Saves a new item column width (null restores the default). */
  onResize: (rem: number | null) => void;
};

const WIDTH = '--shell-list';

export function Shell({ skipLabel, nav, main, detail, listWidth, resizeLabel, onResize }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const preview = (rem: number) => ref.current?.style.setProperty(WIDTH, `${rem}rem`);
  const split = detail !== null;
  return (
    <div ref={ref} class={s.shell} data-split={split ? 'true' : undefined} style={listWidth ? { [WIDTH]: `${listWidth}rem` } : undefined}>
      <a class={s.skip} href="#main">
        {skipLabel}
      </a>
      <div class={s.nav}>{nav}</div>
      <main id="main" class={s.main} tabIndex={-1}>
        {main}
      </main>
      {split && <Splitter label={resizeLabel} controls="main" width={listWidth} onPreview={preview} onCommit={onResize} />}
      {split && <div id="detail" class={s.detail}>{detail}</div>}
    </div>
  );
}
