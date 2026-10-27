/** Tier 0: UI text from the catalogue. Keys are "<id>"; the catalogue stores "<kind>:<id>" for the copy lint. */
import catalogue from './en.json';

const TEXT = new Map<string, string>();
for (const [key, text] of Object.entries(catalogue as Record<string, string>)) TEXT.set(key.slice(key.indexOf(':') + 1), text);

/** The catalogue string for a key, with {name} placeholders filled. A missing key shows the key, so it's caught on screen. */
export function t(key: string, vars: Record<string, string | number> = {}): string {
  const text = TEXT.get(key);
  if (text == null) return `⟦${key}⟧`;
  return text.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
}

/** A count with the right plural: tCount('count', 3) → "3 items". */
export function tCount(key: string, n: number): string {
  return t(`${key}.${n === 1 ? 'one' : 'other'}`, { n });
}

/** The catalogue string if it exists, otherwise a fallback (for labels that come from data). */
export function tOr(key: string, fallback: string): string {
  return TEXT.has(key) ? t(key) : fallback;
}
