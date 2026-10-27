/**
 * Inspector layout: everything about one item, beside the list it was picked from.
 * The glance comes first and always shows: identity (pinned while scrolling), the answer (what it
 * evolves with or into, how to start or unlock it), key facts and the person's mark. The full source
 * page follows as sections, each closed to one line (its title and a teaser) until opened, so the
 * whole page is there without being in the way.
 * Docked as the detail column on expanded windows (with the tab's overview, or its empty state,
 * when nothing is picked); a
 * side sheet on medium windows and a bottom sheet on compact ones, both over a scrim. Placed only
 * by the shell's detail host; views never place it themselves.
 * @tier layout
 * @a11y A complementary region named by the item's heading (or its label when empty). As a sheet it
 * takes focus when it opens or changes; docked, it scrolls to the top and leaves focus in the list.
 * Each section is a native disclosure whose summary holds a heading.
 * @key Escape: closes the item and returns to the list
 */
import type { ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { Glyph } from '../design/glyph';
import s from './Inspector.module.css';

type Section = {
  id: string;
  /** The section's heading. */
  title: string;
  /** One line about what's inside: a count, or its first sentence. */
  teaser: string;
  open: boolean;
  /** The section's content; only rendered while open. */
  content: ComponentChildren;
};
type Props = {
  /** The item shown, so a new item starts at the top; empty when nothing is picked. */
  itemKey: string;
  /** Shown while nothing is picked (a tab's overview): docked only, like the empty state, so it
   * never opens a sheet over the list or takes focus. */
  resting?: boolean;
  /** The id of the heading that names the region. */
  labelledBy?: string;
  /** The region's name when there is no heading (the empty state). */
  label?: string;
  /** Where closing goes (the same list without the item). */
  closeHref?: string;
  /** Called on Escape. */
  onClose?: () => void;
  /** Identity: sprite, name, kind, close. Or the empty state. */
  hero: ComponentChildren;
  /** The item's picture as content, first under the identity (wide art such as a stage's screenshot). */
  media?: ComponentChildren;
  /** The answer first: pairings, or the reveal step for a hidden secret. */
  answer?: ComponentChildren;
  /** Key facts. */
  facts?: ComponentChildren;
  /** The person's mark and other actions. */
  actions?: ComponentChildren;
  /** Above the sections: their heading and the open-all control. */
  sectionsHead?: ComponentChildren;
  /** The full page, as sections. */
  sections?: Section[];
  /** Instead of sections while they load, or when they can't. */
  sectionsStatus?: ComponentChildren;
  /** A section was opened or closed. */
  onSection?: (id: string, open: boolean) => void;
  /** Where the facts come from. */
  proof?: ComponentChildren;
};

export function Inspector(p: Props) {
  const ref = useRef<HTMLElement>(null);
  const empty = !p.itemKey;
  useEffect(() => {
    const el = ref.current;
    if (!el || empty) return;
    el.scrollTo({ top: 0 });
    if (!p.resting && getComputedStyle(el).position === 'fixed') el.focus({ preventScroll: true });
  }, [p.itemKey]);
  useEffect(() => {
    const onClose = p.onClose;
    if (!onClose) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !e.defaultPrevented) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [p.onClose]);
  const toggled = (e: Event) => {
    const d = e.currentTarget as HTMLDetailsElement;
    const was = p.sections?.find((x) => x.id === d.dataset.id)?.open;
    if (was !== d.open) p.onSection?.(d.dataset.id!, d.open);
  };
  return (
    <div class={s.host} data-empty={empty ? 'true' : undefined} data-resting={p.resting ? 'true' : undefined}>
      {p.closeHref && <a class={s.scrim} href={p.closeHref} tabIndex={-1} aria-hidden="true" />}
      <aside ref={ref} class={s.sheet} aria-labelledby={p.labelledBy} aria-label={p.labelledBy ? undefined : p.label} tabIndex={-1}>
        <span class={s.handle} aria-hidden="true" />
        <div class={s.hero}>{p.hero}</div>
        {!empty && (
          <div class={s.body}>
            {p.media && <div class={s.media}>{p.media}</div>}
            <div class={s.glance} data-answer={p.answer && (p.facts || p.actions) ? 'true' : undefined}>
              {p.answer && <div class={s.answer}>{p.answer}</div>}
              {(p.facts || p.actions) && (
                <div class={s.side}>
                  {p.facts}
                  {p.actions}
                </div>
              )}
            </div>
            {p.sectionsHead && <div class={s.sectionsHead}>{p.sectionsHead}</div>}
            {p.sectionsStatus}
            {p.sections && p.sections.length > 0 && (
              <div class={s.sections}>
                {p.sections.map((x) => (
                  <details key={`${p.itemKey}-${x.id}`} class={s.section} data-id={x.id} open={x.open} onToggle={toggled}>
                    <summary class={s.summary}>
                      <span class={s.chevron} aria-hidden="true">
                        <Glyph name={x.open ? 'chevron' : 'chevron-end'} size="sm" />
                      </span>
                      <span class={s.titles}>
                        <h3 class={s.title}>{x.title}</h3>
                        {!x.open && x.teaser && <span class={s.teaser}>{x.teaser}</span>}
                      </span>
                    </summary>
                    {x.open && <div class={s.content}>{x.content}</div>}
                  </details>
                ))}
              </div>
            )}
            {p.proof && <div class={s.proof}>{p.proof}</div>}
          </div>
        )}
      </aside>
    </div>
  );
}
