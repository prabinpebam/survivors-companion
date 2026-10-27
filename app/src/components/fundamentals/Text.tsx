/**
 * Text in one of the type roles. UI text and content text use different variants, never mixed.
 * Use for every visible string outside a control; controls carry their own labels.
 * @tier fundamental
 * @a11y Headings use real heading elements via `as`; the visual variant never changes the outline.
 */
import type { ComponentChildren } from 'preact';
import s from './Text.module.css';

type Props = {
  /** The words. */
  children: ComponentChildren;
  /** title: a screen title; heading: a section name; label: a small label; body: UI text; content: text from the codex; muted: secondary; number: a changing number. */
  variant?: 'title' | 'heading' | 'label' | 'body' | 'content' | 'muted' | 'number';
  /** The element: a heading level for titles and headings, p for paragraphs, span inline. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  /** Keeps to one line with an ellipsis. */
  truncate?: boolean;
  /** For live counts: announces changes politely. */
  live?: boolean;
};

export function Text({ children, variant = 'body', as = 'span', truncate = false, live = false }: Props) {
  const Tag = as;
  return (
    <Tag class={s.text} data-variant={variant} data-truncate={truncate ? 'true' : undefined} aria-live={live ? 'polite' : undefined}>
      {children}
    </Tag>
  );
}
