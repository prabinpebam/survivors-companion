/**
 * Filter chips grouped by facet, each with how many items it would show, and a way to clear them.
 * Use under a CollectionToolbar; facets and their options come from the collection's data.
 * @tier compound
 * @a11y Each facet is a labelled group of toggle buttons; the clear action appears only when a filter is on.
 */
import { Button } from '../fundamentals/Button';
import { Chip } from '../fundamentals/Chip';
import { Text } from '../fundamentals/Text';
import s from './FilterBar.module.css';

type Facet = { id: string; label: string; options: { value: string; label: string; count: number; active: boolean }[] };
type Props = {
  /** The bar's name. */
  label: string;
  /** Facets in order; a facet with one option or none is skipped. */
  facets: Facet[];
  /** Turns an option on or off. */
  onToggle: (facet: string, value: string) => void;
  /** The clear action's label, and what it does. */
  clear: { label: string; onPress: () => void } | null;
};

export function FilterBar({ label, facets, onToggle, clear }: Props) {
  const shown = facets.filter((f) => f.options.length > 1 || f.options.some((o) => o.active));
  if (!shown.length) return null;
  return (
    <div class={s.bar} role="group" aria-label={label}>
      {shown.map((f) => (
        <div class={s.facet} role="group" aria-label={f.label}>
          <span class={s.name}>
            <Text variant="heading">{f.label}</Text>
          </span>
          {f.options.map((o) => (
            <Chip label={o.label} count={o.count} selected={o.active} onToggle={() => onToggle(f.id, o.value)} />
          ))}
        </div>
      ))}
      {clear && (
        <span class={s.clear}>
          <Button variant="quiet" icon="close" onPress={clear.onPress}>
            {clear.label}
          </Button>
        </span>
      )}
    </div>
  );
}
