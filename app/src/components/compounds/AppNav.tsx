/**
 * The app's main navigation: a bottom bar on compact windows, a rail on medium, a sidebar on expanded.
 * Dark mode and Settings sit in the top bar on compact and at the foot of the rail or sidebar otherwise.
 * Use once, in the Workspace layout's nav region.
 * @tier compound
 * @a11y A nav landmark with links; the current destination has aria-current="page". Dark mode is a
 * toggle button with aria-pressed.
 * @key Tab: moves through destinations
 * @key Enter / Space: toggles dark mode
 */
import type { IconName } from '../../design/icons';
import { Icon } from '../fundamentals/Icon';
import { IconButton } from '../fundamentals/IconButton';
import { Text } from '../fundamentals/Text';
import s from './AppNav.module.css';

type Item = { id: string; label: string; icon: IconName; href: string; current: boolean };
type Props = {
  /** The app's name, shown in the top bar and sidebar. */
  appName: string;
  /** A short tag after the name (for example "Prototype"). */
  tag?: string;
  /** The nav landmark's name. */
  label: string;
  /** The destinations in order. */
  items: Item[];
  /** The settings entry. */
  settings: { label: string; href: string; current: boolean };
  /** The dark mode toggle: its label, whether dark is showing, and what pressing does. */
  theme: { label: string; dark: boolean; onToggle: () => void };
};

export function AppNav({ appName, tag, label, items, settings, theme }: Props) {
  return (
    <>
      <div class={s.top}>
        <span class={s.brand}>
          <Text variant="label">{appName}</Text>
          {tag && <span class={s.tag}>{tag}</span>}
        </span>
        <span class={s.tools}>
          <IconButton icon="moon" label={theme.label} pressed={theme.dark} onPress={theme.onToggle} />
          <IconButton icon="settings" label={settings.label} href={settings.href} pressed={settings.current} />
        </span>
      </div>
      <nav class={s.nav} aria-label={label}>
        <span class={s.sideBrand}>
          <Text variant="label">{appName}</Text>
          {tag && <span class={s.tag}>{tag}</span>}
        </span>
        <ul class={s.list}>
          {items.map((it) => (
            <li>
              <a class={s.item} href={it.href} aria-current={it.current ? 'page' : undefined}>
                <span class={s.icon}>
                  <Icon name={it.icon} />
                </span>
                <span class={s.label}>{it.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div class={s.foot}>
          <button type="button" class={s.item} aria-pressed={theme.dark} onClick={theme.onToggle}>
            <span class={s.icon}>
              <Icon name="moon" />
            </span>
            <span class={s.label}>{theme.label}</span>
          </button>
          <a class={s.item} href={settings.href} aria-current={settings.current ? 'page' : undefined}>
            <span class={s.icon}>
              <Icon name="settings" />
            </span>
            <span class={s.label}>{settings.label}</span>
          </a>
        </div>
      </nav>
    </>
  );
}
