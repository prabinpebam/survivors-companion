#!/usr/bin/env node
// Publishes the project to the public GitHub repository, which deploys the site to GitHub Pages.
//
//   node tools/publish.mjs            build the app for Pages, record a commit on `public`, push it
//   node tools/publish.mjs --no-push  everything except the push
//   node tools/publish.mjs --no-build reuse app/dist (it must have been built with build:pages)
//
// The public history is the local branch `public`, separate from `main`; `main` is never pushed.
// Each publish commit is main's committed tree (HEAD) with these changes:
//   - without resources/ (the 2.8 GB raw wiki archive stays local);
//   - without app/.npmrc, and with package-lock URLs pointed at the public npm registry
//     (the internal feed mirrors it; the integrity hashes are the same);
//   - with site/: the built app (app/dist, including the generated data and pictures).
// The Pages workflow (.github/workflows/pages.yml) serves site/ at the root and docs/ at /docs/.
import { execFileSync, execSync } from 'node:child_process';
import { copyFileSync, existsSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const APP = join(ROOT, 'app');
const DIST = join(APP, 'dist');
const BRANCH = 'public';
const REMOTE = 'public';
const BASE = '/survivors-companion/';
const args = new Set(process.argv.slice(2));

const git = (a, opts = {}) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28, ...opts }).trim();
const tryGit = (a, opts) => { try { return git(a, opts); } catch { return null; } };

if (git(['status', '--porcelain', '--untracked-files=no'])) {
  console.warn('note: uncommitted changes are not published; the commit on main (HEAD) is.');
}
const head = git(['rev-parse', 'HEAD']);
const subject = git(['log', '-1', '--format=%s', head]);

if (!args.has('--no-build')) {
  console.log(`building the app for ${BASE}…`);
  execSync('npm run build:pages', { cwd: APP, stdio: 'inherit' });
}
if (!existsSync(join(DIST, 'index.html'))) throw new Error('app/dist/index.html is missing; run without --no-build');
// Pages answers unknown addresses with 404.html; the app reads the address itself.
copyFileSync(join(DIST, 'index.html'), join(DIST, '404.html'));

const files = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
})(DIST);

const index = join(ROOT, '.git', 'public-index');
rmSync(index, { force: true });
const env = { ...process.env, GIT_INDEX_FILE: index };
git(['read-tree', head], { env });
git(['rm', '-r', '--cached', '--quiet', '--ignore-unmatch', 'resources', 'app/.npmrc', 'site'], { env });

const lock = git(['show', `${head}:app/package-lock.json`]).replace(
  /"resolved": "https:\/\/[^"]*?\/npm\/registry\/([^"]+)"/g,
  (_, p) => `"resolved": "https://registry.npmjs.org/${p}"`,
);
if (/"resolved": "(?!https:\/\/registry\.npmjs\.org\/)/.test(lock)) throw new Error('package-lock has a registry URL the export does not recognise');
const lockSha = git(['hash-object', '-w', '--stdin'], { input: lock + '\n' });

console.log(`hashing ${files.length} site files…`);
const shas = git(['hash-object', '-w', '--no-filters', '--stdin-paths'], { input: files.join('\n') }).split('\n');
const info = files.map((f, i) => `100644 ${shas[i]}\tsite/${relative(DIST, f).split(sep).join('/')}`);
info.push(`100644 ${lockSha}\tapp/package-lock.json`);
git(['update-index', '--index-info'], { env, input: info.join('\n') + '\n' });

const tree = git(['write-tree'], { env });
rmSync(index, { force: true });
const parent = tryGit(['rev-parse', '--verify', '--quiet', `refs/heads/${BRANCH}`]);
if (parent && git(['rev-parse', `${parent}^{tree}`]) === tree) {
  console.log(`nothing changed since ${parent.slice(0, 8)}`);
} else {
  const msg = `${subject}\n\nPublished from main ${head.slice(0, 8)}.`;
  const commit = git(['commit-tree', tree, ...(parent ? ['-p', parent] : []), '-m', msg]);
  git(['update-ref', `refs/heads/${BRANCH}`, commit]);
  console.log(`recorded ${commit.slice(0, 8)} on ${BRANCH}`);
}

if (!args.has('--no-push')) {
  execFileSync('git', ['push', REMOTE, `refs/heads/${BRANCH}:refs/heads/main`], { cwd: ROOT, stdio: 'inherit' });
  console.log('pushed; the Pages workflow deploys it in a minute or two');
}
