/**
 * The controls above a collection: find, view switcher, Sort and Group by menus, and the live count.
 * Use at the top of any collection screen; the views, sorts and groupings it offers come from the
 * collection's data.
 * @tier compound
 * @a11y The count is a polite live region, so narrowing the list is announced.
 */
import type { ComponentProps } from 'preact';
import type { IconName } from '../../design/icons';
import { MenuButton } from '../fundamentals/MenuButton';
import { SearchField } from '../fundamentals/SearchField';
import { Segmented } from '../fundamentals/Segmented';
import { Text } from '../fundamentals/Text';
import s from './CollectionToolbar.module.css';

type Option = { value: string; label: string };
type Menu = Omit<ComponentProps<typeof MenuButton>, 'icon'>;
type Props = {
  /** The find field: its label, example, text and change handler. */
  search: { label: string; placeholder: string; value: string; onInput: (v: string) => void };
  /** The view switcher, when the collection has more than one view. */
  views?: { label: string; options: (Option & { icon: IconName })[]; value: string; onChange: (v: string) => void };
  /** The Sort menu: field and order. */
  sort?: Menu;
  /** The Group by menu. */
  group?: Menu;
  /** The count of items shown, as words. */
  count: string;
};

export function CollectionToolbar({ search, views, sort, group, count }: Props) {
  return (
    <div class={s.bar}>
      <div class={s.find}>
        <SearchField {...search} />
      </div>
      <div class={s.controls}>
        {views && <Segmented compact {...views} />}
        {sort && <MenuButton icon="sort" {...sort} />}
        {group && <MenuButton icon="group" {...group} />}
        <span class={s.count}>
          <Text variant="muted" live>
            {count}
          </Text>
        </span>
      </div>
    </div>
  );
}
