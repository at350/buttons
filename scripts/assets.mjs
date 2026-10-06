#!/usr/bin/env node
// Downloads the self-hosted asset pack used by components for realistic imagery
// (portraits, album art / card photos, wide thumbnails, phone wallpapers) and writes assets/manifest.json.
// Deterministic: the same source ids are fetched every time. Usage: node scripts/assets.mjs
//
// Sources and licences:
//   - Portraits: randomuser.me/api/portraits (free to use in mockups and demos)
//   - Photos: picsum.photos (Unsplash photos; see each entry's author + unsplash url in the manifest; Unsplash License)
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets');
const PORTRAITS = 40;   // per gender
const SQUARE = 72;      // album art / cards (300×300)
const WIDE = 36;        // video thumbnails / hero cards (480×270)
const TALL = 10;        // phone wallpapers (390×780)

const jobs = [];
const manifest = { portraits: [], square: [], wide: [], tall: [], sources: {
  portraits: 'https://randomuser.me/api/portraits/ (free for mockups)',
  photos: 'https://picsum.photos/ (Unsplash photos, Unsplash License; author + source url per entry)',
} };

async function fetchTo(url, file) {
  try { const s = await stat(file); if (s.size > 500) return; } catch {}
  const r = await fetch(url, { redirect: 'follow' });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  await writeFile(file, Buffer.from(await r.arrayBuffer()));
}

async function run(limit) {
  let i = 0, active = 0, failed = 0;
  await new Promise((done) => {
    const next = () => {
      if (i >= jobs.length && active === 0) return done();
      while (active < limit && i < jobs.length) {
        const j = jobs[i++]; active++;
        j().catch((e) => { failed++; console.error('  ✗', e.message); }).finally(() => { active--; next(); });
      }
    };
    next();
  });
  return failed;
}

for (const d of ['portraits', 'square', 'wide', 'tall']) await mkdir(join(ROOT, d), { recursive: true });

// portraits: men/women 0..PORTRAITS-1 (128px jpg)
for (const g of ['men', 'women']) for (let n = 0; n < PORTRAITS; n++) {
  const file = `${g}-${String(n).padStart(2, '0')}.jpg`;
  manifest.portraits.push({ file: `portraits/${file}`, gender: g, source: `https://randomuser.me/api/portraits/${g}/${n}.jpg` });
  jobs.push(() => fetchTo(`https://randomuser.me/api/portraits/${g}/${n}.jpg`, join(ROOT, 'portraits', file)));
}

// photos: a fixed slice of the picsum catalogue (pages 1–3), skipping a few known odd ones
const list = [];
for (let p = 1; p <= 3; p++) {
  const r = await fetch(`https://picsum.photos/v2/list?page=${p}&limit=100`);
  list.push(...(await r.json()));
}
const skip = new Set([86, 97, 105, 138, 148, 150, 205, 207, 224, 226, 245, 246, 262, 285, 286, 298]);
const photos = list.filter((x) => !skip.has(+x.id) && x.width >= x.height * 1.2); // landscape-ish source frames
const take = (n, from) => photos.slice(from, from + n);
const add = (kind, items, w, h) => items.forEach((x, k) => {
  const file = `${kind}/${String(k).padStart(2, '0')}.webp`;
  manifest[kind].push({ file, id: +x.id, author: x.author, source: x.url });
  jobs.push(() => fetchTo(`https://picsum.photos/id/${x.id}/${w}/${h}.webp`, join(ROOT, file)));
});
add('square', take(SQUARE, 0), 300, 300);
add('wide', take(WIDE, SQUARE), 480, 270);
add('tall', take(TALL, SQUARE + WIDE), 390, 780);

console.log(`fetching ${jobs.length} files…`);
const failed = await run(8);
await writeFile(join(ROOT, 'manifest.json'), JSON.stringify(manifest, null, 1));
console.log(`done: ${jobs.length - failed} ok, ${failed} failed → assets/manifest.json`);
process.exit(failed ? 1 : 0);
