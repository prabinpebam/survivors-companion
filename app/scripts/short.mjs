/**
 * Well-known short forms for the generated data (UI text rules: "Numbers"). Units after a number
 * become their symbols everywhere outside paragraphs and headings ("1.3 seconds" → "1.3 s",
 * "Survive 20 minutes" → "Survive 20 min", "0.2 HP per second" → "0.2 HP/s"); labels and column
 * headers also take "Max", "Min", "Crit", "XP" and "%" and put a unit in brackets as its symbol
 * ("Spawn interval (seconds)" → "Spawn interval (s)"). Paragraphs, quotes, notes and section
 * headings keep the source's words. A no-break space keeps a number and its unit on one line.
 * Never writes inside resources/: it rewrites the generated copy only.
 */
const NB = '\u00a0';
const UNIT = [
  [/(\d)\s*(?:milliseconds?|msecs?)\b/gi, `$1${NB}ms`],
  [/(\d)\s*(?:seconds?|secs?)\b/gi, `$1${NB}s`],
  [/(\d)\s*(?:minutes?|mins)\b/gi, `$1${NB}min`],
  [/(\d)\s*(?:hours?|hrs?)\b/gi, `$1${NB}h`],
  [/(\d)\s*percent\b/gi, '$1%'],
];
const RATE = /(\d[\d.,]*%?(?:[\s\u00a0][A-Za-z]{1,6})?)\s+per\s+second\b/gi;
// A unit in the next run after a number ("5" then " seconds"), as links and pictures split runs.
const LEAD = [[/^\s*(?:seconds?|secs?)\b/i, `${NB}s`], [/^\s*(?:minutes?|mins)\b/i, `${NB}min`], [/^\s*(?:hours?|hrs?)\b/i, `${NB}h`]];
const LABEL = [
  [/\((?:in )?seconds?\)/gi, '(s)'],
  [/\((?:in )?minutes?\)/gi, '(min)'],
  [/\bMaximum\b/g, 'Max'], [/\bmaximum\b/g, 'max'],
  [/\bMinimum\b/g, 'Min'], [/\bminimum\b/g, 'min'],
  [/\bCritical\b/g, 'Crit'], [/\bcritical\b/g, 'crit'],
  [/\bExperience\b/g, 'XP'], [/\bexperience\b/g, 'XP'],
  [/\s*\bPercentage\b/gi, ' %'],
];

let changed = 0;
const sub = (s, rules) => rules.reduce((x, [re, to]) => x.replace(re, to), s);
const count = (a, b) => (a !== b && changed++, b);
const units = (s) => sub(s, UNIT).replace(RATE, '$1/s');

/** A value's words with units shortened. */
export const value = (s) => (typeof s === 'string' ? count(s, units(s)) : s);
/** A label's or header's words: units, then Max, Min, Crit, XP and %. */
export const label = (s) => (typeof s === 'string' ? count(s, sub(units(s), LABEL).trim()) : s);

/** Runs of text (strings, links, pictures) with each run's words shortened. */
function runs(c, f) {
  if (!Array.isArray(c)) return c;
  let digit = false;
  return c.map((x) => {
    const text = typeof x === 'string' ? x : x && 't' in x ? x.t : null;
    if (text === null) return (digit = false), x;
    let t = digit ? LEAD.reduce((y, [re, to]) => y.replace(re, to), text) : text;
    t = f(t);
    digit = /\d\s*$/.test(t);
    return typeof x === 'string' ? t : { ...x, t };
  });
}

function blocks(bs) {
  return (bs ?? []).map((b) => {
    switch (b.k) {
      case 'table':
        return { ...b, rows: b.rows.map((r) => ({ ...r, cells: r.cells.map((c) => ({ ...c, c: runs(c.c, r.h || c.h ? label : value), ...(c.sub ? { sub: runs(c.sub, value) } : {}) })) })) };
      case 'facts':
        return { ...b, items: b.items.map((f) => ({ ...f, label: label(f.label), values: f.values.map((v) => ({ ...v, ...(v.col ? { col: label(v.col) } : {}), c: runs(v.c, value) })) })) };
      case 'ul':
      case 'ol':
        return { ...b, items: b.items.map((it) => ({ ...it, c: runs(it.c, value), ...(it.sub ? { sub: blocks([it.sub])[0] } : {}) })) };
      default:
        return b;
    }
  });
}

/** An item's page with short forms in its infobox, tables, stats and lists. */
export function detail(d) {
  return {
    ...d,
    lead: blocks(d.lead),
    infobox: d.infobox.map((g) => ({ ...g, ...(g.cols ? { cols: g.cols.map(label) } : {}), rows: g.rows.map((r) => ({ ...r, label: label(r.label), cells: r.cells.map((c) => runs(c, value)) })) })),
    sections: d.sections.map((s) => ({ ...s, blocks: blocks(s.blocks), subs: s.subs.map((u) => ({ ...u, blocks: blocks(u.blocks) })) })),
  };
}

const FIELDS = ['perLevel', 'maxEffect', 'unlock', 'effects', 'location'];
const map = (o, f) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, f(v)]));
/** The codex with short forms in each item's stats and short fields (never its name or caption). */
export function codex(c) {
  return {
    ...c,
    entities: c.entities.map((e) => {
      const out = { ...e };
      for (const k of FIELDS) if (typeof out[k] === 'string') out[k] = value(out[k]);
      if (out.stats && !Array.isArray(out.stats)) out.stats = map(out.stats, value);
      if (out.max) out.max = map(out.max, value);
      return out;
    }),
  };
}

/** How many strings were shortened since the build began. */
export const shortened = () => changed;
