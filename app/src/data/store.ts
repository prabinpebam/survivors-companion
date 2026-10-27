/** Tier 0: marks and preferences saved in this browser (localStorage), with a tiny subscribe hook. */
import { useEffect, useState } from 'preact/hooks';
import type { MarkState } from './types';

export type Scheme = 'system' | 'light' | 'dark';
/**
 * `list` is the item column's width in rem once a person resizes it. `columns` holds table column
 * widths in rem, per collection. `open` holds which detail sections are open, per kind of item.
 */
export type Prefs = {
  scheme: Scheme;
  packs: string[] | null;
  spoilers: 'hide' | 'show';
  revealed: string[];
  list: number | null;
  columns: Record<string, Record<string, number>>;
  open: Record<string, string[]>;
};

const PREFS_KEY = 'vsc.prefs.v1';
const MARKS_KEY = 'vsc.marks.v1';
const DEFAULT_PREFS: Prefs = { scheme: 'system', packs: null, spoilers: 'hide', revealed: [], list: null, columns: {}, open: {} };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

type State = { prefs: Prefs; marks: Record<string, MarkState> };
let state: State = { prefs: read(PREFS_KEY, DEFAULT_PREFS), marks: read<Record<string, MarkState>>(MARKS_KEY, {}) };
const listeners = new Set<() => void>();

function commit(next: State) {
  state = next;
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(state.prefs));
    localStorage.setItem(MARKS_KEY, JSON.stringify(state.marks));
  } catch {
    /* storage full or blocked: the session keeps working; I12 adds the visible warning */
  }
  applyScheme(state.prefs.scheme);
  for (const l of listeners) l();
}

/** Puts the chosen colour scheme on the root element; "system" follows the device. */
export function applyScheme(scheme: Scheme) {
  const root = document.documentElement;
  if (scheme === 'system') root.removeAttribute('data-scheme');
  else root.setAttribute('data-scheme', scheme);
}

const deviceDark = window.matchMedia('(prefers-color-scheme: dark)');

/** The scheme actually showing: the chosen one, or the device's when following it. */
export function effectiveScheme(scheme: Scheme): 'light' | 'dark' {
  return scheme === 'system' ? (deviceDark.matches ? 'dark' : 'light') : scheme;
}

// A device theme change re-renders anything that names the current scheme (the theme toggle).
deviceDark.addEventListener('change', () => {
  for (const l of listeners) l();
});

export const store = {
  get: () => state,
  setPrefs(patch: Partial<Prefs>) {
    commit({ ...state, prefs: { ...state.prefs, ...patch } });
  },
  setMark(ref: string, mark: MarkState | null) {
    const marks = { ...state.marks };
    if (mark) marks[ref] = mark;
    else delete marks[ref];
    commit({ ...state, marks });
  },
  reveal(ref: string) {
    if (!state.prefs.revealed.includes(ref)) commit({ ...state, prefs: { ...state.prefs, revealed: [...state.prefs.revealed, ref] } });
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

/** The current store state; re-renders the caller on any change. */
export function useStore(): State {
  const [, setTick] = useState(0);
  useEffect(() => store.subscribe(() => setTick((n) => n + 1)), []);
  return store.get();
}
