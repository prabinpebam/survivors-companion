/**
 * Tier 0: a stage's waves table read as one card per wave. A waves table is found by its header
 * (Time Elapsed, then an Enemy or Enemies column). Each row becomes its time (and a variant such
 * as Eclipse when the time cell spans two), the enemies that spawn (pictures and a name each), its
 * counts (enemy minimum, maximum, spawn interval), its bosses with the treasure they drop, its map
 * events and its notes. Nothing is reworded; a cell that doesn't read as expected keeps its runs.
 */
import { plain, type Cell, type Inline, type RichBlock } from './detail';

type Table = Extract<RichBlock, { k: 'table' }>;
type Pic = Extract<Inline, { i: string }>;

/** An enemy or boss: its pictures (frames or variants) and its name, linked when the source links it. */
export type Thing = { pics: Pic[]; name: string; r?: string };
/** A chest a boss drops: its picture, its facts (Level, Evolution), the odds of each tier and its rewards. */
export type Treasure = { pic: Pic; facts: { label: string; value: string }[]; odds: { pic: Pic; value: string }[]; rewards?: { label: string; items: string[] } };
/** Bosses that spawn together and the treasure they drop; `c` holds a treasure that didn't read as one. */
export type BossGroup = { bosses: Thing[]; treasure?: Treasure; c?: Inline[] };
/** A count beside the enemies: what it is (the column name), its value, and whether it is in seconds. */
export type WaveStat = { label: string; value: string; look: 'min' | 'max' | 'interval' | 'other'; seconds: boolean };
/** A map event: its pictures and name, the source's summary line ("0:10 / 20% / x6") and its labelled values (Unit first). */
export type MapEvent = { pics: Pic[]; name: string; summary?: string; facts: { label: string; value: string }[] };
export type Wave = {
  time: string;
  variant?: string;
  enemies: Thing[];
  /** The enemies cell when it isn't pictures and names (N/A). */
  enemiesText?: Inline[];
  stats: WaveStat[];
  bosses: BossGroup[];
  bossesText?: Inline[];
  /** The map events as records; absent when the cell is prose, which `events` then keeps. */
  eventList?: MapEvent[];
  events?: Inline[];
  notes?: Inline[];
};
/** The column names, as the source labels them. */
export type WaveLabels = { enemies: string; bosses: string; events: string; notes: string };
export type WavesBlock = { k: 'waves'; labels: WaveLabels; items: Wave[] };

const isPic = (x: Inline | undefined): x is Pic => !!x && typeof x !== 'string' && 'i' in x;
const words = (x: Inline) => (typeof x === 'string' ? x : 't' in x ? x.t : null);
const empty = (c: Inline[]) => !c.some(isPic) && /^\s*(-|N\/A)?\s*$/.test(plain(c));
const tidy = (x: string) => x.replace(/\s+/g, ' ').trim();

/** Pictures each followed by a name; null when the runs read otherwise. */
export function thingsOf(c: Inline[]): Thing[] | null {
  const out: Thing[] = [];
  let cur: Thing | null = null;
  for (const x of c) {
    if (isPic(x)) {
      if (!cur || cur.name) out.push((cur = { pics: [], name: '' }));
      cur.pics.push(x);
      continue;
    }
    const w = words(x);
    if (w === null) return null;
    if (!w.trim()) continue;
    if (!cur) return null;
    cur.name = tidy(`${cur.name} ${w}`);
    if (typeof x !== 'string' && 'r' in x && x.r) cur.r = x.r;
  }
  return out.length && out.every((t) => t.name) ? out : null;
}

const LEVEL = /^\s*Level:/;
/** The chest record: picture, "Level: 1\nEvolution: Yes", then tier pictures with odds, the last ending in "Rewards: ...". */
function treasureOf(c: Inline[]): Treasure | null {
  const [pic, facts, ...rest] = c;
  if (!isPic(pic) || typeof facts !== 'string' || rest.length % 2) return null;
  const pairs = facts.split('\n').map((l) => l.match(/^\s*([^:]+):\s*(.*?)\s*$/)).filter((m) => m);
  if (!pairs.length) return null;
  const odds: Treasure['odds'] = [];
  let rewards: Treasure['rewards'];
  for (let i = 0; i < rest.length; i += 2) {
    const p = rest[i];
    const v = rest[i + 1];
    if (!isPic(p) || typeof v !== 'string') return null;
    const odd = v.match(/^\s*([^\s%]*%)\s*(.*)$/s);
    if (!odd) return null;
    odds.push({ pic: p, value: odd[1] });
    const m = odd[2].match(/^(\S[^:]*):\s*(.*)$/s);
    // The source lists one reward per slot (Evolution, Upgrade (any)); the text joined them with spaces.
    if (m) rewards = { label: m[1], items: tidy(m[2]).match(/\S+(?: \([^)]*\))?/g) ?? [] };
  }
  return { pic, facts: pairs.map((m) => ({ label: tidy(m![1]), value: tidy(m![2]) })), odds, rewards };
}

/** Bosses and the treasure after them; a cell can hold several groups, each closed by its rewards line. */
export function bossGroupsOf(c: Inline[]): BossGroup[] | null {
  const groups: BossGroup[] = [];
  let i = 0;
  while (i < c.length) {
    let j = i;
    while (j < c.length && !(isPic(c[j]) && typeof c[j + 1] === 'string' && LEVEL.test(c[j + 1] as string))) j++;
    const lead = c.slice(i, j);
    if (lead.every((x) => typeof x === 'string' && !x.trim()) && groups.length) break;
    const bosses = thingsOf(lead);
    if (!bosses) return null;
    let k = j + 1;
    while (k < c.length && !(typeof c[k] === 'string' && /Rewards:/.test(c[k] as string))) k++;
    if (j >= c.length) return [...groups, { bosses }];
    const runs = c.slice(j, k + 1);
    const treasure = treasureOf(runs);
    groups.push(treasure ? { bosses, treasure } : { bosses, c: runs });
    i = k + 1;
  }
  return groups;
}

const SUMMARY = /^(\d+:\d\d \/ -?[\d.]+%(?: \/ x\w+)?)(?: Unit: (.+))?$/;
const FACT = /^([A-Za-z][A-Za-z ()]*):\s+(\S.*)$/;
/** Map events: each a picture, then "Name\nsummary Unit: X\nLabel: value..."; null when the cell reads otherwise. */
export function eventsOf(c: Inline[]): MapEvent[] | null {
  const runs: { pics: Pic[]; text: string }[] = [];
  for (const x of c) {
    if (isPic(x)) {
      const last = runs[runs.length - 1];
      if (last && !last.text.trim()) last.pics.push(x);
      else runs.push({ pics: [x], text: '' });
      continue;
    }
    const w = words(x);
    if (w === null || (!runs.length && w.trim())) return null;
    if (runs.length) runs[runs.length - 1].text += w;
  }
  const out: MapEvent[] = [];
  for (const r of runs) {
    const [name, ...lines] = r.text.split('\n').map(tidy).filter(Boolean);
    if (!name) return null;
    const head = lines[0]?.match(SUMMARY);
    const facts = head?.[2] ? [{ label: 'Unit', value: head[2] }] : [];
    for (const l of head ? lines.slice(1) : lines) {
      const m = l.match(FACT);
      if (!m) return null;
      facts.push({ label: m[1], value: m[2] });
    }
    out.push({ pics: r.pics, name, summary: head?.[1], facts });
  }
  return out.length ? out : null;
}

/** Each body row's cells under each column, row and column spans resolved. */
function grid(rows: Table['rows']): Cell[][] {
  const out: Cell[][] = rows.map(() => []);
  rows.forEach((r, y) => {
    let x = 0;
    for (const c of r.cells) {
      while (out[y][x]) x++;
      for (let dy = 0; dy < (c.rs ?? 1) && y + dy < rows.length; dy++) for (let dx = 0; dx < (c.cs ?? 1); dx++) out[y + dy][x + dx] = c;
      x += c.cs ?? 1;
    }
  });
  return out;
}

/** A waves table as cards; null when it isn't one. */
export function wavesOf(t: Table): WavesBlock | null {
  const at = t.rows.findIndex((r) => r.h && /^Time/i.test(plain(r.cells[0]?.c ?? [])));
  if (at < 0) return null;
  const cells = grid(t.rows);
  const head = cells[at].map((c) => plain(c.c));
  const col = (re: RegExp) => head.findIndex((h) => re.test(h));
  const cols = { enemies: col(/^Enem(y|ies)$/i), bosses: col(/boss/i), events: col(/event/i), notes: col(/^notes?$/i) };
  if (cols.enemies < 0) return null;
  const named = new Set([0, cols.enemies, cols.bosses, cols.events, cols.notes]);
  const statCols = head.map((_, x) => x).filter((x) => !named.has(x) && head[x] !== head[0]);
  const items = cells.slice(at + 1).flatMap((row, y): Wave[] => {
    if (t.rows[at + 1 + y].h || !row.length) return [];
    const text = (x: number) => (x >= 0 && row[x] && !empty(row[x].c) ? row[x].c : undefined);
    const timeCells = [...new Set(row.filter((_, x) => head[x] === head[0]))];
    const en = row[cols.enemies]?.c ?? [];
    const bo = row[cols.bosses]?.c ?? [];
    const enemies = empty(en) ? [] : thingsOf(en);
    const bosses = cols.bosses < 0 || empty(bo) ? [] : bossGroupsOf(bo);
    const events = text(cols.events);
    const eventList = events && eventsOf(events);
    return [{
      time: plain(timeCells[0]?.c ?? []),
      variant: timeCells[1] ? plain(timeCells[1].c) : undefined,
      enemies: enemies ?? [],
      enemiesText: enemies ? undefined : en,
      stats: statCols.flatMap((x) => {
        const v = tidy(plain(row[x]?.c ?? []));
        if (!v || v === '-') return [];
        const look = /min/i.test(head[x]) ? 'min' : /max/i.test(head[x]) ? 'max' : /interval/i.test(head[x]) ? 'interval' : 'other';
        return [{ label: tidy(head[x].replace(/\((?:s|seconds?)\)/i, '')), value: v, look, seconds: /\((?:s|seconds?)\)|seconds/i.test(head[x]) }];
      }),
      bosses: bosses ?? [],
      bossesText: bosses ? undefined : bo,
      eventList: eventList ?? undefined,
      events: eventList ? undefined : events,
      notes: text(cols.notes),
    }];
  });
  if (!items.length) return null;
  const label = (x: number) => (x >= 0 ? head[x] : '');
  return { k: 'waves', labels: { enemies: label(cols.enemies), bosses: label(cols.bosses), events: label(cols.events), notes: label(cols.notes) }, items };
}
