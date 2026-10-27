// Projects the read-only wiki archive in ../resources into the prototype's data file and sprite folder.
// Never writes inside resources/. Output (generated, not committed): public/data/codex.json, public/sprites/*.
// Unaudited prototype projection (work plan shortcut): wikitext is reduced to plain text by simple rules.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pageDetail, withoutList } from './detail.mjs';
import { trimmer } from './trim.mjs';
import * as short from './short.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const RES = resolve(here, '../../resources');
const OUT = resolve(here, '../public');

const jsonl = (p) => readFileSync(join(RES, p), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const ENTITIES = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' };
const decode = (s) => s.replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (m, e) =>
  e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1))) : ENTITIES[e] ?? m);
const decodeDeep = (v) => typeof v === 'string' ? decode(v) : Array.isArray(v) ? v.map(decodeDeep) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, decodeDeep(x)])) : v;
const rows = (n) => jsonl(`data/bucket/rows/${n}.jsonl`).map(decodeDeep);

const snapshot = JSON.parse(readFileSync(join(RES, 'inventory/snapshot.json'), 'utf8'));
const pageIndex = new Map();
/** File pages that redirect to another file, as the wiki shows the target's picture. */
const fileRedirectPage = new Map();
for (const p of jsonl('inventory/pages.jsonl')) {
  if (p.ns === 0) pageIndex.set(p.title, p);
  else if (p.ns === 6 && p.redirect) fileRedirectPage.set(p.title.slice(5).replace(/ /g, '_'), p.path);
}
const media = new Map();
for (const m of jsonl('inventory/media.jsonl')) media.set(m.name, m);
const trim = trimmer((name) => { const m = media.get(name); return m ? join(RES, m.path) : null; });

const PACKS = [
  { id: 'base', name: 'Vampire Survivors', aliases: [null, '', 'Vampire Survivors'] },
  { id: 'lm', name: 'Legacy of the Moonspell', aliases: ['lm'] },
  { id: 'tf', name: 'Tides of the Foscari', aliases: ['tf'] },
  { id: 'em', name: 'Emergency Meeting', aliases: ['em'] },
  { id: 'og', name: 'Operation Guns', aliases: ['og'] },
  { id: 'oc', name: 'Ode to Castlevania', aliases: ['oc'] },
  { id: 'ed', name: 'Emerald Diorama', aliases: ['ed'] },
  { id: 'ac', name: 'Ante Chamber', aliases: ['ac'] },
  { id: 'bm', name: 'Legacy of the Bloodmoon', aliases: ['bm'] },
];
const packOf = (v) => {
  const s = v == null ? null : String(v).trim();
  const p = PACKS.find((x) => x.aliases.includes(s) || x.name === s);
  return p ? p.id : 'base';
};

const slug = (s) => s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Plain text from a wikitext fragment: links and simple templates become their label. */
function plain(w) {
  if (w == null) return '';
  let s = String(w);
  s = s.replace(/<ref[^>]*\/>/g, '').replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, '');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/\[\[File:[^\]]*\]\]/g, '');
  for (let i = 0; i < 4; i++) {
    s = s.replace(/\{\{\s*(?:slink|cslink|Slink|stat|Stat|Y|G|R|B|link|nowrap)\s*\|([^{}|]*)(?:\|[^{}]*)?\}\}/g, '$1');
    s = s.replace(/\{\{[^{}]*\}\}/g, '');
  }
  s = s.replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1');
  s = s.replace(/\[https?:[^\s\]]+\s([^\]]*)\]/g, '$1');
  s = decode(s.replace(/'''?/g, '').replace(/<[^>]+>/g, ''));
  return s.split('\n').map((l) => l.replace(/^\s*\*\s*/, '').trim()).filter(Boolean).join('\n');
}

/** The first {{Infobox <name> ...}} on a page, as a parameter map, with the page's other wikitext. */
function readPage(title) {
  const p = pageIndex.get(title);
  if (!p) return null;
  return { meta: p, text: readFileSync(join(RES, p.path), 'utf8') };
}
function infobox(text, name) {
  const start = text.indexOf(`{{Infobox ${name}`);
  if (start < 0) return null;
  let depth = 0, i = start, end = text.length;
  while (i < text.length) {
    if (text.startsWith('{{', i)) { depth++; i += 2; continue; }
    if (text.startsWith('}}', i)) { depth--; i += 2; if (depth === 0) { end = i; break; } continue; }
    i++;
  }
  const body = text.slice(start + 2, end - 2);
  // split on top-level pipes
  const parts = []; let cur = ''; let d = 0;
  for (let j = 0; j < body.length; j++) {
    const two = body.slice(j, j + 2);
    if (two === '{{' || two === '[[') { d++; cur += two; j++; continue; }
    if (two === '}}' || two === ']]') { d--; cur += two; j++; continue; }
    if (body[j] === '|' && d === 0) { parts.push(cur); cur = ''; continue; }
    cur += body[j];
  }
  parts.push(cur);
  const map = {};
  for (const part of parts.slice(1)) {
    const k = part.indexOf('=');
    if (k < 0) continue;
    map[part.slice(0, k).trim()] = part.slice(k + 1).trim();
  }
  return map;
}
/** Level rows from a "==Levels==" wikitable: [{ level, text }]. */
function levels(text) {
  const sec = text.split(/^==\s*Levels\s*==\s*$/m)[1];
  if (!sec) return [];
  const table = sec.split(/^\|\}/m)[0];
  const out = [];
  for (const m of table.matchAll(/^\|\s*Level\s*(\d+)\s*\|\|\s*(.+)$/gm)) out.push({ level: Number(m[1]), text: plain(m[2]) });
  return out;
}

const usedSprites = new Set();
function sprite(file) {
  if (!file) return null;
  const name = String(file).replace(/^\[\[/, '').replace(/^File:/, '').replace(/\|.*$/, '').replace(/\]\]$/, '').trim().replace(/ /g, '_');
  const m = media.get(name);
  if (!m) return null;
  usedSprites.add(name);
  return { file: name, w: m.width, h: m.height };
}
const num = (v) => { const m = String(v ?? '').match(/-?\d+(?:\.\d+)?/); return m ? Number(m[0]) : null; };
const source = (meta) => meta ? { title: meta.title, revid: meta.revid, edited: meta.last_edit_ts } : null;

// ---------- weapons ----------
const STAT_KEYS = ['damage', 'area', 'speed', 'amount', 'duration', 'pierce', 'cooldown', 'interval', 'delay', 'knockback', 'pool', 'chance', 'critMul', 'hit-wall'];
const weapons = [];
for (const r of rows('infobox_weapon')) {
  const page = readPage(r.page_name);
  const ib = page ? infobox(page.text, 'Weapon') ?? {} : {};
  const type = String(r.type || ib.type || 'Normal').replace(/<br\/?>.*/, '');
  const stats = {};
  for (const k of STAT_KEYS) if (ib[k] && plain(ib[k]) !== '-') stats[k === 'critMul' ? 'crit' : k] = plain(ib[k]);
  const max = {};
  for (const [k, v] of Object.entries(ib)) if (k.startsWith('max-') && k !== 'max-level' && plain(v)) max[k.slice(4)] = plain(v);
  weapons.push({
    ref: `weapon:${slug(r.page_name)}`,
    kind: ['Evolution', 'Union'].includes(type) ? 'evolution' : 'weapon',
    type: type.toLowerCase(),
    name: r.name || r.page_name,
    page: r.page_name,
    pack: packOf(r.dlc ?? ib.dlc),
    gameId: Array.isArray(r.id) ? r.id[0] : r.id ?? ib.id ?? null,
    sprite: sprite(ib.sprite || `Sprite-${r.page_name}.png`),
    caption: plain(ib.caption),
    effects: plain(ib.effects),
    maxLevel: num(ib['max-level']),
    rarity: num(ib.rarity),
    stats, max,
    levels: page ? levels(page.text) : [],
    requires: ['requires1', 'requires2', 'requires3', 'requires4'].map((k) => plain(ib[k])).filter(Boolean),
    evolution: plain(ib.evolution) || null,
    evolutionItems: ['evolution-item', 'evolution-item2'].map((k) => plain(ib[k])).filter(Boolean),
    union: plain(ib.union) || null,
    unionItems: ['union-item', 'union-item2', 'union-item3'].map((k) => plain(ib[k])).filter(Boolean),
    source: source(page?.meta),
  });
}

// ---------- passives ----------
const passives = rows('infobox_passive_item').map((r) => {
  const page = readPage(r.page_name);
  const ib = page ? infobox(page.text, 'Passive item') ?? {} : {};
  return {
    ref: `passive:${slug(r.page_name)}`,
    kind: 'passive',
    name: r.name || r.page_name,
    page: r.page_name,
    pack: packOf(r.dlc),
    gameId: r.id ?? ib.id ?? null,
    sprite: sprite(r.sprite || ib.sprite),
    caption: plain(r.description || ib.description),
    stat: plain(ib.stat) || null,
    perLevel: plain(ib['per-level']) || null,
    maxEffect: plain(ib['max-effect']) || null,
    stacking: plain(ib.stacking) || null,
    maxLevel: num(ib['max-level']),
    rarity: num(ib.rarity),
    foundOn: plain(ib['stage-item']).split(/,\s*/).filter(Boolean),
    source: source(page?.meta),
  };
});

// ---------- recipes (from each evolved weapon's own requirements) ----------
const byName = new Map();
for (const e of [...weapons, ...passives]) if (!byName.has(e.page)) byName.set(e.page, e);
for (const e of [...weapons, ...passives]) if (!byName.has(e.name)) byName.set(e.name, e);
const passiveMax = new Map();
for (const r of rows('passive_evolutions')) passiveMax.set(`${r.page_name}|${r.evolution}`, !!r.passive_max);
const recipes = [];
for (const w of weapons) {
  if (w.kind !== 'evolution' || w.requires.length === 0) continue;
  const inputs = w.requires.map((n) => {
    const e = byName.get(n);
    return e ? { ref: e.ref, max: e.kind === 'weapon' ? true : passiveMax.get(`${e.page}|${w.page}`) ?? false } : { name: n, ref: null, max: false };
  });
  recipes.push({ ref: `recipe:${slug(w.page)}`, type: w.type === 'union' ? 'union' : 'evolution', result: w.ref, inputs, pack: w.pack });
}

// ---------- characters ----------
const characters = rows('infobox_character')
  .filter((r) => !r.skin_id || r.skin_id === 'DEFAULT')
  .map((r) => {
    let stats = [];
    try { stats = JSON.parse(r.stats_json || '[]'); } catch { stats = []; }
    return {
      ref: `character:${slug(r.page_name)}`,
      kind: 'character',
      name: r.name || r.page_name,
      alias: r.alias || null,
      page: r.page_name,
      pack: packOf(r.dlc),
      gameId: r.id ?? null,
      sprite: sprite(r.image),
      caption: plain(r.description),
      startingWeapons: (r.starting_weapon || []).map((n) => byName.get(n)?.ref ?? null).filter(Boolean),
      unlock: plain(r.unlocked_by),
      cost: r.cost ?? null,
      secret: !!r.secret_character,
      stats: stats.map((s) => ({ name: s.name, value: s.value })),
      order: r.order ?? null,
      source: source(pageIndex.get(r.page_name)),
    };
  });

// ---------- stages ----------
// A stage page has one row per mode (Normal, Hyper, Inverse...); the list shows the stage once.
const stageModes = new Map();
for (const r of rows('infobox_stage')) {
  if (!stageModes.has(r.page_name)) stageModes.set(r.page_name, []);
  stageModes.get(r.page_name).push(r);
}
const stages = [...stageModes.values()]
  .map((rs) => rs.find((r) => r.is_default) ?? rs[0])
  .filter((r) => !r.adventure_only && ['Stage', 'Bonus', 'Challenge', 'Hidden Ground', 'Special'].includes(r.stage_type))
  .map((r) => ({
    ref: `stage:${slug(r.page_name)}`,
    kind: 'stage',
    name: r.name || r.page_name,
    page: r.page_name,
    pack: packOf(r.dlc),
    gameId: r.id ?? null,
    sprite: sprite(r.image),
    caption: plain(r.description),
    stageType: r.stage_type,
    timeLimit: r.time_limit ?? null,
    modifiers: Object.fromEntries(['gold_multiplier', 'luck_bonus', 'xp_bonus', 'enemy_health_bonus', 'enemy_move_speed', 'player_move_speed', 'projectile_speed'].filter((k) => r[k] != null).map((k) => [k, r[k]])),
    source: source(pageIndex.get(r.page_name)),
  }));

// ---------- arcanas, relics, powerups ----------
/** Pictures read only by the views' cards (copied to /media with the detail pictures). */
const cardMedia = new Set();
/** A file name after up to three file redirects (with underscores, as /media names it). */
function fileTarget(file) {
  for (let i = 0; i < 3 && fileRedirectPage.has(file); i++) {
    const m = readFileSync(join(RES, fileRedirectPage.get(file)), 'utf8').match(/#REDIRECT\s*\[\[\s*(?:File|Image):([^\]|#]+)/i);
    if (!m) break;
    file = m[1].trim().replace(/ /g, '_');
  }
  return file;
}
/** Every item an arcana affects, as the source lists it: its own picture, its name, and its codex item when there is one. */
function affectsOf(r) {
  const out = [];
  for (const m of String(r.affects_raw ?? '').matchAll(/\[\[File:([^|\]]+)\|([^\]]*)\]\]/g)) {
    const file = fileTarget(m[1].trim().replace(/ /g, '_'));
    const link = decode(m[2].match(/link=([^|]*)/)?.[1]?.trim() ?? '');
    const name = decode(m[2].match(/alt=A sprite icon representing (.+?) linking to /)?.[1]?.trim() ?? '') || link;
    if (!name) continue;
    const pic = media.get(file);
    const ok = pic && existsSync(join(RES, pic.path));
    if (ok) cardMedia.add(file);
    out.push({ name, ref: byName.get(link)?.ref ?? byName.get(name)?.ref ?? null, pic: ok ? { i: file, w: pic.width, h: pic.height } : null });
  }
  if (out.length) return out;
  // No pictures: the source names a set in words ("All Stage Items").
  const words = plain(r.affects_raw);
  return words ? [{ name: words, ref: null, pic: null }] : [];
}
const notesOf = (w) => { const s = plain(w).replace(/[ \t]{2,}/g, ' '); return s && !/^n\/?a$/i.test(s) ? s : null; };
const arcanas = rows('infobox_arcana').map((r) => ({
  ref: `arcana:${slug(r.page_name)}`,
  kind: 'arcana',
  name: r.name || r.page_name,
  page: r.page_name,
  pack: packOf(r.dlc),
  gameId: r.id ?? null,
  sprite: sprite(r.image) ?? sprite(r.icon),
  caption: plain(r.description),
  arcanaType: r.arcana_type ?? null,
  affects: affectsOf(r),
  unlock: plain(r.unlocked_by),
  notes: notesOf(r.notes),
  order: r.order ?? null,
  source: source(pageIndex.get(r.page_name)),
}));
const relics = rows('infobox_relic').map((r) => ({
  ref: `relic:${slug(r.page_name)}`,
  kind: 'relic',
  name: r.name || r.page_name,
  page: r.page_name,
  pack: packOf(r.dlc),
  gameId: r.id ?? null,
  sprite: sprite(r.sprite || r.icon),
  caption: plain(r.description),
  effects: plain(r.effects),
  location: plain(r.location),
  order: r.order ?? null,
  source: source(pageIndex.get(r.page_name)),
}));
const powerups = rows('infobox_powerup')
  .filter((r) => !r.version_anchor || r.version_anchor === r.default_anchor)
  .map((r) => ({
    ref: `powerup:${slug(r.page_name)}`,
    kind: 'powerup',
    name: r.page_name,
    page: r.page_name,
    pack: packOf(r.dlc),
    gameId: r.id ?? null,
    sprite: sprite(r.image),
    caption: plain(r.description),
    maxRank: r.max_level ?? null,
    bonus: r.powerup_bonus ?? null,
    percent: !!r.is_percent,
    stacking: r.stacking ?? null,
    cost: r.cost ?? null,
    order: r.order ?? null,
    source: source(pageIndex.get(r.page_name)),
  }));

// ---------- write ----------
const all = [...weapons, ...passives, ...characters, ...stages, ...arcanas, ...relics, ...powerups];
const seen = new Set();
for (const e of all) { if (seen.has(e.ref)) e.ref = `${e.ref}-${slug(e.gameId ?? String(seen.size))}`; seen.add(e.ref); }

mkdirSync(join(OUT, 'data'), { recursive: true });
const codex = {
  schema: 1,
  snapshot: { capturedAt: snapshot.captured_at ?? snapshot.capturedAt ?? null, source: 'https://vampire.survivors.wiki', licence: 'CC BY-NC-SA 3.0 (text); game art belongs to its owners' },
  packs: PACKS.map(({ id, name }) => ({ id, name })),
  entities: all,
  recipes,
};
writeFileSync(join(OUT, 'data/codex.json'), JSON.stringify(trim.fit(short.codex(codex))));

const spriteDir = join(OUT, 'sprites');
if (existsSync(spriteDir)) rmSync(spriteDir, { recursive: true });
mkdirSync(spriteDir, { recursive: true });
let copied = 0;
for (const name of usedSprites) {
  const m = media.get(name);
  const from = join(RES, m.path);
  if (existsSync(from)) { copyFileSync(from, join(spriteDir, name)); copied++; }
}
const counts = Object.fromEntries(['weapon', 'evolution', 'passive', 'character', 'stage', 'arcana', 'relic', 'powerup'].map((k) => [k, all.filter((e) => e.kind === k).length]));
console.log(JSON.stringify({ counts, recipes: recipes.length, unresolvedInputs: recipes.flatMap((r) => r.inputs).filter((i) => !i.ref).length, sprites: copied, missingSprites: all.filter((e) => !e.sprite).length }));

// ---------- details: each item's full page, loaded only when the item is picked ----------
const htmlPath = new Map();
for (const h of jsonl('inventory/html_index.jsonl')) if (h.html_path) htmlPath.set(h.title, h.html_path);
const redirect = new Map();
for (const p of pageIndex.values()) {
  if (!p.redirect) continue;
  const m = readFileSync(join(RES, p.path), 'utf8').match(/#REDIRECT\s*\[\[([^\]|#]+)/i);
  if (m) redirect.set(p.title, m[1].trim().replace(/_/g, ' '));
}
const refByPage = new Map();
for (const e of all) if (!refByPage.has(e.page)) refByPage.set(e.page, e.ref);
// The page's infobox switches modes in script; the archive keeps only the default. Rebuild the
// modifier rows with one column per mode from the labelled bucket rows.
const MODE_FIELDS = {
  'Starting spawns': ['starting_spawns', (v) => String(v)],
  'Player move speed': ['player_move_speed', (v) => `x${v}`],
  'Enemy move speed': ['enemy_move_speed', (v) => `x${v}`],
  'Projectile speed': ['projectile_speed', (v) => `x${v}`],
  'Gold multiplier': ['gold_multiplier', (v) => `x${v}`],
  'Luck bonus': ['luck_bonus', (v) => `+${Math.round(v * 100)}%`],
  'XP bonus': ['xp_bonus', (v) => `x${v}`],
  'Enemy health bonus': ['enemy_health_bonus', (v) => `x${v}`],
  'Enemy minimum': ['enemy_minimum', (v) => `x${v}`],
};
function withModes(d, modes) {
  const g = d.infobox.find((x) => x.title === 'Modifiers');
  if (!g || modes.length < 2) return;
  const ordered = [...modes].sort((a, b) => Number(Boolean(b.is_default)) - Number(Boolean(a.is_default)));
  g.cols = ordered.map((m, i) => m.version_anchor || `Mode ${i + 1}`);
  for (const row of g.rows) {
    const f = MODE_FIELDS[row.label];
    if (f) row.cells = ordered.map((m) => [m[f[0]] == null ? '–' : f[1](m[f[0]])]);
  }
}
const linkRef = (title) => {
  let t = title.split('#')[0];
  for (let i = 0; i < 3 && redirect.has(t); i++) t = redirect.get(t);
  return refByPage.get(t) ?? null;
};
const detailDir = join(OUT, 'data/detail');
const mediaDir = join(OUT, 'media');
for (const d of [detailDir, mediaDir]) { if (existsSync(d)) rmSync(d, { recursive: true }); mkdirSync(d, { recursive: true }); }
const usedMedia = new Set(cardMedia);
const image = (name) => { const m = media.get(name); if (!m || !existsSync(join(RES, m.path))) return false; usedMedia.add(name); return true; };
let written = 0, bytes = 0, noPage = [];
const blockCount = { sections: 0, tables: 0, galleries: 0, links: 0 };
for (const e of all) {
  const path = htmlPath.get(e.page);
  if (!path || !existsSync(join(RES, path))) { noPage.push(e.page); continue; }
  const d = pageDetail(readFileSync(join(RES, path), 'utf8'), { ref: e.ref, linkRef, image });
  if (!d) { noPage.push(e.page); continue; }
  if (e.kind === 'stage') withModes(d, stageModes.get(e.page) ?? []);
  const json = JSON.stringify(trim.fit(short.detail(d)));
  writeFileSync(join(detailDir, `${e.ref.replace(/:/g, '.')}.json`), json);
  written++; bytes += json.length;
  blockCount.sections += d.sections.length;
  blockCount.tables += (json.match(/"k":"table"/g) || []).length;
  blockCount.galleries += (json.match(/"k":"gallery"/g) || []).length;
  blockCount.links += (json.match(/"r":"/g) || []).length;
}
// ---------- overviews: each Codex tab's own page, shown while nothing is picked ----------
// The page minus its list of items (the tab already lists them); only pictures that remain are copied.
const tabs = JSON.parse(readFileSync(join(here, '../src/data/collections.json'), 'utf8'));
const overviews = [...tabs.collections.map((c) => ({ id: c.id, page: c.page, kinds: c.kinds })), { id: 'pairings', ...tabs.pairings }];
const overviewReport = {};
for (const o of overviews) {
  const path = htmlPath.get(o.page);
  if (!path || !existsSync(join(RES, path))) { noPage.push(o.page); continue; }
  const raw = pageDetail(readFileSync(join(RES, path), 'utf8'), { ref: `category:${o.id}`, linkRef, image: (name) => { const m = media.get(name); return !!m && existsSync(join(RES, m.path)); } });
  if (!raw) { noPage.push(o.page); continue; }
  const { detail, dropped } = withoutList(raw, o.kinds);
  const json = JSON.stringify(trim.fit(short.detail({ ...detail, source: source(pageIndex.get(o.page)) })));
  for (const m of json.matchAll(/"i":"((?:[^"\\]|\\.)*)"/g)) usedMedia.add(JSON.parse(`"${m[1]}"`));
  writeFileSync(join(detailDir, `category.${o.id}.json`), json);
  overviewReport[o.id] = { sections: detail.sections.length, dropped, kB: Math.round(json.length / 1000) };
}
console.log(JSON.stringify({ overviews: overviewReport }));
let mediaBytes = 0, trimmed = 0;
for (const name of usedMedia) { const m = media.get(name); if (trim.write(name, join(mediaDir, name))) trimmed++; mediaBytes += m.size ?? 0; }
console.log(JSON.stringify({ details: written, detailMB: +(bytes / 1e6).toFixed(1), noPage, ...blockCount, media: usedMedia.size, trimmed, shortened: short.shortened(), mediaMB: +(mediaBytes / 1e6).toFixed(1) }));
