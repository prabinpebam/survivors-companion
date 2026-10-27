/** Tier 0: the keyboard model for moving focus through a list of items (APG menu, roving focus). */

/** The index focus moves to for a key, or null when the key doesn't move focus. Wraps at the ends. */
export function nextIndex(key: string, current: number, count: number): number | null {
  if (!count) return null;
  switch (key) {
    case 'ArrowDown':
      return (current + 1) % count;
    case 'ArrowUp':
      return (current - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return null;
  }
}
