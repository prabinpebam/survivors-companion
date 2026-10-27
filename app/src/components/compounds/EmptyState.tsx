/**
 * What will be here, and the one action to start. Also used for a wait or a failure that fills a region.
 * Use when a list, a peek or a destination has nothing to show yet.
 * @tier compound
 * @a11y The message is a status region when it reports a wait or a result, so the change is announced.
 */
import type { IconName } from '../../design/icons';
import { Button } from '../fundamentals/Button';
import { Icon } from '../fundamentals/Icon';
import { Text } from '../fundamentals/Text';
import s from './EmptyState.module.css';

type Props = {
  icon: IconName;
  /** One or two short sentences. */
  message: string;
  /** The one action to start, if any. */
  action?: { label: string; href?: string; onPress?: () => void; icon?: IconName };
  /** Announce the message (for waits and results). */
  live?: boolean;
};

export function EmptyState({ icon, message, action, live = false }: Props) {
  return (
    <div class={s.empty}>
      <span class={s.icon}>
        <Icon name={icon} size="lg" />
      </span>
      <Text variant="body" as="p" live={live}>
        {message}
      </Text>
      {action && (
        <Button variant="primary" icon={action.icon} href={action.href} onPress={action.onPress}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
