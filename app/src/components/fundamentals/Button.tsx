/**
 * A button: an action here, or a link styled as one when it goes somewhere.
 * Use for the main actions of a peek, a settings group or an empty state; not for navigation lists (use AppNav or TabStrip).
 * @tier fundamental
 * @a11y A button element when it does something, a link when it goes somewhere.
 * @a11y Pressed state is announced with aria-pressed when the button toggles.
 * @key Enter / Space: activates
 */
import type { ComponentChildren } from 'preact';
import type { IconName } from '../../design/icons';
import { Glyph } from '../../design/glyph';
import s from './Button.module.css';

type Props = {
  /** The visible label: a verb first, three words or fewer. */
  children: ComponentChildren;
  /** primary: the one main action; secondary: other actions; quiet: low-emphasis actions in dense places. */
  variant?: 'primary' | 'secondary' | 'quiet';
  /** An icon before the label. */
  icon?: IconName;
  /** Goes somewhere: renders a link. */
  href?: string;
  /** Opens the link in a new tab (external sources only). */
  external?: boolean;
  /** Does something: renders a button. */
  onPress?: () => void;
  /** For toggles: whether it is on. */
  pressed?: boolean;
};

export function Button({ children, variant = 'secondary', icon, href, external = false, onPress, pressed }: Props) {
  const inner = (
    <>
      {icon && <Glyph name={icon} size="sm" />}
      <span>{children}</span>
      {external && <Glyph name="external" size="sm" />}
    </>
  );
  if (href)
    return (
      <a class={s.button} data-variant={variant} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
        {inner}
      </a>
    );
  return (
    <button type="button" class={s.button} data-variant={variant} aria-pressed={pressed} onClick={onPress}>
      {inner}
    </button>
  );
}
