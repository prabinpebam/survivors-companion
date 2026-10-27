/**
 * Tier 0: finds the source's cards in running text, so a page reads as things, not paragraphs.
 *   - A list whose items are "picture, name - what it does" (arcanas, stage items, relics) becomes
 *     entry cards; a list of only pictures and names becomes tiles.
 *   - A mechanics section's paragraphs become one card per statement, led by the stat it names.
 *   - A small table of things (levels, limit-break bonuses, ranks) becomes one card per row.
 *   - A wide table of records led by a picture column (a stage's traps) becomes one tile per row.
 *   - A stage's waves table becomes one card per wave (data/waves).
 * Nothing is reworded: every run of the source stays, in order; only a picture lifted to lead a
 * card leaves the words, and a column's unit moves onto its bare numbers ("Duration (s)", "20" →
 * "Duration", "20 s"). Units are shortened when the data is built (scripts/short.mjs).
 */
import { plain, type Inline, type ListItem, type RichBlock } from './detail';
import { foldCorner } from './tables';
import { wavesOf, type WavesBlock } from './waves';

type Pic = Extract<Inline, { i: string }>;
type Word = Extract<Inline, { t: string }>;
/** A card: what it is about (a picture and a name, linked), then the words, then any sub-points. Shows `name` when set; otherwise the picture alone leads, named by `pic.a`. A table row's card has a rich `title` and labelled `fields`. */
export type Card = {
  c: Inline[];
  name?: string;
  r?: string;
  pic?: { i: string; w: number; h: number; a: string };
  subs?: Inline[][];
  title?: Inline[];
  fields?: { label: string; c: Inline[] }[];
  /** A row's one value (a two-column table's second column), shown large like a stat. */
  value?: Inline[];
  /** A record's wordy column (notes), shown last under its column name. */
  note?: { label: string; c: Inline[] };
};
export type CardsBlock = { k: 'cards'; look: 'entries' | 'tiles' | 'points' | 'rows' | 'records'; items: Card[]; caption?: Inline[] };

const isPic = (x: Inline | undefined): x is Pic => !!x && typeof x !== 'string' && 'i' in x;
const isWord = (x: Inline | undefined): x is Word => !!x && typeof x !== 'string' && 't' in x;
const blank = (x: Inline | undefined) => typeof x === 'string' && !x.trim();
/** Between a name and what it does: a dash or a colon. */
const SEP = /^\s*[-–—:]\s+/;

/** "Picture Name - what it does", or just "Picture Name", as a card; null when the item is a sentence. */
function entry(c: Inline[]): Card | null {
  let j = 0;
  const pic = isPic(c[0]) ? c[j++] as Pic : undefined;
  while (blank(c[j])) j++;
  const name = c[j];
  if (!isWord(name) || !(pic || name.r)) return null;
  const rest = c.slice(j + 1);
  if (rest.every(blank)) return { c: [], name: name.t, r: name.r, pic: pic && { i: pic.i, w: pic.w, h: pic.h, a: name.t } };
  if (typeof rest[0] !== 'string' || !SEP.test(rest[0])) return null;
  const words = [rest[0].replace(SEP, ''), ...rest.slice(1)].filter((x) => x !== '');
  return { c: words, name: name.t, r: name.r, pic: pic && { i: pic.i, w: pic.w, h: pic.h, a: name.t } };
}

/** A list as cards when most of its items name a thing first; null otherwise. A nested list's entries become the card's sub-points. */
export function entryCards(items: ListItem[]): CardsBlock | null {
  if (items.some((it) => it.sub?.items.some((x) => x.sub))) return null;
  const cards = items.map((it) => entry(it.c));
  const hits = cards.filter(Boolean).length;
  if (!hits || hits < items.length * 0.6) return null;
  const all = cards.map((x, i) => ({ ...(x ?? { c: items[i].c }), ...(items[i].sub ? { subs: items[i].sub!.items.map((s) => s.c) } : {}) }));
  return { k: 'cards', look: all.every((x) => !x.c.length && !x.subs && x.pic) ? 'tiles' : 'entries', items: all };
}

/** Words that end with a full stop but don't end a sentence. */
const ABBR = /\b(?:e\.g|i\.e|vs|approx|etc|lv|no|ca|ver)\.$/i;
const BOUNDARY = /[.!?](\s+)(?=["“(]?[A-Z0-9]|$)/g;

/** A paragraph's runs, split into sentences; a link or a picture never splits. */
export function sentences(c: Inline[]): Inline[][] {
  const out: Inline[][] = [];
  let cur: Inline[] = [];
  const flush = () => {
    const first = cur[0];
    if (typeof first === 'string') cur[0] = first.trimStart();
    const last = cur[cur.length - 1];
    if (typeof last === 'string') cur[cur.length - 1] = last.trimEnd();
    cur = cur.filter((x) => x !== '');
    if (plain(cur)) out.push(cur);
    cur = [];
  };
  for (const r of c) {
    if (typeof r !== 'string') {
      cur.push(r);
      continue;
    }
    let from = 0;
    for (const m of r.matchAll(BOUNDARY)) {
      const end = m.index! + 1;
      if (ABBR.test(plain([...cur, r.slice(from, end)]))) continue;
      cur.push(r.slice(from, end));
      flush();
      from = end + m[1].length;
    }
    if (from < r.length) cur.push(r.slice(from));
  }
  flush();
  return out;
}

/** A statement as a card, led by the first other thing it pictures (a stat, most often). */
function point(c: Inline[], self: string): Card {
  const at = c.findIndex((x) => isPic(x) && !!x.r && x.r !== self);
  if (at < 0) return { c };
  const pic = c[at] as Pic;
  const named = c.find((x): x is Word => isWord(x) && x.r === pic.r);
  const words = c.filter((_, i) => i !== at && !(i === at + 1 && blank(c[i])));
  if (typeof words[0] === 'string') words[0] = words[0].trimStart();
  return { c: words.filter((x) => x !== ''), r: pic.r, pic: { i: pic.i, w: pic.w, h: pic.h, a: named?.t ?? pic.a ?? '' } };
}

/** Titles of sections that explain how a thing works. */
const MECHANICS = /^(effects?|mechanics)$/i;
export const isMechanics = (title: string) => MECHANICS.test(title.trim());

/** Average characters past which a second column reads as the row's words rather than a value. */
const WORDY = 24;
/** Average characters past which a first column isn't a name for its row (a column of lists). */
const NAMEY = 40;
type Table = Extract<RichBlock, { k: 'table' }>;

const UNIT_LABEL = /\s+\((s|ms|min|h|%)\)\s*$/;
/** A labelled value with the column's unit moved onto a bare number: "Duration (s)", "20" → "Duration", "20 s". */
export function field(label: string, c: Inline[]): { label: string; c: Inline[] } {
  const m = label.match(UNIT_LABEL);
  if (!m || c.length !== 1 || typeof c[0] !== 'string' || !/^\s*[-+]?\d[\d.,]*\s*$/.test(c[0])) return { label, c };
  return { label: label.replace(UNIT_LABEL, ''), c: [`${c[0].trim()}${m[1] === '%' ? '' : '\u00a0'}${m[1]}`] };
}

/**
 * A small table of things (levels, limit-break bonuses, ranks) as one card per row: the first cell
 * titles the card; a wordy second column is its words, a short one in a two-column table its
 * value; other columns are labelled fields. Null for comparison tables: merged cells, more than
 * one header row, over four columns, or a first column that isn't a short, unique name per row.
 */
export function rowCards(b: Table): CardsBlock | null {
  const [head, ...body] = b.rows;
  if (!head?.cells.every((c) => c.h) || !body.length || body.some((r) => r.cells.every((c) => c.h))) return null;
  const cols = head.cells.length;
  if (cols < 2 || cols > 4 || b.rows.some((r) => r.cells.length !== cols || r.cells.some((c) => (c.cs ?? 1) > 1 || (c.rs ?? 1) > 1))) return null;
  const firsts = body.map((r) => plain(r.cells[0].c));
  if (firsts.some((x) => !x) || new Set(firsts).size !== firsts.length) return null;
  if (firsts.reduce((n, x) => n + x.length, 0) / firsts.length > NAMEY) return null;
  const labels = head.cells.map((c) => plain(c.c));
  const wordy = body.reduce((n, r) => n + plain(r.cells[1].c).length, 0) / body.length > WORDY;
  const stat = cols === 2 && !wordy;
  const from = wordy || stat ? 2 : 1;
  return {
    k: 'cards',
    look: 'rows',
    items: body.map((r) => ({
      title: r.cells[0].c,
      c: wordy ? r.cells[1].c : [],
      ...(stat ? { value: r.cells[1].c } : {}),
      fields: r.cells.slice(from).flatMap((c, i) => (plain(c.c) || c.c.some((x) => typeof x !== 'string') ? [field(labels[i + from], c.c)] : [])),
    })),
  };
}

/** A cell that says nothing: empty, a dash, or N/A. */
const empty = (c: Inline[]) => !c.some((x) => typeof x !== 'string') && /^\s*(?:[-–—]|n\/?a)?\s*$/i.test(plain(c));

/**
 * A wide table of records (a stage's traps) as one tile per row: the first column titles the tile,
 * a column of pictures (the picture and its name in one cell, or in two under one header) leads it,
 * short columns are labelled fields and one wordy column is its note. An optional title row above
 * the header becomes the caption. Null unless every row has a title in words and a picture, no
 * other column has pictures, and no cell spans in the body.
 */
export function recordCards(b: Table): CardsBlock | null {
  let rows = b.rows;
  const top = rows[0]?.cells;
  const caption = top?.length === 1 && top[0].h ? top[0].c : undefined;
  if (caption) rows = rows.slice(1);
  const [head, ...body] = rows;
  if (!head?.cells.every((c) => c.h) || body.length < 2) return null;
  const starts: number[] = [];
  let n = 0;
  for (const c of head.cells) { starts.push(n); n += c.cs ?? 1; }
  const labels = head.cells.flatMap((c) => Array<string>(c.cs ?? 1).fill(plain(c.c)));
  const cols = labels.length;
  if (cols < 5 || body.some((r) => r.cells.length !== cols || r.cells.some((c) => c.h || (c.cs ?? 1) > 1 || (c.rs ?? 1) > 1))) return null;
  const lead = (c: Inline[]) => c.find((x) => !blank(x));
  const at = starts.findIndex((i) => i > 0 && body.every((r) => isPic(lead(r.cells[i].c))));
  if (at < 0) return null;
  const pic = starts[at], split = (head.cells[at].cs ?? 1) === 2;
  if ((head.cells[at].cs ?? 1) > 2) return null;
  // Only the picture column has pictures: the title column is words, and no other column pictures things (recipes, waves).
  const pictured = (i: number) => body.some((r) => r.cells[i].c.some(isPic));
  if (labels.some((_, i) => i !== pic && !(split && i === pic + 1) && pictured(i))) return null;
  const titles = body.map((r) => plain(r.cells[0].c));
  if (titles.some((x) => !x) || titles.reduce((n, x) => n + x.length, 0) / titles.length > NAMEY) return null;
  const others = labels.map((_, i) => i).filter((i) => i > 0 && i !== pic && !(split && i === pic + 1));
  const wordy = others.filter((i) => body.reduce((n, r) => n + plain(r.cells[i].c).length, 0) / body.length > WORDY);
  if (wordy.length > 1) return null;
  return {
    k: 'cards',
    look: 'records',
    ...(caption ? { caption } : {}),
    items: body.map((r) => {
      const cell = r.cells[pic].c;
      const p = lead(cell) as Pic;
      const words = split ? r.cells[pic + 1].c : cell.slice(cell.indexOf(p) + 1);
      const name = plain(words).trim();
      const note = wordy.length && !empty(r.cells[wordy[0]].c) ? { label: labels[wordy[0]], c: r.cells[wordy[0]].c } : undefined;
      return {
        title: r.cells[0].c,
        c: [],
        name,
        r: words.find((x): x is Word => isWord(x) && !!x.r)?.r ?? p.r,
        pic: { i: p.i, w: p.w, h: p.h, a: name || (p.a ?? '') },
        fields: others.filter((i) => i !== wordy[0] && !empty(r.cells[i].c)).map((i) => field(labels[i], r.cells[i].c)),
        ...(note ? { note } : {}),
      };
    }),
  };
}

/**
 * A section's blocks with its cards found: entry lists, small tables and waves tables everywhere; with `points`, paragraphs
 * (consecutive ones join) become statement cards. `self` is the item's own ref.
 */
export function withCards(blocks: RichBlock[], opts: { points: boolean; self: string }): (RichBlock | CardsBlock | WavesBlock)[] {
  const out: (RichBlock | CardsBlock | WavesBlock)[] = [];
  for (const b of blocks) {
    const list = b.k === 'ul' || b.k === 'ol' ? entryCards(b.items) : b.k === 'table' ? (wavesOf(b) ?? rowCards(b) ?? recordCards(b)) : null;
    if (list) out.push(list);
    else if (b.k === 'p' && opts.points) {
      const cards = sentences(b.c).map((x) => point(x, opts.self));
      const prev = out[out.length - 1];
      if (prev?.k === 'cards' && prev.look === 'points') prev.items.push(...cards);
      else out.push({ k: 'cards', look: 'points', items: cards });
    } else out.push(b.k === 'table' ? foldCorner(b) : b);
  }
  return out;
}
