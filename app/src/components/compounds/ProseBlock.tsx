/**
 * Content text from the game data: descriptions, level-up notes, unlock conditions. Read at a comfortable measure.
 * Use only for content, never for UI text (UI text comes from the copy catalogue).
 * @tier compound
 * @a11y Plain paragraphs or an ordered list; leading labels (like "Lv 2") are part of the text.
 */
import s from './ProseBlock.module.css';

type Props = {
  /** Paragraphs, or numbered lines when a lead is given (for example a level). */
  items: { lead?: string; text: string }[];
};

export function ProseBlock({ items }: Props) {
  const shown = items.filter((i) => i.text);
  if (!shown.length) return null;
  if (shown.some((i) => i.lead))
    return (
      <ol class={s.lines}>
        {shown.map((i) => (
          <li class={s.line}>
            {i.lead && <span class={s.lead}>{i.lead}</span>}
            <span>{i.text}</span>
          </li>
        ))}
      </ol>
    );
  return (
    <div class={s.prose}>
      {shown.map((i) => (
        <p>{i.text}</p>
      ))}
    </div>
  );
}
