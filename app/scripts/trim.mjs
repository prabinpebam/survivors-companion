// Trims the clear margin around source pictures, so a sprite fills the frame it is shown in.
// Many wiki sprites sit in a mostly empty canvas (an enemy of 76×96 pixels in 256×256), which leaves
// them unrecognisable at the sizes the app shows them. Only the generated copy is trimmed: the source
// picture under resources/ is never written. Pixels are kept exactly; only fully clear rows and
// columns at the edges are removed.
import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { PNG } from 'pngjs';

/** Trim only when the content fills less than this share of the canvas in its longer direction. */
const MIN_SHARE = 0.8;

/** @param {(name: string) => string | null} pathOf the source file for a media name, or null. */
export function trimmer(pathOf) {
  /** @type {Map<string, { x: number, y: number, w: number, h: number, W: number, H: number } | null>} */
  const boxes = new Map();

  /** The content box of a picture worth trimming, or null (not a PNG, animated, unreadable, or full). */
  function box(name) {
    if (boxes.has(name)) return boxes.get(name);
    let found = null;
    const path = /\.png$/i.test(name) ? pathOf(name) : null;
    if (path) {
      try {
        const buf = readFileSync(path);
        if (!buf.includes('acTL')) found = contentBox(PNG.sync.read(buf));
      } catch { found = null; }
    }
    boxes.set(name, found);
    return found;
  }

  /** Scales every picture reference ({ i, w, h }) in data to its trimmed shape, keeping the content's shown scale. */
  function fit(data) {
    if (Array.isArray(data)) { data.forEach(fit); return data; }
    if (!data || typeof data !== 'object') return data;
    if (typeof data.i === 'string' && typeof data.w === 'number' && typeof data.h === 'number') {
      const b = box(data.i);
      if (b && data.w > 0 && data.h > 0) {
        data.w = Math.max(1, Math.round((data.w * b.w) / b.W));
        data.h = Math.max(1, Math.round((data.h * b.h) / b.H));
      }
    }
    for (const v of Object.values(data)) if (v && typeof v === 'object') fit(v);
    return data;
  }

  /** Writes the picture to dest, trimmed when worth it. Returns true when trimmed. */
  function write(name, dest) {
    const b = box(name);
    if (!b) { copyFileSync(pathOf(name), dest); return false; }
    const out = new PNG({ width: b.w, height: b.h });
    PNG.bitblt(PNG.sync.read(readFileSync(pathOf(name))), out, b.x, b.y, b.w, b.h, 0, 0);
    writeFileSync(dest, PNG.sync.write(out));
    return true;
  }

  return { box, fit, write };
}

function contentBox(png) {
  const { width: W, height: H, data } = png;
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * 4 + 3] === 0) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  if (x1 < 0) return null;
  const w = x1 - x0 + 1, h = y1 - y0 + 1;
  return Math.max(w / W, h / H) < MIN_SHARE ? { x: x0, y: y0, w, h, W, H } : null;
}
