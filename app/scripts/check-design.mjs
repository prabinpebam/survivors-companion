/**
 * Design-system checks the kit tools don't cover (docs/design/design-system.md, enforcement suite):
 * tier imports, sealed fundamentals, doc comments, component-token ownership, private primitives,
 * unread tokens, breakpoint-only width queries, views without styles, and a component size limit.
 *   node scripts/check-design.mjs
 * Exit 1 on any finding.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, extname, join, relative } from 'node:path';

const ROOT = join(dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..');
const SRC = join(ROOT, 'src');
const MAX_LINES = 160;
const findings = [];
const fail = (file, msg) => findings.push(`${relative(ROOT, file)}: ${msg}`);

const walk = (p) => (statSync(p).isFile() ? [p] : readdirSync(p).flatMap((n) => walk(join(p, n))));
const files = walk(SRC);
const read = (f) => readFileSync(f, 'utf8');
const tierOf = (f) => {
  const r = relative(SRC, f).replace(/\\/g, '/');
  if (r.startsWith('components/fundamentals/')) return 'fundamental';
  if (r.startsWith('components/compounds/')) return 'compound';
  if (r.startsWith('layouts/')) return 'layout';
  if (r.startsWith('shell/')) return 'shell';
  if (r.startsWith('views/')) return 'view';
  return 'other';
};
const imports = (src) => [...src.matchAll(/^import\s+(type\s+)?[^'"]*?from\s+'([^']+)'/gm)].map((m) => ({ type: !!m[1], from: m[2] }));

// Tier imports, seals, docs, size.
for (const f of files.filter((f) => ['.ts', '.tsx'].includes(extname(f)))) {
  const tier = tierOf(f);
  const src = read(f);
  for (const { type, from } of imports(src)) {
    if (!from.startsWith('.')) continue;
    if (tier === 'view' && extname(from) === '.css') { fail(f, `view imports styles (${from})`); continue; }
    if (from.endsWith('.module.css') && dirname(join(dirname(f), from)) === dirname(f)) continue;
    const target = tierOf(join(dirname(f), from));
    if (tier === 'fundamental' && target !== 'other') fail(f, `fundamental imports ${target} (${from}); fundamentals use tier 0 only`);
    if (tier === 'compound' && ['compound', 'layout', 'shell', 'view'].includes(target)) fail(f, `compound imports ${target} (${from})`);
    if (tier === 'layout' && ['layout', 'shell', 'view'].includes(target)) fail(f, `layout imports ${target} (${from})`);
    if (tier === 'view' && ['fundamental', 'compound', 'layout', 'shell'].includes(target)) fail(f, `view imports ${target} (${from}); views are data`);
    if (tier === 'view' && from.includes('/render/') && !type) fail(f, `view imports the renderer (${from}); import types only`);
  }
  if (['fundamental', 'compound', 'layout', 'shell'].includes(tier)) {
    if (extname(f) !== '.tsx') continue;
    const doc = src.match(/^\/\*\*([\s\S]*?)\*\//);
    if (!doc) fail(f, 'no doc comment');
    else {
      if (!/@tier\s+\w+/.test(doc[1])) fail(f, 'doc comment has no @tier');
      if (!/@a11y\s/.test(doc[1])) fail(f, 'doc comment has no @a11y note');
    }
    if (tier === 'fundamental' && /^\s+(class|className|style)\??:/m.test(src)) fail(f, 'fundamental accepts a class or style prop');
    const lines = src.split('\n').length;
    if (lines > MAX_LINES) fail(f, `${lines} lines; components stay under ${MAX_LINES}`);
  }
  if (tier === 'view' && extname(f) === '.tsx') fail(f, 'views are data (.ts), not markup');
  if (tier === 'view' && /\bstyle\s*:/.test(src)) fail(f, 'view sets a style');
}

// Token checks.
const tokensCss = read(join(SRC, 'design', 'tokens.css'));
const tokensJson = JSON.parse(read(join(ROOT, 'design', 'tokens', 'tokens.json')));
const defined = [...new Set([...tokensCss.matchAll(/^\s*(--[\w-]+):/gm)].map((m) => m[1]))];
const values = Object.fromEntries([...tokensCss.matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)].map((m) => [m[1], m[2].trim()]));
const css = files.filter((f) => extname(f) === '.css' && basename(f) !== 'tokens.css');
const reads = new Map();
for (const f of css) for (const m of read(f).matchAll(/var\((--[\w-]+)/g)) (reads.get(m[1]) ?? reads.set(m[1], new Set()).get(m[1])).add(f);
for (const m of tokensCss.matchAll(/:\s*[^;]*?var\((--[\w-]+)/g)) for (const v of m[0].matchAll(/var\((--[\w-]+)/g)) (reads.get(v[1]) ?? reads.set(v[1], new Set()).get(v[1])).add('tokens.css');
// Scripts read tokens by name (for example getPropertyValue('--size-inspector-min')).
for (const f of files.filter((f) => ['.ts', '.tsx'].includes(extname(f)))) for (const m of read(f).matchAll(/'(--(?!shell-)[\w-]+)'/g)) (reads.get(m[1]) ?? reads.set(m[1], new Set()).get(m[1])).add(f);

const owners = Object.fromEntries(Object.entries(tokensJson.c ?? {}).map(([g, v]) => [g, v.$extensions?.owner ?? 'shared']));
for (const [name, where] of reads) {
  if (name.startsWith('--p-') && [...where].some((w) => w !== 'tokens.css')) fail(join(SRC, 'design'), `primitive ${name} read outside the token files`);
  const g = name.match(/^--c-([a-z]+)-/)?.[1];
  if (!g || !owners[g] || owners[g] === 'shared') continue;
  for (const w of where) if (w !== 'tokens.css' && basename(w).split('.')[0] !== owners[g]) fail(w, `reads ${name}, owned by ${owners[g]}`);
}

const media = css.flatMap((f) => [...read(f).matchAll(/\((?:min|max)-width:\s*([\d.]+rem)\)/g)].map((m) => [f, m[1]]));
const breakpoints = defined.filter((d) => d.startsWith('--breakpoint-'));
for (const [f, w] of media) if (!breakpoints.some((b) => values[b] === w)) fail(f, `width query ${w} is not a breakpoint token`);

for (const d of defined) {
  if (d.startsWith('--p-')) continue;
  if (d.startsWith('--breakpoint-')) {
    if (!media.some(([, w]) => w === values[d])) fail(join(SRC, 'design', 'tokens.css'), `breakpoint ${d} (${values[d]}) is used by no width query`);
    continue;
  }
  if (!reads.get(d)) fail(join(SRC, 'design', 'tokens.css'), `unread token ${d}`);
}

// Generated output exists.
if (!existsSync(join(ROOT, 'design', 'tokens-reference.md'))) fail(join(ROOT, 'design'), 'tokens-reference.md missing; run npm run tokens');

if (findings.length) {
  for (const f of findings) console.error(f);
  console.log(`${findings.length} design finding(s)`);
  process.exitCode = 1;
} else console.log('design: every rule holds');
