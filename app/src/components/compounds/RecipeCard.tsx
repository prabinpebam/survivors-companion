/**
 * A recipe at a glance: the inputs, then the result, each as a picture with its name. "A + B → C" without words.
 * Use for evolution and union pairings anywhere; the focus item (the one the person asked about) is outlined.
 * @tier compound
 * @a11y A group named by a full sentence (for example "Whip at max level and Hollow Heart make Bloody Tear"); each part is a link; the plus and arrow are decorative.
 */
import type { Kind } from '../../design/icons';
import { Icon } from '../fundamentals/Icon';
import { Sprite } from '../fundamentals/Sprite';
import { Text } from '../fundamentals/Text';
import s from './RecipeCard.module.css';

type Part = {
  name: string;
  kind: Kind;
  sprite: { file: string; w: number; h: number } | null;
  /** Where the part's peek is; null when the part isn't in the codex. */
  href: string | null;
  /** A short note under the name (for example "Max level"). */
  note?: string;
  /** The item the person asked about. */
  focus?: boolean;
};
type Props = {
  /** The whole recipe as one sentence, for screen readers. */
  sentence: string;
  /** The recipe's type, shown as a label (Evolution or Union); omit it where a heading already says it. */
  typeLabel?: string;
  inputs: Part[];
  result: Part;
};

function Piece({ part }: { part: Part }) {
  const body = (
    <>
      <Sprite sprite={part.sprite} kind={part.kind} name={part.name} size="lg" />
      <span class={s.name}>{part.name}</span>
      {part.note && <span class={s.note}>{part.note}</span>}
    </>
  );
  return part.href ? (
    <a class={s.piece} href={part.href} data-focus={part.focus ? 'true' : undefined}>
      {body}
    </a>
  ) : (
    <span class={s.piece} data-missing="true">
      {body}
    </span>
  );
}

export function RecipeCard({ sentence, typeLabel, inputs, result }: Props) {
  return (
    <div class={s.card} role="group" aria-label={sentence}>
      {typeLabel && (
        <span class={s.type}>
          <Text variant="heading">{typeLabel}</Text>
        </span>
      )}
      <div class={s.formula}>
        {inputs.map((p, i) => (
          <>
            {i > 0 && (
              <span class={s.op}>
                <Icon name="plus" size="sm" />
              </span>
            )}
            <Piece part={p} />
          </>
        ))}
        <span class={s.op}>
          <Icon name="arrow" size="sm" />
        </span>
        <Piece part={result} />
      </div>
    </div>
  );
}
