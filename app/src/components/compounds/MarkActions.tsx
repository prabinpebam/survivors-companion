/**
 * The person's progress mark for one item, and the actions to change it.
 * Use in a peek; marks are saved in this browser straight away (no save step).
 * @tier compound
 * @a11y A labelled group of toggle buttons; the current mark is pressed and also said in words.
 */
import type { IconName } from '../../design/icons';
import { Button } from '../fundamentals/Button';
import { MarkBadge } from '../fundamentals/MarkBadge';
import s from './MarkActions.module.css';

type Props = {
  /** The group's name. */
  label: string;
  /** The current mark and its words. */
  state: 'unlocked' | 'skipped' | null;
  stateLabel: string;
  /** The actions in order. */
  actions: { id: string; label: string; icon: IconName; pressed?: boolean; onPress: () => void }[];
};

export function MarkActions({ label, state, stateLabel, actions }: Props) {
  return (
    <div class={s.group} role="group" aria-label={label}>
      <MarkBadge state={state} label={stateLabel} />
      <div class={s.actions}>
        {actions.map((a) => (
          <Button variant={a.pressed ? 'primary' : 'secondary'} icon={a.icon} pressed={a.pressed} onPress={a.onPress}>
            {a.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
