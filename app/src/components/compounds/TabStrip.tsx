/**
 * A row of tabs that are links: each tab has its own address.
 * Use for the Codex collections; not for switching views of one list (use Segmented).
 * @tier compound
 * @a11y A nav landmark of links with aria-current, so each tab can be opened, shared and bookmarked.
 */
import type { Kind } from '../../design/icons';
import { KindMark } from '../fundamentals/KindMark';
import s from './TabStrip.module.css';

type Props = {
  /** The landmark's name. */
  label: string;
  /** The tabs in order. */
  tabs: { id: string; label: string; href: string; current: boolean; kind?: Kind }[];
};

export function TabStrip({ label, tabs }: Props) {
  return (
    <nav class={s.strip} aria-label={label}>
      <ul class={s.list}>
        {tabs.map((tab) => (
          <li>
            <a class={s.tab} href={tab.href} aria-current={tab.current ? 'page' : undefined}>
              {tab.kind && <KindMark kind={tab.kind} />}
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
