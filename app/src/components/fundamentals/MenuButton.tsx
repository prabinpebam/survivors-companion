/**
 * A dropdown menu of exclusive choices, like a file manager's Sort and Group by menus: a button
 * showing the current choice opens a short menu of one or more labelled sections; picking an
 * option applies it and closes the menu. Use for arranging a collection (sort field and order,
 * grouping); use Segmented for 2–5 always-visible choices.
 * @tier fundamental
 * @a11y APG menu button: the button names the menu and states the current choice; options are
 * menuitemradio in named groups. Opens in the top layer, so no container clips it; light dismiss.
 * @key Enter / Space / Down on the button: opens the menu on the current choice
 * @key Up / Down / Home / End: moves through the options (wrapping)
 * @key Enter / Space: picks the focused option and closes
 * @key Escape / Tab: closes and returns to the button
 */
import { useEffect, useId, useRef } from 'preact/hooks';
import type { IconName } from '../../design/icons';
import { Glyph } from '../../design/glyph';
import { nextIndex } from '../../design/roving';
import s from './MenuButton.module.css';

type Section = {
  /** The section's name, shown above its options and read as the group's name. */
  label: string;
  /** The options in order. */
  options: { value: string; label: string }[];
  /** The chosen option's value. */
  value: string;
  /** Called with the picked value. */
  onChange: (value: string) => void;
};
type Props = {
  /** What the menu sets, as words ("Sort", "Group by"): part of the button's name and its tooltip. */
  label: string;
  /** The button's icon. */
  icon: IconName;
  /** The current choice, shown on the button. */
  value: string;
  /** The menu's sections, separated by a rule. */
  sections: Section[];
};

const items = (menu: HTMLElement) => [...menu.querySelectorAll<HTMLElement>('[role="menuitemradio"]')];

export function MenuButton({ label, icon, value, sections }: Props) {
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const m = menu.current;
    if (!m) return;
    const onToggle = (e: Event) => {
      const open = (e as ToggleEvent).newState === 'open';
      button.current?.setAttribute('aria-expanded', String(open));
      if (!open) return;
      const b = button.current!.getBoundingClientRect();
      const right = b.left + m.offsetWidth > window.innerWidth;
      m.style.setProperty('--menu-top', `${b.bottom}px`);
      m.style.setProperty('--menu-left', `${right ? b.right - m.offsetWidth : b.left}px`);
      (items(m).find((i) => i.getAttribute('aria-checked') === 'true') ?? items(m)[0])?.focus();
    };
    const onScroll = (e: Event) => {
      if (m.matches(':popover-open') && !m.contains(e.target as Node)) m.hidePopover();
    };
    m.addEventListener('toggle', onToggle);
    document.addEventListener('scroll', onScroll, true);
    return () => {
      m.removeEventListener('toggle', onToggle);
      document.removeEventListener('scroll', onScroll, true);
    };
  }, []);

  function close() {
    menu.current?.hidePopover();
    button.current?.focus();
  }
  function onMenuKey(e: KeyboardEvent) {
    const list = items(menu.current!);
    if (e.key === 'Escape' || e.key === 'Tab') {
      e.preventDefault();
      close();
      return;
    }
    const next = nextIndex(e.key, list.indexOf(document.activeElement as HTMLElement), list.length);
    if (next === null) return;
    e.preventDefault();
    list[next].focus();
  }
  function onButtonKey(e: KeyboardEvent) {
    if (e.key !== 'ArrowDown') return;
    e.preventDefault();
    menu.current?.showPopover();
  }

  return (
    <>
      <button
        ref={button}
        type="button"
        class={s.button}
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls={id}
        aria-label={`${label}: ${value}`}
        title={label}
        popoverTarget={id}
        onKeyDown={onButtonKey}
      >
        <Glyph name={icon} size="sm" />
        <span class={s.value}>{value}</span>
        <Glyph name="chevron" size="sm" />
      </button>
      <div ref={menu} id={id} popover="auto" role="menu" aria-label={label} class={s.menu} onKeyDown={onMenuKey}>
        {sections.map((sec) => (
          <div role="group" aria-label={sec.label} class={s.section}>
            <span class={s.heading} aria-hidden="true">
              {sec.label}
            </span>
            {sec.options.map((o) => (
              <button
                type="button"
                role="menuitemradio"
                aria-checked={o.value === sec.value}
                tabIndex={-1}
                class={s.item}
                onClick={() => {
                  sec.onChange(o.value);
                  close();
                }}
              >
                <span class={s.check}>{o.value === sec.value && <Glyph name="check" size="sm" />}</span>
                {o.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
